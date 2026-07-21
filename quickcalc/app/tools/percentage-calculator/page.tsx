import ThemeToggle from "@/components/ThemeToggle";
import Breadcrumbs from "@/components/Breadcrumbs";
import type { Metadata } from "next";
import Link from "next/link";
import PercentageCalculatorWidget from "./PercentageCalculatorWidget";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "Percentage Calculator - Find % of Any Number, Increase, Decrease & Discounts | QuickCalc",
  description: "Calculate percentage increase/decrease, fractions of numbers, discount values, and reverse percentages instantly with our live percentage calculator.",
  alternates: {
    canonical: "/tools/percentage-calculator",
  },
  openGraph: {
    title: "Percentage Calculator - Find % of Any Number, Increase, Decrease & Discounts | QuickCalc",
    description: "Calculate percentage increase/decrease, fractions of numbers, discount values, and reverse percentages instantly with our live percentage calculator.",
    url: "https://quickcalc.cloud/tools/percentage-calculator",
    type: "website",
    siteName: "QuickCalc",
    images: [
      {
        url: "https://quickcalc.cloud/og-image.png",
        width: 1200,
        height: 630,
        alt: "Percentage Calculator on QuickCalc",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Percentage Calculator - Find % of Any Number, Increase, Decrease & Discounts | QuickCalc",
    description: "Calculate percentage increase/decrease, fractions of numbers, discount values, and reverse percentages instantly with our live percentage calculator.",
    images: ["https://quickcalc.cloud/og-image.png"],
  },
};

export default function PercentageCalculatorPage() {
  const faqData = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      {
        "@type": "Question",
        "name": "How do you calculate percentage of a number?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "To calculate the percentage of a number, multiply the number by the percentage value and then divide the result by 100. For example, to find 20% of 1500: (20 * 1500) / 100 = 300."
        }
      },
      {
        "@type": "Question",
        "name": "How do I calculate a percentage increase or decrease?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "To calculate percentage change: subtract the old value from the new value, divide that difference by the old value, and then multiply by 100. A positive result indicates an increase, while a negative result represents a decrease."
        }
      },
      {
        "@type": "Question",
        "name": "What is reverse percentage?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Reverse percentage means working backwards from a known final value and percentage to find the original value. For example, if you know a value is 30% of the original, you divide the final value by 0.30 to find the original."
        }
      },
      {
        "@type": "Question",
        "name": "How do you find the final price after a discount?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Multiply the original price by the discount percentage and divide by 100 to find the saved amount. Subtract that saved amount from the original price to find the final price. For example, a 15% discount on $80 saves $12, making the final price $68."
        }
      }
    ]
  };

  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-zinc-950 text-zinc-900 dark:text-zinc-100 font-[family-name:var(--font-geist-sans)] transition-colors">
      {/* FAQ Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqData) }}
      />

      {/* Header */}
      <header className="border-b border-zinc-200 dark:border-zinc-800 bg-white/80 dark:bg-zinc-900/80 backdrop-blur-md sticky top-0 z-50 transition-colors">
        <div className="max-w-4xl mx-auto px-4 h-16 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2 font-bold text-lg text-blue-600 dark:text-blue-400">
            <span>⚖️ QuickCalc</span>
          </Link>
          <nav className="flex items-center gap-2 sm:gap-4">
            <Link href="/" className="text-sm font-medium text-zinc-600 dark:text-zinc-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
              Home
            </Link>
            <Link href="/blog" className="text-sm font-medium text-zinc-600 dark:text-zinc-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
              Blog
            </Link>
            <span className="text-sm font-medium text-zinc-300 dark:text-zinc-700 font-normal">|</span>
            <span className="text-sm font-medium text-zinc-300 dark:text-zinc-700">|</span>
            <span className="text-sm font-medium text-zinc-400 dark:text-zinc-600">Percentage Calculator</span>
            <span className="text-sm font-medium text-zinc-300 dark:text-zinc-700 font-normal">|</span>
            <ThemeToggle />
          </nav>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-4xl mx-auto px-4 py-8 sm:py-12">
        <Breadcrumbs toolName="Percentage Calculator" toolSlug="percentage-calculator" />
        <div className="text-center max-w-2xl mx-auto mb-8">
          <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-zinc-900 dark:text-white mb-4">
            Percentage Calculator
          </h1>
          <p className="text-base sm:text-lg text-zinc-600 dark:text-zinc-400 leading-relaxed">
            Quickly calculate percentages, percentage increase or decrease, discounts, and reverse percentages. Enter your values below to see instant calculations and formula breakdowns in real time.
          </p>
        </div>

        {/* The interactive widget */}
        <section className="my-8">
          <PercentageCalculatorWidget />
        </section>

        {/* Ad Placement 1 */}
        <div className="ad-slot ad-slot--inline" data-ad-position="in-content-1">
          <div className="ad-placeholder-label border border-dashed border-zinc-300 dark:border-zinc-800 rounded-xl py-4 flex items-center justify-center bg-zinc-50/50 dark:bg-zinc-950/20 text-[10px] font-bold text-zinc-400 dark:text-zinc-600 uppercase tracking-widest cursor-default">
            Advertisement
          </div>
        </div>

        {/* Detailed Explanation */}
        <article className="prose prose-zinc dark:prose-invert max-w-3xl mx-auto space-y-8 mt-12 border-t border-zinc-200 dark:border-zinc-800 pt-10">
          <section className="space-y-4">
            <h2 className="text-2xl font-bold text-zinc-950 dark:text-white">
              How Percentages Help in Daily Calculations
            </h2>
            <p className="text-zinc-600 dark:text-zinc-400 leading-relaxed">
              Percentages are used in almost every aspect of life—from measuring shopping discounts and corporate growth statistics to comparing financial performance or analyzing test results. Our calculator supports four essential mathematical configurations:
            </p>
            <ul className="list-disc pl-6 text-zinc-600 dark:text-zinc-400 space-y-2">
              <li>
                <strong>Fractions of Numbers (X% of Y):</strong> Perfect for basic percentage calculations such as tax rates or simple portions.
              </li>
              <li>
                <strong>Percentage Changes:</strong> Computes the difference from an older base value to a newer target value, clearly highlighting whether it is an increase or decrease.
              </li>
              <li>
                <strong>Discounts and Savings:</strong> Instantly subtracts markdown percentages from base prices to find net price alongside the actual amount saved.
              </li>
              <li>
                <strong>Reverse Percentages:</strong> Crucial when you only know a finished portion or net amount and need to reconstruct the original base value.
              </li>
            </ul>
          </section>

          {/* Ad Placement 2 */}
          <div className="ad-slot ad-slot--inline" data-ad-position="in-content-2">
            <div className="ad-placeholder-label border border-dashed border-zinc-300 dark:border-zinc-800 rounded-xl py-4 flex items-center justify-center bg-zinc-50/50 dark:bg-zinc-950/20 text-[10px] font-bold text-zinc-400 dark:text-zinc-600 uppercase tracking-widest cursor-default">
              Advertisement
            </div>
          </div>

          {/* FAQ Accordion */}
          <section className="space-y-4 border-t border-zinc-200 dark:border-zinc-800 pt-8">
            <h2 className="text-2xl font-bold text-zinc-950 dark:text-white">
              Frequently Asked Questions (FAQ)
            </h2>
            <div className="space-y-3">
              <details className="group border border-zinc-200 dark:border-zinc-800 rounded-lg p-4 bg-white dark:bg-zinc-900 transition-all duration-150 [&_summary::-webkit-details-marker]:hidden">
                <summary className="flex justify-between items-center font-semibold text-zinc-800 dark:text-zinc-200 cursor-pointer focus:outline-none">
                  <span>How do you calculate percentage of a number?</span>
                  <span className="transition group-open:rotate-180 text-zinc-400 dark:text-zinc-500">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" className="w-5 h-5">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
                    </svg>
                  </span>
                </summary>
                <p className="text-zinc-600 dark:text-zinc-400 mt-3 text-sm leading-relaxed">
                  To calculate the percentage of a number, multiply the number by the percentage value and then divide the result by 100. For example, to find 20% of 1500: (20 * 1500) / 100 = 300.
                </p>
              </details>

              <details className="group border border-zinc-200 dark:border-zinc-800 rounded-lg p-4 bg-white dark:bg-zinc-900 transition-all duration-150 [&_summary::-webkit-details-marker]:hidden">
                <summary className="flex justify-between items-center font-semibold text-zinc-800 dark:text-zinc-200 cursor-pointer focus:outline-none">
                  <span>How do I calculate a percentage increase or decrease?</span>
                  <span className="transition group-open:rotate-180 text-zinc-400 dark:text-zinc-500">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" className="w-5 h-5">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
                    </svg>
                  </span>
                </summary>
                <p className="text-zinc-600 dark:text-zinc-400 mt-3 text-sm leading-relaxed">
                  To calculate percentage change: subtract the old value from the new value, divide that difference by the old value, and then multiply by 100. A positive result indicates an increase, while a negative result represents a decrease.
                </p>
              </details>

              <details className="group border border-zinc-200 dark:border-zinc-800 rounded-lg p-4 bg-white dark:bg-zinc-900 transition-all duration-150 [&_summary::-webkit-details-marker]:hidden">
                <summary className="flex justify-between items-center font-semibold text-zinc-800 dark:text-zinc-200 cursor-pointer focus:outline-none">
                  <span>What is reverse percentage?</span>
                  <span className="transition group-open:rotate-180 text-zinc-400 dark:text-zinc-500">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" className="w-5 h-5">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
                    </svg>
                  </span>
                </summary>
                <p className="text-zinc-600 dark:text-zinc-400 mt-3 text-sm leading-relaxed">
                  Reverse percentage means working backwards from a known final value and percentage to find the original value. For example, if you know a value is 30% of the original, you divide the final value by 0.30 to find the original.
                </p>
              </details>

              <details className="group border border-zinc-200 dark:border-zinc-800 rounded-lg p-4 bg-white dark:bg-zinc-900 transition-all duration-150 [&_summary::-webkit-details-marker]:hidden">
                <summary className="flex justify-between items-center font-semibold text-zinc-800 dark:text-zinc-200 cursor-pointer focus:outline-none">
                  <span>How do you find the final price after a discount?</span>
                  <span className="transition group-open:rotate-180 text-zinc-400 dark:text-zinc-500">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" className="w-5 h-5">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
                    </svg>
                  </span>
                </summary>
                <p className="text-zinc-600 dark:text-zinc-400 mt-3 text-sm leading-relaxed">
                  Multiply the original price by the discount percentage and divide by 100 to find the saved amount. Subtract that saved amount from the original price to find the final price. For example, a 15% discount on $80 saves $12, making the final price $68.
                </p>
              </details>
            </div>
          </section>
        </article>

        {/* Related Tools */}
        <section className="max-w-3xl mx-auto border-t border-zinc-200 dark:border-zinc-800 mt-12 pt-8">
          <h3 className="text-xl font-bold text-zinc-900 dark:text-white mb-6">
            Related Financial & Conversion Tools
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 p-5 rounded-xl hover:shadow-md transition duration-200">
              <span className="text-2xl mb-2 block">🏠</span>
              <h4 className="font-bold text-zinc-900 dark:text-white text-base">Loan / EMI Calculator</h4>
              <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-2">
                Estimate monthly installments, custom interest rates, and overall payoff terms.
              </p>
              <Link href="/tools/loan-calculator" className="inline-block text-xs font-semibold text-blue-500 dark:text-blue-400 mt-4 hover:underline">
                Use Tool &rarr;
              </Link>
            </div>

            <div className="border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 p-5 rounded-xl hover:shadow-md transition duration-200">
              <span className="text-2xl mb-2 block">💵</span>
              <h4 className="font-bold text-zinc-900 dark:text-white text-base">Tip Calculator</h4>
              <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-2">
                Determine standard gratuities, customize tip percentages in real time, and split group checks cleanly.
              </p>
              <Link href="/tools/tip-calculator" className="inline-block text-xs font-semibold text-blue-500 dark:text-blue-400 mt-4 hover:underline">
                Use Tool &rarr;
              </Link>
            </div>
          </div>
        </section>

        {/* Ad Placement Footer */}
        <div className="ad-slot ad-slot--footer mt-12" data-ad-position="footer">
          <div className="ad-placeholder-label border border-dashed border-zinc-300 dark:border-zinc-800 rounded-xl py-4 flex items-center justify-center bg-zinc-50/50 dark:bg-zinc-950/20 text-[10px] font-bold text-zinc-400 dark:text-zinc-600 uppercase tracking-widest cursor-default">
            Advertisement
          </div>
        </div>
      </main>

      {/* Footer */}
      <Footer customText="Intuitive, client-side percentage, discount, and change calculators." />
    </div>
  );
}
