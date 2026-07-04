// Viewfinder focus-bracket marks — the visual language of a camera
// locking focus on its subject. Used as the site's one signature motif:
// an orchestrated "focus lock" in the Hero, and quiet corner ticks on
// each portfolio card that echo a contact sheet / mounted negative.
// Built from two thin bars per corner (not CSS border shorthand) so the
// color can be set once via `currentColor` and there's no ambiguity
// from Tailwind's default `border-style: solid` reset applying to
// sides that should stay invisible.
const CORNERS: { position: string; v: string; h: string }[] = [
  { position: "top-0 left-0", v: "top-0", h: "left-0" },
  { position: "top-0 right-0", v: "top-0", h: "right-0" },
  { position: "bottom-0 left-0", v: "bottom-0", h: "left-0" },
  { position: "bottom-0 right-0", v: "bottom-0", h: "right-0" },
];

export default function CornerBrackets({
  size = 22,
  thickness = 1.5,
  className = "",
}: {
  size?: number;
  thickness?: number;
  className?: string;
}) {
  return (
    <div
      aria-hidden="true"
      className={`pointer-events-none absolute inset-0 ${className}`}
    >
      {CORNERS.map(({ position, v, h }) => (
        <span
          key={position}
          className={`absolute ${position}`}
          style={{ width: size, height: size }}
        >
          <span
            className={`absolute ${v} ${h} w-full bg-current`}
            style={{ height: thickness }}
          />
          <span
            className={`absolute ${v} ${h} h-full bg-current`}
            style={{ width: thickness }}
          />
        </span>
      ))}
    </div>
  );
}
