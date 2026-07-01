"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import type { PortfolioItem } from "@/lib/data";
import { CATEGORY_LABELS, useLanguage } from "@/lib/i18n";

const SPAN_CLASSES: Record<PortfolioItem["span"], string> = {
  large: "md:col-span-2 md:row-span-2",
  tall: "md:col-span-1 md:row-span-2",
  wide: "md:col-span-2 md:row-span-1",
  regular: "md:col-span-1 md:row-span-1",
};

export default function GalleryGrid({ items }: { items: PortfolioItem[] }) {
  const { t, lang } = useLanguage();

  return (
    <div className="grid grid-cols-2 gap-3 md:auto-rows-[260px] md:grid-cols-4 md:gap-4">
      {items.map((item, i) => (
        <motion.article
          key={item.slug}
          initial={{ opacity: 0, y: 32 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-10% 0px" }}
          transition={{
            duration: 0.7,
            delay: (i % 4) * 0.08,
            ease: [0.16, 1, 0.3, 1],
          }}
          className={`group relative col-span-2 aspect-[4/5] overflow-hidden bg-cloud md:aspect-auto ${SPAN_CLASSES[item.span]}`}
        >
          <div className="cursor-hover absolute inset-0">
            <Image
              src={item.image}
              alt={`${item.concept} — beauty editorial, model ${item.model}`}
              fill
              sizes="(min-width: 768px) 50vw, 100vw"
              className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.06]"
            />
            <div className="absolute inset-0 bg-ink/0 transition-colors duration-500 group-hover:bg-ink/35" />

            <div className="absolute inset-x-0 bottom-0 translate-y-4 p-5 opacity-0 transition-all duration-500 ease-out group-hover:translate-y-0 group-hover:opacity-100 md:p-6">
              <p className="font-serif text-xl italic text-paper md:text-2xl">
                {item.concept}
              </p>
              <div className="mt-2 flex flex-wrap gap-x-4 gap-y-1 text-[11px] uppercase tracking-[0.15em] text-paper/80">
                <span>
                  {t.gallery.muaLabel} &mdash; {item.mua}
                </span>
                <span>
                  {t.gallery.modelLabel} &mdash; {item.model}
                </span>
              </div>
            </div>

            <span className="absolute left-5 top-5 text-[11px] uppercase tracking-[0.2em] text-paper opacity-0 transition-opacity duration-500 group-hover:opacity-100">
              {CATEGORY_LABELS[item.category]?.[lang] ?? item.category}
            </span>
          </div>
        </motion.article>
      ))}
    </div>
  );
}
