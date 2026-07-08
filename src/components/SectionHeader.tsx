import FadeIn from "@/components/FadeIn";

type Props = {
  label: string;
  title: string;
  /** Final word(s) of the title rendered with an animated gradient */
  accent?: string;
  subtitle?: string;
};

export default function SectionHeader({ label, title, accent, subtitle }: Props) {
  return (
    <div className="mb-14">
      <FadeIn direction="left">
        <div className="inline-flex items-center gap-2.5 px-3.5 py-1.5 rounded-full border border-blue-200/60 dark:border-blue-900/40 bg-blue-50/60 dark:bg-blue-950/20 mb-4">
          <span className="relative flex h-1.5 w-1.5">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75" />
            <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-gradient-to-r from-blue-500 to-violet-500" />
          </span>
          <span className="text-blue-600 dark:text-blue-400 text-[11px] font-mono font-bold uppercase tracking-[0.22em]">
            {label}
          </span>
        </div>
      </FadeIn>

      <FadeIn delay={0.05}>
        <h2 className="text-3xl md:text-5xl font-bold tracking-tight text-zinc-900 dark:text-zinc-100 mb-3">
          {title}
          {accent && (
            <>
              {" "}
              <span className="animate-gradient-x text-transparent bg-clip-text bg-gradient-to-r from-blue-500 via-violet-500 to-cyan-500">
                {accent}
              </span>
            </>
          )}
        </h2>
      </FadeIn>

      {subtitle && (
        <FadeIn delay={0.1}>
          <p className="text-zinc-500 dark:text-zinc-400 text-sm md:text-base max-w-xl leading-relaxed">
            {subtitle}
          </p>
        </FadeIn>
      )}

      <FadeIn delay={0.15}>
        <div className="animate-gradient-x mt-6 h-1 w-24 rounded-full bg-gradient-to-r from-blue-500 via-violet-500 to-cyan-500" />
      </FadeIn>
    </div>
  );
}
