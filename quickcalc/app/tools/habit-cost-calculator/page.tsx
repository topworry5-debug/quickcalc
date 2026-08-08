import MethodologyAccordion from "@/components/MethodologyAccordion";

import Navbar from "@/components/Navbar";
import { generateSoftwareAppSchema } from "@/lib/schema";
import RelatedTools from "@/components/RelatedTools";
import ShareButtons from "@/components/ShareButtons";
import EmbedWidget from "@/components/EmbedWidget";

import Breadcrumbs from "@/components/Breadcrumbs";
import type { Metadata } from "next";
import Link from "next/link";
import HabitCostCalculatorWidget from "./HabitCostCalculatorWidget";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "Habit Cost Calculator - Long-Term Time & Money Impact",
  description: "Calculate the true compounding financial and time cost of recurring daily habits. See how small daily expenses grow over years, decades, or by retirement.",
  alternates: {
    canonical: "/tools/habit-cost-calculator",
  },
  openGraph: {
    title: "Habit Cost Calculator - Long-Term Time & Money Impact",
    description: "Calculate the true compounding financial and time cost of recurring daily habits. See how small daily expenses grow over years, decades, or by retirement.",
    url: "https://quickcalc.cloud/tools/habit-cost-calculator",
    type: "website",
    siteName: "QuickCalc",
    images: [
      {
        url: "https://quickcalc.cloud/og-image.png",
        width: 1200,
        height: 630,
        alt: "Habit Cost Calculator on QuickCalc",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Habit Cost Calculator - Long-Term Time & Money Impact",
    description: "Calculate the true compounding financial and time cost of recurring daily habits. See how small daily expenses grow over years, decades, or by retirement.",
  },
};

export default function HabitCostCalculatorPage({ searchParams }: { searchParams?: { embed?: string } }) {
  const softwareSchema = generateSoftwareAppSchema({
    name: "Habit Cost Calculator - Long-Term Time & Money Impact",
    description: "Calculate the true compounding financial and time cost of recurring daily habits. See how small daily expenses grow over years, decades, or by retirem",
    slug: "habit-cost-calculator",
    category: "Utility"
  });

  const isEmbed = searchParams?.embed === "true";
  if (isEmbed) {
    return (
      <div className="min-h-screen bg-white dark:bg-zinc-950 text-zinc-900 dark:text-zinc-100 font-[family-name:var(--font-geist-sans)] transition-colors p-2 flex flex-col justify-between">
      {/* WebApplication JSON-LD Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(softwareSchema) }}
      />

        <main className="max-w-4xl mx-auto w-full">
          <HabitCostCalculatorWidget />
        </main>
      </div>
    );
  }

  const faqData = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      {
        "@type": "Question",
        "name": "How do I calculate how much screen time I spend on my phone per year?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "If you spend an average of 4 hours daily on your phone, you spend 1,460 hours per year scrolling. This equals roughly 61 full 24-hour days or about 91 active waking days spent entirely on your mobile screen annually."
        }
      },
      {
        "@type": "Question",
        "name": "How much does my daily coffee habit cost me over a year?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "A daily $5.00 coffee habit accumulates to $1,825.00 over a single year. Over 10 years, the out-of-pocket cost rises to $18,250.00, which could have compounding value exceeding $31,000 if placed into modest investments instead."
        }
      },
      {
        "@type": "Question",
        "name": "How is the long-term financial cost of a habit calculated?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "The cost of a habit is calculated using linear multiplication of the daily recurring resource cost across specific calendar intervals. We multiply daily hours or currency spent by 365 days for one year, by 1,825 days for five years, and by 3,650 days for ten years."
        }
      },
      {
        "@type": "Question",
        "name": "Does this tool calculate the opportunity cost of habits if invested instead?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "The base money cost reflects out-of-pocket spending without adjusting for inflation. However, our calculator features a compound interest projection demonstrating what those cumulative funds could grow to if directed into monthly investments yielding 7% annually."
        }
      },
      {
        "@type": "Question",
        "name": "What daily screen time limits are considered healthy for adults?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "While experts suggest limiting non-work screen time to under two hours daily, the average adult spends over four hours looking at screens. Compounded over a decade, spending four hours daily uses 14,600 hours, equivalent to nearly 608 full 24-hour days."
        }
      }
    ]
  };

  const articleData = {
    "@context": "https://schema.org",
    "@type": "Article",
    "headline": "Habit Cost Calculator: See the Real Time & Money Cost of Daily Habits",
    "description": "Understand how small daily routines compound into substantial investments of time and money over a decade and how prioritizing your budget can change your lifestyle.",
    "author": {
      "@type": "Organization",
      "name": "QuickCalc"
    },
    "publisher": {
      "@type": "Organization",
      "name": "QuickCalc",
      "logo": {
        "@type": "ImageObject",
        "url": "https://quickcalc.cloud/og-image.png"
      }
    },
    "mainEntityOfPage": {
      "@type": "WebPage",
      "@id": "https://quickcalc.cloud/tools/habit-cost-calculator"
    }
  }

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
        <Breadcrumbs toolName="Habit Cost Calculator" toolSlug="habit-cost-calculator" />
        <div className="text-center max-w-2xl mx-auto mb-8">
          <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-zinc-900 dark:text-white mb-4">
            Habit Cost Calculator: See the Real Time & Money Cost of Daily Habits
          </h1>

          {/* AI-extractable direct answer summary */}
          <p className="text-sm sm:text-base font-semibold text-teal-700 dark:text-teal-300 bg-teal-500/5 border border-teal-500/20 rounded-xl px-4 py-3 leading-relaxed mb-4 text-left">
            This free tool calculates the compounding long-term financial and time cost of daily recurring habits over 1 to 30 years.
          </p>
          {/* Direct Answer Paragraph - 50 to 70 words */}
          <p className="text-base sm:text-lg text-zinc-600 dark:text-zinc-400 leading-relaxed font-medium">
            Small daily habits compound into massive costs of time and money over years. A brief daily routine or minor out-of-pocket expense can quietly claim months of your active life and tens of thousands of dollars over a decade. This calculator reveals these combined compounding impacts side-by-side, helping you analyze long-term patterns and prioritize your lifestyle choices.
          </p>
        </div>

        <ShareButtons url="https://quickcalc.cloud/tools/habit-cost-calculator" title="Habit Cost Calculator" />
        <EmbedWidget url="https://quickcalc.cloud/tools/habit-cost-calculator" title="Habit Cost Calculator" />

        {/* Interactive Widget */}
        <section className="my-8">
          <HabitCostCalculatorWidget />
        </section>

        {/* Collapsible Scientific & Mathematical Methodology */}
        <MethodologyAccordion slug="habit-cost-calculator" />

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
              About Our Daily Habit Cost and Screen Time Calculator
            </h2>
            <p className="text-zinc-600 dark:text-zinc-400 leading-relaxed">
              Every daily habit has an impact that compounds silently over time. This tool calculates these impacts using simple, transparent math: multiplying the daily hours or financial outlays by the total number of days across selected calendar timeframes. Specifically, a single year consists of 365 days, five years represents 1,825 days, ten years represents 3,650 days, and the retirement projection calculates the exact count of days remaining until you reach age 65.
            </p>
            <p className="text-zinc-600 dark:text-zinc-400 leading-relaxed">
              For example, if you spend just 30 minutes daily scrolling social media, it totals 182.5 hours annually. Over 10 years, that compounds to 1,825 hours, which translates to over 76 full 24-hour days, or 114 active waking days (using a standard 16-hour waking day). Financially, a $5.00 daily routine consumes $1,825.00 annually and $18,250.00 over a decade. If you were to redirect this pocket change into a monthly retirement savings account earning a modest 7% historical annual yield, your habits could have grown to over $31,000.00.
            </p>
            <p className="text-zinc-600 dark:text-zinc-400 leading-relaxed">
              Analyzing these cumulative figures helps you keep your budget and daily routines aligned. Many people who evaluate their habits find it highly beneficial to review their take-home income using our specialized <Link href="/tools/salary-take-home-calculator" className="text-blue-600 dark:text-blue-400 hover:underline font-semibold">Salary Take-Home Calculator</Link> to see exactly how their discretionary spending fits into their broader financial picture.
            </p>
          </section>

          {/* Ad Placement 2 */}
          <div className="ad-slot ad-slot--inline" data-ad-position="in-content-2">
            <div className="ad-placeholder-label border border-dashed border-zinc-300 dark:border-zinc-800 rounded-xl py-4 flex items-center justify-center bg-zinc-50/50 dark:bg-zinc-950/20 text-[10px] font-bold text-zinc-400 dark:text-zinc-600 uppercase tracking-widest cursor-default">
              Advertisement
            </div>
          </div>

          {/* FAQ Section */}
          <section className="space-y-4 border-t border-zinc-200 dark:border-zinc-800 pt-8">
            <h2 className="text-2xl font-bold text-zinc-950 dark:text-white border-b border-zinc-100 dark:border-zinc-900 pb-2">
              Frequently Asked Questions (FAQ)
            </h2>
            <div className="space-y-6">
              <div className="space-y-2">
                <h3 className="text-base font-bold text-zinc-900 dark:text-zinc-100">
                  How do I calculate how much screen time I spend on my phone per year?
                </h3>
                <p className="text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed">
                  If you spend an average of 4 hours daily on your phone, you spend 1,460 hours per year scrolling. This equals roughly 61 full 24-hour days or about 91 active waking days spent entirely on your mobile screen annually.
                </p>
              </div>

              <div className="space-y-2">
                <h3 className="text-base font-bold text-zinc-900 dark:text-zinc-100">
                  How much does my daily coffee habit cost me over a year?
                </h3>
                <p className="text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed">
                  A daily $5.00 coffee habit accumulates to $1,825.00 over a single year. Over 10 years, the out-of-pocket cost rises to $18,250.00, which could have compounding value exceeding $31,000 if placed into modest investments instead.
                </p>
              </div>

              <div className="space-y-2">
                <h3 className="text-base font-bold text-zinc-900 dark:text-zinc-100">
                  How is the long-term financial cost of a habit calculated?
                </h3>
                <p className="text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed">
                  The cost of a habit is calculated using linear multiplication of the daily recurring resource cost across specific calendar intervals. We multiply daily hours or currency spent by 365 days for one year, by 1,825 days for five years, and by 3,650 days for ten years.
                </p>
              </div>

              <div className="space-y-2">
                <h3 className="text-base font-bold text-zinc-900 dark:text-zinc-100">
                  Does this tool calculate the opportunity cost of habits if invested instead?
                </h3>
                <p className="text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed">
                  The base money cost reflects out-of-pocket spending without adjusting for inflation. However, our calculator features a compound interest projection demonstrating what those cumulative funds could grow to if directed into monthly investments yielding 7% annually.
                </p>
              </div>

              <div className="space-y-2">
                <h3 className="text-base font-bold text-zinc-900 dark:text-zinc-100">
                  What daily screen time limits are considered healthy for adults?
                </h3>
                <p className="text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed">
                  While experts suggest limiting non-work screen time to under two hours daily, the average adult spends over four hours looking at screens. Compounded over a decade, spending four hours daily uses 14,600 hours, equivalent to nearly 608 full 24-hour days.
                </p>
              </div>
            </div>
          </section>
        </article>

        <RelatedTools currentSlug="habit-cost-calculator" />

        {/* Ad Placement Footer */}
        <div className="ad-slot ad-slot--footer mt-12" data-ad-position="footer">
          <div className="ad-placeholder-label border border-dashed border-zinc-300 dark:border-zinc-800 rounded-xl py-4 flex items-center justify-center bg-zinc-50/50 dark:bg-zinc-950/20 text-[10px] font-bold text-zinc-400 dark:text-zinc-600 uppercase tracking-widest cursor-default">
            Advertisement
          </div>
        </div>
      </main>

      {/* Footer */}
      <Footer customText="Intuitive, client-side compounding habit and routine planners." />
    </div>
  );
}
