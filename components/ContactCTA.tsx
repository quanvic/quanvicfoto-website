"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { useLanguage } from "@/lib/i18n";

export default function ContactCTA() {
  const { t } = useLanguage();
  const cta = t.contactCTA;

  return (
    <section className="bg-ink px-6 py-28 text-paper md:px-10 md:py-40">
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-15% 0px" }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="mx-auto flex max-w-3xl flex-col items-center text-center"
      >
        <span className="mb-8 text-xs uppercase tracking-[0.3em] text-paper/50">
          {cta.kicker}
        </span>
        <h2 className="font-serif text-[clamp(2.25rem,6vw,5rem)] font-medium leading-[1.05] tracking-tight">
          {cta.heading}
          <span className="italic"> {cta.headingItalic}</span>.
        </h2>
        <Link
          href="/contact"
          className="cursor-hover group mt-12 inline-flex items-center gap-4 rounded-full border border-paper/40 px-8 py-4 text-sm uppercase tracking-[0.2em] transition-colors hover:border-paper hover:bg-paper hover:text-ink"
        >
          {cta.cta}
          <span className="transition-transform duration-300 group-hover:translate-x-1">
            &rarr;
          </span>
        </Link>
      </motion.div>
    </section>
  );
}
