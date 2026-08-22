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
import PakistanFuelCostWidget from "./PakistanFuelCostWidget";
import { Sparkles, HelpCircle, ArrowRight, Fuel, Sun, TrendingDown } from "lucide-react";

export const metadata: Metadata = {
  title: "Pakistan Fuel Cost & Mileage Calculator (Petrol vs. Hybrid vs. EV 2026)",
  description: "Calculate cost per kilometer (PKR/km), monthly fuel expenses, and payback period comparing Petrol cars, Hybrids (HEV), and Electric Vehicles (EV) in Pakistan.",
  alternates: {
    canonical: "/tools/pakistan-fuel-cost-calculator",
  },
  openGraph: {
    title: "Pakistan Fuel Cost & Mileage Calculator (Petrol vs. Hybrid vs. EV 2026)",
    description: "Compare running costs per km between Petrol (Rs. 275/L), Hybrid (22 km/L), and Electric Vehicles with grid or solar charging in Pakistan.",
    url: "https://quickcalc.cloud/tools/pakistan-fuel-cost-calculator",
    type: "website",
    siteName: "QuickCalc",
    images: [
      {
        url: "https://quickcalc.cloud/og-image.png",
        width: 1200,
        height: 630,
        alt: "Pakistan Fuel Cost Calculator on QuickCalc",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Pakistan Fuel Cost & Mileage Calculator (Petrol vs. Hybrid vs. EV 2026)",
    description: "Compare daily & monthly fuel costs per kilometer between Petrol, Hybrid, and EV cars in Pakistan.",
  },
};

export default function PakistanFuelCostPage({
  searchParams,
}: {
  searchParams?: { embed?: string };
}) {
  const softwareSchema = generateSoftwareAppSchema({
    name: "Pakistan Fuel Cost & Mileage Calculator (Petrol vs. Hybrid vs. EV 2026)",
    description: "Free online powertrain fuel cost comparison calculator for Pakistani car buyers and daily commuters.",
    slug: "pakistan-fuel-cost-calculator",
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
          <PakistanFuelCostWidget />
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
        "name": "What is the cost per kilometer of an electric car in Pakistan?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "At a standard residential grid tariff of PKR 45 per kWh and an EV efficiency of 6.5 km/kWh, an electric vehicle costs approximately PKR 6.92 per kilometer to drive in Pakistan. If charged using home rooftop solar panels, the fuel cost drops to PKR 0.00 per kilometer."
        }
      },
      {
        "@type": "Question",
        "name": "How much money do you save switching from Petrol to Hybrid in Pakistan?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "A standard petrol car averaging 12 km/L at PKR 275/L costs PKR 22.92/km. A hybrid car delivering 22 km/L costs PKR 12.50/km, delivering a 45.5% reduction in fuel expenses. For a typical 1,000 km monthly commute, you save approximately PKR 10,420 every month (over PKR 125,000 annually)."
        }
      },
      {
        "@type": "Question",
        "name": "How do you calculate monthly fuel cost from mileage and petrol price?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Divide the petrol price per liter by your car's fuel average (km/L) to get the cost per kilometer, then multiply by your monthly driving distance. Formula: Monthly Cost = (Petrol Price ÷ Mileage) × Monthly Kilometers."
        }
      },
      {
        "@type": "Question",
        "name": "What is the average mileage of a hybrid car in Pakistani city traffic?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Modern strong hybrid vehicles (like the Toyota Prius, Yaris Cross Hybrid, Corolla Cross, and Haval H6 HEV) typically achieve 20 km/L to 26 km/L in stop-and-go Pakistani city traffic due to regenerative braking and low-speed pure electric driving."
        }
      }
    ]
  };

  const articleData = {
    "@context": "https://schema.org",
    "@type": "Article",
    "headline": "Pakistan Fuel Cost & Mileage Calculator (Petrol vs. Hybrid vs. EV 2026 Guide)",
    "description": "Comprehensive comparison of running costs per kilometer, monthly fuel bills, and EV payback period in Pakistan.",
    "url": "https://quickcalc.cloud/tools/pakistan-fuel-cost-calculator",
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
        <Breadcrumbs toolName="Fuel Cost Calculator" toolSlug="pakistan-fuel-cost-calculator" />
        
        <div className="text-center max-w-3xl mx-auto mb-8">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-emerald-500/10 text-emerald-700 dark:text-emerald-300 border border-emerald-500/20 mb-3">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Updated for 2026 Petrol (PKR 275/L) & NEPRA Grid Rates</span>
          </div>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight text-zinc-900 dark:text-white mb-4">
            Free Pakistan Fuel Cost & Mileage Calculator (Petrol vs. Hybrid vs. EV 2026)
          </h1>

          {/* AI-extractable direct answer summary */}
          <p className="text-sm sm:text-base font-semibold text-emerald-800 dark:text-emerald-200 bg-emerald-500/10 border border-emerald-500/30 rounded-xl px-4 py-3 leading-relaxed mb-4 text-left">
            This interactive automotive cost comparison utility computes exact cost-per-kilometer (PKR/km), monthly running expenses, and payback timelines when choosing between Petrol (12 km/L), Hybrid (22 km/L), and Electric Vehicles (6.5 km/kWh) across daily commutes, motorway road trips, and solar home charging in Pakistan.
          </p>

          {/* Stand-alone direct answer paragraph */}
          <p className="text-sm sm:text-base text-zinc-600 dark:text-zinc-400 leading-relaxed font-medium">
            At PKR 275 per liter for petrol, a standard car costs PKR 22.92/km, a hybrid costs PKR 12.50/km (45% savings), and an electric vehicle charged on the grid costs PKR 6.92/km (70% savings) or PKR 0.00/km with rooftop solar net metering.
          </p>
        </div>

        <ShareButtons
          url="https://quickcalc.cloud/tools/pakistan-fuel-cost-calculator"
          title="Pakistan Fuel Cost & Mileage Calculator (Petrol vs. Hybrid vs. EV 2026)"
        />
        <EmbedWidget
          url="https://quickcalc.cloud/tools/pakistan-fuel-cost-calculator"
          title="Pakistan Fuel Cost & Mileage Calculator"
        />

        {/* The interactive widget */}
        <section className="my-8">
          <PakistanFuelCostWidget />
        </section>

        {/* Scientific & Mathematical Methodology Accordion */}
        <MethodologyAccordion slug="pakistan-fuel-cost-calculator" />

        {/* Ad Placement 1 */}
        <div className="ad-slot ad-slot--inline my-8" data-ad-position="in-content-1">
          <div className="ad-placeholder-label border border-dashed border-zinc-300 dark:border-zinc-800 rounded-xl py-4 flex items-center justify-center bg-zinc-50/50 dark:bg-zinc-950/20 text-[10px] font-bold text-zinc-400 dark:text-zinc-600 uppercase tracking-widest cursor-default">
            Advertisement
          </div>
        </div>

        {/* Comprehensive SEO & AEO Content (500+ Words) */}
        <article className="prose prose-zinc dark:prose-invert max-w-4xl mx-auto space-y-8 mt-12 border-t border-zinc-200 dark:border-zinc-800 pt-10">
          
          {/* Section 1: Cost Per Kilometer Breakdown */}
          <section className="space-y-4">
            <h2 className="text-2xl font-black text-zinc-950 dark:text-white flex items-center gap-2">
              <Fuel className="w-6 h-6 text-amber-600 dark:text-amber-400" />
              <span>Cost Per Kilometer Breakdown: Petrol vs Hybrid vs Electric Car in Pakistan</span>
            </h2>
            <p className="text-zinc-600 dark:text-zinc-400 leading-relaxed">
              With fluctuating petroleum prices and rising utility bills across Pakistan, operating cost-per-kilometer is the single most decisive factor when buying a vehicle. Here is how the three powertrains compare under 2026 market conditions:
            </p>
            
            <ul className="space-y-2 text-zinc-700 dark:text-zinc-300 list-disc pl-5 text-sm sm:text-base leading-relaxed">
              <li><strong>Standard Petrol Vehicles (10–14 km/L):</strong> At PKR 275/Liter, driving a Honda Civic, Toyota Corolla, or Suzuki Swift costs between <strong>PKR 19.60 and PKR 27.50 per kilometer</strong> in city driving.</li>
              <li><strong>Hybrid Electric Vehicles (20–25 km/L):</strong> Strong hybrids like the Toyota Yaris Cross Hybrid, Corolla Cross, and Haval H6 HEV drop running expenses down to <strong>PKR 11.00 to PKR 13.75 per kilometer</strong>, slashing fuel expenditure by nearly half.</li>
              <li><strong>Electric Vehicles (5.5–7.5 km/kWh):</strong> Modern EVs such as the MG ZS EV, BYD Atto 3, Deepal S07, and Honri Ve cost approximately <strong>PKR 6.00 to PKR 7.50 per kilometer</strong> when charged on residential grid power (PKR 45/unit).</li>
            </ul>
          </section>

          {/* Section 2: Solar Home Charging */}
          <section className="space-y-4 border-t border-zinc-200 dark:border-zinc-800 pt-8">
            <h2 className="text-2xl font-black text-zinc-950 dark:text-white flex items-center gap-2">
              <Sun className="w-6 h-6 text-amber-500" />
              <span>How Solar Home Charging Makes EVs Nearly Free to Run in Pakistan</span>
            </h2>
            <p className="text-zinc-600 dark:text-zinc-400 leading-relaxed">
              Pakistan has witnessed massive adoption of rooftop solar net metering. An electric vehicle with a 50 kWh battery pack requires approximately 50 solar units for a full charge, providing 300 to 350 km of real-world range. When plugged into a home solar system during peak daylight hours, the marginal cost of fuel drops to <strong>PKR 0.00 per kilometer</strong>, saving over PKR 300,000 annually compared to a petrol car.
            </p>
          </section>

          {/* Section 3: Purchase Price Payback Analysis */}
          <section className="space-y-4 border-t border-zinc-200 dark:border-zinc-800 pt-8">
            <h2 className="text-2xl font-black text-zinc-950 dark:text-white flex items-center gap-2">
              <TrendingDown className="w-6 h-6 text-emerald-600 dark:text-emerald-400" />
              <span>Is a Hybrid or EV Worth the Higher Initial Purchase Price in 2026?</span>
            </h2>
            <p className="text-zinc-600 dark:text-zinc-400 leading-relaxed">
              While Hybrid and Electric cars carry an upfront purchase premium of PKR 15 to 30 Lacs over conventional petrol models, the substantial monthly fuel savings recover this capital investment rapidly. For drivers commuting 1,500 to 2,000 km per month, an EV typically achieves full financial payback within 3 to 4 years, after which the owner enjoys virtually free transportation alongside minimal engine maintenance expenses (no engine oil, spark plugs, or timing belt replacements).
            </p>
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
                  What is the cost per kilometer of an electric car in Pakistan?
                </h3>
                <p className="text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed">
                  At a standard residential grid tariff of PKR 45 per kWh and an EV efficiency of 6.5 km/kWh, an electric vehicle costs approximately PKR 6.92 per kilometer to drive in Pakistan. If charged using home rooftop solar panels, the fuel cost drops to PKR 0.00 per kilometer.
                </p>
              </div>

              <div className="p-4 rounded-xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 shadow-sm space-y-2">
                <h3 className="text-base font-bold text-zinc-900 dark:text-white">
                  How much money do you save switching from Petrol to Hybrid in Pakistan?
                </h3>
                <p className="text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed">
                  A standard petrol car averaging 12 km/L at PKR 275/L costs PKR 22.92/km. A hybrid car delivering 22 km/L costs PKR 12.50/km, delivering a 45.5% reduction in fuel expenses. For a typical 1,000 km monthly commute, you save approximately PKR 10,420 every month (over PKR 125,000 annually).
                </p>
              </div>

              <div className="p-4 rounded-xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 shadow-sm space-y-2">
                <h3 className="text-base font-bold text-zinc-900 dark:text-white">
                  How do you calculate monthly fuel cost from mileage and petrol price?
                </h3>
                <p className="text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed">
                  Divide the petrol price per liter by your car&apos;s fuel average (km/L) to get the cost per kilometer, then multiply by your monthly driving distance. Formula: Monthly Cost = (Petrol Price ÷ Mileage) × Monthly Kilometers.
                </p>
              </div>

              <div className="p-4 rounded-xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 shadow-sm space-y-2">
                <h3 className="text-base font-bold text-zinc-900 dark:text-white">
                  What is the average mileage of a hybrid car in Pakistani city traffic?
                </h3>
                <p className="text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed">
                  Modern strong hybrid vehicles (like the Toyota Prius, Yaris Cross Hybrid, Corolla Cross, and Haval H6 HEV) typically achieve 20 km/L to 26 km/L in stop-and-go Pakistani city traffic due to regenerative braking and low-speed pure electric driving.
                </p>
              </div>
            </div>
          </section>

          {/* Read Full In-Depth Guide Banner */}
          <section className="my-6 not-prose">
            <div className="p-5 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div className="space-y-1">
                <span className="text-xs font-bold text-emerald-700 dark:text-emerald-300 uppercase tracking-wider">Automotive Fuel Guide</span>
                <h3 className="text-base font-bold text-zinc-900 dark:text-white">Pakistan Petrol vs Hybrid vs Electric Car Cost Master Guide (2026)</h3>
                <p className="text-xs text-zinc-600 dark:text-zinc-400">Complete real-world mileage comparisons, solar charging math, battery degradation facts, and payback analysis.</p>
              </div>
              <Link
                href="/blog/pakistan-petrol-vs-hybrid-vs-ev-cost-guide-2026"
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
              Related Pakistani Financial & Utility Calculators
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <Link
                href="/tools/pakistan-vehicle-tax-calculator"
                className="p-3 rounded-xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 hover:border-emerald-500 transition-all flex items-center justify-between text-xs font-semibold text-zinc-800 dark:text-zinc-200 group"
              >
                <span>Pakistan Vehicle Token Tax</span>
                <ArrowRight className="w-3.5 h-3.5 text-zinc-400 group-hover:text-emerald-500 group-hover:translate-x-0.5 transition-all" />
              </Link>
              <Link
                href="/tools/pakistan-electricity-bill-calculator"
                className="p-3 rounded-xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 hover:border-emerald-500 transition-all flex items-center justify-between text-xs font-semibold text-zinc-800 dark:text-zinc-200 group"
              >
                <span>Pakistan Electricity Bill Calculator</span>
                <ArrowRight className="w-3.5 h-3.5 text-zinc-400 group-hover:text-emerald-500 group-hover:translate-x-0.5 transition-all" />
              </Link>
              <Link
                href="/tools/solar-payback-calculator"
                className="p-3 rounded-xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 hover:border-emerald-500 transition-all flex items-center justify-between text-xs font-semibold text-zinc-800 dark:text-zinc-200 group"
              >
                <span>Solar Panel ROI Calculator</span>
                <ArrowRight className="w-3.5 h-3.5 text-zinc-400 group-hover:text-emerald-500 group-hover:translate-x-0.5 transition-all" />
              </Link>
            </div>
          </section>
        </article>

        <RelatedTools currentSlug="pakistan-fuel-cost-calculator" />

        {/* Ad Placement Footer */}
        <div className="ad-slot ad-slot--footer mt-12" data-ad-position="footer">
          <div className="ad-placeholder-label border border-dashed border-zinc-300 dark:border-zinc-800 rounded-xl py-4 flex items-center justify-center bg-zinc-50/50 dark:bg-zinc-950/20 text-[10px] font-bold text-zinc-400 dark:text-zinc-600 uppercase tracking-widest cursor-default">
            Advertisement
          </div>
        </div>
      </main>

      {/* Footer */}
      <Footer customText="Accurate 2026 Pakistan fuel cost per kilometer, petrol vs hybrid vs EV comparisons, and solar charging calculations." />
    </div>
  );
}
