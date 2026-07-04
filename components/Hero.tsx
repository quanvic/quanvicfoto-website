"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { HERO_IMAGE } from "@/lib/data";
import { useLanguage } from "@/lib/i18n";
import { blurProps } from "@/lib/blur-data";
import CornerBrackets from "@/components/CornerBrackets";

export default function Hero() {
  const { t } = useLanguage();
  const wrapperRef = useRef<HTMLDivElement>(null);
  const sectionRef = useRef<HTMLElement>(null);
  const imageWrapRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);
  const cueRef = useRef<HTMLDivElement>(null);
  const bracketsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    // Uses a tall wrapper + CSS `sticky` section instead of ScrollTrigger's
    // `pin: true`, which reparents the DOM node into a spacer it creates and
    // conflicts with React's reconciliation (removeChild errors on unmount).
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: wrapperRef.current,
          start: "top top",
          end: "bottom bottom",
          // scrub: true (not a numeric lag) — Lenis already smooths the
          // scroll itself, so adding GSAP's own catch-up delay on top
          // stacked two independent smoothing systems and showed up as
          // visible micro-jitter on the scaling hero image, since any
          // tiny mismatch between the two is amplified on a full-bleed
          // image transform.
          scrub: true,
        },
      });

      tl.to(imageWrapRef.current, { scale: 1, ease: "none" }, 0)
        .to(
          titleRef.current,
          { yPercent: -35, opacity: 0, ease: "none" },
          0,
        )
        .to(cueRef.current, { opacity: 0, ease: "none" }, 0)
        .to(bracketsRef.current, { opacity: 0, ease: "none" }, 0);
    }, wrapperRef);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={wrapperRef} className="relative h-[190dvh] w-full">
      <section
        ref={sectionRef}
        className="sticky top-0 h-[100dvh] w-full overflow-hidden bg-ink"
      >
        <div
          ref={imageWrapRef}
          className="absolute inset-0 scale-[1.18] will-change-transform"
        >
          <Image
            src={HERO_IMAGE}
            alt="Chân dung Beauty Editorial ánh sáng studio chuyên nghiệp tại Hà Nội - Quân Vic Foto"
            fill
            priority
            {...blurProps(HERO_IMAGE)}
            sizes="100vw"
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-ink/70 via-ink/10 to-ink/40" />
          <div
            aria-hidden="true"
            className="absolute inset-x-0 top-1/2 h-[60%] -translate-y-1/2 bg-[radial-gradient(ellipse_65%_60%_at_50%_50%,rgba(0,0,0,0.5),transparent_72%)]"
          />
        </div>

        <div
          ref={titleRef}
          className="relative z-10 flex h-full flex-col items-center justify-center px-6 text-center"
        >
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 2.05, duration: 0.8, ease: "easeOut" }}
            className="mb-6 font-mono text-xs uppercase tracking-[0.4em] text-paper/80"
          >
            {t.hero.kicker}
          </motion.p>

          <motion.h1
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 2.2, duration: 0.9, ease: "easeOut" }}
            className="font-serif text-[clamp(2.75rem,9vw,8rem)] font-medium leading-[0.95] tracking-tight text-paper"
          >
            {t.hero.titleTop}
            <br />
            <span className="italic">{t.hero.titleItalic}</span>{" "}
            {t.hero.titleRest}
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 2.35, duration: 0.8, ease: "easeOut" }}
            className="mt-8 max-w-md text-sm leading-relaxed text-paper/75"
          >
            {t.hero.subtitle}
          </motion.p>
        </div>

        {/* Signature moment: the frame "locks focus" on the subject right
            after the title has landed — the one deliberate flourish this
            page spends its boldness on, borrowed from the photographer's
            own viewfinder rather than a decorative flourish. Split into an
            outer plain div (GSAP's scroll-scrub fade, same pattern as
            titleRef/cueRef) and an inner motion.div (Framer's entrance) —
            putting both animations on one element let GSAP's context
            capture the pre-entrance opacity (0) as its scrub "start" value
            at mount, permanently overriding Framer's own fade-in. */}
        <div
          ref={bracketsRef}
          className="pointer-events-none absolute inset-x-[12%] inset-y-[15%] z-10 text-paper/70 md:inset-x-[20%] md:inset-y-[13%]"
        >
          <motion.div
            initial={{ opacity: 0, scale: 1.12 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 2.9, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="h-full w-full"
          >
            <CornerBrackets size={26} thickness={1.5} />
          </motion.div>
        </div>

        <div
          ref={cueRef}
          className="absolute inset-x-0 bottom-8 z-10 flex flex-col items-center gap-3 text-paper/70"
        >
          <span className="font-mono text-[10px] uppercase tracking-[0.3em]">
            {t.hero.scroll}
          </span>
          <span className="h-10 w-px overflow-hidden bg-paper/30">
            <span className="scroll-cue-line block h-full w-full origin-top bg-paper" />
          </span>
        </div>
      </section>
    </div>
  );
}
