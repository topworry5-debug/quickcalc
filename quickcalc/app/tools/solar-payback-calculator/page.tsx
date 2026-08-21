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
import SolarPaybackCalculatorWidget from "./SolarPaybackCalculatorWidget";
import { CheckCircle2, Sun, Zap, Sparkles, HelpCircle, ArrowRight, DollarSign } from "lucide-react";

export const metadata: Metadata = {
  title: "Solar Panel ROI & Payback Period Calculator (2026 Edition)",
  description: "Calculate your exact solar panel payback period, 25-year cumulative net savings, Levelized Cost of Energy (LCOE), and carbon offset with 2026 tax credits and utility inflation rates.",
  alternates: {
    canonical: "/tools/solar-payback-calculator",
  },
  openGraph: {
    title: "Solar Panel ROI & Payback Period Calculator (2026 Edition) - QuickCalc",
    description: "Free 2026 Solar ROI and payback calculator. Compute exact breakeven years, 25-year cash flows, 30% tax credits (ITC), net metering tariffs, and CO2 offset.",
    url: "https://quickcalc.cloud/tools/solar-payback-calculator",
    type: "website",
    siteName: "QuickCalc",
    images: [
      {
        url: "https://quickcalc.cloud/og-image.png",
        width: 1200,
        height: 630,
        alt: "Solar Panel ROI and Payback Calculator on QuickCalc",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Solar Panel ROI & Payback Period Calculator (2026 Edition)",
    description: "Calculate solar panel payback years, 25-year energy savings, and battery storage ROI with 2026 tax credits.",
  },
};

export default function SolarPaybackCalculatorPage({
  searchParams,
}: {
  searchParams?: { embed?: string };
}) {
  const softwareSchema = generateSoftwareAppSchema({
    name: "Solar Panel ROI & Payback Period Calculator (2026 Edition)",
    description: "Free online utility tool to calculate solar panel payback periods in years, 25-year cumulative cash flows, net metering ROI, and carbon offsets.",
    slug: "solar-payback-calculator",
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
          <SolarPaybackCalculatorWidget />
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
        "name": "What is a good payback period for solar panels?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "A good residential solar payback period typically ranges between 5 and 8 years in regions with moderate-to-high electricity rates (above $0.16/kWh) and solar incentives like the 30% federal tax credit (ITC). Since modern tier-1 monocrystalline solar panels carry a 25-year linear performance warranty, achieving payback within 6 to 7 years gives homeowners 18+ years of completely free electricity generation."
        }
      },
      {
        "@type": "Question",
        "name": "How does net metering affect my solar ROI?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Net metering dictates the financial credit you receive when your solar array generates more energy than your home consumes and exports it back to the utility grid. Full 1:1 retail net metering offers the fastest payback period. Under Net Billing (such as California's NEM 3.0 or time-of-use tariffs), exported power is credited at wholesale avoided-cost rates, making battery storage or maximizing self-consumption crucial for high ROI."
        }
      },
      {
        "@type": "Question",
        "name": "Do solar batteries increase or decrease ROI?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Adding a battery storage system (such as 10 kWh or 13.5 kWh) increases your initial upfront investment by $7,000 to $12,000, which typically extends your payback period by 2 to 4 years under full 1:1 net metering. However, under time-of-use (TOU) tariffs or NEM 3.0 avoided-cost structures, batteries dramatically increase financial returns by storing cheap afternoon solar to offset peak evening rates ($0.40–$0.60/kWh)."
        }
      },
      {
        "@type": "Question",
        "name": "How much energy does a 10 kW solar system produce daily?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "A 10 kW solar array produces approximately 38 to 52 kWh of clean electricity per day, depending on your geographic location, solar irradiance, and seasonal sun hours. Over an entire year, taking an average of 4.8 peak sun hours and an 85% standard performance ratio into account, a 10 kW system generates approximately 14,892 kWh annually."
        }
      }
    ]
  };

  const articleData = {
    "@context": "https://schema.org",
    "@type": "Article",
    "headline": "Solar Panel ROI & Payback Period Calculator (2026 Guide & Formulas)",
    "description": "Comprehensive guide on calculating solar system payback periods, Levelized Cost of Energy (LCOE), 25-year cumulative cash flows, and battery storage economics.",
    "url": "https://quickcalc.cloud/tools/solar-payback-calculator",
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
        <Breadcrumbs toolName="Solar Payback Calculator" toolSlug="solar-payback-calculator" />
        
        <div className="text-center max-w-3xl mx-auto mb-8">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-amber-500/10 text-amber-700 dark:text-amber-300 border border-amber-500/20 mb-3">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Updated for 2026 ITC Tax Credits & Net Metering Rules</span>
          </div>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight text-zinc-900 dark:text-white mb-4">
            Free Solar Panel ROI & Payback Period Calculator (2026 Edition)
          </h1>

          {/* AI-extractable direct answer summary */}
          <p className="text-sm sm:text-base font-semibold text-amber-800 dark:text-amber-200 bg-amber-500/10 border border-amber-500/30 rounded-xl px-4 py-3 leading-relaxed mb-4 text-left">
            This free solar calculator models your net out-of-pocket investment (after federal tax credits and subsidies), annual power generation (kWh), electricity rate inflation, and panel degradation to compute your exact breakeven payback period and 25-year cumulative net profit.
          </p>

          {/* Stand-alone direct answer paragraph */}
          <p className="text-sm sm:text-base text-zinc-600 dark:text-zinc-400 leading-relaxed font-medium">
            To calculate solar panel payback period, divide your net system investment (gross turnkey cost minus federal tax credits and state rebates) by your annual electricity bill savings. The average residential solar payback period in 2026 is between 5.5 and 8.0 years, delivering over 200%–350% return on investment over a 25-year warranted lifecycle.
          </p>
        </div>

        <ShareButtons
          url="https://quickcalc.cloud/tools/solar-payback-calculator"
          title="Solar Panel ROI & Payback Period Calculator (2026)"
        />
        <EmbedWidget
          url="https://quickcalc.cloud/tools/solar-payback-calculator"
          title="Solar Panel ROI & Payback Period Calculator"
        />

        {/* The interactive widget */}
        <section className="my-8">
          <SolarPaybackCalculatorWidget />
        </section>

        {/* Scientific & Mathematical Methodology Accordion */}
        <MethodologyAccordion slug="solar-payback-calculator" />

        {/* Ad Placement 1 */}
        <div className="ad-slot ad-slot--inline my-8" data-ad-position="in-content-1">
          <div className="ad-placeholder-label border border-dashed border-zinc-300 dark:border-zinc-800 rounded-xl py-4 flex items-center justify-center bg-zinc-50/50 dark:bg-zinc-950/20 text-[10px] font-bold text-zinc-400 dark:text-zinc-600 uppercase tracking-widest cursor-default">
            Advertisement
          </div>
        </div>

        {/* Comprehensive SEO & AEO Content (500+ Words) */}
        <article className="prose prose-zinc dark:prose-invert max-w-4xl mx-auto space-y-8 mt-12 border-t border-zinc-200 dark:border-zinc-800 pt-10">
          
          {/* Section 1: How Solar Payback Period is Calculated */}
          <section className="space-y-4">
            <h2 className="text-2xl font-black text-zinc-950 dark:text-white flex items-center gap-2">
              <Sun className="w-6 h-6 text-amber-500" />
              <span>How Solar Payback Period is Calculated</span>
            </h2>
            <p className="text-zinc-600 dark:text-zinc-400 leading-relaxed">
              Calculating the true financial return on a residential or commercial photovoltaic (PV) solar installation requires more than dividing upfront cost by the first year’s utility savings. In 2026, precise modeling demands dynamic compounding across four foundational variables:
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 not-prose my-6">
              <div className="p-4 rounded-xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 shadow-sm space-y-2">
                <h3 className="text-sm font-bold text-zinc-900 dark:text-white flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                  <span>1. Net Out-of-Pocket Investment</span>
                </h3>
                <p className="text-xs text-zinc-600 dark:text-zinc-400 leading-relaxed">
                  Gross equipment, permitting, and labor costs reduced by the 30% Federal Clean Energy Investment Tax Credit (ITC under Section 25D) plus any local utility rebates.
                </p>
              </div>

              <div className="p-4 rounded-xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 shadow-sm space-y-2">
                <h3 className="text-sm font-bold text-zinc-900 dark:text-white flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                  <span>2. Solar Irradiance & Derating (PR)</span>
                </h3>
                <p className="text-xs text-zinc-600 dark:text-zinc-400 leading-relaxed">
                  System capacity (kW) multiplied by daily peak sun hours and an industry-standard 0.85 Performance Ratio (accounting for inverter conversion losses, thermal coefficients, and wiring resistance).
                </p>
              </div>

              <div className="p-4 rounded-xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 shadow-sm space-y-2">
                <h3 className="text-sm font-bold text-zinc-900 dark:text-white flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                  <span>3. Utility Electricity Rate Inflation</span>
                </h3>
                <p className="text-xs text-zinc-600 dark:text-zinc-400 leading-relaxed">
                  Grid tariffs escalate at an average of 4%–6% annually. Every year grid power becomes more expensive, the dollar value of your generated kilowatt-hours increases compoundingly.
                </p>
              </div>

              <div className="p-4 rounded-xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 shadow-sm space-y-2">
                <h3 className="text-sm font-bold text-zinc-900 dark:text-white flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                  <span>4. Annual Panel Degradation (0.5%/yr)</span>
                </h3>
                <p className="text-xs text-zinc-600 dark:text-zinc-400 leading-relaxed">
                  Modern monocrystalline PV modules lose approximately 0.5% output efficiency per year, guaranteeing 85%+ generation capacity at the end of year 25.
                </p>
              </div>
            </div>
          </section>

          {/* Section 2: Key Factors Impacting Your Solar ROI in 2026 */}
          <section className="space-y-4 border-t border-zinc-200 dark:border-zinc-800 pt-8">
            <h2 className="text-2xl font-black text-zinc-950 dark:text-white flex items-center gap-2">
              <Zap className="w-6 h-6 text-amber-500" />
              <span>Key Factors Impacting Your Solar ROI in 2026</span>
            </h2>
            <p className="text-zinc-600 dark:text-zinc-400 leading-relaxed">
              The economic landscape for residential solar is shifting rapidly in 2026. Here are the critical levers determining your installation’s profitability:
            </p>

            <ul className="space-y-3 text-zinc-700 dark:text-zinc-300 list-disc pl-5 text-sm sm:text-base leading-relaxed">
              <li>
                <strong>Net Metering Structure (NEM 1.0/2.0 vs NEM 3.0):</strong> Under traditional 1:1 net metering, every kilowatt-hour pushed back to the grid rolls back your meter at full retail value. Under modern net billing (e.g., California NEM 3.0), export compensation drops to wholesale rates (~$0.05–$0.08/kWh), incentivizing on-site battery storage.
              </li>
              <li>
                <strong>Battery Storage Economics:</strong> Adding a 10 kWh lithium iron phosphate (LiFePO4) battery adds $7,000–$10,000 upfront. While it lengthens simple payback by ~2 years under 1:1 net metering, it maximizes savings in regions with aggressive Time-of-Use (TOU) pricing where evening electricity rates surge.
              </li>
              <li>
                <strong>Levelized Cost of Energy (LCOE):</strong> LCOE measures the true cost per kilowatt-hour of generating your own power over 25 years. Most residential solar installations achieve an LCOE of $0.05–$0.08 per kWh, dramatically undercutting grid utility power ($0.16–$0.35/kWh).
              </li>
              <li>
                <strong>Property Value Appreciation:</strong> Research by the National Renewable Energy Laboratory (NREL) demonstrates that homes with owned solar installations increase in value by approximately $20 for every $1 in annual utility bill savings, and are exempt from property tax reassessment in many states.
              </li>
            </ul>
          </section>

          {/* Section 3: Step-by-Step Practical Example */}
          <section className="space-y-4 border-t border-zinc-200 dark:border-zinc-800 pt-8">
            <h2 className="text-2xl font-black text-zinc-950 dark:text-white flex items-center gap-2">
              <DollarSign className="w-6 h-6 text-emerald-600 dark:text-emerald-400" />
              <span>Step-by-Step Practical Example (6.5 kW System)</span>
            </h2>
            <p className="text-zinc-600 dark:text-zinc-400 leading-relaxed">
              Consider a typical suburban home installing a <strong>6.5 kW rooftop solar array</strong> with a $180/month electric bill ($0.18/kWh tariff rate):
            </p>

            <div className="bg-zinc-100 dark:bg-zinc-900 p-5 rounded-2xl border border-zinc-200 dark:border-zinc-800 font-mono text-xs sm:text-sm space-y-3 overflow-x-auto text-zinc-800 dark:text-zinc-200 not-prose">
              <div>
                <span className="text-amber-600 dark:text-amber-400 font-bold">1. Investment Cost:</span>
                <span className="block mt-0.5">Gross Turnkey System Price: $18,000</span>
                <span className="block mt-0.5">Federal Tax Credit (30% ITC): -$5,400</span>
                <span className="block mt-0.5 font-bold text-emerald-600 dark:text-emerald-400">Net Out-of-Pocket Cost = $12,600</span>
              </div>
              <div>
                <span className="text-sky-600 dark:text-sky-400 font-bold">2. Annual Clean Generation:</span>
                <span className="block mt-0.5">6.5 kW × 4.8 Peak Sun Hours × 365 Days × 0.85 PR = 9,679 kWh/year</span>
              </div>
              <div>
                <span className="text-teal-600 dark:text-teal-400 font-bold">3. First-Year Savings:</span>
                <span className="block mt-0.5">9,679 kWh × $0.18/kWh = $1,742/year ($145/month reduction)</span>
              </div>
              <div>
                <span className="text-emerald-600 dark:text-emerald-400 font-bold">4. Payback & 25-Year Lifetime Returns:</span>
                <span className="block mt-0.5 font-bold">Exact Payback Period: ~6.2 Years</span>
                <span className="block mt-0.5">25-Year Cumulative Gross Energy Savings (at 5% inflation): $78,400</span>
                <span className="block mt-0.5 font-bold text-emerald-600 dark:text-emerald-400">25-Year Net Pocket Profit = $65,800 (522% ROI)</span>
                <span className="block mt-0.5">Levelized Cost of Solar (LCOE) = $0.055 / kWh</span>
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
                  What is a good payback period for solar panels?
                </h3>
                <p className="text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed">
                  A good payback period is generally between 5 and 8 years. Because solar panels last 25–30+ years, achieving full capital breakeven within 7 years means you enjoy 18+ years of completely free electricity, generating tens of thousands of dollars in pure net savings.
                </p>
              </div>

              <div className="p-4 rounded-xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 shadow-sm space-y-2">
                <h3 className="text-base font-bold text-zinc-900 dark:text-white">
                  How does net metering affect my solar ROI?
                </h3>
                <p className="text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed">
                  1:1 retail net metering offers the fastest payback by giving you full value for excess power exported to the grid. In areas with avoided-cost net billing (such as California NEM 3.0), exported power is credited at lower rates, making battery storage advantageous to self-consume your power during high evening rates.
                </p>
              </div>

              <div className="p-4 rounded-xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 shadow-sm space-y-2">
                <h3 className="text-base font-bold text-zinc-900 dark:text-white">
                  Do solar batteries increase or decrease ROI?
                </h3>
                <p className="text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed">
                  Solar batteries add upfront capital costs ($7,000–$12,000), typically extending simple payback by 2–3 years under 1:1 net metering. However, batteries provide emergency backup power during outages and substantially boost financial ROI under dynamic Time-of-Use tariffs.
                </p>
              </div>

              <div className="p-4 rounded-xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 shadow-sm space-y-2">
                <h3 className="text-base font-bold text-zinc-900 dark:text-white">
                  How much energy does a 10 kW solar system produce daily?
                </h3>
                <p className="text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed">
                  A 10 kW solar array produces approximately 38 to 52 kWh per day under average sunny conditions (4.5 to 6.0 peak sun hours), generating roughly 14,000 to 18,000 kWh per year.
                </p>
              </div>
            </div>
          </section>

          {/* Read Full In-Depth Guide Banner */}
          <section className="my-6 not-prose">
            <div className="p-5 rounded-2xl bg-amber-500/10 border border-amber-500/30 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div className="space-y-1">
                <span className="text-xs font-bold text-amber-700 dark:text-amber-300 uppercase tracking-wider">Comprehensive Solar Guide</span>
                <h3 className="text-base font-bold text-zinc-900 dark:text-white">Solar Panel ROI & Payback Period Breakdown (2026 Guide)</h3>
                <p className="text-xs text-zinc-600 dark:text-zinc-400">Discover how net metering, panel degradation, 30% federal tax credits, and battery storage shape your break-even timeline.</p>
              </div>
              <Link
                href="/blog/solar-panel-payback-period-and-roi-guide"
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
              Related Energy & Financial Planning Tools
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <Link
                href="/tools/inflation-calculator"
                className="p-3 rounded-xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 hover:border-amber-500 transition-all flex items-center justify-between text-xs font-semibold text-zinc-800 dark:text-zinc-200 group"
              >
                <span>Inflation & Purchasing Power</span>
                <ArrowRight className="w-3.5 h-3.5 text-zinc-400 group-hover:text-amber-500 group-hover:translate-x-0.5 transition-all" />
              </Link>
              <Link
                href="/tools/savings-growth-calculator"
                className="p-3 rounded-xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 hover:border-amber-500 transition-all flex items-center justify-between text-xs font-semibold text-zinc-800 dark:text-zinc-200 group"
              >
                <span>Savings Growth & Compound Interest</span>
                <ArrowRight className="w-3.5 h-3.5 text-zinc-400 group-hover:text-amber-500 group-hover:translate-x-0.5 transition-all" />
              </Link>
              <Link
                href="/tools/loan-calculator"
                className="p-3 rounded-xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 hover:border-amber-500 transition-all flex items-center justify-between text-xs font-semibold text-zinc-800 dark:text-zinc-200 group"
              >
                <span>Solar Loan & EMI Calculator</span>
                <ArrowRight className="w-3.5 h-3.5 text-zinc-400 group-hover:text-amber-500 group-hover:translate-x-0.5 transition-all" />
              </Link>
            </div>
          </section>
        </article>

        <RelatedTools currentSlug="solar-payback-calculator" />

        {/* Ad Placement Footer */}
        <div className="ad-slot ad-slot--footer mt-12" data-ad-position="footer">
          <div className="ad-placeholder-label border border-dashed border-zinc-300 dark:border-zinc-800 rounded-xl py-4 flex items-center justify-center bg-zinc-50/50 dark:bg-zinc-950/20 text-[10px] font-bold text-zinc-400 dark:text-zinc-600 uppercase tracking-widest cursor-default">
            Advertisement
          </div>
        </div>
      </main>

      {/* Footer */}
      <Footer customText="Precise 2026 solar panel ROI, payback period, and LCOE cash flow modeling." />
    </div>
  );
}
