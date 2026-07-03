"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useLanguage } from "@/lib/i18n";
import { trackEvent } from "@/lib/analytics";

type ChatMessage = {
  role: "user" | "model";
  text: string;
  isNotice?: boolean;
};

export default function ChatWidget({
  open,
  onToggle,
}: {
  open: boolean;
  onToggle: () => void;
}) {
  const { t } = useLanguage();
  const c = t.chat;
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState("");
  const [sending, setSending] = useState(false);
  const listRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (open) {
      trackEvent("chat_open");
      const timer = setTimeout(() => inputRef.current?.focus(), 350);
      return () => clearTimeout(timer);
    }
  }, [open]);

  useEffect(() => {
    listRef.current?.scrollTo({
      top: listRef.current.scrollHeight,
      behavior: "smooth",
    });
  }, [messages, sending]);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const text = input.trim();
    if (!text || sending) return;

    const history = messages.filter((m) => !m.isNotice);
    const nextMessages: ChatMessage[] = [...messages, { role: "user", text }];
    setMessages(nextMessages);
    setInput("");
    setSending(true);
    trackEvent("chat_message_sent");

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          message: text,
          history: history.map((m) => ({ role: m.role, text: m.text })),
        }),
      });

      if (res.status === 503) {
        setMessages((prev) => [
          ...prev,
          { role: "model", text: c.notConfigured, isNotice: true },
        ]);
        return;
      }
      if (!res.ok) throw new Error("request_failed");

      const data = await res.json();
      setMessages((prev) => [...prev, { role: "model", text: data.reply }]);
    } catch {
      setMessages((prev) => [
        ...prev,
        { role: "model", text: c.error, isNotice: true },
      ]);
    } finally {
      setSending(false);
    }
  }

  return (
    <>
      <button
        type="button"
        onClick={onToggle}
        aria-label={open ? c.toggleCloseAria : c.toggleOpenAria}
        aria-expanded={open}
        className="cursor-hover fixed bottom-24 right-6 z-[36] flex h-14 w-14 items-center justify-center rounded-full border border-ink bg-paper text-ink shadow-[0_8px_24px_rgba(0,0,0,0.18)] transition-colors duration-300 hover:bg-ink hover:text-paper active:scale-95 md:bottom-28 md:right-8"
      >
        {!open && (
          <span
            aria-hidden="true"
            className="absolute -top-1.5 -left-1.5 flex h-5 items-center justify-center rounded-full border border-ink bg-paper px-1.5 font-mono text-[9px] font-medium tracking-[0.05em] text-ink"
          >
            AI
          </span>
        )}
        {open ? (
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true">
            <path
              d="M5 5L15 15M15 5L5 15"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
            />
          </svg>
        ) : (
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden="true">
            <path
              d="M4 5.5A1.5 1.5 0 0 1 5.5 4h13A1.5 1.5 0 0 1 20 5.5v9a1.5 1.5 0 0 1-1.5 1.5H9l-4 4v-4H5.5A1.5 1.5 0 0 1 4 14.5v-9Z"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinejoin="round"
            />
          </svg>
        )}
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            data-lenis-prevent
            role="dialog"
            aria-modal="true"
            aria-label={c.title}
            initial={{ opacity: 0, y: 16, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 16, scale: 0.97 }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="fixed bottom-[calc(6rem+4.5rem)] right-6 z-[36] flex h-[min(32rem,70dvh)] w-[23rem] max-w-[calc(100vw-3rem)] flex-col overflow-hidden border border-ink bg-paper shadow-[0_16px_50px_rgba(0,0,0,0.25)] md:bottom-[calc(7rem+4.5rem)] md:right-8"
          >
            <div className="flex flex-col gap-0.5 border-b border-line px-5 py-4">
              <span className="font-serif text-lg leading-none">{c.title}</span>
              <span className="font-mono text-[10px] uppercase tracking-[0.15em] text-mist">
                {c.subtitle}
              </span>
            </div>

            <div
              ref={listRef}
              className="flex-1 overflow-y-auto overscroll-contain px-5 py-4"
            >
              <div className="flex flex-col gap-3">
                <ChatBubble role="model" text={c.greeting} />
                {messages.map((m, i) => (
                  <ChatBubble
                    key={i}
                    role={m.role}
                    text={m.text}
                    isNotice={m.isNotice}
                  />
                ))}
                {sending && (
                  <div className="flex items-center gap-2 self-start rounded-none border border-line bg-cloud px-3 py-2 font-mono text-[11px] uppercase tracking-[0.1em] text-mist">
                    {c.thinking}
                  </div>
                )}
              </div>
            </div>

            <form
              onSubmit={handleSubmit}
              className="flex items-center gap-2 border-t border-line p-3"
            >
              <input
                ref={inputRef}
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder={c.placeholder}
                disabled={sending}
                className="flex-1 border border-line bg-transparent px-3 py-2.5 text-sm outline-none transition-colors focus:border-ink disabled:opacity-50"
              />
              <button
                type="submit"
                disabled={sending || !input.trim()}
                aria-label={c.send}
                className="cursor-hover flex h-11 w-11 shrink-0 items-center justify-center border border-ink bg-ink text-paper transition-colors duration-300 hover:bg-paper hover:text-ink disabled:opacity-40"
              >
                <svg width="16" height="16" viewBox="0 0 20 20" fill="none" aria-hidden="true">
                  <path
                    d="M3 10h14M11 4l6 6-6 6"
                    stroke="currentColor"
                    strokeWidth="1.6"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

function ChatBubble({
  role,
  text,
  isNotice,
}: {
  role: "user" | "model";
  text: string;
  isNotice?: boolean;
}) {
  const isUser = role === "user";
  return (
    <div
      className={`max-w-[85%] whitespace-pre-wrap px-3 py-2 text-sm leading-relaxed ${
        isUser
          ? "self-end bg-ink text-paper"
          : isNotice
            ? "self-start border border-red-200 bg-red-50 text-red-600"
            : "self-start border border-line bg-cloud text-ink"
      }`}
    >
      {text}
    </div>
  );
}
