"use client";

import { useCallback, useEffect, useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion, type PanInfo } from "framer-motion";
import type { PortfolioItem } from "@/lib/data";
import { CATEGORY_LABELS, useLanguage } from "@/lib/i18n";

const SWIPE_OFFSET_THRESHOLD = 60;
const SWIPE_VELOCITY_THRESHOLD = 500;
const SLIDE_DISTANCE = 320;

const slideVariants = {
  enter: (direction: number) => ({
    opacity: 0,
    x: direction * SLIDE_DISTANCE,
    scale: 0.94,
  }),
  center: { opacity: 1, x: 0, scale: 1 },
  exit: (direction: number) => ({
    opacity: 0,
    x: direction * -SLIDE_DISTANCE,
    scale: 0.94,
  }),
};

const slideTransition = {
  x: { type: "spring" as const, stiffness: 340, damping: 32 },
  opacity: { duration: 0.2 },
  scale: { duration: 0.25 },
};

export default function Lightbox({
  items,
  index,
  onClose,
  onNavigate,
}: {
  items: PortfolioItem[];
  index: number | null;
  onClose: () => void;
  onNavigate: (index: number) => void;
}) {
  const { lang } = useLanguage();
  const open = index !== null;
  const item = open ? items[index as number] : null;
  const [direction, setDirection] = useState(1);

  const goPrev = useCallback(() => {
    if (index === null) return;
    setDirection(-1);
    onNavigate((index - 1 + items.length) % items.length);
  }, [index, items.length, onNavigate]);

  const goNext = useCallback(() => {
    if (index === null) return;
    setDirection(1);
    onNavigate((index + 1) % items.length);
  }, [index, items.length, onNavigate]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowRight") goNext();
      if (e.key === "ArrowLeft") goPrev();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, onClose, goNext, goPrev]);

  function handleDragEnd(
    _event: MouseEvent | TouchEvent | PointerEvent,
    info: PanInfo,
  ) {
    if (items.length <= 1) return;
    const { offset, velocity } = info;
    if (
      offset.x < -SWIPE_OFFSET_THRESHOLD ||
      velocity.x < -SWIPE_VELOCITY_THRESHOLD
    ) {
      goNext();
    } else if (
      offset.x > SWIPE_OFFSET_THRESHOLD ||
      velocity.x > SWIPE_VELOCITY_THRESHOLD
    ) {
      goPrev();
    }
  }

  return (
    <AnimatePresence>
      {open && item && (
        <motion.div
          role="dialog"
          aria-modal="true"
          aria-label={item.concept}
          className="fixed inset-0 z-[110] flex items-center justify-center bg-ink/95 p-4 backdrop-blur-sm md:p-10"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          onClick={onClose}
        >
          <button
            type="button"
            onClick={onClose}
            aria-label="Close"
            className="cursor-hover absolute right-4 top-4 z-20 flex h-11 w-11 items-center justify-center text-paper/70 transition-colors hover:text-paper"
          >
            <svg width="18" height="18" viewBox="0 0 20 20" fill="none" aria-hidden="true">
              <path
                d="M5 5L15 15M15 5L5 15"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
              />
            </svg>
          </button>

          {items.length > 1 && (
            <>
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  goPrev();
                }}
                aria-label="Previous image"
                className="cursor-hover absolute left-2 top-1/2 z-20 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full text-paper/70 transition-colors hover:bg-paper/10 hover:text-paper md:left-6"
              >
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true">
                  <path
                    d="M12.5 4.5L6 10l6.5 5.5"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </button>
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  goNext();
                }}
                aria-label="Next image"
                className="cursor-hover absolute right-2 top-1/2 z-20 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full text-paper/70 transition-colors hover:bg-paper/10 hover:text-paper md:right-6"
              >
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true">
                  <path
                    d="M7.5 4.5L14 10l-6.5 5.5"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </button>
            </>
          )}

          <div
            className="relative flex h-full w-full max-w-5xl items-center justify-center overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            <AnimatePresence custom={direction} mode="popLayout" initial={false}>
              <motion.div
                key={item.slug}
                custom={direction}
                variants={slideVariants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={slideTransition}
                drag={items.length > 1 ? "x" : false}
                dragConstraints={{ left: 0, right: 0 }}
                dragElastic={1}
                onDragEnd={handleDragEnd}
                className="flex h-full w-full cursor-grab flex-col items-center justify-center gap-4 active:cursor-grabbing"
              >
                <div className="relative h-[78dvh] w-full">
                  <Image
                    src={item.image}
                    alt={`${item.concept} — full size`}
                    fill
                    draggable={false}
                    sizes="92vw"
                    className="pointer-events-none select-none object-contain"
                  />
                </div>
                <div className="flex max-w-xl flex-col items-center gap-2 text-center text-paper">
                  <div className="flex items-baseline gap-3">
                    <span className="font-mono text-xs text-paper/50">
                      {String((index as number) + 1).padStart(2, "0")}
                    </span>
                    <p className="font-serif text-xl font-bold uppercase tracking-wide">
                      {item.concept}
                    </p>
                    <span className="font-mono text-[11px] uppercase tracking-[0.15em] text-paper/60">
                      {CATEGORY_LABELS[item.category]?.[lang] ?? item.category}
                    </span>
                  </div>
                  {item.story && (
                    <p className="font-serif text-sm italic leading-relaxed text-paper/75">
                      {item.story}
                    </p>
                  )}
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
