import { experiences } from "@/lib/data";
import FadeIn from "@/components/FadeIn";

export default function Experience() {
  return (
    <section id="experience" className="py-24 px-6 bg-zinc-900/30">
      <div className="max-w-5xl mx-auto">
        <SectionLabel>Experience</SectionLabel>
        <h2 className="text-3xl md:text-4xl font-bold text-zinc-100 mt-3 mb-14">
          Where I&apos;ve Worked
        </h2>

        <div className="relative">
          {/* Timeline line */}
          <div className="absolute left-6 top-0 bottom-0 w-px bg-gradient-to-b from-blue-500/50 via-zinc-700 to-transparent hidden md:block" />

          <div className="space-y-10">
            {experiences.map((exp, i) => (
              <FadeIn key={i} delay={i * 0.08}>
              <div className="relative md:pl-16 group">
                {/* Dot */}
                <div
                  className="absolute left-4 top-5 w-4 h-4 rounded-full border-2 border-zinc-800 hidden md:block transition-all duration-300 group-hover:scale-125"
                  style={{ backgroundColor: exp.color, borderColor: exp.color }}
                />

                <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-6 hover:border-zinc-700 transition-all duration-200 hover:shadow-lg hover:shadow-black/30">
                  <div className="flex flex-wrap items-start justify-between gap-4 mb-5">
                    <div className="flex items-center gap-4">
                      {/* Company logo placeholder */}
                      <div
                        className="w-11 h-11 rounded-xl flex items-center justify-center text-white font-bold text-base flex-shrink-0"
                        style={{ backgroundColor: exp.color + "22", border: `1px solid ${exp.color}44` }}
                      >
                        <span style={{ color: exp.color }}>{exp.logo}</span>
                      </div>
                      <div>
                        <h3 className="text-zinc-100 font-semibold text-lg leading-tight">
                          {exp.role}
                        </h3>
                        <p className="text-zinc-400 text-sm mt-0.5">{exp.company}</p>
                      </div>
                    </div>
                    <div className="text-right flex-shrink-0">
                      <span className="text-xs font-medium text-zinc-400 bg-zinc-800 px-3 py-1 rounded-full">
                        {exp.period}
                      </span>
                      <p className="text-xs text-zinc-500 mt-1.5">{exp.location}</p>
                    </div>
                  </div>

                  <ul className="space-y-2.5">
                    {exp.highlights.map((h, j) => (
                      <li key={j} className="flex gap-3 text-zinc-400 text-sm leading-relaxed">
                        <span
                          className="mt-2 w-1.5 h-1.5 rounded-full flex-shrink-0"
                          style={{ backgroundColor: exp.color }}
                        />
                        {h}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
              </FadeIn>
            ))}
          </div>
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
