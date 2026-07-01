"use client";

import GalleryGrid from "@/components/GalleryGrid";
import { PORTFOLIO_ITEMS } from "@/lib/data";
import { useLanguage } from "@/lib/i18n";

export default function PortfolioContent() {
  const { t } = useLanguage();
  const page = t.portfolioPage;

  return (
    <div className="mx-auto max-w-[1440px] px-6 pb-24 pt-36 md:px-10 md:pt-44">
      <div className="mb-14 max-w-2xl md:mb-20">
        <span className="mb-4 block font-mono text-xs uppercase tracking-[0.3em] text-mist">
          {page.kicker}
        </span>
        <h1 className="font-serif text-[clamp(2.25rem,6vw,4.5rem)] font-medium leading-[1.05] tracking-tight">
          {page.heading}
        </h1>
        <p className="mt-6 max-w-md text-base leading-relaxed text-ink/70">
          {page.body}
        </p>
      </div>

      <GalleryGrid items={PORTFOLIO_ITEMS} />
    </div>
  );
}
