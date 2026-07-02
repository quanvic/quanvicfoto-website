"use client";

import { useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { PORTFOLIO_ITEMS, SHOP_SLUGS, type PortfolioItem } from "@/lib/data";
import { useLanguage } from "@/lib/i18n";
import Watermark from "@/components/Watermark";
import ShopModal from "@/components/ShopModal";

export default function ShopContent() {
  const { t } = useLanguage();
  const page = t.shopPage;
  const [selected, setSelected] = useState<PortfolioItem | null>(null);
  const items = PORTFOLIO_ITEMS.filter((p) => SHOP_SLUGS.includes(p.slug));

  return (
    <div className="mx-auto max-w-[1440px] px-6 pb-24 pt-36 md:px-10 md:pt-44">
      <div className="max-w-2xl">
        <span className="mb-4 block font-mono text-xs uppercase tracking-[0.3em] text-mist">
          {page.kicker}
        </span>
        <h1 className="font-serif text-[clamp(2.25rem,5.5vw,4.5rem)] font-medium leading-[1.05] tracking-tight">
          {page.heading}
        </h1>
        <p className="mt-6 max-w-md text-base leading-relaxed text-ink/70">
          {page.body}
        </p>
        <p className="mt-4 max-w-md font-mono text-[11px] uppercase leading-relaxed tracking-[0.1em] text-mist">
          {page.protectedNote}
        </p>
      </div>

      <div className="mt-16 grid grid-cols-1 gap-x-6 gap-y-12 sm:grid-cols-2 md:mt-24 md:grid-cols-3">
        {items.map((item, i) => (
          <motion.article
            key={item.slug}
            initial={{ opacity: 0, y: 32 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-10% 0px" }}
            transition={{
              duration: 0.7,
              delay: (i % 3) * 0.08,
              ease: [0.16, 1, 0.3, 1],
            }}
          >
            <button
              type="button"
              onClick={() => setSelected(item)}
              onContextMenu={(e) => e.preventDefault()}
              aria-label={`${item.concept} — ${page.ctaLabel}`}
              className="cursor-hover group relative block aspect-[4/5] w-full overflow-hidden bg-cloud"
            >
              <Image
                src={item.images[0]}
                alt={item.concept}
                fill
                draggable={false}
                sizes="(min-width: 768px) 33vw, 100vw"
                className="pointer-events-none select-none object-cover transition-transform duration-700 ease-out group-hover:scale-[1.03]"
              />
              <Watermark />
              <div className="absolute inset-0 bg-ink/0 transition-colors duration-500 group-hover:bg-ink/25" />
            </button>

            <div className="mt-4 flex items-baseline justify-between gap-3">
              <p className="font-serif text-lg font-bold uppercase tracking-wide">
                {item.concept}
              </p>
              <span className="font-mono text-[11px] text-mist">
                {String(i + 1).padStart(2, "0")}
              </span>
            </div>
            <button
              type="button"
              onClick={() => setSelected(item)}
              className="cursor-hover mt-2 inline-flex items-center gap-2 border-b border-ink pb-0.5 font-mono text-[11px] uppercase tracking-[0.15em] transition-colors hover:border-mist hover:text-mist"
            >
              {page.ctaLabel}
            </button>
          </motion.article>
        ))}
      </div>

      <ShopModal product={selected} onClose={() => setSelected(null)} />
    </div>
  );
}
