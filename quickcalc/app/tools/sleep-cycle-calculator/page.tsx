import Navbar from "@/components/Navbar";
import { generateSoftwareAppSchema } from "@/lib/schema";
import RelatedTools from "@/components/RelatedTools";
import ShareButtons from "@/components/ShareButtons";
import EmbedWidget from "@/components/EmbedWidget";

import Breadcrumbs from "@/components/Breadcrumbs";
import type { Metadata } from "next";
import SleepCycleCalculatorWidget from "./SleepCycleCalculatorWidget";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "Sleep Cycle Calculator - Bedtime & Waking Schedule Tool",
  description: "Calculate optimal bedtimes or wake-up times based on natural 90-minute REM sleep cycles. Wake up feeling refreshed and prevent morning fatigue instantly.",
  alternates: {
    canonical: "/tools/sleep-cycle-calculator",
  },
  openGraph: {
    title: "Sleep Cycle Calculator - Bedtime & Waking Schedule Tool",
    description: "Calculate optimal bedtimes or wake-up times based on natural 90-minute REM sleep cycles. Wake up feeling refreshed and prevent morning fatigue instantly.",
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
    title: "Sleep Cycle Calculator - Bedtime & Waking Schedule Tool",
    description: "Calculate optimal bedtimes or wake-up times based on natural 90-minute REM sleep cycles. Wake up feeling refreshed and prevent morning fatigue instantly.",
    images: ["https://quickcalc.cloud/og-image.png"],
  },
};

export default function SleepCycleCalculatorPage({ searchParams }: { searchParams?: { embed?: string } }) {
  const softwareSchema = generateSoftwareAppSchema({
    name: "Sleep Cycle Calculator - Bedtime & Waking Schedule Tool",
    description: "Calculate optimal bedtimes or wake-up times based on natural 90-minute REM sleep cycles. Wake up feeling refreshed and prevent morning fatigue instant",
    slug: "sleep-cycle-calculator",
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
          <SleepCycleCalculatorWidget />
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
        "name": "How do I calculate my sleep cycles using the 90-minute rule?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "A 90 minute sleep cycle calculator operates on the biological fact that human sleep consists of repeating 90-minute waves of light, deep, and REM sleep. Waking up at the end of a full cycle prevents sleep inertia, helping you feel alert."
        }
      },
      {
        "@type": "Question",
        "name": "What time should I sleep to wake up at 7 AM feeling refreshed?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "To know what time should I go to bed to wake up at a desired time, count backward in 90-minute increments from your waking goal, then subtract an additional 15 minutes for sleep latency (the time it takes to fall asleep). For example, if you must wake up at 7:00 AM, you should aim to go to bed at either 9:45 PM or 11:15 PM."
        }
      },
      {
        "@type": "Question",
        "name": "How many sleep cycles do I need per night for optimal energy?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "To optimize your health, cognitive function, and daily productivity, how many sleep cycles do I need is generally answered as 5 to 6 full cycles per night, which equates to about 7.5 to 9 hours of total restorative sleep."
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
  }

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
      <Navbar />

      {/* Main Content */}
      <main className="max-w-4xl mx-auto px-4 py-8 sm:py-12">
        <Breadcrumbs toolName="Sleep Cycle Calculator" toolSlug="sleep-cycle-calculator" />
        <div className="text-center max-w-2xl mx-auto mb-8">
          <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-zinc-900 dark:text-white mb-4">
            Sleep Cycle Calculator
          </h1>
          <p className="text-base sm:text-lg text-zinc-600 dark:text-zinc-400 leading-relaxed">This free tool calculates optimal bedtime and wake-up schedules based on 90-minute ultradian REM sleep cycles. If you are trying to figure out what time should I go to bed to wake up at a specific hour feeling completely refreshed, our free 90 minute sleep cycle calculator is the perfect bedtime planner. By analyzing standard human circadian rhythms, this interactive tool helps you pinpoint either the ideal bedtimes or the perfect waking hours to avoid morning grogginess.</p>
        </div>

        <ShareButtons url="https://quickcalc.cloud/tools/sleep-cycle-calculator" title="Sleep Cycle Calculator" />
        <EmbedWidget url="https://quickcalc.cloud/tools/sleep-cycle-calculator" title="Sleep Cycle Calculator" />

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
              About Our Sleep Cycle and Waking Time Calculator
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
              How Sleep Cycles and the 90-Minute Rule are Calculated
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
                  How do I calculate my sleep cycles using the 90-minute rule?
                </h3>
                <p className="text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed">
                  A 90 minute sleep cycle calculator operates on the biological fact that human sleep consists of repeating 90-minute waves of light, deep, and REM sleep. Waking up at the end of a full cycle prevents sleep inertia, helping you feel alert.
                </p>
              </div>

              <div className="space-y-2">
                <h3 className="text-base font-bold text-zinc-900 dark:text-zinc-100">
                  What time should I sleep to wake up at 7 AM feeling refreshed?
                </h3>
                <p className="text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed">
                  To know what time should I go to bed to wake up at a desired time, count backward in 90-minute increments from your waking goal, then subtract an additional 15 minutes for sleep latency (the time it takes to fall asleep). For example, if you must wake up at 7:00 AM, you should aim to go to bed at either 9:45 PM or 11:15 PM.
                </p>
              </div>

              <div className="space-y-2">
                <h3 className="text-base font-bold text-zinc-900 dark:text-zinc-100">
                  How many sleep cycles do I need per night for optimal energy?
                </h3>
                <p className="text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed">
                  To optimize your health, cognitive function, and daily productivity, how many sleep cycles do I need is generally answered as 5 to 6 full cycles per night, which equates to about 7.5 to 9 hours of total restorative sleep.
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
