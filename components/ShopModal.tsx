"use client";

import { forwardRef, useEffect, useRef, useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import type { PortfolioItem } from "@/lib/data";
import { useLanguage } from "@/lib/i18n";

const fieldClass =
  "border-b border-line bg-transparent py-3 text-base outline-none transition-colors focus:border-ink";
const labelClass = "font-mono text-xs uppercase tracking-[0.2em] text-mist";

const FieldInput = forwardRef<
  HTMLInputElement,
  {
    id: string;
    label: string;
    name: string;
    type: string;
    required?: boolean;
    autoComplete?: string;
  }
>(function FieldInput({ id, label, name, type, required, autoComplete }, ref) {
  return (
    <div className="flex flex-col gap-2">
      <label htmlFor={id} className={labelClass}>
        {label}
      </label>
      <input
        ref={ref}
        id={id}
        name={name}
        type={type}
        required={required}
        autoComplete={autoComplete}
        className={fieldClass}
      />
    </div>
  );
});

export default function ShopModal({
  product,
  onClose,
}: {
  product: PortfolioItem | null;
  onClose: () => void;
}) {
  const { t } = useLanguage();
  const s = t.shopPage;
  const m = s.modal;
  const open = product !== null;
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">(
    "idle",
  );
  const firstFieldRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (!open) return;
    const timer = setTimeout(() => firstFieldRef.current?.focus(), 400);
    return () => clearTimeout(timer);
  }, [open]);

  useEffect(() => {
    if (!open) {
      setStatus("idle");
      return;
    }
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, onClose]);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!product) return;
    setStatus("sending");

    const data = new FormData(e.currentTarget);
    const payload = {
      name: String(data.get("name") ?? ""),
      contact: String(data.get("contact") ?? ""),
      license: String(data.get("license") ?? ""),
      message: String(data.get("message") ?? ""),
      product: product.concept,
      productSlug: product.slug,
    };

    try {
      const res = await fetch("/api/shop", {
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
    <AnimatePresence>
      {open && product && (
        <motion.div
          role="dialog"
          aria-modal="true"
          aria-labelledby="shop-title"
          className="fixed inset-0 z-[80] flex items-end justify-center md:items-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
        >
          <motion.button
            type="button"
            aria-label={m.closeAria}
            className="absolute inset-0 bg-ink/70 backdrop-blur-sm"
            onClick={onClose}
          />

          <motion.div
            data-lenis-prevent
            initial={{ y: 40, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 24, opacity: 0 }}
            transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
            className="relative max-h-[92dvh] w-full max-w-lg overflow-y-auto overscroll-contain bg-paper px-6 pb-[max(2.5rem,env(safe-area-inset-bottom))] pt-10 md:px-12 md:py-14"
          >
            <button
              type="button"
              onClick={onClose}
              aria-label={m.closeAria}
              className="cursor-hover absolute right-5 top-5 flex h-11 w-11 items-center justify-center font-mono text-xs uppercase tracking-[0.2em] text-mist transition-colors hover:text-ink"
            >
              {m.close}
            </button>

            {status !== "sent" ? (
              <>
                <span className="mb-3 block font-mono text-xs uppercase tracking-[0.3em] text-mist">
                  {m.kicker}
                </span>
                <h2
                  id="shop-title"
                  className="font-serif text-3xl font-medium leading-tight tracking-tight md:text-4xl"
                >
                  {m.heading}
                </h2>
                <p className="mt-4 text-sm leading-relaxed text-ink/60">
                  {m.intro}
                </p>

                <div className="mt-6 flex items-center gap-4 border border-line p-3">
                  <div className="relative h-16 w-16 shrink-0 overflow-hidden bg-cloud">
                    <Image
                      src={product.images[0]}
                      alt={product.concept}
                      fill
                      draggable={false}
                      sizes="64px"
                      className="pointer-events-none select-none object-cover"
                    />
                  </div>
                  <div>
                    <span className={labelClass}>{m.productLabel}</span>
                    <p className="font-serif text-lg">{product.concept}</p>
                  </div>
                </div>

                <form
                  onSubmit={handleSubmit}
                  className="mt-8 flex flex-col gap-7"
                >
                  <FieldInput
                    ref={firstFieldRef}
                    id="s-name"
                    label={m.nameLabel}
                    name="name"
                    type="text"
                    required
                    autoComplete="name"
                  />
                  <FieldInput
                    id="s-contact"
                    label={m.contactLabel}
                    name="contact"
                    type="text"
                    required
                    autoComplete="tel"
                  />

                  <div className="flex flex-col gap-2">
                    <label htmlFor="s-license" className={labelClass}>
                      {m.licenseFieldLabel}
                    </label>
                    <select
                      id="s-license"
                      name="license"
                      defaultValue=""
                      required
                      className={`cursor-hover ${fieldClass}`}
                    >
                      <option value="" disabled>
                        {m.licensePlaceholder}
                      </option>
                      {s.licenseOptions.map((opt) => (
                        <option key={opt.value} value={opt.value}>
                          {opt.label}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className="flex flex-col gap-2">
                    <label htmlFor="s-message" className={labelClass}>
                      {m.messageLabel}
                    </label>
                    <textarea
                      id="s-message"
                      name="message"
                      rows={3}
                      className={`resize-none ${fieldClass}`}
                    />
                  </div>

                  {status === "error" && (
                    <p role="alert" className="text-xs leading-relaxed text-red-600">
                      {m.submitError}
                    </p>
                  )}

                  <button
                    type="submit"
                    disabled={status === "sending"}
                    className="cursor-hover mt-2 inline-flex w-full items-center justify-center border border-ink bg-ink px-8 py-4 font-mono text-sm uppercase tracking-[0.25em] text-paper transition-colors duration-300 hover:bg-paper hover:text-ink disabled:opacity-50 sm:w-fit"
                  >
                    {status === "sending" ? m.submitSending : s.ctaLabel}
                  </button>
                </form>
              </>
            ) : (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                role="status"
                aria-live="polite"
                className="flex min-h-[320px] flex-col justify-center"
              >
                <span className="mb-3 block font-mono text-xs uppercase tracking-[0.3em] text-mist">
                  {m.successKicker}
                </span>
                <p className="font-serif text-2xl italic leading-snug md:text-3xl">
                  {m.successMessage}
                </p>
                <button
                  type="button"
                  onClick={onClose}
                  className="cursor-hover mt-10 inline-flex w-fit items-center border-b border-ink pb-1 font-mono text-sm uppercase tracking-[0.2em] transition-colors hover:border-mist hover:text-mist"
                >
                  {m.close}
                </button>
              </motion.div>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
