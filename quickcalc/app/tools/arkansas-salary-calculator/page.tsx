import Navbar from "@/components/Navbar";
import { generateSoftwareAppSchema } from "@/lib/schema";
import ShareButtons from "@/components/ShareButtons";
import EmbedWidget from "@/components/EmbedWidget";
import Breadcrumbs from "@/components/Breadcrumbs";
import type { Metadata } from "next";
import Link from "next/link";
import StateSalaryCalculatorWidget from "@/components/StateSalaryCalculatorWidget";
import StateClusterLinks from "@/components/StateClusterLinks";
import { ARKANSAS_TAX_CONFIG } from "@/lib/calculators/stateTaxData/arkansas";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "Arkansas Salary Calculator (2026) — Take-Home Pay After Tax",
  description: "Calculate your take-home pay with our Arkansas salary calculator. Instant 2026 federal, state, and FICA tax breakdown with hourly and paycheck options.",
  alternates: {
    canonical: "/tools/arkansas-salary-calculator",
  },
  openGraph: {
    title: "Arkansas Salary Calculator (2026) — Take-Home Pay After Tax",
    description: "Calculate your take-home pay with our Arkansas salary calculator. Instant 2026 federal, state, and FICA tax breakdown with hourly and paycheck options.",
    url: "https://quickcalc.cloud/tools/arkansas-salary-calculator",
    type: "website",
    siteName: "QuickCalc",
    images: [
      {
        url: "https://quickcalc.cloud/og-image.png",
        width: 1200,
        height: 630,
        alt: "Arkansas Salary Calculator on QuickCalc",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Arkansas Salary Calculator (2026) — Take-Home Pay After Tax",
    description: "Calculate your take-home pay with our Arkansas salary calculator. Instant 2026 federal, state, and FICA tax breakdown with hourly and paycheck options.",
  },
};

export default function ArkansasSalaryCalculatorPage({ searchParams }: { searchParams?: { embed?: string } }) {
  const softwareSchema = generateSoftwareAppSchema({
    name: "Arkansas Salary Calculator (2026) — Take-Home Pay After Tax",
    description: "Instant client-side Arkansas salary and paycheck calculator applying the updated 3.7% state income tax rate and 2026 federal tax brackets.",
    slug: "arkansas-salary-calculator",
    category: "Finance",
  });

  const isEmbed = searchParams?.embed === "true";
  if (isEmbed) {
    return (
      <div className="min-h-screen bg-white dark:bg-zinc-950 text-zinc-900 dark:text-zinc-100 font-[family-name:var(--font-geist-sans)] transition-colors p-2 flex flex-col justify-between">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(softwareSchema) }}
        />
        <main className="max-w-4xl mx-auto w-full">
          <StateSalaryCalculatorWidget stateConfig={ARKANSAS_TAX_CONFIG} />
        </main>
      </div>
    );
  }

  const faqs = [
    {
      question: "What is the Arkansas state income tax rate for 2026?",
      answer: "Arkansas utilizes a graduated personal income tax structure with a top rate of 3.7%, enacted under Act 1 of the 2024 Second Extraordinary Session. Taxable income up to $5,599 is taxed at 0%, progressing through 2.0%, 3.0%, and 3.4%, before reaching the 3.7% cap on income above $26,400.",
    },
    {
      question: "Is Arkansas a good state for take-home pay compared to neighboring states?",
      answer: "Yes, Arkansas offers competitive net earnings compared to most of its immediate neighbors. Its 3.7% top rate is lower than Missouri (4.7%), Oklahoma (4.75%), Mississippi (4.7%), and Louisiana (4.25%). While border states like Texas and Tennessee levy zero income tax, Arkansas offsets this with substantially lower residential home prices and property tax rates.",
    },
    {
      question: "Does Arkansas tax Social Security income?",
      answer: "No, Arkansas completely exempts Social Security retirement benefits, disability payments, and survivor benefits from state income tax. Retirees living in Arkansas pay $0 in state tax on their monthly Social Security checks regardless of overall income level.",
    },
    {
      question: "How much is $50,000 after taxes in Arkansas?",
      answer: "On a $50,000 annual salary for a single filer with no pre-tax deductions, you will take home approximately $41,080 per year, or about $3,423 per month ($1,580 biweekly). Your deductions consist of roughly $3,962 in federal income tax, $1,391 in Arkansas state tax, and $3,825 in FICA payroll taxes.",
    },
    {
      question: "How much is $75,000 after taxes in Arkansas?",
      answer: "A single worker in Arkansas earning $75,000 gross salary takes home approximately $59,183 annually, which translates to $4,932 per month or $2,276 biweekly. Deductions total $15,817, including $7,908 in federal income taxes, $2,316 in Arkansas state taxes, and $5,738 in FICA taxes.",
    },
    {
      question: "How much is $100,000 after taxes in Arkansas?",
      answer: "An individual earning a $100,000 salary in Arkansas receives about $76,143 in net take-home pay, or $6,345 per month ($2,929 biweekly). Total deductions equal $23,857, split between $13,408 in federal income tax, $3,241 in Arkansas state tax, and $7,650 in FICA contributions.",
    },
    {
      question: "What deductions come out of an Arkansas paycheck?",
      answer: "Every standard Arkansas paycheck includes four mandatory deductions: Federal Income Tax (based on IRS Form W-4 withholdings), Arkansas State Income Tax (3.7% top rate), Social Security (6.2% up to the wage cap), and Medicare (1.45% uncapped). Optional reductions include employer 401(k) retirement contributions and pre-tax health insurance premiums.",
    },
    {
      question: "Do Arkansas cities or counties add their own local income tax?",
      answer: "No. Arkansas state law explicitly prohibits municipalities, towns, and counties from enacting local personal income taxes. While local jurisdictions assess sales taxes and county millage property taxes, your local earned income tax rate in every Arkansas city is 0.00%.",
    },
    {
      question: "How often are Arkansas paychecks taxed differently by frequency?",
      answer: "Pay frequency does not alter your total annual tax liability. Whether your employer pays weekly, biweekly, semimonthly, or monthly, the federal and state tax tables divide your annual bracket allowances evenly across each check so your net annual take-home remains identical.",
    },
    {
      question: "What is the difference between gross and net pay in Arkansas?",
      answer: "Gross pay is the full baseline compensation agreed upon with your employer before any withholding occurs. Net pay, also called take-home pay, is the actual cash deposited into your checking account after subtracting federal income tax, Arkansas state income tax, and FICA payroll deductions.",
    },
  ];

  const faqData = {
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

  const breadcrumbData = {
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
        "name": "Finance Calculators",
        "item": "https://quickcalc.cloud/category/finance",
      },
      {
        "@type": "ListItem",
        "position": 3,
        "name": "Arkansas Salary Calculator",
        "item": "https://quickcalc.cloud/tools/arkansas-salary-calculator",
      },
    ],
  };

  const organizationData = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "QuickCalc",
    "url": "https://quickcalc.cloud",
    "logo": "https://quickcalc.cloud/og-image.png",
    "sameAs": ["https://quickcalc.cloud/about"],
  };

  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-zinc-950 text-zinc-900 dark:text-zinc-100 font-[family-name:var(--font-geist-sans)] transition-colors">
      {/* Schema Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqData) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(softwareSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbData) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationData) }}
      />

      {/* Navigation Header */}
      <Navbar />

      {/* Main Content Container */}
      <main className="max-w-4xl mx-auto px-4 py-8 sm:py-12">
        <Breadcrumbs toolName="Arkansas Salary Calculator" toolSlug="arkansas-salary-calculator" />

        {/* Intro Section - Humanized, fast, to the point */}
        <div className="text-center max-w-2xl mx-auto mb-8">
          <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-zinc-900 dark:text-white mb-4">
            Arkansas Salary Calculator (2026)
          </h1>

          <p className="text-base sm:text-lg text-zinc-600 dark:text-zinc-400 leading-relaxed font-normal">
            Planning a budget or evaluating a new job offer in the Natural State?
            Use this calculator to determine your exact net paycheck after Arkansas&apos;s updated 3.7% state income tax, federal brackets, and FICA withholdings.
          </p>
        </div>

        <ShareButtons
          url="https://quickcalc.cloud/tools/arkansas-salary-calculator"
          title="Arkansas Salary Calculator (2026) — Take-Home Pay After Tax"
        />
        <EmbedWidget
          url="https://quickcalc.cloud/tools/arkansas-salary-calculator"
          title="Arkansas Salary Calculator (2026) — Take-Home Pay After Tax"
        />

        {/* The Interactive Calculator Widget - High Above the Fold */}
        <section className="my-8" aria-label="Arkansas Salary Calculator Tool">
          <StateSalaryCalculatorWidget stateConfig={ARKANSAS_TAX_CONFIG} />
        </section>

        {/* Ad Placement 1 */}
        <div className="ad-slot ad-slot--inline my-8" data-ad-position="in-content-1">
          <div className="ad-placeholder-label border border-dashed border-zinc-300 dark:border-zinc-800 rounded-xl py-4 flex items-center justify-center bg-zinc-50/50 dark:bg-zinc-950/20 text-[10px] font-bold text-zinc-400 dark:text-zinc-600 uppercase tracking-widest cursor-default">
            Advertisement
          </div>
        </div>

        {/* DIRECT-ANSWER BLOCK (AEO / GEO / AI Overview Extraction) */}
        <section className="bg-white dark:bg-zinc-900 border border-teal-500/30 rounded-2xl p-6 sm:p-8 space-y-6 shadow-xs my-8">
          <div>
            <span className="text-xs font-bold tracking-wider uppercase text-teal-600 dark:text-teal-400 block mb-1">
              Direct Answer & Take-Home Overview
            </span>
            <h2 className="text-2xl font-bold text-zinc-950 dark:text-white">
              How Much is Take-Home Pay in Arkansas on a $60,000 Salary?
            </h2>
          </div>

          {/* Tight, self-contained 45-word standalone direct answer paragraph */}
          <p className="text-base sm:text-lg font-medium text-zinc-800 dark:text-zinc-200 leading-relaxed bg-teal-50/60 dark:bg-teal-950/30 p-4 rounded-xl border border-teal-200/50 dark:border-teal-800/50">
            On a $60,000 annual salary in Arkansas, a single filer takes home approximately $48,487 per year, or $4,041 per month ($1,865 biweekly). Total withholdings equal $11,513, consisting of $5,162 in federal income tax, $1,761 in Arkansas state tax, and $4,590 in mandatory FICA contributions.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5 pt-2 border-t border-zinc-100 dark:border-zinc-800">
            {/* Direct Answer 1: Rate */}
            <div className="space-y-2">
              <h3 className="text-base font-bold text-zinc-900 dark:text-zinc-100">
                What is Arkansas&apos;s state income tax rate?
              </h3>
              <p className="text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed">
                Arkansas levies a progressive personal income tax with a top rate of 3.7%. Taxable income begins at 0% for the first $5,599, rising incrementally to 2.0%, 3.0%, and 3.4%, before hitting the top 3.7% bracket for earnings over $26,400.
              </p>
            </div>

            {/* Direct Answer 2: Local Taxes */}
            <div className="space-y-2">
              <h3 className="text-base font-bold text-zinc-900 dark:text-zinc-100">
                Does Arkansas have local city income taxes?
              </h3>
              <p className="text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed">
                No, Arkansas cities and counties do not impose local income taxes. State law strictly prohibits local governments from taxing personal wages. Regardless of whether you live in Little Rock, Fayetteville, Fort Smith, or Jonesboro, your municipal income tax rate is 0.0%.
              </p>
            </div>

            {/* Direct Answer 3: State Comparison */}
            <div className="space-y-2">
              <h3 className="text-base font-bold text-zinc-900 dark:text-zinc-100">
                How does Arkansas take-home pay compare to other states?
              </h3>
              <p className="text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed">
                Because Texas has zero state income tax, a $60,000 worker in Texas keeps $50,248 annually—about $1,761 more than in Arkansas. Compared to flat-tax Midwestern states like{" "}
                <Link href="/tools/illinois-paycheck-calculator" className="text-teal-600 dark:text-teal-400 font-semibold underline">
                  Illinois (4.95%)
                </Link>
                , Arkansas filers take home more due to lower baseline brackets. Compare all states in our{" "}
                <Link href="/paycheck-calculators" className="text-teal-600 dark:text-teal-400 font-semibold underline">
                  50-State Paycheck Directory
                </Link>
                .
              </p>
            </div>
          </div>
        </section>

        {/* HOW THIS IS CALCULATED SECTION */}
        <section className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-2xl p-6 sm:p-8 space-y-6 my-8">
          <div className="border-b border-zinc-100 dark:border-zinc-800 pb-4">
            <h2 className="text-2xl font-bold text-zinc-950 dark:text-white">
              How Arkansas Paychecks Are Calculated: Plain Math & Brackets
            </h2>
            <p className="text-sm text-zinc-600 dark:text-zinc-400 mt-1">
              Your paycheck is calculated by applying federal tax brackets, mandatory FICA payroll deductions, and Arkansas&apos;s statutory state tax tables to your gross earnings.
            </p>
          </div>

          {/* Formula Display */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-4 bg-zinc-50 dark:bg-zinc-800/60 rounded-xl border border-zinc-200 dark:border-zinc-700">
              <span className="text-xs font-bold uppercase tracking-wider text-teal-600 dark:text-teal-400 block mb-1">
                Arkansas State Tax Formula
              </span>
              <div className="font-mono text-sm font-bold text-zinc-900 dark:text-white bg-white dark:bg-zinc-900 p-2.5 rounded-lg border border-zinc-200 dark:border-zinc-800">
                State Tax = Progressive Brackets(Gross - $2,470 Std Ded)
              </div>
              <p className="text-xs text-zinc-600 dark:text-zinc-400 mt-2 leading-relaxed">
                Arkansas gives every single filer a $2,470 standard deduction ($4,940 for married couples), followed by progressive brackets capping at 3.7%.
              </p>
            </div>

            <div className="p-4 bg-zinc-50 dark:bg-zinc-800/60 rounded-xl border border-zinc-200 dark:border-zinc-700">
              <span className="text-xs font-bold uppercase tracking-wider text-teal-600 dark:text-teal-400 block mb-1">
                Net Take-Home Pay Formula
              </span>
              <div className="font-mono text-sm font-bold text-zinc-900 dark:text-white bg-white dark:bg-zinc-900 p-2.5 rounded-lg border border-zinc-200 dark:border-zinc-800">
                Net Pay = Gross - (Federal Tax + AR State Tax + FICA)
              </div>
              <p className="text-xs text-zinc-600 dark:text-zinc-400 mt-2 leading-relaxed">
                FICA includes 6.2% Social Security (capped at $184,500) and 1.45% Medicare. Any pre-tax 401(k) reduces taxable income before taxes are assessed.
              </p>
            </div>
          </div>

          {/* Arkansas Tax Brackets Table */}
          <div className="pt-2">
            <h3 className="text-base font-bold text-zinc-900 dark:text-white mb-3">
              Official 2026 Arkansas Personal Income Tax Brackets
            </h3>
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs sm:text-sm border-collapse">
                <thead>
                  <tr className="border-b border-zinc-200 dark:border-zinc-700 bg-zinc-50 dark:bg-zinc-800/50">
                    <th className="py-2.5 px-3 font-bold text-zinc-900 dark:text-white">Taxable Income (Single)</th>
                    <th className="py-2.5 px-3 font-bold text-zinc-900 dark:text-white">Taxable Income (Married Joint)</th>
                    <th className="py-2.5 px-3 font-bold text-zinc-900 dark:text-white">Marginal Rate</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-zinc-200 dark:divide-zinc-800">
                  <tr>
                    <td className="py-2.5 px-3">$0 – $5,599</td>
                    <td className="py-2.5 px-3">$0 – $11,198</td>
                    <td className="py-2.5 px-3 font-semibold text-emerald-600">0.0%</td>
                  </tr>
                  <tr>
                    <td className="py-2.5 px-3">$5,600 – $11,199</td>
                    <td className="py-2.5 px-3">$11,199 – $22,398</td>
                    <td className="py-2.5 px-3">2.0%</td>
                  </tr>
                  <tr>
                    <td className="py-2.5 px-3">$11,200 – $15,999</td>
                    <td className="py-2.5 px-3">$22,399 – $31,998</td>
                    <td className="py-2.5 px-3">3.0%</td>
                  </tr>
                  <tr>
                    <td className="py-2.5 px-3">$16,000 – $26,399</td>
                    <td className="py-2.5 px-3">$31,999 – $52,798</td>
                    <td className="py-2.5 px-3">3.4%</td>
                  </tr>
                  <tr className="bg-teal-50/40 dark:bg-teal-950/20 font-semibold">
                    <td className="py-2.5 px-3 text-teal-800 dark:text-teal-300">$26,400 and above</td>
                    <td className="py-2.5 px-3 text-teal-800 dark:text-teal-300">$52,799 and above</td>
                    <td className="py-2.5 px-3 text-teal-800 dark:text-teal-300">3.7% (Top Rate)</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          {/* Salary Benchmark Table */}
          <div className="pt-2">
            <h3 className="text-base font-bold text-zinc-900 dark:text-white mb-3">
              Arkansas Take-Home Pay by Common Salary Levels (Single Filer)
            </h3>
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs sm:text-sm border-collapse">
                <thead>
                  <tr className="border-b border-zinc-200 dark:border-zinc-700 bg-zinc-50 dark:bg-zinc-800/50">
                    <th className="py-2.5 px-3 font-bold text-zinc-900 dark:text-white">Gross Salary</th>
                    <th className="py-2.5 px-3 font-bold text-zinc-900 dark:text-white">Federal Tax</th>
                    <th className="py-2.5 px-3 font-bold text-zinc-900 dark:text-white">AR State Tax</th>
                    <th className="py-2.5 px-3 font-bold text-zinc-900 dark:text-white">FICA Tax</th>
                    <th className="py-2.5 px-3 font-bold text-teal-700 dark:text-teal-300">Net Take-Home</th>
                    <th className="py-2.5 px-3 font-bold text-zinc-900 dark:text-white">Monthly Net</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-zinc-200 dark:divide-zinc-800">
                  <tr>
                    <td className="py-2.5 px-3 font-bold">$40,000</td>
                    <td className="py-2.5 px-3">$2,762</td>
                    <td className="py-2.5 px-3">$1,021</td>
                    <td className="py-2.5 px-3">$3,060</td>
                    <td className="py-2.5 px-3 font-bold text-teal-600 dark:text-teal-400">$33,157</td>
                    <td className="py-2.5 px-3">$2,763/mo</td>
                  </tr>
                  <tr className="bg-teal-50/40 dark:bg-teal-950/20 font-semibold">
                    <td className="py-2.5 px-3 font-bold">$60,000</td>
                    <td className="py-2.5 px-3">$5,162</td>
                    <td className="py-2.5 px-3">$1,761</td>
                    <td className="py-2.5 px-3">$4,590</td>
                    <td className="py-2.5 px-3 font-bold text-teal-600 dark:text-teal-400">$48,487</td>
                    <td className="py-2.5 px-3">$4,041/mo</td>
                  </tr>
                  <tr>
                    <td className="py-2.5 px-3 font-bold">$80,000</td>
                    <td className="py-2.5 px-3">$8,908</td>
                    <td className="py-2.5 px-3">$2,501</td>
                    <td className="py-2.5 px-3">$6,120</td>
                    <td className="py-2.5 px-3 font-bold text-teal-600 dark:text-teal-400">$62,471</td>
                    <td className="py-2.5 px-3">$5,206/mo</td>
                  </tr>
                  <tr>
                    <td className="py-2.5 px-3 font-bold">$100,000</td>
                    <td className="py-2.5 px-3">$13,408</td>
                    <td className="py-2.5 px-3">$3,241</td>
                    <td className="py-2.5 px-3">$7,650</td>
                    <td className="py-2.5 px-3 font-bold text-teal-600 dark:text-teal-400">$75,701</td>
                    <td className="py-2.5 px-3">$6,308/mo</td>
                  </tr>
                  <tr>
                    <td className="py-2.5 px-3 font-bold">$150,000</td>
                    <td className="py-2.5 px-3">$24,960</td>
                    <td className="py-2.5 px-3">$5,091</td>
                    <td className="py-2.5 px-3">$11,475</td>
                    <td className="py-2.5 px-3 font-bold text-teal-600 dark:text-teal-400">$108,474</td>
                    <td className="py-2.5 px-3">$9,040/mo</td>
                  </tr>
                  <tr>
                    <td className="py-2.5 px-3 font-bold">$200,000</td>
                    <td className="py-2.5 px-3">$36,960</td>
                    <td className="py-2.5 px-3">$6,941</td>
                    <td className="py-2.5 px-3">$14,339</td>
                    <td className="py-2.5 px-3 font-bold text-teal-600 dark:text-teal-400">$141,760</td>
                    <td className="py-2.5 px-3">$11,813/mo</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </section>

        {/* Ad Placement 2 */}
        <div className="ad-slot ad-slot--inline my-8" data-ad-position="in-content-2">
          <div className="ad-placeholder-label border border-dashed border-zinc-300 dark:border-zinc-800 rounded-xl py-4 flex items-center justify-center bg-zinc-50/50 dark:bg-zinc-950/20 text-[10px] font-bold text-zinc-400 dark:text-zinc-600 uppercase tracking-widest cursor-default">
            Advertisement
          </div>
        </div>

        {/* FREQUENTLY ASKED QUESTIONS SECTION */}
        <section className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-2xl p-6 sm:p-8 space-y-6 my-8">
          <div className="border-b border-zinc-100 dark:border-zinc-800 pb-4">
            <h2 className="text-2xl font-bold text-zinc-950 dark:text-white">
              Frequently Asked Questions About Arkansas Paychecks
            </h2>
            <p className="text-sm text-zinc-600 dark:text-zinc-400 mt-1">
              Practical answers to help you navigate Arkansas state tax brackets and payroll deductions.
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

        {/* 50-STATE CLUSTER LINKING DIRECTORY */}
        <StateClusterLinks currentStateSlug="arkansas" />

        {/* INTERNAL LINKS TO RELATED CALCULATORS */}
        <section className="my-10 bg-zinc-100/70 dark:bg-zinc-900/60 p-6 sm:p-8 rounded-2xl border border-zinc-200 dark:border-zinc-800">
          <h2 className="text-xl font-bold text-zinc-900 dark:text-white mb-2">
            Related Payroll & Financial Tools
          </h2>
          <p className="text-sm text-zinc-600 dark:text-zinc-400 mb-6">
            Check your Social Security caps, calculate hourly shift overtime, and plan your take-home pay:
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <Link
              href="/tools/illinois-paycheck-calculator"
              className="p-4 bg-white dark:bg-zinc-800/80 rounded-xl border border-teal-500/40 hover:border-teal-500 hover:shadow-md transition-all group"
            >
              <div className="text-sm font-bold text-zinc-900 dark:text-white group-hover:text-teal-600 dark:group-hover:text-teal-400">
                Illinois Paycheck Calculator &rarr;
              </div>
              <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-1.5">
                Calculate take-home pay under Illinois&apos;s flat 4.95% state income tax and 0% Chicago local wage tax.
              </p>
            </Link>

            <Link
              href="/tools/oasdi-tax-calculator"
              className="p-4 bg-white dark:bg-zinc-800/80 rounded-xl border border-zinc-200 dark:border-zinc-700 hover:border-teal-500 hover:shadow-md transition-all group"
            >
              <div className="text-sm font-bold text-zinc-900 dark:text-white group-hover:text-teal-600 dark:group-hover:text-teal-400">
                OASDI Tax Calculator &rarr;
              </div>
              <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-1.5">
                Calculate your exact Social Security payroll tax and check the $184,500 wage base limit.
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
                Compare baseline net take-home pay across the US, Canada, and Pakistan.
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
                Calculate total shift hours, unpaid breaks, and 1.5x overtime gross pay.
              </p>
            </Link>

            <Link
              href="/paycheck-calculators"
              className="p-4 bg-teal-50/50 dark:bg-teal-950/30 rounded-xl border border-teal-500/60 hover:border-teal-500 hover:shadow-md transition-all group sm:col-span-2 lg:col-span-4 flex items-center justify-between"
            >
              <div>
                <div className="text-sm font-bold text-teal-700 dark:text-teal-300">
                  Explore All 50 State Paycheck Calculators &rarr;
                </div>
                <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-0.5">
                  Compare take-home pay, standard deductions, and withholding brackets across every US state in 2026.
                </p>
              </div>
              <span className="text-teal-600 dark:text-teal-400 font-bold text-xs shrink-0 group-hover:translate-x-1 transition-transform">
                View Directory &rarr;
              </span>
            </Link>
          </div>
        </section>

        {/* Ad Placement Footer */}
        <div className="ad-slot ad-slot--footer mt-12" data-ad-position="footer">
          <div className="ad-placeholder-label border border-dashed border-zinc-300 dark:border-zinc-800 rounded-xl py-4 flex items-center justify-center bg-zinc-50/50 dark:bg-zinc-950/20 text-[10px] font-bold text-zinc-400 dark:text-zinc-600 uppercase tracking-widest cursor-default">
            Advertisement
          </div>
        </div>
      </main>

      {/* Site Footer */}
      <Footer customText="Verified Arkansas individual income tax calculations under Act 1 of the 2024 Second Extraordinary Session." />
    </div>
  );
}
