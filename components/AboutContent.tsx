"use client";

import Image from "next/image";
import { ABOUT_IMAGE, HERO_IMAGE } from "@/lib/data";
import { useLanguage } from "@/lib/i18n";
import { blurProps } from "@/lib/blur-data";

export default function AboutContent() {
  const { t } = useLanguage();
  const page = t.aboutPage;

  return (
    <div className="mx-auto max-w-[1440px] px-6 pb-24 pt-36 md:px-10 md:pt-44">
      <div className="grid grid-cols-1 gap-10 md:grid-cols-2 md:gap-16">
        <div>
          <span className="mb-4 block font-mono text-xs uppercase tracking-[0.3em] text-mist">
            {page.kicker}
          </span>
          <h1 className="font-serif text-[clamp(2.25rem,5.5vw,4.5rem)] font-medium leading-[1.05] tracking-tight">
            {page.heading}
          </h1>
          {page.body.map((paragraph) => (
            <p
              key={paragraph}
              className="mt-4 max-w-md text-base leading-relaxed text-ink/70 first:mt-8"
            >
              {paragraph}
            </p>
          ))}

          <div className="mt-12 grid grid-cols-3 gap-6 border-t border-line pt-8">
            {page.stats.map((stat) => (
              <div key={stat.label}>
                <p className="font-serif text-3xl md:text-4xl">
                  {stat.value}
                </p>
                <p className="mt-2 font-mono text-xs uppercase tracking-[0.15em] text-mist">
                  {stat.label}
                </p>
              </div>
            ))}
          </div>
        </div>

        <div className="relative aspect-[4/5] w-full overflow-hidden bg-cloud">
          <Image
            src={ABOUT_IMAGE}
            alt={page.imageAlt}
            fill
            {...blurProps(ABOUT_IMAGE)}
            sizes="(min-width: 768px) 50vw, 100vw"
            className="object-cover"
          />
        </div>
      </div>

      <div className="mt-24 md:mt-32">
        <span className="mb-8 block font-mono text-xs uppercase tracking-[0.3em] text-mist">
          {page.approachKicker}
        </span>
        <div className="grid grid-cols-1 gap-x-10 gap-y-12 border-t border-line pt-10 md:grid-cols-3">
          {page.approach.map((item, i) => (
            <div key={item.title}>
              <span className="font-mono text-xs text-mist">0{i + 1}</span>
              <h3 className="mt-3 font-serif text-2xl font-medium italic tracking-tight">
                {item.title}
              </h3>
              <p className="mt-4 text-sm leading-relaxed text-ink/70">
                {item.body}
              </p>
            </div>
          ))}
        </div>
      </div>

      <div className="relative mt-24 aspect-[16/9] w-full overflow-hidden bg-cloud md:mt-32">
        <Image
          src={HERO_IMAGE}
          alt={page.heroImageAlt}
          fill
          {...blurProps(HERO_IMAGE)}
          sizes="100vw"
          className="object-cover"
        />
      </div>
    </div>
  );
}
