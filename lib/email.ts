export function escapeHtml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

export function isValidEmail(value: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value.trim());
}

export function autoReplyHtml(
  name: string,
  kind: "contact" | "booking" | "shop" = "contact",
): string {
  const intro =
    kind === "booking"
      ? "Quân Vic Foto đã nhận được yêu cầu đặt lịch chụp của bạn từ website. Cảm ơn bạn đã tin tưởng chọn tôi làm người đồng hành để ghi lại những khoảnh khắc đáng giá của mình."
      : kind === "shop"
        ? "Quân Vic Foto đã nhận được yêu cầu mua bản quyền ảnh của bạn từ website. Cảm ơn bạn đã quan tâm và muốn sở hữu một phần trong những tác phẩm tôi đã thực hiện."
        : "Quân Vic Foto đã nhận được thông tin liên hệ của bạn từ website. Cảm ơn bạn đã tin tưởng chọn tôi làm người đồng hành để ghi lại những khoảnh khắc đáng giá của mình.";

  return `
    <div style="font-family: Georgia, 'Times New Roman', serif; color: #111; max-width: 560px; margin: 0 auto; padding: 32px 24px;">
      <p style="font-family: Arial, sans-serif; font-size: 11px; letter-spacing: 2px; text-transform: uppercase; color: #8a8a8f; margin: 0 0 24px;">Quân Vic Foto</p>
      <h1 style="font-size: 22px; font-weight: 500; margin: 0 0 20px;">Xin chào ${escapeHtml(name)},</h1>
      <p style="font-family: Arial, sans-serif; font-size: 15px; line-height: 1.7; color: #333;">
        ${intro}
      </p>
      <p style="font-family: Arial, sans-serif; font-size: 15px; line-height: 1.7; color: #333;">
        Mỗi yêu cầu, mỗi ý tưởng của bạn đều là một tác phẩm nghệ thuật cần được chuẩn bị chu đáo. Tôi sẽ nghiên cứu thật kỹ và chủ động phản hồi lại bạn chi tiết nhất trong vòng 24 giờ tới.
      </p>
      <p style="font-family: Arial, sans-serif; font-size: 15px; line-height: 1.7; color: #333;">
        Nếu bạn cần trao đổi nhanh, thảo luận gấp về concept hoặc đặt lịch chụp ưu tiên, hãy kết nối trực tiếp với tôi qua Zalo tại đây:
      </p>
      <p style="margin: 24px 0;">
        <a href="https://zalo.me/0824939333" style="display: inline-block; padding: 12px 28px; background: #111; color: #fff; text-decoration: none; font-family: Arial, sans-serif; font-size: 13px; letter-spacing: 1px; text-transform: uppercase;">Chat qua Zalo</a>
      </p>
      <p style="font-family: Arial, sans-serif; font-size: 15px; line-height: 1.7; color: #333;">
        Chúc bạn một ngày tràn đầy năng lượng và niềm vui!
      </p>
      <p style="font-family: Arial, sans-serif; font-size: 13px; color: #8a8a8f; margin-top: 32px; border-top: 1px solid #e4e4e7; padding-top: 20px;">
        Trân trọng,<br/>
        Quân Vic Foto | Beauty &amp; Portrait Photographer<br/>
        Hotline: +84 824939333
      </p>
    </div>
  `;
}
