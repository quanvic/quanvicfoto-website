"use client";

import Link from "next/link";
import { PHONE_DISPLAY, PHONE_TEL, SOCIAL_LINKS } from "@/lib/data";
import { useLanguage } from "@/lib/i18n";

const underlineLinkClass =
  "cursor-hover relative -my-2 w-fit py-2 text-xs uppercase tracking-[0.2em] text-ink after:absolute after:-bottom-1 after:left-0 after:h-px after:w-0 after:bg-ink after:transition-all after:duration-300 after:content-[''] hover:after:w-full";

export default function Footer({
  onBookingOpen,
}: {
  onBookingOpen?: () => void;
}) {
  const { t } = useLanguage();

  return (
    <footer className="border-t border-line bg-paper px-6 py-10 md:px-10">
      <div className="flex flex-col gap-8 md:flex-row md:items-center md:justify-between">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:gap-6">
          <p className="text-xs uppercase tracking-[0.2em] text-mist">
            &copy; {new Date().getFullYear()} Quân Vic Foto. {t.footer.rights}
          </p>

          <a
            href={`tel:${PHONE_TEL}`}
            className="cursor-hover inline-flex w-fit items-center gap-2 rounded-full border border-ink px-4 py-2.5 text-xs uppercase tracking-[0.2em] text-ink transition-colors duration-300 hover:bg-ink hover:text-paper"
          >
            <svg
              width="13"
              height="13"
              viewBox="0 0 24 24"
              fill="none"
              aria-hidden="true"
            >
              <path
                d="M6.6 10.8c1.4 2.8 3.8 5.1 6.6 6.6l2.2-2.2c.3-.3.7-.4 1-.2 1.1.4 2.3.6 3.6.6.6 0 1 .4 1 1V20c0 .6-.4 1-1 1C10.6 21 3 13.4 3 4c0-.6.4-1 1-1h3.4c.6 0 1 .4 1 1 0 1.3.2 2.5.6 3.6.1.4 0 .8-.2 1l-2.2 2.2Z"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            {PHONE_DISPLAY}
          </a>
        </div>

        <div className="flex flex-wrap items-center gap-x-8 gap-y-1">
          {onBookingOpen && (
            <button
              type="button"
              onClick={onBookingOpen}
              className={underlineLinkClass}
            >
              {t.footer.booking}
            </button>
          )}
          {SOCIAL_LINKS.map((s) => (
            <a
              key={s.href}
              href={s.href}
              target="_blank"
              rel="noreferrer"
              className={underlineLinkClass}
            >
              {s.label}
            </a>
          ))}
          <Link href="/contact" className={underlineLinkClass}>
            {t.footer.contact}
          </Link>
        </div>
      </div>
    </footer>
  );
}
