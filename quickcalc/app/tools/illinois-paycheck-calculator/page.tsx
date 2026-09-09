import Navbar from "@/components/Navbar";
import { generateSoftwareAppSchema } from "@/lib/schema";
import ShareButtons from "@/components/ShareButtons";
import EmbedWidget from "@/components/EmbedWidget";
import Breadcrumbs from "@/components/Breadcrumbs";
import type { Metadata } from "next";
import Link from "next/link";
import StateSalaryCalculatorWidget from "@/components/StateSalaryCalculatorWidget";
import StateClusterLinks from "@/components/StateClusterLinks";
import { ILLINOIS_TAX_CONFIG } from "@/lib/calculators/stateTaxData/illinois";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "Illinois Paycheck Calculator (2026) — Take-Home Pay After Tax",
  description: "Calculate your take-home pay with our Illinois paycheck calculator. Instant 2026 federal, 4.95% flat state tax, and FICA breakdown with hourly & salary options.",
  alternates: {
    canonical: "/tools/illinois-paycheck-calculator",
  },
  openGraph: {
    title: "Illinois Paycheck Calculator (2026) — Take-Home Pay After Tax",
    description: "Calculate your take-home pay with our Illinois paycheck calculator. Instant 2026 federal, 4.95% flat state tax, and FICA breakdown with hourly & salary options.",
    url: "https://quickcalc.cloud/tools/illinois-paycheck-calculator",
    type: "website",
    siteName: "QuickCalc",
    images: [
      {
        url: "https://quickcalc.cloud/og-image.png",
        width: 1200,
        height: 630,
        alt: "Illinois Paycheck Calculator on QuickCalc",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Illinois Paycheck Calculator (2026) — Take-Home Pay After Tax",
    description: "Calculate your take-home pay with our Illinois paycheck calculator. Instant 2026 federal, 4.95% flat state tax, and FICA breakdown with hourly & salary options.",
  },
};

export default function IllinoisPaycheckCalculatorPage({ searchParams }: { searchParams?: { embed?: string } }) {
  const softwareSchema = generateSoftwareAppSchema({
    name: "Illinois Paycheck Calculator (2026) — Take-Home Pay After Tax",
    description: "Instant client-side Illinois paycheck and salary calculator applying the 4.95% flat individual income tax rate, personal exemptions, and 2026 federal tax brackets.",
    slug: "illinois-paycheck-calculator",
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
          <StateSalaryCalculatorWidget stateConfig={ILLINOIS_TAX_CONFIG} />
        </main>
      </div>
    );
  }

  const faqs = [
    {
      question: "What is the Illinois flat income tax rate for 2026?",
      answer: "Illinois assesses a flat 4.95% personal income tax on all taxable wages. Unlike federal taxes or states with progressive tax tiers, every Illinois taxpayer pays this exact same 4.95% rate regardless of whether they earn $30,000 or $300,000 per year.",
    },
    {
      question: "Is Illinois income tax the same for everyone regardless of income level?",
      answer: "Yes. Article IX, Section 3 of the Illinois Constitution prohibits non-flat graduated income tax brackets. Every worker pays a uniform 4.95% rate on their net income after subtracting the Illinois personal exemption ($2,925 for single filers, $5,850 for married couples filing jointly).",
    },
    {
      question: "Does Illinois tax Social Security or retirement income?",
      answer: "No. Illinois is one of the most retiree-friendly tax states in the nation because it completely exempts Social Security benefits, government and corporate pensions, and qualified 401(k) and IRA withdrawals from state income tax. Retirees pay 0% state tax on retirement distributions.",
    },
    {
      question: "How much is $50,000 after taxes in Illinois?",
      answer: "On a $50,000 annual salary for a single filer with no pre-tax deductions, your net take-home pay is approximately $39,883 per year, or about $3,324 per month ($1,534 biweekly). Total withholdings equal $10,117, comprising $3,962 in federal income tax, $2,330 in Illinois state tax (4.95%), and $3,825 in FICA payroll taxes.",
    },
    {
      question: "How much is $65,000 after taxes in Illinois?",
      answer: "A single worker in Illinois earning a $65,000 salary takes home approximately $51,041 annually, which translates to $4,253 per month or $1,963 biweekly. Deductions total $13,959, including $5,914 in federal income taxes, $3,073 in Illinois state taxes (4.95%), and $4,973 in mandatory FICA taxes.",
    },
    {
      question: "How much is $75,000 after taxes in Illinois?",
      answer: "On a $75,000 gross salary in Illinois, a single earner takes home roughly $57,581 per year ($4,798 per month or $2,215 biweekly). Your total deductions of $17,419 include $8,114 in federal income tax, $3,568 in Illinois state income tax, and $5,738 in FICA taxes.",
    },
    {
      question: "How much is $100,000 after taxes in Illinois?",
      answer: "An individual earning $100,000 in Illinois keeps approximately $73,931 in net take-home pay, or $6,161 per month ($2,843 biweekly). Total taxes equal $26,069, split between $13,614 in federal income tax, $4,805 in Illinois state tax, and $7,650 in FICA contributions.",
    },
    {
      question: "Does Chicago have a separate city paycheck tax?",
      answer: "No. Chicago does not levy an earned income tax on employee wages. While Chicago residents pay higher sales taxes and local property taxes, your municipal earned income tax rate is 0.0% whether you work in downtown Chicago, Schaumburg, Evanston, or Springfield.",
    },
    {
      question: "What deductions come out of an Illinois paycheck?",
      answer: "Four mandatory deductions come out of every standard Illinois paycheck: Federal Income Tax (withheld according to IRS Form W-4), Illinois State Income Tax (flat 4.95%), Social Security (6.2% up to the annual $184,500 cap), and Medicare (1.45% uncapped). Optional pre-tax 401(k) and health insurance deductions lower your taxable wage base.",
    },
    {
      question: "How does Illinois take-home pay compare to neighboring states?",
      answer: "Illinois take-home pay is generally comparable to its neighbors but varies by income. Indiana has a lower 3.05% state rate but adds county income taxes (often 1.5% to 2.5%), making total taxes similar. Wisconsin uses progressive brackets up to 7.65%, meaning high earners take home more in Illinois, whereas low earners may pay slightly less in Wisconsin.",
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
        "name": "Paycheck Calculators",
        "item": "https://quickcalc.cloud/category/finance",
      },
      {
        "@type": "ListItem",
        "position": 3,
        "name": "Illinois",
        "item": "https://quickcalc.cloud/tools/illinois-paycheck-calculator",
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
        <Breadcrumbs toolName="Illinois Paycheck Calculator" toolSlug="illinois-paycheck-calculator" />

        {/* Intro Section - Humanized, direct, zero corporate filler */}
        <div className="text-center max-w-2xl mx-auto mb-8">
          <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-zinc-900 dark:text-white mb-4">
            Illinois Paycheck Calculator (2026)
          </h1>

          <p className="text-base sm:text-lg text-zinc-600 dark:text-zinc-400 leading-relaxed font-normal">
            Received a job offer in Chicago or looking to plan your monthly budget in Illinois?
            Use this calculator to compute your exact net take-home pay after Illinois&apos;s flat 4.95% state income tax, personal exemptions, federal brackets, and FICA deductions.
          </p>
        </div>

        <ShareButtons
          url="https://quickcalc.cloud/tools/illinois-paycheck-calculator"
          title="Illinois Paycheck Calculator (2026) — Take-Home Pay After Tax"
        />
        <EmbedWidget
          url="https://quickcalc.cloud/tools/illinois-paycheck-calculator"
          title="Illinois Paycheck Calculator (2026) — Take-Home Pay After Tax"
        />

        {/* The Interactive Calculator Widget - High Above the Fold */}
        <section className="my-8" aria-label="Illinois Paycheck Calculator Tool">
          <StateSalaryCalculatorWidget stateConfig={ILLINOIS_TAX_CONFIG} />
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
              Direct Answer & Paycheck Overview
            </span>
            <h2 className="text-2xl font-bold text-zinc-950 dark:text-white">
              How Much is Take-Home Pay in Illinois on a $65,000 Salary?
            </h2>
          </div>

          {/* Tight, self-contained 45-word standalone direct answer paragraph */}
          <p className="text-base sm:text-lg font-medium text-zinc-800 dark:text-zinc-200 leading-relaxed bg-teal-50/60 dark:bg-teal-950/30 p-4 rounded-xl border border-teal-200/50 dark:border-teal-800/50">
            On a $65,000 annual salary in Illinois, a single filer takes home approximately $51,041 per year, or $4,253 per month ($1,963 biweekly). Total withholdings equal $13,959, consisting of $5,914 in federal income tax, $3,073 in Illinois state tax (flat 4.95%), and $4,973 in mandatory FICA payroll contributions.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5 pt-2 border-t border-zinc-100 dark:border-zinc-800">
            {/* Direct Answer 1: Flat Rate */}
            <div className="space-y-2">
              <h3 className="text-base font-bold text-zinc-900 dark:text-zinc-100">
                What is the Illinois state income tax rate?
              </h3>
              <p className="text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed">
                Illinois imposes a flat personal income tax rate of 4.95% on all net taxable income. Because the rate is mandated as non-graduated by the state constitution, every taxpayer pays this exact percentage on earnings exceeding their annual personal exemption.
              </p>
            </div>

            {/* Direct Answer 2: Chicago & Local Taxes */}
            <div className="space-y-2">
              <h3 className="text-base font-bold text-zinc-900 dark:text-zinc-100">
                Does Chicago or any Illinois city add an income tax?
              </h3>
              <p className="text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed">
                No Illinois city imposes a local personal income tax on employee paychecks. State law restricts municipalities from taxing earned wages, meaning workers in Chicago, Naperville, Peoria, and Rockford all have a 0.0% local municipal wage tax.
              </p>
            </div>

            {/* Direct Answer 3: Flat Tax vs Progressive */}
            <div className="space-y-2">
              <h3 className="text-base font-bold text-zinc-900 dark:text-zinc-100">
                How does Illinois&apos;s flat tax compare to bracket states?
              </h3>
              <p className="text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed">
                A flat tax offers complete mathematical predictability with no bracket creep as your salary rises. Compared to progressive states like neighboring Wisconsin (up to 7.65%) or{" "}
                <Link href="/tools/arkansas-salary-calculator" className="text-teal-600 dark:text-teal-400 font-semibold underline">
                  Arkansas (3.7%)
                </Link>
                , high-earning Illinois employees retain a substantially larger share of their incremental income. Compare all states in our{" "}
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
              How Illinois Paychecks Are Calculated: Plain Math & Formulas
            </h2>
            <p className="text-sm text-zinc-600 dark:text-zinc-400 mt-1">
              Illinois paycheck math is simpler than most states because state taxes follow a single flat multiplier after personal exemptions.
            </p>
          </div>

          {/* Formula Display */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-4 bg-zinc-50 dark:bg-zinc-800/60 rounded-xl border border-zinc-200 dark:border-zinc-700">
              <span className="text-xs font-bold uppercase tracking-wider text-teal-600 dark:text-teal-400 block mb-1">
                Illinois State Tax Formula
              </span>
              <div className="font-mono text-sm font-bold text-zinc-900 dark:text-white bg-white dark:bg-zinc-900 p-2.5 rounded-lg border border-zinc-200 dark:border-zinc-800">
                State Tax = (Gross Wages - Personal Exemption) × 4.95%
              </div>
              <p className="text-xs text-zinc-600 dark:text-zinc-400 mt-2 leading-relaxed">
                In 2026, the statutory personal exemption is $2,925 for single individuals and $5,850 for married joint filers. Everything above this baseline is taxed at exactly 4.95%.
              </p>
            </div>

            <div className="p-4 bg-zinc-50 dark:bg-zinc-800/60 rounded-xl border border-zinc-200 dark:border-zinc-700">
              <span className="text-xs font-bold uppercase tracking-wider text-teal-600 dark:text-teal-400 block mb-1">
                Net Take-Home Pay Formula
              </span>
              <div className="font-mono text-sm font-bold text-zinc-900 dark:text-white bg-white dark:bg-zinc-900 p-2.5 rounded-lg border border-zinc-200 dark:border-zinc-800">
                Net Pay = Gross - (Federal Tax + IL State Tax + FICA)
              </div>
              <p className="text-xs text-zinc-600 dark:text-zinc-400 mt-2 leading-relaxed">
                FICA withholdings consist of 6.2% Social Security (capped at $184,500) and 1.45% Medicare. Pre-tax 401(k) contributions reduce your federal and state tax base.
              </p>
            </div>
          </div>

          {/* Salary Benchmark Table */}
          <div className="pt-2">
            <h3 className="text-base font-bold text-zinc-900 dark:text-white mb-3">
              Illinois Take-Home Pay by Common Salary Levels (Single Filer)
            </h3>
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs sm:text-sm border-collapse">
                <thead>
                  <tr className="border-b border-zinc-200 dark:border-zinc-700 bg-zinc-50 dark:bg-zinc-800/50">
                    <th className="py-2.5 px-3 font-bold text-zinc-900 dark:text-white">Gross Salary</th>
                    <th className="py-2.5 px-3 font-bold text-zinc-900 dark:text-white">Federal Tax</th>
                    <th className="py-2.5 px-3 font-bold text-zinc-900 dark:text-white">IL State Tax (4.95%)</th>
                    <th className="py-2.5 px-3 font-bold text-zinc-900 dark:text-white">FICA Tax</th>
                    <th className="py-2.5 px-3 font-bold text-teal-700 dark:text-teal-300">Net Take-Home</th>
                    <th className="py-2.5 px-3 font-bold text-zinc-900 dark:text-white">Monthly Net</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-zinc-200 dark:divide-zinc-800">
                  <tr>
                    <td className="py-2.5 px-3 font-bold">$40,000</td>
                    <td className="py-2.5 px-3">$2,762</td>
                    <td className="py-2.5 px-3">$1,835</td>
                    <td className="py-2.5 px-3">$3,060</td>
                    <td className="py-2.5 px-3 font-bold text-teal-600 dark:text-teal-400">$32,343</td>
                    <td className="py-2.5 px-3">$2,695/mo</td>
                  </tr>
                  <tr>
                    <td className="py-2.5 px-3 font-bold">$50,000</td>
                    <td className="py-2.5 px-3">$3,962</td>
                    <td className="py-2.5 px-3">$2,330</td>
                    <td className="py-2.5 px-3">$3,825</td>
                    <td className="py-2.5 px-3 font-bold text-teal-600 dark:text-teal-400">$39,883</td>
                    <td className="py-2.5 px-3">$3,324/mo</td>
                  </tr>
                  <tr className="bg-teal-50/40 dark:bg-teal-950/20 font-semibold">
                    <td className="py-2.5 px-3 font-bold">$65,000</td>
                    <td className="py-2.5 px-3">$5,914</td>
                    <td className="py-2.5 px-3">$3,073</td>
                    <td className="py-2.5 px-3">$4,973</td>
                    <td className="py-2.5 px-3 font-bold text-teal-600 dark:text-teal-400">$51,041</td>
                    <td className="py-2.5 px-3">$4,253/mo</td>
                  </tr>
                  <tr>
                    <td className="py-2.5 px-3 font-bold">$80,000</td>
                    <td className="py-2.5 px-3">$9,214</td>
                    <td className="py-2.5 px-3">$3,815</td>
                    <td className="py-2.5 px-3">$6,120</td>
                    <td className="py-2.5 px-3 font-bold text-teal-600 dark:text-teal-400">$60,851</td>
                    <td className="py-2.5 px-3">$5,071/mo</td>
                  </tr>
                  <tr>
                    <td className="py-2.5 px-3 font-bold">$100,000</td>
                    <td className="py-2.5 px-3">$13,614</td>
                    <td className="py-2.5 px-3">$4,805</td>
                    <td className="py-2.5 px-3">$7,650</td>
                    <td className="py-2.5 px-3 font-bold text-teal-600 dark:text-teal-400">$73,931</td>
                    <td className="py-2.5 px-3">$6,161/mo</td>
                  </tr>
                  <tr>
                    <td className="py-2.5 px-3 font-bold">$150,000</td>
                    <td className="py-2.5 px-3">$25,247</td>
                    <td className="py-2.5 px-3">$7,280</td>
                    <td className="py-2.5 px-3">$11,475</td>
                    <td className="py-2.5 px-3 font-bold text-teal-600 dark:text-teal-400">$105,998</td>
                    <td className="py-2.5 px-3">$8,833/mo</td>
                  </tr>
                  <tr>
                    <td className="py-2.5 px-3 font-bold">$200,000</td>
                    <td className="py-2.5 px-3">$37,247</td>
                    <td className="py-2.5 px-3">$9,755</td>
                    <td className="py-2.5 px-3">$14,339</td>
                    <td className="py-2.5 px-3 font-bold text-teal-600 dark:text-teal-400">$138,659</td>
                    <td className="py-2.5 px-3">$11,555/mo</td>
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
              Frequently Asked Questions About Illinois Paychecks
            </h2>
            <p className="text-sm text-zinc-600 dark:text-zinc-400 mt-1">
              Clear answers to help you navigate Illinois state flat taxes, exemptions, and paycheck deductions.
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
        <StateClusterLinks currentStateSlug="illinois" />

        {/* INTERNAL LINKS TO RELATED CALCULATORS */}
        <section className="my-10 bg-zinc-100/70 dark:bg-zinc-900/60 p-6 sm:p-8 rounded-2xl border border-zinc-200 dark:border-zinc-800">
          <h2 className="text-xl font-bold text-zinc-900 dark:text-white mb-2">
            Related Payroll & Financial Tools
          </h2>
          <p className="text-sm text-zinc-600 dark:text-zinc-400 mb-6">
            Check other state take-home pay, calculate shift overtime, or model your Social Security caps:
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <Link
              href="/tools/arkansas-salary-calculator"
              className="p-4 bg-white dark:bg-zinc-800/80 rounded-xl border border-zinc-200 dark:border-zinc-700 hover:border-teal-500 hover:shadow-md transition-all group"
            >
              <div className="text-sm font-bold text-zinc-900 dark:text-white group-hover:text-teal-600 dark:group-hover:text-teal-400">
                Arkansas Salary Calculator &rarr;
              </div>
              <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-1.5">
                Calculate net earnings with Arkansas&apos;s updated 3.7% progressive state tax brackets.
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
                Calculate your exact Social Security payroll tax and verify the $184,500 wage base limit.
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
                Calculate shift hours, unpaid meal breaks, and 1.5x overtime gross wages.
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
      <Footer customText="Verified Illinois individual income tax calculations based on the 4.95% flat rate under 35 ILCS 5/201." />
    </div>
  );
}
