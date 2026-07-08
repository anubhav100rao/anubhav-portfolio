/**
 * Fixed full-page ambient layer: slow-drifting aurora orbs + film grain.
 * Sits behind all content; sections keep semi-transparent backgrounds so
 * the color bleeds through subtly as you scroll.
 */
export default function AmbientBackground() {
  return (
    <div className="fixed inset-0 -z-10 overflow-hidden pointer-events-none" aria-hidden="true">
      {/* Soft vertical tint */}
      <div className="absolute inset-0 bg-gradient-to-b from-blue-50/40 via-transparent to-violet-50/30 dark:from-blue-950/20 dark:via-transparent dark:to-violet-950/15" />

      {/* Aurora orbs */}
      <div
        className="animate-blob absolute -top-[15%] -left-[10%] w-[55vw] h-[55vw] rounded-full bg-blue-500/[0.06] dark:bg-blue-500/[0.08] blur-3xl"
        style={{ animationDuration: "26s" }}
      />
      <div
        className="animate-blob absolute top-[30%] -right-[15%] w-[50vw] h-[50vw] rounded-full bg-violet-500/[0.05] dark:bg-violet-500/[0.07] blur-3xl"
        style={{ animationDuration: "32s", animationDelay: "-9s" }}
      />
      <div
        className="animate-blob absolute -bottom-[20%] left-[20%] w-[60vw] h-[60vw] rounded-full bg-cyan-500/[0.05] dark:bg-cyan-500/[0.06] blur-3xl"
        style={{ animationDuration: "29s", animationDelay: "-18s" }}
      />

      {/* Film grain */}
      <div
        className="absolute inset-0 opacity-[0.15] dark:opacity-[0.12] mix-blend-overlay"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='140' height='140'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.35'/%3E%3C/svg%3E")`,
        }}
      />
    </div>
  );
}
