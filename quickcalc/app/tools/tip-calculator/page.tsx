import RelatedTools from "@/components/RelatedTools";
import ShareButtons from "@/components/ShareButtons";
import EmbedWidget from "@/components/EmbedWidget";

import ThemeToggle from "@/components/ThemeToggle";
import Breadcrumbs from "@/components/Breadcrumbs";
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

export default function TipCalculatorPage({ searchParams }: { searchParams?: { embed?: string } }) {
  const isEmbed = searchParams?.embed === "true";
  if (isEmbed) {
    return (
      <div className="min-h-screen bg-white dark:bg-zinc-950 text-zinc-900 dark:text-zinc-100 font-[family-name:var(--font-geist-sans)] transition-colors p-2 flex flex-col justify-between">
        <main className="max-w-4xl mx-auto w-full">
          <TipCalculatorWidget />
        </main>
      </div>
    );
  }

  const faqData = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      {
        "@type": "Question",
        "name": "How much should I tip?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "How much you should tip depends heavily on standard regional guidelines and service quality. In North America, a standard sit-down restaurant tip is 15% to 20% of the pre-tax total, while in Europe, a service charge is often already included in the bill or rounded up to the nearest Euro."
        }
      },
      {
        "@type": "Question",
        "name": "Tip calculator for large groups?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Our tip calculator for large groups makes splitting restaurant checks simple and stress-free. Adjust the group headcount slider above to instantly divide the total bill, tax, and gratuity symmetrically among any number of guests so everyone pays their fair share."
        }
      },
      {
        "@type": "Question",
        "name": "How to split the bill with tip included?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "To learn how to split the bill with tip included, enter the total subtotal, select your desired tip percentage, and adjust the number of people. The calculator automatically computes the total gratuity, adds it to the base bill, and displays the exact split share per person."
        }
      }
    ]
  };

  const softwareData = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    "name": "Tip Calculator",
    "operatingSystem": "All",
    "applicationCategory": "FinanceApplication",
    "offers": {
      "@type": "Offer",
      "price": "0",
      "priceCurrency": "USD"
    }
  };

  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-zinc-950 text-zinc-900 dark:text-zinc-100 font-[family-name:var(--font-geist-sans)] transition-colors">
      {/* FAQ Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqData) }}
      />
      {/* Software Application Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(softwareData) }}
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
            <span className="text-sm font-medium text-zinc-400 dark:text-zinc-600">Tip Calculator</span>
            <span className="text-sm font-medium text-zinc-300 dark:text-zinc-700 font-normal">|</span>
            <ThemeToggle />
          </nav>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-4xl mx-auto px-4 py-8 sm:py-12">
        <Breadcrumbs toolName="Tip Calculator" toolSlug="tip-calculator" />
        <div className="text-center max-w-2xl mx-auto mb-8">
          <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-zinc-900 dark:text-white mb-4">
            Tip & Bill Split Calculator
          </h1>
          <p className="text-base sm:text-lg text-zinc-600 dark:text-zinc-400 leading-relaxed">
            If you are wondering how much should I tip at a restaurant or café, our free tool provides standard gratuity guidelines instantly. Use our Tip & Bill Split Calculator to determine standard gratuities, customize tip percentages in real time, and split group checks cleanly.
          </p>
        </div>

        <ShareButtons url="https://quickcalc.cloud/tools/tip-calculator" title="Tip Calculator" />
        <EmbedWidget url="https://quickcalc.cloud/tools/tip-calculator" title="Tip Calculator" />

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

          <section className="space-y-4">
            <h2 className="text-2xl font-bold text-zinc-950 dark:text-white">
              How is this calculated?
            </h2>
            <p className="text-zinc-600 dark:text-zinc-400 leading-relaxed">
              Our tip calculator executes simple, highly precise real-time algebraic equations to evaluate bill breakdowns:
            </p>
            <ul className="list-disc pl-6 text-zinc-600 dark:text-zinc-400 space-y-2">
              <li>
                <strong>Tip Amount:</strong> Derived from multiplying the base bill subtotal (<code>B</code>) by the tip percentage divided by 100 (<code>P</code>):
                <div className="bg-zinc-100 dark:bg-zinc-900 p-2 my-2 rounded font-mono text-xs overflow-x-auto text-emerald-600 dark:text-emerald-400">
                  Tip Amount = B * (P / 100)
                </div>
              </li>
              <li>
                <strong>Total Bill:</strong> Computed by adding the base subtotal (<code>B</code>) and the calculated tip amount together.
              </li>
              <li>
                <strong>Split Math (Per Person):</strong> When splitting among a group of size <code>N</code>:
                <ul className="list-disc pl-6 space-y-1 mt-1">
                  <li><code>Tip Per Person = Tip Amount / N</code></li>
                  <li><code>Total Per Person = (Base Bill + Tip Amount) / N</code></li>
                </ul>
              </li>
              <li>
                <strong>Rounding Adjustment:</strong> All intermediate and final currencies are rounded to the nearest integer cent using exact floating-point rounding functions to ensure splits match the grand invoice perfectly.
              </li>
            </ul>
          </section>

          {/* Ad Placement 2 */}
          <div className="ad-slot ad-slot--inline" data-ad-position="in-content-2">
            <div className="ad-placeholder-label border border-dashed border-zinc-300 dark:border-zinc-800 rounded-xl py-4 flex items-center justify-center bg-zinc-50/50 dark:bg-zinc-950/20 text-[10px] font-bold text-zinc-400 dark:text-zinc-600 uppercase tracking-widest cursor-default">
              Advertisement
            </div>
          </div>

          {/* FAQ open style matching Age Calculator and Currency Converter */}
          <section className="space-y-4 border-t border-zinc-200 dark:border-zinc-800 pt-8">
            <h2 className="text-2xl font-bold text-zinc-950 dark:text-white border-b border-zinc-100 dark:border-zinc-900 pb-2">
              Frequently Asked Questions (FAQ)
            </h2>
            <div className="space-y-6">
              <div className="space-y-2">
                <h3 className="text-base font-bold text-zinc-900 dark:text-zinc-100">
                  How much should I tip?
                </h3>
                <p className="text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed">
                  How much you should tip depends heavily on standard regional guidelines and service quality. In North America, a standard sit-down restaurant tip is 15% to 20% of the pre-tax total, while in Europe, a service charge is often already included in the bill or rounded up to the nearest Euro.
                </p>
              </div>

              <div className="space-y-2">
                <h3 className="text-base font-bold text-zinc-900 dark:text-zinc-100">
                  Tip calculator for large groups?
                </h3>
                <p className="text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed">
                  Our tip calculator for large groups makes splitting restaurant checks simple and stress-free. Adjust the group headcount slider above to instantly divide the total bill, tax, and gratuity symmetrically among any number of guests so everyone pays their fair share.
                </p>
              </div>

              <div className="space-y-2">
                <h3 className="text-base font-bold text-zinc-900 dark:text-zinc-100">
                  How to split the bill with tip included?
                </h3>
                <p className="text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed">
                  To learn how to split the bill with tip included, enter the total subtotal, select your desired tip percentage, and adjust the number of people. The calculator automatically computes the total gratuity, adds it to the base bill, and displays the exact split share per person.
                </p>
              </div>
            </div>
          </section>
        </article>

        <RelatedTools currentSlug="tip-calculator" />

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
