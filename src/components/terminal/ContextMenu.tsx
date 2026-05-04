import { useEffect, useState } from "react";

type Pos = { x: number; y: number } | null;

export const ContextMenu = () => {
  const [pos, setPos] = useState<Pos>(null);

  useEffect(() => {
    const onCtx = (e: MouseEvent) => {
      e.preventDefault();
      const w = 220;
      const h = 180;
      const x = Math.min(e.clientX, window.innerWidth - w - 8);
      const y = Math.min(e.clientY, window.innerHeight - h - 8);
      setPos({ x, y });
    };
    const close = () => setPos(null);
    window.addEventListener("contextmenu", onCtx);
    window.addEventListener("click", close);
    window.addEventListener("scroll", close, true);
    return () => {
      window.removeEventListener("contextmenu", onCtx);
      window.removeEventListener("click", close);
      window.removeEventListener("scroll", close, true);
    };
  }, []);

  if (!pos) return null;

  const item = (label: string, onClick: () => void) => (
    <button
      onClick={() => {
        onClick();
        setPos(null);
      }}
      className="w-full text-left px-3 py-1.5 text-sm text-terminal-green hover:bg-terminal-green/10 hover:text-terminal-bright transition-colors"
    >
      {label}
    </button>
  );

  return (
    <div
      className="fixed z-[150] bg-black border border-terminal-green/60 shadow-[0_0_12px_hsl(var(--terminal-green)/0.4)] min-w-[220px]"
      style={{ left: pos.x, top: pos.y }}
      onClick={(e) => e.stopPropagation()}
      onContextMenu={(e) => e.preventDefault()}
    >
      <div className="px-3 py-1 text-[10px] text-terminal-dim border-b border-terminal-green/30">
        /dev/menu
      </div>
      {item("[view source]", () =>
        window.open("https://github.com/kbsuman420", "_blank")
      )}
      {item("[copy email]", () =>
        navigator.clipboard.writeText("kundu.1suman@gmail.com")
      )}
      {item("[open github]", () =>
        window.open("https://github.com/kbsuman420", "_blank")
      )}
      {item("[back to top]", () =>
        window.scrollTo({ top: 0, behavior: "smooth" })
      )}
    </div>
  );
};