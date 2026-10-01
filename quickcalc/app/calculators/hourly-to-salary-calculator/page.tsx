import type { Metadata } from "next";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import AdSlot from "@/components/AdSlot";
import HourlyToSalaryWidget from "./HourlyToSalaryWidget";
import {
  HOURLY_BENCHMARKS,
  formatMoney,
} from "@/lib/calculators/hourlySalaryCalculator";
import {
  Clock,
  TrendingUp,
  Building2,
  ArrowRight,
  Scale,
} from "lucide-react";

export const metadata: Metadata = {
  title: "Hourly to Salary Calculator - Convert Hourly Wage to Annual Salary | QuickCalc",
  description:
    "Convert your hourly wage into annual salary, monthly, bi-weekly, and weekly pay. Calculate adjustments for 40-hour work weeks, overtime (1.5x), unpaid vacation, and bonuses.",
  keywords: [
    "hourly to salary calculator",
    "convert hourly wage to salary",
    "hourly to annual salary",
    "hourly to monthly calculator",
    "hourly to biweekly pay calculator",
    "how much is 35 an hour annually",
    "2080 work hours per year",
  ],
  alternates: {
    canonical: "https://quickcalc.cloud/calculators/hourly-to-salary-calculator",
  },
  openGraph: {
    title: "Hourly to Salary Calculator | QuickCalc",
    description:
      "Instantly calculate gross annual salary, monthly, bi-weekly, and weekly pay from any hourly wage with overtime and vacation adjustments.",
    url: "https://quickcalc.cloud/calculators/hourly-to-salary-calculator",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Hourly to Salary Calculator | QuickCalc",
    description:
      "Interactive hourly wage to annual salary converter with overtime, unpaid PTO, and bonus calculators.",
  },
};

export default function HourlyToSalaryPage() {
  const softwareSchema = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: "Hourly to Salary Calculator",
    applicationCategory: "FinanceApplication",
    operatingSystem: "All",
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "USD",
    },
    description:
      "Free interactive tool to convert hourly wages to annual salary, bi-weekly, and monthly earnings with overtime and vacation adjustments.",
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
        name: "Hourly to Salary Calculator",
        item: "https://quickcalc.cloud/calculators/hourly-to-salary-calculator",
      },
    ],
  };

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: "How do you calculate annual salary from an hourly wage?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "The standard industry formula multiplies your hourly wage by 2,080 hours (40 hours per week × 52 weeks per year). For example, at $35 per hour, your annual salary is $35 × 2,080 = $72,800 per year before taxes.",
        },
      },
      {
        "@type": "Question",
        name: "Why is 2,080 used as the standard annual working hours?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "A typical full-time job consists of 40 hours per week over 52 calendar weeks: 40 × 52 = 2,080 hours. Government agencies (such as the US Office of Personnel Management) and corporate payroll departments use 2,080 as the standard divisor for converting between hourly and salaried pay.",
        },
      },
      {
        "@type": "Question",
        name: "What is the difference between bi-weekly and semi-monthly pay?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Bi-weekly pay occurs every two weeks, resulting in 26 paychecks per year. Two months each year have 3 paychecks instead of 2. Semi-monthly pay occurs twice a month (typically on the 1st and 15th), resulting in 24 equal paychecks per year. Each semi-monthly check is slightly larger than a bi-weekly check for the same annual salary.",
        },
      },
      {
        "@type": "Question",
        name: "How does overtime pay affect annual salary calculations?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Under the US Fair Labor Standards Act (FLSA), non-exempt employees working more than 40 hours per week are entitled to overtime pay at 1.5 times their regular hourly rate (time-and-a-half). For example, at $30/hr, overtime hours are compensated at $45/hr.",
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
          <span className="text-ink font-bold">Hourly to Salary</span>
        </nav>

        {/* Page Hero Header */}
        <div className="space-y-4 text-center sm:text-left">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-teal-500/10 text-teal-700 dark:text-teal-300 border border-teal-500/20">
            <Clock size={14} />
            <span>Wage &amp; Compensation Converter</span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-heading font-extrabold text-ink tracking-tight">
            Hourly to Salary Calculator
          </h1>

          <p className="text-sm sm:text-base text-ink-muted max-w-3xl leading-relaxed">
            Convert any hourly pay rate into equivalent annual salary, monthly, bi-weekly, and weekly earnings.
            Customize work hours, factor in overtime pay at 1.5x, unpaid time off, and annual bonuses.
          </p>
        </div>

        {/* AdSlot Top */}
        <AdSlot slot="tool-top" className="my-4" />

        {/* Interactive Calculator Widget */}
        <section aria-label="Hourly to Salary Calculator Widget">
          <HourlyToSalaryWidget />
        </section>

        {/* Popular Wage Benchmark Table */}
        <section className="bg-base-card border border-surface-border rounded-3xl p-6 sm:p-8 space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-2">
            <div>
              <h2 className="text-xl sm:text-2xl font-heading font-extrabold text-ink">
                Hourly to Annual Salary Benchmark Table
              </h2>
              <p className="text-xs sm:text-sm text-ink-muted mt-1">
                Standard full-time conversion based on 40 hours per week and 52 weeks per year (2,080 hours).
              </p>
            </div>
            <span className="text-xs font-bold text-teal-600 dark:text-teal-400 bg-teal-500/10 px-3 py-1 rounded-full border border-teal-500/20 self-start sm:self-auto">
              Standard 2,080 Hrs
            </span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs sm:text-sm">
              <thead>
                <tr className="border-b border-surface-border bg-surface-muted/40 text-ink-muted">
                  <th className="py-3 px-4 font-bold">Hourly Rate</th>
                  <th className="py-3 px-4 font-bold text-right">Gross Annual Salary</th>
                  <th className="py-3 px-4 font-bold text-right">Monthly Pay (12x)</th>
                  <th className="py-3 px-4 font-bold text-right text-teal-600 dark:text-teal-400">
                    Bi-Weekly Pay (26x)
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-surface-border/60 font-mono">
                {HOURLY_BENCHMARKS.map((row) => (
                  <tr key={row.hourly} className="hover:bg-surface-muted/30 transition-colors">
                    <td className="py-3 px-4 font-bold text-ink font-sans">
                      ${row.hourly}.00 / hr
                    </td>
                    <td className="py-3 px-4 text-right font-bold text-ink">
                      {formatMoney(row.annual)}
                    </td>
                    <td className="py-3 px-4 text-right text-ink-muted">
                      {formatMoney(row.monthly)}
                    </td>
                    <td className="py-3 px-4 text-right font-bold text-teal-700 dark:text-teal-300">
                      {formatMoney(row.biweekly)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* Rich Editorial Guide & Deep-Dive Content */}
        <section className="space-y-8 text-ink leading-relaxed">
          <div className="bg-base-card border border-surface-border rounded-3xl p-6 sm:p-8 space-y-4">
            <h2 className="text-xl sm:text-2xl font-heading font-extrabold text-ink">
              How the Hourly to Salary Calculation Works
            </h2>
            <p className="text-sm text-ink-muted">
              Converting an hourly rate to an annual salary is based on the number of hours you work each week multiplied by the number of weeks in a year. For a standard full-time employee:
            </p>
            <div className="p-4 rounded-2xl bg-surface-muted border border-surface-border font-mono text-xs sm:text-sm space-y-1">
              <div><strong>Formula:</strong> Annual Salary = Hourly Wage × Weekly Hours × Weeks per Year</div>
              <div className="text-teal-600 dark:text-teal-400">
                <strong>Standard 40-Hour Week:</strong> $35 × 40 hrs/wk × 52 weeks = <strong>$72,800 / year</strong>
              </div>
            </div>
            <p className="text-sm text-ink-muted">
              Because 40 hours per week times 52 weeks equals exactly <strong>2,080 hours</strong>, multiplying any hourly wage by 2,080 gives you your unadjusted full-time annual base salary.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-base-card border border-surface-border rounded-3xl p-6 space-y-3">
              <h3 className="text-base font-bold text-ink flex items-center gap-2">
                <Clock size={18} className="text-teal-600 dark:text-teal-400" />
                <span>Bi-Weekly vs. Semi-Monthly Differences</span>
              </h3>
              <p className="text-xs sm:text-sm text-ink-muted leading-relaxed">
                Many employees confuse <strong>bi-weekly</strong> pay (paid every two weeks, 26 times per year) with <strong>semi-monthly</strong> pay (paid twice a month, 24 times per year). With bi-weekly pay, two months during the year will have <em>three</em> paychecks, giving you extra cash flow in those months.
              </p>
            </div>

            <div className="bg-base-card border border-surface-border rounded-3xl p-6 space-y-3">
              <h3 className="text-base font-bold text-ink flex items-center gap-2">
                <TrendingUp size={18} className="text-teal-600 dark:text-teal-400" />
                <span>Factoring in Overtime &amp; FLSA Rules</span>
              </h3>
              <p className="text-xs sm:text-sm text-ink-muted leading-relaxed">
                Under the Fair Labor Standards Act (FLSA), eligible non-exempt hourly employees must receive at least <strong>1.5 times</strong> their standard rate for hours worked beyond 40 in a workweek. If you earn $30/hr and work 5 hours of overtime each week, those extra hours yield $225/week ($11,700/year).
              </p>
            </div>
          </div>

          {/* Related Financial Calculators Suite */}
          <div className="bg-surface-muted/60 border border-surface-border rounded-3xl p-6 sm:p-8 space-y-4">
            <h3 className="text-lg font-heading font-bold text-ink">
              Related Financial Calculators on QuickCalc
            </h3>
            <p className="text-xs sm:text-sm text-ink-muted">
              Take your personal financial planning to the next level with our suite of interactive wealth and debt engines:
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 pt-2">
              <Link
                href="/calculators/paycheck-calculator"
                className="group p-4 rounded-2xl bg-base-card border border-surface-border hover:border-teal-500/50 transition-all flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center gap-2 mb-2 text-teal-600 dark:text-teal-400">
                    <Building2 size={18} />
                    <span className="font-bold text-sm text-ink group-hover:text-teal-600 dark:group-hover:text-teal-400">
                      US State Paycheck Hub
                    </span>
                  </div>
                  <p className="text-xs text-ink-muted">
                    Calculate net take-home pay after federal, FICA, and state tax withholding across all 50 states.
                  </p>
                </div>
                <div className="mt-3 text-xs font-bold text-teal-600 dark:text-teal-400 inline-flex items-center gap-1">
                  <span>Calculate Taxes</span>
                  <ArrowRight size={13} className="group-hover:translate-x-1 transition-transform" />
                </div>
              </Link>

              <Link
                href="/calculators/debt-snowball-vs-avalanche-calculator"
                className="group p-4 rounded-2xl bg-base-card border border-surface-border hover:border-indigo-500/50 transition-all flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center gap-2 mb-2 text-indigo-600 dark:text-indigo-400">
                    <Scale size={18} />
                    <span className="font-bold text-sm text-ink group-hover:text-indigo-600 dark:group-hover:text-indigo-400">
                      Debt Snowball vs Avalanche
                    </span>
                  </div>
                  <p className="text-xs text-ink-muted">
                    Compare payoff timelines and interest savings between the Dave Ramsey snowball and avalanche strategies.
                  </p>
                </div>
                <div className="mt-3 text-xs font-bold text-indigo-600 dark:text-indigo-400 inline-flex items-center gap-1">
                  <span>Compare Strategies</span>
                  <ArrowRight size={13} className="group-hover:translate-x-1 transition-transform" />
                </div>
              </Link>

              <Link
                href="/calculators/ramsey-investment-calculator"
                className="group p-4 rounded-2xl bg-base-card border border-surface-border hover:border-emerald-500/50 transition-all flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center gap-2 mb-2 text-emerald-600 dark:text-emerald-400">
                    <TrendingUp size={18} />
                    <span className="font-bold text-sm text-ink group-hover:text-emerald-600 dark:group-hover:text-emerald-400">
                      Ramsey Investment Calculator
                    </span>
                  </div>
                  <p className="text-xs text-ink-muted">
                    Project compound retirement wealth investing 15% of your annual salary into 4-fund growth mutual funds.
                  </p>
                </div>
                <div className="mt-3 text-xs font-bold text-emerald-600 dark:text-emerald-400 inline-flex items-center gap-1">
                  <span>Simulate 15% Rule</span>
                  <ArrowRight size={13} className="group-hover:translate-x-1 transition-transform" />
                </div>
              </Link>
            </div>
          </div>
        </section>

        {/* AdSlot Bottom */}
        <AdSlot slot="tool-bottom" className="my-8" />
      </main>

      <Footer customText="Convert hourly wages to salary with full overtime, unpaid PTO, and bonus customization." />
    </div>
  );
}
