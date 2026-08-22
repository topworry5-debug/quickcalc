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
import PakistanGoldWidget from "./PakistanGoldWidget";
import { Sparkles, HelpCircle, ArrowRight, Coins, Scale, Layers } from "lucide-react";

export const metadata: Metadata = {
  title: "Pakistani Gold Calculator (Tola, Masha, Ratti & Making Charges)",
  description: "Calculate exact Pakistani gold jewelry prices from 24K bullion benchmark to 22K, 21K, and 18K rates with Tola, Masha, Ratti to Gram conversions and making charges (Jorai).",
  alternates: {
    canonical: "/tools/pakistan-gold-calculator",
  },
  openGraph: {
    title: "Pakistani Gold Tola, Masha, Ratti & Making Charges Calculator (2026)",
    description: "Free Sarafa market gold calculator for Pakistan. Convert 1 Tola = 11.6638g, 12 Masha, 96 Ratti, calculate 22K/24K rates, and estimate making charges & wastage.",
    url: "https://quickcalc.cloud/tools/pakistan-gold-calculator",
    type: "website",
    siteName: "QuickCalc",
    images: [
      {
        url: "https://quickcalc.cloud/og-image.png",
        width: 1200,
        height: 630,
        alt: "Pakistan Gold Calculator on QuickCalc",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Pakistani Gold Calculator (Tola, Masha, Ratti & Making Charges)",
    description: "Convert Tola, Masha, Ratti into grams, calculate 22K jewelry rates from 24K bullion, and estimate making charges & wastage.",
  },
};

export default function PakistanGoldPage({
  searchParams,
}: {
  searchParams?: { embed?: string };
}) {
  const softwareSchema = generateSoftwareAppSchema({
    name: "Pakistani Gold Tola, Masha, Ratti & Making Charges Calculator",
    description: "Free online jewelry and bullion calculation tool for Pakistani Sarafa markets to convert traditional weights into grams, calculate 22K/21K/18K rates, and compute making charges.",
    slug: "pakistan-gold-calculator",
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
          <PakistanGoldWidget />
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
        "name": "How many grams are in 1 Tola gold in Pakistan?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "In Pakistan and across all All-Pakistan Sarafa Gems and Jewellers Association markets, 1 Tola equals exactly 11.6638 grams (or 180 troy grains). In addition, 1 Tola comprises 12 Masha or 96 Ratti."
        }
      },
      {
        "@type": "Question",
        "name": "How do you calculate 22K gold rate from 24K rate?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "To calculate the 22K jewelry rate from the 24K bullion benchmark, multiply the 24K rate by (22 / 24) or 0.9167. For instance, if 24K gold is PKR 285,000 per Tola, the 22K rate is PKR 285,000 × (22 / 24) = PKR 261,250 per Tola."
        }
      },
      {
        "@type": "Question",
        "name": "How many Masha and Ratti make one Tola?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "One Tola contains 12 Masha. Each Masha contains 8 Ratti. Therefore, 1 Tola equals 12 Masha or 96 Ratti (12 × 8 = 96)."
        }
      },
      {
        "@type": "Question",
        "name": "What is a fair making charge (Jorai) per Tola in Pakistan?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Making charges (Jorai) typically range from PKR 3,000 to PKR 6,000 per Tola for simple rings and bangles, PKR 6,000 to PKR 10,000 per Tola for intricate hand-crafted bridal necklaces, or 3% to 7% of total gold value."
        }
      }
    ]
  };

  const articleData = {
    "@context": "https://schema.org",
    "@type": "Article",
    "headline": "Pakistani Gold Tola, Masha, Ratti & Making Charges Calculator (2026 Guide)",
    "description": "Comprehensive guide to Pakistani Sarafa gold units, 22K vs 24K math, making charges, and wastage formulas.",
    "url": "https://quickcalc.cloud/tools/pakistan-gold-calculator",
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
    "datePublished": "2026-08-22"
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
        <Breadcrumbs toolName="Pakistani Gold Calculator" toolSlug="pakistan-gold-calculator" />
        
        <div className="text-center max-w-3xl mx-auto mb-8">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-amber-500/10 text-amber-800 dark:text-amber-300 border border-amber-500/20 mb-3">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Updated with Sarafa Market Standards (1 Tola = 11.6638g)</span>
          </div>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight text-zinc-900 dark:text-white mb-4">
            Free Pakistani Gold Tola, Masha, Ratti & Making Charges Calculator (2026)
          </h1>

          {/* AI-extractable direct answer summary */}
          <p className="text-sm sm:text-base font-semibold text-amber-900 dark:text-amber-200 bg-amber-500/10 border border-amber-500/30 rounded-xl px-4 py-3 leading-relaxed mb-4 text-left">
            This free Pakistani gold utility converts traditional weights (1 Tola = 12 Masha = 96 Ratti = 11.6638 Grams), translates 24K bullion market rates into 22K (91.67%), 21K (87.5%), and 18K (75%) jewelry prices, and calculates exact net payable costs including making charges (Jorai) and wastage (Kass).
          </p>

          {/* Stand-alone direct answer paragraph */}
          <p className="text-sm sm:text-base text-zinc-600 dark:text-zinc-400 leading-relaxed font-medium">
            To calculate jewelry gold price in Pakistan, first determine the 22K rate per tola: <strong>24K Rate × (22 / 24)</strong>. Convert your total weight into tolas: <strong>Tola + (Masha / 12) + (Ratti / 96)</strong>. Multiply by the karat rate and add making charges (Jorai) and melting wastage (Kass) to reach the exact net receipt total.
          </p>
        </div>

        <ShareButtons
          url="https://quickcalc.cloud/tools/pakistan-gold-calculator"
          title="Pakistani Gold Tola, Masha, Ratti & Making Charges Calculator (2026)"
        />
        <EmbedWidget
          url="https://quickcalc.cloud/tools/pakistan-gold-calculator"
          title="Pakistani Gold Calculator"
        />

        {/* The interactive widget */}
        <section className="my-8">
          <PakistanGoldWidget />
        </section>

        {/* Scientific & Mathematical Methodology Accordion */}
        <MethodologyAccordion slug="pakistan-gold-calculator" />

        {/* Ad Placement 1 */}
        <div className="ad-slot ad-slot--inline my-8" data-ad-position="in-content-1">
          <div className="ad-placeholder-label border border-dashed border-zinc-300 dark:border-zinc-800 rounded-xl py-4 flex items-center justify-center bg-zinc-50/50 dark:bg-zinc-950/20 text-[10px] font-bold text-zinc-400 dark:text-zinc-600 uppercase tracking-widest cursor-default">
            Advertisement
          </div>
        </div>

        {/* Comprehensive SEO & AEO Content (500+ Words) */}
        <article className="prose prose-zinc dark:prose-invert max-w-4xl mx-auto space-y-8 mt-12 border-t border-zinc-200 dark:border-zinc-800 pt-10">
          
          {/* Section 1: Understanding Pakistani Gold Units */}
          <section className="space-y-4">
            <h2 className="text-2xl font-black text-zinc-950 dark:text-white flex items-center gap-2">
              <Scale className="w-6 h-6 text-amber-500" />
              <span>Understanding Pakistani Gold Units: Tola, Masha, Ratti, and Grams</span>
            </h2>
            <p className="text-zinc-600 dark:text-zinc-400 leading-relaxed">
              Traditional South Asian gold metrics are widely used across Pakistani Sarafa Bazaars in Lahore, Karachi, Rawalpindi, Peshawar, and Multan. Understanding the mathematical relationships between these ancient units and modern metric grams prevents common retail overcharges:
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 not-prose my-6">
              <div className="p-4 rounded-xl bg-white dark:bg-zinc-900 border border-amber-200 dark:border-amber-900/40 shadow-sm space-y-2">
                <h3 className="text-sm font-bold text-amber-900 dark:text-amber-300 flex items-center gap-1.5">
                  <Coins className="w-4 h-4 text-amber-500" />
                  <span>1 Tola (تولہ)</span>
                </h3>
                <p className="text-xs text-zinc-600 dark:text-zinc-400 leading-relaxed">
                  <strong>= 11.6638 Grams</strong><br />
                  = 12 Masha<br />
                  = 96 Ratti<br />
                  Standard benchmark unit for quoting daily gold bullion rates.
                </p>
              </div>

              <div className="p-4 rounded-xl bg-white dark:bg-zinc-900 border border-emerald-200 dark:border-emerald-900/40 shadow-sm space-y-2">
                <h3 className="text-sm font-bold text-emerald-900 dark:text-emerald-300 flex items-center gap-1.5">
                  <Layers className="w-4 h-4 text-emerald-500" />
                  <span>1 Masha (ماشہ)</span>
                </h3>
                <p className="text-xs text-zinc-600 dark:text-zinc-400 leading-relaxed">
                  <strong>= 0.972 Grams</strong><br />
                  = 1/12th of a Tola<br />
                  = 8 Ratti<br />
                  Used for weighing medium items like rings, earrings, and pendants.
                </p>
              </div>

              <div className="p-4 rounded-xl bg-white dark:bg-zinc-900 border border-indigo-200 dark:border-indigo-900/40 shadow-sm space-y-2">
                <h3 className="text-sm font-bold text-indigo-900 dark:text-indigo-300 flex items-center gap-1.5">
                  <Scale className="w-4 h-4 text-indigo-500" />
                  <span>1 Ratti (رتی)</span>
                </h3>
                <p className="text-xs text-zinc-600 dark:text-zinc-400 leading-relaxed">
                  <strong>= 0.1215 Grams</strong><br />
                  = 1/8th of a Masha<br />
                  = 1/96th of a Tola<br />
                  Smallest traditional fraction used for stones and fine weight adjustments.
                </p>
              </div>
            </div>
          </section>

          {/* Section 2: How to Calculate 22K vs 24K Gold Price Difference */}
          <section className="space-y-4 border-t border-zinc-200 dark:border-zinc-800 pt-8">
            <h2 className="text-2xl font-black text-zinc-950 dark:text-white flex items-center gap-2">
              <Coins className="w-6 h-6 text-amber-500" />
              <span>How to Calculate 22K vs 24K Gold Price Difference</span>
            </h2>
            <p className="text-zinc-600 dark:text-zinc-400 leading-relaxed">
              Gold purity is measured in parts per 24:
            </p>

            <ul className="space-y-2 text-zinc-700 dark:text-zinc-300 list-disc pl-5 text-sm sm:text-base leading-relaxed">
              <li>
                <strong>24K (99.9% Fine Bullion):</strong> Pure 100% gold, benchmarked daily on the Karachi and Lahore Sarafa markets.
              </li>
              <li>
                <strong>22K (91.67% Hallmark Jewelry):</strong> Formula: <code>24K Rate × (22 / 24)</code>. If 24K is PKR 285,000, 22K is PKR 261,250.
              </li>
              <li>
                <strong>21K (87.50% Arabic Standard):</strong> Formula: <code>24K Rate × (21 / 24)</code>. If 24K is PKR 285,000, 21K is PKR 249,375.
              </li>
              <li>
                <strong>18K (75.00% Diamond Setting):</strong> Formula: <code>24K Rate × (18 / 24)</code>. If 24K is PKR 285,000, 18K is PKR 213,750.
              </li>
            </ul>
          </section>

          {/* Section 3: Making Charges & Wastage */}
          <section className="space-y-4 border-t border-zinc-200 dark:border-zinc-800 pt-8">
            <h2 className="text-2xl font-black text-zinc-950 dark:text-white flex items-center gap-2">
              <Layers className="w-6 h-6 text-violet-500" />
              <span>What are Making Charges (Jorai) and Wastage (Kass) in Jewelry Buying?</span>
            </h2>
            <p className="text-zinc-600 dark:text-zinc-400 leading-relaxed">
              When purchasing gold jewelry, the final receipt includes two additional costs on top of raw gold:
            </p>

            <div className="space-y-3 text-zinc-700 dark:text-zinc-300 text-sm sm:text-base leading-relaxed">
              <div className="p-4 rounded-xl bg-zinc-100 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800">
                <h4 className="font-bold text-zinc-900 dark:text-white mb-1">1. Making Charges (جڑائی - Jorai):</h4>
                <p className="text-xs text-zinc-600 dark:text-zinc-400">
                  The artisan labor fee for casting, designing, filing, and polishing the jewelry piece. Usually billed as a fixed amount per Tola (e.g. Rs. 4,000 to Rs. 8,000 / Tola) or 4% to 8% of the gold value.
                </p>
              </div>

              <div className="p-4 rounded-xl bg-zinc-100 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800">
                <h4 className="font-bold text-zinc-900 dark:text-white mb-1">2. Wastage / Melting Loss (کاس - Kass):</h4>
                <p className="text-xs text-zinc-600 dark:text-zinc-400">
                  Small gold loss incurred during soldering and crafting, traditionally quoted as 1 to 2 Ratti per Tola (1 Ratti = 1/96th or ~1.04% extra weight added to the billable gold total).
                </p>
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
                  How many grams are in 1 Tola gold in Pakistan?
                </h3>
                <p className="text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed">
                  In Pakistan, 1 Tola equals exactly 11.6638 grams. It is subdivided into 12 Masha and 96 Ratti.
                </p>
              </div>

              <div className="p-4 rounded-xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 shadow-sm space-y-2">
                <h3 className="text-base font-bold text-zinc-900 dark:text-white">
                  How do you calculate 22K gold rate from 24K rate?
                </h3>
                <p className="text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed">
                  Multiply the 24K rate by (22 / 24). For example, if 24K is PKR 285,000, 22K is PKR 285,000 × (22 / 24) = PKR 261,250 per Tola.
                </p>
              </div>

              <div className="p-4 rounded-xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 shadow-sm space-y-2">
                <h3 className="text-base font-bold text-zinc-900 dark:text-white">
                  How many Masha and Ratti make one Tola?
                </h3>
                <p className="text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed">
                  1 Tola contains 12 Masha. 1 Masha contains 8 Ratti. Therefore, 1 Tola equals 96 Ratti (12 × 8 = 96).
                </p>
              </div>

              <div className="p-4 rounded-xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 shadow-sm space-y-2">
                <h3 className="text-base font-bold text-zinc-900 dark:text-white">
                  What is a fair making charge (Jorai) per Tola in Pakistan?
                </h3>
                <p className="text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed">
                  Standard jewelry making charges typically range between PKR 3,500 to PKR 8,000 per Tola depending on the intricacy of the craftsmanship.
                </p>
              </div>
            </div>
          </section>

          {/* Read Full In-Depth Guide Banner */}
          <section className="my-6 not-prose">
            <div className="p-5 rounded-2xl bg-amber-500/10 border border-amber-500/30 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div className="space-y-1">
                <span className="text-xs font-bold text-amber-800 dark:text-amber-300 uppercase tracking-wider">Sarafa Master Guide</span>
                <h3 className="text-base font-bold text-zinc-900 dark:text-white">Pakistani Gold Tola, Masha, Ratti & Making Charges Master Guide (2026)</h3>
                <p className="text-xs text-zinc-600 dark:text-zinc-400">Complete walkthrough of 11.6638g standards, 22K conversions, wastage (Kass) detection, and jewelry invoice math.</p>
              </div>
              <Link
                href="/blog/pakistan-gold-tola-masha-ratti-guide-2026"
                className="px-4 py-2 rounded-xl bg-amber-600 hover:bg-amber-700 text-white font-bold text-xs uppercase tracking-wider transition-all whitespace-nowrap shrink-0 shadow-sm flex items-center gap-1.5"
              >
                <span>Read Full Guide</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </section>

          {/* Related Tools Cross-Linking */}
          <section className="space-y-3 border-t border-zinc-200 dark:border-zinc-800 pt-8 not-prose">
            <h3 className="text-sm font-bold uppercase tracking-wider text-zinc-500 dark:text-zinc-400">
              Related Pakistani Financial Calculators
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <Link
                href="/tools/zakat-calculator"
                className="p-3 rounded-xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 hover:border-amber-500 transition-all flex items-center justify-between text-xs font-semibold text-zinc-800 dark:text-zinc-200 group"
              >
                <span>Zakat Calculator (Gold & Silver Nisab)</span>
                <ArrowRight className="w-3.5 h-3.5 text-zinc-400 group-hover:text-amber-500 group-hover:translate-x-0.5 transition-all" />
              </Link>
              <Link
                href="/tools/currency-converter"
                className="p-3 rounded-xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 hover:border-amber-500 transition-all flex items-center justify-between text-xs font-semibold text-zinc-800 dark:text-zinc-200 group"
              >
                <span>Currency Converter (Live Forex Rates)</span>
                <ArrowRight className="w-3.5 h-3.5 text-zinc-400 group-hover:text-amber-500 group-hover:translate-x-0.5 transition-all" />
              </Link>
              <Link
                href="/tools/pakistan-property-tax-calculator"
                className="p-3 rounded-xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 hover:border-amber-500 transition-all flex items-center justify-between text-xs font-semibold text-zinc-800 dark:text-zinc-200 group"
              >
                <span>Pakistan Property Transfer Tax Calculator</span>
                <ArrowRight className="w-3.5 h-3.5 text-zinc-400 group-hover:text-amber-500 group-hover:translate-x-0.5 transition-all" />
              </Link>
            </div>
          </section>
        </article>

        <RelatedTools currentSlug="pakistan-gold-calculator" />

        {/* Ad Placement Footer */}
        <div className="ad-slot ad-slot--footer mt-12" data-ad-position="footer">
          <div className="ad-placeholder-label border border-dashed border-zinc-300 dark:border-zinc-800 rounded-xl py-4 flex items-center justify-center bg-zinc-50/50 dark:bg-zinc-950/20 text-[10px] font-bold text-zinc-400 dark:text-zinc-600 uppercase tracking-widest cursor-default">
            Advertisement
          </div>
        </div>
      </main>

      {/* Footer */}
      <Footer customText="Precise 2026 Pakistani Sarafa gold rates, Tola/Masha/Ratti weight decomposition, and jewelry making charge calculations." />
    </div>
  );
}
