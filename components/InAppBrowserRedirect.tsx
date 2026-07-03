"use client";

import { useEffect, useState } from "react";
import { useLanguage } from "@/lib/i18n";

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

  if (!visible) return null;

  return (
    <div className="fixed inset-x-0 top-0 z-[200] flex flex-col items-center gap-3 border-b border-line bg-paper px-5 py-4 text-center shadow-[0_4px_20px_rgba(0,0,0,0.08)] sm:flex-row sm:justify-between sm:text-left">
      <p className="text-sm leading-relaxed text-ink/80">{b.message}</p>
      <div className="flex shrink-0 items-center gap-3">
        <button
          type="button"
          onClick={copyLink}
          className="cursor-hover whitespace-nowrap border border-ink px-4 py-2 font-mono text-xs uppercase tracking-[0.15em] text-ink transition-colors duration-300 hover:bg-ink hover:text-paper"
        >
          {copied ? "✓" : b.cta}
        </button>
        <button
          type="button"
          onClick={dismiss}
          aria-label={b.dismiss}
          className="cursor-hover flex h-9 w-9 shrink-0 items-center justify-center text-ink/50 transition-colors hover:text-ink"
        >
          <svg width="14" height="14" viewBox="0 0 20 20" fill="none" aria-hidden="true">
            <path
              d="M5 5L15 15M15 5L5 15"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
            />
          </svg>
        </button>
      </div>
    </div>
  );
}
