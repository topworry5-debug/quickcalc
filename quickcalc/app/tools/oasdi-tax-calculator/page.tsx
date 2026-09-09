import MethodologyAccordion from "@/components/MethodologyAccordion";
import Navbar from "@/components/Navbar";
import { generateSoftwareAppSchema } from "@/lib/schema";
import RelatedTools from "@/components/RelatedTools";
import ShareButtons from "@/components/ShareButtons";
import EmbedWidget from "@/components/EmbedWidget";
import Breadcrumbs from "@/components/Breadcrumbs";
import type { Metadata } from "next";
import Link from "next/link";
import OASDITaxCalculatorWidget from "./OASDITaxCalculatorWidget";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "OASDI Tax Calculator (2026) — Calculate Social Security Tax",
  description: "Calculate your exact OASDI tax and Social Security withholding for 2026. Includes paystub breakdown, self-employed rates, and the $184,500 wage base limit.",
  alternates: {
    canonical: "/tools/oasdi-tax-calculator",
  },
  openGraph: {
    title: "OASDI Tax Calculator (2026) — Calculate Social Security Tax",
    description: "Calculate your exact OASDI tax and Social Security withholding for 2026. Includes paystub breakdown, self-employed rates, and the $184,500 wage base limit.",
    url: "https://quickcalc.cloud/tools/oasdi-tax-calculator",
    type: "website",
    siteName: "QuickCalc",
    images: [
      {
        url: "https://quickcalc.cloud/og-image.png",
        width: 1200,
        height: 630,
        alt: "OASDI Tax Calculator on QuickCalc",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "OASDI Tax Calculator (2026) — Calculate Social Security Tax",
    description: "Calculate your exact OASDI tax and Social Security withholding for 2026. Includes paystub breakdown, self-employed rates, and the $184,500 wage base limit.",
  },
};

export default function OASDITaxCalculatorPage({ searchParams }: { searchParams?: { embed?: string } }) {
  const softwareSchema = generateSoftwareAppSchema({
    name: "OASDI Tax Calculator (2026) — Social Security Payroll Tax",
    description: "Instant client-side OASDI tax calculator applying the verified 2026 wage base cap ($184,500) for W-2 employees and 1099 self-employed workers.",
    slug: "oasdi-tax-calculator",
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
          <OASDITaxCalculatorWidget />
        </main>
      </div>
    );
  }

  const faqs = [
    {
      question: "Why does my paystub say OASDI instead of Social Security?",
      answer: "Most payroll processing providers like ADP, Paychex, and Gusto print the technical legal acronym OASDI on paystubs rather than the colloquial term Social Security. Both refer to the identical mandatory federal program created under the Federal Insurance Contributions Act (FICA).",
    },
    {
      question: "What does OASDI stand for?",
      answer: "OASDI stands for Old-Age, Survivors, and Disability Insurance. It represents the formal statutory name of the comprehensive federal social insurance initiative established under Title II of the 1935 Social Security Act.",
    },
    {
      question: "Is OASDI tax mandatory?",
      answer: "Yes, OASDI payroll withholding is compulsory for nearly all United States civilian employees and self-employed workers under federal tax law. Limited exemptions apply only to specific state and local government personnel covered by alternative qualifying pension programs, certain religious sects, and nonresident foreign students on specific exchange visas.",
    },
    {
      question: "Do self-employed people pay OASDI?",
      answer: "Yes, self-employed freelancers, independent contractors, and business owners pay OASDI through the Self-Employment Contributions Act (SECA). Because they have no employer covering the other half, self-employed workers pay the full 12.4% rate, assessed on 92.35% of their net business profits up to the annual wage cap.",
    },
    {
      question: "What happens when I hit the OASDI wage base limit?",
      answer: "Once your cumulative gross earnings for the calendar year cross the annual wage base limit ($184,500 in 2026), your employer immediately ceases withholding the 6.2% OASDI tax. Your take-home paycheck will noticeably increase for the remainder of that year, resetting back to the normal 6.2% deduction on January 1.",
    },
    {
      question: "Is OASDI tax deductible on my income tax return?",
      answer: "W-2 employees cannot deduct their 6.2% OASDI payroll taxes on federal Form 1040. In contrast, self-employed individuals can claim an above-the-line deduction for exactly 50% of their total self-employment tax (representing the employer-equivalent share) on Schedule 1 of Form 1040, which lowers their adjusted gross income.",
    },
    {
      question: "OASDI vs Medicare tax — what is the difference?",
      answer: "While both taxes make up FICA payroll deductions, OASDI taxes are capped at $184,500 for 2026 at a 6.2% employee rate to fund retirement, survivor, and disability pensions. Medicare tax is 1.45% for employees, has no wage cap whatsoever, and taxes every dollar of earnings to fund hospital insurance, with an extra 0.9% surtax on high earners.",
    },
    {
      question: "What is the OASDI tax rate for 2026?",
      answer: "For the 2026 tax year, the employee OASDI tax rate remains 6.2% on covered wages up to $184,500, with an identical 6.2% paid by employers. Self-employed individuals pay the combined 12.4% rate up to the same $184,500 threshold.",
    },
    {
      question: "Does everyone pay the same OASDI rate?",
      answer: "Yes, all covered American workers pay the flat statutory 6.2% rate regardless of tax bracket, up until they hit the annual wage base cap. Because higher earners stop paying once they exceed $184,500 in 2026, OASDI is classified as a regressive payroll tax on total income.",
    },
    {
      question: "Can I get OASDI tax back if I overpaid?",
      answer: "If you worked for a single employer, excess withholding rarely happens because payroll systems automatically stop at the cap. However, if you switched employers mid-year or held multiple concurrent jobs earning over $184,500 collectively, each company withheld up to the cap. You can reclaim the excess overpaid OASDI as a refundable tax credit on Line 11 of IRS Form 1040 Schedule 3.",
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
        "name": "OASDI Tax Calculator",
        "item": "https://quickcalc.cloud/tools/oasdi-tax-calculator",
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
        <Breadcrumbs toolName="OASDI Tax Calculator" toolSlug="oasdi-tax-calculator" />

        {/* Intro Section - Humanized, addressing paystub confusion directly */}
        <div className="text-center max-w-2xl mx-auto mb-8">
          <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-zinc-900 dark:text-white mb-4">
            OASDI Tax Calculator (2026)
          </h1>

          <p className="text-base sm:text-lg text-zinc-600 dark:text-zinc-400 leading-relaxed font-normal">
            Opened your paystub and noticed an unfamiliar line item labeled &ldquo;OASDI&rdquo; taking a chunk out of your gross pay?
            Use this calculator to determine your exact Social Security deduction, see when you will hit the 2026 wage base cap ($184,500), and find out how much taxable room you have left this year.
          </p>
        </div>

        <ShareButtons
          url="https://quickcalc.cloud/tools/oasdi-tax-calculator"
          title="OASDI Tax Calculator (2026) — Calculate Social Security Tax"
        />
        <EmbedWidget
          url="https://quickcalc.cloud/tools/oasdi-tax-calculator"
          title="OASDI Tax Calculator (2026) — Calculate Social Security Tax"
        />

        {/* The Interactive Calculator Widget - High Above the Fold */}
        <section className="my-8" aria-label="OASDI Tax Calculator Tool">
          <OASDITaxCalculatorWidget />
        </section>

        {/* Collapsible Scientific & Mathematical Methodology */}
        <MethodologyAccordion slug="oasdi-tax-calculator" />

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
              Direct Answer & Overview
            </span>
            <h2 className="text-2xl font-bold text-zinc-950 dark:text-white">
              What is OASDI Tax?
            </h2>
          </div>

          {/* Quotable 40-60 word standalone direct answer paragraph */}
          <p className="text-base sm:text-lg font-medium text-zinc-800 dark:text-zinc-200 leading-relaxed bg-teal-50/60 dark:bg-teal-950/30 p-4 rounded-xl border border-teal-200/50 dark:border-teal-800/50">
            OASDI tax is the mandatory federal payroll deduction that funds the United States Social Security program. Formally known as Old-Age, Survivors, and Disability Insurance, the tax finances monthly retirement pensions, survivor support for bereaved dependents, and disability benefits for qualifying American workers.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5 pt-2 border-t border-zinc-100 dark:border-zinc-800">
            {/* Direct Answer 1: Rate */}
            <div className="space-y-2">
              <h3 className="text-base font-bold text-zinc-900 dark:text-zinc-100">
                What is the OASDI tax rate?
              </h3>
              <p className="text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed">
                The employee OASDI tax rate is 6.2% of gross wages, matched by a mandatory 6.2% contribution from the employer for a 12.4% total. Self-employed individuals pay the full 12.4% rate through self-employment tax on 92.35% of net business profits, deducting half the amount on their income tax return.
              </p>
            </div>

            {/* Direct Answer 2: Wage Base Limit */}
            <div className="space-y-2">
              <h3 className="text-base font-bold text-zinc-900 dark:text-zinc-100">
                What is the OASDI wage base limit for 2026?
              </h3>
              <p className="text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed">
                For the 2026 tax year, the OASDI wage base limit is $184,500. This statutory cap, set by the Social Security Administration based on the national average wage index, means earnings above $184,500 are exempt from Social Security withholding. The maximum annual OASDI tax for any employee in 2026 is $11,439.
              </p>
            </div>

            {/* Direct Answer 3: OASDI vs Social Security */}
            <div className="space-y-2">
              <h3 className="text-base font-bold text-zinc-900 dark:text-zinc-100">
                Is OASDI the same as Social Security tax?
              </h3>
              <p className="text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed">
                Yes, OASDI tax and Social Security tax are identical. &ldquo;OASDI&rdquo; is the official statutory acronym used by payroll software and the Internal Revenue Service, whereas &ldquo;Social Security&rdquo; is the popular name. When the abbreviation appears on a paystub or Form W-2, it denotes standard Social Security withholding.
              </p>
            </div>
          </div>
        </section>

        {/* HOW THIS IS CALCULATED SECTION */}
        <section className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-2xl p-6 sm:p-8 space-y-6 my-8">
          <div className="border-b border-zinc-100 dark:border-zinc-800 pb-4">
            <h2 className="text-2xl font-bold text-zinc-950 dark:text-white">
              How OASDI Tax is Calculated: Plain Math & Formulas
            </h2>
            <p className="text-sm text-zinc-600 dark:text-zinc-400 mt-1">
              Every payroll computation follows clear federal statutory formulas under Internal Revenue Code Section 3101(a).
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Formula 1: W-2 Employees */}
            <div className="p-4 bg-zinc-50 dark:bg-zinc-800/60 rounded-xl border border-zinc-200 dark:border-zinc-700">
              <span className="text-xs font-bold uppercase tracking-wider text-teal-600 dark:text-teal-400 block mb-1">
                W-2 Employee Formula
              </span>
              <div className="font-mono text-sm sm:text-base font-bold text-zinc-900 dark:text-white bg-white dark:bg-zinc-900 p-2.5 rounded-lg border border-zinc-200 dark:border-zinc-800">
                OASDI = min(Gross Wages, $184,500) × 6.2%
              </div>
              <p className="text-xs text-zinc-600 dark:text-zinc-400 mt-2 leading-relaxed">
                Your employer withholds 6.2% from each paycheck until your cumulative year-to-date earnings reach $184,500. Your employer remits an additional 6.2% match from company funds.
              </p>
            </div>

            {/* Formula 2: Self-Employed (1099) */}
            <div className="p-4 bg-zinc-50 dark:bg-zinc-800/60 rounded-xl border border-zinc-200 dark:border-zinc-700">
              <span className="text-xs font-bold uppercase tracking-wider text-teal-600 dark:text-teal-400 block mb-1">
                Self-Employed (1099 / Schedule SE) Formula
              </span>
              <div className="font-mono text-sm sm:text-base font-bold text-zinc-900 dark:text-white bg-white dark:bg-zinc-900 p-2.5 rounded-lg border border-zinc-200 dark:border-zinc-800">
                OASDI = min(Net SE Earnings × 0.9235, $184,500) × 12.4%
              </div>
              <p className="text-xs text-zinc-600 dark:text-zinc-400 mt-2 leading-relaxed">
                Net business profit is first adjusted by 92.35% (the IRS Schedule SE deduction) before applying the 12.4% combined rate. Half the resulting tax is deductible on Form 1040.
              </p>
            </div>
          </div>

          {/* Worked Practical Examples */}
          <div className="space-y-4 pt-2">
            <h3 className="text-lg font-bold text-zinc-900 dark:text-white">
              Real-World Calculation Examples for 2026
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="p-4 rounded-xl border border-zinc-200 dark:border-zinc-700 text-sm space-y-2">
                <div className="font-bold text-zinc-900 dark:text-white">
                  Example 1: Salary Under the Cap ($75,000 / Year)
                </div>
                <p className="text-zinc-600 dark:text-zinc-400 text-xs leading-relaxed">
                  If you earn $75,000 annually paid biweekly (26 paychecks), your gross wage per paycheck is $2,884.62.
                </p>
                <div className="bg-zinc-50 dark:bg-zinc-800/60 p-2 rounded text-xs font-mono">
                  $2,884.62 × 6.2% = <strong>$178.85 OASDI per paycheck</strong>
                </div>
                <p className="text-zinc-600 dark:text-zinc-400 text-xs leading-relaxed">
                  Over 26 paychecks, your annual OASDI total equals <strong>$4,650.00</strong>. Because $75,000 is well below the $184,500 cap, every single paycheck has the full 6.2% deducted.
                </p>
              </div>

              <div className="p-4 rounded-xl border border-zinc-200 dark:border-zinc-700 text-sm space-y-2">
                <div className="font-bold text-zinc-900 dark:text-white">
                  Example 2: High Earner Crossing the Cap ($240,000 / Year)
                </div>
                <p className="text-zinc-600 dark:text-zinc-400 text-xs leading-relaxed">
                  If you earn $240,000 annually paid monthly ($20,000/month), you hit the $184,500 cap in October (Month 10).
                </p>
                <div className="bg-zinc-50 dark:bg-zinc-800/60 p-2 rounded text-xs font-mono">
                  Months 1–9: $1,240.00 OASDI / mo<br />
                  Month 10: Only $4,500 subject to tax ($279.00)<br />
                  Months 11–12: <strong>$0.00 OASDI (100% exempt)</strong>
                </div>
                <p className="text-zinc-600 dark:text-zinc-400 text-xs leading-relaxed">
                  Your total annual OASDI tax is capped at exactly <strong>$11,439.00</strong> ($184,500 × 6.2%), saving you $3,441 in withholding across November and December.
                </p>
              </div>
            </div>
          </div>

          {/* Historical Wage Base Cap Table */}
          <div className="pt-2">
            <h3 className="text-base font-bold text-zinc-900 dark:text-white mb-3">
              Official OASDI Wage Base Limits and Maximum Tax by Year
            </h3>
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs sm:text-sm border-collapse">
                <thead>
                  <tr className="border-b border-zinc-200 dark:border-zinc-700 bg-zinc-50 dark:bg-zinc-800/50">
                    <th className="py-2.5 px-3 font-bold text-zinc-900 dark:text-white">Tax Year</th>
                    <th className="py-2.5 px-3 font-bold text-zinc-900 dark:text-white">Wage Base Cap</th>
                    <th className="py-2.5 px-3 font-bold text-zinc-900 dark:text-white">Employee Rate</th>
                    <th className="py-2.5 px-3 font-bold text-zinc-900 dark:text-white">Max Employee Tax</th>
                    <th className="py-2.5 px-3 font-bold text-zinc-900 dark:text-white">Max Self-Employed Tax</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-zinc-200 dark:divide-zinc-800">
                  <tr className="bg-teal-50/40 dark:bg-teal-950/20 font-semibold">
                    <td className="py-2.5 px-3 text-teal-800 dark:text-teal-300">2026 (Current)</td>
                    <td className="py-2.5 px-3 text-teal-800 dark:text-teal-300">$184,500</td>
                    <td className="py-2.5 px-3 text-teal-800 dark:text-teal-300">6.2%</td>
                    <td className="py-2.5 px-3 text-teal-800 dark:text-teal-300">$11,439.00</td>
                    <td className="py-2.5 px-3 text-teal-800 dark:text-teal-300">$21,127.84</td>
                  </tr>
                  <tr>
                    <td className="py-2.5 px-3">2025</td>
                    <td className="py-2.5 px-3">$176,100</td>
                    <td className="py-2.5 px-3">6.2%</td>
                    <td className="py-2.5 px-3">$10,918.20</td>
                    <td className="py-2.5 px-3">$20,165.92</td>
                  </tr>
                  <tr>
                    <td className="py-2.5 px-3">2024</td>
                    <td className="py-2.5 px-3">$168,600</td>
                    <td className="py-2.5 px-3">6.2%</td>
                    <td className="py-2.5 px-3">$10,453.20</td>
                    <td className="py-2.5 px-3">$19,307.21</td>
                  </tr>
                  <tr>
                    <td className="py-2.5 px-3">2023</td>
                    <td className="py-2.5 px-3">$160,200</td>
                    <td className="py-2.5 px-3">6.2%</td>
                    <td className="py-2.5 px-3">$9,932.40</td>
                    <td className="py-2.5 px-3">$18,345.26</td>
                  </tr>
                  <tr>
                    <td className="py-2.5 px-3">2022</td>
                    <td className="py-2.5 px-3">$147,000</td>
                    <td className="py-2.5 px-3">6.2%</td>
                    <td className="py-2.5 px-3">$9,114.00</td>
                    <td className="py-2.5 px-3">$16,833.40</td>
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
              Frequently Asked Questions About OASDI Tax
            </h2>
            <p className="text-sm text-zinc-600 dark:text-zinc-400 mt-1">
              Clear, practical answers to common questions about payroll deductions and Social Security rules.
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

        {/* INTERNAL LINKS TO RELATED CALCULATORS */}
        <section className="my-10 bg-zinc-100/70 dark:bg-zinc-900/60 p-6 sm:p-8 rounded-2xl border border-zinc-200 dark:border-zinc-800">
          <h2 className="text-xl font-bold text-zinc-900 dark:text-white mb-2">
            Related Payroll & Financial Tools
          </h2>
          <p className="text-sm text-zinc-600 dark:text-zinc-400 mb-6">
            Model your total net compensation, calculate overtime, and plan your long-term retirement savings with our free calculators:
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <Link
              href="/tools/salary-take-home-calculator"
              className="p-4 bg-white dark:bg-zinc-800/80 rounded-xl border border-zinc-200 dark:border-zinc-700 hover:border-teal-500 hover:shadow-md transition-all group"
            >
              <div className="text-sm font-bold text-zinc-900 dark:text-white group-hover:text-teal-600 dark:group-hover:text-teal-400">
                Salary Take-Home Calculator &rarr;
              </div>
              <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-1.5">
                Calculate your exact net pay after federal, state, and FICA payroll taxes.
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
                Calculate total shift hours, unpaid breaks, and 1.5x overtime gross wages.
              </p>
            </Link>

            <Link
              href="/tools/retirement-withdrawal-simulator"
              className="p-4 bg-white dark:bg-zinc-800/80 rounded-xl border border-zinc-200 dark:border-zinc-700 hover:border-teal-500 hover:shadow-md transition-all group"
            >
              <div className="text-sm font-bold text-zinc-900 dark:text-white group-hover:text-teal-600 dark:group-hover:text-teal-400">
                Safe Withdrawal Simulator &rarr;
              </div>
              <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-1.5">
                Test 30-year retirement portfolio survival rates against historical US market cycles.
              </p>
            </Link>

            <Link
              href="/tools/loan-calculator"
              className="p-4 bg-white dark:bg-zinc-800/80 rounded-xl border border-zinc-200 dark:border-zinc-700 hover:border-teal-500 hover:shadow-md transition-all group"
            >
              <div className="text-sm font-bold text-zinc-900 dark:text-white group-hover:text-teal-600 dark:group-hover:text-teal-400">
                Loan & EMI Calculator &rarr;
              </div>
              <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-1.5">
                Calculate monthly loan installments, principal amortization, and total interest.
              </p>
            </Link>
          </div>
        </section>

        <RelatedTools currentSlug="oasdi-tax-calculator" />

        {/* Ad Placement Footer */}
        <div className="ad-slot ad-slot--footer mt-12" data-ad-position="footer">
          <div className="ad-placeholder-label border border-dashed border-zinc-300 dark:border-zinc-800 rounded-xl py-4 flex items-center justify-center bg-zinc-50/50 dark:bg-zinc-950/20 text-[10px] font-bold text-zinc-400 dark:text-zinc-600 uppercase tracking-widest cursor-default">
            Advertisement
          </div>
        </div>
      </main>

      {/* Site Footer */}
      <Footer customText="Verified federal payroll calculations based on official Social Security Administration wage indexing." />
    </div>
  );
}
