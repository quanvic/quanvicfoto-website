"use client";

import { useState } from "react";
import { PHONE_DISPLAY, PHONE_TEL, SOCIAL_LINKS } from "@/lib/data";
import { useLanguage } from "@/lib/i18n";

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

        <form onSubmit={handleSubmit} className="flex flex-col gap-8">
          <div className="flex flex-col gap-2">
            <label
              htmlFor="name"
              className="font-mono text-xs uppercase tracking-[0.2em] text-mist"
            >
              {page.nameLabel}
            </label>
            <input
              id="name"
              name="name"
              type="text"
              required
              autoComplete="name"
              className="border-b border-line bg-transparent py-3 text-base outline-none transition-colors focus:border-ink"
            />
          </div>

          <div className="flex flex-col gap-2">
            <label
              htmlFor="email"
              className="font-mono text-xs uppercase tracking-[0.2em] text-mist"
            >
              {page.emailLabel}
            </label>
            <input
              id="email"
              name="email"
              type="email"
              required
              autoComplete="email"
              className="border-b border-line bg-transparent py-3 text-base outline-none transition-colors focus:border-ink"
            />
          </div>

          <div className="flex flex-col gap-2">
            <label
              htmlFor="project"
              className="font-mono text-xs uppercase tracking-[0.2em] text-mist"
            >
              {page.projectLabel}
            </label>
            <select
              id="project"
              name="project"
              defaultValue="editorial"
              className="cursor-hover border-b border-line bg-transparent py-3 text-base outline-none transition-colors focus:border-ink"
            >
              {page.projectOptions.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>

          <div className="flex flex-col gap-2">
            <label
              htmlFor="message"
              className="font-mono text-xs uppercase tracking-[0.2em] text-mist"
            >
              {page.messageLabel}
            </label>
            <textarea
              id="message"
              name="message"
              required
              rows={4}
              className="resize-none border-b border-line bg-transparent py-3 text-base outline-none transition-colors focus:border-ink"
            />
          </div>

          {status === "error" && (
            <p role="alert" className="text-xs leading-relaxed text-red-600">
              {page.submitError}
            </p>
          )}

          <button
            type="submit"
            disabled={status === "sending" || status === "sent"}
            className="cursor-hover mt-4 inline-flex w-fit items-center gap-4 border border-ink bg-ink px-8 py-4 font-mono text-sm uppercase tracking-[0.2em] text-paper transition-colors duration-300 hover:bg-paper hover:text-ink disabled:opacity-50"
          >
            {status === "idle" && page.submitIdle}
            {status === "sending" && page.submitSending}
            {status === "sent" && page.submitSent}
            {status === "error" && page.submitIdle}
          </button>
          <p aria-live="polite" className="sr-only">
            {status === "sent" ? page.srSent : ""}
          </p>
        </form>
      </div>
    </div>
  );
}
