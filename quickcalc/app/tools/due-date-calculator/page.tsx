import ThemeToggle from "@/components/ThemeToggle";

import Breadcrumbs from "@/components/Breadcrumbs";

import type { Metadata } from "next";
import Link from "next/link";
import DueDateCalculatorWidget from "./DueDateCalculatorWidget";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "Due Date Calculator - Warm Visual Pregnancy Tracker | QuickCalc",
  description: "Calculate your estimated due date, current trimester, and pregnancy milestones instantly. 100% free with no email required and zero paywalls.",
  alternates: {
    canonical: "/tools/due-date-calculator",
  },
  openGraph: {
    title: "Due Date Calculator - Warm Visual Pregnancy Tracker | QuickCalc",
    description: "Calculate your estimated due date, current trimester, and pregnancy milestones instantly. 100% free with no email required and zero paywalls.",
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
    title: "Due Date Calculator - Warm Visual Pregnancy Tracker | QuickCalc",
    description: "Calculate your estimated due date, current trimester, and pregnancy milestones instantly. 100% free with no email required and zero paywalls.",
    images: ["https://quickcalc.cloud/og-image.png"],
  },
};

export default function DueDateCalculatorPage() {
  const faqData = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      {
        "@type": "Question",
        "name": "How accurate is a due date calculator?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "An online due date calculator provides a highly reliable estimate, but only about 5% of babies are born exactly on their calculated due date. A normal, healthy full-term pregnancy can range anywhere from two weeks before to two weeks after the estimated date."
        }
      },
      {
        "@type": "Question",
        "name": "What's the difference between LMP and conception date methods?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "The Last Menstrual Period (LMP) method calculates your due date by adding 280 days (40 weeks) to the first day of your last period. The Conception Date method adds 266 days (38 weeks) directly to the date of conception, making it ideal if you know the exact day ovulation or conception occurred."
        }
      },
      {
        "@type": "Question",
        "name": "How many weeks is a full-term pregnancy?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "A standard pregnancy is calculated as lasting 40 weeks (280 days). A pregnancy is clinically considered 'early term' between 37 weeks 0 days and 38 weeks 6 days, 'full term' between 39 weeks 0 days and 40 weeks 6 days, and 'late term' at 41 weeks."
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
          <Link href="/" className="flex items-center gap-2 font-bold text-lg text-rose-600 dark:text-rose-400">
            <span>⚖️ QuickCalc</span>
          </Link>
          <nav className="flex items-center gap-2 sm:gap-4">
            <Link href="/" className="text-sm font-medium text-zinc-600 dark:text-zinc-400 hover:text-rose-600 dark:hover:text-rose-400 transition-colors">
              Home
            </Link>
            <Link href="/blog" className="text-sm font-medium text-zinc-600 dark:text-zinc-400 hover:text-rose-600 dark:hover:text-rose-400 transition-colors">
              Blog
            </Link>
            <span className="text-sm font-medium text-zinc-300 dark:text-zinc-700 font-normal">|</span>
            <span className="text-sm font-medium text-zinc-300 dark:text-zinc-700">|</span>
            <span className="text-sm font-medium text-zinc-400 dark:text-zinc-600">Due Date Calculator</span>
            <span className="text-sm font-medium text-zinc-300 dark:text-zinc-700 font-normal">|</span>
            <ThemeToggle />
          </nav>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-4xl mx-auto px-4 py-8 sm:py-12">
        <Breadcrumbs toolName="Due Date Calculator" toolSlug="due-date-calculator" />
        <div className="text-center max-w-2xl mx-auto mb-8">
          <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-zinc-900 dark:text-white mb-4">
            Due Date Calculator
          </h1>
          <p className="text-base sm:text-lg text-zinc-600 dark:text-zinc-400 leading-relaxed">
            Estimate your {"baby's"} arrival date and track your gestational milestones in real time. Unlike heavy, ad-cluttered platforms that force account registration or app downloads, QuickCalc delivers clear, compassionate, and mathematically precise answers instantly.
          </p>
        </div>

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
              About this Due Date Calculator
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
                  <span>How accurate is a due date calculator?</span>
                  <span className="transition group-open:rotate-180 text-zinc-400 dark:text-zinc-500">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" className="w-5 h-5">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
                    </svg>
                  </span>
                </summary>
                <p className="text-zinc-600 dark:text-zinc-400 mt-3 text-sm leading-relaxed">
                  Calculators serve as an excellent screening estimate, but they cannot predict exact labor triggers. Ultrasound scans conducted during the first trimester are clinically considered the most precise method to confirm or adjust gestational dates.
                </p>
              </details>

              <details className="group border border-zinc-200 dark:border-zinc-800 rounded-lg p-4 bg-white dark:bg-zinc-900 transition-all duration-150 [&_summary::-webkit-details-marker]:hidden">
                <summary className="flex justify-between items-center font-semibold text-zinc-800 dark:text-zinc-200 cursor-pointer focus:outline-none">
                  <span>What is the difference between LMP and conception date methods?</span>
                  <span className="transition group-open:rotate-180 text-zinc-400 dark:text-zinc-500">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" className="w-5 h-5">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
                    </svg>
                  </span>
                </summary>
                <p className="text-zinc-600 dark:text-zinc-400 mt-3 text-sm leading-relaxed">
                  The Last Menstrual Period (LMP) method is the medical standard because most women know the date of their last period better than their conception day. However, since ovulation varies, the Conception Date method (which adds 266 days to fertilization) provides a narrower estimate when fertilization timings are certain.
                </p>
              </details>

              <details className="group border border-zinc-200 dark:border-zinc-800 rounded-lg p-4 bg-white dark:bg-zinc-900 transition-all duration-150 [&_summary::-webkit-details-marker]:hidden">
                <summary className="flex justify-between items-center font-semibold text-zinc-800 dark:text-zinc-200 cursor-pointer focus:outline-none">
                  <span>How many weeks is a full-term pregnancy?</span>
                  <span className="transition group-open:rotate-180 text-zinc-400 dark:text-zinc-500">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" className="w-5 h-5">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
                    </svg>
                  </span>
                </summary>
                <p className="text-zinc-600 dark:text-zinc-400 mt-3 text-sm leading-relaxed">
                  A standard full-term pregnancy is defined as 39 weeks 0 days to 40 weeks 6 days. Babies born during this window have had the optimal time to mature, particularly in relation to brain, lung, and liver development.
                </p>
              </details>
            </div>
          </section>
        </article>

        {/* Related Tools */}
        <section className="max-w-3xl mx-auto border-t border-zinc-200 dark:border-zinc-800 mt-12 pt-8">
          <h3 className="text-xl font-bold text-zinc-900 dark:text-white mb-6">
            Related Health & Lifestyle Tools
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 p-5 rounded-xl hover:shadow-md transition duration-200">
              <span className="text-2xl mb-2 block">⚖️</span>
              <h4 className="font-bold text-zinc-900 dark:text-white text-base">BMI Calculator</h4>
              <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-2">
                Calculate your Body Mass Index (BMI) and evaluate general weight trends using live visualization.
              </p>
              <Link href="/tools/bmi-calculator" className="inline-block text-xs font-semibold text-rose-500 dark:text-rose-400 mt-4 hover:underline">
                Use Tool &rarr;
              </Link>
            </div>

            <div className="border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 p-5 rounded-xl hover:shadow-md transition duration-200">
              <span className="text-2xl mb-2 block">💧</span>
              <h4 className="font-bold text-zinc-900 dark:text-white text-base">Water Intake</h4>
              <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-2">
                Calculate your optimal hydration targets based on body weight and activity.
              </p>
              <Link href="/tools/water-intake-calculator" className="inline-block text-xs font-semibold text-rose-500 dark:text-rose-400 mt-4 hover:underline">
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
      <Footer customText="Gentle, accurate maternal health screeners." />
    </div>
  );
}
