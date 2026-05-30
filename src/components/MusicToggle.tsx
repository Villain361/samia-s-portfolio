import { useEffect, useRef, useState } from "react";

// Soft ambient cinematic audio (royalty-free placeholder URL).
const TRACK = "https://cdn.pixabay.com/audio/2022/10/30/audio_347111d654.mp3";

export function MusicToggle() {
  const [on, setOn] = useState(false);
  const ref = useRef<HTMLAudioElement | null>(null);

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

  return (
    <button
      onClick={toggle}
      aria-label={on ? "Pause ambient music" : "Play ambient music"}
      className="glass-strong luxury-border fixed bottom-6 right-6 z-50 flex h-14 w-14 items-center justify-center rounded-full text-gold transition-all hover:scale-110"
      style={{ boxShadow: on ? "var(--shadow-gold)" : "var(--shadow-glass)" }}
    >
      <span className="flex items-end gap-0.5">
        {[0, 1, 2].map((i) => (
          <span
            key={i}
            className="w-[3px] rounded-full bg-gold"
            style={{
              height: on ? `${8 + ((i + 1) % 3) * 6}px` : "10px",
              animation: on ? `eq 1s ease-in-out ${i * 0.15}s infinite alternate` : "none",
            }}
          />
        ))}
      </span>
      <style>{`@keyframes eq { from { height: 4px } to { height: 18px } }`}</style>
    </button>
  );
}
