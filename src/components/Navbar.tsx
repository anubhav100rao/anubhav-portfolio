"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import ThemeToggle from "./ThemeToggle";

const navLinks = [
  { label: "About", href: "#about" },
  { label: "CodeTraces", href: "#codetraces" },
  { label: "Experience", href: "#experience" },
  { label: "Projects", href: "#projects" },
  { label: "Skills", href: "#skills" },
  { label: "Blog", href: "/blog" },
  { label: "Cover Letter", href: "/cover-letter" },
  { label: "Contact", href: "#contact" },
];

const SECTION_IDS = ["hero", "about", "codetraces", "experience", "projects", "skills", "blog", "contact"];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("");

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Scroll-spy: track which section is in view
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      { rootMargin: "-40% 0px -55% 0px", threshold: 0 }
    );

    SECTION_IDS.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  const isActive = (href: string) => {
    if (href.startsWith("/")) return false; // never highlight external routes on homepage
    return `#${activeSection}` === href;
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 md:top-4 px-4 w-full transition-all duration-300">
      <div
        className={`max-w-5xl mx-auto rounded-2xl md:rounded-full transition-all duration-300 flex items-center justify-end md:justify-center ${
          scrolled
            ? "glass-panel py-2 px-6 shadow-xl shadow-zinc-150/10 dark:shadow-black/30"
            : "bg-transparent py-4 px-6 border border-transparent"
        }`}
      >
        {/* Desktop nav */}
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) =>
            link.href.startsWith("/") ? (
              <Link
                key={link.href}
                href={link.href}
                className="text-sm font-medium text-zinc-500 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-100 transition-colors"
              >
                {link.label}
              </Link>
            ) : (
              <a
                key={link.href}
                href={link.href}
                className={`text-sm font-medium transition-colors relative py-1 ${
                  isActive(link.href)
                    ? "text-zinc-900 dark:text-zinc-100"
                    : "text-zinc-500 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-100"
                }`}
              >
                {link.label}
                {isActive(link.href) && (
                  <span className="absolute -bottom-1 left-1 right-1 h-[2px] bg-blue-500 rounded-full" />
                )}
              </a>
            )
          )}
          <a
            href="https://drive.google.com/file/d/1nhTYvt1FnTJ6nMsw7eqvgBLDrxiC7Ydy/view?usp=sharing"
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm px-4.5 py-2 rounded-full bg-blue-600 hover:bg-blue-500 text-white font-medium shadow-md shadow-blue-500/20 hover:shadow-blue-500/30 transition-all hover:scale-105"
          >
            Resume
          </a>
          <ThemeToggle />
        </div>

        {/* Mobile hamburger */}
        <div className="flex md:hidden items-center gap-2">
          <ThemeToggle />
          <button
            className="text-zinc-500 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-100 transition-colors p-1"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle menu"
          >
            <div className="w-5 flex flex-col gap-1">
              <span className={`h-0.5 bg-current transition-all duration-205 ${menuOpen ? "rotate-45 translate-y-1.5" : ""}`} />
              <span className={`h-0.5 bg-current transition-all duration-205 ${menuOpen ? "opacity-0" : ""}`} />
              <span className={`h-0.5 bg-current transition-all duration-205 ${menuOpen ? "-rotate-45 -translate-y-1.5" : ""}`} />
            </div>
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <div className="md:hidden mt-2 rounded-2xl glass-panel px-6 py-4 flex flex-col gap-4 shadow-xl border border-zinc-200/50 dark:border-zinc-800/40">
          {navLinks.map((link) =>
            link.href.startsWith("/") ? (
              <Link
                key={link.href}
                href={link.href}
                className="text-zinc-600 dark:text-zinc-300 hover:text-zinc-900 dark:hover:text-zinc-100 transition-colors text-sm font-semibold"
                onClick={() => setMenuOpen(false)}
              >
                {link.label}
              </Link>
            ) : (
              <a
                key={link.href}
                href={link.href}
                className={`text-sm font-semibold transition-colors ${
                  isActive(link.href) ? "text-blue-500 dark:text-blue-400" : "text-zinc-600 dark:text-zinc-300 hover:text-zinc-900 dark:hover:text-zinc-100"
                }`}
                onClick={() => setMenuOpen(false)}
              >
                {link.label}
              </a>
            )
          )}
          <a
            href="https://drive.google.com/file/d/1nhTYvt1FnTJ6nMsw7eqvgBLDrxiC7Ydy/view?usp=sharing"
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm py-2 px-4 rounded-xl bg-blue-600 text-white font-medium text-center shadow-md shadow-blue-500/20"
            onClick={() => setMenuOpen(false)}
          >
            Resume
          </a>
        </div>
      )}
    </nav>
  );
}
