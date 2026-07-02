"use client";

import { useEffect, useRef } from "react";
import Lenis from "lenis";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { setLenisInstance } from "@/lib/lenis";

export default function SmoothScroll({
  children,
  paused = false,
}: {
  children: React.ReactNode;
  paused?: boolean;
}) {
  const lenisRef = useRef<Lenis | null>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const lenis = new Lenis({
      duration: 1.1,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
    });
    lenisRef.current = lenis;
    setLenisInstance(lenis);

    lenis.on("scroll", ScrollTrigger.update);

    const onTick = (time: number) => {
      lenis.raf(time * 1000);
    };
    gsap.ticker.add(onTick);
    gsap.ticker.lagSmoothing(0);

    return () => {
      gsap.ticker.remove(onTick);
      lenis.destroy();
      setLenisInstance(null);
    };
  }, []);

  useEffect(() => {
    if (!lenisRef.current) return;
    if (paused) {
      lenisRef.current.stop();
    } else {
      lenisRef.current.start();
    }
    // Lenis toggles its own `lenis-stopped` class, but that can get stuck
    // if `stop()` is called immediately after construction (before Lenis's
    // own init cycle runs) — e.g. on mount, while the preloader is up. We
    // drive the actual overflow lock from our own class instead, so it's
    // never dependent on Lenis's internal state syncing correctly.
    document.documentElement.classList.toggle("scroll-locked", paused);
  }, [paused]);

  return <>{children}</>;
}
