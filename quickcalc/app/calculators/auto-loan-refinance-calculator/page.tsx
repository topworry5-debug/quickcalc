import type { Metadata } from "next";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import AdSlot from "@/components/AdSlot";
import AutoLoanCalculatorWidget from "./AutoLoanCalculatorWidget";
import {
  Car,
  TrendingUp,
  CreditCard,
  Building2,
  Clock,
  Sparkles,
  ArrowRight,
  ShieldCheck,
  Zap,
  Scale,
  Home,
} from "lucide-react";

export const metadata: Metadata = {
  title: "Auto Loan Refinance & Payoff Calculator | QuickCalc",
  description:
    "Free auto loan refinance calculator. Compare your current car loan against new rates, calculate monthly savings, break-even point, and total interest saved.",
  keywords: [
    "auto loan refinance calculator",
    "car loan refinance calculator",
    "auto refinance calculator with extra payments",
    "car loan break even calculator",
    "should I refinance my car loan",
    "auto loan payoff calculator",
    "car refinance interest savings",
  ],
  alternates: {
    canonical: "https://quickcalc.cloud/calculators/auto-loan-refinance-calculator",
  },
  openGraph: {
    title: "Auto Loan Refinance & Payoff Calculator | QuickCalc",
    description:
      "Calculate monthly payment reductions, lifetime interest saved, and exact break-even months when refinancing your auto loan.",
    url: "https://quickcalc.cloud/calculators/auto-loan-refinance-calculator",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Auto Loan Refinance & Payoff Calculator | QuickCalc",
    description:
      "Interactive auto refinance comparison with break-even analysis and accelerated extra payment modeling.",
  },
};

export default function AutoLoanRefinancePage() {
  const softwareSchema = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: "Auto Loan Refinance & Payoff Calculator",
    applicationCategory: "FinanceApplication",
    operatingSystem: "All",
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "USD",
    },
    description:
      "Free interactive auto refinance calculator to compute monthly savings, break-even period, and accelerated payoff schedules.",
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
        name: "Auto Loan Refinance Calculator",
        item: "https://quickcalc.cloud/calculators/auto-loan-refinance-calculator",
      },
    ],
  };

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: "When should I refinance my car loan?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "You should consider refinancing your car loan if: 1) Your credit score has improved by 30+ points since you took out the original loan; 2) National interest rates have dropped; 3) Your original loan was financed through a dealership with marked-up rates; or 4) You need to lower your mandatory monthly payment to ease cash flow. It rarely makes sense to refinance if your loan is almost paid off or if you owe more than the car is worth (negative equity).",
        },
      },
      {
        "@type": "Question",
        name: "How is the break-even point on an auto refinance calculated?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "The break-even point is the number of months required for your monthly payment savings to offset the upfront fees of refinancing (such as title transfer and administrative fees). Formula: Break-Even (Months) = Total Refinance Fees / Monthly Savings. For example, if fees are $150 and you save $25 per month, your break-even point is exactly 6 months.",
        },
      },
      {
        "@type": "Question",
        name: "How does refinancing an auto loan affect my credit score?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Refinancing causes a temporary dip of 2 to 5 points due to a hard credit inquiry. However, all auto loan inquiries made within a 14 to 45-day shopping window are bundled as a single inquiry by FICO and VantageScore models. Over time, making on-time payments on the new lower-interest loan will build and strengthen your overall credit profile.",
        },
      },
      {
        "@type": "Question",
        name: "Can I refinance if I owe more than the car is worth (negative equity)?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Most lenders limit auto refinancing to a maximum Loan-to-Value (LTV) ratio of 100% to 125% of the vehicle's Kelley Blue Book or NADA value. If you are underwater (negative equity), you may need to pay down a lump sum of principal to qualify for prime refinance rates.",
        },
      },
      {
        "@type": "Question",
        name: "What is the danger of extending my loan term when refinancing?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Extending your term (e.g. stretching a remaining 36-month loan back to 60 or 72 months) will dramatically lower your monthly payment, but it can actually increase the total lifetime interest you pay even with a lower APR. To maximize true wealth building, keep the new refinance term equal to or shorter than your remaining months.",
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
          <span className="text-ink font-bold">Auto Loan Refinance</span>
        </nav>

        {/* Page Hero Header (AEO Answer Paragraph) */}
        <div className="space-y-4 text-center sm:text-left">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-teal-500/10 text-teal-700 dark:text-teal-300 border border-teal-500/20">
            <Car size={14} />
            <span>Vehicle Debt Optimization Suite</span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-heading font-extrabold text-ink tracking-tight">
            Auto Loan Refinance &amp; Payoff Calculator
          </h1>

          <p className="text-sm sm:text-base text-ink-muted max-w-3xl leading-relaxed">
            An <strong>auto loan refinance calculator</strong> helps drivers determine if replacing their current car loan with a lower-interest loan will reduce monthly payments and overall interest costs. Instantly calculate your monthly savings, break-even timeline, and the accelerated debt-free date achieved by applying extra principal payments.
          </p>
        </div>

        {/* AdSlot Top */}
        <AdSlot slot="tool-top" className="my-4" />

        {/* Interactive Auto Loan Calculator Widget */}
        <section aria-label="Interactive Auto Loan Refinance Calculator Tool">
          <AutoLoanCalculatorWidget />
        </section>

        {/* AEO / GEO Deep-Dive & Knowledge Network Section */}
        <section className="space-y-8 text-ink leading-relaxed">
          {/* Key Insights Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-base-card border border-surface-border rounded-3xl p-6 space-y-3">
              <div className="w-10 h-10 rounded-xl bg-teal-500/10 text-teal-600 dark:text-teal-400 flex items-center justify-center border border-teal-500/20">
                <ShieldCheck size={20} />
              </div>
              <h2 className="text-base font-bold text-ink">The Break-Even Principle</h2>
              <p className="text-xs sm:text-sm text-ink-muted leading-relaxed">
                Refinancing involves minimal title, lien recording, and transfer fees ($100-$300). If your monthly savings are $30, you recover a $150 fee in just 5 months. Every month beyond that is pure cash savings.
              </p>
            </div>

            <div className="bg-base-card border border-surface-border rounded-3xl p-6 space-y-3">
              <div className="w-10 h-10 rounded-xl bg-teal-500/10 text-teal-600 dark:text-teal-400 flex items-center justify-center border border-teal-500/20">
                <Clock size={20} />
              </div>
              <h2 className="text-base font-bold text-ink">Keep Your Term Tight</h2>
              <p className="text-xs sm:text-sm text-ink-muted leading-relaxed">
                Resist the temptation to restart a 72-month or 84-month loan. While it makes monthly payments tiny, cars depreciate rapidly, putting you at severe risk of negative equity (being &ldquo;upside-down&rdquo; on your loan).
              </p>
            </div>

            <div className="bg-base-card border border-surface-border rounded-3xl p-6 space-y-3">
              <div className="w-10 h-10 rounded-xl bg-teal-500/10 text-teal-600 dark:text-teal-400 flex items-center justify-center border border-teal-500/20">
                <Zap size={20} />
              </div>
              <h2 className="text-base font-bold text-ink">The Extra Payment Booster</h2>
              <p className="text-xs sm:text-sm text-ink-muted leading-relaxed">
                Even an extra $50 to $100 per month goes 100% toward principal reduction on simple-interest auto loans. This can shave 6 to 12 months off your debt and save hundreds in interest charges.
              </p>
            </div>
          </div>

          {/* APR Reduction & Savings Benchmark Table */}
          <div className="bg-base-card border border-surface-border rounded-3xl p-6 sm:p-8 space-y-6">
            <div>
              <h2 className="text-xl sm:text-2xl font-heading font-extrabold text-ink">
                Auto Refinance Savings Benchmarks ($25,000 Loan Balance)
              </h2>
              <p className="text-xs sm:text-sm text-ink-muted mt-1">
                How much interest and monthly cash flow you save when refinancing a 48-month car loan at various rate reductions.
              </p>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs sm:text-sm">
                <thead>
                  <tr className="border-b border-surface-border bg-surface-muted/40 text-ink-muted">
                    <th className="py-3 px-4 font-bold">Current Rate</th>
                    <th className="py-3 px-4 font-bold text-emerald-700 dark:text-emerald-300">
                      New Refinance Rate
                    </th>
                    <th className="py-3 px-4 font-bold text-right">Old Monthly Pay</th>
                    <th className="py-3 px-4 font-bold text-right text-emerald-600 dark:text-emerald-400">
                      New Monthly Pay
                    </th>
                    <th className="py-3 px-4 font-bold text-right text-teal-600 dark:text-teal-400">
                      Total Interest Saved
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-surface-border/60 font-mono">
                  <tr className="hover:bg-surface-muted/30 transition-colors">
                    <td className="py-3 px-4 font-sans font-medium text-ink">10.0% APR</td>
                    <td className="py-3 px-4 font-sans font-bold text-emerald-700 dark:text-emerald-300">
                      6.0% APR (-4.0%)
                    </td>
                    <td className="py-3 px-4 text-right text-ink-muted">$634.06</td>
                    <td className="py-3 px-4 text-right font-bold text-emerald-600 dark:text-emerald-400">
                      $587.13
                    </td>
                    <td className="py-3 px-4 text-right font-bold text-teal-600 dark:text-teal-400">
                      +$2,252.64
                    </td>
                  </tr>
                  <tr className="hover:bg-surface-muted/30 transition-colors bg-teal-500/5">
                    <td className="py-3 px-4 font-sans font-medium text-ink">8.5% APR</td>
                    <td className="py-3 px-4 font-sans font-bold text-emerald-700 dark:text-emerald-300">
                      5.5% APR (-3.0%)
                    </td>
                    <td className="py-3 px-4 text-right text-ink-muted">$616.21</td>
                    <td className="py-3 px-4 text-right font-bold text-emerald-600 dark:text-emerald-400">
                      $581.42
                    </td>
                    <td className="py-3 px-4 text-right font-bold text-teal-700 dark:text-teal-300">
                      +$1,669.92
                    </td>
                  </tr>
                  <tr className="hover:bg-surface-muted/30 transition-colors">
                    <td className="py-3 px-4 font-sans font-medium text-ink">7.5% APR</td>
                    <td className="py-3 px-4 font-sans font-bold text-emerald-700 dark:text-emerald-300">
                      5.5% APR (-2.0%)
                    </td>
                    <td className="py-3 px-4 text-right text-ink-muted">$604.53</td>
                    <td className="py-3 px-4 text-right font-bold text-emerald-600 dark:text-emerald-400">
                      $581.42
                    </td>
                    <td className="py-3 px-4 text-right font-bold text-teal-600 dark:text-teal-400">
                      +$1,109.28
                    </td>
                  </tr>
                  <tr className="hover:bg-surface-muted/30 transition-colors">
                    <td className="py-3 px-4 font-sans font-medium text-ink">6.5% APR</td>
                    <td className="py-3 px-4 font-sans font-bold text-emerald-700 dark:text-emerald-300">
                      5.0% APR (-1.5%)
                    </td>
                    <td className="py-3 px-4 text-right text-ink-muted">$593.00</td>
                    <td className="py-3 px-4 text-right font-bold text-emerald-600 dark:text-emerald-400">
                      $575.73
                    </td>
                    <td className="py-3 px-4 text-right font-bold text-teal-600 dark:text-teal-400">
                      +$828.96
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          {/* Contextual Internal Linking & Holistic Financial Suite */}
          <div className="bg-surface-muted/60 border border-surface-border rounded-3xl p-6 sm:p-8 space-y-6">
            <div>
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-teal-500/10 text-teal-700 dark:text-teal-300 border border-teal-500/20 mb-2">
                <Sparkles size={13} />
                <span>QuickCalc Holistic Debt &amp; Wealth Suite</span>
              </div>
              <h2 className="text-xl sm:text-2xl font-heading font-extrabold text-ink">
                Connect Your Auto Loan to Your Complete Financial Picture
              </h2>
              <p className="text-xs sm:text-sm text-ink-muted mt-1 max-w-3xl leading-relaxed">
                Refinancing your car is just one piece of optimizing your household balance sheet. Explore our integrated debt elimination, take-home tax, and mortgage calculators:
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {/* Link 1: Credit Card Payoff Calculator */}
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
                    Carrying credit card debt at 22% APR alongside your car loan? Redirect your auto refinance monthly savings into card payoff to eliminate high compound interest.
                  </p>
                </div>
                <div className="mt-4 pt-3 border-t border-surface-border/60 text-xs font-bold text-rose-600 dark:text-rose-400 inline-flex items-center gap-1">
                  <span>Eliminate Card Debt</span>
                  <ArrowRight size={13} className="group-hover:translate-x-1 transition-transform" />
                </div>
              </Link>

              {/* Link 2: Hourly to Salary Calculator */}
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
                    Financial advisors recommend keeping total transportation costs below 10-15% of gross income. Convert your hourly wage into annual salary benchmarks.
                  </p>
                </div>
                <div className="mt-4 pt-3 border-t border-surface-border/60 text-xs font-bold text-cyan-600 dark:text-cyan-400 inline-flex items-center gap-1">
                  <span>Convert Wage</span>
                  <ArrowRight size={13} className="group-hover:translate-x-1 transition-transform" />
                </div>
              </Link>

              {/* Link 3: US State Paycheck Hub */}
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
                    Auto lenders look closely at your debt-to-income (DTI) ratio. Calculate your exact net take-home pay after federal, FICA, and state tax withholdings.
                  </p>
                </div>
                <div className="mt-4 pt-3 border-t border-surface-border/60 text-xs font-bold text-blue-600 dark:text-blue-400 inline-flex items-center gap-1">
                  <span>Calculate Take-Home Pay</span>
                  <ArrowRight size={13} className="group-hover:translate-x-1 transition-transform" />
                </div>
              </Link>

              {/* Link 4: Debt Snowball vs Avalanche */}
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
                    Balancing auto loans, student loans, and credit cards? Build a multi-debt debt payoff plan comparing the psychological Snowball and mathematical Avalanche.
                  </p>
                </div>
                <div className="mt-4 pt-3 border-t border-surface-border/60 text-xs font-bold text-indigo-600 dark:text-indigo-400 inline-flex items-center gap-1">
                  <span>Compare Payoff Methods</span>
                  <ArrowRight size={13} className="group-hover:translate-x-1 transition-transform" />
                </div>
              </Link>

              {/* Link 5: 15-Year vs. 30-Year Mortgage Calculator */}
              <Link
                href="/calculators/mortgage-15-vs-30-year-calculator"
                className="group p-5 rounded-2xl bg-base-card border border-surface-border hover:border-teal-500/50 shadow-xs hover:shadow-lg transition-all flex flex-col justify-between"
              >
                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-teal-600 dark:text-teal-400">
                    <Home size={18} />
                    <span className="font-bold text-sm text-ink group-hover:text-teal-600 dark:group-hover:text-teal-400">
                      15 vs 30 Year Mortgage
                    </span>
                  </div>
                  <p className="text-xs text-ink-muted leading-relaxed">
                    Planning to buy a home? Refinancing an expensive car loan lowers your monthly debt burden, helping you qualify for prime mortgage interest rates.
                  </p>
                </div>
                <div className="mt-4 pt-3 border-t border-surface-border/60 text-xs font-bold text-teal-600 dark:text-teal-400 inline-flex items-center gap-1">
                  <span>Compare Mortgages</span>
                  <ArrowRight size={13} className="group-hover:translate-x-1 transition-transform" />
                </div>
              </Link>

              {/* Link 6: Dave Ramsey Investment Calculator */}
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
                    Once your car is paid off, redirect that monthly $500 payment into mutual funds. See how fast monthly car payments compound into a six-figure nest egg.
                  </p>
                </div>
                <div className="mt-4 pt-3 border-t border-surface-border/60 text-xs font-bold text-emerald-600 dark:text-emerald-400 inline-flex items-center gap-1">
                  <span>Simulate Wealth Growth</span>
                  <ArrowRight size={13} className="group-hover:translate-x-1 transition-transform" />
                </div>
              </Link>
            </div>
          </div>
        </section>

        {/* AdSlot Bottom */}
        <AdSlot slot="tool-bottom" className="my-8" />
      </main>

      <Footer customText="Compare auto loan refinance rates, calculate monthly payment savings, break-even period, and early payoff." />
    </div>
  );
}
