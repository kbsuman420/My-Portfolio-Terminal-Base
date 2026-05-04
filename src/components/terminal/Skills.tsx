import { SectionHeader } from "./SectionHeader";

const groups = [
  {
    label: "frontend",
    items: [
      "React.js",
      "JavaScript ES6+",
      "HTML5",
      "CSS3",
      "Tailwind CSS",
      "Redux",
      "React Router",
      "Context API",
      "React Hooks",
    ],
  },
  {
    label: "backend",
    items: [
      "Node.js",
      "Express.js",
      "REST API Design",
      "JWT Auth",
      "MongoDB",
      "MySQL",
    ],
  },
  {
    label: "devops",
    items: ["Git", "GitHub", "Docker", "VS Code", "Postman", "npm/yarn"],
  },
  {
    label: "languages",
    items: ["Java", "C", "DSA fundamentals"],
  },
];

export const Skills = () => {
  return (
    <section id="skills" className="py-12 px-4">
      <div className="max-w-5xl mx-auto">
        <SectionHeader label="[SCANNING]: TECH STACK..." />
        <div className="term-card p-5 md:p-6 space-y-5 text-sm md:text-base">
          <div className="text-terminal-dim">$ ls -la /skills</div>
          {groups.map((g) => (
            <div key={g.label}>
              <div className="mb-2">
                <span className="text-terminal-dim">drwxr-xr-x</span>{" "}
                <span className="text-terminal-bright">{g.label}/</span>
              </div>
              <div className="flex flex-wrap gap-2 pl-4">
                {g.items.map((s) => (
                  <span key={s} className="term-pill">
                    {s}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};