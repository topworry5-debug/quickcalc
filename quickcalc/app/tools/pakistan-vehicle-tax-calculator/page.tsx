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
import PakistanVehicleTaxWidget from "./PakistanVehicleTaxWidget";
import { Sparkles, HelpCircle, ArrowRight, Car, Receipt, ShieldCheck } from "lucide-react";

export const metadata: Metadata = {
  title: "Pakistan Vehicle Token Tax Calculator (2026-2027 Excise Slabs)",
  description: "Calculate annual vehicle token tax, new car registration fees, and FBR Section 231B/234 withholding tax for Punjab, Sindh, and Islamabad Excise across 660cc to 3000cc+ cars.",
  alternates: {
    canonical: "/tools/pakistan-vehicle-tax-calculator",
  },
  openGraph: {
    title: "Pakistan Vehicle Token Tax & Registration Fee Calculator (2026-2027)",
    description: "Free online vehicle token tax and registration calculator for Punjab, Sindh, and ICT Islamabad based on engine CC slabs, vehicle age, and Filer vs Non-Filer WHT rates.",
    url: "https://quickcalc.cloud/tools/pakistan-vehicle-tax-calculator",
    type: "website",
    siteName: "QuickCalc",
    images: [
      {
        url: "https://quickcalc.cloud/og-image.png",
        width: 1200,
        height: 630,
        alt: "Pakistan Vehicle Token Tax Calculator on QuickCalc",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Pakistan Vehicle Token Tax Calculator (2026-2027 Excise Slabs)",
    description: "Calculate motor vehicle token tax, FBR Section 231B/234 advance tax, and compare Filer vs Non-Filer car registration fees in Pakistan.",
  },
};

export default function PakistanVehicleTaxPage({
  searchParams,
}: {
  searchParams?: { embed?: string };
}) {
  const softwareSchema = generateSoftwareAppSchema({
    name: "Pakistan Vehicle Token Tax & Registration Fee Calculator (FY 2026-2027)",
    description: "Free online vehicle taxation utility for Pakistani car owners and buyers across Punjab, Sindh, and Islamabad Excise departments.",
    slug: "pakistan-vehicle-tax-calculator",
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
          <PakistanVehicleTaxWidget />
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
        "name": "What is the token tax on a 1300cc car in Punjab for 2026?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "For a 1300cc private car in Punjab (such as a Toyota Yaris or Honda City), an Active Tax Filer pays Rs. 3,000 base excise token + Rs. 500 motor vehicle tax + Rs. 200 professional tax + Rs. 1,750 FBR Section 234 advance tax, totaling PKR 5,450 annually. A Non-Filer pays PKR 8,950 due to a Rs. 5,250 withholding tax surcharge."
        }
      },
      {
        "@type": "Question",
        "name": "Is lifetime token tax available for cars above 1000cc in Pakistan?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "No. Lifetime token tax is exclusively available for vehicles with engine capacity up to 1000cc (e.g. Suzuki Alto, Cultus, Wagon R). Cars with engine capacity of 1001cc and above are subject to mandatory annual token tax renewal."
        }
      },
      {
        "@type": "Question",
        "name": "How much extra tax does a Non-Filer pay on new car registration?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Under FBR Section 231B, Non-Filers pay up to 3x higher advance withholding tax upon registration. For example, on a 1300cc car, an Active Filer pays Rs. 25,000 while a Non-Filer pays Rs. 75,000 (Rs. 50,000 extra penalty). On 2000cc+ luxury vehicles, Non-Filers pay 9% to 15% of invoice value compared to 3% to 5% for Filers."
        }
      },
      {
        "@type": "Question",
        "name": "What happens if I pay vehicle token tax after the due date?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Provincial Excise departments impose late payment surcharges ranging from 10% to 100% of the base token tax if paid after the June 30 / August 31 statutory deadlines. Paying early via ePay Punjab or online portals often provides a 5% to 10% prompt payment rebate."
        }
      }
    ]
  };

  const articleData = {
    "@context": "https://schema.org",
    "@type": "Article",
    "headline": "Pakistan Vehicle Token Tax & Registration Fee Calculator (2026-2027 Guide)",
    "description": "Complete breakdown of motor vehicle token tax, FBR Section 231B/234 withholding tax, engine CC slabs, and non-filer penalty comparisons.",
    "url": "https://quickcalc.cloud/tools/pakistan-vehicle-tax-calculator",
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
        <Breadcrumbs toolName="Vehicle Token Tax" toolSlug="pakistan-vehicle-tax-calculator" />
        
        <div className="text-center max-w-3xl mx-auto mb-8">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-emerald-500/10 text-emerald-700 dark:text-emerald-300 border border-emerald-500/20 mb-3">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Updated with FY 2026-2027 Punjab, Sindh & Islamabad Excise Slabs</span>
          </div>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight text-zinc-900 dark:text-white mb-4">
            Free Pakistan Vehicle Token Tax & Registration Fee Calculator (FY 2026-2027)
          </h1>

          {/* AI-extractable direct answer summary */}
          <p className="text-sm sm:text-base font-semibold text-emerald-800 dark:text-emerald-200 bg-emerald-500/10 border border-emerald-500/30 rounded-xl px-4 py-3 leading-relaxed mb-4 text-left">
            This free automotive tax utility calculates exact annual token tax renewals, new vehicle registration fees, and FBR withholding tax under Section 231B/234 across Punjab, Sindh, and Islamabad Excise departments based on engine capacity (660cc to 3000cc+), vehicle age, and Active Filer vs Non-Filer status.
          </p>

          {/* Stand-alone direct answer paragraph */}
          <p className="text-sm sm:text-base text-zinc-600 dark:text-zinc-400 leading-relaxed font-medium">
            To calculate vehicle token tax in Pakistan, determine your engine CC bracket: cars under 1000cc qualify for lifetime token tax (or Rs. 1,500/yr), 1001–1300cc cars pay Rs. 5,450 (Filer) / Rs. 8,950 (Non-Filer), 1301–1500cc pay ~Rs. 10,950, while luxury 2000cc+ vehicles are assessed at 1.5% to 2% of invoice value plus FBR advance withholding tax.
          </p>
        </div>

        <ShareButtons
          url="https://quickcalc.cloud/tools/pakistan-vehicle-tax-calculator"
          title="Pakistan Vehicle Token Tax & Registration Fee Calculator (FY 2026-2027)"
        />
        <EmbedWidget
          url="https://quickcalc.cloud/tools/pakistan-vehicle-tax-calculator"
          title="Pakistan Vehicle Token Tax Calculator"
        />

        {/* The interactive widget */}
        <section className="my-8">
          <PakistanVehicleTaxWidget />
        </section>

        {/* Scientific & Mathematical Methodology Accordion */}
        <MethodologyAccordion slug="pakistan-vehicle-tax-calculator" />

        {/* Ad Placement 1 */}
        <div className="ad-slot ad-slot--inline my-8" data-ad-position="in-content-1">
          <div className="ad-placeholder-label border border-dashed border-zinc-300 dark:border-zinc-800 rounded-xl py-4 flex items-center justify-center bg-zinc-50/50 dark:bg-zinc-950/20 text-[10px] font-bold text-zinc-400 dark:text-zinc-600 uppercase tracking-widest cursor-default">
            Advertisement
          </div>
        </div>

        {/* Comprehensive SEO & AEO Content (500+ Words) */}
        <article className="prose prose-zinc dark:prose-invert max-w-4xl mx-auto space-y-8 mt-12 border-t border-zinc-200 dark:border-zinc-800 pt-10">
          
          {/* Section 1: How Vehicle Token Tax is Calculated */}
          <section className="space-y-4">
            <h2 className="text-2xl font-black text-zinc-950 dark:text-white flex items-center gap-2">
              <Car className="w-6 h-6 text-emerald-600 dark:text-emerald-400" />
              <span>How Vehicle Token Tax is Calculated in Punjab, Sindh & Islamabad</span>
            </h2>
            <p className="text-zinc-600 dark:text-zinc-400 leading-relaxed">
              Motor vehicle taxation in Pakistan is governed by provincial motor vehicle taxation acts and federal income tax laws. An annual token tax invoice comprises three distinct components:
            </p>
            
            <ul className="space-y-2 text-zinc-700 dark:text-zinc-300 list-disc pl-5 text-sm sm:text-base leading-relaxed">
              <li><strong>Base Motor Vehicle Token Tax:</strong> Fixed provincial charge determined by engine displacement (CC) or percentage of vehicle value for 2000cc+ models.</li>
              <li><strong>Motor Vehicle Road & Highway Surcharge:</strong> Provincial infrastructure levy (Rs. 500 to Rs. 4,000 depending on CC).</li>
              <li><strong>Professional Tax:</strong> Flat provincial tax of Rs. 200 to Rs. 500 per vehicle.</li>
              <li><strong>FBR Advance Income Tax (Section 234):</strong> Federal withholding tax collected on behalf of FBR, directly adjusted against your annual income tax return.</li>
            </ul>
          </section>

          {/* Section 2: FBR Section 231B & 234 Withholding Tax */}
          <section className="space-y-4 border-t border-zinc-200 dark:border-zinc-800 pt-8">
            <h2 className="text-2xl font-black text-zinc-950 dark:text-white flex items-center gap-2">
              <Receipt className="w-6 h-6 text-teal-600 dark:text-teal-400" />
              <span>FBR Section 231B & Section 234 Tax Slabs for Filers vs. Non-Filers</span>
            </h2>
            <p className="text-zinc-600 dark:text-zinc-400 leading-relaxed">
              The Federal Board of Revenue enforces steep withholding tax differentials to encourage formal tax filing:
            </p>

            <div className="my-6 overflow-x-auto not-prose">
              <table className="w-full text-left text-xs sm:text-sm border-collapse border border-zinc-200 dark:border-zinc-800">
                <thead>
                  <tr className="bg-zinc-100 dark:bg-zinc-800/80 text-zinc-900 dark:text-white font-bold">
                    <th className="p-3 border border-zinc-200 dark:border-zinc-800">Engine Capacity (CC)</th>
                    <th className="p-3 border border-zinc-200 dark:border-zinc-800">Annual Token WHT (Sec 234) - Filer</th>
                    <th className="p-3 border border-zinc-200 dark:border-zinc-800">Annual Token WHT (Sec 234) - Non-Filer</th>
                    <th className="p-3 border border-zinc-200 dark:border-zinc-800">New Registration WHT (Sec 231B) - Filer</th>
                    <th className="p-3 border border-zinc-200 dark:border-zinc-800">New Registration WHT (Sec 231B) - Non-Filer</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-zinc-200 dark:divide-zinc-800 text-zinc-700 dark:text-zinc-300">
                  <tr>
                    <td className="p-3 font-semibold">Under 1000 CC</td>
                    <td className="p-3 text-emerald-600 font-bold">Rs. 0</td>
                    <td className="p-3 text-rose-600 font-bold">Rs. 1,000</td>
                    <td className="p-3 text-emerald-600 font-bold">Rs. 10,000–20,000</td>
                    <td className="p-3 text-rose-600 font-bold">Rs. 30,000–60,000</td>
                  </tr>
                  <tr>
                    <td className="p-3 font-semibold">1001 CC to 1300 CC</td>
                    <td className="p-3 text-emerald-600 font-bold">Rs. 1,750</td>
                    <td className="p-3 text-rose-600 font-bold">Rs. 5,250</td>
                    <td className="p-3 text-emerald-600 font-bold">Rs. 25,000</td>
                    <td className="p-3 text-rose-600 font-bold">Rs. 75,000</td>
                  </tr>
                  <tr>
                    <td className="p-3 font-semibold">1301 CC to 1600 CC</td>
                    <td className="p-3 text-emerald-600 font-bold">Rs. 3,750</td>
                    <td className="p-3 text-rose-600 font-bold">Rs. 11,250</td>
                    <td className="p-3 text-emerald-600 font-bold">Rs. 50,000</td>
                    <td className="p-3 text-rose-600 font-bold">Rs. 150,000</td>
                  </tr>
                  <tr>
                    <td className="p-3 font-semibold">1601 CC to 1800 CC</td>
                    <td className="p-3 text-emerald-600 font-bold">Rs. 4,500</td>
                    <td className="p-3 text-rose-600 font-bold">Rs. 13,500</td>
                    <td className="p-3 text-emerald-600 font-bold">Rs. 75,000</td>
                    <td className="p-3 text-rose-600 font-bold">Rs. 225,000</td>
                  </tr>
                  <tr>
                    <td className="p-3 font-semibold">1801 CC to 2000 CC</td>
                    <td className="p-3 text-emerald-600 font-bold">Rs. 7,500</td>
                    <td className="p-3 text-rose-600 font-bold">Rs. 22,500</td>
                    <td className="p-3 text-emerald-600 font-bold">Rs. 100,000</td>
                    <td className="p-3 text-rose-600 font-bold">Rs. 300,000</td>
                  </tr>
                  <tr>
                    <td className="p-3 font-semibold">Above 2000 CC</td>
                    <td className="p-3 text-emerald-600 font-bold">Rs. 10,000–20,000</td>
                    <td className="p-3 text-rose-600 font-bold">Rs. 30,000–60,000</td>
                    <td className="p-3 text-emerald-600 font-bold">3% to 5% of Value</td>
                    <td className="p-3 text-rose-600 font-bold">9% to 15% of Value</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </section>

          {/* Section 3: Step-by-Step Guide to Online Payment */}
          <section className="space-y-4 border-t border-zinc-200 dark:border-zinc-800 pt-8">
            <h2 className="text-2xl font-black text-zinc-950 dark:text-white flex items-center gap-2">
              <ShieldCheck className="w-6 h-6 text-emerald-600 dark:text-emerald-400" />
              <span>Step-by-Step Guide to Paying Your Vehicle Token Tax Online</span>
            </h2>
            <p className="text-zinc-600 dark:text-zinc-400 leading-relaxed">
              You no longer need to stand in line at Excise and Taxation offices. Follow these simple steps:
            </p>

            <ol className="space-y-2 text-zinc-700 dark:text-zinc-300 list-decimal pl-5 text-sm sm:text-base leading-relaxed">
              <li>Open the <strong>ePay Punjab</strong> app (or Sindh e-Payment / ICT City App).</li>
              <li>Select <strong>Excise & Taxation Department</strong> &rarr; <strong>Token Tax</strong>.</li>
              <li>Enter your vehicle registration number (e.g. <code>LEA-23-1234</code>).</li>
              <li>The system generates a unique 17-digit <strong>PSID number</strong> with your exact tax challan.</li>
              <li>Pay via 1Link through any mobile banking app, ATM, JazzCash, or EasyPaisa. Your online excise record updates instantly.</li>
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
                  What is the token tax on a 1300cc car in Punjab for 2026?
                </h3>
                <p className="text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed">
                  An Active Filer pays PKR 5,450 (Rs. 3,000 base + Rs. 500 MV + Rs. 200 prof tax + Rs. 1,750 FBR WHT). A Non-Filer pays PKR 8,950.
                </p>
              </div>

              <div className="p-4 rounded-xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 shadow-sm space-y-2">
                <h3 className="text-base font-bold text-zinc-900 dark:text-white">
                  Is lifetime token tax available for cars above 1000cc in Pakistan?
                </h3>
                <p className="text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed">
                  No. Lifetime token tax is exclusively for vehicles up to 1000cc. Cars 1001cc and above require annual token tax renewals.
                </p>
              </div>

              <div className="p-4 rounded-xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 shadow-sm space-y-2">
                <h3 className="text-base font-bold text-zinc-900 dark:text-white">
                  How much extra tax does a Non-Filer pay on new car registration?
                </h3>
                <p className="text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed">
                  Non-Filers pay up to 3x higher advance tax under Section 231B (e.g. Rs. 75,000 vs Rs. 25,000 for 1300cc; 9%–15% vs 3%–5% for 2000cc+ cars).
                </p>
              </div>

              <div className="p-4 rounded-xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 shadow-sm space-y-2">
                <h3 className="text-base font-bold text-zinc-900 dark:text-white">
                  What happens if I pay vehicle token tax after the due date?
                </h3>
                <p className="text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed">
                  Excise departments apply penalties ranging from 10% up to 100% of the base token tax for overdue renewals.
                </p>
              </div>
            </div>
          </section>

          {/* Read Full In-Depth Guide Banner */}
          <section className="my-6 not-prose">
            <div className="p-5 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div className="space-y-1">
                <span className="text-xs font-bold text-emerald-700 dark:text-emerald-300 uppercase tracking-wider">Automotive Tax Guide</span>
                <h3 className="text-base font-bold text-zinc-900 dark:text-white">Pakistan Vehicle Token Tax & Registration Slabs Master Guide (2026-2027)</h3>
                <p className="text-xs text-zinc-600 dark:text-zinc-400">Complete walkthrough of CC slabs, FBR Sections 231B & 234, age rebates, and ePay Punjab online payment instructions.</p>
              </div>
              <Link
                href="/blog/pakistan-vehicle-token-tax-guide-2026-2027"
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
                href="/tools/pakistan-property-tax-calculator"
                className="p-3 rounded-xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 hover:border-emerald-500 transition-all flex items-center justify-between text-xs font-semibold text-zinc-800 dark:text-zinc-200 group"
              >
                <span>Pakistan Property Transfer Tax</span>
                <ArrowRight className="w-3.5 h-3.5 text-zinc-400 group-hover:text-emerald-500 group-hover:translate-x-0.5 transition-all" />
              </Link>
              <Link
                href="/tools/pakistan-electricity-bill-calculator"
                className="p-3 rounded-xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 hover:border-emerald-500 transition-all flex items-center justify-between text-xs font-semibold text-zinc-800 dark:text-zinc-200 group"
              >
                <span>Pakistan Electricity Bill Calculator</span>
                <ArrowRight className="w-3.5 h-3.5 text-zinc-400 group-hover:text-emerald-500 group-hover:translate-x-0.5 transition-all" />
              </Link>
            </div>
          </section>
        </article>

        <RelatedTools currentSlug="pakistan-vehicle-tax-calculator" />

        {/* Ad Placement Footer */}
        <div className="ad-slot ad-slot--footer mt-12" data-ad-position="footer">
          <div className="ad-placeholder-label border border-dashed border-zinc-300 dark:border-zinc-800 rounded-xl py-4 flex items-center justify-center bg-zinc-50/50 dark:bg-zinc-950/20 text-[10px] font-bold text-zinc-400 dark:text-zinc-600 uppercase tracking-widest cursor-default">
            Advertisement
          </div>
        </div>
      </main>

      {/* Footer */}
      <Footer customText="Precise 2026-2027 Pakistan motor vehicle token tax, FBR Section 231B/234, and provincial excise fee calculation." />
    </div>
  );
}
