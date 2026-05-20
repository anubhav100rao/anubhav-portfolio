"use client";

import { useEffect, useState } from "react";
import { personalInfo } from "@/lib/data";

const roles = [
  "Founder @ CodeTraces.dev",
  "Software Engineer @ Coinbase",
  "Distributed Systems Engineer",
  "LLM Platform Engineer",
  "Database & Infrastructure Builder",
  "Open Source Systems Contributor",
];

export default function Hero() {
  const [roleIndex, setRoleIndex] = useState(0);
  const [displayed, setDisplayed] = useState("");
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    const current = roles[roleIndex];
    let timeout: ReturnType<typeof setTimeout> | undefined;

    if (!deleting && displayed.length < current.length) {
      timeout = setTimeout(() => setDisplayed(current.slice(0, displayed.length + 1)), 60);
    } else if (!deleting && displayed.length === current.length) {
      timeout = setTimeout(() => setDeleting(true), 2200);
    } else if (deleting && displayed.length > 0) {
      timeout = setTimeout(() => setDisplayed(displayed.slice(0, -1)), 30);
    } else if (deleting && displayed.length === 0) {
      timeout = setTimeout(() => {
        setDeleting(false);
        setRoleIndex((i) => (i + 1) % roles.length);
      }, 120);
    }

    return () => {
      if (timeout !== undefined) {
        clearTimeout(timeout);
      }
    };
  }, [displayed, deleting, roleIndex]);

  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
    >
      {/* Custom mesh gradient background */}
      <div className="absolute inset-0 bg-white dark:bg-zinc-950">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(59,130,246,0.08),transparent_55%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_30%,rgba(139,92,246,0.05),transparent_40%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_80%,rgba(59,130,246,0.04),transparent_50%)]" />
      </div>

      {/* Modern subtle grid pattern */}
      <div
        className="absolute inset-0 opacity-[0.03] dark:opacity-[0.02]"
        style={{
          backgroundImage: `linear-gradient(rgba(0,0,0,0.15) 1px, transparent 1px), linear-gradient(90deg, rgba(0,0,0,0.15) 1px, transparent 1px)`,
          backgroundSize: "64px 64px",
        }}
      />

      <div className="relative z-10 max-w-5xl mx-auto px-6 py-32 text-center">
        {/* CodeTraces.dev Highlight Badge */}
        <a
          href="#codetraces"
          className="inline-flex items-center gap-2.5 px-4.5 py-1.5 rounded-full bg-blue-50/80 dark:bg-blue-950/20 border border-blue-200/40 dark:border-blue-900/30 text-blue-600 dark:text-blue-400 font-mono text-[11px] mb-8 hover:scale-105 transition-all duration-300 shadow-sm shadow-blue-100/50 dark:shadow-none"
        >
          <span className="flex h-2 w-2 relative">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-500"></span>
          </span>
          Currently Building CodeTraces.dev — Interactive AI Visualizer Startup →
        </a>

        <h1 className="text-5xl md:text-7xl font-bold text-zinc-900 dark:text-zinc-100 tracking-tight mb-6">
          Anubhav Kumar{" "}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-indigo-500">
            Rao
          </span>
        </h1>

        {/* Refined Terminal Typewriter Command Block */}
        <div className="flex items-center justify-center mb-8 select-none">
          <div className="inline-flex items-center gap-3 px-4 py-2 rounded-2xl bg-zinc-100/80 dark:bg-zinc-900/45 border border-zinc-200 dark:border-zinc-800/80 font-mono text-sm md:text-base text-zinc-600 dark:text-zinc-350 shadow-sm shadow-zinc-100/30 dark:shadow-none">
            <span className="text-emerald-500 font-extrabold select-none animate-pulse">❯</span>
            <span>{displayed}</span>
            <span className="animate-pulse text-blue-500 dark:text-blue-400 font-black">|</span>
          </div>
        </div>

        <p className="max-w-2xl mx-auto text-zinc-500 dark:text-zinc-400 text-base md:text-lg leading-relaxed mb-10">
          {personalInfo.tagline}
        </p>

        <div className="flex flex-wrap items-center justify-center gap-4">
          <a
            href="#codetraces"
            className="px-6 py-3 rounded-full bg-gradient-to-r from-blue-600 to-indigo-650 hover:from-blue-550 hover:to-indigo-600 text-white font-semibold text-sm transition-all hover:scale-105 shadow-md shadow-blue-500/20"
          >
            Explore CodeTraces.dev
          </a>
          <a
            href="#experience"
            className="px-6 py-3 rounded-full bg-white dark:bg-zinc-900 hover:bg-zinc-50 dark:hover:bg-zinc-800/80 border border-zinc-200 dark:border-zinc-800 text-zinc-700 dark:text-zinc-300 font-semibold text-sm transition-all hover:scale-105 shadow-sm"
          >
            View My Work
          </a>
          <a
            href={personalInfo.resumeUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="px-6 py-3 rounded-full bg-white dark:bg-zinc-900 hover:bg-zinc-50 dark:hover:bg-zinc-800/80 border border-zinc-200 dark:border-zinc-800 text-zinc-700 dark:text-zinc-300 font-semibold text-sm transition-all hover:scale-105 shadow-sm"
          >
            Download Resume
          </a>
          <a
            href="#contact"
            className="px-6 py-3 rounded-full bg-white dark:bg-zinc-900 hover:bg-zinc-50 dark:hover:bg-zinc-800/80 border border-zinc-200 dark:border-zinc-800 text-zinc-700 dark:text-zinc-300 font-semibold text-sm transition-all hover:scale-105 shadow-sm"
          >
            Contact Me
          </a>
        </div>

        {/* Social links */}
        <div className="mt-12 flex items-center justify-center gap-6">
          <a
            href={personalInfo.github}
            target="_blank"
            rel="noopener noreferrer"
            className="text-zinc-500 hover:text-zinc-800 dark:hover:text-zinc-200 transition-colors text-sm flex items-center gap-2"
          >
            <GithubIcon />
            GitHub
          </a>
          <span className="text-zinc-300 dark:text-zinc-700">·</span>
          <a
            href={personalInfo.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="text-zinc-500 hover:text-zinc-800 dark:hover:text-zinc-200 transition-colors text-sm flex items-center gap-2"
          >
            <LinkedInIcon />
            LinkedIn
          </a>
          <span className="text-zinc-300 dark:text-zinc-700">·</span>
          <a
            href={`mailto:${personalInfo.email}`}
            className="text-zinc-500 hover:text-zinc-800 dark:hover:text-zinc-200 transition-colors text-sm"
          >
            {personalInfo.email}
          </a>
        </div>

        {/* Scroll cue */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
          <div className="w-px h-12 bg-gradient-to-b from-zinc-300 dark:from-zinc-700 to-transparent mx-auto" />
        </div>
      </div>
    </section>
  );
}

function GithubIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12z" />
    </svg>
  );
}

function LinkedInIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
    </svg>
  );
}
