import type { Metadata } from "next";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import AdSlot from "@/components/AdSlot";
import RothIraCalculatorWidget from "./RothIraCalculatorWidget";
import {
  PiggyBank,
  TrendingUp,
  ShieldCheck,
  ArrowRight,
  Clock,
  CreditCard,
  Building2,
  Car,
  Coins,
} from "lucide-react";

export const metadata: Metadata = {
  title: "Roth IRA Growth Calculator - Tax-Free Retirement Planner | QuickCalc",
  description:
    "Free Roth IRA calculator. Project your tax-free retirement growth, compare against taxable accounts, and see how compound interest builds your nest egg.",
  keywords: [
    "roth ira calculator",
    "roth ira growth calculator",
    "tax-free retirement calculator",
    "roth ira vs taxable account",
    "compound interest roth ira",
    "roth ira contribution limits",
    "retirement nest egg calculator",
  ],
  alternates: {
    canonical: "https://quickcalc.cloud/calculators/roth-ira-calculator",
  },
  openGraph: {
    title: "Roth IRA Growth Calculator - Tax-Free Retirement Planner | QuickCalc",
    description:
      "Calculate your future tax-free nest egg, project compound growth, and see how much you save in taxes compared to a standard brokerage account.",
    url: "https://quickcalc.cloud/calculators/roth-ira-calculator",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Roth IRA Growth Calculator - Tax-Free Retirement Planner | QuickCalc",
    description:
      "Interactive Roth IRA retirement planner with tax savings comparison and milestone projections.",
  },
};

export default function RothIraCalculatorPage() {
  const softwareSchema = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: "Roth IRA Growth Calculator",
    applicationCategory: "FinanceApplication",
    operatingSystem: "All",
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "USD",
    },
    description:
      "Interactive Roth IRA compound growth calculator that projects tax-free retirement wealth and computes the tax advantage over standard brokerage accounts.",
    url: "https://quickcalc.cloud/calculators/roth-ira-calculator",
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
        item: "https://quickcalc.cloud/category/finance-math",
      },
      {
        "@type": "ListItem",
        position: 3,
        name: "Roth IRA Growth Calculator",
        item: "https://quickcalc.cloud/calculators/roth-ira-calculator",
      },
    ],
  };

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: "What is the annual Roth IRA contribution limit?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "For the current tax year, the IRS statutory contribution limit is $7,000 per year ($583.33/month) for individuals under age 50. Individuals aged 50 and older qualify for a $1,000 catch-up contribution, bringing their annual maximum to $8,000 per year ($666.67/month). Contributions cannot exceed your total earned income for the year.",
        },
      },
      {
        "@type": "Question",
        name: "How does tax-free growth work in a Roth IRA compared to a taxable account?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "With a Roth IRA, you contribute after-tax income today. In exchange, all future investment returns—including capital gains, stock dividends, and compounding interest—grow 100% tax-free. When you take qualified distributions after age 59½ (and meeting the 5-year holding rule), withdrawals are completely free from federal and state income taxes. In a standard taxable brokerage account, you owe taxes on annual dividends and capital gains distributions every year, plus long-term capital gains tax (typically 15% to 20%) when you sell your investments in retirement.",
        },
      },
      {
        "@type": "Question",
        name: "Can I withdraw my contributions early without penalties?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Yes. One of the unique benefits of a Roth IRA is that you can withdraw your original contributions (principal) at any time, at any age, for any reason, completely penalty-free and tax-free. However, withdrawing investment earnings before age 59½ is generally subject to income tax and a 10% early withdrawal penalty, unless qualifying exceptions apply (such as first-time home purchase up to $10,000, disability, or higher education expenses).",
        },
      },
      {
        "@type": "Question",
        name: "What is the difference between a Roth IRA and a Traditional IRA?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "The main difference is the timing of your tax advantage. A Traditional IRA provides an upfront tax deduction on contributions today, but every dollar withdrawn in retirement is taxed as ordinary income. A Roth IRA offers no upfront tax deduction, but all withdrawals in retirement are 100% tax-free. Roth IRAs are particularly advantageous for investors who expect to be in an equal or higher tax bracket in retirement, or who wish to avoid Required Minimum Distributions (RMDs).",
        },
      },
      {
        "@type": "Question",
        name: "What are the income limits for a Roth IRA, and what is a Backdoor Roth?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "The IRS enforces modified adjusted gross income (MAGI) phaseout limits for direct Roth IRA contributions. High earners whose income exceeds the phaseout threshold cannot contribute directly. However, they can legally utilize a Backdoor Roth IRA by making a non-deductible contribution to a Traditional IRA and immediately converting those funds to a Roth IRA.",
        },
      },
      {
        "@type": "Question",
        name: "What rate of return should I assume for a Roth IRA?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Historically, broad-market equity index funds such as the S&P 500 have generated an average annualized nominal return of approximately 10% (or ~7% adjusted for inflation) over multi-decade horizons. For long-term planning, financial planners commonly recommend conservative to moderate assumptions between 6.0% and 8.0% to build a margin of safety against market volatility.",
        },
      },
    ],
  };

  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-zinc-950 font-sans text-zinc-900 dark:text-zinc-100 flex flex-col">
      {/* JSON-LD Schema Integration */}
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

      <main className="flex-grow w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        {/* Breadcrumb Navigation */}
        <nav
          aria-label="Breadcrumb"
          className="flex items-center gap-2 text-xs text-zinc-500 dark:text-zinc-400 mb-6"
        >
          <Link href="/" className="hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors">
            Home
          </Link>
          <span>/</span>
          <Link
            href="/category/finance-math"
            className="hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors"
          >
            Finance &amp; Money
          </Link>
          <span>/</span>
          <span className="text-zinc-800 dark:text-zinc-200 font-medium">
            Roth IRA Growth Calculator
          </span>
        </nav>

        {/* Page Hero & AEO Direct Answer Header */}
        <header className="space-y-4 mb-8">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider bg-emerald-500/10 text-emerald-800 dark:text-emerald-300 border border-emerald-500/20">
            <PiggyBank size={14} className="text-emerald-600 dark:text-emerald-400" />
            <span>Tax-Free Retirement Engine</span>
          </div>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold font-heading text-zinc-900 dark:text-white tracking-tight">
            Roth IRA Growth Calculator
          </h1>

          {/* AEO / GEO Direct Definition */}
          <div className="p-4 sm:p-5 rounded-2xl bg-emerald-500/5 dark:bg-emerald-500/10 border border-emerald-500/20 text-sm sm:text-base text-zinc-700 dark:text-zinc-300 leading-relaxed max-w-4xl">
            <p>
              A <strong>Roth IRA growth calculator</strong> projects the future compound value of your retirement savings when invested in a tax-advantaged Roth account. Because contributions are made with after-tax dollars today, all dividends, capital gains, and investment returns accumulate <strong>100% tax-free</strong>. When withdrawn in retirement after age 59½, you owe $0 in federal or state capital gains taxes—often saving hundreds of thousands of dollars compared to a standard taxable brokerage account.
            </p>
          </div>
        </header>

        {/* Top Ad Slot */}
        <AdSlot slot="tool-top" className="my-6" />

        {/* Main Interactive SaaS Calculator Component */}
        <RothIraCalculatorWidget />

        {/* Bottom Ad Slot */}
        <AdSlot slot="tool-bottom" className="my-10" />

        {/* Comprehensive Editorial & Link Juice Guide Section */}
        <article className="mt-12 space-y-12 border-t border-zinc-200 dark:border-zinc-800 pt-10 text-zinc-800 dark:text-zinc-200">
          {/* Section 1: The Power of Tax-Free Compounding */}
          <section className="space-y-4">
            <h2 className="text-2xl sm:text-3xl font-bold font-heading text-zinc-900 dark:text-white">
              How Tax-Free Compounding Creates Generational Wealth
            </h2>
            <p className="text-sm sm:text-base leading-relaxed text-zinc-600 dark:text-zinc-300">
              When investing for retirement over a multi-decade horizon, your largest ongoing expense is rarely fund management fees—it is <strong>taxes on investment growth</strong>. In a standard brokerage account, you pay taxes twice: annually on dividend distributions and turnover, and again when selling appreciated shares to fund retirement expenses.
            </p>
            <p className="text-sm sm:text-base leading-relaxed text-zinc-600 dark:text-zinc-300">
              By contrast, a Roth IRA functions as an impervious legal shield against capital gains taxes. When evaluating retirement runway using our{" "}
              <Link
                href="/calculators/how-long-will-my-money-last"
                className="text-emerald-600 dark:text-emerald-400 font-semibold underline underline-offset-2 hover:text-emerald-700"
              >
                Savings Runway &amp; Retirement Calculator
              </Link>
              , tax-free distributions allow retirees to maintain a significantly higher safe withdrawal rate (SWR) because every dollar withdrawn from a Roth IRA is yours to spend.
            </p>
          </section>

          {/* Section 2: Comparison Table: Roth IRA vs. Traditional IRA vs. 401(k) vs. Taxable */}
          <section className="space-y-4">
            <h2 className="text-2xl font-bold font-heading text-zinc-900 dark:text-white">
              Account Comparison: Roth IRA vs. Traditional IRA vs. Taxable Brokerage
            </h2>
            <div className="overflow-x-auto rounded-2xl border border-zinc-200 dark:border-zinc-800">
              <table className="w-full text-left text-xs sm:text-sm">
                <thead className="bg-zinc-100 dark:bg-zinc-800/80 text-zinc-700 dark:text-zinc-200">
                  <tr>
                    <th className="p-3 sm:p-4 font-bold">Feature</th>
                    <th className="p-3 sm:p-4 font-bold text-emerald-600 dark:text-emerald-400">Roth IRA</th>
                    <th className="p-3 sm:p-4 font-bold">Traditional IRA</th>
                    <th className="p-3 sm:p-4 font-bold">Taxable Brokerage</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-zinc-200 dark:divide-zinc-800 text-zinc-600 dark:text-zinc-300">
                  <tr>
                    <td className="p-3 sm:p-4 font-semibold">Contribution Tax Status</td>
                    <td className="p-3 sm:p-4 font-medium text-emerald-600 dark:text-emerald-400">Post-tax (No upfront deduction)</td>
                    <td className="p-3 sm:p-4">Pre-tax (Tax deductible)</td>
                    <td className="p-3 sm:p-4">Post-tax (No deduction)</td>
                  </tr>
                  <tr>
                    <td className="p-3 sm:p-4 font-semibold">Growth Taxation</td>
                    <td className="p-3 sm:p-4 font-bold text-emerald-600 dark:text-emerald-400">100% Tax-Free</td>
                    <td className="p-3 sm:p-4">Tax-Deferred</td>
                    <td className="p-3 sm:p-4">Taxed Annually (Dividends/Cap Gains)</td>
                  </tr>
                  <tr>
                    <td className="p-3 sm:p-4 font-semibold">Retirement Withdrawals</td>
                    <td className="p-3 sm:p-4 font-bold text-emerald-600 dark:text-emerald-400">100% Tax-Free (Age 59½+)</td>
                    <td className="p-3 sm:p-4">Taxed as Ordinary Income</td>
                    <td className="p-3 sm:p-4">Long-Term Capital Gains (15% - 20%)</td>
                  </tr>
                  <tr>
                    <td className="p-3 sm:p-4 font-semibold">Annual Contribution Limit</td>
                    <td className="p-3 sm:p-4">$7,000 ($8,000 if age 50+)</td>
                    <td className="p-3 sm:p-4">$7,000 ($8,000 if age 50+)</td>
                    <td className="p-3 sm:p-4 font-medium text-emerald-600 dark:text-emerald-400">Unlimited</td>
                  </tr>
                  <tr>
                    <td className="p-3 sm:p-4 font-semibold">Required Minimum Distributions (RMDs)</td>
                    <td className="p-3 sm:p-4 font-bold text-emerald-600 dark:text-emerald-400">None during owner&apos;s lifetime</td>
                    <td className="p-3 sm:p-4">Mandatory starting at age 73/75</td>
                    <td className="p-3 sm:p-4">None</td>
                  </tr>
                  <tr>
                    <td className="p-3 sm:p-4 font-semibold">Early Principal Access</td>
                    <td className="p-3 sm:p-4 font-medium text-emerald-600 dark:text-emerald-400">Anytime, 100% penalty-free</td>
                    <td className="p-3 sm:p-4">10% penalty + income tax</td>
                    <td className="p-3 sm:p-4">Anytime, penalty-free</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </section>

          {/* Section 3: Strategic Allocation & Dave Ramsey Baby Steps */}
          <section className="space-y-4">
            <h2 className="text-2xl font-bold font-heading text-zinc-900 dark:text-white">
              Maximizing Your Roth IRA Within Your Overall Financial Strategy
            </h2>
            <p className="text-sm sm:text-base leading-relaxed text-zinc-600 dark:text-zinc-300">
              When allocating monthly cash flow toward retirement, personal finance experts emphasize prioritizing debt-free financial foundations. If you are currently paying down consumer debt, compare strategies using our{" "}
              <Link
                href="/calculators/credit-card-payoff-calculator"
                className="text-emerald-600 dark:text-emerald-400 font-semibold underline underline-offset-2 hover:text-emerald-700"
              >
                Credit Card Payoff Calculator
              </Link>
              {" "}or our{" "}
              <Link
                href="/calculators/auto-loan-refinance-calculator"
                className="text-emerald-600 dark:text-emerald-400 font-semibold underline underline-offset-2 hover:text-emerald-700"
              >
                Auto Loan Refinance Calculator
              </Link>
              {" "}before locking capital into long-term retirement accounts. High-interest debt at 20%+ APR easily outpaces average market returns.
            </p>
            <p className="text-sm sm:text-base leading-relaxed text-zinc-600 dark:text-zinc-300">
              Once consumer debt is eradicated, Dave Ramsey&apos;s Baby Step 4 recommends investing 15% of your household income into tax-advantaged accounts, beginning with employer 401(k) matching and channeling the remainder directly into a Roth IRA. You can simulate multi-fund portfolio growth using our dedicated{" "}
              <Link
                href="/calculators/ramsey-investment-calculator"
                className="text-emerald-600 dark:text-emerald-400 font-semibold underline underline-offset-2 hover:text-emerald-700"
              >
                Dave Ramsey Investment Calculator
              </Link>
              .
            </p>
            <p className="text-sm sm:text-base leading-relaxed text-zinc-600 dark:text-zinc-300">
              To determine how much of your monthly paycheck represents 15% of your gross or take-home earnings, verify your exact state tax deductions with our{" "}
              <Link
                href="/calculators/paycheck-calculator"
                className="text-emerald-600 dark:text-emerald-400 font-semibold underline underline-offset-2 hover:text-emerald-700"
              >
                US State Paycheck Calculators Hub
              </Link>
              {" "}or calculate equivalent earnings using the{" "}
              <Link
                href="/calculators/hourly-to-salary-calculator"
                className="text-emerald-600 dark:text-emerald-400 font-semibold underline underline-offset-2 hover:text-emerald-700"
              >
                Hourly to Salary Converter
              </Link>
              .
            </p>
          </section>

          {/* Section 4: Comprehensive Frequently Asked Questions */}
          <section className="space-y-6">
            <h2 className="text-2xl sm:text-3xl font-bold font-heading text-zinc-900 dark:text-white">
              Frequently Asked Questions About Roth IRAs
            </h2>

            <div className="space-y-4">
              <div className="p-5 rounded-2xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 space-y-2">
                <h3 className="text-base font-bold text-zinc-900 dark:text-white flex items-center gap-2">
                  <ShieldCheck size={18} className="text-emerald-500 shrink-0" />
                  <span>What is the annual Roth IRA contribution limit?</span>
                </h3>
                <p className="text-xs sm:text-sm text-zinc-600 dark:text-zinc-300 leading-relaxed pl-6">
                  For the current tax year, the IRS limit is $7,000 annually ($583.33/month) for individuals under 50. For individuals 50 and older, an additional $1,000 catch-up contribution is permitted, raising the annual maximum to $8,000 ($666.67/month).
                </p>
              </div>

              <div className="p-5 rounded-2xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 space-y-2">
                <h3 className="text-base font-bold text-zinc-900 dark:text-white flex items-center gap-2">
                  <ShieldCheck size={18} className="text-emerald-500 shrink-0" />
                  <span>How does tax-free growth work compared to a taxable brokerage?</span>
                </h3>
                <p className="text-xs sm:text-sm text-zinc-600 dark:text-zinc-300 leading-relaxed pl-6">
                  In a taxable brokerage, you are taxed every year on dividend distributions and realized capital gains, which causes persistent drag on compounding returns. Additionally, when you sell holdings in retirement, you pay 15% to 20% federal capital gains taxes plus state taxes. In a Roth IRA, 100% of your earnings and distributions in retirement are completely tax-free.
                </p>
              </div>

              <div className="p-5 rounded-2xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 space-y-2">
                <h3 className="text-base font-bold text-zinc-900 dark:text-white flex items-center gap-2">
                  <ShieldCheck size={18} className="text-emerald-500 shrink-0" />
                  <span>Can I withdraw my contributions early without penalty?</span>
                </h3>
                <p className="text-xs sm:text-sm text-zinc-600 dark:text-zinc-300 leading-relaxed pl-6">
                  Yes! You can withdraw your original contributions (basis) at any time, at any age, without taxes or penalties. However, withdrawing investment earnings before age 59½ is subject to income tax and a 10% penalty unless an IRS qualified exception applies.
                </p>
              </div>

              <div className="p-5 rounded-2xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 space-y-2">
                <h3 className="text-base font-bold text-zinc-900 dark:text-white flex items-center gap-2">
                  <ShieldCheck size={18} className="text-emerald-500 shrink-0" />
                  <span>What is a Backdoor Roth IRA and who should use it?</span>
                </h3>
                <p className="text-xs sm:text-sm text-zinc-600 dark:text-zinc-300 leading-relaxed pl-6">
                  The IRS sets modified adjusted gross income (MAGI) caps that prevent high earners from contributing directly to a Roth IRA. A Backdoor Roth IRA is an IRS-compliant strategy where an investor contributes post-tax funds to a Traditional IRA and immediately converts those assets to a Roth IRA, sidestepping the income cap.
                </p>
              </div>

              <div className="p-5 rounded-2xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 space-y-2">
                <h3 className="text-base font-bold text-zinc-900 dark:text-white flex items-center gap-2">
                  <ShieldCheck size={18} className="text-emerald-500 shrink-0" />
                  <span>What rate of return should I expect on a Roth IRA portfolio?</span>
                </h3>
                <p className="text-xs sm:text-sm text-zinc-600 dark:text-zinc-300 leading-relaxed pl-6">
                  Over the past century, a broad 100% US equity portfolio (like the S&P 500 or total stock market index) has averaged approximately 10% nominal annual return (~7% real return after inflation). Balanced portfolios incorporating bonds or international equities typically project between 6% and 8% long-term annual returns.
                </p>
              </div>
            </div>
          </section>

          {/* Section 5: Related Financial Tools Grid */}
          <section className="space-y-6 pt-4 border-t border-zinc-200 dark:border-zinc-800">
            <h2 className="text-xl sm:text-2xl font-bold font-heading text-zinc-900 dark:text-white">
              Explore Related Financial &amp; Retirement Engines
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              <Link
                href="/calculators/ramsey-investment-calculator"
                className="group p-5 rounded-2xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 hover:border-emerald-500/50 hover:shadow-md transition-all space-y-2"
              >
                <div className="flex items-center justify-between">
                  <div className="w-9 h-9 rounded-xl bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 flex items-center justify-center">
                    <TrendingUp size={18} />
                  </div>
                  <ArrowRight size={14} className="text-zinc-400 group-hover:translate-x-1 transition-transform" />
                </div>
                <h3 className="font-bold text-sm text-zinc-900 dark:text-white group-hover:text-emerald-600 transition-colors">
                  Dave Ramsey Investment Calculator
                </h3>
                <p className="text-xs text-zinc-500 dark:text-zinc-400">
                  Project long-term wealth accumulation using the 15% rule and 4-fund portfolio distribution.
                </p>
              </Link>

              <Link
                href="/calculators/how-long-will-my-money-last"
                className="group p-5 rounded-2xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 hover:border-teal-500/50 hover:shadow-md transition-all space-y-2"
              >
                <div className="flex items-center justify-between">
                  <div className="w-9 h-9 rounded-xl bg-teal-500/10 text-teal-600 dark:text-teal-400 flex items-center justify-center">
                    <Clock size={18} />
                  </div>
                  <ArrowRight size={14} className="text-zinc-400 group-hover:translate-x-1 transition-transform" />
                </div>
                <h3 className="font-bold text-sm text-zinc-900 dark:text-white group-hover:text-teal-600 transition-colors">
                  Savings Runway &amp; Retirement Calculator
                </h3>
                <p className="text-xs text-zinc-500 dark:text-zinc-400">
                  Simulate portfolio drawdown duration, inflation adjustment, and safe withdrawal rates (SWR).
                </p>
              </Link>

              <Link
                href="/calculators/paycheck-calculator"
                className="group p-5 rounded-2xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 hover:border-blue-500/50 hover:shadow-md transition-all space-y-2"
              >
                <div className="flex items-center justify-between">
                  <div className="w-9 h-9 rounded-xl bg-blue-500/10 text-blue-600 dark:text-blue-400 flex items-center justify-center">
                    <Building2 size={18} />
                  </div>
                  <ArrowRight size={14} className="text-zinc-400 group-hover:translate-x-1 transition-transform" />
                </div>
                <h3 className="font-bold text-sm text-zinc-900 dark:text-white group-hover:text-blue-600 transition-colors">
                  US State Paycheck Calculators Hub
                </h3>
                <p className="text-xs text-zinc-500 dark:text-zinc-400">
                  Calculate net take-home wages across all 50 states with current federal brackets and FICA taxes.
                </p>
              </Link>

              <Link
                href="/calculators/credit-card-payoff-calculator"
                className="group p-5 rounded-2xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 hover:border-rose-500/50 hover:shadow-md transition-all space-y-2"
              >
                <div className="flex items-center justify-between">
                  <div className="w-9 h-9 rounded-xl bg-rose-500/10 text-rose-600 dark:text-rose-400 flex items-center justify-center">
                    <CreditCard size={18} />
                  </div>
                  <ArrowRight size={14} className="text-zinc-400 group-hover:translate-x-1 transition-transform" />
                </div>
                <h3 className="font-bold text-sm text-zinc-900 dark:text-white group-hover:text-rose-600 transition-colors">
                  Credit Card Payoff Calculator
                </h3>
                <p className="text-xs text-zinc-500 dark:text-zinc-400">
                  Find your debt-free date and see how extra monthly payments eliminate high interest balances.
                </p>
              </Link>

              <Link
                href="/calculators/auto-loan-refinance-calculator"
                className="group p-5 rounded-2xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 hover:border-emerald-500/50 hover:shadow-md transition-all space-y-2"
              >
                <div className="flex items-center justify-between">
                  <div className="w-9 h-9 rounded-xl bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 flex items-center justify-center">
                    <Car size={18} />
                  </div>
                  <ArrowRight size={14} className="text-zinc-400 group-hover:translate-x-1 transition-transform" />
                </div>
                <h3 className="font-bold text-sm text-zinc-900 dark:text-white group-hover:text-emerald-600 transition-colors">
                  Auto Loan Refinance Calculator
                </h3>
                <p className="text-xs text-zinc-500 dark:text-zinc-400">
                  Calculate monthly savings, exact break-even timeline, and accelerated car loan payoff dates.
                </p>
              </Link>

              <Link
                href="/calculators/cd-calculator"
                className="group p-5 rounded-2xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 hover:border-teal-500/50 hover:shadow-md transition-all space-y-2"
              >
                <div className="flex items-center justify-between">
                  <div className="w-9 h-9 rounded-xl bg-teal-500/10 text-teal-600 dark:text-teal-400 flex items-center justify-center">
                    <Coins size={18} />
                  </div>
                  <ArrowRight size={14} className="text-zinc-400 group-hover:translate-x-1 transition-transform" />
                </div>
                <h3 className="font-bold text-sm text-zinc-900 dark:text-white group-hover:text-teal-600 transition-colors">
                  Certificate of Deposit (CD) Calculator
                </h3>
                <p className="text-xs text-zinc-500 dark:text-zinc-400">
                  Compare compound APY yields, daily/monthly frequencies, and early withdrawal penalties.
                </p>
              </Link>
            </div>
          </section>
        </article>
      </main>

      <Footer />
    </div>
  );
}
