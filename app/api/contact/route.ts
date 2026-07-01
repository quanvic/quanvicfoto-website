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

  // Best-effort auto-reply to the customer — failure here shouldn't fail
  // the request, since the studio has already received the enquiry.
  try {
    const { error } = await resend.emails.send({
      from: `Quân Vic Foto <${FROM_EMAIL}>`,
      to: email,
      subject: "[Quân Vic Foto] Cảm ơn bạn đã gửi gắm ý tưởng",
      html: autoReplyHtml(name),
    });
    if (error) {
      console.error("Auto-reply Resend error:", error);
    }
  } catch (err) {
    console.error("Auto-reply email failed:", err);
  }

  return NextResponse.json({ ok: true });
}

function autoReplyHtml(name: string) {
  return `
    <div style="font-family: Georgia, 'Times New Roman', serif; color: #111; max-width: 560px; margin: 0 auto; padding: 32px 24px;">
      <p style="font-family: Arial, sans-serif; font-size: 11px; letter-spacing: 2px; text-transform: uppercase; color: #8a8a8f; margin: 0 0 24px;">Quân Vic Foto</p>
      <h1 style="font-size: 24px; font-weight: 500; margin: 0 0 16px;">Cảm ơn bạn, ${escapeHtml(name)}!</h1>
      <p style="font-family: Arial, sans-serif; font-size: 15px; line-height: 1.7; color: #333;">
        Quân Vic Foto đã nhận được ý tưởng và lời nhắn bạn vừa gửi gắm. Mỗi câu chuyện, mỗi gương mặt đều xứng đáng được lắng nghe trọn vẹn — tôi sẽ đích thân xem qua và phản hồi bạn trong thời gian sớm nhất.
      </p>
      <p style="font-family: Arial, sans-serif; font-size: 15px; line-height: 1.7; color: #333;">
        Nếu muốn trao đổi nhanh về concept, đừng ngại nhắn tôi qua Zalo để được tư vấn ngay:
      </p>
      <p style="margin: 24px 0;">
        <a href="https://zalo.me/0824939333" style="display: inline-block; padding: 12px 28px; background: #111; color: #fff; text-decoration: none; font-family: Arial, sans-serif; font-size: 13px; letter-spacing: 1px; text-transform: uppercase;">Nhắn tin qua Zalo</a>
      </p>
      <p style="font-family: Arial, sans-serif; font-size: 13px; color: #8a8a8f; margin-top: 32px; border-top: 1px solid #e4e4e7; padding-top: 20px;">
        Trân trọng,<br/>Quân Vic Foto — Beauty Photographer
      </p>
    </div>
  `;
}

function escapeHtml(value: string) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}
