"use client";

import { useState } from "react";
import { skills } from "@/lib/data";
import FadeIn from "@/components/FadeIn";
import TechMarquee from "@/components/TechMarquee";
import SectionHeader from "@/components/SectionHeader";

const categoryColors: Record<string, string> = {
  Languages: "#3b82f6",
  "Backend & Systems": "#10b981",
  "AI & ML": "#f59e0b",
  "Data & Infrastructure": "#8b5cf6",
  Frontend: "#ec4899",
  "Core CS": "#06b6d4",
};

// Custom SVG Icons for each domain category
const categoryIcons: Record<string, React.ReactNode> = {
  Languages: (
    <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="16 18 22 12 16 6" />
      <polyline points="8 6 2 12 8 18" />
      <line x1="12" y1="4" x2="12" y2="20" />
    </svg>
  ),
  "Backend & Systems": (
    <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="2" y="2" width="20" height="8" rx="2" ry="2" />
      <rect x="2" y="14" width="20" height="8" rx="2" ry="2" />
      <line x1="6" y1="6" x2="6.01" y2="6" />
      <line x1="6" y1="18" x2="6.01" y2="18" />
      <line x1="20" y1="6" x2="20.01" y2="6" />
      <line x1="20" y1="18" x2="20.01" y2="18" />
    </svg>
  ),
  "AI & ML": (
    <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83" />
      <circle cx="12" cy="12" r="4" />
      <path d="M12 8v8" />
      <path d="M8 12h8" />
    </svg>
  ),
  "Data & Infrastructure": (
    <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <ellipse cx="12" cy="5" rx="9" ry="3" />
      <path d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5" />
      <path d="M3 12c0 1.66 4 3 9 3s9-1.34 9-3" />
    </svg>
  ),
  Frontend: (
    <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="2" y="3" width="20" height="14" rx="2" ry="2" />
      <line x1="8" y1="21" x2="16" y2="21" />
      <line x1="12" y1="17" x2="12" y2="21" />
    </svg>
  ),
  "Core CS": (
    <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="18" cy="18" r="3" />
      <circle cx="6" cy="6" r="3" />
      <circle cx="18" cy="6" r="3" />
      <circle cx="6" cy="18" r="3" />
      <line x1="9" y1="6" x2="15" y2="6" />
      <line x1="9" y1="18" x2="15" y2="18" />
      <line x1="6" y1="9" x2="6" y2="15" />
      <line x1="18" y1="9" x2="18" y2="15" />
      <line x1="8.12" y1="8.12" x2="15.88" y2="15.88" />
    </svg>
  ),
};

export default function Skills() {
  return (
    <section id="skills" className="py-24 px-6 relative overflow-hidden bg-zinc-50/50 dark:bg-zinc-900/10">
      {/* Background gradients */}
      <div className="absolute top-1/3 right-1/4 w-[400px] h-[400px] bg-gradient-to-r from-purple-500/5 to-pink-500/5 rounded-full blur-[100px] pointer-events-none" />
      
      <div className="max-w-5xl mx-auto relative z-10">
        
        {/* Header */}
        <SectionHeader
          label="Skills"
          title="Technologies &"
          accent="Tools"
          subtitle="My tech stack across languages, deep systems engineering, AI systems, data pipelines, infrastructure, and core CS."
        />

        {/* Scrolling tech marquee */}
        <FadeIn className="mb-14">
          <TechMarquee />
        </FadeIn>

        {/* Dynamic Skill Board Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {Object.entries(skills).map(([category, items], i) => {
            const color = categoryColors[category] ?? "#3b82f6";
            const icon = categoryIcons[category] ?? categoryIcons["Languages"];
            
            return (
              <FadeIn key={category} delay={i * 0.05}>
                <SkillCategoryCard
                  category={category}
                  items={items}
                  color={color}
                  icon={icon}
                />
              </FadeIn>
            );
          })}
        </div>
      </div>
    </section>
  );
}

function SkillCategoryCard({
  category,
  items,
  color,
  icon,
}: {
  category: string;
  items: string[];
  color: string;
  icon: React.ReactNode;
}) {
  const [hovered, setHovered] = useState(false);

  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="group flex flex-col h-full bg-white dark:bg-zinc-950/60 border border-zinc-200 dark:border-zinc-850 hover:border-zinc-300 dark:hover:border-zinc-750 rounded-2xl p-6 transition-all duration-300 relative overflow-hidden"
      style={{
        boxShadow: hovered ? `0 15px 30px -10px ${color}15` : "none",
        borderColor: hovered ? `${color}44` : "",
      }}
    >
      {/* Decorative corner glow */}
      <div
        className="absolute -top-12 -right-12 w-28 h-28 opacity-[0.03] group-hover:opacity-[0.08] transition-opacity blur-2xl pointer-events-none rounded-full"
        style={{ backgroundColor: color }}
      />

      {/* Header Block */}
      <div className="flex items-center gap-3 mb-5 pb-3.5 border-b border-zinc-150 dark:border-zinc-850/60">
        <div
          className="w-10 h-10 rounded-xl flex items-center justify-center border transition-all duration-300 group-hover:scale-105"
          style={{
            backgroundColor: color + "11",
            borderColor: color + "33",
            color: color,
          }}
        >
          {icon}
        </div>
        <h3 className="text-zinc-850 dark:text-zinc-250 font-bold text-sm font-sans tracking-wide">
          {category}
        </h3>
      </div>

      {/* Skill badging clusters */}
      <div className="flex flex-wrap gap-2 mt-auto">
        {items.map((skill) => (
          <SkillBadge key={skill} skill={skill} baseColor={color} />
        ))}
      </div>
    </div>
  );
}

function SkillBadge({ skill, baseColor }: { skill: string; baseColor: string }) {
  const [badgeHovered, setBadgeHovered] = useState(false);

  return (
    <span
      onMouseEnter={() => setBadgeHovered(true)}
      onMouseLeave={() => setBadgeHovered(false)}
      className="text-xs font-mono px-3 py-1.5 rounded-lg border transition-all duration-300 cursor-default select-none relative"
      style={{
        color: badgeHovered ? "#ffffff" : baseColor,
        backgroundColor: badgeHovered ? baseColor : `${baseColor}08`,
        borderColor: badgeHovered ? baseColor : `${baseColor}25`,
        boxShadow: badgeHovered ? `0 4px 12px ${baseColor}44` : "none",
        transform: badgeHovered ? "scale(1.04)" : "scale(1)",
      }}
    >
      {skill}
    </span>
  );
}

