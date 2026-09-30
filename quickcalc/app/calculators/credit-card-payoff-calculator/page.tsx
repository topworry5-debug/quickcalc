import React, { Suspense } from "react";
import type { Metadata } from "next";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ShareButtons from "@/components/ShareButtons";
import EmbedWidget from "@/components/EmbedWidget";
import CreditCardPayoffWidget from "./CreditCardPayoffWidget";
import {
  Sparkles,
  BookOpen,
  HelpCircle,
  ShieldCheck,
  CheckCircle2,
  Zap,
} from "lucide-react";

export const metadata: Metadata = {
  title: "Credit Card Payoff Calculator - Calculate Debt-Free Date & Interest Saved | QuickCalc",
  description:
    "Free credit card payoff calculator. Find out how long it will take to clear your credit card debt, how much interest you will pay, and how extra payments save you money.",
  alternates: {
    canonical: "https://quickcalc.cloud/calculators/credit-card-payoff-calculator",
  },
  openGraph: {
    title: "Credit Card Payoff Calculator - Calculate Debt-Free Date & Interest Saved | QuickCalc",
    description:
      "Free credit card payoff calculator. Find out how long it will take to clear your credit card debt, how much interest you will pay, and how extra payments save you money.",
    url: "https://quickcalc.cloud/calculators/credit-card-payoff-calculator",
    type: "website",
    siteName: "QuickCalc",
    images: [
      {
        url: "https://quickcalc.cloud/og-image.png",
        width: 1200,
        height: 630,
        alt: "Credit Card Payoff Calculator on QuickCalc",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Credit Card Payoff Calculator - Calculate Debt-Free Date & Interest Saved | QuickCalc",
    description:
      "Free credit card payoff calculator. Find out how long it will take to clear your credit card debt, how much interest you will pay, and how extra payments save you money.",
  },
};

export default function CreditCardPayoffPage({
  searchParams,
}: {
  searchParams?: { embed?: string };
}) {
  const isEmbed = searchParams?.embed === "true";

  // Structured Data: SoftwareApplication Schema
  const softwareSchema = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: "Credit Card Payoff Calculator",
    description:
      "Interactive credit card amortization and payoff calculator. Computes debt-free dates, compound interest costs, and extra payment acceleration.",
    applicationCategory: "FinanceApplication",
    operatingSystem: "All",
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "USD",
    },
    url: "https://quickcalc.cloud/calculators/credit-card-payoff-calculator",
  };

  // Structured Data: FAQPage Schema
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: "How is credit card interest calculated monthly?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Credit card companies calculate interest using your Annual Percentage Rate (APR) divided by 12 (or 365 for daily compounding). For example, a 24% APR equals a 2.0% monthly interest rate. On a $8,500 balance, the first month's interest charge alone is $170. If you only pay $200, only $30 goes toward reducing your actual principal.",
        },
      },
      {
        "@type": "Question",
        name: "What happens if I only pay the minimum payment on my credit card?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Paying only the minimum (typically 1% to 2% of the balance plus monthly interest) can drag debt payoff out for 15 to 25+ years and cause you to pay 2x to 3x your original balance in pure interest. By paying a fixed amount higher than the minimum, you dramatically shorten the timeline.",
        },
      },
      {
        "@type": "Question",
        name: "Debt Snowball vs. Debt Avalanche: Which strategy clears credit card debt faster?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "The Debt Avalanche method pays off balances in order of highest APR first, saving the absolute maximum dollar amount in interest. The Debt Snowball method pays off smallest balances first regardless of interest rate, creating quick psychological wins that keep you motivated. Mathematically, Avalanche saves more money, but Snowball often has higher real-world completion rates.",
        },
      },
      {
        "@type": "Question",
        name: "How does adding an extra $50 or $100 per month help?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Extra payments bypass monthly interest entirely and are applied 100% toward your principal debt. On an $8,500 balance at 22.99% APR with a $300 monthly payment, adding an extra $50/month cuts your debt-free time by over 10 months and saves more than $1,100 in total interest.",
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
        item: "https://quickcalc.cloud/calculators/credit-card-payoff-calculator",
      },
      {
        "@type": "ListItem",
        position: 3,
        name: "Credit Card Payoff Calculator",
        item: "https://quickcalc.cloud/calculators/credit-card-payoff-calculator",
      },
    ],
  };

  // Embed Mode View (renders minimal container for iframe embeds)
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
                Loading credit card payoff calculator...
              </div>
            }
          >
            <CreditCardPayoffWidget />
          </Suspense>
        </main>
      </div>
    );
  }

  // Full Page View
  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-zinc-950 text-zinc-900 dark:text-zinc-100 font-sans transition-colors selection:bg-rose-500/20 selection:text-rose-700">
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
              <Link href="/" className="hover:text-rose-600 dark:hover:text-rose-400 transition-colors">
                Home
              </Link>
            </li>
            <li className="select-none text-zinc-300 dark:text-zinc-700 font-normal">&gt;</li>
            <li>
              <Link href="/" className="hover:text-rose-600 dark:hover:text-rose-400 transition-colors">
                Calculators
              </Link>
            </li>
            <li className="select-none text-zinc-300 dark:text-zinc-700 font-normal">&gt;</li>
            <li className="text-zinc-900 dark:text-zinc-100 font-semibold truncate">
              Credit Card Payoff Calculator
            </li>
          </ol>
        </nav>

        {/* Hero Title & Description */}
        <div className="text-center max-w-3xl mx-auto mb-10">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-rose-500/10 text-rose-700 dark:text-rose-300 border border-rose-500/20 mb-4">
            <Sparkles className="w-3.5 h-3.5 text-rose-600" />
            <span>Debt-Free Timeline &amp; Compound Interest Simulator</span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-zinc-900 dark:text-white mb-4">
            Credit Card Payoff Calculator
          </h1>

          <p className="text-base sm:text-lg text-zinc-600 dark:text-zinc-400 leading-relaxed max-w-2xl mx-auto">
            Find out exactly when you&apos;ll be debt-free, calculate total interest charges, and see how small extra payments shave years and thousands of dollars off your cards.
          </p>
        </div>

        {/* Social Sharing & Embed Actions */}
        <div className="mb-8 flex flex-wrap items-center justify-center gap-3">
          <ShareButtons
            url="https://quickcalc.cloud/calculators/credit-card-payoff-calculator"
            title="Credit Card Payoff Calculator - Debt-Free Date & Interest Saved | QuickCalc"
          />
          <EmbedWidget
            url="https://quickcalc.cloud/calculators/credit-card-payoff-calculator"
            title="Credit Card Payoff Calculator"
          />
        </div>

        {/* Main Interactive Tool Widget */}
        <section className="my-8">
          <Suspense
            fallback={
              <div className="p-12 text-center text-zinc-500 bg-white dark:bg-zinc-900 rounded-3xl border border-zinc-200 dark:border-zinc-800 animate-pulse font-mono text-sm">
                Calculating credit card amortization schedule...
              </div>
            }
          >
            <CreditCardPayoffWidget />
          </Suspense>
        </section>

        {/* ========================================================
            ON-PAGE EDITORIAL CONTENT & COMPREHENSIVE GUIDE
           ======================================================== */}
        <article className="prose prose-zinc dark:prose-invert max-w-4xl mx-auto space-y-12 mt-14 border-t border-zinc-200 dark:border-zinc-800 pt-10">
          {/* Section 1: How Credit Card Interest Really Works */}
          <section className="space-y-4">
            <div className="flex items-center gap-2 text-rose-600 dark:text-rose-400 text-sm font-bold uppercase tracking-wider">
              <BookOpen className="w-4 h-4" />
              <span>Understanding The Math</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-zinc-900 dark:text-white tracking-tight">
              The True Cost of High-APR Revolving Credit Card Debt
            </h2>
            <p className="text-zinc-600 dark:text-zinc-400 leading-relaxed">
              Unlike fixed-rate installment loans (like auto loans or 30-year fixed mortgages), credit card debt operates under <strong>daily compound interest</strong> tied to a variable APR. If you carry a balance from month to month, the credit card issuer divides your APR by 365 to determine your daily periodic rate (DPR), multiplies that by your average daily balance, and adds that accrued charge onto your principal at the end of each billing cycle.
            </p>
            <p className="text-zinc-600 dark:text-zinc-400 leading-relaxed">
              When interest is added back to your balance, you begin paying interest on prior interest—a compounding spiral in reverse that works aggressively against your wealth.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 my-6 not-prose">
              <div className="p-5 rounded-2xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 space-y-2">
                <div className="flex items-center gap-2 text-rose-600 font-bold text-sm">
                  <ShieldCheck className="w-4 h-4" />
                  <span>The Minimum Payment Trap</span>
                </div>
                <p className="text-xs text-zinc-600 dark:text-zinc-400 leading-relaxed">
                  Minimum payment formulas are designed to maximize bank profits. Typically set at 1% of the principal balance plus accrued finance charges, making only minimum payments ensures that 80% to 90% of your payment is consumed by interest every month.
                </p>
              </div>

              <div className="p-5 rounded-2xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 space-y-2">
                <div className="flex items-center gap-2 text-emerald-600 font-bold text-sm">
                  <Zap className="w-4 h-4" />
                  <span>The Power of Principal Overpayments</span>
                </div>
                <p className="text-xs text-zinc-600 dark:text-zinc-400 leading-relaxed">
                  Every single dollar you pay above your monthly interest charge directly reduces the principal balance. This lowers the base on which next month&apos;s interest is calculated, triggering an exponential acceleration toward zero debt.
                </p>
              </div>
            </div>
          </section>

          {/* Section 2: Debt Snowball vs. Debt Avalanche */}
          <section className="space-y-4">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-zinc-900 dark:text-white tracking-tight">
              Debt Avalanche vs. Debt Snowball: Choosing Your Payoff Strategy
            </h2>
            <p className="text-zinc-600 dark:text-zinc-400 leading-relaxed">
              If you are tackling balances across multiple credit cards or consumer loans, two proven mathematical and behavioral strategies dominate personal finance:
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 not-prose my-6">
              <div className="p-6 rounded-3xl bg-white dark:bg-zinc-900 border-2 border-emerald-500/30 space-y-3">
                <div className="inline-flex px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-emerald-500/10 text-emerald-700 dark:text-emerald-300 border border-emerald-500/20">
                  Mathematically Optimal
                </div>
                <h3 className="text-xl font-bold text-zinc-900 dark:text-white">The Debt Avalanche Method</h3>
                <p className="text-xs text-zinc-600 dark:text-zinc-400 leading-relaxed">
                  List all cards in order of highest APR to lowest APR regardless of balance. Make minimum payments on all cards except the highest APR card, throwing every spare dollar at that top-rate debt.
                </p>
                <div className="pt-2 border-t border-zinc-100 dark:border-zinc-800 text-xs font-semibold text-emerald-600 dark:text-emerald-400 flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4" />
                  <span>Saves the maximum dollar amount in interest fees</span>
                </div>
              </div>

              <div className="p-6 rounded-3xl bg-white dark:bg-zinc-900 border-2 border-rose-500/30 space-y-3">
                <div className="inline-flex px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-rose-500/10 text-rose-700 dark:text-rose-300 border border-rose-500/20">
                  Behaviorally Proven
                </div>
                <h3 className="text-xl font-bold text-zinc-900 dark:text-white">The Debt Snowball Method</h3>
                <p className="text-xs text-zinc-600 dark:text-zinc-400 leading-relaxed">
                  Popularized by personal finance expert Dave Ramsey, this method orders debts from smallest balance to largest balance regardless of interest rate. Knocking out small accounts quickly builds psychological momentum.
                </p>
                <div className="pt-2 border-t border-zinc-100 dark:border-zinc-800 text-xs font-semibold text-rose-600 dark:text-rose-400 flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4" />
                  <span>Creates fast wins and habit reinforcement</span>
                </div>
              </div>
            </div>
          </section>

          {/* Section 3: Frequently Asked Questions (FAQ) */}
          <section className="space-y-6">
            <div className="flex items-center gap-2 text-rose-600 dark:text-rose-400 text-sm font-bold uppercase tracking-wider">
              <HelpCircle className="w-4 h-4" />
              <span>Common Questions</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-zinc-900 dark:text-white tracking-tight">
              Frequently Asked Questions About Credit Card Payoff
            </h2>

            <div className="space-y-4 not-prose">
              <div className="p-5 rounded-2xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 space-y-2">
                <h3 className="font-bold text-zinc-900 dark:text-white text-base">
                  How does adding an extra $50 or $100 per month help?
                </h3>
                <p className="text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed">
                  Extra payments bypass monthly interest entirely and are applied 100% toward your principal debt. On an $8,500 balance at 22.99% APR with a $300 monthly payment, adding an extra $50/month cuts your debt-free time by over 10 months and saves more than $1,100 in total interest.
                </p>
              </div>

              <div className="p-5 rounded-2xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 space-y-2">
                <h3 className="font-bold text-zinc-900 dark:text-white text-base">
                  Should I do a 0% APR balance transfer?
                </h3>
                <p className="text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed">
                  A 0% promotional APR balance transfer card can save you substantial interest if you have a clear plan to pay off the entire transfer before the promotional window (usually 12 to 21 months) expires. Be mindful of the 3% to 5% balance transfer fee upfront, and ensure you do not use the freed-up cards to accumulate new debt.
                </p>
              </div>

              <div className="p-5 rounded-2xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 space-y-2">
                <h3 className="font-bold text-zinc-900 dark:text-white text-base">
                  Will closing my paid-off credit card hurt my credit score?
                </h3>
                <p className="text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed">
                  Closing a credit card can temporarily lower your credit score because it reduces your total available credit (increasing your credit utilization ratio) and may eventually lower your average age of accounts. If the card has no annual fee, keeping it open with a zero balance is typically recommended.
                </p>
              </div>
            </div>
          </section>

          {/* Related Financial Calculators */}
          <section className="pt-8 border-t border-zinc-200 dark:border-zinc-800 not-prose">
            <h3 className="text-lg font-bold text-zinc-900 dark:text-white mb-4">
              Explore Related Financial Tools
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <Link
                href="/calculators/how-long-will-my-money-last"
                className="p-4 rounded-2xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 hover:border-emerald-500/40 hover:shadow-md transition group"
              >
                <span className="text-xs font-bold text-emerald-600 uppercase tracking-wider block mb-1">
                  Retirement Runway
                </span>
                <h4 className="font-bold text-sm text-zinc-900 dark:text-white group-hover:text-emerald-600 transition">
                  How Long Will My Money Last?
                </h4>
                <p className="text-xs text-zinc-500 mt-1">
                  Simulate portfolio longevity and SWR safe withdrawal rates.
                </p>
              </Link>

              <Link
                href="/tools/loan-calculator"
                className="p-4 rounded-2xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 hover:border-rose-500/40 hover:shadow-md transition group"
              >
                <span className="text-xs font-bold text-rose-600 uppercase tracking-wider block mb-1">
                  Fixed Installments
                </span>
                <h4 className="font-bold text-sm text-zinc-900 dark:text-white group-hover:text-rose-600 transition">
                  Loan / EMI Calculator
                </h4>
                <p className="text-xs text-zinc-500 mt-1">
                  Calculate fixed monthly loan payments and interest amortization.
                </p>
              </Link>

              <Link
                href="/tools/savings-growth-calculator"
                className="p-4 rounded-2xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 hover:border-teal-500/40 hover:shadow-md transition group"
              >
                <span className="text-xs font-bold text-teal-600 uppercase tracking-wider block mb-1">
                  Wealth Building
                </span>
                <h4 className="font-bold text-sm text-zinc-900 dark:text-white group-hover:text-teal-600 transition">
                  Savings Growth Calculator
                </h4>
                <p className="text-xs text-zinc-500 mt-1">
                  Model compound interest growth with monthly recurring deposits.
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
