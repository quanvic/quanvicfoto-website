"use client";

import { useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import type { PortfolioItem } from "@/lib/data";
import { CATEGORY_LABELS, useLanguage } from "@/lib/i18n";
import { blurProps } from "@/lib/blur-data";
import Lightbox from "@/components/Lightbox";

// The bento rhythm: item 1 is the hero (2 cols x 2 rows), item 2 is a tall
// portrait focus (1 col x 2 rows), items 3-6 are standard 1x1 cells. Spans
// only apply at the lg breakpoint — below that every card is a single
// column/tablet-width block so the "rhythm" doesn't fight a narrow viewport.
const BENTO_SPANS = [
  "sm:col-span-2 lg:col-span-2 lg:row-span-2",
  "lg:col-span-1 lg:row-span-2",
  "lg:col-span-1 lg:row-span-1",
  "lg:col-span-1 lg:row-span-1",
  "lg:col-span-1 lg:row-span-1",
  "lg:col-span-1 lg:row-span-1",
];

// The 2-column hero card renders ~66vw wide at lg while the rest are
// ~33vw; on sm both hero and standard cards span the full 2-col row half
// or whole. Declaring that per-item keeps next/image from serving the
// hero card an image half its rendered width.
const BENTO_SIZES = [
  "(min-width: 1024px) 66vw, 100vw",
  "(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw",
  "(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw",
  "(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw",
  "(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw",
  "(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw",
];

export default function SelectedWorksBento({
  items,
}: {
  items: PortfolioItem[];
}) {
  const { lang } = useLanguage();
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const works = items.slice(0, 6);

  return (
    <>
      <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 sm:gap-9 lg:grid-cols-3 lg:auto-rows-[240px] lg:gap-10">
        {works.map((item, i) => (
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
            className={`aspect-[4/5] lg:aspect-auto lg:h-full ${BENTO_SPANS[i] ?? ""}`}
          >
            <button
              type="button"
              onClick={() => setOpenIndex(i)}
              onContextMenu={(e) => e.preventDefault()}
              aria-label={`${item.concept} — view full size`}
              className="cursor-hover group relative block h-full w-full overflow-hidden border border-line bg-cloud shadow-[0_4px_30px_-10px_rgba(0,0,0,0.15)]"
            >
              <motion.div
                initial="rest"
                whileHover="hover"
                animate="rest"
                className="relative h-full w-full"
              >
                <motion.div
                  variants={{ rest: { scale: 1 }, hover: { scale: 1.05 } }}
                  transition={{ duration: 0.5, ease: "easeOut" }}
                  className="relative h-full w-full"
                >
                  {/*
                    object-contain (never cover) — every image keeps its
                    native aspect ratio; the cloud background reads as a
                    gallery mat behind any letterboxed edges instead of
                    a hard crop.
                  */}
                  <Image
                    src={item.images[0]}
                    alt={`${item.concept} - Ảnh chân dung Beauty Editorial, chụp bởi Quân Vic Foto Studio Hà Nội`}
                    fill
                    draggable={false}
                    {...blurProps(item.images[0])}
                    sizes={BENTO_SIZES[i] ?? BENTO_SIZES[1]}
                    className="pointer-events-none select-none object-contain"
                  />
                </motion.div>

                <motion.div
                  variants={{ rest: { opacity: 0 }, hover: { opacity: 1 } }}
                  transition={{ duration: 0.5, ease: "easeOut" }}
                  className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center gap-2 bg-ink/55 text-center backdrop-blur-[2px]"
                >
                  <p className="font-serif text-2xl italic tracking-tight text-paper md:text-3xl">
                    {item.concept}
                  </p>
                  <span className="font-mono text-[11px] uppercase tracking-[0.25em] text-paper/80">
                    {CATEGORY_LABELS[item.category]?.[lang] ?? item.category}
                  </span>
                </motion.div>
              </motion.div>
            </button>
          </motion.article>
        ))}
      </div>

      <Lightbox
        items={works}
        index={openIndex}
        onClose={() => setOpenIndex(null)}
        onNavigate={setOpenIndex}
      />
    </>
  );
}
