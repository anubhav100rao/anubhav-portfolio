"use client";

import { useState } from "react";
import { achievements } from "@/lib/data";
import FadeIn from "@/components/FadeIn";
import SectionHeader from "@/components/SectionHeader";

type AchievementItem = (typeof achievements)[number];

// Custom Platform Visual Indicators and SVGs
const platformIcons: Record<string, React.ReactNode> = {
  LeetCode: (
    <svg className="w-8 h-8 text-amber-500" viewBox="0 0 24 24" fill="currentColor">
      <path d="M13.483 0a1.374 1.374 0 0 0-.961.414l-7.75 7.75a1.374 1.374 0 1 0 1.94 1.94L14.462 2.36l6.09 6.09a1.37 1.37 0 0 0 2.215-.224l2.128-4.256a1.375 1.375 0 0 0-.616-1.848l-9.878-4.94A1.372 1.372 0 0 0 13.483 0zm-8.878 9.878a1.375 1.375 0 0 0-1.94 0L.414 12.13a1.375 1.375 0 0 0 0 1.94l9.878 9.878a1.374 1.374 0 0 0 1.94 0l7.75-7.75a1.374 1.374 0 1 0-1.94-1.94l-7.75 7.75L1.374 13.09l2.128-2.128a1.375 1.375 0 0 0 0-1.946z" />
    </svg>
  ),
  Codeforces: (
    <div className="flex items-end gap-1 w-8 h-8 select-none">
      <div className="w-2.5 h-4 bg-blue-500 rounded-t-sm" />
      <div className="w-2.5 h-8 bg-red-500 rounded-t-sm" />
      <div className="w-2.5 h-6 bg-yellow-500 rounded-t-sm" />
    </div>
  ),
  CodeChef: (
    <svg className="w-8 h-8 text-indigo-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
    </svg>
  ),
  "Community & Leadership": (
    <svg className="w-8 h-8 text-emerald-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
      <circle cx="9" cy="7" r="4" />
      <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
      <path d="M16 3.13a4 4 0 0 1 0 7.75" />
    </svg>
  ),
};

export default function Achievements() {
  return (
    <section id="achievements" className="py-24 px-6 relative overflow-hidden bg-white/50 dark:bg-zinc-950/50">
      {/* Background gradients */}
      <div className="absolute top-1/2 left-1/3 w-[500px] h-[500px] bg-gradient-to-r from-amber-500/5 via-blue-500/5 to-indigo-500/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-5xl mx-auto relative z-10">
        
        {/* Header */}
        <SectionHeader
          label="Achievements"
          title="Coding Profiles &"
          accent="Leadership"
          subtitle="Rankings and performance metrics across top competitive programming platforms and community leadership."
        />

        {/* Asymmetrical grid for high-end feel */}
        <div className="grid md:grid-cols-2 gap-8">
          {achievements.map((item, i) => (
            <FadeIn key={item.platform} delay={i * 0.08}>
              <TrophyCard item={item} />
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}

function TrophyCard({ item }: { item: AchievementItem }) {
  const [hovered, setHovered] = useState(false);

  // Sparklines mapped statically to simulate contest rating progression
  const renderSparkline = () => {
    if (item.platform === "LeetCode") {
      return (
        <svg className="w-full h-12 text-amber-500 opacity-60 group-hover:opacity-100 transition-opacity duration-300" viewBox="0 0 200 60" fill="none">
          <path
            d="M 10,50 L 40,42 L 70,35 L 100,28 L 130,22 L 160,14 L 190,6"
            stroke="currentColor"
            strokeWidth="3"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <circle cx="190" cy="6" r="4.5" fill="currentColor" className="animate-pulse" />
          <path
            d="M 10,50 L 40,42 L 70,35 L 100,28 L 130,22 L 160,14 L 190,6 L 190,60 L 10,60 Z"
            fill="url(#grad-lc)"
            opacity="0.15"
          />
          <defs>
            <linearGradient id="grad-lc" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="rgb(245, 158, 11)" stopOpacity="1" />
              <stop offset="100%" stopColor="rgb(245, 158, 11)" stopOpacity="0" />
            </linearGradient>
          </defs>
        </svg>
      );
    }
    if (item.platform === "Codeforces") {
      return (
        <svg className="w-full h-12 text-blue-500 opacity-60 group-hover:opacity-100 transition-opacity duration-300" viewBox="0 0 200 60" fill="none">
          <path
            d="M 10,48 L 40,40 L 70,44 L 100,32 L 130,36 L 160,24 L 190,14"
            stroke="currentColor"
            strokeWidth="3"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <circle cx="190" cy="14" r="4.5" fill="currentColor" className="animate-pulse" />
          <path
            d="M 10,48 L 40,40 L 70,44 L 100,32 L 130,36 L 160,24 L 190,14 L 190,60 L 10,60 Z"
            fill="url(#grad-cf)"
            opacity="0.15"
          />
          <defs>
            <linearGradient id="grad-cf" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="rgb(59, 130, 246)" stopOpacity="1" />
              <stop offset="100%" stopColor="rgb(59, 130, 246)" stopOpacity="0" />
            </linearGradient>
          </defs>
        </svg>
      );
    }
    if (item.platform === "CodeChef") {
      return (
        <svg className="w-full h-12 text-purple-500 opacity-60 group-hover:opacity-100 transition-opacity duration-300" viewBox="0 0 200 60" fill="none">
          <path
            d="M 10,52 L 40,46 L 70,38 L 100,28 L 130,30 L 160,18 L 190,8"
            stroke="currentColor"
            strokeWidth="3"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <circle cx="190" cy="8" r="4.5" fill="currentColor" className="animate-pulse" />
          <path
            d="M 10,52 L 40,46 L 70,38 L 100,28 L 130,30 L 160,18 L 190,8 L 190,60 L 10,60 Z"
            fill="url(#grad-cc)"
            opacity="0.15"
          />
          <defs>
            <linearGradient id="grad-cc" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="rgb(139, 92, 246)" stopOpacity="1" />
              <stop offset="100%" stopColor="rgb(139, 92, 246)" stopOpacity="0" />
            </linearGradient>
          </defs>
        </svg>
      );
    }
    // Dynamic system cluster pattern for community
    return (
      <div className="flex gap-2.5 items-center justify-between font-mono text-[9px] text-zinc-400 dark:text-zinc-600 select-none bg-zinc-50 dark:bg-zinc-900/50 p-2 rounded-lg border border-zinc-150 dark:border-zinc-850/60 w-full">
        <span className="flex items-center gap-1"><span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" /> TESTER</span>
        <span>●</span>
        <span className="flex items-center gap-1"><span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" /> SETTER</span>
        <span>●</span>
        <span className="flex items-center gap-1"><span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" /> LEAD</span>
      </div>
    );
  };

  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="group flex flex-col justify-between h-full bg-zinc-50/50 dark:bg-zinc-950/40 border border-zinc-200/80 dark:border-zinc-850 hover:border-zinc-300 dark:hover:border-zinc-750 rounded-2xl p-6 md:p-8 transition-all duration-300 relative overflow-hidden"
      style={{
        boxShadow: hovered ? `0 15px 30px -10px ${item.color}15` : "none",
        borderColor: hovered ? `${item.color}44` : "",
      }}
    >
      {/* Background radial accent flare */}
      <div
        className="absolute top-0 right-0 w-32 h-32 opacity-[0.03] group-hover:opacity-[0.08] transition-opacity blur-3xl pointer-events-none rounded-full"
        style={{ backgroundColor: item.color }}
      />

      <div>
        {/* Header containing logo & link */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-4.5">
            <div
              className="w-12 h-12 rounded-xl flex items-center justify-center border transition-all duration-300 group-hover:scale-105"
              style={{
                backgroundColor: item.color + "11",
                borderColor: item.color + "33",
              }}
            >
              {platformIcons[item.platform]}
            </div>
            <div>
              <h3 className="text-xl font-bold text-zinc-900 dark:text-zinc-100">{item.platform}</h3>
              {item.platform === "LeetCode" && (
                <span className="text-[10px] text-amber-500 font-bold uppercase tracking-wider font-mono">
                  Guardian · Top 0.37%
                </span>
              )}
            </div>
          </div>

          {item.link && (
            <a
              href={item.link}
              target="_blank"
              rel="noopener noreferrer"
              className="w-9 h-9 rounded-lg bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 text-zinc-500 dark:text-zinc-400 hover:text-zinc-850 dark:hover:text-zinc-150 transition-colors flex items-center justify-center"
              aria-label={`Visit ${item.platform} profile`}
            >
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
                <polyline points="15 3 21 3 21 9" />
                <line x1="10" y1="14" x2="21" y2="3" />
              </svg>
            </a>
          )}
        </div>

        {/* Rating/Position Badge */}
        <div
          className="text-xs font-mono font-bold mb-5 inline-flex items-center justify-start self-start px-3 py-1.5 rounded-lg border transition-all select-none"
          style={{
            backgroundColor: `${item.color}15`,
            color: item.color,
            borderColor: `${item.color}35`,
          }}
        >
          {item.rating}
        </div>

        {/* Paragraph description */}
        <p className="text-zinc-650 dark:text-zinc-400 text-sm leading-relaxed mb-6 font-normal">
          {item.description}
        </p>
      </div>

      {/* Sparkline rating graph */}
      <div className="mt-4 pt-4 border-t border-zinc-150 dark:border-zinc-900/60">
        {renderSparkline()}
      </div>
    </div>
  );
}

