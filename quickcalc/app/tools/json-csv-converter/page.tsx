import MethodologyAccordion from "@/components/MethodologyAccordion";
import Link from "next/link";

import Navbar from "@/components/Navbar";
import { generateSoftwareAppSchema } from "@/lib/schema";
import RelatedTools from "@/components/RelatedTools";
import ShareButtons from "@/components/ShareButtons";
import EmbedWidget from "@/components/EmbedWidget";



import Breadcrumbs from "@/components/Breadcrumbs";

import type { Metadata } from "next";
import JSONCSVConverterWidget from "./JSONCSVConverterWidget";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "Private JSON to CSV Converter - Free Client-Side Tool",
  description: "Convert JSON arrays to CSV spreadsheets or CSV back to nested JSON structures. 100% private browser-local utility with no data collection or cookies.",
  alternates: {
    canonical: "/tools/json-csv-converter",
  },
  openGraph: {
    title: "Private JSON to CSV Converter - Free Client-Side Tool",
    description: "Convert JSON arrays to CSV spreadsheets or CSV back to nested JSON structures. 100% private browser-local utility with no data collection or cookies.",
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
    title: "Private JSON to CSV Converter - Free Client-Side Tool",
    description: "Convert JSON arrays to CSV spreadsheets or CSV back to nested JSON structures. 100% private browser-local utility with no data collection or cookies.",
  },
};

export default function JSONCSVConverterPage({ searchParams }: { searchParams?: { embed?: string } }) {
  const softwareSchema = generateSoftwareAppSchema({
    name: "Private JSON to CSV Converter - Free Client-Side Tool",
    description: "Convert JSON arrays to CSV spreadsheets or CSV back to nested JSON structures. 100% private browser-local utility with no data collection or cookies.",
    slug: "json-csv-converter",
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
          <JSONCSVConverterWidget />
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
        "name": "How do I convert a JSON array to a CSV file online for free?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "To learn how to convert JSON to CSV online free, simply paste your JSON array into our input pane above and watch it convert to a table instantly. Our tool is 100% free, runs entirely in your local browser, and requires no sign-ups or software installation."
        }
      },
      {
        "@type": "Question",
        "name": "How can I convert a CSV file to JSON format without coding?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Yes, our tool serves as an easy csv to json converter without coding. Just paste your raw comma-separated spreadsheet text into the editor, click the convert button, and get clean, formatted JSON structures ready to copy and paste immediately."
        }
      },
      {
        "@type": "Question",
        "name": "Why does my JSON to CSV converter fail when data contains commas or quotes?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "If you are asking why does my CSV conversion break with commas, it is because commas are standard field delimiters. When a cell contains raw commas without being wrapped in double quotes, standard parsers read them as separate columns. Our converter automatically escapes and wraps text blocks with quotation marks to prevent this issue."
        }
      },
      {
        "@type": "Question",
        "name": "How does this tool flatten nested JSON objects into a flat CSV row?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Yes, our converter recursively flattens nested objects into a single flat layer using standard dot-notation keys (e.g. 'address.city'). When converting back from CSV to JSON, it automatically parses these keys to reconstruct the nested structures."
        }
      },
      {
        "@type": "Question",
        "name": "What happens to null, empty, or missing values during a CSV conversion?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Missing fields in JSON arrays are represented as empty cells in the resulting CSV. Conversely, empty cells in a CSV are skipped or assigned as null values in the parsed JSON array depending on the configuration."
        }
      },
      {
        "@type": "Question",
        "name": "What is the maximum file size supported for JSON and CSV file uploads?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Yes! Because the parsing is computed client-side, your browser is capable of converting files with thousands of records extremely quickly, limited only by your device's memory."
        }
      }
    ]
  };

  const softwareData = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    "name": "JSON & CSV Converter",
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
      <Navbar />

      {/* Main Content */}
      <main className="max-w-4xl mx-auto px-4 py-8 sm:py-12">
        <Breadcrumbs toolName="JSON & CSV Converter" toolSlug="json-csv-converter" />
        <div className="text-center max-w-2xl mx-auto mb-8">
          <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-zinc-900 dark:text-white mb-4">
            JSON to CSV Converter
          </h1>
          <p className="text-base sm:text-lg text-zinc-600 dark:text-zinc-400 leading-relaxed">This free tool converts JSON data to CSV format and vice versa with automatic object flattening in local browser memory. If you want to know how to convert JSON to CSV online free or are looking for a reliable csv to json converter without coding, our browser-local tool is here for you. Convert files securely in real-time, avoid issues where a CSV conversion breaks with commas, and manage developer payloads without uploading any of your private datasets.</p>
        </div>

        <ShareButtons url="https://quickcalc.cloud/tools/json-csv-converter" title="JSON & CSV Converter" />
        <EmbedWidget url="https://quickcalc.cloud/tools/json-csv-converter" title="JSON & CSV Converter" />

        {/* The interactive widget */}
        <section className="my-8">
          <JSONCSVConverterWidget />
        </section>

        {/* Collapsible Scientific & Mathematical Methodology */}
        <MethodologyAccordion slug="json-csv-converter" />

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
              Why Local JSON to CSV Conversion and Data Privacy Matters
            </h2>
            <p className="text-zinc-600 dark:text-zinc-400 leading-relaxed">
              In modern web development and operational workflows, exchanging data between flat spreadsheets and structured objects is an hourly necessity. Non-technical teammates need API responses compiled as spreadsheets (CSV) to analyze in Excel, while engineers need tabular client lists converted to clean, nested JSON arrays to populate databases.
            </p>
            <p className="text-zinc-600 dark:text-zinc-400 leading-relaxed">
              However, pasting customer tables, credentials, or proprietary configurations into ordinary online textareas carries substantial risks. Many converters transfer data to external servers, leaving a trail of sensitive records on third-party logs.
            </p>
            <p className="text-zinc-600 dark:text-zinc-400 leading-relaxed">
              QuickCalc resolves this security concern fundamentally. <strong>100% of our code is run client-side</strong> using standard modern browser memory. This means your text never crosses a network bridge, never touches any server logs, and remains completely secure on your machine. If you are building LLM applications or estimating API prompt token costs, try our free <Link href="/tools/ai-token-cost-calculator" className="text-teal-600 dark:text-teal-400 hover:underline font-semibold">AI Token Cost Calculator</Link> or convert data capacity sizes with our <Link href="/tools/digital-storage-converter" className="text-teal-600 dark:text-teal-400 hover:underline font-semibold">Digital Storage Converter</Link>.
            </p>

            <h3 className="text-xl font-semibold text-zinc-900 dark:text-white mt-6">
              How Nested JSON Objects are Flattened into CSV Columns
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

          <section className="space-y-4">
            <h2 className="text-2xl font-bold text-zinc-950 dark:text-white">
              How JSON Arrays are Parsed and Structured into CSV Files
            </h2>
            <p className="text-zinc-600 dark:text-zinc-400 leading-relaxed">
              Converting hierarchical JSON arrays to CSV matrices, or vice versa, uses iterative tree-traversal and serialization rules:
            </p>
            <ul className="list-disc pl-6 text-zinc-600 dark:text-zinc-400 space-y-2">
              <li>
                <strong>Flattening Rule:</strong> Sub-objects are parsed recursively to generate dot-separated headers (e.g. `user.address.zip`), while array rows form standard tabular data blocks.
              </li>
              <li>
                <strong>CSV Escape Rule:</strong> Double quotes, commas, and newline characters in cells are automatically escaped with wrapping quotes to keep tabular structures stable.
              </li>
              <li>
                <strong>Reconstruction Rule:</strong> Tabular headers are split by standard periods (`.`) to expand back into nested objects, and cell strings containing valid numbers or booleans are cast to correct primitives.
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
                  How do I convert a JSON array to a CSV file online for free?
                </h3>
                <p className="text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed">
                  To learn how to convert JSON to CSV online free, simply paste your JSON array into our input pane above and watch it convert to a table instantly. Our tool is 100% free, runs entirely in your local browser, and requires no sign-ups or software installation.
                </p>
              </div>

              <div className="space-y-2">
                <h3 className="text-base font-bold text-zinc-900 dark:text-zinc-100">
                  How can I convert a CSV file to JSON format without coding?
                </h3>
                <p className="text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed">
                  Yes, our tool serves as an easy csv to json converter without coding. Just paste your raw comma-separated spreadsheet text into the editor, click the convert button, and get clean, formatted JSON structures ready to copy and paste immediately.
                </p>
              </div>

              <div className="space-y-2">
                <h3 className="text-base font-bold text-zinc-900 dark:text-zinc-100">
                  Why does my JSON to CSV converter fail when data contains commas or quotes?
                </h3>
                <p className="text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed">
                  If you are asking why does my CSV conversion break with commas, it is because commas are standard field delimiters. When a cell contains raw commas without being wrapped in double quotes, standard parsers read them as separate columns. Our converter automatically escapes and wraps text blocks with quotation marks to prevent this issue.
                </p>
              </div>

              <div className="space-y-2">
                <h3 className="text-base font-bold text-zinc-900 dark:text-zinc-100">
                  How does this tool flatten nested JSON objects into a flat CSV row?
                </h3>
                <p className="text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed">
                  Yes, our converter recursively flattens nested objects into a single flat layer using standard dot-notation keys (e.g. {"'address.city'"}). When converting back from CSV to JSON, it automatically parses these keys to reconstruct the nested structures.
                </p>
              </div>

              <div className="space-y-2">
                <h3 className="text-base font-bold text-zinc-900 dark:text-zinc-100">
                  What happens to null, empty, or missing values during a CSV conversion?
                </h3>
                <p className="text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed">
                  Missing fields in JSON arrays are represented as empty cells in the resulting CSV. Conversely, empty cells in a CSV are skipped or assigned as null values in the parsed JSON array depending on the configuration.
                </p>
              </div>

              <div className="space-y-2">
                <h3 className="text-base font-bold text-zinc-900 dark:text-zinc-100">
                  What is the maximum file size supported for JSON and CSV file uploads?
                </h3>
                <p className="text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed">
                  Yes! Because the parsing is computed client-side, your browser is capable of converting files with thousands of records extremely quickly, limited only by your device{"'"}s memory.
                </p>
              </div>
            </div>
          </section>
        </article>

        <RelatedTools currentSlug="json-csv-converter" />
      </main>

      {/* Footer */}
      <Footer customText="Secure, client-side translation tools." />
    </div>
  );
}
