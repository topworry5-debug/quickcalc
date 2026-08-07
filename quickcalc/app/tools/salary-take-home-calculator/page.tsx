import Navbar from "@/components/Navbar";
import { generateSoftwareAppSchema } from "@/lib/schema";
import RelatedTools from "@/components/RelatedTools";
import ShareButtons from "@/components/ShareButtons";
import EmbedWidget from "@/components/EmbedWidget";

import Breadcrumbs from "@/components/Breadcrumbs";
import type { Metadata } from "next";
import Link from "next/link";
import SalaryTakeHomeCalculatorWidget from "./SalaryTakeHomeCalculatorWidget";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "Salary Take-Home Calculator - Net Income Pay After Tax",
  description: "Calculate your exact net take-home salary after income taxes and payroll deductions in the US, Canada, and Pakistan with a fast, free comparison.",
  alternates: {
    canonical: "/tools/salary-take-home-calculator",
  },
  openGraph: {
    title: "Salary Take-Home Calculator - Net Income Pay After Tax",
    description: "Calculate your exact net take-home salary after income taxes and payroll deductions in the US, Canada, and Pakistan with a fast, free comparison.",
    url: "https://quickcalc.cloud/tools/salary-take-home-calculator",
    type: "website",
    siteName: "QuickCalc",
    images: [
      {
        url: "https://quickcalc.cloud/og-image.png",
        width: 1200,
        height: 630,
        alt: "Salary Take-Home Pay Calculator on QuickCalc",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Salary Take-Home Calculator - Net Income Pay After Tax",
    description: "Calculate your exact net take-home salary after income taxes and payroll deductions in the US, Canada, and Pakistan with a fast, free comparison.",
    images: ["https://quickcalc.cloud/og-image.png"],
  },
};

export default function SalaryTakeHomeCalculatorPage({ searchParams }: { searchParams?: { embed?: string } }) {
  const softwareSchema = generateSoftwareAppSchema({
    name: "Salary Take-Home Calculator - Net Income Pay After Tax",
    description: "Calculate your exact net take-home salary after income taxes and payroll deductions in the US, Canada, and Pakistan with a fast, free comparison.",
    slug: "salary-take-home-calculator",
    category: "Utility"
  });

  const isEmbed = searchParams?.embed === "true";
  if (isEmbed) {
    return (
      <div className="min-h-screen bg-white dark:bg-zinc-950 text-zinc-900 dark:text-zinc-100 font-[family-name:var(--font-geist-sans)] transition-colors p-2 flex flex-col justify-between">
      {/* WebApplication JSON-LD Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(softwareSchema) }}
      />

        <main className="max-w-4xl mx-auto w-full">
          <SalaryTakeHomeCalculatorWidget />
        </main>
      </div>
    );
  }

  const faqData = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      {
        "@type": "Question",
        "name": "How do I calculate my net take-home salary after taxes?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "To find out how much is my salary after tax, enter your annual or hourly gross wage into our calculator, select your country, and let the tool estimate your final net income. The calculator automatically applies federal brackets and standard social program contributions to show your actual earnings."
        }
      },
      {
        "@type": "Question",
        "name": "What is the difference between my gross salary and net pay?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "The gross vs net salary difference represents what you earn before deductions versus what you actually take home. Gross salary is the full amount agreed with your employer before taxes, whereas net salary is the actual amount paid to you after income tax, payroll deductions, and social contributions."
        }
      },
      {
        "@type": "Question",
        "name": "How do I estimate my biweekly or monthly take-home pay from an annual salary?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "To learn how to calculate take-home pay, start with your gross salary and deduct progressive federal income taxes, local state or provincial taxes, and payroll deductions (like FICA in the US or CPP and EI in Canada). Our calculator automates this complex math to give you a clear net estimate in seconds."
        }
      }
    ]
  };

  const articleData = {
    "@context": "https://schema.org",
    "@type": "Article",
    "headline": "Salary Calculator: Take-Home Pay After Tax (US, Canada & Pakistan)",
    "description": "An interactive, side-by-side multi-country salary calculator that provides simplified estimates of net take-home pay using national tax brackets.",
    "url": "https://quickcalc.cloud/tools/salary-take-home-calculator",
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
    "datePublished": "2026-07-26"
  }

  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-zinc-950 text-zinc-900 dark:text-zinc-100 font-[family-name:var(--font-geist-sans)] transition-colors">
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
      <main className="max-w-4xl mx-auto px-4 py-8 sm:py-12">
        <Breadcrumbs toolName="Salary Calculator" toolSlug="salary-take-home-calculator" />
        <div className="text-center max-w-2xl mx-auto mb-8">
          <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-zinc-900 dark:text-white mb-4">
            Salary Calculator: Take-Home Pay After Tax (US, Canada & Pakistan)
          </h1>
          {/* Tight 50-70 word stand-alone direct-answer paragraph */}
          <p className="text-base sm:text-lg text-zinc-600 dark:text-zinc-400 leading-relaxed font-medium">
            If you are wondering how much is my salary after tax, this free tool provides the answers you need. Take-home pay is the net amount of earnings an employee receives in their paycheck after all mandatory deductions are subtracted from their gross salary. These standard reductions primarily include progressive federal income taxes, local provincial or state taxes, and essential payroll contributions such as social security, government pensions, and employment insurance.
          </p>
        </div>

        <ShareButtons url="https://quickcalc.cloud/tools/salary-take-home-calculator" title="Salary Calculator: Take-Home Pay After Tax" />
        <EmbedWidget url="https://quickcalc.cloud/tools/salary-take-home-calculator" title="Salary Calculator: Take-Home Pay After Tax" />

        {/* The interactive widget */}
        <section className="my-8">
          <SalaryTakeHomeCalculatorWidget />
        </section>

        {/* Ad Placement 1 */}
        <div className="ad-slot ad-slot--inline" data-ad-position="in-content-1">
          <div className="ad-placeholder-label border border-dashed border-zinc-300 dark:border-zinc-800 rounded-xl py-4 flex items-center justify-center bg-zinc-50/50 dark:bg-zinc-950/20 text-[10px] font-bold text-zinc-400 dark:text-zinc-600 uppercase tracking-widest cursor-default">
            Advertisement
          </div>
        </div>

        {/* Detailed Explanation */}
        <article className="prose prose-zinc dark:prose-invert max-w-3xl mx-auto space-y-8 mt-12 border-t border-zinc-200 dark:border-zinc-800 pt-10">
          <section className="space-y-4">
            <h2 className="text-2xl font-bold text-zinc-950 dark:text-white">
              About Our Take-Home Pay and Net Salary Calculator
            </h2>
            <p className="text-zinc-600 dark:text-zinc-400 leading-relaxed">
              Gross pay represents the absolute total compensation agreed upon with an employer, while net pay is the actual cash deposited into a bank account. Our dynamic multi-country tool computes these differences side-by-side, providing an instantaneous breakdown of how federal taxes and social programs affect your income across the United States, Canada, and Pakistan.
            </p>
            <p className="text-zinc-600 dark:text-zinc-400 leading-relaxed">
              Tax systems differ significantly across international borders. In the United States, progressive federal income brackets are combined with payroll taxes under the Federal Insurance Contributions Act (FICA) to fund Social Security and Medicare. Canada structures its system using progressive federal brackets alongside the Canada Pension Plan (CPP) and Employment Insurance (EI). For comparative financial planning, individuals comparing global offers may also utilize our <Link href="/tools/currency-converter" className="text-teal-600 dark:text-teal-400 underline hover:text-teal-700">currency converter</Link> to analyze take-home amounts in standard baseline units.
            </p>
            <p className="text-zinc-600 dark:text-zinc-400 leading-relaxed">
              In Pakistan, salaried individuals are subject to progressive slabs defined annually by the Federal Board of Revenue (FBR). Unlike North American systems, Pakistan has fewer non-tax payroll deductions, placing the primary deduction emphasis almost entirely on direct income tax slabs. Since local and state taxes vary heavily, this calculator uses simplified national average rates to provide a rapid, clean overview without requiring complex provincial select boxes.
            </p>
          </section>

          {/* Ad Placement 2 */}
          <div className="ad-slot ad-slot--inline" data-ad-position="in-content-2">
            <div className="ad-placeholder-label border border-dashed border-zinc-300 dark:border-zinc-800 rounded-xl py-4 flex items-center justify-center bg-zinc-50/50 dark:bg-zinc-950/20 text-[10px] font-bold text-zinc-400 dark:text-zinc-600 uppercase tracking-widest cursor-default">
              Advertisement
            </div>
          </div>

          {/* FAQ section */}
          <section className="space-y-4 border-t border-zinc-200 dark:border-zinc-800 pt-8">
            <h2 className="text-2xl font-bold text-zinc-950 dark:text-white border-b border-zinc-100 dark:border-zinc-900 pb-2">
              Frequently Asked Questions (FAQ)
            </h2>
            <div className="space-y-6">
              <div className="space-y-2">
                <h3 className="text-base font-bold text-zinc-900 dark:text-zinc-100">
                  How do I calculate my net take-home salary after taxes?
                </h3>
                <p className="text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed">
                  To find out how much is my salary after tax, enter your annual or hourly gross wage into our calculator, select your country, and let the tool estimate your final net income. The calculator automatically applies federal brackets and standard social program contributions to show your actual earnings.
                </p>
              </div>

              <div className="space-y-2">
                <h3 className="text-base font-bold text-zinc-900 dark:text-zinc-100">
                  What is the difference between my gross salary and net pay?
                </h3>
                <p className="text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed">
                  The gross vs net salary difference represents what you earn before deductions versus what you actually take home. Gross salary is the full amount agreed with your employer before taxes, whereas net salary is the actual amount paid to you after income tax, payroll deductions, and social contributions.
                </p>
              </div>

              <div className="space-y-2">
                <h3 className="text-base font-bold text-zinc-900 dark:text-zinc-100">
                  How do I estimate my biweekly or monthly take-home pay from an annual salary?
                </h3>
                <p className="text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed">
                  To learn how to calculate take-home pay, start with your gross salary and deduct progressive federal income taxes, local state or provincial taxes, and payroll deductions (like FICA in the US or CPP and EI in Canada). Our calculator automates this complex math to give you a clear net estimate in seconds.
                </p>
              </div>
            </div>
          </section>
        </article>

        <RelatedTools currentSlug="salary-take-home-calculator" />

        {/* Ad Placement Footer */}
        <div className="ad-slot ad-slot--footer mt-12" data-ad-position="footer">
          <div className="ad-placeholder-label border border-dashed border-zinc-300 dark:border-zinc-800 rounded-xl py-4 flex items-center justify-center bg-zinc-50/50 dark:bg-zinc-950/20 text-[10px] font-bold text-zinc-400 dark:text-zinc-600 uppercase tracking-widest cursor-default">
            Advertisement
          </div>
        </div>
      </main>

      {/* Footer */}
      <Footer customText="Precise, side-by-side international salary modeling." />
    </div>
  );
}
