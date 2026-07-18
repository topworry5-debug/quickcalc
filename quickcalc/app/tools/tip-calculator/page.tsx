import type { Metadata } from "next";
import Link from "next/link";
import TipCalculatorWidget from "./TipCalculatorWidget";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "Tip Calculator - Live Bill Splitter & Custom Percentages | QuickCalc",
  description: "Test custom tips instantly with a slider. Split bills evenly between groups, calculate tip per person, and copy detailed billing breakdowns locally.",
  alternates: {
    canonical: "/tools/tip-calculator",
  },
  openGraph: {
    title: "Tip Calculator - Live Bill Splitter & Custom Percentages | QuickCalc",
    description: "Test custom tips instantly with a slider. Split bills evenly between groups, calculate tip per person, and copy detailed billing breakdowns locally.",
    url: "https://quickcalc.cloud/tools/tip-calculator",
    type: "website",
    siteName: "QuickCalc",
    images: [
      {
        url: "https://quickcalc.cloud/og-image.png",
        width: 1200,
        height: 630,
        alt: "Tip Calculator on QuickCalc",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Tip Calculator - Live Bill Splitter & Custom Percentages | QuickCalc",
    description: "Test custom tips instantly with a slider. Split bills evenly between groups, calculate tip per person, and copy detailed billing breakdowns locally.",
    images: ["https://quickcalc.cloud/og-image.png"],
  },
};

export default function TipCalculatorPage() {
  const faqData = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      {
        "@type": "Question",
        "name": "How much should I tip?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Tipping customs vary heavily by country and service sector. In North America, standard dining tips range from 15% to 20% for good service, while other nations may have tips included directly in the bill as a service charge, or tip nominal rounding change."
        }
      },
      {
        "@type": "Question",
        "name": "How do I split a bill and tip evenly among a group?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "The easiest way is to calculate the total bill (with tip included) and divide that grand total by the number of group members. This ensures everyone pays an identical split portion of both the base food cost and the server gratuity."
        }
      },
      {
        "@type": "Question",
        "name": "Should tip be calculated before or after tax?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Standard restaurant etiquette recommends calculating the tip percentage on the pre-tax subtotal of the bill. However, many people tip on the final post-tax total for convenience or to provide a slightly higher gratuity."
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
            <span className="text-sm font-medium text-zinc-300 dark:text-zinc-700">|</span>
            <span className="text-sm font-medium text-zinc-400 dark:text-zinc-600">Tip Calculator</span>
          </nav>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-4xl mx-auto px-4 py-8 sm:py-12">
        <div className="text-center max-w-2xl mx-auto mb-8">
          <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-zinc-900 dark:text-white mb-4">
            Tip & Bill Split Calculator
          </h1>
          <p className="text-base sm:text-lg text-zinc-600 dark:text-zinc-400 leading-relaxed">
            Determine standard gratuities, customize tip percentages in real time, and split group checks cleanly. QuickCalc processes input changes on the fly with no bulky calculate button or reloading needed.
          </p>
        </div>

        {/* The interactive widget */}
        <section className="my-8">
          <TipCalculatorWidget />
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
              Understanding Tipping Etiquette & Bill Splitting
            </h2>
            <p className="text-zinc-600 dark:text-zinc-400 leading-relaxed">
              Gratuity rules are fluid, depending greatly on geographical region, local dining cultures, and service quality. In standard sit-down restaurants across North America, tipping **15% to 20%** is typical, whereas European countries often integrate a service fee directly into the bill or expect a modest roundup instead of massive percentages.
            </p>
            <p className="text-zinc-600 dark:text-zinc-400 leading-relaxed">
              When dining in large parties, managing checks can get confusing. Group members typically choose one of two distinct splitting philosophies:
            </p>
            <ul className="list-disc pl-6 text-zinc-600 dark:text-zinc-400 space-y-2">
              <li>
                <strong>Even Group Splits:</strong> The entire invoice (subtotal + tax + selected gratuity) is divided symmetrically by the total head count. This is ideal for groups sharing family-style plates or bottles of wine where split values align evenly.
              </li>
              <li>
                <strong>Individual Bill & Tip Covering:</strong> Each dining member adds up their custom items, pays tax on that subtotal, and selects an individual tip percentage suited to their personal experience.
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
                  <span>How much should I tip?</span>
                  <span className="transition group-open:rotate-180 text-zinc-400 dark:text-zinc-500">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" className="w-5 h-5">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
                    </svg>
                  </span>
                </summary>
                <p className="text-zinc-600 dark:text-zinc-400 mt-3 text-sm leading-relaxed">
                  While 15% is typically regarded as the standard benchmark in sit-down environments in the US, exceptional hospitality often warrants 18% to 20%+. For cafes or basic takeaway counters, tipping is entirely optional but 10% is heavily appreciated by workers.
                </p>
              </details>

              <details className="group border border-zinc-200 dark:border-zinc-800 rounded-lg p-4 bg-white dark:bg-zinc-900 transition-all duration-150 [&_summary::-webkit-details-marker]:hidden">
                <summary className="flex justify-between items-center font-semibold text-zinc-800 dark:text-zinc-200 cursor-pointer focus:outline-none">
                  <span>How do I split a bill and tip evenly among a group?</span>
                  <span className="transition group-open:rotate-180 text-zinc-400 dark:text-zinc-500">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" className="w-5 h-5">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
                    </svg>
                  </span>
                </summary>
                <p className="text-zinc-600 dark:text-zinc-400 mt-3 text-sm leading-relaxed">
                  Using our split slider above, input the complete subtotal, adjust the group split headcount, and the widget will instantly calculate both the per-person tip and total group share cleanly.
                </p>
              </details>

              <details className="group border border-zinc-200 dark:border-zinc-800 rounded-lg p-4 bg-white dark:bg-zinc-900 transition-all duration-150 [&_summary::-webkit-details-marker]:hidden">
                <summary className="flex justify-between items-center font-semibold text-zinc-800 dark:text-zinc-200 cursor-pointer focus:outline-none">
                  <span>Should tip be calculated before or after tax?</span>
                  <span className="transition group-open:rotate-180 text-zinc-400 dark:text-zinc-500">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" className="w-5 h-5">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
                    </svg>
                  </span>
                </summary>
                <p className="text-zinc-600 dark:text-zinc-400 mt-3 text-sm leading-relaxed">
                  Technically, tips are designed to reward service, which is independent of state sales tax. Gratuities are calculated on the food subtotal before adding taxes. However, because credit card receipt totals often group items, tipping on the full post-tax total is standard for convenience.
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
              <span className="text-2xl mb-2 block">📈</span>
              <h4 className="font-bold text-zinc-900 dark:text-white text-base">GPA Converter</h4>
              <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-2">
                Transform standard high school and collegiate grades into weighted/unweighted values easily.
              </p>
              <Link href="/tools/gpa-converter" className="inline-block text-xs font-semibold text-blue-500 dark:text-blue-400 mt-4 hover:underline">
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
      <Footer customText="Intuitive, client-side gratuity and splitting calculators." />
    </div>
  );
}
