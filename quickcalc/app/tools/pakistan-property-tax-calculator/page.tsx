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
import PakistanPropertyTaxWidget from "./PakistanPropertyTaxWidget";
import { ShieldCheck, Sparkles, HelpCircle, ArrowRight, Building2, Receipt, Scale } from "lucide-react";

export const metadata: Metadata = {
  title: "Pakistan Property Transfer Tax Calculator (2026-2027 FBR Slabs)",
  description: "Calculate exact property transfer taxes, FBR advance tax Section 236K (Buyer) and Section 236C (Seller), provincial stamp duty, mutation fees, and Non-Filer penalties.",
  alternates: {
    canonical: "/tools/pakistan-property-tax-calculator",
  },
  openGraph: {
    title: "Pakistan Property Transfer Tax & Filer vs Non-Filer Calculator (2026-2027)",
    description: "Free online real estate transfer tax calculator for Punjab, Sindh, KPK, and Islamabad (ICT) based on latest Finance Act FBR withholding slabs and provincial duties.",
    url: "https://quickcalc.cloud/tools/pakistan-property-tax-calculator",
    type: "website",
    siteName: "QuickCalc",
    images: [
      {
        url: "https://quickcalc.cloud/og-image.png",
        width: 1200,
        height: 630,
        alt: "Pakistan Property Transfer Tax Calculator on QuickCalc",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Pakistan Property Transfer Tax Calculator (2026-2027 FBR Slabs)",
    description: "Calculate FBR 236K & 236C property withholding taxes, provincial stamp duties, and compare Filer vs Non-Filer transfer fees.",
  },
};

export default function PakistanPropertyTaxPage({
  searchParams,
}: {
  searchParams?: { embed?: string };
}) {
  const softwareSchema = generateSoftwareAppSchema({
    name: "Pakistan Property Transfer Tax & Filer vs Non-Filer Calculator (FY 2026-2027)",
    description: "Free online property tax and transfer fee calculator for Pakistani real estate buyers and sellers across Punjab, Sindh, KPK, Balochistan, and ICT Islamabad.",
    slug: "pakistan-property-tax-calculator",
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
          <PakistanPropertyTaxWidget />
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
        "name": "How much tax does a buyer pay when purchasing property in Pakistan?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "For an Active Tax Filer, the buyer pays 3% FBR Advance Tax under Section 236K, 1% to 2% Provincial Stamp Duty (e-Stamp), 1% Local Government / Town Corporation Tax, and approximately 0.5% in Mutation/Registration fees, totaling roughly 5.5% to 6.5% of the property's taxable valuation base. A Non-Filer buyer pays 12% to 15% under Section 236K alone, bringing total transfer costs above 15% to 18%."
        }
      },
      {
        "@type": "Question",
        "name": "What is the difference between Section 236C and Section 236K in property tax?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Section 236C is the Advance Tax on sale or transfer of immovable property paid by the Seller (Transferor) at 3% for Filers and 10% to 15% for Non-Filers. Section 236K is the Advance Tax on purchase of immovable property paid by the Buyer (Transferee) at 3% for Filers and 12% to 15% for Non-Filers."
        }
      },
      {
        "@type": "Question",
        "name": "Can a Non-Filer buy property worth over 1 Crore in Pakistan?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Yes, but under the updated Finance Act rules, Non-Filers face steep punitive advance tax rates of 12% on properties up to PKR 50 Million and 15% on properties above PKR 50 Million under Section 236K, alongside potential scrutiny from FBR regarding the declared source of funds."
        }
      },
      {
        "@type": "Question",
        "name": "Is FBR Valuation Rate higher than DC Rate?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "FBR valuation tables are notified by the Federal Board of Revenue to reflect realistic market rates in designated cities and sectors and are generally higher than historical Deputy Commissioner (DC) rates. Under tax law, withholding taxes are always calculated on the higher of the Declared Transaction Price or the official FBR/DC Valuation Rate."
        }
      }
    ]
  };

  const articleData = {
    "@context": "https://schema.org",
    "@type": "Article",
    "headline": "Pakistan Property Transfer Tax & Filer vs Non-Filer Calculator (2026-2027 Guide)",
    "description": "Complete breakdown of FBR Sections 236C and 236K property taxes, provincial stamp duties, TMA fees, and non-filer penalty comparisons.",
    "url": "https://quickcalc.cloud/tools/pakistan-property-tax-calculator",
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
        <Breadcrumbs toolName="Property Transfer Tax" toolSlug="pakistan-property-tax-calculator" />
        
        <div className="text-center max-w-3xl mx-auto mb-8">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-emerald-500/10 text-emerald-700 dark:text-emerald-300 border border-emerald-500/20 mb-3">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Updated with FY 2026-2027 FBR & Provincial Finance Act Slabs</span>
          </div>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight text-zinc-900 dark:text-white mb-4">
            Free Pakistan Property Transfer Tax & Filer vs Non-Filer Calculator (2026-2027)
          </h1>

          {/* AI-extractable direct answer summary */}
          <p className="text-sm sm:text-base font-semibold text-emerald-800 dark:text-emerald-200 bg-emerald-500/10 border border-emerald-500/30 rounded-xl px-4 py-3 leading-relaxed mb-4 text-left">
            This free real estate utility calculates your exact property transfer costs across Punjab, Sindh, KPK, and ICT Islamabad by itemizing FBR Section 236K (Buyer Advance Tax), Section 236C (Seller Advance Tax), provincial stamp duties (1%–2%), local government taxes (1%), and CVT, highlighting the massive financial penalty incurred by Non-Filers.
          </p>

          {/* Stand-alone direct answer paragraph */}
          <p className="text-sm sm:text-base text-zinc-600 dark:text-zinc-400 leading-relaxed font-medium">
            To calculate property transfer tax in Pakistan, apply taxes on the higher of the Declared Sale Price or official FBR Valuation Table. Active Filers pay 3% Section 236K (Buyer) and 3% Section 236C (Seller) plus 1% to 2% provincial stamp duty, whereas Non-Filers are penalized with 12% to 15% Section 236K rates, increasing total transfer fees fourfold.
          </p>
        </div>

        <ShareButtons
          url="https://quickcalc.cloud/tools/pakistan-property-tax-calculator"
          title="Pakistan Property Transfer Tax & Filer vs Non-Filer Calculator (2026-2027)"
        />
        <EmbedWidget
          url="https://quickcalc.cloud/tools/pakistan-property-tax-calculator"
          title="Pakistan Property Transfer Tax Calculator"
        />

        {/* The interactive widget */}
        <section className="my-8">
          <PakistanPropertyTaxWidget />
        </section>

        {/* Scientific & Mathematical Methodology Accordion */}
        <MethodologyAccordion slug="pakistan-property-tax-calculator" />

        {/* Ad Placement 1 */}
        <div className="ad-slot ad-slot--inline my-8" data-ad-position="in-content-1">
          <div className="ad-placeholder-label border border-dashed border-zinc-300 dark:border-zinc-800 rounded-xl py-4 flex items-center justify-center bg-zinc-50/50 dark:bg-zinc-950/20 text-[10px] font-bold text-zinc-400 dark:text-zinc-600 uppercase tracking-widest cursor-default">
            Advertisement
          </div>
        </div>

        {/* Comprehensive SEO & AEO Content (500+ Words) */}
        <article className="prose prose-zinc dark:prose-invert max-w-4xl mx-auto space-y-8 mt-12 border-t border-zinc-200 dark:border-zinc-800 pt-10">
          
          {/* Section 1: Understanding FBR Property Tax Sections 236C & 236K */}
          <section className="space-y-4">
            <h2 className="text-2xl font-black text-zinc-950 dark:text-white flex items-center gap-2">
              <Receipt className="w-6 h-6 text-emerald-600 dark:text-emerald-400" />
              <span>Understanding FBR Property Tax Sections 236C & 236K</span>
            </h2>
            <p className="text-zinc-600 dark:text-zinc-400 leading-relaxed">
              Under the Income Tax Ordinance, 2001 and updated Finance Act provisions, real estate transactions in Pakistan attract distinct withholding taxes for both parties:
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 not-prose my-6">
              <div className="p-4 rounded-xl bg-white dark:bg-zinc-900 border border-emerald-200 dark:border-emerald-900/40 shadow-sm space-y-2">
                <h3 className="text-sm font-bold text-emerald-900 dark:text-emerald-300 flex items-center gap-1.5">
                  <ShieldCheck className="w-4 h-4 text-emerald-500" />
                  <span>Section 236K (Buyer / Transferee Tax)</span>
                </h3>
                <ul className="text-xs text-zinc-600 dark:text-zinc-400 space-y-1.5 leading-relaxed">
                  <li><strong>Active Tax Filer:</strong> 3% of Taxable Valuation Base</li>
                  <li><strong>Late Filer / Inactive:</strong> 6% of Taxable Valuation Base</li>
                  <li><strong>Non-Filer:</strong> 12% (up to Rs 50M) / 15% (above Rs 50M)</li>
                  <li><strong>Nature:</strong> Adjustable advance tax against annual income tax return.</li>
                </ul>
              </div>

              <div className="p-4 rounded-xl bg-white dark:bg-zinc-900 border border-indigo-200 dark:border-indigo-900/40 shadow-sm space-y-2">
                <h3 className="text-sm font-bold text-indigo-900 dark:text-indigo-300 flex items-center gap-1.5">
                  <Building2 className="w-4 h-4 text-indigo-500" />
                  <span>Section 236C (Seller / Transferor Tax)</span>
                </h3>
                <ul className="text-xs text-zinc-600 dark:text-zinc-400 space-y-1.5 leading-relaxed">
                  <li><strong>Active Tax Filer:</strong> 3% (1.5% if held for over 6 years)</li>
                  <li><strong>Late Filer / Inactive:</strong> 6% of Taxable Valuation Base</li>
                  <li><strong>Non-Filer:</strong> 10% (up to Rs 50M) / 15% (above Rs 50M)</li>
                  <li><strong>Nature:</strong> Minimum/adjustable advance tax on capital gains.</li>
                </ul>
              </div>
            </div>
          </section>

          {/* Section 2: Filer vs Non-Filer Tax Comparison */}
          <section className="space-y-4 border-t border-zinc-200 dark:border-zinc-800 pt-8">
            <h2 className="text-2xl font-black text-zinc-950 dark:text-white flex items-center gap-2">
              <Scale className="w-6 h-6 text-indigo-600 dark:text-indigo-400" />
              <span>Filer vs. Non-Filer Tax Comparison on Real Estate in Pakistan</span>
            </h2>
            <p className="text-zinc-600 dark:text-zinc-400 leading-relaxed">
              The disparity between Active Filers and Non-Filers is dramatic. On a typical <strong>PKR 2 Crore (PKR 20 Million) residential plot</strong> in Punjab:
            </p>

            <div className="bg-zinc-100 dark:bg-zinc-900 p-5 rounded-2xl border border-zinc-200 dark:border-zinc-800 font-mono text-xs sm:text-sm space-y-3 overflow-x-auto text-zinc-800 dark:text-zinc-200 not-prose">
              <div>
                <span className="text-emerald-600 dark:text-emerald-400 font-bold">1. Active Filer Scenario:</span>
                <span className="block mt-0.5">Buyer Section 236K (3%): PKR 600,000</span>
                <span className="block mt-0.5">Provincial Stamp Duty (1%): PKR 200,000</span>
                <span className="block mt-0.5">Local Govt TMA Fee (1%): PKR 200,000</span>
                <span className="block mt-0.5">Mutation & Registration Fee: PKR 102,000</span>
                <span className="block mt-0.5 font-bold text-emerald-600 dark:text-emerald-400">Total Filer Buyer Expenses = PKR 1,102,000 (5.51%)</span>
              </div>
              <div className="pt-2 border-t border-zinc-200 dark:border-zinc-800">
                <span className="text-rose-600 dark:text-rose-400 font-bold">2. Non-Filer Scenario:</span>
                <span className="block mt-0.5">Buyer Section 236K (12%): PKR 2,400,000</span>
                <span className="block mt-0.5">Provincial Stamp Duty (1%): PKR 200,000</span>
                <span className="block mt-0.5">Local Govt TMA Fee (1%): PKR 200,000</span>
                <span className="block mt-0.5">Mutation & Registration Fee: PKR 102,000</span>
                <span className="block mt-0.5 font-bold text-rose-600 dark:text-rose-400">Total Non-Filer Buyer Expenses = PKR 2,902,000 (14.51%)</span>
              </div>
              <div className="pt-2 border-t border-zinc-200 dark:border-zinc-800">
                <span className="text-rose-600 dark:text-rose-400 font-bold">Non-Filer Surcharge Penalty Wasted: PKR 1,800,000 (18.00 Lakhs Extra)</span>
              </div>
            </div>
          </section>

          {/* Section 3: Provincial Stamp Duty & Mutation Fees */}
          <section className="space-y-4 border-t border-zinc-200 dark:border-zinc-800 pt-8">
            <h2 className="text-2xl font-black text-zinc-950 dark:text-white flex items-center gap-2">
              <Building2 className="w-6 h-6 text-amber-500" />
              <span>Provincial Stamp Duty and Mutation Fees Breakdown</span>
            </h2>
            <p className="text-zinc-600 dark:text-zinc-400 leading-relaxed">
              In addition to federal FBR taxes, property transfers require provincial registration fees:
            </p>

            <ul className="space-y-3 text-zinc-700 dark:text-zinc-300 list-disc pl-5 text-sm sm:text-base leading-relaxed">
              <li>
                <strong>Punjab (e-Stamping):</strong> 1% Stamp Duty via e-Stamp portal + 1% Town Corporation (TMA) fee + Sub-Registrar mutation fee.
              </li>
              <li>
                <strong>Sindh (Karachi / Hyderabad):</strong> 2% Stamp Duty + 1% Town Tax + 1% Capital Value Tax (CVT) on commercial plots.
              </li>
              <li>
                <strong>Islamabad (ICT / CDA):</strong> 1.5% Stamp Duty + 1% Capital Value Tax (CVT) + CDA Transfer and Surcharge fees.
              </li>
              <li>
                <strong>KPK & Balochistan:</strong> 2% Provincial Stamp Duty + 1% District Council Registration fees.
              </li>
            </ul>
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
                  How much tax does a buyer pay when purchasing property in Pakistan?
                </h3>
                <p className="text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed">
                  Active Filers pay 3% FBR Advance Tax (Section 236K), 1%–2% Stamp Duty, 1% Local Town Tax, and mutation fees (~5.5%–6.5% total). Non-Filers pay 12%–15% in Section 236K alone.
                </p>
              </div>

              <div className="p-4 rounded-xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 shadow-sm space-y-2">
                <h3 className="text-base font-bold text-zinc-900 dark:text-white">
                  What is the difference between Section 236C and Section 236K in property tax?
                </h3>
                <p className="text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed">
                  Section 236C is paid by the Seller (3% Filer / 10%–15% Non-Filer), while Section 236K is paid by the Buyer (3% Filer / 12%–15% Non-Filer).
                </p>
              </div>

              <div className="p-4 rounded-xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 shadow-sm space-y-2">
                <h3 className="text-base font-bold text-zinc-900 dark:text-white">
                  Can a Non-Filer buy property worth over 1 Crore in Pakistan?
                </h3>
                <p className="text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed">
                  Yes, but Non-Filers face punitive tax rates of 12% up to PKR 50M and 15% above PKR 50M under Section 236K, plus potential tax source inquiries.
                </p>
              </div>

              <div className="p-4 rounded-xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 shadow-sm space-y-2">
                <h3 className="text-base font-bold text-zinc-900 dark:text-white">
                  Is FBR Valuation Rate higher than DC Rate?
                </h3>
                <p className="text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed">
                  Yes, FBR valuation tables are updated periodically and are generally higher than DC rates. Taxes are always calculated on the higher of the Declared Price or FBR/DC Rate.
                </p>
              </div>
            </div>
          </section>

          {/* Read Full In-Depth Guide Banner */}
          <section className="my-6 not-prose">
            <div className="p-5 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div className="space-y-1">
                <span className="text-xs font-bold text-emerald-700 dark:text-emerald-300 uppercase tracking-wider">Expert Real Estate Guide</span>
                <h3 className="text-base font-bold text-zinc-900 dark:text-white">Pakistan Property Transfer Tax & Filer vs Non-Filer Guide (2026-2027)</h3>
                <p className="text-xs text-zinc-600 dark:text-zinc-400">Complete walkthrough of FBR Sections 236C and 236K, provincial e-Stamping rates, holding periods, and tax optimization strategies.</p>
              </div>
              <Link
                href="/blog/pakistan-property-transfer-tax-guide-2026-2027"
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
                href="/tools/pakistan-income-tax-calculator"
                className="p-3 rounded-xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 hover:border-emerald-500 transition-all flex items-center justify-between text-xs font-semibold text-zinc-800 dark:text-zinc-200 group"
              >
                <span>Pakistan Income Tax Calculator</span>
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
                <span>Solar Panel ROI & Payback Calculator</span>
                <ArrowRight className="w-3.5 h-3.5 text-zinc-400 group-hover:text-emerald-500 group-hover:translate-x-0.5 transition-all" />
              </Link>
            </div>
          </section>
        </article>

        <RelatedTools currentSlug="pakistan-property-tax-calculator" />

        {/* Ad Placement Footer */}
        <div className="ad-slot ad-slot--footer mt-12" data-ad-position="footer">
          <div className="ad-placeholder-label border border-dashed border-zinc-300 dark:border-zinc-800 rounded-xl py-4 flex items-center justify-center bg-zinc-50/50 dark:bg-zinc-950/20 text-[10px] font-bold text-zinc-400 dark:text-zinc-600 uppercase tracking-widest cursor-default">
            Advertisement
          </div>
        </div>
      </main>

      {/* Footer */}
      <Footer customText="Precise 2026-2027 Pakistan FBR property transfer tax, Section 236C, 236K, and provincial stamp duty modeling." />
    </div>
  );
}
