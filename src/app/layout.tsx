import type { Metadata } from "next";
import { Inter } from "next/font/google";
import ThemeProvider from "@/components/ThemeProvider";
import "./globals.css";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });

export const metadata: Metadata = {
  title: "Anubhav Kumar Rao — Software Engineer",
  description:
    "Software Engineer at Coinbase. Previously at D.E. Shaw & Rubrik. IIIT Allahabad. Building systems at scale — distributed databases, LLM platforms, and financial infrastructure.",
  keywords: [
    "Anubhav Kumar Rao",
    "Software Engineer",
    "Coinbase",
    "D.E. Shaw",
    "IIIT Allahabad",
    "Portfolio",
    "Full Stack",
    "Distributed Systems",
    "LLM",
  ],
  authors: [{ name: "Anubhav Kumar Rao" }],
  openGraph: {
    title: "Anubhav Kumar Rao — Software Engineer",
    description:
      "Software Engineer at Coinbase. Previously at D.E. Shaw & Rubrik. Building systems at scale.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={inter.variable} suppressHydrationWarning>
      <body className="bg-white dark:bg-zinc-950 text-zinc-900 dark:text-zinc-100 font-sans antialiased">
        <ThemeProvider>{children}</ThemeProvider>
      </body>
    </html>
  );
}
