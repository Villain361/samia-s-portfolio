import { useEffect, useState } from "react";

const SECTIONS = [
  ["home", "Home"],
  ["about", "About"],
  ["skills", "Skills"],
  ["education", "Education"],
  ["achievements", "Achievements"],
  ["certificates", "Certificates"],
  ["blogs", "Legal Blogs"],
  ["gallery", "Gallery"],
  ["testimonials", "Testimonials"],
  ["contact", "Contact"],
] as const;

export function Navbar() {
  const [active, setActive] = useState("home");
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 30);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) setActive(e.target.id);
        });
      },
      { rootMargin: "-40% 0px -55% 0px" }
    );
    SECTIONS.forEach(([id]) => {
      const el = document.getElementById(id);
      if (el) io.observe(el);
    });
    return () => {
      window.removeEventListener("scroll", onScroll);
      io.disconnect();
    };
  }, []);

  return (
    <nav
      className={`fixed left-1/2 top-4 z-50 -translate-x-1/2 transition-all duration-500 ${
        scrolled ? "w-[min(96%,1100px)]" : "w-[min(98%,1200px)]"
      }`}
    >
      <div className="glass-strong luxury-border flex items-center justify-between rounded-full px-5 py-3 shadow-[0_8px_40px_oklch(0_0_0/0.6)]">
        <a href="#home" className="flex items-center gap-2">
          <span className="font-display text-lg tracking-[0.25em] text-gold">S</span>
          <span className="font-serif text-sm tracking-wider text-ivory/80">SENSEI</span>
        </a>
        <ul className="hidden items-center gap-1 lg:flex">
          {SECTIONS.map(([id, label]) => (
            <li key={id}>
              <a
                href={`#${id}`}
                className={`relative rounded-full px-3 py-1.5 text-xs uppercase tracking-[0.2em] transition-colors ${
                  active === id ? "text-gold" : "text-ivory/65 hover:text-ivory"
                }`}
              >
                {label}
                {active === id && (
                  <span
                    className="absolute inset-0 -z-10 rounded-full"
                    style={{
                      background: "linear-gradient(135deg, oklch(0.78 0.13 85 / 0.15), oklch(0.65 0.20 295 / 0.15))",
                      boxShadow: "inset 0 0 0 1px oklch(0.78 0.13 85 / 0.4)",
                    }}
                  />
                )}
              </a>
            </li>
          ))}
        </ul>
        <a
          href="#contact"
          className="hidden rounded-full border border-gold/40 px-4 py-2 text-xs uppercase tracking-[0.2em] text-gold transition-all hover:bg-gold hover:text-background lg:inline-block"
        >
          Connect
        </a>
        <button
          aria-label="menu"
          onClick={() => setOpen((v) => !v)}
          className="lg:hidden text-ivory"
        >
          <div className="flex flex-col gap-1.5">
            <span className={`h-px w-6 bg-gold transition ${open ? "translate-y-2 rotate-45" : ""}`} />
            <span className={`h-px w-6 bg-gold transition ${open ? "opacity-0" : ""}`} />
            <span className={`h-px w-6 bg-gold transition ${open ? "-translate-y-2 -rotate-45" : ""}`} />
          </div>
        </button>
      </div>

      {open && (
        <div className="glass-strong mt-2 rounded-3xl p-4 lg:hidden">
          <ul className="grid grid-cols-2 gap-1">
            {SECTIONS.map(([id, label]) => (
              <li key={id}>
                <a
                  href={`#${id}`}
                  onClick={() => setOpen(false)}
                  className={`block rounded-xl px-3 py-2 text-xs uppercase tracking-[0.2em] ${
                    active === id ? "text-gold" : "text-ivory/70"
                  }`}
                >
                  {label}
                </a>
              </li>
            ))}
          </ul>
        </div>
      )}
    </nav>
  );
}
