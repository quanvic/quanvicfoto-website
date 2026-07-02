"use client";

import { useCallback, useEffect, useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion, type PanInfo } from "framer-motion";
import type { PortfolioItem } from "@/lib/data";
import { CATEGORY_LABELS, useLanguage } from "@/lib/i18n";
import { blurProps } from "@/lib/blur-data";

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
  const [photoIndex, setPhotoIndex] = useState(0);
  const [lastIndex, setLastIndex] = useState(index);
  const [enterFromEnd, setEnterFromEnd] = useState(false);
  if (index !== lastIndex) {
    setLastIndex(index);
    setPhotoIndex(enterFromEnd && item ? item.images.length - 1 : 0);
  }

  // Prev/next (arrows, swipe, keyboard) step through the current album's
  // photos first, then spill over into the neighbouring album at each
  // end — so browsing a multi-photo album is just "keep going the same
  // direction" instead of requiring the tiny dot indicators.
  const goPrev = useCallback(() => {
    if (index === null || !item) return;
    setDirection(-1);
    if (photoIndex > 0) {
      setPhotoIndex((p) => p - 1);
    } else {
      setEnterFromEnd(true);
      onNavigate((index - 1 + items.length) % items.length);
    }
  }, [index, item, photoIndex, items.length, onNavigate]);

  const goNext = useCallback(() => {
    if (index === null || !item) return;
    setDirection(1);
    if (photoIndex < item.images.length - 1) {
      setPhotoIndex((p) => p + 1);
    } else {
      setEnterFromEnd(false);
      onNavigate((index + 1) % items.length);
    }
  }, [index, item, photoIndex, items.length, onNavigate]);

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
    if (items.length <= 1 && (item?.images.length ?? 0) <= 1) return;
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

          {(items.length > 1 || item.images.length > 1) && (
            <>
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  goPrev();
                }}
                aria-label="Previous photo"
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
                aria-label="Next photo"
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
                key={`${item.slug}-${photoIndex}`}
                custom={direction}
                variants={slideVariants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={slideTransition}
                drag={items.length > 1 || item.images.length > 1 ? "x" : false}
                dragConstraints={{ left: 0, right: 0 }}
                dragElastic={1}
                onDragEnd={handleDragEnd}
                className="flex h-full w-full cursor-grab flex-col items-center justify-center gap-4 active:cursor-grabbing"
              >
                <div className="relative h-[72dvh] w-full">
                  <Image
                    src={item.images[photoIndex]}
                    alt={`${item.concept} - Ảnh chân dung Beauty Editorial cỡ đầy đủ, Quân Vic Foto Studio Hà Nội`}
                    fill
                    draggable={false}
                    {...blurProps(item.images[photoIndex])}
                    sizes="92vw"
                    className="pointer-events-none select-none object-contain"
                  />
                </div>

                {item.images.length > 1 && (
                  <div className="flex flex-col items-center gap-2">
                    <div className="flex items-center gap-1">
                      {item.images.map((_, i) => (
                        <button
                          key={i}
                          type="button"
                          onClick={(e) => {
                            e.stopPropagation();
                            setDirection(i > photoIndex ? 1 : -1);
                            setPhotoIndex(i);
                          }}
                          aria-label={`Photo ${i + 1} of ${item.images.length}`}
                          aria-current={i === photoIndex}
                          className="cursor-hover flex h-8 w-6 items-center justify-center"
                        >
                          <span
                            className={`block h-1.5 rounded-full transition-all duration-300 ${
                              i === photoIndex
                                ? "w-6 bg-paper"
                                : "w-1.5 bg-paper/40"
                            }`}
                          />
                        </button>
                      ))}
                    </div>
                    <span className="font-mono text-[11px] tracking-[0.1em] text-paper/50">
                      {photoIndex + 1} / {item.images.length}
                    </span>
                  </div>
                )}

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
