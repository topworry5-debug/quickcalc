import Breadcrumbs from "@/components/Breadcrumbs";

import type { Metadata } from "next";
import Link from "next/link";
import ColorPaletteGeneratorWidget from "./ColorPaletteGeneratorWidget";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "Free Color Palette Generator - Extract Dominant Colors from Images | QuickCalc",
  description: "Upload an image to extract 6-8 dominant colors instantly. Includes click-to-copy hex codes, WCAG contrast checks, CSS variables, and Tailwind export.",
  alternates: {
    canonical: "/tools/color-palette-generator",
  },
  openGraph: {
    title: "Free Color Palette Generator - Extract Dominant Colors from Images | QuickCalc",
    description: "Upload an image to extract 6-8 dominant colors instantly. Includes click-to-copy hex codes, WCAG contrast checks, CSS variables, and Tailwind export.",
    url: "https://quickcalc.cloud/tools/color-palette-generator",
    type: "website",
    siteName: "QuickCalc",
    images: [
      {
        url: "https://quickcalc.cloud/og-image.png",
        width: 1200,
        height: 630,
        alt: "Free Color Palette Generator on QuickCalc",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Free Color Palette Generator - Extract Dominant Colors from Images | QuickCalc",
    description: "Upload an image to extract 6-8 dominant colors instantly. Includes click-to-copy hex codes, WCAG contrast checks, CSS variables, and Tailwind export.",
    images: ["https://quickcalc.cloud/og-image.png"],
  },
};

export default function ColorPaletteGeneratorPage() {
  const faqData = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      {
        "@type": "Question",
        "name": "How do I extract colors from an image for a design project?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Simply drag and drop or upload your design file, photo, or mood-board image directly into our client-side palette tool. It instantly renders the file on an HTML5 Canvas, clusters color frequencies, filters visually indistinguishable shades, and extracts 6 to 8 dominant color swatches complete with exact hexadecimal values, contrast scoring, and ready-to-use CSS/Tailwind configuration snippets."
        }
      },
      {
        "@type": "Question",
        "name": "Is my uploaded image stored anywhere?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "No, your uploaded images are never stored or transmitted to any remote servers. All processing is executed 100% locally in your browser memory using HTML5 Canvas APIs, ensuring absolute privacy for your personal designs, proprietary logos, and photography."
        }
      },
      {
        "@type": "Question",
        "name": "What file formats are supported?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Our color extractor supports all standard browser-readable graphic formats including PNG, JPG, JPEG, WEBP, GIF, and SVG files under 10MB in size."
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
            <span>🎨 QuickCalc</span>
          </Link>
          <nav className="flex items-center gap-2 sm:gap-4">
            <Link href="/" className="text-sm font-medium text-zinc-600 dark:text-zinc-400 hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors">
              Home
            </Link>
            <span className="text-sm font-medium text-zinc-300 dark:text-zinc-700">|</span>
            <span className="text-sm font-medium text-zinc-400 dark:text-zinc-600">Palette Generator</span>
          </nav>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-4xl mx-auto px-4 py-8 sm:py-12">
        <Breadcrumbs toolName="Color Palette Generator" toolSlug="color-palette-generator" />
        <div className="text-center max-w-2xl mx-auto mb-8">
          <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-zinc-900 dark:text-white mb-4">
            Color Palette Generator
          </h1>
          <p className="text-base sm:text-lg text-zinc-600 dark:text-zinc-400 leading-relaxed">
            Extract up to 8 beautiful dominant colors from any image instantly. Build accessible color-conscious palettes with built-in, real-time WCAG contrast assessments, and export ready-to-copy code structures — all with complete local privacy.
          </p>
        </div>

        {/* The interactive widget */}
        <section className="my-8">
          <ColorPaletteGeneratorWidget />
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
              About this Color Palette Generator
            </h2>
            <p className="text-zinc-600 dark:text-zinc-400 leading-relaxed">
              Our professional-grade Color Palette Generator provides designers, developers, and creators with a streamlined mechanism to derive visually cohesive color schemes from mood boards, logo graphics, or photographs. Utilizing intelligent pixel-quantization algorithms and spatial-hue clustering, this utility identifies dominant hues while actively filtering redundant adjacent values to ensure a beautiful, distinct range.
            </p>
            <p className="text-zinc-600 dark:text-zinc-400 leading-relaxed">
              Unlike generic subscription tools that artificial-gate extraction configurations or hide utility checks behind pricing plans, <strong>QuickCalc offers unlimited 6-to-8 swatch extraction, professional exports, and automatic WCAG readability analysis for free, with absolutely no accounts or paywalls</strong>.
            </p>
            <p className="text-zinc-600 dark:text-zinc-400 leading-relaxed">
              <strong>Key Features & Advantages:</strong>
            </p>
            <ul className="list-disc list-inside space-y-2 text-zinc-600 dark:text-zinc-400 leading-relaxed">
              <li><strong>Advanced Swatch Count:</strong> Get 6 to 8 visually diverse swatches rather than being restricted to standard 5-color caps.</li>
              <li><strong>WCAG Contrast Analysis:</strong> Instantly check contrast scores between all extracted color pairings against AA readability requirements (4.5:1 ratio) to guarantee accessible text placement.</li>
              <li><strong>Instant Coding Exports:</strong> Convert your palette into custom CSS custom properties, Tailwind theme configuration objects, or raw hex code arrays in one click.</li>
              <li><strong>100% Client-Side Privacy:</strong> Your design assets remain entirely yours. Image loading, canvas rendering, and data compilation happen locally in browser memory without sending files to external servers.</li>
            </ul>
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
                  <span>How do I extract colors from an image for a design project?</span>
                  <span className="transition group-open:rotate-180 text-zinc-400 dark:text-zinc-500">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" className="w-5 h-5">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
                    </svg>
                  </span>
                </summary>
                <p className="text-zinc-600 dark:text-zinc-400 mt-3 text-sm leading-relaxed">
                  Simply drag and drop or upload your design file, photo, or mood-board image directly into our client-side palette tool. It instantly renders the file on an HTML5 Canvas, clusters color frequencies, filters visually indistinguishable shades, and extracts 6 to 8 dominant color swatches complete with exact hexadecimal values, contrast scoring, and ready-to-use CSS/Tailwind configuration snippets.
                </p>
              </details>

              <details className="group border border-zinc-200 dark:border-zinc-800 rounded-lg p-4 bg-white dark:bg-zinc-900 transition-all duration-150 [&_summary::-webkit-details-marker]:hidden">
                <summary className="flex justify-between items-center font-semibold text-zinc-800 dark:text-zinc-200 cursor-pointer focus:outline-none">
                  <span>Is my uploaded image stored anywhere?</span>
                  <span className="transition group-open:rotate-180 text-zinc-400 dark:text-zinc-500">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" className="w-5 h-5">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
                    </svg>
                  </span>
                </summary>
                <p className="text-zinc-600 dark:text-zinc-400 mt-3 text-sm leading-relaxed">
                  No, your uploaded images are never stored or transmitted to any remote servers. All processing is executed 100% locally in your browser memory using HTML5 Canvas APIs, ensuring absolute privacy for your personal designs, proprietary logos, and photography.
                </p>
              </details>

              <details className="group border border-zinc-200 dark:border-zinc-800 rounded-lg p-4 bg-white dark:bg-zinc-900 transition-all duration-150 [&_summary::-webkit-details-marker]:hidden">
                <summary className="flex justify-between items-center font-semibold text-zinc-800 dark:text-zinc-200 cursor-pointer focus:outline-none">
                  <span>What file formats are supported?</span>
                  <span className="transition group-open:rotate-180 text-zinc-400 dark:text-zinc-500">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" className="w-5 h-5">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
                    </svg>
                  </span>
                </summary>
                <p className="text-zinc-600 dark:text-zinc-400 mt-3 text-sm leading-relaxed">
                  Our color extractor supports all standard browser-readable graphic formats including PNG, JPG, JPEG, WEBP, GIF, and SVG files under 10MB in size.
                </p>
              </details>
            </div>
          </section>
        </article>

        {/* Related Tools */}
        <section className="max-w-3xl mx-auto border-t border-zinc-200 dark:border-zinc-800 mt-12 pt-8">
          <h3 className="text-xl font-bold text-zinc-900 dark:text-white mb-6">
            Related Design & Development Tools
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <Link href="/tools/regex-tester" className="border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 p-5 rounded-xl hover:shadow-md transition duration-200">
              <span className="text-2xl mb-2 block">🔍</span>
              <h4 className="font-bold text-zinc-900 dark:text-white text-base">Regex Tester</h4>
              <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-2">
                Test and debug regular expressions instantly with live colored highlighting.
              </p>
            </Link>

            <Link href="/tools/word-character-counter" className="border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 p-5 rounded-xl hover:shadow-md transition duration-200">
              <span className="text-2xl mb-2 block">📝</span>
              <h4 className="font-bold text-zinc-900 dark:text-white text-base">Word & Character Counter</h4>
              <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-2">
                Count words, sentences, reading time, and more on your copywriting blocks.
              </p>
            </Link>

            <Link href="/tools/json-csv-converter" className="border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 p-5 rounded-xl hover:shadow-md transition duration-200">
              <span className="text-2xl mb-2 block">🛡️</span>
              <h4 className="font-bold text-zinc-900 dark:text-white text-base">JSON & CSV Converter</h4>
              <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-2">
                Safely transform JSON files directly into clean structural CSV datasets locally.
              </p>
            </Link>
          </div>
        </section>
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
}
