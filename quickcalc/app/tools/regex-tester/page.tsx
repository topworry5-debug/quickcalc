import RelatedTools from "@/components/RelatedTools";
import ShareButtons from "@/components/ShareButtons";
import EmbedWidget from "@/components/EmbedWidget";


import ThemeToggle from "@/components/ThemeToggle";

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

export default function RegexTesterPage({ searchParams }: { searchParams?: { embed?: string } }) {
  const isEmbed = searchParams?.embed === "true";
  if (isEmbed) {
    return (
      <div className="min-h-screen bg-white dark:bg-zinc-950 text-zinc-900 dark:text-zinc-100 font-[family-name:var(--font-geist-sans)] transition-colors p-2 flex flex-col justify-between">
        <main className="max-w-4xl mx-auto w-full">
          <RegexTesterWidget />
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
        "name": "How do I test a regular expression pattern online with live matching?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "To learn how to test a regex pattern online, simply paste your regular expression into our pattern box above and provide some test text below. The tester will highlight all matched patterns in real-time with visual markers, allowing you to instantly debug and refine your syntax."
        }
      },
      {
        "@type": "Question",
        "name": "What is the standard regex pattern for validating email addresses?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "A standard robust regex for email validation is `/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}$/`. While no regex can guarantee a mailbox truly exists, this pattern validates standard format conventions correctly for web forms."
        }
      },
      {
        "@type": "Question",
        "name": "How do I test regular expressions specifically for JavaScript or Python?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "If you are looking for how to match a pattern in JavaScript free tool, our debugger compiles regular expressions natively in your browser using standard JavaScript ECMAScript syntax rules. Use our interactive interface to see detailed matching results, lookaheads, and capture groups instantly."
        }
      },
      {
        "@type": "Question",
        "name": "What do the global, case-insensitive, and multi-line regex flags do?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "These modifiers change the searching logic: 'g' (global) ensures the pattern matches all occurrences in the string instead of stopping after the first match; 'i' (ignore case) bypasses case sensitivity (e.g., [A-Z] matches [a-z]); and 'm' (multiline) causes the anchors ^ and $ to match the start and end of individual lines instead of just the whole text block."
        }
      },
      {
        "@type": "Question",
        "name": "How do I escape special regex characters like dots, brackets, and question marks?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "To match a special regex meta-character literally (such as `.`, `*`, `+`, `?`, `^`, `$`, `(`, `)`, `[`, `]`, `{`, `}`, `|`, `\\`), prepend it with a backslash `\\` (e.g. `\\.` to match a literal dot)."
        }
      },
      {
        "@type": "Question",
        "name": "What is the difference between greedy and lazy quantifiers in regex?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Greedy quantifiers (like `*` or `+`) match as much text as possible. Adding a question mark (like `*?` or `+?`) makes them lazy, forcing them to match the shortest possible string of characters."
        }
      }
    ]
  };

  const softwareData = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    "name": "Regex Tester",
    "operatingSystem": "All",
    "applicationCategory": "DeveloperApplication",
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
      <header className="border-b border-zinc-200 dark:border-zinc-800 bg-white/80 dark:bg-zinc-900/80 backdrop-blur-md sticky top-0 z-50 transition-colors">
        <div className="max-w-4xl mx-auto px-4 h-16 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2 font-bold text-lg text-blue-600 dark:text-blue-400">
            <span>⚖️ QuickCalc</span>
          </Link>
          <nav className="flex items-center gap-2 sm:gap-4">
            <Link href="/" className="text-sm font-medium text-zinc-600 dark:text-zinc-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
              Home
            </Link>
            <Link href="/blog" className="text-sm font-medium text-zinc-600 dark:text-zinc-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
              Blog
            </Link>
            <span className="text-sm font-medium text-zinc-300 dark:text-zinc-700 font-normal">|</span>
            <span className="text-sm font-medium text-zinc-300 dark:text-zinc-700">|</span>
            <span className="text-sm font-medium text-zinc-400 dark:text-zinc-600">Regex Tester</span>
            <span className="text-sm font-medium text-zinc-300 dark:text-zinc-700 font-normal">|</span>
            <ThemeToggle />
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
            If you want to know how to test a regex pattern online or need an accurate regex for email validation, our real-time visual debugger is the perfect utility. Learn how to match a pattern in JavaScript free tool right in your browser, test multiple flags, and obtain a plain-language analysis of your expressions.
          </p>
        </div>

        <ShareButtons url="https://quickcalc.cloud/tools/regex-tester" title="Regex Tester" />
        <EmbedWidget url="https://quickcalc.cloud/tools/regex-tester" title="Regex Tester" />

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
              Understanding Regular Expressions (Regex Pattern Matching)
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
              <strong>Engine Note:</strong> This utility utilizes the default JavaScript ECMAScript regular expression expression engine built natively into your browser. While mostly uniform, advanced regex elements like certain lookbehinds or backreferences can vary slightly compared to other engines (such as Python or PCRE).
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-bold text-zinc-950 dark:text-white">
              How Regex Matching and Character Capturing Works
            </h2>
            <p className="text-zinc-600 dark:text-zinc-400 leading-relaxed">
              Regex matching utilizes deterministic finite-state automata (DFA) or non-deterministic finite-state automata (NFA) state machines computed natively by the browser{"'"}s V8 JavaScript engine:
            </p>
            <ul className="list-disc pl-6 text-zinc-600 dark:text-zinc-400 space-y-2">
              <li>
                <strong>Compiling patterns:</strong> The browser parses your input expression and flags using the standard `new RegExp(pattern, flags)` constructor.
              </li>
              <li>
                <strong>Evaluating text:</strong> The compiled regex runs across your test string to yield full Match objects, capturing start/end index boundaries and matching substrings.
              </li>
              <li>
                <strong>Highlighting:</strong> Our interactive widget splits the test string using these match boundaries, wrapping matches in styled `span` tags to output live colored highlights.
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
                  How do I test a regular expression pattern online with live matching?
                </h3>
                <p className="text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed">
                  To learn how to test a regex pattern online, simply paste your regular expression into our pattern box above and provide some test text below. The tester will highlight all matched patterns in real-time with visual markers, allowing you to instantly debug and refine your syntax.
                </p>
              </div>

              <div className="space-y-2">
                <h3 className="text-base font-bold text-zinc-900 dark:text-zinc-100">
                  What is the standard regex pattern for validating email addresses?
                </h3>
                <p className="text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed">
                  A standard robust regex for email validation is <code className="bg-zinc-100 dark:bg-zinc-900 px-1 py-0.5 rounded text-rose-500 font-semibold">{"/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}$/"}</code>. While no regex can guarantee a mailbox truly exists, this pattern validates standard format conventions correctly for web forms.
                </p>
              </div>

              <div className="space-y-2">
                <h3 className="text-base font-bold text-zinc-900 dark:text-zinc-100">
                  How do I test regular expressions specifically for JavaScript or Python?
                </h3>
                <p className="text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed">
                  If you are looking for how to match a pattern in JavaScript free tool, our debugger compiles regular expressions natively in your browser using standard JavaScript ECMAScript syntax rules. Use our interactive interface to see detailed matching results, lookaheads, and capture groups instantly.
                </p>
              </div>

              <div className="space-y-2">
                <h3 className="text-base font-bold text-zinc-900 dark:text-zinc-100">
                  What do the global, case-insensitive, and multi-line regex flags do?
                </h3>
                <p className="text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed">
                  These modifiers specify searching conditions. Global (g) returns all matches in a string. Case-insensitive (i) accepts lower and upper case options. Multiline (m) allows anchors to behave on separate paragraphs and lines.
                </p>
              </div>

              <div className="space-y-2">
                <h3 className="text-base font-bold text-zinc-900 dark:text-zinc-100">
                  How do I escape special regex characters like dots, brackets, and question marks?
                </h3>
                <p className="text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed">
                  To match a special regex meta-character literally (such as `.`, `*`, `+`, `?`, `^`, `$`, `(`, `)`, `[`, `]`, `{`, `}`, `|`, `\\`), prepend it with a backslash `\\` (e.g. `\\.` to match a literal dot).
                </p>
              </div>

              <div className="space-y-2">
                <h3 className="text-base font-bold text-zinc-900 dark:text-zinc-100">
                  What is the difference between greedy and lazy quantifiers in regex?
                </h3>
                <p className="text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed">
                  Greedy quantifiers (like `*` or `+`) match as much text as possible. Adding a question mark (like `*?` or `+?`) makes them lazy, forcing them to match the shortest possible string of characters.
                </p>
              </div>
            </div>
          </section>
        </article>

        <RelatedTools currentSlug="regex-tester" />
      </main>

      {/* Footer */}
      <Footer customText="Intuitive, client-side regular expression analyzers." />
    </div>
  );
}
