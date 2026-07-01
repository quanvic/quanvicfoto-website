export type MenuItem =
  | { type: "link"; label: string; href: string }
  | { type: "action"; label: string; action: "booking" };

export const MENU_ITEMS: MenuItem[] = [
  { type: "link", label: "Home", href: "/" },
  { type: "link", label: "Portfolio", href: "/portfolio" },
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
    story:
      "Đôi mắt khép lại, không phải để trốn tránh mà để lắng nghe chính mình. Giữa nền đen tuyệt đối, chiếc nơ voan trắng nổi bật như một hơi thở nhẹ — sự tương phản làm nên vẻ đẹp tĩnh lặng và đầy nội lực.",
  },
  {
    slug: "bloom",
    concept: "Bloom",
    category: "Portrait Study",
    image: "/images/bloom.webp",
    year: "2024",
    span: "wide",
    story:
      "Một cánh hoa Thiên điểu rực rỡ băng ngang gương mặt, nhưng ánh nhìn vẫn thẳng thắn không giấu diếm. Bloom là khoảnh khắc vẻ đẹp tự nhiên bung nở giữa sắc màu, chẳng cần phô trương mà vẫn cuốn hút.",
  },
  {
    slug: "editorial-no-4",
    concept: "Editorial No. 4",
    category: "Campaign",
    image: "/images/editorial-no-4.webp",
    year: "2024",
    span: "regular",
    story:
      "Một đóa hoa nâng niu bên gò má, ánh mắt hướng thẳng ống kính đầy tự tin. Trên nền xanh đêm sâu thẳm, đây là chân dung của một tuyên ngôn thời trang không cần lời.",
  },
  {
    slug: "gaze",
    concept: "Gaze",
    category: "Portrait Study",
    image: "/images/gaze.webp",
    year: "2023",
    span: "tall",
    story:
      "Vòng hoa khô trên mái tóc bồng bềnh, bàn tay khẽ nâng cằm như đang chờ đợi một câu chuyện được kể. Gaze là ánh nhìn chân thật nhất — nơi vẻ đẹp mộc mạc và cảm xúc hòa làm một.",
  },
  {
    slug: "structure",
    concept: "Structure",
    category: "Editorial",
    image: "/images/structure.webp",
    year: "2023",
    span: "large",
    story:
      "Một hình khối voan trắng tưởng như chỉ thuộc về kiến trúc lại ôm trọn gương mặt, cùng ánh nhìn nghiêng đầy thách thức. Structure là nơi kỹ thuật ánh sáng và sự sáng tạo hình khối gặp nhau trong từng đường nét.",
  },
  {
    slug: "muse",
    concept: "Muse",
    category: "Bridal",
    image: "/images/muse.jpg",
    year: "2023",
    span: "regular",
    story:
      "Búi tóc cao, đôi tay đan chéo đầy kiêu hãnh trên nền hồng phấn mộng mơ. Muse là lời tôn vinh dành cho người phụ nữ hiện đại — vừa dịu dàng trong từng lớp ren, vừa mạnh mẽ trong ánh nhìn.",
  },
  {
    slug: "thanh-xuan",
    concept: "Thanh Xuân",
    category: "Skin Study",
    image: "/images/thanh-xuan.webp",
    year: "2025",
    span: "regular",
    story:
      "Nền trắng tinh khôi tôn lên từng đường nét tự nhiên nhất. Thanh Xuân là lát cắt của tuổi trẻ rực rỡ — không cần hậu cảnh cầu kỳ, chỉ cần một ánh nhìn chân thành cũng đủ chạm đến trái tim người xem.",
  },
  {
    slug: "phu-van",
    concept: "Phù Vân",
    category: "Editorial",
    image: "/images/phu-van.webp",
    year: "2025",
    span: "regular",
    story:
      "Ánh sáng chỉ vừa đủ chạm vào một nửa gương mặt, nửa còn lại chìm trong bóng tối đầy ẩn ý. Phù Vân là khoảnh khắc mong manh, thoáng qua như áng mây — đẹp bởi sự không trọn vẹn.",
  },
];

export const ABOUT_IMAGE = "/images/about.webp";

export const HERO_IMAGE = "/images/hero.webp";

export const COURSE_IMAGES: Record<string, string> = {
  basic: "/images/course-basic.webp",
  advanced: "/images/course-advanced.webp",
  mentorship: "/images/course-mentorship.webp",
};
