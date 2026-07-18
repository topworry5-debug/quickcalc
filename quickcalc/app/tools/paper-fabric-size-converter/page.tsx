import ThemeToggle from "@/components/ThemeToggle";

import Breadcrumbs from "@/components/Breadcrumbs";

import type { Metadata } from "next";
import Link from "next/link";
import PaperFabricConverterWidget from "./PaperFabricConverterWidget";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "Paper & Fabric Size Converter - Dual Measurement Tool | QuickCalc",
  description: "Convert print paper sizes (A0-A10, Letter, Legal) and fabric measurements (yards, meters, inches, cm) instantly. 100% free with no paywalls.",
  alternates: {
    canonical: "/tools/paper-fabric-size-converter",
  },
  openGraph: {
    title: "Paper & Fabric Size Converter - Dual Measurement Tool | QuickCalc",
    description: "Convert print paper sizes (A0-A10, Letter, Legal) and fabric measurements (yards, meters, inches, cm) instantly. 100% free with no paywalls.",
    url: "https://quickcalc.cloud/tools/paper-fabric-size-converter",
    type: "website",
    siteName: "QuickCalc",
    images: [
      {
        url: "https://quickcalc.cloud/og-image.png",
        width: 1200,
        height: 630,
        alt: "Paper and Fabric Converter on QuickCalc",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Paper & Fabric Size Converter - Dual Measurement Tool | QuickCalc",
    description: "Convert print paper sizes (A0-A10, Letter, Legal) and fabric measurements (yards, meters, inches, cm) instantly. 100% free with no paywalls.",
    images: ["https://quickcalc.cloud/og-image.png"],
  },
};

export default function PaperFabricConverterPage() {
  const faqData = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      {
        "@type": "Question",
        "name": "What is the difference between A4 and Letter paper size?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "A4 is the international standard (ISO 216) measuring 210 x 297 mm (8.27 x 11.69 inches). In contrast, US Letter is the North American standard measuring 215.9 x 279.4 mm (8.5 x 11.0 inches). Letter paper is slightly wider, while A4 is slightly longer."
        }
      },
      {
        "@type": "Question",
        "name": "How many meters are in a yard of fabric?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "There are exactly 0.9144 meters in a yard of fabric. If you are converting the other way, one meter of fabric equals approximately 1.0936 yards."
        }
      },
      {
        "@type": "Question",
        "name": "Why do paper sizes differ between countries?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "The international ISO A-series (e.g. A4) is based on a single, logical aspect ratio of 1:√2, allowing sizes to scale perfectly when folded in half. The US Letter and Legal standards evolved from historical hand-made paper mold lengths (specifically 44 inches cut into quarters), which remain popular in North America today."
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
          <Link href="/" className="flex items-center gap-2 font-bold text-lg text-emerald-600 dark:text-emerald-400">
            <span>⚖️ QuickCalc</span>
          </Link>
          <nav className="flex items-center gap-2 sm:gap-4">
            <Link href="/" className="text-sm font-medium text-zinc-600 dark:text-zinc-400 hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors">
              Home
            </Link>
            <span className="text-sm font-medium text-zinc-300 dark:text-zinc-700">|</span>
            <span className="text-sm font-medium text-zinc-400 dark:text-zinc-600">Paper & Fabric Converter</span>
            <span className="text-sm font-medium text-zinc-300 dark:text-zinc-700 font-normal">|</span>
            <ThemeToggle />
          </nav>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-4xl mx-auto px-4 py-8 sm:py-12">
        <Breadcrumbs toolName="Paper & Fabric Size Converter" toolSlug="paper-fabric-size-converter" />
        <div className="text-center max-w-2xl mx-auto mb-8">
          <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-zinc-900 dark:text-white mb-4">
            Paper & Fabric Size Converter
          </h1>
          <p className="text-base sm:text-lg text-zinc-600 dark:text-zinc-400 leading-relaxed">
            Quickly convert international print sizes and textile length units in one place. Unlike static lists or separate, ad-heavy chart pages, our utility offers clean modes to convert paper dimensions and textile measurements simultaneously as you interact.
          </p>
        </div>

        {/* The interactive widget */}
        <section className="my-8">
          <PaperFabricConverterWidget />
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
              Understanding Sizing Standards
            </h2>
            <p className="text-zinc-600 dark:text-zinc-400 leading-relaxed">
              Standardizations for daily measurements are key to global communication, yet different fields rely on distinct unit heritage:
            </p>
            <p className="text-zinc-600 dark:text-zinc-400 leading-relaxed">
              The international paper standard (<strong>ISO 216</strong>) is built upon a clever geometric property: the 1:√2 aspect ratio. When you fold an A-series paper in half along its short side, the resulting halves retain the exact same aspect ratio. This makes rescaling printing documents incredibly simple. Conversely, the US system (Letter, Legal, Tabloid) originated from historical hand-crafted paper frames and quarters, which remain standard in North American offices.
            </p>
            <p className="text-zinc-600 dark:text-zinc-400 leading-relaxed">
              In textile design and tailoring, fabric is traditionally bought by length (yards or meters). Because supply chains cross oceans, textile suppliers in the Americas frequently buy and sell in yards, while international distributors utilize meters. Knowing the exact conversion is critical for sewing projects, international shopping, and upholstery planning.
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
                  <span>What is the difference between A4 and Letter paper size?</span>
                  <span className="transition group-open:rotate-180 text-zinc-400 dark:text-zinc-500">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" className="w-5 h-5">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
                    </svg>
                  </span>
                </summary>
                <p className="text-zinc-600 dark:text-zinc-400 mt-3 text-sm leading-relaxed">
                  A4 paper is narrower and longer than US Letter. A4 measures 210 x 297 mm, while US Letter measures 215.9 x 279.4 mm. When sending documents internationally, converting your layout to match the regional paper standard prevents layout cutoff.
                </p>
              </details>

              <details className="group border border-zinc-200 dark:border-zinc-800 rounded-lg p-4 bg-white dark:bg-zinc-900 transition-all duration-150 [&_summary::-webkit-details-marker]:hidden">
                <summary className="flex justify-between items-center font-semibold text-zinc-800 dark:text-zinc-200 cursor-pointer focus:outline-none">
                  <span>How many meters are in a yard of fabric?</span>
                  <span className="transition group-open:rotate-180 text-zinc-400 dark:text-zinc-500">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" className="w-5 h-5">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
                    </svg>
                  </span>
                </summary>
                <p className="text-zinc-600 dark:text-zinc-400 mt-3 text-sm leading-relaxed">
                  There are exactly 0.9144 meters in a yard. This standard multiplier ensures you do not buy insufficient fabric when following international patterns. Use our fabric quantity helper to quickly scale your fabric length!
                </p>
              </details>

              <details className="group border border-zinc-200 dark:border-zinc-800 rounded-lg p-4 bg-white dark:bg-zinc-900 transition-all duration-150 [&_summary::-webkit-details-marker]:hidden">
                <summary className="flex justify-between items-center font-semibold text-zinc-800 dark:text-zinc-200 cursor-pointer focus:outline-none">
                  <span>Why do paper sizes differ between countries?</span>
                  <span className="transition group-open:rotate-180 text-zinc-400 dark:text-zinc-500">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" className="w-5 h-5">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
                    </svg>
                  </span>
                </summary>
                <p className="text-zinc-600 dark:text-zinc-400 mt-3 text-sm leading-relaxed">
                  Regional standards trace back to local manufacturing traditions. While Europe and the rest of the world unified under the German-designed ISO standards in the 20th century to optimize scaling, North America retained the US Letter format owing to its deep entrenchment in commercial printer and copying equipment.
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
              <span className="text-2xl mb-2 block">👟</span>
              <h4 className="font-bold text-zinc-900 dark:text-white text-base">Shoe Size Converter</h4>
              <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-2">
                Convert shoe sizes instantly between US, UK, EU, and Japan systems simultaneously with brand variance.
              </p>
              <Link href="/tools/shoe-size-converter" className="inline-block text-xs font-semibold text-emerald-500 dark:text-emerald-400 mt-4 hover:underline">
                Use Tool &rarr;
              </Link>
            </div>

            <div className="border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 p-5 rounded-xl hover:shadow-md transition duration-200">
              <span className="text-2xl mb-2 block">🎓</span>
              <h4 className="font-bold text-zinc-900 dark:text-white text-base">GPA Converter</h4>
              <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-2">
                Convert global grading frameworks into the standard 4.0 GPA scale easily.
              </p>
              <Link href="/tools/gpa-converter" className="inline-block text-xs font-semibold text-emerald-500 dark:text-emerald-400 mt-4 hover:underline">
                Use Tool &rarr;
              </Link>
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
      <Footer customText="Elegant, simultaneous print & textile conversion solutions." />
    </div>
  );
}
