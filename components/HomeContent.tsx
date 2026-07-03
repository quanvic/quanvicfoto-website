"use client";

import Link from "next/link";
import Hero from "@/components/Hero";
import Marquee from "@/components/Marquee";
import SelectedWorksBento from "@/components/SelectedWorksBento";
import AboutTeaser from "@/components/AboutTeaser";
import ContactCTA from "@/components/ContactCTA";
import { PORTFOLIO_ITEMS } from "@/lib/data";
import { useLanguage } from "@/lib/i18n";

// Hand-picked for the homepage showcase — deliberately varied in category,
// composition, and framing (not just the first N items in data order) so
// the front page reads as a curated selection rather than a beauty
// close-up wall.
const FEATURED_SLUGS = [
  "kieu-sa",
  "structure",
  "bloom",
  "pho-thi",
  "du-muc",
  "cam-do",
  "co-tich",
  "nguyen-uoc",
  "quyen-ru",
];

export default function HomeContent() {
  const { t } = useLanguage();
  const featured = FEATURED_SLUGS.map((slug) =>
    PORTFOLIO_ITEMS.find((item) => item.slug === slug),
  ).filter((item): item is (typeof PORTFOLIO_ITEMS)[number] => Boolean(item));
  const selectedWork = t.home.selectedWork;

  return (
    <>
      <Hero />
      <Marquee />

      <section className="mx-auto max-w-[1440px] px-6 py-24 md:px-10 md:py-32">
        <div className="mb-12 flex flex-col gap-6 md:mb-16 md:flex-row md:items-end md:justify-between">
          <div>
            <span className="mb-4 block font-mono text-xs uppercase tracking-[0.3em] text-mist">
              {selectedWork.kicker}
            </span>
            <h2 className="max-w-xl font-serif text-[clamp(2rem,4.5vw,3.5rem)] font-medium leading-[1.05] tracking-tight">
              {selectedWork.heading}
            </h2>
          </div>
          <Link
            href="/portfolio"
            className="cursor-hover group inline-flex w-fit items-center gap-3 border border-ink px-5 py-2.5 font-mono text-xs uppercase tracking-[0.2em] text-ink transition-colors duration-300 hover:bg-ink hover:text-paper"
          >
            {selectedWork.cta}
            <span className="transition-transform duration-300 group-hover:translate-x-1">
              &rarr;
            </span>
          </Link>
        </div>

        <SelectedWorksBento items={featured} />
      </section>

      <AboutTeaser />
      <ContactCTA />
    </>
  );
}
