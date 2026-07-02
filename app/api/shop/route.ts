import { NextResponse } from "next/server";
import { Resend } from "resend";
import { autoReplyHtml, escapeHtml, isValidEmail } from "@/lib/email";

export const runtime = "nodejs";

const TO_EMAIL = "quanvicfoto@gmail.com";
const FROM_EMAIL = process.env.RESEND_FROM_EMAIL ?? "onboarding@resend.dev";

export async function POST(req: Request) {
  let body: {
    name?: string;
    contact?: string;
    license?: string;
    price?: string;
    photoIndex?: number;
    message?: string;
    product?: string;
    productSlug?: string;
  };

  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "invalid_body" }, { status: 400 });
  }

  const name = (body.name ?? "").trim();
  const contact = (body.contact ?? "").trim();
  const license = (body.license ?? "").trim();
  const price = (body.price ?? "").trim();
  const photoIndex =
    typeof body.photoIndex === "number" ? body.photoIndex : null;
  const message = (body.message ?? "").trim();
  const product = (body.product ?? "").trim();
  const productSlug = (body.productSlug ?? "").trim();

  if (!name || !contact || !license || !product) {
    return NextResponse.json({ error: "missing_fields" }, { status: 400 });
  }

  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    console.error(
      "RESEND_API_KEY is not set — shop enquiry could not be emailed.",
    );
    return NextResponse.json(
      { error: "email_not_configured" },
      { status: 503 },
    );
  }

  const resend = new Resend(apiKey);

  const html = `
    <h2>New shop licensing enquiry</h2>
    <p><strong>Name:</strong> ${escapeHtml(name)}</p>
    <p><strong>Contact:</strong> ${escapeHtml(contact)}</p>
    <p><strong>Piece:</strong> ${escapeHtml(product)} (${escapeHtml(productSlug)})</p>
    <p><strong>Tier requested:</strong> ${escapeHtml(license)}${price ? ` — ${escapeHtml(price)}` : ""}</p>
    ${photoIndex ? `<p><strong>Photo selected:</strong> #${photoIndex}</p>` : ""}
    <p><strong>Message:</strong><br/>${escapeHtml(message).replace(/\n/g, "<br/>")}</p>
  `;

  try {
    const { error } = await resend.emails.send({
      from: `Quân Vic Foto Shop <${FROM_EMAIL}>`,
      to: TO_EMAIL,
      replyTo: isValidEmail(contact) ? contact : undefined,
      subject: `New shop enquiry — ${product} (${name})`,
      html,
    });

    if (error) {
      console.error("Resend error:", error);
      return NextResponse.json({ error: "send_failed" }, { status: 502 });
    }
  } catch (err) {
    console.error("Shop email failed:", err);
    return NextResponse.json({ error: "send_failed" }, { status: 502 });
  }

  // Best-effort auto-reply to the customer, only when the "contact" field
  // they entered is actually an email — failure here shouldn't fail the
  // request, since the studio has already received the enquiry.
  if (isValidEmail(contact)) {
    try {
      const { error } = await resend.emails.send({
        from: `Quân Vic Foto <${FROM_EMAIL}>`,
        to: contact,
        subject: "[Quân Vic Foto] Cảm ơn bạn đã gửi gắm ý tưởng",
        html: autoReplyHtml(name, "shop"),
      });
      if (error) {
        console.error("Auto-reply Resend error:", error);
      }
    } catch (err) {
      console.error("Auto-reply email failed:", err);
    }
  }

  return NextResponse.json({ ok: true });
}
