"use client";

import { useEffect, useState } from "react";
import type { TocEntry } from "@/lib/toc";

export default function TableOfContents({ entries }: { entries: TocEntry[] }) {
  const [activeId, setActiveId] = useState<string>("");

  useEffect(() => {
    if (entries.length === 0) return;

    const headingEls = entries
      .map((e) => document.getElementById(e.id))
      .filter(Boolean) as HTMLElement[];

    const observer = new IntersectionObserver(
      (obs) => {
        // Find the topmost intersecting heading
        const visible = obs
          .filter((o) => o.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
        if (visible.length > 0) setActiveId(visible[0].target.id);
      },
      { rootMargin: "-64px 0px -60% 0px", threshold: 0 }
    );

    headingEls.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [entries]);

  if (entries.length === 0) return null;

  return (
    <nav className="hidden xl:block sticky top-28 self-start w-56 shrink-0">
      <p className="text-xs font-semibold text-zinc-500 uppercase tracking-widest mb-4">
        On this page
      </p>
      <ul className="space-y-1.5">
        {entries.map((entry) => {
          const isActive = activeId === entry.id;
          return (
            <li
              key={entry.id}
              style={{ paddingLeft: entry.level === 3 ? "0.75rem" : "0" }}
            >
              <a
                href={`#${entry.id}`}
                className={`block text-xs leading-snug transition-colors duration-150 truncate ${
                  isActive
                    ? "text-blue-400 font-medium"
                    : "text-zinc-500 hover:text-zinc-300"
                }`}
                onClick={(e) => {
                  e.preventDefault();
                  document
                    .getElementById(entry.id)
                    ?.scrollIntoView({ behavior: "smooth" });
                }}
              >
                {isActive && (
                  <span className="inline-block w-1 h-1 rounded-full bg-blue-400 mr-2 align-middle" />
                )}
                {entry.text}
              </a>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
