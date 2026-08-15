import MethodologyAccordion from "@/components/MethodologyAccordion";
import { Suspense } from "react";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import { generateSoftwareAppSchema } from "@/lib/schema";
import RelatedTools from "@/components/RelatedTools";
import ShareButtons from "@/components/ShareButtons";
import EmbedWidget from "@/components/EmbedWidget";
import Breadcrumbs from "@/components/Breadcrumbs";
import type { Metadata } from "next";
import SpeechTimeWidget from "./SpeechTimeWidget";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "Free Words-to-Minutes / Speech Time Calculator",
  description:
    "Convert script word counts into estimated speech duration in minutes and seconds, or calculate target word counts for time-capped presentations. 100% free with zero sign-ups.",
  alternates: {
    canonical: "/tools/speech-time-calculator",
  },
  openGraph: {
    title: "Free Words-to-Minutes / Speech Time Calculator",
    description:
      "Convert script word counts into estimated speech duration in minutes and seconds, or calculate target word counts for time-capped presentations. 100% free with zero sign-ups.",
    url: "https://quickcalc.cloud/tools/speech-time-calculator",
    type: "website",
    siteName: "QuickCalc",
    images: [
      {
        url: "https://quickcalc.cloud/og-image.png",
        width: 1200,
        height: 630,
        alt: "Words to Minutes Speech Time Calculator on QuickCalc",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Free Words-to-Minutes / Speech Time Calculator",
    description:
      "Convert script word counts into estimated speech duration in minutes and seconds, or calculate target word counts for time-capped presentations. 100% free with zero sign-ups.",
  },
};

export default function SpeechTimePage({
  searchParams,
}: {
  searchParams?: { embed?: string };
}) {
  const softwareSchema = generateSoftwareAppSchema({
    name: "Free Words-to-Minutes / Speech Time Calculator",
    description:
      "Convert script word counts into estimated speech duration in minutes and seconds, or calculate target word counts for time-capped presentations. 100% free with zero sign-ups.",
    slug: "speech-time-calculator",
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
          <SpeechTimeWidget />
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
        name: "How many words per minute (WPM) is an average speech?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "An average speech or business presentation is spoken at approximately 130 to 150 words per minute (WPM). Formal keynotes or solemn addresses tend to be slower (~100 to 120 WPM), while conversational podcasts or energetic briefings range from 160 to 180 WPM.",
        },
      },
      {
        "@type": "Question",
        name: "How long is a 500-word speech?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "A 500-word speech takes approximately 3 minutes and 34 seconds at an average speaking pace of 140 WPM. At a slower keynote pace (110 WPM), it takes about 4 minutes and 32 seconds, while at a fast pace (170 WPM), it takes about 2 minutes and 56 seconds.",
        },
      },
      {
        "@type": "Question",
        name: "How many words should I write for a 5-minute presentation?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "For a 5-minute presentation, you should target approximately 650 to 750 words. At an average pace of 140 WPM, exactly 700 words will take 5 minutes. Writing ~650 words leaves comfortable time for pauses and slide transitions.",
        },
      },
      {
        "@type": "Question",
        name: "How does reading speed differ from speaking speed?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Silent reading speed is significantly faster than speaking speed. Most adults read silently at 200 to 250 words per minute, whereas spoken speeches average 130 to 150 words per minute because public speaking requires articulation, vocal inflection, and deliberate pauses.",
        },
      },
    ],
  };

  const softwareData = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: "Speech Time Calculator",
    operatingSystem: "All",
    applicationCategory: "BusinessApplication",
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "USD",
    },
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
      <Navbar />

      {/* Main Content */}
      <main className="max-w-4xl mx-auto px-4 py-8 sm:py-12">
        <Breadcrumbs toolName="Speech Time Calculator" toolSlug="speech-time-calculator" />

        <div className="text-center max-w-2xl mx-auto mb-8">
          <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-zinc-900 dark:text-white mb-4">
            Words-to-Minutes / Speech Time Calculator
          </h1>
          <p className="text-base sm:text-lg text-zinc-600 dark:text-zinc-400 leading-relaxed">
            Convert script word counts into estimated speech duration in minutes and seconds, or reverse the calculation to find target word counts for time-capped presentations. Compare slow, average, and fast speaking speeds side-by-side with zero sign-ups or paywalls.
          </p>
        </div>

        <ShareButtons
          url="https://quickcalc.cloud/tools/speech-time-calculator"
          title="Speech Time Calculator"
        />
        <EmbedWidget
          url="https://quickcalc.cloud/tools/speech-time-calculator"
          title="Speech Time Calculator"
        />

        {/* Interactive Widget */}
        <section className="my-8">
          <Suspense
            fallback={
              <div className="p-8 text-center text-zinc-500 animate-pulse">
                Loading speech time calculator...
              </div>
            }
          >
            <SpeechTimeWidget />
          </Suspense>
        </section>

        {/* Methodology Accordion */}
        <MethodologyAccordion slug="speech-time-calculator" />

        {/* Inline Ad Slot 1 */}
        <div className="ad-slot ad-slot--inline" data-ad-position="in-content-1">
          <div className="ad-placeholder-label border border-dashed border-zinc-300 dark:border-zinc-800 rounded-xl py-4 flex items-center justify-center bg-zinc-50/50 dark:bg-zinc-950/20 text-[10px] font-bold text-zinc-400 dark:text-zinc-600 uppercase tracking-widest cursor-default">
            Advertisement
          </div>
        </div>

        {/* Educational Article Section */}
        <article className="prose prose-zinc dark:prose-invert max-w-3xl mx-auto space-y-8 mt-12 border-t border-zinc-200 dark:border-zinc-800 pt-10">
          <section className="space-y-4">
            <h2 className="text-2xl font-bold text-zinc-950 dark:text-white">
              Understanding Speech Pacing & Words Per Minute (WPM)
            </h2>
            <p className="text-zinc-600 dark:text-zinc-400 leading-relaxed">
              When delivering a presentation, keynote speech, or voiceover recording, the total time required depends on your speaking pace—measured in <strong>words per minute (WPM)</strong>.
            </p>
            <p className="text-zinc-600 dark:text-zinc-400 leading-relaxed">
              While silent reading speed averages 200 to 250 WPM, speaking out loud requires deliberate pacing, clear articulation, and pause control. In public speaking research, standard delivery speeds are categorized into three main tiers:
            </p>
            <ul className="list-disc pl-6 text-zinc-600 dark:text-zinc-400 space-y-2">
              <li>
                <strong>Slow / Formal Keynote (~110 WPM):</strong> Ideal for ceremonial addresses, solemn speeches, or complex technical keynotes where audience comprehension requires deliberate pauses.
              </li>
              <li>
                <strong>Average Presentation (~140 WPM):</strong> The standard benchmark for business presentations, academic lectures, TED talks, and corporate briefings.
              </li>
              <li>
                <strong>Fast / Conversational (~170 WPM):</strong> Typical for energetic podcasts, radio broadcasts, casual dialogue, or rapid-fire slide summaries.
              </li>
            </ul>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-bold text-zinc-950 dark:text-white">
              How to Calculate Speech Duration
            </h2>
            <p className="text-zinc-600 dark:text-zinc-400 leading-relaxed">
              To calculate estimated speech duration manually, divide the total word count of your presentation script by your target speaking speed in WPM:
            </p>
            <div className="p-4 rounded-xl bg-zinc-100 dark:bg-zinc-900 font-mono text-xs text-zinc-800 dark:text-zinc-200 overflow-x-auto">
              Speech Duration (minutes) = Total Script Words ÷ Speaking Speed (WPM)
            </div>
            <p className="text-zinc-600 dark:text-zinc-400 leading-relaxed">
              If you are working with strict slide deck time limits or character limits, you can also use our free{" "}
              <Link
                href="/tools/word-character-counter"
                className="text-teal-600 dark:text-teal-400 font-semibold underline hover:text-teal-700"
              >
                Word &amp; Character Counter
              </Link>{" "}
              to analyze sentence counts, character limits, and keyword frequencies in real-time.
            </p>
          </section>

          {/* Inline Ad Slot 2 */}
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
                  How many words per minute (WPM) is an average speech?
                </h3>
                <p className="text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed">
                  An average speech or business presentation is spoken at approximately 130 to 150 words per minute (WPM). Formal keynotes or solemn addresses tend to be slower (~100 to 120 WPM), while conversational podcasts or energetic briefings range from 160 to 180 WPM.
                </p>
              </div>

              <div className="space-y-2">
                <h3 className="text-base font-bold text-zinc-900 dark:text-zinc-100">
                  How long is a 500-word speech?
                </h3>
                <p className="text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed">
                  A 500-word speech takes approximately 3 minutes and 34 seconds at an average speaking pace of 140 WPM. At a slower keynote pace (110 WPM), it takes about 4 minutes and 32 seconds, while at a fast pace (170 WPM), it takes about 2 minutes and 56 seconds.
                </p>
              </div>

              <div className="space-y-2">
                <h3 className="text-base font-bold text-zinc-900 dark:text-zinc-100">
                  How many words should I write for a 5-minute presentation?
                </h3>
                <p className="text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed">
                  For a 5-minute presentation, you should target approximately 650 to 750 words. At an average pace of 140 WPM, exactly 700 words will take 5 minutes. Writing ~650 words leaves comfortable time for pauses and slide transitions.
                </p>
              </div>

              <div className="space-y-2">
                <h3 className="text-base font-bold text-zinc-900 dark:text-zinc-100">
                  How does reading speed differ from speaking speed?
                </h3>
                <p className="text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed">
                  Silent reading speed is significantly faster than speaking speed. Most adults read silently at 200 to 250 words per minute, whereas spoken speeches average 130 to 150 words per minute because public speaking requires articulation, vocal inflection, and deliberate pauses.
                </p>
              </div>
            </div>
          </section>
        </article>

        <RelatedTools currentSlug="speech-time-calculator" />

        {/* Ad Placement Footer */}
        <div className="ad-slot ad-slot--footer mt-12" data-ad-position="footer">
          <div className="ad-placeholder-label border border-dashed border-zinc-300 dark:border-zinc-800 rounded-xl py-4 flex items-center justify-center bg-zinc-50/50 dark:bg-zinc-950/20 text-[10px] font-bold text-zinc-400 dark:text-zinc-600 uppercase tracking-widest cursor-default">
            Advertisement
          </div>
        </div>
      </main>

      {/* Footer */}
      <Footer customText="Precision speech time estimation and presentation script word count targets." />
    </div>
  );
}
