import type { Metadata } from "next";
import { ADDRESS, GEO, OPENING_HOURS, PHONE_TEL, SOCIAL_LINKS } from "@/lib/data";

// Set NEXT_PUBLIC_SITE_URL in the Vercel project settings if the domain
// ever changes — everything (canonical URLs, JSON-LD, sitemap) reads from
// this single constant.
export const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://quanvicfoto-website.vercel.app";

export const SITE_NAME = "Quân Vic Foto";

export function pageMetadata({
  title,
  description,
  path,
}: {
  title: string;
  description: string;
  path: string;
}): Metadata {
  const url = path === "/" ? SITE_URL : `${SITE_URL}${path}`;

  return {
    title,
    description,
    alternates: { canonical: path },
    openGraph: {
      title,
      description,
      url,
      siteName: SITE_NAME,
      locale: "vi_VN",
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
    },
  };
}

// schema.org LocalBusiness structured data for the studio, rendered once
// site-wide in the root layout. Field values are kept byte-identical to
// the Google Business Profile listing for NAP consistency.
export function localBusinessSchema() {
  const [opens, closes] = OPENING_HOURS.split(" ")[1].split("-");

  return {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    name: `${SITE_NAME} - Beauty & Portrait Studio`,
    image: `${SITE_URL}/images/hero.webp`,
    telephone: PHONE_TEL,
    url: `${SITE_URL}/`,
    address: {
      "@type": "PostalAddress",
      streetAddress: ADDRESS.street,
      addressLocality: "Hai Bà Trưng",
      addressRegion: "Hà Nội",
      addressCountry: ADDRESS.countryCode,
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: GEO.latitude,
      longitude: GEO.longitude,
    },
    openingHoursSpecification: {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: [
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday",
        "Sunday",
      ],
      opens,
      closes,
    },
    sameAs: SOCIAL_LINKS.map((s) => s.href),
  };
}
