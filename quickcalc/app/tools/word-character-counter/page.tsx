import RelatedTools from "@/components/RelatedTools";
import ShareButtons from "@/components/ShareButtons";
import ThemeToggle from "@/components/ThemeToggle";
import Breadcrumbs from "@/components/Breadcrumbs";
import type { Metadata } from "next";
import Link from "next/link";
import WordCharacterCounterWidget from "./WordCharacterCounterWidget";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "Free Word & Character Counter - Live Text Metric Analyzer | QuickCalc",
  description: "Count words, characters, sentences, and paragraphs instantly. Estimated reading times and live social media limit checks. 100% free with no sign-ups.",
  alternates: {
    canonical: "/tools/word-character-counter",
  },
  openGraph: {
    title: "Free Word & Character Counter - Live Text Metric Analyzer | QuickCalc",
    description: "Count words, characters, sentences, and paragraphs instantly. Estimated reading times and live social media limit checks. 100% free with no sign-ups.",
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
    title: "Free Word & Character Counter - Live Text Metric Analyzer | QuickCalc",
    description: "Count words, characters, sentences, and paragraphs instantly. Estimated reading times and live social media limit checks. 100% free with no sign-ups.",
    images: ["https://quickcalc.cloud/og-image.png"],
  },
};

export default function WordCharacterCounterPage() {
  const faqData = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      {
        "@type": "Question",
        "name": "How is reading time calculated from word count?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Reading time is calculated by taking the total word count of your text and dividing it by the average adult reading speed, which typically ranges between 200 and 238 words per minute. Our tool displays a friendly estimated range (e.g., 'about 2 to 3 minutes') based on this standard model."
        }
      },
      {
        "@type": "Question",
        "name": "What is the character limit for a tweet/X post?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "The standard character limit for a standard post on X (formerly Twitter) is 280 characters. Our tool includes a live platform limits panel that dynamically warns you with color-coded alerts as you approach or exceed this limit."
        }
      },
      {
        "@type": "Question",
        "name": "Does this count words in other languages?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Yes! Our word and character counter splits words based on universal whitespace patterns, enabling accurate count capabilities for English, Spanish, French, German, and many other alphabet-based or split-whitespace languages."
        }
      }
    ]
  };

  const softwareData = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    "name": "Word & Character Counter",
    "operatingSystem": "All",
    "applicationCategory": "BusinessApplication",
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
            <span>📝 QuickCalc</span>
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
            <span className="text-sm font-medium text-zinc-400 dark:text-zinc-600">Word Counter</span>
            <span className="text-sm font-medium text-zinc-300 dark:text-zinc-700 font-normal">|</span>
            <ThemeToggle />
          </nav>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-4xl mx-auto px-4 py-8 sm:py-12">
        <Breadcrumbs toolName="Word & Character Counter" toolSlug="word-character-counter" />
        <div className="text-center max-w-2xl mx-auto mb-8">
          <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-zinc-900 dark:text-white mb-4">
            Word & Character Counter
          </h1>
          <p className="text-base sm:text-lg text-zinc-600 dark:text-zinc-400 leading-relaxed">
            A fast, robust text analytics tool providing instant word counts, character counts, paragraph metrics, reading time estimations, and social platform limit warnings as you type.
          </p>
        </div>

        <ShareButtons url="https://quickcalc.cloud/tools/word-character-counter" title="Word & Character Counter" />

        {/* Interactive Widget */}
        <section className="my-8">
          <WordCharacterCounterWidget />
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
              About this Word & Character Counter
            </h2>
            <p className="text-zinc-600 dark:text-zinc-400 leading-relaxed">
              Whether you are writing an academic essay, drafting an advertising copy block, optimizing SEO meta titles and descriptions, or keeping your X (Twitter) social posts within standard character boundaries, keeping track of text sizes is crucial. Our live Word & Character Counter parses your text instantaneously on keyup events, updating six distinct dimensions of content metrics synchronously.
            </p>
            <p className="text-zinc-600 dark:text-zinc-400 leading-relaxed">
              Unlike generic, premium-gated counter sites cluttered with massive intrusive ads and hidden paywalls for deep metrics, <strong>QuickCalc delivers a comprehensive array of indicators completely free — with absolutely no accounts, tracking, or email requirements</strong>.
            </p>
            <p className="text-zinc-600 dark:text-zinc-400 leading-relaxed">
              <strong>Key Features & Highlights:</strong>
            </p>
            <ul className="list-disc list-inside space-y-2 text-zinc-600 dark:text-zinc-400 leading-relaxed">
              <li><strong>Complete Live Analysis:</strong> Track words, paragraphs, sentences, total characters with spaces, and exclusive characters without spaces synchronously.</li>
              <li><strong>Readability Evaluation:</strong> Get a plain-language reading level classification (e.g. standard school levels) using Automated Readability Index ratios.</li>
              <li><strong>Platform Warning Indicators:</strong> Stay within boundaries with real-time green/amber/red warnings mapped to X posts, SMS limits, and search engine SEO meta description specifications.</li>
              <li><strong>Estimated Reading Time:</strong> Plan your blog post flow with reading time calculations tailored to average human comprehension speeds (200 - 238 words per minute).</li>
            </ul>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-bold text-zinc-950 dark:text-white">
              How is this calculated?
            </h2>
            <p className="text-zinc-600 dark:text-zinc-400 leading-relaxed">
              Our word and character counter executes a series of real-time lexical parsing calculations to evaluate your text metrics:
            </p>
            <ul className="list-disc pl-6 text-zinc-600 dark:text-zinc-400 space-y-2">
              <li>
                <strong>Character Counting:</strong> Total characters are calculated by measuring the length of the string (<code>text.length</code>). Characters without spaces are counted by stripping all whitespace characters using a global regular expression (<code>text.replace(/\s/g, '').length</code>).
              </li>
              <li>
                <strong>Word Counting:</strong> The string is trimmed and split by a whitespace regular expression (<code>text.trim().split(/\s+/)</code>). To ensure accuracy, empty strings are filtered out from the resulting array before measuring length.
              </li>
              <li>
                <strong>Sentence Counting:</strong> Sentences are identified by matching terminal punctuation marks followed by spaces or string endings (e.g., periods, exclamation marks, and question marks) using a regex pattern (<code>text.split(/[.!?]+(\s|$)/)</code>).
              </li>
              <li>
                <strong>Paragraph Counting:</strong> Paragraphs are counted by splitting the text by newline characters (<code>text.split(/\n+/)</code>) and filtering out empty lines.
              </li>
              <li>
                <strong>Automated Readability Index (ARI):</strong> The readability grade level is estimated using the standard formula:
                <div className="bg-zinc-100 dark:bg-zinc-900 p-2 my-2 rounded font-mono text-xs overflow-x-auto text-emerald-600 dark:text-emerald-400">
                  ARI = 4.71 * (Characters / Words) + 0.5 * (Words / Sentences) - 21.43
                </div>
                The result is mapped to approximate US school grade levels.
              </li>
              <li>
                <strong>Estimated Reading Time:</strong> Calculated based on an average adult reading speed of 225 words per minute: <code>Reading Time = Words / 225</code>.
              </li>
            </ul>
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
                  How is reading time calculated from word count?
                </h3>
                <p className="text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed">
                  Reading time is calculated by taking the total word count of your text and dividing it by the average adult reading speed, which typically ranges between 200 and 238 words per minute. Our tool displays a friendly estimated range (e.g., 'about 2 to 3 minutes') based on this standard model.
                </p>
              </div>

              <div className="space-y-2">
                <h3 className="text-base font-bold text-zinc-900 dark:text-zinc-100">
                  What is the character limit for a tweet/X post?
                </h3>
                <p className="text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed">
                  The standard character limit for a standard post on X (formerly Twitter) is 280 characters. Our tool includes a live platform limits panel that dynamically warns you with color-coded alerts as you approach or exceed this limit.
                </p>
              </div>

              <div className="space-y-2">
                <h3 className="text-base font-bold text-zinc-900 dark:text-zinc-100">
                  Does this count words in other languages?
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
