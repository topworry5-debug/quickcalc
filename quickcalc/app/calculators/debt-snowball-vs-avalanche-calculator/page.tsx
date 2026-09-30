import React, { Suspense } from "react";
import type { Metadata } from "next";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ShareButtons from "@/components/ShareButtons";
import EmbedWidget from "@/components/EmbedWidget";
import DebtSnowballVsAvalancheWidget from "./DebtSnowballVsAvalancheWidget";
import {
  Sparkles,
  BookOpen,
  HelpCircle,
  TrendingDown,
  CheckCircle2,
  Zap,
  Scale,
  TrendingUp,
  CreditCard,
} from "lucide-react";

export const metadata: Metadata = {
  title: "Debt Snowball vs. Debt Avalanche Calculator | QuickCalc",
  description:
    "Compare debt snowball and debt avalanche methods. See how fast you can become debt-free, calculate total interest saved, and build your custom payoff plan.",
  alternates: {
    canonical: "https://quickcalc.cloud/calculators/debt-snowball-vs-avalanche-calculator",
  },
  openGraph: {
    title: "Debt Snowball vs. Debt Avalanche Calculator | QuickCalc",
    description:
      "Compare debt snowball and debt avalanche methods. See how fast you can become debt-free, calculate total interest saved, and build your custom payoff plan.",
    url: "https://quickcalc.cloud/calculators/debt-snowball-vs-avalanche-calculator",
    type: "website",
    siteName: "QuickCalc",
    images: [
      {
        url: "https://quickcalc.cloud/og-image.png",
        width: 1200,
        height: 630,
        alt: "Debt Snowball vs Avalanche Calculator on QuickCalc",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Debt Snowball vs. Debt Avalanche Calculator | QuickCalc",
    description:
      "Compare debt snowball and debt avalanche methods. See how fast you can become debt-free, calculate total interest saved, and build your custom payoff plan.",
  },
};

export default function DebtSnowballVsAvalanchePage({
  searchParams,
}: {
  searchParams?: { embed?: string };
}) {
  const isEmbed = searchParams?.embed === "true";

  // Structured Data: SoftwareApplication Schema
  const softwareSchema = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: "Debt Snowball vs. Debt Avalanche Calculator",
    description:
      "Advanced multi-debt repayment simulation engine comparing Dave Ramsey's Debt Snowball with the Debt Avalanche method.",
    applicationCategory: "FinanceApplication",
    operatingSystem: "All",
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "USD",
    },
    url: "https://quickcalc.cloud/calculators/debt-snowball-vs-avalanche-calculator",
  };

  // Structured Data: FAQPage Schema
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: "What is the Debt Snowball Method and how does it work?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "The Debt Snowball method, popularized by personal finance author Dave Ramsey, lists debts from smallest balance to largest balance regardless of interest rate. You pay minimums on all debts, throw all extra cash at the smallest balance until it's eliminated, and roll over that payment to the next smallest debt. This produces quick psychological wins that keep you motivated.",
        },
      },
      {
        "@type": "Question",
        name: "What is the Debt Avalanche Method and why does it save more money?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "The Debt Avalanche method lists debts from highest interest rate (APR) to lowest interest rate regardless of balance. By focusing extra payments on your most expensive debt first, you drastically minimize the compound interest accruing each month, mathematically saving the most money and often finishing debt-free sooner.",
        },
      },
      {
        "@type": "Question",
        name: "Debt Snowball vs. Debt Avalanche: Which strategy should I choose?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "If you struggle with financial motivation or feel overwhelmed by multiple accounts, choose the Debt Snowball for early psychological momentum. If you are strictly disciplined and want to pay the absolute lowest interest possible, choose the Debt Avalanche.",
        },
      },
      {
        "@type": "Question",
        name: "How does the payment rollover effect accelerate debt freedom?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "When a debt is wiped out, its minimum payment is not spent elsewhere—it is rolled over into the next target debt. If you pay off a $75/mo card, your next debt receives its minimum plus that $75, creating an accelerating payment 'snowball' that crushes remaining balances faster and faster.",
        },
      },
      {
        "@type": "Question",
        name: "What is negative amortization and how do I avoid it?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Negative amortization happens when your minimum monthly payment is lower than the interest charged that month, causing your principal balance to grow even as you make payments. To avoid this, always pay at least the monthly accrued interest plus extra toward the principal.",
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
        item: "https://quickcalc.cloud/calculators/debt-snowball-vs-avalanche-calculator",
      },
      {
        "@type": "ListItem",
        position: 3,
        name: "Debt Snowball vs. Avalanche Calculator",
        item: "https://quickcalc.cloud/calculators/debt-snowball-vs-avalanche-calculator",
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
              <div className="p-8 text-center text-zinc-500 animate-pulse font-mono text-sm">
                Loading debt payoff engine...
              </div>
            }
          >
            <DebtSnowballVsAvalancheWidget />
          </Suspense>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-zinc-950 text-zinc-900 dark:text-zinc-100 font-sans transition-colors selection:bg-indigo-500/20 selection:text-indigo-700">
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
        <nav
          aria-label="Breadcrumb"
          className="mb-6 flex items-center justify-between gap-4 text-xs text-zinc-500 dark:text-zinc-400"
        >
          <ol className="flex flex-wrap items-center gap-2 font-medium">
            <li>
              <Link
                href="/"
                className="hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors"
              >
                Home
              </Link>
            </li>
            <li className="select-none text-zinc-300 dark:text-zinc-700 font-normal">&gt;</li>
            <li>
              <Link
                href="/"
                className="hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors"
              >
                Calculators
              </Link>
            </li>
            <li className="select-none text-zinc-300 dark:text-zinc-700 font-normal">&gt;</li>
            <li className="text-zinc-900 dark:text-zinc-100 font-semibold truncate">
              Debt Snowball vs. Avalanche
            </li>
          </ol>
        </nav>

        {/* Hero Section */}
        <div className="mb-8 space-y-4">
          <div className="flex flex-wrap items-center gap-2">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-indigo-500/10 text-indigo-700 dark:text-indigo-300 border border-indigo-500/20">
              <Zap className="w-3.5 h-3.5" />
              <span>Multi-Debt Strategy Engine</span>
            </span>
            <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[11px] font-medium bg-zinc-200/70 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300">
              <Sparkles className="w-3 h-3 text-amber-500" />
              Snowball vs. Avalanche
            </span>
          </div>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-zinc-900 dark:text-white leading-tight">
            Debt Snowball vs. Debt Avalanche{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-teal-500">
              Calculator
            </span>
          </h1>

          <p className="text-base sm:text-lg text-zinc-600 dark:text-zinc-400 max-w-3xl leading-relaxed">
            Compare Dave Ramsey&rsquo;s Debt Snowball with the Debt Avalanche method. Enter your credit cards, personal loans, and auto debt to find out exactly how much interest you will save, your debt-free milestone dates, and which strategy fits your psychological profile.
          </p>
        </div>

        {/* Main Interactive Widget */}
        <section className="mb-14">
          <Suspense
            fallback={
              <div className="p-12 text-center text-zinc-500 bg-white dark:bg-zinc-900 rounded-3xl border border-zinc-200 dark:border-zinc-800 animate-pulse font-mono text-sm">
                Initializing Debt Payoff Simulation Engine...
              </div>
            }
          >
            <DebtSnowballVsAvalancheWidget />
          </Suspense>
        </section>

        {/* Share & Embed Bar */}
        <div className="mb-14 p-4 sm:p-5 rounded-2xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 flex flex-col sm:flex-row items-center justify-between gap-4 shadow-sm">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-xl bg-indigo-50 dark:bg-indigo-950/60 text-indigo-600 dark:text-indigo-400">
              <ShareButtons
                title="Debt Snowball vs. Debt Avalanche Calculator - QuickCalc"
                url="https://quickcalc.cloud/calculators/debt-snowball-vs-avalanche-calculator"
              />
            </div>
            <div className="text-xs text-zinc-500 dark:text-zinc-400">
              Share this debt comparison with your partner, financial coach, or friends.
            </div>
          </div>

          <EmbedWidget
            url="https://quickcalc.cloud/calculators/debt-snowball-vs-avalanche-calculator"
            title="Debt Snowball vs Avalanche Calculator"
          />
        </div>

        {/* Deep-Dive Editorial Guide Section */}
        <article className="space-y-12 border-t border-zinc-200 dark:border-zinc-800 pt-10 text-zinc-800 dark:text-zinc-200 leading-relaxed">
          {/* Section: Head-to-Head Comparison */}
          <section className="space-y-4">
            <div className="flex items-center gap-2 text-indigo-600 dark:text-indigo-400 text-sm font-semibold tracking-wide uppercase">
              <BookOpen className="w-4 h-4" />
              <span>Strategy Comparison Guide</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-zinc-900 dark:text-white">
              Debt Snowball vs. Debt Avalanche: Which One Clears Debt Faster?
            </h2>
            <p className="text-zinc-600 dark:text-zinc-400">
              When tackling multiple loans, credit cards, or medical bills, deciding where to put your extra cash is critical. Two proven methodologies dominate personal finance: the <strong>Debt Snowball</strong> (behavior-focused) and the <strong>Debt Avalanche</strong> (math-focused).
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
              <div className="p-6 rounded-3xl bg-indigo-50/50 dark:bg-indigo-950/20 border border-indigo-200/80 dark:border-indigo-900/40 space-y-3">
                <div className="flex items-center gap-2 text-indigo-700 dark:text-indigo-300 font-bold text-base">
                  <span>❄️ The Debt Snowball Method</span>
                </div>
                <p className="text-xs text-zinc-600 dark:text-zinc-400 leading-relaxed">
                  List all debts from <strong>smallest balance to largest balance</strong>, ignoring the interest rates completely. You pay the minimum required amount on all debts and attack the smallest balance with every extra dollar available.
                </p>
                <div className="space-y-1.5 pt-1 text-xs">
                  <div className="flex items-center gap-2 text-indigo-800 dark:text-indigo-300 font-medium">
                    <CheckCircle2 className="w-4 h-4 text-indigo-600 shrink-0" />
                    <span>Quick emotional wins keep motivation high</span>
                  </div>
                  <div className="flex items-center gap-2 text-indigo-800 dark:text-indigo-300 font-medium">
                    <CheckCircle2 className="w-4 h-4 text-indigo-600 shrink-0" />
                    <span>Reduces the total number of monthly bills quickly</span>
                  </div>
                  <div className="flex items-center gap-2 text-indigo-800 dark:text-indigo-300 font-medium">
                    <CheckCircle2 className="w-4 h-4 text-indigo-600 shrink-0" />
                    <span>Endorsed by personal finance expert Dave Ramsey</span>
                  </div>
                </div>
              </div>

              <div className="p-6 rounded-3xl bg-emerald-50/50 dark:bg-emerald-950/20 border border-emerald-200/80 dark:border-emerald-900/40 space-y-3">
                <div className="flex items-center gap-2 text-emerald-700 dark:text-emerald-300 font-bold text-base">
                  <span>🏔️ The Debt Avalanche Method</span>
                </div>
                <p className="text-xs text-zinc-600 dark:text-zinc-400 leading-relaxed">
                  List all debts from <strong>highest interest rate (APR) to lowest interest rate</strong>, regardless of the balance. You pay minimums on everything and direct all excess cash toward the highest-interest account.
                </p>
                <div className="space-y-1.5 pt-1 text-xs">
                  <div className="flex items-center gap-2 text-emerald-800 dark:text-emerald-300 font-medium">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                    <span>Saves the absolute maximum dollar amount in interest</span>
                  </div>
                  <div className="flex items-center gap-2 text-emerald-800 dark:text-emerald-300 font-medium">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                    <span>Mathematically the fastest way to become debt-free</span>
                  </div>
                  <div className="flex items-center gap-2 text-emerald-800 dark:text-emerald-300 font-medium">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                    <span>Best for high-interest credit cards (24%–30% APR)</span>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Section: Head-to-Head Comparison Table */}
          <section className="space-y-4">
            <h3 className="text-xl sm:text-2xl font-bold text-zinc-900 dark:text-white">
              Feature-by-Feature Comparison
            </h3>

            <div className="overflow-x-auto rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 shadow-sm">
              <table className="w-full text-left text-xs">
                <thead className="bg-zinc-100 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300 font-semibold uppercase tracking-wider">
                  <tr>
                    <th className="py-3 px-4">Evaluation Criteria</th>
                    <th className="py-3 px-4 text-indigo-700 dark:text-indigo-300">Debt Snowball</th>
                    <th className="py-3 px-4 text-emerald-700 dark:text-emerald-300">Debt Avalanche</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-zinc-200 dark:divide-zinc-800">
                  <tr className="hover:bg-zinc-50 dark:hover:bg-zinc-800/40">
                    <td className="py-3 px-4 font-semibold text-zinc-900 dark:text-white">Priority Order</td>
                    <td className="py-3 px-4">Lowest balance to highest balance</td>
                    <td className="py-3 px-4">Highest APR to lowest APR</td>
                  </tr>
                  <tr className="hover:bg-zinc-50 dark:hover:bg-zinc-800/40">
                    <td className="py-3 px-4 font-semibold text-zinc-900 dark:text-white">Total Interest Paid</td>
                    <td className="py-3 px-4">Higher (pays more interest fees)</td>
                    <td className="py-3 px-4 font-bold text-emerald-600 dark:text-emerald-400">Lowest (maximum interest savings)</td>
                  </tr>
                  <tr className="hover:bg-zinc-50 dark:hover:bg-zinc-800/40">
                    <td className="py-3 px-4 font-semibold text-zinc-900 dark:text-white">First Account Paid Off</td>
                    <td className="py-3 px-4 font-bold text-indigo-600 dark:text-indigo-400">Much sooner (days or weeks)</td>
                    <td className="py-3 px-4">Can take months or years if balance is large</td>
                  </tr>
                  <tr className="hover:bg-zinc-50 dark:hover:bg-zinc-800/40">
                    <td className="py-3 px-4 font-semibold text-zinc-900 dark:text-white">Psychological Factor</td>
                    <td className="py-3 px-4 font-bold text-indigo-600 dark:text-indigo-400">Superior motivation &amp; early wins</td>
                    <td className="py-3 px-4">Requires strict discipline and patience</td>
                  </tr>
                  <tr className="hover:bg-zinc-50 dark:hover:bg-zinc-800/40">
                    <td className="py-3 px-4 font-semibold text-zinc-900 dark:text-white">Best Suited For</td>
                    <td className="py-3 px-4">Those feeling overwhelmed by multiple accounts</td>
                    <td className="py-3 px-4">Analytical thinkers motivated by math &amp; ROI</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </section>

          {/* Section: The 4 Steps to Execute the Rollover Effect */}
          <section className="space-y-4">
            <div className="flex items-center gap-2 text-indigo-600 dark:text-indigo-400 text-sm font-semibold tracking-wide uppercase">
              <Scale className="w-4 h-4" />
              <span>Step-by-Step Blueprint</span>
            </div>
            <h3 className="text-xl sm:text-2xl font-bold text-zinc-900 dark:text-white">
              How the Debt Rollover Acceleration Works
            </h3>
            <p className="text-zinc-600 dark:text-zinc-400">
              The true engine behind both Snowball and Avalanche is the <strong>payment rollover</strong>. When you eliminate a debt, your total monthly debt commitment does not drop. Instead, that freed-up money is redirected to your next debt:
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-4 gap-3 pt-2">
              <div className="p-4 rounded-2xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 space-y-2">
                <span className="w-7 h-7 rounded-xl bg-indigo-100 dark:bg-indigo-950 text-indigo-700 dark:text-indigo-300 font-bold text-xs flex items-center justify-center">
                  1
                </span>
                <div className="font-bold text-sm text-zinc-900 dark:text-white">Stop Adding Debt</div>
                <p className="text-xs text-zinc-500 leading-relaxed">
                  Put cards on freeze and commit to cash or debit only. You cannot dig out of a hole while continuing to dig.
                </p>
              </div>

              <div className="p-4 rounded-2xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 space-y-2">
                <span className="w-7 h-7 rounded-xl bg-indigo-100 dark:bg-indigo-950 text-indigo-700 dark:text-indigo-300 font-bold text-xs flex items-center justify-center">
                  2
                </span>
                <div className="font-bold text-sm text-zinc-900 dark:text-white">Pay All Minimums</div>
                <p className="text-xs text-zinc-500 leading-relaxed">
                  Keep every account current. Set up automated minimum payments to avoid late penalty fees and credit score damage.
                </p>
              </div>

              <div className="p-4 rounded-2xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 space-y-2">
                <span className="w-7 h-7 rounded-xl bg-indigo-100 dark:bg-indigo-950 text-indigo-700 dark:text-indigo-300 font-bold text-xs flex items-center justify-center">
                  3
                </span>
                <div className="font-bold text-sm text-zinc-900 dark:text-white">Attack Target #1</div>
                <p className="text-xs text-zinc-500 leading-relaxed">
                  Throw every spare dollar (tax refunds, side hustle, budget cuts) at your primary target debt until it reaches $0.
                </p>
              </div>

              <div className="p-4 rounded-2xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 space-y-2">
                <span className="w-7 h-7 rounded-xl bg-indigo-100 dark:bg-indigo-950 text-indigo-700 dark:text-indigo-300 font-bold text-xs flex items-center justify-center">
                  4
                </span>
                <div className="font-bold text-sm text-zinc-900 dark:text-white">Roll Over and Repeat</div>
                <p className="text-xs text-zinc-500 leading-relaxed">
                  Add the wiped-out debt&rsquo;s minimum payment to your extra cash and attack debt #2. Your monthly payment power compounds.
                </p>
              </div>
            </div>
          </section>

          {/* Section: Frequently Asked Questions */}
          <section className="space-y-6 pt-4">
            <div className="flex items-center gap-2 text-indigo-600 dark:text-indigo-400 text-sm font-semibold tracking-wide uppercase">
              <HelpCircle className="w-4 h-4" />
              <span>Frequently Asked Questions</span>
            </div>
            <h3 className="text-2xl font-bold tracking-tight text-zinc-900 dark:text-white">
              Debt Payoff FAQ
            </h3>

            <div className="space-y-4">
              <div className="p-5 rounded-2xl bg-white dark:bg-zinc-900 border border-zinc-200/80 dark:border-zinc-800 shadow-sm space-y-2">
                <h4 className="font-semibold text-zinc-900 dark:text-white text-base">
                  What if two debts have the same interest rate or balance?
                </h4>
                <p className="text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed">
                  In a tie scenario, always target the debt with the smaller balance first. Eliminating an account completely frees up its minimum monthly payment and simplifies your monthly bill-paying logistics.
                </p>
              </div>

              <div className="p-5 rounded-2xl bg-white dark:bg-zinc-900 border border-zinc-200/80 dark:border-zinc-800 shadow-sm space-y-2">
                <h4 className="font-semibold text-zinc-900 dark:text-white text-base">
                  Should I build an emergency fund before starting the debt snowball or avalanche?
                </h4>
                <p className="text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed">
                  Yes! Financial planners universally recommend building a starter emergency buffer of $1,000 to $2,000 (or 1 month of basic living expenses) before aggressively tackling debt. Without a small safety net, unexpected car repairs or medical bills will force you right back into credit card debt.
                </p>
              </div>

              <div className="p-5 rounded-2xl bg-white dark:bg-zinc-900 border border-zinc-200/80 dark:border-zinc-800 shadow-sm space-y-2">
                <h4 className="font-semibold text-zinc-900 dark:text-white text-base">
                  Can I switch from Snowball to Avalanche halfway through?
                </h4>
                <p className="text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed">
                  Absolutely. Many people begin with the Debt Snowball to knock out 2 or 3 nagging, small-balance accounts quickly. Once they feel empowered and have fewer accounts to manage, they switch to the Debt Avalanche to minimize interest on large remaining balances.
                </p>
              </div>
            </div>
          </section>

          {/* Related Calculators Cross-linking */}
          <section className="space-y-4 pt-6 border-t border-zinc-200 dark:border-zinc-800">
            <h3 className="text-lg font-bold text-zinc-900 dark:text-white">
              Explore Related Financial Planning Engines
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <Link
                href="/calculators/credit-card-payoff-calculator"
                className="p-4 rounded-2xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 hover:border-rose-500/40 hover:shadow-md transition group"
              >
                <div className="flex items-center gap-2 text-rose-600 mb-1">
                  <CreditCard className="w-4 h-4" />
                  <span className="text-xs font-bold uppercase tracking-wider">Single Card Amortization</span>
                </div>
                <h4 className="font-bold text-sm text-zinc-900 dark:text-white group-hover:text-rose-600 transition">
                  Credit Card Payoff Calculator
                </h4>
                <p className="text-xs text-zinc-500 mt-1">
                  Calculate payoff timeline and total interest saved with extra monthly payments on a single card.
                </p>
              </Link>

              <Link
                href="/calculators/how-long-will-my-money-last"
                className="p-4 rounded-2xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 hover:border-teal-500/40 hover:shadow-md transition group"
              >
                <div className="flex items-center gap-2 text-teal-600 mb-1">
                  <TrendingDown className="w-4 h-4" />
                  <span className="text-xs font-bold uppercase tracking-wider">Savings Runway</span>
                </div>
                <h4 className="font-bold text-sm text-zinc-900 dark:text-white group-hover:text-teal-600 transition">
                  How Long Will My Money Last?
                </h4>
                <p className="text-xs text-zinc-500 mt-1">
                  Simulate portfolio runway, inflation impact, and Safe Withdrawal Rates (SWR).
                </p>
              </Link>

              <Link
                href="/calculators/ramsey-investment-calculator"
                className="p-4 rounded-2xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 hover:border-emerald-500/40 hover:shadow-md transition group"
              >
                <div className="flex items-center gap-2 text-emerald-600 mb-1">
                  <TrendingUp className="w-4 h-4" />
                  <span className="text-xs font-bold uppercase tracking-wider">Wealth Building</span>
                </div>
                <h4 className="font-bold text-sm text-zinc-900 dark:text-white group-hover:text-emerald-600 transition">
                  Dave Ramsey 15% Investment Calculator
                </h4>
                <p className="text-xs text-zinc-500 mt-1">
                  Project retirement wealth using Baby Step 4 and the 4-fund portfolio allocation.
                </p>
              </Link>
            </div>
          </section>
        </article>
      </main>

      <Footer />
    </div>
  );
}
