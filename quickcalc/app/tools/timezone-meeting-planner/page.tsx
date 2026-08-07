import Navbar from "@/components/Navbar";
import { generateSoftwareAppSchema } from "@/lib/schema";
import RelatedTools from "@/components/RelatedTools";
import ShareButtons from "@/components/ShareButtons";
import EmbedWidget from "@/components/EmbedWidget";

import Breadcrumbs from "@/components/Breadcrumbs";
import type { Metadata } from "next";
import TimezonePlannerWidget from "./TimezonePlannerWidget";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "Timezone Meeting Planner - Global Team Work Overlap Tool",
  description: "Schedule global meetings across multiple timezones safely. Instantly find working hour overlaps and share setup links with no sign-in required.",
  alternates: {
    canonical: "/tools/timezone-meeting-planner",
  },
  openGraph: {
    title: "Timezone Meeting Planner - Global Team Work Overlap Tool",
    description: "Schedule global meetings across multiple timezones safely. Instantly find working hour overlaps and share setup links with no sign-in required.",
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
    title: "Timezone Meeting Planner - Global Team Work Overlap Tool",
    description: "Schedule global meetings across multiple timezones safely. Instantly find working hour overlaps and share setup links with no sign-in required.",
  },
};

export default function TimezonePlannerPage({ searchParams }: { searchParams?: { embed?: string } }) {
  const softwareSchema = generateSoftwareAppSchema({
    name: "Timezone Meeting Planner - Global Team Work Overlap Tool",
    description: "Schedule global meetings across multiple timezones safely. Instantly find working hour overlaps and share setup links with no sign-in required.",
    slug: "timezone-meeting-planner",
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
          <TimezonePlannerWidget />
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
        "name": "How do I schedule an international meeting across multiple time zones?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "To find how to schedule a meeting across time zones, add your team's locations into our interactive planner above. It dynamically maps localized core hours side-by-side, making it incredibly simple to identify overlapping green slots that work for all attendees."
        }
      },
      {
        "@type": "Question",
        "name": "What are the overlapping working hours to meet between UTC, EST, and PST?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "The best time to meet UTC to EST is usually between 1:00 PM and 5:00 PM UTC, which corresponds to a comfortable morning slot of 8:00 AM to 12:00 PM EST. This allows both parties to collaborate during their standard localized working day."
        }
      },
      {
        "@type": "Question",
        "name": "How do I convert a local meeting time for global team members?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "To convert meeting time to multiple time zones, pick your planned meeting date and slide the hour control. Our planner instantly displays the corresponding local times and dates across all your selected global offices in real-time."
        }
      },
      {
        "@type": "Question",
        "name": "Does this timezone planner automatically adjust for daylight saving time (DST)?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Yes. By executing calculations with official, location-based IANA timezone identifiers (e.g. 'America/New_York') rather than static, offset numbers (like UTC-5), our tool automatically factors in exact localized daylight saving transitions based on the meeting date chosen."
        }
      }
    ]
  };

  const softwareData = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    "name": "Timezone Meeting Planner",
    "operatingSystem": "All",
    "applicationCategory": "BusinessApplication",
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
        <Breadcrumbs toolName="Timezone Meeting Planner" toolSlug="timezone-meeting-planner" />
        <div className="text-center max-w-2xl mx-auto mb-8">
          <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-zinc-900 dark:text-white mb-4">
            Timezone Meeting Planner
          </h1>
          <p className="text-base sm:text-lg text-zinc-600 dark:text-zinc-400 leading-relaxed">This free tool calculates overlapping business hours and schedules cross-border team meetings across multiple timezones. If you need to know how to schedule a meeting across time zones or want to find the best time to meet UTC to EST with team members, our global team overlap tool is here to help. Easily convert meeting time to multiple time zones and see exact visual working hour highlights instantly.</p>
        </div>

        <ShareButtons url="https://quickcalc.cloud/tools/timezone-meeting-planner" title="Timezone Meeting Planner" />
        <EmbedWidget url="https://quickcalc.cloud/tools/timezone-meeting-planner" title="Timezone Meeting Planner" />

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
              Why Remote Teams Need Global Timezone Planning
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

          <section className="space-y-4">
            <h2 className="text-2xl font-bold text-zinc-950 dark:text-white">
              How Overlapping Working Hours are Calculated Across Time Zones
            </h2>
            <p className="text-zinc-600 dark:text-zinc-400 leading-relaxed">
              To map schedule overlaps accurately, our system evaluates time conversions using modern, localized chronological processes:
            </p>
            <ul className="list-disc pl-6 text-zinc-600 dark:text-zinc-400 space-y-2">
              <li>
                <strong>Official IANA Time Zone Matching:</strong> Rather than relying on simple static mathematical offsets (which fail when regions shift between daylight and standard hours), we use location-specific identifiers (e.g., <code>Europe/London</code>, <code>Asia/Tokyo</code>) mapped to the browser's native <code>Intl.DateTimeFormat</code> API.
              </li>
              <li>
                <strong>Absolute Epoch Reference:</strong> The selected meeting day and slider hour are first compiled into a standardized UTC timestamp.
              </li>
              <li>
                <strong>Localized Hour Projection:</strong> The system projects this absolute UTC epoch back into each target team's timezone to extract the exact hour, minute, and calendar date of that region using local browser calendar systems.
              </li>
              <li>
                <strong>Overlap Quality Classification:</strong>
                <ul className="list-disc pl-6 space-y-1 mt-1">
                  <li><strong>Core Working Hours (Green):</strong> 9:00 AM to 5:00 PM in the localized timezone.</li>
                  <li><strong>Extended Working Hours (Amber):</strong> 8:00 AM to 9:00 AM, or 5:00 PM to 7:00 PM in the localized timezone.</li>
                  <li><strong>Non-Working Hours (Red):</strong> Hours before 8:00 AM or after 7:00 PM, identifying times unsuitable for standard meetings.</li>
                </ul>
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
                  How do I schedule an international meeting across multiple time zones?
                </h3>
                <p className="text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed">
                  To find how to schedule a meeting across time zones, add your team{"'"}s locations into our interactive planner above. It dynamically maps localized core hours side-by-side, making it incredibly simple to identify overlapping green slots that work for all attendees.
                </p>
              </div>

              <div className="space-y-2">
                <h3 className="text-base font-bold text-zinc-900 dark:text-zinc-100">
                  What are the overlapping working hours to meet between UTC, EST, and PST?
                </h3>
                <p className="text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed">
                  The best time to meet UTC to EST is usually between 1:00 PM and 5:00 PM UTC, which corresponds to a comfortable morning slot of 8:00 AM to 12:00 PM EST. This allows both parties to collaborate during their standard localized working day.
                </p>
              </div>

              <div className="space-y-2">
                <h3 className="text-base font-bold text-zinc-900 dark:text-zinc-100">
                  How do I convert a local meeting time for global team members?
                </h3>
                <p className="text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed">
                  To convert meeting time to multiple time zones, pick your planned meeting date and slide the hour control. Our planner instantly displays the corresponding local times and dates across all your selected global offices in real-time.
                </p>
              </div>

              <div className="space-y-2">
                <h3 className="text-base font-bold text-zinc-900 dark:text-zinc-100">
                  Does this timezone planner automatically adjust for daylight saving time (DST)?
                </h3>
                <p className="text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed">
                  Yes, fully. Our calculations utilize localized Intl capabilities running with the official IANA database strings. By changing the planned date, the system automatically checks and offsets DST status for each specific region correctly.
                </p>
              </div>
            </div>
          </section>
        </article>

        <RelatedTools currentSlug="timezone-meeting-planner" />

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
