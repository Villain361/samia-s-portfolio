import { motion } from "framer-motion";
import { SectionShell } from "./About";
import { Reveal } from "./Reveal";

const BLOGS = [
  {
    tag: "Justice",
    title: "On the Quiet Power of Justice",
    excerpt: "Justice is not loud — it is the patient force that bends the arc of every society toward fairness.",
    read: "4 min",
  },
  {
    tag: "Human Rights",
    title: "The Universal Language of Dignity",
    excerpt: "Human rights are not granted; they are recognized. A reflection on dignity beyond borders.",
    read: "6 min",
  },
  {
    tag: "Ethics",
    title: "Why Legal Ethics Are the Highest Art",
    excerpt: "Brilliant arguments fade. Integrity endures. A note on what truly shapes a lawyer.",
    read: "5 min",
  },
  {
    tag: "Women in Law",
    title: "Women, Robes & Revolution",
    excerpt: "A tribute to the women who made it possible — and a promise to those who follow.",
    read: "7 min",
  },
  {
    tag: "Modern Systems",
    title: "Justice in the Age of Algorithms",
    excerpt: "When code begins to judge, what role remains for the human conscience?",
    read: "8 min",
  },
];

export function Blogs() {
  return (
    <SectionShell id="blogs" eyebrow="Editorial" title="Legal Insights" subtitle="Notes from a future advocate">
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {BLOGS.map((b, i) => (
          <Reveal key={b.title} delay={i * 0.08}>
            <motion.article
              whileHover={{ y: -10 }}
              transition={{ type: "spring", stiffness: 200, damping: 20 }}
              className="glass luxury-border group relative flex h-full flex-col overflow-hidden rounded-2xl p-7"
            >
              <div className="absolute left-0 right-0 top-0 h-px overflow-hidden">
                <div className="animate-shimmer h-full" />
              </div>
              <div className="flex items-center justify-between">
                <span className="rounded-full border border-gold/40 px-3 py-1 text-[10px] uppercase tracking-[0.3em] text-gold">
                  {b.tag}
                </span>
                <span className="text-[10px] uppercase tracking-[0.25em] text-ivory/45">{b.read}</span>
              </div>
              <h3 className="mt-5 font-serif text-2xl leading-snug text-ivory">{b.title}</h3>
              <p className="mt-3 flex-1 text-sm leading-relaxed text-ivory/65">{b.excerpt}</p>
              <div className="mt-6 flex items-center gap-2 text-xs uppercase tracking-[0.3em] text-gold/90 transition-transform duration-300 group-hover:translate-x-1">
                Read essay <span>→</span>
              </div>
            </motion.article>
          </Reveal>
        ))}
      </div>
    </SectionShell>
  );
}
