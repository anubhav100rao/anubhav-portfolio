import Link from "next/link";
import type { Metadata } from "next";
import ThemeToggle from "@/components/ThemeToggle";
import { Download, ArrowLeft, Mail, Linkedin, Github, Globe } from "lucide-react";

export const metadata: Metadata = {
  title: "Cover Letter — Anubhav Kumar Rao",
  description:
    "Cover letter from Anubhav Kumar Rao — Software Engineer at Coinbase, previously at D.E. Shaw & Rubrik.",
};

const paragraphs = [
  `I'm writing to express my interest in a role on your engineering team. As a software engineer currently at Coinbase — where I'm expanding regulated crypto derivatives trading to the UK and EU and building LLM-powered platforms that have cut support costs by millions annually — I bring a blend of large-scale systems experience, applied AI skills, and first-principles engineering depth.`,
  `My career has been shaped around systems that operate under real constraints. At D.E. Shaw & Co., I built time-series infrastructure serving 13M+ financial instruments and integrated RAG-based semantic search into quant workflows. At Rubrik, I scaled cloud backup from 8TB to 32TB and designed multi-cloud reporting frameworks adopted across all engineering teams. These roles taught me to think in correctness guarantees, latency budgets, and failure modes — not just feature delivery.`,
  `What sets me apart is a habit of building well below the abstraction layer I work on. I've written a transactional database engine from scratch (LSM Trees, MVCC, WAL — 10K+ TPS), a 32-bit x86 operating system in C and assembly, a real-time Raft consensus visualizer, a CRDT-based collaborative editor, and a 6-agent SRE swarm over NATS JetStream that autonomously detects and remediates infrastructure incidents. These aren't side curiosities — they directly inform how I design production systems.`,
  `I also bring strong algorithmic foundations: LeetCode Guardian (top 0.37% globally), Codeforces Expert, and 5-star on CodeChef. Beyond competing, I serve as a rated contest tester for LeetCode and a problem setter on Codeforces, CodeChef, and HackerEarth — sharpening my ability to evaluate trade-offs quickly and communicate technical ideas clearly.`,
  `I'd welcome the opportunity to discuss how my background aligns with what you're building. Thank you for your time and consideration.`,
];

const contactLinks = [
  {
    icon: Mail,
    label: "anubhav100rao@gmail.com",
    href: "mailto:anubhav100rao@gmail.com",
  },
  {
    icon: Linkedin,
    label: "linkedin.com/in/anubhav100rao",
    href: "https://linkedin.com/in/anubhav100rao",
  },
  {
    icon: Github,
    label: "github.com/anubhav100rao",
    href: "https://github.com/anubhav100rao",
  },
  {
    icon: Globe,
    label: "anubhav-portfolio-kappa.vercel.app",
    href: "https://anubhav-portfolio-kappa.vercel.app",
  },
];

export default function CoverLetterPage() {
  return (
    <div className="min-h-screen bg-white dark:bg-zinc-950">
      {/* Navbar */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-white/90 dark:bg-zinc-950/90 backdrop-blur-md border-b border-zinc-200/60 dark:border-zinc-800/60">
        <div className="max-w-3xl mx-auto px-6 py-4 flex items-center justify-between">
          <Link
            href="/"
            className="flex items-center gap-2 text-zinc-500 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-100 transition-colors text-sm"
          >
            <ArrowLeft size={16} />
            Back to Portfolio
          </Link>
          <div className="flex items-center gap-3">
            <Link
              href="/"
              className="text-zinc-900 dark:text-zinc-100 font-semibold text-lg tracking-tight hover:text-blue-400 transition-colors"
            >
              AKR<span className="text-blue-500">.</span>
            </Link>
            <ThemeToggle />
          </div>
        </div>
      </nav>

      <main className="max-w-3xl mx-auto px-6 pt-32 pb-24">
        {/* Header */}
        <div className="mb-10">
          <div className="flex items-center gap-3 mb-4">
            <span className="text-blue-500 text-sm font-mono">{"// "}</span>
            <span className="text-blue-500 dark:text-blue-400 text-sm font-semibold uppercase tracking-widest">
              Cover Letter
            </span>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-zinc-900 dark:text-zinc-100 mb-4">
            Cover Letter
          </h1>
          <p className="text-zinc-500 dark:text-zinc-400 text-base leading-relaxed max-w-xl">
            A brief introduction to my engineering background, what drives me, and how I think about building systems.
          </p>

          {/* Download button */}
          <a
            href="/Anubhav_Kumar_Rao_Cover_Letter.pdf"
            download
            className="inline-flex items-center gap-2 mt-6 px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-medium text-sm transition-all hover:scale-105"
          >
            <Download size={16} />
            Download PDF
          </a>
        </div>

        {/* Letter card */}
        <article className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-2xl p-8 md:p-10 shadow-sm dark:shadow-none">
          {/* Letterhead */}
          <header className="mb-8 pb-6 border-b border-zinc-200 dark:border-zinc-800">
            <h2 className="text-2xl font-bold text-zinc-900 dark:text-zinc-100 mb-1">
              Anubhav Kumar Rao
            </h2>
            <p className="text-zinc-500 dark:text-zinc-400 text-sm mb-4">
              Software Engineer
            </p>
            <div className="flex flex-wrap gap-x-5 gap-y-2">
              {contactLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  target={link.href.startsWith("mailto") ? undefined : "_blank"}
                  rel="noopener noreferrer"
                  className="flex items-center gap-1.5 text-xs text-zinc-500 dark:text-zinc-400 hover:text-blue-500 dark:hover:text-blue-400 transition-colors"
                >
                  <link.icon size={13} />
                  {link.label}
                </a>
              ))}
            </div>
          </header>

          {/* Body */}
          <div className="space-y-5">
            <p className="text-zinc-600 dark:text-zinc-400 text-[15px] leading-relaxed">
              Dear Team,
            </p>

            {paragraphs.map((text, i) => (
              <p
                key={i}
                className="text-zinc-600 dark:text-zinc-400 text-[15px] leading-[1.8]"
              >
                {text}
              </p>
            ))}

            {/* Sign-off */}
            <div className="pt-4">
              <p className="text-zinc-600 dark:text-zinc-400 text-[15px]">
                Warm regards,
              </p>
              <p className="text-zinc-900 dark:text-zinc-100 font-semibold text-[15px] mt-1">
                Anubhav Kumar Rao
              </p>
            </div>
          </div>
        </article>

        {/* Bottom download CTA */}
        <div className="mt-10 bg-gradient-to-r from-blue-600/10 to-purple-600/10 border border-zinc-200 dark:border-zinc-800 rounded-2xl p-8 text-center">
          <h3 className="text-lg font-bold text-zinc-900 dark:text-zinc-100 mb-2">
            Want a copy?
          </h3>
          <p className="text-zinc-500 dark:text-zinc-400 text-sm mb-5">
            Download the cover letter as a formatted PDF.
          </p>
          <a
            href="/Anubhav_Kumar_Rao_Cover_Letter.pdf"
            download
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-medium text-sm transition-all hover:scale-105"
          >
            <Download size={16} />
            Download Cover Letter PDF
          </a>
        </div>

        {/* Footer note */}
        <div className="mt-16 pt-8 border-t border-zinc-200/60 dark:border-zinc-800/60 text-center">
          <p className="text-xs text-zinc-400 dark:text-zinc-600">
            <Link href="/" className="hover:text-blue-500 transition-colors">
              Back to portfolio
            </Link>{" "}
            ·{" "}
            <Link href="/blog" className="hover:text-blue-500 transition-colors">
              Read the blog
            </Link>
          </p>
        </div>
      </main>
    </div>
  );
}
