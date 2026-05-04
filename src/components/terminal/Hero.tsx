import { useRef, useState } from "react";
import { Typewriter } from "./Typewriter";
import { StatusLine } from "./StatusLine";
import { HeroMatrixGreeter } from "./HeroMatrixGreeter";

const ASCII = `
 ███████╗██╗   ██╗███╗   ███╗ █████╗ ███╗   ██╗    ██╗  ██╗██╗   ██╗███╗   ██╗██████╗ ██╗   ██╗
 ██╔════╝██║   ██║████╗ ████║██╔══██╗████╗  ██║    ██║ ██╔╝██║   ██║████╗  ██║██╔══██╗██║   ██║
 ███████╗██║   ██║██╔████╔██║███████║██╔██╗ ██║    █████╔╝ ██║   ██║██╔██╗ ██║██║  ██║██║   ██║
 ╚════██║██║   ██║██║╚██╔╝██║██╔══██║██║╚██╗██║    ██╔═██╗ ██║   ██║██║╚██╗██║██║  ██║██║   ██║
 ███████║╚██████╔╝██║ ╚═╝ ██║██║  ██║██║ ╚████║    ██║  ██╗╚██████╔╝██║ ╚████║██████╔╝╚██████╔╝
 ╚══════╝ ╚═════╝ ╚═╝     ╚═╝╚═╝  ╚═╝╚═╝  ╚═══╝    ╚═╝  ╚═╝ ╚═════╝ ╚═╝  ╚═══╝╚═════╝  ╚═════╝
`;

export const Hero = () => {
  const [copied, setCopied] = useState(false);
  const [tagDone, setTagDone] = useState(false);
  const clicks = useRef<number[]>([]);

  const onNameClick = () => {
    const now = Date.now();
    clicks.current = [...clicks.current, now].filter((t) => now - t < 800);
    if (clicks.current.length >= 3) {
      clicks.current = [];
      const root = document.documentElement;
      root.classList.add("screen-shake", "invert-flash");
      setTimeout(() => {
        root.classList.remove("screen-shake", "invert-flash");
      }, 300);
    }
  };

  const copyEmail = async () => {
    await navigator.clipboard.writeText("kundu.1suman@gmail.com");
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section id="home" className="pt-10 pb-16 px-4">
      <div className="max-w-5xl mx-auto">
        <pre
          onClick={onNameClick}
          className="leading-tight text-terminal-bright term-glow-strong overflow-hidden whitespace-pre name-pulse cursor-pointer select-none max-w-full"
          style={{ fontSize: "clamp(4px, 1.35vw, 13px)" }}
        >
{ASCII}
        </pre>

        <div className="mt-6 text-base md:text-lg">
          <span className="text-terminal-dim">&gt; </span>
          <Typewriter
            text="Full Stack Developer // React · Node.js · MongoDB"
            speed={35}
            delay={300}
            cursor
            className="text-terminal-green"
            onDone={() => setTagDone(true)}
          />
        </div>

        {tagDone && <StatusLine />}

        <div className="mt-8 term-card p-4 md:p-6 text-sm md:text-base space-y-1 break-words">
          <div>
            <span className="text-terminal-dim">$ whoami</span>
          </div>
          <div>Suman Kundu — Full Stack Developer</div>
          <div className="mt-3">
            <span className="text-terminal-dim">$ cat contact.txt</span>
          </div>
          <div>
            <span className="text-terminal-dim">location:</span> Kolkata, India
          </div>
          <div className="flex gap-2 min-w-0">
            <span className="text-terminal-dim shrink-0">phone   :</span>
            <a
              href="tel:+919907818420"
              className="underline decoration-dotted hover:text-terminal-bright truncate"
              title="+91 99078 18420"
            >
              +91 99078 18420
            </a>
          </div>
          <div className="flex gap-2 min-w-0">
            <span className="text-terminal-dim shrink-0">email   :</span>
            <a
              href="mailto:kundu.1suman@gmail.com"
              className="underline decoration-dotted hover:text-terminal-bright truncate"
              title="kundu.1suman@gmail.com"
            >
              kundu.1suman@gmail.com
            </a>
          </div>
          <div className="flex gap-2 min-w-0">
            <span className="text-terminal-dim shrink-0">linkedin:</span>
            <a
              href="https://linkedin.com/in/suman-kundu-926803294"
              target="_blank"
              rel="noreferrer"
              className="underline decoration-dotted hover:text-terminal-bright truncate"
              title="linkedin.com/in/suman-kundu-926803294"
            >
              linkedin.com/in/suman-kundu-926803294
            </a>
          </div>
          <div className="flex gap-2 min-w-0">
            <span className="text-terminal-dim shrink-0">github  :</span>
            <a
              href="https://github.com/kbsuman420"
              target="_blank"
              rel="noreferrer"
              className="underline decoration-dotted hover:text-terminal-bright truncate"
              title="github.com/kbsuman420"
            >
              github.com/kbsuman420
            </a>
          </div>

          <div className="mt-4 flex flex-col xs:flex-row flex-wrap gap-3">
            <button onClick={copyEmail} className="term-btn text-sm w-full xs:w-auto">
              {copied ? "COPIED TO CLIPBOARD ✓" : "$ copy_email"}
            </button>
            <a
              href="https://github.com/kbsuman420"
              target="_blank"
              rel="noreferrer"
              className="term-btn text-sm w-full xs:w-auto text-center"
            >
              $ open_github
            </a>
          </div>
        </div>

        <HeroMatrixGreeter />

        <div className="mt-6 text-base">
          <span className="text-terminal-dim">guest@suman:~$</span>
          <span className="cursor-blink-inline" />
        </div>
      </div>
    </section>
  );
};