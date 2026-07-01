"use client";

import { forwardRef, useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { PORTFOLIO_ITEMS } from "@/lib/data";
import { useLanguage } from "@/lib/i18n";

const fieldClass =
  "border-b border-line bg-transparent py-3 text-base outline-none transition-colors focus:border-ink";
const labelClass = "font-mono text-xs uppercase tracking-[0.2em] text-mist";

const MAX_IMAGES = 10;
const MAX_FILE_BYTES = 4 * 1024 * 1024;
const COMPRESS_MAX_DIMENSION = 1600;
const COMPRESS_QUALITY = 0.72;

async function compressImage(file: File): Promise<File> {
  try {
    if (typeof createImageBitmap === "undefined") return file;
    const bitmap = await createImageBitmap(file);
    const scale = Math.min(
      1,
      COMPRESS_MAX_DIMENSION / Math.max(bitmap.width, bitmap.height),
    );
    const width = Math.round(bitmap.width * scale);
    const height = Math.round(bitmap.height * scale);

    const canvas = document.createElement("canvas");
    canvas.width = width;
    canvas.height = height;
    const ctx = canvas.getContext("2d");
    if (!ctx) return file;
    ctx.drawImage(bitmap, 0, 0, width, height);

    const blob = await new Promise<Blob | null>((resolve) =>
      canvas.toBlob(resolve, "image/jpeg", COMPRESS_QUALITY),
    );
    if (!blob || blob.size >= file.size) return file;

    const name = file.name.replace(/\.\w+$/, "") + ".jpg";
    return new File([blob], name, { type: "image/jpeg" });
  } catch {
    return file;
  }
}

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

type ImageEntry = { file: File; url: string };

export default function BookingModal({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) {
  const { t } = useLanguage();
  const b = t.booking;
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">(
    "idle",
  );
  const [images, setImages] = useState<ImageEntry[]>([]);
  const [imageError, setImageError] = useState<string | null>(null);
  const [dragActive, setDragActive] = useState(false);
  const firstFieldRef = useRef<HTMLInputElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const concepts = Array.from(new Set(PORTFOLIO_ITEMS.map((p) => p.concept)));

  useEffect(() => {
    if (!open) return;
    const timer = setTimeout(() => firstFieldRef.current?.focus(), 400);
    return () => clearTimeout(timer);
  }, [open]);

  useEffect(() => {
    if (!open) {
      setStatus("idle");
      setImages((prev) => {
        prev.forEach((entry) => URL.revokeObjectURL(entry.url));
        return [];
      });
      setImageError(null);
      return;
    }
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open, onClose]);

  useEffect(() => {
    return () => {
      images.forEach((entry) => URL.revokeObjectURL(entry.url));
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  async function addFiles(fileList: FileList | File[]) {
    const incoming = Array.from(fileList).filter((f) =>
      f.type.startsWith("image/"),
    );
    if (incoming.length === 0) return;

    const oversized = incoming.some((f) => f.size > MAX_FILE_BYTES);
    if (oversized) {
      setImageError(b.imagesTooLarge);
      return;
    }

    const room = MAX_IMAGES - images.length;
    if (room <= 0) {
      setImageError(b.imagesTooMany);
      return;
    }
    const accepted = incoming.slice(0, room);
    if (incoming.length > room) {
      setImageError(b.imagesTooMany);
    } else {
      setImageError(null);
    }

    // Resize/compress before upload — 10 originals at up to 4MB each can
    // total ~40MB, well past Vercel's ~4.5MB serverless request body
    // limit, which made every submission with attachments fail silently.
    const compressed = await Promise.all(accepted.map(compressImage));

    setImages((prev) => [
      ...prev,
      ...compressed.map((file) => ({ file, url: URL.createObjectURL(file) })),
    ]);
  }

  function removeImage(url: string) {
    setImages((prev) => {
      const target = prev.find((entry) => entry.url === url);
      if (target) URL.revokeObjectURL(target.url);
      return prev.filter((entry) => entry.url !== url);
    });
    setImageError(null);
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("sending");

    const formData = new FormData(e.currentTarget);
    images.forEach((entry) => formData.append("images", entry.file));

    try {
      const res = await fetch("/api/booking", {
        method: "POST",
        body: formData,
      });
      if (!res.ok) throw new Error("request_failed");
      setStatus("sent");
    } catch {
      setStatus("error");
    }
  }

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          role="dialog"
          aria-modal="true"
          aria-labelledby="booking-title"
          className="fixed inset-0 z-[80] flex items-end justify-center md:items-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
        >
          <motion.button
            type="button"
            aria-label={b.closeAria}
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
              aria-label={b.closeAria}
              className="cursor-hover absolute right-5 top-5 flex h-11 w-11 items-center justify-center font-mono text-xs uppercase tracking-[0.2em] text-mist transition-colors hover:text-ink"
            >
              {b.close}
            </button>

            {status !== "sent" ? (
              <>
                <span className="mb-3 block font-mono text-xs uppercase tracking-[0.3em] text-mist">
                  {b.kicker}
                </span>
                <h2
                  id="booking-title"
                  className="font-serif text-3xl font-medium leading-tight tracking-tight md:text-4xl"
                >
                  {b.heading}
                </h2>
                <p className="mt-4 text-sm leading-relaxed text-ink/60">
                  {b.intro}
                </p>

                <form
                  onSubmit={handleSubmit}
                  className="mt-10 flex flex-col gap-7"
                >
                  <FieldInput
                    ref={firstFieldRef}
                    id="b-name"
                    label={b.nameLabel}
                    name="name"
                    type="text"
                    required
                    autoComplete="name"
                  />
                  <FieldInput
                    id="b-contact"
                    label={b.contactLabel}
                    name="contact"
                    type="text"
                    required
                    autoComplete="tel"
                  />
                  <FieldInput
                    id="b-date"
                    label={b.dateLabel}
                    name="date"
                    type="date"
                    required
                  />

                  <div className="flex flex-col gap-2">
                    <label htmlFor="b-concept" className={labelClass}>
                      {b.conceptLabel}
                    </label>
                    <select
                      id="b-concept"
                      name="concept"
                      defaultValue=""
                      required
                      className={`cursor-hover ${fieldClass}`}
                    >
                      <option value="" disabled>
                        {b.conceptPlaceholder}
                      </option>
                      {concepts.map((c) => (
                        <option key={c} value={c}>
                          {c}
                        </option>
                      ))}
                      <option value="other">{b.conceptOther}</option>
                    </select>
                  </div>

                  <div className="flex flex-col gap-2">
                    <label htmlFor="b-message" className={labelClass}>
                      {b.messageLabel}
                    </label>
                    <textarea
                      id="b-message"
                      name="message"
                      rows={3}
                      className={`resize-none ${fieldClass}`}
                    />
                  </div>

                  <div className="flex flex-col gap-3">
                    <div className="flex items-baseline justify-between">
                      <span className={labelClass}>{b.imagesLabel}</span>
                      <span className="font-mono text-[11px] text-mist">
                        {images.length}/{MAX_IMAGES}
                      </span>
                    </div>

                    <input
                      ref={fileInputRef}
                      type="file"
                      accept="image/*"
                      multiple
                      className="sr-only"
                      onChange={(e) => {
                        if (e.target.files) addFiles(e.target.files);
                        e.target.value = "";
                      }}
                    />

                    <div className="grid grid-cols-4 gap-3 sm:grid-cols-5">
                      {images.map((entry) => (
                        <div
                          key={entry.url}
                          className="group relative aspect-square overflow-hidden bg-cloud"
                        >
                          {/* eslint-disable-next-line @next/next/no-img-element */}
                          <img
                            src={entry.url}
                            alt=""
                            className="h-full w-full object-cover"
                          />
                          <div className="absolute inset-0 bg-ink/0 transition-colors duration-200 group-hover:bg-ink/30" />
                          <button
                            type="button"
                            onClick={() => removeImage(entry.url)}
                            aria-label={b.imagesRemove}
                            className="cursor-hover absolute -right-1.5 -top-1.5 flex h-6 w-6 items-center justify-center rounded-full bg-ink text-paper shadow-sm transition-transform active:scale-90"
                          >
                            <svg
                              width="12"
                              height="12"
                              viewBox="0 0 20 20"
                              fill="none"
                              aria-hidden="true"
                            >
                              <path
                                d="M5 5L15 15M15 5L5 15"
                                stroke="currentColor"
                                strokeWidth="2"
                                strokeLinecap="round"
                              />
                            </svg>
                          </button>
                        </div>
                      ))}

                      {images.length < MAX_IMAGES && (
                        <button
                          type="button"
                          onClick={() => fileInputRef.current?.click()}
                          onDragOver={(e) => {
                            e.preventDefault();
                            setDragActive(true);
                          }}
                          onDragLeave={() => setDragActive(false)}
                          onDrop={(e) => {
                            e.preventDefault();
                            setDragActive(false);
                            if (e.dataTransfer.files) {
                              addFiles(e.dataTransfer.files);
                            }
                          }}
                          className={`cursor-hover flex aspect-square flex-col items-center justify-center gap-1 border text-mist transition-colors ${dragActive ? "border-ink text-ink" : "border-dashed border-line hover:border-ink hover:text-ink"}`}
                        >
                          <svg
                            width="18"
                            height="18"
                            viewBox="0 0 20 20"
                            fill="none"
                            aria-hidden="true"
                          >
                            <path
                              d="M10 4V16M4 10H16"
                              stroke="currentColor"
                              strokeWidth="1.6"
                              strokeLinecap="round"
                            />
                          </svg>
                        </button>
                      )}
                    </div>

                    <p className="font-mono text-[11px] leading-relaxed text-mist">
                      {imageError ?? b.imagesHint}
                    </p>
                  </div>

                  {status === "error" && (
                    <p role="alert" className="text-xs leading-relaxed text-red-600">
                      {b.submitError}
                    </p>
                  )}

                  <button
                    type="submit"
                    disabled={status === "sending"}
                    className="cursor-hover mt-2 inline-flex w-full items-center justify-center border border-ink bg-ink px-8 py-4 font-mono text-sm uppercase tracking-[0.25em] text-paper transition-colors duration-300 hover:bg-paper hover:text-ink disabled:opacity-50 sm:w-fit"
                  >
                    {status === "sending" ? b.submitSending : b.submitIdle}
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
                  {b.successKicker}
                </span>
                <p className="font-serif text-2xl italic leading-snug md:text-3xl">
                  {b.successMessage}
                </p>
                <button
                  type="button"
                  onClick={onClose}
                  className="cursor-hover mt-10 inline-flex w-fit items-center border-b border-ink pb-1 font-mono text-sm uppercase tracking-[0.2em] transition-colors hover:border-mist hover:text-mist"
                >
                  {b.close}
                </button>
              </motion.div>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
