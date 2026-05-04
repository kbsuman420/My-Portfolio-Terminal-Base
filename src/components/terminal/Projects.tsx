import { useEffect, useState } from "react";
import { SectionHeader } from "./SectionHeader";

type Project = {
  name: string;
  sub: string;
  stack: string;
  date: string;
  bullets: string[];
  repo: string;
  badge: { label: string; color: string };
};

const REPO = "https://github.com/kbsuman420";

const projects: Project[] = [
  {
    name: "PIZZA X",
    sub: "Pizza Ordering Platform",
    stack: "React · Redux · Node.js · REST API",
    date: "Jan 2026 – Feb 2026",
    bullets: [
      "Built end-to-end ordering flow with cart, checkout, and order tracking.",
      "Designed REST API with auth, menu management, and persistent orders.",
    ],
    repo: REPO,
    badge: { label: "[LIVE]", color: "#00ff41" },
  },
  {
    name: "MEET",
    sub: "Open Source Video Conferencing",
    stack: "React · Django · WebRTC · LiveKit · Docker",
    date: "2025",
    bullets: [
      "Implemented multi-party video rooms with WebRTC and LiveKit signaling.",
      "Containerized backend with Docker for one-command self-hosted deploy.",
    ],
    repo: REPO,
    badge: { label: "[OPEN SOURCE]", color: "#00ffff" },
  },
  {
    name: "CRYPTOCAST",
    sub: "Crypto Price Predictor",
    stack: "Python · LSTM · GRU · CNN · scikit-learn",
    date: "2024",
    bullets: [
      "Trained hybrid LSTM/GRU/CNN models on historical OHLCV data.",
      "Benchmarked architectures and shipped interactive forecast dashboard.",
    ],
    repo: REPO,
    badge: { label: "[ML MODEL]", color: "#ffaa00" },
  },
  {
    name: "SMARTCV",
    sub: "AI Resume Analyzer",
    stack: "Python · NLP · Streamlit · MySQL · spaCy",
    date: "2024",
    bullets: [
      "Parsed resumes with spaCy NLP to extract skills, experience, and gaps.",
      "Generated keyword-match scores against job descriptions in real time.",
    ],
    repo: REPO,
    badge: { label: "[AI TOOL]", color: "#ffaa00" },
  },
  {
    name: "NANOGPT",
    sub: "LLM from Scratch",
    stack: "Python · PyTorch · Transformer Architecture",
    date: "2025",
    bullets: [
      "Implemented decoder-only Transformer with multi-head self-attention.",
      "Trained character-level language model end-to-end on custom corpus.",
    ],
    repo: REPO,
    badge: { label: "[RESEARCH]", color: "#aa88ff" },
  },
];

const TypingBullet = ({ text }: { text: string }) => {
  const [n, setN] = useState(0);
  useEffect(() => {
    if (n >= text.length) return;
    const id = setTimeout(() => setN((v) => v + 1), 12);
    return () => clearTimeout(id);
  }, [n, text]);
  return (
    <span>
      {text.slice(0, n)}
      {n < text.length && <span className="cursor-blink-inline" />}
    </span>
  );
};

const ProjectCard = ({ p }: { p: Project }) => {
  const [open, setOpen] = useState(false);
  return (
    <article className="term-card p-4 sm:p-5 text-sm md:text-base">
      <button
        onClick={() => setOpen((o) => !o)}
        className="w-full text-left"
        aria-expanded={open}
      >
        <div className="flex items-start justify-between gap-2 mb-2">
          <div className="min-w-0">
            <div className="text-terminal-bright term-glow-strong text-base md:text-lg font-bold truncate">
              {open ? "▼" : "▶"} {p.name}
            </div>
            <div className="text-terminal-green/90 text-xs md:text-sm">{p.sub}</div>
          </div>
          <span
            className="text-[10px] md:text-xs whitespace-nowrap px-1.5 py-0.5 border"
            style={{
              color: p.badge.color,
              borderColor: `${p.badge.color}66`,
              textShadow: `0 0 6px ${p.badge.color}99`,
            }}
          >
            {p.badge.label}
          </span>
        </div>
        <div className="text-terminal-dim text-xs md:text-sm break-words">
          [stack]: {p.stack}
        </div>
        <div className="text-terminal-dim text-[10px] md:text-xs mt-1">
          [date]: {p.date}
        </div>
      </button>

      <div
        className="grid transition-[grid-template-rows] duration-300 ease-out"
        style={{ gridTemplateRows: open ? "1fr" : "0fr" }}
      >
        <div className="overflow-hidden">
          <div className="pt-3 mt-3 border-t border-terminal-green/20">
            <div className="text-terminal-dim text-xs mb-1">
              $ cat {p.name.toLowerCase().replace(/\s+/g, "_")}.log
            </div>
            <ul className="space-y-1">
              {open &&
                p.bullets.map((b, i) => (
                  <li key={i} className="flex gap-2">
                    <span className="text-terminal-bright shrink-0">▶</span>
                    <TypingBullet text={b} />
                  </li>
                ))}
            </ul>
          </div>
        </div>
      </div>

      <div className="mt-3 flex flex-wrap gap-2">
        <a
          href={p.repo}
          target="_blank"
          rel="noreferrer"
          onClick={(e) => e.stopPropagation()}
          className="term-btn text-xs"
        >
          $ ./run
        </a>
        <button
          onClick={(e) => {
            e.stopPropagation();
            setOpen((o) => !o);
          }}
          className="term-btn text-xs"
        >
          {open ? "$ collapse" : "$ expand"}
        </button>
      </div>
    </article>
  );
};

export const Projects = () => {
  return (
    <section id="projects" className="py-12 px-4">
      <div className="max-w-5xl mx-auto">
        <SectionHeader
          label={`[PROJECTS]: ${projects.length} ENTRIES FOUND ░░░░░░░░░░ LOADED`}
        />
        <div className="grid gap-5 md:grid-cols-2">
          {projects.map((p) => (
            <ProjectCard key={p.name} p={p} />
          ))}
        </div>
      </div>
    </section>
  );
};