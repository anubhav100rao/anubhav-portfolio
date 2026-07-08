import { education } from "@/lib/data";
import FadeIn from "@/components/FadeIn";
import CountUp from "@/components/CountUp";
import SectionHeader from "@/components/SectionHeader";

export default function About() {
  return (
    <section id="about" className="py-24 px-6">
      <div className="max-w-5xl mx-auto">
        <SectionHeader label="About" title="Who I" accent="Am" />

        <div className="grid md:grid-cols-5 gap-12">
          {/* Bio */}
          <FadeIn delay={0.1} className="md:col-span-3">
          <div className="space-y-4 text-zinc-500 dark:text-zinc-400 leading-relaxed text-[15px]">
            <p>
              I&apos;m a software engineer who thrives at the intersection of{" "}
              <span className="text-zinc-800 dark:text-zinc-200 font-medium">systems engineering</span> and{" "}
              <span className="text-zinc-800 dark:text-zinc-200 font-medium">applied AI</span>. Currently at{" "}
              <span className="text-blue-500 dark:text-blue-400 font-medium">Coinbase</span>, I&apos;m working on
              expanding crypto derivatives markets to the UK and EU while building LLM-powered
              internal platforms.
            </p>
            <p>
              Before Coinbase, I worked at{" "}
              <span className="text-zinc-800 dark:text-zinc-200 font-medium">D.E. Shaw & Co.</span> on financial
              time-series infrastructure serving 13M+ tickers and RAG-based semantic search
              over instruments. I also interned at{" "}
              <span className="text-zinc-800 dark:text-zinc-200 font-medium">Rubrik</span> (cloud storage
              infrastructure) and{" "}
              <span className="text-zinc-800 dark:text-zinc-200 font-medium">Razorpay</span> (fintech/payroll).
            </p>
            <p>
              Outside of work, I build things for fun — a transactional database engine with
              LSM Trees, a Linux file system simulator, and a real-time Raft consensus
              visualizer. I also review problems for{" "}
              <span className="text-zinc-800 dark:text-zinc-200 font-medium">LeetCode competitions</span> for 5M+
              programmers.
            </p>
            <p>
              I graduated from{" "}
              <span className="text-zinc-800 dark:text-zinc-200 font-medium">
                IIIT Allahabad
              </span>{" "}
              with a B.Tech in ECE (GPA: 8.65/10).
            </p>
          </div>
          </FadeIn>

          {/* Education */}
          <FadeIn delay={0.2} className="md:col-span-2">
          <div>
            <h3 className="text-sm font-semibold text-zinc-500 dark:text-zinc-400 uppercase tracking-widest mb-5">
              Education
            </h3>
            <div className="space-y-5">
              {education.map((edu) => (
                <div
                  key={edu.institution}
                  className="bg-zinc-100 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl p-4 hover:border-zinc-300 dark:hover:border-zinc-700 transition-colors"
                >
                  <p className="text-zinc-900 dark:text-zinc-100 font-medium text-sm leading-snug mb-1">
                    {edu.institution}
                  </p>
                  <p className="text-zinc-500 dark:text-zinc-400 text-xs mb-2">{edu.degree}</p>
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-zinc-500">{edu.period}</span>
                    <span className="text-xs font-semibold text-blue-500 dark:text-blue-400">{edu.gpa}</span>
                  </div>
                </div>
              ))}
            </div>

            {/* Quick facts */}
            <div className="mt-6 grid grid-cols-2 gap-3">
              {[
                { label: "Companies", count: 4, suffix: "+" },
                { label: "Projects", count: 10, suffix: "+" },
                { label: "Data Handled", count: 12, suffix: "TB+" },
                { label: "LeetCode", value: "Contest Tester" },
              ].map((stat) => (
                <div
                  key={stat.label}
                  className="bg-zinc-100 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl p-3 text-center hover:border-blue-300 dark:hover:border-blue-800 hover:-translate-y-0.5 transition-all duration-300"
                >
                  <p className="text-blue-500 dark:text-blue-400 font-bold text-lg">
                    {stat.count !== undefined ? (
                      <CountUp to={stat.count} suffix={stat.suffix} />
                    ) : (
                      stat.value
                    )}
                  </p>
                  <p className="text-zinc-500 text-xs mt-0.5">{stat.label}</p>
                </div>
              ))}
            </div>
          </div>
          </FadeIn>
        </div>
      </div>
    </section>
  );
}
