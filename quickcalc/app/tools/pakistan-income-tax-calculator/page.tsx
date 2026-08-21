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
import PakistanTaxCalculatorWidget from "./PakistanTaxCalculatorWidget";
import { CheckCircle2, Receipt, Sparkles, HelpCircle, ArrowRight, DollarSign, Building2 } from "lucide-react";

export const metadata: Metadata = {
  title: "Pakistan Income Tax Calculator FY 2026-2027 (FBR Slabs)",
  description: "Calculate your exact FBR income tax, monthly salary deductions, and net take-home pay under updated Finance Act 2026-2027 tax slabs for salaried and business individuals.",
  alternates: {
    canonical: "/tools/pakistan-income-tax-calculator",
  },
  openGraph: {
    title: "Pakistan Income Tax Calculator FY 2026-2027 (FBR Slabs) - QuickCalc",
    description: "Free 2026-2027 Pakistan salary tax calculator. Compute exact FBR monthly tax deductions, net take-home salary, Zakat deductions, and advance WHT credits.",
    url: "https://quickcalc.cloud/tools/pakistan-income-tax-calculator",
    type: "website",
    siteName: "QuickCalc",
    images: [
      {
        url: "https://quickcalc.cloud/og-image.png",
        width: 1200,
        height: 630,
        alt: "Pakistan Income Tax Calculator on QuickCalc",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Pakistan Income Tax Calculator FY 2026-2027 (FBR Slabs)",
    description: "Calculate Pakistan FBR income tax deductions, monthly salary tax, and net take-home pay for salaried & business individuals.",
  },
};

export default function PakistanTaxCalculatorPage({
  searchParams,
}: {
  searchParams?: { embed?: string };
}) {
  const softwareSchema = generateSoftwareAppSchema({
    name: "Pakistan Income Tax Calculator FY 2026-2027 (FBR Slabs)",
    description: "Free online tax calculator for Pakistani taxpayers, salaried employees, and freelancers to compute exact FBR income tax and net take-home pay.",
    slug: "pakistan-income-tax-calculator",
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
          <PakistanTaxCalculatorWidget />
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
        "name": "What is the minimum taxable income limit in Pakistan for 2026-2027?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "For the tax year 2026-2027, the minimum taxable income threshold in Pakistan is PKR 600,000 per annum (PKR 50,000 per month) for both salaried and non-salaried individuals. Any annual income up to PKR 600,000 is 100% tax-free (0% tax rate)."
        }
      },
      {
        "@type": "Question",
        "name": "How is income tax calculated on monthly salary in Pakistan?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "To calculate monthly salary tax, your employer annualizes your gross monthly pay by multiplying by 12, subtracts allowable deductions (such as Zakat deducted under Section 60), determines your annual tax liability based on FBR's progressive slabs, and divides that annual total by 12 to deduct monthly payroll tax under Section 149."
        }
      },
      {
        "@type": "Question",
        "name": "Can I adjust mobile phone withholding tax (WHT) in my salary tax?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Yes. Active taxpayers and salaried individuals can claim credit for 15% advance withholding tax (WHT) deducted on mobile phone top-ups and postpaid bills under Section 236. You can submit your annual tax certificate from your telecom provider to your employer or adjust it directly when filing your annual FBR tax return on the Iris portal."
        }
      },
      {
        "@type": "Question",
        "name": "What is the tax rate for IT freelancers in Pakistan?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Pakistani IT and IT-enabled services (ITeS) exporters registered with the Pakistan Software Export Board (PSEB) benefit from a concessionary final tax regime of 0.25% or 1% under Section 154A upon foreign inward remittances, provided they file annual tax returns and remain on the Active Taxpayer List (ATL)."
        }
      }
    ]
  };

  const articleData = {
    "@context": "https://schema.org",
    "@type": "Article",
    "headline": "Pakistan Income Tax Calculator FY 2026-2027 (FBR Slabs & Rules)",
    "description": "Complete guide to FBR income tax slabs for salaried and non-salaried individuals, allowable Zakat deductions, advance WHT credits, and monthly pay slip calculations.",
    "url": "https://quickcalc.cloud/tools/pakistan-income-tax-calculator",
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
        <Breadcrumbs toolName="Pakistan Income Tax" toolSlug="pakistan-income-tax-calculator" />
        
        <div className="text-center max-w-3xl mx-auto mb-8">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-emerald-500/10 text-emerald-700 dark:text-emerald-300 border border-emerald-500/20 mb-3">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Updated with FBR Finance Act 2026-2027 Tax Slabs</span>
          </div>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight text-zinc-900 dark:text-white mb-4">
            Free Pakistan Income Tax Calculator FY 2026-2027 (FBR Slabs)
          </h1>

          {/* AI-extractable direct answer summary */}
          <p className="text-sm sm:text-base font-semibold text-emerald-800 dark:text-emerald-200 bg-emerald-500/10 border border-emerald-500/30 rounded-xl px-4 py-3 leading-relaxed mb-4 text-left">
            This free Pakistan income tax calculator computes your exact FBR annual tax liability, monthly payroll deductions, allowable Zakat deductions (u/s 60), advance withholding tax (WHT) credits, and net take-home salary for salaried employees and business individuals under the updated 2026-2027 tax slabs.
          </p>

          {/* Stand-alone direct answer paragraph */}
          <p className="text-sm sm:text-base text-zinc-600 dark:text-zinc-400 leading-relaxed font-medium">
            In Pakistan, salaried individuals earning up to PKR 600,000 per year (PKR 50,000/month) pay 0% income tax. For earnings exceeding PKR 600,000, progressive FBR tax slabs apply starting at 5% up to a top marginal rate of 35% on income exceeding PKR 4.1 million per year.
          </p>
        </div>

        <ShareButtons
          url="https://quickcalc.cloud/tools/pakistan-income-tax-calculator"
          title="Pakistan Income Tax Calculator FY 2026-2027 (FBR Slabs)"
        />
        <EmbedWidget
          url="https://quickcalc.cloud/tools/pakistan-income-tax-calculator"
          title="Pakistan Income Tax Calculator"
        />

        {/* The interactive widget */}
        <section className="my-8">
          <PakistanTaxCalculatorWidget />
        </section>

        {/* Scientific & Mathematical Methodology Accordion */}
        <MethodologyAccordion slug="pakistan-income-tax-calculator" />

        {/* Ad Placement 1 */}
        <div className="ad-slot ad-slot--inline my-8" data-ad-position="in-content-1">
          <div className="ad-placeholder-label border border-dashed border-zinc-300 dark:border-zinc-800 rounded-xl py-4 flex items-center justify-center bg-zinc-50/50 dark:bg-zinc-950/20 text-[10px] font-bold text-zinc-400 dark:text-zinc-600 uppercase tracking-widest cursor-default">
            Advertisement
          </div>
        </div>

        {/* Comprehensive SEO & AEO Content (500+ Words) */}
        <article className="prose prose-zinc dark:prose-invert max-w-4xl mx-auto space-y-8 mt-12 border-t border-zinc-200 dark:border-zinc-800 pt-10">
          
          {/* Section 1: FBR Income Tax Slabs Overview */}
          <section className="space-y-4">
            <h2 className="text-2xl font-black text-zinc-950 dark:text-white flex items-center gap-2">
              <Receipt className="w-6 h-6 text-emerald-600 dark:text-emerald-400" />
              <span>FBR Income Tax Slabs Overview for FY 2026-2027</span>
            </h2>
            <p className="text-zinc-600 dark:text-zinc-400 leading-relaxed">
              The Federal Board of Revenue (FBR) categorizes taxpayers into two primary schedules under the Income Tax Ordinance, 2001: <strong>Salaried Individuals</strong> (where salary represents more than 75% of total annual income) and <strong>Non-Salaried / Business Individuals / AOPs</strong>.
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 not-prose my-6">
              <div className="p-4 rounded-xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 shadow-sm space-y-2">
                <h3 className="text-sm font-bold text-zinc-900 dark:text-white flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                  <span>Salaried Individuals (6 Progressive Slabs)</span>
                </h3>
                <ul className="text-xs text-zinc-600 dark:text-zinc-400 space-y-1.5 leading-relaxed">
                  <li><strong>Up to PKR 600k:</strong> 0% (Tax Free)</li>
                  <li><strong>PKR 600k – 1.2M:</strong> 5% of amount &gt; 600k</li>
                  <li><strong>PKR 1.2M – 2.2M:</strong> PKR 30k + 15% of amount &gt; 1.2M</li>
                  <li><strong>PKR 2.2M – 3.2M:</strong> PKR 180k + 25% of amount &gt; 2.2M</li>
                  <li><strong>PKR 3.2M – 4.1M:</strong> PKR 430k + 30% of amount &gt; 3.2M</li>
                  <li><strong>Above PKR 4.1M:</strong> PKR 700k + 35% of amount &gt; 4.1M</li>
                </ul>
              </div>

              <div className="p-4 rounded-xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 shadow-sm space-y-2">
                <h3 className="text-sm font-bold text-zinc-900 dark:text-white flex items-center gap-1.5">
                  <Building2 className="w-4 h-4 text-teal-500" />
                  <span>Non-Salaried & Business (5 Progressive Slabs)</span>
                </h3>
                <ul className="text-xs text-zinc-600 dark:text-zinc-400 space-y-1.5 leading-relaxed">
                  <li><strong>Up to PKR 600k:</strong> 0% (Tax Free)</li>
                  <li><strong>PKR 600k – 1.2M:</strong> 15% of amount &gt; 600k</li>
                  <li><strong>PKR 1.2M – 1.6M:</strong> PKR 90k + 20% of amount &gt; 1.2M</li>
                  <li><strong>PKR 1.6M – 3.2M:</strong> PKR 170k + 30% of amount &gt; 1.6M</li>
                  <li><strong>Above PKR 3.2M:</strong> PKR 650k + 40% of amount &gt; 3.2M</li>
                </ul>
              </div>
            </div>
          </section>

          {/* Section 2: How to Calculate Monthly Salary Tax */}
          <section className="space-y-4 border-t border-zinc-200 dark:border-zinc-800 pt-8">
            <h2 className="text-2xl font-black text-zinc-950 dark:text-white flex items-center gap-2">
              <DollarSign className="w-6 h-6 text-emerald-600 dark:text-emerald-400" />
              <span>Step-by-Step Salary Tax Calculation Example (PKR 150,000/month)</span>
            </h2>
            <p className="text-zinc-600 dark:text-zinc-400 leading-relaxed">
              Let us calculate the exact tax deductions for a salaried employee earning a gross salary of <strong>PKR 150,000 per month</strong>:
            </p>

            <div className="bg-zinc-100 dark:bg-zinc-900 p-5 rounded-2xl border border-zinc-200 dark:border-zinc-800 font-mono text-xs sm:text-sm space-y-3 overflow-x-auto text-zinc-800 dark:text-zinc-200 not-prose">
              <div>
                <span className="text-emerald-600 dark:text-emerald-400 font-bold">1. Calculate Annual Taxable Income:</span>
                <span className="block mt-0.5">Gross Annual Salary = PKR 150,000 × 12 = PKR 1,800,000</span>
              </div>
              <div>
                <span className="text-indigo-600 dark:text-indigo-400 font-bold">2. Determine Applicable FBR Slab:</span>
                <span className="block mt-0.5">PKR 1,800,000 falls in Slab 3 (PKR 1,200,001 to 2,200,000)</span>
                <span className="block mt-0.5">Formula: PKR 30,000 Fixed Base + 15% of excess over PKR 1,200,000</span>
              </div>
              <div>
                <span className="text-teal-600 dark:text-teal-400 font-bold">3. Compute Total Annual Tax:</span>
                <span className="block mt-0.5">Excess over 1.2M = PKR 1,800,000 - PKR 1,200,000 = PKR 600,000</span>
                <span className="block mt-0.5">15% of PKR 600,000 = PKR 90,000</span>
                <span className="block mt-0.5 font-bold text-rose-600 dark:text-rose-400">Total Annual Tax = PKR 30,000 + PKR 90,000 = PKR 120,000</span>
              </div>
              <div>
                <span className="text-emerald-600 dark:text-emerald-400 font-bold">4. Monthly Deduction & Take-Home Pay:</span>
                <span className="block mt-0.5 font-bold text-rose-600 dark:text-rose-400">Monthly Tax Deduction = PKR 120,000 / 12 = PKR 10,000/month</span>
                <span className="block mt-0.5 font-bold text-emerald-600 dark:text-emerald-400">Net Take-Home Salary = PKR 150,000 - PKR 10,000 = PKR 140,000/month</span>
                <span className="block mt-0.5">Effective Tax Rate = (120,000 / 1,800,000) × 100 = 6.67%</span>
              </div>
            </div>
          </section>

          {/* Section 3: Proven Ways to Claim Tax Rebates & Credits */}
          <section className="space-y-4 border-t border-zinc-200 dark:border-zinc-800 pt-8">
            <h2 className="text-2xl font-black text-zinc-950 dark:text-white flex items-center gap-2">
              <Sparkles className="w-6 h-6 text-emerald-600 dark:text-emerald-400" />
              <span>Proven Ways to Claim Tax Rebates & Credits in Pakistan</span>
            </h2>
            <p className="text-zinc-600 dark:text-zinc-400 leading-relaxed">
              Taxpayers in Pakistan can legally reduce their tax burden and claim refunds by leveraging permissible deductions under the Income Tax Ordinance:
            </p>

            <ul className="space-y-3 text-zinc-700 dark:text-zinc-300 list-disc pl-5 text-sm sm:text-base leading-relaxed">
              <li>
                <strong>Zakat Deductions (Section 60):</strong> Any Zakat officially deducted under the Zakat and Ushr Ordinance, 1980 (e.g. from bank savings accounts on 1st Ramadan) is 100% deductible from your gross taxable income.
              </li>
              <li>
                <strong>Advance Withholding Tax (WHT) Adjustments:</strong> Keep receipts and tax certificates for 15% WHT on prepaid mobile cards / postpaid bills (Section 236), annual vehicle token taxes (Section 234), property transfers (Section 236K), and banking transactions. These directly offset your final tax bill Rupee-for-Rupee.
              </li>
              <li>
                <strong>Voluntary Pension Schemes (VPS u/s 63):</strong> Contributions made to approved voluntary pension funds entitle taxpayers to a substantial tax credit capped at up to 20% of annual taxable income.
              </li>
              <li>
                <strong>Active Taxpayer List (ATL) Benefits:</strong> Maintaining filer status cuts withholding tax rates on bank cash withdrawals, property purchases, vehicle registrations, and prize bonds by 50% compared to non-filers.
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
                  What is the minimum taxable income limit in Pakistan for 2026-2027?
                </h3>
                <p className="text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed">
                  The minimum threshold is PKR 600,000 per year (PKR 50,000 per month). Any amount below this threshold is completely exempt from income tax.
                </p>
              </div>

              <div className="p-4 rounded-xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 shadow-sm space-y-2">
                <h3 className="text-base font-bold text-zinc-900 dark:text-white">
                  How is income tax calculated on monthly salary in Pakistan?
                </h3>
                <p className="text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed">
                  Gross monthly salary is multiplied by 12 to calculate annual income, adjusted for allowable deductions, calculated through FBR progressive brackets, and divided by 12 for monthly payroll deduction.
                </p>
              </div>

              <div className="p-4 rounded-xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 shadow-sm space-y-2">
                <h3 className="text-base font-bold text-zinc-900 dark:text-white">
                  Can I adjust mobile phone withholding tax (WHT) in my salary tax?
                </h3>
                <p className="text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed">
                  Yes, 15% withholding tax deducted on mobile phone recharges can be adjusted against your annual income tax by submitting your telecom tax certificate to your payroll department or claiming it on Iris.
                </p>
              </div>

              <div className="p-4 rounded-xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 shadow-sm space-y-2">
                <h3 className="text-base font-bold text-zinc-900 dark:text-white">
                  What is the tax rate for IT freelancers in Pakistan?
                </h3>
                <p className="text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed">
                  PSEB-registered IT and ITeS exporters bringing foreign remittance through banking channels enjoy a concessionary 0.25% to 1% final tax regime under Section 154A.
                </p>
              </div>
            </div>
          </section>

          {/* Read Full In-Depth Guide Banner */}
          <section className="my-6 not-prose">
            <div className="p-5 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div className="space-y-1">
                <span className="text-xs font-bold text-emerald-700 dark:text-emerald-300 uppercase tracking-wider">FBR Tax Guide</span>
                <h3 className="text-base font-bold text-zinc-900 dark:text-white">Pakistan Income Tax & Salary Slabs Guide FY 2026-2027</h3>
                <p className="text-xs text-zinc-600 dark:text-zinc-400">Complete breakdown of salaried vs. business tax slabs, monthly payroll withholding, Section 60 Zakat offsets, and mobile bill advance tax adjustments.</p>
              </div>
              <Link
                href="/blog/pakistan-income-tax-slabs-guide-2026-2027"
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
              Related Financial & Salary Tools
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <Link
                href="/tools/salary-take-home-calculator"
                className="p-3 rounded-xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 hover:border-emerald-500 transition-all flex items-center justify-between text-xs font-semibold text-zinc-800 dark:text-zinc-200 group"
              >
                <span>Global Salary Take-Home Calculator</span>
                <ArrowRight className="w-3.5 h-3.5 text-zinc-400 group-hover:text-emerald-500 group-hover:translate-x-0.5 transition-all" />
              </Link>
              <Link
                href="/tools/zakat-calculator"
                className="p-3 rounded-xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 hover:border-emerald-500 transition-all flex items-center justify-between text-xs font-semibold text-zinc-800 dark:text-zinc-200 group"
              >
                <span>Zakat Calculator (Nisab Gold/Silver)</span>
                <ArrowRight className="w-3.5 h-3.5 text-zinc-400 group-hover:text-emerald-500 group-hover:translate-x-0.5 transition-all" />
              </Link>
              <Link
                href="/tools/freelance-rate-calculator"
                className="p-3 rounded-xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 hover:border-emerald-500 transition-all flex items-center justify-between text-xs font-semibold text-zinc-800 dark:text-zinc-200 group"
              >
                <span>Freelance Hourly Rate Calculator</span>
                <ArrowRight className="w-3.5 h-3.5 text-zinc-400 group-hover:text-emerald-500 group-hover:translate-x-0.5 transition-all" />
              </Link>
            </div>
          </section>
        </article>

        <RelatedTools currentSlug="pakistan-income-tax-calculator" />

        {/* Ad Placement Footer */}
        <div className="ad-slot ad-slot--footer mt-12" data-ad-position="footer">
          <div className="ad-placeholder-label border border-dashed border-zinc-300 dark:border-zinc-800 rounded-xl py-4 flex items-center justify-center bg-zinc-50/50 dark:bg-zinc-950/20 text-[10px] font-bold text-zinc-400 dark:text-zinc-600 uppercase tracking-widest cursor-default">
            Advertisement
          </div>
        </div>
      </main>

      {/* Footer */}
      <Footer customText="Precise Pakistan FBR Income Tax FY 2026-2027 salary slip and tax bracket calculations." />
    </div>
  );
}
