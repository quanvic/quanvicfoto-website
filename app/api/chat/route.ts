import { NextResponse } from "next/server";
import { SYSTEM_INSTRUCTION } from "@/lib/chatbot-knowledge";

export const runtime = "nodejs";

// gemini-2.0-flash was deprecated 2026-06-01 (requests against it return a
// blanket 429 regardless of quota). gemini-3.5-flash is the current
// free-tier default — override via GEMINI_MODEL if it's ever renamed again.
const MODEL = process.env.GEMINI_MODEL ?? "gemini-3.5-flash";
const MAX_MESSAGE_LENGTH = 800;
const MAX_HISTORY_TURNS = 10;

type ChatTurn = { role: "user" | "model"; text: string };

export async function POST(req: Request) {
  let body: { message?: string; history?: ChatTurn[] };

  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "invalid_body" }, { status: 400 });
  }

  const message = (body.message ?? "").trim();
  if (!message) {
    return NextResponse.json({ error: "missing_message" }, { status: 400 });
  }
  if (message.length > MAX_MESSAGE_LENGTH) {
    return NextResponse.json({ error: "message_too_long" }, { status: 400 });
  }

  const history = Array.isArray(body.history)
    ? body.history
        .filter(
          (turn): turn is ChatTurn =>
            (turn?.role === "user" || turn?.role === "model") &&
            typeof turn?.text === "string" &&
            turn.text.length > 0 &&
            turn.text.length <= MAX_MESSAGE_LENGTH,
        )
        .slice(-MAX_HISTORY_TURNS * 2)
    : [];

  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    console.error("GEMINI_API_KEY is not set — chat widget cannot reply.");
    return NextResponse.json(
      { error: "chat_not_configured" },
      { status: 503 },
    );
  }

  const contents = [
    ...history.map((turn) => ({
      role: turn.role,
      parts: [{ text: turn.text }],
    })),
    { role: "user", parts: [{ text: message }] },
  ];

  try {
    const res = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/${MODEL}:generateContent?key=${apiKey}`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          systemInstruction: { parts: [{ text: SYSTEM_INSTRUCTION }] },
          contents,
          generationConfig: {
            maxOutputTokens: 800,
            temperature: 0.4,
            // gemini-3.5-flash has "thinking" on by default, and thinking
            // tokens are deducted from maxOutputTokens — without this, the
            // visible reply gets silently cut off mid-sentence. This is a
            // short FAQ-style chatbot, so no reasoning budget is needed.
            thinkingConfig: { thinkingBudget: 0 },
          },
        }),
      },
    );

    if (!res.ok) {
      const errBody = await res.text();
      console.error("Gemini API error:", res.status, errBody);
      return NextResponse.json({ error: "chat_failed" }, { status: 502 });
    }

    const data = await res.json();
    const parts: { text?: string }[] | undefined =
      data?.candidates?.[0]?.content?.parts;
    const reply = parts
      ?.map((p) => p.text ?? "")
      .join("")
      .trim();

    if (!reply) {
      console.error("Gemini response had no text:", JSON.stringify(data));
      return NextResponse.json({ error: "chat_failed" }, { status: 502 });
    }

    return NextResponse.json({ reply });
  } catch (err) {
    console.error("Gemini request failed:", err);
    return NextResponse.json({ error: "chat_failed" }, { status: 502 });
  }
}
