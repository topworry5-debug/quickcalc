import Navbar from "@/components/Navbar";
import { generateSoftwareAppSchema } from "@/lib/schema";
import RelatedTools from "@/components/RelatedTools";
import ShareButtons from "@/components/ShareButtons";
import EmbedWidget from "@/components/EmbedWidget";



import Breadcrumbs from "@/components/Breadcrumbs";

import type { Metadata } from "next";
import DueDateCalculatorWidget from "./DueDateCalculatorWidget";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "Pregnancy Due Date Calculator - Track Gestational Weeks",
  description: "Calculate your estimated pregnancy due date and track gestational milestones week-by-week. Free and private tracker with no sign-up or paywalls.",
  alternates: {
    canonical: "/tools/due-date-calculator",
  },
  openGraph: {
    title: "Pregnancy Due Date Calculator - Track Gestational Weeks",
    description: "Calculate your estimated pregnancy due date and track gestational milestones week-by-week. Free and private tracker with no sign-up or paywalls.",
    url: "https://quickcalc.cloud/tools/due-date-calculator",
    type: "website",
    siteName: "QuickCalc",
    images: [
      {
        url: "https://quickcalc.cloud/og-image.png",
        width: 1200,
        height: 630,
        alt: "Due Date Calculator on QuickCalc",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Pregnancy Due Date Calculator - Track Gestational Weeks",
    description: "Calculate your estimated pregnancy due date and track gestational milestones week-by-week. Free and private tracker with no sign-up or paywalls.",
    images: ["https://quickcalc.cloud/og-image.png"],
  },
};

export default function DueDateCalculatorPage({ searchParams }: { searchParams?: { embed?: string } }) {
  const softwareSchema = generateSoftwareAppSchema({
    name: "Pregnancy Due Date Calculator - Track Gestational Weeks",
    description: "Calculate your estimated pregnancy due date and track gestational milestones week-by-week. Free and private tracker with no sign-up or paywalls.",
    slug: "due-date-calculator",
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
          <DueDateCalculatorWidget />
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
        "name": "How do I calculate my baby's due date from my last menstrual period?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "To understand how to calculate due date from last period, you add exactly 280 days (or 40 weeks) to the first day of your last menstrual period (LMP). This standard clinical method assumes a typical 28-day menstrual cycle where ovulation occurs around day 14."
        }
      },
      {
        "@type": "Question",
        "name": "How accurate is a pregnancy due date calculator compared to an ultrasound?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "While a due date calculator is highly reliable for establishing a target baseline, only about 5% of babies are born exactly on their estimated due date. Most normal, healthy deliveries happen anytime within a four-week window spanning two weeks before and two weeks after the estimated date."
        }
      },
      {
        "@type": "Question",
        "name": "Can I calculate my due date by conception date or IVF transfer date?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Using a due date calculator by conception date is highly accurate if you know the exact day of ovulation or fertilization. Since gestation naturally lasts about 266 days (38 weeks) from conception, the tool calculates your estimated due date by adding 266 days directly to your conception date."
        }
      }
    ]
  };

  const softwareData = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    "name": "Due Date Calculator",
    "operatingSystem": "All",
    "applicationCategory": "HealthApplication",
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
        <Breadcrumbs toolName="Due Date Calculator" toolSlug="due-date-calculator" />
        <div className="text-center max-w-2xl mx-auto mb-8">
          <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-zinc-900 dark:text-white mb-4">
            Due Date Calculator
          </h1>
          <p className="text-base sm:text-lg text-zinc-600 dark:text-zinc-400 leading-relaxed">This free tool calculates estimated pregnancy due dates and trimester milestones using Naegele's rule based on your last menstrual period or conception date. If you want to know how to calculate due date from last period, our free, warm visual pregnancy tracker provides clear and mathematically precise answers instantly. Estimate your {"baby's"} arrival date and track your gestational milestones in real time with absolutely no sign-ups or ad-clutter.</p>
        </div>

        <ShareButtons url="https://quickcalc.cloud/tools/due-date-calculator" title="Due Date Calculator" />
        <EmbedWidget url="https://quickcalc.cloud/tools/due-date-calculator" title="Due Date Calculator" />

        {/* The interactive widget */}
        <section className="my-8">
          <DueDateCalculatorWidget />
        </section>

        {/* Medical Disclaimer */}
        <div className="max-w-2xl mx-auto bg-amber-50 dark:bg-amber-950/20 border border-amber-200/50 dark:border-amber-900/40 rounded-xl p-4 text-xs text-amber-800 dark:text-amber-300 mb-8 leading-relaxed">
          <strong>⚠️ Gentle Health Disclaimer:</strong> This calculator is an educational screening estimate designed to help you visualize general timelines. It does not replace medical advice, diagnostic services, or clinical evaluations. Please consult your physician, midwife, or OB-GYN to establish your official medical due date and guide your prenatal care.
        </div>

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
              About Our Pregnancy Due Date Calculator
            </h2>
            <p className="text-zinc-600 dark:text-zinc-400 leading-relaxed">
              Estimating a pregnancy due date is a mixture of biological patterns and mathematical rules. The most common standard is <strong>Naegele{"'"}s Rule</strong>, named after the 19th-century obstetrician Franz Karl Naegele. This method assumes a standard 28-day menstrual cycle and places ovulation at exactly 14 days, projecting a total pregnancy duration of 40 weeks (280 days) starting from the first day of your Last Menstrual Period (LMP).
            </p>
            <p className="text-zinc-600 dark:text-zinc-400 leading-relaxed">
              If you track ovulation or know the exact date of conception, the calculation becomes even more direct. Because fertilization actually takes place on the day of ovulation, the pregnancy lasts approximately 38 weeks (266 days) from the date of conception.
            </p>
            <p className="text-zinc-600 dark:text-zinc-400 leading-relaxed">
              While calculating your due date is an exciting milestone, it is important to remember that it is merely a helpful anchor. In reality, <strong>only about 5% of babies arrive exactly on their calculated due date</strong>. A normal, full-term delivery window naturally spans anywhere from 37 weeks to 42 weeks, with about two weeks of variation on either side being completely standard and expected.
            </p>
            <p className="text-zinc-600 dark:text-zinc-400 leading-relaxed">
              QuickCalc believes this journey deserves supportive, distraction-free tools. We provide this pregnancy tracker <strong>100% free with absolutely no sign-ups, zero email capture, and zero hidden walls</strong>, allowing you to focus on what truly matters.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-bold text-zinc-950 dark:text-white">
              How Baby Due Date and Gestational Age are Calculated
            </h2>
            <p className="text-zinc-600 dark:text-zinc-400 leading-relaxed">
              We determine your estimated due date (EDD) and current gestational milestone breakdown using standard clinical obstetric algorithms:
            </p>
            <ul className="list-disc pl-6 text-zinc-600 dark:text-zinc-400 space-y-2">
              <li>
                <strong>Last Menstrual Period (LMP) Method:</strong> Adds exactly 280 days (40 weeks) to the first day of your last menstrual period.
              </li>
              <li>
                <strong>Conception Date Method:</strong> Adds exactly 266 days (38 weeks) directly to your known date of conception.
              </li>
              <li>
                <strong>IVF Transfer Method:</strong> Calculates milestones based on transfer date, adding 263 days for a 3-day embryo transfer or 261 days for a 5-day blastocyst transfer.
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
                  How do I calculate my baby's due date from my last menstrual period?
                </h3>
                <p className="text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed">
                  To understand how to calculate due date from last period, you add exactly 280 days (or 40 weeks) to the first day of your last menstrual period (LMP). This standard clinical method assumes a typical 28-day menstrual cycle where ovulation occurs around day 14.
                </p>
              </div>

              <div className="space-y-2">
                <h3 className="text-base font-bold text-zinc-900 dark:text-zinc-100">
                  How accurate is a pregnancy due date calculator compared to an ultrasound?
                </h3>
                <p className="text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed">
                  While a due date calculator is highly reliable for establishing a target baseline, only about 5% of babies are born exactly on their estimated due date. Most normal, healthy deliveries happen anytime within a four-week window spanning two weeks before and two weeks after the estimated date.
                </p>
              </div>

              <div className="space-y-2">
                <h3 className="text-base font-bold text-zinc-900 dark:text-zinc-100">
                  Can I calculate my due date by conception date or IVF transfer date?
                </h3>
                <p className="text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed">
                  Using a due date calculator by conception date is highly accurate if you know the exact day of ovulation or fertilization. Since gestation naturally lasts about 266 days (38 weeks) from conception, the tool calculates your estimated due date by adding 266 days directly to your conception date.
                </p>
              </div>
            </div>
          </section>
        </article>

        <RelatedTools currentSlug="due-date-calculator" />

        {/* Ad Placement Footer */}
        <div className="ad-slot ad-slot--footer mt-12" data-ad-position="footer">
          <div className="ad-placeholder-label border border-dashed border-zinc-300 dark:border-zinc-800 rounded-xl py-4 flex items-center justify-center bg-zinc-50/50 dark:bg-zinc-950/20 text-[10px] font-bold text-zinc-400 dark:text-zinc-600 uppercase tracking-widest cursor-default">
            Advertisement
          </div>
        </div>
      </main>

      {/* Footer */}
      <Footer customText="Gentle, accurate maternal health screeners." />
    </div>
  );
}
