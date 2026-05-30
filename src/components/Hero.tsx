import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { ParticleField } from "./ParticleField";

const PHRASES = [
  "Justice begins with courage.",
  "Truth is my creed.",
  "Discipline shapes destiny.",
];

export function Hero() {
  const [text, setText] = useState("");
  const [idx, setIdx] = useState(0);
  const [del, setDel] = useState(false);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const current = PHRASES[idx];
    const speed = del ? 40 : 70;
    const t = setTimeout(() => {
      if (!del) {
        const next = current.slice(0, text.length + 1);
        setText(next);
        if (next === current) setTimeout(() => setDel(true), 1800);
      } else {
        const next = current.slice(0, text.length - 1);
        setText(next);
        if (next === "") {
          setDel(false);
          setIdx((i) => (i + 1) % PHRASES.length);
        }
      }
    }, speed);
    return () => clearTimeout(t);
  }, [text, del, idx]);

  const onMove = (e: React.MouseEvent) => {
    const r = (e.currentTarget as HTMLElement).getBoundingClientRect();
    const x = ((e.clientX - r.left) / r.width - 0.5) * 8;
    const y = ((e.clientY - r.top) / r.height - 0.5) * -8;
    setTilt({ x, y });
  };

  return (
    <section id="home" className="relative flex min-h-screen items-center justify-center overflow-hidden noise" onMouseMove={onMove}>
      {/* Cinematic background */}
      <div className="pointer-events-none absolute inset-0" style={{ background: "var(--gradient-hero)" }} />
      <ParticleField />

      {/* Animated lighting orbs */}
      <motion.div
        className="pointer-events-none absolute -left-32 top-20 h-[420px] w-[420px] rounded-full blur-3xl"
        style={{ background: "oklch(0.65 0.20 295 / 0.35)" }}
        animate={{ x: [0, 40, 0], y: [0, 30, 0] }}
        transition={{ duration: 14, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="pointer-events-none absolute -right-32 bottom-20 h-[480px] w-[480px] rounded-full blur-3xl"
        style={{ background: "oklch(0.78 0.13 85 / 0.25)" }}
        animate={{ x: [0, -40, 0], y: [0, -30, 0] }}
        transition={{ duration: 16, repeat: Infinity, ease: "easeInOut" }}
      />

      <motion.div
        className="relative z-10 mx-auto max-w-5xl px-6 text-center"
        style={{ transform: `perspective(1200px) rotateY(${tilt.x}deg) rotateX(${tilt.y}deg)` }}
      >
        {/* Glass card */}
        <motion.div
          initial={{ opacity: 0, filter: "blur(20px)", y: 30 }}
          animate={{ opacity: 1, filter: "blur(0px)", y: 0 }}
          transition={{ duration: 1.4, ease: [0.16, 1, 0.3, 1] }}
          className="glass-strong luxury-border relative overflow-hidden rounded-[2rem] p-10 sm:p-16"
          style={{ boxShadow: "var(--shadow-glass), var(--shadow-purple)" }}
        >
          <div className="animate-shimmer absolute -top-px left-10 right-10 h-px" />

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 1 }}
            className="mb-6 text-[10px] uppercase tracking-[0.6em] text-gold/80"
          >
            — Future Advocate · Est. 2026 —
          </motion.p>

          <motion.h1
            initial={{ opacity: 0, y: 40, filter: "blur(12px)" }}
            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            transition={{ delay: 0.5, duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
            className="font-display text-[clamp(4rem,14vw,11rem)] font-bold leading-none tracking-[0.04em]"
          >
            <span className="gradient-text">SAMIA</span>
          </motion.h1>

          <div className="my-6 flex items-center justify-center gap-3">
            <span className="h-px w-16 bg-gradient-to-r from-transparent to-gold/70" />
            <span className="font-display text-[10px] uppercase tracking-[0.5em] text-ivory/70">Sensei</span>
            <span className="h-px w-16 bg-gradient-to-l from-transparent to-gold/70" />
          </div>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.9, duration: 1 }}
            className="mx-auto max-w-xl font-serif text-lg italic text-ivory/85 sm:text-xl"
          >
            Future Advocate of Truth & Justice
          </motion.p>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.4 }}
            className="caret mt-6 font-sans text-base text-ivory/60 sm:text-lg"
          >
            <span className="text-gold/90">“</span>
            {text}
            <span className="text-gold/90">”</span>
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.6, duration: 1 }}
            className="mt-10 flex flex-wrap items-center justify-center gap-4"
          >
            <MagneticButton href="#about">Explore Portfolio</MagneticButton>
            <a
              href="#contact"
              className="rounded-full border border-ivory/20 px-6 py-3 text-xs uppercase tracking-[0.3em] text-ivory/80 transition-all hover:border-purple-glow hover:text-ivory"
            >
              Get in touch
            </a>
          </motion.div>
        </motion.div>

        {/* Scroll indicator */}
        <motion.a
          href="#about"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2.2 }}
          className="mt-12 inline-flex flex-col items-center gap-2 text-[10px] uppercase tracking-[0.4em] text-ivory/50"
        >
          Scroll
          <span className="relative block h-10 w-px overflow-hidden bg-ivory/10">
            <motion.span
              className="absolute left-0 top-0 h-3 w-px bg-gold"
              animate={{ y: [-12, 40] }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            />
          </span>
        </motion.a>
      </motion.div>
    </section>
  );
}

function MagneticButton({ href, children }: { href: string; children: React.ReactNode }) {
  const [m, setM] = useState({ x: 0, y: 0 });
  return (
    <a
      href={href}
      onMouseMove={(e) => {
        const r = e.currentTarget.getBoundingClientRect();
        setM({ x: (e.clientX - r.left - r.width / 2) * 0.25, y: (e.clientY - r.top - r.height / 2) * 0.25 });
      }}
      onMouseLeave={() => setM({ x: 0, y: 0 })}
      style={{ transform: `translate(${m.x}px, ${m.y}px)` }}
      className="group relative inline-flex items-center gap-3 overflow-hidden rounded-full px-8 py-3.5 text-xs uppercase tracking-[0.3em] text-background transition-transform duration-200"
    >
      <span className="absolute inset-0 -z-10 rounded-full" style={{ background: "var(--gradient-gold)" }} />
      <span
        className="absolute inset-0 -z-10 rounded-full opacity-0 transition-opacity duration-500 group-hover:opacity-100"
        style={{ background: "var(--gradient-purple-gold)", boxShadow: "var(--shadow-gold)" }}
      />
      <span className="font-semibold">{children}</span>
      <span aria-hidden>→</span>
    </a>
  );
}
