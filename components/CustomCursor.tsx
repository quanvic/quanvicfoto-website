"use client";

import { useEffect, useState, useSyncExternalStore } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

const RING_SIZE = 44; // px — hover-state diameter; default dot achieved via scale
const DOT_SCALE = 8 / RING_SIZE;

function subscribeNoop() {
  return () => {};
}
function getFinePointer() {
  return window.matchMedia("(pointer: fine)").matches;
}
function getFinePointerServer() {
  return false;
}

export default function CustomCursor() {
  const enabled = useSyncExternalStore(
    subscribeNoop,
    getFinePointer,
    getFinePointerServer,
  );
  const [hovering, setHovering] = useState(false);
  const x = useMotionValue(-100);
  const y = useMotionValue(-100);
  const springX = useSpring(x, { stiffness: 500, damping: 40, mass: 0.4 });
  const springY = useSpring(y, { stiffness: 500, damping: 40, mass: 0.4 });

  useEffect(() => {
    if (!enabled) return;

    document.documentElement.classList.add("has-custom-cursor");

    const move = (e: MouseEvent) => {
      x.set(e.clientX);
      y.set(e.clientY);
    };
    const over = (e: MouseEvent) => {
      const target = (e.target as HTMLElement)?.closest(".cursor-hover");
      setHovering(Boolean(target));
    };

    window.addEventListener("mousemove", move);
    window.addEventListener("mouseover", over);
    return () => {
      window.removeEventListener("mousemove", move);
      window.removeEventListener("mouseover", over);
      document.documentElement.classList.remove("has-custom-cursor");
    };
  }, [enabled, x, y]);

  if (!enabled) return null;

  return (
    <motion.div
      aria-hidden
      className="pointer-events-none fixed left-0 top-0 z-[90] mix-blend-difference"
      style={{ x: springX, y: springY }}
    >
      <motion.div
        className="-translate-x-1/2 -translate-y-1/2 rounded-full border border-paper bg-paper"
        style={{ width: RING_SIZE, height: RING_SIZE }}
        animate={{
          scale: hovering ? 1 : DOT_SCALE,
          backgroundColor: hovering ? "rgba(255,255,255,0)" : "rgba(255,255,255,1)",
        }}
        transition={{ duration: 0.25, ease: "easeOut" }}
      />
    </motion.div>
  );
}
