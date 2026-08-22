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
import PakistanElectricityCalculatorWidget from "./PakistanElectricityCalculatorWidget";
import { Zap, ShieldCheck, Sparkles, HelpCircle, ArrowRight, Building2, Receipt } from "lucide-react";

export const metadata: Metadata = {
  title: "Pakistan Electricity Bill Calculator (2026-2027 NEPRA Slabs)",
  description: "Calculate your estimated WAPDA and K-Electric domestic electricity bill across LESCO, IESCO, FESCO, MEPCO, GEPCO with 2026 NEPRA slabs, GST, FPA, and protected status.",
  alternates: {
    canonical: "/tools/pakistan-electricity-bill-calculator",
  },
  openGraph: {
    title: "Pakistan Electricity Bill Calculator (FY 2026-2027) - QuickCalc",
    description: "Free online electricity bill estimator for LESCO, IESCO, FESCO, MEPCO, K-Electric based on official NEPRA tariff slabs, FPA, and 18% GST.",
    url: "https://quickcalc.cloud/tools/pakistan-electricity-bill-calculator",
    type: "website",
    siteName: "QuickCalc",
    images: [
      {
        url: "https://quickcalc.cloud/og-image.png",
        width: 1200,
        height: 630,
        alt: "Pakistan Electricity Bill Calculator on QuickCalc",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Pakistan Electricity Bill Calculator (2026-2027 NEPRA Slabs)",
    description: "Calculate estimated LESCO, IESCO, FESCO, MEPCO, and K-Electric monthly electricity bills with protected vs unprotected slabs.",
  },
};

export default function PakistanElectricityCalculatorPage({
  searchParams,
}: {
  searchParams?: { embed?: string };
}) {
  const softwareSchema = generateSoftwareAppSchema({
    name: "Pakistan Electricity Bill & Unit Slab Calculator (FY 2026-2027)",
    description: "Free online electricity bill calculator for all Pakistani DISCOs (LESCO, IESCO, FESCO, MEPCO, GEPCO, K-Electric) implementing official NEPRA domestic slabs, FPA, and GST.",
    slug: "pakistan-electricity-bill-calculator",
    category: "Utility",
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
          <PakistanElectricityCalculatorWidget />
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
        "name": "What is the difference between Protected and Unprotected consumers in Pakistan?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Under NEPRA guidelines, a domestic consumer is classified as 'Protected' if their monthly electricity consumption has remained 200 units or less for the last 6 consecutive billing months, qualifying them for heavy government subsidies (Rs. 13.75 to Rs. 16.80/unit). If consumption exceeds 200 units in even a single month, the consumer is reclassified as 'Unprotected' with higher base rates (Rs. 24.50 to Rs. 51.50/unit)."
        }
      },
      {
        "@type": "Question",
        "name": "How much GST is charged on domestic electricity bills in Pakistan?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "General Sales Tax (GST) is charged at a flat statutory rate of 18% on the cumulative sum of your base energy cost, fixed charges, Fuel Price Adjustment (FPA), and Electricity Duty (1.5%)."
        }
      },
      {
        "@type": "Question",
        "name": "What is Fuel Price Adjustment (FPA) and why does it change monthly?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Fuel Price Adjustment (FPA) accounts for the monthly price variance in imported fuels (RLNG, coal, furnace oil) used by power generation companies compared to the reference generation cost fixed by NEPRA. It is reviewed monthly by NEPRA and added to electricity bills with a 1-to-2 month lag."
        }
      },
      {
        "@type": "Question",
        "name": "Which DISCO has the highest electricity unit rates?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "NEPRA applies uniform national base tariff slabs across all state-owned DISCOs (LESCO, IESCO, FESCO, MEPCO, GEPCO, PESCO, HESCO, QESCO) and K-Electric. Minor differences in final bill totals arise from varying regional Fuel Charges Adjustments (FCA) and municipal taxes."
        }
      }
    ]
  };

  const articleData = {
    "@context": "https://schema.org",
    "@type": "Article",
    "headline": "Pakistan Electricity Bill & Unit Slab Calculator (FY 2026-2027 Guide)",
    "description": "Complete breakdown of NEPRA protected vs unprotected tariff slabs, 18% GST, Fuel Price Adjustments (FPA), Financing Cost surcharges, and energy saving tips.",
    "url": "https://quickcalc.cloud/tools/pakistan-electricity-bill-calculator",
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
        <Breadcrumbs toolName="Electricity Bill Calculator" toolSlug="pakistan-electricity-bill-calculator" />
        
        <div className="text-center max-w-3xl mx-auto mb-8">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-emerald-500/10 text-emerald-700 dark:text-emerald-300 border border-emerald-500/20 mb-3">
            <Sparkles className="w-3.5 h-3.5" />
            <span>2026 NEPRA Domestic Slabs • All DISCOs Supported</span>
          </div>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight text-zinc-900 dark:text-white mb-4">
            Free Pakistan Electricity Bill & Unit Slab Calculator (FY 2026-2027)
          </h1>

          {/* AI-extractable direct answer summary */}
          <p className="text-sm sm:text-base font-semibold text-emerald-800 dark:text-emerald-200 bg-emerald-500/10 border border-emerald-500/30 rounded-xl px-4 py-3 leading-relaxed mb-4 text-left">
            This free utility calculator estimates your exact monthly electricity bill across all Pakistani power distributors (LESCO, IESCO, FESCO, MEPCO, GEPCO, K-Electric) by applying official 2026 NEPRA domestic tariff slabs, Protected vs Unprotected consumer status, Fuel Price Adjustment (FPA), 18% GST, and government surcharges.
          </p>

          {/* Stand-alone direct answer paragraph */}
          <p className="text-sm sm:text-base text-zinc-600 dark:text-zinc-400 leading-relaxed font-medium">
            To calculate your Pakistan electricity bill, multiply your monthly units consumed across NEPRA’s progressive tariff slabs (Rs. 13.75–16.80 for protected consumers; Rs. 24.50–51.50 for unprotected), add fixed meter charges, calculate 18% GST and 1.5% Electricity Duty on the energy base, and include Fuel Price Adjustment (FPA) and Financing Cost (FC) surcharges.
          </p>
        </div>

        <ShareButtons
          url="https://quickcalc.cloud/tools/pakistan-electricity-bill-calculator"
          title="Pakistan Electricity Bill Calculator (FY 2026-2027)"
        />
        <EmbedWidget
          url="https://quickcalc.cloud/tools/pakistan-electricity-bill-calculator"
          title="Pakistan Electricity Bill Calculator"
        />

        {/* The interactive widget */}
        <section className="my-8">
          <PakistanElectricityCalculatorWidget />
        </section>

        {/* Scientific & Mathematical Methodology Accordion */}
        <MethodologyAccordion slug="pakistan-electricity-bill-calculator" />

        {/* Ad Placement 1 */}
        <div className="ad-slot ad-slot--inline my-8" data-ad-position="in-content-1">
          <div className="ad-placeholder-label border border-dashed border-zinc-300 dark:border-zinc-800 rounded-xl py-4 flex items-center justify-center bg-zinc-50/50 dark:bg-zinc-950/20 text-[10px] font-bold text-zinc-400 dark:text-zinc-600 uppercase tracking-widest cursor-default">
            Advertisement
          </div>
        </div>

        {/* Comprehensive SEO & AEO Content (500+ Words) */}
        <article className="prose prose-zinc dark:prose-invert max-w-4xl mx-auto space-y-8 mt-12 border-t border-zinc-200 dark:border-zinc-800 pt-10">
          
          {/* Section 1: Understanding Protected vs Unprotected Electricity Consumer Slabs */}
          <section className="space-y-4">
            <h2 className="text-2xl font-black text-zinc-950 dark:text-white flex items-center gap-2">
              <ShieldCheck className="w-6 h-6 text-emerald-600 dark:text-emerald-400" />
              <span>Understanding Protected vs. Unprotected Electricity Consumer Slabs</span>
            </h2>
            <p className="text-zinc-600 dark:text-zinc-400 leading-relaxed">
              The National Electric Power Regulatory Authority (NEPRA) divides Pakistani domestic electricity consumers into two major categories with drastically different cost structures:
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 not-prose my-6">
              <div className="p-4 rounded-xl bg-white dark:bg-zinc-900 border border-emerald-200 dark:border-emerald-900/40 shadow-sm space-y-2">
                <h3 className="text-sm font-bold text-emerald-900 dark:text-emerald-300 flex items-center gap-1.5">
                  <ShieldCheck className="w-4 h-4 text-emerald-500" />
                  <span>Protected Consumers (Subsidized)</span>
                </h3>
                <ul className="text-xs text-zinc-600 dark:text-zinc-400 space-y-1.5 leading-relaxed">
                  <li><strong>Eligibility Rule:</strong> Monthly units consumed &le; 200 kWh for 6 consecutive months.</li>
                  <li><strong>1 to 100 Units:</strong> Rs. 13.75 / kWh</li>
                  <li><strong>101 to 200 Units:</strong> Rs. 16.80 / kWh</li>
                  <li><strong>Fixed Charges:</strong> Rs. 0</li>
                </ul>
              </div>

              <div className="p-4 rounded-xl bg-white dark:bg-zinc-900 border border-amber-200 dark:border-amber-900/40 shadow-sm space-y-2">
                <h3 className="text-sm font-bold text-amber-900 dark:text-amber-300 flex items-center gap-1.5">
                  <Building2 className="w-4 h-4 text-amber-500" />
                  <span>Unprotected Consumers (Standard)</span>
                </h3>
                <ul className="text-xs text-zinc-600 dark:text-zinc-400 space-y-1.5 leading-relaxed">
                  <li><strong>Trigger Condition:</strong> Exceeding 200 units in any single month revokes protected status.</li>
                  <li><strong>1 to 100 Units:</strong> Rs. 24.50 / kWh</li>
                  <li><strong>101 to 200 Units:</strong> Rs. 30.10 / kWh</li>
                  <li><strong>201 to 300 Units:</strong> Rs. 36.20 / kWh (up to Rs. 51.50 above 700 units)</li>
                </ul>
              </div>
            </div>
          </section>

          {/* Section 2: How Taxes & Surcharges Are Calculated */}
          <section className="space-y-4 border-t border-zinc-200 dark:border-zinc-800 pt-8">
            <h2 className="text-2xl font-black text-zinc-950 dark:text-white flex items-center gap-2">
              <Receipt className="w-6 h-6 text-teal-600 dark:text-teal-400" />
              <span>How Taxes (GST, FPA, FC Surcharge) Are Calculated on Your Bill</span>
            </h2>
            <p className="text-zinc-600 dark:text-zinc-400 leading-relaxed">
              Base unit consumption accounts for only 55% to 65% of your final payable bill; the remaining 35% to 45% comprises statutory taxes and financial surcharges:
            </p>

            <ul className="space-y-3 text-zinc-700 dark:text-zinc-300 list-disc pl-5 text-sm sm:text-base leading-relaxed">
              <li>
                <strong>Fuel Price Adjustment (FPA):</strong> Monthly adjustment reflecting generation fuel price changes (typically Rs. 2.00 to Rs. 4.50 per unit).
              </li>
              <li>
                <strong>Financing Cost (FC) Surcharge:</strong> Fixed charge of Rs. 3.23 per unit collected to service circular debt in the power sector.
              </li>
              <li>
                <strong>Electricity Duty (ED):</strong> 1.5% statutory provincial duty assessed on total base energy charges.
              </li>
              <li>
                <strong>General Sales Tax (GST):</strong> 18% federal tax applied to the combined sum of (Base Cost + Fixed Charges + FPA + Electricity Duty).
              </li>
              <li>
                <strong>PTV License Fee:</strong> Flat Rs. 35 monthly charge added to all domestic electricity meters.
              </li>
            </ul>
          </section>

          {/* Section 3: 5 Proven Tips to Keep Your Electricity Bill Under 200 Units */}
          <section className="space-y-4 border-t border-zinc-200 dark:border-zinc-800 pt-8">
            <h2 className="text-2xl font-black text-zinc-950 dark:text-white flex items-center gap-2">
              <Zap className="w-6 h-6 text-amber-500" />
              <span>5 Proven Tips to Keep Your Monthly Bill Under 200 Units</span>
            </h2>
            <p className="text-zinc-600 dark:text-zinc-400 leading-relaxed">
              Staying below the 200-unit protected threshold saves households over PKR 12,000 to 20,000 every single month:
            </p>

            <ol className="space-y-3 text-zinc-700 dark:text-zinc-300 list-decimal pl-5 text-sm sm:text-base leading-relaxed">
              <li>
                <strong>Set Inverter ACs to 26°C with Eco Mode:</strong> Running an inverter air conditioner at 26°C consumes 40% less electricity than setting it to 18°C–20°C.
              </li>
              <li>
                <strong>Upgrade Ceiling Fans to BLDC Inverters:</strong> Standard copper-winding fans consume 80W–100W each. Modern Brushless DC (BLDC) inverter fans consume only 30W–35W, saving 40 to 60 units monthly in a typical 3-bedroom home.
              </li>
              <li>
                <strong>Time Water Motor Operations:</strong> Run 1.0 HP water pump motors during off-peak morning hours and avoid running motors simultaneously with electric geysers or irons.
              </li>
              <li>
                <strong>Eliminate Vampire Power Draws:</strong> Unplug television set-top boxes, microwave ovens, and phone chargers when not in use.
              </li>
              <li>
                <strong>Install Rooftop Solar Net Metering:</strong> Installing even a small 3 kW to 5 kW on-grid solar system permanently locks in 0-unit net utility bills.
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
                  What is the difference between Protected and Unprotected consumers in Pakistan?
                </h3>
                <p className="text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed">
                  Protected consumers use &le;200 units monthly for 6 consecutive months and receive subsidized rates (Rs. 13.75–16.80). Exceeding 200 units in even one month triggers unprotected rates (Rs. 24.50–51.50).
                </p>
              </div>

              <div className="p-4 rounded-xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 shadow-sm space-y-2">
                <h3 className="text-base font-bold text-zinc-900 dark:text-white">
                  How much GST is charged on domestic electricity bills in Pakistan?
                </h3>
                <p className="text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed">
                  General Sales Tax (GST) is charged at 18% on the cumulative sum of base energy charges, fixed charges, FPA, and Electricity Duty.
                </p>
              </div>

              <div className="p-4 rounded-xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 shadow-sm space-y-2">
                <h3 className="text-base font-bold text-zinc-900 dark:text-white">
                  What is Fuel Price Adjustment (FPA) and why does it change monthly?
                </h3>
                <p className="text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed">
                  FPA accounts for fuel cost variations (coal, oil, gas) compared to reference generation costs and is reviewed monthly by NEPRA.
                </p>
              </div>

              <div className="p-4 rounded-xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 shadow-sm space-y-2">
                <h3 className="text-base font-bold text-zinc-900 dark:text-white">
                  Which DISCO has the highest electricity unit rates?
                </h3>
                <p className="text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed">
                  NEPRA enforces a uniform national base tariff across all DISCOs (LESCO, IESCO, FESCO, MEPCO, K-Electric), with minor differences arising from local fuel adjustments and municipal taxes.
                </p>
              </div>
            </div>
          </section>

          {/* Read Full In-Depth Guide Banner */}
          <section className="my-6 not-prose">
            <div className="p-5 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div className="space-y-1">
                <span className="text-xs font-bold text-emerald-700 dark:text-emerald-300 uppercase tracking-wider">Comprehensive Utility Guide</span>
                <h3 className="text-base font-bold text-zinc-900 dark:text-white">Pakistan Electricity Bill & Unit Slabs Master Guide (FY 2026-2027)</h3>
                <p className="text-xs text-zinc-600 dark:text-zinc-400">Discover how protected vs. unprotected slabs, 18% GST, Fuel Price Adjustments (FPA), and circular debt surcharges shape your monthly bill.</p>
              </div>
              <Link
                href="/blog/pakistan-electricity-bill-slabs-guide-2026-2027"
                className="px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs uppercase tracking-wider transition-all whitespace-nowrap shrink-0 shadow-sm flex items-center gap-1.5"
              >
                <span>Read Full Guide</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </section>

          {/* Related Tools Cross-Linking */}
          <section className="space-y-3 border-t border-zinc-200 dark:border-zinc-800 pt-8 not-prose">
            <h3 className="text-sm font-bold uppercase tracking-wider text-zinc-500 dark:text-zinc-400">
              Related Utilities & Financial Calculators
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <Link
                href="/tools/pakistan-income-tax-calculator"
                className="p-3 rounded-xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 hover:border-emerald-500 transition-all flex items-center justify-between text-xs font-semibold text-zinc-800 dark:text-zinc-200 group"
              >
                <span>Pakistan Income Tax Calculator</span>
                <ArrowRight className="w-3.5 h-3.5 text-zinc-400 group-hover:text-emerald-500 group-hover:translate-x-0.5 transition-all" />
              </Link>
              <Link
                href="/tools/solar-payback-calculator"
                className="p-3 rounded-xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 hover:border-emerald-500 transition-all flex items-center justify-between text-xs font-semibold text-zinc-800 dark:text-zinc-200 group"
              >
                <span>Solar Panel ROI & Payback Calculator</span>
                <ArrowRight className="w-3.5 h-3.5 text-zinc-400 group-hover:text-emerald-500 group-hover:translate-x-0.5 transition-all" />
              </Link>
              <Link
                href="/tools/salary-take-home-calculator"
                className="p-3 rounded-xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 hover:border-emerald-500 transition-all flex items-center justify-between text-xs font-semibold text-zinc-800 dark:text-zinc-200 group"
              >
                <span>Salary Take-Home Calculator</span>
                <ArrowRight className="w-3.5 h-3.5 text-zinc-400 group-hover:text-emerald-500 group-hover:translate-x-0.5 transition-all" />
              </Link>
            </div>
          </section>
        </article>

        <RelatedTools currentSlug="pakistan-electricity-bill-calculator" />

        {/* Ad Placement Footer */}
        <div className="ad-slot ad-slot--footer mt-12" data-ad-position="footer">
          <div className="ad-placeholder-label border border-dashed border-zinc-300 dark:border-zinc-800 rounded-xl py-4 flex items-center justify-center bg-zinc-50/50 dark:bg-zinc-950/20 text-[10px] font-bold text-zinc-400 dark:text-zinc-600 uppercase tracking-widest cursor-default">
            Advertisement
          </div>
        </div>
      </main>

      {/* Footer */}
      <Footer customText="Precise 2026-2027 Pakistan NEPRA electricity bill and domestic unit slab modeling." />
    </div>
  );
}
