import { motion } from "framer-motion";
import { Reveal } from "./Reveal";

const stats = [
  { n: "1st", l: "Year of Law" },
  { n: "08+", l: "Core Skills" },
  { n: "∞", l: "Passion for Justice" },
  { n: "24/7", l: "Discipline" },
];

export function About() {
  return (
    <SectionShell id="about" eyebrow="Introduction" title="The Pursuit of Justice" subtitle="A storied beginning">
      <div className="grid items-center gap-10 lg:grid-cols-[1.1fr_1fr]">
        <Reveal>
          <div className="space-y-6">
            <p className="font-serif text-2xl leading-relaxed text-ivory/90 sm:text-3xl">
              A passionate <span className="gradient-text font-semibold">first-year law student</span> driven by
              courage, discipline, and the pursuit of justice.
            </p>
            <p className="max-w-xl text-ivory/65 leading-relaxed">
              Known as <span className="text-gold">Sensei</span> to those closest to her, Samia approaches the
              law as both a craft and a calling — an art of argument tempered by empathy, and a science of truth
              guided by ethics. Every brief, every case, every word is a quiet promise to those without a voice.
            </p>

            <div className="flex flex-wrap gap-3 pt-2">
              {["Empathetic", "Disciplined", "Analytical", "Visionary"].map((t) => (
                <span
                  key={t}
                  className="glass rounded-full px-4 py-1.5 text-xs uppercase tracking-[0.25em] text-ivory/75"
                >
                  {t}
                </span>
              ))}
            </div>

            <div className="grid grid-cols-2 gap-4 pt-6 sm:grid-cols-4">
              {stats.map((s, i) => (
                <motion.div
                  key={s.l}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1, duration: 0.8 }}
                  className="glass luxury-border rounded-2xl p-4 text-center"
                >
                  <div className="font-display text-2xl text-gold">{s.n}</div>
                  <div className="mt-1 text-[10px] uppercase tracking-[0.25em] text-ivory/55">{s.l}</div>
                </motion.div>
              ))}
            </div>
          </div>
        </Reveal>

        <Reveal delay={0.2}>
          <ProfileCard />
        </Reveal>
      </div>
    </SectionShell>
  );
}

function ProfileCard() {
  return (
    <div className="relative mx-auto w-full max-w-md">
      {/* Floating ornaments */}
      <motion.div
        className="pointer-events-none absolute -left-10 -top-10 h-24 w-24 rounded-full blur-2xl"
        style={{ background: "oklch(0.78 0.13 85 / 0.35)" }}
        animate={{ y: [0, 12, 0] }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="pointer-events-none absolute -bottom-10 -right-10 h-32 w-32 rounded-full blur-3xl"
        style={{ background: "oklch(0.65 0.20 295 / 0.4)" }}
        animate={{ y: [0, -14, 0] }}
        transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
      />

      <div className="glass-strong luxury-border relative overflow-hidden rounded-[2rem] p-8">
        <div className="flex items-center justify-between text-[10px] uppercase tracking-[0.4em] text-ivory/50">
          <span>Profile</span>
          <span className="text-gold">01 / 01</span>
        </div>

        <div className="my-6 flex items-center justify-center">
          <div className="relative">
            <div
              className="absolute inset-0 rounded-full blur-2xl"
              style={{ background: "var(--gradient-purple-gold)", opacity: 0.4 }}
            />
            <div
              className="relative flex h-44 w-44 items-center justify-center rounded-full"
              style={{ background: "var(--gradient-gold)" }}
            >
              <div className="flex h-[10.5rem] w-[10.5rem] items-center justify-center rounded-full bg-background">
                <span className="font-display text-7xl gradient-text">S</span>
              </div>
            </div>
          </div>
        </div>

        <div className="text-center">
          <h3 className="font-serif text-2xl text-ivory">Samia</h3>
          <p className="mt-1 text-xs uppercase tracking-[0.35em] text-gold/80">Sensei · Law Student</p>
        </div>

        <div className="mt-6 divider-luxury" />

        <ul className="mt-6 space-y-3 text-sm">
          <Row k="Focus" v="Constitutional & Human Rights" />
          <Row k="Year" v="First-Year, Undergraduate" />
          <Row k="Motto" v="“Justice begins with courage.”" />
        </ul>
      </div>
    </div>
  );
}

function Row({ k, v }: { k: string; v: string }) {
  return (
    <li className="flex items-start justify-between gap-4">
      <span className="text-[10px] uppercase tracking-[0.3em] text-ivory/50">{k}</span>
      <span className="text-right text-ivory/85">{v}</span>
    </li>
  );
}

export function SectionShell({
  id,
  eyebrow,
  title,
  subtitle,
  children,
}: {
  id: string;
  eyebrow: string;
  title: string;
  subtitle?: string;
  children: React.ReactNode;
}) {
  return (
    <section id={id} className="relative py-28 sm:py-36">
      <div className="mx-auto max-w-6xl px-6">
        <Reveal>
          <div className="mb-14 text-center">
            <div className="mb-4 inline-flex items-center gap-3">
              <span className="h-px w-10 bg-gold/60" />
              <span className="font-display text-[10px] uppercase tracking-[0.5em] text-gold">{eyebrow}</span>
              <span className="h-px w-10 bg-gold/60" />
            </div>
            <h2 className="font-serif text-4xl text-ivory sm:text-5xl md:text-6xl">{title}</h2>
            {subtitle && <p className="mt-3 text-sm uppercase tracking-[0.3em] text-ivory/50">{subtitle}</p>}
          </div>
        </Reveal>
        {children}
      </div>
    </section>
  );
}
