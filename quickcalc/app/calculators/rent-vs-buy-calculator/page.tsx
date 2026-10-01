import type { Metadata } from "next";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import AdSlot from "@/components/AdSlot";
import RentVsBuyCalculatorWidget from "./RentVsBuyCalculatorWidget";
import {
  Home,
  Building2,
  Scale,
  TrendingUp,
  Clock,
  ArrowRight,
  ShieldCheck,
  Coins,
  PiggyBank,
} from "lucide-react";

export const metadata: Metadata = {
  title: "Rent vs. Buy Calculator - Is It Better to Rent or Buy a Home? | QuickCalc",
  description:
    "Free rent vs. buy calculator. Compare the true costs of renting versus buying a home, including mortgage rates, opportunity costs, and net worth projections.",
  keywords: [
    "rent vs buy calculator",
    "should i rent or buy a home",
    "renting vs buying net worth comparison",
    "rent vs buy break even calculator",
    "true cost of homeownership calculator",
    "5 percent rule rent vs buy",
    "home equity vs index fund return",
  ],
  alternates: {
    canonical: "https://quickcalc.cloud/calculators/rent-vs-buy-calculator",
  },
  openGraph: {
    title: "Rent vs. Buy Calculator - Is It Better to Rent or Buy a Home? | QuickCalc",
    description:
      "Interactive rent vs buy calculator. Compare total unrecoverable costs, down payment opportunity costs, and multi-year net worth trajectories.",
    url: "https://quickcalc.cloud/calculators/rent-vs-buy-calculator",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Rent vs. Buy Calculator - Is It Better to Rent or Buy a Home? | QuickCalc",
    description:
      "Compare the true net worth outcomes of renting and investing vs buying a home over any time horizon.",
  },
};

export default function RentVsBuyCalculatorPage() {
  const softwareSchema = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: "Rent vs. Buy Calculator",
    applicationCategory: "FinanceApplication",
    operatingSystem: "All",
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "USD",
    },
    description:
      "Interactive Rent vs. Buy financial decision engine comparing long-term net worth trajectories, down payment opportunity cost, and mortgage amortization against market investing.",
    url: "https://quickcalc.cloud/calculators/rent-vs-buy-calculator",
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
        name: "Rent vs. Buy Calculator",
        item: "https://quickcalc.cloud/calculators/rent-vs-buy-calculator",
      },
    ],
  };

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: "How long do I need to stay in a home for buying to make financial sense?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "In most housing markets, the break-even horizon is typically 4 to 7 years. When you buy a home, you incur substantial upfront closing costs (2% to 4%) and eventual selling costs (5% to 6% in real estate agent commissions and transfer taxes). If you move before this break-even threshold, those transaction friction costs usually exceed the equity built through mortgage principal paydown and home price appreciation, making renting more cost-effective.",
        },
      },
      {
        "@type": "Question",
        name: "What is the 5% rule for renting vs. buying?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "The 5% rule is a widely used financial benchmark popularized by Ben Felix. It estimates the annual 'unrecoverable costs' of homeownership at roughly 5% of the property's total value: 1% for property taxes, 1% for maintenance and repairs, and 3% for the cost of capital (mortgage interest or lost investment returns on equity). Under this rule of thumb, if you can rent a comparable home for less than 5% of its purchase price per year (or home price × 0.05 / 12 per month), renting is often financially advantageous.",
        },
      },
      {
        "@type": "Question",
        name: "What hidden costs of homeownership should I include in a rent vs. buy calculation?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Key unrecoverable homeownership costs include: property taxes (typically 1.0% to 2.5% of assessed value annually), homeowner insurance, routine maintenance and capital expenditures (roof, HVAC, appliances, commonly 1% to 2% annually), HOA fees, buying closing costs (loan origination, title insurance, escrow fees), and selling costs (realtor commissions of 5% to 6% plus transfer taxes). Renters pay none of these directly, though they are partially built into the landlord's rent.",
        },
      },
      {
        "@type": "Question",
        name: "How does the opportunity cost of the down payment affect the decision?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "When you buy, you tie up substantial liquidity in your down payment (e.g., $84,000 on a $420,000 home). A renter who instead invests that $84,000 in a diversified low-cost stock market index fund compounding at 7% to 10% annually builds substantial compound market wealth. Our calculator accurately tracks this opportunity cost: the renter's invested down payment and monthly cash flow savings compound continuously over your selected time horizon.",
        },
      },
      {
        "@type": "Question",
        name: "Does renting 'throw money away' compared to buying?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "No. Renting buys you shelter, flexibility, and a hard cap on your monthly housing liabilities (rent is the maximum you pay each month, whereas a mortgage is the minimum). Furthermore, in the early years of a 30-year mortgage, the vast majority of your monthly payment goes toward interest, taxes, and insurance rather than principal equity. If a renter diligently invests the monthly savings difference between rent and ownership, they can often accumulate a net worth comparable to or higher than a homeowner.",
        },
      },
      {
        "@type": "Question",
        name: "How do mortgage interest rates change the rent vs. buy calculation?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Mortgage rates have an immense impact. At a 3.0% interest rate, the monthly payment on a $336,000 mortgage is $1,416. At 6.5%, that same loan payment jumps to $2,124 per month—an extra $708/month in unrecoverable interest alone. Higher interest rates push the break-even horizon further out into the future, making renting significantly more competitive unless home prices decline or rents increase dramatically.",
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
          <Link href="/" className="hover:text-teal-600 dark:hover:text-teal-400 transition-colors">
            Home
          </Link>
          <span>/</span>
          <Link
            href="/category/finance-math"
            className="hover:text-teal-600 dark:hover:text-teal-400 transition-colors"
          >
            Finance &amp; Money
          </Link>
          <span>/</span>
          <span className="text-zinc-800 dark:text-zinc-200 font-medium">
            Rent vs. Buy Calculator
          </span>
        </nav>

        {/* Page Hero & AEO Direct Answer Header */}
        <header className="space-y-4 mb-8">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider bg-teal-500/10 text-teal-800 dark:text-teal-300 border border-teal-500/20">
            <Scale size={14} className="text-teal-600 dark:text-teal-400" />
            <span>Housing Wealth &amp; Opportunity Cost Engine</span>
          </div>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold font-heading text-zinc-900 dark:text-white tracking-tight">
            Rent vs. Buy Calculator
          </h1>

          {/* AEO / GEO Direct Definition */}
          <div className="p-4 sm:p-5 rounded-2xl bg-teal-500/5 dark:bg-teal-500/10 border border-teal-500/20 text-sm sm:text-base text-zinc-700 dark:text-zinc-300 leading-relaxed max-w-4xl">
            <p>
              A <strong>rent vs. buy calculator</strong> helps you determine whether purchasing a home or renting while investing your savings makes more financial sense over time. By comparing mortgage payments, property taxes, maintenance, home appreciation, and selling costs against rent inflation and the opportunity cost of investing your down payment in index funds, it computes your exact <strong>break-even timeline</strong> and projected net worth difference.
            </p>
          </div>
        </header>

        {/* Top Ad Slot */}
        <AdSlot slot="tool-top" className="my-6" />

        {/* Main Interactive SaaS Calculator Component */}
        <RentVsBuyCalculatorWidget />

        {/* Bottom Ad Slot */}
        <AdSlot slot="tool-bottom" className="my-10" />

        {/* Comprehensive Editorial & Link Juice Guide Section */}
        <article className="mt-12 space-y-12 border-t border-zinc-200 dark:border-zinc-800 pt-10 text-zinc-800 dark:text-zinc-200">
          {/* Section 1: The True Economics of Homeownership */}
          <section className="space-y-4">
            <h2 className="text-2xl sm:text-3xl font-bold font-heading text-zinc-900 dark:text-white">
              The True Economics of Renting vs. Buying
            </h2>
            <p className="text-sm sm:text-base leading-relaxed text-zinc-600 dark:text-zinc-300">
              For generations, conventional wisdom claimed that renting is &ldquo;throwing money away&rdquo; while buying a home is the quintessential American investment. However, modern financial economics reveals a more nuanced reality: <strong>both renting and buying carry unrecoverable costs</strong>.
            </p>
            <p className="text-sm sm:text-base leading-relaxed text-zinc-600 dark:text-zinc-300">
              When you rent, your unrecoverable cost is simply the monthly rent check paid to the landlord. But when you buy, you pay four substantial unrecoverable costs every single month:
            </p>
            <ul className="list-disc pl-6 space-y-2 text-sm sm:text-base text-zinc-600 dark:text-zinc-300">
              <li><strong>Mortgage Interest:</strong> During the first 10 years of a loan, 60% to 75% of your payment goes directly to bank interest, not your equity. You can model this dynamic using our <Link href="/calculators/mortgage-15-vs-30-year-calculator" className="text-teal-600 dark:text-teal-400 font-semibold underline underline-offset-2 hover:text-teal-700">15-Year vs. 30-Year Mortgage Calculator</Link>.</li>
              <li><strong>Property Taxes:</strong> Typically 1.0% to 2.5% of your home value every year, paid indefinitely to local municipalities.</li>
              <li><strong>Maintenance &amp; Capital Expenditures:</strong> Roof replacements, HVAC repairs, plumbing, and landscaping average 1% of the property value annually.</li>
              <li><strong>Cost of Capital (Opportunity Cost):</strong> Cash locked in a down payment and transaction fees cannot grow in the stock market or tax-advantaged accounts like a <Link href="/calculators/roth-ira-calculator" className="text-teal-600 dark:text-teal-400 font-semibold underline underline-offset-2 hover:text-teal-700">Roth IRA Growth Portfolio</Link>.</li>
            </ul>
          </section>

          {/* Section 2: The 5% Rule Benchmark Table */}
          <section className="space-y-4">
            <h2 className="text-2xl font-bold font-heading text-zinc-900 dark:text-white">
              The 5% Rule: Quick Rent vs. Buy Benchmark
            </h2>
            <p className="text-sm sm:text-base leading-relaxed text-zinc-600 dark:text-zinc-300">
              The 5% Rule states that if annual rent for an equivalent home is less than 5% of the purchase price, renting and investing the difference will generally yield a higher net worth. Here is how equivalent monthly benchmarks compare across price tiers:
            </p>
            <div className="overflow-x-auto rounded-2xl border border-zinc-200 dark:border-zinc-800">
              <table className="w-full text-left text-xs sm:text-sm">
                <thead className="bg-zinc-100 dark:bg-zinc-800/80 text-zinc-700 dark:text-zinc-200">
                  <tr>
                    <th className="p-3 sm:p-4 font-bold">Home Purchase Price</th>
                    <th className="p-3 sm:p-4 font-bold">5% Annual Cost</th>
                    <th className="p-3 sm:p-4 font-bold text-teal-600 dark:text-teal-400">Equivalent Breakeven Monthly Rent</th>
                    <th className="p-3 sm:p-4 font-bold">Rule of Thumb Verdict</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-zinc-200 dark:divide-zinc-800 text-zinc-600 dark:text-zinc-300">
                  <tr>
                    <td className="p-3 sm:p-4 font-semibold font-mono">$300,000</td>
                    <td className="p-3 sm:p-4 font-mono">$15,000/yr</td>
                    <td className="p-3 sm:p-4 font-bold font-mono text-teal-600 dark:text-teal-400">$1,250/mo</td>
                    <td className="p-3 sm:p-4">If rent is under $1,250, renting favors you.</td>
                  </tr>
                  <tr>
                    <td className="p-3 sm:p-4 font-semibold font-mono">$420,000</td>
                    <td className="p-3 sm:p-4 font-mono">$21,000/yr</td>
                    <td className="p-3 sm:p-4 font-bold font-mono text-teal-600 dark:text-teal-400">$1,750/mo</td>
                    <td className="p-3 sm:p-4">If rent is under $1,750, renting favors you.</td>
                  </tr>
                  <tr>
                    <td className="p-3 sm:p-4 font-semibold font-mono">$600,000</td>
                    <td className="p-3 sm:p-4 font-mono">$30,000/yr</td>
                    <td className="p-3 sm:p-4 font-bold font-mono text-teal-600 dark:text-teal-400">$2,500/mo</td>
                    <td className="p-3 sm:p-4">If rent is under $2,500, renting favors you.</td>
                  </tr>
                  <tr>
                    <td className="p-3 sm:p-4 font-semibold font-mono">$800,000</td>
                    <td className="p-3 sm:p-4 font-mono">$40,000/yr</td>
                    <td className="p-3 sm:p-4 font-bold font-mono text-teal-600 dark:text-teal-400">$3,333/mo</td>
                    <td className="p-3 sm:p-4">If rent is under $3,333, renting favors you.</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </section>

          {/* Section 3: Strategic Allocation & Long-Term Financial Health */}
          <section className="space-y-4">
            <h2 className="text-2xl font-bold font-heading text-zinc-900 dark:text-white">
              Integrating Housing Decisions with Overall Wealth Strategy
            </h2>
            <p className="text-sm sm:text-base leading-relaxed text-zinc-600 dark:text-zinc-300">
              A key finding in long-term financial studies is that <strong>renters only win if they actually invest their monthly savings</strong>. If you rent a home for $2,200 instead of buying for $3,000, but spend that $800 difference on dining and consumer goods, homeownership will almost always build more wealth by acting as a forced savings mechanism.
            </p>
            <p className="text-sm sm:text-base leading-relaxed text-zinc-600 dark:text-zinc-300">
              Conversely, if a renter channels that extra cash into equity mutual funds compounding at 8% to 10% annually using the framework modeled in our{" "}
              <Link
                href="/calculators/ramsey-investment-calculator"
                className="text-teal-600 dark:text-teal-400 font-semibold underline underline-offset-2 hover:text-teal-700"
              >
                Dave Ramsey Investment Calculator
              </Link>
              , their liquid portfolio can easily outpace home equity growth—especially in high-interest rate environments.
            </p>
            <p className="text-sm sm:text-base leading-relaxed text-zinc-600 dark:text-zinc-300">
              Before committing to a multi-hundred-thousand dollar mortgage, ensure your household cash flow is optimized. Use our{" "}
              <Link
                href="/calculators/paycheck-calculator"
                className="text-teal-600 dark:text-teal-400 font-semibold underline underline-offset-2 hover:text-teal-700"
              >
                US State Paycheck Calculators Hub
              </Link>
              {" "}to calculate your exact net take-home salary after state and federal deductions, and check your hourly wage equivalents with the{" "}
              <Link
                href="/calculators/hourly-to-salary-calculator"
                className="text-teal-600 dark:text-teal-400 font-semibold underline underline-offset-2 hover:text-teal-700"
              >
                Hourly to Salary Converter
              </Link>
              .
            </p>
          </section>

          {/* Section 4: Comprehensive Frequently Asked Questions */}
          <section className="space-y-6">
            <h2 className="text-2xl sm:text-3xl font-bold font-heading text-zinc-900 dark:text-white">
              Frequently Asked Questions About Renting vs. Buying
            </h2>

            <div className="space-y-4">
              <div className="p-5 rounded-2xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 space-y-2">
                <h3 className="text-base font-bold text-zinc-900 dark:text-white flex items-center gap-2">
                  <ShieldCheck size={18} className="text-teal-500 shrink-0" />
                  <span>How long do I need to stay in a home for buying to make sense?</span>
                </h3>
                <p className="text-xs sm:text-sm text-zinc-600 dark:text-zinc-300 leading-relaxed pl-6">
                  Most buyers need to stay in a home for at least 4 to 7 years to break even. This timeline is necessary to overcome the 2% to 4% upfront buying closing costs and the 5% to 6% realtor commissions and transfer fees when selling.
                </p>
              </div>

              <div className="p-5 rounded-2xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 space-y-2">
                <h3 className="text-base font-bold text-zinc-900 dark:text-white flex items-center gap-2">
                  <ShieldCheck size={18} className="text-teal-500 shrink-0" />
                  <span>What is the 5% rule for renting vs. buying?</span>
                </h3>
                <p className="text-xs sm:text-sm text-zinc-600 dark:text-zinc-300 leading-relaxed pl-6">
                  The 5% rule estimates unrecoverable home costs as 1% property tax + 1% maintenance + 3% cost of capital. If equivalent monthly rent is less than (Home Value × 0.05) / 12, renting is generally the mathematically superior choice.
                </p>
              </div>

              <div className="p-5 rounded-2xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 space-y-2">
                <h3 className="text-base font-bold text-zinc-900 dark:text-white flex items-center gap-2">
                  <ShieldCheck size={18} className="text-teal-500 shrink-0" />
                  <span>How does down payment opportunity cost affect the calculation?</span>
                </h3>
                <p className="text-xs sm:text-sm text-zinc-600 dark:text-zinc-300 leading-relaxed pl-6">
                  Money tied up in home equity cannot compound in diversified stock index funds. A renter who invests their $84,000 down payment at 8% annual returns generates substantial compound wealth that counterbalances home appreciation.
                </p>
              </div>

              <div className="p-5 rounded-2xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 space-y-2">
                <h3 className="text-base font-bold text-zinc-900 dark:text-white flex items-center gap-2">
                  <ShieldCheck size={18} className="text-teal-500 shrink-0" />
                  <span>Does renting build zero wealth compared to buying?</span>
                </h3>
                <p className="text-xs sm:text-sm text-zinc-600 dark:text-zinc-300 leading-relaxed pl-6">
                  Not at all. Renting provides liquidity, geographic flexibility, and caps your monthly housing expense. A renter who consistently invests their down payment and monthly savings in equities can accumulate a net worth that rivals or surpasses typical homeowners.
                </p>
              </div>
            </div>
          </section>

          {/* Section 5: Related Financial Tools Grid */}
          <section className="space-y-6 pt-4 border-t border-zinc-200 dark:border-zinc-800">
            <h2 className="text-xl sm:text-2xl font-bold font-heading text-zinc-900 dark:text-white">
              Explore Related Real Estate &amp; Wealth Engines
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              <Link
                href="/calculators/mortgage-15-vs-30-year-calculator"
                className="group p-5 rounded-2xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 hover:border-teal-500/50 hover:shadow-md transition-all space-y-2"
              >
                <div className="flex items-center justify-between">
                  <div className="w-9 h-9 rounded-xl bg-teal-500/10 text-teal-600 dark:text-teal-400 flex items-center justify-center">
                    <Home size={18} />
                  </div>
                  <ArrowRight size={14} className="text-zinc-400 group-hover:translate-x-1 transition-transform" />
                </div>
                <h3 className="font-bold text-sm text-zinc-900 dark:text-white group-hover:text-teal-600 transition-colors">
                  15-Year vs. 30-Year Mortgage Calculator
                </h3>
                <p className="text-xs text-zinc-500 dark:text-zinc-400">
                  Compare monthly payment differences, lifetime interest costs, and prepayment savings.
                </p>
              </Link>

              <Link
                href="/calculators/roth-ira-calculator"
                className="group p-5 rounded-2xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 hover:border-emerald-500/50 hover:shadow-md transition-all space-y-2"
              >
                <div className="flex items-center justify-between">
                  <div className="w-9 h-9 rounded-xl bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 flex items-center justify-center">
                    <PiggyBank size={18} />
                  </div>
                  <ArrowRight size={14} className="text-zinc-400 group-hover:translate-x-1 transition-transform" />
                </div>
                <h3 className="font-bold text-sm text-zinc-900 dark:text-white group-hover:text-emerald-600 transition-colors">
                  Roth IRA Growth Calculator
                </h3>
                <p className="text-xs text-zinc-500 dark:text-zinc-400">
                  Project tax-free compound retirement wealth vs. taxable accounts.
                </p>
              </Link>

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
                  Simulate wealth accumulation using the 15% rule and recommended 4-fund portfolio allocation.
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
                  Simulate portfolio drawdown runway with inflation adjustments and safe withdrawal rate (SWR) risk gauges.
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
                  Calculate net take-home salary across all 50 states with current federal brackets and FICA.
                </p>
              </Link>

              <Link
                href="/calculators/cd-calculator"
                className="group p-5 rounded-2xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 hover:border-cyan-500/50 hover:shadow-md transition-all space-y-2"
              >
                <div className="flex items-center justify-between">
                  <div className="w-9 h-9 rounded-xl bg-cyan-500/10 text-cyan-600 dark:text-cyan-400 flex items-center justify-center">
                    <Coins size={18} />
                  </div>
                  <ArrowRight size={14} className="text-zinc-400 group-hover:translate-x-1 transition-transform" />
                </div>
                <h3 className="font-bold text-sm text-zinc-900 dark:text-white group-hover:text-cyan-600 transition-colors">
                  Certificate of Deposit (CD) Calculator
                </h3>
                <p className="text-xs text-zinc-500 dark:text-zinc-400">
                  Calculate fixed guaranteed compound interest on down payment savings.
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
