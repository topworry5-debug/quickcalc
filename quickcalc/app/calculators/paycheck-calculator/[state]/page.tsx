import React, { Suspense } from "react";
import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ShareButtons from "@/components/ShareButtons";
import EmbedWidget from "@/components/EmbedWidget";
import PaycheckWidget from "./PaycheckWidget";
import {
  STATES_TAX_DATA,
  getStateTaxData,
  FEDERAL_2026,
} from "@/lib/taxData";
import { formatCurrency } from "@/lib/calculators/creditCardPayoffCalculator";
import {
  Sparkles,
  MapPin,
  Building2,
  HelpCircle,
  BookOpen,
  ArrowRight,
  ShieldCheck,
  Scale,
  FileText,
  Percent,
  CheckCircle2,
} from "lucide-react";

interface StatePageProps {
  params: {
    state: string;
  };
  searchParams?: {
    embed?: string;
  };
}

export async function generateStaticParams() {
  return STATES_TAX_DATA.map((state) => ({
    state: state.slug,
  }));
}

export async function generateMetadata({ params }: StatePageProps): Promise<Metadata> {
  const stateData = getStateTaxData(params.state);
  if (!stateData) {
    return {
      title: "State Paycheck Calculator | QuickCalc",
    };
  }

  const taxSummary = !stateData.hasIncomeTax
    ? "0% No State Income Tax"
    : stateData.taxType === "flat"
    ? `Flat ${stateData.topRateText}`
    : `Graduated Up to ${stateData.topRateText}`;

  const title = `${stateData.name} Paycheck Calculator 2026 - Take Home Pay Estimator (${taxSummary}) | QuickCalc`;
  const description = `Calculate your net take-home pay in ${stateData.name} for 2026. Accurately calculates 2026 Federal income tax, ${stateData.hasIncomeTax ? `${stateData.name} state tax (${stateData.topRateText})` : "0% state tax"}, FICA (Social Security & Medicare), and pre-tax 401(k) deductions.`;

  return {
    title,
    description,
    alternates: {
      canonical: `https://quickcalc.cloud/calculators/paycheck-calculator/${stateData.slug}`,
    },
    openGraph: {
      title,
      description,
      url: `https://quickcalc.cloud/calculators/paycheck-calculator/${stateData.slug}`,
      type: "website",
      siteName: "QuickCalc",
      images: [
        {
          url: "https://quickcalc.cloud/og-image.png",
          width: 1200,
          height: 630,
          alt: `${stateData.name} Paycheck Calculator 2026`,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
    },
  };
}

export default function StatePaycheckCalculatorPage({ params, searchParams }: StatePageProps) {
  const stateData = getStateTaxData(params.state);

  if (!stateData) {
    notFound();
  }

  const isEmbed = searchParams?.embed === "true";

  // State tax label helper
  const stateTaxBadge = !stateData.hasIncomeTax
    ? "No State Income Tax (0%)"
    : stateData.taxType === "flat"
    ? `Flat State Tax (${stateData.topRateText})`
    : `Progressive State Tax (Up to ${stateData.topRateText})`;

  // Structured Data: SoftwareApplication Schema
  const softwareSchema = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: `${stateData.name} Paycheck Calculator (2026)`,
    description: `Free 2026 take-home pay estimator for ${stateData.name}. Computes federal income tax, ${stateData.name} state withholding, Social Security, Medicare, and pre-tax deductions.`,
    applicationCategory: "FinanceApplication",
    operatingSystem: "All",
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "USD",
    },
    url: `https://quickcalc.cloud/calculators/paycheck-calculator/${stateData.slug}`,
  };

  // Structured Data: FAQPage Schema
  const stateFaqItems = [
    {
      question: `Does ${stateData.name} have a state income tax in 2026?`,
      answer: !stateData.hasIncomeTax
        ? `No. ${stateData.name} is one of the few US states with no personal state income tax on earned wages. Workers in ${stateData.name} only pay Federal income taxes and FICA (Social Security and Medicare), retaining more take-home pay per paycheck.`
        : stateData.taxType === "flat"
        ? `Yes. ${stateData.name} levies a flat personal income tax rate of ${stateData.topRateText} on taxable income after standard exemptions.`
        : `Yes. ${stateData.name} has a graduated (progressive) state income tax system with marginal brackets reaching up to ${stateData.topRateText}. Lower tiers of your income are taxed at reduced rates, while higher tiers are taxed at higher percentages.`,
    },
    {
      question: `How is take-home pay calculated in ${stateData.name}?`,
      answer: `Take-home pay in ${stateData.name} is calculated as Gross Wages minus: (1) Federal Income Tax based on 2026 IRS tax brackets, (2) FICA taxes (6.2% Social Security up to the $184,500 wage base limit and 1.45% Medicare plus 0.9% for high earners), (3) ${stateData.hasIncomeTax ? `${stateData.name} state income tax` : "0% state income tax"}, and (4) optional pre-tax deductions such as 401(k) contributions and Section 125 health insurance.`,
    },
    {
      question: `What are the 2026 Federal tax brackets applied in ${stateData.name}?`,
      answer: `Federal tax brackets in ${stateData.name} for 2026 are 10%, 12%, 22%, 24%, 32%, 35%, and 37%. Taxable income is calculated after applying the Federal standard deduction ($15,000 for Single filers and $30,000 for Married Filing Jointly).`,
    },
    {
      question: `How do 401(k) and health insurance deductions reduce my ${stateData.name} taxes?`,
      answer: `Traditional 401(k) retirement contributions are deducted pre-tax, immediately reducing your Federal taxable income and ${stateData.hasIncomeTax ? `${stateData.name} state taxable income` : "taxable wages"} (FICA taxes still apply to 401k wages). Health insurance premiums paid via an employer Section 125 cafeteria plan reduce Federal, State, and FICA wage bases for maximum savings.`,
    },
    ...(stateData.localTaxNote
      ? [
          {
            question: `Are there local or municipal wage taxes in ${stateData.name}?`,
            answer: stateData.localTaxNote,
          },
        ]
      : []),
  ];

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: stateFaqItems.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.answer,
      },
    })),
  };

  // Structured Data: BreadcrumbList Schema
  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Home",
        item: "https://quickcalc.cloud/",
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "Paycheck Calculators",
        item: "https://quickcalc.cloud/calculators/paycheck-calculator",
      },
      {
        "@type": "ListItem",
        position: 3,
        name: `${stateData.name} Paycheck Calculator`,
        item: `https://quickcalc.cloud/calculators/paycheck-calculator/${stateData.slug}`,
      },
    ],
  };

  // High-traffic popular states for cross linking
  const popularStates = STATES_TAX_DATA.filter(
    (s) => s.popular && s.slug !== stateData.slug
  ).slice(0, 10);

  // Embed Mode View
  if (isEmbed) {
    return (
      <div className="min-h-screen bg-white dark:bg-zinc-950 text-zinc-900 dark:text-zinc-100 font-sans p-2 sm:p-4">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(softwareSchema) }}
        />
        <main className="max-w-4xl mx-auto w-full">
          <Suspense
            fallback={
              <div className="p-8 text-center text-zinc-500 animate-pulse font-mono text-sm">
                Loading {stateData.name} paycheck calculator...
              </div>
            }
          >
            <PaycheckWidget stateData={stateData} />
          </Suspense>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-zinc-950 text-zinc-900 dark:text-zinc-100 font-sans transition-colors selection:bg-emerald-500/20 selection:text-emerald-700">
      {/* Schema.org Injections */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(softwareSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />

      <Navbar />

      <main className="max-w-5xl mx-auto px-4 sm:px-6 py-8 sm:py-12">
        {/* Breadcrumb Navigation */}
        <nav
          aria-label="Breadcrumb"
          className="mb-6 flex items-center justify-between gap-4 text-xs text-zinc-500 dark:text-zinc-400"
        >
          <ol className="flex flex-wrap items-center gap-2 font-medium">
            <li>
              <Link
                href="/"
                className="hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors"
              >
                Home
              </Link>
            </li>
            <li className="select-none text-zinc-300 dark:text-zinc-700 font-normal">&gt;</li>
            <li>
              <Link
                href="/calculators/paycheck-calculator"
                className="hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors"
              >
                Paycheck Calculators
              </Link>
            </li>
            <li className="select-none text-zinc-300 dark:text-zinc-700 font-normal">&gt;</li>
            <li className="text-zinc-900 dark:text-zinc-100 font-semibold truncate">
              {stateData.name}
            </li>
          </ol>

          <Link
            href="/calculators/paycheck-calculator"
            className="hidden sm:inline-flex items-center gap-1 text-emerald-600 dark:text-emerald-400 hover:underline font-medium text-xs"
          >
            <span>All 50 States</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </nav>

        {/* Page Hero Header */}
        <div className="mb-8 space-y-4">
          <div className="flex flex-wrap items-center gap-2">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-emerald-100 dark:bg-emerald-950/70 text-emerald-800 dark:text-emerald-300 border border-emerald-300/40">
              <MapPin className="w-3.5 h-3.5" />
              {stateData.name} ({stateData.abbrev})
            </span>
            <span
              className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold border ${
                !stateData.hasIncomeTax
                  ? "bg-teal-50 dark:bg-teal-950/50 text-teal-800 dark:text-teal-300 border-teal-300/50"
                  : "bg-blue-50 dark:bg-blue-950/50 text-blue-800 dark:text-blue-300 border-blue-300/50"
              }`}
            >
              <Percent className="w-3.5 h-3.5" />
              {stateTaxBadge}
            </span>
            <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[11px] font-medium bg-zinc-200/70 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300">
              <Sparkles className="w-3 h-3 text-amber-500" />
              Updated for 2026 Tax Year
            </span>
          </div>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-zinc-900 dark:text-white leading-tight">
            {stateData.name} Paycheck Calculator{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-600 to-teal-500">
              2026
            </span>
          </h1>

          <p className="text-base sm:text-lg text-zinc-600 dark:text-zinc-400 max-w-3xl leading-relaxed">
            Estimate your net take-home salary or hourly earnings in {stateData.name}. Computes Federal income tax brackets, {stateData.hasIncomeTax ? `${stateData.name} state tax (${stateData.topRateText})` : "0% state income tax withholding"}, FICA contributions (Social Security & Medicare), and pre-tax deductions.
          </p>
        </div>

        {/* State Quick Tax Highlights Banner */}
        <div className="mb-8 grid grid-cols-1 sm:grid-cols-3 gap-3">
          <div className="p-4 rounded-2xl bg-white dark:bg-zinc-900 border border-zinc-200/80 dark:border-zinc-800 shadow-sm flex items-start gap-3">
            <div className="p-2 rounded-xl bg-emerald-100 dark:bg-emerald-950 text-emerald-600 dark:text-emerald-400 shrink-0">
              <Building2 className="w-5 h-5" />
            </div>
            <div>
              <div className="text-xs font-medium text-zinc-500 dark:text-zinc-400">
                {stateData.name} State Tax Rate
              </div>
              <div className="text-lg font-bold text-zinc-900 dark:text-white">
                {stateData.topRateText}
              </div>
              <div className="text-[11px] text-zinc-500 dark:text-zinc-400">
                {!stateData.hasIncomeTax
                  ? "Zero state personal income tax"
                  : stateData.taxType === "flat"
                  ? "Flat tax across all brackets"
                  : "Marginal progressive tax"}
              </div>
            </div>
          </div>

          <div className="p-4 rounded-2xl bg-white dark:bg-zinc-900 border border-zinc-200/80 dark:border-zinc-800 shadow-sm flex items-start gap-3">
            <div className="p-2 rounded-xl bg-blue-100 dark:bg-blue-950 text-blue-600 dark:text-blue-400 shrink-0">
              <Scale className="w-5 h-5" />
            </div>
            <div>
              <div className="text-xs font-medium text-zinc-500 dark:text-zinc-400">
                2026 Federal Std. Deduction
              </div>
              <div className="text-lg font-bold text-zinc-900 dark:text-white">
                {formatCurrency(FEDERAL_2026.STANDARD_DEDUCTION.single)} / {formatCurrency(FEDERAL_2026.STANDARD_DEDUCTION.married_joint)}
              </div>
              <div className="text-[11px] text-zinc-500 dark:text-zinc-400">
                Single / Married Filing Jointly
              </div>
            </div>
          </div>

          <div className="p-4 rounded-2xl bg-white dark:bg-zinc-900 border border-zinc-200/80 dark:border-zinc-800 shadow-sm flex items-start gap-3">
            <div className="p-2 rounded-xl bg-teal-100 dark:bg-teal-950 text-teal-600 dark:text-teal-400 shrink-0">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <div className="text-xs font-medium text-zinc-500 dark:text-zinc-400">
                2026 FICA Wage Limit
              </div>
              <div className="text-lg font-bold text-zinc-900 dark:text-white">
                {formatCurrency(FEDERAL_2026.SS_WAGE_BASE)}
              </div>
              <div className="text-[11px] text-zinc-500 dark:text-zinc-400">
                Social Security cap (6.2%)
              </div>
            </div>
          </div>
        </div>

        {/* Main Interactive Widget */}
        <section className="mb-14">
          <Suspense
            fallback={
              <div className="p-12 text-center text-zinc-500 bg-white dark:bg-zinc-900 rounded-3xl border border-zinc-200 dark:border-zinc-800 animate-pulse">
                Initializing {stateData.name} Tax Model...
              </div>
            }
          >
            <PaycheckWidget stateData={stateData} />
          </Suspense>
        </section>

        {/* Share & Embed Bar */}
        <div className="mb-14 p-4 sm:p-5 rounded-2xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 flex flex-col sm:flex-row items-center justify-between gap-4 shadow-sm">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-xl bg-emerald-50 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400">
              <ShareButtons
                title={`${stateData.name} Paycheck Calculator 2026 - QuickCalc`}
                url={`https://quickcalc.cloud/calculators/paycheck-calculator/${stateData.slug}`}
              />
            </div>
            <div className="text-xs text-zinc-500 dark:text-zinc-400">
              Share this {stateData.name} paycheck breakdown with coworkers or friends.
            </div>
          </div>

          <EmbedWidget
            url={`https://quickcalc.cloud/calculators/paycheck-calculator/${stateData.slug}`}
            title={`${stateData.name} Paycheck Calculator`}
          />
        </div>

        {/* Deep-Dive Educational Guide Section */}
        <article className="space-y-10 border-t border-zinc-200 dark:border-zinc-800 pt-10 text-zinc-800 dark:text-zinc-200 leading-relaxed">
          <section className="space-y-4">
            <div className="flex items-center gap-2 text-emerald-600 dark:text-emerald-400 text-sm font-semibold tracking-wide uppercase">
              <BookOpen className="w-4 h-4" />
              <span>Tax Guide</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-zinc-900 dark:text-white">
              Understanding Your Paycheck in {stateData.name} (2026 Rules)
            </h2>
            <p className="text-zinc-600 dark:text-zinc-400">
              Whether you are an hourly worker or a salaried professional in {stateData.name}, your net take-home pay is significantly lower than your headline gross wage. Understanding the exact breakdown of each mandatory payroll withholding empowers you to negotiate better salaries, optimize tax deductions, and budget with confidence.
            </p>

            <div className="p-5 rounded-2xl bg-emerald-50/70 dark:bg-emerald-950/30 border border-emerald-200/80 dark:border-emerald-900/40 space-y-2">
              <h3 className="font-semibold text-emerald-900 dark:text-emerald-300 text-sm flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                {stateData.name} State Tax Profile
              </h3>
              <p className="text-sm text-zinc-700 dark:text-zinc-300">
                {stateData.description}
              </p>
              {stateData.localTaxNote && (
                <div className="mt-2 text-xs text-zinc-600 dark:text-zinc-400 bg-white/60 dark:bg-zinc-900/60 p-2.5 rounded-xl border border-zinc-200/60 dark:border-zinc-800">
                  <span className="font-bold text-zinc-700 dark:text-zinc-300">Local Tax Consideration: </span>
                  {stateData.localTaxNote}
                </div>
              )}
            </div>
          </section>

          {/* Deductions Breakdown Grid */}
          <section className="space-y-4">
            <h3 className="text-xl font-bold text-zinc-900 dark:text-white">
              The 4 Components Deducted from Your Paycheck
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="p-5 rounded-2xl bg-white dark:bg-zinc-900 border border-zinc-200/80 dark:border-zinc-800 space-y-2">
                <div className="flex items-center gap-2 text-emerald-600 dark:text-emerald-400 font-semibold text-sm">
                  <FileText className="w-4 h-4" />
                  <span>1. Federal Income Tax</span>
                </div>
                <p className="text-xs text-zinc-600 dark:text-zinc-400 leading-relaxed">
                  Collected by the IRS across 7 progressive brackets (10% to 37%). Taxes are calculated on your taxable income after applying the 2026 standard deduction (${formatCurrency(FEDERAL_2026.STANDARD_DEDUCTION.single)} Single / ${formatCurrency(FEDERAL_2026.STANDARD_DEDUCTION.married_joint)} Married Filing Jointly).
                </p>
              </div>

              <div className="p-5 rounded-2xl bg-white dark:bg-zinc-900 border border-zinc-200/80 dark:border-zinc-800 space-y-2">
                <div className="flex items-center gap-2 text-blue-600 dark:text-blue-400 font-semibold text-sm">
                  <Building2 className="w-4 h-4" />
                  <span>2. {stateData.name} State Income Tax</span>
                </div>
                <p className="text-xs text-zinc-600 dark:text-zinc-400 leading-relaxed">
                  {!stateData.hasIncomeTax
                    ? `${stateData.name} does not impose any personal state income tax on wage income. You receive $0 in state withholdings, maximizing your net take-home pay.`
                    : stateData.taxType === "flat"
                    ? `${stateData.name} levies a flat tax rate of ${stateData.topRateText} on income, providing predictable state tax deductions.`
                    : `${stateData.name} uses graduated tax brackets scaling up to ${stateData.topRateText}, where higher earning brackets pay higher marginal rates.`}
                </p>
              </div>

              <div className="p-5 rounded-2xl bg-white dark:bg-zinc-900 border border-zinc-200/80 dark:border-zinc-800 space-y-2">
                <div className="flex items-center gap-2 text-indigo-600 dark:text-indigo-400 font-semibold text-sm">
                  <ShieldCheck className="w-4 h-4" />
                  <span>3. Social Security Tax (FICA)</span>
                </div>
                <p className="text-xs text-zinc-600 dark:text-zinc-400 leading-relaxed">
                  A flat 6.2% tax withheld from employee earnings up to the 2026 wage limit of {formatCurrency(FEDERAL_2026.SS_WAGE_BASE)}. Any earnings above this ceiling are 100% exempt from further Social Security withholding for the remainder of the year.
                </p>
              </div>

              <div className="p-5 rounded-2xl bg-white dark:bg-zinc-900 border border-zinc-200/80 dark:border-zinc-800 space-y-2">
                <div className="flex items-center gap-2 text-teal-600 dark:text-teal-400 font-semibold text-sm">
                  <Scale className="w-4 h-4" />
                  <span>4. Medicare Tax (FICA)</span>
                </div>
                <p className="text-xs text-zinc-600 dark:text-zinc-400 leading-relaxed">
                  A 1.45% tax with no wage cap. High earners are subject to an Additional Medicare Tax of 0.9% on wage income exceeding $200,000 for single filers or $250,000 for married couples filing jointly.
                </p>
              </div>
            </div>
          </section>

          {/* State Specific Tax Brackets Table (if progressive or flat) */}
          {stateData.hasIncomeTax && (
            <section className="space-y-4">
              <h3 className="text-xl font-bold text-zinc-900 dark:text-white">
                {stateData.name} State Income Tax Structure (2026)
              </h3>
              <p className="text-sm text-zinc-600 dark:text-zinc-400">
                {stateData.taxType === "flat"
                  ? `${stateData.name} applies a single flat rate across all taxable income levels after deductions:`
                  : `${stateData.name} applies graduated progressive rates across multiple income thresholds for Single filers:`}
              </p>

              <div className="overflow-x-auto rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 shadow-sm">
                <table className="w-full text-left text-xs">
                  <thead className="bg-zinc-100 dark:bg-zinc-800/80 text-zinc-700 dark:text-zinc-300 font-semibold uppercase tracking-wider">
                    <tr>
                      <th className="py-3 px-4">Bracket Tier</th>
                      <th className="py-3 px-4">Taxable Income Threshold</th>
                      <th className="py-3 px-4 text-right">Marginal Tax Rate</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-zinc-200 dark:divide-zinc-800 font-mono">
                    {stateData.brackets.single.map((b, idx) => {
                      const prevLimit = idx === 0 ? 0 : stateData.brackets.single[idx - 1].limit;
                      return (
                        <tr key={idx} className="hover:bg-zinc-50 dark:hover:bg-zinc-800/40">
                          <td className="py-2.5 px-4 font-sans font-medium text-zinc-900 dark:text-white">
                            Bracket #{idx + 1}
                          </td>
                          <td className="py-2.5 px-4 text-zinc-600 dark:text-zinc-300">
                            {b.limit === Infinity
                              ? `Over ${formatCurrency(prevLimit)}`
                              : `${formatCurrency(prevLimit)} – ${formatCurrency(b.limit)}`}
                          </td>
                          <td className="py-2.5 px-4 text-right font-bold text-emerald-600 dark:text-emerald-400">
                            {(b.rate * 100).toFixed(2)}%
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </section>
          )}

          {/* State FAQ Section */}
          <section className="space-y-6 pt-4">
            <div className="flex items-center gap-2 text-emerald-600 dark:text-emerald-400 text-sm font-semibold tracking-wide uppercase">
              <HelpCircle className="w-4 h-4" />
              <span>Frequently Asked Questions</span>
            </div>
            <h3 className="text-2xl font-bold tracking-tight text-zinc-900 dark:text-white">
              {stateData.name} Paycheck & Tax FAQ
            </h3>

            <div className="space-y-4">
              {stateFaqItems.map((item, idx) => (
                <div
                  key={idx}
                  className="p-5 rounded-2xl bg-white dark:bg-zinc-900 border border-zinc-200/80 dark:border-zinc-800 shadow-sm space-y-2"
                >
                  <h4 className="font-semibold text-zinc-900 dark:text-white text-base">
                    {item.question}
                  </h4>
                  <p className="text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed">
                    {item.answer}
                  </p>
                </div>
              ))}
            </div>
          </section>

          {/* Popular Other States Cross-Linking */}
          <section className="space-y-4 pt-6 border-t border-zinc-200 dark:border-zinc-800">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-bold text-zinc-900 dark:text-white">
                Compare with Other US States
              </h3>
              <Link
                href="/calculators/paycheck-calculator"
                className="text-xs font-semibold text-emerald-600 dark:text-emerald-400 hover:underline flex items-center gap-1"
              >
                <span>View All 50 States</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-5 gap-2.5">
              {popularStates.map((popState) => (
                <Link
                  key={popState.slug}
                  href={`/calculators/paycheck-calculator/${popState.slug}`}
                  className="p-3 rounded-xl bg-white dark:bg-zinc-900 border border-zinc-200/80 dark:border-zinc-800 hover:border-emerald-500/50 hover:shadow-md transition-all text-center group"
                >
                  <div className="text-sm font-semibold text-zinc-900 dark:text-white group-hover:text-emerald-600 dark:group-hover:text-emerald-400">
                    {popState.name}
                  </div>
                  <div className="text-[11px] text-zinc-500 dark:text-zinc-400">
                    {popState.topRateText} Tax
                  </div>
                </Link>
              ))}
            </div>
          </section>
        </article>
      </main>

      <Footer />
    </div>
  );
}
