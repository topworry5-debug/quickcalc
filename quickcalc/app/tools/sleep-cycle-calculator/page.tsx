import ThemeToggle from "@/components/ThemeToggle";

import Breadcrumbs from "@/components/Breadcrumbs";

import type { Metadata } from "next";
import Link from "next/link";
import SleepCycleCalculatorWidget from "./SleepCycleCalculatorWidget";
import Footer from "@/components/Footer";
import AdSlot from "@/components/AdSlot";

export const metadata: Metadata = {
  title: "Sleep Cycle Calculator - Wake Up Refreshed & Active",
  description: "Calculate your optimal sleep cycles, bedtimes, or wake up times. Sleep better, prevent grogginess, and align with natural 90-minute sleep cycles.",
  alternates: {
    canonical: "/tools/sleep-cycle-calculator",
  },
};

export default function SleepCycleCalculatorPage() {
  const faqData = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      {
        "@type": "Question",
        "name": "What is a sleep cycle?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "A sleep cycle is a progression of different sleep stages, transitioning from light sleep to deep sleep, and finally to REM (Rapid Eye Movement) sleep. For most healthy adults, a single sleep cycle lasts approximately 90 minutes and repeats several times throughout the night."
        }
      },
      {
        "@type": "Question",
        "name": "Why do I wake up tired after 8 hours of sleep?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Waking up tired—even after a full 8 hours—often occurs when your alarm goes off in the middle of a deep sleep stage. By aligning your alarm with the end of a 90-minute sleep cycle using our calculator, you can wake up naturally from light sleep feeling completely refreshed."
        }
      },
      {
        "@type": "Question",
        "name": "How long does it take the average person to fall asleep?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "On average, it takes a healthy adult between 10 to 20 minutes to transition from full wakefulness to light sleep. This calculator factors in a standard 15-minute buffer (sleep latency) to ensure maximum bedtime precision."
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
          <Link href="/" className="flex items-center gap-2 font-bold text-lg text-indigo-600 dark:text-indigo-400">
            <span>🌙 QuickCalc</span>
          </Link>
          <nav className="flex gap-4">
            <Link href="/" className="text-sm font-medium text-zinc-600 dark:text-zinc-400 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">
              Home
            </Link>
            <Link href="/blog" className="text-sm font-medium text-zinc-600 dark:text-zinc-400 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">
              Blog
            </Link>
            <span className="text-sm font-medium text-zinc-300 dark:text-zinc-700 font-normal">|</span>
            <span className="text-sm font-medium text-zinc-300 dark:text-zinc-700">|</span>
            <span className="text-sm font-medium text-zinc-400 dark:text-zinc-600">Sleep Calculator</span>
            <span className="text-sm font-medium text-zinc-300 dark:text-zinc-700 font-normal">|</span>
            <ThemeToggle />
          </nav>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="max-w-4xl mx-auto px-4 py-8 sm:py-12">
        <Breadcrumbs toolName="Sleep Cycle Calculator" toolSlug="sleep-cycle-calculator" />
        <div className="text-center max-w-2xl mx-auto mb-8">
          <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-zinc-900 dark:text-white mb-4">
            Sleep Cycle Calculator
          </h1>
          <p className="text-base sm:text-lg text-zinc-600 dark:text-zinc-400 leading-relaxed">
            The Sleep Cycle Calculator is a science-based tool designed to help you optimize your sleep schedule for maximum daily productivity and alertness. By analyzing standard human sleep cycles, which typically last 90 minutes each, this interactive tool helps you pinpoint either the ideal bedtimes to wake up feeling fully refreshed, or the perfect waking hours if you choose to sleep immediately. Say goodbye to mid-day fatigue and morning grogginess by aligning your sleep with natural biological rhythms.
          </p>
        </div>

        {/* Interactive Calculator Widget Component */}
        <section className="my-8">
          <SleepCycleCalculatorWidget />
        </section>

        {/* AdSense Placement Ad-Slot-Inline */}
        <AdSlot slot="sleep-cycle-inline" />

        {/* Detailed Article Sections */}
        <article className="prose prose-zinc dark:prose-invert max-w-3xl mx-auto space-y-8 mt-12 border-t border-zinc-200 dark:border-zinc-800 pt-10">
          <section className="space-y-4">
            <h2 className="text-2xl font-bold text-zinc-950 dark:text-white">
              About this calculator
            </h2>
            <p className="text-zinc-600 dark:text-zinc-400 leading-relaxed">
              Have you ever slept for eight or nine hours, only to wake up feeling completely exhausted? Conversely, have you ever slept for just four or five hours and felt surprisingly awake and energetic? This phenomenon is explained by the biology of sleep cycles. During the night, your brain moves through repeating cycles of light sleep, deep sleep, and REM (dreaming) sleep. 
            </p>
            <p className="text-zinc-600 dark:text-zinc-400 leading-relaxed">
              For most individuals, a single full cycle takes about 90 minutes. If you wake up in the middle of deep sleep, your body experiences a condition known as sleep inertia, leaving you feeling groggy, disoriented, and fatigued. However, if your alarm rings at the end of a cycle—when you are in light sleep—you will wake up naturally and feel energetic, even if you did not get a massive amount of sleep.
            </p>
            <p className="text-zinc-600 dark:text-zinc-400 leading-relaxed">
              Our Sleep Cycle Calculator computes your sleep schedule based on these exact 90-minute intervals. It also factors in a standard 15-minute buffer representing the average amount of time a healthy person needs to fall asleep once they close their eyes (known as sleep latency). For optimal cognitive performance, memory retention, and physical repair, most health experts recommend aiming for 5 or 6 complete sleep cycles per night, which equates to 7.5 or 9 hours of restorative rest.
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
                  <span>What is a sleep cycle?</span>
                  <span className="transition group-open:rotate-180 text-zinc-400 dark:text-zinc-500">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" className="w-5 h-5">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
                    </svg>
                  </span>
                </summary>
                <p className="text-zinc-600 dark:text-zinc-400 mt-3 text-sm leading-relaxed">
                  A sleep cycle is a progression of different sleep stages, transitioning from light sleep to deep sleep, and finally to REM (Rapid Eye Movement) sleep. For most healthy adults, a single sleep cycle lasts approximately 90 minutes and repeats several times throughout the night.
                </p>
              </details>

              <details className="group border border-zinc-200 dark:border-zinc-800 rounded-lg p-4 bg-white dark:bg-zinc-900 transition-all duration-150 [&_summary::-webkit-details-marker]:hidden">
                <summary className="flex justify-between items-center font-semibold text-zinc-800 dark:text-zinc-200 cursor-pointer focus:outline-none">
                  <span>Why do I wake up tired after 8 hours of sleep?</span>
                  <span className="transition group-open:rotate-180 text-zinc-400 dark:text-zinc-500">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" className="w-5 h-5">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
                    </svg>
                  </span>
                </summary>
                <p className="text-zinc-600 dark:text-zinc-400 mt-3 text-sm leading-relaxed">
                  {"Waking up tired—even after a full 8 hours—often occurs when your alarm goes off in the middle of a deep sleep stage. By aligning your alarm with the end of a 90-minute sleep cycle using our calculator, you can wake up naturally from light sleep feeling completely refreshed."}
                </p>
              </details>

              <details className="group border border-zinc-200 dark:border-zinc-800 rounded-lg p-4 bg-white dark:bg-zinc-900 transition-all duration-150 [&_summary::-webkit-details-marker]:hidden">
                <summary className="flex justify-between items-center font-semibold text-zinc-800 dark:text-zinc-200 cursor-pointer focus:outline-none">
                  <span>How long does it take the average person to fall asleep?</span>
                  <span className="transition group-open:rotate-180 text-zinc-400 dark:text-zinc-500">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" className="w-5 h-5">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
                    </svg>
                  </span>
                </summary>
                <p className="text-zinc-600 dark:text-zinc-400 mt-3 text-sm leading-relaxed">
                  On average, it takes a healthy adult between 10 to 20 minutes to transition from full wakefulness to light sleep. This calculator factors in a standard 15-minute buffer (sleep latency) to ensure maximum bedtime precision.
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
              <span className="text-2xl mb-2 block">💧</span>
              <h4 className="font-bold text-zinc-900 dark:text-white text-base">Water Intake Calculator</h4>
              <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-2">
                Calculate your optimal hydration targets based on weight and activity.
              </p>
              <Link href="/tools/water-intake-calculator" className="inline-block text-xs font-semibold text-indigo-500 dark:text-indigo-400 mt-4 hover:underline">
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
                Coming soon
              </span>
            </div>

            <div className="border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 p-5 rounded-xl hover:shadow-md transition duration-200">
              <span className="text-2xl mb-2 block">⚖️</span>
              <h4 className="font-bold text-zinc-900 dark:text-white text-base">BMI Calculator</h4>
              <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-2">
                Calculate your Body Mass Index (BMI) to understand your weight status.
              </p>
              <span className="inline-block text-xs font-semibold text-zinc-400 dark:text-zinc-600 mt-4 cursor-default">
                Coming soon
              </span>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <Footer customText="Elegant, science-backed hydration and sleep cycles." />
    </div>
  );
}
