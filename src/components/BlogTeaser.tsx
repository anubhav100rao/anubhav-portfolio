import Link from "next/link";
import { getAllPostsMeta, formatDate } from "@/lib/posts";

export default function BlogTeaser() {
  const posts = getAllPostsMeta().slice(0, 2); // show 2 most recent

  if (posts.length === 0) return null;

  return (
    <section id="blog" className="py-24 px-6">
      <div className="max-w-5xl mx-auto">
        <div className="flex items-end justify-between mb-12">
          <div>
            <div className="flex items-center gap-3 mb-3">
              <span className="text-blue-500 text-sm font-mono">{"// "}</span>
              <span className="text-blue-400 text-sm font-semibold uppercase tracking-widest">
                Blog
              </span>
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-zinc-100">
              Recent Writing
            </h2>
          </div>
          <Link
            href="/blog"
            className="hidden sm:flex items-center gap-2 text-sm text-zinc-400 hover:text-zinc-100 transition-colors"
          >
            All posts
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="m9 18 6-6-6-6" />
            </svg>
          </Link>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          {posts.map((post) => (
            <Link
              key={post.slug}
              href={`/blog/${post.slug}`}
              className="group bg-zinc-900 border border-zinc-800 rounded-2xl p-6 hover:border-zinc-700 transition-all duration-200 hover:shadow-xl hover:shadow-black/30 flex flex-col"
            >
              {/* Meta */}
              <div className="flex items-center gap-3 mb-3">
                <time className="text-xs text-zinc-500 font-mono">
                  {formatDate(post.date)}
                </time>
                <span className="text-zinc-700 text-xs">·</span>
                <span className="text-xs text-zinc-500">{post.readTime} read</span>
              </div>

              {/* Title */}
              <h3 className="text-zinc-100 font-semibold text-base leading-snug mb-2 group-hover:text-blue-400 transition-colors">
                {post.title}
              </h3>

              {/* Description */}
              <p className="text-zinc-400 text-sm leading-relaxed flex-1 mb-4 line-clamp-3">
                {post.description}
              </p>

              {/* Tags */}
              <div className="flex flex-wrap gap-2">
                {post.tags.slice(0, 4).map((tag) => (
                  <span
                    key={tag}
                    className="text-xs font-mono text-zinc-500 bg-zinc-800 border border-zinc-700 px-2 py-0.5 rounded-md"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </Link>
          ))}
        </div>

        {/* Mobile "all posts" link */}
        <div className="mt-8 sm:hidden text-center">
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 text-sm text-zinc-400 hover:text-zinc-100 transition-colors"
          >
            View all posts
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="m9 18 6-6-6-6" />
            </svg>
          </Link>
        </div>
      </div>
    </section>
  );
}
