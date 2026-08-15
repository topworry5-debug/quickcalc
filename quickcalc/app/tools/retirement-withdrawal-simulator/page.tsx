import MethodologyAccordion from "@/components/MethodologyAccordion";
import { Suspense } from "react";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import { generateSoftwareAppSchema } from "@/lib/schema";
import RelatedTools from "@/components/RelatedTools";
import ShareButtons from "@/components/ShareButtons";
import EmbedWidget from "@/components/EmbedWidget";
import Breadcrumbs from "@/components/Breadcrumbs";
import type { Metadata } from "next";
import RetirementWithdrawalWidget from "./RetirementWithdrawalWidget";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "Safe Withdrawal Rate Calculator - Retirement Simulator",
  description:
    "Simulate retirement safe withdrawal rates using 96 years of US historical stock, bond, and CPI inflation data. 100% free backtest calculator.",
  alternates: {
    canonical: "/tools/retirement-withdrawal-simulator",
  },
  openGraph: {
    title: "Safe Withdrawal Rate Calculator - Retirement Simulator",
    description:
      "Simulate retirement safe withdrawal rates using 96 years of US historical stock, bond, and CPI inflation data. 100% free backtest calculator.",
    url: "https://quickcalc.cloud/tools/retirement-withdrawal-simulator",
    type: "website",
    siteName: "QuickCalc",
    images: [
      {
        url: "https://quickcalc.cloud/og-image.png",
        width: 1200,
        height: 630,
        alt: "Safe Withdrawal Rate Calculator & Retirement Simulator on QuickCalc",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Safe Withdrawal Rate Calculator - Retirement Simulator",
    description:
      "Simulate retirement safe withdrawal rates using 96 years of US historical stock, bond, and CPI inflation data. 100% free backtest calculator.",
  },
};

export default function RetirementWithdrawalPage({
  searchParams,
}: {
  searchParams?: { embed?: string };
}) {
  const softwareSchema = generateSoftwareAppSchema({
    name: "Safe Withdrawal Rate Calculator - Retirement Simulator",
    description:
      "Simulate retirement safe withdrawal rates using 96 years of US historical stock, bond, and CPI inflation data. 100% free backtest calculator.",
    slug: "retirement-withdrawal-simulator",
    category: "FinancialApplication",
  });

  const isEmbed = searchParams?.embed === "true";
  if (isEmbed) {
    return (
      <div className="min-h-screen bg-white dark:bg-zinc-950 text-zinc-900 dark:text-zinc-100 font-[family-name:var(--font-geist-sans)] transition-colors p-2 flex flex-col justify-between">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(softwareSchema) }}
        />
        <main className="max-w-4xl mx-auto w-full">
          <RetirementWithdrawalWidget />
        </main>
      </div>
    );
  }

  const faqData = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: "What is the 4% rule in retirement planning?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "The 4% rule is a widely cited retirement safe withdrawal rate guideline established by William Bengen (1994) and reinforced by the Trinity Study (1998). It suggests that retirees withdrawing 4% of their initial portfolio in Year 1, adjusted for annual inflation thereafter, historically had a 95%+ probability of portfolio survival over 30 years.",
        },
      },
      {
        "@type": "Question",
        name: "What is Sequence of Returns Risk (SRR)?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Sequence of Returns Risk refers to the vulnerability of a retirement portfolio to severe market downturns occurring in the first 5 to 10 years of retirement. Withdrawing living expenses during a market crash permanently locks in capital losses, reducing principal available for subsequent market recoveries.",
        },
      },
      {
        "@type": "Question",
        name: "How does this simulator calculate historical success rates?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Our simulator runs rolling historical backtests starting from every possible year between 1928 and 2023. For a 30-year horizon, it evaluates 67 rolling 30-year sequences using actual historical S&P 500 stock returns, 10-year Treasury bond yields, and CPI inflation data.",
        },
      },
      {
        "@type": "Question",
        name: "Does this simulator constitute financial advice?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "No. This tool provides simplified historical backtesting for educational perspective only. It does not account for individual tax brackets, investment management fees, healthcare shocks, or future macroeconomic shifts. Always consult a qualified financial planner.",
        },
      },
    ],
  };

  const softwareData = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: "Retirement Safe Withdrawal Rate Simulator",
    operatingSystem: "All",
    applicationCategory: "FinanceApplication",
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "USD",
    },
  };

  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-zinc-950 text-zinc-900 dark:text-zinc-100 font-[family-name:var(--font-geist-sans)] transition-colors">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqData) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(softwareData) }}
      />

      <Navbar />

      <main className="max-w-4xl mx-auto px-4 py-8 sm:py-12">
        <Breadcrumbs toolName="Retirement Withdrawal Simulator" toolSlug="retirement-withdrawal-simulator" />

        <div className="text-center max-w-2xl mx-auto mb-8">
          <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-zinc-900 dark:text-white mb-4">
            Retirement Safe Withdrawal Rate Simulator
          </h1>
          <p className="text-base sm:text-lg text-zinc-600 dark:text-zinc-400 leading-relaxed">
            Use our <strong>safe withdrawal rate calculator</strong> and <strong>retirement simulator</strong> to test whether your savings can withstand historical market cycles. As a complete <strong>4% rule calculator</strong>, it backtests your portfolio mix across 96 years of US stock, bond, and CPI inflation data so you can answer the critical question: <strong>will I run out of money in retirement calculator</strong>?
          </p>
        </div>

        <ShareButtons
          url="https://quickcalc.cloud/tools/retirement-withdrawal-simulator"
          title="Retirement Safe Withdrawal Rate Simulator"
        />
        <EmbedWidget
          url="https://quickcalc.cloud/tools/retirement-withdrawal-simulator"
          title="Retirement Safe Withdrawal Rate Simulator"
        />

        <section className="my-8">
          <Suspense
            fallback={
              <div className="p-8 text-center text-zinc-500 animate-pulse">
                Running historical retirement simulation...
              </div>
            }
          >
            <RetirementWithdrawalWidget />
          </Suspense>
        </section>

        <MethodologyAccordion slug="retirement-withdrawal-simulator" />

        <div className="ad-slot ad-slot--inline" data-ad-position="in-content-1">
          <div className="ad-placeholder-label border border-dashed border-zinc-300 dark:border-zinc-800 rounded-xl py-4 flex items-center justify-center bg-zinc-50/50 dark:bg-zinc-950/20 text-[10px] font-bold text-zinc-400 dark:text-zinc-600 uppercase tracking-widest cursor-default">
            Advertisement
          </div>
        </div>

        <article className="prose prose-zinc dark:prose-invert max-w-3xl mx-auto space-y-8 mt-12 border-t border-zinc-200 dark:border-zinc-800 pt-10">
          <section className="space-y-4">
            <h2 className="text-2xl font-bold text-zinc-950 dark:text-white">
              Understanding Safe Withdrawal Rates &amp; The 4% Rule
            </h2>
            <p className="text-zinc-600 dark:text-zinc-400 leading-relaxed">
              Planning for retirement requires balancing two competing risks: spending too conservatively and sacrificing lifestyle quality, or spending too aggressively and exhausting capital early.
            </p>
            <p className="text-zinc-600 dark:text-zinc-400 leading-relaxed">
              In 1994, financial planner William Bengen published seminal research analyzing historical 30-year retirement periods using US stock and bond market returns. He discovered that a retiree withdrawing 4% of their portfolio in Year 1, and adjusting that initial dollar amount for inflation every subsequent year, never ran out of money over any historical 30-year period examined up to that date.
            </p>
            <p className="text-zinc-600 dark:text-zinc-400 leading-relaxed">
              This concept was reinforced by the 1998 Trinity Study (Cooley, Hubbard, and Walz), establishing the 4% rule as an industry benchmark for sustainable retirement income.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-bold text-zinc-950 dark:text-white">
              Sequence of Returns Risk (SRR): Why Order Matters
            </h2>
            <p className="text-zinc-600 dark:text-zinc-400 leading-relaxed">
              Average long-term market returns can be deceiving. Even if the stock market averages 7% or 8% annual real growth over a 30-year period, experiencing a severe bear market in Years 1 to 5 can devastate a portfolio.
            </p>
            <p className="text-zinc-600 dark:text-zinc-400 leading-relaxed">
              When a retiree sells depreciated assets during a market downturn to fund living expenses, the total shares remaining in the portfolio shrink rapidly. When the market eventually rebounds, there are fewer shares left to compound, permanently impairing portfolio longevity.
            </p>
            <p className="text-zinc-600 dark:text-zinc-400 leading-relaxed mt-4">
              To project growth during your accumulation years before retirement begins, utilize our free{" "}
              <Link
                href="/tools/savings-growth-calculator"
                className="text-emerald-600 dark:text-emerald-400 font-semibold underline hover:text-emerald-700"
              >
                Savings Growth &amp; Compound Interest Calculator
              </Link>.
            </p>
          </section>

          <div className="ad-slot ad-slot--inline" data-ad-position="in-content-2">
            <div className="ad-placeholder-label border border-dashed border-zinc-300 dark:border-zinc-800 rounded-xl py-4 flex items-center justify-center bg-zinc-50/50 dark:bg-zinc-950/20 text-[10px] font-bold text-zinc-400 dark:text-zinc-600 uppercase tracking-widest cursor-default">
              Advertisement
            </div>
          </div>

          <section className="space-y-4 border-t border-zinc-200 dark:border-zinc-800 pt-8">
            <h2 className="text-2xl font-bold text-zinc-950 dark:text-white border-b border-zinc-100 dark:border-zinc-900 pb-2">
              Frequently Asked Questions (FAQ)
            </h2>
            <div className="space-y-6">
              <div className="space-y-2">
                <h3 className="text-base font-bold text-zinc-900 dark:text-zinc-100">
                  What is the 4% rule in retirement planning?
                </h3>
                <p className="text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed">
                  The 4% rule is a widely cited retirement safe withdrawal rate guideline established by William Bengen (1994) and reinforced by the Trinity Study (1998). It suggests that retirees withdrawing 4% of their initial portfolio in Year 1, adjusted for annual inflation thereafter, historically had a 95%+ probability of portfolio survival over 30 years.
                </p>
              </div>

              <div className="space-y-2">
                <h3 className="text-base font-bold text-zinc-900 dark:text-zinc-100">
                  What is Sequence of Returns Risk (SRR)?
                </h3>
                <p className="text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed">
                  Sequence of Returns Risk refers to the vulnerability of a retirement portfolio to severe market downturns occurring in the first 5 to 10 years of retirement. Withdrawing living expenses during a market crash permanently locks in capital losses, reducing principal available for subsequent market recoveries.
                </p>
              </div>

              <div className="space-y-2">
                <h3 className="text-base font-bold text-zinc-900 dark:text-zinc-100">
                  How does this simulator calculate historical success rates?
                </h3>
                <p className="text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed">
                  Our simulator runs rolling historical backtests starting from every possible year between 1928 and 2023. For a 30-year horizon, it evaluates 67 rolling 30-year sequences using actual historical S&amp;P 500 stock returns, 10-year Treasury bond yields, and CPI inflation data.
                </p>
              </div>

              <div className="space-y-2">
                <h3 className="text-base font-bold text-zinc-900 dark:text-zinc-100">
                  Does this simulator constitute financial advice?
                </h3>
                <p className="text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed">
                  No. This tool provides simplified historical backtesting for educational perspective only. It does not account for individual tax brackets, investment management fees, healthcare shocks, or future macroeconomic shifts. Always consult a qualified financial planner.
                </p>
              </div>
            </div>
          </section>
        </article>

        <RelatedTools currentSlug="retirement-withdrawal-simulator" />

        <div className="ad-slot ad-slot--footer mt-12" data-ad-position="footer">
          <div className="ad-placeholder-label border border-dashed border-zinc-300 dark:border-zinc-800 rounded-xl py-4 flex items-center justify-center bg-zinc-50/50 dark:bg-zinc-950/20 text-[10px] font-bold text-zinc-400 dark:text-zinc-600 uppercase tracking-widest cursor-default">
            Advertisement
          </div>
        </div>
      </main>

      <Footer customText="Historical safe withdrawal rate backtesting & retirement portfolio survival modeling." />
    </div>
  );
}
