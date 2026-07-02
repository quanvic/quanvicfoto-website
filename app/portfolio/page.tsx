import type { Metadata } from "next";
import PortfolioContent from "@/components/PortfolioContent";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: "Những Khoảnh Khắc Đáng Giá | Portfolio Chân Dung & Thời Trang",
  description:
    "Chiêm ngưỡng những câu chuyện được kể bằng ánh sáng và cảm xúc. Kho lưu trữ các tác phẩm nhiếp ảnh sắc sảo và dịch vụ mua bán bản quyền hình ảnh thương mại độc quyền.",
  path: "/portfolio",
});

export default function PortfolioPage() {
  return <PortfolioContent />;
}
