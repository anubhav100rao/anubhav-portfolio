import { notFound } from "next/navigation";
import Link from "next/link";
import { getPost, getAllSlugs, formatDate } from "@/lib/posts";
import type { Metadata } from "next";

type Props = { params: Promise<{ slug: string }> };

export async function generateStaticParams() {
  return getAllSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = await getPost(slug);
  if (!post) return {};
  return {
    title: `${post.title} — Anubhav Kumar Rao`,
    description: post.description,
  };
}

export default async function PostPage({ params }: Props) {
  const { slug } = await params;
  const post = await getPost(slug);
  if (!post) notFound();

  return (
    <div className="min-h-screen bg-zinc-950">
      {/* Navbar */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-zinc-950/90 backdrop-blur-md border-b border-zinc-800/60">
        <div className="max-w-3xl mx-auto px-6 py-4 flex items-center justify-between">
          <Link
            href="/blog"
            className="flex items-center gap-2 text-zinc-400 hover:text-zinc-100 transition-colors text-sm"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="m15 18-6-6 6-6" />
            </svg>
            All Posts
          </Link>
          <Link
            href="/"
            className="text-zinc-100 font-semibold text-lg tracking-tight hover:text-blue-400 transition-colors"
          >
            AKR<span className="text-blue-500">.</span>
          </Link>
        </div>
      </nav>

      <main className="max-w-3xl mx-auto px-6 pt-28 pb-24">
        {/* Post header */}
        <header className="mb-10 pb-8 border-b border-zinc-800/60">
          {/* Tags */}
          <div className="flex flex-wrap gap-2 mb-5">
            {post.tags.map((tag) => (
              <span
                key={tag}
                className="text-xs font-mono text-blue-400 bg-blue-500/10 border border-blue-500/20 px-2.5 py-1 rounded-md"
              >
                {tag}
              </span>
            ))}
          </div>

          {/* Title */}
          <h1 className="text-3xl md:text-4xl font-bold text-zinc-100 leading-tight mb-4">
            {post.title}
          </h1>

          {/* Description */}
          <p className="text-zinc-400 text-base leading-relaxed mb-5">
            {post.description}
          </p>

          {/* Meta */}
          <div className="flex items-center gap-4 text-sm text-zinc-500">
            <div className="flex items-center gap-2">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <rect width="18" height="18" x="3" y="4" rx="2" ry="2" />
                <line x1="16" x2="16" y1="2" y2="6" />
                <line x1="8" x2="8" y1="2" y2="6" />
                <line x1="3" x2="21" y1="10" y2="10" />
              </svg>
              <time>{formatDate(post.date)}</time>
            </div>
            <span className="text-zinc-700">·</span>
            <div className="flex items-center gap-2">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="12" cy="12" r="10" />
                <polyline points="12 6 12 12 16 14" />
              </svg>
              <span>{post.readTime} read</span>
            </div>
          </div>
        </header>

        {/* Markdown Content */}
        <div
          className="prose-content"
          dangerouslySetInnerHTML={{ __html: post.content }}
        />

        {/* Footer */}
        <footer className="mt-16 pt-8 border-t border-zinc-800/60 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <Link
            href="/blog"
            className="flex items-center gap-2 text-zinc-400 hover:text-zinc-100 transition-colors text-sm"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="m15 18-6-6 6-6" />
            </svg>
            Back to all posts
          </Link>
          <div className="text-xs text-zinc-600">
            Written by{" "}
            <span className="text-zinc-400 font-medium">Anubhav Kumar Rao</span>
          </div>
        </footer>
      </main>
    </div>
  );
}
