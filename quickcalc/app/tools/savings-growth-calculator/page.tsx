import Navbar from "@/components/Navbar";
import { generateSoftwareAppSchema } from "@/lib/schema";
import RelatedTools from "@/components/RelatedTools";
import ShareButtons from "@/components/ShareButtons";
import EmbedWidget from "@/components/EmbedWidget";

import Breadcrumbs from "@/components/Breadcrumbs";
import type { Metadata } from "next";
import Link from "next/link";
import SavingsGrowthCalculatorWidget from "./SavingsGrowthCalculatorWidget";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "Savings Growth Calculator - Free Compound Interest Tool",
  description: "Calculate compound interest savings growth with our free tool. Set regular monthly or yearly deposits and trace interest growth over time easily.",
  alternates: {
    canonical: "/tools/savings-growth-calculator",
  },
  openGraph: {
    title: "Savings Growth Calculator - Free Compound Interest Tool",
    description: "Calculate compound interest savings growth with our free tool. Set regular monthly or yearly deposits and trace interest growth over time easily.",
    url: "https://quickcalc.cloud/tools/savings-growth-calculator",
    type: "website",
    siteName: "QuickCalc",
    images: [
      {
        url: "https://quickcalc.cloud/og-image.png",
        width: 1200,
        height: 630,
        alt: "Savings Growth Calculator on QuickCalc",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Savings Growth Calculator - Free Compound Interest Tool",
    description: "Calculate compound interest savings growth with our free tool. Set regular monthly or yearly deposits and trace interest growth over time easily.",
    images: ["https://quickcalc.cloud/og-image.png"],
  },
};

export default function SavingsGrowthCalculatorPage({ searchParams }: { searchParams?: { embed?: string } }) {
  const softwareSchema = generateSoftwareAppSchema({
    name: "Savings Growth Calculator - Free Compound Interest Tool",
    description: "Calculate compound interest savings growth with our free tool. Set regular monthly or yearly deposits and trace interest growth over time easily.",
    slug: "savings-growth-calculator",
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
          <SavingsGrowthCalculatorWidget />
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
        "name": "How much will my savings grow over 10 years with compound interest?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "How much your savings will grow with compound interest depends on your initial deposit, interest rate, contribution frequency, and timeframe. By continuously reinvesting your earnings, compound interest creates a powerful snowball effect that accelerates your balance growth over the years."
        }
      },
      {
        "@type": "Question",
        "name": "How do I calculate how long it will take to reach my savings goal?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "To calculate how long to reach a savings goal, use our calculator to see how your regular monthly contributions and compound interest combine over time. By adjusting the rate of return and monthly contribution amounts, you can find the exact timeline needed to hit your target."
        }
      },
      {
        "@type": "Question",
        "name": "How do I calculate monthly compound interest on my savings account?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Our compound interest calculator monthly mode allows you to model regular monthly deposits and see how compounding monthly accelerates your returns. Because interest compounds twelve times a year, your savings grow faster than they would with annual compounding."
        }
      }
    ]
  };

  const articleData = {
    "@context": "https://schema.org",
    "@type": "Article",
    "headline": "Savings Growth Calculator: Compound Interest with Regular Contributions",
    "description": "Calculate and analyze compound interest growth. Visualize your contributions vs interest earned and view complete annual breakdown charts.",
    "publisher": {
      "@type": "Organization",
      "name": "QuickCalc",
      "logo": {
        "@type": "ImageObject",
        "url": "https://quickcalc.cloud/og-image.png"
      }
    }
  };

  const softwareData = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    "name": "Savings Growth Calculator",
    "operatingSystem": "All",
    "applicationCategory": "FinanceApplication",
    "offers": {
      "@type": "Offer",
      "price": "0",
      "priceCurrency": "USD"
    }
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
      {/* Software Application Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(softwareData) }}
      />

      {/* Header */}
      <Navbar />

      {/* Main Content */}
      <main className="max-w-4xl mx-auto px-4 py-8 sm:py-12">
        <Breadcrumbs toolName="Savings Growth Calculator" toolSlug="savings-growth-calculator" />
        <div className="text-center max-w-2xl mx-auto mb-8">
          <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-zinc-900 dark:text-white mb-4">
            Savings Growth Calculator: Compound Interest with Regular Contributions
          </h1>

          {/* AI-extractable direct answer summary */}
          <p className="text-sm sm:text-base font-semibold text-teal-700 dark:text-teal-300 bg-teal-500/5 border border-teal-500/20 rounded-xl px-4 py-3 leading-relaxed mb-4 text-left">
            This free tool calculates compound interest savings growth over time with initial principal and monthly recurring deposits.
          </p>
          {/* Direct-answer paragraph (50-70 words) immediately after H1 */}
          <p className="text-base sm:text-lg text-zinc-600 dark:text-zinc-400 leading-relaxed font-semibold max-w-2xl mx-auto border-l-4 border-teal-500 pl-4 text-left">
            If you want to know how much will my savings grow with compound interest, our free tool is here to help. Compound interest is the interest calculated on your initial savings deposit plus all previously accumulated interest. This process creates a powerful exponential growth loop because your interest continuously generates new earnings, causing your overall savings balance to accelerate dramatically over time compared to simple interest structures, which only calculate returns on the starting principal.
          </p>
        </div>

        <ShareButtons url="https://quickcalc.cloud/tools/savings-growth-calculator" title="Savings Growth Calculator" />
        <EmbedWidget url="https://quickcalc.cloud/tools/savings-growth-calculator" title="Savings Growth Calculator" />

        {/* The interactive widget */}
        <section className="my-8">
          <SavingsGrowthCalculatorWidget />
        </section>

        {/* Ad Placement 1 */}
        <div className="ad-slot ad-slot--inline" data-ad-position="in-content-1">
          <div className="ad-placeholder-label border border-dashed border-zinc-300 dark:border-zinc-800 rounded-xl py-4 flex items-center justify-center bg-zinc-50/50 dark:bg-zinc-950/20 text-[10px] font-bold text-zinc-400 dark:text-zinc-600 uppercase tracking-widest cursor-default">
            Advertisement
          </div>
        </div>

        {/* Detailed Explanation Section */}
        <article className="prose prose-zinc dark:prose-invert max-w-3xl mx-auto space-y-8 mt-12 border-t border-zinc-200 dark:border-zinc-800 pt-10">
          <section className="space-y-4">
            <h2 className="text-2xl font-bold text-zinc-950 dark:text-white">
              About Our Compound Interest Savings Growth Calculator
            </h2>
            <p className="text-zinc-600 dark:text-zinc-400 leading-relaxed">
              Our professional Savings Growth Calculator is designed to map your long-term wealth trajectory accurately. This calculator employs the standard compound interest formula to show how your assets compile. Specifically, the formula is:
            </p>
            <div className="bg-zinc-100 dark:bg-zinc-900 p-4 rounded-lg overflow-x-auto text-center font-mono text-sm text-teal-600 dark:text-teal-400">
              A = P(1 + r/n)^(nt) + PMT × [((1 + r/n)^(nt) - 1) / (r/n)]
            </div>
            <p className="text-zinc-600 dark:text-zinc-400 leading-relaxed mt-2">
              Where the variables represent:
            </p>
            <ul className="list-disc pl-6 text-zinc-600 dark:text-zinc-400 space-y-2">
              <li>
                <strong>A:</strong> The final total savings balance after compounding.
              </li>
              <li>
                <strong>P:</strong> The initial deposit (your principal lump sum).
              </li>
              <li>
                <strong>r:</strong> The annual interest rate (as a decimal fraction).
              </li>
              <li>
                <strong>n:</strong> The compounding frequency per year (1 for annual, 12 for monthly, 365 for daily).
              </li>
              <li>
                <strong>t:</strong> The total time period in years.
              </li>
              <li>
                <strong>PMT:</strong> The regular recurring contribution amount (monthly or yearly).
              </li>
            </ul>
            <p className="text-zinc-600 dark:text-zinc-400 leading-relaxed">
              Compounding frequency dictates how rapidly your money multiplies. For example, monthly compounding earns interest slightly faster than annual compounding because your accrued interest starts generating its own interest after just one month, rather than at the end of the year. Over several decades, this small variation creates thousands of dollars in difference.
            </p>
            <p className="text-zinc-600 dark:text-zinc-400 leading-relaxed">
              When planning your financial future, remember that starting early matters far more than contributing larger sums later on. Thanks to exponential compounding, a 20-year-old who saves $100 monthly until retirement will accumulate substantially more money than a 40-year-old saving $300 monthly, simply because the 20-year-old's funds benefit from decades of compounding interest. However, real-world purchasing power changes over time, so it is highly recommended to check our <Link href="/tools/inflation-calculator" className="text-teal-600 dark:text-teal-400 font-semibold hover:underline">Inflation Calculator</Link> to analyze how future returns should be considered after accounting for inflation.
            </p>
          </section>

          {/* Ad Placement 2 */}
          <div className="ad-slot ad-slot--inline" data-ad-position="in-content-2">
            <div className="ad-placeholder-label border border-dashed border-zinc-300 dark:border-zinc-800 rounded-xl py-4 flex items-center justify-center bg-zinc-50/50 dark:bg-zinc-950/20 text-[10px] font-bold text-zinc-400 dark:text-zinc-600 uppercase tracking-widest cursor-default">
              Advertisement
            </div>
          </div>

          {/* FAQ Section */}
          <section className="space-y-4 border-t border-zinc-200 dark:border-zinc-800 pt-8">
            <h2 className="text-2xl font-bold text-zinc-950 dark:text-white border-b border-zinc-100 dark:border-zinc-900 pb-2">
              Frequently Asked Questions (FAQ)
            </h2>
            <div className="space-y-6">
              <div className="space-y-2">
                <h3 className="text-base font-bold text-zinc-900 dark:text-zinc-100">
                  How much will my savings grow over 10 years with compound interest?
                </h3>
                <p className="text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed">
                  How much your savings will grow with compound interest depends on your initial deposit, interest rate, contribution frequency, and timeframe. By continuously reinvesting your earnings, compound interest creates a powerful snowball effect that accelerates your balance growth over the years.
                </p>
              </div>

              <div className="space-y-2">
                <h3 className="text-base font-bold text-zinc-900 dark:text-zinc-100">
                  How do I calculate how long it will take to reach my savings goal?
                </h3>
                <p className="text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed">
                  To calculate how long to reach a savings goal, use our calculator to see how your regular monthly contributions and compound interest combine over time. By adjusting the rate of return and monthly contribution amounts, you can find the exact timeline needed to hit your target.
                </p>
              </div>

              <div className="space-y-2">
                <h3 className="text-base font-bold text-zinc-900 dark:text-zinc-100">
                  How do I calculate monthly compound interest on my savings account?
                </h3>
                <p className="text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed">
                  Our compound interest calculator monthly mode allows you to model regular monthly deposits and see how compounding monthly accelerates your returns. Because interest compounds twelve times a year, your savings grow faster than they would with annual compounding.
                </p>
              </div>
            </div>
          </section>
        </article>

        <RelatedTools currentSlug="savings-growth-calculator" />

        {/* Ad Placement Footer */}
        <div className="ad-slot ad-slot--footer mt-12" data-ad-position="footer">
          <div className="ad-placeholder-label border border-dashed border-zinc-300 dark:border-zinc-800 rounded-xl py-4 flex items-center justify-center bg-zinc-50/50 dark:bg-zinc-950/20 text-[10px] font-bold text-zinc-400 dark:text-zinc-600 uppercase tracking-widest cursor-default">
            Advertisement
          </div>
        </div>
      </main>

      {/* Footer */}
      <Footer customText="Professional, compound-interest savings and wealth projections." />
    </div>
  );
}
