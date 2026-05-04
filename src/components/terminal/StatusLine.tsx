import { useEffect, useState } from "react";

const MESSAGES = [
  "[SYSTEM READY]",
  "[OPEN TO WORK — 2026]",
  "[BUILDING IN PUBLIC]",
  "[AVAILABLE FOR HIRE]",
];

export const StatusLine = () => {
  const [idx, setIdx] = useState(0);
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const interval = setInterval(() => {
      setVisible(false);
      setTimeout(() => {
        setIdx((i) => (i + 1) % MESSAGES.length);
        setVisible(true);
      }, 400);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="mt-3 text-sm md:text-base h-6">
      <span
        className={`text-terminal-bright term-glow-strong transition-opacity duration-400 ${
          visible ? "opacity-100" : "opacity-0"
        }`}
      >
        {MESSAGES[idx]}
      </span>
    </div>
  );
};