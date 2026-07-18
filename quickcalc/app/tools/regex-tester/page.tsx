import Breadcrumbs from "@/components/Breadcrumbs";

import type { Metadata } from "next";
import Link from "next/link";
import RegexTesterWidget from "./RegexTesterWidget";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "Regex Tester - Live Regular Expression Pattern Debugger | QuickCalc",
  description: "Test and debug regular expressions (regex) instantly with live colored background highlighting. Plain-language pattern explanations, common templates, and local execution.",
  alternates: {
    canonical: "/tools/regex-tester",
  },
  openGraph: {
    title: "Regex Tester - Live Regular Expression Pattern Debugger | QuickCalc",
    description: "Test and debug regular expressions (regex) instantly with live colored background highlighting. Plain-language pattern explanations, common templates, and local execution.",
    url: "https://quickcalc.cloud/tools/regex-tester",
    type: "website",
    siteName: "QuickCalc",
    images: [
      {
        url: "https://quickcalc.cloud/og-image.png",
        width: 1200,
        height: 630,
        alt: "Regex Tester on QuickCalc",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Regex Tester - Live Regular Expression Pattern Debugger | QuickCalc",
    description: "Test and debug regular expressions (regex) instantly with live colored background highlighting. Plain-language pattern explanations, common templates, and local execution.",
    images: ["https://quickcalc.cloud/og-image.png"],
  },
};

export default function RegexTesterPage() {
  const faqData = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      {
        "@type": "Question",
        "name": "What is a regex pattern used for?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "A regular expression (regex) is a sequence of characters defining a search pattern. It is extensively used for data validation (such as checking if an email is formatted correctly), search-and-replace string operations, and parsing textual database logs."
        }
      },
      {
        "@type": "Question",
        "name": "What do the g, i, and m flags mean in regex?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "These modifiers change the searching logic: 'g' (global) ensures the pattern matches all occurrences in the string instead of stopping after the first match; 'i' (ignore case) bypasses case sensitivity (e.g., [A-Z] matches [a-z]); and 'm' (multiline) causes the anchors ^ and $ to match the start and end of individual lines instead of just the whole text block."
        }
      },
      {
        "@type": "Question",
        "name": "Why is my regex not matching what I expect?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Common reasons include neglecting to set the global (g) flag to match multiple occurrences, case-mismatches without the case-insensitive (i) flag, unescaped literal characters (such as '.' or '?'), or subtle syntax differences between standard JavaScript regex engines and other engines like PCRE or Python."
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
          <Link href="/" className="flex items-center gap-2 font-bold text-lg text-blue-600 dark:text-blue-400">
            <span>⚖️ QuickCalc</span>
          </Link>
          <nav className="flex items-center gap-2 sm:gap-4">
            <Link href="/" className="text-sm font-medium text-zinc-600 dark:text-zinc-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
              Home
            </Link>
            <span className="text-sm font-medium text-zinc-300 dark:text-zinc-700">|</span>
            <span className="text-sm font-medium text-zinc-400 dark:text-zinc-600">Regex Tester</span>
          </nav>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-4xl mx-auto px-4 py-8 sm:py-12">
        <Breadcrumbs toolName="Regex Tester" toolSlug="regex-tester" />
        <div className="text-center max-w-2xl mx-auto mb-8">
          <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-zinc-900 dark:text-white mb-4">
            Regex Tester
          </h1>
          <p className="text-base sm:text-lg text-zinc-600 dark:text-zinc-400 leading-relaxed">
            Analyze, test, and debug regular expressions instantly with live, zero-latency colored background highlights. Unlike overwhelming technical portals, QuickCalc translates complex syntaxes into plain-language breakdowns.
          </p>
        </div>

        {/* The interactive widget */}
        <section className="my-8">
          <RegexTesterWidget />
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
              Understanding Regular Expressions (Regex)
            </h2>
            <p className="text-zinc-600 dark:text-zinc-400 leading-relaxed">
              Regular expressions are specialized text patterns used to evaluate, capture, and manipulate textual configurations. They act as high-octane search-and-replace templates, allowing you to define parameters for matches rather than literal characters.
            </p>
            <p className="text-zinc-600 dark:text-zinc-400 leading-relaxed">
              To tailor the behavior of patterns, regex engines rely on specialized <strong>Flags</strong>:
            </p>
            <ul className="list-disc pl-6 text-zinc-600 dark:text-zinc-400 space-y-2">
              <li>
                <strong>Global (g):</strong> Performs an all-inclusive sweep of the target string. Without this flag, the search ends instantly as soon as a single match is found.
              </li>
              <li>
                <strong>Case-Insensitive (i):</strong> Ignores letter casing, meaning <code className="bg-zinc-100 dark:bg-zinc-900 px-1 py-0.5 rounded text-rose-500 font-semibold">/hello/i</code> matches {"\"Hello\", \"HELLO\", or \"HeLLo\""} interchangeably.
              </li>
              <li>
                <strong>Multiline (m):</strong> Directs start-of-line anchors (<code className="text-rose-500 font-semibold">^</code>) and end-of-line anchors (<code className="text-rose-500 font-semibold">$</code>) to map individual text lines separate by line-breaks, instead of evaluating the string as one giant block.
              </li>
            </ul>
            <p className="text-zinc-600 dark:text-zinc-400 leading-relaxed">
              <strong>Engine Note:</strong> This utility utilizes the default JavaScript ECMAScript regular expression engine built natively into your browser. While mostly uniform, advanced regex elements like certain lookbehinds or backreferences can vary slightly compared to other engines (such as Python or PCRE).
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
                  <span>What is a regex pattern used for?</span>
                  <span className="transition group-open:rotate-180 text-zinc-400 dark:text-zinc-500">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" className="w-5 h-5">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
                    </svg>
                  </span>
                </summary>
                <p className="text-zinc-600 dark:text-zinc-400 mt-3 text-sm leading-relaxed">
                  Regular expressions are widely used for client and server form validations (e.g. email, phone numbers, postal codes), text editing replacements, log file extraction, and security screens for suspicious input patterns.
                </p>
              </details>

              <details className="group border border-zinc-200 dark:border-zinc-800 rounded-lg p-4 bg-white dark:bg-zinc-900 transition-all duration-150 [&_summary::-webkit-details-marker]:hidden">
                <summary className="flex justify-between items-center font-semibold text-zinc-800 dark:text-zinc-200 cursor-pointer focus:outline-none">
                  <span>What do the g, i, and m flags mean in regex?</span>
                  <span className="transition group-open:rotate-180 text-zinc-400 dark:text-zinc-500">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" className="w-5 h-5">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
                    </svg>
                  </span>
                </summary>
                <p className="text-zinc-600 dark:text-zinc-400 mt-3 text-sm leading-relaxed">
                  These modifiers specify searching conditions. Global (g) returns all matches in a string. Case-insensitive (i) accepts lower and upper case options. Multiline (m) allows anchors to behave on separate paragraphs and lines.
                </p>
              </details>

              <details className="group border border-zinc-200 dark:border-zinc-800 rounded-lg p-4 bg-white dark:bg-zinc-900 transition-all duration-150 [&_summary::-webkit-details-marker]:hidden">
                <summary className="flex justify-between items-center font-semibold text-zinc-800 dark:text-zinc-200 cursor-pointer focus:outline-none">
                  <span>Why is my regex not matching what I expect?</span>
                  <span className="transition group-open:rotate-180 text-zinc-400 dark:text-zinc-500">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" className="w-5 h-5">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
                    </svg>
                  </span>
                </summary>
                <p className="text-zinc-600 dark:text-zinc-400 mt-3 text-sm leading-relaxed">
                  Most issues are due to missing flags (such as {"'g'"} for multiple matches or {"'i'"} for case-insensitive content) or because you have not properly escaped literal characters that carry special regex operations (like dots, brackets, and quantifiers).
                </p>
              </details>
            </div>
          </section>
        </article>

        {/* Related Tools */}
        <section className="max-w-3xl mx-auto border-t border-zinc-200 dark:border-zinc-800 mt-12 pt-8">
          <h3 className="text-xl font-bold text-zinc-900 dark:text-white mb-6">
            Related Sizing & Conversion Tools
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 p-5 rounded-xl hover:shadow-md transition duration-200">
              <span className="text-2xl mb-2 block">🛡️</span>
              <h4 className="font-bold text-zinc-900 dark:text-white text-base">JSON ↔ CSV Converter</h4>
              <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-2">
                Convert JSON arrays to CSV spreadsheets and back in local browser memory with absolute privacy.
              </p>
              <Link href="/tools/json-csv-converter" className="inline-block text-xs font-semibold text-blue-500 dark:text-blue-400 mt-4 hover:underline">
                Use Tool &rarr;
              </Link>
            </div>

            <div className="border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 p-5 rounded-xl hover:shadow-md transition duration-200">
              <span className="text-2xl mb-2 block">📝</span>
              <h4 className="font-bold text-zinc-900 dark:text-white text-base">Word & Character Counter</h4>
              <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-2">
                Monitor and count word frequency, character counts, and sentence structures as you compose text.
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
      <Footer customText="Intuitive, client-side regular expression analyzers." />
    </div>
  );
}
