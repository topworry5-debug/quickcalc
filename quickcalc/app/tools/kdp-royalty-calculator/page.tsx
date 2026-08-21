import React from "react";
import type { Metadata } from "next";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Breadcrumbs from "@/components/Breadcrumbs";
import ShareButtons from "@/components/ShareButtons";
import EmbedWidget from "@/components/EmbedWidget";
import RelatedTools from "@/components/RelatedTools";
import MethodologyAccordion from "@/components/MethodologyAccordion";
import { generateSoftwareAppSchema } from "@/lib/schema";
import KDPRoyaltyCalculatorWidget from "./KDPRoyaltyCalculatorWidget";
import { CheckCircle2, BookOpen, Sparkles, HelpCircle, ArrowRight, DollarSign } from "lucide-react";

export const metadata: Metadata = {
  title: "Amazon KDP Royalty & Printing Cost Calculator (2026 Updated)",
  description: "Calculate your exact Amazon KDP print-on-demand printing costs, author royalties, profit margins, and minimum breakeven list prices across all global marketplaces.",
  alternates: {
    canonical: "/tools/kdp-royalty-calculator",
  },
  openGraph: {
    title: "Amazon KDP Royalty & Printing Cost Calculator (2026 Slabs) - QuickCalc",
    description: "Free 2026 Amazon KDP royalty and printing cost calculator. Compute exact paperback & hardcover printing fees, 60% vs 40% royalties, and profit margins in USD, GBP, EUR, CAD, and AUD.",
    url: "https://quickcalc.cloud/tools/kdp-royalty-calculator",
    type: "website",
    siteName: "QuickCalc",
    images: [
      {
        url: "https://quickcalc.cloud/og-image.png",
        width: 1200,
        height: 630,
        alt: "Amazon KDP Royalty Calculator on QuickCalc",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Amazon KDP Royalty & Printing Cost Calculator (2026 Slabs)",
    description: "Accurately calculate 2026 Amazon KDP printing costs, author royalties, and breakeven list prices across global marketplaces.",
  },
};

export default function KDPRoyaltyCalculatorPage({
  searchParams,
}: {
  searchParams?: { embed?: string };
}) {
  const softwareSchema = generateSoftwareAppSchema({
    name: "Amazon KDP Royalty & Printing Cost Calculator (2026 Updated)",
    description: "Free online publishing calculator for self-published authors to compute exact Amazon KDP printing costs, 60% and 40% royalties, and minimum list prices.",
    slug: "kdp-royalty-calculator",
    category: "Finance",
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
          <KDPRoyaltyCalculatorWidget />
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
        "name": "What is the minimum list price for a KDP paperback?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "The minimum list price for a KDP paperback is calculated by dividing your exact printing cost by your royalty rate (Printing Cost / 0.60 for Amazon Direct or Printing Cost / 0.40 for Expanded Distribution). For example, a 300-page black-and-white paperback with a $4.60 printing cost has a minimum list price of $7.67 on Amazon.com and $11.50 for Expanded Distribution."
        }
      },
      {
        "@type": "Question",
        "name": "How does page count impact my KDP printing cost?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "For black-and-white paperbacks on Amazon.com, books up to 108 pages incur a flat printing cost of $2.30. Books exceeding 108 pages switch to a fixed fee ($1.00) plus a variable per-page charge ($0.012 per page). For premium color books, flat pricing applies up to 40 pages ($3.65), after which printing costs $1.00 fixed plus $0.070 per page."
        }
      },
      {
        "@type": "Question",
        "name": "Is expanded distribution worth the lower 40% royalty rate?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Expanded Distribution allows your paperback to be ordered by bookstores, libraries, and online retailers through Ingram. Because the royalty rate drops from 60% to 40%, your net profit per book is substantially lower unless you price your book higher. It is worthwhile for non-fiction, academic, and specialty titles seeking bookstore catalog presence, but high-volume commercial fiction authors often keep pricing lower for Amazon Direct."
        }
      },
      {
        "@type": "Question",
        "name": "Does Amazon charge printing costs upfront?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "No. Amazon KDP operates strictly on a print-on-demand (POD) model with zero upfront listing or inventory printing charges. Printing costs are automatically deducted from your book's retail list price at the exact moment a customer purchases a copy, ensuring authors never pay out-of-pocket production costs."
        }
      }
    ]
  };

  const articleData = {
    "@context": "https://schema.org",
    "@type": "Article",
    "headline": "Amazon KDP Royalty & Printing Cost Calculator (2026 Guide & Formulas)",
    "description": "Comprehensive guide to 2026 Amazon KDP printing cost slabs, paperback and hardcover royalties, expanded distribution economics, and profit optimization.",
    "url": "https://quickcalc.cloud/tools/kdp-royalty-calculator",
    "image": "https://quickcalc.cloud/og-image.png",
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
    "datePublished": "2026-08-21"
  };

  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-zinc-950 text-zinc-900 dark:text-zinc-100 font-[family-name:var(--font-geist-sans)] transition-colors">
      {/* WebApplication Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(softwareSchema) }}
      />
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
      <Navbar />

      {/* Main Content */}
      <main className="max-w-5xl mx-auto px-4 py-8 sm:py-12">
        <Breadcrumbs toolName="KDP Royalty Calculator" toolSlug="kdp-royalty-calculator" />
        
        <div className="text-center max-w-3xl mx-auto mb-8">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-emerald-500/10 text-emerald-700 dark:text-emerald-300 border border-emerald-500/20 mb-3">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Updated with 2026 Official KDP Print-on-Demand Rates</span>
          </div>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight text-zinc-900 dark:text-white mb-4">
            Free Amazon KDP Royalty & Printing Cost Calculator (2026 Updated)
          </h1>

          {/* AI-extractable direct answer summary */}
          <p className="text-sm sm:text-base font-semibold text-emerald-800 dark:text-emerald-200 bg-emerald-500/10 border border-emerald-500/30 rounded-xl px-4 py-3 leading-relaxed mb-4 text-left">
            This free Amazon KDP calculator computes exact print-on-demand production charges, 60% Amazon direct royalties, 40% expanded distribution payouts, and minimum breakeven list prices for paperbacks and hardcovers across US, UK, EU, Canada, and Australia marketplaces.
          </p>

          {/* Stand-alone direct answer paragraph */}
          <p className="text-sm sm:text-base text-zinc-600 dark:text-zinc-400 leading-relaxed font-medium">
            To calculate your Amazon KDP author royalty, multiply your book’s retail list price by your distribution royalty rate (60% for Amazon Marketplace or 40% for Expanded Distribution) and subtract your exact printing cost. The remaining amount is your net take-home royalty profit per book sold.
          </p>
        </div>

        <ShareButtons
          url="https://quickcalc.cloud/tools/kdp-royalty-calculator"
          title="Amazon KDP Royalty & Printing Cost Calculator (2026)"
        />
        <EmbedWidget
          url="https://quickcalc.cloud/tools/kdp-royalty-calculator"
          title="Amazon KDP Royalty Calculator"
        />

        {/* The interactive widget */}
        <section className="my-8">
          <KDPRoyaltyCalculatorWidget />
        </section>

        {/* Scientific & Mathematical Methodology Accordion */}
        <MethodologyAccordion slug="kdp-royalty-calculator" />

        {/* Ad Placement 1 */}
        <div className="ad-slot ad-slot--inline my-8" data-ad-position="in-content-1">
          <div className="ad-placeholder-label border border-dashed border-zinc-300 dark:border-zinc-800 rounded-xl py-4 flex items-center justify-center bg-zinc-50/50 dark:bg-zinc-950/20 text-[10px] font-bold text-zinc-400 dark:text-zinc-600 uppercase tracking-widest cursor-default">
            Advertisement
          </div>
        </div>

        {/* Comprehensive SEO & AEO Content (500+ Words) */}
        <article className="prose prose-zinc dark:prose-invert max-w-4xl mx-auto space-y-8 mt-12 border-t border-zinc-200 dark:border-zinc-800 pt-10">
          
          {/* Section 1: How KDP Printing Costs and Royalties Are Calculated */}
          <section className="space-y-4">
            <h2 className="text-2xl font-black text-zinc-950 dark:text-white flex items-center gap-2">
              <DollarSign className="w-6 h-6 text-emerald-600 dark:text-emerald-400" />
              <span>How KDP Printing Costs and Royalties Are Calculated</span>
            </h2>
            <p className="text-zinc-600 dark:text-zinc-400 leading-relaxed">
              Kindle Direct Publishing (KDP) operates on an automated print-on-demand (POD) model where physical copies are manufactured only when a reader places an order. In 2026, Amazon calculates printing costs and author royalty payouts using standard mathematical formulas:
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 not-prose my-6">
              <div className="p-4 rounded-xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 shadow-sm space-y-2">
                <h3 className="text-sm font-bold text-zinc-900 dark:text-white flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                  <span>1. Flat Rate Tier (Small Books)</span>
                </h3>
                <p className="text-xs text-zinc-600 dark:text-zinc-400 leading-relaxed">
                  Black-and-white paperbacks between 24 and 108 pages incur a flat manufacturing fee ($2.30 on Amazon.com, £1.93 in the UK, €2.05 in Europe) with zero additional per-page charges.
                </p>
              </div>

              <div className="p-4 rounded-xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 shadow-sm space-y-2">
                <h3 className="text-sm font-bold text-zinc-900 dark:text-white flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                  <span>2. Per-Page Rate Tier (110+ Pages)</span>
                </h3>
                <p className="text-xs text-zinc-600 dark:text-zinc-400 leading-relaxed">
                  Paperbacks over 108 pages cost a fixed base fee ($1.00) plus $0.012 per page. A 300-page B&W book costs exactly: $1.00 + (300 × $0.012) = $4.60 printing cost.
                </p>
              </div>

              <div className="p-4 rounded-xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 shadow-sm space-y-2">
                <h3 className="text-sm font-bold text-zinc-900 dark:text-white flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                  <span>3. Color Interior Formulas</span>
                </h3>
                <p className="text-xs text-zinc-600 dark:text-zinc-400 leading-relaxed">
                  Standard color costs $1.00 fixed + $0.036/page (ideal for recipe books and workbooks). Premium color costs $1.00 fixed + $0.070/page (for photography and picture books).
                </p>
              </div>

              <div className="p-4 rounded-xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 shadow-sm space-y-2">
                <h3 className="text-sm font-bold text-zinc-900 dark:text-white flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                  <span>4. Hardcover Case Laminate Specs</span>
                </h3>
                <p className="text-xs text-zinc-600 dark:text-zinc-400 leading-relaxed">
                  Hardcovers require a minimum of 75 pages and carry a fixed production base of $6.05 plus standard per-page ink rates ($0.012 for B&W, $0.070 for Premium Color).
                </p>
              </div>
            </div>

            <p className="text-zinc-600 dark:text-zinc-400 leading-relaxed">
              When a reader buys your book directly on Amazon, Amazon takes a 40% retail commission and passes 60% gross royalty to the author. After subtracting the exact printing cost, the remaining funds represent your <strong>Net Take-Home Royalty</strong>.
            </p>
          </section>

          {/* Section 2: Understanding KDP Marketplace Rates & Currency Differences */}
          <section className="space-y-4 border-t border-zinc-200 dark:border-zinc-800 pt-8">
            <h2 className="text-2xl font-black text-zinc-950 dark:text-white flex items-center gap-2">
              <BookOpen className="w-6 h-6 text-indigo-600 dark:text-indigo-400" />
              <span>Understanding KDP Marketplace Rates & Currency Differences</span>
            </h2>
            <p className="text-zinc-600 dark:text-zinc-400 leading-relaxed">
              KDP prints books locally in fulfillment centers across North America, Europe, the UK, and Australia. Because labor, paper milling, and local freight costs vary, each Amazon marketplace operates under its own distinct currency slab:
            </p>

            <ul className="space-y-3 text-zinc-700 dark:text-zinc-300 list-disc pl-5 text-sm sm:text-base leading-relaxed">
              <li>
                <strong>Amazon.com (USD $):</strong> Fixed $1.00 + $0.012/page for B&W paperbacks over 108 pages. Minimum list price for a 200-page book is $5.67.
              </li>
              <li>
                <strong>Amazon.co.uk (GBP £):</strong> Fixed £0.80 + £0.0105/page. Flat £1.93 under 108 pages. Note that print books in the UK are zero-rated for VAT.
              </li>
              <li>
                <strong>Amazon.de / EU (EUR €):</strong> Fixed €0.85 + €0.012/page. European marketplaces include local statutory Value Added Tax (VAT) in customer-facing list prices.
              </li>
              <li>
                <strong>Amazon.ca (CAD $) & Amazon.com.au (AUD $):</strong> Fixed C$1.45 + C$0.017/page and AU$1.85 + AU$0.021/page respectively to account for local Pacific and Canadian distribution networks.
              </li>
            </ul>
          </section>

          {/* Section 3: 4 Effective Strategies to Increase Your KDP Profit Margins */}
          <section className="space-y-4 border-t border-zinc-200 dark:border-zinc-800 pt-8">
            <h2 className="text-2xl font-black text-zinc-950 dark:text-white flex items-center gap-2">
              <Sparkles className="w-6 h-6 text-emerald-600 dark:text-emerald-400" />
              <span>4 Effective Strategies to Increase Your KDP Book Profit Margins</span>
            </h2>
            <p className="text-zinc-600 dark:text-zinc-400 leading-relaxed">
              Self-published authors can significantly increase royalties without raising book prices by making strategic typesetting and format choices:
            </p>

            <ol className="space-y-3 text-zinc-700 dark:text-zinc-300 list-decimal pl-5 text-sm sm:text-base leading-relaxed">
              <li>
                <strong>Optimize Typesetting & Font Sizing:</strong> Because KDP charges per page above 108 pages, tightening your line spacing (from 1.3 to 1.15) and reducing font size (from 12pt to 11pt) can condense a 360-page manuscript into 300 pages, cutting $0.72 per copy directly off printing costs.
              </li>
              <li>
                <strong>Choose Standard Color for Workbooks:</strong> If your non-fiction book contains light illustrations or colored headings, use Standard Color instead of Premium Color to reduce per-page ink rates by nearly 50% ($0.036 vs $0.070 per page).
              </li>
              <li>
                <strong>Utilize .99 Pricing Psychology:</strong> Pricing your paperback at $14.99 instead of $12.00 delivers an extra $1.79 in net profit per copy while maintaining strong reader conversion rates.
              </li>
              <li>
                <strong>Evaluate Expanded Distribution Selectively:</strong> While Expanded Distribution grants access to library networks, its 40% royalty tier requires higher list prices to maintain profit. Many genre fiction authors achieve higher total revenue by keeping prices competitive for 60% Amazon direct sales.
              </li>
            </ol>
          </section>

          {/* Ad Placement 2 */}
          <div className="ad-slot ad-slot--inline my-8" data-ad-position="in-content-2">
            <div className="ad-placeholder-label border border-dashed border-zinc-300 dark:border-zinc-800 rounded-xl py-4 flex items-center justify-center bg-zinc-50/50 dark:bg-zinc-950/20 text-[10px] font-bold text-zinc-400 dark:text-zinc-600 uppercase tracking-widest cursor-default">
              Advertisement
            </div>
          </div>

          {/* Section 4: Interactive FAQ Accordion (AEO Optimized) */}
          <section className="space-y-4 border-t border-zinc-200 dark:border-zinc-800 pt-8">
            <h2 className="text-2xl font-black text-zinc-950 dark:text-white border-b border-zinc-200 dark:border-zinc-800 pb-3 flex items-center gap-2">
              <HelpCircle className="w-6 h-6 text-emerald-600 dark:text-emerald-400" />
              <span>Frequently Asked Questions (FAQ)</span>
            </h2>

            <div className="space-y-4 not-prose">
              <div className="p-4 rounded-xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 shadow-sm space-y-2">
                <h3 className="text-base font-bold text-zinc-900 dark:text-white">
                  What is the minimum list price for a KDP paperback?
                </h3>
                <p className="text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed">
                  The minimum price equals your total printing cost divided by your royalty rate (60% for Amazon Direct, 40% for Expanded Distribution). Amazon automatically enforces this floor during listing creation to ensure zero negative royalty transactions.
                </p>
              </div>

              <div className="p-4 rounded-xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 shadow-sm space-y-2">
                <h3 className="text-base font-bold text-zinc-900 dark:text-white">
                  How does page count impact my KDP printing cost?
                </h3>
                <p className="text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed">
                  Black-and-white books with 24 to 108 pages cost a flat $2.30. Over 108 pages, costs switch to a $1.00 fixed fee plus $0.012 per page. Every additional 50 pages adds $0.60 to production costs.
                </p>
              </div>

              <div className="p-4 rounded-xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 shadow-sm space-y-2">
                <h3 className="text-base font-bold text-zinc-900 dark:text-white">
                  Is expanded distribution worth the lower 40% royalty rate?
                </h3>
                <p className="text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed">
                  Expanded Distribution is valuable for non-fiction, academic textbooks, and children’s literature that benefits from wholesale catalog distribution to bookstores and public libraries, though it requires higher list prices to yield meaningful author profits.
                </p>
              </div>

              <div className="p-4 rounded-xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 shadow-sm space-y-2">
                <h3 className="text-base font-bold text-zinc-900 dark:text-white">
                  Does Amazon charge printing costs upfront?
                </h3>
                <p className="text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed">
                  No. Amazon KDP is completely print-on-demand with zero upfront inventory costs. Printing charges are automatically deducted from customer payments at the time of each purchase.
                </p>
              </div>
            </div>
          </section>

          {/* Read Full In-Depth Guide Banner */}
          <section className="my-6 not-prose">
            <div className="p-5 rounded-2xl bg-indigo-500/10 border border-indigo-500/30 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div className="space-y-1">
                <span className="text-xs font-bold text-indigo-700 dark:text-indigo-300 uppercase tracking-wider">Author Publishing Guide</span>
                <h3 className="text-base font-bold text-zinc-900 dark:text-white">Amazon KDP Royalty & Printing Cost Guide (2026 Slabs)</h3>
                <p className="text-xs text-zinc-600 dark:text-zinc-400">Learn how 60% vs 40% royalties, fixed base printing fees, and minimum list price calculations work across global marketplaces.</p>
              </div>
              <Link
                href="/blog/amazon-kdp-royalty-and-printing-cost-guide"
                className="px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs uppercase tracking-wider transition-all whitespace-nowrap shrink-0 shadow-sm flex items-center gap-1.5"
              >
                <span>Read Full Guide</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </section>

          {/* Related Tools Cross-Linking */}
          <section className="space-y-3 border-t border-zinc-200 dark:border-zinc-800 pt-8 not-prose">
            <h3 className="text-sm font-bold uppercase tracking-wider text-zinc-500 dark:text-zinc-400">
              Related E-Commerce & Author Planning Tools
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <Link
                href="/tools/etsy-fee-calculator"
                className="p-3 rounded-xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 hover:border-emerald-500 transition-all flex items-center justify-between text-xs font-semibold text-zinc-800 dark:text-zinc-200 group"
              >
                <span>Etsy Fee & Net Profit Calculator</span>
                <ArrowRight className="w-3.5 h-3.5 text-zinc-400 group-hover:text-emerald-500 group-hover:translate-x-0.5 transition-all" />
              </Link>
              <Link
                href="/tools/word-character-counter"
                className="p-3 rounded-xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 hover:border-emerald-500 transition-all flex items-center justify-between text-xs font-semibold text-zinc-800 dark:text-zinc-200 group"
              >
                <span>Word & Character Counter</span>
                <ArrowRight className="w-3.5 h-3.5 text-zinc-400 group-hover:text-emerald-500 group-hover:translate-x-0.5 transition-all" />
              </Link>
              <Link
                href="/tools/readability-score-calculator"
                className="p-3 rounded-xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 hover:border-emerald-500 transition-all flex items-center justify-between text-xs font-semibold text-zinc-800 dark:text-zinc-200 group"
              >
                <span>Readability Score Calculator</span>
                <ArrowRight className="w-3.5 h-3.5 text-zinc-400 group-hover:text-emerald-500 group-hover:translate-x-0.5 transition-all" />
              </Link>
            </div>
          </section>
        </article>

        <RelatedTools currentSlug="kdp-royalty-calculator" />

        {/* Ad Placement Footer */}
        <div className="ad-slot ad-slot--footer mt-12" data-ad-position="footer">
          <div className="ad-placeholder-label border border-dashed border-zinc-300 dark:border-zinc-800 rounded-xl py-4 flex items-center justify-center bg-zinc-50/50 dark:bg-zinc-950/20 text-[10px] font-bold text-zinc-400 dark:text-zinc-600 uppercase tracking-widest cursor-default">
            Advertisement
          </div>
        </div>
      </main>

      {/* Footer */}
      <Footer customText="Precise 2026 Amazon KDP print-on-demand printing cost and author royalty modeling." />
    </div>
  );
}
