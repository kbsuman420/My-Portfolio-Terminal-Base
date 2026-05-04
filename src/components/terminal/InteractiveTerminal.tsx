import { useEffect, useRef, useState, KeyboardEvent } from "react";
import { MatrixRain } from "./MatrixRain";

type Line = { type: "in" | "out" | "err" | "ok" | "dim"; text: string };

const HELP_LINES: Line[] = [
  { type: "out", text: "Available commands:" },
  { type: "dim", text: "  help            — list all available commands" },
  { type: "dim", text: "  whoami          — print identity" },
  { type: "dim", text: "  skills          — full tech stack" },
  { type: "dim", text: "  projects        — list all projects" },
  { type: "dim", text: "  contact         — email, linkedin, github" },
  { type: "dim", text: "  cat resume      — text summary of resume" },
  { type: "dim", text: "  open github     — open github profile" },
  { type: "dim", text: "  open linkedin   — open linkedin profile" },
  { type: "dim", text: "  sudo hire me    — ?" },
  { type: "dim", text: "  clear           — clear terminal history" },
  { type: "dim", text: "  ──────────────── extras ────────────────" },
  { type: "dim", text: "  about · experience · education · certs · date · ls · echo · goto <id> · hack · matrix" },
];

const SKILLS: Record<string, string[]> = {
  frontend: ["React.js", "JavaScript ES6+", "HTML5", "CSS3", "Tailwind CSS", "Redux", "React Router", "Context API", "React Hooks"],
  backend: ["Node.js", "Express.js", "REST API Design", "JWT Auth", "MongoDB", "MySQL"],
  devops: ["Git", "GitHub", "Docker", "VS Code", "Postman", "npm/yarn"],
  languages: ["Java", "C", "DSA fundamentals"],
};

const PROJECTS = [
  { n: "PIZZA X", s: "React · Redux · Node.js · REST API", d: "Jan 2026 – Feb 2026" },
  { n: "MEET", s: "React · Django · WebRTC · LiveKit · Docker", d: "2025" },
  { n: "CRYPTOCAST", s: "Python · LSTM · GRU · CNN · scikit-learn", d: "2024" },
  { n: "SMARTCV", s: "Python · NLP · Streamlit · MySQL · spaCy", d: "2024" },
  { n: "NANOGPT", s: "Python · PyTorch · Transformer Architecture", d: "2025" },
];

const SECTION_IDS = ["home", "about", "skills", "projects", "experience", "education", "contact"];

const HACK_LINES = [
  "$ ssh root@mainframe.gov",
  "Connecting to 192.168.13.37 ... [OK]",
  "Bypassing firewall ████████████ 100%",
  "Decrypting AES-256 ▓▓▓▓▓▓▓▓░░ 80%",
  "Injecting payload .....",
  "for (let i=0;i<∞;i++) { exploit(); }",
  "Accessing classified files...",
  "> nuclear_codes.txt [LOCKED]",
  "Brute forcing... 0xDEADBEEF",
  "ROOT ACCESS GRANTED",
  "...",
  "just kidding :)",
];

const WELCOME = "Welcome to Suman's terminal. Type 'help' to get started.";

export const InteractiveTerminal = () => {
  const [open, setOpen] = useState(true);
  const [history, setHistory] = useState<Line[]>([]);
  const [welcome, setWelcome] = useState("");
  const [welcomeDone, setWelcomeDone] = useState(false);
  const [input, setInput] = useState("");
  const [past, setPast] = useState<string[]>([]);
  const [pastIdx, setPastIdx] = useState<number>(-1);
  const [busy, setBusy] = useState(false);
  const [matrixFs, setMatrixFs] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);

  // typewriter welcome banner — runs each time terminal is (re)opened
  useEffect(() => {
    if (!open) return;
    setWelcome("");
    setWelcomeDone(false);
    let i = 0;
    const id = setInterval(() => {
      i++;
      setWelcome(WELCOME.slice(0, i));
      if (i >= WELCOME.length) {
        clearInterval(id);
        setWelcomeDone(true);
      }
    }, 28);
    return () => clearInterval(id);
  }, [open]);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [history, open]);

  const print = (lines: Line[]) => setHistory((h) => [...h, ...lines]);

  const runHack = async () => {
    setBusy(true);
    for (const line of HACK_LINES) {
      await new Promise((r) => setTimeout(r, 280));
      print([{ type: line === "just kidding :)" ? "ok" : "out", text: line }]);
    }
    setBusy(false);
  };

  const runMatrix = () => {
    setMatrixFs(true);
    print([{ type: "ok", text: "▶ entering the matrix... (5s)" }]);
    setTimeout(() => setMatrixFs(false), 5000);
  };

  const runHireMe = () => {
    print([
      { type: "ok", text: "▶ ./pitch.sh --candidate=suman_kundu" },
      { type: "out", text: "──────────────────────────────────────────" },
      { type: "out", text: "  Full Stack Developer — React · Node · MongoDB" },
      { type: "dim", text: "  ▸ MCA, RCCIIT — CGPA 7.51" },
      { type: "dim", text: "  ▸ Shipped production React UIs @ Onologics" },
      { type: "dim", text: "  ▸ Built 5+ end-to-end projects (PizzaX, Meet, NanoGPT, ...)" },
      { type: "dim", text: "  ▸ Comfortable across the stack: REST, JWT, Docker, SQL/NoSQL" },
      { type: "dim", text: "  ▸ Fast learner, ships clean code, writes tests when it matters" },
      { type: "out", text: "──────────────────────────────────────────" },
      { type: "ok",  text: "  → email: kundu.1suman@gmail.com" },
      { type: "ok",  text: "  → STATUS: AVAILABLE FOR HIRE ✓" },
    ]);
  };

  const run = (raw: string) => {
    const cmd = raw.trim();
    print([{ type: "in", text: `guest@suman:~$ ${cmd}` }]);
    if (!cmd) return;
    const lower = cmd.toLowerCase();

    // multi-word commands
    if (lower === "sudo hire me") {
      print([
        { type: "err", text: "[sudo] password for guest: ********" },
        { type: "ok",  text: "✔ authentication bypassed (you're hired in spirit)" },
      ]);
      runHireMe();
      return;
    }
    if (lower === "hire me" || lower === "hireme") {
      runHireMe();
      return;
    }
    if (lower === "cat resume" || lower === "cat resume.txt") {
      print([
        { type: "ok",  text: "▶ cat resume.txt" },
        { type: "out", text: "──────────────────────────────────────────────" },
        { type: "out", text: "  SUMAN KUNDU — Full Stack Developer" },
        { type: "out", text: "  Kolkata, India · kundu.1suman@gmail.com · +91 99078 18420" },
        { type: "dim", text: "──────────────────────────────────────────────" },
        { type: "ok",  text: "  EDUCATION" },
        { type: "out", text: "    MCA, RCCIIT (2023–2025) — CGPA 7.51" },
        { type: "out", text: "    B.Sc. CS, Bankura Sammilani College — CGPA 8.33" },
        { type: "ok",  text: "  EXPERIENCE" },
        { type: "out", text: "    Junior Web Developer (Intern), Onologics Technologies" },
        { type: "dim", text: "    Aug 2025 – Nov 2025 · React UIs, REST APIs, code review" },
        { type: "ok",  text: "  STACK" },
        { type: "out", text: "    React · Node.js · Express · MongoDB · MySQL · Docker · JWT" },
        { type: "ok",  text: "  PROJECTS" },
        { type: "out", text: "    PizzaX · Meet · CryptoCast · SmartCV · NanoGPT" },
        { type: "dim", text: "──────────────────────────────────────────────" },
      ]);
      return;
    }
    if (lower === "open github") {
      window.open("https://github.com/kbsuman420", "_blank", "noopener");
      print([{ type: "ok", text: "→ opening github.com/kbsuman420 in new tab" }]);
      return;
    }
    if (lower === "open linkedin") {
      window.open("https://linkedin.com/in/suman-kundu-926803294", "_blank", "noopener");
      print([{ type: "ok", text: "→ opening linkedin.com/in/suman-kundu-926803294 in new tab" }]);
      return;
    }

    const [base, ...args] = cmd.split(/\s+/);
    switch (base.toLowerCase()) {
      case "help":
        print(HELP_LINES);
        break;
      case "about":
        print([
          { type: "out", text: "Suman Kundu — Full Stack Developer" },
          { type: "out", text: "MCA from RCCIIT. RESTful APIs, responsive UIs, scalable backends." },
        ]);
        break;
      case "skills": {
        const out: Line[] = [];
        Object.entries(SKILLS).forEach(([k, v]) => {
          out.push({ type: "ok", text: `▶ ${k}` });
          out.push({ type: "dim", text: `  ${v.join(", ")}` });
        });
        print(out);
        break;
      }
      case "projects":
        print(
          PROJECTS.map((p) => ({
            type: "out" as const,
            text: `▶ ${p.n.padEnd(11)} ${p.s}  [${p.d}]`,
          }))
        );
        break;
      case "experience":
        print([
          { type: "ok", text: "▶ Junior Web Developer (Internship) — Onologics Technologies" },
          { type: "dim", text: "  Aug 2025 – Nov 2025" },
          { type: "out", text: "  [INFO] Built responsive React UIs for client dashboards." },
          { type: "out", text: "  [INFO] Integrated REST APIs and optimized data flow." },
          { type: "out", text: "  [INFO] Reviewed PRs and improved code quality." },
        ]);
        break;
      case "education":
        print([
          { type: "out", text: "MCA       | RCCIIT                      | CGPA 7.51 | 2023–2025" },
          { type: "out", text: "B.Sc. CS  | Bankura Sammilani College   | CGPA 8.33 | 2020–2023" },
        ]);
        break;
      case "certs":
      case "certifications":
        print([{ type: "out", text: "▶ Decode Java with DSA — Jun 2024 [VERIFIED ✓]" }]);
        break;
      case "contact":
        print([
          { type: "out", text: "email   : kundu.1suman@gmail.com" },
          { type: "out", text: "phone   : +91 99078 18420" },
          { type: "out", text: "linkedin: linkedin.com/in/suman-kundu-926803294" },
          { type: "out", text: "github  : github.com/kbsuman420" },
          { type: "out", text: "location: Kolkata, India" },
        ]);
        break;
      case "whoami":
        print([{ type: "out", text: "Suman Kundu — Full Stack Developer" }]);
        break;
      case "date":
        print([{ type: "out", text: new Date().toString() }]);
        break;
      case "goto": {
        const target = args[0]?.toLowerCase();
        if (!target || !SECTION_IDS.includes(target)) {
          print([{ type: "err", text: `goto: unknown section. try: ${SECTION_IDS.join(", ")}` }]);
          break;
        }
        document.getElementById(target)?.scrollIntoView({ behavior: "smooth" });
        print([{ type: "ok", text: `→ scrolling to #${target}` }]);
        break;
      }
      case "clear":
      case "cls":
        setHistory([]);
        return;
      case "echo":
        print([{ type: "out", text: args.join(" ") }]);
        break;
      case "ls":
        print([{ type: "out", text: SECTION_IDS.join("  ") }]);
        break;
      case "hack":
        runHack();
        break;
      case "matrix":
        runMatrix();
        break;
      case "exit":
        setOpen(false);
        break;
      default:
        print([
          { type: "err", text: `command not found: ${cmd}. Try 'help'.` },
        ]);
    }
  };

  const onKey = (e: KeyboardEvent<HTMLInputElement>) => {
    if (busy || !welcomeDone) return;
    if (e.key === "Enter") {
      run(input);
      if (input.trim()) {
        setPast((p) => [...p, input]);
      }
      setPastIdx(-1);
      setInput("");
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      if (past.length === 0) return;
      const next = pastIdx === -1 ? past.length - 1 : Math.max(0, pastIdx - 1);
      setPastIdx(next);
      setInput(past[next]);
    } else if (e.key === "ArrowDown") {
      e.preventDefault();
      if (pastIdx === -1) return;
      const next = pastIdx + 1;
      if (next >= past.length) {
        setPastIdx(-1);
        setInput("");
      } else {
        setPastIdx(next);
        setInput(past[next]);
      }
    } else if (e.key === "l" && (e.ctrlKey || e.metaKey)) {
      e.preventDefault();
      setHistory([]);
    }
  };

  const colorFor = (t: Line["type"]) => {
    switch (t) {
      case "in":
        return "text-terminal-bright term-glow-strong";
      case "ok":
        return "text-terminal-bright";
      case "err":
        return "text-red-400";
      case "dim":
        return "text-terminal-dim";
      default:
        return "text-terminal-green";
    }
  };

  if (!open) {
    return (
      <button
        onClick={() => setOpen(true)}
        className="fixed bottom-4 right-4 z-[60] term-btn text-xs"
        aria-label="Open terminal"
      >
        $ open_terminal
      </button>
    );
  }

  return (
    <>
    {matrixFs && (
      <div className="fixed inset-0 z-[180] bg-black">
        <MatrixRain opacity={0.9} zIndex={181} />
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none" style={{ zIndex: 182 }}>
          <div className="text-terminal-bright term-glow-strong text-2xl md:text-4xl">
            WAKE UP, NEO...
          </div>
        </div>
      </div>
    )}
    <div className="fixed bottom-0 left-0 right-0 z-[60] border-t border-terminal-green/40 bg-black/95 backdrop-blur-sm">
      <div className="max-w-5xl mx-auto">
        {/* title bar */}
        <div className="flex items-center justify-between px-4 py-1.5 border-b border-terminal-green/20 text-xs">
          <div className="flex items-center gap-2 text-terminal-dim">
            <span className="inline-block w-2 h-2 rounded-full bg-terminal-green animate-pulse" />
            <span>/dev/tty1 — guest@suman</span>
          </div>
          <div className="flex items-center gap-3 text-terminal-dim">
            <span className="hidden sm:inline">type 'help'</span>
            <button
              onClick={() => setHistory([])}
              className="hover:text-terminal-bright"
              aria-label="Clear"
            >
              [clear]
            </button>
            <button
              onClick={() => setOpen(false)}
              className="hover:text-terminal-bright"
              aria-label="Close"
            >
              [×]
            </button>
          </div>
        </div>

        {/* output */}
        <div
          ref={scrollRef}
          onClick={() => inputRef.current?.focus()}
          className="px-4 py-2 h-40 md:h-48 overflow-y-auto text-xs md:text-sm space-y-0.5 cursor-text"
        >
          {(welcome || !welcomeDone) && (
            <div className="text-terminal-bright term-glow whitespace-pre-wrap break-words">
              {welcome}
              {!welcomeDone && <span className="cursor-blink-inline" />}
            </div>
          )}
          {history.map((l, i) => (
            <div key={i} className={`whitespace-pre-wrap break-words ${colorFor(l.type)}`}>
              {l.text}
            </div>
          ))}

          {/* input line */}
          <div className="flex items-center gap-2 pt-1">
            <span className="text-terminal-dim shrink-0">guest@suman:~$</span>
            <input
              ref={inputRef}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={onKey}
              autoFocus
              spellCheck={false}
              autoComplete="off"
              className="flex-1 bg-transparent border-0 outline-none text-terminal-bright term-glow caret-terminal-green"
              aria-label="Terminal input"
            />
          </div>
        </div>
      </div>
    </div>
    </>
  );
};