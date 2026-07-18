import ThemeToggle from "@/components/ThemeToggle";

import Breadcrumbs from "@/components/Breadcrumbs";

import type { Metadata } from "next";
import Link from "next/link";
import TimezonePlannerWidget from "./TimezonePlannerWidget";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "Timezone Meeting Planner - Global Team Overlap Calculator | QuickCalc",
  description: "Schedule across multiple timezones safely using actual IANA geographical database names. Detect working hour overlaps and share direct setup links with no sign-in required.",
  alternates: {
    canonical: "/tools/timezone-meeting-planner",
  },
  openGraph: {
    title: "Timezone Meeting Planner - Global Team Overlap Calculator | QuickCalc",
    description: "Schedule across multiple timezones safely using actual IANA geographical database names. Detect working hour overlaps and share direct setup links with no sign-in required.",
    url: "https://quickcalc.cloud/tools/timezone-meeting-planner",
    type: "website",
    siteName: "QuickCalc",
    images: [
      {
        url: "https://quickcalc.cloud/og-image.png",
        width: 1200,
        height: 630,
        alt: "Timezone Meeting Planner on QuickCalc",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Timezone Meeting Planner - Global Team Overlap Calculator | QuickCalc",
    description: "Schedule across multiple timezones safely using actual IANA geographical database names. Detect working hour overlaps and share direct setup links with no sign-in required.",
    images: ["https://quickcalc.cloud/og-image.png"],
  },
};

export default function TimezonePlannerPage() {
  const faqData = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      {
        "@type": "Question",
        "name": "How do I find a meeting time that works across time zones?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "The best approach is to map out your core team locations and look for overlapping windows inside standard working hours (typically 8:00 AM to 7:00 PM local time). For extreme spans (like US and East Asia), alternating early-morning and late-evening sessions share the burden fairly."
        }
      },
      {
        "@type": "Question",
        "name": "Does this tool account for daylight saving time?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Yes. By executing calculations with official, location-based IANA timezone identifiers (e.g. 'America/New_York') rather than static, offset numbers (like UTC-5), our tool automatically factors in exact localized daylight saving transitions based on the meeting date chosen."
        }
      },
      {
        "@type": "Question",
        "name": "What's the best overlap time for US and Europe teams?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "The optimal meeting window for US East Coast and European teams lies between 9:00 AM and 1:00 PM EST, which corresponds to 2:00 PM to 6:00 PM in London/Paris. For the US West Coast, the sweet spot is tighter, typically between 8:00 AM and 10:00 AM PST."
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
            <span className="text-sm font-medium text-zinc-400 dark:text-zinc-600">Meeting Planner</span>
            <span className="text-sm font-medium text-zinc-300 dark:text-zinc-700 font-normal">|</span>
            <ThemeToggle />
          </nav>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-4xl mx-auto px-4 py-8 sm:py-12">
        <Breadcrumbs toolName="Timezone Meeting Planner" toolSlug="timezone-meeting-planner" />
        <div className="text-center max-w-2xl mx-auto mb-8">
          <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-zinc-900 dark:text-white mb-4">
            Timezone Meeting Planner
          </h1>
          <p className="text-base sm:text-lg text-zinc-600 dark:text-zinc-400 leading-relaxed">
            Find the perfect overlap for distributed teams easily. Our local comparison engine maps exact working windows, flags local dates, and compiles instant share links with absolutely no accounts or log-ins required.
          </p>
        </div>

        {/* The interactive widget */}
        <section className="my-8">
          <TimezonePlannerWidget />
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
              Why Distributed Teams Need Timezone Planning
            </h2>
            <p className="text-zinc-600 dark:text-zinc-400 leading-relaxed">
              In modern distributed and remote organizations, coordinating synchronous meeting intervals is an essential daily challenge. Miscalculating local times leads to missed standups, disrupted workflows, and fatigue caused by expecting team members to join late-night or early-morning calls unexpectedly.
            </p>
            <p className="text-zinc-600 dark:text-zinc-400 leading-relaxed">
              Calculating timezone difference manually is highly error-prone due to the volatile nature of **Daylight Saving Time (DST)**:
            </p>
            <ul className="list-disc pl-6 text-zinc-600 dark:text-zinc-400 space-y-2">
              <li>
                <strong>Different Shift Dates:</strong> Different countries shift their clocks on entirely different calendar dates. For instance, the US transition to DST often occurs weeks before the European Union shift, temporarily changing standard offsets.
              </li>
              <li>
                <strong>Non-Shifting Jurisdictions:</strong> Many prominent business hubs (such as Singapore, Tokyo, and Dubai) observe standard time year-round. This causes their relative offset to shift back and forth compared to Western teams twice a year.
              </li>
              <li>
                <strong>Our Real-Database Advantage:</strong> Rather than utilizing hardcoded offset numbers, QuickCalc leverages the native IANA timezone database. When you select a target date, the engine handles localized DST changes flawlessly behind the scenes.
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
                  <span>How do I find a meeting time that works across time zones?</span>
                  <span className="transition group-open:rotate-180 text-zinc-400 dark:text-zinc-500">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" className="w-5 h-5">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
                    </svg>
                  </span>
                </summary>
                <p className="text-zinc-600 dark:text-zinc-400 mt-3 text-sm leading-relaxed">
                  Start by identifying the central location of key stakeholders. Input your preferred local time, select your target hubs in our widget above, and inspect rows displaying green {"\"Inside Core Hours\""} tags. This highlights overlapping business hours instantly.
                </p>
              </details>

              <details className="group border border-zinc-200 dark:border-zinc-800 rounded-lg p-4 bg-white dark:bg-zinc-900 transition-all duration-150 [&_summary::-webkit-details-marker]:hidden">
                <summary className="flex justify-between items-center font-semibold text-zinc-800 dark:text-zinc-200 cursor-pointer focus:outline-none">
                  <span>Does this tool account for daylight saving time?</span>
                  <span className="transition group-open:rotate-180 text-zinc-400 dark:text-zinc-500">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" className="w-5 h-5">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
                    </svg>
                  </span>
                </summary>
                <p className="text-zinc-600 dark:text-zinc-400 mt-3 text-sm leading-relaxed">
                  Yes, fully. Our calculations utilize localized Intl capabilities running with the official IANA database strings. By changing the planned date, the system automatically checks and offsets DST status for each specific region correctly.
                </p>
              </details>

              <details className="group border border-zinc-200 dark:border-zinc-800 rounded-lg p-4 bg-white dark:bg-zinc-900 transition-all duration-150 [&_summary::-webkit-details-marker]:hidden">
                <summary className="flex justify-between items-center font-semibold text-zinc-800 dark:text-zinc-200 cursor-pointer focus:outline-none">
                  <span>{"What's the best overlap time for US and Europe teams?"}</span>
                  <span className="transition group-open:rotate-180 text-zinc-400 dark:text-zinc-500">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" className="w-5 h-5">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
                    </svg>
                  </span>
                </summary>
                <p className="text-zinc-600 dark:text-zinc-400 mt-3 text-sm leading-relaxed">
                  The ideal window is the US morning (9:00 AM to 12:00 PM EST), which maps comfortably to the European afternoon (2:00 PM to 5:00 PM GMT/CET). This ensures both teams are inside standard business hours with no one expected to join before 8:00 AM or after 7:00 PM.
                </p>
              </details>
            </div>
          </section>
        </article>

        {/* Related Tools */}
        <section className="max-w-3xl mx-auto border-t border-zinc-200 dark:border-zinc-800 mt-12 pt-8">
          <h3 className="text-xl font-bold text-zinc-900 dark:text-white mb-6">
            Related Team Coordination Tools
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 p-5 rounded-xl hover:shadow-md transition duration-200">
              <span className="text-2xl mb-2 block">🍽️</span>
              <h4 className="font-bold text-zinc-900 dark:text-white text-base">Tip Calculator</h4>
              <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-2">
                Settle restaurant checks, calculate custom gratuity ranges, and split bills symmetrically among guests.
              </p>
              <Link href="/tools/tip-calculator" className="inline-block text-xs font-semibold text-blue-500 dark:text-blue-400 mt-4 hover:underline">
                Use Tool &rarr;
              </Link>
            </div>

            <div className="border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 p-5 rounded-xl hover:shadow-md transition duration-200">
              <span className="text-2xl mb-2 block">🛡️</span>
              <h4 className="font-bold text-zinc-900 dark:text-white text-base">Password Generator</h4>
              <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-2">
                Generate highly safe, cryptographically randomized password outputs with live Shannon entropy stats.
              </p>
              <Link href="/tools/password-generator" className="inline-block text-xs font-semibold text-blue-500 dark:text-blue-400 mt-4 hover:underline">
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
      <Footer customText="Intuitive, client-side remote working coordination tools." />
    </div>
  );
}
