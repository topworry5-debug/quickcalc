import MethodologyAccordion from "@/components/MethodologyAccordion";
import { Suspense } from "react";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import { generateSoftwareAppSchema } from "@/lib/schema";
import RelatedTools from "@/components/RelatedTools";
import ShareButtons from "@/components/ShareButtons";
import EmbedWidget from "@/components/EmbedWidget";
import Breadcrumbs from "@/components/Breadcrumbs";
import type { Metadata } from "next";
import WorkHoursWidget from "./WorkHoursWidget";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "Work Hours Calculator - Timesheet & Overtime Pay",
  description:
    "Calculate shift hours, unpaid break deductions, overnight work, and weekly gross pay with 1.5x overtime rules. 100% free timesheet calculator.",
  alternates: {
    canonical: "/tools/work-hours-calculator",
  },
  openGraph: {
    title: "Work Hours Calculator - Timesheet & Overtime Pay",
    description:
      "Calculate shift hours, unpaid break deductions, overnight work, and weekly gross pay with 1.5x overtime rules. 100% free timesheet calculator.",
    url: "https://quickcalc.cloud/tools/work-hours-calculator",
    type: "website",
    siteName: "QuickCalc",
    images: [
      {
        url: "https://quickcalc.cloud/og-image.png",
        width: 1200,
        height: 630,
        alt: "Free Work Hours & Timesheet Calculator on QuickCalc",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Work Hours Calculator - Timesheet & Overtime Pay",
    description:
      "Calculate shift hours, unpaid break deductions, overnight work, and weekly gross pay with 1.5x overtime rules. 100% free timesheet calculator.",
  },
};

export default function WorkHoursPage({
  searchParams,
}: {
  searchParams?: { embed?: string };
}) {
  const softwareSchema = generateSoftwareAppSchema({
    name: "Free Work Hours & Timesheet Calculator",
    description:
      "Calculate daily shift hours, unpaid break deductions, overnight work, and weekly gross pay with 1.5x overtime rules. 100% free timesheet calculator.",
    slug: "work-hours-calculator",
    category: "Utility",
  });

  const isEmbed = searchParams?.embed === "true";
  if (isEmbed) {
    return (
      <div className="min-h-screen bg-white dark:bg-zinc-950 text-zinc-900 dark:text-zinc-100 font-[family-name:var(--font-geist-sans)] transition-colors p-2 flex flex-col justify-between">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(softwareSchema) }}
        />
        <main className="max-w-4xl mx-auto w-full">
          <WorkHoursWidget />
        </main>
      </div>
    );
  }

  const faqData = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: "How does the calculator handle overnight shifts crossing midnight?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "When a clock-out time is earlier than the clock-in time (e.g., clock-in at 10:00 PM and clock-out at 6:00 AM), our algorithm recognizes the shift crosses midnight and automatically adds 24 hours (1,440 minutes) to compute the correct 8-hour shift duration.",
        },
      },
      {
        "@type": "Question",
        name: "Are unpaid break minutes automatically deducted?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Yes. For each shift, break minutes are subtracted from the gross shift duration to determine your net working hours eligible for pay.",
        },
      },
      {
        "@type": "Question",
        name: "How is overtime pay calculated?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Under standard Fair Labor Standards Act (FLSA) guidelines, non-exempt hourly employees receive 1.5 times their regular hourly rate for all net working hours exceeding 40 hours in a single workweek.",
        },
      },
      {
        "@type": "Question",
        name: "Can I use 12-hour AM/PM and 24-hour time formats?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Yes. You can toggle between 12-hour (AM/PM) and 24-hour (military time) formats anytime using the settings control panel.",
        },
      },
    ],
  };

  const softwareData = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: "Work Hours / Timesheet Calculator",
    operatingSystem: "All",
    applicationCategory: "BusinessApplication",
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "USD",
    },
  };

  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-zinc-950 text-zinc-900 dark:text-zinc-100 font-[family-name:var(--font-geist-sans)] transition-colors">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqData) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(softwareData) }}
      />

      <Navbar />

      <main className="max-w-4xl mx-auto px-4 py-8 sm:py-12">
        <Breadcrumbs toolName="Work Hours Calculator" toolSlug="work-hours-calculator" />

        <div className="text-center max-w-2xl mx-auto mb-8">
          <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-zinc-900 dark:text-white mb-4">
            Work Hours / Timesheet Calculator
          </h1>
          <p className="text-base sm:text-lg text-zinc-600 dark:text-zinc-400 leading-relaxed">
            Use our <strong>clock in clock out calculator</strong> and <strong>hours calculator with lunch break</strong> to track daily shifts, deduct unpaid rest periods, and compute net working hours. As a complete <strong>timesheet calculator hourly pay</strong> tool with 1.5x overtime rules, you can easily log weekly shifts, handle overnight work crossing midnight, and estimate total gross earnings.
          </p>
        </div>

        <ShareButtons
          url="https://quickcalc.cloud/tools/work-hours-calculator"
          title="Work Hours / Timesheet Calculator"
        />
        <EmbedWidget
          url="https://quickcalc.cloud/tools/work-hours-calculator"
          title="Work Hours / Timesheet Calculator"
        />

        <section className="my-8">
          <Suspense
            fallback={
              <div className="p-8 text-center text-zinc-500 animate-pulse">
                Loading timesheet calculator...
              </div>
            }
          >
            <WorkHoursWidget />
          </Suspense>
        </section>

        <MethodologyAccordion slug="work-hours-calculator" />

        <div className="ad-slot ad-slot--inline" data-ad-position="in-content-1">
          <div className="ad-placeholder-label border border-dashed border-zinc-300 dark:border-zinc-800 rounded-xl py-4 flex items-center justify-center bg-zinc-50/50 dark:bg-zinc-950/20 text-[10px] font-bold text-zinc-400 dark:text-zinc-600 uppercase tracking-widest cursor-default">
            Advertisement
          </div>
        </div>

        <article className="prose prose-zinc dark:prose-invert max-w-3xl mx-auto space-y-8 mt-12 border-t border-zinc-200 dark:border-zinc-800 pt-10">
          <section className="space-y-4">
            <h2 className="text-2xl font-bold text-zinc-950 dark:text-white">
              Understanding Work Hours &amp; Timesheet Calculations
            </h2>
            <p className="text-zinc-600 dark:text-zinc-400 leading-relaxed">
              Accurate work hour tracking is essential for hourly employees, freelancers, independent contractors, and payroll managers. Converting clock-in and clock-out times into decimal hours while accounting for unpaid lunch breaks ensures fair compensation and compliance with labor regulations.
            </p>
            <p className="text-zinc-600 dark:text-zinc-400 leading-relaxed">
              Under the United States Fair Labor Standards Act (FLSA), covered non-exempt employees must receive overtime pay for hours worked over 40 in a single workweek at a rate not less than time-and-one-half (1.5x) their regular rate of pay.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-bold text-zinc-950 dark:text-white">
              Handling Overnight Shifts &amp; Time Formats Correctly
            </h2>
            <p className="text-zinc-600 dark:text-zinc-400 leading-relaxed">
              A major point of confusion in timesheet tracking involves overnight shifts that cross midnight. For example, if a shift starts at 10:00 PM (22:00) and ends at 6:00 AM (06:00), simple subtraction ($6 - 22 = -16$) yields a negative duration.
            </p>
            <p className="text-zinc-600 dark:text-zinc-400 leading-relaxed">
              Our calculator automatically recognizes overnight shifts whenever the clock-out time is earlier than the clock-in time, adding 24 hours (1,440 minutes) to compute the true 8-hour shift duration before deducting unpaid break minutes.
            </p>
            <p className="text-zinc-600 dark:text-zinc-400 leading-relaxed mt-4">
              To estimate post-tax net pay from your gross earnings, check our free{" "}
              <Link
                href="/tools/salary-take-home-calculator"
                className="text-emerald-600 dark:text-emerald-400 font-semibold underline hover:text-emerald-700"
              >
                Salary Take-Home Calculator
              </Link>
              , or use our{" "}
              <Link
                href="/tools/freelance-rate-calculator"
                className="text-teal-600 dark:text-teal-400 font-semibold underline hover:text-teal-700"
              >
                Freelance Rate Calculator
              </Link>{" "}
              to set target billable rates.
            </p>
          </section>

          <div className="ad-slot ad-slot--inline" data-ad-position="in-content-2">
            <div className="ad-placeholder-label border border-dashed border-zinc-300 dark:border-zinc-800 rounded-xl py-4 flex items-center justify-center bg-zinc-50/50 dark:bg-zinc-950/20 text-[10px] font-bold text-zinc-400 dark:text-zinc-600 uppercase tracking-widest cursor-default">
              Advertisement
            </div>
          </div>

          <section className="space-y-4 border-t border-zinc-200 dark:border-zinc-800 pt-8">
            <h2 className="text-2xl font-bold text-zinc-950 dark:text-white border-b border-zinc-100 dark:border-zinc-900 pb-2">
              Frequently Asked Questions (FAQ)
            </h2>
            <div className="space-y-6">
              <div className="space-y-2">
                <h3 className="text-base font-bold text-zinc-900 dark:text-zinc-100">
                  How does the calculator handle overnight shifts crossing midnight?
                </h3>
                <p className="text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed">
                  When a clock-out time is earlier than the clock-in time (e.g., clock-in at 10:00 PM and clock-out at 6:00 AM), our algorithm recognizes the shift crosses midnight and automatically adds 24 hours (1,440 minutes) to compute the correct 8-hour shift duration.
                </p>
              </div>

              <div className="space-y-2">
                <h3 className="text-base font-bold text-zinc-900 dark:text-zinc-100">
                  Are unpaid break minutes automatically deducted?
                </h3>
                <p className="text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed">
                  Yes. For each shift, break minutes are subtracted from the gross shift duration to determine your net working hours eligible for pay.
                </p>
              </div>

              <div className="space-y-2">
                <h3 className="text-base font-bold text-zinc-900 dark:text-zinc-100">
                  How is overtime pay calculated?
                </h3>
                <p className="text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed">
                  Under standard Fair Labor Standards Act (FLSA) guidelines, non-exempt hourly employees receive 1.5 times their regular hourly rate for all net working hours exceeding 40 hours in a single workweek.
                </p>
              </div>

              <div className="space-y-2">
                <h3 className="text-base font-bold text-zinc-900 dark:text-zinc-100">
                  Can I use 12-hour AM/PM and 24-hour time formats?
                </h3>
                <p className="text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed">
                  Yes. You can toggle between 12-hour (AM/PM) and 24-hour (military time) formats anytime using the settings control panel.
                </p>
              </div>
            </div>
          </section>
        </article>

        <RelatedTools currentSlug="work-hours-calculator" />

        <div className="ad-slot ad-slot--footer mt-12" data-ad-position="footer">
          <div className="ad-placeholder-label border border-dashed border-zinc-300 dark:border-zinc-800 rounded-xl py-4 flex items-center justify-center bg-zinc-50/50 dark:bg-zinc-950/20 text-[10px] font-bold text-zinc-400 dark:text-zinc-600 uppercase tracking-widest cursor-default">
            Advertisement
          </div>
        </div>
      </main>

      <Footer customText="Precision timesheet calculations with break deductions, overnight shift support, and overtime gross pay math." />
    </div>
  );
}
