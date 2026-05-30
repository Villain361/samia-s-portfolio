import { SectionShell } from "./About";
import { Reveal } from "./Reveal";

// Masonry: use gradients as elegant frames (placeholders until real images added)
const FRAMES = [
  { h: 380, g: "linear-gradient(135deg, oklch(0.78 0.13 85 / 0.35), oklch(0.65 0.20 295 / 0.35))", label: "Library Study" },
  { h: 280, g: "linear-gradient(180deg, oklch(0.13 0 0), oklch(0.65 0.20 295 / 0.4))", label: "Moot Court" },
  { h: 320, g: "linear-gradient(45deg, oklch(0.78 0.13 85 / 0.4), oklch(0.13 0 0))", label: "Ceremony" },
  { h: 400, g: "radial-gradient(circle at 30% 30%, oklch(0.65 0.20 295 / 0.45), oklch(0.13 0 0))", label: "Debate Night" },
  { h: 260, g: "linear-gradient(135deg, oklch(0.13 0 0), oklch(0.78 0.13 85 / 0.35))", label: "Reading Hall" },
  { h: 360, g: "linear-gradient(225deg, oklch(0.65 0.20 295 / 0.4), oklch(0.78 0.13 85 / 0.25))", label: "Robes & Wisdom" },
];

export function Gallery() {
  return (
    <SectionShell id="gallery" eyebrow="Frames" title="Visual Diary" subtitle="Moments of becoming">
      <Reveal>
        <div className="columns-1 gap-5 sm:columns-2 lg:columns-3 [&>*]:mb-5">
          {FRAMES.map((f, i) => (
            <figure
              key={i}
              className="glass luxury-border group relative break-inside-avoid overflow-hidden rounded-2xl"
              style={{ height: f.h }}
            >
              <div className="absolute inset-0 transition-transform duration-700 group-hover:scale-105" style={{ background: f.g }} />
              <div
                className="absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
                style={{ background: "radial-gradient(circle at 50% 50%, oklch(0.78 0.13 85 / 0.25), transparent 60%)" }}
              />
              <figcaption className="absolute bottom-0 left-0 right-0 flex items-end justify-between p-5">
                <span className="font-serif text-lg text-ivory">{f.label}</span>
                <span className="font-display text-[10px] uppercase tracking-[0.4em] text-gold">
                  {String(i + 1).padStart(2, "0")}
                </span>
              </figcaption>
            </figure>
          ))}
        </div>
      </Reveal>
    </SectionShell>
  );
}
