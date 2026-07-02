"use client";

import { useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import type { PortfolioItem } from "@/lib/data";
import { CATEGORY_LABELS, useLanguage } from "@/lib/i18n";
import Lightbox from "@/components/Lightbox";

const SPAN_CLASSES: Record<PortfolioItem["span"], string> = {
  large: "md:col-span-2 md:row-span-2",
  tall: "md:col-span-1 md:row-span-2",
  wide: "md:col-span-2 md:row-span-1",
  regular: "md:col-span-1 md:row-span-1",
};

export default function GalleryGrid({ items }: { items: PortfolioItem[] }) {
  const { lang } = useLanguage();
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <div className="grid grid-cols-1 gap-6 md:auto-rows-[260px] md:grid-cols-4 md:grid-flow-dense md:gap-4">
      {items.map((item, i) => (
        <motion.article
          key={item.slug}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-10% 0px" }}
          transition={{
            duration: 0.8,
            delay: (i % 4) * 0.12,
            ease: "easeOut",
          }}
          className={`group relative aspect-[4/5] overflow-hidden bg-cloud md:aspect-auto ${SPAN_CLASSES[item.span]}`}
        >
          <button
            type="button"
            onClick={() => setOpenIndex(i)}
            aria-label={`${item.concept} — view full size`}
            className="cursor-hover absolute inset-0 block w-full text-left"
          >
            <Image
              src={item.images[0]}
              alt={`${item.concept} — beauty editorial photography by Quân Vic Foto`}
              fill
              sizes="(min-width: 768px) 50vw, 100vw"
              className="object-cover transition-all duration-500 ease-out group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-ink/0 transition-all duration-500 group-hover:bg-ink/35" />

            {item.images.length > 1 && (
              <span className="absolute right-3 top-3 flex items-center gap-1 bg-ink/60 px-2 py-1 font-mono text-[10px] uppercase tracking-[0.15em] text-paper backdrop-blur-sm">
                <svg width="11" height="11" viewBox="0 0 20 20" fill="none" aria-hidden="true">
                  <rect x="4" y="4" width="12" height="12" rx="1.5" stroke="currentColor" strokeWidth="1.4" />
                  <path d="M7 4V2.5a1 1 0 0 1 1-1h8a1 1 0 0 1 1 1V13a1 1 0 0 1-1 1H16" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
                </svg>
                {item.images.length}
              </span>
            )}

            <div className="absolute inset-x-0 bottom-0 translate-y-2 p-5 opacity-0 transition-all duration-500 ease-out group-hover:translate-y-0 group-hover:opacity-100 md:p-6">
              <div className="flex items-baseline gap-3">
                <span className="font-mono text-xs text-paper/50">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <p className="font-serif text-xl font-bold uppercase tracking-wide text-paper md:text-2xl">
                  {item.concept}
                </p>
              </div>
              <span className="mt-1 block pl-[2.1rem] font-mono text-[11px] uppercase tracking-[0.2em] text-paper/70">
                {CATEGORY_LABELS[item.category]?.[lang] ?? item.category}
              </span>
              {item.story && (
                <p className="mt-2 max-w-xs pl-[2.1rem] font-serif text-sm italic leading-relaxed text-paper/85">
                  {item.story}
                </p>
              )}
            </div>
          </button>
        </motion.article>
      ))}

      <Lightbox
        items={items}
        index={openIndex}
        onClose={() => setOpenIndex(null)}
        onNavigate={setOpenIndex}
      />
    </div>
  );
}
