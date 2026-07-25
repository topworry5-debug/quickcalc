import RelatedTools from "@/components/RelatedTools";
import ShareButtons from "@/components/ShareButtons";
import ThemeToggle from "@/components/ThemeToggle";
import Breadcrumbs from "@/components/Breadcrumbs";
import type { Metadata } from "next";
import Link from "next/link";
import SleepCycleCalculatorWidget from "./SleepCycleCalculatorWidget";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "Sleep Cycle Calculator - Scientific REM & Deep Sleep Bedtime Planner | QuickCalc",
  description: "Calculate your optimal sleep cycles, bedtimes, or wake up times instantly. Prevent morning grogginess and align with biological 90-minute sleep cycles. 100% free.",
  alternates: {
    canonical: "/tools/sleep-cycle-calculator",
  },
  openGraph: {
    title: "Sleep Cycle Calculator - Scientific REM & Deep Sleep Bedtime Planner | QuickCalc",
    description: "Calculate your optimal sleep cycles, bedtimes, or wake up times instantly. Prevent morning grogginess and align with biological 90-minute sleep cycles. 100% free.",
    url: "https://quickcalc.cloud/tools/sleep-cycle-calculator",
    type: "website",
    siteName: "QuickCalc",
    images: [
      {
        url: "https://quickcalc.cloud/og-image.png",
        width: 1200,
        height: 630,
        alt: "Sleep Cycle Calculator on QuickCalc",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Sleep Cycle Calculator - Scientific REM & Deep Sleep Bedtime Planner | QuickCalc",
    description: "Calculate your optimal sleep cycles, bedtimes, or wake up times instantly. Prevent morning grogginess and align with biological 90-minute sleep cycles. 100% free.",
    images: ["https://quickcalc.cloud/og-image.png"],
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
      },
      {
        "@type": "Question",
        "name": "How many sleep cycles do I need per night?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Most health experts recommend completing 5 to 6 sleep cycles per night, which translates to roughly 7.5 to 9 hours of restorative sleep, to optimize cognitive performance and overall physical health."
        }
      }
    ]
  };

  const softwareData = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    "name": "Sleep Cycle Calculator",
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
          <Link href="/" className="flex items-center gap-2 font-bold text-lg text-indigo-600 dark:text-indigo-400">
            <span>🌙 QuickCalc</span>
          </Link>
          <nav className="flex items-center gap-2 sm:gap-4">
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

      {/* Main Content */}
      <main className="max-w-4xl mx-auto px-4 py-8 sm:py-12">
        <Breadcrumbs toolName="Sleep Cycle Calculator" toolSlug="sleep-cycle-calculator" />
        <div className="text-center max-w-2xl mx-auto mb-8">
          <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-zinc-900 dark:text-white mb-4">
            Sleep Cycle Calculator
          </h1>
          <p className="text-base sm:text-lg text-zinc-600 dark:text-zinc-400 leading-relaxed">
            The Sleep Cycle Calculator is a science-based tool designed to help you optimize your sleep schedule for maximum daily productivity and alertness. By analyzing standard human sleep cycles, which typically last 90 minutes each, this interactive tool helps you pinpoint either the ideal bedtimes to wake up feeling fully refreshed, or the perfect waking hours if you choose to sleep immediately.
          </p>
        </div>

        <ShareButtons url="https://quickcalc.cloud/tools/sleep-cycle-calculator" title="Sleep Cycle Calculator" />

        {/* The interactive widget */}
        <section className="my-8">
          <SleepCycleCalculatorWidget />
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
              About this Sleep Cycle Calculator
            </h2>
            <p className="text-zinc-600 dark:text-zinc-400 leading-relaxed">
              Have you ever slept for eight or nine hours, only to wake up feeling completely exhausted? Conversely, have you ever slept for just four or five hours and felt surprisingly awake and energetic? This phenomenon is explained by the biology of sleep cycles. During the night, your brain moves through repeating cycles of light sleep, deep sleep, and REM (dreaming) sleep.
            </p>
            <p className="text-zinc-600 dark:text-zinc-400 leading-relaxed">
              Unlike other generic web-based converters that gate accurate analysis, QuickCalc offers this tool <strong>100% free with absolutely zero sign-ins, zero email capture, and zero hidden paywalls</strong>. We believe critical physiological calculation parameters should be fully accessible to everyone instantly.
            </p>
            <p className="text-zinc-600 dark:text-zinc-400 leading-relaxed">
              For most individuals, a single full cycle takes about 90 minutes. If you wake up in the middle of deep sleep, your body experiences a condition known as sleep inertia, leaving you feeling groggy, disoriented, and fatigued. However, if your alarm rings at the end of a cycle—when you are in light sleep—you will wake up naturally and feel energetic.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-bold text-zinc-950 dark:text-white">
              How is this calculated?
            </h2>
            <p className="text-zinc-600 dark:text-zinc-400 leading-relaxed">
              To calculate the most effective wake-up times and bedtimes, our system models standard biological circadian rhythms:
            </p>
            <ul className="list-disc pl-6 text-zinc-600 dark:text-zinc-400 space-y-2">
              <li>
                <strong>Sleep Cycle Duration:</strong> Each complete cycle is calculated as exactly 90 minutes.
              </li>
              <li>
                <strong>Sleep Latency Buffer:</strong> The calculator automatically adds 15 minutes to the calculation, representing the average time a healthy person takes to fall asleep.
              </li>
              <li>
                <strong>Optimized Bedtimes (If waking at X):</strong> Bedtime = Wake Time - (N * 90 minutes) - 15 minutes (where N ranges from 3 to 6 cycles).
              </li>
              <li>
                <strong>Optimized Wake Times (If sleeping at Y):</strong> Wake Time = Bedtime + (N * 90 minutes) + 15 minutes.
              </li>
            </ul>
            <p className="text-zinc-600 dark:text-zinc-400 leading-relaxed mt-2">
              Waking up at the completion of a cycle guarantees you are in a state of light sleep, mitigating the effects of sleep inertia.
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
                  What is a sleep cycle?
                </h3>
                <p className="text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed">
                  A sleep cycle is a progression of different sleep stages, transitioning from light sleep to deep sleep, and finally to REM (Rapid Eye Movement) sleep. For most healthy adults, a single sleep cycle lasts approximately 90 minutes and repeats several times throughout the night.
                </p>
              </div>

              <div className="space-y-2">
                <h3 className="text-base font-bold text-zinc-900 dark:text-zinc-100">
                  Why do I wake up tired after 8 hours of sleep?
                </h3>
                <p className="text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed">
                  Waking up tired—even after a full 8 hours—often occurs when your alarm goes off in the middle of a deep sleep stage. By aligning your alarm with the end of a 90-minute sleep cycle using our calculator, you can wake up naturally from light sleep feeling completely refreshed.
                </p>
              </div>

              <div className="space-y-2">
                <h3 className="text-base font-bold text-zinc-900 dark:text-zinc-100">
                  How long does it take the average person to fall asleep?
                </h3>
                <p className="text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed">
                  On average, it takes a healthy adult between 10 to 20 minutes to transition from full wakefulness to light sleep. This calculator factors in a standard 15-minute buffer (sleep latency) to ensure maximum bedtime precision.
                </p>
              </div>

              <div className="space-y-2">
                <h3 className="text-base font-bold text-zinc-900 dark:text-zinc-100">
                  How many sleep cycles do I need per night?
                </h3>
                <p className="text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed">
                  Most health experts recommend completing 5 to 6 sleep cycles per night, which translates to roughly 7.5 to 9 hours of restorative sleep, to optimize cognitive performance and overall physical health.
                </p>
              </div>
            </div>
          </section>
        </article>

        <RelatedTools currentSlug="sleep-cycle-calculator" />

        {/* Ad Placement Footer */}
        <div className="ad-slot ad-slot--footer mt-12" data-ad-position="footer">
          <div className="ad-placeholder-label border border-dashed border-zinc-300 dark:border-zinc-800 rounded-xl py-4 flex items-center justify-center bg-zinc-50/50 dark:bg-zinc-950/20 text-[10px] font-bold text-zinc-400 dark:text-zinc-600 uppercase tracking-widest cursor-default">
            Advertisement
          </div>
        </div>
      </main>

      {/* Footer */}
      <Footer customText="Elegant, science-backed circadian and sleep cycle screeners." />
    </div>
  );
}
