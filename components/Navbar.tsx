"use client";

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

  return (
    <header className="fixed inset-x-0 top-0 z-50 mix-blend-difference">
      <div className="mx-auto flex max-w-[1440px] items-center justify-between px-5 py-5 sm:px-6 sm:py-6 md:px-10 md:py-8">
        <Link
          href="/"
          className="cursor-hover -m-2 truncate p-2 font-serif text-base tracking-[0.06em] text-paper sm:text-lg sm:tracking-[0.08em]"
        >
          Quân Vic Foto
        </Link>

        <div className="flex items-center gap-4 sm:gap-6">
          <LanguageSwitcher className="text-paper" />

          <button
            type="button"
            onClick={onToggle}
            aria-expanded={menuOpen}
            aria-controls="site-menu"
            className="cursor-hover group -m-2 flex items-center gap-2 p-2 text-paper sm:gap-3"
          >
            <span className="text-xs uppercase tracking-[0.3em]">
              {menuOpen ? t.menu.toggleClose : t.menu.toggleOpen}
            </span>
            <span className="relative flex h-4 w-6 flex-col justify-between">
              <motion.span
                className="h-px w-full bg-paper"
                animate={
                  menuOpen
                    ? { rotate: 45, y: 7.5 }
                    : { rotate: 0, y: 0 }
                }
                transition={{ duration: 0.3, ease: "easeInOut" }}
              />
              <motion.span
                className="h-px w-full bg-paper"
                animate={{ opacity: menuOpen ? 0 : 1 }}
                transition={{ duration: 0.2 }}
              />
              <motion.span
                className="h-px w-full bg-paper"
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
    </header>
  );
}
