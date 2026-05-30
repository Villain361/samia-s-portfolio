import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { SectionShell } from "./About";

const QUOTES = [
  {
    q: "Samia has the rarest gift in law — the patience to listen, and the courage to speak.",
    a: "Prof. A. Rahman",
    r: "Mentor & Senior Lecturer",
  },
  {
    q: "A mind sharpened by discipline and a heart steadied by empathy. The courtroom will know her name.",
    a: "S. Karim, Esq.",
    r: "Practicing Attorney",
  },
  {
    q: "When she speaks, the room listens. That is the foundation of every great advocate.",
    a: "L. Chowdhury",
    r: "Debate Coach",
  },
];

export function Testimonials() {
  const [i, setI] = useState(0);
  useEffect(() => {
    const t = setInterval(() => setI((v) => (v + 1) % QUOTES.length), 6000);
    return () => clearInterval(t);
  }, []);

  return (
    <SectionShell id="testimonials" eyebrow="Words" title="Testimonials" subtitle="From those who have watched her rise">
      <div className="relative mx-auto max-w-3xl">
        <motion.div
          animate={{ y: [0, -8, 0] }}
          transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
          className="glass-strong luxury-border relative rounded-[2rem] p-10 sm:p-14"
        >
          <span
            className="font-display absolute -top-8 left-8 text-[7rem] leading-none text-gold/30 select-none"
            aria-hidden
          >
            “
          </span>

          <AnimatePresence mode="wait">
            <motion.blockquote
              key={i}
              initial={{ opacity: 0, y: 20, filter: "blur(8px)" }}
              animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              exit={{ opacity: 0, y: -20, filter: "blur(8px)" }}
              transition={{ duration: 0.7 }}
              className="font-serif text-2xl italic leading-relaxed text-ivory/90 sm:text-3xl"
            >
              {QUOTES[i].q}
            </motion.blockquote>
          </AnimatePresence>

          <div className="mt-8 flex items-center justify-between">
            <div>
              <p className="font-display text-sm uppercase tracking-[0.3em] text-gold">{QUOTES[i].a}</p>
              <p className="mt-1 text-xs uppercase tracking-[0.25em] text-ivory/55">{QUOTES[i].r}</p>
            </div>
            <div className="flex gap-2">
              {QUOTES.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => setI(idx)}
                  aria-label={`Testimonial ${idx + 1}`}
                  className={`h-1.5 rounded-full transition-all ${idx === i ? "w-8 bg-gold" : "w-4 bg-ivory/20"}`}
                />
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </SectionShell>
  );
}
