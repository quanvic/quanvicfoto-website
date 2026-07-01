"use client";

import Link from "next/link";
import Hero from "@/components/Hero";
import Marquee from "@/components/Marquee";
import GalleryGrid from "@/components/GalleryGrid";
import AboutTeaser from "@/components/AboutTeaser";
import ContactCTA from "@/components/ContactCTA";
import { PORTFOLIO_ITEMS } from "@/lib/data";
import { useLanguage } from "@/lib/i18n";

export default function Home() {
  const { t } = useLanguage();
  const featured = PORTFOLIO_ITEMS.slice(0, 6);
  const selectedWork = t.home.selectedWork;

  return (
    <>
      <Hero />
      <Marquee />

      <section className="px-6 pb-16 pt-24 md:px-10 md:pb-20 md:pt-32">
        <div className="mb-12 flex flex-col gap-6 md:mb-16 md:flex-row md:items-end md:justify-between">
          <div>
            <span className="mb-4 block text-xs uppercase tracking-[0.3em] text-mist">
              {selectedWork.kicker}
            </span>
            <h2 className="max-w-xl font-serif text-[clamp(2rem,4.5vw,3.5rem)] font-medium leading-[1.05] tracking-tight">
              {selectedWork.heading}
            </h2>
          </div>
          <Link
            href="/portfolio"
            className="cursor-hover group inline-flex w-fit items-center gap-3 border-b border-ink pb-1 text-sm uppercase tracking-[0.2em] transition-colors hover:border-mist hover:text-mist"
          >
            {selectedWork.cta}
            <span className="transition-transform duration-300 group-hover:translate-x-1">
              &rarr;
            </span>
          </Link>
        </div>

        <GalleryGrid items={featured} />
      </section>

      <AboutTeaser />
      <ContactCTA />
    </>
  );
}
