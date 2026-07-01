"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function Preloader({
  onDone,
}: {
  onDone: () => void;
}) {
  const [count, setCount] = useState(0);
  const [done, setDone] = useState(false);

  useEffect(() => {
    document.documentElement.style.overflow = "hidden";

    const start = performance.now();
    const duration = 1800;

    let frame: number;
    const tick = (now: number) => {
      const progress = Math.min(1, (now - start) / duration);
      setCount(Math.floor(progress * 100));
      if (progress < 1) {
        frame = requestAnimationFrame(tick);
      } else {
        setTimeout(() => setDone(true), 250);
      }
    };
    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, []);

  useEffect(() => {
    if (done) {
      document.documentElement.style.overflow = "";
    }
  }, [done]);

  return (
    <AnimatePresence onExitComplete={onDone}>
      {!done && (
        <motion.div
          className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-ink text-paper"
          initial={{ clipPath: "inset(0 0 0 0)" }}
          exit={{ clipPath: "inset(0 0 100% 0)" }}
          transition={{ duration: 0.9, ease: [0.76, 0, 0.24, 1] }}
        >
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="font-serif italic text-sm tracking-[0.3em] uppercase text-paper/60 mb-6"
          >
            Quân Vic Foto
          </motion.p>
          <div className="font-serif text-[clamp(3rem,10vw,7rem)] leading-none tabular-nums">
            {count}
          </div>
          <div className="mt-8 h-px w-40 overflow-hidden bg-paper/20">
            <motion.div
              className="h-full bg-paper"
              style={{ width: `${count}%` }}
            />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
