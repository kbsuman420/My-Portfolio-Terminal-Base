import { SectionHeader } from "./SectionHeader";

const rows = [
  {
    degree: "MCA",
    inst: "RCCIIT",
    cgpa: "7.51",
    years: "2023–2025",
  },
  {
    degree: "B.Sc. CS",
    inst: "Bankura Sammilani College",
    cgpa: "8.33",
    years: "2020–2023",
  },
];

export const EducationCerts = () => {
  return (
    <section id="education" className="py-12 px-4">
      <div className="max-w-5xl mx-auto grid gap-8 md:grid-cols-2">
        <div>
          <SectionHeader label="[DB]: ACADEMIC RECORDS" />
          <div className="term-card p-5 text-sm md:text-base">
            <div className="text-terminal-dim mb-2">
              SELECT * FROM education;
            </div>
            <div className="grid grid-cols-12 gap-2 text-xs md:text-sm border-b border-terminal-green/30 pb-1 mb-2 text-terminal-dim">
              <div className="col-span-3">degree</div>
              <div className="col-span-5">institution</div>
              <div className="col-span-2">cgpa</div>
              <div className="col-span-2">years</div>
            </div>
            {rows.map((r) => (
              <div
                key={r.degree}
                className="grid grid-cols-12 gap-2 text-xs md:text-sm py-1 border-b border-terminal-green/10"
              >
                <div className="col-span-3 text-terminal-bright">{r.degree}</div>
                <div className="col-span-5">{r.inst}</div>
                <div className="col-span-2">{r.cgpa}</div>
                <div className="col-span-2 text-terminal-dim">{r.years}</div>
              </div>
            ))}
            <div className="mt-2 text-terminal-dim text-xs">
              -- 2 rows returned
            </div>
          </div>
        </div>

        <div>
          <SectionHeader label="[CERT]: VERIFIED CREDENTIALS" />
          <div className="term-card p-5 text-sm md:text-base">
            <div className="text-terminal-dim mb-2">$ ls /certs</div>
            <div className="flex items-center justify-between gap-2 py-1">
              <div>
                <span className="text-terminal-bright">▶</span> Decode Java with
                DSA
              </div>
              <span className="text-terminal-dim text-xs">Jun 2024</span>
            </div>
            <div className="mt-3 text-terminal-dim text-xs">
              # signature: VERIFIED ✓
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};