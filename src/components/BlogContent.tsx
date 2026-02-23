"use client";

import { useEffect } from "react";

/**
 * Client wrapper around rendered markdown HTML.
 * Injects copy-to-clipboard buttons into every <pre> code block.
 */
export default function BlogContent({ html }: { html: string }) {
  useEffect(() => {
    const pres = document.querySelectorAll<HTMLPreElement>(".prose-content pre");

    pres.forEach((pre) => {
      // Avoid double-injection on HMR
      if (pre.querySelector(".copy-btn")) return;

      const btn = document.createElement("button");
      btn.className = "copy-btn";
      btn.setAttribute("aria-label", "Copy code");
      btn.innerHTML = `<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
        <rect width="14" height="14" x="8" y="8" rx="2" ry="2"/>
        <path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2"/>
      </svg>`;

      btn.addEventListener("click", async () => {
        const code = pre.querySelector("code")?.innerText ?? "";
        await navigator.clipboard.writeText(code);
        btn.innerHTML = `<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#4ade80" stroke-width="2.5">
          <polyline points="20 6 9 17 4 12"/>
        </svg>`;
        setTimeout(() => {
          btn.innerHTML = `<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <rect width="14" height="14" x="8" y="8" rx="2" ry="2"/>
            <path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2"/>
          </svg>`;
        }, 2000);
      });

      pre.style.position = "relative";
      pre.appendChild(btn);
    });
  }, []);

  return (
    <div
      className="prose-content"
      dangerouslySetInnerHTML={{ __html: html }}
    />
  );
}
