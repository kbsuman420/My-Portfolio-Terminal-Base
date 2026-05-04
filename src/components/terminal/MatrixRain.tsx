import { useEffect, useRef } from "react";

interface Props {
  opacity?: number;
  zIndex?: number;
}

export const MatrixRain = ({ opacity = 0.04, zIndex = 0 }: Props = {}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);
    const fontSize = 14;
    let columns = Math.floor(width / fontSize);
    let drops: number[] = Array(columns).fill(1);

    const chars =
      "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@#$%&*+-=<>{}[]/\\|";

    const resize = () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
      columns = Math.floor(width / fontSize);
      drops = Array(columns).fill(1);
    };
    window.addEventListener("resize", resize);

    let raf = 0;
    let last = 0;
    const draw = (t: number) => {
      if (t - last > 70) {
        last = t;
        ctx.fillStyle = "rgba(0, 0, 0, 0.08)";
        ctx.fillRect(0, 0, width, height);
        ctx.fillStyle = "#00ff41";
        ctx.font = `${fontSize}px 'Share Tech Mono', monospace`;
        for (let i = 0; i < drops.length; i++) {
          const text = chars[Math.floor(Math.random() * chars.length)];
          ctx.fillText(text, i * fontSize, drops[i] * fontSize);
          if (drops[i] * fontSize > height && Math.random() > 0.975) {
            drops[i] = 0;
          }
          drops[i]++;
        }
      }
      raf = requestAnimationFrame(draw);
    };
    raf = requestAnimationFrame(draw);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none"
      style={{ opacity, zIndex }}
      aria-hidden="true"
    />
  );
};