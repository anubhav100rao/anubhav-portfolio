import { skills } from "@/lib/data";
import FadeIn from "@/components/FadeIn";

const categoryColors: Record<string, string> = {
  Languages: "#3b82f6",
  "Backend & Systems": "#10b981",
  "AI & ML": "#f59e0b",
  "Data & Infrastructure": "#8b5cf6",
  Frontend: "#ec4899",
  "Core CS": "#06b6d4",
};

export default function Skills() {
  return (
    <section id="skills" className="py-24 px-6 bg-zinc-900/30">
      <div className="max-w-5xl mx-auto">
        <SectionLabel>Skills</SectionLabel>
        <h2 className="text-3xl md:text-4xl font-bold text-zinc-100 mt-3 mb-12">
          Technologies & Tools
        </h2>

        <div className="grid md:grid-cols-2 gap-6">
          {Object.entries(skills).map(([category, items], i) => {
            const color = categoryColors[category] ?? "#3b82f6";
            return (
              <FadeIn key={category} delay={i * 0.06}>
              <div
                className="bg-zinc-900 border border-zinc-800 rounded-2xl p-6 hover:border-zinc-700 transition-colors"
              >
                <div className="flex items-center gap-2.5 mb-4">
                  <div
                    className="w-2 h-2 rounded-full"
                    style={{ backgroundColor: color }}
                  />
                  <h3 className="text-zinc-200 font-semibold text-sm">{category}</h3>
                </div>
                <div className="flex flex-wrap gap-2">
                  {items.map((skill) => (
                    <span
                      key={skill}
                      className="text-xs font-mono px-2.5 py-1.5 rounded-lg border transition-colors cursor-default"
                      style={{
                        color: color,
                        backgroundColor: color + "11",
                        borderColor: color + "33",
                      }}
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
              </FadeIn>
            );
          })}
        </div>
      </div>
    </section>
  );
}

function SectionLabel({ children }: { children: string }) {
  return (
    <div className="flex items-center gap-3">
      <span className="text-blue-500 text-sm font-mono">{"// "}</span>
      <span className="text-blue-400 text-sm font-semibold uppercase tracking-widest">
        {children}
      </span>
    </div>
  );
}
