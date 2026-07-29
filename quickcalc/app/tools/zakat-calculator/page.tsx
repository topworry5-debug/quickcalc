import RelatedTools from "@/components/RelatedTools";
import ShareButtons from "@/components/ShareButtons";
import EmbedWidget from "@/components/EmbedWidget";

import ThemeToggle from "@/components/ThemeToggle";
import Breadcrumbs from "@/components/Breadcrumbs";
import type { Metadata } from "next";
import Link from "next/link";
import ZakatCalculatorWidget from "./ZakatCalculatorWidget";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "Zakat Calculator: Calculate Your Zakat on Cash & Gold | QuickCalc",
  description: "Calculate your Zakat easily with our category-by-category calculator. Supports custom gold & silver rates with live Nisab threshold comparisons.",
  alternates: {
    canonical: "/tools/zakat-calculator",
  },
  openGraph: {
    title: "Zakat Calculator: Calculate Your Zakat on Cash & Gold | QuickCalc",
    description: "Calculate your Zakat easily with our category-by-category calculator. Supports custom gold & silver rates with live Nisab threshold comparisons.",
    url: "https://quickcalc.cloud/tools/zakat-calculator",
    type: "website",
    siteName: "QuickCalc",
    images: [
      {
        url: "https://quickcalc.cloud/og-image.png",
        width: 1200,
        height: 630,
        alt: "Zakat Calculator on QuickCalc",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Zakat Calculator: Calculate Your Zakat on Cash & Gold | QuickCalc",
    description: "Calculate your Zakat easily with our category-by-category calculator. Supports custom gold & silver rates with live Nisab threshold comparisons.",
    images: ["https://quickcalc.cloud/og-image.png"],
  },
};

export default function ZakatCalculatorPage({ searchParams }: { searchParams?: { embed?: string } }) {
  const isEmbed = searchParams?.embed === "true";
  if (isEmbed) {
    return (
      <div className="min-h-screen bg-white dark:bg-zinc-950 text-zinc-900 dark:text-zinc-100 font-[family-name:var(--font-geist-sans)] transition-colors p-2 flex flex-col justify-between">
        <main className="max-w-4xl mx-auto w-full">
          <ZakatCalculatorWidget />
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
        "name": "What is nisab in Zakat calculation?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Nisab is the minimum threshold of wealth that a Muslim must own for a full lunar year before becoming obligated to pay Zakat. If your total net wealth is below this threshold, you are exempt from paying Zakat. The threshold is determined by the current market value of either 87.48 grams of gold or 612.36 grams of silver."
        }
      },
      {
        "@type": "Question",
        "name": "Do I pay Zakat on gold jewelry I wear regularly?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Scholarly opinions differ regarding Zakat on regularly worn personal jewelry. The Hanafi school of thought holds that Zakat is due on all gold and silver jewelry regardless of usage. Other main schools of jurisprudence state that personal, non-excessive jewelry worn regularly is exempt, so you should consult your local scholar based on your chosen school."
        }
      },
      {
        "@type": "Question",
        "name": "Is Zakat calculated on income or savings?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Zakat is calculated on your total accumulated savings and net surplus assets held for a full lunar year, rather than your immediate monthly income. While your income contributes to your bank balance, only the money and assets that remain in your possession after meeting personal expenses and exceeding Nisab are subject to Zakat."
        }
      },
      {
        "@type": "Question",
        "name": "What is the difference between gold nisab and silver nisab?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "The gold Nisab is based on the current price of 87.48 grams of gold, whereas the silver Nisab is based on 612.36 grams of silver. Because silver is currently valued much lower than gold in modern markets, the silver Nisab threshold is significantly easier to reach, meaning more people are eligible to pay under it."
        }
      },
      {
        "@type": "Question",
        "name": "Do I pay Zakat if I have debts?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Yes, but you can deduct your immediate, outstanding liabilities and short-term debts from your total assets before calculating your Zakat. Only your net wealth (eligible assets minus what you owe to others) is compared against the Nisab threshold to determine if any Zakat is due."
        }
      },
      {
        "@type": "Question",
        "name": "How often do I need to pay Zakat?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Zakat is paid exactly once every lunar year, which is called the Hawl. This calculation period begins on the day your wealth first equals or exceeds the Nisab threshold, and Zakat becomes payable on that same date one lunar year later if your wealth remains above Nisab."
        }
      }
    ]
  };

  const articleData = {
    "@context": "https://schema.org",
    "@type": "Article",
    "headline": "Zakat Calculator: Calculate Your Zakat on Cash, Gold, Silver & Assets",
    "description": "Calculate your Zakat easily with our category-by-category calculator. Supports custom gold & silver rates with live Nisab threshold comparisons.",
    "url": "https://quickcalc.cloud/tools/zakat-calculator",
    "mainEntityOfPage": {
      "@type": "WebPage",
      "@id": "https://quickcalc.cloud/tools/zakat-calculator"
    },
    "author": {
      "@type": "Organization",
      "name": "QuickCalc"
    },
    "publisher": {
      "@type": "Organization",
      "name": "QuickCalc",
      "logo": {
        "@type": "ImageObject",
        "url": "https://quickcalc.cloud/og-image.png"
      }
    },
    "datePublished": "2026-07-26",
    "dateModified": "2026-07-26"
  };

  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-zinc-950 text-zinc-900 dark:text-zinc-100 font-[family-name:var(--font-geist-sans)] transition-colors">
      {/* FAQ Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqData) }}
      />
      {/* Article Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleData) }}
      />

      {/* Header */}
      <header className="border-b border-zinc-200 dark:border-zinc-800 bg-white/80 dark:bg-zinc-900/80 backdrop-blur-md sticky top-0 z-50 transition-colors">
        <div className="max-w-4xl mx-auto px-4 h-16 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2 font-bold text-lg text-emerald-600 dark:text-emerald-400">
            <span>⚖️ QuickCalc</span>
          </Link>
          <nav className="flex items-center gap-2 sm:gap-4">
            <Link href="/" className="text-sm font-medium text-zinc-600 dark:text-zinc-400 hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors">
              Home
            </Link>
            <Link href="/blog" className="text-sm font-medium text-zinc-600 dark:text-zinc-400 hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors">
              Blog
            </Link>
            <span className="text-sm font-medium text-zinc-300 dark:text-zinc-700 font-normal">|</span>
            <span className="text-sm font-medium text-zinc-300 dark:text-zinc-700">|</span>
            <span className="text-sm font-medium text-zinc-400 dark:text-zinc-600">Zakat Calculator</span>
            <span className="text-sm font-medium text-zinc-300 dark:text-zinc-700 font-normal">|</span>
            <ThemeToggle />
          </nav>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-4xl mx-auto px-4 py-8 sm:py-12">
        <Breadcrumbs toolName="Zakat Calculator" toolSlug="zakat-calculator" />
        
        <div className="text-center max-w-2xl mx-auto mb-8">
          <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-zinc-900 dark:text-white mb-4">
            Zakat Calculator: Calculate Your Zakat on Cash, Gold, Silver & Assets
          </h1>
          
          {/* Direct Answer Paragraph (40-60 words) */}
          <p className="text-base sm:text-lg text-emerald-700 dark:text-emerald-400 font-medium leading-relaxed max-w-xl mx-auto border-l-4 border-emerald-500 pl-4 py-2 bg-emerald-50/50 dark:bg-emerald-950/10 rounded-r-lg text-left">
            Zakat is a compulsory annual almsgiving in Islam, requiring eligible Muslims to donate 2.5% of their qualifying surplus wealth to those in need. This purification of wealth applies to assets exceeding a minimum threshold, known as Nisab, held continuously for one lunar year (Hawl).
          </p>
        </div>

        <ShareButtons url="https://quickcalc.cloud/tools/zakat-calculator" title="Zakat Calculator" />
        <EmbedWidget url="https://quickcalc.cloud/tools/zakat-calculator" title="Zakat Calculator" />

        {/* The interactive widget */}
        <section className="my-8">
          <ZakatCalculatorWidget />
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
              About this calculator
            </h2>
            <p className="text-zinc-600 dark:text-zinc-400 leading-relaxed">
              Understanding Zakat requirements can be challenging, but this calculator simplifies the process by breaking down your assets and liabilities into clear, manageable categories. Zakat is not an income tax; rather, it is a wealth tax calculated at a flat rate of 2.5% on qualifying surplus wealth that has been held for a full lunar year (known as Hawl). This includes cash, bank savings, precious metals, business stock, and investment portfolios.
            </p>
            <p className="text-zinc-600 dark:text-zinc-400 leading-relaxed">
              A key concept in this calculation is Nisab, which refers to the minimum threshold of wealth a Muslim must possess before they are obligated to pay Zakat. If your net wealth is below this threshold, you are not required to pay. Traditionally, Nisab is determined by reference to two standards: gold or silver. The gold standard represents the cash value of 87.48 grams of gold, while the silver standard is the cash value of 612.36 grams of silver.
            </p>
            <p className="text-zinc-600 dark:text-zinc-400 leading-relaxed">
              Scholars generally agree that individuals holding gold as their primary asset should use the gold Nisab, while those holding mixed assets or cash may choose either. In modern times, many scholars recommend using the silver Nisab for cash savings. Since silver is priced lower than gold today, the silver-standard Nisab is significantly lower. Choosing the silver Nisab enables more people to reach the threshold, thereby increasing charitable support for those in need.
            </p>
            <p className="text-zinc-600 dark:text-zinc-400 leading-relaxed">
              By entering today's exact per-gram prices for gold and silver, our calculator computes the live cash equivalent of both thresholds instantly. It then contrasts your net eligible wealth (total assets minus short-term liabilities and immediate debts) against your chosen standard to tell you exactly where you stand. You can use our <Link href="/tools/currency-converter" className="text-emerald-600 dark:text-emerald-400 hover:underline">currency converter</Link> to convert rates to your local currency if necessary.
            </p>
          </section>

          {/* Ad Placement 2 */}
          <div className="ad-slot ad-slot--inline" data-ad-position="in-content-2">
            <div className="ad-placeholder-label border border-dashed border-zinc-300 dark:border-zinc-800 rounded-xl py-4 flex items-center justify-center bg-zinc-50/50 dark:bg-zinc-950/20 text-[10px] font-bold text-zinc-400 dark:text-zinc-600 uppercase tracking-widest cursor-default">
              Advertisement
            </div>
          </div>

          {/* FAQ Sections */}
          <section className="space-y-4 border-t border-zinc-200 dark:border-zinc-800 pt-8">
            <h2 className="text-2xl font-bold text-zinc-950 dark:text-white border-b border-zinc-100 dark:border-zinc-900 pb-2">
              Frequently Asked Questions (FAQ)
            </h2>
            <div className="space-y-6">
              <div className="space-y-2">
                <h3 className="text-base font-bold text-zinc-900 dark:text-zinc-100">
                  What is nisab in Zakat calculation?
                </h3>
                <p className="text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed">
                  Nisab is the minimum threshold of wealth that a Muslim must own for a full lunar year before becoming obligated to pay Zakat. If your total net wealth is below this threshold, you are exempt from paying Zakat. The threshold is determined by the current market value of either 87.48 grams of gold or 612.36 grams of silver.
                </p>
              </div>

              <div className="space-y-2">
                <h3 className="text-base font-bold text-zinc-900 dark:text-zinc-100">
                  Do I pay Zakat on gold jewelry I wear regularly?
                </h3>
                <p className="text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed">
                  Scholarly opinions differ regarding Zakat on regularly worn personal jewelry. The Hanafi school of thought holds that Zakat is due on all gold and silver jewelry regardless of usage. Other main schools of jurisprudence state that personal, non-excessive jewelry worn regularly is exempt, so you should consult your local scholar based on your chosen school.
                </p>
              </div>

              <div className="space-y-2">
                <h3 className="text-base font-bold text-zinc-900 dark:text-zinc-100">
                  Is Zakat calculated on income or savings?
                </h3>
                <p className="text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed">
                  Zakat is calculated on your total accumulated savings and net surplus assets held for a full lunar year, rather than your immediate monthly income. While your income contributes to your bank balance, only the money and assets that remain in your possession after meeting personal expenses and exceeding Nisab are subject to Zakat.
                </p>
              </div>

              <div className="space-y-2">
                <h3 className="text-base font-bold text-zinc-900 dark:text-zinc-100">
                  What is the difference between gold nisab and silver nisab?
                </h3>
                <p className="text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed">
                  The gold Nisab is based on the current price of 87.48 grams of gold, whereas the silver Nisab is based on 612.36 grams of silver. Because silver is currently valued much lower than gold in modern markets, the silver Nisab threshold is significantly easier to reach, meaning more people are eligible to pay under it.
                </p>
              </div>

              <div className="space-y-2">
                <h3 className="text-base font-bold text-zinc-900 dark:text-zinc-100">
                  Do I pay Zakat if I have debts?
                </h3>
                <p className="text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed">
                  Yes, but you can deduct your immediate, outstanding liabilities and short-term debts from your total assets before calculating your Zakat. Only your net wealth (eligible assets minus what you owe to others) is compared against the Nisab threshold to determine if any Zakat is due.
                </p>
              </div>

              <div className="space-y-2">
                <h3 className="text-base font-bold text-zinc-900 dark:text-zinc-100">
                  How often do I need to pay Zakat?
                </h3>
                <p className="text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed">
                  Zakat is paid exactly once every lunar year, which is called the Hawl. This calculation period begins on the day your wealth first equals or exceeds the Nisab threshold, and Zakat becomes payable on that same date one lunar year later if your wealth remains above Nisab.
                </p>
              </div>
            </div>
          </section>
        </article>

        <RelatedTools currentSlug="zakat-calculator" />

        {/* Ad Placement Footer */}
        <div className="ad-slot ad-slot--footer mt-12" data-ad-position="footer">
          <div className="ad-placeholder-label border border-dashed border-zinc-300 dark:border-zinc-800 rounded-xl py-4 flex items-center justify-center bg-zinc-50/50 dark:bg-zinc-950/20 text-[10px] font-bold text-zinc-400 dark:text-zinc-600 uppercase tracking-widest cursor-default">
            Advertisement
          </div>
        </div>
      </main>

      {/* Footer */}
      <Footer customText="Informational Zakat estimation and calculation resources." />
    </div>
  );
}
