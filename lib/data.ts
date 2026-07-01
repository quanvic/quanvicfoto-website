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
  mua: string;
  model: string;
  year: string;
  span: "tall" | "wide" | "large" | "regular";
};

export const PORTFOLIO_ITEMS: PortfolioItem[] = [
  {
    slug: "porcelain",
    concept: "Porcelain",
    category: "Skin Study",
    image: "/images/porcelain.webp",
    mua: "Elena Cross",
    model: "Wren Sato",
    year: "2025",
    span: "large",
  },
  {
    slug: "vermillion",
    concept: "Vermillion",
    category: "Colour Story",
    image: "/images/vermillion.webp",
    mua: "Naomi Reyes",
    model: "Ines Falk",
    year: "2025",
    span: "tall",
  },
  {
    slug: "noir",
    concept: "Noir",
    category: "Black & White",
    image: "/images/noir.jpg",
    mua: "Priya Shah",
    model: "Odile Marchetti",
    year: "2024",
    span: "regular",
  },
  {
    slug: "bloom",
    concept: "Bloom",
    category: "Portrait Study",
    image: "/images/bloom.webp",
    mua: "Elena Cross",
    model: "Juno Adebayo",
    year: "2024",
    span: "wide",
  },
  {
    slug: "editorial-no-4",
    concept: "Editorial No. 4",
    category: "Campaign",
    image: "/images/editorial-no-4.webp",
    mua: "Naomi Reyes",
    model: "Lior Ben-David",
    year: "2024",
    span: "regular",
  },
  {
    slug: "gaze",
    concept: "Gaze",
    category: "Portrait Study",
    image: "/images/gaze.webp",
    mua: "Priya Shah",
    model: "Wren Sato",
    year: "2023",
    span: "tall",
  },
  {
    slug: "structure",
    concept: "Structure",
    category: "Editorial",
    image: "/images/structure.webp",
    mua: "Elena Cross",
    model: "Odile Marchetti",
    year: "2023",
    span: "large",
  },
  {
    slug: "muse",
    concept: "Muse",
    category: "Bridal",
    image: "/images/muse.jpg",
    mua: "Naomi Reyes",
    model: "Juno Adebayo",
    year: "2023",
    span: "regular",
  },
];

export const ABOUT_IMAGE = "/images/about.webp";

export const HERO_IMAGE = "/images/hero.webp";
