import { motion } from "framer-motion";
import { SectionShell } from "./About";
import { Reveal } from "./Reveal";

const ITEMS = [
  { title: "Top of Class", note: "Awaiting first semester results", year: "Soon" },
  { title: "Moot Court Finalist", note: "Future milestone in advocacy", year: "Soon" },
  { title: "Public Speaking", note: "Champion of words and reason", year: "Soon" },
  { title: "Pro Bono Service", note: "Voice for the voiceless", year: "Soon" },
  { title: "Published Article", note: "Reflections on modern justice", year: "Soon" },
  { title: "Scholarship Holder", note: "Excellence rewarded", year: "Soon" },
];

export function Achievements() {
  return (
    <SectionShell id="achievements" eyebrow="Milestones" title="Achievements" subtitle="Chapters yet to be written">
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {ITEMS.map((a, i) => (
          <Reveal key={a.title} delay={i * 0.06}>
            <motion.div
              whileHover={{ y: -8, rotateX: 4, rotateY: -4 }}
              transition={{ type: "spring", stiffness: 180, damping: 16 }}
              className="glass luxury-border group relative overflow-hidden rounded-2xl p-7"
              style={{ transformStyle: "preserve-3d" }}
            >
              <div
                className="absolute inset-0 -z-10 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
                style={{
                  background:
                    "radial-gradient(circle at 50% 0%, oklch(0.78 0.13 85 / 0.18), transparent 60%)",
                }}
              />
              <div className="flex items-center justify-between">
                <span
                  className="flex h-10 w-10 items-center justify-center rounded-full text-gold"
                  style={{ boxShadow: "inset 0 0 0 1px oklch(0.78 0.13 85 / 0.5)" }}
                >
                  ✦
                </span>
                <span className="font-display text-[10px] uppercase tracking-[0.4em] text-ivory/45">{a.year}</span>
              </div>
              <h3 className="mt-5 font-serif text-xl text-ivory">{a.title}</h3>
              <p className="mt-2 text-sm text-ivory/65">{a.note}</p>
              <div className="mt-6 divider-luxury opacity-50 transition-opacity duration-500 group-hover:opacity-100" />
            </motion.div>
          </Reveal>
        ))}
      </div>
    </SectionShell>
  );
}
