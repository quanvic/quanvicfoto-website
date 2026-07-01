"use client";

import { useLanguage } from "@/lib/i18n";

export default function Marquee() {
  const { t } = useLanguage();
  const track = [...t.marquee, ...t.marquee];

  return (
    <div className="overflow-hidden border-y border-line bg-paper py-6">
      <div className="animate-marquee flex w-max gap-10 whitespace-nowrap">
        {[...track, ...track].map((word, i) => (
          <span
            key={`${word}-${i}`}
            className="flex items-center gap-10 font-serif text-3xl italic text-ink/80 md:text-4xl"
          >
            {word}
            <span className="text-line">&#10022;</span>
          </span>
        ))}
      </div>
    </div>
  );
}
