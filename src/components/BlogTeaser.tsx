import Link from "next/link";
import { getAllPostsMeta, formatDate } from "@/lib/posts";

function parseReadTimeMinutes(readTime: string): number {
  const minutes = Number.parseInt(readTime, 10);
  return Number.isNaN(minutes) ? 0 : minutes;
}

export default function BlogTeaser() {
  const allPosts = getAllPostsMeta();
  const featuredPost = allPosts[0];
  const recentPosts = allPosts.slice(1, 4);

  if (!featuredPost) return null;

  const totalMinutes = allPosts.reduce(
    (sum, post) => sum + parseReadTimeMinutes(post.readTime),
    0
  );
  const totalTopics = new Set(allPosts.flatMap((post) => post.tags)).size;

  return (
    <section id="blog" className="py-24 px-6">
      <div className="max-w-6xl mx-auto">
        <div className="flex items-end justify-between mb-12 gap-6">
          <div>
            <div className="flex items-center gap-3 mb-3">
              <span className="text-blue-500 text-sm font-mono">{"// "}</span>
              <span className="text-blue-400 text-sm font-semibold uppercase tracking-widest">
                Detailed Blog
              </span>
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-zinc-100">
              Deep Technical Writing
            </h2>
            <p className="text-zinc-400 text-sm md:text-base mt-3 max-w-2xl leading-relaxed">
              Long-form engineering breakdowns with architecture maps, design tradeoffs,
              incident workflows, and implementation details from projects I build end-to-end.
            </p>
          </div>

          <Link
            href="/blog"
            className="hidden sm:inline-flex items-center gap-2 text-sm text-zinc-400 hover:text-zinc-100 transition-colors"
          >
            All posts
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="m9 18 6-6-6-6" />
            </svg>
          </Link>
        </div>

        <div className="grid lg:grid-cols-12 gap-6 mb-6">
          <Link
            href={`/blog/${featuredPost.slug}`}
            className="lg:col-span-8 group bg-zinc-900 border border-zinc-800 rounded-2xl p-7 hover:border-zinc-700 transition-all duration-200 hover:shadow-xl hover:shadow-black/30"
          >
            <div className="flex flex-wrap items-center gap-3 mb-4">
              <span className="text-[11px] font-semibold uppercase tracking-widest text-blue-300 bg-blue-500/15 border border-blue-500/40 px-2.5 py-1 rounded-md">
                Featured deep dive
              </span>
              <time className="text-xs text-zinc-500 font-mono">
                {formatDate(featuredPost.date)}
              </time>
              <span className="text-zinc-700 text-xs">·</span>
              <span className="text-xs text-zinc-500">{featuredPost.readTime} read</span>
            </div>

            <h3 className="text-2xl md:text-3xl font-semibold text-zinc-100 mb-3 leading-tight group-hover:text-blue-400 transition-colors">
              {featuredPost.title}
            </h3>

            <p className="text-zinc-400 text-sm md:text-base leading-relaxed mb-6 max-w-3xl">
              {featuredPost.description}
            </p>

            <div className="flex flex-wrap gap-2 mb-6">
              {featuredPost.tags.map((tag) => (
                <span
                  key={tag}
                  className="text-xs font-mono text-zinc-300 bg-zinc-800 border border-zinc-700 px-2.5 py-1 rounded-md"
                >
                  {tag}
                </span>
              ))}
            </div>

            <div className="grid sm:grid-cols-3 gap-3">
              <InfoTile label="Total posts" value={`${allPosts.length}`} />
              <InfoTile label="Reading minutes" value={`${totalMinutes}+`} />
              <InfoTile label="Distinct topics" value={`${totalTopics}`} />
            </div>
          </Link>

          <div className="lg:col-span-4 bg-zinc-900 border border-zinc-800 rounded-2xl p-6">
            <h4 className="text-zinc-100 font-semibold text-base mb-4">What to expect</h4>
            <ul className="space-y-3 text-sm text-zinc-400 leading-relaxed">
              <li className="flex gap-3">
                <span className="text-blue-400">01</span>
                Architecture and protocol-level explanations, not just project summaries.
              </li>
              <li className="flex gap-3">
                <span className="text-blue-400">02</span>
                Failure modes, safety constraints, and operator workflow details.
              </li>
              <li className="flex gap-3">
                <span className="text-blue-400">03</span>
                Implementation snippets, design tradeoffs, and test strategy.
              </li>
            </ul>

            <div className="mt-6 pt-5 border-t border-zinc-800">
              <Link
                href={`/blog/${featuredPost.slug}`}
                className="inline-flex items-center gap-2 text-sm text-blue-300 hover:text-blue-200 transition-colors"
              >
                Read featured article
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="m9 18 6-6-6-6" />
                </svg>
              </Link>
            </div>
          </div>
        </div>

        {recentPosts.length > 0 && (
          <div className="grid md:grid-cols-3 gap-6">
            {recentPosts.map((post) => (
              <Link
                key={post.slug}
                href={`/blog/${post.slug}`}
                className="group bg-zinc-900 border border-zinc-800 rounded-2xl p-5 hover:border-zinc-700 transition-all duration-200"
              >
                <div className="flex items-center gap-3 mb-3">
                  <time className="text-xs text-zinc-500 font-mono">{formatDate(post.date)}</time>
                  <span className="text-zinc-700 text-xs">·</span>
                  <span className="text-xs text-zinc-500">{post.readTime} read</span>
                </div>
                <h5 className="text-zinc-100 font-semibold text-base leading-snug mb-2 group-hover:text-blue-400 transition-colors">
                  {post.title}
                </h5>
                <p className="text-zinc-400 text-sm leading-relaxed mb-4 line-clamp-3">
                  {post.description}
                </p>
                <div className="flex flex-wrap gap-2">
                  {post.tags.slice(0, 3).map((tag) => (
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
        )}

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

function InfoTile({ label, value }: { label: string; value: string }) {
  return (
    <div className="bg-zinc-950 border border-zinc-800 rounded-xl px-4 py-3">
      <p className="text-[11px] text-zinc-500 uppercase tracking-wider">{label}</p>
      <p className="text-zinc-100 text-lg font-semibold mt-1">{value}</p>
    </div>
  );
}
