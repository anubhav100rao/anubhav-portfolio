import { personalInfo } from "@/lib/data";

export default function Contact() {
  const links = [
    {
      label: "GitHub",
      href: personalInfo.github,
      description: "See my code & projects",
      icon: <GithubIcon />,
      color: "#e5e7eb",
    },
    {
      label: "LinkedIn",
      href: personalInfo.linkedin,
      description: "Connect professionally",
      icon: <LinkedInIcon />,
      color: "#0077b5",
    },
    {
      label: "Email",
      href: `mailto:${personalInfo.email}`,
      description: personalInfo.email,
      icon: <MailIcon />,
      color: "#3b82f6",
    },
    {
      label: "Resume",
      href: personalInfo.resumeUrl,
      description: "View full resume (PDF)",
      icon: <DocumentIcon />,
      color: "#10b981",
    },
  ];

  return (
    <section id="contact" className="py-24 px-6">
      <div className="max-w-5xl mx-auto">
        <SectionLabel>Contact</SectionLabel>
        <h2 className="text-3xl md:text-4xl font-bold text-zinc-100 mt-3 mb-4">
          Let&apos;s Connect
        </h2>
        <p className="text-zinc-400 text-sm mb-12 max-w-lg">
          I&apos;m always open to interesting conversations — whether it&apos;s a new role, a project
          idea, or just saying hi.
        </p>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-16">
          {links.map((link) => (
            <a
              key={link.label}
              href={link.href}
              target={link.href.startsWith("mailto") ? undefined : "_blank"}
              rel="noopener noreferrer"
              className="group bg-zinc-900 border border-zinc-800 rounded-2xl p-5 hover:border-zinc-700 transition-all duration-200 hover:shadow-lg hover:shadow-black/30"
            >
              <div
                className="w-10 h-10 rounded-xl flex items-center justify-center mb-4 transition-transform group-hover:scale-110"
                style={{ backgroundColor: link.color + "20", color: link.color }}
              >
                {link.icon}
              </div>
              <p className="text-zinc-100 font-semibold text-sm mb-1">{link.label}</p>
              <p className="text-zinc-500 text-xs leading-relaxed">{link.description}</p>
            </a>
          ))}
        </div>

        {/* CTA */}
        <div className="bg-gradient-to-r from-blue-600/10 to-purple-600/10 border border-zinc-800 rounded-2xl p-8 text-center">
          <h3 className="text-xl font-bold text-zinc-100 mb-2">
            Want to work together?
          </h3>
          <p className="text-zinc-400 text-sm mb-6">
            I&apos;m currently at Coinbase but always open to hearing about exciting opportunities.
          </p>
          <a
            href={`mailto:${personalInfo.email}`}
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-medium text-sm transition-all hover:scale-105"
          >
            <MailIcon />
            Send me an email
          </a>
        </div>
      </div>
    </section>
  );
}

function SectionLabel({ children }: { children: string }) {
  return (
    <div className="flex items-center gap-3">
      <span className="text-blue-500 text-sm font-mono">{"// "}</span>
      <span className="text-blue-400 text-sm font-semibold uppercase tracking-widest">
        {children}
      </span>
    </div>
  );
}

function GithubIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12z" />
    </svg>
  );
}

function LinkedInIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
    </svg>
  );
}

function MailIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <rect width="20" height="16" x="2" y="4" rx="2" />
      <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
    </svg>
  );
}

function DocumentIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z" />
      <polyline points="14 2 14 8 20 8" />
      <line x1="16" x2="8" y1="13" y2="13" />
      <line x1="16" x2="8" y1="17" y2="17" />
      <line x1="10" x2="8" y1="9" y2="9" />
    </svg>
  );
}
