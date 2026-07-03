"use client";

import { trackEvent } from "@/lib/analytics";
import { ZALO_URL } from "@/lib/data";

export default function ZaloButton() {
  return (
    <a
      href={ZALO_URL}
      target="_blank"
      rel="noreferrer"
      aria-label="Chat qua Zalo"
      onClick={() => trackEvent("zalo_click", { location: "floating_button" })}
      className="cursor-hover fixed bottom-6 right-6 z-[35] flex h-14 w-14 items-center justify-center rounded-full border border-[#0068FF] bg-[#0068FF] text-paper shadow-[0_8px_24px_rgba(0,104,255,0.35)] transition-transform duration-300 hover:brightness-110 active:scale-95 md:bottom-8 md:right-8"
    >
      <svg width="27" height="27" viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <path
          d="M12 3.5c-4.97 0-9 3.36-9 7.5 0 2.4 1.32 4.53 3.38 5.92-.14.98-.5 2.15-1.2 3.2 0 0 2.16-.3 3.98-1.55.9.25 1.86.38 2.84.38 4.97 0 9-3.36 9-7.5s-4.03-7.5-9-7.5Z"
          stroke="currentColor"
          strokeWidth="1.6"
          strokeLinejoin="round"
        />
        <circle cx="8.7" cy="11" r="1" fill="currentColor" />
        <circle cx="12" cy="11" r="1" fill="currentColor" />
        <circle cx="15.3" cy="11" r="1" fill="currentColor" />
      </svg>
    </a>
  );
}
