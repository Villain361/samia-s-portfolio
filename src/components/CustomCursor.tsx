import { useEffect, useState } from "react";

export function CustomCursor() {
  const [pos, setPos] = useState({ x: -100, y: -100 });
  const [trail, setTrail] = useState({ x: -100, y: -100 });
  const [hover, setHover] = useState(false);

  useEffect(() => {
    const move = (e: MouseEvent) => setPos({ x: e.clientX, y: e.clientY });
    const over = (e: MouseEvent) => {
      const t = e.target as HTMLElement;
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

  return (
    <>
      <div
        className="pointer-events-none fixed z-[9999] hidden md:block"
        style={{
          left: pos.x,
          top: pos.y,
          transform: `translate(-50%, -50%) scale(${hover ? 1.6 : 1})`,
          transition: "transform 200ms ease",
        }}
      >
        <div className="h-2 w-2 rounded-full bg-gold" style={{ boxShadow: "0 0 12px var(--gold), 0 0 24px var(--gold)" }} />
      </div>
      <div
        className="pointer-events-none fixed z-[9998] hidden md:block"
        style={{
          left: trail.x,
          top: trail.y,
          transform: `translate(-50%, -50%) scale(${hover ? 2.2 : 1})`,
          transition: "transform 300ms ease",
        }}
      >
        <div
          className="h-10 w-10 rounded-full"
          style={{
            border: "1px solid oklch(0.78 0.13 85 / 0.6)",
            background: "radial-gradient(circle, oklch(0.65 0.20 295 / 0.15), transparent 70%)",
          }}
        />
      </div>
    </>
  );
}
