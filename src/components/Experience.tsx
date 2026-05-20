"use client";

import { useState } from "react";
import { experiences } from "@/lib/data";

export default function Experience() {
  const [activeTab, setActiveTab] = useState(0);
  const current = experiences[activeTab];

  // Visual dashboards tailored to actual bullet highlights
  const renderDashboard = () => {
    switch (current.company) {
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
  };

  return (
    <section id="experience" className="py-24 px-6 relative bg-zinc-50/50 dark:bg-zinc-900/10 overflow-hidden">
      {/* Background radial accent */}
      <div className="absolute top-1/3 right-1/4 w-[400px] h-[400px] bg-gradient-to-r from-blue-500/5 to-purple-500/5 rounded-full blur-[100px] pointer-events-none" />

      <div className="max-w-5xl mx-auto relative z-10">
        
        {/* Header Section */}
        <div className="mb-14">
          <SectionLabel>Experience</SectionLabel>
          <h2 className="text-3xl md:text-4xl font-bold text-zinc-900 dark:text-zinc-100 mt-3 mb-2">
            Where I&apos;ve Worked
          </h2>
          <p className="text-sm text-zinc-500 dark:text-zinc-400 max-w-xl">
            Professional track building core engines, LLM pipelines, scaling databases, and processing financial tickers.
          </p>
        </div>

        {/* INTERACTIVE EXPERIENCE WORKSPACE SWITCHER */}
        <div className="grid md:grid-cols-12 gap-8 items-start">
          
          {/* Left Vertical Brand Tabs Switcher (4 cols) */}
          <div className="md:col-span-4 flex md:flex-col overflow-x-auto md:overflow-x-visible gap-2 pb-4 md:pb-0 select-none scrollbar-none">
            {experiences.map((exp, idx) => {
              const isActive = idx === activeTab;
              return (
                <button
                  key={idx}
                  onClick={() => setActiveTab(idx)}
                  className={`flex-shrink-0 md:flex-shrink-1 text-left px-5 py-4 rounded-2xl border transition-all duration-300 flex items-center justify-between group ${
                    isActive
                      ? "bg-white dark:bg-zinc-900 border-zinc-200 dark:border-zinc-800 shadow-md shadow-zinc-200/50 dark:shadow-none font-semibold text-zinc-900 dark:text-zinc-100"
                      : "bg-transparent border-transparent text-zinc-450 dark:text-zinc-500 hover:text-zinc-700 dark:hover:text-zinc-300 hover:bg-zinc-200/20 dark:hover:bg-zinc-900/20"
                  }`}
                >
                  <div className="flex items-center gap-4.5">
                    {/* Brand bullet block icon */}
                    <div
                      className="w-8 h-8 rounded-lg flex items-center justify-center font-bold text-sm text-white transition-all group-hover:scale-105"
                      style={{
                        backgroundColor: isActive ? exp.color + "22" : "rgba(63, 63, 70, 0.1)",
                        border: isActive ? `1px solid ${exp.color}44` : "1px solid transparent",
                      }}
                    >
                      <span style={{ color: isActive ? exp.color : "gray" }}>{exp.logo}</span>
                    </div>

                    <div className="flex flex-col">
                      <span className="text-sm">{exp.company}</span>
                      <span className="text-[10px] text-zinc-400 font-mono font-medium hidden md:inline-block">
                        {exp.period.split("–")[0]}
                      </span>
                    </div>
                  </div>

                  {/* Active pulsing color dot indicator */}
                  {isActive && (
                    <span
                      className="w-2.5 h-2.5 rounded-full animate-pulse mr-1 hidden md:block"
                      style={{ backgroundColor: exp.color }}
                    />
                  )}
                </button>
              );
            })}
          </div>

          {/* Right Details Panel (8 cols) */}
          <div className="md:col-span-8 flex flex-col gap-6">
            
            {/* Main Company details Card */}
            <div className="bg-white dark:bg-zinc-900/60 border border-zinc-200 dark:border-zinc-800/80 rounded-3xl p-6 md:p-8 hover:border-zinc-300 dark:hover:border-zinc-700 shadow-xl shadow-zinc-200/30 dark:shadow-black/20 flex flex-col gap-6 transition-all duration-300">
              
              {/* Details header */}
              <div className="flex flex-wrap items-start justify-between gap-4 border-b border-zinc-150 dark:border-zinc-800/60 pb-6">
                <div>
                  <h3 className="text-xl font-bold text-zinc-900 dark:text-zinc-100 leading-tight">
                    {current.role}
                  </h3>
                  <div className="flex items-center gap-2 mt-1.5">
                    <span className="text-sm font-semibold text-zinc-650 dark:text-zinc-350">{current.company}</span>
                    <span className="text-zinc-300 dark:text-zinc-700 font-bold">·</span>
                    <span className="text-xs text-zinc-400 font-mono font-medium">{current.location}</span>
                  </div>
                </div>

                <span
                  className="text-xs font-mono font-bold px-3.5 py-1 rounded-full border"
                  style={{
                    backgroundColor: current.color + "11",
                    color: current.color,
                    borderColor: current.color + "33",
                  }}
                >
                  {current.period}
                </span>
              </div>

              {/* Dynamic SVGs Mock Dashboards */}
              {renderDashboard()}

              {/* Bullet highlights list */}
              <div className="flex flex-col gap-4 mt-2">
                <span className="text-[10px] font-mono tracking-widest text-zinc-400 dark:text-zinc-500 uppercase">
                  Execution Accomplishments
                </span>
                <ul className="space-y-4">
                  {current.highlights.map((h, j) => (
                    <li key={j} className="flex gap-4.5 text-zinc-600 dark:text-zinc-400 text-sm leading-relaxed">
                      {/* Brand-accented glowing bullet node */}
                      <span
                        className="mt-2 w-2 h-2 rounded-full flex-shrink-0 animate-pulse"
                        style={{
                          backgroundColor: current.color,
                          boxShadow: `0 0 10px ${current.color}`,
                        }}
                      />
                      <p className="flex-1">{h}</p>
                    </li>
                  ))}
                </ul>
              </div>

            </div>

          </div>

        </div>

      </div>
    </section>
  );
}

function SectionLabel({ children }: { children: string }) {
  return (
    <div className="flex items-center gap-3 mb-1">
      <span className="text-blue-500 text-sm font-mono">{"// "}</span>
      <span className="text-blue-500 dark:text-blue-400 text-sm font-semibold uppercase tracking-widest">
        {children}
      </span>
    </div>
  );
}
