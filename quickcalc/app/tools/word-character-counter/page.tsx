import MethodologyAccordion from "@/components/MethodologyAccordion";
import Navbar from "@/components/Navbar";
import { generateSoftwareAppSchema } from "@/lib/schema";
import RelatedTools from "@/components/RelatedTools";
import ShareButtons from "@/components/ShareButtons";
import EmbedWidget from "@/components/EmbedWidget";
import Breadcrumbs from "@/components/Breadcrumbs";
import Link from "next/link";
import type { Metadata } from "next";
import WordCharacterCounterWidget from "./WordCharacterCounterWidget";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "Word & Character Counter - Live Reading Time & Text Metrics",
  description:
    "Count words, characters, and paragraphs in real-time. Check writing targets and popular social media length limits instantly. 100% free online.",
  alternates: {
    canonical: "/tools/word-character-counter",
  },
  openGraph: {
    title: "Word & Character Counter - Live Reading Time & Text Metrics",
    description:
      "Count words, characters, and paragraphs in real-time. Check writing targets and popular social media length limits instantly. 100% free online.",
    url: "https://quickcalc.cloud/tools/word-character-counter",
    type: "website",
    siteName: "QuickCalc",
    images: [
      {
        url: "https://quickcalc.cloud/og-image.png",
        width: 1200,
        height: 630,
        alt: "Free Word & Character Counter on QuickCalc",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Word & Character Counter - Live Reading Time & Text Metrics",
    description:
      "Count words, characters, and paragraphs in real-time. Check writing targets and popular social media length limits instantly. 100% free online.",
  },
};

export default function WordCharacterCounterPage({
  searchParams,
}: {
  searchParams?: { embed?: string };
}) {
  const softwareSchema = generateSoftwareAppSchema({
    name: "Word & Character Counter - Live Reading Time & Text Metrics",
    description:
      "Count words, characters, and paragraphs in real-time. Check writing targets and popular social media length limits instantly. 100% free online.",
    slug: "word-character-counter",
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
          <WordCharacterCounterWidget />
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
        name: "How do I check my essay word count and character count online?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "To find out how to count words in an essay, copy your text and paste it into our free input box above. The tool instantly parses the characters and updates your exact word count, sentence count, and paragraph density in real-time, completely free.",
        },
      },
      {
        "@type": "Question",
        name: "What is the exact character limit for a standard X (Twitter) post?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "The character limit for a tweet or X post is exactly 280 characters for standard users. Our live tracker displays platform-specific limit warnings dynamically so you can trim or write your social updates perfectly without exceeding requirements.",
        },
      },
      {
        "@type": "Question",
        name: "Can I use this word counter to draft college application essays?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Yes, our tool is a highly accurate word counter for college application essays. It tracks character counts and paragraph limits with zero lag, and computes the Automated Readability Index (ARI) to help you verify that your writing is styled at the appropriate comprehension level.",
        },
      },
      {
        "@type": "Question",
        name: "Does this word counter support non-English languages and special characters?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Yes! Our word and character counter splits words based on universal whitespace patterns, enabling accurate count capabilities for English, Spanish, French, German, and many other alphabet-based or split-whitespace languages.",
        },
      },
    ],
  };

  const softwareData = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: "Word & Character Counter",
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
        <Breadcrumbs toolName="Word & Character Counter" toolSlug="word-character-counter" />
        <div className="text-center max-w-2xl mx-auto mb-8">
          <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-zinc-900 dark:text-white mb-4">
            Word &amp; Character Counter
          </h1>
          <p className="text-base sm:text-lg text-zinc-600 dark:text-zinc-400 leading-relaxed">
            This free tool calculates word count, character count, sentence count, reading time, and social media character limits. Wondering how to count words in an essay or need to check the standard character limit for a tweet or X post? Our free interactive Word &amp; Character Counter provides real-time tracking, serves as an excellent word counter for college application essays, and outputs deep readability analysis as you type.
          </p>
        </div>

        <ShareButtons url="https://quickcalc.cloud/tools/word-character-counter" title="Word & Character Counter" />
        <EmbedWidget url="https://quickcalc.cloud/tools/word-character-counter" title="Word & Character Counter" />

        {/* Interactive Widget */}
        <section className="my-8">
          <WordCharacterCounterWidget />
        </section>

        {/* Collapsible Scientific & Mathematical Methodology */}
        <MethodologyAccordion slug="word-character-counter" />

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
              About Our Word, Character, and Essay Counter
            </h2>
            <p className="text-zinc-600 dark:text-zinc-400 leading-relaxed">
              Whether you are writing an academic essay, drafting an advertising copy block, optimizing SEO meta titles and descriptions, or keeping your X (Twitter) social posts within standard character boundaries, keeping track of text sizes is crucial. Our live Word &amp; Character Counter parses your text instantaneously on keyup events, updating six distinct dimensions of content metrics synchronously.
            </p>
            <p className="text-zinc-600 dark:text-zinc-400 leading-relaxed">
              If you are preparing a speech, lecture, or presentation script and need to convert word counts into spoken presentation duration or calculate target script lengths by speaking speed, try our free{" "}
              <Link href="/tools/speech-time-calculator" className="text-emerald-600 dark:text-emerald-400 font-semibold underline hover:text-emerald-700">
                Speech Time Calculator
              </Link>.
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
                  How do I check my essay word count and character count online?
                </h3>
                <p className="text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed">
                  To find out how to count words in an essay, copy your text and paste it into our free input box above. The tool instantly parses the characters and updates your exact word count, sentence count, and paragraph density in real-time.
                </p>
              </div>

              <div className="space-y-2">
                <h3 className="text-base font-bold text-zinc-900 dark:text-zinc-100">
                  What is the exact character limit for a standard X (Twitter) post?
                </h3>
                <p className="text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed">
                  The character limit for a tweet or X post is exactly 280 characters for standard users. Our live tracker displays platform-specific limit warnings dynamically so you can trim or write your social updates perfectly without exceeding requirements.
                </p>
              </div>

              <div className="space-y-2">
                <h3 className="text-base font-bold text-zinc-900 dark:text-zinc-100">
                  Can I use this word counter to draft college application essays?
                </h3>
                <p className="text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed">
                  Yes, our tool is a highly accurate word counter for college application essays. It tracks character counts and paragraph limits with zero lag, and computes the Automated Readability Index (ARI) to help you verify that your writing is styled at the appropriate comprehension level.
                </p>
              </div>

              <div className="space-y-2">
                <h3 className="text-base font-bold text-zinc-900 dark:text-zinc-100">
                  Does this word counter support non-English languages and special characters?
                </h3>
                <p className="text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed">
                  Yes! Our word and character counter splits words based on universal whitespace patterns, enabling accurate count capabilities for English, Spanish, French, German, and many other alphabet-based or split-whitespace languages.
                </p>
              </div>
            </div>
          </section>
        </article>

        <RelatedTools currentSlug="word-character-counter" />

        {/* Ad Placement Footer */}
        <div className="ad-slot ad-slot--footer mt-12" data-ad-position="footer">
          <div className="ad-placeholder-label border border-dashed border-zinc-300 dark:border-zinc-800 rounded-xl py-4 flex items-center justify-center bg-zinc-50/50 dark:bg-zinc-950/20 text-[10px] font-bold text-zinc-400 dark:text-zinc-600 uppercase tracking-widest cursor-default">
            Advertisement
          </div>
        </div>
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
}
