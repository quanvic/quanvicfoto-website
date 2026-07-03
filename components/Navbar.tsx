"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { useLanguage } from "@/lib/i18n";
import LanguageSwitcher from "@/components/LanguageSwitcher";

export default function Navbar({
  menuOpen,
  onToggle,
}: {
  menuOpen: boolean;
  onToggle: () => void;
}) {
  const { t } = useLanguage();
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-[background-color,backdrop-filter] duration-300 ${
        scrolled ? "bg-paper/90 shadow-[0_1px_0_0_rgba(0,0,0,0.06)] backdrop-blur-md" : "bg-transparent"
      }`}
    >
      {/* mix-blend-difference keeps the logo/menu legible over the hero's
          varying imagery, but that trick reads as low-contrast, washed-out
          text once the navbar is over a plain white section — so once
          scrolled (navbar has its own bg-paper/10 chip behind it) we drop
          the blend mode and use solid ink text instead. */}
      <div className={scrolled ? "" : "mix-blend-difference"}>
        <div className="mx-auto flex max-w-[1440px] items-center justify-between px-5 py-5 sm:px-6 sm:py-6 md:px-10 md:py-8">
          <Link
            href="/"
            className={`cursor-hover -m-2 truncate p-2 font-serif text-base tracking-[0.06em] sm:text-lg sm:tracking-[0.08em] ${scrolled ? "text-ink" : "text-paper"}`}
          >
            Quân Vic Foto
          </Link>

          <div className="flex items-center gap-4 sm:gap-6">
            <LanguageSwitcher className={scrolled ? "text-ink" : "text-paper"} />

            <button
              type="button"
              onClick={onToggle}
              aria-expanded={menuOpen}
              aria-controls="site-menu"
              aria-label={menuOpen ? t.menu.toggleClose : t.menu.toggleOpen}
              className={`cursor-hover group -m-2 flex h-11 w-11 items-center justify-center gap-2 p-2 sm:w-auto sm:gap-3 ${scrolled ? "text-ink" : "text-paper"}`}
            >
              <span className="hidden font-mono text-xs uppercase tracking-[0.3em] sm:inline">
                {menuOpen ? t.menu.toggleClose : t.menu.toggleOpen}
              </span>
              <span className="relative flex h-4 w-6 flex-col justify-between">
                <motion.span
                  className={`h-px w-full ${scrolled ? "bg-ink" : "bg-paper"}`}
                  animate={
                    menuOpen
                      ? { rotate: 45, y: 7.5 }
                      : { rotate: 0, y: 0 }
                  }
                  transition={{ duration: 0.3, ease: "easeInOut" }}
                />
                <motion.span
                  className={`h-px w-full ${scrolled ? "bg-ink" : "bg-paper"}`}
                  animate={{ opacity: menuOpen ? 0 : 1 }}
                  transition={{ duration: 0.2 }}
                />
                <motion.span
                  className={`h-px w-full ${scrolled ? "bg-ink" : "bg-paper"}`}
                  animate={
                    menuOpen
                      ? { rotate: -45, y: -7.5 }
                      : { rotate: 0, y: 0 }
                  }
                  transition={{ duration: 0.3, ease: "easeInOut" }}
                />
              </span>
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}
