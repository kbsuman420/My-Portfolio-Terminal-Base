import { SectionHeader } from "./SectionHeader";

const logs = [
  "Built and shipped responsive React UIs for client-facing dashboards.",
  "Integrated REST APIs and optimized data flow across feature modules.",
  "Collaborated in agile sprints; reviewed PRs and improved code quality.",
];

export const Experience = () => {
  return (
    <section id="experience" className="py-12 px-4">
      <div className="max-w-5xl mx-auto">
        <SectionHeader label="[LOG]: WORK HISTORY" />
        <div className="term-card p-5 md:p-6 text-sm md:text-base">
          <div className="flex flex-wrap items-baseline justify-between gap-2 mb-3">
            <div>
              <span className="text-terminal-bright term-glow-strong">
                &gt; Junior Web Developer
              </span>{" "}
              <span className="text-terminal-dim">(Internship)</span>
              <div className="text-terminal-green/90">
                Onologics Technologies
              </div>
            </div>
            <span className="text-terminal-dim text-xs">
              Aug 2025 – Nov 2025
            </span>
          </div>
          <div className="space-y-1">
            {logs.map((l, i) => (
              <div key={i}>
                <span className="text-terminal-dim">[INFO]</span>{" "}
                <span className="text-terminal-bright">▶</span> {l}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};