import { useState } from "react";
import { SectionShell } from "./About";
import { Reveal } from "./Reveal";

export function Contact() {
  const [sent, setSent] = useState(false);
  return (
    <SectionShell id="contact" eyebrow="Connect" title="Begin a Conversation" subtitle="Words travel — let yours arrive here">
      <div className="grid gap-10 lg:grid-cols-[1fr_1.2fr]">
        <Reveal>
          <div className="space-y-8">
            <p className="font-serif text-2xl leading-relaxed text-ivory/85">
              For collaborations, mentorship, or simply a thoughtful exchange — your message will be read with the
              care it deserves.
            </p>

            <ul className="space-y-4">
              <li className="glass luxury-border rounded-2xl p-5">
                <p className="text-[10px] uppercase tracking-[0.35em] text-gold/80">Location</p>
                <p className="mt-1 font-serif text-lg text-ivory">Available worldwide · Remote</p>
              </li>
              <li className="glass luxury-border rounded-2xl p-5">
                <p className="text-[10px] uppercase tracking-[0.35em] text-gold/80">Hours</p>
                <p className="mt-1 font-serif text-lg text-ivory">Mon — Sat · 09:00 — 21:00</p>
              </li>
            </ul>

            <div className="flex items-center gap-3">
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noreferrer"
                className="glass luxury-border group inline-flex items-center gap-3 rounded-full px-5 py-3 text-xs uppercase tracking-[0.3em] text-ivory/80 transition-all hover:text-gold"
                style={{ transition: "all 0.4s" }}
              >
                <span
                  className="flex h-7 w-7 items-center justify-center rounded-full text-background transition-transform group-hover:scale-110"
                  style={{ background: "var(--gradient-purple-gold)" }}
                >
                  ◎
                </span>
                Instagram
              </a>
            </div>
          </div>
        </Reveal>

        <Reveal delay={0.15}>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              setSent(true);
              setTimeout(() => setSent(false), 3500);
            }}
            className="glass-strong luxury-border rounded-3xl p-8 sm:p-10"
          >
            <div className="grid gap-5 sm:grid-cols-2">
              <Field label="Your Name" name="name" />
              <Field label="Your Email" name="email" type="email" />
            </div>
            <div className="mt-5">
              <Field label="Subject" name="subject" />
            </div>
            <div className="mt-5">
              <Field label="Message" name="message" textarea />
            </div>

            <button
              type="submit"
              className="group relative mt-8 inline-flex w-full items-center justify-center gap-3 overflow-hidden rounded-full px-8 py-4 text-xs uppercase tracking-[0.35em] text-background"
            >
              <span className="absolute inset-0 -z-10" style={{ background: "var(--gradient-gold)" }} />
              <span
                className="absolute inset-0 -z-10 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
                style={{ background: "var(--gradient-purple-gold)", boxShadow: "var(--shadow-purple)" }}
              />
              <span className="font-semibold">{sent ? "Message Sent · Thank You" : "Send Message"}</span>
              <span aria-hidden>→</span>
            </button>
          </form>
        </Reveal>
      </div>
    </SectionShell>
  );
}

function Field({
  label,
  name,
  type = "text",
  textarea,
}: {
  label: string;
  name: string;
  type?: string;
  textarea?: boolean;
}) {
  const [focus, setFocus] = useState(false);
  const Cmp: any = textarea ? "textarea" : "input";
  return (
    <label className="group block">
      <span className="mb-2 block text-[10px] uppercase tracking-[0.35em] text-ivory/55">{label}</span>
      <div className="relative">
        <Cmp
          name={name}
          type={type}
          rows={textarea ? 5 : undefined}
          onFocus={() => setFocus(true)}
          onBlur={() => setFocus(false)}
          required
          className="w-full resize-none rounded-xl bg-transparent px-4 py-3 font-sans text-ivory placeholder:text-ivory/30 outline-none transition-all"
          style={{
            border: focus ? "1px solid oklch(0.78 0.13 85 / 0.7)" : "1px solid oklch(0.96 0.005 90 / 0.12)",
            boxShadow: focus ? "0 0 24px oklch(0.78 0.13 85 / 0.25), inset 0 0 0 1px oklch(0.78 0.13 85 / 0.4)" : "none",
            background: "oklch(0.10 0 0 / 0.6)",
          }}
        />
      </div>
    </label>
  );
}
