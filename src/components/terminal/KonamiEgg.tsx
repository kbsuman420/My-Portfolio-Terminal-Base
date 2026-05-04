import { useEffect, useState } from "react";

const SEQUENCE = [
  "ArrowUp", "ArrowUp", "ArrowDown", "ArrowDown",
  "ArrowLeft", "ArrowRight", "ArrowLeft", "ArrowRight",
  "b", "a",
];

const FACTS = [
  "Suman once debugged a production issue at 3 AM with only chai and willpower.",
  "Built his first REST API at 19 — it returned 200 OK on the first try (lies, it 500'd).",
  "Has a soft spot for the semicolon. RIP, ASI.",
  "Trained a tiny GPT from scratch — for fun.",
];

export const KonamiEgg = () => {
  const [active, setActive] = useState(false);
  const [glitch, setGlitch] = useState(false);
  const [fact] = useState(() => FACTS[Math.floor(Math.random() * FACTS.length)]);
  const [progress, setProgress] = useState<string[]>([]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      const key = e.key.length === 1 ? e.key.toLowerCase() : e.key;
      setProgress((p) => {
        const next = [...p, key].slice(-SEQUENCE.length);
        if (next.length === SEQUENCE.length && next.every((k, i) => k === SEQUENCE[i])) {
          setGlitch(true);
          setTimeout(() => {
            setGlitch(false);
            setActive(true);
          }, 900);
          return [];
        }
        return next;
      });
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  if (!glitch && !active) return null;

  return (
    <>
      {glitch && (
        <div className="fixed inset-0 z-[200] pointer-events-none konami-glitch" />
      )}
      {active && (
        <div
          className="fixed inset-0 z-[210] bg-black/90 flex items-center justify-center p-6"
          onClick={() => setActive(false)}
        >
          <div className="term-card max-w-xl w-full p-6 md:p-8 text-center space-y-4">
            <div className="text-terminal-bright term-glow-strong text-xl md:text-2xl glitch-once">
              ACCESS GRANTED — YOU FOUND THE SECRET
            </div>
            <div className="text-terminal-dim text-sm">
              [decrypting hidden_fact.txt ...]
            </div>
            <div className="text-terminal-green text-base md:text-lg">
              {fact}
            </div>
            <button
              onClick={() => setActive(false)}
              className="term-btn text-sm mt-4"
            >
              $ close
            </button>
          </div>
        </div>
      )}
    </>
  );
};