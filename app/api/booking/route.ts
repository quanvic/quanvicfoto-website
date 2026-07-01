import { NextResponse } from "next/server";
import { Resend } from "resend";

export const runtime = "nodejs";

const TO_EMAIL = "quanvicfoto@gmail.com";
const FROM_EMAIL = process.env.RESEND_FROM_EMAIL ?? "onboarding@resend.dev";

const MAX_IMAGES = 10;
const MAX_FILE_BYTES = 4 * 1024 * 1024; // 4MB per image (pre-compression, client-enforced)
// Vercel serverless functions cap the request body at ~4.5MB regardless of
// plan. The client compresses images before upload, but this stays as a
// hard backstop so an oversized request fails with a clear error instead
// of a raw platform 413.
const MAX_TOTAL_BYTES = 4 * 1024 * 1024;

export async function POST(req: Request) {
  let form: FormData;
  try {
    form = await req.formData();
  } catch {
    return NextResponse.json({ error: "invalid_form" }, { status: 400 });
  }

  const name = String(form.get("name") ?? "").trim();
  const contact = String(form.get("contact") ?? "").trim();
  const date = String(form.get("date") ?? "").trim();
  const concept = String(form.get("concept") ?? "").trim();
  const message = String(form.get("message") ?? "").trim();
  const images = form
    .getAll("images")
    .filter((entry): entry is File => entry instanceof File && entry.size > 0);

  if (!name || !contact || !date || !concept) {
    return NextResponse.json({ error: "missing_fields" }, { status: 400 });
  }

  if (images.length > MAX_IMAGES) {
    return NextResponse.json({ error: "too_many_images" }, { status: 400 });
  }

  const totalBytes = images.reduce((sum, file) => sum + file.size, 0);
  if (totalBytes > MAX_TOTAL_BYTES) {
    return NextResponse.json({ error: "payload_too_large" }, { status: 400 });
  }
  if (images.some((file) => file.size > MAX_FILE_BYTES)) {
    return NextResponse.json({ error: "file_too_large" }, { status: 400 });
  }

  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    console.error(
      "RESEND_API_KEY is not set — booking request could not be emailed.",
    );
    return NextResponse.json(
      { error: "email_not_configured" },
      { status: 503 },
    );
  }

  const attachments = await Promise.all(
    images.map(async (file) => ({
      filename: file.name || "reference.jpg",
      content: Buffer.from(await file.arrayBuffer()),
    })),
  );

  const resend = new Resend(apiKey);

  const html = `
    <h2>New booking request</h2>
    <p><strong>Name:</strong> ${escapeHtml(name)}</p>
    <p><strong>Contact:</strong> ${escapeHtml(contact)}</p>
    <p><strong>Preferred date:</strong> ${escapeHtml(date)}</p>
    <p><strong>Concept:</strong> ${escapeHtml(concept)}</p>
    <p><strong>Message:</strong><br/>${escapeHtml(message).replace(/\n/g, "<br/>")}</p>
    <p><strong>Reference images:</strong> ${images.length} attached</p>
  `;

  try {
    const { error } = await resend.emails.send({
      from: `Quân Vic Foto Booking <${FROM_EMAIL}>`,
      to: TO_EMAIL,
      replyTo: contact.includes("@") ? contact : undefined,
      subject: `New booking request — ${name}`,
      html,
      attachments,
    });

    if (error) {
      console.error("Resend error:", error);
      return NextResponse.json({ error: "send_failed" }, { status: 502 });
    }
  } catch (err) {
    console.error("Booking email failed:", err);
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
