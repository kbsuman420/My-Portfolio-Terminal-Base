import { KeyboardEvent, useRef, useState } from "react";

const GREETINGS: Record<string, string> = {
  hello: "Hello, friend. Welcome to my little corner of the matrix.",
  hi: "Hi there 👋 — thanks for stopping by!",
  hey: "Hey! Glad you found this page.",
  yo: "Yo! Hope you're having a good one.",
  sup: "Not much — just shipping code. You?",
  hola: "¡Hola! Bienvenido a mi portfolio.",
  namaste: "🙏 Namaste! Thanks for visiting.",
  bonjour: "Bonjour! Merci de votre visite.",
  greetings: "Greetings, traveler. The terminal awaits your command.",
  "good morning": "Good morning ☀ — coffee first, code second.",
  "good evening": "Good evening 🌙 — perfect time to debug.",
};

const greetingFor = (raw: string) => {
  const t = raw.trim().toLowerCase();
  if (!t) return null;
  if (GREETINGS[t]) return GREETINGS[t];
  for (const k of Object.keys(GREETINGS)) {
    if (t.includes(k)) return GREETINGS[k];
  }
  return `> echo "${raw}" — anything you type here, I greet back. Try 'hello'.`;
};

export const HeroMatrixGreeter = () => {
  const [input, setInput] = useState("");
  const [lines, setLines] = useState<{ q: string; a: string }[]>([]);
  const inputRef = useRef<HTMLInputElement>(null);

  const onKey = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key !== "Enter") return;
    const v = input;
    if (!v.trim()) return;
    const reply = greetingFor(v) ?? "";
    setLines((l) => [...l.slice(-5), { q: v, a: reply }]);
    setInput("");
  };

  return (
    <div
      className="mt-6 term-card p-4 text-sm md:text-base"
      onClick={() => inputRef.current?.focus()}
    >
      <div className="text-terminal-dim text-xs mb-2">
        // greet.sh — say hi to Suman, get a reply
      </div>
      {lines.map((l, i) => (
        <div key={i} className="space-y-0.5 mb-2">
          <div>
            <span className="text-terminal-dim">visitor@hero:~$ </span>
            <span className="text-terminal-bright">{l.q}</span>
          </div>
          <div className="text-terminal-green pl-2">↳ {l.a}</div>
        </div>
      ))}
      <div className="flex items-center gap-2">
        <span className="text-terminal-dim shrink-0">visitor@hero:~$</span>
        <input
          ref={inputRef}
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={onKey}
          placeholder="say hello..."
          spellCheck={false}
          autoComplete="off"
          className="flex-1 min-w-0 bg-transparent border-0 outline-none text-terminal-bright term-glow caret-terminal-green placeholder:text-terminal-dim/60"
          aria-label="Greet input"
        />
      </div>
    </div>
  );
};