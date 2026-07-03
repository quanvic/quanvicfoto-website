"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion, type PanInfo } from "framer-motion";
import { useLanguage } from "@/lib/i18n";

const SWIPE_DISMISS_OFFSET_THRESHOLD = 40;
const SWIPE_DISMISS_VELOCITY_THRESHOLD = 400;

// Signatures of common in-app "mini browsers" (Facebook, Instagram,
// Messenger, Zalo, WeChat, TikTok, Line) that wrap pages in a webview
// with worse performance and missing browser features compared to the
// visitor's actual browser.
const IN_APP_BROWSER_UA = /FBAN|FBAV|FB_IAB|Instagram|Messenger|Line\/|Zalo|MicroMessenger|TikTok|BytedanceWebview/i;
const DISMISS_KEY = "qvf-iab-banner-dismissed";

export default function InAppBrowserRedirect() {
  const { t } = useLanguage();
  const b = t.inAppBrowser;
  const [visible, setVisible] = useState(false);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    const ua = navigator.userAgent;
    if (!IN_APP_BROWSER_UA.test(ua)) return;
    if (sessionStorage.getItem(DISMISS_KEY)) return;

    // Android in-app browsers can usually be escaped automatically by
    // handing the URL to Chrome via an intent link — no equivalent
    // exists on iOS (Apple blocks pages from launching an external
    // browser), so iOS visitors only get the banner below with a
    // copy-link fallback.
    if (/Android/i.test(ua)) {
      const bare = window.location.href.replace(/^https?:\/\//, "");
      const intentUrl = `intent://${bare}#Intent;scheme=https;package=com.android.chrome;S.browser_fallback_url=${encodeURIComponent(window.location.href)};end`;
      window.location.href = intentUrl;
    }

    // eslint-disable-next-line react-hooks/set-state-in-effect -- one-time client-only in-app-browser detection via navigator.userAgent, unavailable during SSR
    setVisible(true);
  }, []);

  function dismiss() {
    sessionStorage.setItem(DISMISS_KEY, "1");
    setVisible(false);
  }

  async function copyLink() {
    try {
      await navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // Clipboard API unavailable — nothing more we can do here.
    }
  }

  function handleDragEnd(
    _event: MouseEvent | TouchEvent | PointerEvent,
    info: PanInfo,
  ) {
    if (
      info.offset.y < -SWIPE_DISMISS_OFFSET_THRESHOLD ||
      info.velocity.y < -SWIPE_DISMISS_VELOCITY_THRESHOLD
    ) {
      dismiss();
    }
  }

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ y: "-100%" }}
          animate={{ y: 0 }}
          exit={{ y: "-100%" }}
          transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
          drag="y"
          dragConstraints={{ top: 0, bottom: 0 }}
          dragElastic={{ top: 0.5, bottom: 0.1 }}
          onDragEnd={handleDragEnd}
          className="fixed inset-x-0 top-0 z-[200] flex touch-none flex-col items-center justify-center gap-2 border-b border-line bg-paper/95 px-4 py-2.5 text-center backdrop-blur-sm sm:flex-row sm:gap-4"
        >
          <p className="text-xs leading-snug text-ink/70 sm:text-[13px]">
            {b.message}
          </p>
          <div className="flex shrink-0 items-center gap-4">
            <button
              type="button"
              onClick={copyLink}
              className="cursor-hover whitespace-nowrap font-mono text-[11px] uppercase tracking-[0.1em] text-ink underline decoration-line underline-offset-4 transition-colors hover:decoration-ink"
            >
              {copied ? "✓" : b.cta}
            </button>
            <button
              type="button"
              onClick={dismiss}
              className="cursor-hover whitespace-nowrap font-mono text-[11px] uppercase tracking-[0.1em] text-ink/50 transition-colors hover:text-ink"
            >
              {b.dismiss}
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
