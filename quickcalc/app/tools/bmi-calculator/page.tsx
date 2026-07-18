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
      }
    ]
  };

  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-zinc-950 text-zinc-900 dark:text-zinc-100 font-[family-name:var(--font-geist-sans)] transition-colors">
      {/* FAQ Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqData) }}
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
            <span className="text-sm font-medium text-zinc-300 dark:text-zinc-700">|</span>
            <span className="text-sm font-medium text-zinc-400 dark:text-zinc-600">BMI Calculator</span>
          </nav>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-4xl mx-auto px-4 py-8 sm:py-12">
        <div className="text-center max-w-2xl mx-auto mb-8">
          <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-zinc-900 dark:text-white mb-4">
            BMI Calculator
          </h1>
          <p className="text-base sm:text-lg text-zinc-600 dark:text-zinc-400 leading-relaxed">
            The Body Mass Index (BMI) Calculator is a highly interactive clinical screener designed to provide swift body mass classifications. By inputting your height and weight, this science-backed utility maps your parameters against standard World Health Organization bands. It serves as an accessible starting point for evaluating general body composition trends and overall health trajectories.
          </p>
        </div>

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

          {/* Ad Placement 2 */}
          <div className="ad-slot ad-slot--inline" data-ad-position="in-content-2">
            <div className="ad-placeholder-label border border-dashed border-zinc-300 dark:border-zinc-800 rounded-xl py-4 flex items-center justify-center bg-zinc-50/50 dark:bg-zinc-950/20 text-[10px] font-bold text-zinc-400 dark:text-zinc-600 uppercase tracking-widest cursor-default">
              Advertisement
            </div>
          </div>

          {/* FAQ Accordion */}
          <section className="space-y-4 border-t border-zinc-200 dark:border-zinc-800 pt-8">
            <h2 className="text-2xl font-bold text-zinc-950 dark:text-white">
              Frequently Asked Questions (FAQ)
            </h2>
            <div className="space-y-3">
              <details className="group border border-zinc-200 dark:border-zinc-800 rounded-lg p-4 bg-white dark:bg-zinc-900 transition-all duration-150 [&_summary::-webkit-details-marker]:hidden">
                <summary className="flex justify-between items-center font-semibold text-zinc-800 dark:text-zinc-200 cursor-pointer focus:outline-none">
                  <span>What is a healthy BMI range?</span>
                  <span className="transition group-open:rotate-180 text-zinc-400 dark:text-zinc-500">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" className="w-5 h-5">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
                    </svg>
                  </span>
                </summary>
                <p className="text-zinc-600 dark:text-zinc-400 mt-3 text-sm leading-relaxed">
                  For adults, a healthy Body Mass Index (BMI) is clinically defined as falling within the range of 18.5 to 24.9. Scores below 18.5 represent underweight status, scores from 25 to 29.9 indicate overweight classification, and a score of 30 or higher designates obesity.
                </p>
              </details>

              <details className="group border border-zinc-200 dark:border-zinc-800 rounded-lg p-4 bg-white dark:bg-zinc-900 transition-all duration-150 [&_summary::-webkit-details-marker]:hidden">
                <summary className="flex justify-between items-center font-semibold text-zinc-800 dark:text-zinc-200 cursor-pointer focus:outline-none">
                  <span>Is BMI accurate for muscular or athletic people?</span>
                  <span className="transition group-open:rotate-180 text-zinc-400 dark:text-zinc-500">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" className="w-5 h-5">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
                    </svg>
                  </span>
                </summary>
                <p className="text-zinc-600 dark:text-zinc-400 mt-3 text-sm leading-relaxed">
                  No, BMI can be highly misleading for bodybuilders, athletes, and individuals with dense muscle tissue. Because muscle weighs significantly more than fat per cubic inch, a highly fit person can register as {"'overweight'"} or {"'obese'"} on the BMI scale despite having very low body fat.
                </p>
              </details>

              <details className="group border border-zinc-200 dark:border-zinc-800 rounded-lg p-4 bg-white dark:bg-zinc-900 transition-all duration-150 [&_summary::-webkit-details-marker]:hidden">
                <summary className="flex justify-between items-center font-semibold text-zinc-800 dark:text-zinc-200 cursor-pointer focus:outline-none">
                  <span>How is BMI calculated?</span>
                  <span className="transition group-open:rotate-180 text-zinc-400 dark:text-zinc-500">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" className="w-5 h-5">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
                    </svg>
                  </span>
                </summary>
                <p className="text-zinc-600 dark:text-zinc-400 mt-3 text-sm leading-relaxed">
                  Body Mass Index is calculated by dividing a {"person's"} weight in kilograms by the square of their height in meters (BMI = kg/m²). If utilizing imperial measurements, the formula is BMI = [weight in pounds / (height in inches)²] x 703.
                </p>
              </details>
            </div>
          </section>
        </article>

        {/* Related Tools */}
        <section className="max-w-3xl mx-auto border-t border-zinc-200 dark:border-zinc-800 mt-12 pt-8">
          <h3 className="text-xl font-bold text-zinc-900 dark:text-white mb-6">
            Related Health & Lifestyle Tools
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 p-5 rounded-xl hover:shadow-md transition duration-200">
              <span className="text-2xl mb-2 block">💧</span>
              <h4 className="font-bold text-zinc-900 dark:text-white text-base">Water Intake</h4>
              <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-2">
                Calculate your optimal hydration targets based on body weight and activity.
              </p>
              <Link href="/tools/water-intake-calculator" className="inline-block text-xs font-semibold text-emerald-500 dark:text-emerald-400 mt-4 hover:underline">
                Use Tool &rarr;
              </Link>
            </div>

            <div className="border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 p-5 rounded-xl hover:shadow-md transition duration-200">
              <span className="text-2xl mb-2 block">😴</span>
              <h4 className="font-bold text-zinc-900 dark:text-white text-base">Sleep Calculator</h4>
              <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-2">
                Calculate your optimal sleep cycles and wake up feeling refreshed.
              </p>
              <Link href="/tools/sleep-cycle-calculator" className="inline-block text-xs font-semibold text-emerald-500 dark:text-emerald-400 mt-4 hover:underline">
                Use Tool &rarr;
              </Link>
            </div>

            <div className="border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 p-5 rounded-xl hover:shadow-md transition duration-200">
              <span className="text-2xl mb-2 block">📅</span>
              <h4 className="font-bold text-zinc-900 dark:text-white text-base">Due Date Calculator</h4>
              <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-2">
                Calculate your estimated due date and pregnancy timeline milestones.
              </p>
              <span className="inline-block text-xs font-semibold text-zinc-400 dark:text-zinc-600 mt-4 cursor-default">
                Coming soon &rarr;
              </span>
            </div>
          </div>
        </section>

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
