export type TocEntry = {
  id: string;
  text: string;
  level: number; // 2 = h2, 3 = h3
};

/** Extract h2 and h3 headings from rendered HTML */
export function extractToc(html: string): TocEntry[] {
  const headingRegex = /<h([23])[^>]*id="([^"]+)"[^>]*>([\s\S]*?)<\/h[23]>/gi;
  const entries: TocEntry[] = [];
  let match: RegExpExecArray | null;

  while ((match = headingRegex.exec(html)) !== null) {
    const level = parseInt(match[1], 10);
    const id = match[2];
    // Strip inner HTML tags to get plain text
    const text = match[3].replace(/<[^>]+>/g, "").trim();
    if (text) entries.push({ id, text, level });
  }

  return entries;
}
