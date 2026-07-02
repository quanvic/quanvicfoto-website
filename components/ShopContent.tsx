"use client";

import { useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { PORTFOLIO_ITEMS, type PortfolioItem } from "@/lib/data";
import { CATEGORY_LABELS, useLanguage } from "@/lib/i18n";
import { blurProps } from "@/lib/blur-data";
import Watermark from "@/components/Watermark";
import ShopModal from "@/components/ShopModal";

export default function ShopContent() {
  const { t, lang } = useLanguage();
  const page = t.shopPage;
  const [selected, setSelected] = useState<PortfolioItem | null>(null);
  const items = PORTFOLIO_ITEMS;
  const fromPrice = page.licenseOptions[0]?.price;

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
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-10% 0px" }}
            transition={{
              duration: 0.8,
              delay: (i % 3) * 0.12,
              ease: "easeOut",
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
                alt={`${item.concept} - Mua ảnh bản quyền chân dung Beauty, Quân Vic Foto Studio Hà Nội`}
                fill
                draggable={false}
                {...blurProps(item.images[0])}
                sizes="(min-width: 768px) 33vw, 100vw"
                className="pointer-events-none select-none object-cover transition-all duration-500 ease-out group-hover:scale-105"
              />
              <Watermark />
              <div className="absolute inset-0 bg-ink/0 transition-all duration-500 group-hover:bg-ink/35" />
              <div className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center gap-2 opacity-0 transition-all duration-500 ease-out group-hover:opacity-100">
                <p className="font-serif text-2xl italic tracking-tight text-paper">
                  {item.concept}
                </p>
                <span className="font-mono text-[11px] uppercase tracking-[0.25em] text-paper/80">
                  {CATEGORY_LABELS[item.category]?.[lang] ?? item.category}
                </span>
              </div>
              {item.exclusiveSold && (
                <span className="absolute left-3 top-3 border border-paper/70 bg-ink/70 px-2.5 py-1 font-mono text-[10px] uppercase tracking-[0.15em] text-paper backdrop-blur-sm">
                  {page.exclusiveSoldBadge}
                </span>
              )}
            </button>

            <div className="mt-4 flex items-baseline justify-between gap-3">
              <p className="font-serif text-lg font-bold uppercase tracking-wide">
                {item.concept}
              </p>
              <span className="font-mono text-[11px] text-mist">
                {String(i + 1).padStart(2, "0")}
              </span>
            </div>
            {fromPrice && (
              <p className="mt-1 font-mono text-[11px] uppercase tracking-[0.1em] text-mist">
                {page.fromLabel} {fromPrice}
              </p>
            )}
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
