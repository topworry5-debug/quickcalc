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
import ReadabilityWidget from "./ReadabilityWidget";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "Free Readability Score Calculator - Flesch Ease & Grade Level",
  description:
    "Audit text readability live with Flesch Reading Ease, Flesch-Kincaid Grade Level, and Gunning Fog Index. Analyze words, sentences, and syllables 100% free.",
  alternates: {
    canonical: "/tools/readability-score-calculator",
  },
  openGraph: {
    title: "Free Readability Score Calculator - Flesch Ease & Grade Level",
    description:
      "Audit text readability live with Flesch Reading Ease, Flesch-Kincaid Grade Level, and Gunning Fog Index. Analyze words, sentences, and syllables 100% free.",
    url: "https://quickcalc.cloud/tools/readability-score-calculator",
    type: "website",
    siteName: "QuickCalc",
    images: [
      {
        url: "https://quickcalc.cloud/og-image.png",
        width: 1200,
        height: 630,
        alt: "Free Readability Score Calculator on QuickCalc",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Free Readability Score Calculator - Flesch Ease & Grade Level",
    description:
      "Audit text readability live with Flesch Reading Ease, Flesch-Kincaid Grade Level, and Gunning Fog Index. Analyze words, sentences, and syllables 100% free.",
  },
};

export default function ReadabilityScorePage({
  searchParams,
}: {
  searchParams?: { embed?: string };
}) {
  const softwareSchema = generateSoftwareAppSchema({
    name: "Free Readability Score Calculator",
    description:
      "Audit text readability live with Flesch Reading Ease, Flesch-Kincaid Grade Level, and Gunning Fog Index. Analyze words, sentences, and syllables 100% free.",
    slug: "readability-score-calculator",
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
          <ReadabilityWidget />
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
        name: "What is a good Flesch Reading Ease score for web content?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "For general web content, blog posts, and marketing copy, aim for a Flesch Reading Ease score of 60 to 70 (or higher). This corresponds to plain English easily understood by 13 to 15-year-old readers (8th to 9th grade).",
        },
      },
      {
        "@type": "Question",
        name: "What is the difference between Flesch Reading Ease and Flesch-Kincaid Grade Level?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Flesch Reading Ease outputs a 0 to 100 score where higher numbers indicate easier text. Flesch-Kincaid Grade Level translates readability into US school grade levels (e.g. 7.0 means 7th grade level). Both formulas use sentence length and syllable counts.",
        },
      },
      {
        "@type": "Question",
        name: "What is the Gunning Fog Index?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "The Gunning Fog Index measures the formal years of education a person needs to understand a text on the first reading. It penalizes long sentences and complex words (words with 3 or more syllables).",
        },
      },
      {
        "@type": "Question",
        name: "How can I improve my text readability score?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "To improve readability, shorten long sentences, break complex paragraphs into smaller bullet points, replace 3+ syllable jargon words with simpler synonyms, and use an active writing voice.",
        },
      },
    ],
  };

  const softwareData = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: "Readability Score Calculator",
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
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqData) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(softwareData) }}
      />

      <Navbar />

      <main className="max-w-4xl mx-auto px-4 py-8 sm:py-12">
        <Breadcrumbs toolName="Readability Score Calculator" toolSlug="readability-score-calculator" />

        <div className="text-center max-w-2xl mx-auto mb-8">
          <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-zinc-900 dark:text-white mb-4">
            Readability Score Calculator
          </h1>
          <p className="text-base sm:text-lg text-zinc-600 dark:text-zinc-400 leading-relaxed">
            Audit text readability live with our free <strong>flesch reading ease calculator</strong>, online <strong>readability score checker</strong>, and <strong>flesch kincaid calculator free</strong> tool. Analyze word counts, sentence lengths, and syllable density to optimize blog posts, articles, and copywriting for broad web audiences.
          </p>
        </div>

        <ShareButtons
          url="https://quickcalc.cloud/tools/readability-score-calculator"
          title="Readability Score Calculator"
        />
        <EmbedWidget
          url="https://quickcalc.cloud/tools/readability-score-calculator"
          title="Readability Score Calculator"
        />

        <section className="my-8">
          <Suspense
            fallback={
              <div className="p-8 text-center text-zinc-500 animate-pulse">
                Loading readability calculator...
              </div>
            }
          >
            <ReadabilityWidget />
          </Suspense>
        </section>

        <MethodologyAccordion slug="readability-score-calculator" />

        <div className="ad-slot ad-slot--inline" data-ad-position="in-content-1">
          <div className="ad-placeholder-label border border-dashed border-zinc-300 dark:border-zinc-800 rounded-xl py-4 flex items-center justify-center bg-zinc-50/50 dark:bg-zinc-950/20 text-[10px] font-bold text-zinc-400 dark:text-zinc-600 uppercase tracking-widest cursor-default">
            Advertisement
          </div>
        </div>

        <article className="prose prose-zinc dark:prose-invert max-w-3xl mx-auto space-y-8 mt-12 border-t border-zinc-200 dark:border-zinc-800 pt-10">
          <section className="space-y-4">
            <h2 className="text-2xl font-bold text-zinc-950 dark:text-white">
              Why Readability Matters for Web Content &amp; SEO
            </h2>
            <p className="text-zinc-600 dark:text-zinc-400 leading-relaxed">
              Readability measures how easily a reader can understand a written text. In digital publishing, SEO copywriting, and user experience design, clear and accessible writing keeps visitors engaged, lowers bounce rates, and improves reader comprehension.
            </p>
            <p className="text-zinc-600 dark:text-zinc-400 leading-relaxed">
              Most online adults prefer content written at a 7th to 9th grade reading level (Flesch Reading Ease 60–70). Writing at this level does not simplify your ideas; it removes artificial vocabulary barriers so your message resonates quickly.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-bold text-zinc-950 dark:text-white">
              Understanding the Standard Readability Formulas
            </h2>
            <p className="text-zinc-600 dark:text-zinc-400 leading-relaxed">
              Our calculator evaluates your text synchronously across three of the most widely recognized mathematical readability algorithms:
            </p>
            <ul className="list-disc pl-6 text-zinc-600 dark:text-zinc-400 space-y-2">
              <li>
                <strong>Flesch Reading Ease:</strong> Evaluates text on a 0 to 100 scale. Higher scores indicate easier text, while lower scores signal complex academic or technical prose.
              </li>
              <li>
                <strong>Flesch-Kincaid Grade Level:</strong> Translates readability directly into US school grade levels (e.g., a score of 8.0 indicates an 8th-grade reading comprehension level).
              </li>
              <li>
                <strong>Gunning Fog Index:</strong> Measures readability based on average sentence length and the percentage of complex words (words with 3 or more syllables).
              </li>
            </ul>
            <p className="text-zinc-600 dark:text-zinc-400 leading-relaxed mt-4">
              To check character limits, reading times, or keyword density alongside readability scores, try our free{" "}
              <Link
                href="/tools/word-character-counter"
                className="text-teal-600 dark:text-teal-400 font-semibold underline hover:text-teal-700"
              >
                Word &amp; Character Counter
              </Link>{" "}
              or scan job descriptions for keyword match rates using our{" "}
              <Link
                href="/tools/ats-resume-checker"
                className="text-emerald-600 dark:text-emerald-400 font-semibold underline hover:text-emerald-700"
              >
                ATS Resume Score Checker
              </Link>.
            </p>
          </section>

          <div className="ad-slot ad-slot--inline" data-ad-position="in-content-2">
            <div className="ad-placeholder-label border border-dashed border-zinc-300 dark:border-zinc-800 rounded-xl py-4 flex items-center justify-center bg-zinc-50/50 dark:bg-zinc-950/20 text-[10px] font-bold text-zinc-400 dark:text-zinc-600 uppercase tracking-widest cursor-default">
              Advertisement
            </div>
          </div>

          <section className="space-y-4 border-t border-zinc-200 dark:border-zinc-800 pt-8">
            <h2 className="text-2xl font-bold text-zinc-950 dark:text-white border-b border-zinc-100 dark:border-zinc-900 pb-2">
              Frequently Asked Questions (FAQ)
            </h2>
            <div className="space-y-6">
              <div className="space-y-2">
                <h3 className="text-base font-bold text-zinc-900 dark:text-zinc-100">
                  What is a good Flesch Reading Ease score for web content?
                </h3>
                <p className="text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed">
                  For general web content, blog posts, and marketing copy, aim for a Flesch Reading Ease score of 60 to 70 (or higher). This corresponds to plain English easily understood by 13 to 15-year-old readers (8th to 9th grade).
                </p>
              </div>

              <div className="space-y-2">
                <h3 className="text-base font-bold text-zinc-900 dark:text-zinc-100">
                  What is the difference between Flesch Reading Ease and Flesch-Kincaid Grade Level?
                </h3>
                <p className="text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed">
                  Flesch Reading Ease outputs a 0 to 100 score where higher numbers indicate easier text. Flesch-Kincaid Grade Level translates readability into US school grade levels (e.g. 7.0 means 7th grade level). Both formulas use sentence length and syllable counts.
                </p>
              </div>

              <div className="space-y-2">
                <h3 className="text-base font-bold text-zinc-900 dark:text-zinc-100">
                  What is the Gunning Fog Index?
                </h3>
                <p className="text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed">
                  The Gunning Fog Index measures the formal years of education a person needs to understand a text on the first reading. It penalizes long sentences and complex words (words with 3 or more syllables).
                </p>
              </div>

              <div className="space-y-2">
                <h3 className="text-base font-bold text-zinc-900 dark:text-zinc-100">
                  How can I improve my text readability score?
                </h3>
                <p className="text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed">
                  To improve readability, shorten long sentences, break complex paragraphs into smaller bullet points, replace 3+ syllable jargon words with simpler synonyms, and use an active writing voice.
                </p>
              </div>
            </div>
          </section>
        </article>

        <RelatedTools currentSlug="readability-score-calculator" />

        <div className="ad-slot ad-slot--footer mt-12" data-ad-position="footer">
          <div className="ad-placeholder-label border border-dashed border-zinc-300 dark:border-zinc-800 rounded-xl py-4 flex items-center justify-center bg-zinc-50/50 dark:bg-zinc-950/20 text-[10px] font-bold text-zinc-400 dark:text-zinc-600 uppercase tracking-widest cursor-default">
            Advertisement
          </div>
        </div>
      </main>

      <Footer customText="Precision live readability auditing with Flesch Reading Ease and Flesch-Kincaid grade levels." />
    </div>
  );
}
