export type MenuItem =
  | { type: "link"; label: string; href: string }
  | { type: "action"; label: string; action: "booking" };

export const MENU_ITEMS: MenuItem[] = [
  { type: "link", label: "Home", href: "/" },
  { type: "link", label: "Portfolio", href: "/portfolio" },
  { type: "link", label: "Shop", href: "/shop" },
  { type: "link", label: "Courses", href: "/courses" },
  { type: "action", label: "Booking", action: "booking" },
  { type: "link", label: "About", href: "/about" },
  { type: "link", label: "Contact", href: "/contact" },
];

export const SOCIAL_LINKS = [
  { label: "Instagram", href: "https://www.instagram.com/quanvic.studio/" },
  { label: "Facebook", href: "https://www.facebook.com/quanvicstudio/" },
];

export const PHONE_DISPLAY = "+84 824939333";
export const PHONE_TEL = "+84824939333";

// Each PortfolioItem is an album: one concept, one story, one or more
// photos. Most albums hold a single cover photo; a handful hold a small
// set of related shots from the same session (images[0] is always the
// cover used for grid thumbnails, Shop listings, etc.). Every portfolio
// piece is for sale in the Shop by default — set exclusiveSold once the
// one-off copyright buyout tier has actually been sold for a piece, so
// it stops being offered to other buyers.
export type PortfolioItem = {
  slug: string;
  concept: string;
  category: string;
  images: string[];
  year: string;
  span: "tall" | "wide" | "large" | "regular";
  story?: string;
  exclusiveSold?: boolean;
};

export const PORTFOLIO_ITEMS: PortfolioItem[] = [
  {
    slug: "porcelain",
    concept: "Tinh Khôi",
    category: "Skin Study",
    images: ["/images/porcelain.webp"],
    year: "2025",
    span: "large",
    story:
      "Có những vẻ đẹp không cần tô vẽ — chỉ cần ánh sáng biết nâng niu. Từng thớ vải ren, từng làn da thật được giữ nguyên vẹn, như một lời thì thầm về sự tinh khôi chưa từng phai.",
  },
  {
    slug: "vermillion",
    concept: "Sắc Sảo",
    category: "Colour Story",
    images: ["/images/vermillion.webp"],
    year: "2025",
    span: "tall",
    story:
      "Sắc đỏ rực rỡ ôm lấy gương mặt như một lời tuyên ngôn — bản lĩnh, quyến rũ và không hề do dự. Đây là khoảnh khắc một người phụ nữ chọn tỏa sáng theo cách của riêng mình.",
  },
  {
    slug: "noir",
    concept: "Noir",
    category: "Black & White",
    images: ["/images/noir.jpg"],
    year: "2024",
    span: "regular",
    story:
      "Đôi mắt khép lại, không phải để trốn tránh mà để lắng nghe chính mình. Giữa nền đen tuyệt đối, chiếc nơ voan trắng nổi bật như một hơi thở nhẹ — sự tương phản làm nên vẻ đẹp tĩnh lặng và đầy nội lực.",
  },
  {
    slug: "bloom",
    concept: "Bloom",
    category: "Portrait Study",
    images: ["/images/bloom.webp"],
    year: "2024",
    span: "wide",
    story:
      "Một cánh hoa Thiên điểu rực rỡ băng ngang gương mặt, nhưng ánh nhìn vẫn thẳng thắn không giấu diếm. Bloom là khoảnh khắc vẻ đẹp tự nhiên bung nở giữa sắc màu, chẳng cần phô trương mà vẫn cuốn hút.",
  },
  {
    slug: "editorial-no-4",
    concept: "Editorial No. 4",
    category: "Campaign",
    images: ["/images/editorial-no-4.webp"],
    year: "2024",
    span: "regular",
    story:
      "Một đóa hoa nâng niu bên gò má, ánh mắt hướng thẳng ống kính đầy tự tin. Trên nền xanh đêm sâu thẳm, đây là chân dung của một tuyên ngôn thời trang không cần lời.",
  },
  {
    slug: "gaze",
    concept: "Gaze",
    category: "Portrait Study",
    images: ["/images/gaze.webp"],
    year: "2023",
    span: "tall",
    story:
      "Vòng hoa khô trên mái tóc bồng bềnh, bàn tay khẽ nâng cằm như đang chờ đợi một câu chuyện được kể. Gaze là ánh nhìn chân thật nhất — nơi vẻ đẹp mộc mạc và cảm xúc hòa làm một.",
  },
  {
    slug: "structure",
    concept: "Structure",
    category: "Editorial",
    images: ["/images/structure.webp"],
    year: "2023",
    span: "large",
    story:
      "Một hình khối voan trắng tưởng như chỉ thuộc về kiến trúc lại ôm trọn gương mặt, cùng ánh nhìn nghiêng đầy thách thức. Structure là nơi kỹ thuật ánh sáng và sự sáng tạo hình khối gặp nhau trong từng đường nét.",
  },
  {
    slug: "muse",
    concept: "Muse",
    category: "Bridal",
    images: ["/images/muse.jpg"],
    year: "2023",
    span: "regular",
    story:
      "Búi tóc cao, đôi tay đan chéo đầy kiêu hãnh trên nền hồng phấn mộng mơ. Muse là lời tôn vinh dành cho người phụ nữ hiện đại — vừa dịu dàng trong từng lớp ren, vừa mạnh mẽ trong ánh nhìn.",
  },
  {
    slug: "thanh-xuan",
    concept: "Thanh Xuân",
    category: "Skin Study",
    images: ["/images/thanh-xuan.webp"],
    year: "2025",
    span: "regular",
    story:
      "Nền trắng tinh khôi tôn lên từng đường nét tự nhiên nhất. Thanh Xuân là lát cắt của tuổi trẻ rực rỡ — không cần hậu cảnh cầu kỳ, chỉ cần một ánh nhìn chân thành cũng đủ chạm đến trái tim người xem.",
  },
  {
    slug: "phu-van",
    concept: "Phù Vân",
    category: "Editorial",
    images: ["/images/phu-van.webp"],
    year: "2025",
    span: "regular",
    story:
      "Ánh sáng chỉ vừa đủ chạm vào một nửa gương mặt, nửa còn lại chìm trong bóng tối đầy ẩn ý. Phù Vân là khoảnh khắc mong manh, thoáng qua như áng mây — đẹp bởi sự không trọn vẹn.",
  },
  {
    slug: "diu-dang",
    concept: "Dịu Dàng",
    category: "Bridal",
    images: [
      "/images/diu-dang.webp",
      "/images/loi-hen.webp",
      "/images/lang.webp",
      "/images/mien-xa.webp",
      "/images/mien-xa-2.webp",
      "/images/diu-dang-6.webp",
    ],
    year: "2026",
    span: "large",
    story:
      "Một buổi sáng trước ngày trọng đại, giữa những đóa hoa rực rỡ trên bàn gỗ mộc. Tấm voan khẽ buông, nụ cười dịu dàng, khi ánh mắt cúi xuống lặng lẽ, khi nhìn thẳng đầy tự tin, khi quay về phía xa xăm — Dịu Dàng là chuỗi khoảnh khắc rất thật của một cô dâu trước ngưỡng cửa hạnh phúc.",
  },
  {
    slug: "kieu-sa",
    concept: "Kiêu Sa",
    category: "Bridal",
    images: [
      "/images/kieu-sa.webp",
      "/images/kieu-sa-2.webp",
      "/images/kieu-sa-3.webp",
      "/images/kieu-sa-4.webp",
      "/images/kieu-sa-5.webp",
      "/images/kieu-sa-6.webp",
      "/images/kieu-sa-7.webp",
      "/images/kieu-sa-8.webp",
      "/images/kieu-sa-9.webp",
    ],
    year: "2026",
    span: "large",
    story:
      "Đường ren tinh xảo ôm trọn vòng eo, tà váy đuôi cá lộng lẫy trải dài như một áng thơ trên nền phông tối. Kiêu Sa là chân dung của người phụ nữ tự tin bước vào ngày trọng đại — ánh nhìn thẳng thắn, dáng vóc kiêu hãnh, và một vẻ đẹp không cần vội vã phô bày.",
  },
];

export const ABOUT_IMAGE = "/images/about.webp";

export const HERO_IMAGE = "/images/hero.webp";

export const COURSE_IMAGES: Record<string, string> = {
  basic: "/images/course-basic.webp",
  advanced: "/images/course-advanced.webp",
  pathway: "/images/course-pathway.webp",
  mentorship: "/images/course-mentorship.webp",
};
