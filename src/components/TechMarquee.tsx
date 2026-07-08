"use client";

import { skills } from "@/lib/data";

const categoryColors: Record<string, string> = {
  Languages: "#3b82f6",
  "Backend & Systems": "#10b981",
  "AI & ML": "#f59e0b",
  "Data & Infrastructure": "#8b5cf6",
  Frontend: "#ec4899",
  "Core CS": "#06b6d4",
};

type Item = { name: string; color: string };

const allSkills: Item[] = Object.entries(skills).flatMap(([category, items]) =>
  items.map((name) => ({ name, color: categoryColors[category] ?? "#3b82f6" }))
);

const mid = Math.ceil(allSkills.length / 2);
const rowA = allSkills.slice(0, mid);
const rowB = allSkills.slice(mid);

export default function TechMarquee() {
  return (
    <div className="marquee-group flex flex-col gap-3 select-none" aria-hidden="true">
      <MarqueeRow items={rowA} />
      <MarqueeRow items={rowB} reverse />
    </div>
  );
}

function MarqueeRow({ items, reverse }: { items: Item[]; reverse?: boolean }) {
  return (
    <div className="marquee-mask overflow-hidden">
      <div className={`marquee-track gap-3 pr-3 ${reverse ? "marquee-reverse" : ""}`}>
        {[...items, ...items].map((item, i) => (
          <span
            key={`${item.name}-${i}`}
            className="flex-shrink-0 flex items-center gap-2 text-xs font-mono px-3.5 py-1.5 rounded-full border bg-white/60 dark:bg-zinc-950/50 text-zinc-600 dark:text-zinc-400 border-zinc-200 dark:border-zinc-800 whitespace-nowrap"
          >
            <span
              className="w-1.5 h-1.5 rounded-full"
              style={{ backgroundColor: item.color }}
            />
            {item.name}
          </span>
        ))}
      </div>
    </div>
  );
}
