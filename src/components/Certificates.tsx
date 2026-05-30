import { SectionShell } from "./About";
import { Reveal } from "./Reveal";

const CERTS = [
  { name: "Introduction to Constitutional Law", org: "Faculty of Law", code: "LW-101" },
  { name: "Human Rights & Modern Society", org: "Open Academy", code: "HR-204" },
  { name: "Public Speaking Mastery", org: "Orators Institute", code: "PS-007" },
  { name: "Legal Research Methodology", org: "Law Library", code: "LR-310" },
  { name: "Ethics in Legal Practice", org: "Bar Foundations", code: "ET-122" },
];

export function Certificates() {
  return (
    <SectionShell id="certificates" eyebrow="Credentials" title="Certificates" subtitle="Scroll the showcase">
      <Reveal>
        <div className="no-scrollbar -mx-6 flex snap-x snap-mandatory gap-6 overflow-x-auto px-6 pb-6">
          {CERTS.map((c) => (
            <article
              key={c.name}
              className="glass luxury-border group relative aspect-[4/5] w-[280px] flex-shrink-0 snap-center overflow-hidden rounded-2xl p-6 transition-transform duration-500 hover:scale-[1.03] sm:w-[320px]"
            >
              <div
                className="absolute inset-0 -z-10 opacity-60 transition-opacity duration-500 group-hover:opacity-100"
                style={{
                  background:
                    "radial-gradient(ellipse at 50% 30%, oklch(0.78 0.13 85 / 0.18), transparent 60%), radial-gradient(ellipse at 50% 100%, oklch(0.65 0.20 295 / 0.18), transparent 60%)",
                }}
              />
              <div className="flex h-full flex-col justify-between">
                <div>
                  <p className="text-[10px] uppercase tracking-[0.4em] text-gold/80">Certificate</p>
                  <h3 className="mt-4 font-serif text-2xl leading-snug text-ivory">{c.name}</h3>
                </div>
                <div className="flex h-32 items-center justify-center">
                  <div className="flex h-24 w-24 items-center justify-center rounded-full" style={{ background: "var(--gradient-gold)" }}>
                    <span className="font-display text-3xl text-background">✦</span>
                  </div>
                </div>
                <div className="flex items-end justify-between text-xs text-ivory/60">
                  <span>{c.org}</span>
                  <span className="font-display text-gold">{c.code}</span>
                </div>
              </div>
            </article>
          ))}
        </div>
      </Reveal>
      <p className="mt-2 text-center text-[10px] uppercase tracking-[0.3em] text-ivory/40">← Drag · Swipe →</p>
    </SectionShell>
  );
}
