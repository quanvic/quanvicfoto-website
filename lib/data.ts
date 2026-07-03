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
export const EMAIL = "quanvicfoto@gmail.com";
export const ZALO_URL = "https://zalo.me/0824939333";

// Kept as a single canonical string (not split/translated per language) so
// it stays byte-identical to the Google Business Profile listing — mixing
// address variants across pages/languages hurts local SEO NAP consistency.
export const ADDRESS = {
  street: "248B Phố Huế",
  ward: "Phường Phố Huế",
  district: "Quận Hai Bà Trưng",
  city: "Hà Nội",
  country: "Việt Nam",
  countryCode: "VN",
  full: "248B Phố Huế, Phường Phố Huế, Quận Hai Bà Trưng, Thành phố Hà Nội, Việt Nam",
};

export const GEO = { latitude: "21.01188", longitude: "105.85231" };

// schema.org OpeningHoursSpecification format (day range + 24h times).
export const OPENING_HOURS = "Mo-Su 09:00-21:00";

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
    slug: "bloom",
    concept: "Bloom",
    category: "Portrait Study",
    images: ["/images/bloom.webp", "/images/editorial-no-4.webp"],
    year: "2024",
    span: "wide",
    story:
      "Một cánh hoa Thiên điểu rực rỡ băng ngang gương mặt, khi ánh nhìn thẳng thắn không giấu diếm, khi ánh mắt dịu dàng hướng nghiêng đầy tự tin. Giữa nền đen sâu thẳm và cả sắc xanh đêm, Bloom là khoảnh khắc vẻ đẹp tự nhiên bung nở giữa sắc màu, chẳng cần phô trương mà vẫn cuốn hút.",
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
    images: ["/images/structure.webp", "/images/noir.jpg", "/images/structure-3.webp"],
    year: "2023",
    span: "large",
    story:
      "Một hình khối voan trắng tưởng như chỉ thuộc về kiến trúc lại ôm trọn gương mặt — khi ánh nhìn nghiêng đầy thách thức hướng thẳng ống kính, khi đôi mắt khép lại để lắng nghe chính mình. Giữa nền đen tuyệt đối, Structure là nơi kỹ thuật ánh sáng, sự sáng tạo hình khối và nội lực tĩnh lặng gặp nhau trong từng đường nét.",
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
  {
    slug: "rang-ro",
    concept: "Rạng Rỡ",
    category: "Colour Story",
    images: ["/images/rang-ro.webp"],
    year: "2025",
    span: "tall",
    story:
      "Sắc đỏ cam rực cháy hoà cùng ánh nhìn cương nghị, không một chút rụt rè. Rạng Rỡ là khoảnh khắc vẻ đẹp bừng sáng từ bên trong, tự tin đối diện ống kính như đối diện chính mình.",
  },
  {
    slug: "yeu-kieu",
    concept: "Yêu Kiều",
    category: "Bridal",
    images: ["/images/yeu-kieu.webp"],
    year: "2025",
    span: "regular",
    story:
      "Tấm voan ngà mềm mại buông xuống bờ vai trần, ánh nhìn nghiêng dịu dàng giữa nền nâu trầm ấm áp. Yêu Kiều là nét đẹp cổ điển không tuổi — nhẹ nhàng mà đầy sức hút.",
  },
  {
    slug: "anh-kim",
    concept: "Ánh Kim",
    category: "Editorial",
    images: ["/images/anh-kim.webp", "/images/anh-kim-2.webp", "/images/anh-kim-3.webp"],
    year: "2024",
    span: "wide",
    story:
      "Chất liệu ánh kim lấp lánh ôm lấy dáng vóc thanh thoát giữa không gian đô thị hiện đại. Ánh Kim là lời khẳng định của một vẻ đẹp sắc sảo, tự do bước đi giữa phố thị mà không hề hoà lẫn.",
  },
  {
    slug: "hoai-co",
    concept: "Hoài Cổ",
    category: "Colour Story",
    images: ["/images/hoai-co.webp"],
    year: "2024",
    span: "regular",
    story:
      "Sắc đỏ truyền thống tôn lên làn da và ánh mắt đầy hoài niệm. Hoài Cổ là lát cắt giữa xưa và nay, nơi vẻ đẹp Á Đông được kể lại bằng một ngôn ngữ rất riêng.",
  },
  {
    slug: "tinh-te",
    concept: "Tinh Tế",
    category: "Skin Study",
    images: ["/images/tinh-te.webp"],
    year: "2025",
    span: "tall",
    story:
      "Không cầu kỳ, không phụ kiện, chỉ có làn da thật được ánh sáng nâng niu từng milimet. Tinh Tế là bản chất của vẻ đẹp — giản đơn mà đầy tinh tế.",
  },
  {
    slug: "guong-xua",
    concept: "Gương Xưa",
    category: "Editorial",
    images: ["/images/guong-xua.webp", "/images/guong-xua-2.webp", "/images/guong-xua-3.webp"],
    year: "2025",
    span: "wide",
    story:
      "Mái tóc dợn sóng kiểu xưa phản chiếu trong gương, gợi nhắc một thời hoàng kim đã qua. Gương Xưa là hành trình ngược dòng thời gian, nơi vẻ đẹp cổ điển được tái hiện đầy tinh tế.",
  },
  {
    slug: "nguyen-uoc",
    concept: "Nguyện Ước",
    category: "Bridal",
    images: [
      "/images/nguyen-uoc.webp",
      "/images/nguyen-uoc-2.webp",
      "/images/nguyen-uoc-3.webp",
      "/images/nguyen-uoc-4.webp",
    ],
    year: "2025",
    span: "large",
    story:
      "Chiếc váy ren trắng ôm trọn dáng hình mảnh mai, mái tóc dợn sóng gợi nhắc vẻ đẹp cổ điển vượt thời gian. Nguyện Ước là lời hứa hẹn thầm lặng trước ngưỡng cửa hôn nhân — tinh khôi và trọn vẹn.",
  },
  {
    slug: "lung-linh",
    concept: "Lung Linh",
    category: "Portrait Study",
    images: ["/images/lung-linh.webp"],
    year: "2026",
    span: "tall",
    story:
      "Từng hạt cườm lấp lánh phản chiếu ánh sáng giữa nền đen huyền bí. Lung Linh là khoảnh khắc rực rỡ nhất — nơi sự quyến rũ được tôn vinh bằng ánh sáng và bóng tối hoà quyện.",
  },
  {
    slug: "bach-lan",
    concept: "Bạch Lan",
    category: "Portrait Study",
    images: ["/images/bach-lan.webp", "/images/bach-lan-2.webp", "/images/bach-lan-3.webp"],
    year: "2026",
    span: "wide",
    story:
      "Đoá lan trắng tinh khôi cài trên mái tóc buông giữa nền đen sâu thẳm. Bạch Lan là biểu tượng của vẻ đẹp thuần khiết, kiêu sa mà không phô trương.",
  },
  {
    slug: "du-muc",
    concept: "Du Mục",
    category: "Portrait Study",
    images: ["/images/du-muc.webp", "/images/du-muc-2.webp", "/images/du-muc-3.webp"],
    year: "2024",
    span: "large",
    story:
      "Vòng hoa khô mộc mạc trên mái tóc rối bồng bềnh, đôi khi khẽ phủ qua làn voan mỏng. Du Mục là tinh thần tự do phóng khoáng — vẻ đẹp hoang dại mà vẫn dịu dàng đến lạ.",
  },
  {
    slug: "pho-thi",
    concept: "Phố Thị",
    category: "Campaign",
    images: ["/images/pho-thi.webp", "/images/pho-thi-2.webp", "/images/pho-thi-3.webp"],
    year: "2021",
    span: "wide",
    story:
      "Bộ vest đen sang trọng sải bước giữa lòng phố cổ Hà Nội, ánh đèn đường hắt lên gương mặt đầy khí chất. Phố Thị là chân dung người phụ nữ hiện đại — bản lĩnh, độc lập và không ngừng chuyển động.",
  },
  {
    slug: "tich-lang",
    concept: "Tịch Lặng",
    category: "Black & White",
    images: ["/images/tich-lang.webp", "/images/tich-lang-2.webp", "/images/tich-lang-3.webp"],
    year: "2024",
    span: "large",
    story:
      "Đen trắng tuyệt đối, chỉ còn lại đường nét gương mặt và ánh sáng khắc hoạ từng biểu cảm. Tịch Lặng là khoảnh khắc tĩnh lặng nhất — nơi cảm xúc được kể bằng im lặng thay vì lời nói.",
  },
  {
    slug: "giot-suong",
    concept: "Giọt Sương",
    category: "Colour Story",
    images: ["/images/giot-suong.webp", "/images/giot-suong-2.webp"],
    year: "2024",
    span: "regular",
    story:
      "Những hạt ngọc trai điểm nhẹ trên gương mặt ướt sương giữa nền xanh sâu thẳm. Giọt Sương là khoảnh khắc mong manh, trong trẻo như buổi sớm mai chưa kịp tan.",
  },
  {
    slug: "trong-treo",
    concept: "Trong Trẻo",
    category: "Skin Study",
    images: ["/images/trong-treo.webp", "/images/trong-treo-2.webp", "/images/trong-treo-3.webp"],
    year: "2024",
    span: "wide",
    story:
      "Những cánh hoa trắng nhỏ điểm nhẹ trên mái tóc, làn da căng mịn dưới ánh sáng dịu dàng. Trong Trẻo là vẻ đẹp thanh xuân nguyên bản — không cần che giấu, chỉ cần được nhìn thấy.",
  },
  {
    slug: "e-ap",
    concept: "E Ấp",
    category: "Skin Study",
    images: ["/images/e-ap.webp", "/images/e-ap-2.webp", "/images/e-ap-3.webp"],
    year: "2023",
    span: "wide",
    story:
      "Đôi má ửng hồng, bờ vai trần khẽ nghiêng như đang giấu một nụ cười. E Ấp là nét duyên thầm kín của người con gái — e dè mà vẫn đầy cuốn hút.",
  },
  {
    slug: "cam-do",
    concept: "Cám Dỗ",
    category: "Campaign",
    images: ["/images/cam-do.webp", "/images/cam-do-2.webp", "/images/cam-do-3.webp"],
    year: "2025",
    span: "large",
    story:
      "Trái táo đỏ mọng trong tay, ánh mắt lơ đãng giữa nền đỏ rực như một câu chuyện cổ tích được kể lại. Cám Dỗ là sự quyến rũ tinh nghịch, vừa ngây thơ vừa đầy toan tính.",
  },
  {
    slug: "dem-huyen",
    concept: "Đêm Huyền",
    category: "Portrait Study",
    images: ["/images/dem-huyen.webp"],
    year: "2023",
    span: "tall",
    story:
      "Ánh sáng le lói giữa bóng tối, từng hạt sequin lấp lánh như những vì sao lạc giữa đêm. Đêm Huyền là vẻ đẹp bí ẩn, quyến rũ trong từng khoảnh khắc mờ ảo.",
  },
  {
    slug: "quyen-ru",
    concept: "Quyến Rũ",
    category: "Portrait Study",
    images: ["/images/quyen-ru.webp", "/images/quyen-ru-2.webp", "/images/quyen-ru-3.webp"],
    year: "2023",
    span: "wide",
    story:
      "Dáng vóc mềm mại buông lơi trên nền da đen bóng, mái tóc xoăn bồng bềnh phủ qua bờ vai trần. Quyến Rũ là vẻ đẹp tự tin và phóng khoáng — không ngại tỏa sáng theo cách riêng.",
  },
  {
    slug: "mong-mo",
    concept: "Mộng Mơ",
    category: "Portrait Study",
    images: ["/images/mong-mo.webp", "/images/mong-mo-2.webp", "/images/mong-mo-3.webp"],
    year: "2024",
    span: "large",
    story:
      "Cánh hoa Thiên điểu cam rực áp nhẹ lên gò má, lớp lụa tím nhạt buông mềm giữa nền xanh đêm. Mộng Mơ là giấc mơ được dệt bằng sắc màu và ánh sáng — dịu dàng mà đầy mê hoặc.",
  },
  {
    slug: "hong-nhung",
    concept: "Hồng Nhung",
    category: "Colour Story",
    images: ["/images/hong-nhung.webp", "/images/hong-nhung-2.webp", "/images/hong-nhung-3.webp"],
    year: "2023",
    span: "wide",
    story:
      "Cụm hoa cẩm tú cầu hồng thẫm rực rỡ trên nền đỏ nhung, chiếc bình sứ lam cổ điển gợi nét hoài cổ tinh tế. Hồng Nhung là bản giao hưởng của sắc màu — rực rỡ nhưng vẫn giữ trọn nét thanh lịch.",
  },
  {
    slug: "co-tich",
    concept: "Cổ Tích",
    category: "Editorial",
    images: ["/images/co-tich.webp", "/images/co-tich-2.webp", "/images/co-tich-3.webp"],
    year: "2024",
    span: "large",
    story:
      "Đôi tai tiên lấp ló sau mái tóc rối, giọt lệ pha ánh nhũ lăn dài trên gò má như bước ra từ một câu chuyện cổ tích. Cổ Tích là thế giới huyền ảo nơi vẻ đẹp và cảm xúc hoà làm một.",
  },
  {
    slug: "khoi-dau",
    concept: "Khởi Đầu",
    category: "Bridal",
    images: ["/images/khoi-dau.webp", "/images/khoi-dau-2.webp", "/images/khoi-dau-3.webp"],
    year: "2023",
    span: "wide",
    story:
      "Tấm voan ren tinh xảo buông nhẹ trên nền trắng tinh khôi, ánh nhìn vừa e ấp vừa đầy hy vọng. Khởi Đầu là khoảnh khắc thiêng liêng trước một hành trình mới — dịu dàng và trọn vẹn niềm tin.",
  },
  {
    slug: "nhe-nhang",
    concept: "Nhẹ Nhàng",
    category: "Skin Study",
    images: ["/images/nhe-nhang.webp", "/images/nhe-nhang-2.webp", "/images/nhe-nhang-3.webp"],
    year: "2023",
    span: "regular",
    story:
      "Lớp lụa ngà mềm mại ôm nhẹ bờ vai trần trên nền xám thanh lịch. Nhẹ Nhàng là vẻ đẹp tối giản nhưng không hề đơn điệu — mỗi đường nét đều được ánh sáng kể lại bằng sự tinh tế.",
  },
  {
    slug: "bang-tuyet",
    concept: "Băng Tuyết",
    category: "Portrait Study",
    images: ["/images/bang-tuyet.webp", "/images/bang-tuyet-2.webp", "/images/bang-tuyet-3.webp"],
    year: "2024",
    span: "wide",
    story:
      "Lông vũ trắng muốt phủ nhẹ trên mái tóc, chuỗi ngọc trai ôm quanh cổ như những bông tuyết đầu mùa. Băng Tuyết là vẻ đẹp thanh khiết, lạnh lùng mà vẫn ấm áp trong từng ánh nhìn.",
  },
  {
    slug: "lap-lanh",
    concept: "Lấp Lánh",
    category: "Campaign",
    images: ["/images/lap-lanh.webp", "/images/lap-lanh-2.webp", "/images/lap-lanh-3.webp"],
    year: "2023",
    span: "regular",
    story:
      "Từng viên đá quý lấp lánh nơi vành tai, cổ tay điểm xuyết trên nền chất liệu dệt kim mềm mại. Lấp Lánh là câu chuyện của những chi tiết nhỏ làm nên vẻ đẹp hoàn chỉnh.",
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
