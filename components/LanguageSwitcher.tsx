"use client";

import { useLanguage } from "@/lib/i18n";

export default function LanguageSwitcher({
  className = "",
}: {
  className?: string;
}) {
  const { lang, setLang } = useLanguage();

  return (
    <div
      className={`flex items-center text-xs font-medium tracking-[0.15em] ${className}`}
      role="group"
      aria-label="Language"
    >
      <button
        type="button"
        onClick={() => setLang("vi")}
        aria-pressed={lang === "vi"}
        className={`cursor-hover flex h-8 min-w-[2rem] items-center justify-center px-1 transition-opacity active:scale-95 ${lang === "vi" ? "opacity-100" : "opacity-40 hover:opacity-70"}`}
      >
        VI
      </button>
      <span aria-hidden="true" className="opacity-40">
        /
      </span>
      <button
        type="button"
        onClick={() => setLang("en")}
        aria-pressed={lang === "en"}
        className={`cursor-hover flex h-8 min-w-[2rem] items-center justify-center px-1 transition-opacity active:scale-95 ${lang === "en" ? "opacity-100" : "opacity-40 hover:opacity-70"}`}
      >
        EN
      </button>
    </div>
  );
}
