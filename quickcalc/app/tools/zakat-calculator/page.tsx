import { generateSoftwareAppSchema } from "@/lib/schema";
import HeaderLogo from "@/components/HeaderLogo";
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
  title: "Zakat Calculator - Easy Gold, Silver & Savings Nisab Tool",
  description: "Calculate your Zakat cleanly with an itemized cash, gold, and silver breakdown. Compares savings to standard Nisab thresholds with live custom rates.",
  alternates: {
    canonical: "/tools/zakat-calculator",
  },
  openGraph: {
    title: "Zakat Calculator - Easy Gold, Silver & Savings Nisab Tool",
    description: "Calculate your Zakat cleanly with an itemized cash, gold, and silver breakdown. Compares savings to standard Nisab thresholds with live custom rates.",
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
    title: "Zakat Calculator - Easy Gold, Silver & Savings Nisab Tool",
    description: "Calculate your Zakat cleanly with an itemized cash, gold, and silver breakdown. Compares savings to standard Nisab thresholds with live custom rates.",
    images: ["https://quickcalc.cloud/og-image.png"],
  },
};

export default function ZakatCalculatorPage({ searchParams }: { searchParams?: { embed?: string } }) {
  const softwareSchema = generateSoftwareAppSchema({
    name: "Zakat Calculator - Easy Gold, Silver & Savings Nisab Tool",
    description: "Calculate your Zakat cleanly with an itemized cash, gold, and silver breakdown. Compares savings to standard Nisab thresholds with live custom rates.",
    slug: "zakat-calculator",
    category: "Utility"
  });

  const isEmbed = searchParams?.embed === "true";
  if (isEmbed) {
    return (
      <div className="min-h-screen bg-white dark:bg-zinc-950 text-zinc-900 dark:text-zinc-100 font-[family-name:var(--font-geist-sans)] transition-colors p-2 flex flex-col justify-between">
      {/* WebApplication JSON-LD Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(softwareSchema) }}
      />

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
        "name": "How do I find the current Zakat Nisab threshold in gold or silver?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "The nisab threshold is the minimum amount of wealth a Muslim must possess for a full lunar year before Zakat becomes obligatory. It is valued at 87.48 grams of gold or 612.36 grams of silver. Please note that different schools of thought may calculate this slightly differently and this calculator provides an estimate, so we suggest consulting a scholar for complex situations."
        }
      },
      {
        "@type": "Question",
        "name": "How do I calculate Zakat on my monthly salary and savings?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "No, zakat is not due on salary immediately upon receiving it. Instead, Zakat is calculated on your remaining savings and accumulated surplus wealth that exceeds the Nisab threshold at the end of your Zakat year. Any income spent on living expenses before that date is not subject to Zakat."
        }
      },
      {
        "@type": "Question",
        "name": "How do I calculate Zakat on gold jewelry and personal assets?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "To calculate zakat on gold, determine the total weight in grams of gold assets you own. Multiply the weight by the current market price of gold per gram. If your gold and other qualifying net assets exceed the gold Nisab threshold (87.48 grams), you owe 2.5% on that total value. Different schools of thought calculate this slightly differently—for instance, some exempt regularly worn jewelry while others do not—so consulting a scholar is recommended for complex personal jewelry situations."
        }
      },
      {
        "@type": "Question",
        "name": "What are the differences in Zakat calculation between Hanafi and Shafi'i schools?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "The zakat calculation Hanafi vs Shafi'i method differs primarily in how jewelry and certain assets are handled. The Hanafi school requires Zakat on all gold and silver jewelry, whether worn or stored. In contrast, the Shafi'i school (along with Maliki and Hanbali) generally exempts personal jewelry that is worn regularly and is not excessive. Because this is an estimate, you should consult a scholar to ensure your calculations align with your school's rulings."
        }
      },
      {
        "@type": "Question",
        "name": "How do I calculate Zakat on stocks, mutual funds, and retirement accounts?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Yes, zakat is due on stocks and investments. If stocks are purchased as a long-term investment for dividends, Zakat is paid on the company's net zakatable assets (often estimated as 25% of the portfolio value). If bought for active trading, Zakat is due on the full current market value of the shares. As calculations vary and this tool provides an estimate, consulting a qualified Islamic scholar is recommended for complex investment structures."
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
  }

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
          <HeaderLogo />
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
            If you are wondering what is the nisab threshold and how to calculate your annual charity, our Zakat Calculator makes it simple. Zakat is a compulsory annual almsgiving in Islam, requiring eligible Muslims to donate 2.5% of their qualifying surplus wealth to those in need. This purification of wealth applies to assets exceeding a minimum threshold, known as Nisab, held continuously for one lunar year (Hawl).
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
              About Our Zakat Nisab and Wealth Calculator
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
                  How do I find the current Zakat Nisab threshold in gold or silver?
                </h3>
                <p className="text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed">
                  The nisab threshold is the minimum amount of wealth a Muslim must possess for a full lunar year before Zakat becomes obligatory. It is valued at 87.48 grams of gold or 612.36 grams of silver. Please note that different schools of thought may calculate this slightly differently and this calculator provides an estimate, so we suggest consulting a scholar for complex situations.
                </p>
              </div>

              <div className="space-y-2">
                <h3 className="text-base font-bold text-zinc-900 dark:text-zinc-100">
                  How do I calculate Zakat on my monthly salary and savings?
                </h3>
                <p className="text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed">
                  No, zakat is not due on salary immediately upon receiving it. Instead, Zakat is calculated on your remaining savings and accumulated surplus wealth that exceeds the Nisab threshold at the end of your Zakat year. Any income spent on living expenses before that date is not subject to Zakat.
                </p>
              </div>

              <div className="space-y-2">
                <h3 className="text-base font-bold text-zinc-900 dark:text-zinc-100">
                  How do I calculate Zakat on gold jewelry and personal assets?
                </h3>
                <p className="text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed">
                  To calculate zakat on gold, determine the total weight in grams of gold assets you own. Multiply the weight by the current market price of gold per gram. If your gold and other qualifying net assets exceed the gold Nisab threshold (87.48 grams), you owe 2.5% on that total value. Different schools of thought calculate this slightly differently—for instance, some exempt regularly worn jewelry while others do not—so consulting a scholar is recommended for complex personal jewelry situations.
                </p>
              </div>

              <div className="space-y-2">
                <h3 className="text-base font-bold text-zinc-900 dark:text-zinc-100">
                  What are the differences in Zakat calculation between Hanafi and Shafi'i schools?
                </h3>
                <p className="text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed">
                  The zakat calculation Hanafi vs Shafi'i method differs primarily in how jewelry and certain assets are handled. The Hanafi school requires Zakat on all gold and silver jewelry, whether worn or stored. In contrast, the Shafi'i school (along with Maliki and Hanbali) generally exempts personal jewelry that is worn regularly and is not excessive. Because this is an estimate, you should consult a scholar to ensure your calculations align with your school's rulings.
                </p>
              </div>

              <div className="space-y-2">
                <h3 className="text-base font-bold text-zinc-900 dark:text-zinc-100">
                  How do I calculate Zakat on stocks, mutual funds, and retirement accounts?
                </h3>
                <p className="text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed">
                  Yes, zakat is due on stocks and investments. If stocks are purchased as a long-term investment for dividends, Zakat is paid on the company's net zakatable assets (often estimated as 25% of the portfolio value). If bought for active trading, Zakat is due on the full current market value of the shares. As calculations vary and this tool provides an estimate, consulting a qualified Islamic scholar is recommended for complex investment structures.
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
