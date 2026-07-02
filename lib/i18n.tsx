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
    shop: string;
    courses: string;
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
  shopPage: {
    metaTitle: string;
    kicker: string;
    heading: string;
    body: string;
    protectedNote: string;
    licenseLabel: string;
    licenseOptions: { value: string; label: string; description: string }[];
    ctaLabel: string;
    modal: {
      kicker: string;
      heading: string;
      intro: string;
      productLabel: string;
      nameLabel: string;
      contactLabel: string;
      licenseFieldLabel: string;
      licensePlaceholder: string;
      messageLabel: string;
      submitIdle: string;
      submitSending: string;
      submitError: string;
      close: string;
      closeAria: string;
      successKicker: string;
      successMessage: string;
    };
  };
  coursesPage: {
    metaTitle: string;
    kicker: string;
    heading: string;
    body: string;
    ctaLabel: string;
    courses: {
      slug: string;
      title: string;
      level: string;
      format: string;
      duration: string;
      price: string;
      description: string;
      highlights: string[];
    }[];
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
      shop: "Shop",
      courses: "Courses",
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
      titleTop: "Where Singular",
      titleItalic: "Beauty",
      titleRest: "Shines",
      subtitle:
        "Every face is a work of art. Quân Vic Foto helps you preserve your most radiant moments with dedication, refinement, and frames that touch the heart.",
      scroll: "Scroll",
    },
    marquee: ["Skin", "Light", "Detail", "Structure", "Editorial", "Beauty"],
    home: {
      selectedWork: {
        kicker: "02 — Selected Work",
        heading: "Moments Worth Treasuring",
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
      cta: "Let's create together",
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
    shopPage: {
      metaTitle: "Shop — Quân Vic Foto",
      kicker: "Print & Licensing Shop",
      heading: "Own a piece of the story.",
      body: "Selected pieces from the portfolio, available to license for personal or commercial use, or as large-format prints. Every preview here is watermarked — the piece you receive is not.",
      protectedNote:
        "Previews are protected and watermarked. Full-resolution, unwatermarked files are delivered only after your request is confirmed.",
      licenseLabel: "Licensing options",
      licenseOptions: [
        {
          value: "personal",
          label: "Personal",
          description: "Personal printing and private use — not for commercial use.",
        },
        {
          value: "commercial",
          label: "Commercial",
          description: "Use in advertising, products, or commercial publications.",
        },
        {
          value: "print",
          label: "Large-format print",
          description: "High-resolution file prepared for gallery-quality large prints.",
        },
      ],
      ctaLabel: "Request to license this piece",
      modal: {
        kicker: "Shop Enquiry",
        heading: "Request this piece",
        intro:
          "Tell me which licence you need and I'll follow up with pricing and delivery.",
        productLabel: "Piece",
        nameLabel: "Full Name",
        contactLabel: "Phone / Email",
        licenseFieldLabel: "Licence needed",
        licensePlaceholder: "Choose a licence",
        messageLabel: "Additional Notes",
        submitIdle: "Send Request",
        submitSending: "Sending…",
        submitError: "Something went wrong. Please try again or call directly.",
        close: "Close",
        closeAria: "Close shop enquiry form",
        successKicker: "Thank You",
        successMessage: "Your request has been received. We'll be in touch shortly.",
      },
    },
    coursesPage: {
      metaTitle: "Courses — Quân Vic Foto",
      kicker: "Photography Courses",
      heading: "Learn to see light the way I do.",
      body: "Over 11 years of shooting beauty and fashion, distilled into hands-on courses — for anyone who wants to move from taking pictures to making images that hold a story.",
      ctaLabel: "Enquire about this course",
      courses: [
        {
          slug: "basic",
          title: "Beauty Photography Fundamentals",
          level: "Beginner",
          format: "In-studio, small group",
          duration: "7 sessions",
          price: "20,000,000₫",
          description:
            "Camera fundamentals, working with a single light source, and directing a model with confidence — plus a foundation in basic Photoshop retouching, so you leave with a finished, edited beauty portrait, not just a raw file.",
          highlights: [
            "Light shaping: hard, soft, and split light",
            "Posing and directing a first-time model",
            "Composition and framing for close-up beauty",
            "Basic Photoshop retouching fundamentals",
          ],
        },
        {
          slug: "advanced",
          title: "Advanced Lighting & Editorial Craft",
          level: "Advanced",
          format: "In-studio, small group",
          duration: "10 sessions",
          price: "30,000,000₫",
          description:
            "For photographers who already shoot but want editorial-grade results — multi-light setups, working alongside a M.U.A., and advanced Photoshop retouching for a portfolio brands actually notice.",
          highlights: [
            "Multi-light studio setups for editorial work",
            "Collaborating with makeup artists and stylists",
            "Retouching that preserves real skin texture",
            "Advanced Photoshop compositing and retouching",
          ],
        },
        {
          slug: "pathway",
          title: "Complete Pathway — Beginner to Advanced",
          level: "Beginner to Advanced",
          format: "In-studio + ongoing remote support",
          duration: "3–6 months",
          price: "60,000,000₫",
          description:
            "The full journey in one program — fundamentals, advanced lighting, and Photoshop retouching, paced over months with real shoots and hands-on guidance so you build an actual body of work, not just notes.",
          highlights: [
            "Month 1: Camera & lighting fundamentals, working with models, basic Photoshop",
            "Months 2–3: Multi-light editorial setups, working with a M.U.A., advanced Photoshop",
            "Months 4–6: Real shoots, portfolio building, and personal style — with hands-on guidance throughout",
          ],
        },
        {
          slug: "mentorship",
          title: "1:1 Mentorship",
          level: "All levels",
          format: "Private, remote or in-person",
          duration: "5 sessions",
          price: "50,000,000₫",
          description:
            "Direct, focused guidance on your own work — portfolio reviews, shoot planning, honest feedback, and hands-on retouching, from someone who's built a career doing exactly what you want to do.",
          highlights: [
            "Session 1: Assessment & direction — portfolio review, goal-setting, a personalised roadmap",
            "Session 2: Lighting & concept practice tailored to your style",
            "Session 3: Live shoot with direct 1:1 coaching",
            "Session 4: In-depth retouching session — Photoshop, refining your output",
            "Session 5: Wrap-up — portfolio and personal brand growth strategy",
          ],
        },
      ],
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
      shop: "Mua ảnh",
      courses: "Khoá học",
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
      titleTop: "Nơi Vẻ Đẹp",
      titleItalic: "Độc Bản",
      titleRest: "Tỏa Sáng",
      subtitle:
        "Mỗi gương mặt là một tác phẩm nghệ thuật. Quân Vic Foto giúp bạn lưu giữ những khoảnh khắc rực rỡ nhất bằng sự tâm huyết, tinh tế và những khung hình chạm đến cảm xúc.",
      scroll: "Cuộn",
    },
    marquee: ["Da", "Ánh Sáng", "Chi Tiết", "Cấu Trúc", "Editorial", "Beauty"],
    home: {
      selectedWork: {
        kicker: "02 — Tác Phẩm Chọn Lọc",
        heading: "Những Khoảnh Khắc Đáng Giá",
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
      cta: "Cùng tạo nên điều đặc biệt",
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
    shopPage: {
      metaTitle: "Mua ảnh — Quân Vic Foto",
      kicker: "Mua Bản Quyền & In Ấn",
      heading: "Sở hữu một phần của câu chuyện.",
      body: "Những tác phẩm chọn lọc từ portfolio, sẵn sàng để mua bản quyền sử dụng cá nhân, thương mại hoặc in ấn khổ lớn. Mọi ảnh xem trước tại đây đều có watermark bảo vệ — bản bạn nhận được thì không.",
      protectedNote:
        "Ảnh xem trước đã được bảo vệ và đóng watermark. File gốc độ phân giải đầy đủ, không watermark chỉ được gửi sau khi yêu cầu của bạn được xác nhận.",
      licenseLabel: "Các gói bản quyền",
      licenseOptions: [
        {
          value: "personal",
          label: "Cá nhân",
          description: "In ấn, sử dụng riêng tư — không dùng cho mục đích thương mại.",
        },
        {
          value: "commercial",
          label: "Thương mại",
          description: "Sử dụng trong quảng cáo, sản phẩm, ấn phẩm thương mại.",
        },
        {
          value: "print",
          label: "In khổ lớn",
          description: "File độ phân giải cao dành riêng cho in ấn khổ lớn, chất lượng phòng trưng bày.",
        },
      ],
      ctaLabel: "Yêu cầu mua bản quyền ảnh này",
      modal: {
        kicker: "Yêu Cầu Mua Ảnh",
        heading: "Yêu cầu bản quyền tác phẩm",
        intro:
          "Cho tôi biết bạn cần gói bản quyền nào, tôi sẽ liên hệ lại với báo giá và cách nhận file.",
        productLabel: "Tác phẩm",
        nameLabel: "Họ và tên",
        contactLabel: "Số điện thoại / Email",
        licenseFieldLabel: "Gói bản quyền cần mua",
        licensePlaceholder: "Chọn gói bản quyền",
        messageLabel: "Ghi chú thêm",
        submitIdle: "Gửi yêu cầu",
        submitSending: "Đang gửi…",
        submitError: "Đã có lỗi xảy ra. Vui lòng thử lại hoặc gọi trực tiếp.",
        close: "Đóng",
        closeAria: "Đóng form yêu cầu mua ảnh",
        successKicker: "Cảm ơn bạn",
        successMessage:
          "Yêu cầu của bạn đã được ghi nhận. Chúng tôi sẽ liên hệ lại sớm nhất.",
      },
    },
    coursesPage: {
      metaTitle: "Khoá học — Quân Vic Foto",
      kicker: "Khoá Học Nhiếp Ảnh",
      heading: "Học cách nhìn ánh sáng theo cách của tôi.",
      body: "Hơn 11 năm chụp Beauty & Fashion, được chắt lọc thành những khoá học thực hành — dành cho bất kỳ ai muốn đi từ việc \"chụp ảnh\" đến việc tạo ra những khung hình biết kể chuyện.",
      ctaLabel: "Đăng ký / Hỏi thêm về khoá học",
      courses: [
        {
          slug: "basic",
          title: "Beauty Photography Cơ Bản",
          level: "Người mới bắt đầu",
          format: "Học trực tiếp tại studio, nhóm nhỏ",
          duration: "7 buổi",
          price: "20.000.000đ",
          description:
            "Nắm vững máy ảnh, làm việc với một nguồn sáng duy nhất và tự tin chỉ đạo người mẫu — kèm nền tảng hậu kỳ Photoshop cơ bản, để bạn hoàn thiện trọn vẹn một bức chân dung beauty chứ không chỉ dừng lại ở file ảnh gốc.",
          highlights: [
            "Tạo hình ánh sáng: cứng, mềm và xẻ đôi",
            "Tư thế và cách chỉ đạo người mẫu lần đầu",
            "Bố cục và khung hình cho beauty cận cảnh",
            "Nền tảng chỉnh sửa ảnh cơ bản với Photoshop",
          ],
        },
        {
          slug: "advanced",
          title: "Ánh Sáng & Tạo Hình Nâng Cao",
          level: "Nâng cao",
          format: "Học trực tiếp tại studio, nhóm nhỏ",
          duration: "10 buổi",
          price: "30.000.000đ",
          description:
            "Dành cho người đã chụp ảnh nhưng muốn đạt chất lượng editorial thực thụ — thiết lập đa nguồn sáng, phối hợp cùng M.U.A và hậu kỳ Photoshop nâng cao để xây dựng một portfolio thật sự được các nhãn hàng chú ý.",
          highlights: [
            "Thiết lập đa nguồn sáng cho editorial",
            "Phối hợp cùng Makeup Artist và Stylist",
            "Hậu kỳ giữ trọn kết cấu da thật",
            "Photoshop nâng cao: ghép ảnh và chỉnh sửa chuyên sâu",
          ],
        },
        {
          slug: "pathway",
          title: "Lộ Trình Trọn Vẹn — Từ Cơ Bản Đến Nâng Cao",
          level: "Cơ bản đến Nâng cao",
          format: "Học tại studio + đồng hành online xuyên suốt",
          duration: "3–6 tháng",
          price: "60.000.000đ",
          description:
            "Trọn vẹn hành trình trong một chương trình duy nhất — nền tảng, ánh sáng nâng cao và hậu kỳ Photoshop, trải dài theo tháng cùng những buổi chụp thực chiến và sự đồng hành sát sao, để bạn có một bộ portfolio thật sự, không chỉ dừng ở kiến thức trên giấy.",
          highlights: [
            "Tháng 1: Nền tảng máy ảnh & ánh sáng, làm việc với người mẫu, Photoshop cơ bản",
            "Tháng 2-3: Thiết lập đa nguồn sáng editorial, phối hợp M.U.A, Photoshop nâng cao",
            "Tháng 4-6: Thực chiến dự án thật, xây dựng portfolio và phong cách cá nhân — đồng hành sát sao xuyên suốt",
          ],
        },
        {
          slug: "mentorship",
          title: "Mentorship 1:1",
          level: "Mọi trình độ",
          format: "Riêng tư, online hoặc trực tiếp",
          duration: "5 buổi",
          price: "50.000.000đ",
          description:
            "Đồng hành trực tiếp và tập trung trên chính tác phẩm của bạn — review portfolio, lên kế hoạch buổi chụp, góp ý thẳng thắn và hậu kỳ thực chiến, từ người đã xây dựng sự nghiệp từ chính con đường bạn đang đi.",
          highlights: [
            "Buổi 1: Đánh giá & định hướng — review portfolio, xác định mục tiêu, xây dựng lộ trình cá nhân hoá",
            "Buổi 2: Thực hành ánh sáng & concept theo phong cách riêng của bạn",
            "Buổi 3: Buổi chụp thực chiến, mentor đồng hành trực tiếp",
            "Buổi 4: Hậu kỳ chuyên sâu — Photoshop, tối ưu bộ ảnh output",
            "Buổi 5: Tổng kết, xây dựng chiến lược phát triển portfolio & thương hiệu cá nhân",
          ],
        },
      ],
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
