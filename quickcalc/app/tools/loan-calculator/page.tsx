import ThemeToggle from "@/components/ThemeToggle";

import Breadcrumbs from "@/components/Breadcrumbs";

import type { Metadata } from "next";
import Link from "next/link";
import LoanCalculatorWidget from "./LoanCalculatorWidget";
import Footer from "@/components/Footer";
import AdSlot from "@/components/AdSlot";

export const metadata: Metadata = {
  title: "Loan / EMI Calculator - Calculate Payments & Amortization",
  description: "Calculate your monthly loan EMI, total interest, and total payment. View a complete year-by-year amortization schedule for mortgages and loans.",
  alternates: {
    canonical: "/tools/loan-calculator",
  },
};

export default function LoanCalculatorPage() {
  const faqData = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      {
        "@type": "Question",
        "name": "What is an EMI?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "EMI stands for Equated Monthly Installment. It is a fixed payment amount made by a borrower to a lender at a specified date each calendar month. EMIs consist of both interest and principal components, structured to fully pay off the loan over a set number of years."
        }
      },
      {
        "@type": "Question",
        "name": "How is loan interest calculated?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Most standard consumer loans and mortgages use a reducing balance method. In this method, the interest rate is applied to the remaining principal balance at the end of each month, rather than the initial principal. As you pay off your principal, the interest portion of your EMI decreases."
        }
      },
      {
        "@type": "Question",
        "name": "Can I pay off my loan early to save on interest?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Yes! Making prepayments or paying off a loan early directly reduces the outstanding principal balance. This can dramatically lower the total interest you pay and shorten your loan term. However, you should check with your lender for any prepayment penalty clauses."
        }
      }
    ]
  };

  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-zinc-950 text-zinc-900 dark:text-zinc-100 font-[family-name:var(--font-geist-sans)]">
      {/* JSON-LD Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqData) }}
      />

      {/* Navigation Header */}
      <header className="border-b border-zinc-200 dark:border-zinc-800 bg-white/80 dark:bg-zinc-900/80 backdrop-blur-md sticky top-0 z-50">
        <div className="max-w-4xl mx-auto px-4 h-16 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2 font-bold text-lg text-teal-600 dark:text-teal-400">
            <span>💵 QuickCalc</span>
          </Link>
          <nav className="flex gap-4">
            <Link href="/" className="text-sm font-medium text-zinc-600 dark:text-zinc-400 hover:text-teal-600 dark:hover:text-teal-400 transition-colors">
              Home
            </Link>
            <span className="text-sm font-medium text-zinc-300 dark:text-zinc-700">|</span>
            <span className="text-sm font-medium text-zinc-400 dark:text-zinc-600">Loan Calculator</span>
            <span className="text-sm font-medium text-zinc-300 dark:text-zinc-700 font-normal">|</span>
            <ThemeToggle />
          </nav>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="max-w-4xl mx-auto px-4 py-8 sm:py-12">
        <Breadcrumbs toolName="Loan / EMI Calculator" toolSlug="loan-calculator" />
        <div className="text-center max-w-2xl mx-auto mb-8">
          <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-zinc-900 dark:text-white mb-4">
            Loan / EMI Calculator
          </h1>
          <p className="text-base sm:text-lg text-zinc-600 dark:text-zinc-400 leading-relaxed">
            The Loan / EMI Calculator is a professional financial tool designed to help you accurately compute monthly installment payments, total interest liabilities, and overall repayment schedules. By inputs like your total principal amount, annual interest rate, and preferred loan term (supporting both years and months toggles), this free calculator gives you immediate breakdown clarity. Complete with a year-by-year amortization schedule, this tool is ideal for auto loans, home mortgages, and personal loans.
          </p>
        </div>

        {/* Interactive Calculator Widget Component */}
        <section className="my-8">
          <LoanCalculatorWidget />
        </section>

        {/* AdSense Placement Ad-Slot-Inline */}
        <AdSlot slot="loan-calculator-inline" />

        {/* Detailed Article Sections */}
        <article className="prose prose-zinc dark:prose-invert max-w-3xl mx-auto space-y-8 mt-12 border-t border-zinc-200 dark:border-zinc-800 pt-10">
          <section className="space-y-4">
            <h2 className="text-2xl font-bold text-zinc-950 dark:text-white">
              About this calculator
            </h2>
            <p className="text-zinc-600 dark:text-zinc-400 leading-relaxed">
              Managing personal finances requires a clear understanding of debt obligation and long-term liabilities. Whether purchasing a new family home, leasing a vehicle, or financing educational tuition, borrowing money represents a major commitment. Knowing exactly how much you will pay each month—and how much of that payment goes towards interest versus original principal—is critical for budgeting.
            </p>
            <p className="text-zinc-600 dark:text-zinc-400 leading-relaxed">
              Our Loan and Equated Monthly Installment (EMI) Calculator uses standard banking amortization algorithms to map out your repayment trajectory. The calculator relies on the reducing-balance methodology. In this arrangement, interest is computed at periodic intervals solely on the outstanding principal balance. Consequently, as you progress through your term and gradually chip away at your core balance, a larger percentage of your fixed monthly EMI is allocated directly to principal repayment, accelerating your equity building.
            </p>
            <p className="text-zinc-600 dark:text-zinc-400 leading-relaxed">
              The amortization schedule provided below the calculation result illustrates this trend year-by-year. Reviewing this table helps you visualize the true cost of borrowing over time. Borrowers can leverage this tool to compare loan offers from different financial institutions, decide between a shorter or longer tenure, or assess the ultimate cost benefits of securing a marginally lower annual interest rate.
            </p>
          </section>

          {/* FAQ Accordion Section */}
          <section className="space-y-4 border-t border-zinc-200 dark:border-zinc-800 pt-8">
            <h2 className="text-2xl font-bold text-zinc-950 dark:text-white">
              Frequently Asked Questions (FAQ)
            </h2>
            <div className="space-y-3">
              <details className="group border border-zinc-200 dark:border-zinc-800 rounded-lg p-4 bg-white dark:bg-zinc-900 transition-all duration-150 [&_summary::-webkit-details-marker]:hidden">
                <summary className="flex justify-between items-center font-semibold text-zinc-800 dark:text-zinc-200 cursor-pointer focus:outline-none">
                  <span>What is an EMI?</span>
                  <span className="transition group-open:rotate-180 text-zinc-400 dark:text-zinc-500">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" className="w-5 h-5">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
                    </svg>
                  </span>
                </summary>
                <p className="text-zinc-600 dark:text-zinc-400 mt-3 text-sm leading-relaxed">
                  EMI stands for Equated Monthly Installment. It is a fixed payment amount made by a borrower to a lender at a specified date each calendar month. EMIs consist of both interest and principal components, structured to fully pay off the loan over a set number of years.
                </p>
              </details>

              <details className="group border border-zinc-200 dark:border-zinc-800 rounded-lg p-4 bg-white dark:bg-zinc-900 transition-all duration-150 [&_summary::-webkit-details-marker]:hidden">
                <summary className="flex justify-between items-center font-semibold text-zinc-800 dark:text-zinc-200 cursor-pointer focus:outline-none">
                  <span>How is loan interest calculated?</span>
                  <span className="transition group-open:rotate-180 text-zinc-400 dark:text-zinc-500">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" className="w-5 h-5">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
                    </svg>
                  </span>
                </summary>
                <p className="text-zinc-600 dark:text-zinc-400 mt-3 text-sm leading-relaxed">
                  Most standard consumer loans and mortgages use a reducing balance method. In this method, the interest rate is applied to the remaining principal balance at the end of each month, rather than the initial principal. As you pay off your principal, the interest portion of your EMI decreases.
                </p>
              </details>

              <details className="group border border-zinc-200 dark:border-zinc-800 rounded-lg p-4 bg-white dark:bg-zinc-900 transition-all duration-150 [&_summary::-webkit-details-marker]:hidden">
                <summary className="flex justify-between items-center font-semibold text-zinc-800 dark:text-zinc-200 cursor-pointer focus:outline-none">
                  <span>Can I pay off my loan early to save on interest?</span>
                  <span className="transition group-open:rotate-180 text-zinc-400 dark:text-zinc-500">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" className="w-5 h-5">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
                    </svg>
                  </span>
                </summary>
                <p className="text-zinc-600 dark:text-zinc-400 mt-3 text-sm leading-relaxed">
                  Yes! Making prepayments or paying off a loan early directly reduces the outstanding principal balance. This can dramatically lower the total interest you pay and shorten your loan term. However, you should check with your lender for any prepayment penalty clauses.
                </p>
              </details>
            </div>
          </section>
        </article>

        {/* Related Tools Area */}
        <section className="max-w-3xl mx-auto border-t border-zinc-200 dark:border-zinc-800 mt-12 pt-8">
          <h3 className="text-xl font-bold text-zinc-900 dark:text-white mb-6">
            Related Health & Lifestyle Tools
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 p-5 rounded-xl hover:shadow-md transition duration-200">
              <span className="text-2xl mb-2 block">💧</span>
              <h4 className="font-bold text-zinc-900 dark:text-white text-base">Water Intake Calculator</h4>
              <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-2">
                Calculate your optimal hydration targets based on weight and activity.
              </p>
              <Link href="/tools/water-intake-calculator" className="inline-block text-xs font-semibold text-teal-500 dark:text-teal-400 mt-4 hover:underline">
                Use Tool &rarr;
              </Link>
            </div>

            <div className="border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 p-5 rounded-xl hover:shadow-md transition duration-200">
              <span className="text-2xl mb-2 block">🎓</span>
              <h4 className="font-bold text-zinc-900 dark:text-white text-base">GPA Converter</h4>
              <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-2">
                Convert percentage marks or letter grades into the standard US 4.0 scale.
              </p>
              <Link href="/tools/gpa-converter" className="inline-block text-xs font-semibold text-teal-500 dark:text-teal-400 mt-4 hover:underline">
                Use Tool &rarr;
              </Link>
            </div>

            <div className="border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 p-5 rounded-xl hover:shadow-md transition duration-200">
              <span className="text-2xl mb-2 block">🌙</span>
              <h4 className="font-bold text-zinc-900 dark:text-white text-base">Sleep Calculator</h4>
              <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-2">
                Calculate optimal sleep cycles and waking hours to prevent morning grogginess.
              </p>
              <Link href="/tools/sleep-cycle-calculator" className="inline-block text-xs font-semibold text-teal-500 dark:text-teal-400 mt-4 hover:underline">
                Use Tool &rarr;
              </Link>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <Footer customText="Professional, reducing-balance finance modeling." />
    </div>
  );
}
