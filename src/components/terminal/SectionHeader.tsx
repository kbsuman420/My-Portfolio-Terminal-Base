import { useEffect, useRef, useState } from "react";

const GLITCH_CHARS = "!@#$%^&*<>?/\\|{}[]_=+-01ABXZКЯΣΩ";
const randCh = () =>
  GLITCH_CHARS[Math.floor(Math.random() * GLITCH_CHARS.length)];
const scramble = (s: string) =>
  s
    .split("")
    .map((c) => (c === " " ? " " : randCh()))
    .join("");

interface SectionHeaderProps {
  label: string;
  id?: string;
}

export const SectionHeader = ({ label, id }: SectionHeaderProps) => {
  const ref = useRef<HTMLHeadingElement>(null);
  const [text, setText] = useState(label);
  const firedRef = useRef(false);

  useEffect(() => {
    setText(label);
  }, [label]);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting && !firedRef.current) {
            firedRef.current = true;
            const swaps = 5;
            const interval = 80;
            for (let i = 0; i < swaps; i++) {
              setTimeout(() => setText(scramble(label)), i * interval);
            }
            setTimeout(() => setText(label), swaps * interval);
            obs.disconnect();
          }
        });
      },
      { threshold: 0.3 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [label]);

  return (
    <h2
      id={id}
      ref={ref}
      className="text-xl md:text-2xl mb-6 text-terminal-bright term-glow-strong cursor-blink break-words"
    >
      {text}
    </h2>
  );
};