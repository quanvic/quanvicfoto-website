import type { Metadata } from "next";
import HomeContent from "@/components/HomeContent";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: "Nơi Vẻ Đẹp Độc Bản Tỏa Sáng | Chân Dung & Beauty Studio Hà Nội",
  description:
    "Mỗi gương mặt là một tác phẩm nghệ thuật. Studio cung cấp dịch vụ chụp ảnh chân dung cao cấp, Editorial Fashion và các khóa học nhiếp ảnh chuyên sâu tại Hai Bà Trưng, Hà Nội.",
  path: "/",
});

export default function Home() {
  return <HomeContent />;
}
