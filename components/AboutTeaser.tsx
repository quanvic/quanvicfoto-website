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
    <section className="mx-auto grid max-w-[1440px] grid-cols-1 gap-10 px-6 py-24 md:grid-cols-2 md:gap-16 md:px-10 md:py-32">
      <motion.div
        initial={{ opacity: 0, scale: 1.05 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true, margin: "-15% 0px" }}
        transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
        className="relative aspect-[4/5] w-full overflow-hidden bg-cloud"
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
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-15% 0px" }}
        transition={{ duration: 0.8, ease: "easeOut", delay: 0.1 }}
        className="flex flex-col justify-center"
      >
        <span className="mb-6 text-xs uppercase tracking-[0.3em] text-mist">
          {about.kicker}
        </span>
        <h2 className="font-serif text-[clamp(2rem,4.5vw,3.5rem)] font-medium leading-[1.05] tracking-tight">
          {about.heading}
        </h2>
        {about.body.map((paragraph) => (
          <p
            key={paragraph}
            className="mt-4 max-w-md text-base leading-relaxed text-ink/70 first:mt-8"
          >
            {paragraph}
          </p>
        ))}
        <Link
          href="/about"
          className="cursor-hover group mt-10 inline-flex w-fit items-center gap-3 border-b border-ink pb-1 text-sm uppercase tracking-[0.2em] transition-colors hover:border-mist hover:text-mist"
        >
          {about.cta}
          <span className="transition-transform duration-300 group-hover:translate-x-1">
            &rarr;
          </span>
        </Link>
      </motion.div>
    </section>
  );
}
