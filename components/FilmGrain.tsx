// A near-invisible texture layer, not a decorative flourish — real film
// has grain, and its absence is what makes flat digital images feel
// synthetic next to the studio's actual photographic work. Static (no
// JS animation, no per-frame cost): a single repeating SVG noise tile
// composited once via mix-blend-mode.
const GRAIN_SVG = `<svg xmlns='http://www.w3.org/2000/svg' width='160' height='160'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='2' stitchTiles='stitch'/></filter><rect width='100%' height='100%' filter='url(#n)'/></svg>`;
const GRAIN_DATA_URL = `data:image/svg+xml,${encodeURIComponent(GRAIN_SVG)}`;

export default function FilmGrain() {
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 z-[90] opacity-[0.045] mix-blend-overlay"
      style={{
        backgroundImage: `url("${GRAIN_DATA_URL}")`,
        backgroundRepeat: "repeat",
      }}
    />
  );
}
