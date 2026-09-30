import React from "react";
import type { Metadata } from "next";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import PaycheckHubClient from "./PaycheckHubClient";
import { STATES_TAX_DATA, FEDERAL_2026 } from "@/lib/taxData";
import { formatCurrency } from "@/lib/calculators/creditCardPayoffCalculator";
import {
  Sparkles,
  Building2,
  HelpCircle,
  BookOpen,
  ShieldCheck,
  Scale,
  Percent,
  CheckCircle2,
} from "lucide-react";

export const metadata: Metadata = {
  title: "Paycheck Calculator by State 2026 - All 50 US States Take-Home Pay Hub | QuickCalc",
  description:
    "Calculate your take-home pay for any US state in 2026. Explore our free 50-state paycheck calculator engine with federal tax brackets, state income taxes (0% no-tax, flat, progressive), and FICA withholdings.",
  alternates: {
    canonical: "https://quickcalc.cloud/calculators/paycheck-calculator",
  },
  openGraph: {
    title: "Paycheck Calculator by State 2026 - All 50 US States Take-Home Pay Hub | QuickCalc",
    description:
      "Calculate your take-home pay for any US state in 2026. Compare net pay, state tax rates (0% no tax states, flat tax, progressive), and FICA deductions.",
    url: "https://quickcalc.cloud/calculators/paycheck-calculator",
    type: "website",
    siteName: "QuickCalc",
    images: [
      {
        url: "https://quickcalc.cloud/og-image.png",
        width: 1200,
        height: 630,
        alt: "US State Paycheck Calculators Hub",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Paycheck Calculator by State 2026 - All 50 US States Take-Home Pay Hub | QuickCalc",
    description:
      "Calculate your take-home pay across all 50 US states for 2026 with our free salary and hourly calculator engine.",
  },
};

export default function PaycheckCalculatorHubPage() {
  // SoftwareApplication Schema
  const softwareSchema = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: "50-State US Paycheck Calculator Hub",
    description:
      "Comprehensive programmatic tax calculation engine estimating net take-home pay for all 50 US states under 2026 tax law.",
    applicationCategory: "FinanceApplication",
    operatingSystem: "All",
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "USD",
    },
    url: "https://quickcalc.cloud/calculators/paycheck-calculator",
  };

  // FAQPage Schema
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: "Which US states have no personal state income tax?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "There are 9 US states with no general personal income tax on earned wages: Texas, Florida, Nevada, Washington, Tennessee, Wyoming, South Dakota, Alaska, and New Hampshire. Workers in these states only pay Federal income taxes and FICA (Social Security & Medicare).",
        },
      },
      {
        "@type": "Question",
        name: "How is take-home pay calculated from gross salary?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Gross pay is reduced by: (1) Federal Income Tax (marginal brackets 10% to 37% after standard deduction), (2) Social Security (6.2% up to $184,500 wage base limit in 2026), (3) Medicare (1.45% plus 0.9% additional for high earners), (4) State & local income taxes, and (5) voluntary pre-tax deductions like 401(k) and health insurance.",
        },
      },
      {
        "@type": "Question",
        name: "What is the 2026 Federal Standard Deduction?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "For the 2026 tax year, the projected IRS Standard Deduction is $15,000 for Single filers, $30,000 for Married Filing Jointly, and $22,500 for Head of Household. This amount of your annual income is completely shielded from federal income tax.",
        },
      },
      {
        "@type": "Question",
        name: "What is the difference between Flat Tax and Progressive Tax states?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Flat tax states (like Illinois at 4.95%, Pennsylvania at 3.07%, Indiana at 3.05%) tax all income at the exact same percentage regardless of how much you earn. Progressive tax states (like California, New York, New Jersey) use marginal tax brackets where higher income tiers are taxed at progressively higher percentages.",
        },
      },
    ],
  };

  // Breadcrumb Schema
  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Home",
        item: "https://quickcalc.cloud/",
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "Paycheck Calculators",
        item: "https://quickcalc.cloud/calculators/paycheck-calculator",
      },
    ],
  };

  const noTaxStates = STATES_TAX_DATA.filter((s) => !s.hasIncomeTax);

  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-zinc-950 text-zinc-900 dark:text-zinc-100 font-sans transition-colors selection:bg-emerald-500/20 selection:text-emerald-700">
      {/* Schema Injections */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(softwareSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />

      <Navbar />

      <main className="max-w-6xl mx-auto px-4 sm:px-6 py-8 sm:py-12">
        {/* Breadcrumb Navigation */}
        <nav
          aria-label="Breadcrumb"
          className="mb-6 flex items-center justify-between gap-4 text-xs text-zinc-500 dark:text-zinc-400"
        >
          <ol className="flex flex-wrap items-center gap-2 font-medium">
            <li>
              <Link
                href="/"
                className="hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors"
              >
                Home
              </Link>
            </li>
            <li className="select-none text-zinc-300 dark:text-zinc-700 font-normal">&gt;</li>
            <li className="text-zinc-900 dark:text-zinc-100 font-semibold truncate">
              Paycheck Calculators Hub
            </li>
          </ol>
        </nav>

        {/* Hero Header */}
        <div className="mb-10 text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold bg-emerald-100 dark:bg-emerald-950/70 text-emerald-800 dark:text-emerald-300 border border-emerald-300/40">
            <Sparkles className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
            <span>Updated for 2026 Federal & State Tax Rules</span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-zinc-900 dark:text-white leading-tight">
            US Paycheck Calculator{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-600 to-teal-500">
              by State
            </span>
          </h1>

          <p className="text-base sm:text-lg text-zinc-600 dark:text-zinc-400 leading-relaxed">
            Accurately calculate your take-home salary or hourly wages across all 50 US states. Compare net pay after 2026 Federal income tax brackets, state income taxes, Social Security, and Medicare withholdings.
          </p>
        </div>

        {/* Interactive Hub Component: Benchmark & Search & 50-State Grid */}
        <PaycheckHubClient states={STATES_TAX_DATA} />

        {/* Educational Content & 0% State Tax Showcase */}
        <article className="mt-16 space-y-12 border-t border-zinc-200 dark:border-zinc-800 pt-12 text-zinc-800 dark:text-zinc-200 leading-relaxed">
          {/* Section: The 9 States with No Income Tax */}
          <section className="space-y-4">
            <div className="flex items-center gap-2 text-emerald-600 dark:text-emerald-400 text-sm font-semibold tracking-wide uppercase">
              <Percent className="w-4 h-4" />
              <span>Tax Advantages</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-zinc-900 dark:text-white">
              The 9 US States with No Personal Income Tax in 2026
            </h2>
            <p className="text-zinc-600 dark:text-zinc-400">
              Living and working in a state without personal income tax can save an individual anywhere from $2,500 to over $10,000 every single year compared to high-tax states like California, New York, or New Jersey. The following 9 states do not tax earned wage income:
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2">
              {noTaxStates.map((st) => (
                <Link
                  key={st.slug}
                  href={`/calculators/paycheck-calculator/${st.slug}`}
                  className="p-4 rounded-2xl bg-white dark:bg-zinc-900 border border-teal-200/80 dark:border-teal-900/50 hover:border-teal-500 shadow-sm transition-all group"
                >
                  <div className="flex items-center justify-between mb-1">
                    <span className="font-bold text-zinc-900 dark:text-white group-hover:text-teal-600 dark:group-hover:text-teal-400 transition-colors">
                      {st.name} ({st.abbrev})
                    </span>
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-teal-100 text-teal-800 dark:bg-teal-950 dark:text-teal-300">
                      0% Tax
                    </span>
                  </div>
                  <p className="text-xs text-zinc-500 dark:text-zinc-400 line-clamp-2">
                    {st.description}
                  </p>
                </Link>
              ))}
            </div>
          </section>

          {/* Section: How Taxes are Deducted from Your Paycheck */}
          <section className="space-y-4">
            <div className="flex items-center gap-2 text-emerald-600 dark:text-emerald-400 text-sm font-semibold tracking-wide uppercase">
              <BookOpen className="w-4 h-4" />
              <span>Payroll Math</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-zinc-900 dark:text-white">
              How Your Take-Home Pay is Calculated
            </h2>
            <p className="text-zinc-600 dark:text-zinc-400">
              Your paycheck is calculated through a sequential series of statutory deductions governed by federal and state tax codes:
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="p-5 rounded-2xl bg-white dark:bg-zinc-900 border border-zinc-200/80 dark:border-zinc-800 space-y-2">
                <div className="flex items-center gap-2 text-emerald-600 dark:text-emerald-400 font-semibold text-sm">
                  <Scale className="w-4 h-4" />
                  <span>1. Federal Income Tax Withholding</span>
                </div>
                <p className="text-xs text-zinc-600 dark:text-zinc-400 leading-relaxed">
                  Based on IRS Publication 15-T and your W-4 elections. The 2026 standard deduction is {formatCurrency(FEDERAL_2026.STANDARD_DEDUCTION.single)} for Single and {formatCurrency(FEDERAL_2026.STANDARD_DEDUCTION.married_joint)} for Married Filing Jointly, followed by marginal brackets of 10%, 12%, 22%, 24%, 32%, 35%, and 37%.
                </p>
              </div>

              <div className="p-5 rounded-2xl bg-white dark:bg-zinc-900 border border-zinc-200/80 dark:border-zinc-800 space-y-2">
                <div className="flex items-center gap-2 text-blue-600 dark:text-blue-400 font-semibold text-sm">
                  <ShieldCheck className="w-4 h-4" />
                  <span>2. FICA Taxes (Social Security & Medicare)</span>
                </div>
                <p className="text-xs text-zinc-600 dark:text-zinc-400 leading-relaxed">
                  Federal Insurance Contributions Act: 6.2% Social Security on income up to the 2026 limit of {formatCurrency(FEDERAL_2026.SS_WAGE_BASE)}, and 1.45% Medicare on all earnings (plus 0.9% surtax for high earners exceeding $200k).
                </p>
              </div>

              <div className="p-5 rounded-2xl bg-white dark:bg-zinc-900 border border-zinc-200/80 dark:border-zinc-800 space-y-2">
                <div className="flex items-center gap-2 text-purple-600 dark:text-purple-400 font-semibold text-sm">
                  <Building2 className="w-4 h-4" />
                  <span>3. State & Local Income Taxes</span>
                </div>
                <p className="text-xs text-zinc-600 dark:text-zinc-400 leading-relaxed">
                  Depending on your state of residence and employment, state withholding is computed either as $0 (no tax states), a flat single rate (e.g. 4.95% in IL, 3.07% in PA), or graduated tiers (e.g. up to 13.3% in CA or 10.9% in NY).
                </p>
              </div>

              <div className="p-5 rounded-2xl bg-white dark:bg-zinc-900 border border-zinc-200/80 dark:border-zinc-800 space-y-2">
                <div className="flex items-center gap-2 text-teal-600 dark:text-teal-400 font-semibold text-sm">
                  <CheckCircle2 className="w-4 h-4" />
                  <span>4. Pre-Tax Deductions (401k & Health)</span>
                </div>
                <p className="text-xs text-zinc-600 dark:text-zinc-400 leading-relaxed">
                  Contributions made toward employer-sponsored 401(k) retirement plans and Section 125 health insurance plans bypass federal and state taxable wage bases, providing immediate dollar-for-dollar tax relief.
                </p>
              </div>
            </div>
          </section>

          {/* Section: FAQ */}
          <section className="space-y-6 pt-4">
            <div className="flex items-center gap-2 text-emerald-600 dark:text-emerald-400 text-sm font-semibold tracking-wide uppercase">
              <HelpCircle className="w-4 h-4" />
              <span>Frequently Asked Questions</span>
            </div>
            <h2 className="text-2xl font-bold tracking-tight text-zinc-900 dark:text-white">
              US Paycheck & Payroll Taxes FAQ
            </h2>

            <div className="space-y-4">
              <div className="p-5 rounded-2xl bg-white dark:bg-zinc-900 border border-zinc-200/80 dark:border-zinc-800 shadow-sm space-y-2">
                <h3 className="font-semibold text-zinc-900 dark:text-white text-base">
                  Which US states have no personal state income tax?
                </h3>
                <p className="text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed">
                  There are 9 states with zero state income tax on wage earnings: Texas, Florida, Nevada, Washington, Tennessee, Wyoming, South Dakota, Alaska, and New Hampshire. Workers in these states take home a significantly higher percentage of their paycheck.
                </p>
              </div>

              <div className="p-5 rounded-2xl bg-white dark:bg-zinc-900 border border-zinc-200/80 dark:border-zinc-800 shadow-sm space-y-2">
                <h3 className="font-semibold text-zinc-900 dark:text-white text-base">
                  What is the 2026 Social Security wage cap?
                </h3>
                <p className="text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed">
                  For 2026, the Social Security wage base limit is {formatCurrency(FEDERAL_2026.SS_WAGE_BASE)}. Once your cumulative gross earnings pass this threshold in a calendar year, the 6.2% Social Security withholding drops to 0% for the rest of that year.
                </p>
              </div>

              <div className="p-5 rounded-2xl bg-white dark:bg-zinc-900 border border-zinc-200/80 dark:border-zinc-800 shadow-sm space-y-2">
                <h3 className="font-semibold text-zinc-900 dark:text-white text-base">
                  How does pay frequency affect my take-home pay?
                </h3>
                <p className="text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed">
                  Pay frequency (Annual, Monthly [12], Semi-Monthly [24], Bi-Weekly [26], Weekly [52]) divides your annual salary and annual tax obligations across your payment intervals. While your annual total tax remains identical, bi-weekly pay provides 26 paychecks per year, resulting in two &ldquo;3-paycheck months&rdquo; each year.
                </p>
              </div>
            </div>
          </section>
        </article>
      </main>

      <Footer />
    </div>
  );
}
