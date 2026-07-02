import type { Metadata } from "next";
import CoursesContent from "@/components/CoursesContent";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: "Khóa Học Nhiếp Ảnh Beauty Chuyên Sâu | Quân Vic Foto Academy",
  description:
    "Từ nền tảng ánh sáng đến kỹ thuật Editorial nâng cao — chương trình đào tạo nhiếp ảnh Beauty bài bản cùng 11 năm kinh nghiệm thực chiến, tại studio Hai Bà Trưng, Hà Nội.",
  path: "/courses",
});

export default function CoursesPage() {
  return <CoursesContent />;
}
