import { useEffect, useState } from "react";

interface TypewriterProps {
  text: string;
  speed?: number;
  delay?: number;
  className?: string;
  cursor?: boolean;
  onDone?: () => void;
}

export const Typewriter = ({
  text,
  speed = 35,
  delay = 0,
  className = "",
  cursor = false,
  onDone,
}: TypewriterProps) => {
  const [displayed, setDisplayed] = useState("");
  const [started, setStarted] = useState(false);
  const [done, setDone] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setStarted(true), delay);
    return () => clearTimeout(t);
  }, [delay]);

  useEffect(() => {
    if (!started) return;
    if (displayed.length >= text.length) {
      if (!done) {
        setDone(true);
        onDone?.();
      }
      return;
    }
    const t = setTimeout(() => {
      setDisplayed(text.slice(0, displayed.length + 1));
    }, speed);
    return () => clearTimeout(t);
  }, [displayed, started, text, speed, done, onDone]);

  return (
    <span className={className}>
      {displayed}
      {cursor && <span className="cursor-blink-inline" />}
    </span>
  );
};