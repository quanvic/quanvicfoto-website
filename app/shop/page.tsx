import type { Metadata } from "next";
import ShopContent from "@/components/ShopContent";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: "Sở Hữu Trọn Vẹn Khoảnh Khắc | Mua Ảnh Bản Quyền Cao Cấp",
  description:
    "Lựa chọn file in ảnh, trọn bộ file album hoặc mua đứt bản quyền độc quyền từ các tác phẩm Beauty & Editorial nguyên bản. Chất lượng cao, giao dịch minh bạch tại Hà Nội.",
  path: "/shop",
});

export default function ShopPage() {
  return <ShopContent />;
}
