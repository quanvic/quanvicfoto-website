"use client";

import { useLanguage } from "@/lib/i18n";

export default function Marquee() {
  const { t } = useLanguage();
  const track = [...t.marquee, ...t.marquee];

  return (
    <div className="overflow-hidden border-y border-line bg-paper py-7">
      <div className="animate-marquee flex w-max gap-16 whitespace-nowrap">
        {track.map((word, i) => (
          <span
            key={`${word}-${i}`}
            className="flex items-center gap-16 font-serif text-2xl italic tracking-wide text-ink/70 md:text-3xl"
          >
            {word}
            <span aria-hidden="true" className="h-1 w-1 rounded-full bg-line" />
          </span>
        ))}
      </div>
    </div>
  );
}
