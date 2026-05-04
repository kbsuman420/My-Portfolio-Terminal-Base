import { useEffect, useState } from "react";

const fmt = (s: number) => {
  const hh = String(Math.floor(s / 3600)).padStart(2, "0");
  const mm = String(Math.floor((s % 3600) / 60)).padStart(2, "0");
  const ss = String(s % 60).padStart(2, "0");
  return `${hh}:${mm}:${ss}`;
};

export const Uptime = () => {
  const [s, setS] = useState(0);
  useEffect(() => {
    const i = setInterval(() => setS((v) => v + 1), 1000);
    return () => clearInterval(i);
  }, []);
  return (
    <span className="text-terminal-dim">
      uptime: <span className="text-terminal-green">{fmt(s)}</span>
    </span>
  );
};