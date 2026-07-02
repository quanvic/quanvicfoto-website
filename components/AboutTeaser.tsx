"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { ABOUT_IMAGE } from "@/lib/data";
import { useLanguage } from "@/lib/i18n";

export default function AboutTeaser() {
  const { t } = useLanguage();
  const about = t.home.about;

  return (
    <section className="mx-auto max-w-[1440px] px-6 py-24 md:px-10 md:py-32">
      <div className="relative md:grid md:grid-cols-12 md:items-end md:gap-x-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-15% 0px" }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="relative aspect-[4/5] w-full overflow-hidden bg-cloud md:col-span-7 md:col-start-1 md:row-start-1"
        >
          <Image
            src={ABOUT_IMAGE}
            alt={about.imageAlt}
            fill
            sizes="(min-width: 768px) 50vw, 100vw"
            className="object-cover"
          />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-15% 0px" }}
          transition={{ duration: 0.8, ease: "easeOut", delay: 0.15 }}
          className="relative z-10 -mt-12 mx-4 flex flex-col justify-center bg-paper p-6 shadow-[0_8px_40px_-8px_rgba(0,0,0,0.15)] sm:mx-8 sm:p-10 md:col-span-6 md:col-start-6 md:row-start-1 md:-ml-16 md:mt-0 md:mb-10 md:self-end md:p-12 md:shadow-none"
        >
          <div className="mb-6 flex items-baseline gap-4 border-b border-line pb-6">
            <span className="font-serif text-[clamp(3.25rem,7vw,5.5rem)] font-medium leading-none tracking-tight">
              {about.yearsValue}
            </span>
            <span className="max-w-[9rem] font-mono text-[11px] uppercase leading-snug tracking-[0.15em] text-mist">
              {about.yearsLabel}
            </span>
          </div>

          <span className="mb-6 font-mono text-xs uppercase tracking-[0.3em] text-mist">
            {about.kicker}
          </span>
          <h2 className="font-serif text-[clamp(1.75rem,4vw,3rem)] font-medium leading-[1.05] tracking-tight">
            {about.heading}
          </h2>
          {about.body.map((paragraph) => (
            <p
              key={paragraph}
              className="mt-4 max-w-md text-base leading-relaxed text-ink/70 first:mt-6"
            >
              {paragraph}
            </p>
          ))}
          <Link
            href="/about"
            className="cursor-hover group mt-10 inline-flex w-fit items-center gap-3 border border-ink px-5 py-2.5 font-mono text-xs uppercase tracking-[0.2em] text-ink transition-colors duration-300 hover:bg-ink hover:text-paper"
          >
            {about.cta}
            <span className="transition-transform duration-300 group-hover:translate-x-1">
              &rarr;
            </span>
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
