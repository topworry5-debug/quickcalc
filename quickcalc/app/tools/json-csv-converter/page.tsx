import ThemeToggle from "@/components/ThemeToggle";

import Breadcrumbs from "@/components/Breadcrumbs";

import type { Metadata } from "next";
import Link from "next/link";
import JSONCSVConverterWidget from "./JSONCSVConverterWidget";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "JSON to CSV Converter - 100% Private Client-Side Tool | QuickCalc",
  description: "Convert JSON arrays to CSV spreadsheets and CSV back to nested JSON structures instantly. No cookies, no data collection, 100% browser-local conversion.",
  alternates: {
    canonical: "/tools/json-csv-converter",
  },
  openGraph: {
    title: "JSON to CSV Converter - 100% Private Client-Side Tool | QuickCalc",
    description: "Convert JSON arrays to CSV spreadsheets and CSV back to nested JSON structures instantly. No cookies, no data collection, 100% browser-local conversion.",
    url: "https://quickcalc.cloud/tools/json-csv-converter",
    type: "website",
    siteName: "QuickCalc",
    images: [
      {
        url: "https://quickcalc.cloud/og-image.png",
        width: 1200,
        height: 630,
        alt: "JSON to CSV Converter on QuickCalc",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "JSON to CSV Converter - 100% Private Client-Side Tool | QuickCalc",
    description: "Convert JSON arrays to CSV spreadsheets and CSV back to nested JSON structures instantly. No cookies, no data collection, 100% browser-local conversion.",
    images: ["https://quickcalc.cloud/og-image.png"],
  },
};

export default function JSONCSVConverterPage() {
  const faqData = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      {
        "@type": "Question",
        "name": "Is it safe to paste sensitive data into an online JSON to CSV converter?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Yes, on QuickCalc, it is 100% safe. All conversions take place locally inside your web browser using client-side JavaScript. No data is ever transmitted, uploaded, or saved to any external servers, meaning your sensitive or proprietary credentials and records remain entirely private."
        }
      },
      {
        "@type": "Question",
        "name": "Can this handle nested JSON objects?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Yes, our converter recursively flattens nested objects into a single flat layer using standard dot-notation keys (e.g. 'address.city'). When converting back from CSV to JSON, it automatically parses these keys to reconstruct the nested structures."
        }
      },
      {
        "@type": "Question",
        "name": "What's the easiest way to convert an Excel/CSV export to JSON for an API?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Simply copy the comma-separated data from your CSV file or spreadsheet, paste it into our Input pane, and click 'Convert CSV to JSON'. The tool instantly translates each row into a structured JSON object with correct data types, ready to copy into your API client."
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
          <Link href="/" className="flex items-center gap-2 font-bold text-lg text-zinc-900 dark:text-white">
            <span>⚖️ QuickCalc</span>
          </Link>
          <nav className="flex items-center gap-2 sm:gap-4">
            <Link href="/" className="text-sm font-medium text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-200 transition-colors">
              Home
            </Link>
            <span className="text-sm font-medium text-zinc-300 dark:text-zinc-700">|</span>
            <span className="text-sm font-medium text-zinc-400 dark:text-zinc-600">JSON & CSV Converter</span>
            <span className="text-sm font-medium text-zinc-300 dark:text-zinc-700 font-normal">|</span>
            <ThemeToggle />
          </nav>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-4xl mx-auto px-4 py-8 sm:py-12">
        <Breadcrumbs toolName="JSON & CSV Converter" toolSlug="json-csv-converter" />
        <div className="text-center max-w-2xl mx-auto mb-8">
          <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-zinc-900 dark:text-white mb-4">
            JSON to CSV Converter
          </h1>
          <p className="text-base sm:text-lg text-zinc-600 dark:text-zinc-400 leading-relaxed">
            A developer-first, distraction-free environment for translating structures. Unlike alternative services that send your proprietary files to external clouds or show cryptic parse warnings, QuickCalc delivers localized compilation with specific error location indicators.
          </p>
        </div>

        {/* The interactive widget */}
        <section className="my-8">
          <JSONCSVConverterWidget />
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
              Why Local Conversion Matters
            </h2>
            <p className="text-zinc-600 dark:text-zinc-400 leading-relaxed">
              In modern web development and operational workflows, exchanging data between flat spreadsheets and structured objects is an hourly necessity. Non-technical teammates need API responses compiled as spreadsheets (CSV) to analyze in Excel, while engineers need tabular client lists converted to clean, nested JSON arrays to populate databases.
            </p>
            <p className="text-zinc-600 dark:text-zinc-400 leading-relaxed">
              However, pasting customer tables, credentials, or proprietary configurations into ordinary online textareas carries substantial risks. Many converters transfer data to external servers, leaving a trail of sensitive records on third-party logs.
            </p>
            <p className="text-zinc-600 dark:text-zinc-400 leading-relaxed">
              QuickCalc resolves this security concern fundamentally. <strong>100% of our code is run client-side</strong> using standard modern browser memory. This means your text never crosses a network bridge, never touches any server logs, and remains completely secure on your machine.
            </p>

            <h3 className="text-xl font-semibold text-zinc-900 dark:text-white mt-6">
              How Nested Objects are Flattened
            </h3>
            <p className="text-zinc-600 dark:text-zinc-400 leading-relaxed">
              Relational databases and CSV files are flat, but JSON frequently contains rich nested layers of child objects. To bridge this gap, our tool automatically traverses nested objects and flattens them into single-column paths using standard dot-notation. For example, a nested layout like:
            </p>
            <pre className="p-4 bg-zinc-100 dark:bg-zinc-900 rounded-lg text-xs overflow-auto font-mono text-zinc-800 dark:text-zinc-300">
{`{
  "user": {
    "name": "Jane",
    "location": { "city": "Denver" }
  }
}`}
            </pre>
            <p className="text-zinc-600 dark:text-zinc-400 leading-relaxed">
              Is cleanly mapped to standard headers of <code className="text-rose-500 font-semibold">user.name</code> and <code className="text-rose-500 font-semibold">user.location.city</code>. When converting from CSV to JSON, the converter intelligently detects these dot-separated keys and fully reconstructs the original nested structures.
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
                  <span>Is it safe to paste sensitive data into an online JSON to CSV converter?</span>
                  <span className="transition group-open:rotate-180 text-zinc-400 dark:text-zinc-500">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" className="w-5 h-5">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
                    </svg>
                  </span>
                </summary>
                <p className="text-zinc-600 dark:text-zinc-400 mt-3 text-sm leading-relaxed">
                  On QuickCalc, absolutely. By using standard browser memory APIs, all text transformations happen in local sandbox runtimes. Absolutely no files, cookies, or text inputs are ever shared, uploaded, or transmitted.
                </p>
              </details>

              <details className="group border border-zinc-200 dark:border-zinc-800 rounded-lg p-4 bg-white dark:bg-zinc-900 transition-all duration-150 [&_summary::-webkit-details-marker]:hidden">
                <summary className="flex justify-between items-center font-semibold text-zinc-800 dark:text-zinc-200 cursor-pointer focus:outline-none">
                  <span>Can this handle nested JSON objects?</span>
                  <span className="transition group-open:rotate-180 text-zinc-400 dark:text-zinc-500">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" className="w-5 h-5">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
                    </svg>
                  </span>
                </summary>
                <p className="text-zinc-600 dark:text-zinc-400 mt-3 text-sm leading-relaxed">
                  Yes, it flattens hierarchies completely. The parser scans the array, maps all child keys using a dot notation separator, and establishes columns dynamically. When rebuilding JSON from CSV, these dot notation paths are cleanly unflattened into parent and child attributes.
                </p>
              </details>

              <details className="group border border-zinc-200 dark:border-zinc-800 rounded-lg p-4 bg-white dark:bg-zinc-900 transition-all duration-150 [&_summary::-webkit-details-marker]:hidden">
                <summary className="flex justify-between items-center font-semibold text-zinc-800 dark:text-zinc-200 cursor-pointer focus:outline-none">
                  <span>What is the easiest way to convert an Excel/CSV export to JSON for an API?</span>
                  <span className="transition group-open:rotate-180 text-zinc-400 dark:text-zinc-500">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" className="w-5 h-5">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
                    </svg>
                  </span>
                </summary>
                <p className="text-zinc-600 dark:text-zinc-400 mt-3 text-sm leading-relaxed">
                  Simply paste your raw spreadsheet comma-separated text in the Input box and click {"'Convert CSV to JSON'"}. The converter automatically extracts column titles as root keys, formats integers and decimals as numbers, translates booleans correctly, and packages each row into a structured output array.
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
              <span className="text-2xl mb-2 block">🔍</span>
              <h4 className="font-bold text-zinc-900 dark:text-white text-base">Regex Tester</h4>
              <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-2">
                Analyze and test regular expressions in real-time with comprehensive matched group highlights.
              </p>
              <span className="inline-block text-xs font-semibold text-zinc-400 dark:text-zinc-600 mt-4 cursor-default">
                Coming soon &rarr;
              </span>
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
      <Footer customText="Secure, client-side translation tools." />
    </div>
  );
}
