"use client";

import { track as vercelTrack } from "@vercel/analytics";

declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
  }
}

type EventProps = Record<string, string | number | boolean>;

// Fires the same named event to every configured analytics backend
// (Vercel Analytics + GA4) so call sites don't need to know which
// providers are wired up. Both backends no-op safely if not configured
// (Vercel Analytics only reports in production deploys; gtag is only
// defined once NEXT_PUBLIC_GA_ID is set and the script has loaded).
export function trackEvent(name: string, props?: EventProps) {
  try {
    vercelTrack(name, props);
  } catch {
    // Vercel Analytics isn't available outside a Vercel deployment — ignore.
  }
  if (typeof window !== "undefined" && typeof window.gtag === "function") {
    window.gtag("event", name, props);
  }
}
