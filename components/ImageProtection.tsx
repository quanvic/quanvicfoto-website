"use client";

import { useEffect } from "react";

export default function ImageProtection() {
  useEffect(() => {
    const blockContextMenu = (e: MouseEvent) => {
      if ((e.target as HTMLElement)?.tagName === "IMG") {
        e.preventDefault();
      }
    };
    document.addEventListener("contextmenu", blockContextMenu);
    return () => document.removeEventListener("contextmenu", blockContextMenu);
  }, []);

  return null;
}
