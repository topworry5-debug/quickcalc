import ThemeToggle from "@/components/ThemeToggle";

import Breadcrumbs from "@/components/Breadcrumbs";

import type { Metadata } from "next";
import Link from "next/link";
import WaterIntakeCalculatorWidget from "./WaterIntakeCalculatorWidget";
import Footer from "@/components/Footer";
import AdSlot from "@/components/AdSlot";

export const metadata: Metadata = {
  title: "Water Intake Calculator - How Much Water Should You Drink Daily?",
  description: "Calculate your ideal daily water intake in liters and glasses. Get a personalized hydration plan based on weight, activity level, and climate.",
  alternates: {
    canonical: "/tools/water-intake-calculator",
  },
};

export default function WaterIntakeCalculatorPage() {
  const faqData = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      {
        "@type": "Question",
        "name": "How many glasses of water should I drink a day?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "While the traditional '8 glasses a day' is a simple rule of thumb, our calculator provides a personalized target based on your weight and activity. For an average adult, this is typically between 9 and 13 glasses (2.2 to 3.2 liters) per day."
        }
      },
      {
        "@type": "Question",
        "name": "What are the signs of mild dehydration?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Early symptoms of dehydration include dry mouth, dark yellow or amber-colored urine, fatigue, headaches, dizziness, and muscle cramps. If you feel thirsty, your body is already mildly dehydrated."
        }
      },
      {
        "@type": "Question",
        "name": "Can I drink too much water?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Yes, drinking excessive amounts of water can lead to hyponatremia, a rare but serious condition where blood sodium levels become dangerously low. This usually only occurs during extreme endurance events when vast quantities of plain water are consumed without replacing lost electrolytes."
        }
      }
    ]
  };

  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-zinc-950 text-zinc-900 dark:text-zinc-100 font-[family-name:var(--font-geist-sans)]">
      {/* JSON-LD Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqData) }}
      />

      {/* Navigation Header */}
      <header className="border-b border-zinc-200 dark:border-zinc-800 bg-white/80 dark:bg-zinc-900/80 backdrop-blur-md sticky top-0 z-50">
        <div className="max-w-4xl mx-auto px-4 h-16 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2 font-bold text-lg text-blue-600 dark:text-blue-400">
            <span>💧 QuickCalc</span>
          </Link>
          <nav className="flex gap-4">
            <Link href="/" className="text-sm font-medium text-zinc-600 dark:text-zinc-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
              Home
            </Link>
            <span className="text-sm font-medium text-zinc-300 dark:text-zinc-700">|</span>
            <span className="text-sm font-medium text-zinc-400 dark:text-zinc-600">Water Intake</span>
            <span className="text-sm font-medium text-zinc-300 dark:text-zinc-700 font-normal">|</span>
            <ThemeToggle />
          </nav>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="max-w-4xl mx-auto px-4 py-8 sm:py-12">
        <Breadcrumbs toolName="Water Intake Calculator" toolSlug="water-intake-calculator" />
        <div className="text-center max-w-2xl mx-auto mb-8">
          <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-zinc-900 dark:text-white mb-4">
            Water Intake Calculator
          </h1>
          <p className="text-base sm:text-lg text-zinc-600 dark:text-zinc-400 leading-relaxed">
            The Water Intake Calculator is an easy-to-use, science-backed tool designed to help you determine your optimal daily hydration requirements. By analyzing key factors such as your body weight, physical activity level, and local climate conditions, this free tool computes a personalized hydration plan tailored directly to your lifestyle. Staying adequately hydrated is vital for optimizing physical performance, maintaining energy levels, supporting healthy brain function, and facilitating proper digestion.
          </p>
        </div>

        {/* Interactive Calculator Widget Component */}
        <section className="my-8">
          <WaterIntakeCalculatorWidget />
        </section>

        {/* AdSense Placement Ad-Slot-Inline */}
        <AdSlot slot="water-intake-inline" />

        {/* Detailed Article Sections */}
        <article className="prose prose-zinc dark:prose-invert max-w-3xl mx-auto space-y-8 mt-12 border-t border-zinc-200 dark:border-zinc-800 pt-10">
          <section className="space-y-4">
            <h2 className="text-2xl font-bold text-zinc-950 dark:text-white">
              About this calculator
            </h2>
            <p className="text-zinc-600 dark:text-zinc-400 leading-relaxed">
              Proper hydration is one of the most critical aspects of maintaining overall health and vitality, yet many people struggle to drink enough water each day. Our Water Intake Calculator uses a baseline physiological recommendation of 35 milliliters of fluid per kilogram of body weight. This formula is widely recognized by nutritionists and sports scientists as an optimal starting point for healthy adults.
            </p>
            <p className="text-zinc-600 dark:text-zinc-400 leading-relaxed">
              However, a simple weight-based calculation is rarely sufficient on its own. Your body constantly expels water through sweat during physical exertion and when exposed to warmer temperatures. To address this, our calculator dynamically adjusts your targets. For moderate activity, it adds 500 ml of water (approx. 2 glasses), and for heavy physical exercise or manual labor, it adds 1,000 ml. Living in or experiencing a hot, humid climate triggers an additional 500 ml requirement to safeguard you from dehydration and heat fatigue.
            </p>
            <p className="text-zinc-600 dark:text-zinc-400 leading-relaxed">
              Integrating these guidelines into your daily life can dramatically improve how you feel. Adequate water consumption boosts metabolic rate, cushions joints, filters waste products through the kidneys, and keeps your skin looking radiant. While individual needs can vary due to factors like medical conditions, pregnancy, or age, tracking your intake in both liters and standard glasses makes hitting your hydration goals highly achievable and straightforward.
            </p>
          </section>

          {/* FAQ Accordion Section */}
          <section className="space-y-4 border-t border-zinc-200 dark:border-zinc-800 pt-8">
            <h2 className="text-2xl font-bold text-zinc-950 dark:text-white">
              Frequently Asked Questions (FAQ)
            </h2>
            <div className="space-y-3">
              <details className="group border border-zinc-200 dark:border-zinc-800 rounded-lg p-4 bg-white dark:bg-zinc-900 transition-all duration-150 [&_summary::-webkit-details-marker]:hidden">
                <summary className="flex justify-between items-center font-semibold text-zinc-800 dark:text-zinc-200 cursor-pointer focus:outline-none">
                  <span>How many glasses of water should I drink a day?</span>
                  <span className="transition group-open:rotate-180 text-zinc-400 dark:text-zinc-500">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" className="w-5 h-5">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
                    </svg>
                  </span>
                </summary>
                <p className="text-zinc-600 dark:text-zinc-400 mt-3 text-sm leading-relaxed">
                  {"While the traditional \"8 glasses a day\" is a simple rule of thumb, our calculator provides a personalized target based on your weight and activity. For an average adult, this is typically between 9 and 13 glasses (2.2 to 3.2 liters) per day."}
                </p>
              </details>

              <details className="group border border-zinc-200 dark:border-zinc-800 rounded-lg p-4 bg-white dark:bg-zinc-900 transition-all duration-150 [&_summary::-webkit-details-marker]:hidden">
                <summary className="flex justify-between items-center font-semibold text-zinc-800 dark:text-zinc-200 cursor-pointer focus:outline-none">
                  <span>What are the signs of mild dehydration?</span>
                  <span className="transition group-open:rotate-180 text-zinc-400 dark:text-zinc-500">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" className="w-5 h-5">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
                    </svg>
                  </span>
                </summary>
                <p className="text-zinc-600 dark:text-zinc-400 mt-3 text-sm leading-relaxed">
                  Early symptoms of dehydration include dry mouth, dark yellow or amber-colored urine, fatigue, headaches, dizziness, and muscle cramps. If you feel thirsty, your body is already mildly dehydrated.
                </p>
              </details>

              <details className="group border border-zinc-200 dark:border-zinc-800 rounded-lg p-4 bg-white dark:bg-zinc-900 transition-all duration-150 [&_summary::-webkit-details-marker]:hidden">
                <summary className="flex justify-between items-center font-semibold text-zinc-800 dark:text-zinc-200 cursor-pointer focus:outline-none">
                  <span>Can I drink too much water?</span>
                  <span className="transition group-open:rotate-180 text-zinc-400 dark:text-zinc-500">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" className="w-5 h-5">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
                    </svg>
                  </span>
                </summary>
                <p className="text-zinc-600 dark:text-zinc-400 mt-3 text-sm leading-relaxed">
                  Yes, drinking excessive amounts of water can lead to hyponatremia, a rare but serious condition where blood sodium levels become dangerously low. This usually only occurs during extreme endurance events when vast quantities of plain water are consumed without replacing lost electrolytes.
                </p>
              </details>
            </div>
          </section>
        </article>

        {/* Related Tools Area */}
        <section className="max-w-3xl mx-auto border-t border-zinc-200 dark:border-zinc-800 mt-12 pt-8">
          <h3 className="text-xl font-bold text-zinc-900 dark:text-white mb-6">
            Related Health & Lifestyle Tools
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 p-5 rounded-xl hover:shadow-md transition duration-200">
              <span className="text-2xl mb-2 block">😴</span>
              <h4 className="font-bold text-zinc-900 dark:text-white text-base">Sleep Calculator</h4>
              <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-2">
                Calculate your optimal sleep cycles and wake up feeling refreshed.
              </p>
              <Link href="/tools/sleep-cycle-calculator" className="inline-block text-xs font-semibold text-blue-500 dark:text-blue-400 mt-4 hover:underline">
                Use Tool &rarr;
              </Link>
            </div>

            <div className="border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 p-5 rounded-xl hover:shadow-md transition duration-200">
              <span className="text-2xl mb-2 block">📅</span>
              <h4 className="font-bold text-zinc-900 dark:text-white text-base">Due Date Calculator</h4>
              <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-2">
                Calculate your estimated due date and pregnancy timeline milestones.
              </p>
              <span className="inline-block text-xs font-semibold text-blue-500 dark:text-blue-400 mt-4 hover:underline">
                Coming soon &rarr;
              </span>
            </div>

            <div className="border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 p-5 rounded-xl hover:shadow-md transition duration-200">
              <span className="text-2xl mb-2 block">⚖️</span>
              <h4 className="font-bold text-zinc-900 dark:text-white text-base">BMI Calculator</h4>
              <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-2">
                Calculate your Body Mass Index (BMI) to understand your weight status.
              </p>
              <span className="inline-block text-xs font-semibold text-blue-500 dark:text-blue-400 mt-4 hover:underline">
                Coming soon &rarr;
              </span>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <Footer customText="Elegant, science-backed hydration solutions." />
    </div>
  );
}
