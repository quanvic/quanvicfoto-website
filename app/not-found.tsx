"use client";

import Link from "next/link";
import { useLanguage } from "@/lib/i18n";

export default function NotFound() {
  const { t } = useLanguage();
  const nf = t.notFound;

  return (
    <section className="mx-auto flex min-h-[70vh] max-w-[1440px] flex-col items-center justify-center px-6 py-24 text-center md:px-10">
      <span className="mb-6 block font-mono text-xs uppercase tracking-[0.3em] text-mist">
        {nf.kicker}
      </span>
      <h1 className="max-w-2xl font-serif text-[clamp(2rem,5vw,3.5rem)] font-medium leading-[1.1] tracking-tight">
        {nf.heading}
      </h1>
      <p className="mt-6 max-w-md text-base leading-relaxed text-ink/70">
        {nf.body}
      </p>
      <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
        <Link
          href="/"
          className="cursor-hover group inline-flex w-fit items-center gap-3 border border-ink bg-ink px-5 py-2.5 font-mono text-xs uppercase tracking-[0.2em] text-paper transition-colors duration-300 hover:bg-paper hover:text-ink"
        >
          {nf.homeCta}
        </Link>
        <Link
          href="/portfolio"
          className="cursor-hover group inline-flex w-fit items-center gap-3 border border-ink px-5 py-2.5 font-mono text-xs uppercase tracking-[0.2em] text-ink transition-colors duration-300 hover:bg-ink hover:text-paper"
        >
          {nf.portfolioCta}
        </Link>
      </div>
    </section>
  );
}
