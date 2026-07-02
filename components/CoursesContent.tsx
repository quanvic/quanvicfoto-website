"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { COURSE_IMAGES } from "@/lib/data";
import { useLanguage } from "@/lib/i18n";

export default function CoursesContent() {
  const { t } = useLanguage();
  const page = t.coursesPage;

  return (
    <div className="mx-auto max-w-[1440px] px-6 pb-24 pt-36 md:px-10 md:pt-44">
      <div className="max-w-2xl">
        <span className="mb-4 block font-mono text-xs uppercase tracking-[0.3em] text-mist">
          {page.kicker}
        </span>
        <h1 className="font-serif text-[clamp(2.25rem,5.5vw,4.5rem)] font-medium leading-[1.05] tracking-tight">
          {page.heading}
        </h1>
        <p className="mt-6 max-w-md text-base leading-relaxed text-ink/70">
          {page.body}
        </p>
      </div>

      <div className="mt-16 flex flex-col gap-16 md:mt-24 md:gap-24">
        {page.courses.map((course, i) => (
          <motion.article
            key={course.slug}
            initial={{ opacity: 0, y: 32 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-10% 0px" }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            className="grid grid-cols-1 gap-8 border-t border-line pt-10 md:grid-cols-12 md:gap-10"
          >
            <div className="relative aspect-[4/5] w-full overflow-hidden bg-cloud md:col-span-5">
              <Image
                src={COURSE_IMAGES[course.slug]}
                alt={course.title}
                fill
                sizes="(min-width: 768px) 40vw, 100vw"
                className="object-cover"
              />
            </div>

            <div className="flex flex-col justify-center md:col-span-7">
              <div className="flex items-baseline gap-3">
                <span className="font-mono text-xs text-mist">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <span className="font-mono text-[11px] uppercase tracking-[0.2em] text-mist">
                  {course.level}
                </span>
              </div>
              <h2 className="mt-3 font-serif text-2xl font-medium leading-tight tracking-tight md:text-3xl">
                {course.title}
              </h2>
              <p className="mt-4 max-w-lg text-sm leading-relaxed text-ink/70">
                {course.description}
              </p>

              <ul className="mt-6 flex flex-col gap-2">
                {course.highlights.map((highlight) => (
                  <li
                    key={highlight}
                    className="flex items-baseline gap-3 text-sm text-ink/70"
                  >
                    <span className="h-px w-4 shrink-0 translate-y-[-4px] bg-ink/40" />
                    {highlight}
                  </li>
                ))}
              </ul>

              <div className="mt-6 flex flex-wrap gap-x-8 gap-y-2 border-t border-line pt-6 font-mono text-[11px] uppercase tracking-[0.15em] text-mist">
                <span>{course.format}</span>
                <span>{course.duration}</span>
                <span>{course.price}</span>
              </div>

              <Link
                href="/contact"
                className="cursor-hover group mt-8 inline-flex w-fit items-center gap-3 border border-ink px-5 py-2.5 font-mono text-xs uppercase tracking-[0.2em] text-ink transition-colors duration-300 hover:bg-ink hover:text-paper"
              >
                {page.ctaLabel}
                <span className="transition-transform duration-300 group-hover:translate-x-1">
                  &rarr;
                </span>
              </Link>
            </div>
          </motion.article>
        ))}
      </div>
    </div>
  );
}
