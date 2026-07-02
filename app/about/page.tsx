import type { Metadata } from "next";
import AboutContent from "@/components/AboutContent";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: "Câu Chuyện Phía Sau Ống Kính | Nhiếp Ảnh Gia Beauty Quân Vic Foto",
  description:
    "11 năm theo đuổi nghệ thuật ánh sáng và chân dung Beauty & Fashion. Khám phá hành trình, triết lý sáng tạo và những dự án đã đồng hành cùng các thương hiệu lớn.",
  path: "/about",
});

export default function AboutPage() {
  return <AboutContent />;
}
