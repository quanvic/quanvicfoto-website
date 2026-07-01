export type MenuItem =
  | { type: "link"; label: string; href: string }
  | { type: "action"; label: string; action: "booking" };

export const MENU_ITEMS: MenuItem[] = [
  { type: "link", label: "Home", href: "/" },
  { type: "link", label: "Portfolio", href: "/portfolio" },
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

export type PortfolioItem = {
  slug: string;
  concept: string;
  category: string;
  image: string;
  year: string;
  span: "tall" | "wide" | "large" | "regular";
  story?: string;
};

export const PORTFOLIO_ITEMS: PortfolioItem[] = [
  {
    slug: "porcelain",
    concept: "Tinh Khôi",
    category: "Skin Study",
    image: "/images/porcelain.webp",
    year: "2025",
    span: "large",
    story:
      "Có những vẻ đẹp không cần tô vẽ — chỉ cần ánh sáng biết nâng niu. Từng thớ vải ren, từng làn da thật được giữ nguyên vẹn, như một lời thì thầm về sự tinh khôi chưa từng phai.",
  },
  {
    slug: "vermillion",
    concept: "Sắc Sảo",
    category: "Colour Story",
    image: "/images/vermillion.webp",
    year: "2025",
    span: "tall",
    story:
      "Sắc đỏ rực rỡ ôm lấy gương mặt như một lời tuyên ngôn — bản lĩnh, quyến rũ và không hề do dự. Đây là khoảnh khắc một người phụ nữ chọn tỏa sáng theo cách của riêng mình.",
  },
  {
    slug: "noir",
    concept: "Noir",
    category: "Black & White",
    image: "/images/noir.jpg",
    year: "2024",
    span: "regular",
  },
  {
    slug: "bloom",
    concept: "Bloom",
    category: "Portrait Study",
    image: "/images/bloom.webp",
    year: "2024",
    span: "wide",
  },
  {
    slug: "editorial-no-4",
    concept: "Editorial No. 4",
    category: "Campaign",
    image: "/images/editorial-no-4.webp",
    year: "2024",
    span: "regular",
  },
  {
    slug: "gaze",
    concept: "Gaze",
    category: "Portrait Study",
    image: "/images/gaze.webp",
    year: "2023",
    span: "tall",
  },
  {
    slug: "structure",
    concept: "Structure",
    category: "Editorial",
    image: "/images/structure.webp",
    year: "2023",
    span: "large",
  },
  {
    slug: "muse",
    concept: "Muse",
    category: "Bridal",
    image: "/images/muse.jpg",
    year: "2023",
    span: "regular",
  },
];

export const ABOUT_IMAGE = "/images/about.webp";

export const HERO_IMAGE = "/images/hero.webp";
