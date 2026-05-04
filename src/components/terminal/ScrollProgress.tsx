import { useEffect, useState } from "react";

export const ScrollProgress = () => {
  const [pct, setPct] = useState(0);
  useEffect(() => {
    const onScroll = () => {
      const h = document.documentElement;
      const max = h.scrollHeight - h.clientHeight;
      setPct(max > 0 ? (h.scrollTop / max) * 100 : 0);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);
  return (
    <div
      aria-hidden="true"
      className="fixed top-0 right-0 w-[2px] h-screen z-[55] pointer-events-none bg-terminal-green/10"
    >
      <div
        className="w-full bg-[#00ff41]"
        style={{
          height: `${pct}%`,
          boxShadow: "0 0 8px #00ff41, 0 0 2px #00ff41",
          transition: "height 80ms linear",
        }}
      />
    </div>
  );
};