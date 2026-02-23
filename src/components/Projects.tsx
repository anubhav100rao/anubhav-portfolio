import { projects } from "@/lib/data";
import FadeIn from "@/components/FadeIn";

export default function Projects() {
  return (
    <section id="projects" className="py-24 px-6">
      <div className="max-w-5xl mx-auto">
        <SectionLabel>Projects</SectionLabel>
        <h2 className="text-3xl md:text-4xl font-bold text-zinc-100 mt-3 mb-4">
          Things I&apos;ve Built
        </h2>
        <p className="text-zinc-400 text-sm mb-12 max-w-xl">
          Personal projects I built to go deep on systems, databases, distributed algorithms, and AI.
        </p>

        <div className="grid md:grid-cols-2 gap-6">
          {projects.map((project, i) => (
            <FadeIn key={project.name} delay={i * 0.07}>
              <ProjectCard project={project} />
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}

type Project = (typeof projects)[number];

function ProjectCard({ project }: { project: Project }) {
  return (
    <div className="group bg-zinc-900 border border-zinc-800 rounded-2xl p-6 hover:border-zinc-700 transition-all duration-200 hover:shadow-xl hover:shadow-black/30 flex flex-col">
      {/* Header */}
      <div className="flex items-start justify-between mb-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span
              className="text-xs font-medium px-2 py-0.5 rounded-full"
              style={{
                backgroundColor: project.color + "22",
                color: project.color,
                border: `1px solid ${project.color}44`,
              }}
            >
              {project.category}
            </span>
            <span className="text-xs text-zinc-600">{project.period}</span>
          </div>
          <h3 className="text-zinc-100 font-semibold text-lg leading-tight">{project.name}</h3>
          <p className="text-zinc-500 text-xs mt-0.5">{project.subtitle}</p>
        </div>

        <a
          href={project.github}
          target="_blank"
          rel="noopener noreferrer"
          className="text-zinc-600 hover:text-zinc-300 transition-colors flex-shrink-0 ml-2 mt-1"
          aria-label={`GitHub link for ${project.name}`}
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12z" />
          </svg>
        </a>
      </div>

      {/* Description */}
      <p className="text-zinc-400 text-sm leading-relaxed flex-1 mb-5">{project.description}</p>

      {/* Tags */}
      <div className="flex flex-wrap gap-2">
        {project.tags.map((tag) => (
          <span
            key={tag}
            className="text-xs font-mono text-zinc-400 bg-zinc-800 border border-zinc-700 px-2.5 py-1 rounded-md"
          >
            {tag}
          </span>
        ))}
      </div>
    </div>
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
