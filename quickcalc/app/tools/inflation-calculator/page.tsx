import MethodologyAccordion from "@/components/MethodologyAccordion";

import Navbar from "@/components/Navbar";
import { generateSoftwareAppSchema } from "@/lib/schema";
import RelatedTools from "@/components/RelatedTools";
import ShareButtons from "@/components/ShareButtons";
import EmbedWidget from "@/components/EmbedWidget";

import Breadcrumbs from "@/components/Breadcrumbs";
import type { Metadata } from "next";
import Link from "next/link";
import InflationCalculatorWidget from "./InflationCalculatorWidget";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "Inflation Calculator - Compare Past vs Present Value",
  description: "Calculate how inflation changes your purchasing power in the US, Canada, and Pakistan. Compare money value then vs now using official CPI historical data.",
  alternates: {
    canonical: "/tools/inflation-calculator",
  },
  openGraph: {
    title: "Inflation Calculator - Compare Past vs Present Value",
    description: "Calculate how inflation changes your purchasing power in the US, Canada, and Pakistan. Compare money value then vs now using official CPI historical data.",
    url: "https://quickcalc.cloud/tools/inflation-calculator",
    type: "website",
    siteName: "QuickCalc",
    images: [
      {
        url: "https://quickcalc.cloud/og-image.png",
        width: 1200,
        height: 630,
        alt: "Inflation Calculator on QuickCalc",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Inflation Calculator - Compare Past vs Present Value",
    description: "Calculate how inflation changes your purchasing power in the US, Canada, and Pakistan. Compare money value then vs now using official CPI historical data.",
  },
};

export default function InflationCalculatorPage({ searchParams }: { searchParams?: { embed?: string } }) {
  const softwareSchema = generateSoftwareAppSchema({
    name: "Inflation Calculator - Compare Past vs Present Value",
    description: "Calculate how inflation changes your purchasing power in the US, Canada, and Pakistan. Compare money value then vs now using official CPI historical d",
    slug: "inflation-calculator",
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
          <InflationCalculatorWidget />
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
        "name": "What is $100 worth today compared to a historical year?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "To find out what is $100 worth today compared to a past year, enter $100 into our inflation calculator and select your starting year and ending year. The tool compares historical Consumer Price Index (CPI) values to show you exactly how much money you need today to match the purchasing power of that past year."
        }
      },
      {
        "@type": "Question",
        "name": "How do I calculate the inflation-adjusted value of money?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "To learn how to calculate inflation adjusted value, divide the Consumer Price Index (CPI) of your target year by the CPI of your starting year, and then multiply the result by your original cash amount. Our tool automates this calculation using real CPI data for the United States, Canada, and Pakistan."
        }
      },
      {
        "@type": "Question",
        "name": "How do I find my dollar's purchasing power over time using an inflation calculator?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Our purchasing power over time calculator helps you visualize how inflation erodes the value of money. By comparing annual prices and CPI statistics over decades, the calculator demonstrates how much cash has lost its buying power and what equivalent sum is needed to purchase the same goods today."
        }
      }
    ]
  };

  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    "headline": "Inflation Calculator: What Money Was Worth Then vs. Now (US, Canada & Pakistan)",
    "description": "An interactive multi-country inflation calculator that supports US, Canada, and Pakistan data to compute real purchasing power in both directions.",
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
      "@id": "https://quickcalc.cloud/tools/inflation-calculator"
    }
  }

  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-zinc-950 text-zinc-900 dark:text-zinc-100 font-[family-name:var(--font-geist-sans)] transition-colors">
      {/* FAQ & Article Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqData) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
      />

      {/* Header */}
      <Navbar />

      {/* Main Content */}
      <main className="max-w-4xl mx-auto px-4 py-8 sm:py-12">
        <Breadcrumbs toolName="Inflation Calculator" toolSlug="inflation-calculator" />
        
        <div className="text-center max-w-3xl mx-auto mb-8">
          <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-zinc-900 dark:text-white mb-4">
            Inflation Calculator: What Money Was Worth Then vs. Now (US, Canada & Pakistan)
          </h1>

          {/* AI-extractable direct answer summary */}
          <p className="text-sm sm:text-base font-semibold text-teal-700 dark:text-teal-300 bg-teal-500/5 border border-teal-500/20 rounded-xl px-4 py-3 leading-relaxed mb-4 text-left">
            This free tool calculates historical and projected purchasing power changes using official Consumer Price Index (CPI) datasets.
          </p>
          <p className="text-base sm:text-lg text-zinc-600 dark:text-zinc-400 leading-relaxed font-semibold">
            If you are looking for a reliable purchasing power over time calculator, our tool provides precise historical comparisons instantly. Inflation represents the steady decline in the purchasing power of money over time, meaning each unit of currency buys fewer goods and services. As prices rise, the real-world value of your cash decreases, directly impacting your cost of living. Calculating historical inflation helps you see exactly how much cash is needed today to match the buying power of the past.
          </p>
        </div>

        <ShareButtons url="https://quickcalc.cloud/tools/inflation-calculator" title="Inflation Calculator - Past vs Present Buying Power" />
        <EmbedWidget url="https://quickcalc.cloud/tools/inflation-calculator" title="Inflation Calculator - Past vs Present Buying Power" />

        <section className="my-8">
          <InflationCalculatorWidget />
        </section>

        {/* Collapsible Scientific & Mathematical Methodology */}
        <MethodologyAccordion slug="inflation-calculator" />

        {/* Ad Slot */}
        <div className="ad-slot ad-slot--inline my-8 animate-pulse" data-ad-position="in-content-1">
          <div className="ad-placeholder-label border border-dashed border-zinc-300 dark:border-zinc-800 rounded-xl py-4 flex items-center justify-center bg-zinc-50/50 dark:bg-zinc-950/20 text-[10px] font-bold text-zinc-400 dark:text-zinc-600 uppercase tracking-widest cursor-default">
            Advertisement
          </div>
        </div>

        {/* Informational Copy */}
        <article className="prose prose-zinc dark:prose-invert max-w-3xl mx-auto space-y-8 mt-12 border-t border-zinc-200 dark:border-zinc-800 pt-10">
          <section className="space-y-4">
            <h2 className="text-2xl font-bold text-zinc-950 dark:text-white">
              About Our CPI Inflation and Buying Power Calculator
            </h2>
            <div className="text-zinc-600 dark:text-zinc-400 leading-relaxed space-y-4">
              <p>
                <strong>Understanding Inflation and the Consumer Price Index (CPI)</strong>
                <br />
                The Consumer Price Index (CPI) is the standard metric used by governments to track inflation. It measures the average change over time in the prices paid by urban consumers for a market basket of consumer goods and services, including housing, food, transportation, energy, and healthcare. When the CPI increases, it indicates that the overall cost of living is rising, which directly erodes the purchasing power of your money.
              </p>
              <p>
                To measure inflation, statistical agencies like the US Bureau of Labor Statistics, Statistics Canada, and the Pakistan Bureau of Statistics regularly collect price data on thousands of items. By comparing the cost of this market basket in any given year to a designated base year, economists can determine the cumulative percentage increase in prices.
              </p>
              <p>
                <strong>Why Do Inflation Rates Differ Significantly Between Countries?</strong>
                <br />
                Inflation rates differ significantly between countries due to distinct monetary policies, domestic economic factors, and fiscal stability. Developing economies, such as Pakistan, often experience higher inflation rates due to currency depreciation, supply chain disruptions, energy crises, and rapid changes in central bank interest rates. On the other hand, developed nations like the United States and Canada typically maintain lower, more stable inflation rates. This is achieved through independent central banks (like the Federal Reserve and the Bank of Canada) that manage monetary policy to target a stable inflation rate around 2% annually.
              </p>
              <p>
                When comparing international currencies, planning travel, or sending remittances across borders, it is highly beneficial to evaluate purchasing power and real-world conversion rates using our live <Link href="/tools/currency-converter" className="text-blue-600 dark:text-blue-400 hover:underline font-semibold">Currency Converter</Link>. If you are evaluating how inflation affects your salary or budget, you can also explore our specialized <Link href="/tools/salary-take-home-calculator" className="text-blue-600 dark:text-blue-400 hover:underline font-semibold">Salary Take-Home Calculator</Link> to model your net income after tax deductions.
              </p>
            </div>
          </section>

          {/* Ad Slot */}
          <div className="ad-slot ad-slot--inline my-8 animate-pulse" data-ad-position="in-content-2">
            <div className="ad-placeholder-label border border-dashed border-zinc-300 dark:border-zinc-800 rounded-xl py-4 flex items-center justify-center bg-zinc-50/50 dark:bg-zinc-950/20 text-[10px] font-bold text-zinc-400 dark:text-zinc-600 uppercase tracking-widest cursor-default">
              Advertisement
            </div>
          </div>

          <section className="space-y-4 pt-4 border-t border-zinc-100 dark:border-zinc-900">
            <h2 className="text-2xl font-bold text-zinc-950 dark:text-white pb-2">
              Frequently Asked Questions (FAQ)
            </h2>
            <div className="space-y-6">
              <div className="space-y-2">
                <h3 className="text-base font-bold text-zinc-900 dark:text-zinc-100">
                  What is $100 worth today compared to a historical year?
                </h3>
                <p className="text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed">
                  To find out what is $100 worth today compared to a past year, enter $100 into our inflation calculator and select your starting year and ending year. The tool compares historical Consumer Price Index (CPI) values to show you exactly how much money you need today to match the purchasing power of that past year.
                </p>
              </div>

              <div className="space-y-2">
                <h3 className="text-base font-bold text-zinc-900 dark:text-zinc-100">
                  How do I calculate the inflation-adjusted value of money?
                </h3>
                <p className="text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed">
                  To learn how to calculate inflation adjusted value, divide the Consumer Price Index (CPI) of your target year by the CPI of your starting year, and then multiply the result by your original cash amount. Our tool automates this calculation using real CPI data for the United States, Canada, and Pakistan.
                </p>
              </div>

              <div className="space-y-2">
                <h3 className="text-base font-bold text-zinc-900 dark:text-zinc-100">
                  How do I find my dollar's purchasing power over time using an inflation calculator?
                </h3>
                <p className="text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed">
                  Our purchasing power over time calculator helps you visualize how inflation erodes the value of money. By comparing annual prices and CPI statistics over decades, the calculator demonstrates how much cash has lost its buying power and what equivalent sum is needed to purchase the same goods today.
                </p>
              </div>
            </div>
          </section>
        </article>

        <RelatedTools currentSlug="inflation-calculator" />
      </main>

      <Footer customText="Reliable, multi-country purchasing power and inflation trackers." />
    </div>
  );
}
