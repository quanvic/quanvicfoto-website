"use client";

import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { MENU_ITEMS, SOCIAL_LINKS } from "@/lib/data";
import { useLanguage } from "@/lib/i18n";

const itemClass =
  "cursor-hover group flex items-baseline gap-4 font-serif text-[clamp(2.5rem,8vw,5.5rem)] leading-[1.05] text-paper transition-colors hover:text-paper/50";

const listVariants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.06, delayChildren: 0.25 },
  },
};

const itemVariants = {
  hidden: { y: "110%" },
  visible: {
    y: "0%",
    transition: { duration: 0.7, ease: [0.76, 0, 0.24, 1] as const },
  },
};

const NAV_KEY_BY_HREF: Record<string, "home" | "portfolio" | "about" | "contact"> = {
  "/": "home",
  "/portfolio": "portfolio",
  "/about": "about",
  "/contact": "contact",
};

export default function MenuOverlay({
  open,
  onClose,
  onBookingOpen,
}: {
  open: boolean;
  onClose: () => void;
  onBookingOpen: () => void;
}) {
  const { t } = useLanguage();

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          id="site-menu"
          className="fixed inset-0 z-40 flex flex-col justify-between bg-ink px-6 py-28 text-paper md:px-10"
          initial={{ clipPath: "inset(0 0 100% 0)" }}
          animate={{ clipPath: "inset(0 0 0% 0)" }}
          exit={{ clipPath: "inset(0 0 100% 0)" }}
          transition={{ duration: 0.7, ease: [0.76, 0, 0.24, 1] }}
        >
          <motion.nav
            variants={listVariants}
            initial="hidden"
            animate="visible"
            className="flex flex-1 flex-col justify-center gap-2"
          >
            {MENU_ITEMS.map((item, i) => {
              const label =
                item.type === "link"
                  ? t.nav[NAV_KEY_BY_HREF[item.href]]
                  : t.nav.booking;
              return (
                <div
                  key={item.type === "link" ? item.href : item.action}
                  className="overflow-hidden"
                >
                  <motion.div variants={itemVariants}>
                    {item.type === "link" ? (
                      <Link
                        href={item.href}
                        onClick={onClose}
                        className={itemClass}
                      >
                        <span className="font-sans text-sm text-paper/40">
                          0{i + 1}
                        </span>
                        {label}
                      </Link>
                    ) : (
                      <button
                        type="button"
                        onClick={() => {
                          onClose();
                          onBookingOpen();
                        }}
                        className={itemClass}
                      >
                        <span className="font-sans text-sm text-paper/40">
                          0{i + 1}
                        </span>
                        {label}
                      </button>
                    )}
                  </motion.div>
                </div>
              );
            })}
          </motion.nav>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ delay: 0.3, duration: 0.4 }}
            className="flex flex-col gap-6 border-t border-paper/15 pt-8 md:flex-row md:items-end md:justify-between"
          >
            <p className="max-w-xs text-sm leading-relaxed text-paper/60">
              {t.menu.tagline}
            </p>
            <div className="flex items-center gap-8">
              {SOCIAL_LINKS.map((social) => (
                <a
                  key={social.href}
                  href={social.href}
                  target="_blank"
                  rel="noreferrer"
                  className="cursor-hover text-sm uppercase tracking-[0.2em] text-paper/60 transition-colors hover:text-paper"
                >
                  {social.label}
                </a>
              ))}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
