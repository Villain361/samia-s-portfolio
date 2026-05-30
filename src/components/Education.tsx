import { SectionShell } from "./About";
import { Reveal } from "./Reveal";

const TIMELINE = [
  {
    year: "2025 — Present",
    title: "First-Year Law Student",
    place: "Faculty of Law",
    desc: "Foundations of constitutional law, jurisprudence, contracts, and the philosophy of justice.",
  },
  {
    year: "2024",
    title: "Pre-Law Preparation",
    place: "Independent Study",
    desc: "Self-directed study of legal classics, debate, and public speaking. Built the foundations of advocacy.",
  },
  {
    year: "Future",
    title: "Bar & Advocacy",
    place: "The Courtroom Awaits",
    desc: "A future devoted to defending truth, upholding human rights, and the relentless pursuit of justice.",
  },
];

export function Education() {
  return (
    <SectionShell id="education" eyebrow="Journey" title="Academic Path" subtitle="A growing legacy">
      <div className="relative mx-auto max-w-3xl">
        <div
          className="absolute left-5 top-0 h-full w-px sm:left-1/2"
          style={{ background: "linear-gradient(180deg, transparent, var(--gold), transparent)" }}
        />
        <div className="space-y-12">
          {TIMELINE.map((t, i) => (
            <Reveal key={t.title} delay={i * 0.1}>
              <div className={`relative grid items-center gap-6 sm:grid-cols-2 ${i % 2 ? "sm:[&>div:first-child]:order-2" : ""}`}>
                <div className={`pl-14 sm:pl-0 ${i % 2 ? "sm:text-left sm:pl-10" : "sm:text-right sm:pr-10"}`}>
                  <p className="font-display text-[10px] uppercase tracking-[0.4em] text-gold/80">{t.year}</p>
                  <h3 className="mt-2 font-serif text-2xl text-ivory">{t.title}</h3>
                  <p className="mt-1 text-xs uppercase tracking-[0.25em] text-ivory/55">{t.place}</p>
                  <p className="mt-3 text-sm leading-relaxed text-ivory/70">{t.desc}</p>
                </div>
                <div className="hidden sm:block" />

                {/* Dot */}
                <span
                  className="absolute left-5 top-2 -translate-x-1/2 sm:left-1/2"
                  aria-hidden
                >
                  <span className="relative block h-3 w-3 rounded-full bg-gold">
                    <span className="absolute inset-0 animate-pulse-glow rounded-full" style={{ boxShadow: "0 0 18px var(--gold)" }} />
                  </span>
                </span>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </SectionShell>
  );
}
