import RelatedTools from "@/components/RelatedTools";
import ShareButtons from "@/components/ShareButtons";
import ThemeToggle from "@/components/ThemeToggle";
import Breadcrumbs from "@/components/Breadcrumbs";
import type { Metadata } from "next";
import Link from "next/link";
import SalaryTakeHomeCalculatorWidget from "./SalaryTakeHomeCalculatorWidget";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "Salary Calculator: Take-Home Pay After Tax | QuickCalc",
  description: "Calculate your estimated net take-home salary after taxes & payroll deductions in the US, Canada, and Pakistan. Fast, side-by-side comparison.",
  alternates: {
    canonical: "/tools/salary-take-home-calculator",
  },
  openGraph: {
    title: "Salary Calculator: Take-Home Pay After Tax | QuickCalc",
    description: "Calculate your estimated net take-home salary after taxes & payroll deductions in the US, Canada, and Pakistan. Fast, side-by-side comparison.",
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
    title: "Salary Calculator: Take-Home Pay After Tax | QuickCalc",
    description: "Calculate your estimated net take-home salary after taxes & payroll deductions in the US, Canada, and Pakistan. Fast, side-by-side comparison.",
    images: ["https://quickcalc.cloud/og-image.png"],
  },
};

export default function SalaryTakeHomeCalculatorPage() {
  const faqData = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      {
        "@type": "Question",
        "name": "What is the difference between gross pay and net pay?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Gross pay represents the total amount of money an employee earns before any deductions or taxes are withheld by the employer. Net pay, commonly referred to as take-home pay, is the actual amount of money an employee receives in their paycheck after all income taxes, payroll taxes, social security contributions, and voluntary deductions are subtracted."
        }
      },
      {
        "@type": "Question",
        "name": "How much tax is deducted from my salary in the US?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "In the United States, salary deductions include progressive federal income tax ranging from 10% to 37% depending on tax brackets, along with federal payroll taxes. These federal payroll taxes consist of a 6.2% Social Security tax up to the annual wage limit and a 1.45% Medicare tax. Employees may also face additional state and local income taxes depending on their specific location."
        }
      },
      {
        "@type": "Question",
        "name": "Does this calculator include state or provincial tax?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "This salary calculator utilizes simplified national figures and standard averages rather than exact localized brackets. For the United States, calculations are federal-only and do not include state or municipal income taxes. For Canada, calculations include a simplified flat average provincial tax rate of 10% in addition to the progressive federal tax brackets."
        }
      },
      {
        "@type": "Question",
        "name": "What deductions come out of my paycheck besides income tax?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Besides standard income tax, a typical paycheck is subject to mandatory social and insurance contributions. In the United States, these payroll taxes include Social Security and Medicare under the Federal Insurance Contributions Act. In Canada, payroll deductions include the Canada Pension Plan contribution and the Employment Insurance premium."
        }
      },
      {
        "@type": "Question",
        "name": "How is take-home pay calculated in Pakistan?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "In Pakistan, salary take-home pay is determined by applying the progressive income tax slabs set by the Federal Board of Revenue for salaried individuals. Salaries below 600,000 PKR annually are completely exempt from tax, while income above that threshold is taxed across progressive brackets with rates ranging from 5% up to 35%."
        }
      },
      {
        "@type": "Question",
        "name": "Why does my actual paycheck differ from this estimate?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Actual paycheck figures often differ from standard online estimates because of localized state or provincial income taxes, individual tax credits, and custom filing statuses. Furthermore, individual employers may deduct pre-tax or post-tax amounts for health insurance premiums, retirement fund contributions, union dues, or other customized workplace benefits."
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
  };

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
      <header className="border-b border-zinc-200 dark:border-zinc-800 bg-white/80 dark:bg-zinc-900/80 backdrop-blur-md sticky top-0 z-50 transition-colors">
        <div className="max-w-4xl mx-auto px-4 h-16 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2 font-bold text-lg text-teal-600 dark:text-teal-400">
            <span>💵 QuickCalc</span>
          </Link>
          <nav className="flex items-center gap-2 sm:gap-4">
            <Link href="/" className="text-sm font-medium text-zinc-600 dark:text-zinc-400 hover:text-teal-600 dark:hover:text-teal-400 transition-colors">
              Home
            </Link>
            <Link href="/blog" className="text-sm font-medium text-zinc-600 dark:text-zinc-400 hover:text-teal-600 dark:hover:text-teal-400 transition-colors">
              Blog
            </Link>
            <span className="text-sm font-medium text-zinc-300 dark:text-zinc-700 font-normal">|</span>
            <span className="text-sm font-medium text-zinc-400 dark:text-zinc-600">Salary Calculator</span>
            <span className="text-sm font-medium text-zinc-300 dark:text-zinc-700 font-normal">|</span>
            <ThemeToggle />
          </nav>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-4xl mx-auto px-4 py-8 sm:py-12">
        <Breadcrumbs toolName="Salary Calculator" toolSlug="salary-take-home-calculator" />
        <div className="text-center max-w-2xl mx-auto mb-8">
          <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-zinc-900 dark:text-white mb-4">
            Salary Calculator: Take-Home Pay After Tax (US, Canada & Pakistan)
          </h1>
          {/* Tight 50-70 word stand-alone direct-answer paragraph */}
          <p className="text-base sm:text-lg text-zinc-600 dark:text-zinc-400 leading-relaxed font-medium">
            Take-home pay is the net amount of earnings an employee receives in their paycheck after all mandatory deductions are subtracted from their gross salary. These standard reductions primarily include progressive federal income taxes, local provincial or state taxes, and essential payroll contributions such as social security, government pensions, and employment insurance.
          </p>
        </div>

        <ShareButtons url="https://quickcalc.cloud/tools/salary-take-home-calculator" title="Salary Calculator: Take-Home Pay After Tax" />

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
              About this calculator
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
                  What is the difference between gross pay and net pay?
                </h3>
                <p className="text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed">
                  Gross pay represents the total amount of money an employee earns before any deductions or taxes are withheld by the employer. Net pay, commonly referred to as take-home pay, is the actual amount of money an employee receives in their paycheck after all income taxes, payroll taxes, social security contributions, and voluntary deductions are subtracted.
                </p>
              </div>

              <div className="space-y-2">
                <h3 className="text-base font-bold text-zinc-900 dark:text-zinc-100">
                  How much tax is deducted from my salary in the US?
                </h3>
                <p className="text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed">
                  In the United States, salary deductions include progressive federal income tax ranging from 10% to 37% depending on tax brackets, along with federal payroll taxes. These federal payroll taxes consist of a 6.2% Social Security tax up to the annual wage limit and a 1.45% Medicare tax. Employees may also face additional state and local income taxes depending on their specific location.
                </p>
              </div>

              <div className="space-y-2">
                <h3 className="text-base font-bold text-zinc-900 dark:text-zinc-100">
                  Does this calculator include state or provincial tax?
                </h3>
                <p className="text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed">
                  This salary calculator utilizes simplified national figures and standard averages rather than exact localized brackets. For the United States, calculations are federal-only and do not include state or municipal income taxes. For Canada, calculations include a simplified flat average provincial tax rate of 10% in addition to the progressive federal tax brackets.
                </p>
              </div>

              <div className="space-y-2">
                <h3 className="text-base font-bold text-zinc-900 dark:text-zinc-100">
                  What deductions come out of my paycheck besides income tax?
                </h3>
                <p className="text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed">
                  Besides standard income tax, a typical paycheck is subject to mandatory social and insurance contributions. In the United States, these payroll taxes include Social Security and Medicare under the Federal Insurance Contributions Act. In Canada, payroll deductions include the Canada Pension Plan contribution and the Employment Insurance premium.
                </p>
              </div>

              <div className="space-y-2">
                <h3 className="text-base font-bold text-zinc-900 dark:text-zinc-100">
                  How is take-home pay calculated in Pakistan?
                </h3>
                <p className="text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed">
                  In Pakistan, salary take-home pay is determined by applying the progressive income tax slabs set by the Federal Board of Revenue for salaried individuals. Salaries below 600,000 PKR annually are completely exempt from tax, while income above that threshold is taxed across progressive brackets with rates ranging from 5% up to 35%.
                </p>
              </div>

              <div className="space-y-2">
                <h3 className="text-base font-bold text-zinc-900 dark:text-zinc-100">
                  Why does my actual paycheck differ from this estimate?
                </h3>
                <p className="text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed">
                  Actual paycheck figures often differ from standard online estimates because of localized state or provincial income taxes, individual tax credits, and custom filing statuses. Furthermore, individual employers may deduct pre-tax or post-tax amounts for health insurance premiums, retirement fund contributions, union dues, or other customized workplace benefits.
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
