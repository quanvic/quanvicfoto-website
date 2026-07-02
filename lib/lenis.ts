import type Lenis from "lenis";

let instance: Lenis | null = null;

export function setLenisInstance(lenis: Lenis | null) {
  instance = lenis;
}

export function scrollToElement(target: string, offset = 0) {
  if (instance) {
    instance.scrollTo(target, { duration: 1.4, offset, easing: (t) => 1 - Math.pow(1 - t, 3) });
    return;
  }
  document.querySelector(target)?.scrollIntoView({ behavior: "smooth" });
}
