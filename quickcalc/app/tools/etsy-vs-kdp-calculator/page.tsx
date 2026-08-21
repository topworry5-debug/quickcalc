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
import EtsyVsKdpCalculatorWidget from "./EtsyVsKdpCalculatorWidget";
import { ShoppingBag, BookOpen, Sparkles, HelpCircle, ArrowRight, DollarSign, Scale } from "lucide-react";

export const metadata: Metadata = {
  title: "Etsy vs Amazon KDP Profit Calculator & Fee Comparison (2026)",
  description: "Compare net profits, platform fees, print-on-demand costs, and monthly revenue side-by-side between Etsy and Amazon KDP for journals, planners, and books.",
  alternates: {
    canonical: "/tools/etsy-vs-kdp-calculator",
  },
  openGraph: {
    title: "Etsy vs Amazon KDP Profit Calculator (2026 Slabs) - QuickCalc",
    description: "Free side-by-side profit calculator comparing Etsy 6.5% fees and payment processing with Amazon KDP 60% royalties and print costs.",
    url: "https://quickcalc.cloud/tools/etsy-vs-kdp-calculator",
    type: "website",
    siteName: "QuickCalc",
    images: [
      {
        url: "https://quickcalc.cloud/og-image.png",
        width: 1200,
        height: 630,
        alt: "Etsy vs Amazon KDP Profit Comparison on QuickCalc",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Etsy vs Amazon KDP Profit Calculator & Fee Comparison (2026)",
    description: "Compare side-by-side author profits, seller fees, and monthly income between Etsy and Amazon KDP.",
  },
};

export default function EtsyVsKdpCalculatorPage({
  searchParams,
}: {
  searchParams?: { embed?: string };
}) {
  const softwareSchema = generateSoftwareAppSchema({
    name: "Etsy vs Amazon KDP Profit Calculator & Fee Comparison (2026)",
    description: "Free side-by-side comparison tool to calculate and analyze net profit margins, seller fees, and monthly income between Etsy and Amazon KDP.",
    slug: "etsy-vs-kdp-calculator",
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
          <EtsyVsKdpCalculatorWidget />
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
        "name": "Which platform gives higher profit margins: Etsy or Amazon KDP?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "For digital downloads (such as PDF planners and printables with $0 COGS), Etsy delivers significantly higher profit margins (85%–90%) compared to KDP. However, for physical paperbacks and low-content notebooks, Amazon KDP often delivers higher margins because its integrated internal print network produces books at lower baseline manufacturing costs without third-party integration markups."
        }
      },
      {
        "@type": "Question",
        "name": "Does Amazon KDP charge listing fees like Etsy?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "No. Amazon KDP charges $0 in listing or renewal fees, allowing authors to publish unlimited titles for free. In contrast, Etsy charges a flat $0.20 listing fee per item that automatically renews every 4 months or upon each sale."
        }
      },
      {
        "@type": "Question",
        "name": "Can I sell the same notebook or planner on both Etsy and Amazon KDP?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Yes, provided your interior and cover designs are 100% original and you retain the copyright. You can sell physical versions via Amazon KDP with a free KDP ISBN, while simultaneously selling printable digital PDF versions or spiral-bound POD versions through Printify on Etsy."
        }
      },
      {
        "@type": "Question",
        "name": "How do printing costs differ between print-on-demand on Etsy vs KDP?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "On Amazon KDP, printing costs are deducted directly from the retail list price at wholesale rates (e.g., $2.44 for a 120-page B&W paperback). On Etsy, sellers typically integrate third-party POD providers (like Printify or Lulu Direct), where base production costs ($5.00–$8.00) plus separate customer shipping fees must be factored into the retail price."
        }
      }
    ]
  };

  const articleData = {
    "@context": "https://schema.org",
    "@type": "Article",
    "headline": "Etsy vs Amazon KDP: Complete Profit & Fee Comparison Guide (2026)",
    "description": "Comprehensive comparative breakdown of Etsy transaction fees, payment processing, Amazon KDP 60% royalties, printing costs, and profit margins.",
    "url": "https://quickcalc.cloud/tools/etsy-vs-kdp-calculator",
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
        <Breadcrumbs toolName="Etsy vs KDP Calculator" toolSlug="etsy-vs-kdp-calculator" />
        
        <div className="text-center max-w-3xl mx-auto mb-8">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-amber-500/10 text-amber-700 dark:text-amber-300 border border-amber-500/20 mb-3">
            <Sparkles className="w-3.5 h-3.5" />
            <span>2026 Side-by-Side Platform Analytics</span>
          </div>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight text-zinc-900 dark:text-white mb-4">
            Free Etsy vs Amazon KDP Profit Calculator & Fee Comparison (2026)
          </h1>

          {/* AI-extractable direct answer summary */}
          <p className="text-sm sm:text-base font-semibold text-amber-800 dark:text-amber-200 bg-amber-500/10 border border-amber-500/30 rounded-xl px-4 py-3 leading-relaxed mb-4 text-left">
            This free comparative calculator computes exact net profits, platform transaction cuts, manufacturing and print-on-demand costs, and monthly income projections between Etsy and Amazon KDP to reveal which marketplace maximizes your earnings.
          </p>

          {/* Stand-alone direct answer paragraph */}
          <p className="text-sm sm:text-base text-zinc-600 dark:text-zinc-400 leading-relaxed font-medium">
            To compare Etsy vs Amazon KDP profit, subtract Etsy’s 6.5% transaction fee, $0.20 listing fee, 3% payment processing, and production COGS from gross revenue on Etsy, and compare that against Amazon KDP’s 60% gross royalty minus integrated printing costs. Digital items typically earn higher margins on Etsy, while physical books scale faster on Amazon.
          </p>
        </div>

        <ShareButtons
          url="https://quickcalc.cloud/tools/etsy-vs-kdp-calculator"
          title="Etsy vs Amazon KDP Profit Calculator (2026)"
        />
        <EmbedWidget
          url="https://quickcalc.cloud/tools/etsy-vs-kdp-calculator"
          title="Etsy vs Amazon KDP Profit Calculator"
        />

        {/* The interactive widget */}
        <section className="my-8">
          <EtsyVsKdpCalculatorWidget />
        </section>

        {/* Scientific & Mathematical Methodology Accordion */}
        <MethodologyAccordion slug="etsy-vs-kdp-calculator" />

        {/* Ad Placement 1 */}
        <div className="ad-slot ad-slot--inline my-8" data-ad-position="in-content-1">
          <div className="ad-placeholder-label border border-dashed border-zinc-300 dark:border-zinc-800 rounded-xl py-4 flex items-center justify-center bg-zinc-50/50 dark:bg-zinc-950/20 text-[10px] font-bold text-zinc-400 dark:text-zinc-600 uppercase tracking-widest cursor-default">
            Advertisement
          </div>
        </div>

        {/* Comprehensive SEO & AEO Content (500+ Words) */}
        <article className="prose prose-zinc dark:prose-invert max-w-4xl mx-auto space-y-8 mt-12 border-t border-zinc-200 dark:border-zinc-800 pt-10">
          
          {/* Section 1: Etsy vs Amazon KDP: Complete Fee Structure Breakdown */}
          <section className="space-y-4">
            <h2 className="text-2xl font-black text-zinc-950 dark:text-white flex items-center gap-2">
              <Scale className="w-6 h-6 text-amber-500" />
              <span>Etsy vs Amazon KDP: Complete Fee Structure Breakdown</span>
            </h2>
            <p className="text-zinc-600 dark:text-zinc-400 leading-relaxed">
              Choosing between Etsy and Amazon KDP for low-content books, journals, planners, and art prints requires understanding how each platform structures creator compensation:
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 not-prose my-6">
              <div className="p-4 rounded-xl bg-white dark:bg-zinc-900 border border-amber-200 dark:border-amber-900/40 shadow-sm space-y-2">
                <h3 className="text-sm font-bold text-amber-900 dark:text-amber-300 flex items-center gap-1.5">
                  <ShoppingBag className="w-4 h-4 text-amber-500" />
                  <span>Etsy Fee Model</span>
                </h3>
                <ul className="text-xs text-zinc-600 dark:text-zinc-400 space-y-1.5 leading-relaxed">
                  <li><strong>Listing Fee:</strong> $0.20 per listing (renews every 4 months or per sale)</li>
                  <li><strong>Transaction Fee:</strong> Flat 6.5% on total order (item + shipping)</li>
                  <li><strong>Payment Processing:</strong> 3% + $0.25 in USA (4% in UK/EU)</li>
                  <li><strong>Offsite Ads:</strong> 15% (standard) or 12% mandatory for top sellers</li>
                  <li><strong>Fulfillment:</strong> Seller pays third-party POD (e.g. Printify) or ships manually</li>
                </ul>
              </div>

              <div className="p-4 rounded-xl bg-white dark:bg-zinc-900 border border-indigo-200 dark:border-indigo-900/40 shadow-sm space-y-2">
                <h3 className="text-sm font-bold text-indigo-900 dark:text-indigo-300 flex items-center gap-1.5">
                  <BookOpen className="w-4 h-4 text-indigo-500" />
                  <span>Amazon KDP Royalty Model</span>
                </h3>
                <ul className="text-xs text-zinc-600 dark:text-zinc-400 space-y-1.5 leading-relaxed">
                  <li><strong>Listing Fee:</strong> $0.00 (Unlimited free listings)</li>
                  <li><strong>Amazon Platform Cut:</strong> 40% on Amazon Direct (60% on Expanded)</li>
                  <li><strong>Printing Cost:</strong> Fixed base ($1.00) + $0.012/page for B&W</li>
                  <li><strong>Fulfillment:</strong> 100% automated by Amazon Prime distribution</li>
                  <li><strong>Author Take-Home:</strong> Net Royalty = (Price × 60%) - Print Cost</li>
                </ul>
              </div>
            </div>
          </section>

          {/* Section 2: When to Choose Etsy vs Amazon KDP */}
          <section className="space-y-4 border-t border-zinc-200 dark:border-zinc-800 pt-8">
            <h2 className="text-2xl font-black text-zinc-950 dark:text-white flex items-center gap-2">
              <Sparkles className="w-6 h-6 text-emerald-600 dark:text-emerald-400" />
              <span>When to Choose Etsy vs Amazon KDP for Low-Content & Print Products</span>
            </h2>
            <p className="text-zinc-600 dark:text-zinc-400 leading-relaxed">
              Neither platform is universally superior; each caters to different product types and business models:
            </p>

            <ul className="space-y-3 text-zinc-700 dark:text-zinc-300 list-disc pl-5 text-sm sm:text-base leading-relaxed">
              <li>
                <strong>Choose Etsy for Digital Downloads & Custom Products:</strong> If you sell printable PDF planners, Canva templates, or personalized gift journals, Etsy is the clear winner. With zero physical printing costs, profit margins regularly exceed 85%, and buyers gladly pay premium prices for boutique customization.
              </li>
              <li>
                <strong>Choose Amazon KDP for Hands-Off Volume Scaling:</strong> If your goal is publishing hundreds of lined notebooks, logbooks, puzzle books, or novels with zero customer service, inventory management, or manual shipping, KDP offers unmatched automation and Prime 2-day delivery logistics.
              </li>
              <li>
                <strong>The Multi-Channel Hybrid Strategy:</strong> Leading creator-entrepreneurs publish paperback editions on Amazon KDP while packaging the exact same interior files into digital GoodNotes / iPad planners on Etsy to capture both audiences simultaneously.
              </li>
            </ul>
          </section>

          {/* Section 3: Step-by-Step Practical Profit Calculation Example */}
          <section className="space-y-4 border-t border-zinc-200 dark:border-zinc-800 pt-8">
            <h2 className="text-2xl font-black text-zinc-950 dark:text-white flex items-center gap-2">
              <DollarSign className="w-6 h-6 text-emerald-600 dark:text-emerald-400" />
              <span>Step-by-Step Practical Profit Example ($14.99 120-Page Journal)</span>
            </h2>
            <p className="text-zinc-600 dark:text-zinc-400 leading-relaxed">
              Let us compare the exact financial returns for a <strong>$14.99 120-page paperback journal</strong> sold on both platforms:
            </p>

            <div className="bg-zinc-100 dark:bg-zinc-900 p-5 rounded-2xl border border-zinc-200 dark:border-zinc-800 font-mono text-xs sm:text-sm space-y-3 overflow-x-auto text-zinc-800 dark:text-zinc-200 not-prose">
              <div>
                <span className="text-amber-600 dark:text-amber-400 font-bold">1. Etsy Storefront ($14.99 + $3.99 Shipping Charged = $18.98 Gross):</span>
                <span className="block mt-0.5">Listing Fee ($0.20) + 6.5% Transaction ($1.23) + 3%+$0.25 Processing ($0.82) = $2.25 Total Fees</span>
                <span className="block mt-0.5">POD Base Print Cost ($5.50) + Actual Shipping ($3.99) = $9.49 Fulfillment</span>
                <span className="block mt-0.5 font-bold text-amber-600 dark:text-amber-400">Etsy Net Profit Per Unit = $18.98 - $2.25 - $9.49 = $7.24 (48.3% margin)</span>
              </div>
              <div>
                <span className="text-indigo-600 dark:text-indigo-400 font-bold">2. Amazon KDP ($14.99 Retail List Price):</span>
                <span className="block mt-0.5">Gross 60% Royalty = $14.99 × 0.60 = $8.99</span>
                <span className="block mt-0.5">KDP 120-Page Print Cost = $1.00 + (120 × $0.012) = $2.44</span>
                <span className="block mt-0.5 font-bold text-indigo-600 dark:text-indigo-400">KDP Net Royalty Per Unit = $8.99 - $2.44 = $6.55 (43.7% margin)</span>
              </div>
              <div>
                <span className="text-emerald-600 dark:text-emerald-400 font-bold">3. The Verdict:</span>
                <span className="block mt-0.5 font-bold text-emerald-600 dark:text-emerald-400">Etsy generates $0.69 more profit per unit (+4.6% margin edge). At 150 sales/month, Etsy delivers $103.50/mo higher income.</span>
              </div>
            </div>
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
              <HelpCircle className="w-6 h-6 text-amber-500" />
              <span>Frequently Asked Questions (FAQ)</span>
            </h2>

            <div className="space-y-4 not-prose">
              <div className="p-4 rounded-xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 shadow-sm space-y-2">
                <h3 className="text-base font-bold text-zinc-900 dark:text-white">
                  Which platform gives higher profit margins: Etsy or Amazon KDP?
                </h3>
                <p className="text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed">
                  Digital products on Etsy yield the highest overall margins (85%+), while physical books priced above $12 on Amazon KDP frequently deliver better net returns due to lower internal print manufacturing costs.
                </p>
              </div>

              <div className="p-4 rounded-xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 shadow-sm space-y-2">
                <h3 className="text-base font-bold text-zinc-900 dark:text-white">
                  Does Amazon KDP charge listing fees like Etsy?
                </h3>
                <p className="text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed">
                  No. Amazon KDP has zero upfront listing or listing expiration fees, whereas Etsy charges a recurring $0.20 fee per 4-month listing cycle.
                </p>
              </div>

              <div className="p-4 rounded-xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 shadow-sm space-y-2">
                <h3 className="text-base font-bold text-zinc-900 dark:text-white">
                  Can I sell the same notebook or planner on both Etsy and Amazon KDP?
                </h3>
                <p className="text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed">
                  Yes, cross-listing your designs as physical books on KDP and printable digital planners on Etsy is a proven strategy to maximize creator revenue.
                </p>
              </div>

              <div className="p-4 rounded-xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 shadow-sm space-y-2">
                <h3 className="text-base font-bold text-zinc-900 dark:text-white">
                  How do printing costs differ between print-on-demand on Etsy vs KDP?
                </h3>
                <p className="text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed">
                  Amazon prints in-house at wholesale POD rates ($2.44 for 120 pages), whereas Etsy sellers rely on third-party POD vendors whose base printing costs ($5.00+) include vendor margins and shipping fees.
                </p>
              </div>
            </div>
          </section>

          {/* Related Tools Cross-Linking */}
          <section className="space-y-3 border-t border-zinc-200 dark:border-zinc-800 pt-8 not-prose">
            <h3 className="text-sm font-bold uppercase tracking-wider text-zinc-500 dark:text-zinc-400">
              Related E-Commerce & Publishing Calculators
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <Link
                href="/tools/etsy-fee-calculator"
                className="p-3 rounded-xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 hover:border-amber-500 transition-all flex items-center justify-between text-xs font-semibold text-zinc-800 dark:text-zinc-200 group"
              >
                <span>Etsy Fee & Profit Calculator</span>
                <ArrowRight className="w-3.5 h-3.5 text-zinc-400 group-hover:text-amber-500 group-hover:translate-x-0.5 transition-all" />
              </Link>
              <Link
                href="/tools/kdp-royalty-calculator"
                className="p-3 rounded-xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 hover:border-indigo-500 transition-all flex items-center justify-between text-xs font-semibold text-zinc-800 dark:text-zinc-200 group"
              >
                <span>Amazon KDP Royalty Calculator</span>
                <ArrowRight className="w-3.5 h-3.5 text-zinc-400 group-hover:text-indigo-500 group-hover:translate-x-0.5 transition-all" />
              </Link>
              <Link
                href="/tools/freelance-rate-calculator"
                className="p-3 rounded-xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 hover:border-emerald-500 transition-all flex items-center justify-between text-xs font-semibold text-zinc-800 dark:text-zinc-200 group"
              >
                <span>Freelance Rate Calculator</span>
                <ArrowRight className="w-3.5 h-3.5 text-zinc-400 group-hover:text-emerald-500 group-hover:translate-x-0.5 transition-all" />
              </Link>
            </div>
          </section>
        </article>

        <RelatedTools currentSlug="etsy-vs-kdp-calculator" />

        {/* Ad Placement Footer */}
        <div className="ad-slot ad-slot--footer mt-12" data-ad-position="footer">
          <div className="ad-placeholder-label border border-dashed border-zinc-300 dark:border-zinc-800 rounded-xl py-4 flex items-center justify-center bg-zinc-50/50 dark:bg-zinc-950/20 text-[10px] font-bold text-zinc-400 dark:text-zinc-600 uppercase tracking-widest cursor-default">
            Advertisement
          </div>
        </div>
      </main>

      {/* Footer */}
      <Footer customText="Precise 2026 side-by-side Etsy vs Amazon KDP profit margin and fee comparison." />
    </div>
  );
}
