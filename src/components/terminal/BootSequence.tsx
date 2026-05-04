import { useEffect, useState } from "react";

const lines = [
  "BIOS v4.2.1 // Phosphor Systems",
  "Memory check: 64K OK",
  "Loading kernel modules...",
  "Mounting /dev/portfolio...",
  "INITIALIZING PORTFOLIO...",
  "READY.",
];

interface Props {
  onComplete: () => void;
}

export const BootSequence = ({ onComplete }: Props) => {
  const [step, setStep] = useState(0);
  const [typed, setTyped] = useState("");
  const [hide, setHide] = useState(false);

  useEffect(() => {
    if (step >= lines.length) {
      const t = setTimeout(() => {
        setHide(true);
        setTimeout(onComplete, 350);
      }, 400);
      return () => clearTimeout(t);
    }
    const target = lines[step];
    if (typed.length < target.length) {
      const t = setTimeout(
        () => setTyped(target.slice(0, typed.length + 1)),
        18
      );
      return () => clearTimeout(t);
    }
    const t = setTimeout(() => {
      setStep((s) => s + 1);
      setTyped("");
    }, 180);
    return () => clearTimeout(t);
  }, [step, typed, onComplete]);

  return (
    <div
      className={`fixed inset-0 z-[100] bg-black flex items-start justify-start p-6 md:p-12 transition-opacity duration-300 ${
        hide ? "opacity-0 pointer-events-none" : "opacity-100"
      }`}
    >
      <div className="text-terminal-green term-glow text-sm md:text-base space-y-1 max-w-2xl">
        {lines.slice(0, step).map((l, i) => (
          <div key={i}>
            <span className="text-terminal-dim">&gt;</span> {l}{" "}
            <span className="text-terminal-bright">[OK]</span>
          </div>
        ))}
        {step < lines.length && (
          <div>
            <span className="text-terminal-dim">&gt;</span> {typed}
            <span className="cursor-blink-inline" />
          </div>
        )}
      </div>
    </div>
  );
};