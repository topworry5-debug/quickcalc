import React, { Suspense } from "react";
import type { Metadata } from "next";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ShareButtons from "@/components/ShareButtons";
import EmbedWidget from "@/components/EmbedWidget";
import RelatedTools from "@/components/RelatedTools";
import {
  TrendingUp,
  ShieldCheck,
  CheckCircle2,
  Sparkles,
  BookOpen,
  HelpCircle,
} from "lucide-react";

import MoneyRunwayWidget from "./MoneyRunwayWidget";

export const metadata: Metadata = {
  title: "How Long Will My Money Last Calculator | QuickCalc",
  description:
    "Calculate how many years your savings and retirement fund will last. Interactive calculator with inflation adjustment, visual runway charts, and safe withdrawal tips.",
  alternates: {
    canonical: "https://quickcalc.cloud/calculators/how-long-will-my-money-last",
  },
  openGraph: {
    title: "How Long Will My Money Last Calculator | QuickCalc",
    description:
      "Calculate how many years your savings and retirement fund will last. Interactive calculator with inflation adjustment, visual runway charts, and safe withdrawal tips.",
    url: "https://quickcalc.cloud/calculators/how-long-will-my-money-last",
    type: "website",
    siteName: "QuickCalc",
    images: [
      {
        url: "https://quickcalc.cloud/og-image.png",
        width: 1200,
        height: 630,
        alt: "How Long Will My Money Last Savings & Retirement Runway Calculator",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "How Long Will My Money Last Calculator | QuickCalc",
    description:
      "Calculate how many years your savings and retirement fund will last. Interactive calculator with inflation adjustment, visual runway charts, and safe withdrawal tips.",
  },
};

export default function HowLongWillMyMoneyLastPage({
  searchParams,
}: {
  searchParams?: { embed?: string };
}) {
  const isEmbed = searchParams?.embed === "true";

  // Structured Data: SoftwareApplication Schema
  const softwareSchema = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: "How Long Will My Money Last Calculator",
    description:
      "Interactive retirement and savings runway calculator simulating portfolio longevity, compounding growth, and inflation-adjusted withdrawals.",
    applicationCategory: "FinanceApplication",
    operatingSystem: "All",
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "USD",
    },
    url: "https://quickcalc.cloud/calculators/how-long-will-my-money-last",
  };

  // Structured Data: FAQPage Schema
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: "How long will $500,000 last in retirement?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "At a withdrawal rate of $2,500/month ($30,000/year, or 6.0% initial withdrawal) with a 5.0% annual investment return and 2.5% annual inflation adjustment, $500,000 will last approximately 21 to 24 years. If monthly spending is reduced to $1,667/month ($20,000/year, following the classic 4% rule), a $500,000 portfolio can last 30+ years or indefinitely when invested in a diversified balanced portfolio.",
        },
      },
      {
        "@type": "Question",
        name: "What is a safe withdrawal rate for retirement?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "A safe withdrawal rate (SWR) represents the percentage of initial capital you can withdraw each year—adjusted annually for inflation—without exhausting your portfolio before death. The 4% rule (originating from William Bengen in 1994 and the Trinity Study in 1998) found that a 4% initial withdrawal survived 100% of historical 30-year US market cycles. For longer horizons (35–50 years) or early retirees (FIRE), financial planners advise a conservative 3.25% to 3.5% withdrawal rate.",
        },
      },
      {
        "@type": "Question",
        name: "Does inflation affect how long my money lasts?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Yes, significantly. Even a modest 2.5% annual inflation rate doubles required living expenses in roughly 29 years. Without inflation adjustments, your nominal purchasing power is cut in half over standard retirements. When withdrawals are increased annually to maintain buying power, portfolio depletion accelerates rapidly in the second half of retirement.",
        },
      },
      {
        "@type": "Question",
        name: "How does investment return extend my savings runway?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Investment returns compound on your remaining balance every month, actively counteracting withdrawals. For example, leaving $350,000 in a 0% cash account with a $2,500 monthly spend depletes the money in under 12 years. By generating a 6% annual return, monthly growth replenishes capital, extending the exact same savings to 20+ years—delivering hundreds of thousands of dollars in bonus distributions.",
        },
      },
    ],
  };

  // Structured Data: BreadcrumbList Schema
  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Home",
        item: "https://quickcalc.cloud/",
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "Calculators",
        item: "https://quickcalc.cloud/calculators/how-long-will-my-money-last",
      },
      {
        "@type": "ListItem",
        position: 3,
        name: "How Long Will My Money Last",
        item: "https://quickcalc.cloud/calculators/how-long-will-my-money-last",
      },
    ],
  };

  // Embed Mode View
  if (isEmbed) {
    return (
      <div className="min-h-screen bg-white dark:bg-zinc-950 text-zinc-900 dark:text-zinc-100 font-sans p-2 sm:p-4">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(softwareSchema) }}
        />
        <main className="max-w-4xl mx-auto w-full">
          <Suspense
            fallback={
              <div className="p-8 text-center text-zinc-500 animate-pulse">
                Loading financial runway calculator...
              </div>
            }
          >
            <MoneyRunwayWidget />
          </Suspense>
        </main>
      </div>
    );
  }

  // Full Web Application Page
  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-zinc-950 text-zinc-900 dark:text-zinc-100 font-sans transition-colors selection:bg-emerald-500/20 selection:text-emerald-700">
      {/* Schema.org Injections */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(softwareSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />

      <Navbar />

      <main className="max-w-5xl mx-auto px-4 sm:px-6 py-8 sm:py-12">
        {/* Breadcrumb Navigation */}
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
              How Long Will My Money Last
            </li>
          </ol>
        </nav>

        {/* Hero Title & Description */}
        <div className="text-center max-w-3xl mx-auto mb-10">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-emerald-500/10 text-emerald-800 dark:text-emerald-300 border border-emerald-500/20 mb-4">
            <Sparkles className="w-3.5 h-3.5 text-emerald-600" />
            <span>Interactive Savings &amp; Retirement Runway Calculator</span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-zinc-900 dark:text-white mb-4">
            How Long Will My Money Last?
          </h1>

          <p className="text-base sm:text-lg text-zinc-600 dark:text-zinc-400 leading-relaxed max-w-2xl mx-auto">
            Simulate your portfolio depletion runway with real-time compounding, customizable annual inflation, and an interactive <strong>Safe Withdrawal Rate (SWR) risk meter</strong>.
          </p>
        </div>

        {/* Social Sharing & Embed Widget Actions */}
        <div className="mb-8 flex flex-wrap items-center justify-center gap-3">
          <ShareButtons
            url="https://quickcalc.cloud/calculators/how-long-will-my-money-last"
            title="How Long Will My Money Last Calculator | QuickCalc"
          />
          <EmbedWidget
            url="https://quickcalc.cloud/calculators/how-long-will-my-money-last"
            title="How Long Will My Money Last Calculator"
          />
        </div>

        {/* Main Interactive Tool Widget */}
        <section className="my-8">
          <Suspense
            fallback={
              <div className="p-12 text-center text-zinc-500 bg-white dark:bg-zinc-900 rounded-3xl border border-zinc-200 dark:border-zinc-800 animate-pulse">
                Simulating savings runway &amp; depletion curves...
              </div>
            }
          >
            <MoneyRunwayWidget />
          </Suspense>
        </section>

        {/* In-content Ad Slot */}
        <div className="ad-slot ad-slot--inline my-10" data-ad-position="in-content-1">
          <div className="ad-placeholder-label border border-dashed border-zinc-300 dark:border-zinc-800 rounded-2xl py-4 flex items-center justify-center bg-zinc-50/50 dark:bg-zinc-950/20 text-[10px] font-bold text-zinc-400 dark:text-zinc-600 uppercase tracking-widest cursor-default">
            Advertisement
          </div>
        </div>

        {/* ========================================================
            ON-PAGE EDITORIAL CONTENT & IN-DEPTH GUIDE
           ======================================================== */}
        <article className="prose prose-zinc dark:prose-invert max-w-4xl mx-auto space-y-12 mt-12 border-t border-zinc-200 dark:border-zinc-800 pt-10">
          
          {/* Section 1: How the Savings Runway Formula Works */}
          <section className="space-y-4">
            <div className="flex items-center gap-2 text-emerald-600 dark:text-emerald-400 text-sm font-bold uppercase tracking-wider">
              <TrendingUp className="w-4 h-4" />
              <span>Mathematical Architecture</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-zinc-950 dark:text-white">
              How the Savings Runway Formula Works
            </h2>
            <p className="text-zinc-600 dark:text-zinc-400 leading-relaxed text-base">
              Calculating how long your money will last isn't a simple division problem ($Balance \div Spend$). In the real world, three competing economic forces act upon your nest egg simultaneously every single month:
            </p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 my-6 not-prose">
              <div className="p-4 rounded-2xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 space-y-2 shadow-sm">
                <div className="w-8 h-8 rounded-xl bg-emerald-500/10 text-emerald-600 flex items-center justify-center font-bold text-sm">
                  1
                </div>
                <h4 className="font-bold text-zinc-900 dark:text-white text-sm">Monthly Withdrawal Velocity ($W_m$)</h4>
                <p className="text-xs text-zinc-500 dark:text-zinc-400 leading-relaxed">
                  The cash removed each month to fund your living expenses, rent, mortgages, and healthcare.
                </p>
              </div>

              <div className="p-4 rounded-2xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 space-y-2 shadow-sm">
                <div className="w-8 h-8 rounded-xl bg-teal-500/10 text-teal-600 flex items-center justify-center font-bold text-sm">
                  2
                </div>
                <h4 className="font-bold text-zinc-900 dark:text-white text-sm">Compounding Yield ($Interest_m$)</h4>
                <p className="text-xs text-zinc-500 dark:text-zinc-400 leading-relaxed">
                  Monthly dividends, bond coupons, and stock appreciation that replenish the remaining principal.
                </p>
              </div>

              <div className="p-4 rounded-2xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 space-y-2 shadow-sm">
                <div className="w-8 h-8 rounded-xl bg-indigo-500/10 text-indigo-600 flex items-center justify-center font-bold text-sm">
                  3
                </div>
                <h4 className="font-bold text-zinc-900 dark:text-white text-sm">Inflation Escalation Factor ($i$)</h4>
                <p className="text-xs text-zinc-500 dark:text-zinc-400 leading-relaxed">
                  The silent erosion of purchasing power, requiring higher nominal dollar withdrawals each subsequent year.
                </p>
              </div>
            </div>

            <p className="text-zinc-600 dark:text-zinc-400 leading-relaxed text-base">
              Our simulation operates on a precise month-by-month compounding recursive recurrence equation:
            </p>

            <div className="p-4 rounded-2xl bg-zinc-100 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 font-mono text-xs sm:text-sm text-zinc-800 dark:text-zinc-200 overflow-x-auto not-prose my-4">
              <span className="text-zinc-400 block mb-1">{"// Monthly Portfolio Evolution:"}</span>
              <span className="text-emerald-600 dark:text-emerald-400 font-bold">Balance[m]</span> = Balance[m-1] + (Balance[m-1] × (r / 12)) - (W × (1 + i / 12)ᵐ)
            </div>

            <p className="text-zinc-600 dark:text-zinc-400 leading-relaxed text-base">
              When monthly investment returns equal or exceed the inflation-adjusted withdrawal, your capital enters a <strong>perpetual growth state</strong> where money never runs out. When withdrawals exceed returns, capital begins an accelerating downward glide path toward $0.
            </p>
          </section>

          {/* Section 2: The 4% Rule vs. Reality */}
          <section className="space-y-4 border-t border-zinc-200 dark:border-zinc-800 pt-8">
            <div className="flex items-center gap-2 text-indigo-600 dark:text-indigo-400 text-sm font-bold uppercase tracking-wider">
              <BookOpen className="w-4 h-4" />
              <span>Historical Benchmark Analysis</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-zinc-950 dark:text-white">
              The 4% Rule vs. Reality: Bengen, Trinity, and Modern Retirement
            </h2>
            <p className="text-zinc-600 dark:text-zinc-400 leading-relaxed text-base">
              In 1994, certified financial planner William Bengen published landmark research analyzing rolling 30-year historical retirement windows across modern US financial history (including the Great Depression of 1929 and the stagflation era of the 1970s).
            </p>
            <p className="text-zinc-600 dark:text-zinc-400 leading-relaxed text-base">
              He discovered that a retiree who withdrew <strong>4.0% of their initial portfolio</strong> in Year 1, and subsequently adjusted that initial dollar amount for CPI inflation every year, <em>never ran out of money over any historical 30-year period</em> when invested in a 50/50 to 75/25 stock/bond allocation. This benchmark was later validated and popularized by the 1998 Trinity Study.
            </p>

            <div className="p-5 rounded-2xl bg-amber-500/10 border border-amber-500/20 text-zinc-800 dark:text-zinc-200 not-prose my-4 space-y-2">
              <h4 className="font-bold text-amber-800 dark:text-amber-300 text-sm flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4" />
                <span>Why Static 4% Rules Can Be Misleading Today</span>
              </h4>
              <ul className="text-xs text-zinc-600 dark:text-zinc-400 space-y-1.5 list-disc pl-4 leading-relaxed">
                <li><strong>Longer Life Expectancies:</strong> Today's retirees frequently live 35 to 45 years in retirement, well beyond the 30-year Trinity horizon.</li>
                <li><strong>Sequence of Returns Risk (SRR):</strong> Experiencing a severe 30%+ market downturn in the first 3 to 5 years locks in capital losses when you must sell shares to pay bills.</li>
                <li><strong>Dynamic Spending Reality:</strong> Actual retiree spending rarely increases with inflation every single year; spending typically declines during mid-retirement before rising again for healthcare.</li>
              </ul>
            </div>
          </section>

          {/* Section 3: 4 Practical Ways to Extend Your Savings */}
          <section className="space-y-4 border-t border-zinc-200 dark:border-zinc-800 pt-8">
            <div className="flex items-center gap-2 text-teal-600 dark:text-teal-400 text-sm font-bold uppercase tracking-wider">
              <CheckCircle2 className="w-4 h-4" />
              <span>Actionable Strategies</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-zinc-950 dark:text-white">
              4 Practical Ways to Extend Your Savings Runway
            </h2>
            <p className="text-zinc-600 dark:text-zinc-400 leading-relaxed text-base">
              If your current runway falls short of your target longevity, implement these four proven financial levers to stretch your portfolio by 5 to 15+ additional years:
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 not-prose my-6">
              <div className="p-5 rounded-2xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 space-y-2 shadow-sm">
                <div className="flex items-center gap-2 text-emerald-600 dark:text-emerald-400 font-bold text-sm">
                  <span className="p-1 rounded-lg bg-emerald-500/10">01</span>
                  <span>Adopt Dynamic "Guyton-Klinger" Guardrails</span>
                </div>
                <p className="text-xs text-zinc-600 dark:text-zinc-400 leading-relaxed">
                  Instead of taking static inflation raises every year, freeze spending increases during bear market years and take modest cuts when portfolio value drops 20%. This single adjustment virtually eliminates sequence of returns risk.
                </p>
              </div>

              <div className="p-5 rounded-2xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 space-y-2 shadow-sm">
                <div className="flex items-center gap-2 text-teal-600 dark:text-teal-400 font-bold text-sm">
                  <span className="p-1 rounded-lg bg-teal-500/10">02</span>
                  <span>Delay Social Security Until Age 70</span>
                </div>
                <p className="text-xs text-zinc-600 dark:text-zinc-400 leading-relaxed">
                  For every year you delay claiming Social Security past full retirement age up to age 70, your guaranteed, inflation-indexed payout increases by approximately 8% per year—significantly lowering required portfolio withdrawals in your 70s and 80s.
                </p>
              </div>

              <div className="p-5 rounded-2xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 space-y-2 shadow-sm">
                <div className="flex items-center gap-2 text-indigo-600 dark:text-indigo-400 font-bold text-sm">
                  <span className="p-1 rounded-lg bg-indigo-500/10">03</span>
                  <span>Generate $500–$1,000/mo in "Barista / Encore" Income</span>
                </div>
                <p className="text-xs text-zinc-600 dark:text-zinc-400 leading-relaxed">
                  Earning just $750/month through part-time consulting, hobbies, or light work in the first 5 years of retirement preserves $45,000 of initial capital, keeping massive compounding power active in your portfolio.
                </p>
              </div>

              <div className="p-5 rounded-2xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 space-y-2 shadow-sm">
                <div className="flex items-center gap-2 text-purple-600 dark:text-purple-400 font-bold text-sm">
                  <span className="p-1 rounded-lg bg-purple-500/10">04</span>
                  <span>Eliminate Mutual Fund &amp; Advisor Fee Drag</span>
                </div>
                <p className="text-xs text-zinc-600 dark:text-zinc-400 leading-relaxed">
                  A 1.0% advisor fee combined with a 0.75% active fund expense ratio consumes 1.75% of your portfolio every year. Shifting to low-cost broad index ETFs (0.03% to 0.08% expense ratio) immediately adds 3 to 6 years of runway.
                </p>
              </div>
            </div>

            <p className="text-zinc-600 dark:text-zinc-400 leading-relaxed text-base">
              To model how ongoing contributions compound before retirement begins, test our companion{" "}
              <Link
                href="/tools/savings-growth-calculator"
                className="text-emerald-600 dark:text-emerald-400 font-bold underline hover:text-emerald-700"
              >
                Savings Growth &amp; Compound Interest Calculator
              </Link>
              , or backtest historical market crashes using the{" "}
              <Link
                href="/tools/retirement-withdrawal-simulator"
                className="text-emerald-600 dark:text-emerald-400 font-bold underline hover:text-emerald-700"
              >
                Safe Withdrawal Rate Simulator
              </Link>.
            </p>
          </section>

          {/* Section 4: Frequently Asked Questions (FAQ) */}
          <section className="space-y-6 border-t border-zinc-200 dark:border-zinc-800 pt-8 not-prose">
            <div className="flex items-center gap-2 text-emerald-600 dark:text-emerald-400 text-sm font-bold uppercase tracking-wider">
              <HelpCircle className="w-4 h-4" />
              <span>Common Questions</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-zinc-950 dark:text-white">
              Frequently Asked Questions (FAQ)
            </h2>

            <div className="space-y-4">
              <div className="p-5 rounded-2xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 space-y-2">
                <h3 className="text-base font-bold text-zinc-900 dark:text-white">
                  How long will $500,000 last in retirement?
                </h3>
                <p className="text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed">
                  At a withdrawal rate of $2,500/month ($30,000/year, or 6.0% initial withdrawal) with a 5.0% annual investment return and 2.5% annual inflation adjustment, $500,000 will last approximately 21 to 24 years. If monthly spending is reduced to $1,667/month ($20,000/year, following the classic 4% rule), a $500,000 portfolio can last 30+ years or indefinitely when invested in a diversified balanced portfolio.
                </p>
              </div>

              <div className="p-5 rounded-2xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 space-y-2">
                <h3 className="text-base font-bold text-zinc-900 dark:text-white">
                  What is a safe withdrawal rate for retirement?
                </h3>
                <p className="text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed">
                  A safe withdrawal rate (SWR) represents the percentage of initial capital you can withdraw each year—adjusted annually for inflation—without exhausting your portfolio before death. The 4% rule (originating from William Bengen in 1994 and the Trinity Study in 1998) found that a 4% initial withdrawal survived 100% of historical 30-year US market cycles. For longer horizons (35–50 years) or early retirees (FIRE), financial planners advise a conservative 3.25% to 3.5% withdrawal rate.
                </p>
              </div>

              <div className="p-5 rounded-2xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 space-y-2">
                <h3 className="text-base font-bold text-zinc-900 dark:text-white">
                  Does inflation affect how long my money lasts?
                </h3>
                <p className="text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed">
                  Yes, significantly. Even a modest 2.5% annual inflation rate doubles required living expenses in roughly 29 years. Without inflation adjustments, your nominal purchasing power is cut in half over standard retirements. When withdrawals are increased annually to maintain buying power, portfolio depletion accelerates rapidly in the second half of retirement.
                </p>
              </div>

              <div className="p-5 rounded-2xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 space-y-2">
                <h3 className="text-base font-bold text-zinc-900 dark:text-white">
                  How does investment return extend my savings runway?
                </h3>
                <p className="text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed">
                  Investment returns compound on your remaining balance every month, actively counteracting withdrawals. For example, leaving $350,000 in a 0% cash account with a $2,500 monthly spend depletes the money in under 12 years. By generating a 6% annual return, monthly growth replenishes capital, extending the exact same savings to 20+ years—delivering hundreds of thousands of dollars in bonus distributions.
                </p>
              </div>
            </div>
          </section>
        </article>

        {/* Related Calculators Grid */}
        <div className="mt-12">
          <RelatedTools currentSlug="retirement-withdrawal-simulator" />
        </div>

        {/* Bottom Ad Slot */}
        <div className="ad-slot ad-slot--footer mt-12" data-ad-position="footer">
          <div className="ad-placeholder-label border border-dashed border-zinc-300 dark:border-zinc-800 rounded-2xl py-4 flex items-center justify-center bg-zinc-50/50 dark:bg-zinc-950/20 text-[10px] font-bold text-zinc-400 dark:text-zinc-600 uppercase tracking-widest cursor-default">
            Advertisement
          </div>
        </div>
      </main>

      <Footer customText="How Long Will My Money Last? Savings & retirement portfolio runway calculation with inflation compounding modeling." />
    </div>
  );
}
