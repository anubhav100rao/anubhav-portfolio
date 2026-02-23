export default function Footer() {
  return (
    <footer className="border-t border-zinc-800/60 py-8 px-6">
      <div className="max-w-5xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-zinc-600">
        <p>
          Built by{" "}
          <span className="text-zinc-400 font-medium">Anubhav Kumar Rao</span> ·{" "}
          <span className="font-mono text-zinc-700">Next.js + Tailwind</span>
        </p>
        <p>{new Date().getFullYear()} · Hosted on Vercel</p>
      </div>
    </footer>
  );
}
