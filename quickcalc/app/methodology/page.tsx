import React from "react";
import Link from "next/link";
import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Breadcrumbs from "@/components/Breadcrumbs";
import { methodologyData } from "@/lib/methodologyData";
import { ShieldCheck, BookOpen, ArrowRight, ExternalLink } from "lucide-react";

export const metadata: Metadata = {
  title: "Methodology & Scientific Standards | QuickCalc",
  description: "Explore exact mathematical formulas, WHO clinical standards, and financial amortization models powering QuickCalc's 100% client-side privacy-first calculators.",
  alternates: {
    canonical: "/methodology",
  },
  openGraph: {
    title: "Methodology & Scientific Standards | QuickCalc",
    description: "Explore exact mathematical formulas, WHO clinical standards, and financial amortization models powering QuickCalc's 100% client-side privacy-first calculators.",
    url: "https://quickcalc.cloud/methodology",
    type: "website",
    siteName: "QuickCalc",
  },
};

export default function MethodologyPage() {
  const healthTools = methodologyData.filter((m) => m.category === "Health & Fitness");
  const financeTools = methodologyData.filter((m) => m.category === "Finance & Math");
  const utilityTools = methodologyData.filter((m) => m.category === "Utilities & Programming");

  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-zinc-950 text-zinc-900 dark:text-zinc-100 font-[family-name:var(--font-geist-sans)] transition-colors">
      <Navbar />

      <main className="max-w-5xl mx-auto px-4 py-8 sm:py-12 space-y-12">
        <Breadcrumbs toolName="Methodology & Sources" toolSlug="methodology" />

        {/* Hero Section */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-teal-50 dark:bg-teal-950/40 border border-teal-200/50 dark:border-teal-800/50 text-teal-700 dark:text-teal-300 text-xs font-bold">
            <BookOpen size={14} />
            <span>Verifiable Mathematics & Standards</span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-zinc-900 dark:text-white">
            Calculation Methodology & Sources
          </h1>

          <p className="text-base sm:text-lg text-zinc-600 dark:text-zinc-400 leading-relaxed">
            Every tool on QuickCalc is built on published scientific literature, clinical guidelines, and standard financial models. We publish our exact formulas and logic to ensure complete mathematical transparency.
          </p>

          {/* Trust Banner */}
          <div className="pt-4">
            <div className="inline-flex flex-col sm:flex-row items-center justify-center gap-3 p-4 rounded-2xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 shadow-lg text-xs text-zinc-600 dark:text-zinc-400 text-left">
              <div className="w-10 h-10 rounded-xl bg-teal-500/10 border border-teal-500/20 text-teal-600 dark:text-teal-400 flex items-center justify-center shrink-0">
                <ShieldCheck size={22} />
              </div>
              <div>
                <span className="font-bold text-zinc-900 dark:text-white block text-sm">
                  100% Client-Side Privacy & Open Formulas
                </span>
                <span>
                  All calculations run directly inside your browser. No financial data, medical metrics, or personal inputs ever leave your device or touch a server.
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Jump Navigation Index */}
        <div className="bg-white dark:bg-zinc-900 p-6 rounded-2xl border border-zinc-200 dark:border-zinc-800 shadow-sm space-y-4">
          <h2 className="text-sm font-bold uppercase tracking-wider text-zinc-400 dark:text-zinc-500">
            Quick Jump Index ({methodologyData.length} Calculators)
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs font-semibold">
            <a href="#health-fitness" className="p-3 rounded-xl bg-emerald-50/50 dark:bg-emerald-950/20 border border-emerald-200/40 dark:border-emerald-900/40 text-emerald-800 dark:text-emerald-300 flex items-center justify-between hover:bg-emerald-100/50 transition">
              <span>Health & Fitness ({healthTools.length})</span>
              <ArrowRight size={14} />
            </a>
            <a href="#finance-math" className="p-3 rounded-xl bg-indigo-50/50 dark:bg-indigo-950/20 border border-indigo-200/40 dark:border-indigo-900/40 text-indigo-800 dark:text-indigo-300 flex items-center justify-between hover:bg-indigo-100/50 transition">
              <span>Finance & Math ({financeTools.length})</span>
              <ArrowRight size={14} />
            </a>
            <a href="#utilities-programming" className="p-3 rounded-xl bg-teal-50/50 dark:bg-teal-950/20 border border-teal-200/40 dark:border-teal-900/40 text-teal-800 dark:text-teal-300 flex items-center justify-between hover:bg-teal-100/50 transition">
              <span>Utilities & Programming ({utilityTools.length})</span>
              <ArrowRight size={14} />
            </a>
          </div>
        </div>

        {/* Section 1: Health & Fitness */}
        <section id="health-fitness" className="space-y-6">
          <div className="flex items-center gap-3 border-b border-zinc-200 dark:border-zinc-800 pb-3">
            <div className="w-8 h-8 rounded-lg bg-emerald-500/10 border border-emerald-500/20 text-emerald-600 dark:text-emerald-400 flex items-center justify-center font-bold text-sm">
              🏥
            </div>
            <h2 className="text-2xl font-extrabold text-zinc-900 dark:text-white">
              Health & Fitness Methodologies
            </h2>
          </div>

          <div className="grid grid-cols-1 gap-6">
            {healthTools.map((tool) => (
              <div
                key={tool.slug}
                id={tool.slug}
                className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-2xl p-6 shadow-sm space-y-4 scroll-mt-24 transition-colors"
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-zinc-100 dark:border-zinc-800 pb-3">
                  <div>
                    <h3 className="text-lg font-bold text-zinc-900 dark:text-white flex items-center gap-2">
                      <span>{tool.toolName}</span>
                    </h3>
                    <span className="text-xs font-semibold text-emerald-600 dark:text-emerald-400">
                      Standard: {tool.standardName}
                    </span>
                  </div>

                  <Link
                    href={`/tools/${tool.slug}`}
                    className="inline-flex items-center gap-1 text-xs font-bold text-teal-600 dark:text-teal-400 hover:underline shrink-0"
                  >
                    <span>Launch Calculator</span>
                    <ExternalLink size={12} />
                  </Link>
                </div>

                {tool.formulaText && (
                  <div className="bg-zinc-50 dark:bg-zinc-950 p-3 rounded-xl border border-zinc-200/60 dark:border-zinc-800/60 font-mono text-xs text-emerald-700 dark:text-emerald-400 overflow-x-auto">
                    <span className="text-[10px] uppercase tracking-wider font-sans font-bold text-zinc-400 block mb-1">
                      Equation / Formula Model
                    </span>
                    {tool.formulaText}
                  </div>
                )}

                <p className="text-xs sm:text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed">
                  {tool.detailedParagraph}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* Section 2: Finance & Math */}
        <section id="finance-math" className="space-y-6">
          <div className="flex items-center gap-3 border-b border-zinc-200 dark:border-zinc-800 pb-3">
            <div className="w-8 h-8 rounded-lg bg-indigo-500/10 border border-indigo-500/20 text-indigo-600 dark:text-indigo-400 flex items-center justify-center font-bold text-sm">
              💵
            </div>
            <h2 className="text-2xl font-extrabold text-zinc-900 dark:text-white">
              Finance & Mathematics Methodologies
            </h2>
          </div>

          <div className="grid grid-cols-1 gap-6">
            {financeTools.map((tool) => (
              <div
                key={tool.slug}
                id={tool.slug}
                className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-2xl p-6 shadow-sm space-y-4 scroll-mt-24 transition-colors"
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-zinc-100 dark:border-zinc-800 pb-3">
                  <div>
                    <h3 className="text-lg font-bold text-zinc-900 dark:text-white flex items-center gap-2">
                      <span>{tool.toolName}</span>
                    </h3>
                    <span className="text-xs font-semibold text-indigo-600 dark:text-indigo-400">
                      Standard: {tool.standardName}
                    </span>
                  </div>

                  <Link
                    href={`/tools/${tool.slug}`}
                    className="inline-flex items-center gap-1 text-xs font-bold text-teal-600 dark:text-teal-400 hover:underline shrink-0"
                  >
                    <span>Launch Calculator</span>
                    <ExternalLink size={12} />
                  </Link>
                </div>

                {tool.formulaText && (
                  <div className="bg-zinc-50 dark:bg-zinc-950 p-3 rounded-xl border border-zinc-200/60 dark:border-zinc-800/60 font-mono text-xs text-indigo-700 dark:text-indigo-400 overflow-x-auto">
                    <span className="text-[10px] uppercase tracking-wider font-sans font-bold text-zinc-400 block mb-1">
                      Equation / Formula Model
                    </span>
                    {tool.formulaText}
                  </div>
                )}

                <p className="text-xs sm:text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed">
                  {tool.detailedParagraph}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* Section 3: Utilities & Programming */}
        <section id="utilities-programming" className="space-y-6">
          <div className="flex items-center gap-3 border-b border-zinc-200 dark:border-zinc-800 pb-3">
            <div className="w-8 h-8 rounded-lg bg-teal-500/10 border border-teal-500/20 text-teal-600 dark:text-teal-400 flex items-center justify-center font-bold text-sm">
              🛠️
            </div>
            <h2 className="text-2xl font-extrabold text-zinc-900 dark:text-white">
              Utilities & Technical Standards
            </h2>
          </div>

          <div className="grid grid-cols-1 gap-6">
            {utilityTools.map((tool) => (
              <div
                key={tool.slug}
                id={tool.slug}
                className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-2xl p-6 shadow-sm space-y-4 scroll-mt-24 transition-colors"
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-zinc-100 dark:border-zinc-800 pb-3">
                  <div>
                    <h3 className="text-lg font-bold text-zinc-900 dark:text-white flex items-center gap-2">
                      <span>{tool.toolName}</span>
                    </h3>
                    <span className="text-xs font-semibold text-teal-600 dark:text-teal-400">
                      Standard: {tool.standardName}
                    </span>
                  </div>

                  <Link
                    href={`/tools/${tool.slug}`}
                    className="inline-flex items-center gap-1 text-xs font-bold text-teal-600 dark:text-teal-400 hover:underline shrink-0"
                  >
                    <span>Launch Calculator</span>
                    <ExternalLink size={12} />
                  </Link>
                </div>

                {tool.formulaText && (
                  <div className="bg-zinc-50 dark:bg-zinc-950 p-3 rounded-xl border border-zinc-200/60 dark:border-zinc-800/60 font-mono text-xs text-teal-700 dark:text-teal-400 overflow-x-auto">
                    <span className="text-[10px] uppercase tracking-wider font-sans font-bold text-zinc-400 block mb-1">
                      Equation / Formula Model
                    </span>
                    {tool.formulaText}
                  </div>
                )}

                <p className="text-xs sm:text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed">
                  {tool.detailedParagraph}
                </p>
              </div>
            ))}
          </div>
        </section>
      </main>

      <Footer customText="Verified scientific and mathematical calculation standards." />
    </div>
  );
}
