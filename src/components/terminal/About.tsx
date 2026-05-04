import { SectionHeader } from "./SectionHeader";

const lines = [
  "Full Stack Developer with MCA from RCCIIT.",
  "Skilled in RESTful API design, responsive UI engineering,",
  "and scalable backend architecture.",
  "Always shipping. Always learning.",
];

export const About = () => {
  return (
    <section id="about" className="py-12 px-4">
      <div className="max-w-5xl mx-auto">
        <SectionHeader label="[SYSTEM]: LOADING BIO..." />
        <div className="term-card p-5 md:p-6 space-y-1 text-sm md:text-base">
          <div className="text-terminal-dim">$ cat about.md</div>
          {lines.map((l, i) => (
            <div key={i}>
              <span className="text-terminal-dim">[{String(i + 1).padStart(2, "0")}]</span>{" "}
              {l}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};