"use client";

import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";

export type Lang = "en" | "vi";

export const CATEGORY_LABELS: Record<string, Record<Lang, string>> = {
  "Skin Study": { en: "Skin Study", vi: "Nghiên cứu da" },
  "Colour Story": { en: "Colour Story", vi: "Câu chuyện màu sắc" },
  Editorial: { en: "Editorial", vi: "Editorial" },
  "Portrait Study": { en: "Portrait Study", vi: "Nghiên cứu chân dung" },
  Campaign: { en: "Campaign", vi: "Chiến dịch" },
  "Black & White": { en: "Black & White", vi: "Đen & Trắng" },
  Bridal: { en: "Bridal", vi: "Cô dâu" },
};

export interface Dictionary {
  nav: {
    home: string;
    portfolio: string;
    booking: string;
    about: string;
    contact: string;
  };
  menu: {
    toggleOpen: string;
    toggleClose: string;
    tagline: string;
  };
  hero: {
    kicker: string;
    titleTop: string;
    titleItalic: string;
    titleRest: string;
    subtitle: string;
    scroll: string;
  };
  marquee: string[];
  home: {
    selectedWork: {
      kicker: string;
      heading: string;
      cta: string;
    };
    about: {
      kicker: string;
      heading: string;
      yearsValue: string;
      yearsLabel: string;
      body: string[];
      cta: string;
      imageAlt: string;
    };
  };
  contactCTA: {
    kicker: string;
    heading: string;
    headingItalic: string;
    cta: string;
  };
  footer: {
    rights: string;
    booking: string;
    contact: string;
  };
  aboutPage: {
    metaTitle: string;
    kicker: string;
    heading: string;
    body: string[];
    imageAlt: string;
    approachKicker: string;
    approach: { title: string; body: string }[];
    stats: { value: string; label: string }[];
    heroImageAlt: string;
  };
  portfolioPage: {
    metaTitle: string;
    kicker: string;
    heading: string;
    body: string;
  };
  contactPage: {
    kicker: string;
    heading: string;
    body: string;
    nameLabel: string;
    emailLabel: string;
    projectLabel: string;
    messageLabel: string;
    projectOptions: { value: string; label: string }[];
    submitIdle: string;
    submitSending: string;
    submitSent: string;
    submitError: string;
    srSent: string;
  };
  booking: {
    kicker: string;
    heading: string;
    intro: string;
    nameLabel: string;
    contactLabel: string;
    dateLabel: string;
    conceptLabel: string;
    conceptPlaceholder: string;
    conceptOther: string;
    messageLabel: string;
    imagesLabel: string;
    imagesHint: string;
    imagesAdd: string;
    imagesRemove: string;
    imagesTooMany: string;
    imagesTooLarge: string;
    submitIdle: string;
    submitSending: string;
    submitError: string;
    close: string;
    closeAria: string;
    successKicker: string;
    successMessage: string;
  };
}

const dictionaries: Record<Lang, Dictionary> = {
  en: {
    nav: {
      home: "Home",
      portfolio: "Portfolio",
      booking: "Booking",
      about: "About",
      contact: "Contact",
    },
    menu: {
      toggleOpen: "Menu",
      toggleClose: "Close",
      tagline:
        "Editorial beauty photography — skin, light, and the architecture of a face.",
    },
    hero: {
      kicker: "Editorial Beauty Photography",
      titleTop: "The Art of",
      titleItalic: "Close",
      titleRest: "Attention",
      subtitle:
        "Skin, light, and the architecture of a face — photographed with precision by Quân Vic Foto.",
      scroll: "Scroll",
    },
    marquee: ["Skin", "Light", "Detail", "Structure", "Editorial", "Beauty"],
    home: {
      selectedWork: {
        kicker: "02 — Selected Work",
        heading: "A study in skin, light, and expression.",
        cta: "View full portfolio",
      },
      about: {
        kicker: "01 — About",
        heading: "Quân Vic Foto | Beauty Photographer",
        yearsValue: "11+",
        yearsLabel: "Years of professional photography experience",
        body: [
          "Quân Vic Foto has become synonymous with striking, aesthetically refined Beauty & Fashion imagery. My strength lies in the art of close-up portraiture — where precise lighting, vivid skin texture, and the model's presence converge in their sharpest, most compelling form.",
        ],
        cta: "Learn more about my process",
        imageAlt: "Quân Vic Foto photographing a shoot with a Fujifilm camera",
      },
    },
    contactCTA: {
      kicker: "Enquiries & Bookings",
      heading: "Let's create something",
      headingItalic: "unforgettable",
      cta: "Start a project",
    },
    footer: {
      rights: "All rights reserved.",
      booking: "Booking",
      contact: "Contact",
    },
    aboutPage: {
      metaTitle: "About — Quân Vic Foto",
      kicker: "About",
      heading: "Quân Vic Foto | Beauty Photographer",
      body: [
        "With more than 11 years of professional photography experience, Quân Vic Foto has become synonymous with striking, aesthetically refined Beauty & Fashion imagery. My strength lies in the art of close-up portraiture — where precise lighting, vivid skin texture, and the model's presence converge in their sharpest, most compelling form.",
        "My career is proven not only through collaborations with major cosmetics brands and professional Makeup Artist teams on Editorial & Advertising projects, but also affirmed through my role as a Speaker at Fujifilm Vietnam.",
        "I consistently pursue a minimal, modern photographic style — striving for perfection while preserving the natural, authentic beauty of the subject.",
      ],
      imageAlt: "Quân Vic Foto photographing a shoot with a Fujifilm camera",
      approachKicker: "Approach",
      approach: [
        {
          title: "Light First",
          body: "Every shoot begins with a single light study — hard, soft, or split — before a single frame is exposed.",
        },
        {
          title: "Work With M.U.A.",
          body: "Beauty photography lives or dies on the makeup. I work closely with artists from concept through final retouch.",
        },
        {
          title: "Real Skin Texture",
          body: "Retouching preserves pores and texture rather than erasing them. Real skin reads as luxury.",
        },
      ],
      stats: [
        { value: "11+", label: "Years of Experience" },
        { value: "60+", label: "Editorial Features" },
        { value: "120+", label: "Brand Campaigns" },
      ],
      heroImageAlt: "Editorial beauty portrait, close-up detail of skin and light",
    },
    portfolioPage: {
      metaTitle: "Portfolio — Quân Vic Foto",
      kicker: "Portfolio",
      heading: "Editorial & campaign work, 2023–2025.",
      body: "A selection of beauty stories shot for magazines, agencies, and independent makeup artists. Each frame is built around a single idea — a texture, a colour, a gesture.",
    },
    contactPage: {
      kicker: "Contact",
      heading: "Tell me about your project.",
      body: "For bookings, collaborations, or press enquiries, use the form or email directly. I typically reply within two business days.",
      nameLabel: "Name",
      emailLabel: "Email",
      projectLabel: "Project type",
      messageLabel: "Message",
      projectOptions: [
        { value: "editorial", label: "Editorial" },
        { value: "campaign", label: "Brand campaign" },
        { value: "portfolio", label: "M.U.A. portfolio" },
        { value: "other", label: "Other" },
      ],
      submitIdle: "Send message",
      submitSending: "Sending…",
      submitSent: "Message sent",
      submitError: "Something went wrong. Please try again or email directly.",
      srSent: "Your message has been sent.",
    },
    booking: {
      kicker: "Booking",
      heading: "Book a Shoot",
      intro:
        "Fill in the details below and I'll follow up to confirm your session.",
      nameLabel: "Full Name",
      contactLabel: "Phone / Email",
      dateLabel: "Preferred Date",
      conceptLabel: "Desired Concept",
      conceptPlaceholder: "Choose a reference concept",
      conceptOther: "Other / Not sure yet",
      messageLabel: "Additional Notes",
      imagesLabel: "Reference Images",
      imagesHint: "Up to 10 images, 4MB each",
      imagesAdd: "Add images",
      imagesRemove: "Remove image",
      imagesTooMany: "You can attach up to 10 images.",
      imagesTooLarge: "Each image must be under 4MB.",
      submitIdle: "Send Request",
      submitSending: "Sending…",
      submitError: "Something went wrong. Please try again or call directly.",
      close: "Close",
      closeAria: "Close booking form",
      successKicker: "Thank You",
      successMessage: "Your request has been received. We'll be in touch shortly.",
    },
  },
  vi: {
    nav: {
      home: "Trang chủ",
      portfolio: "Portfolio",
      booking: "Đặt lịch",
      about: "Giới thiệu",
      contact: "Liên hệ",
    },
    menu: {
      toggleOpen: "Menu",
      toggleClose: "Đóng",
      tagline:
        "Nhiếp ảnh Beauty Editorial — làn da, ánh sáng và cấu trúc gương mặt.",
    },
    hero: {
      kicker: "Nhiếp Ảnh Beauty Editorial",
      titleTop: "Vẻ Đẹp",
      titleItalic: "Cận",
      titleRest: "Cảnh",
      subtitle:
        "Làn da, ánh sáng và cấu trúc gương mặt — được ghi lại chính xác đến từng chi tiết bởi Quân Vic Foto.",
      scroll: "Cuộn",
    },
    marquee: ["Da", "Ánh Sáng", "Chi Tiết", "Cấu Trúc", "Editorial", "Beauty"],
    home: {
      selectedWork: {
        kicker: "02 — Tác Phẩm Chọn Lọc",
        heading: "Một hành trình khám phá làn da, ánh sáng và cảm xúc.",
        cta: "Xem toàn bộ portfolio",
      },
      about: {
        kicker: "01 — Giới thiệu",
        heading: "Quân Vic Foto | Beauty Photographer",
        yearsValue: "11+",
        yearsLabel: "Năm kinh nghiệm nhiếp ảnh chuyên nghiệp",
        body: [
          "Quân Vic Foto là cái tên gắn liền với những khung hình Beauty & Fashion đầy tính thẩm mỹ. Thế mạnh của tôi nằm ở nghệ thuật chụp chân dung cận cảnh — nơi sự giao thoa giữa ánh sáng chuẩn xác, kết cấu làn da sống động và thần thái người mẫu được tôn vinh một cách sắc nét nhất.",
        ],
        cta: "Tìm hiểu thêm về quy trình làm việc",
        imageAlt: "Quân Vic Foto đang tác nghiệp với máy ảnh Fujifilm",
      },
    },
    contactCTA: {
      kicker: "Liên Hệ & Đặt Lịch",
      heading: "Cùng nhau tạo nên điều",
      headingItalic: "khó quên",
      cta: "Bắt đầu dự án",
    },
    footer: {
      rights: "Tất cả quyền được bảo lưu.",
      booking: "Đặt lịch",
      contact: "Liên hệ",
    },
    aboutPage: {
      metaTitle: "Giới thiệu — Quân Vic Foto",
      kicker: "Giới thiệu",
      heading: "Quân Vic Foto | Beauty Photographer",
      body: [
        "Với hơn 11 năm kinh nghiệm trong ngành nhiếp ảnh chuyên nghiệp, Quân Vic Foto là cái tên gắn liền với những khung hình Beauty & Fashion đầy tính thẩm mỹ. Thế mạnh của tôi nằm ở nghệ thuật chụp chân dung cận cảnh — nơi sự giao thoa giữa ánh sáng chuẩn xác, kết cấu làn da sống động và thần thái người mẫu được tôn vinh một cách sắc nét nhất.",
        "Hành trình nghề nghiệp của tôi không chỉ được minh chứng qua việc hợp tác cùng các thương hiệu mỹ phẩm lớn và đội ngũ Makeup Artist chuyên nghiệp trong các dự án Editorial & Advertising, mà còn được khẳng định qua vai trò Diễn giả tại Fujifilm Việt Nam.",
        "Tôi luôn theo đuổi phong cách nhiếp ảnh tối giản, hiện đại, hướng tới sự hoàn mỹ nhưng vẫn giữ trọn vẹn vẻ đẹp tự nhiên và nguyên bản của chủ thể.",
      ],
      imageAlt: "Quân Vic Foto đang tác nghiệp với máy ảnh Fujifilm",
      approachKicker: "Quy trình làm việc",
      approach: [
        {
          title: "Ánh sáng là ưu tiên hàng đầu",
          body: "Mỗi buổi chụp bắt đầu bằng việc nghiên cứu ánh sáng — cứng, mềm hay xẻ đôi — trước khi bấm máy khung hình đầu tiên.",
        },
        {
          title: "Đồng hành cùng M.U.A.",
          body: "Nhiếp ảnh Beauty thành công phụ thuộc rất lớn vào trang điểm. Tôi làm việc sát sao với các Makeup Artist từ ý tưởng đến hậu kỳ cuối cùng.",
        },
        {
          title: "Tôn trọng kết cấu da thật",
          body: "Hậu kỳ chỉ để giữ lại lỗ chân lông và kết cấu da tự nhiên, không xoá bỏ chúng. Làn da thật mới là sự sang trọng thực sự.",
        },
      ],
      stats: [
        { value: "11+", label: "Năm kinh nghiệm" },
        { value: "60+", label: "Ấn phẩm & editorial" },
        { value: "120+", label: "Chiến dịch thương hiệu" },
      ],
      heroImageAlt: "Chân dung beauty editorial, cận cảnh chi tiết da và ánh sáng",
    },
    portfolioPage: {
      metaTitle: "Portfolio — Quân Vic Foto",
      kicker: "Portfolio",
      heading: "Các dự án editorial & chiến dịch, 2023–2025.",
      body: "Tuyển tập những câu chuyện làm đẹp được thực hiện cho tạp chí, agency và các Makeup Artist độc lập. Mỗi khung hình được xây dựng quanh một ý tưởng — một kết cấu, một màu sắc, một cử chỉ.",
    },
    contactPage: {
      kicker: "Liên hệ",
      heading: "Hãy kể tôi nghe về dự án của bạn.",
      body: "Với các yêu cầu đặt lịch, hợp tác hoặc báo chí, hãy điền vào form hoặc gửi email trực tiếp. Tôi thường phản hồi trong vòng 2 ngày làm việc.",
      nameLabel: "Họ và tên",
      emailLabel: "Email",
      projectLabel: "Loại dự án",
      messageLabel: "Lời nhắn",
      projectOptions: [
        { value: "editorial", label: "Editorial" },
        { value: "campaign", label: "Chiến dịch thương hiệu" },
        { value: "portfolio", label: "Portfolio M.U.A" },
        { value: "other", label: "Khác" },
      ],
      submitIdle: "Gửi tin nhắn",
      submitSending: "Đang gửi…",
      submitSent: "Đã gửi tin nhắn",
      submitError: "Đã có lỗi xảy ra. Vui lòng thử lại hoặc gửi email trực tiếp.",
      srSent: "Tin nhắn của bạn đã được gửi.",
    },
    booking: {
      kicker: "Booking",
      heading: "Đặt lịch chụp hình",
      intro: "Điền thông tin bên dưới, tôi sẽ liên hệ lại để xác nhận buổi chụp.",
      nameLabel: "Họ và tên",
      contactLabel: "Số điện thoại / Email",
      dateLabel: "Ngày dự kiến",
      conceptLabel: "Concept mong muốn",
      conceptPlaceholder: "Chọn concept tham khảo",
      conceptOther: "Khác / Chưa chắc chắn",
      messageLabel: "Ghi chú thêm",
      imagesLabel: "Hình ảnh mong muốn",
      imagesHint: "Tối đa 10 ảnh, mỗi ảnh dưới 4MB",
      imagesAdd: "Thêm ảnh",
      imagesRemove: "Xoá ảnh",
      imagesTooMany: "Bạn chỉ có thể đính kèm tối đa 10 ảnh.",
      imagesTooLarge: "Mỗi ảnh phải dưới 4MB.",
      submitIdle: "Gửi yêu cầu",
      submitSending: "Đang gửi…",
      submitError: "Đã có lỗi xảy ra. Vui lòng thử lại hoặc gọi trực tiếp.",
      close: "Đóng",
      closeAria: "Đóng form đặt lịch",
      successKicker: "Cảm ơn bạn",
      successMessage:
        "Yêu cầu của bạn đã được ghi nhận. Chúng tôi sẽ liên hệ lại sớm nhất.",
    },
  },
};

type LanguageContextValue = {
  lang: Lang;
  setLang: (lang: Lang) => void;
  t: Dictionary;
};

const LanguageContext = createContext<LanguageContextValue | null>(null);

const STORAGE_KEY = "qvf-lang";

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [lang, setLangState] = useState<Lang>("vi");

  useEffect(() => {
    const stored = window.localStorage.getItem(STORAGE_KEY);
    if (stored === "en" || stored === "vi") {
      setLangState(stored);
    }
  }, []);

  const setLang = (next: Lang) => {
    setLangState(next);
    window.localStorage.setItem(STORAGE_KEY, next);
  };

  const value = useMemo<LanguageContextValue>(
    () => ({ lang, setLang, t: dictionaries[lang] }),
    [lang],
  );

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const ctx = useContext(LanguageContext);
  if (!ctx) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return ctx;
}
