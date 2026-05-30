import { jsxs, Fragment, jsx } from "react/jsx-runtime";
import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
function CustomCursor() {
  const [pos, setPos] = useState({ x: -100, y: -100 });
  const [trail, setTrail] = useState({ x: -100, y: -100 });
  const [hover, setHover] = useState(false);
  useEffect(() => {
    const move = (e) => setPos({ x: e.clientX, y: e.clientY });
    const over = (e) => {
      const t = e.target;
      setHover(!!t.closest("a, button, [data-cursor-hover], input, textarea"));
    };
    window.addEventListener("mousemove", move);
    window.addEventListener("mouseover", over);
    return () => {
      window.removeEventListener("mousemove", move);
      window.removeEventListener("mouseover", over);
    };
  }, []);
  useEffect(() => {
    let raf = 0;
    const tick = () => {
      setTrail((t) => ({ x: t.x + (pos.x - t.x) * 0.12, y: t.y + (pos.y - t.y) * 0.12 }));
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [pos]);
  return /* @__PURE__ */ jsxs(Fragment, { children: [
    /* @__PURE__ */ jsx(
      "div",
      {
        className: "pointer-events-none fixed z-[9999] hidden md:block",
        style: {
          left: pos.x,
          top: pos.y,
          transform: `translate(-50%, -50%) scale(${hover ? 1.6 : 1})`,
          transition: "transform 200ms ease"
        },
        children: /* @__PURE__ */ jsx("div", { className: "h-2 w-2 rounded-full bg-gold", style: { boxShadow: "0 0 12px var(--gold), 0 0 24px var(--gold)" } })
      }
    ),
    /* @__PURE__ */ jsx(
      "div",
      {
        className: "pointer-events-none fixed z-[9998] hidden md:block",
        style: {
          left: trail.x,
          top: trail.y,
          transform: `translate(-50%, -50%) scale(${hover ? 2.2 : 1})`,
          transition: "transform 300ms ease"
        },
        children: /* @__PURE__ */ jsx(
          "div",
          {
            className: "h-10 w-10 rounded-full",
            style: {
              border: "1px solid oklch(0.78 0.13 85 / 0.6)",
              background: "radial-gradient(circle, oklch(0.65 0.20 295 / 0.15), transparent 70%)"
            }
          }
        )
      }
    )
  ] });
}
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
  ["contact", "Contact"]
];
function Navbar() {
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
  return /* @__PURE__ */ jsxs(
    "nav",
    {
      className: `fixed left-1/2 top-4 z-50 -translate-x-1/2 transition-all duration-500 ${scrolled ? "w-[min(96%,1100px)]" : "w-[min(98%,1200px)]"}`,
      children: [
        /* @__PURE__ */ jsxs("div", { className: "glass-strong luxury-border flex items-center justify-between rounded-full px-5 py-3 shadow-[0_8px_40px_oklch(0_0_0/0.6)]", children: [
          /* @__PURE__ */ jsxs("a", { href: "#home", className: "flex items-center gap-2", children: [
            /* @__PURE__ */ jsx("span", { className: "font-display text-lg tracking-[0.25em] text-gold", children: "S" }),
            /* @__PURE__ */ jsx("span", { className: "font-serif text-sm tracking-wider text-ivory/80", children: "SENSEI" })
          ] }),
          /* @__PURE__ */ jsx("ul", { className: "hidden items-center gap-1 lg:flex", children: SECTIONS.map(([id, label]) => /* @__PURE__ */ jsx("li", { children: /* @__PURE__ */ jsxs(
            "a",
            {
              href: `#${id}`,
              className: `relative rounded-full px-3 py-1.5 text-xs uppercase tracking-[0.2em] transition-colors ${active === id ? "text-gold" : "text-ivory/65 hover:text-ivory"}`,
              children: [
                label,
                active === id && /* @__PURE__ */ jsx(
                  "span",
                  {
                    className: "absolute inset-0 -z-10 rounded-full",
                    style: {
                      background: "linear-gradient(135deg, oklch(0.78 0.13 85 / 0.15), oklch(0.65 0.20 295 / 0.15))",
                      boxShadow: "inset 0 0 0 1px oklch(0.78 0.13 85 / 0.4)"
                    }
                  }
                )
              ]
            }
          ) }, id)) }),
          /* @__PURE__ */ jsx(
            "a",
            {
              href: "#contact",
              className: "hidden rounded-full border border-gold/40 px-4 py-2 text-xs uppercase tracking-[0.2em] text-gold transition-all hover:bg-gold hover:text-background lg:inline-block",
              children: "Connect"
            }
          ),
          /* @__PURE__ */ jsx(
            "button",
            {
              "aria-label": "menu",
              onClick: () => setOpen((v) => !v),
              className: "lg:hidden text-ivory",
              children: /* @__PURE__ */ jsxs("div", { className: "flex flex-col gap-1.5", children: [
                /* @__PURE__ */ jsx("span", { className: `h-px w-6 bg-gold transition ${open ? "translate-y-2 rotate-45" : ""}` }),
                /* @__PURE__ */ jsx("span", { className: `h-px w-6 bg-gold transition ${open ? "opacity-0" : ""}` }),
                /* @__PURE__ */ jsx("span", { className: `h-px w-6 bg-gold transition ${open ? "-translate-y-2 -rotate-45" : ""}` })
              ] })
            }
          )
        ] }),
        open && /* @__PURE__ */ jsx("div", { className: "glass-strong mt-2 rounded-3xl p-4 lg:hidden", children: /* @__PURE__ */ jsx("ul", { className: "grid grid-cols-2 gap-1", children: SECTIONS.map(([id, label]) => /* @__PURE__ */ jsx("li", { children: /* @__PURE__ */ jsx(
          "a",
          {
            href: `#${id}`,
            onClick: () => setOpen(false),
            className: `block rounded-xl px-3 py-2 text-xs uppercase tracking-[0.2em] ${active === id ? "text-gold" : "text-ivory/70"}`,
            children: label
          }
        ) }, id)) }) })
      ]
    }
  );
}
function ParticleField() {
  const ref = useRef(null);
  useEffect(() => {
    const c = ref.current;
    if (!c) return;
    const ctx = c.getContext("2d");
    let w = c.width = window.innerWidth;
    let h = c.height = window.innerHeight;
    const N = Math.min(80, Math.floor(w * h / 22e3));
    const particles = Array.from({ length: N }, () => ({
      x: Math.random() * w,
      y: Math.random() * h,
      r: Math.random() * 1.6 + 0.4,
      vx: (Math.random() - 0.5) * 0.25,
      vy: (Math.random() - 0.5) * 0.25,
      hue: Math.random() > 0.5 ? "gold" : "purple"
    }));
    let mouse = { x: -1e3, y: -1e3 };
    const onMove = (e) => mouse = { x: e.clientX, y: e.clientY };
    const onResize = () => {
      w = c.width = window.innerWidth;
      h = c.height = window.innerHeight;
    };
    window.addEventListener("mousemove", onMove);
    window.addEventListener("resize", onResize);
    let raf = 0;
    const draw = () => {
      ctx.clearRect(0, 0, w, h);
      for (const p of particles) {
        const dx = p.x - mouse.x;
        const dy = p.y - mouse.y;
        const dist = Math.hypot(dx, dy);
        if (dist < 140) {
          p.vx += dx / dist * 0.05;
          p.vy += dy / dist * 0.05;
        }
        p.vx *= 0.98;
        p.vy *= 0.98;
        p.x += p.vx;
        p.y += p.vy;
        if (p.x < 0) p.x = w;
        if (p.x > w) p.x = 0;
        if (p.y < 0) p.y = h;
        if (p.y > h) p.y = 0;
        const color = p.hue === "gold" ? "212,175,55" : "139,92,246";
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${color},0.7)`;
        ctx.shadowBlur = 10;
        ctx.shadowColor = `rgba(${color},0.8)`;
        ctx.fill();
      }
      ctx.shadowBlur = 0;
      raf = requestAnimationFrame(draw);
    };
    draw();
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("resize", onResize);
    };
  }, []);
  return /* @__PURE__ */ jsx("canvas", { ref, className: "pointer-events-none absolute inset-0 h-full w-full" });
}
const PHRASES = [
  "Justice begins with courage.",
  "Truth is my creed.",
  "Discipline shapes destiny."
];
function Hero() {
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
  const onMove = (e) => {
    const r = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - r.left) / r.width - 0.5) * 8;
    const y = ((e.clientY - r.top) / r.height - 0.5) * -8;
    setTilt({ x, y });
  };
  return /* @__PURE__ */ jsxs("section", { id: "home", className: "relative flex min-h-screen items-center justify-center overflow-hidden noise", onMouseMove: onMove, children: [
    /* @__PURE__ */ jsx("div", { className: "pointer-events-none absolute inset-0", style: { background: "var(--gradient-hero)" } }),
    /* @__PURE__ */ jsx(ParticleField, {}),
    /* @__PURE__ */ jsx(
      motion.div,
      {
        className: "pointer-events-none absolute -left-32 top-20 h-[420px] w-[420px] rounded-full blur-3xl",
        style: { background: "oklch(0.65 0.20 295 / 0.35)" },
        animate: { x: [0, 40, 0], y: [0, 30, 0] },
        transition: { duration: 14, repeat: Infinity, ease: "easeInOut" }
      }
    ),
    /* @__PURE__ */ jsx(
      motion.div,
      {
        className: "pointer-events-none absolute -right-32 bottom-20 h-[480px] w-[480px] rounded-full blur-3xl",
        style: { background: "oklch(0.78 0.13 85 / 0.25)" },
        animate: { x: [0, -40, 0], y: [0, -30, 0] },
        transition: { duration: 16, repeat: Infinity, ease: "easeInOut" }
      }
    ),
    /* @__PURE__ */ jsxs(
      motion.div,
      {
        className: "relative z-10 mx-auto max-w-5xl px-6 text-center",
        style: { transform: `perspective(1200px) rotateY(${tilt.x}deg) rotateX(${tilt.y}deg)` },
        children: [
          /* @__PURE__ */ jsxs(
            motion.div,
            {
              initial: { opacity: 0, filter: "blur(20px)", y: 30 },
              animate: { opacity: 1, filter: "blur(0px)", y: 0 },
              transition: { duration: 1.4, ease: [0.16, 1, 0.3, 1] },
              className: "glass-strong luxury-border relative overflow-hidden rounded-[2rem] p-10 sm:p-16",
              style: { boxShadow: "var(--shadow-glass), var(--shadow-purple)" },
              children: [
                /* @__PURE__ */ jsx("div", { className: "animate-shimmer absolute -top-px left-10 right-10 h-px" }),
                /* @__PURE__ */ jsx(
                  motion.p,
                  {
                    initial: { opacity: 0, y: 20 },
                    animate: { opacity: 1, y: 0 },
                    transition: { delay: 0.3, duration: 1 },
                    className: "mb-6 text-[10px] uppercase tracking-[0.6em] text-gold/80",
                    children: "— Future Advocate · Est. 2026 —"
                  }
                ),
                /* @__PURE__ */ jsx(
                  motion.h1,
                  {
                    initial: { opacity: 0, y: 40, filter: "blur(12px)" },
                    animate: { opacity: 1, y: 0, filter: "blur(0px)" },
                    transition: { delay: 0.5, duration: 1.2, ease: [0.16, 1, 0.3, 1] },
                    className: "font-display text-[clamp(4rem,14vw,11rem)] font-bold leading-none tracking-[0.04em]",
                    children: /* @__PURE__ */ jsx("span", { className: "gradient-text", children: "SAMIA" })
                  }
                ),
                /* @__PURE__ */ jsxs("div", { className: "my-6 flex items-center justify-center gap-3", children: [
                  /* @__PURE__ */ jsx("span", { className: "h-px w-16 bg-gradient-to-r from-transparent to-gold/70" }),
                  /* @__PURE__ */ jsx("span", { className: "font-display text-[10px] uppercase tracking-[0.5em] text-ivory/70", children: "Sensei" }),
                  /* @__PURE__ */ jsx("span", { className: "h-px w-16 bg-gradient-to-l from-transparent to-gold/70" })
                ] }),
                /* @__PURE__ */ jsx(
                  motion.p,
                  {
                    initial: { opacity: 0, y: 20 },
                    animate: { opacity: 1, y: 0 },
                    transition: { delay: 0.9, duration: 1 },
                    className: "mx-auto max-w-xl font-serif text-lg italic text-ivory/85 sm:text-xl",
                    children: "Future Advocate of Truth & Justice"
                  }
                ),
                /* @__PURE__ */ jsxs(
                  motion.p,
                  {
                    initial: { opacity: 0 },
                    animate: { opacity: 1 },
                    transition: { delay: 1.4 },
                    className: "caret mt-6 font-sans text-base text-ivory/60 sm:text-lg",
                    children: [
                      /* @__PURE__ */ jsx("span", { className: "text-gold/90", children: "“" }),
                      text,
                      /* @__PURE__ */ jsx("span", { className: "text-gold/90", children: "”" })
                    ]
                  }
                ),
                /* @__PURE__ */ jsxs(
                  motion.div,
                  {
                    initial: { opacity: 0, y: 20 },
                    animate: { opacity: 1, y: 0 },
                    transition: { delay: 1.6, duration: 1 },
                    className: "mt-10 flex flex-wrap items-center justify-center gap-4",
                    children: [
                      /* @__PURE__ */ jsx(MagneticButton, { href: "#about", children: "Explore Portfolio" }),
                      /* @__PURE__ */ jsx(
                        "a",
                        {
                          href: "#contact",
                          className: "rounded-full border border-ivory/20 px-6 py-3 text-xs uppercase tracking-[0.3em] text-ivory/80 transition-all hover:border-purple-glow hover:text-ivory",
                          children: "Get in touch"
                        }
                      )
                    ]
                  }
                )
              ]
            }
          ),
          /* @__PURE__ */ jsxs(
            motion.a,
            {
              href: "#about",
              initial: { opacity: 0 },
              animate: { opacity: 1 },
              transition: { delay: 2.2 },
              className: "mt-12 inline-flex flex-col items-center gap-2 text-[10px] uppercase tracking-[0.4em] text-ivory/50",
              children: [
                "Scroll",
                /* @__PURE__ */ jsx("span", { className: "relative block h-10 w-px overflow-hidden bg-ivory/10", children: /* @__PURE__ */ jsx(
                  motion.span,
                  {
                    className: "absolute left-0 top-0 h-3 w-px bg-gold",
                    animate: { y: [-12, 40] },
                    transition: { duration: 2, repeat: Infinity, ease: "easeInOut" }
                  }
                ) })
              ]
            }
          )
        ]
      }
    )
  ] });
}
function MagneticButton({ href, children }) {
  const [m, setM] = useState({ x: 0, y: 0 });
  return /* @__PURE__ */ jsxs(
    "a",
    {
      href,
      onMouseMove: (e) => {
        const r = e.currentTarget.getBoundingClientRect();
        setM({ x: (e.clientX - r.left - r.width / 2) * 0.25, y: (e.clientY - r.top - r.height / 2) * 0.25 });
      },
      onMouseLeave: () => setM({ x: 0, y: 0 }),
      style: { transform: `translate(${m.x}px, ${m.y}px)` },
      className: "group relative inline-flex items-center gap-3 overflow-hidden rounded-full px-8 py-3.5 text-xs uppercase tracking-[0.3em] text-background transition-transform duration-200",
      children: [
        /* @__PURE__ */ jsx("span", { className: "absolute inset-0 -z-10 rounded-full", style: { background: "var(--gradient-gold)" } }),
        /* @__PURE__ */ jsx(
          "span",
          {
            className: "absolute inset-0 -z-10 rounded-full opacity-0 transition-opacity duration-500 group-hover:opacity-100",
            style: { background: "var(--gradient-purple-gold)", boxShadow: "var(--shadow-gold)" }
          }
        ),
        /* @__PURE__ */ jsx("span", { className: "font-semibold", children }),
        /* @__PURE__ */ jsx("span", { "aria-hidden": true, children: "→" })
      ]
    }
  );
}
function Reveal({
  children,
  delay = 0,
  y = 30,
  className
}) {
  return /* @__PURE__ */ jsx(
    motion.div,
    {
      initial: { opacity: 0, y, filter: "blur(10px)" },
      whileInView: { opacity: 1, y: 0, filter: "blur(0px)" },
      viewport: { once: true, amount: 0.2 },
      transition: { duration: 1, delay, ease: [0.16, 1, 0.3, 1] },
      className,
      children
    }
  );
}
const stats = [
  { n: "1st", l: "Year of Law" },
  { n: "08+", l: "Core Skills" },
  { n: "∞", l: "Passion for Justice" },
  { n: "24/7", l: "Discipline" }
];
function About() {
  return /* @__PURE__ */ jsx(SectionShell, { id: "about", eyebrow: "Introduction", title: "The Pursuit of Justice", subtitle: "A storied beginning", children: /* @__PURE__ */ jsxs("div", { className: "grid items-center gap-10 lg:grid-cols-[1.1fr_1fr]", children: [
    /* @__PURE__ */ jsx(Reveal, { children: /* @__PURE__ */ jsxs("div", { className: "space-y-6", children: [
      /* @__PURE__ */ jsxs("p", { className: "font-serif text-2xl leading-relaxed text-ivory/90 sm:text-3xl", children: [
        "A passionate ",
        /* @__PURE__ */ jsx("span", { className: "gradient-text font-semibold", children: "first-year law student" }),
        " driven by courage, discipline, and the pursuit of justice."
      ] }),
      /* @__PURE__ */ jsxs("p", { className: "max-w-xl text-ivory/65 leading-relaxed", children: [
        "Known as ",
        /* @__PURE__ */ jsx("span", { className: "text-gold", children: "Sensei" }),
        " to those closest to her, Samia approaches the law as both a craft and a calling — an art of argument tempered by empathy, and a science of truth guided by ethics. Every brief, every case, every word is a quiet promise to those without a voice."
      ] }),
      /* @__PURE__ */ jsx("div", { className: "flex flex-wrap gap-3 pt-2", children: ["Empathetic", "Disciplined", "Analytical", "Visionary"].map((t) => /* @__PURE__ */ jsx(
        "span",
        {
          className: "glass rounded-full px-4 py-1.5 text-xs uppercase tracking-[0.25em] text-ivory/75",
          children: t
        },
        t
      )) }),
      /* @__PURE__ */ jsx("div", { className: "grid grid-cols-2 gap-4 pt-6 sm:grid-cols-4", children: stats.map((s, i) => /* @__PURE__ */ jsxs(
        motion.div,
        {
          initial: { opacity: 0, y: 20 },
          whileInView: { opacity: 1, y: 0 },
          viewport: { once: true },
          transition: { delay: i * 0.1, duration: 0.8 },
          className: "glass luxury-border rounded-2xl p-4 text-center",
          children: [
            /* @__PURE__ */ jsx("div", { className: "font-display text-2xl text-gold", children: s.n }),
            /* @__PURE__ */ jsx("div", { className: "mt-1 text-[10px] uppercase tracking-[0.25em] text-ivory/55", children: s.l })
          ]
        },
        s.l
      )) })
    ] }) }),
    /* @__PURE__ */ jsx(Reveal, { delay: 0.2, children: /* @__PURE__ */ jsx(ProfileCard, {}) })
  ] }) });
}
function ProfileCard() {
  return /* @__PURE__ */ jsxs("div", { className: "relative mx-auto w-full max-w-md", children: [
    /* @__PURE__ */ jsx(
      motion.div,
      {
        className: "pointer-events-none absolute -left-10 -top-10 h-24 w-24 rounded-full blur-2xl",
        style: { background: "oklch(0.78 0.13 85 / 0.35)" },
        animate: { y: [0, 12, 0] },
        transition: { duration: 6, repeat: Infinity, ease: "easeInOut" }
      }
    ),
    /* @__PURE__ */ jsx(
      motion.div,
      {
        className: "pointer-events-none absolute -bottom-10 -right-10 h-32 w-32 rounded-full blur-3xl",
        style: { background: "oklch(0.65 0.20 295 / 0.4)" },
        animate: { y: [0, -14, 0] },
        transition: { duration: 7, repeat: Infinity, ease: "easeInOut" }
      }
    ),
    /* @__PURE__ */ jsxs("div", { className: "glass-strong luxury-border relative overflow-hidden rounded-[2rem] p-8", children: [
      /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between text-[10px] uppercase tracking-[0.4em] text-ivory/50", children: [
        /* @__PURE__ */ jsx("span", { children: "Profile" }),
        /* @__PURE__ */ jsx("span", { className: "text-gold", children: "01 / 01" })
      ] }),
      /* @__PURE__ */ jsx("div", { className: "my-6 flex items-center justify-center", children: /* @__PURE__ */ jsxs("div", { className: "relative", children: [
        /* @__PURE__ */ jsx(
          "div",
          {
            className: "absolute inset-0 rounded-full blur-2xl",
            style: { background: "var(--gradient-purple-gold)", opacity: 0.4 }
          }
        ),
        /* @__PURE__ */ jsx(
          "div",
          {
            className: "relative flex h-44 w-44 items-center justify-center rounded-full",
            style: { background: "var(--gradient-gold)" },
            children: /* @__PURE__ */ jsx("div", { className: "flex h-[10.5rem] w-[10.5rem] items-center justify-center rounded-full bg-background", children: /* @__PURE__ */ jsx("span", { className: "font-display text-7xl gradient-text", children: "S" }) })
          }
        )
      ] }) }),
      /* @__PURE__ */ jsxs("div", { className: "text-center", children: [
        /* @__PURE__ */ jsx("h3", { className: "font-serif text-2xl text-ivory", children: "Samia" }),
        /* @__PURE__ */ jsx("p", { className: "mt-1 text-xs uppercase tracking-[0.35em] text-gold/80", children: "Sensei · Law Student" })
      ] }),
      /* @__PURE__ */ jsx("div", { className: "mt-6 divider-luxury" }),
      /* @__PURE__ */ jsxs("ul", { className: "mt-6 space-y-3 text-sm", children: [
        /* @__PURE__ */ jsx(Row, { k: "Focus", v: "Constitutional & Human Rights" }),
        /* @__PURE__ */ jsx(Row, { k: "Year", v: "First-Year, Undergraduate" }),
        /* @__PURE__ */ jsx(Row, { k: "Motto", v: "“Justice begins with courage.”" })
      ] })
    ] })
  ] });
}
function Row({ k, v }) {
  return /* @__PURE__ */ jsxs("li", { className: "flex items-start justify-between gap-4", children: [
    /* @__PURE__ */ jsx("span", { className: "text-[10px] uppercase tracking-[0.3em] text-ivory/50", children: k }),
    /* @__PURE__ */ jsx("span", { className: "text-right text-ivory/85", children: v })
  ] });
}
function SectionShell({
  id,
  eyebrow,
  title,
  subtitle,
  children
}) {
  return /* @__PURE__ */ jsx("section", { id, className: "relative py-28 sm:py-36", children: /* @__PURE__ */ jsxs("div", { className: "mx-auto max-w-6xl px-6", children: [
    /* @__PURE__ */ jsx(Reveal, { children: /* @__PURE__ */ jsxs("div", { className: "mb-14 text-center", children: [
      /* @__PURE__ */ jsxs("div", { className: "mb-4 inline-flex items-center gap-3", children: [
        /* @__PURE__ */ jsx("span", { className: "h-px w-10 bg-gold/60" }),
        /* @__PURE__ */ jsx("span", { className: "font-display text-[10px] uppercase tracking-[0.5em] text-gold", children: eyebrow }),
        /* @__PURE__ */ jsx("span", { className: "h-px w-10 bg-gold/60" })
      ] }),
      /* @__PURE__ */ jsx("h2", { className: "font-serif text-4xl text-ivory sm:text-5xl md:text-6xl", children: title }),
      subtitle && /* @__PURE__ */ jsx("p", { className: "mt-3 text-sm uppercase tracking-[0.3em] text-ivory/50", children: subtitle })
    ] }) }),
    children
  ] }) });
}
const SKILLS = [
  { name: "Legal Research", level: 88, icon: "⚖" },
  { name: "Public Speaking", level: 92, icon: "🎙" },
  { name: "Critical Thinking", level: 90, icon: "✦" },
  { name: "Leadership", level: 85, icon: "♛" },
  { name: "Communication", level: 94, icon: "✉" },
  { name: "Case Analysis", level: 82, icon: "§" },
  { name: "Writing & Documentation", level: 89, icon: "✎" },
  { name: "Confidence & Advocacy", level: 95, icon: "❖" }
];
function Skills() {
  return /* @__PURE__ */ jsx(SectionShell, { id: "skills", eyebrow: "Capabilities", title: "Crafted Skills", subtitle: "A disciplined arsenal", children: /* @__PURE__ */ jsx("div", { className: "grid gap-5 sm:grid-cols-2 lg:grid-cols-4", children: SKILLS.map((s, i) => /* @__PURE__ */ jsx(Reveal, { delay: i * 0.06, children: /* @__PURE__ */ jsx(SkillCard, { ...s }) }, s.name)) }) });
}
function SkillCard({ name, level, icon }) {
  return /* @__PURE__ */ jsxs(
    motion.div,
    {
      whileHover: { y: -6 },
      transition: { type: "spring", stiffness: 200, damping: 18 },
      className: "glass luxury-border group relative overflow-hidden rounded-2xl p-6",
      children: [
        /* @__PURE__ */ jsx(
          "div",
          {
            className: "absolute -right-10 -top-10 h-32 w-32 rounded-full opacity-0 blur-2xl transition-opacity duration-500 group-hover:opacity-100",
            style: { background: "var(--gradient-purple-gold)" }
          }
        ),
        /* @__PURE__ */ jsxs("div", { className: "relative", children: [
          /* @__PURE__ */ jsx(
            "div",
            {
              className: "mb-5 flex h-12 w-12 items-center justify-center rounded-xl text-xl text-gold",
              style: {
                background: "oklch(0.13 0 0 / 0.8)",
                boxShadow: "inset 0 0 0 1px oklch(0.78 0.13 85 / 0.3)"
              },
              children: icon
            }
          ),
          /* @__PURE__ */ jsx("h3", { className: "font-serif text-lg text-ivory", children: name }),
          /* @__PURE__ */ jsxs("div", { className: "mt-4 flex items-center justify-between text-[10px] uppercase tracking-[0.3em] text-ivory/50", children: [
            /* @__PURE__ */ jsx("span", { children: "Mastery" }),
            /* @__PURE__ */ jsxs("span", { className: "text-gold", children: [
              level,
              "%"
            ] })
          ] }),
          /* @__PURE__ */ jsx("div", { className: "mt-2 h-1 overflow-hidden rounded-full bg-ivory/10", children: /* @__PURE__ */ jsx(
            motion.div,
            {
              initial: { width: 0 },
              whileInView: { width: `${level}%` },
              viewport: { once: true },
              transition: { duration: 1.4, ease: [0.16, 1, 0.3, 1] },
              className: "h-full rounded-full",
              style: { background: "var(--gradient-gold)", boxShadow: "0 0 12px var(--gold)" }
            }
          ) })
        ] })
      ]
    }
  );
}
const TIMELINE = [
  {
    year: "2025 — Present",
    title: "First-Year Law Student",
    place: "Faculty of Law",
    desc: "Foundations of constitutional law, jurisprudence, contracts, and the philosophy of justice."
  },
  {
    year: "2024",
    title: "Pre-Law Preparation",
    place: "Independent Study",
    desc: "Self-directed study of legal classics, debate, and public speaking. Built the foundations of advocacy."
  },
  {
    year: "Future",
    title: "Bar & Advocacy",
    place: "The Courtroom Awaits",
    desc: "A future devoted to defending truth, upholding human rights, and the relentless pursuit of justice."
  }
];
function Education() {
  return /* @__PURE__ */ jsx(SectionShell, { id: "education", eyebrow: "Journey", title: "Academic Path", subtitle: "A growing legacy", children: /* @__PURE__ */ jsxs("div", { className: "relative mx-auto max-w-3xl", children: [
    /* @__PURE__ */ jsx(
      "div",
      {
        className: "absolute left-5 top-0 h-full w-px sm:left-1/2",
        style: { background: "linear-gradient(180deg, transparent, var(--gold), transparent)" }
      }
    ),
    /* @__PURE__ */ jsx("div", { className: "space-y-12", children: TIMELINE.map((t, i) => /* @__PURE__ */ jsx(Reveal, { delay: i * 0.1, children: /* @__PURE__ */ jsxs("div", { className: `relative grid items-center gap-6 sm:grid-cols-2 ${i % 2 ? "sm:[&>div:first-child]:order-2" : ""}`, children: [
      /* @__PURE__ */ jsxs("div", { className: `pl-14 sm:pl-0 ${i % 2 ? "sm:text-left sm:pl-10" : "sm:text-right sm:pr-10"}`, children: [
        /* @__PURE__ */ jsx("p", { className: "font-display text-[10px] uppercase tracking-[0.4em] text-gold/80", children: t.year }),
        /* @__PURE__ */ jsx("h3", { className: "mt-2 font-serif text-2xl text-ivory", children: t.title }),
        /* @__PURE__ */ jsx("p", { className: "mt-1 text-xs uppercase tracking-[0.25em] text-ivory/55", children: t.place }),
        /* @__PURE__ */ jsx("p", { className: "mt-3 text-sm leading-relaxed text-ivory/70", children: t.desc })
      ] }),
      /* @__PURE__ */ jsx("div", { className: "hidden sm:block" }),
      /* @__PURE__ */ jsx(
        "span",
        {
          className: "absolute left-5 top-2 -translate-x-1/2 sm:left-1/2",
          "aria-hidden": true,
          children: /* @__PURE__ */ jsx("span", { className: "relative block h-3 w-3 rounded-full bg-gold", children: /* @__PURE__ */ jsx("span", { className: "absolute inset-0 animate-pulse-glow rounded-full", style: { boxShadow: "0 0 18px var(--gold)" } }) })
        }
      )
    ] }) }, t.title)) })
  ] }) });
}
const ITEMS = [
  { title: "Top of Class", note: "Awaiting first semester results", year: "Soon" },
  { title: "Moot Court Finalist", note: "Future milestone in advocacy", year: "Soon" },
  { title: "Public Speaking", note: "Champion of words and reason", year: "Soon" },
  { title: "Pro Bono Service", note: "Voice for the voiceless", year: "Soon" },
  { title: "Published Article", note: "Reflections on modern justice", year: "Soon" },
  { title: "Scholarship Holder", note: "Excellence rewarded", year: "Soon" }
];
function Achievements() {
  return /* @__PURE__ */ jsx(SectionShell, { id: "achievements", eyebrow: "Milestones", title: "Achievements", subtitle: "Chapters yet to be written", children: /* @__PURE__ */ jsx("div", { className: "grid gap-6 sm:grid-cols-2 lg:grid-cols-3", children: ITEMS.map((a, i) => /* @__PURE__ */ jsx(Reveal, { delay: i * 0.06, children: /* @__PURE__ */ jsxs(
    motion.div,
    {
      whileHover: { y: -8, rotateX: 4, rotateY: -4 },
      transition: { type: "spring", stiffness: 180, damping: 16 },
      className: "glass luxury-border group relative overflow-hidden rounded-2xl p-7",
      style: { transformStyle: "preserve-3d" },
      children: [
        /* @__PURE__ */ jsx(
          "div",
          {
            className: "absolute inset-0 -z-10 opacity-0 transition-opacity duration-500 group-hover:opacity-100",
            style: {
              background: "radial-gradient(circle at 50% 0%, oklch(0.78 0.13 85 / 0.18), transparent 60%)"
            }
          }
        ),
        /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between", children: [
          /* @__PURE__ */ jsx(
            "span",
            {
              className: "flex h-10 w-10 items-center justify-center rounded-full text-gold",
              style: { boxShadow: "inset 0 0 0 1px oklch(0.78 0.13 85 / 0.5)" },
              children: "✦"
            }
          ),
          /* @__PURE__ */ jsx("span", { className: "font-display text-[10px] uppercase tracking-[0.4em] text-ivory/45", children: a.year })
        ] }),
        /* @__PURE__ */ jsx("h3", { className: "mt-5 font-serif text-xl text-ivory", children: a.title }),
        /* @__PURE__ */ jsx("p", { className: "mt-2 text-sm text-ivory/65", children: a.note }),
        /* @__PURE__ */ jsx("div", { className: "mt-6 divider-luxury opacity-50 transition-opacity duration-500 group-hover:opacity-100" })
      ]
    }
  ) }, a.title)) }) });
}
const CERTS = [
  { name: "Introduction to Constitutional Law", org: "Faculty of Law", code: "LW-101" },
  { name: "Human Rights & Modern Society", org: "Open Academy", code: "HR-204" },
  { name: "Public Speaking Mastery", org: "Orators Institute", code: "PS-007" },
  { name: "Legal Research Methodology", org: "Law Library", code: "LR-310" },
  { name: "Ethics in Legal Practice", org: "Bar Foundations", code: "ET-122" }
];
function Certificates() {
  return /* @__PURE__ */ jsxs(SectionShell, { id: "certificates", eyebrow: "Credentials", title: "Certificates", subtitle: "Scroll the showcase", children: [
    /* @__PURE__ */ jsx(Reveal, { children: /* @__PURE__ */ jsx("div", { className: "no-scrollbar -mx-6 flex snap-x snap-mandatory gap-6 overflow-x-auto px-6 pb-6", children: CERTS.map((c) => /* @__PURE__ */ jsxs(
      "article",
      {
        className: "glass luxury-border group relative aspect-[4/5] w-[280px] flex-shrink-0 snap-center overflow-hidden rounded-2xl p-6 transition-transform duration-500 hover:scale-[1.03] sm:w-[320px]",
        children: [
          /* @__PURE__ */ jsx(
            "div",
            {
              className: "absolute inset-0 -z-10 opacity-60 transition-opacity duration-500 group-hover:opacity-100",
              style: {
                background: "radial-gradient(ellipse at 50% 30%, oklch(0.78 0.13 85 / 0.18), transparent 60%), radial-gradient(ellipse at 50% 100%, oklch(0.65 0.20 295 / 0.18), transparent 60%)"
              }
            }
          ),
          /* @__PURE__ */ jsxs("div", { className: "flex h-full flex-col justify-between", children: [
            /* @__PURE__ */ jsxs("div", { children: [
              /* @__PURE__ */ jsx("p", { className: "text-[10px] uppercase tracking-[0.4em] text-gold/80", children: "Certificate" }),
              /* @__PURE__ */ jsx("h3", { className: "mt-4 font-serif text-2xl leading-snug text-ivory", children: c.name })
            ] }),
            /* @__PURE__ */ jsx("div", { className: "flex h-32 items-center justify-center", children: /* @__PURE__ */ jsx("div", { className: "flex h-24 w-24 items-center justify-center rounded-full", style: { background: "var(--gradient-gold)" }, children: /* @__PURE__ */ jsx("span", { className: "font-display text-3xl text-background", children: "✦" }) }) }),
            /* @__PURE__ */ jsxs("div", { className: "flex items-end justify-between text-xs text-ivory/60", children: [
              /* @__PURE__ */ jsx("span", { children: c.org }),
              /* @__PURE__ */ jsx("span", { className: "font-display text-gold", children: c.code })
            ] })
          ] })
        ]
      },
      c.name
    )) }) }),
    /* @__PURE__ */ jsx("p", { className: "mt-2 text-center text-[10px] uppercase tracking-[0.3em] text-ivory/40", children: "← Drag · Swipe →" })
  ] });
}
const BLOGS = [
  {
    tag: "Justice",
    title: "On the Quiet Power of Justice",
    excerpt: "Justice is not loud — it is the patient force that bends the arc of every society toward fairness.",
    read: "4 min"
  },
  {
    tag: "Human Rights",
    title: "The Universal Language of Dignity",
    excerpt: "Human rights are not granted; they are recognized. A reflection on dignity beyond borders.",
    read: "6 min"
  },
  {
    tag: "Ethics",
    title: "Why Legal Ethics Are the Highest Art",
    excerpt: "Brilliant arguments fade. Integrity endures. A note on what truly shapes a lawyer.",
    read: "5 min"
  },
  {
    tag: "Women in Law",
    title: "Women, Robes & Revolution",
    excerpt: "A tribute to the women who made it possible — and a promise to those who follow.",
    read: "7 min"
  },
  {
    tag: "Modern Systems",
    title: "Justice in the Age of Algorithms",
    excerpt: "When code begins to judge, what role remains for the human conscience?",
    read: "8 min"
  }
];
function Blogs() {
  return /* @__PURE__ */ jsx(SectionShell, { id: "blogs", eyebrow: "Editorial", title: "Legal Insights", subtitle: "Notes from a future advocate", children: /* @__PURE__ */ jsx("div", { className: "grid gap-6 md:grid-cols-2 lg:grid-cols-3", children: BLOGS.map((b, i) => /* @__PURE__ */ jsx(Reveal, { delay: i * 0.08, children: /* @__PURE__ */ jsxs(
    motion.article,
    {
      whileHover: { y: -10 },
      transition: { type: "spring", stiffness: 200, damping: 20 },
      className: "glass luxury-border group relative flex h-full flex-col overflow-hidden rounded-2xl p-7",
      children: [
        /* @__PURE__ */ jsx("div", { className: "absolute left-0 right-0 top-0 h-px overflow-hidden", children: /* @__PURE__ */ jsx("div", { className: "animate-shimmer h-full" }) }),
        /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between", children: [
          /* @__PURE__ */ jsx("span", { className: "rounded-full border border-gold/40 px-3 py-1 text-[10px] uppercase tracking-[0.3em] text-gold", children: b.tag }),
          /* @__PURE__ */ jsx("span", { className: "text-[10px] uppercase tracking-[0.25em] text-ivory/45", children: b.read })
        ] }),
        /* @__PURE__ */ jsx("h3", { className: "mt-5 font-serif text-2xl leading-snug text-ivory", children: b.title }),
        /* @__PURE__ */ jsx("p", { className: "mt-3 flex-1 text-sm leading-relaxed text-ivory/65", children: b.excerpt }),
        /* @__PURE__ */ jsxs("div", { className: "mt-6 flex items-center gap-2 text-xs uppercase tracking-[0.3em] text-gold/90 transition-transform duration-300 group-hover:translate-x-1", children: [
          "Read essay ",
          /* @__PURE__ */ jsx("span", { children: "→" })
        ] })
      ]
    }
  ) }, b.title)) }) });
}
const FRAMES = [
  { h: 380, g: "linear-gradient(135deg, oklch(0.78 0.13 85 / 0.35), oklch(0.65 0.20 295 / 0.35))", label: "Library Study" },
  { h: 280, g: "linear-gradient(180deg, oklch(0.13 0 0), oklch(0.65 0.20 295 / 0.4))", label: "Moot Court" },
  { h: 320, g: "linear-gradient(45deg, oklch(0.78 0.13 85 / 0.4), oklch(0.13 0 0))", label: "Ceremony" },
  { h: 400, g: "radial-gradient(circle at 30% 30%, oklch(0.65 0.20 295 / 0.45), oklch(0.13 0 0))", label: "Debate Night" },
  { h: 260, g: "linear-gradient(135deg, oklch(0.13 0 0), oklch(0.78 0.13 85 / 0.35))", label: "Reading Hall" },
  { h: 360, g: "linear-gradient(225deg, oklch(0.65 0.20 295 / 0.4), oklch(0.78 0.13 85 / 0.25))", label: "Robes & Wisdom" }
];
function Gallery() {
  return /* @__PURE__ */ jsx(SectionShell, { id: "gallery", eyebrow: "Frames", title: "Visual Diary", subtitle: "Moments of becoming", children: /* @__PURE__ */ jsx(Reveal, { children: /* @__PURE__ */ jsx("div", { className: "columns-1 gap-5 sm:columns-2 lg:columns-3 [&>*]:mb-5", children: FRAMES.map((f, i) => /* @__PURE__ */ jsxs(
    "figure",
    {
      className: "glass luxury-border group relative break-inside-avoid overflow-hidden rounded-2xl",
      style: { height: f.h },
      children: [
        /* @__PURE__ */ jsx("div", { className: "absolute inset-0 transition-transform duration-700 group-hover:scale-105", style: { background: f.g } }),
        /* @__PURE__ */ jsx(
          "div",
          {
            className: "absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100",
            style: { background: "radial-gradient(circle at 50% 50%, oklch(0.78 0.13 85 / 0.25), transparent 60%)" }
          }
        ),
        /* @__PURE__ */ jsxs("figcaption", { className: "absolute bottom-0 left-0 right-0 flex items-end justify-between p-5", children: [
          /* @__PURE__ */ jsx("span", { className: "font-serif text-lg text-ivory", children: f.label }),
          /* @__PURE__ */ jsx("span", { className: "font-display text-[10px] uppercase tracking-[0.4em] text-gold", children: String(i + 1).padStart(2, "0") })
        ] })
      ]
    },
    i
  )) }) }) });
}
const QUOTES = [
  {
    q: "Samia has the rarest gift in law — the patience to listen, and the courage to speak.",
    a: "Prof. A. Rahman",
    r: "Mentor & Senior Lecturer"
  },
  {
    q: "A mind sharpened by discipline and a heart steadied by empathy. The courtroom will know her name.",
    a: "S. Karim, Esq.",
    r: "Practicing Attorney"
  },
  {
    q: "When she speaks, the room listens. That is the foundation of every great advocate.",
    a: "L. Chowdhury",
    r: "Debate Coach"
  }
];
function Testimonials() {
  const [i, setI] = useState(0);
  useEffect(() => {
    const t = setInterval(() => setI((v) => (v + 1) % QUOTES.length), 6e3);
    return () => clearInterval(t);
  }, []);
  return /* @__PURE__ */ jsx(SectionShell, { id: "testimonials", eyebrow: "Words", title: "Testimonials", subtitle: "From those who have watched her rise", children: /* @__PURE__ */ jsx("div", { className: "relative mx-auto max-w-3xl", children: /* @__PURE__ */ jsxs(
    motion.div,
    {
      animate: { y: [0, -8, 0] },
      transition: { duration: 6, repeat: Infinity, ease: "easeInOut" },
      className: "glass-strong luxury-border relative rounded-[2rem] p-10 sm:p-14",
      children: [
        /* @__PURE__ */ jsx(
          "span",
          {
            className: "font-display absolute -top-8 left-8 text-[7rem] leading-none text-gold/30 select-none",
            "aria-hidden": true,
            children: "“"
          }
        ),
        /* @__PURE__ */ jsx(AnimatePresence, { mode: "wait", children: /* @__PURE__ */ jsx(
          motion.blockquote,
          {
            initial: { opacity: 0, y: 20, filter: "blur(8px)" },
            animate: { opacity: 1, y: 0, filter: "blur(0px)" },
            exit: { opacity: 0, y: -20, filter: "blur(8px)" },
            transition: { duration: 0.7 },
            className: "font-serif text-2xl italic leading-relaxed text-ivory/90 sm:text-3xl",
            children: QUOTES[i].q
          },
          i
        ) }),
        /* @__PURE__ */ jsxs("div", { className: "mt-8 flex items-center justify-between", children: [
          /* @__PURE__ */ jsxs("div", { children: [
            /* @__PURE__ */ jsx("p", { className: "font-display text-sm uppercase tracking-[0.3em] text-gold", children: QUOTES[i].a }),
            /* @__PURE__ */ jsx("p", { className: "mt-1 text-xs uppercase tracking-[0.25em] text-ivory/55", children: QUOTES[i].r })
          ] }),
          /* @__PURE__ */ jsx("div", { className: "flex gap-2", children: QUOTES.map((_, idx) => /* @__PURE__ */ jsx(
            "button",
            {
              onClick: () => setI(idx),
              "aria-label": `Testimonial ${idx + 1}`,
              className: `h-1.5 rounded-full transition-all ${idx === i ? "w-8 bg-gold" : "w-4 bg-ivory/20"}`
            },
            idx
          )) })
        ] })
      ]
    }
  ) }) });
}
function Contact() {
  const [sent, setSent] = useState(false);
  return /* @__PURE__ */ jsx(SectionShell, { id: "contact", eyebrow: "Connect", title: "Begin a Conversation", subtitle: "Words travel — let yours arrive here", children: /* @__PURE__ */ jsxs("div", { className: "grid gap-10 lg:grid-cols-[1fr_1.2fr]", children: [
    /* @__PURE__ */ jsx(Reveal, { children: /* @__PURE__ */ jsxs("div", { className: "space-y-8", children: [
      /* @__PURE__ */ jsx("p", { className: "font-serif text-2xl leading-relaxed text-ivory/85", children: "For collaborations, mentorship, or simply a thoughtful exchange — your message will be read with the care it deserves." }),
      /* @__PURE__ */ jsxs("ul", { className: "space-y-4", children: [
        /* @__PURE__ */ jsxs("li", { className: "glass luxury-border rounded-2xl p-5", children: [
          /* @__PURE__ */ jsx("p", { className: "text-[10px] uppercase tracking-[0.35em] text-gold/80", children: "Location" }),
          /* @__PURE__ */ jsx("p", { className: "mt-1 font-serif text-lg text-ivory", children: "Available worldwide · Remote" })
        ] }),
        /* @__PURE__ */ jsxs("li", { className: "glass luxury-border rounded-2xl p-5", children: [
          /* @__PURE__ */ jsx("p", { className: "text-[10px] uppercase tracking-[0.35em] text-gold/80", children: "Hours" }),
          /* @__PURE__ */ jsx("p", { className: "mt-1 font-serif text-lg text-ivory", children: "Mon — Sat · 09:00 — 21:00" })
        ] })
      ] }),
      /* @__PURE__ */ jsx("div", { className: "flex items-center gap-3", children: /* @__PURE__ */ jsxs(
        "a",
        {
          href: "https://instagram.com",
          target: "_blank",
          rel: "noreferrer",
          className: "glass luxury-border group inline-flex items-center gap-3 rounded-full px-5 py-3 text-xs uppercase tracking-[0.3em] text-ivory/80 transition-all hover:text-gold",
          style: { transition: "all 0.4s" },
          children: [
            /* @__PURE__ */ jsx(
              "span",
              {
                className: "flex h-7 w-7 items-center justify-center rounded-full text-background transition-transform group-hover:scale-110",
                style: { background: "var(--gradient-purple-gold)" },
                children: "◎"
              }
            ),
            "Instagram"
          ]
        }
      ) })
    ] }) }),
    /* @__PURE__ */ jsx(Reveal, { delay: 0.15, children: /* @__PURE__ */ jsxs(
      "form",
      {
        onSubmit: (e) => {
          e.preventDefault();
          setSent(true);
          setTimeout(() => setSent(false), 3500);
        },
        className: "glass-strong luxury-border rounded-3xl p-8 sm:p-10",
        children: [
          /* @__PURE__ */ jsxs("div", { className: "grid gap-5 sm:grid-cols-2", children: [
            /* @__PURE__ */ jsx(Field, { label: "Your Name", name: "name" }),
            /* @__PURE__ */ jsx(Field, { label: "Your Email", name: "email", type: "email" })
          ] }),
          /* @__PURE__ */ jsx("div", { className: "mt-5", children: /* @__PURE__ */ jsx(Field, { label: "Subject", name: "subject" }) }),
          /* @__PURE__ */ jsx("div", { className: "mt-5", children: /* @__PURE__ */ jsx(Field, { label: "Message", name: "message", textarea: true }) }),
          /* @__PURE__ */ jsxs(
            "button",
            {
              type: "submit",
              className: "group relative mt-8 inline-flex w-full items-center justify-center gap-3 overflow-hidden rounded-full px-8 py-4 text-xs uppercase tracking-[0.35em] text-background",
              children: [
                /* @__PURE__ */ jsx("span", { className: "absolute inset-0 -z-10", style: { background: "var(--gradient-gold)" } }),
                /* @__PURE__ */ jsx(
                  "span",
                  {
                    className: "absolute inset-0 -z-10 opacity-0 transition-opacity duration-500 group-hover:opacity-100",
                    style: { background: "var(--gradient-purple-gold)", boxShadow: "var(--shadow-purple)" }
                  }
                ),
                /* @__PURE__ */ jsx("span", { className: "font-semibold", children: sent ? "Message Sent · Thank You" : "Send Message" }),
                /* @__PURE__ */ jsx("span", { "aria-hidden": true, children: "→" })
              ]
            }
          )
        ]
      }
    ) })
  ] }) });
}
function Field({
  label,
  name,
  type = "text",
  textarea
}) {
  const [focus, setFocus] = useState(false);
  const Cmp = textarea ? "textarea" : "input";
  return /* @__PURE__ */ jsxs("label", { className: "group block", children: [
    /* @__PURE__ */ jsx("span", { className: "mb-2 block text-[10px] uppercase tracking-[0.35em] text-ivory/55", children: label }),
    /* @__PURE__ */ jsx("div", { className: "relative", children: /* @__PURE__ */ jsx(
      Cmp,
      {
        name,
        type,
        rows: textarea ? 5 : void 0,
        onFocus: () => setFocus(true),
        onBlur: () => setFocus(false),
        required: true,
        className: "w-full resize-none rounded-xl bg-transparent px-4 py-3 font-sans text-ivory placeholder:text-ivory/30 outline-none transition-all",
        style: {
          border: focus ? "1px solid oklch(0.78 0.13 85 / 0.7)" : "1px solid oklch(0.96 0.005 90 / 0.12)",
          boxShadow: focus ? "0 0 24px oklch(0.78 0.13 85 / 0.25), inset 0 0 0 1px oklch(0.78 0.13 85 / 0.4)" : "none",
          background: "oklch(0.10 0 0 / 0.6)"
        }
      }
    ) })
  ] });
}
function Footer() {
  return /* @__PURE__ */ jsxs("footer", { className: "relative overflow-hidden", children: [
    /* @__PURE__ */ jsx(ParticleField, {}),
    /* @__PURE__ */ jsxs("div", { className: "relative mx-auto max-w-6xl px-6 py-20 text-center", children: [
      /* @__PURE__ */ jsx("div", { className: "divider-luxury" }),
      /* @__PURE__ */ jsxs("p", { className: "mt-12 font-serif text-3xl italic text-ivory/90 sm:text-4xl", children: [
        /* @__PURE__ */ jsx("span", { className: "text-gold", children: "“" }),
        /* @__PURE__ */ jsx("span", { className: "gradient-text", children: "Justice begins with courage." }),
        /* @__PURE__ */ jsx("span", { className: "text-gold", children: "”" })
      ] }),
      /* @__PURE__ */ jsx("p", { className: "mt-4 text-[10px] uppercase tracking-[0.5em] text-ivory/55", children: "— Samia · Sensei —" }),
      /* @__PURE__ */ jsxs("div", { className: "mt-12 flex flex-col items-center justify-between gap-4 sm:flex-row", children: [
        /* @__PURE__ */ jsxs("span", { className: "font-display text-[10px] uppercase tracking-[0.4em] text-ivory/45", children: [
          "© ",
          (/* @__PURE__ */ new Date()).getFullYear(),
          " Samia · All Rights Reserved"
        ] }),
        /* @__PURE__ */ jsx(
          "span",
          {
            className: "font-display text-[10px] uppercase tracking-[0.4em]",
            style: { color: "oklch(0.78 0.13 85)", textShadow: "0 0 14px oklch(0.78 0.13 85 / 0.6)" },
            children: "Crafted with elegance"
          }
        )
      ] })
    ] })
  ] });
}
const TRACK = "https://cdn.pixabay.com/audio/2022/10/30/audio_347111d654.mp3";
function MusicToggle() {
  const [on, setOn] = useState(false);
  const ref = useRef(null);
  useEffect(() => {
    const a = new Audio(TRACK);
    a.loop = true;
    a.volume = 0.35;
    ref.current = a;
    return () => {
      a.pause();
      ref.current = null;
    };
  }, []);
  const toggle = () => {
    const a = ref.current;
    if (!a) return;
    if (on) {
      a.pause();
      setOn(false);
    } else {
      a.play().then(() => setOn(true)).catch(() => setOn(false));
    }
  };
  return /* @__PURE__ */ jsxs(
    "button",
    {
      onClick: toggle,
      "aria-label": on ? "Pause ambient music" : "Play ambient music",
      className: "glass-strong luxury-border fixed bottom-6 right-6 z-50 flex h-14 w-14 items-center justify-center rounded-full text-gold transition-all hover:scale-110",
      style: { boxShadow: on ? "var(--shadow-gold)" : "var(--shadow-glass)" },
      children: [
        /* @__PURE__ */ jsx("span", { className: "flex items-end gap-0.5", children: [0, 1, 2].map((i) => /* @__PURE__ */ jsx(
          "span",
          {
            className: "w-[3px] rounded-full bg-gold",
            style: {
              height: on ? `${8 + (i + 1) % 3 * 6}px` : "10px",
              animation: on ? `eq 1s ease-in-out ${i * 0.15}s infinite alternate` : "none"
            }
          },
          i
        )) }),
        /* @__PURE__ */ jsx("style", { children: `@keyframes eq { from { height: 4px } to { height: 18px } }` })
      ]
    }
  );
}
function Index() {
  return /* @__PURE__ */ jsxs("main", { className: "relative min-h-screen overflow-x-hidden bg-background text-foreground", children: [
    /* @__PURE__ */ jsx(CustomCursor, {}),
    /* @__PURE__ */ jsx(Navbar, {}),
    /* @__PURE__ */ jsx(Hero, {}),
    /* @__PURE__ */ jsx(About, {}),
    /* @__PURE__ */ jsx(Skills, {}),
    /* @__PURE__ */ jsx(Education, {}),
    /* @__PURE__ */ jsx(Achievements, {}),
    /* @__PURE__ */ jsx(Certificates, {}),
    /* @__PURE__ */ jsx(Blogs, {}),
    /* @__PURE__ */ jsx(Gallery, {}),
    /* @__PURE__ */ jsx(Testimonials, {}),
    /* @__PURE__ */ jsx(Contact, {}),
    /* @__PURE__ */ jsx(Footer, {}),
    /* @__PURE__ */ jsx(MusicToggle, {})
  ] });
}
export {
  Index as component
};
