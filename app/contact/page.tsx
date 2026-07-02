"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { PHONE_DISPLAY, PHONE_TEL, SOCIAL_LINKS } from "@/lib/data";
import { useLanguage } from "@/lib/i18n";

const fieldClass =
  "border border-line bg-transparent px-4 py-3 text-base outline-none transition-all duration-300 focus:border-ink focus:ring-1 focus:ring-ink/15";
const labelClass = "font-mono text-xs uppercase tracking-[0.2em] text-mist";

export default function ContactPage() {
  const { t } = useLanguage();
  const page = t.contactPage;
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">(
    "idle",
  );

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("sending");

    const data = new FormData(e.currentTarget);
    const payload = {
      name: String(data.get("name") ?? ""),
      email: String(data.get("email") ?? ""),
      project: String(data.get("project") ?? ""),
      message: String(data.get("message") ?? ""),
    };

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      if (!res.ok) throw new Error("request_failed");
      setStatus("sent");
    } catch {
      setStatus("error");
    }
  }

  return (
    <div className="mx-auto max-w-[1440px] px-6 pb-24 pt-36 md:px-10 md:pt-44">
      <div className="grid grid-cols-1 gap-16 md:grid-cols-2 md:gap-24">
        <div>
          <span className="mb-4 block font-mono text-xs uppercase tracking-[0.3em] text-mist">
            {page.kicker}
          </span>
          <h1 className="font-serif text-[clamp(2.25rem,5.5vw,4.5rem)] font-medium leading-[1.05] tracking-tight">
            {page.heading}
          </h1>
          <p className="mt-8 max-w-sm text-base leading-relaxed text-ink/70">
            {page.body}
          </p>

          <div className="mt-12 flex flex-col gap-3">
            <a
              href="mailto:quanvicfoto@gmail.com"
              className="cursor-hover w-fit border-b border-ink pb-1 text-lg transition-colors hover:border-mist hover:text-mist"
            >
              quanvicfoto@gmail.com
            </a>
            <a
              href={`tel:${PHONE_TEL}`}
              className="cursor-hover w-fit font-mono text-sm text-mist transition-colors hover:text-ink"
            >
              {PHONE_DISPLAY}
            </a>
          </div>

          <div className="mt-12 flex gap-8 border-t border-line pt-8">
            {SOCIAL_LINKS.map((s) => (
              <a
                key={s.href}
                href={s.href}
                target="_blank"
                rel="noreferrer"
                className="cursor-hover font-mono text-xs uppercase tracking-[0.2em] text-ink transition-colors hover:text-mist"
              >
                {s.label}
              </a>
            ))}
          </div>
        </div>

        <div className="relative min-h-[480px]">
          <AnimatePresence mode="wait">
            {status === "sent" ? (
              <motion.div
                key="success"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.5, ease: "easeOut" }}
                role="status"
                aria-live="polite"
                className="flex min-h-[480px] flex-col justify-center"
              >
                <span className="mb-3 block font-mono text-xs uppercase tracking-[0.3em] text-mist">
                  {page.successKicker}
                </span>
                <p className="font-serif text-2xl italic leading-snug md:text-3xl">
                  {page.successMessage}
                </p>
                <button
                  type="button"
                  onClick={() => setStatus("idle")}
                  className="cursor-hover mt-10 inline-flex w-fit items-center border-b border-ink pb-1 font-mono text-sm uppercase tracking-[0.2em] transition-colors hover:border-mist hover:text-mist"
                >
                  {page.resetLabel}
                </button>
              </motion.div>
            ) : (
              <motion.form
                key="form"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.5, ease: "easeOut" }}
                onSubmit={handleSubmit}
                className="flex flex-col gap-8"
              >
                <div className="flex flex-col gap-2">
                  <label htmlFor="name" className={labelClass}>
                    {page.nameLabel}
                  </label>
                  <input
                    id="name"
                    name="name"
                    type="text"
                    required
                    autoComplete="name"
                    className={fieldClass}
                  />
                </div>

                <div className="flex flex-col gap-2">
                  <label htmlFor="email" className={labelClass}>
                    {page.emailLabel}
                  </label>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    required
                    autoComplete="email"
                    className={fieldClass}
                  />
                </div>

                <div className="flex flex-col gap-2">
                  <label htmlFor="project" className={labelClass}>
                    {page.projectLabel}
                  </label>
                  <select
                    id="project"
                    name="project"
                    defaultValue="editorial"
                    className={`cursor-hover ${fieldClass}`}
                  >
                    {page.projectOptions.map((option) => (
                      <option key={option.value} value={option.value}>
                        {option.label}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="flex flex-col gap-2">
                  <label htmlFor="message" className={labelClass}>
                    {page.messageLabel}
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    required
                    rows={4}
                    className={`resize-none ${fieldClass}`}
                  />
                </div>

                <AnimatePresence>
                  {status === "error" && (
                    <motion.p
                      key="error"
                      role="alert"
                      initial={{ opacity: 0, y: -6 }}
                      animate={{ opacity: 1, y: 0, x: [0, -6, 6, -4, 4, 0] }}
                      exit={{ opacity: 0, y: -6 }}
                      transition={{ duration: 0.45, ease: "easeOut" }}
                      className="flex items-start gap-2 border border-red-200 bg-red-50 px-4 py-3 text-xs leading-relaxed text-red-600"
                    >
                      <svg
                        width="15"
                        height="15"
                        viewBox="0 0 20 20"
                        fill="none"
                        aria-hidden="true"
                        className="mt-0.5 shrink-0"
                      >
                        <circle cx="10" cy="10" r="8.5" stroke="currentColor" strokeWidth="1.3" />
                        <path d="M10 6v5" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" />
                        <circle cx="10" cy="13.5" r="0.9" fill="currentColor" />
                      </svg>
                      {page.submitError}
                    </motion.p>
                  )}
                </AnimatePresence>

                <button
                  type="submit"
                  disabled={status === "sending"}
                  className="cursor-hover mt-4 inline-flex w-fit items-center gap-4 border border-ink bg-ink px-8 py-4 font-mono text-sm uppercase tracking-[0.2em] text-paper transition-colors duration-300 hover:bg-paper hover:text-ink disabled:opacity-50"
                >
                  {status === "sending" ? page.submitSending : page.submitIdle}
                </button>
              </motion.form>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
