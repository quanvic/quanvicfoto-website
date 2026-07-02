import type { Metadata } from "next";
import ContactContent from "@/components/ContactContent";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: "Đặt Lịch Chụp Ảnh Chân Dung | Studio Beauty Hai Bà Trưng, Hà Nội",
  description:
    "Liên hệ đặt lịch chụp ảnh chân dung, Editorial hoặc tư vấn dự án tại 248B Phố Huế, Hà Nội. Phản hồi trong 2 ngày làm việc — hotline +84 824 939 333.",
  path: "/contact",
});

export default function ContactPage() {
  return <ContactContent />;
}
