import ThemeToggle from "@/components/ThemeToggle";
import Breadcrumbs from "@/components/Breadcrumbs";
import type { Metadata } from "next";
import Link from "next/link";
import GroupExpenseSplitterWidget from "./GroupExpenseSplitterWidget";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "Group Expense Splitter - Split Bills Unevenly by Item | QuickCalc",
  description: "Split group restaurant bills, shared travel costs, and shared expenses unevenly by item. Assign custom splits, compute proportional tax/tips, and copy shareable summaries.",
  alternates: {
    canonical: "/tools/group-expense-splitter",
  },
  openGraph: {
    title: "Group Expense Splitter - Split Bills Unevenly by Item | QuickCalc",
    description: "Split group restaurant bills, shared travel costs, and shared expenses unevenly by item. Assign custom splits, compute proportional tax/tips, and copy shareable summaries.",
    url: "https://quickcalc.cloud/tools/group-expense-splitter",
    type: "website",
    siteName: "QuickCalc",
    images: [
      {
        url: "https://quickcalc.cloud/og-image.png",
        width: 1200,
        height: 630,
        alt: "Group Expense Splitter on QuickCalc",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Group Expense Splitter - Split Bills Unevenly by Item | QuickCalc",
    description: "Split group restaurant bills, shared travel costs, and shared expenses unevenly by item. Assign custom splits, compute proportional tax/tips, and copy shareable summaries.",
    images: ["https://quickcalc.cloud/og-image.png"],
  },
};

export default function GroupExpenseSplitterPage() {
  const faqData = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      {
        "@type": "Question",
        "name": "How is an uneven bill split calculated?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "An uneven bill split distributes itemized costs only to the individuals who shared those specific items. Each item is split equally among its specified consumers, rather than dividing the global subtotal equally by the total group size."
        }
      },
      {
        "@type": "Question",
        "name": "How should tax and tips be distributed?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Tax and tips should be distributed proportionally based on each person's individual subtotal. This ensures that someone who only ordered a small side dish doesn't pay an equal share of the tax and tips as someone who ordered a large expensive meal."
        }
      },
      {
        "@type": "Question",
        "name": "Can I copy the split breakdown to share with friends?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Yes! Our Group Expense Splitter includes a 'Copy Shareable Breakdown' button that generates a clear, clean text message summarizing exactly what each group member owes and what they paid for. You can easily paste this into WhatsApp, iMessage, or group chats."
        }
      },
      {
        "@type": "Question",
        "name": "What is the maximum number of members supported?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Our calculator supports adding up to 15 members dynamically with real-time reactive calculations as you add or remove individuals."
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
            <span className="text-sm font-medium text-zinc-400 dark:text-zinc-600">Group Expense Splitter</span>
            <span className="text-sm font-medium text-zinc-300 dark:text-zinc-700 font-normal">|</span>
            <ThemeToggle />
          </nav>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-4xl mx-auto px-4 py-8 sm:py-12">
        <Breadcrumbs toolName="Group Expense Splitter" toolSlug="group-expense-splitter" />
        <div className="text-center max-w-2xl mx-auto mb-8">
          <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-zinc-900 dark:text-white mb-4">
            Group Expense Splitter
          </h1>
          <p className="text-base sm:text-lg text-zinc-600 dark:text-zinc-400 leading-relaxed">
            Easily split group bills, restaurant orders, and shared travel costs unevenly based on itemized details. Add members, specify custom shares, and compute proportional tax and tips instantly.
          </p>
        </div>

        {/* The interactive widget */}
        <section className="my-8">
          <GroupExpenseSplitterWidget />
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
              Why Itemized Splitting is Fairer than Equal Divisions
            </h2>
            <p className="text-zinc-600 dark:text-zinc-400 leading-relaxed">
              In social gatherings, dining out, or shared group trips, splitting costs equally often creates friction because group members order differently. Our Itemized Group Expense Splitter guarantees fairness by isolating each item cost and dividing it only among the exact people who consumed or enjoyed it.
            </p>
            <p className="text-zinc-600 dark:text-zinc-400 leading-relaxed">
              Moreover, any additional local sales taxes or service tip percentages are calculated proportionally based on the individual's food/shopping subtotal, rather than standard average splits.
            </p>
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
                  <span>How is an uneven bill split calculated?</span>
                  <span className="transition group-open:rotate-180 text-zinc-400 dark:text-zinc-500">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" className="w-5 h-5">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
                    </svg>
                  </span>
                </summary>
                <p className="text-zinc-600 dark:text-zinc-400 mt-3 text-sm leading-relaxed">
                  An uneven bill split distributes itemized costs only to the individuals who shared those specific items. Each item is split equally among its specified consumers, rather than dividing the global subtotal equally by the total group size.
                </p>
              </details>

              <details className="group border border-zinc-200 dark:border-zinc-800 rounded-lg p-4 bg-white dark:bg-zinc-900 transition-all duration-150 [&_summary::-webkit-details-marker]:hidden">
                <summary className="flex justify-between items-center font-semibold text-zinc-800 dark:text-zinc-200 cursor-pointer focus:outline-none">
                  <span>How should tax and tips be distributed?</span>
                  <span className="transition group-open:rotate-180 text-zinc-400 dark:text-zinc-500">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" className="w-5 h-5">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
                    </svg>
                  </span>
                </summary>
                <p className="text-zinc-600 dark:text-zinc-400 mt-3 text-sm leading-relaxed">
                  Tax and tips should be distributed proportionally based on each person's individual subtotal. This ensures that someone who only ordered a small side dish doesn't pay an equal share of the tax and tips as someone who ordered a large expensive meal.
                </p>
              </details>

              <details className="group border border-zinc-200 dark:border-zinc-800 rounded-lg p-4 bg-white dark:bg-zinc-900 transition-all duration-150 [&_summary::-webkit-details-marker]:hidden">
                <summary className="flex justify-between items-center font-semibold text-zinc-800 dark:text-zinc-200 cursor-pointer focus:outline-none">
                  <span>Can I copy the split breakdown to share with friends?</span>
                  <span className="transition group-open:rotate-180 text-zinc-400 dark:text-zinc-500">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" className="w-5 h-5">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
                    </svg>
                  </span>
                </summary>
                <p className="text-zinc-600 dark:text-zinc-400 mt-3 text-sm leading-relaxed">
                  Yes! Our Group Expense Splitter includes a 'Copy Shareable Breakdown' button that generates a clear, clean text message summarizing exactly what each group member owes and what they paid for. You can easily paste this into WhatsApp, iMessage, or group chats.
                </p>
              </details>

              <details className="group border border-zinc-200 dark:border-zinc-800 rounded-lg p-4 bg-white dark:bg-zinc-900 transition-all duration-150 [&_summary::-webkit-details-marker]:hidden">
                <summary className="flex justify-between items-center font-semibold text-zinc-800 dark:text-zinc-200 cursor-pointer focus:outline-none">
                  <span>What is the maximum number of members supported?</span>
                  <span className="transition group-open:rotate-180 text-zinc-400 dark:text-zinc-500">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" className="w-5 h-5">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
                    </svg>
                  </span>
                </summary>
                <p className="text-zinc-600 dark:text-zinc-400 mt-3 text-sm leading-relaxed">
                  Our calculator supports adding up to 15 members dynamically with real-time reactive calculations as you add or remove individuals.
                </p>
              </details>
            </div>
          </section>
        </article>

        {/* Related Tools */}
        <section className="max-w-3xl mx-auto border-t border-zinc-200 dark:border-zinc-800 mt-12 pt-8">
          <h3 className="text-xl font-bold text-zinc-900 dark:text-white mb-6">
            Related Financial & Custom Tools
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 p-5 rounded-xl hover:shadow-md transition duration-200">
              <span className="text-2xl mb-2 block">💵</span>
              <h4 className="font-bold text-zinc-900 dark:text-white text-base">Tip Calculator</h4>
              <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-2">
                Need to split a bill perfectly equally? Tip Calculator lets you split total billing and custom tip percentages evenly.
              </p>
              <Link href="/tools/tip-calculator" className="inline-block text-xs font-semibold text-blue-500 dark:text-blue-400 mt-4 hover:underline">
                Use Tool &rarr;
              </Link>
            </div>

            <div className="border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 p-5 rounded-xl hover:shadow-md transition duration-200">
              <span className="text-2xl mb-2 block">📊</span>
              <h4 className="font-bold text-zinc-900 dark:text-white text-base">Percentage Calculator</h4>
              <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-2">
                Quickly compute general percentage equations, discounts, percentage change and reverse percentage ratios.
              </p>
              <Link href="/tools/percentage-calculator" className="inline-block text-xs font-semibold text-blue-500 dark:text-blue-400 mt-4 hover:underline">
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
      <Footer customText="Clean, client-side, dynamic group billing and uneven itemized cost splitter." />
    </div>
  );
}
