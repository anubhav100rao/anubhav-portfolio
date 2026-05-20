"use client";

import { useState } from "react";
import { projects } from "@/lib/data";
import FadeIn from "@/components/FadeIn";

type Project = (typeof projects)[number];

const categoryMapping: Record<string, string> = {
  "SRE / AI Agents": "AI & Agents",
  "AI Systems": "AI & Agents",
  "Operating System": "Systems & DBs",
  "Database System": "Systems & DBs",
  "Storage Engine": "Systems & DBs",
  "Distributed Systems": "Distributed & Real-time",
  "Algorithms / Visualization": "Algorithms & Visualizations",
};

const filterTabs = [
  "All",
  "AI & Agents",
  "Systems & DBs",
  "Distributed & Real-time",
  "Algorithms & Visualizations",
];

export default function Projects() {
  const [activeTab, setActiveTab] = useState("All");

  const filteredProjects = projects.filter((project) => {
    if (activeTab === "All") return true;
    return categoryMapping[project.category] === activeTab;
  });

  return (
    <section id="projects" className="py-24 px-6 relative overflow-hidden bg-zinc-50/20 dark:bg-zinc-900/10">
      {/* Dynamic background accents */}
      <div className="absolute top-1/4 left-1/4 w-[350px] h-[350px] bg-gradient-to-r from-teal-500/5 to-emerald-500/5 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] bg-gradient-to-r from-blue-500/5 to-indigo-500/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-5xl mx-auto relative z-10">
        
        {/* Header */}
        <div className="mb-14">
          <SectionLabel>Projects</SectionLabel>
          <h2 className="text-3xl md:text-4xl font-bold text-zinc-900 dark:text-zinc-100 mt-3 mb-2">
            Things I&apos;ve Built
          </h2>
          <p className="text-zinc-500 dark:text-zinc-400 text-sm max-w-xl">
            SRE control planes, educational OS kernels, custom database engines, and browser-based consensus visualizers.
          </p>
        </div>

        {/* Dynamic Category Switcher */}
        <div className="flex flex-wrap gap-2 mb-12 border-b border-zinc-200 dark:border-zinc-800/80 pb-4 overflow-x-auto scrollbar-none">
          {filterTabs.map((tab) => {
            const isActive = activeTab === tab;
            const count = tab === "All" 
              ? projects.length 
              : projects.filter(p => categoryMapping[p.category] === tab).length;

            return (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`flex-shrink-0 px-4 py-2 text-xs font-mono font-bold rounded-xl border transition-all duration-300 flex items-center gap-2 ${
                  isActive
                    ? "bg-zinc-900 dark:bg-zinc-100 text-white dark:text-zinc-950 border-zinc-900 dark:border-zinc-100 shadow-md"
                    : "bg-white dark:bg-zinc-900 border-zinc-200 dark:border-zinc-800 text-zinc-450 dark:text-zinc-500 hover:text-zinc-800 dark:hover:text-zinc-200 hover:border-zinc-300 dark:hover:border-zinc-700"
                }`}
              >
                <span>{tab}</span>
                <span className={`text-[10px] px-1.5 py-0.5 rounded-md ${
                  isActive
                    ? "bg-zinc-800 dark:bg-zinc-200 text-zinc-250 dark:text-zinc-700"
                    : "bg-zinc-100 dark:bg-zinc-800 text-zinc-500 dark:text-zinc-400"
                }`}>
                  {count}
                </span>
              </button>
            );
          })}
        </div>

        {/* Project Grid */}
        <div className="grid md:grid-cols-2 gap-8">
          {filteredProjects.map((project, i) => (
            <FadeIn key={project.name} delay={i * 0.05}>
              <ProjectCard project={project} />
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}

function ProjectCard({ project }: { project: Project }) {
  const [hovered, setHovered] = useState(false);

  // Compute a custom glow shadow for active project theme color
  const shadowStyle = hovered
    ? {
        boxShadow: `0 20px 40px -15px ${project.color}25`,
        borderColor: `${project.color}88`,
      }
    : {};

  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="group flex flex-col h-full rounded-2xl border transition-all duration-500 ease-out bg-white/70 dark:bg-zinc-950/60 border-zinc-200 dark:border-zinc-850 hover:border-zinc-300 dark:hover:border-zinc-750 hover:-translate-y-1.5 relative overflow-hidden"
      style={shadowStyle}
    >
      
      {/* Custom Grid / Lines Background */}
      <div className="absolute inset-0 opacity-[0.02] dark:opacity-[0.03] pointer-events-none transition-all group-hover:scale-105 duration-700">
        <svg width="100%" height="100%">
          <defs>
            <pattern id={`grid-${project.name}`} width="16" height="16" patternUnits="userSpaceOnUse">
              <path d="M 16 0 L 0 0 0 16" fill="none" stroke="currentColor" strokeWidth="1" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill={`url(#grid-${project.name})`} />
        </svg>
      </div>

      {/* Decorative top window bar */}
      <div className="h-8 border-b border-zinc-150 dark:border-zinc-850/80 bg-zinc-100/50 dark:bg-zinc-900/35 px-4 flex items-center justify-between font-mono text-[9px] text-zinc-400 dark:text-zinc-550 select-none">
        <div className="flex gap-1.5">
          <span className="w-2.5 h-2.5 rounded-full bg-red-400/70" />
          <span className="w-2.5 h-2.5 rounded-full bg-yellow-400/70" />
          <span className="w-2.5 h-2.5 rounded-full bg-green-400/70" />
        </div>
        <span className="text-[10px] tracking-tight">{`~/dev/${project.name.toLowerCase().replace(/\s+/g, '-')}`}</span>
        <span className="text-zinc-300 dark:text-zinc-850 font-bold">●</span>
      </div>

      {/* Content wrapper */}
      <div className="p-6 md:p-7 flex-1 flex flex-col relative z-10">
        
        {/* Header Block */}
        <div className="flex items-start justify-between gap-4 mb-4">
          <div>
            <div className="flex items-center gap-2 mb-1.5">
              <span
                className="text-[10px] font-mono tracking-wide px-2.5 py-0.5 rounded-full font-bold uppercase transition-all duration-300"
                style={{
                  backgroundColor: project.color + "18",
                  color: project.color,
                  border: `1px solid ${project.color}35`,
                }}
              >
                {project.category}
              </span>
              <span className="text-[10px] font-mono text-zinc-400 dark:text-zinc-500">{project.period}</span>
            </div>

            <h3 className="text-zinc-900 dark:text-zinc-100 font-bold text-xl leading-snug group-hover:text-zinc-950 dark:group-hover:text-white transition-colors duration-300">
              {project.name}
            </h3>
            <p className="text-zinc-400 dark:text-zinc-500 text-xs font-medium font-mono mt-0.5">{project.subtitle}</p>
          </div>

          <a
            href={project.github}
            target="_blank"
            rel="noopener noreferrer"
            className="w-10 h-10 rounded-xl bg-zinc-100/70 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 text-zinc-450 dark:text-zinc-500 hover:text-zinc-800 dark:hover:text-zinc-200 transition-all duration-300 flex items-center justify-center flex-shrink-0 relative group-hover:scale-105 group-hover:border-zinc-300 dark:group-hover:border-zinc-700"
            aria-label={`GitHub link for ${project.name}`}
            style={{
              boxShadow: hovered ? `0 4px 12px ${project.color}15` : "none",
            }}
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12z" />
            </svg>
          </a>
        </div>

        {/* Detailed description */}
        <p className="text-zinc-650 dark:text-zinc-400 text-[13px] md:text-sm leading-relaxed flex-1 mb-6 font-normal">
          {project.description}
        </p>

        {/* Technology Tag Cloud */}
        <div className="flex flex-wrap gap-1.5 pt-4 border-t border-zinc-150 dark:border-zinc-900/60 mt-auto">
          {project.tags.map((tag) => (
            <span
              key={tag}
              className="text-[10px] font-mono text-zinc-550 dark:text-zinc-450 bg-zinc-100/50 dark:bg-zinc-900/50 border border-zinc-200/60 dark:border-zinc-800/80 px-2 py-0.5 rounded-md transition-all duration-300 hover:text-zinc-800 dark:hover:text-zinc-200 hover:border-zinc-350 dark:hover:border-zinc-700 cursor-default"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>
      
      {/* Colored bottom line highlighter */}
      <div 
        className="h-1 w-full bg-zinc-200 dark:bg-zinc-850 transition-all duration-500" 
        style={{
          backgroundColor: hovered ? project.color : "transparent"
        }}
      />
    </div>
  );
}

function SectionLabel({ children }: { children: string }) {
  return (
    <div className="flex items-center gap-3">
      <span className="text-blue-500 text-sm font-mono">{"// "}</span>
      <span className="text-blue-500 dark:text-blue-400 text-sm font-semibold uppercase tracking-widest">
        {children}
      </span>
    </div>
  );
}

