import { NextResponse } from "next/server";
import { Resend } from "resend";

export const runtime = "nodejs";

const TO_EMAIL = "quanvicfoto@gmail.com";
const FROM_EMAIL = process.env.RESEND_FROM_EMAIL ?? "onboarding@resend.dev";

export async function POST(req: Request) {
  let body: {
    name?: string;
    email?: string;
    project?: string;
    message?: string;
  };

  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "invalid_body" }, { status: 400 });
  }

  const name = (body.name ?? "").trim();
  const email = (body.email ?? "").trim();
  const project = (body.project ?? "").trim();
  const message = (body.message ?? "").trim();

  if (!name || !email || !message) {
    return NextResponse.json({ error: "missing_fields" }, { status: 400 });
  }

  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    console.error(
      "RESEND_API_KEY is not set — contact message could not be emailed.",
    );
    return NextResponse.json(
      { error: "email_not_configured" },
      { status: 503 },
    );
  }

  const resend = new Resend(apiKey);

  const html = `
    <h2>New contact message</h2>
    <p><strong>Name:</strong> ${escapeHtml(name)}</p>
    <p><strong>Email:</strong> ${escapeHtml(email)}</p>
    <p><strong>Project type:</strong> ${escapeHtml(project)}</p>
    <p><strong>Message:</strong><br/>${escapeHtml(message).replace(/\n/g, "<br/>")}</p>
  `;

  try {
    const { error } = await resend.emails.send({
      from: `Quân Vic Foto Contact <${FROM_EMAIL}>`,
      to: TO_EMAIL,
      replyTo: email,
      subject: `New contact message — ${name}`,
      html,
    });

    if (error) {
      console.error("Resend error:", error);
      return NextResponse.json({ error: "send_failed" }, { status: 502 });
    }
  } catch (err) {
    console.error("Contact email failed:", err);
    return NextResponse.json({ error: "send_failed" }, { status: 502 });
  }

  return NextResponse.json({ ok: true });
}

function escapeHtml(value: string) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}
