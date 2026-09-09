import Navbar from "@/components/Navbar";
import Breadcrumbs from "@/components/Breadcrumbs";
import Footer from "@/components/Footer";
import ShareButtons from "@/components/ShareButtons";
import Link from "next/link";
import type { Metadata } from "next";
import { MapPin, ArrowRight, CheckCircle2 } from "lucide-react";
import { STATE_CALCULATORS, getLiveStateCalculators } from "@/lib/stateCalculatorsData";

export const metadata: Metadata = {
  title: "State Paycheck Calculators (2026) — Take-Home Pay by State",
  description: "Calculate your take-home pay in all 50 US states. Compare 2026 flat, progressive, and zero income tax withholding rates with live salary and hourly calculators.",
  alternates: {
    canonical: "/paycheck-calculators",
  },
  openGraph: {
    title: "State Paycheck Calculators (2026) — Take-Home Pay by State",
    description: "Calculate your take-home pay in all 50 US states. Compare 2026 flat, progressive, and zero income tax withholding rates with live salary and hourly calculators.",
    url: "https://quickcalc.cloud/paycheck-calculators",
    type: "website",
    siteName: "QuickCalc",
    images: [
      {
        url: "https://quickcalc.cloud/og-image.png",
        width: 1200,
        height: 630,
        alt: "State Paycheck Calculators by QuickCalc",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "State Paycheck Calculators (2026) — Take-Home Pay by State",
    description: "Calculate your take-home pay in all 50 US states. Compare 2026 flat, progressive, and zero income tax withholding rates with live salary and hourly calculators.",
  },
};

export default function PaycheckCalculatorsHubPage() {
  const liveCalculators = getLiveStateCalculators();

  const faqs = [
    {
      question: "Which US states have no personal income tax on employee paychecks?",
      answer: "Nine states impose no general state income tax on earned employee wages: Alaska, Florida, Nevada, New Hampshire, South Dakota, Tennessee, Texas, Washington, and Wyoming. Workers in these states only have federal income tax and FICA (Social Security and Medicare) deducted from their paychecks.",
    },
    {
      question: "What is the difference between flat tax and progressive bracket states?",
      answer: "A flat tax state (such as Illinois at 4.95%, Colorado at 4.4%, or Indiana at 3.05%) applies one single percentage rate to all taxable income above statutory exemptions regardless of earnings. A progressive tax state (such as Arkansas, Wisconsin, or California) assesses higher percentage rates on higher increments of income.",
    },
    {
      question: "How do pre-tax deductions lower my state and federal paycheck withholdings?",
      answer: "Contributions to traditional 401(k), 403(b), HSA, and employer-sponsored health insurance plans reduce your gross taxable income before federal and state taxes are calculated. For example, contributing $5,000 annually in a state with a 4.95% rate saves you roughly $248 in state tax plus hundreds more in federal tax.",
    },
    {
      question: "Do city or municipal income taxes come out of my paycheck?",
      answer: "In most states (including Illinois, Texas, and Washington), municipalities do not levy an earned income tax on wages. However, workers in states like Pennsylvania (local EIT), Ohio (municipal income tax), New York (NYC resident tax), and Indiana (county income taxes) have additional local wage withholdings deducted directly from their pay.",
    },
    {
      question: "Which states exempt Social Security and retirement income?",
      answer: "A substantial majority of US states exempt Social Security benefits from state taxation. Furthermore, states like Illinois and Pennsylvania completely exempt public pensions, corporate pensions, and qualified 401(k)/IRA distributions from state income tax.",
    },
    {
      question: "How frequently are paycheck withholding rates updated on QuickCalc?",
      answer: "All state salary and paycheck calculators on QuickCalc are updated annually for statutory legislative changes, ballot initiatives, standard deduction inflation adjustments, and IRS/SSA parameters (such as the 2026 $184,500 Social Security wage base cap).",
    },
  ];

  const collectionSchema = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    "name": "State Paycheck Calculators (2026) — Take-Home Pay by State",
    "description": "Comprehensive directory of 50 US state salary and paycheck calculators featuring updated 2026 federal, state, and FICA withholding algorithms.",
    "url": "https://quickcalc.cloud/paycheck-calculators",
    "mainEntity": {
      "@type": "ItemList",
      "itemListElement": liveCalculators.map((state, index) => ({
        "@type": "ListItem",
        "position": index + 1,
        "name": state.title,
        "url": `https://quickcalc.cloud${state.href}`,
        "description": state.description,
      })),
    },
  };

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      {
        "@type": "ListItem",
        "position": 1,
        "name": "Home",
        "item": "https://quickcalc.cloud",
      },
      {
        "@type": "ListItem",
        "position": 2,
        "name": "Paycheck Calculators",
        "item": "https://quickcalc.cloud/paycheck-calculators",
      },
    ],
  };

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": faqs.map((f) => ({
      "@type": "Question",
      "name": f.question,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": f.answer,
      },
    })),
  };

  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-zinc-950 text-zinc-900 dark:text-zinc-100 font-[family-name:var(--font-geist-sans)] transition-colors flex flex-col justify-between">
      {/* Schemas */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(collectionSchema) }}
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

      <main className="max-w-5xl mx-auto px-4 py-8 sm:py-12 flex-1 w-full">
        <Breadcrumbs toolName="Paycheck Calculators by State" toolSlug="paycheck-calculators" />

        {/* Hero Section */}
        <div className="text-center max-w-3xl mx-auto mb-10 sm:mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-teal-500/10 text-teal-700 dark:text-teal-300 border border-teal-500/20 mb-3">
            <MapPin size={13} />
            <span>50-State Take-Home Pay Engine</span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-zinc-900 dark:text-white mb-4">
            US State Salary & Paycheck Calculators (2026)
          </h1>

          <p className="text-base sm:text-lg text-zinc-600 dark:text-zinc-400 leading-relaxed font-normal">
            Every US state treats your paycheck differently. While nine states levy zero income tax on wages, others assess flat percentages (like Illinois&apos;s 4.95%) or multi-tier progressive brackets (like Arkansas&apos;s 3.7% and California&apos;s 13.3%). Use the state calculators below to compute your exact net earnings after federal brackets, state withholdings, and FICA contributions.
          </p>

          <div className="mt-6 flex justify-center">
            <ShareButtons
              url="https://quickcalc.cloud/paycheck-calculators"
              title="State Paycheck Calculators (2026) — Take-Home Pay by State"
            />
          </div>
        </div>

        {/* Key Metrics Overview Bar */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4 mb-10">
          <div className="bg-white dark:bg-zinc-900 p-4 rounded-2xl border border-zinc-200 dark:border-zinc-800 text-center shadow-xs">
            <span className="text-[11px] font-bold text-zinc-500 uppercase tracking-wider block">Zero Tax States</span>
            <span className="text-2xl font-black text-zinc-900 dark:text-white mt-1 block">9 States</span>
            <span className="text-[11px] text-zinc-400 mt-0.5 block">TX, FL, WA, NV, TN...</span>
          </div>

          <div className="bg-white dark:bg-zinc-900 p-4 rounded-2xl border border-zinc-200 dark:border-zinc-800 text-center shadow-xs">
            <span className="text-[11px] font-bold text-zinc-500 uppercase tracking-wider block">Flat Tax States</span>
            <span className="text-2xl font-black text-teal-600 dark:text-teal-400 mt-1 block">14 States</span>
            <span className="text-[11px] text-zinc-400 mt-0.5 block">IL, IN, CO, NC, GA...</span>
          </div>

          <div className="bg-white dark:bg-zinc-900 p-4 rounded-2xl border border-zinc-200 dark:border-zinc-800 text-center shadow-xs">
            <span className="text-[11px] font-bold text-zinc-500 uppercase tracking-wider block">Graduated Bracket States</span>
            <span className="text-2xl font-black text-zinc-900 dark:text-white mt-1 block">27 States</span>
            <span className="text-[11px] text-zinc-400 mt-0.5 block">AR, CA, NY, NJ, WI...</span>
          </div>

          <div className="bg-white dark:bg-zinc-900 p-4 rounded-2xl border border-zinc-200 dark:border-zinc-800 text-center shadow-xs">
            <span className="text-[11px] font-bold text-zinc-500 uppercase tracking-wider block">2026 Social Security Cap</span>
            <span className="text-2xl font-black text-zinc-900 dark:text-white mt-1 block">$184,500</span>
            <span className="text-[11px] text-zinc-400 mt-0.5 block">6.2% Statutory Cap</span>
          </div>
        </div>

        {/* FEATURED LIVE CALCULATORS */}
        <section className="mb-12">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h2 className="text-2xl font-bold text-zinc-900 dark:text-white">
                Live State Paycheck Calculators
              </h2>
              <p className="text-sm text-zinc-600 dark:text-zinc-400 mt-0.5">
                Fully functional with 2026 tax tables, hourly-to-salary toggles, and pay frequency schedules:
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
            {liveCalculators.map((state) => (
              <Link
                key={state.slug}
                href={state.href}
                className="group relative bg-white dark:bg-zinc-900 border-2 border-teal-500/50 hover:border-teal-500 rounded-2xl p-6 shadow-sm hover:shadow-xl hover:-translate-y-0.5 transition-all flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-start justify-between gap-3 mb-3">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-xl bg-teal-500/10 text-teal-600 dark:text-teal-400 flex items-center justify-center font-black text-sm">
                        {state.abbrev}
                      </div>
                      <div>
                        <h3 className="text-lg font-bold text-zinc-900 dark:text-white group-hover:text-teal-600 dark:group-hover:text-teal-400 transition-colors">
                          {state.title}
                        </h3>
                        <span className="text-xs text-zinc-500">
                          {state.name} &bull; {state.taxType === "flat" ? "Flat Tax" : state.taxType === "none" ? "No State Tax" : "Graduated Brackets"}
                        </span>
                      </div>
                    </div>

                    <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[11px] font-bold bg-teal-500 text-white shadow-xs">
                      <CheckCircle2 size={12} />
                      <span>{state.badge || "Live 2026"}</span>
                    </span>
                  </div>

                  <p className="text-xs sm:text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed mb-4">
                    {state.description}
                  </p>
                </div>

                <div className="flex items-center justify-between pt-3 border-t border-zinc-100 dark:border-zinc-800 text-xs font-bold text-teal-600 dark:text-teal-400">
                  <span>Calculate {state.name} Take-Home Pay</span>
                  <span className="inline-flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                    <span>Open Tool</span>
                    <ArrowRight size={14} />
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </section>

        {/* ALL 50 STATES DIRECTORY */}
        <section className="mb-12 bg-white dark:bg-zinc-900 p-6 sm:p-8 rounded-2xl border border-zinc-200 dark:border-zinc-800">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-6 pb-4 border-b border-zinc-100 dark:border-zinc-800">
            <div>
              <h2 className="text-2xl font-bold text-zinc-900 dark:text-white">
                50-State Take-Home Pay Directory
              </h2>
              <p className="text-xs sm:text-sm text-zinc-600 dark:text-zinc-400 mt-1">
                Alphabetical listing of all 50 states with statutory income tax rates and live tool links:
              </p>
            </div>

            <div className="flex items-center gap-3 text-xs text-zinc-500">
              <span className="flex items-center gap-1">
                <span className="w-2 h-2 rounded-full bg-teal-500"></span>
                <span>Live Calculator</span>
              </span>
              <span className="flex items-center gap-1">
                <span className="w-2 h-2 rounded-full bg-zinc-300 dark:bg-zinc-700"></span>
                <span>In Development</span>
              </span>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {STATE_CALCULATORS.map((state) => {
              if (state.isLive) {
                return (
                  <Link
                    key={state.slug}
                    href={state.href}
                    className="p-3.5 rounded-xl border border-teal-500/60 bg-teal-50/40 dark:bg-teal-950/20 hover:border-teal-500 hover:shadow-md transition-all flex items-center justify-between group"
                  >
                    <div className="flex items-center gap-2.5">
                      <span className="font-mono text-xs font-bold text-teal-700 dark:text-teal-300 w-6">
                        {state.abbrev}
                      </span>
                      <div>
                        <span className="font-bold text-sm text-zinc-900 dark:text-white group-hover:text-teal-600 dark:group-hover:text-teal-400 block">
                          {state.name}
                        </span>
                        <span className="text-[11px] text-zinc-500">
                          {state.taxType === "none" ? "0% Tax" : `${state.topRateText} ${state.taxType}`}
                        </span>
                      </div>
                    </div>

                    <span className="text-[10px] font-bold px-2 py-0.5 rounded-md bg-teal-600 text-white">
                      Live
                    </span>
                  </Link>
                );
              }

              return (
                <div
                  key={state.slug}
                  className="p-3.5 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-zinc-50/50 dark:bg-zinc-800/30 flex items-center justify-between opacity-80"
                >
                  <div className="flex items-center gap-2.5">
                    <span className="font-mono text-xs font-semibold text-zinc-400 w-6">
                      {state.abbrev}
                    </span>
                    <div>
                      <span className="font-medium text-sm text-zinc-700 dark:text-zinc-300 block">
                        {state.name}
                      </span>
                      <span className="text-[11px] text-zinc-400">
                        {state.taxType === "none" ? "No Income Tax" : `${state.topRateText} ${state.taxType}`}
                      </span>
                    </div>
                  </div>

                  <span className="text-[10px] font-mono text-zinc-400 bg-zinc-200/60 dark:bg-zinc-800 px-1.5 py-0.5 rounded">
                    {state.topRateText}
                  </span>
                </div>
              );
            })}
          </div>
        </section>

        {/* EDUCATIONAL DIRECT-ANSWER / AEO SECTION */}
        <section className="mb-12 bg-white dark:bg-zinc-900 p-6 sm:p-8 rounded-2xl border border-zinc-200 dark:border-zinc-800 space-y-6">
          <div className="border-b border-zinc-100 dark:border-zinc-800 pb-4">
            <h2 className="text-2xl font-bold text-zinc-900 dark:text-white">
              How State Income Taxes Change Your Take-Home Pay
            </h2>
            <p className="text-sm text-zinc-600 dark:text-zinc-400 mt-1">
              Real dollar difference across state tax models on a $65,000 annual salary (Single Filer, 2026):
            </p>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs sm:text-sm border-collapse">
              <thead>
                <tr className="border-b border-zinc-200 dark:border-zinc-700 bg-zinc-50 dark:bg-zinc-800/50">
                  <th className="py-2.5 px-3 font-bold">State Model</th>
                  <th className="py-2.5 px-3 font-bold">Example State</th>
                  <th className="py-2.5 px-3 font-bold">State Withholding</th>
                  <th className="py-2.5 px-3 font-bold">Federal + FICA</th>
                  <th className="py-2.5 px-3 font-bold text-teal-700 dark:text-teal-300">Estimated Net Pay</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-zinc-200 dark:divide-zinc-800">
                <tr>
                  <td className="py-2.5 px-3 font-semibold">Zero Income Tax</td>
                  <td className="py-2.5 px-3">Texas / Florida</td>
                  <td className="py-2.5 px-3 font-mono text-emerald-600 dark:text-emerald-400">$0.00 (0.0%)</td>
                  <td className="py-2.5 px-3 font-mono">$10,886.50</td>
                  <td className="py-2.5 px-3 font-bold text-teal-600 dark:text-teal-400">$54,113.50</td>
                </tr>
                <tr>
                  <td className="py-2.5 px-3 font-semibold">Low Graduated Rate</td>
                  <td className="py-2.5 px-3">
                    <Link href="/tools/arkansas-salary-calculator" className="text-teal-600 underline font-medium">
                      Arkansas (3.7%)
                    </Link>
                  </td>
                  <td className="py-2.5 px-3 font-mono">$1,947.80</td>
                  <td className="py-2.5 px-3 font-mono">$10,886.50</td>
                  <td className="py-2.5 px-3 font-bold text-teal-600 dark:text-teal-400">$52,165.70</td>
                </tr>
                <tr>
                  <td className="py-2.5 px-3 font-semibold">Flat Income Tax</td>
                  <td className="py-2.5 px-3">
                    <Link href="/tools/illinois-paycheck-calculator" className="text-teal-600 underline font-medium">
                      Illinois (4.95%)
                    </Link>
                  </td>
                  <td className="py-2.5 px-3 font-mono">$3,072.71</td>
                  <td className="py-2.5 px-3 font-mono">$10,886.50</td>
                  <td className="py-2.5 px-3 font-bold text-teal-600 dark:text-teal-400">$51,040.79</td>
                </tr>
                <tr>
                  <td className="py-2.5 px-3 font-semibold">High Progressive Tier</td>
                  <td className="py-2.5 px-3">California / New York</td>
                  <td className="py-2.5 px-3 font-mono">~$3,900 to $4,500</td>
                  <td className="py-2.5 px-3 font-mono">$10,886.50</td>
                  <td className="py-2.5 px-3 font-bold text-teal-600 dark:text-teal-400">~$49,600.00</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        {/* FREQUENTLY ASKED QUESTIONS */}
        <section className="mb-12 bg-white dark:bg-zinc-900 p-6 sm:p-8 rounded-2xl border border-zinc-200 dark:border-zinc-800 space-y-6">
          <div className="border-b border-zinc-100 dark:border-zinc-800 pb-4">
            <h2 className="text-2xl font-bold text-zinc-900 dark:text-white">
              Frequently Asked Questions About State Paycheck Taxes
            </h2>
            <p className="text-sm text-zinc-600 dark:text-zinc-400 mt-1">
              Common questions on state tax residency, remote work withholding, and paycheck deductions.
            </p>
          </div>

          <div className="divide-y divide-zinc-200 dark:divide-zinc-800 space-y-6">
            {faqs.map((faq, index) => (
              <div key={index} className={index === 0 ? "pt-0" : "pt-6"}>
                <h3 className="text-base sm:text-lg font-bold text-zinc-900 dark:text-white mb-2">
                  {faq.question}
                </h3>
                <p className="text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed font-normal">
                  {faq.answer}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* RELATED PAYROLL & FINANCIAL TOOLS */}
        <section className="my-10 bg-zinc-100/70 dark:bg-zinc-900/60 p-6 sm:p-8 rounded-2xl border border-zinc-200 dark:border-zinc-800">
          <h2 className="text-xl font-bold text-zinc-900 dark:text-white mb-2">
            Related Payroll, Tax & Financial Calculators
          </h2>
          <p className="text-sm text-zinc-600 dark:text-zinc-400 mb-6">
            Model your overtime shifts, track Social Security caps, or plan savings:
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <Link
              href="/tools/oasdi-tax-calculator"
              className="p-4 bg-white dark:bg-zinc-800/80 rounded-xl border border-zinc-200 dark:border-zinc-700 hover:border-teal-500 hover:shadow-md transition-all group"
            >
              <div className="text-sm font-bold text-zinc-900 dark:text-white group-hover:text-teal-600 dark:group-hover:text-teal-400">
                OASDI Tax Calculator &rarr;
              </div>
              <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-1.5">
                Verify your exact 6.2% Social Security payroll deduction and the $184,500 wage base limit.
              </p>
            </Link>

            <Link
              href="/tools/salary-take-home-calculator"
              className="p-4 bg-white dark:bg-zinc-800/80 rounded-xl border border-zinc-200 dark:border-zinc-700 hover:border-teal-500 hover:shadow-md transition-all group"
            >
              <div className="text-sm font-bold text-zinc-900 dark:text-white group-hover:text-teal-600 dark:group-hover:text-teal-400">
                National Salary Calculator &rarr;
              </div>
              <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-1.5">
                Compare multi-country baseline take-home pay across the US, Canada, and Pakistan.
              </p>
            </Link>

            <Link
              href="/tools/work-hours-calculator"
              className="p-4 bg-white dark:bg-zinc-800/80 rounded-xl border border-zinc-200 dark:border-zinc-700 hover:border-teal-500 hover:shadow-md transition-all group"
            >
              <div className="text-sm font-bold text-zinc-900 dark:text-white group-hover:text-teal-600 dark:group-hover:text-teal-400">
                Work Hours & Timesheet &rarr;
              </div>
              <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-1.5">
                Calculate shift hours, unpaid breaks, and 1.5x overtime gross wages.
              </p>
            </Link>

            <Link
              href="/tools/retirement-withdrawal-simulator"
              className="p-4 bg-white dark:bg-zinc-800/80 rounded-xl border border-zinc-200 dark:border-zinc-700 hover:border-teal-500 hover:shadow-md transition-all group"
            >
              <div className="text-sm font-bold text-zinc-900 dark:text-white group-hover:text-teal-600 dark:group-hover:text-teal-400">
                Retirement Safe Withdrawal &rarr;
              </div>
              <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-1.5">
                Backtest your retirement portfolio survival rate over 96 years of market history.
              </p>
            </Link>
          </div>
        </section>
      </main>

      <Footer customText="QuickCalc US State Salary and Paycheck Calculator directory. Updated with 2026 federal and state tax rates." />
    </div>
  );
}
