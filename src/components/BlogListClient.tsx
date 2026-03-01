"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import type { PostMeta } from "@/lib/posts";

function formatDate(dateStr: string): string {
  const date = new Date(dateStr);
  return date.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

type BlogListClientProps = {
  posts: PostMeta[];
};

export default function BlogListClient({ posts }: BlogListClientProps) {
  const [query, setQuery] = useState("");
  const [activeTag, setActiveTag] = useState("All");

  const tags = useMemo(() => {
    const tagSet = new Set<string>();
    posts.forEach((post) => {
      post.tags.forEach((tag) => tagSet.add(tag));
    });
    return ["All", ...Array.from(tagSet).sort((a, b) => a.localeCompare(b))];
  }, [posts]);

  const filteredPosts = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase();

    return posts.filter((post) => {
      const matchesTag = activeTag === "All" || post.tags.includes(activeTag);
      if (!matchesTag) return false;

      if (!normalizedQuery) return true;

      const haystack = `${post.title} ${post.description} ${post.tags.join(" ")}`.toLowerCase();
      return haystack.includes(normalizedQuery);
    });
  }, [posts, query, activeTag]);

  return (
    <>
      <div className="mb-10">
        <label htmlFor="blog-search" className="sr-only">
          Search posts
        </label>
        <input
          id="blog-search"
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search by title, topic, or tag..."
          className="w-full bg-zinc-900 border border-zinc-800 rounded-xl px-4 py-3 text-sm text-zinc-100 placeholder:text-zinc-500 focus:outline-none focus:ring-2 focus:ring-blue-500/40 focus:border-blue-500/60"
        />

        <div className="mt-4 flex flex-wrap gap-2">
          {tags.map((tag) => {
            const selected = tag === activeTag;
            return (
              <button
                key={tag}
                type="button"
                onClick={() => setActiveTag(tag)}
                className={`text-xs font-mono px-3 py-1.5 rounded-md border transition-colors ${selected
                    ? "text-blue-300 bg-blue-500/15 border-blue-500/40"
                    : "text-zinc-500 bg-zinc-900 border-zinc-800 hover:text-zinc-300 hover:border-zinc-700"
                  }`}
              >
                {tag}
              </button>
            );
          })}
        </div>
      </div>

      {filteredPosts.length === 0 ? (
        <div className="text-center py-20 text-zinc-600 border border-zinc-800/60 rounded-2xl">
          <p className="text-lg text-zinc-400">No posts match your filters.</p>
          <p className="text-sm mt-2">Try a different search term or tag.</p>
        </div>
      ) : (
        <div className="divide-y divide-zinc-800/60">
          {filteredPosts.map((post) => (
            <article key={post.slug} className="py-8 group">
              <Link href={`/blog/${post.slug}`} className="block">
                <div className="flex flex-wrap items-center gap-3 mb-3">
                  <time className="text-xs text-zinc-500 font-mono">
                    {formatDate(post.date)}
                  </time>
                  <span className="text-zinc-700">·</span>
                  <span className="text-xs text-zinc-500">{post.readTime} read</span>
                </div>

                <h2 className="text-xl font-semibold text-zinc-100 mb-2 group-hover:text-blue-400 transition-colors leading-snug">
                  {post.title}
                </h2>

                <p className="text-zinc-400 text-sm leading-relaxed mb-4">
                  {post.description}
                </p>

                <div className="flex flex-wrap gap-2">
                  {post.tags.map((tag) => (
                    <span
                      key={tag}
                      className="text-xs font-mono text-zinc-500 bg-zinc-900 border border-zinc-800 px-2.5 py-1 rounded-md"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </Link>
            </article>
          ))}
        </div>
      )}
    </>
  );
}
