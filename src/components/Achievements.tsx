import { achievements } from "@/lib/data";
import FadeIn from "@/components/FadeIn";

export default function Achievements() {
    return (
        <section id="achievements" className="py-24 px-6 bg-zinc-950">
            <div className="max-w-5xl mx-auto">
                <SectionLabel>Achievements</SectionLabel>
                <h2 className="text-3xl md:text-4xl font-bold text-zinc-100 mt-3 mb-12">
                    Coding Profiles & Leadership
                </h2>

                <div className="grid md:grid-cols-2 gap-6">
                    {achievements.map((item, i) => (
                        <FadeIn key={item.platform} delay={i * 0.1}>
                            <div className="group bg-zinc-900 border border-zinc-800 rounded-2xl p-6 hover:border-zinc-700 transition-colors h-full flex flex-col relative overflow-hidden">
                                <div
                                    className="absolute top-0 right-0 w-32 h-32 opacity-10 group-hover:opacity-20 transition-opacity blur-3xl pointer-events-none rounded-full"
                                    style={{ backgroundColor: item.color }}
                                />

                                <div className="flex items-center justify-between mb-4">
                                    <div className="flex items-center gap-3">
                                        <div
                                            className="w-2.5 h-2.5 rounded-full"
                                            style={{ backgroundColor: item.color, boxShadow: `0 0 10px ${item.color}` }}
                                        />
                                        <h3 className="text-xl font-bold text-zinc-100">{item.platform}</h3>
                                    </div>
                                    {item.link && (
                                        <a
                                            href={item.link}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="text-zinc-400 hover:text-zinc-200 transition-colors relative z-10"
                                            aria-label={`Visit ${item.platform} profile`}
                                        >
                                            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                                <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path><polyline points="15 3 21 3 21 9"></polyline><line x1="10" y1="14" x2="21" y2="3"></line>
                                            </svg>
                                        </a>
                                    )}
                                </div>

                                <div
                                    className="text-sm font-mono mb-4 inline-flex items-center justify-start self-start px-2 py-1 rounded"
                                    style={{ backgroundColor: `${item.color}15`, color: item.color, border: `1px solid ${item.color}30` }}
                                >
                                    {item.rating}
                                </div>

                                <p className="text-zinc-400 text-sm leading-relaxed mt-auto">
                                    {item.description}
                                </p>
                            </div>
                        </FadeIn>
                    ))}
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
