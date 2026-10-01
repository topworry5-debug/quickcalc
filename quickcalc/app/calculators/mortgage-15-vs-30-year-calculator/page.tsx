import type { Metadata } from "next";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import AdSlot from "@/components/AdSlot";
import MortgageCalculatorWidget from "./MortgageCalculatorWidget";
import {
  Home,
  TrendingUp,
  ShieldCheck,
  Building2,
  PiggyBank,
  CreditCard,
  Scale,
  ArrowRight,
  Clock,
  Sparkles,
  CheckCircle2,
} from "lucide-react";

export const metadata: Metadata = {
  title: "15-Year vs. 30-Year Mortgage Calculator | QuickCalc",
  description:
    "Compare 15-year and 30-year mortgage payments, interest costs, and equity buildup. Free calculator with side-by-side amortization analysis.",
  keywords: [
    "15 year vs 30 year mortgage calculator",
    "15 vs 30 year mortgage comparison",
    "mortgage amortization calculator",
    "15 year mortgage payment calculator",
    "should I get a 15 or 30 year mortgage",
    "how much interest saved 15 year mortgage",
    "mortgage opportunity cost calculator",
  ],
  alternates: {
    canonical: "https://quickcalc.cloud/calculators/mortgage-15-vs-30-year-calculator",
  },
  openGraph: {
    title: "15-Year vs. 30-Year Mortgage Calculator | QuickCalc",
    description:
      "Interactive side-by-side mortgage comparison. See exact monthly payment differences, lifetime interest savings, and investing opportunity costs.",
    url: "https://quickcalc.cloud/calculators/mortgage-15-vs-30-year-calculator",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "15-Year vs. 30-Year Mortgage Calculator | QuickCalc",
    description:
      "Compare 15-year and 30-year mortgages side-by-side. Calculate monthly payments, interest savings, and investing alternatives.",
  },
};

export default function Mortgage15vs30Page() {
  const softwareSchema = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: "15-Year vs. 30-Year Mortgage Calculator",
    applicationCategory: "FinanceApplication",
    operatingSystem: "All",
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "USD",
    },
    description:
      "Free interactive mortgage calculator comparing 15-year and 30-year fixed home loans with lifetime interest savings and amortization analysis.",
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
        name: "15-Year vs. 30-Year Mortgage Calculator",
        item: "https://quickcalc.cloud/calculators/mortgage-15-vs-30-year-calculator",
      },
    ],
  };

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: "Should I choose a 15-year or a 30-year fixed mortgage?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Choose a 15-year mortgage if you prioritize becoming debt-free quickly, saving hundreds of thousands of dollars in interest, and your monthly budget comfortably handles the higher required payment (under 25-28% of your take-home pay). Choose a 30-year mortgage if you need cash flow flexibility, lower mandatory monthly expenses, or plan to invest the payment difference into higher-yielding assets.",
        },
      },
      {
        "@type": "Question",
        name: "How much interest do you save with a 15-year mortgage?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "On a typical $320,000 loan, a 15-year mortgage at 5.875% APR incurs approximately $162,180 in total interest, compared to $408,142 for a 30-year mortgage at 6.50% APR. That is an immediate lifetime savings of over $245,900—cutting total borrowing interest costs by more than 60%.",
        },
      },
      {
        "@type": "Question",
        name: "Can I get a 30-year mortgage and make 15-year payments?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Yes. This strategy provides maximum flexibility. You lock in the lower mandatory monthly payment of a 30-year loan, but voluntarily prepay extra principal each month equivalent to a 15-year payment. If an emergency occurs or you lose income, you can revert to the minimum 30-year payment without defaulting. However, 15-year loans typically offer a 0.50% to 0.75% lower contractual APR.",
        },
      },
      {
        "@type": "Question",
        name: "Why do 15-year mortgages have lower interest rates?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Lenders view 15-year mortgages as lower risk because the loan principal is paid down much faster, reducing the lender's exposure to default and interest rate risk over time. Consequently, 15-year fixed loans generally feature interest rates 0.50% to 0.75% below comparable 30-year fixed mortgages.",
        },
      },
      {
        "@type": "Question",
        name: "What is Dave Ramsey's recommendation on 15 vs 30 year mortgages?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Dave Ramsey strongly advocates for only taking a 15-year fixed-rate conventional mortgage where the monthly payment (including taxes, insurance, and HOA) is no more than 25% of your take-home pay, with at least a 10% to 20% down payment. He advises against 30-year mortgages due to the massive compounding interest paid over three decades.",
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
          <span className="text-ink font-bold">15-Year vs. 30-Year Mortgage</span>
        </nav>

        {/* Page Hero Header (AEO Answer Paragraph) */}
        <div className="space-y-4 text-center sm:text-left">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-teal-500/10 text-teal-700 dark:text-teal-300 border border-teal-500/20">
            <Home size={14} />
            <span>Home Loan Strategy Engine</span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-heading font-extrabold text-ink tracking-tight">
            15-Year vs. 30-Year Mortgage Calculator
          </h1>

          <p className="text-sm sm:text-base text-ink-muted max-w-3xl leading-relaxed">
            A <strong>15-year vs. 30-year mortgage calculator</strong> helps home buyers compare monthly payments, lifetime interest costs, and long-term equity growth across the two most popular US fixed home loan terms. Discover how a 15-year loan can save you hundreds of thousands of dollars in interest—or how a 30-year loan frees up monthly cash flow for wealth building.
          </p>
        </div>

        {/* AdSlot Top */}
        <AdSlot slot="tool-top" className="my-4" />

        {/* Interactive Comparison Widget */}
        <section aria-label="15 vs 30 Year Mortgage Calculator Tool">
          <MortgageCalculatorWidget />
        </section>

        {/* AEO / GEO Deep-Dive & Knowledge Network Section */}
        <section className="space-y-8 text-ink leading-relaxed">
          {/* Key Insights Comparative Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-base-card border border-surface-border rounded-3xl p-6 space-y-3">
              <div className="w-10 h-10 rounded-xl bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 flex items-center justify-center border border-emerald-500/20">
                <CheckCircle2 size={20} />
              </div>
              <h2 className="text-base font-bold text-ink">The 15-Year Loan Pros</h2>
              <ul className="text-xs sm:text-sm text-ink-muted space-y-1.5 leading-relaxed">
                <li>• Saves 55% to 65% in lifetime interest.</li>
                <li>• Lower contractual APR (typically 0.5% lower).</li>
                <li>• Reaches 50% home equity in just 7 years.</li>
                <li>• Completely debt-free in 180 months.</li>
              </ul>
            </div>

            <div className="bg-base-card border border-surface-border rounded-3xl p-6 space-y-3">
              <div className="w-10 h-10 rounded-xl bg-blue-500/10 text-blue-600 dark:text-blue-400 flex items-center justify-center border border-blue-500/20">
                <Clock size={20} />
              </div>
              <h2 className="text-base font-bold text-ink">The 30-Year Loan Pros</h2>
              <ul className="text-xs sm:text-sm text-ink-muted space-y-1.5 leading-relaxed">
                <li>• Lower mandatory monthly payment ($500-$800/mo).</li>
                <li>• Easier to qualify under bank DTI ratios.</li>
                <li>• Cash-flow safety cushion during economic downturns.</li>
                <li>• Option to prepay extra principal anytime.</li>
              </ul>
            </div>

            <div className="bg-base-card border border-surface-border rounded-3xl p-6 space-y-3">
              <div className="w-10 h-10 rounded-xl bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 flex items-center justify-center border border-indigo-500/20">
                <TrendingUp size={20} />
              </div>
              <h2 className="text-base font-bold text-ink">The Opportunity Cost Factor</h2>
              <p className="text-xs sm:text-sm text-ink-muted leading-relaxed">
                Paying down a 6% mortgage provides a guaranteed 6% post-tax return. However, if broad equity index funds return 8-10% historically, investing the monthly savings could yield a larger net net worth over three decades—provided you possess the discipline to invest the difference every single month.
              </p>
            </div>
          </div>

          {/* Quick Comparison Rule Table */}
          <div className="bg-base-card border border-surface-border rounded-3xl p-6 sm:p-8 space-y-6">
            <div>
              <h2 className="text-xl sm:text-2xl font-heading font-extrabold text-ink">
                15-Year vs. 30-Year Loan Characteristics At a Glance
              </h2>
              <p className="text-xs sm:text-sm text-ink-muted mt-1">
                Direct structural comparison of terms, payments, equity velocity, and borrowing costs.
              </p>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs sm:text-sm">
                <thead>
                  <tr className="border-b border-surface-border bg-surface-muted/40 text-ink-muted">
                    <th className="py-3 px-4 font-bold">Feature / Metric</th>
                    <th className="py-3 px-4 font-bold text-emerald-700 dark:text-emerald-300">
                      15-Year Fixed Mortgage
                    </th>
                    <th className="py-3 px-4 font-bold text-blue-600 dark:text-blue-400">
                      30-Year Fixed Mortgage
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-surface-border/60">
                  <tr className="hover:bg-surface-muted/30 transition-colors">
                    <td className="py-3 px-4 font-bold text-ink">Monthly Payment</td>
                    <td className="py-3 px-4 font-medium text-ink">Higher (~30% to 35% higher)</td>
                    <td className="py-3 px-4 font-medium text-ink">Lower (Maximum cash-flow flexibility)</td>
                  </tr>
                  <tr className="hover:bg-surface-muted/30 transition-colors">
                    <td className="py-3 px-4 font-bold text-ink">Total Interest Expense</td>
                    <td className="py-3 px-4 font-bold text-emerald-600 dark:text-emerald-400">
                      Minimal (~$162,000 on $320k loan)
                    </td>
                    <td className="py-3 px-4 font-bold text-rose-600 dark:text-rose-400">
                      Heavy (~$408,000 on $320k loan)
                    </td>
                  </tr>
                  <tr className="hover:bg-surface-muted/30 transition-colors">
                    <td className="py-3 px-4 font-bold text-ink">Typical Interest Rate</td>
                    <td className="py-3 px-4 font-medium text-ink">0.50% to 0.75% lower</td>
                    <td className="py-3 px-4 font-medium text-ink">Benchmark market rate</td>
                  </tr>
                  <tr className="hover:bg-surface-muted/30 transition-colors">
                    <td className="py-3 px-4 font-bold text-ink">Equity Buildup Speed</td>
                    <td className="py-3 px-4 font-medium text-emerald-700 dark:text-emerald-300">
                      Rapid (50% equity in ~7 years)
                    </td>
                    <td className="py-3 px-4 font-medium text-ink">Gradual (50% equity in ~20 years)</td>
                  </tr>
                  <tr className="hover:bg-surface-muted/30 transition-colors">
                    <td className="py-3 px-4 font-bold text-ink">Borrower Qualification</td>
                    <td className="py-3 px-4 font-medium text-ink">Requires higher verified income</td>
                    <td className="py-3 px-4 font-medium text-ink">Lower income needed to meet DTI caps</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          {/* Contextual Internal Linking & Holistic Financial Network */}
          <div className="bg-surface-muted/60 border border-surface-border rounded-3xl p-6 sm:p-8 space-y-6">
            <div>
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-teal-500/10 text-teal-700 dark:text-teal-300 border border-teal-500/20 mb-2">
                <Sparkles size={13} />
                <span>QuickCalc Holistic Financial Suite</span>
              </div>
              <h2 className="text-xl sm:text-2xl font-heading font-extrabold text-ink">
                Explore Related Financial Calculators
              </h2>
              <p className="text-xs sm:text-sm text-ink-muted mt-1 max-w-3xl leading-relaxed">
                Connect your mortgage decision with complete wealth building, debt elimination, take-home tax planning, and retirement projections:
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {/* Backlink 1: Dave Ramsey Investment Calculator */}
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
                    Compare Dave Ramsey&apos;s 15-year mortgage payoff philosophy with his recommended 15% retirement contribution in growth stock mutual funds.
                  </p>
                </div>
                <div className="mt-4 pt-3 border-t border-surface-border/60 text-xs font-bold text-emerald-600 dark:text-emerald-400 inline-flex items-center gap-1">
                  <span>Simulate 15% Rule</span>
                  <ArrowRight size={13} className="group-hover:translate-x-1 transition-transform" />
                </div>
              </Link>

              {/* Backlink 2: US State Paycheck Calculators Hub */}
              <Link
                href="/calculators/paycheck-calculator"
                className="group p-5 rounded-2xl bg-base-card border border-surface-border hover:border-blue-500/50 shadow-xs hover:shadow-lg transition-all flex flex-col justify-between"
              >
                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-blue-600 dark:text-blue-400">
                    <Building2 size={18} />
                    <span className="font-bold text-sm text-ink group-hover:text-blue-600 dark:group-hover:text-blue-400">
                      US State Paycheck Hub
                    </span>
                  </div>
                  <p className="text-xs text-ink-muted leading-relaxed">
                    Mortgage underwriting caps monthly housing expenses at 28-36% of gross income. Calculate your net take-home salary across all 50 states.
                  </p>
                </div>
                <div className="mt-4 pt-3 border-t border-surface-border/60 text-xs font-bold text-blue-600 dark:text-blue-400 inline-flex items-center gap-1">
                  <span>Calculate Take-Home Pay</span>
                  <ArrowRight size={13} className="group-hover:translate-x-1 transition-transform" />
                </div>
              </Link>

              {/* Backlink 3: Credit Card Payoff Calculator */}
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
                    Carrying 20%+ APR card balances? Eliminate consumer debt before taking on a higher 15-year mortgage payment to maximize your credit score.
                  </p>
                </div>
                <div className="mt-4 pt-3 border-t border-surface-border/60 text-xs font-bold text-rose-600 dark:text-rose-400 inline-flex items-center gap-1">
                  <span>Pay Off Cards First</span>
                  <ArrowRight size={13} className="group-hover:translate-x-1 transition-transform" />
                </div>
              </Link>

              {/* Backlink 4: Debt Snowball vs Avalanche */}
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
                    Clear auto loans, student loans, and personal debts using the Snowball or Avalanche method so you can easily qualify for a 15-year home loan.
                  </p>
                </div>
                <div className="mt-4 pt-3 border-t border-surface-border/60 text-xs font-bold text-indigo-600 dark:text-indigo-400 inline-flex items-center gap-1">
                  <span>Compare Strategies</span>
                  <ArrowRight size={13} className="group-hover:translate-x-1 transition-transform" />
                </div>
              </Link>

              {/* Backlink 5: Savings Runway & Retirement */}
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
                    Entering retirement completely mortgage-free reduces your living expenses by 30-50%, massively expanding your portfolio runway and safe withdrawal rate.
                  </p>
                </div>
                <div className="mt-4 pt-3 border-t border-surface-border/60 text-xs font-bold text-teal-600 dark:text-teal-400 inline-flex items-center gap-1">
                  <span>Simulate Runway</span>
                  <ArrowRight size={13} className="group-hover:translate-x-1 transition-transform" />
                </div>
              </Link>

              {/* Backlink 6: CD Calculator */}
              <Link
                href="/calculators/cd-calculator"
                className="group p-5 rounded-2xl bg-base-card border border-surface-border hover:border-cyan-500/50 shadow-xs hover:shadow-lg transition-all flex flex-col justify-between"
              >
                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-cyan-600 dark:text-cyan-400">
                    <ShieldCheck size={18} />
                    <span className="font-bold text-sm text-ink group-hover:text-cyan-600 dark:group-hover:text-cyan-400">
                      Certificate of Deposit (CD)
                    </span>
                  </div>
                  <p className="text-xs text-ink-muted leading-relaxed">
                    Saving for a 20% down payment over the next 1 to 3 years? Lock in guaranteed FDIC-insured yields with daily or monthly compound growth.
                  </p>
                </div>
                <div className="mt-4 pt-3 border-t border-surface-border/60 text-xs font-bold text-cyan-600 dark:text-cyan-400 inline-flex items-center gap-1">
                  <span>Calculate CD APY</span>
                  <ArrowRight size={13} className="group-hover:translate-x-1 transition-transform" />
                </div>
              </Link>
            </div>
          </div>
        </section>

        {/* AdSlot Bottom */}
        <AdSlot slot="tool-bottom" className="my-8" />
      </main>

      <Footer customText="Compare 15-year and 30-year fixed mortgages with side-by-side amortization and opportunity costs." />
    </div>
  );
}
