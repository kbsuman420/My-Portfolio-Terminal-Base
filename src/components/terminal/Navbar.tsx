import { useEffect, useState } from "react";
import { Uptime } from "./Uptime";

const links = [
  { href: "#home", label: "[HOME]" },
  { href: "#about", label: "[ABOUT]" },
  { href: "#skills", label: "[SKILLS]" },
  { href: "#projects", label: "[PROJECTS]" },
  { href: "#experience", label: "[EXP]" },
  { href: "#contact", label: "[CONTACT]" },
];

export const Navbar = () => {
  const [active, setActive] = useState<string>("home");

  useEffect(() => {
    const ids = ["home", "about", "skills", "projects", "experience", "contact"];
    const onScroll = () => {
      const probe = window.innerHeight * 0.35;
      let current = ids[0];
      for (const id of ids) {
        const el = document.getElementById(id);
        if (!el) continue;
        const top = el.getBoundingClientRect().top;
        if (top <= probe) current = id;
      }
      setActive(current);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <nav className="sticky top-0 z-40 bg-black/80 backdrop-blur-sm border-b border-terminal-green/30">
      <div className="max-w-5xl mx-auto px-4 py-3 flex flex-wrap items-center justify-between gap-x-4 gap-y-2 text-xs md:text-sm">
        <div className="flex items-center gap-3">
          <span className="text-terminal-dim">guest@suman:~$</span>
          <Uptime />
          <span className="hidden sm:flex items-center gap-1.5 text-terminal-bright">
            <span className="coding-dot inline-block w-2 h-2 rounded-full bg-terminal-green" />
            <span className="text-[10px] md:text-xs">CODING</span>
          </span>
        </div>
        <div className="flex flex-wrap gap-3 md:gap-4">
          {links.map((l) => {
            const id = l.href.slice(1);
            const isActive = active === id;
            return (
              <a
                key={l.href}
                href={l.href}
                className={`transition-colors ${
                  isActive
                    ? "text-terminal-bright term-glow-strong"
                    : "text-terminal-green/70 hover:text-terminal-bright"
                }`}
              >
                {l.label}
              </a>
            );
          })}
        </div>
      </div>
    </nav>
  );
};