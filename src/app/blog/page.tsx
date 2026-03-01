import Link from "next/link";
import { getAllPostsMeta } from "@/lib/posts";
import type { Metadata } from "next";
import BlogListClient from "@/components/BlogListClient";

export const metadata: Metadata = {
  title: "Blog — Anubhav Kumar Rao",
  description:
    "Writing about distributed systems, database internals, LLMs, and software engineering.",
};

export default function BlogPage() {
  const posts = getAllPostsMeta();

  return (
    <div className="min-h-screen bg-zinc-950">
      {/* Blog Navbar */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-zinc-950/90 backdrop-blur-md border-b border-zinc-800/60">
        <div className="max-w-3xl mx-auto px-6 py-4 flex items-center justify-between">
          <Link
            href="/"
            className="flex items-center gap-2 text-zinc-400 hover:text-zinc-100 transition-colors text-sm"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="m15 18-6-6 6-6" />
            </svg>
            Back to Portfolio
          </Link>
          <Link
            href="/"
            className="text-zinc-100 font-semibold text-lg tracking-tight hover:text-blue-400 transition-colors"
          >
            AKR<span className="text-blue-500">.</span>
          </Link>
        </div>
      </nav>

      <main className="max-w-3xl mx-auto px-6 pt-32 pb-24">
        {/* Header */}
        <div className="mb-14">
          <div className="flex items-center gap-3 mb-4">
            <span className="text-blue-500 text-sm font-mono">{"// "}</span>
            <span className="text-blue-400 text-sm font-semibold uppercase tracking-widest">
              Blog
            </span>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-zinc-100 mb-4">
            Writing
          </h1>
          <p className="text-zinc-400 text-base leading-relaxed max-w-xl">
            Deep dives into distributed systems, database internals, LLMs, and things I build. I write when I feel like I&apos;ve understood something well enough to explain it.
          </p>
        </div>

        {/* Post list */}
        {posts.length === 0 ? (
          <div className="text-center py-20 text-zinc-600">
            <p className="text-lg">No posts yet — check back soon.</p>
          </div>
        ) : (
          <BlogListClient posts={posts} />
        )}

        {/* Footer note */}
        <div className="mt-16 pt-8 border-t border-zinc-800/60 text-center">
          <p className="text-xs text-zinc-600">
            Written in Markdown · Rendered with{" "}
            <span className="font-mono">remark + rehype-pretty-code</span> · Deployed on Vercel
          </p>
        </div>
      </main>
    </div>
  );
}
