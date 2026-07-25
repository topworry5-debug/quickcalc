import RelatedTools from "@/components/RelatedTools";
import ShareButtons from "@/components/ShareButtons";

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
      },
      {
        "@type": "Question",
        "name": "What is Naegele's Rule?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Naegele's Rule is a standard way of estimating the due date of a pregnancy. It estimates the expected date of delivery (EDD) by adding one year, subtracting three months, and adding seven days to the first day of a woman's last menstrual period (LMP)."
        }
      },
      {
        "@type": "Question",
        "name": "What if I have irregular menstrual cycles?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "If your cycles are irregular or differ significantly from the standard 28-day length, using LMP alone can be less precise. In these cases, early dating ultrasounds or tracing the exact day of ovulation/conception are more accurate methods."
        }
      },
      {
        "@type": "Question",
        "name": "Can my estimated due date change?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Yes, it is common for healthcare providers to adjust your estimated due date after performing a first-trimester ultrasound, as fetal physical development measurements in the early weeks offer a highly precise look at gestation."
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
  };

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

        <ShareButtons url="https://quickcalc.cloud/tools/due-date-calculator" title="Due Date Calculator" />

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

          <section className="space-y-4">
            <h2 className="text-2xl font-bold text-zinc-950 dark:text-white">
              How is this calculated?
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
                  How accurate is a due date calculator?
                </h3>
                <p className="text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed">
                  Calculators serve as an excellent screening estimate, but they cannot predict exact labor triggers. Ultrasound scans conducted during the first trimester are clinically considered the most precise method to confirm or adjust gestational dates.
                </p>
              </div>

              <div className="space-y-2">
                <h3 className="text-base font-bold text-zinc-900 dark:text-zinc-100">
                  What is the difference between LMP and conception date methods?
                </h3>
                <p className="text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed">
                  The Last Menstrual Period (LMP) method is the medical standard because most women know the date of their last period better than their conception day. However, since ovulation varies, the Conception Date method (which adds 266 days to fertilization) provides a narrower estimate when fertilization timings are certain.
                </p>
              </div>

              <div className="space-y-2">
                <h3 className="text-base font-bold text-zinc-900 dark:text-zinc-100">
                  How many weeks is a full-term pregnancy?
                </h3>
                <p className="text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed">
                  A standard full-term pregnancy is defined as 39 weeks 0 days to 40 weeks 6 days. Babies born during this window have had the optimal time to mature, particularly in relation to brain, lung, and liver development.
                </p>
              </div>

              <div className="space-y-2">
                <h3 className="text-base font-bold text-zinc-900 dark:text-zinc-100">
                  What is Naegele{"'"}s Rule?
                </h3>
                <p className="text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed">
                  Naegele{"'"}s Rule is a standard way of estimating the due date of a pregnancy. It estimates the expected date of delivery (EDD) by adding one year, subtracting three months, and adding seven days to the first day of a {"woman's"} last menstrual period (LMP).
                </p>
              </div>

              <div className="space-y-2">
                <h3 className="text-base font-bold text-zinc-900 dark:text-zinc-100">
                  What if I have irregular menstrual cycles?
                </h3>
                <p className="text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed">
                  If your cycles are irregular or differ significantly from the standard 28-day length, using LMP alone can be less precise. In these cases, early dating ultrasounds or tracing the exact day of ovulation/conception are more accurate methods.
                </p>
              </div>

              <div className="space-y-2">
                <h3 className="text-base font-bold text-zinc-900 dark:text-zinc-100">
                  Can my estimated due date change?
                </h3>
                <p className="text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed">
                  Yes, it is common for healthcare providers to adjust your estimated due date after performing a first-trimester ultrasound, as fetal physical development measurements in the early weeks offer a highly precise look at gestation.
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
