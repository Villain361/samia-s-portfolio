import { ParticleField } from "./ParticleField";

export function Footer() {
  return (
    <footer className="relative overflow-hidden">
      <ParticleField />
      <div className="relative mx-auto max-w-6xl px-6 py-20 text-center">
        <div className="divider-luxury" />
        <p className="mt-12 font-serif text-3xl italic text-ivory/90 sm:text-4xl">
          <span className="text-gold">“</span>
          <span className="gradient-text">Justice begins with courage.</span>
          <span className="text-gold">”</span>
        </p>
        <p className="mt-4 text-[10px] uppercase tracking-[0.5em] text-ivory/55">— Samia · Sensei —</p>

        <div className="mt-12 flex flex-col items-center justify-between gap-4 sm:flex-row">
          <span className="font-display text-[10px] uppercase tracking-[0.4em] text-ivory/45">
            © {new Date().getFullYear()} Samia · All Rights Reserved
          </span>
          <span
            className="font-display text-[10px] uppercase tracking-[0.4em]"
            style={{ color: "oklch(0.78 0.13 85)", textShadow: "0 0 14px oklch(0.78 0.13 85 / 0.6)" }}
          >
            Crafted with elegance
          </span>
        </div>
      </div>
    </footer>
  );
}
