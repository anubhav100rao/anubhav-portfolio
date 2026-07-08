"use client";

import { useEffect, useRef } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";
import { experiences } from "@/lib/data";
import FadeIn from "@/components/FadeIn";
import SectionHeader from "@/components/SectionHeader";

type Exp = (typeof experiences)[number];

export default function Experience() {
  const timelineRef = useRef<HTMLDivElement>(null);
  const progress = useMotionValue(0);
  const lineScale = useSpring(progress, { stiffness: 90, damping: 26 });

  // Draw the spine as the timeline scrolls through the viewport
  useEffect(() => {
    const update = () => {
      const el = timelineRef.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const vh = window.innerHeight;
      const start = vh * 0.75; // begin drawing when the top crosses 75% of viewport
      const p = (start - rect.top) / (rect.height - vh * 0.3);
      progress.set(Math.min(1, Math.max(0, p)));
    };
    update();
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    return () => {
      window.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, [progress]);

  return (
    <section
      id="experience"
      className="py-24 px-6 relative overflow-hidden bg-zinc-50/50 dark:bg-zinc-900/10"
    >
      {/* Background radial accents */}
      <div className="absolute top-1/4 right-1/5 w-[400px] h-[400px] bg-gradient-to-r from-blue-500/5 to-purple-500/5 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute bottom-1/4 left-1/5 w-[350px] h-[350px] bg-gradient-to-r from-cyan-500/5 to-blue-500/5 rounded-full blur-[110px] pointer-events-none" />

      <div className="max-w-5xl mx-auto relative z-10">
        <SectionHeader
          label="Experience"
          title="Where I've"
          accent="Worked"
          subtitle="The full track record — every role, every system, every number. Nothing tucked behind tabs."
        />

        <div ref={timelineRef} className="relative">
          {/* Timeline spine */}
          <div className="absolute left-[15px] top-2 bottom-2 w-px bg-zinc-200 dark:bg-zinc-800" />
          <motion.div
            style={{ scaleY: lineScale }}
            className="absolute left-[15px] top-2 bottom-2 w-px origin-top bg-gradient-to-b from-blue-500 via-violet-500 to-cyan-500"
          />

          <div className="flex flex-col gap-14">
            {experiences.map((exp, i) => (
              <FadeIn key={exp.company} delay={0.05}>
                <article className="relative pl-12 md:pl-16">
                  {/* Timeline node */}
                  <span
                    className="absolute left-[6px] top-8 w-[19px] h-[19px] rounded-full border-2 bg-white dark:bg-zinc-950 z-10 flex items-center justify-center"
                    style={{ borderColor: exp.color }}
                  >
                    <span
                      className="w-[7px] h-[7px] rounded-full animate-pulse"
                      style={{ backgroundColor: exp.color, boxShadow: `0 0 8px ${exp.color}` }}
                    />
                  </span>

                  <ExperienceCard exp={exp} index={i} />
                </article>
              </FadeIn>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function ExperienceCard({ exp, index }: { exp: Exp; index: number }) {
  return (
    <div className="relative bg-white/80 dark:bg-zinc-900/60 backdrop-blur-sm border border-zinc-200 dark:border-zinc-800/80 rounded-3xl p-6 md:p-8 flex flex-col gap-6 shadow-xl shadow-zinc-200/30 dark:shadow-black/20 transition-all duration-500 hover:-translate-y-1 hover:border-zinc-300 dark:hover:border-zinc-700 overflow-hidden">
      {/* Colored top hairline */}
      <div
        className="absolute top-0 left-0 right-0 h-[3px]"
        style={{
          background: `linear-gradient(to right, ${exp.color}, transparent 70%)`,
        }}
      />

      {/* Index watermark */}
      <span className="absolute top-5 right-6 font-mono text-5xl font-black text-zinc-100 dark:text-zinc-800/60 select-none pointer-events-none">
        0{index + 1}
      </span>

      {/* Header */}
      <div className="flex flex-wrap items-start justify-between gap-4 border-b border-zinc-150 dark:border-zinc-800/60 pb-6 relative z-10">
        <div className="flex items-center gap-4">
          <div
            className="w-12 h-12 rounded-2xl flex items-center justify-center font-black text-lg flex-shrink-0"
            style={{
              backgroundColor: exp.color + "18",
              border: `1px solid ${exp.color}44`,
              color: exp.color,
            }}
          >
            {exp.logo}
          </div>
          <div>
            <h3 className="text-xl font-bold text-zinc-900 dark:text-zinc-100 leading-tight">
              {exp.role}
            </h3>
            <div className="flex items-center gap-2 mt-1">
              <span className="text-sm font-semibold text-zinc-650 dark:text-zinc-350">
                {exp.company}
              </span>
              <span className="text-zinc-300 dark:text-zinc-700 font-bold">·</span>
              <span className="text-xs text-zinc-400 font-mono font-medium">{exp.location}</span>
            </div>
          </div>
        </div>

        <span
          className="text-xs font-mono font-bold px-3.5 py-1 rounded-full border"
          style={{
            backgroundColor: exp.color + "11",
            color: exp.color,
            borderColor: exp.color + "33",
          }}
        >
          {exp.period}
        </span>
      </div>

      {/* Animated mock dashboard */}
      <Dashboard company={exp.company} />

      {/* Full highlights — everything visible */}
      <div className="flex flex-col gap-4 relative z-10">
        <span className="text-[10px] font-mono tracking-widest text-zinc-400 dark:text-zinc-500 uppercase">
          What I shipped
        </span>
        <ul className="space-y-4">
          {exp.highlights.map((h, j) => (
            <li
              key={j}
              className="flex gap-4.5 text-zinc-600 dark:text-zinc-400 text-sm leading-relaxed"
            >
              <span
                className="mt-2 w-2 h-2 rounded-full flex-shrink-0 animate-pulse"
                style={{ backgroundColor: exp.color, boxShadow: `0 0 10px ${exp.color}` }}
              />
              <p className="flex-1">{h}</p>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

function Dashboard({ company }: { company: string }) {
  switch (company) {
    case "Coinbase":
      return (
        <div className="w-full h-44 rounded-2xl bg-zinc-950 border border-zinc-900 flex flex-col justify-between p-4 font-mono text-[10px] relative overflow-hidden select-none">
          <div className="flex justify-between items-center text-zinc-500 border-b border-zinc-900 pb-2">
            <span>nlp_transcript_classifier.py</span>
            <span className="text-emerald-500 flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-ping" />
              ACTIVE
            </span>
          </div>

          {/* Animated NLP Flow Nodes */}
          <div className="flex-1 flex justify-between items-center px-4 relative">
            <div className="flex flex-col items-center gap-1.5">
              <div className="w-9 h-9 rounded-xl bg-blue-600/10 border border-blue-500/40 flex items-center justify-center text-blue-400 font-bold">
                CHAT
              </div>
              <span className="text-[8px] text-zinc-500">Transcripts</span>
            </div>

            <div className="flex-1 flex items-center justify-center px-1">
              <div className="h-px bg-gradient-to-r from-blue-500 via-indigo-500 to-emerald-500 w-full relative">
                <div className="absolute top-1/2 left-0 -translate-y-1/2 w-1.5 h-1.5 rounded-full bg-blue-400 animate-ping" style={{ animationDelay: "0.2s" }} />
                <div className="absolute top-1/2 left-1/2 -translate-y-1/2 w-1.5 h-1.5 rounded-full bg-indigo-400 animate-ping" style={{ animationDelay: "0.5s" }} />
                <div className="absolute top-1/2 right-0 -translate-y-1/2 w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" style={{ animationDelay: "0.8s" }} />
              </div>
            </div>

            <div className="flex flex-col items-center gap-1.5">
              <div className="w-9 h-9 rounded-xl bg-indigo-600/10 border border-indigo-500/40 flex items-center justify-center text-indigo-400 font-bold animate-pulse">
                LLM
              </div>
              <span className="text-[8px] text-zinc-500">LLM Parser</span>
            </div>

            <div className="flex-1 flex items-center justify-center px-1">
              <div className="h-px bg-gradient-to-r from-indigo-500 to-emerald-500 w-full relative">
                <div className="absolute top-1/2 left-1/3 -translate-y-1/2 w-1.5 h-1.5 rounded-full bg-indigo-400 animate-ping" />
                <div className="absolute top-1/2 left-2/3 -translate-y-1/2 w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />
              </div>
            </div>

            <div className="flex flex-col items-center gap-1.5">
              <div className="w-9 h-9 rounded-xl bg-emerald-600/10 border border-emerald-500/40 flex items-center justify-center text-emerald-400 font-bold">
                -15%
              </div>
              <span className="text-[8px] text-zinc-500">Contact Rate</span>
            </div>
          </div>

          <div className="text-[8px] text-zinc-500 bg-zinc-900/50 p-1.5 rounded-lg border border-zinc-900 flex justify-between">
            <span>Ingested signals: trading, compliance, verification</span>
            <span className="text-blue-400">Pipeline MTTR: -50%</span>
          </div>
        </div>
      );

    case "D.E. Shaw & Co.":
      return (
        <div className="w-full h-44 rounded-2xl bg-zinc-950 border border-zinc-900 flex flex-col justify-between p-4 font-mono text-[10px] relative overflow-hidden select-none">
          <div className="flex justify-between items-center text-zinc-500 border-b border-zinc-900 pb-2">
            <span>dest_term_ticker_service.sh</span>
            <span className="text-purple-400">13M+ Tickers</span>
          </div>

          <div className="flex-1 flex flex-col justify-center gap-2.5">
            <div className="flex items-center justify-between text-[9px] text-zinc-400">
              <span>RAG Search Latency (13M Financial Instruments)</span>
              <span className="text-purple-400">Sub-second (Redis cached)</span>
            </div>

            {/* Live Latency Bar Chart */}
            <div className="h-[50px] flex items-end gap-2.5 px-4 w-full">
              <div className="w-full bg-zinc-900 rounded h-12 flex items-end justify-center text-[8px] text-zinc-650 font-bold relative group">
                <div className="w-full bg-purple-900/55 rounded-t h-[90%] transition-all" />
                <span className="absolute -top-3 text-[7px] text-zinc-500">DB Search</span>
              </div>
              <div className="w-full bg-zinc-900 rounded h-12 flex items-end justify-center text-[8px] text-zinc-650 font-bold relative group">
                <div className="w-full bg-purple-600/60 rounded-t h-[35%] transition-all" />
                <span className="absolute -top-3 text-[7px] text-purple-400">RAG Index</span>
              </div>
              <div className="w-full bg-zinc-900 rounded h-12 flex items-end justify-center text-[8px] text-zinc-650 font-bold relative group">
                <div className="w-full bg-emerald-500/70 rounded-t h-[12%] transition-all" />
                <span className="absolute -top-3 text-[7px] text-emerald-400">Redis Cache</span>
              </div>
            </div>
          </div>

          <div className="text-[8px] text-zinc-500 bg-zinc-900/50 p-1.5 rounded-lg border border-zinc-900 flex justify-between">
            <span>Quant Series Lib: 100+ Ticker Fields adopted</span>
            <span className="text-purple-400">Processed Report size: 2TB</span>
          </div>
        </div>
      );

    case "Rubrik":
      return (
        <div className="w-full h-44 rounded-2xl bg-zinc-950 border border-zinc-900 flex flex-col justify-between p-4 font-mono text-[10px] relative overflow-hidden select-none">
          <div className="flex justify-between items-center text-zinc-500 border-b border-zinc-900 pb-2">
            <span>cloud_metrics_collector.go</span>
            <span className="text-teal-400">Rubrik Archival Backup</span>
          </div>

          {/* Archival backup scaling progress */}
          <div className="flex-1 flex flex-col justify-center gap-3">
            <div className="flex justify-between items-center text-[9px] text-zinc-400">
              <span>Azure VM Disk Backups Capacity Scaling</span>
              <span className="text-teal-400 font-bold">4× Boost (8TB ➜ 32TB)</span>
            </div>
            <div className="w-full h-5 bg-zinc-900 rounded-full border border-zinc-800 overflow-hidden relative flex items-center px-1">
              <div className="h-3 rounded-full bg-gradient-to-r from-teal-600 to-teal-400 transition-all duration-1000" style={{ width: "100%" }} />
              <span className="absolute right-4 text-[8px] text-zinc-200 font-bold">32TB Expanded</span>
            </div>
          </div>

          <div className="text-[8px] text-zinc-500 bg-zinc-900/50 p-1.5 rounded-lg border border-zinc-900 flex justify-between">
            <span>GCP Metrics Collection Traffic: +17% increase</span>
            <span className="text-teal-400">VM Cost Comparison Tool: active</span>
          </div>
        </div>
      );

    case "Razorpay":
      return (
        <div className="w-full h-44 rounded-2xl bg-zinc-950 border border-zinc-900 flex flex-col justify-between p-4 font-mono text-[10px] relative overflow-hidden select-none">
          <div className="flex justify-between items-center text-zinc-500 border-b border-zinc-900 pb-2">
            <span>xpayroll_schema_manager.sql</span>
            <span className="text-sky-400">XPayroll Integration</span>
          </div>

          <div className="flex-1 flex justify-around items-center gap-4">
            <div className="flex flex-col gap-1 text-center bg-zinc-900/50 p-2.5 rounded-xl border border-zinc-900 flex-1">
              <span className="text-sky-400 text-xs font-bold">50+</span>
              <span className="text-[8px] text-zinc-500">Enterprise Organizations</span>
            </div>
            <div className="flex flex-col gap-1 text-center bg-zinc-900/50 p-2.5 rounded-xl border border-zinc-900 flex-1">
              <span className="text-emerald-400 text-xs font-bold">100%</span>
              <span className="text-[8px] text-zinc-500">Data Migration Integrity</span>
            </div>
            <div className="flex flex-col gap-1 text-center bg-zinc-900/50 p-2.5 rounded-xl border border-zinc-900 flex-1">
              <span className="text-amber-400 text-xs font-bold">80DDB</span>
              <span className="text-[8px] text-zinc-500">Tax Deductions Scheme</span>
            </div>
          </div>

          <div className="text-[8px] text-zinc-500 bg-zinc-900/50 p-1.5 rounded-lg border border-zinc-900 flex justify-between">
            <span>MySQL schema indexing onboarding completed</span>
            <span className="text-sky-400">100% Zero Data Loss</span>
          </div>
        </div>
      );

    default:
      return null;
  }
}
