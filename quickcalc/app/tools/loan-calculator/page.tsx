import RelatedTools from "@/components/RelatedTools";
import ShareButtons from "@/components/ShareButtons";
import ThemeToggle from "@/components/ThemeToggle";
import Breadcrumbs from "@/components/Breadcrumbs";
import type { Metadata } from "next";
import Link from "next/link";
import LoanCalculatorWidget from "./LoanCalculatorWidget";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "Loan / EMI Calculator - Scientific Loan Amortization Schedule | QuickCalc",
  description: "Calculate your monthly loan EMI, total interest, and total payment. View a complete year-by-year amortization schedule for mortgages and loans. 100% free.",
  alternates: {
    canonical: "/tools/loan-calculator",
  },
  openGraph: {
    title: "Loan / EMI Calculator - Scientific Loan Amortization Schedule | QuickCalc",
    description: "Calculate your monthly loan EMI, total interest, and total payment. View a complete year-by-year amortization schedule for mortgages and loans. 100% free.",
    url: "https://quickcalc.cloud/tools/loan-calculator",
    type: "website",
    siteName: "QuickCalc",
    images: [
      {
        url: "https://quickcalc.cloud/og-image.png",
        width: 1200,
        height: 630,
        alt: "Loan / EMI Calculator on QuickCalc",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Loan / EMI Calculator - Scientific Loan Amortization Schedule | QuickCalc",
    description: "Calculate your monthly loan EMI, total interest, and total payment. View a complete year-by-year amortization schedule for mortgages and loans. 100% free.",
    images: ["https://quickcalc.cloud/og-image.png"],
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
      },
      {
        "@type": "Question",
        "name": "What is an amortization schedule?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "An amortization schedule is a complete table showing periodic loan payments. It details how much of each payment goes toward the principal balance versus how much goes toward interest, tracking the reducing balance over the entire life of the loan."
        }
      }
    ]
  };

  const softwareData = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    "name": "Loan/EMI Calculator",
    "operatingSystem": "All",
    "applicationCategory": "FinanceApplication",
    "offers": {
      "@type": "Offer",
      "price": "0",
      "priceCurrency": "USD"
    }
  };

  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-zinc-950 text-zinc-900 dark:text-zinc-100 font-[family-name:var(--font-geist-sans)] transition-colors">
      {/* FAQ Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqData) }}
      />
      {/* Software Application Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(softwareData) }}
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
            <span className="text-sm font-medium text-zinc-300 dark:text-zinc-700">|</span>
            <span className="text-sm font-medium text-zinc-400 dark:text-zinc-600">Loan Calculator</span>
            <span className="text-sm font-medium text-zinc-300 dark:text-zinc-700 font-normal">|</span>
            <ThemeToggle />
          </nav>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-4xl mx-auto px-4 py-8 sm:py-12">
        <Breadcrumbs toolName="Loan / EMI Calculator" toolSlug="loan-calculator" />
        <div className="text-center max-w-2xl mx-auto mb-8">
          <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-zinc-900 dark:text-white mb-4">
            Loan / EMI Calculator
          </h1>
          <p className="text-base sm:text-lg text-zinc-600 dark:text-zinc-400 leading-relaxed">
            The Loan / EMI Calculator is a professional financial tool designed to help you accurately compute monthly installment payments, total interest liabilities, and overall repayment schedules.
          </p>
        </div>

        <ShareButtons url="https://quickcalc.cloud/tools/loan-calculator" title="Loan / EMI Calculator" />

        {/* The interactive widget */}
        <section className="my-8">
          <LoanCalculatorWidget />
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
              About this Loan/EMI Calculator
            </h2>
            <p className="text-zinc-600 dark:text-zinc-400 leading-relaxed">
              Managing personal finances requires a clear understanding of debt obligation and long-term liabilities. Whether purchasing a new family home, leasing a vehicle, or financing educational tuition, borrowing money represents a major commitment. Knowing exactly how much you will pay each month—and how much of that payment goes towards interest versus original principal—is critical for budgeting.
            </p>
            <p className="text-zinc-600 dark:text-zinc-400 leading-relaxed">
              Unlike other generic web-based converters that gate accurate analysis, QuickCalc offers this tool <strong>100% free with absolutely zero sign-ins, zero email capture, and zero hidden paywalls</strong>. We believe critical financial modeling and decision-making tools should be fully accessible to everyone instantly.
            </p>
            <p className="text-zinc-600 dark:text-zinc-400 leading-relaxed">
              Our Loan and Equated Monthly Installment (EMI) Calculator uses standard banking amortization algorithms to map out your repayment trajectory. The calculator relies on the reducing-balance methodology. In this arrangement, interest is computed at periodic intervals solely on the outstanding principal balance.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-bold text-zinc-950 dark:text-white">
              How is this calculated?
            </h2>
            <p className="text-zinc-600 dark:text-zinc-400 leading-relaxed">
              The monthly payment (EMI) is calculated using the standard reducing balance loan formula:
            </p>
            <div className="bg-zinc-100 dark:bg-zinc-900 p-4 rounded-lg overflow-x-auto text-center font-mono text-sm text-emerald-600 dark:text-emerald-400">
              EMI = [P × r × (1 + r)^n] / [(1 + r)^n - 1]
            </div>
            <p className="text-zinc-600 dark:text-zinc-400 leading-relaxed mt-2">
              Where the variables represent:
            </p>
            <ul className="list-disc pl-6 text-zinc-600 dark:text-zinc-400 space-y-2">
              <li>
                <strong>P (Principal):</strong> The total amount of money borrowed.
              </li>
              <li>
                <strong>r (Monthly Interest Rate):</strong> Calculated as <code>Annual Interest Rate / (12 × 100)</code>. For instance, an 8% annual rate translates to a monthly rate of <code>0.08 / 12 = 0.00667</code>.
              </li>
              <li>
                <strong>n (Total Number of Months):</strong> The complete term of the loan expressed in months (e.g., 5 years = 60 months).
              </li>
            </ul>
            <p className="text-zinc-600 dark:text-zinc-400 leading-relaxed">
              The monthly interest is calculated as <code>Outstanding Principal × r</code>, and the principal portion of that month's payment is <code>EMI - Monthly Interest</code>. This monthly principal amount is then subtracted from the remaining principal balance, reducing the basis for the subsequent month's interest calculation.
            </p>
          </section>

          {/* Ad Placement 2 */}
          <div className="ad-slot ad-slot--inline" data-ad-position="in-content-2">
            <div className="ad-placeholder-label border border-dashed border-zinc-300 dark:border-zinc-800 rounded-xl py-4 flex items-center justify-center bg-zinc-50/50 dark:bg-zinc-950/20 text-[10px] font-bold text-zinc-400 dark:text-zinc-600 uppercase tracking-widest cursor-default">
              Advertisement
            </div>
          </div>

          {/* FAQ open style matching Age Calculator and Currency Converter */}
          <section className="space-y-4 border-t border-zinc-200 dark:border-zinc-800 pt-8">
            <h2 className="text-2xl font-bold text-zinc-950 dark:text-white border-b border-zinc-100 dark:border-zinc-900 pb-2">
              Frequently Asked Questions (FAQ)
            </h2>
            <div className="space-y-6">
              <div className="space-y-2">
                <h3 className="text-base font-bold text-zinc-900 dark:text-zinc-100">
                  What is an EMI?
                </h3>
                <p className="text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed">
                  EMI stands for Equated Monthly Installment. It is a fixed payment amount made by a borrower to a lender at a specified date each calendar month. EMIs consist of both interest and principal components, structured to fully pay off the loan over a set number of years.
                </p>
              </div>

              <div className="space-y-2">
                <h3 className="text-base font-bold text-zinc-900 dark:text-zinc-100">
                  How is loan interest calculated?
                </h3>
                <p className="text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed">
                  Most standard consumer loans and mortgages use a reducing balance method. In this method, the interest rate is applied to the remaining principal balance at the end of each month, rather than the initial principal. As you pay off your principal, the interest portion of your EMI decreases.
                </p>
              </div>

              <div className="space-y-2">
                <h3 className="text-base font-bold text-zinc-900 dark:text-zinc-100">
                  Can I pay off my loan early to save on interest?
                </h3>
                <p className="text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed">
                  Yes! Making prepayments or paying off a loan early directly reduces the outstanding principal balance. This can dramatically lower the total interest you pay and shorten your loan term. However, you should check with your lender for any prepayment penalty clauses.
                </p>
              </div>

              <div className="space-y-2">
                <h3 className="text-base font-bold text-zinc-900 dark:text-zinc-100">
                  What is an amortization schedule?
                </h3>
                <p className="text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed">
                  An amortization schedule is a complete table showing periodic loan payments. It details how much of each payment goes toward the principal balance versus how much goes toward interest, tracking the reducing balance over the entire life of the loan.
                </p>
              </div>
            </div>
          </section>
        </article>

        <RelatedTools currentSlug="loan-calculator" />

        {/* Ad Placement Footer */}
        <div className="ad-slot ad-slot--footer mt-12" data-ad-position="footer">
          <div className="ad-placeholder-label border border-dashed border-zinc-300 dark:border-zinc-800 rounded-xl py-4 flex items-center justify-center bg-zinc-50/50 dark:bg-zinc-950/20 text-[10px] font-bold text-zinc-400 dark:text-zinc-600 uppercase tracking-widest cursor-default">
            Advertisement
          </div>
        </div>
      </main>

      {/* Footer */}
      <Footer customText="Professional, reducing-balance finance modeling." />
    </div>
  );
}
