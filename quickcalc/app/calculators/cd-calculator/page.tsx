import type { Metadata } from "next";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import AdSlot from "@/components/AdSlot";
import CdCalculatorWidget from "./CdCalculatorWidget";
import {
  Landmark,
  TrendingUp,
  ShieldCheck,
  Building2,
  PiggyBank,
  CreditCard,
  Scale,
  ArrowRight,
  Clock,
  Sparkles,
} from "lucide-react";

export const metadata: Metadata = {
  title: "CD Calculator - Certificate of Deposit Interest & APY Growth | QuickCalc",
  description:
    "Free CD calculator. Instantly calculate Certificate of Deposit maturity value, compound interest earnings (daily/monthly), and post-tax returns.",
  keywords: [
    "cd calculator",
    "certificate of deposit calculator",
    "cd interest calculator",
    "cd apy calculator",
    "cd compound interest calculator",
    "certificate of deposit interest rates",
    "cd early withdrawal penalty",
  ],
  alternates: {
    canonical: "https://quickcalc.cloud/calculators/cd-calculator",
  },
  openGraph: {
    title: "CD Calculator - Certificate of Deposit Interest & APY Growth | QuickCalc",
    description:
      "Calculate Certificate of Deposit maturity value, daily and monthly compound interest, post-tax earnings, and early exit penalties.",
    url: "https://quickcalc.cloud/calculators/cd-calculator",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "CD Calculator - Certificate of Deposit Interest & APY Growth | QuickCalc",
    description:
      "Interactive Certificate of Deposit (CD) calculator with compound frequency options, tax brackets, and penalty simulator.",
  },
};

export default function CdCalculatorPage() {
  const softwareSchema = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: "Certificate of Deposit (CD) Calculator",
    applicationCategory: "FinanceApplication",
    operatingSystem: "All",
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "USD",
    },
    description:
      "Free interactive CD calculator to compute maturity balances, compound interest accrual, tax deductions, and early withdrawal penalties.",
  };

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Home",
        item: "https://quickcalc.cloud",
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "Calculators",
        item: "https://quickcalc.cloud/#all-tools",
      },
      {
        "@type": "ListItem",
        position: 3,
        name: "CD Calculator",
        item: "https://quickcalc.cloud/calculators/cd-calculator",
      },
    ],
  };

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: "How is Certificate of Deposit (CD) interest calculated?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "CD interest is calculated using the compound interest formula: A = P(1 + r/n)^(nt), where P is the principal deposit, r is the annual interest rate, n is the compounding frequency (typically daily or monthly), and t is the term length in years. Over time, interest accumulates on both the initial principal and previously earned interest.",
        },
      },
      {
        "@type": "Question",
        name: "What is the difference between APR and APY on a CD?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "APR (Annual Percentage Rate) is the nominal annual interest rate without considering the effect of compounding during the year. APY (Annual Percentage Yield) reflects the total amount of interest you actually earn over one full year including compounding. APY is always slightly higher than APR when interest compounds more frequently than once a year.",
        },
      },
      {
        "@type": "Question",
        name: "Are Certificate of Deposit earnings taxable?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Yes. In the United States, the IRS treats CD interest as ordinary taxable income in the year it is credited to your account, even if you do not withdraw the money until maturity. Banks issue a Form 1099-INT for interest earned exceeding $10. If the CD is held inside an IRA (Traditional or Roth), taxes are deferred or tax-free.",
        },
      },
      {
        "@type": "Question",
        name: "What happens when a CD reaches maturity?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "When a CD matures, banks usually provide a 7 to 10-day grace period. During this window, you can withdraw your full principal and interest, transfer funds to another account, or roll the money into a new CD. If you take no action, most institutions automatically renew the CD for the same term at the prevailing rate.",
        },
      },
      {
        "@type": "Question",
        name: "How does an early withdrawal penalty work on a CD?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "If you break a CD before its scheduled maturity date, banks penalize you by forfeiting a specific number of days of simple interest. Typical penalties range from 60 to 90 days of interest for terms of 12 months or less, and 180 to 365 days of interest for multi-year terms. In some cases, if you withdraw very early, the penalty can exceed earned interest and reduce your original principal.",
        },
      },
    ],
  };

  return (
    <div className="min-h-screen bg-base text-ink font-sans transition-colors flex flex-col justify-between">
      {/* Schema.org Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(softwareSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      <Navbar />

      <main className="max-w-5xl mx-auto px-4 py-8 sm:py-12 w-full space-y-10">
        {/* Breadcrumb Navigation */}
        <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-xs text-ink-muted">
          <Link href="/" className="hover:text-teal-600 dark:hover:text-teal-400 transition-colors">
            Home
          </Link>
          <span>/</span>
          <Link href="/#all-tools" className="hover:text-teal-600 dark:hover:text-teal-400 transition-colors">
            Calculators
          </Link>
          <span>/</span>
          <span className="text-ink font-bold">CD Calculator</span>
        </nav>

        {/* Page Hero Header (AEO Answer Paragraph) */}
        <div className="space-y-4 text-center sm:text-left">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-teal-500/10 text-teal-700 dark:text-teal-300 border border-teal-500/20">
            <Landmark size={14} />
            <span>Guaranteed Fixed-Income Planner</span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-heading font-extrabold text-ink tracking-tight">
            Certificate of Deposit (CD) Calculator
          </h1>

          <p className="text-sm sm:text-base text-ink-muted max-w-3xl leading-relaxed">
            A <strong>Certificate of Deposit (CD) calculator</strong> helps you project how much interest your savings will accumulate over a fixed term with guaranteed, FDIC-insured returns. Instantly calculate your total maturity payout, daily compounding yield, estimated tax deductions, and premature exit penalty costs.
          </p>
        </div>

        {/* AdSlot Top */}
        <AdSlot slot="tool-top" className="my-4" />

        {/* Interactive CD Calculator Widget */}
        <section aria-label="Interactive CD Calculator Tool">
          <CdCalculatorWidget />
        </section>

        {/* AEO / GEO Deep-Dive & Knowledge Network Section */}
        <section className="space-y-8 text-ink leading-relaxed">
          {/* Key Insights Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-base-card border border-surface-border rounded-3xl p-6 space-y-3">
              <div className="w-10 h-10 rounded-xl bg-teal-500/10 text-teal-600 dark:text-teal-400 flex items-center justify-center border border-teal-500/20">
                <ShieldCheck size={20} />
              </div>
              <h2 className="text-base font-bold text-ink">FDIC &amp; NCUA Insurance</h2>
              <p className="text-xs sm:text-sm text-ink-muted leading-relaxed">
                Standard bank CDs are backed by the full faith and credit of the US government up to $250,000 per depositor, per insured institution. Unlike equities, your initial principal carries zero risk of market volatility.
              </p>
            </div>

            <div className="bg-base-card border border-surface-border rounded-3xl p-6 space-y-3">
              <div className="w-10 h-10 rounded-xl bg-teal-500/10 text-teal-600 dark:text-teal-400 flex items-center justify-center border border-teal-500/20">
                <Clock size={20} />
              </div>
              <h2 className="text-base font-bold text-ink">The CD Ladder Strategy</h2>
              <p className="text-xs sm:text-sm text-ink-muted leading-relaxed">
                Instead of locking all funds into a single multi-year term, divide your capital into rolling 1-year, 2-year, 3-year, and 5-year CDs. A portion of your liquidity unlocks every 12 months, capturing peak interest rates while preserving cash flow.
              </p>
            </div>

            <div className="bg-base-card border border-surface-border rounded-3xl p-6 space-y-3">
              <div className="w-10 h-10 rounded-xl bg-teal-500/10 text-teal-600 dark:text-teal-400 flex items-center justify-center border border-teal-500/20">
                <TrendingUp size={20} />
              </div>
              <h2 className="text-base font-bold text-ink">Tax Impact on Real Yield</h2>
              <p className="text-xs sm:text-sm text-ink-muted leading-relaxed">
                CD interest is taxed at your federal and state marginal income tax rate. If you earn 5.0% APY in a 24% federal tax bracket, your net real yield after taxes is 3.80%. Factor in inflation to measure real purchasing power growth.
              </p>
            </div>
          </div>

          {/* Standard CD Term & Yield Benchmark Table */}
          <div className="bg-base-card border border-surface-border rounded-3xl p-6 sm:p-8 space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-2">
              <div>
                <h2 className="text-xl sm:text-2xl font-heading font-extrabold text-ink">
                  Standard CD Terms &amp; Typical Yield Benchmarks
                </h2>
                <p className="text-xs sm:text-sm text-ink-muted mt-1">
                  How a $10,000 deposit compounds across popular CD maturities at a sample 4.50% APY.
                </p>
              </div>
              <span className="text-xs font-bold text-teal-600 dark:text-teal-400 bg-teal-500/10 px-3 py-1 rounded-full border border-teal-500/20 self-start sm:self-auto">
                Sample 4.5% APY
              </span>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs sm:text-sm">
                <thead>
                  <tr className="border-b border-surface-border bg-surface-muted/40 text-ink-muted">
                    <th className="py-3 px-4 font-bold">CD Term</th>
                    <th className="py-3 px-4 font-bold text-right">Initial Deposit</th>
                    <th className="py-3 px-4 font-bold text-right text-emerald-600 dark:text-emerald-400">
                      Gross Interest
                    </th>
                    <th className="py-3 px-4 font-bold text-right text-teal-600 dark:text-teal-400">
                      Total Payout at Maturity
                    </th>
                    <th className="py-3 px-4 font-bold text-right">Standard Penalty</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-surface-border/60 font-mono">
                  <tr className="hover:bg-surface-muted/30 transition-colors">
                    <td className="py-3 px-4 font-bold text-ink font-sans">3 Months</td>
                    <td className="py-3 px-4 text-right text-ink-muted">$10,000</td>
                    <td className="py-3 px-4 text-right font-bold text-emerald-600 dark:text-emerald-400">
                      +$112.50
                    </td>
                    <td className="py-3 px-4 text-right font-bold text-ink">$10,112.50</td>
                    <td className="py-3 px-4 text-right text-ink-muted font-sans">60-90 Days</td>
                  </tr>
                  <tr className="hover:bg-surface-muted/30 transition-colors">
                    <td className="py-3 px-4 font-bold text-ink font-sans">6 Months</td>
                    <td className="py-3 px-4 text-right text-ink-muted">$10,000</td>
                    <td className="py-3 px-4 text-right font-bold text-emerald-600 dark:text-emerald-400">
                      +$225.00
                    </td>
                    <td className="py-3 px-4 text-right font-bold text-ink">$10,225.00</td>
                    <td className="py-3 px-4 text-right text-ink-muted font-sans">90 Days</td>
                  </tr>
                  <tr className="hover:bg-surface-muted/30 transition-colors bg-teal-500/5">
                    <td className="py-3 px-4 font-bold text-teal-700 dark:text-teal-300 font-sans">1 Year (12 Mo)</td>
                    <td className="py-3 px-4 text-right text-ink-muted">$10,000</td>
                    <td className="py-3 px-4 text-right font-bold text-emerald-600 dark:text-emerald-400">
                      +$459.40
                    </td>
                    <td className="py-3 px-4 text-right font-bold text-teal-700 dark:text-teal-300">
                      $10,459.40
                    </td>
                    <td className="py-3 px-4 text-right text-ink-muted font-sans">90-180 Days</td>
                  </tr>
                  <tr className="hover:bg-surface-muted/30 transition-colors">
                    <td className="py-3 px-4 font-bold text-ink font-sans">2 Years (24 Mo)</td>
                    <td className="py-3 px-4 text-right text-ink-muted">$10,000</td>
                    <td className="py-3 px-4 text-right font-bold text-emerald-600 dark:text-emerald-400">
                      +$939.90
                    </td>
                    <td className="py-3 px-4 text-right font-bold text-ink">$10,939.90</td>
                    <td className="py-3 px-4 text-right text-ink-muted font-sans">180 Days</td>
                  </tr>
                  <tr className="hover:bg-surface-muted/30 transition-colors">
                    <td className="py-3 px-4 font-bold text-ink font-sans">3 Years (36 Mo)</td>
                    <td className="py-3 px-4 text-right text-ink-muted">$10,000</td>
                    <td className="py-3 px-4 text-right font-bold text-emerald-600 dark:text-emerald-400">
                      +$1,442.94
                    </td>
                    <td className="py-3 px-4 text-right font-bold text-ink">$11,442.94</td>
                    <td className="py-3 px-4 text-right text-ink-muted font-sans">180-270 Days</td>
                  </tr>
                  <tr className="hover:bg-surface-muted/30 transition-colors">
                    <td className="py-3 px-4 font-bold text-ink font-sans">5 Years (60 Mo)</td>
                    <td className="py-3 px-4 text-right text-ink-muted">$10,000</td>
                    <td className="py-3 px-4 text-right font-bold text-emerald-600 dark:text-emerald-400">
                      +$2,517.59
                    </td>
                    <td className="py-3 px-4 text-right font-bold text-ink">$12,517.59</td>
                    <td className="py-3 px-4 text-right text-ink-muted font-sans">270-365 Days</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          {/* Contextual Internal Linking & Financial Network Architecture */}
          <div className="bg-surface-muted/60 border border-surface-border rounded-3xl p-6 sm:p-8 space-y-6">
            <div>
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-teal-500/10 text-teal-700 dark:text-teal-300 border border-teal-500/20 mb-2">
                <Sparkles size={13} />
                <span>QuickCalc Holistic Financial Suite</span>
              </div>
              <h2 className="text-xl sm:text-2xl font-heading font-extrabold text-ink">
                How CDs Fit Into Your Wealth &amp; Debt Strategy
              </h2>
              <p className="text-xs sm:text-sm text-ink-muted mt-1 max-w-3xl leading-relaxed">
                A Certificate of Deposit is a conservative anchor in a diversified financial blueprint. Explore how it integrates with long-term retirement runway, tax planning, and debt elimination:
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {/* Backlink 1: Savings Runway & Retirement */}
              <Link
                href="/calculators/how-long-will-my-money-last"
                className="group p-5 rounded-2xl bg-base-card border border-surface-border hover:border-teal-500/50 shadow-xs hover:shadow-lg transition-all flex flex-col justify-between"
              >
                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-teal-600 dark:text-teal-400">
                    <PiggyBank size={18} />
                    <span className="font-bold text-sm text-ink group-hover:text-teal-600 dark:group-hover:text-teal-400">
                      Savings Runway &amp; Retirement
                    </span>
                  </div>
                  <p className="text-xs text-ink-muted leading-relaxed">
                    Using a CD ladder to protect 2-3 years of living expenses? Simulate your complete cash depletion runway with inflation and safe withdrawal rates (SWR).
                  </p>
                </div>
                <div className="mt-4 pt-3 border-t border-surface-border/60 text-xs font-bold text-teal-600 dark:text-teal-400 inline-flex items-center gap-1">
                  <span>Simulate Runway</span>
                  <ArrowRight size={13} className="group-hover:translate-x-1 transition-transform" />
                </div>
              </Link>

              {/* Backlink 2: Dave Ramsey Investment Calculator */}
              <Link
                href="/calculators/ramsey-investment-calculator"
                className="group p-5 rounded-2xl bg-base-card border border-surface-border hover:border-emerald-500/50 shadow-xs hover:shadow-lg transition-all flex flex-col justify-between"
              >
                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-emerald-600 dark:text-emerald-400">
                    <TrendingUp size={18} />
                    <span className="font-bold text-sm text-ink group-hover:text-emerald-600 dark:group-hover:text-emerald-400">
                      Ramsey Investment Calculator
                    </span>
                  </div>
                  <p className="text-xs text-ink-muted leading-relaxed">
                    Fixed 4-5% CD yields offer safety, but equities offer compound wealth. Compare CD growth against Dave Ramsey&apos;s 15% rule and recommended 4-fund portfolio.
                  </p>
                </div>
                <div className="mt-4 pt-3 border-t border-surface-border/60 text-xs font-bold text-emerald-600 dark:text-emerald-400 inline-flex items-center gap-1">
                  <span>Compare 15% Rule</span>
                  <ArrowRight size={13} className="group-hover:translate-x-1 transition-transform" />
                </div>
              </Link>

              {/* Backlink 3: US State Paycheck Hub */}
              <Link
                href="/calculators/paycheck-calculator"
                className="group p-5 rounded-2xl bg-base-card border border-surface-border hover:border-blue-500/50 shadow-xs hover:shadow-lg transition-all flex flex-col justify-between"
              >
                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-blue-600 dark:text-blue-400">
                    <Building2 size={18} />
                    <span className="font-bold text-sm text-ink group-hover:text-blue-600 dark:group-hover:text-blue-400">
                      US State Paycheck Calculators
                    </span>
                  </div>
                  <p className="text-xs text-ink-muted leading-relaxed">
                    CD interest is subject to state and federal income tax. Calculate your true marginal bracket and net take-home salary across all 50 US states.
                  </p>
                </div>
                <div className="mt-4 pt-3 border-t border-surface-border/60 text-xs font-bold text-blue-600 dark:text-blue-400 inline-flex items-center gap-1">
                  <span>Calculate State Taxes</span>
                  <ArrowRight size={13} className="group-hover:translate-x-1 transition-transform" />
                </div>
              </Link>

              {/* Backlink 4: Credit Card Payoff Calculator */}
              <Link
                href="/calculators/credit-card-payoff-calculator"
                className="group p-5 rounded-2xl bg-base-card border border-surface-border hover:border-rose-500/50 shadow-xs hover:shadow-lg transition-all flex flex-col justify-between"
              >
                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-rose-600 dark:text-rose-400">
                    <CreditCard size={18} />
                    <span className="font-bold text-sm text-ink group-hover:text-rose-600 dark:group-hover:text-rose-400">
                      Credit Card Payoff Calculator
                    </span>
                  </div>
                  <p className="text-xs text-ink-muted leading-relaxed">
                    Earning 5% on a CD while carrying credit card debt at 22% APR costs you 17% in negative net spread. See how fast extra cash eliminates high-APR debt.
                  </p>
                </div>
                <div className="mt-4 pt-3 border-t border-surface-border/60 text-xs font-bold text-rose-600 dark:text-rose-400 inline-flex items-center gap-1">
                  <span>Pay Off Cards</span>
                  <ArrowRight size={13} className="group-hover:translate-x-1 transition-transform" />
                </div>
              </Link>

              {/* Backlink 5: Debt Snowball vs Avalanche */}
              <Link
                href="/calculators/debt-snowball-vs-avalanche-calculator"
                className="group p-5 rounded-2xl bg-base-card border border-surface-border hover:border-indigo-500/50 shadow-xs hover:shadow-lg transition-all flex flex-col justify-between"
              >
                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-indigo-600 dark:text-indigo-400">
                    <Scale size={18} />
                    <span className="font-bold text-sm text-ink group-hover:text-indigo-600 dark:group-hover:text-indigo-400">
                      Debt Snowball vs Avalanche
                    </span>
                  </div>
                  <p className="text-xs text-ink-muted leading-relaxed">
                    Prioritizing guaranteed emergency savings vs debt elimination? Compare the psychological snowball and mathematical avalanche payoff roadmaps.
                  </p>
                </div>
                <div className="mt-4 pt-3 border-t border-surface-border/60 text-xs font-bold text-indigo-600 dark:text-indigo-400 inline-flex items-center gap-1">
                  <span>Compare Strategies</span>
                  <ArrowRight size={13} className="group-hover:translate-x-1 transition-transform" />
                </div>
              </Link>

              {/* Backlink 6: Hourly to Salary Converter */}
              <Link
                href="/calculators/hourly-to-salary-calculator"
                className="group p-5 rounded-2xl bg-base-card border border-surface-border hover:border-cyan-500/50 shadow-xs hover:shadow-lg transition-all flex flex-col justify-between"
              >
                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-cyan-600 dark:text-cyan-400">
                    <Clock size={18} />
                    <span className="font-bold text-sm text-ink group-hover:text-cyan-600 dark:group-hover:text-cyan-400">
                      Hourly to Salary Converter
                    </span>
                  </div>
                  <p className="text-xs text-ink-muted leading-relaxed">
                    Determine how many hours of work or bonus income are needed to build a fully funded 6-month Certificate of Deposit reserve.
                  </p>
                </div>
                <div className="mt-4 pt-3 border-t border-surface-border/60 text-xs font-bold text-cyan-600 dark:text-cyan-400 inline-flex items-center gap-1">
                  <span>Convert Wages</span>
                  <ArrowRight size={13} className="group-hover:translate-x-1 transition-transform" />
                </div>
              </Link>
            </div>
          </div>
        </section>

        {/* AdSlot Bottom */}
        <AdSlot slot="tool-bottom" className="my-8" />
      </main>

      <Footer customText="Calculate Certificate of Deposit interest, maturity balance, compounding yield, and early exit penalties." />
    </div>
  );
}
