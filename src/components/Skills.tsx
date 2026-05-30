import { motion } from "framer-motion";
import { SectionShell } from "./About";
import { Reveal } from "./Reveal";

const SKILLS = [
  { name: "Legal Research", level: 88, icon: "⚖" },
  { name: "Public Speaking", level: 92, icon: "🎙" },
  { name: "Critical Thinking", level: 90, icon: "✦" },
  { name: "Leadership", level: 85, icon: "♛" },
  { name: "Communication", level: 94, icon: "✉" },
  { name: "Case Analysis", level: 82, icon: "§" },
  { name: "Writing & Documentation", level: 89, icon: "✎" },
  { name: "Confidence & Advocacy", level: 95, icon: "❖" },
];

export function Skills() {
  return (
    <SectionShell id="skills" eyebrow="Capabilities" title="Crafted Skills" subtitle="A disciplined arsenal">
      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {SKILLS.map((s, i) => (
          <Reveal key={s.name} delay={i * 0.06}>
            <SkillCard {...s} />
          </Reveal>
        ))}
      </div>
    </SectionShell>
  );
}

function SkillCard({ name, level, icon }: { name: string; level: number; icon: string }) {
  return (
    <motion.div
      whileHover={{ y: -6 }}
      transition={{ type: "spring", stiffness: 200, damping: 18 }}
      className="glass luxury-border group relative overflow-hidden rounded-2xl p-6"
    >
      <div
        className="absolute -right-10 -top-10 h-32 w-32 rounded-full opacity-0 blur-2xl transition-opacity duration-500 group-hover:opacity-100"
        style={{ background: "var(--gradient-purple-gold)" }}
      />
      <div className="relative">
        <div
          className="mb-5 flex h-12 w-12 items-center justify-center rounded-xl text-xl text-gold"
          style={{
            background: "oklch(0.13 0 0 / 0.8)",
            boxShadow: "inset 0 0 0 1px oklch(0.78 0.13 85 / 0.3)",
          }}
        >
          {icon}
        </div>
        <h3 className="font-serif text-lg text-ivory">{name}</h3>

        <div className="mt-4 flex items-center justify-between text-[10px] uppercase tracking-[0.3em] text-ivory/50">
          <span>Mastery</span>
          <span className="text-gold">{level}%</span>
        </div>
        <div className="mt-2 h-1 overflow-hidden rounded-full bg-ivory/10">
          <motion.div
            initial={{ width: 0 }}
            whileInView={{ width: `${level}%` }}
            viewport={{ once: true }}
            transition={{ duration: 1.4, ease: [0.16, 1, 0.3, 1] }}
            className="h-full rounded-full"
            style={{ background: "var(--gradient-gold)", boxShadow: "0 0 12px var(--gold)" }}
          />
        </div>
      </div>
    </motion.div>
  );
}
