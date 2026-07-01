const TILE_COUNT = 12;

export default function Watermark() {
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 overflow-hidden select-none"
    >
      <div className="absolute inset-0 grid grid-cols-3 grid-rows-4 place-items-center">
        {Array.from({ length: TILE_COUNT }).map((_, i) => (
          <span
            key={i}
            className="whitespace-nowrap rotate-[-32deg] font-mono text-[10px] uppercase tracking-[0.25em] text-paper/70 [text-shadow:0_1px_3px_rgba(0,0,0,0.55)] md:text-xs"
          >
            Quân Vic Foto
          </span>
        ))}
      </div>
    </div>
  );
}
