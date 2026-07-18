import Breadcrumbs from "@/components/Breadcrumbs";

import type { Metadata } from "next";
import Link from "next/link";
import PasswordGeneratorWidget from "./PasswordGeneratorWidget";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "Secure Password Generator - Cryptographic Password Strength & Entropy | QuickCalc",
  description: "Generate cryptographically secure passwords locally with precise entropy bit calculations. Pronounceable memorable options, random custom pools, and mathematical strength explanation.",
  alternates: {
    canonical: "/tools/password-generator",
  },
  openGraph: {
    title: "Secure Password Generator - Cryptographic Password Strength & Entropy | QuickCalc",
    description: "Generate cryptographically secure passwords locally with precise entropy bit calculations. Pronounceable memorable options, random custom pools, and mathematical strength explanation.",
    url: "https://quickcalc.cloud/tools/password-generator",
    type: "website",
    siteName: "QuickCalc",
    images: [
      {
        url: "https://quickcalc.cloud/og-image.png",
        width: 1200,
        height: 630,
        alt: "Secure Password Generator on QuickCalc",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Secure Password Generator - Cryptographic Password Strength & Entropy | QuickCalc",
    description: "Generate cryptographically secure passwords locally with precise entropy bit calculations. Pronounceable memorable options, random custom pools, and mathematical strength explanation.",
    images: ["https://quickcalc.cloud/og-image.png"],
  },
};

export default function PasswordGeneratorPage() {
  const faqData = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      {
        "@type": "Question",
        "name": "How long should a strong password be?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "For general accounts, a password of at least 12 to 16 characters is recommended. If using fully random strings or passphrase syllable combinations, 16+ characters provides robust protection, achieving over 80+ bits of cryptographic entropy."
        }
      },
      {
        "@type": "Question",
        "name": "Is it safe to use an online password generator?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Yes, provided the utility operates completely locally on your computer. QuickCalc generates passwords in local memory using the browser's cryptographic Web Crypto API (crypto.getRandomValues()) and never transmits your selections or results across the internet."
        }
      },
      {
        "@type": "Question",
        "name": "What makes a password hard to crack?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Password security is defined by mathematical entropy (length combined with character pool size), rather than predictable 'complexity tricks'. Adding pure characters is significantly more secure than swapping simple letters for symbols (like 'a' to '@') which modern cracking dictionaries easily guess."
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
            <span className="text-sm font-medium text-zinc-400 dark:text-zinc-600">Password Generator</span>
          </nav>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-4xl mx-auto px-4 py-8 sm:py-12">
        <Breadcrumbs toolName="Secure Password Generator" toolSlug="password-generator" />
        <div className="text-center max-w-2xl mx-auto mb-8">
          <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-zinc-900 dark:text-white mb-4">
            Secure Password Generator
          </h1>
          <p className="text-base sm:text-lg text-zinc-600 dark:text-zinc-400 leading-relaxed">
            Create ultra-secure, cryptographically randomized password structures instantly. Unlike standard tools that rely on vague, non-standard visual bars, QuickCalc computes actual Shannon entropy bits, giving you verified mathematical strength ratings.
          </p>
        </div>

        {/* The interactive widget */}
        <section className="my-8">
          <PasswordGeneratorWidget />
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
              Why Password Length Beats Complexity Tricks
            </h2>
            <p className="text-zinc-600 dark:text-zinc-400 leading-relaxed">
              For years, common password guidelines urged users to create passwords with substitutions like replacing the letter {"'a'"} with {"'@'"} or {"'s'"} with {"'$'"}. Unfortunately, modern hacking rigs and brute-force computer libraries are fully optimized to anticipate these exact combinations.
            </p>
            <p className="text-zinc-600 dark:text-zinc-400 leading-relaxed">
              True password strength is determined by **entropy**, which is a mathematical measure of randomness. Shannon entropy is measured in **bits**:
            </p>
            <ul className="list-disc pl-6 text-zinc-600 dark:text-zinc-400 space-y-2">
              <li>
                <strong>Entropy Calculation:</strong> The number of possible password configurations grows exponentially with length. Adding single characters to a password expands the cracking time exponentially, while swapping a standard character for a symbol only scales linearly.
              </li>
              <li>
                <strong>The Ultimate Security Practice:</strong> A length of 14–16 characters utilizing multiple pools creates a sequence that would take modern supercomputers billions of years to decrypt.
              </li>
              <li>
                <strong>Nudge Toward Password Managers:</strong> Rather than forcing yourself to memorize dozens of highly complex passwords across different websites, you should always leverage a trusted, encrypted password manager (like Bitwarden, 1Password, or Proton Pass) to store unique configurations and avoid unsafe credential recycling.
              </li>
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
                  <span>How long should a strong password be?</span>
                  <span className="transition group-open:rotate-180 text-zinc-400 dark:text-zinc-500">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" className="w-5 h-5">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
                    </svg>
                  </span>
                </summary>
                <p className="text-zinc-600 dark:text-zinc-400 mt-3 text-sm leading-relaxed">
                  Most cybersecurity authorities (including NIST) recommend a minimum length of 12 characters for standard user accounts. For optimal protection, a length of 16 characters or more is highly recommended to secure databases and critical systems.
                </p>
              </details>

              <details className="group border border-zinc-200 dark:border-zinc-800 rounded-lg p-4 bg-white dark:bg-zinc-900 transition-all duration-150 [&_summary::-webkit-details-marker]:hidden">
                <summary className="flex justify-between items-center font-semibold text-zinc-800 dark:text-zinc-200 cursor-pointer focus:outline-none">
                  <span>Is it safe to use an online password generator?</span>
                  <span className="transition group-open:rotate-180 text-zinc-400 dark:text-zinc-500">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" className="w-5 h-5">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
                    </svg>
                  </span>
                </summary>
                <p className="text-zinc-600 dark:text-zinc-400 mt-3 text-sm leading-relaxed">
                  Yes, but only if the generator executes 100% inside your local web browser. QuickCalc generates all values on-device inside your browser session using native Web Crypto capabilities. No information is ever uploaded or stored remotely.
                </p>
              </details>

              <details className="group border border-zinc-200 dark:border-zinc-800 rounded-lg p-4 bg-white dark:bg-zinc-900 transition-all duration-150 [&_summary::-webkit-details-marker]:hidden">
                <summary className="flex justify-between items-center font-semibold text-zinc-800 dark:text-zinc-200 cursor-pointer focus:outline-none">
                  <span>What makes a password hard to crack?</span>
                  <span className="transition group-open:rotate-180 text-zinc-400 dark:text-zinc-500">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" className="w-5 h-5">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
                    </svg>
                  </span>
                </summary>
                <p className="text-zinc-600 dark:text-zinc-400 mt-3 text-sm leading-relaxed">
                  A high level of mathematical entropy (calculated using length and random character variability) makes strings unfeasible for cracking machines. Swapping individual letters with typical substitute symbols does not increase cracking resistance because automated scripts anticipate those patterns.
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
                Analyze, test, and debug regular expressions (regex) instantly with live colored background highlighting.
              </p>
              <Link href="/tools/regex-tester" className="inline-block text-xs font-semibold text-blue-500 dark:text-blue-400 mt-4 hover:underline">
                Use Tool &rarr;
              </Link>
            </div>

            <div className="border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 p-5 rounded-xl hover:shadow-md transition duration-200">
              <span className="text-2xl mb-2 block">🕒</span>
              <h4 className="font-bold text-zinc-900 dark:text-white text-base">Timezone Meeting Planner</h4>
              <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-2">
                Schedule across multiple international locations with automatic daylight savings calculation.
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
      <Footer customText="Intuitive, client-side cryptographic security tools." />
    </div>
  );
}
