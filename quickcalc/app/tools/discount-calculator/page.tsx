import RelatedTools from "@/components/RelatedTools";
import ShareButtons from "@/components/ShareButtons";
import EmbedWidget from "@/components/EmbedWidget";

import ThemeToggle from "@/components/ThemeToggle";
import Breadcrumbs from "@/components/Breadcrumbs";
import type { Metadata } from "next";
import Link from "next/link";
import DiscountCalculatorWidget from "./DiscountCalculatorWidget";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "Discount Calculator: Find Sale Price & Stacked Discounts",
  description: "Calculate single or stacked discounts step-by-step. Supports sequential deductions, reverse mode to find original prices, and clipboard sharing.",
  alternates: {
    canonical: "/tools/discount-calculator",
  },
  openGraph: {
    title: "Discount Calculator: Find Sale Price & Stacked Discounts",
    description: "Calculate single or stacked discounts step-by-step. Supports sequential deductions, reverse mode to find original prices, and clipboard sharing.",
    url: "https://quickcalc.cloud/tools/discount-calculator",
    type: "website",
    siteName: "QuickCalc",
    images: [
      {
        url: "https://quickcalc.cloud/og-image.png",
        width: 1200,
        height: 630,
        alt: "Discount Calculator on QuickCalc",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Discount Calculator: Find Sale Price & Stacked Discounts",
    description: "Calculate single or stacked discounts step-by-step. Supports sequential deductions, reverse mode to find original prices, and clipboard sharing.",
    images: ["https://quickcalc.cloud/og-image.png"],
  },
};

export default function DiscountCalculatorPage({ searchParams }: { searchParams?: { embed?: string } }) {
  const isEmbed = searchParams?.embed === "true";
  if (isEmbed) {
    return (
      <div className="min-h-screen bg-white dark:bg-zinc-950 text-zinc-900 dark:text-zinc-100 font-[family-name:var(--font-geist-sans)] transition-colors p-2 flex flex-col justify-between">
        <main className="max-w-4xl mx-auto w-full">
          <DiscountCalculatorWidget />
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
        "name": "How to calculate percentage off?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "To find how to calculate percentage off, take the discount amount, divide it by the original price, and then multiply by 100. This calculation determines the exact percentage reduction applied to the retail price of your product."
        }
      },
      {
        "@type": "Question",
        "name": "How much do I save with a discount code?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "How much you save with a discount code depends on whether it is a flat amount or a percentage deduction. Enter the original price and your discount code's percentage value into our calculator to instantly view your total cash savings and final price."
        }
      },
      {
        "@type": "Question",
        "name": "Original price from sale price?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "To find the original price from a sale price, divide the final sale price by one minus the discount percentage as a decimal (e.g., divide by 0.80 for a 20% discount). This reverse calculation retrieves your starting retail cost before the promotion."
        }
      }
    ]
  };

  const articleData = {
    "@context": "https://schema.org",
    "@type": "Article",
    "headline": "Discount Calculator: Find Sale Price & Stacked Discounts",
    "description": "Learn how to accurately calculate single or stacked discounts step-by-step. Clear worked examples demonstrating sequential multiplication formulas over simple additive additions.",
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
    "mainEntityOfPage": "https://quickcalc.cloud/tools/discount-calculator"
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
            <span className="text-sm font-medium text-zinc-400 dark:text-zinc-600">Discount Calculator</span>
            <span className="text-sm font-medium text-zinc-300 dark:text-zinc-700 font-normal">|</span>
            <ThemeToggle />
          </nav>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-4xl mx-auto px-4 py-8 sm:py-12">
        <Breadcrumbs toolName="Discount Calculator" toolSlug="discount-calculator" />
        <div className="text-center max-w-2xl mx-auto mb-8 animate-fade-in">
          <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-zinc-900 dark:text-white mb-4">
            Discount Calculator: Find Sale Price & Stacked Discounts
          </h1>
          <p className="text-base sm:text-lg text-zinc-600 dark:text-zinc-400 leading-relaxed font-semibold">
            If you are looking for how to calculate percentage off or find the final sale price, this tool makes it effortless. To calculate a discounted sale price, you simply subtract the discount value from the original pre-discount price. First, calculate the exact saving amount by multiplying the original retail price by the discount percentage and dividing by 100. Finally, deduct this calculated savings value from the initial original price to determine the final discounted purchase price.
          </p>
        </div>

        <ShareButtons url="https://quickcalc.cloud/tools/discount-calculator" title="Discount Calculator" />
        <EmbedWidget url="https://quickcalc.cloud/tools/discount-calculator" title="Discount Calculator" />

        {/* The interactive widget */}
        <section className="my-8">
          <DiscountCalculatorWidget />
        </section>

        {/* Ad Placement 1 */}
        <div className="ad-slot ad-slot--inline my-8" data-ad-position="in-content-1">
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
              Welcome to our advanced Discount Calculator, designed to simplify complicated retail pricing and help you make smarter purchase decisions. Standard calculations usually cover a single discount percent and stop there, leaving shoppers in the dark when navigating more complex pricing scenarios. This tool changes that by integrating three distinct real-world applications into a single view: finding the final price after a single discount, calculating sequential multi-tier stacked discounts, and running a reverse mode to find the original pre-discount retail price from any known sale value.
            </p>
            <p className="text-zinc-600 dark:text-zinc-400 leading-relaxed">
              A common retail strategy is offering stacked percentages, such as "take 20% off already marked down items plus an extra 10% off at checkout." This is where the stacked-discount misconception occurs. Many consumers assume these percentages add up directly, thinking 20% plus 10% off equals a flat 30% reduction. In reality, sequential deductions are multiplicative, not additive. The first 20% reduction reduces a 100-currency item down to 80. The second 10% discount is then calculated from that reduced 80 subtotal, subtracting 8 and yielding a final price of 72. This step-by-step reduction represents an effective total discount of 28%, not 30%.
            </p>
            <p className="text-zinc-600 dark:text-zinc-400 leading-relaxed">
              Our interactive visualizer maps out this exact step-by-step mathematical sequence, verifying that stacked discounts multiply instead of simply adding together. Whether you are budgeting for seasonal clearance sales, verifying promotional retail receipts, or working as a professional distributor checking margins, understanding these sequential subtotals ensures absolute financial clarity. International shoppers can also easily convert these calculated post-sale values with our <Link href="/tools/currency-converter" className="text-blue-600 dark:text-blue-400 hover:underline">currency converter</Link> to compare international prices instantly. Try custom discount values above to see live updates automatically.
            </p>
          </section>

          {/* Ad Placement 2 */}
          <div className="ad-slot ad-slot--inline my-8" data-ad-position="in-content-2">
            <div className="ad-placeholder-label border border-dashed border-zinc-300 dark:border-zinc-800 rounded-xl py-4 flex items-center justify-center bg-zinc-50/50 dark:bg-zinc-950/20 text-[10px] font-bold text-zinc-400 dark:text-zinc-600 uppercase tracking-widest cursor-default">
              Advertisement
            </div>
          </div>

          {/* FAQ Section */}
          <section className="space-y-6 border-t border-zinc-200 dark:border-zinc-800 pt-8">
            <h2 className="text-2xl font-bold text-zinc-950 dark:text-white border-b border-zinc-100 dark:border-zinc-900 pb-2">
              Frequently Asked Questions (FAQ)
            </h2>
            <div className="space-y-6">
              <div className="space-y-2">
                <h3 className="text-base font-bold text-zinc-900 dark:text-zinc-100">
                  How to calculate percentage off?
                </h3>
                <p className="text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed">
                  To find how to calculate percentage off, take the discount amount, divide it by the original price, and then multiply by 100. This calculation determines the exact percentage reduction applied to the retail price of your product.
                </p>
              </div>

              <div className="space-y-2">
                <h3 className="text-base font-bold text-zinc-900 dark:text-zinc-100">
                  How much do I save with a discount code?
                </h3>
                <p className="text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed">
                  How much you save with a discount code depends on whether it is a flat amount or a percentage deduction. Enter the original price and your discount code's percentage value into our calculator to instantly view your total cash savings and final price.
                </p>
              </div>

              <div className="space-y-2">
                <h3 className="text-base font-bold text-zinc-900 dark:text-zinc-100">
                  Original price from sale price?
                </h3>
                <p className="text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed">
                  To find the original price from a sale price, divide the final sale price by one minus the discount percentage as a decimal (e.g., divide by 0.80 for a 20% discount). This reverse calculation retrieves your starting retail cost before the promotion.
                </p>
              </div>
            </div>
          </section>
        </article>

        <RelatedTools currentSlug="discount-calculator" />

        {/* Ad Placement Footer */}
        <div className="ad-slot ad-slot--footer mt-12" data-ad-position="footer">
          <div className="ad-placeholder-label border border-dashed border-zinc-300 dark:border-zinc-800 rounded-xl py-4 flex items-center justify-center bg-zinc-50/50 dark:bg-zinc-950/20 text-[10px] font-bold text-zinc-400 dark:text-zinc-600 uppercase tracking-widest cursor-default">
            Advertisement
          </div>
        </div>
      </main>

      {/* Footer */}
      <Footer customText="Intuitive, client-side sequential and stacked discount calculators." />
    </div>
  );
}
