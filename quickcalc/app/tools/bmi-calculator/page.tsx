import RelatedTools from "@/components/RelatedTools";
import ShareButtons from "@/components/ShareButtons";

import ThemeToggle from "@/components/ThemeToggle";

import Breadcrumbs from "@/components/Breadcrumbs";

import type { Metadata } from "next";
import Link from "next/link";
import BMICalculatorWidget from "./BMICalculatorWidget";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "BMI Calculator - Scientific Visual Body Mass Index Screener | QuickCalc",
  description: "Calculate your body mass index (BMI) instantly. Analyze clinical weight ranges with a live horizontal gauge. 100% free with no sign-ups.",
  alternates: {
    canonical: "/tools/bmi-calculator",
  },
  openGraph: {
    title: "BMI Calculator - Scientific Visual Body Mass Index Screener | QuickCalc",
    description: "Calculate your body mass index (BMI) instantly. Analyze clinical weight ranges with a live horizontal gauge. 100% free with no sign-ups.",
    url: "https://quickcalc.cloud/tools/bmi-calculator",
    type: "website",
    siteName: "QuickCalc",
    images: [
      {
        url: "https://quickcalc.cloud/og-image.png",
        width: 1200,
        height: 630,
        alt: "BMI Calculator on QuickCalc",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "BMI Calculator - Scientific Visual Body Mass Index Screener | QuickCalc",
    description: "Calculate your body mass index (BMI) instantly. Analyze clinical weight ranges with a live horizontal gauge. 100% free with no sign-ups.",
    images: ["https://quickcalc.cloud/og-image.png"],
  },
};

export default function BMICalculatorPage() {
  const faqData = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      {
        "@type": "Question",
        "name": "What is a healthy BMI range?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "For adults, a healthy Body Mass Index (BMI) is clinically defined as falling within the range of 18.5 to 24.9. Scores below 18.5 represent underweight status, scores from 25 to 29.9 indicate overweight classification, and a score of 30 or higher designates obesity."
        }
      },
      {
        "@type": "Question",
        "name": "Is BMI accurate for muscular or athletic people?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "No, BMI can be highly misleading for bodybuilders, athletes, and individuals with dense muscle tissue. Because muscle weighs significantly more than fat per cubic inch, a highly fit person can register as 'overweight' or 'obese' on the BMI scale despite having very low body fat."
        }
      },
      {
        "@type": "Question",
        "name": "How is BMI calculated?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Body Mass Index is calculated by dividing a person's weight in kilograms by the square of their height in meters (BMI = kg/m²). If utilizing imperial measurements, the formula is BMI = [weight in pounds / (height in inches)²] x 703."
        }
      },
      {
        "@type": "Question",
        "name": "What are the limitations of using BMI as a health metric?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "BMI does not directly measure body fat percentage or distribute fat. It cannot differentiate between fat and lean muscle mass, nor does it account for bone density, age, or gender differences."
        }
      },
      {
        "@type": "Question",
        "name": "Does BMI vary by age or gender?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "While the basic mathematical calculation for BMI is the same for all adults, the interpretation can vary. Older adults tend to have more body fat than younger adults with the same BMI, and women generally have more body fat than men at the same BMI score."
        }
      },
      {
        "@type": "Question",
        "name": "How often should I check my BMI?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Checking your BMI every few months or during annual physical exams is typically sufficient for tracking body mass trends, unless otherwise advised by a healthcare provider."
        }
      }
    ]
  };

  const softwareData = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    "name": "BMI Calculator",
    "operatingSystem": "All",
    "applicationCategory": "HealthApplication",
    "offers": {
      "@type": "Offer",
      "price": "0",
      "priceCurrency": "USD"
    }
  };

  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-zinc-950 text-zinc-900 dark:text-zinc-100 font-[family-name:var(--font-geist-sans)] transition-colors">
      {/* FAQ Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqData) }}
      />
      {/* Software Application Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(softwareData) }}
      />

      {/* Header */}
      <header className="border-b border-zinc-200 dark:border-zinc-800 bg-white/80 dark:bg-zinc-900/80 backdrop-blur-md sticky top-0 z-50 transition-colors">
        <div className="max-w-4xl mx-auto px-4 h-16 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2 font-bold text-lg text-emerald-600 dark:text-emerald-400">
            <span>⚖️ QuickCalc</span>
          </Link>
          <nav className="flex items-center gap-2 sm:gap-4">
            <Link href="/" className="text-sm font-medium text-zinc-600 dark:text-zinc-400 hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors">
              Home
            </Link>
            <Link href="/blog" className="text-sm font-medium text-zinc-600 dark:text-zinc-400 hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors">
              Blog
            </Link>
            <span className="text-sm font-medium text-zinc-300 dark:text-zinc-700 font-normal">|</span>
            <span className="text-sm font-medium text-zinc-300 dark:text-zinc-700">|</span>
            <span className="text-sm font-medium text-zinc-400 dark:text-zinc-600">BMI Calculator</span>
            <span className="text-sm font-medium text-zinc-300 dark:text-zinc-700 font-normal">|</span>
            <ThemeToggle />
          </nav>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-4xl mx-auto px-4 py-8 sm:py-12">
        <Breadcrumbs toolName="BMI Calculator" toolSlug="bmi-calculator" />
        <div className="text-center max-w-2xl mx-auto mb-8">
          <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-zinc-900 dark:text-white mb-4">
            BMI Calculator
          </h1>
          <p className="text-base sm:text-lg text-zinc-600 dark:text-zinc-400 leading-relaxed">
            The Body Mass Index (BMI) Calculator is a highly interactive clinical screener designed to provide swift body mass classifications. By inputting your height and weight, this science-backed utility maps your parameters against standard World Health Organization bands. It serves as an accessible starting point for evaluating general body composition trends and overall health trajectories.
          </p>
        </div>

        <ShareButtons url="https://quickcalc.cloud/tools/bmi-calculator" title="BMI Calculator" />

        {/* The interactive widget */}
        <section className="my-8">
          <BMICalculatorWidget />
        </section>

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
              About this BMI Calculator
            </h2>
            <p className="text-zinc-600 dark:text-zinc-400 leading-relaxed">
              Body Mass Index is a simple mathematical ratio designed to categorize individuals into weight bands that reflect statistical medical trends. First conceptualized by Adolphe Quetelet in the 19th century, the BMI calculation divides your weight in kilograms by your squared height in meters (kg/m²). This clinical screening tool allows practitioners and epidemiologists to quickly categorize populations and monitor risk indicators associated with cardiovascular stress, diabetes, and metabolic health.
            </p>
            <p className="text-zinc-600 dark:text-zinc-400 leading-relaxed">
              Unlike other generic web-based converters that gate accurate analysis, QuickCalc offers this tool <strong>100% free with absolutely zero sign-ins, zero email capture, and zero hidden paywalls</strong>. We believe critical health modeling parameters should be fully accessible to everyone instantly.
            </p>
            <p className="text-zinc-600 dark:text-zinc-400 leading-relaxed">
              However, BMI is not a diagnostic tool and has distinct biological limitations. Because the calculation strictly relies on gross physical measurements, it is unable to differentiate between lean muscle mass, skeletal structures, water volume, and adipose tissue. This means individuals with advanced athletic training or high bone density frequently receive high BMI scores that do not represent their actual cardiovascular or metabolic state. Additionally, ideal body weight standards vary significantly across children, pregnant populations, and unique ethnic backgrounds. This utility should always be utilized as a basic estimate, never as direct medical advice.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-bold text-zinc-950 dark:text-white">
              How is this calculated?
            </h2>
            <p className="text-zinc-600 dark:text-zinc-400 leading-relaxed">
              To calculate Body Mass Index (BMI), we use standard metric or imperial equations based on your preferred units:
            </p>
            <ul className="list-disc pl-6 text-zinc-600 dark:text-zinc-400 space-y-2">
              <li>
                <strong>Metric Formula:</strong> BMI = Weight (kg) / [Height (m)]²
              </li>
              <li>
                <strong>Imperial Formula:</strong> BMI = [Weight (lbs) / [Height (in)]²] x 703
              </li>
            </ul>
            <p className="text-zinc-600 dark:text-zinc-400 leading-relaxed mt-2">
              The resulting score is automatically mapped directly to clinical WHO guidelines to identify if your body mass falls within underweight, normal, overweight, or obese ranges.
            </p>
          </section>

          {/* Ad Placement 2 */}
          <div className="ad-slot ad-slot--inline" data-ad-position="in-content-2">
            <div className="ad-placeholder-label border border-dashed border-zinc-300 dark:border-zinc-800 rounded-xl py-4 flex items-center justify-center bg-zinc-50/50 dark:bg-zinc-950/20 text-[10px] font-bold text-zinc-400 dark:text-zinc-600 uppercase tracking-widest cursor-default">
              Advertisement
            </div>
          </div>

          {/* FAQ open style matching Age Calculator and Currency Converter */}
          <section className="space-y-4 border-t border-zinc-200 dark:border-zinc-800 pt-8">
            <h2 className="text-2xl font-bold text-zinc-950 dark:text-white border-b border-zinc-100 dark:border-zinc-900 pb-2">
              Frequently Asked Questions (FAQ)
            </h2>
            <div className="space-y-6">
              <div className="space-y-2">
                <h3 className="text-base font-bold text-zinc-900 dark:text-zinc-100">
                  What is a healthy BMI range?
                </h3>
                <p className="text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed">
                  For adults, a healthy Body Mass Index (BMI) is clinically defined as falling within the range of 18.5 to 24.9. Scores below 18.5 represent underweight status, scores from 25 to 29.9 indicate overweight classification, and a score of 30 or higher designates obesity.
                </p>
              </div>

              <div className="space-y-2">
                <h3 className="text-base font-bold text-zinc-900 dark:text-zinc-100">
                  Is BMI accurate for muscular or athletic people?
                </h3>
                <p className="text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed">
                  No, BMI can be highly misleading for bodybuilders, athletes, and individuals with dense muscle tissue. Because muscle weighs significantly more than fat per cubic inch, a highly fit person can register as {"'overweight'"} or {"'obese'"} on the BMI scale despite having very low body fat.
                </p>
              </div>

              <div className="space-y-2">
                <h3 className="text-base font-bold text-zinc-900 dark:text-zinc-100">
                  How is BMI calculated?
                </h3>
                <p className="text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed">
                  Body Mass Index is calculated by dividing a {"person's"} weight in kilograms by the square of their height in meters (BMI = kg/m²). If utilizing imperial measurements, the formula is BMI = [weight in pounds / (height in inches)²] x 703.
                </p>
              </div>

              <div className="space-y-2">
                <h3 className="text-base font-bold text-zinc-900 dark:text-zinc-100">
                  What are the limitations of using BMI as a health metric?
                </h3>
                <p className="text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed">
                  BMI does not directly measure body fat percentage or distribute fat. It cannot differentiate between fat and lean muscle mass, nor does it account for bone density, age, or gender differences.
                </p>
              </div>

              <div className="space-y-2">
                <h3 className="text-base font-bold text-zinc-900 dark:text-zinc-100">
                  Does BMI vary by age or gender?
                </h3>
                <p className="text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed">
                  While the basic mathematical calculation for BMI is the same for all adults, the interpretation can vary. Older adults tend to have more body fat than younger adults with the same BMI, and women generally have more body fat than men at the same BMI score.
                </p>
              </div>

              <div className="space-y-2">
                <h3 className="text-base font-bold text-zinc-900 dark:text-zinc-100">
                  How often should I check my BMI?
                </h3>
                <p className="text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed">
                  Checking your BMI every few months or during annual physical exams is typically sufficient for tracking body mass trends, unless otherwise advised by a healthcare provider.
                </p>
              </div>
            </div>
          </section>
        </article>

        <RelatedTools currentSlug="bmi-calculator" />

        {/* Ad Placement Footer */}
        <div className="ad-slot ad-slot--footer mt-12" data-ad-position="footer">
          <div className="ad-placeholder-label border border-dashed border-zinc-300 dark:border-zinc-800 rounded-xl py-4 flex items-center justify-center bg-zinc-50/50 dark:bg-zinc-950/20 text-[10px] font-bold text-zinc-400 dark:text-zinc-600 uppercase tracking-widest cursor-default">
            Advertisement
          </div>
        </div>
      </main>

      {/* Footer */}
      <Footer customText="Elegant, clinical body composition screeners." />
    </div>
  );
}
