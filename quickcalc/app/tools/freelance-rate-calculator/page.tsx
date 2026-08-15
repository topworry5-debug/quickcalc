import MethodologyAccordion from "@/components/MethodologyAccordion";
import Navbar from "@/components/Navbar";
import { generateSoftwareAppSchema } from "@/lib/schema";
import RelatedTools from "@/components/RelatedTools";
import ShareButtons from "@/components/ShareButtons";
import EmbedWidget from "@/components/EmbedWidget";
import Breadcrumbs from "@/components/Breadcrumbs";
import type { Metadata } from "next";
import Link from "next/link";
import FreelanceRateCalculatorWidget from "./FreelanceRateCalculatorWidget";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "Freelance Rate Calculator - Minimum Hourly & Daily Rates",
  description: "Calculate your minimum freelance hourly rate, daily target, and monthly revenue goal based on target annual income, business overhead, and billable hours ratio.",
  alternates: {
    canonical: "/tools/freelance-rate-calculator",
  },
  openGraph: {
    title: "Freelance Rate Calculator - Minimum Hourly & Daily Rates",
    description: "Calculate your minimum freelance hourly rate, daily target, and monthly revenue goal based on target annual income, business overhead, and billable hours ratio.",
    url: "https://quickcalc.cloud/tools/freelance-rate-calculator",
    type: "website",
    siteName: "QuickCalc",
    images: [
      {
        url: "https://quickcalc.cloud/og-image.png",
        width: 1200,
        height: 630,
        alt: "Freelance Rate Calculator on QuickCalc",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Freelance Rate Calculator - Minimum Hourly & Daily Rates",
    description: "Calculate your minimum freelance hourly rate, daily target, and monthly revenue goal based on target annual income, business overhead, and billable hours ratio.",
  },
};

export default function FreelanceRateCalculatorPage({
  searchParams,
}: {
  searchParams?: { embed?: string };
}) {
  const softwareSchema = generateSoftwareAppSchema({
    name: "Freelance Rate Calculator - Minimum Hourly & Daily Rates",
    description:
      "Calculate your minimum freelance hourly rate, daily target, and monthly revenue goal based on target annual income, business overhead, and billable hours ratio.",
    slug: "freelance-rate-calculator",
    category: "Utility",
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
          <FreelanceRateCalculatorWidget />
        </main>
      </div>
    );
  }

  const faqData = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        "name": "How do I calculate my minimum freelance hourly rate?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "To calculate your minimum hourly rate, add your desired annual take-home income to your annual business overhead and taxes to determine total annual revenue needed. Divide this revenue goal by your total annual billable hours (work weeks per year × weekly work hours × billable percentage).",
        },
      },
      {
        "@type": "Question",
        "name": "Why is the billable hours ratio usually set around 70% for freelancers?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Freelancers cannot bill 100% of their working hours because essential business activities — such as lead generation, client meetings, administrative paperwork, software maintenance, and invoicing — are non-billable. A 70% billable ratio ensures non-billable overhead is factored into your baseline hourly rate.",
        },
      },
      {
        "@type": "Question",
        "name": "How do I calculate my freelance daily rate from my hourly rate?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Your freelance daily rate target is computed by dividing your total annual revenue goal by the actual number of days you plan to work per year (e.g., 48 weeks × 5 days = 240 work days). Alternatively, multiply your minimum hourly rate by your daily working hours adjusted for billable time.",
        },
      },
    ],
  };

  const articleData = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: "Freelance Rate Calculator: How to Calculate Minimum Hourly Rates & Overhead",
    description:
      "A comprehensive guide and interactive pricing tool for freelancers, consultants, and agency owners to calculate hourly rates, daily targets, and billable ratios accurately.",
    url: "https://quickcalc.cloud/tools/freelance-rate-calculator",
    image: "https://quickcalc.cloud/og-image.png",
    author: {
      "@type": "Organization",
      name: "QuickCalc",
    },
    publisher: {
      "@type": "Organization",
      name: "QuickCalc",
      logo: {
        "@type": "ImageObject",
        url: "https://quickcalc.cloud/og-image.png",
      },
    },
    datePublished: "2026-08-08",
  };

  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-zinc-950 text-zinc-900 dark:text-zinc-100 font-[family-name:var(--font-geist-sans)] transition-colors">
      {/* FAQ Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqData) }}
      />
      {/* Article Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleData) }}
      />

      {/* Header */}
      <Navbar />

      {/* Main Content */}
      <main className="max-w-4xl mx-auto px-4 py-8 sm:py-12">
        <Breadcrumbs toolName="Freelance Rate Calculator" toolSlug="freelance-rate-calculator" />
        
        <div className="text-center max-w-2xl mx-auto mb-8">
          <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-zinc-900 dark:text-white mb-4">
            Freelance & Hourly Rate Calculator
          </h1>

          {/* AI-extractable direct answer summary */}
          <p className="text-sm sm:text-base font-semibold text-teal-700 dark:text-teal-300 bg-teal-500/5 border border-teal-500/20 rounded-xl px-4 py-3 leading-relaxed mb-4 text-left">
            This free tool calculates your minimum freelance hourly rate, target daily rate, and required monthly revenue based on target income, business expenses, working weeks, and billable ratio.
          </p>

          {/* Stand-alone direct-answer paragraph */}
          <p className="text-base sm:text-lg text-zinc-600 dark:text-zinc-400 leading-relaxed font-medium">
            To determine your freelance hourly rate, calculate your total required gross revenue by combining desired net income with annual business expenses and taxes. Divide this total by your actual annual billable hours — factoring in vacation time and non-billable administrative hours (typically 30% of total working time) to avoid underpricing your services.
          </p>
        </div>

        <ShareButtons
          url="https://quickcalc.cloud/tools/freelance-rate-calculator"
          title="Freelance Rate Calculator: Calculate Minimum Hourly & Daily Rates"
        />
        <EmbedWidget
          url="https://quickcalc.cloud/tools/freelance-rate-calculator"
          title="Freelance Rate Calculator"
        />

        {/* The interactive widget */}
        <section className="my-8">
          <FreelanceRateCalculatorWidget />
        </section>

        {/* Collapsible Scientific & Mathematical Methodology */}
        <MethodologyAccordion slug="freelance-rate-calculator" />

        {/* Ad Placement 1 */}
        <div className="ad-slot ad-slot--inline" data-ad-position="in-content-1">
          <div className="ad-placeholder-label border border-dashed border-zinc-300 dark:border-zinc-800 rounded-xl py-4 flex items-center justify-center bg-zinc-50/50 dark:bg-zinc-950/20 text-[10px] font-bold text-zinc-400 dark:text-zinc-600 uppercase tracking-widest cursor-default">
            Advertisement
          </div>
        </div>

        {/* Detailed Explanation */}
        <article className="prose prose-zinc dark:prose-invert max-w-3xl mx-auto space-y-8 mt-12 border-t border-zinc-200 dark:border-zinc-800 pt-10">
          <section className="space-y-4">
            <h2 className="text-2xl font-bold text-zinc-950 dark:text-white">
              Understanding Freelance Pricing: Hourly Rates vs Total Revenue
            </h2>
            <p className="text-zinc-600 dark:text-zinc-400 leading-relaxed">
              The single biggest mistake new freelancers and independent consultants make is dividing their target annual salary directly by 2,080 hours (40 hours/week × 52 weeks). Salaried employees receive paid vacation, health insurance, employer-funded taxes, equipment, and paid administrative time. As a freelancer, you must cover all operating expenses, self-employment taxes, insurance, and unpaid downtime out of your billable rate.
            </p>
            <p className="text-zinc-600 dark:text-zinc-400 leading-relaxed">
              Our calculator accounts for working week availability (typically 48 weeks per year after accounting for 4 weeks of vacation, holidays, and sick days) as well as the <strong className="text-zinc-800 dark:text-zinc-200">Billable Hours Ratio</strong>. On average, self-employed professionals only spend 60% to 75% of their working hours on billable client work. The remaining hours are spent on marketing, proposal drafting, administrative accounting, and professional development.
            </p>
            <p className="text-zinc-600 dark:text-zinc-400 leading-relaxed">
              You can also use our <Link href="/tools/salary-take-home-calculator" className="text-teal-600 dark:text-teal-400 underline hover:text-teal-700">Salary Take-Home Calculator</Link> to cross-reference corporate net salaries, our <Link href="/tools/work-hours-calculator" className="text-emerald-600 dark:text-emerald-400 font-semibold underline hover:text-emerald-700">Work Hours / Timesheet Calculator</Link> to log billable client hours, or our <Link href="/tools/budget-calculator" className="text-teal-600 dark:text-teal-400 underline hover:text-teal-700">50/30/20 Budget Calculator</Link> to structure your personal living expenses.
            </p>
          </section>

          {/* Ad Placement 2 */}
          <div className="ad-slot ad-slot--inline" data-ad-position="in-content-2">
            <div className="ad-placeholder-label border border-dashed border-zinc-300 dark:border-zinc-800 rounded-xl py-4 flex items-center justify-center bg-zinc-50/50 dark:bg-zinc-950/20 text-[10px] font-bold text-zinc-400 dark:text-zinc-600 uppercase tracking-widest cursor-default">
              Advertisement
            </div>
          </div>

          {/* FAQ section */}
          <section className="space-y-6 border-t border-zinc-200 dark:border-zinc-800 pt-8">
            <h2 className="text-2xl font-bold text-zinc-950 dark:text-white border-b border-zinc-100 dark:border-zinc-900 pb-2">
              Frequently Asked Questions (FAQ)
            </h2>
            <div className="space-y-4">
              <div>
                <h3 className="text-lg font-semibold text-zinc-900 dark:text-white">
                  How do I calculate my minimum freelance hourly rate?
                </h3>
                <p className="text-zinc-600 dark:text-zinc-400 mt-1">
                  Combine your target annual net income with your yearly business expenses and estimated taxes. Divide that total revenue target by your annual billable hours (work weeks × weekly hours × billable percentage).
                </p>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-zinc-900 dark:text-white">
                  Why is the billable hours ratio usually set around 70% for freelancers?
                </h3>
                <p className="text-zinc-600 dark:text-zinc-400 mt-1">
                  Because unbilled admin work like invoicing, marketing, proposals, and customer support takes up roughly 25-30% of standard work weeks. Setting a 70% billable ratio ensures your billable client hours cover your full non-billable work hours.
                </p>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-zinc-900 dark:text-white">
                  How do I calculate my freelance daily rate from my hourly rate?
                </h3>
                <p className="text-zinc-600 dark:text-zinc-400 mt-1">
                  Divide your total annual revenue goal by the number of work days per year (e.g. 48 weeks × 5 days = 240 days), or multiply your hourly rate by daily billable hours.
                </p>
              </div>
            </div>
          </section>
        </article>

        {/* Related Tools */}
        <section className="mt-16 pt-8 border-t border-zinc-200 dark:border-zinc-800">
          <RelatedTools currentSlug="freelance-rate-calculator" />
        </section>
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
}
