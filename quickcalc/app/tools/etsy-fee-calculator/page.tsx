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
import EtsyFeeCalculatorWidget from "./EtsyFeeCalculatorWidget";
import { CheckCircle2, DollarSign, Percent, Sparkles, TrendingUp, HelpCircle, ArrowRight } from "lucide-react";

export const metadata: Metadata = {
  title: "Etsy Fee & Net Profit Calculator (2026 Slabs) - 100% Accurate",
  description: "Calculate your exact 2026 Etsy seller fees, transaction commissions (6.5%), payment processing slabs, offsite ads, and true net profit margins instantly.",
  alternates: {
    canonical: "/tools/etsy-fee-calculator",
  },
  openGraph: {
    title: "Etsy Fee & Net Profit Calculator (2026 Slabs) - QuickCalc",
    description: "Free 2026 Etsy fee and profit calculator. Calculate 6.5% transaction fees, country payment processing rates, offsite ads, and breakeven prices in USD, GBP, EUR, CAD, and AUD.",
    url: "https://quickcalc.cloud/tools/etsy-fee-calculator",
    type: "website",
    siteName: "QuickCalc",
    images: [
      {
        url: "https://quickcalc.cloud/og-image.png",
        width: 1200,
        height: 630,
        alt: "Etsy Fee and Net Profit Calculator on QuickCalc",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Etsy Fee & Net Profit Calculator (2026 Slabs)",
    description: "Accurately calculate 2026 Etsy seller fees, 6.5% transaction commissions, processing tiers, and net profit margins instantly.",
  },
};

export default function EtsyFeeCalculatorPage({
  searchParams,
}: {
  searchParams?: { embed?: string };
}) {
  const softwareSchema = generateSoftwareAppSchema({
    name: "Etsy Fee & Net Profit Calculator (2026 Slabs)",
    description: "Free online utility tool for Etsy sellers to calculate exact marketplace fees, payment processing rates, regulatory fees, offsite ads, and net profit margins.",
    slug: "etsy-fee-calculator",
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
          <EtsyFeeCalculatorWidget />
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
        "name": "What percentage does Etsy take in 2026?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "In 2026, Etsy charges a baseline 6.5% transaction fee on the full order total (item price + shipping charged), a flat $0.20 listing renewal fee per item sold, and country-specific payment processing fees (for US sellers: 3.0% + $0.25; UK: 4.0% + £0.20; Canada: 3.0% + $0.25 + 1.15% regulatory fee). In total, typical sellers pay between 9.5% and 12% in total Etsy fees for organic sales, and up to 24% to 27% if the sale originated from Etsy Offsite Ads."
        }
      },
      {
        "@type": "Question",
        "name": "Does Etsy charge fees on shipping?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Yes. Etsy applies both the 6.5% transaction fee and payment processing fees to the entire customer order amount, including shipping charged to the buyer and gift wrapping. This policy prevents sellers from circumventing transaction fees by listing items for $0.01 with inflated shipping costs."
        }
      },
      {
        "@type": "Question",
        "name": "How do Offsite Ads impact my profit margin?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Etsy Offsite Ads advertise your listings across Google, Facebook, Instagram, Pinterest, and Bing. If a buyer clicks an external ad and purchases from your shop within 30 days, Etsy charges an advertising fee on the total sale: 15% for standard shops earning under $10,000 annually (optional to opt out), or 12% for shops that made over $10,000 in the trailing 12 months (mandatory enrollment)."
        }
      },
      {
        "@type": "Question",
        "name": "Is the $0.20 listing fee charged on every sale?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Yes. While listing an item costs $0.20 for 4 months, when an item with multiple quantities sells, Etsy automatically renews the listing for the remaining stock at an additional $0.20 per quantity sold. If a customer buys 3 identical items in a single transaction, you incur $0.60 in auto-renewal listing fees."
        }
      }
    ]
  };

  const articleData = {
    "@context": "https://schema.org",
    "@type": "Article",
    "headline": "Etsy Fee & Net Profit Calculator (2026 Slabs & Formulas)",
    "description": "Comprehensive guide and interactive calculator covering Etsy's 2026 fee structures, payment processing slabs across US, UK, Canada, and EU, Offsite Ads, and breakeven pricing formulas.",
    "url": "https://quickcalc.cloud/tools/etsy-fee-calculator",
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
        <Breadcrumbs toolName="Etsy Fee Calculator" toolSlug="etsy-fee-calculator" />
        
        <div className="text-center max-w-3xl mx-auto mb-8">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-teal-500/10 text-teal-700 dark:text-teal-300 border border-teal-500/20 mb-3">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Updated with 2026 Platform Slabs & Multi-Country Presets</span>
          </div>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight text-zinc-900 dark:text-white mb-4">
            Free Etsy Fee & Net Profit Calculator (Updated 2026)
          </h1>

          {/* AI-extractable direct answer summary */}
          <p className="text-sm sm:text-base font-semibold text-teal-800 dark:text-teal-200 bg-teal-500/10 border border-teal-500/30 rounded-xl px-4 py-3 leading-relaxed mb-4 text-left">
            This free Etsy calculator estimates your exact listing commissions ($0.20), 6.5% transaction cut, country-specific payment processing slabs, regulatory operating fees, and Offsite Ads to reveal your true net profit and breakeven item price.
          </p>

          {/* Stand-alone direct answer paragraph */}
          <p className="text-sm sm:text-base text-zinc-600 dark:text-zinc-400 leading-relaxed font-medium">
            To calculate your exact Etsy profit, subtract all mandatory marketplace fees (a $0.20 listing charge, a 6.5% transaction fee on total buyer payment, country payment processing rates, and applicable 12%–15% Offsite Ads) together with your Cost of Goods Sold (COGS) and actual postage packaging costs from your gross customer order revenue.
          </p>
        </div>

        <ShareButtons
          url="https://quickcalc.cloud/tools/etsy-fee-calculator"
          title="Etsy Fee & Net Profit Calculator (2026)"
        />
        <EmbedWidget
          url="https://quickcalc.cloud/tools/etsy-fee-calculator"
          title="Etsy Fee & Net Profit Calculator"
        />

        {/* The interactive widget */}
        <section className="my-8">
          <EtsyFeeCalculatorWidget />
        </section>

        {/* Scientific & Mathematical Methodology Accordion */}
        <MethodologyAccordion slug="etsy-fee-calculator" />

        {/* Ad Placement 1 */}
        <div className="ad-slot ad-slot--inline my-8" data-ad-position="in-content-1">
          <div className="ad-placeholder-label border border-dashed border-zinc-300 dark:border-zinc-800 rounded-xl py-4 flex items-center justify-center bg-zinc-50/50 dark:bg-zinc-950/20 text-[10px] font-bold text-zinc-400 dark:text-zinc-600 uppercase tracking-widest cursor-default">
            Advertisement
          </div>
        </div>

        {/* Comprehensive SEO & AEO Content (500+ Words) */}
        <article className="prose prose-zinc dark:prose-invert max-w-4xl mx-auto space-y-8 mt-12 border-t border-zinc-200 dark:border-zinc-800 pt-10">
          
          {/* Section 1: How Etsy Fees Work in 2026 */}
          <section className="space-y-4">
            <h2 className="text-2xl font-black text-zinc-950 dark:text-white flex items-center gap-2">
              <DollarSign className="w-6 h-6 text-teal-600 dark:text-teal-400" />
              <span>How Etsy Fees Work in 2026</span>
            </h2>
            <p className="text-zinc-600 dark:text-zinc-400 leading-relaxed">
              Selling on Etsy provides instant global reach to tens of millions of active buyers, but understanding the platform’s fee schedule is essential for running a profitable handmade or digital e-commerce business. In 2026, every sale on Etsy incurs several layered commission tiers:
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 not-prose my-6">
              <div className="p-4 rounded-xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 shadow-sm space-y-2">
                <h3 className="text-sm font-bold text-zinc-900 dark:text-white flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-teal-500" />
                  <span>1. Listing & Auto-Renewal Fee ($0.20)</span>
                </h3>
                <p className="text-xs text-zinc-600 dark:text-zinc-400 leading-relaxed">
                  Every product listing costs a flat $0.20 USD (or local currency equivalent like £0.16 or €0.19) for a 4-month duration. When an item sells, Etsy automatically charges another $0.20 renewal fee for remaining stock.
                </p>
              </div>

              <div className="p-4 rounded-xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 shadow-sm space-y-2">
                <h3 className="text-sm font-bold text-zinc-900 dark:text-white flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-teal-500" />
                  <span>2. Transaction Fee (6.5%)</span>
                </h3>
                <p className="text-xs text-zinc-600 dark:text-zinc-400 leading-relaxed">
                  Etsy takes a 6.5% transaction commission on the <strong>gross order total</strong>, which includes the item sale price, shipping charged to the customer, and optional gift wrapping.
                </p>
              </div>

              <div className="p-4 rounded-xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 shadow-sm space-y-2">
                <h3 className="text-sm font-bold text-zinc-900 dark:text-white flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-teal-500" />
                  <span>3. Payment Processing Slabs</span>
                </h3>
                <p className="text-xs text-zinc-600 dark:text-zinc-400 leading-relaxed">
                  Calculated per transaction based on seller residency: US (3.0% + $0.25), UK (4.0% + £0.20), Canada (3.0% + C$0.25), and EU (4.0% + €0.30).
                </p>
              </div>

              <div className="p-4 rounded-xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 shadow-sm space-y-2">
                <h3 className="text-sm font-bold text-zinc-900 dark:text-white flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-teal-500" />
                  <span>4. Regulatory Operating Fees</span>
                </h3>
                <p className="text-xs text-zinc-600 dark:text-zinc-400 leading-relaxed">
                  In select jurisdictions with digital services taxation, Etsy levies a regulatory operating fee on order totals: Canada (1.15%), UK (0.32%), France (0.40%), and Italy (0.32%).
                </p>
              </div>
            </div>

            <p className="text-zinc-600 dark:text-zinc-400 leading-relaxed">
              Additionally, <strong>Offsite Ads</strong> can add a substantial cost. If a buyer discovers your shop through an Etsy-funded ad on Google or social media and makes a purchase within 30 days, Etsy charges an extra 15% (for shops under $10,000 annual turnover) or a mandatory 12% (for shops exceeding $10,000 in trailing 12-month revenue).
            </p>
          </section>

          {/* Section 2: Step-by-Step Mathematical Formula */}
          <section className="space-y-4 border-t border-zinc-200 dark:border-zinc-800 pt-8">
            <h2 className="text-2xl font-black text-zinc-950 dark:text-white flex items-center gap-2">
              <Percent className="w-6 h-6 text-indigo-600 dark:text-indigo-400" />
              <span>Step-by-Step Mathematical Formula</span>
            </h2>
            <p className="text-zinc-600 dark:text-zinc-400 leading-relaxed">
              Our calculator executes the exact 2026 multi-variable algebraic sequence utilized by Etsy’s billing ledger:
            </p>

            <div className="bg-zinc-100 dark:bg-zinc-900 p-5 rounded-2xl border border-zinc-200 dark:border-zinc-800 font-mono text-xs sm:text-sm space-y-3 overflow-x-auto text-zinc-800 dark:text-zinc-200 not-prose">
              <div>
                <span className="text-teal-600 dark:text-teal-400 font-bold">1. Order Total:</span>
                <span className="block mt-1">Order Total = Item Price + Shipping Charged to Buyer</span>
              </div>
              <div>
                <span className="text-indigo-600 dark:text-indigo-400 font-bold">2. Total Etsy Platform Fees:</span>
                <span className="block mt-1">
                  Etsy Fees = Listing ($0.20) + (Order Total × 6.5%) + (Order Total × Processing % + Fixed Fee) + (Order Total × Regulatory %) + (Order Total × Offsite Ads %)
                </span>
              </div>
              <div>
                <span className="text-amber-600 dark:text-amber-400 font-bold">3. Total All Expenses:</span>
                <span className="block mt-1">Total Expenses = Total Etsy Fees + Item COGS + Actual Carrier Shipping Cost</span>
              </div>
              <div>
                <span className="text-emerald-600 dark:text-emerald-400 font-bold">4. Net Profit & Margin:</span>
                <span className="block mt-1">Net Profit = Order Total - Total Expenses</span>
                <span className="block mt-0.5">Net Profit Margin % = (Net Profit / Order Total) × 100</span>
              </div>
              <div>
                <span className="text-rose-600 dark:text-rose-400 font-bold">5. Breakeven Item Price Formula:</span>
                <span className="block mt-1 leading-relaxed">
                  Breakeven Price = [ (Listing Fee + Fixed Processing + COGS + Actual Shipping) / (1 - (0.065 + Processing % + Regulatory % + Offsite Ads %)) ] - Shipping Charged
                </span>
              </div>
            </div>
          </section>

          {/* Section 3: 5 Proven Tips to Lower Your Etsy Fees */}
          <section className="space-y-4 border-t border-zinc-200 dark:border-zinc-800 pt-8">
            <h2 className="text-2xl font-black text-zinc-950 dark:text-white flex items-center gap-2">
              <TrendingUp className="w-6 h-6 text-emerald-600 dark:text-emerald-400" />
              <span>5 Proven Tips to Lower Your Etsy Fees & Maximize Profit</span>
            </h2>
            <p className="text-zinc-600 dark:text-zinc-400 leading-relaxed">
              While marketplace commissions are fixed by Etsy policy, savvy shop owners deploy proven strategies to protect their margins:
            </p>

            <ol className="space-y-3 text-zinc-700 dark:text-zinc-300 list-decimal pl-5 text-sm sm:text-base leading-relaxed">
              <li>
                <strong>Bundle Products & Create Sets:</strong> Because the $0.20 listing fee and $0.25 payment processing charge are fixed per transaction, selling a $60 multi-item bundle incurs fewer fixed fee deductions than selling three individual $20 items separately.
              </li>
              <li>
                <strong>Incorporate Free Shipping into Base Prices:</strong> Etsy prioritizes listings offering free shipping ($35+ guarantee) in US search rankings. Calculate your postage using our tool and blend it into the item price to capture organic ranking without sacrificing margins.
              </li>
              <li>
                <strong>Optimize Offsite Ads Settings:</strong> If your shop generates under $10,000 annually and margins are tight (under 25%), consider opting out of Offsite Ads in your Shop Manager marketing settings to prevent the steep 15% surcharge.
              </li>
              <li>
                <strong>Purchase Postage Through Etsy Shipping Labels:</strong> Etsy negotiates volume commercial discounts (up to 30% off retail USPS/Canada Post/Evri rates), reducing your actual carrier expense compared to buying postage at the post office counter.
              </li>
              <li>
                <strong>Expand with Digital Downloads:</strong> Printable files, digital artwork, and templates have zero material COGS and zero packaging/shipping costs, creating 80%+ net profit margins after standard platform fees.
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
              <HelpCircle className="w-6 h-6 text-teal-600 dark:text-teal-400" />
              <span>Frequently Asked Questions (FAQ)</span>
            </h2>

            <div className="space-y-4 not-prose">
              <div className="p-4 rounded-xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 shadow-sm space-y-2">
                <h3 className="text-base font-bold text-zinc-900 dark:text-white">
                  What percentage does Etsy take in 2026?
                </h3>
                <p className="text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed">
                  In 2026, Etsy takes a 6.5% transaction commission on the total order amount, a $0.20 listing renewal fee per unit sold, and country-specific payment processing fees (3.0% + $0.25 in the US; 4.0% + £0.20 in the UK; 3.0% + C$0.25 in Canada). For organic sales, total Etsy fees generally range between 9.5% and 12% of gross revenue.
                </p>
              </div>

              <div className="p-4 rounded-xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 shadow-sm space-y-2">
                <h3 className="text-base font-bold text-zinc-900 dark:text-white">
                  Does Etsy charge fees on shipping?
                </h3>
                <p className="text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed">
                  Yes. Etsy assesses both the 6.5% transaction fee and payment processing fees on the full amount paid by the customer, including item price, shipping fees charged, and gift wrap charges.
                </p>
              </div>

              <div className="p-4 rounded-xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 shadow-sm space-y-2">
                <h3 className="text-base font-bold text-zinc-900 dark:text-white">
                  How do Offsite Ads impact my profit margin?
                </h3>
                <p className="text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed">
                  When a buyer clicks an Etsy advertisement on Google, Facebook, or Pinterest and purchases from your shop within 30 days, Etsy charges an Offsite Ads fee on the entire order. Sellers earning under $10,000 per year pay 15% (and can opt out), while shops earning over $10,000 pay a mandatory 12% fee.
                </p>
              </div>

              <div className="p-4 rounded-xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 shadow-sm space-y-2">
                <h3 className="text-base font-bold text-zinc-900 dark:text-white">
                  Is the $0.20 listing fee charged on every sale?
                </h3>
                <p className="text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed">
                  Yes. When an item with multiple quantities is purchased, Etsy charges an auto-renewal fee of $0.20 for each individual unit sold to relist the remaining inventory.
                </p>
              </div>
            </div>
          </section>

          {/* Internal Cross-Linking Section */}
          <section className="space-y-3 border-t border-zinc-200 dark:border-zinc-800 pt-8 not-prose">
            <h3 className="text-sm font-bold uppercase tracking-wider text-zinc-500 dark:text-zinc-400">
              Related E-Commerce & Financial Planning Utilities
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <Link
                href="/tools/discount-calculator"
                className="p-3 rounded-xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 hover:border-teal-500 transition-all flex items-center justify-between text-xs font-semibold text-zinc-800 dark:text-zinc-200 group"
              >
                <span>Discount & Sale Calculator</span>
                <ArrowRight className="w-3.5 h-3.5 text-zinc-400 group-hover:text-teal-500 group-hover:translate-x-0.5 transition-all" />
              </Link>
              <Link
                href="/tools/freelance-rate-calculator"
                className="p-3 rounded-xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 hover:border-teal-500 transition-all flex items-center justify-between text-xs font-semibold text-zinc-800 dark:text-zinc-200 group"
              >
                <span>Freelance Rate Calculator</span>
                <ArrowRight className="w-3.5 h-3.5 text-zinc-400 group-hover:text-teal-500 group-hover:translate-x-0.5 transition-all" />
              </Link>
              <Link
                href="/tools/currency-converter"
                className="p-3 rounded-xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 hover:border-teal-500 transition-all flex items-center justify-between text-xs font-semibold text-zinc-800 dark:text-zinc-200 group"
              >
                <span>Global Currency Converter</span>
                <ArrowRight className="w-3.5 h-3.5 text-zinc-400 group-hover:text-teal-500 group-hover:translate-x-0.5 transition-all" />
              </Link>
            </div>
          </section>
        </article>

        <RelatedTools currentSlug="etsy-fee-calculator" />

        {/* Ad Placement Footer */}
        <div className="ad-slot ad-slot--footer mt-12" data-ad-position="footer">
          <div className="ad-placeholder-label border border-dashed border-zinc-300 dark:border-zinc-800 rounded-xl py-4 flex items-center justify-center bg-zinc-50/50 dark:bg-zinc-950/20 text-[10px] font-bold text-zinc-400 dark:text-zinc-600 uppercase tracking-widest cursor-default">
            Advertisement
          </div>
        </div>
      </main>

      {/* Footer */}
      <Footer customText="Precise 2026 Etsy seller fee and net profit margin modeling." />
    </div>
  );
}
