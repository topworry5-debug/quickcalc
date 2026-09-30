import React, { Suspense } from "react";
import type { Metadata } from "next";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ShareButtons from "@/components/ShareButtons";
import EmbedWidget from "@/components/EmbedWidget";
import RamseyCalculatorWidget from "./RamseyCalculatorWidget";
import {
  Sparkles,
  BookOpen,
} from "lucide-react";

export const metadata: Metadata = {
  title: "Dave Ramsey Investment Calculator - 15% Rule & 4-Fund Growth | QuickCalc",
  description:
    "Free Dave Ramsey investment calculator. Model your retirement nest egg using the 15% income rule, 10-12% historical returns, and the 4-fund mutual fund portfolio.",
  alternates: {
    canonical: "https://quickcalc.cloud/calculators/ramsey-investment-calculator",
  },
  openGraph: {
    title: "Dave Ramsey Investment Calculator - 15% Rule & 4-Fund Growth | QuickCalc",
    description:
      "Free Dave Ramsey investment calculator. Model your retirement nest egg using the 15% income rule, 10-12% historical returns, and the 4-fund mutual fund portfolio.",
    url: "https://quickcalc.cloud/calculators/ramsey-investment-calculator",
    type: "website",
    siteName: "QuickCalc",
    images: [
      {
        url: "https://quickcalc.cloud/og-image.png",
        width: 1200,
        height: 630,
        alt: "Dave Ramsey Investment Calculator on QuickCalc",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Dave Ramsey Investment Calculator - 15% Rule & 4-Fund Growth | QuickCalc",
    description:
      "Free Dave Ramsey investment calculator. Model your retirement nest egg using the 15% income rule, 10-12% historical returns, and the 4-fund mutual fund portfolio.",
  },
};

export default function RamseyInvestmentCalculatorPage({
  searchParams,
}: {
  searchParams?: { embed?: string };
}) {
  const isEmbed = searchParams?.embed === "true";

  const softwareSchema = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: "Dave Ramsey Investment Calculator",
    description:
      "Calculates compound retirement growth and nest egg values using Dave Ramsey's 15% rule and recommended 4-fund mutual fund allocation.",
    applicationCategory: "FinanceApplication",
    operatingSystem: "All",
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "USD",
    },
    url: "https://quickcalc.cloud/calculators/ramsey-investment-calculator",
  };

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: "What is Dave Ramsey's 15% investment rule?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Dave Ramsey recommends investing 15% of your gross household income into tax-advantaged retirement accounts (such as a 401(k) and Roth IRA) once you are completely debt-free (except for your mortgage) and have an emergency fund of 3 to 6 months of expenses (Baby Step 4).",
        },
      },
      {
        "@type": "Question",
        name: "What are the 4 mutual fund types Dave Ramsey recommends?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Dave Ramsey recommends dividing your retirement investments equally (25% each) across four types of mutual funds: 25% Growth (large cap), 25% Growth & Income (large value / dividend), 25% Aggressive Growth (mid/small cap), and 25% International.",
        },
      },
      {
        "@type": "Question",
        name: "Why does Dave Ramsey use 10% to 12% return rates?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Dave Ramsey references the historical average annual compound return of the S&P 500 from 1926 through the modern era, which has averaged between 10% and 12% before inflation. For conservative planning, many financial advisors also test with 8% to 10% net of fees.",
        },
      },
    ],
  };

  if (isEmbed) {
    return (
      <div className="min-h-screen bg-white dark:bg-zinc-950 text-zinc-900 dark:text-zinc-100 font-sans p-2 sm:p-4">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(softwareSchema) }}
        />
        <main className="max-w-4xl mx-auto w-full">
          <Suspense fallback={<div className="p-8 text-center text-zinc-500 font-mono text-sm animate-pulse">Loading...</div>}>
            <RamseyCalculatorWidget />
          </Suspense>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-zinc-950 text-zinc-900 dark:text-zinc-100 font-sans transition-colors selection:bg-emerald-500/20 selection:text-emerald-700">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(softwareSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      <Navbar />

      <main className="max-w-5xl mx-auto px-4 sm:px-6 py-8 sm:py-12">
        <nav aria-label="Breadcrumb" className="mb-6 flex items-center justify-between gap-4 text-xs text-zinc-500 dark:text-zinc-400">
          <ol className="flex flex-wrap items-center gap-2 font-medium">
            <li>
              <Link href="/" className="hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors">
                Home
              </Link>
            </li>
            <li className="select-none text-zinc-300 dark:text-zinc-700 font-normal">&gt;</li>
            <li>
              <Link href="/" className="hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors">
                Calculators
              </Link>
            </li>
            <li className="select-none text-zinc-300 dark:text-zinc-700 font-normal">&gt;</li>
            <li className="text-zinc-900 dark:text-zinc-100 font-semibold truncate">
              Dave Ramsey Investment Calculator
            </li>
          </ol>
        </nav>

        <div className="text-center max-w-3xl mx-auto mb-10">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-emerald-500/10 text-emerald-700 dark:text-emerald-300 border border-emerald-500/20 mb-4">
            <Sparkles className="w-3.5 h-3.5 text-emerald-600" />
            <span>Baby Step 4 Retirement &amp; Wealth Projection</span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-zinc-900 dark:text-white mb-4">
            Dave Ramsey Investment Calculator
          </h1>

          <p className="text-base sm:text-lg text-zinc-600 dark:text-zinc-400 leading-relaxed max-w-2xl mx-auto">
            Calculate your compound growth nest egg using Dave Ramsey&apos;s 15% rule and recommended 4-fund portfolio distribution.
          </p>
        </div>

        <div className="mb-8 flex flex-wrap items-center justify-center gap-3">
          <ShareButtons
            url="https://quickcalc.cloud/calculators/ramsey-investment-calculator"
            title="Dave Ramsey Investment Calculator | QuickCalc"
          />
          <EmbedWidget
            url="https://quickcalc.cloud/calculators/ramsey-investment-calculator"
            title="Dave Ramsey Investment Calculator"
          />
        </div>

        <section className="my-8">
          <Suspense fallback={<div className="p-12 text-center text-zinc-500 animate-pulse font-mono text-sm">Simulating investment growth...</div>}>
            <RamseyCalculatorWidget />
          </Suspense>
        </section>

        <article className="prose prose-zinc dark:prose-invert max-w-4xl mx-auto space-y-10 mt-14 border-t border-zinc-200 dark:border-zinc-800 pt-10">
          <section className="space-y-4">
            <div className="flex items-center gap-2 text-emerald-600 dark:text-emerald-400 text-sm font-bold uppercase tracking-wider">
              <BookOpen className="w-4 h-4" />
              <span>Investment Methodology</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-zinc-900 dark:text-white tracking-tight">
              How Dave Ramsey&apos;s Baby Step 4 Builds Wealth
            </h2>
            <p className="text-zinc-600 dark:text-zinc-400 leading-relaxed">
              In Dave Ramsey&apos;s 7 Baby Steps, Baby Step 4 focuses on investing 15% of your gross household income into tax-favored retirement plans. The strategy hinges on two foundational pillars:
            </p>
            <ul className="text-zinc-600 dark:text-zinc-400 space-y-2">
              <li><strong>Match beats Roth beats Traditional:</strong> Always take employer 401(k) matches first (free 100% immediate return). Next, fund a Roth IRA up to the annual limit. Finally, return to your employer 401(k) or 403(b) until you reach the full 15% contribution mark.</li>
              <li><strong>Consistent monthly DCA:</strong> Dollar-cost averaging every month ensures you buy more fund shares during market pullbacks and fewer shares at peaks, capturing long-term market gains.</li>
            </ul>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-zinc-900 dark:text-white tracking-tight">
              Frequently Asked Questions
            </h2>
            <div className="space-y-4 not-prose">
              <div className="p-5 rounded-2xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 space-y-2">
                <h3 className="font-bold text-zinc-900 dark:text-white text-base">
                  What is Dave Ramsey&apos;s 15% investment rule?
                </h3>
                <p className="text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed">
                  Dave Ramsey recommends investing 15% of your gross household income into tax-advantaged retirement accounts once you are completely debt-free (except for your mortgage) with an emergency fund of 3 to 6 months of expenses.
                </p>
              </div>

              <div className="p-5 rounded-2xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 space-y-2">
                <h3 className="font-bold text-zinc-900 dark:text-white text-base">
                  Why does Dave Ramsey recommend 4 mutual fund categories?
                </h3>
                <p className="text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed">
                  Dividing capital equally into 25% Growth, 25% Growth &amp; Income, 25% Aggressive Growth, and 25% International provides broad diversification across domestic large-cap, value, small-cap, and global foreign equities.
                </p>
              </div>
            </div>
          </section>
        </article>
      </main>

      <Footer />
    </div>
  );
}
