import { Suspense } from "react";
import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Breadcrumbs from "@/components/Breadcrumbs";
import ShareButtons from "@/components/ShareButtons";
import EmbedWidget from "@/components/EmbedWidget";
import MethodologyAccordion from "@/components/MethodologyAccordion";
import RelatedTools from "@/components/RelatedTools";
import IntermittentFastingWidget from "./IntermittentFastingWidget";
import { generateSoftwareAppSchema } from "@/lib/schema";
import { Timer } from "lucide-react";

export const metadata: Metadata = {
  title: "Free Intermittent Fasting Calculator - Live Fasting & Eating Timer",
  description: "Calculate your intermittent fasting windows (16:8, 18:6, 20:4, OMAD). Track your active fasting and eating phases with a real-time ticking countdown timer.",
  alternates: {
    canonical: "/tools/intermittent-fasting-calculator",
  },
  openGraph: {
    title: "Free Intermittent Fasting Calculator - Live Fasting & Eating Timer",
    description: "Calculate your intermittent fasting windows (16:8, 18:6, 20:4, OMAD). Track your active fasting and eating phases with a real-time ticking countdown timer.",
    url: "https://quickcalc.cloud/tools/intermittent-fasting-calculator",
    type: "website",
    siteName: "QuickCalc",
    images: [
      {
        url: "https://quickcalc.cloud/og-image.png",
        width: 1200,
        height: 630,
        alt: "Intermittent Fasting Calculator on QuickCalc",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Free Intermittent Fasting Calculator - Live Fasting & Eating Timer",
    description: "Calculate your intermittent fasting windows (16:8, 18:6, 20:4, OMAD). Track your active fasting and eating phases with a real-time ticking countdown timer.",
  },
};

export default function IntermittentFastingPage({ searchParams }: { searchParams?: { embed?: string } }) {
  const softwareSchema = generateSoftwareAppSchema({
    name: "Free Intermittent Fasting Calculator - Live Fasting & Eating Timer",
    description: "Calculate your intermittent fasting windows (16:8, 18:6, 20:4, OMAD). Track your active fasting and eating phases with a real-time ticking countdown timer.",
    slug: "intermittent-fasting-calculator",
    category: "HealthApplication",
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
          <IntermittentFastingWidget />
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
        "name": "What is the 16:8 intermittent fasting schedule?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "The 16:8 protocol involves fasting for 16 consecutive hours overnight and during the morning, followed by an 8-hour eating window during the day (for example, eating between 12:00 PM and 8:00 PM)."
        }
      },
      {
        "@type": "Question",
        "name": "What can I consume during fasting hours?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "During fasting hours, you can consume zero-calorie beverages such as plain water, sparkling water, black coffee (without cream or sugar), and unflavored herbal or green tea."
        }
      },
      {
        "@type": "Question",
        "name": "How does the live countdown timer work?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Our live countdown timer updates every second based on your current device clock, calculating the exact hours, minutes, and seconds remaining until your next fasting or eating phase transition."
        }
      },
      {
        "@type": "Question",
        "name": "What is OMAD (23:1 fasting)?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "OMAD stands for One Meal A Day. It consists of a 23-hour fasting period followed by a single 1-hour eating window where all daily caloric and nutrient intake is consumed."
        }
      }
    ]
  };

  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-zinc-950 text-zinc-900 dark:text-zinc-100 font-[family-name:var(--font-geist-sans)] transition-colors">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqData) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(softwareSchema) }}
      />

      {/* Header Navigation */}
      <Navbar />

      {/* Main Container */}
      <main className="max-w-4xl mx-auto px-4 py-8 sm:py-12">
        <Breadcrumbs toolName="Intermittent Fasting Calculator" toolSlug="intermittent-fasting-calculator" />
        
        {/* Title Header with Icon Badge */}
        <div className="text-center max-w-2xl mx-auto mb-8 space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-teal-50 dark:bg-teal-950/50 border border-teal-200 dark:border-teal-800 text-teal-700 dark:text-teal-300 text-xs font-bold tracking-wide">
            <Timer size={15} className="text-teal-600 dark:text-teal-400" />
            <span>Circadian & Fasting Scheduler</span>
          </div>

          <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-zinc-900 dark:text-white">
            Intermittent Fasting Calculator
          </h1>
          <p className="text-base sm:text-lg text-zinc-600 dark:text-zinc-400 leading-relaxed">
            Calculate your exact daily fasting and eating windows across popular protocols (16:8, 18:6, 20:4, OMAD, or custom schedules). Features a live real-time countdown timer tracking your active phase.
          </p>
        </div>

        <ShareButtons url="https://quickcalc.cloud/tools/intermittent-fasting-calculator" title="Intermittent Fasting Calculator" />
        <EmbedWidget url="https://quickcalc.cloud/tools/intermittent-fasting-calculator" title="Intermittent Fasting Calculator" />

        {/* Interactive Widget Section */}
        <section className="my-8">
          <Suspense fallback={<div className="p-8 text-center text-zinc-500 animate-pulse">Loading intermittent fasting timer...</div>}>
            <IntermittentFastingWidget />
          </Suspense>
        </section>

        {/* Scientific Methodology Accordion */}
        <MethodologyAccordion slug="intermittent-fasting-calculator" />

        {/* Ad Slot 1 */}
        <div className="ad-slot ad-slot--inline my-8" data-ad-position="in-content-1">
          <div className="ad-placeholder-label border border-dashed border-zinc-300 dark:border-zinc-800 rounded-xl py-4 flex items-center justify-center bg-zinc-50/50 dark:bg-zinc-950/20 text-[10px] font-bold text-zinc-400 dark:text-zinc-600 uppercase tracking-widest cursor-default">
            Advertisement
          </div>
        </div>

        {/* Detailed Informational Guide */}
        <article className="prose prose-zinc dark:prose-invert max-w-3xl mx-auto space-y-8 mt-12 border-t border-zinc-200 dark:border-zinc-800 pt-10">
          <section className="space-y-4">
            <h2 className="text-2xl font-bold text-zinc-950 dark:text-white">
              Understanding Intermittent Fasting Protocols
            </h2>
            <p className="text-zinc-600 dark:text-zinc-400 leading-relaxed">
              Intermittent fasting (IF) is an eating pattern that cycles between periods of fasting and eating. Rather than restricting specific foods, intermittent fasting focuses on <strong>when</strong> you eat. Popular schedules include:
            </p>
            <ul className="list-disc pl-6 text-zinc-600 dark:text-zinc-400 space-y-2">
              <li>
                <strong>16:8 Protocol:</strong> Fast for 16 hours overnight/morning and eat during an 8-hour window (e.g. 12 PM to 8 PM).
              </li>
              <li>
                <strong>18:6 Protocol:</strong> Fast for 18 hours and eat within a 6-hour window (e.g. 1 PM to 7 PM).
              </li>
              <li>
                <strong>20:4 (Warrior Diet):</strong> Fast for 20 hours with a condensed 4-hour eating window.
              </li>
              <li>
                <strong>OMAD (23:1):</strong> One Meal A Day protocol featuring a 23-hour fast and a 1-hour eating window.
              </li>
            </ul>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-bold text-zinc-950 dark:text-white">
              Hydration and Fasting Rules
            </h2>
            <p className="text-zinc-600 dark:text-zinc-400 leading-relaxed">
              To remain in a fasted state, it is essential to avoid calories during your fasting window. Non-caloric beverages such as water, plain sparkling water, black coffee, and unflavored tea are permitted and encouraged to maintain proper hydration and electrolyte balance.
            </p>
          </section>

          {/* FAQ Section */}
          <section className="space-y-4 border-t border-zinc-200 dark:border-zinc-800 pt-8">
            <h2 className="text-2xl font-bold text-zinc-950 dark:text-white border-b border-zinc-100 dark:border-zinc-900 pb-2">
              Frequently Asked Questions (FAQ)
            </h2>
            <div className="space-y-6">
              <div className="space-y-2">
                <h3 className="text-base font-bold text-zinc-900 dark:text-zinc-100">
                  What is the 16:8 intermittent fasting schedule?
                </h3>
                <p className="text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed">
                  The 16:8 protocol involves fasting for 16 consecutive hours overnight and during the morning, followed by an 8-hour eating window during the day (for example, eating between 12:00 PM and 8:00 PM).
                </p>
              </div>

              <div className="space-y-2">
                <h3 className="text-base font-bold text-zinc-900 dark:text-zinc-100">
                  What can I consume during fasting hours?
                </h3>
                <p className="text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed">
                  During fasting hours, you can consume zero-calorie beverages such as plain water, sparkling water, black coffee (without cream or sugar), and unflavored herbal or green tea.
                </p>
              </div>

              <div className="space-y-2">
                <h3 className="text-base font-bold text-zinc-900 dark:text-zinc-100">
                  How does the live countdown timer work?
                </h3>
                <p className="text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed">
                  Our live countdown timer updates every second based on your current device clock, calculating the exact hours, minutes, and seconds remaining until your next fasting or eating phase transition.
                </p>
              </div>

              <div className="space-y-2">
                <h3 className="text-base font-bold text-zinc-900 dark:text-zinc-100">
                  What is OMAD (23:1 fasting)?
                </h3>
                <p className="text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed">
                  OMAD stands for One Meal A Day. It consists of a 23-hour fasting period followed by a single 1-hour eating window where all daily caloric and nutrient intake is consumed.
                </p>
              </div>
            </div>
          </section>
        </article>

        {/* Related Tools */}
        <RelatedTools currentSlug="intermittent-fasting-calculator" />

        {/* Ad Slot Footer */}
        <div className="ad-slot ad-slot--footer mt-12" data-ad-position="footer">
          <div className="ad-placeholder-label border border-dashed border-zinc-300 dark:border-zinc-800 rounded-xl py-4 flex items-center justify-center bg-zinc-50/50 dark:bg-zinc-950/20 text-[10px] font-bold text-zinc-400 dark:text-zinc-600 uppercase tracking-widest cursor-default">
            Advertisement
          </div>
        </div>
      </main>

      {/* Footer */}
      <Footer customText="Elegant, live fasting and circadian scheduling calculators." />
    </div>
  );
}
