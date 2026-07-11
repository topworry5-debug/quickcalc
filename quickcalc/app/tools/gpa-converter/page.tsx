import type { Metadata } from "next";
import Link from "next/link";
import GPAConverterWidget from "./GPAConverterWidget";
import Footer from "@/components/Footer";
import AdSlot from "@/components/AdSlot";

export const metadata: Metadata = {
  title: "GPA Converter - Convert Grades & Percentage to 4.0 Scale",
  description: "Convert percentage grades or letter grades from the US, UK, Canada, Pakistan, and India to the standard US 4.0 GPA scale easily.",
  alternates: {
    canonical: "/tools/gpa-converter",
  },
};

export default function GPAConverterPage() {
  const faqData = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      {
        "@type": "Question",
        "name": "What is a standard US 4.0 GPA?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "The 4.0 GPA scale is the standard grading system used by high schools and universities in the United States. In this scale, an 'A' grade is worth 4.0 points, a 'B' is worth 3.0 points, a 'C' is worth 2.0 points, a 'D' is worth 1.0 point, and an 'F' represents 0 points."
        }
      },
      {
        "@type": "Question",
        "name": "How do you convert percentage marks to a 4.0 GPA scale?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Converting percentages to a GPA requires mapping the percentage value to its corresponding letter grade and points. For example, in the US, a percentage of 90-100% typically corresponds to an 'A' or 'A-', which translates to a GPA between 3.7 and 4.0."
        }
      },
      {
        "@type": "Question",
        "name": "Do universities accept online GPA converters?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Online GPA converters are excellent for estimation and planning. However, when applying to colleges, most universities require an official transcript evaluation from accredited services like WES (World Education Services) or their own internal admissions board to verify GPA conversion."
        }
      }
    ]
  };

  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-zinc-950 text-zinc-900 dark:text-zinc-100 font-[family-name:var(--font-geist-sans)]">
      {/* JSON-LD Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqData) }}
      />

      {/* Navigation Header */}
      <header className="border-b border-zinc-200 dark:border-zinc-800 bg-white/80 dark:bg-zinc-900/80 backdrop-blur-md sticky top-0 z-50">
        <div className="max-w-4xl mx-auto px-4 h-16 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2 font-bold text-lg text-emerald-600 dark:text-emerald-400">
            <span>🎓 QuickCalc</span>
          </Link>
          <nav className="flex gap-4">
            <Link href="/" className="text-sm font-medium text-zinc-600 dark:text-zinc-400 hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors">
              Home
            </Link>
            <span className="text-sm font-medium text-zinc-300 dark:text-zinc-700">|</span>
            <span className="text-sm font-medium text-zinc-400 dark:text-zinc-600">GPA Converter</span>
          </nav>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="max-w-4xl mx-auto px-4 py-8 sm:py-12">
        <div className="text-center max-w-2xl mx-auto mb-8">
          <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-zinc-900 dark:text-white mb-4">
            GPA Converter
          </h1>
          <p className="text-base sm:text-lg text-zinc-600 dark:text-zinc-400 leading-relaxed">
            The GPA Converter is a comprehensive, multi-regional grading tool designed to convert international grades and percentages into the standard US 4.0 GPA scale. Whether you are dealing with US percentage values, letter grades, United Kingdom degree classifications, or percentage-based systems from Canada, Pakistan, and India, this free tool calculates your equivalent GPA instantly. Perfect for study-abroad applicants, international transfer students, and academic advisors looking for reliable, standardized conversions.
          </p>
        </div>

        {/* Interactive Calculator Widget Component */}
        <section className="my-8">
          <GPAConverterWidget />
        </section>

        {/* AdSense Placement Ad-Slot-Inline */}
        <AdSlot slot="gpa-converter-inline" />

        {/* Detailed Article Sections */}
        <article className="prose prose-zinc dark:prose-invert max-w-3xl mx-auto space-y-8 mt-12 border-t border-zinc-200 dark:border-zinc-800 pt-10">
          <section className="space-y-4">
            <h2 className="text-2xl font-bold text-zinc-950 dark:text-white">
              About this calculator
            </h2>
            <p className="text-zinc-600 dark:text-zinc-400 leading-relaxed">
              Grade Point Average (GPA) is more than just a number; it is a universally recognized standard of academic achievement. However, because education systems around the globe are organized differently, comparing performance across borders can be incredibly difficult. For instance, the UK uses honors classifications like First Class and Upper Second Class, while countries in South Asia like India and Pakistan measure academic success as an aggregate percentage of marks. 
            </p>
            <p className="text-zinc-600 dark:text-zinc-400 leading-relaxed">
              Our GPA Converter bridges this gap by offering standard, widely accepted mathematical mappings to the traditional United States 4.00 scale. In this system, grade boundaries are cleanly aligned. For percentage grades in the United States, scores above 93% map directly to a perfect 4.00, while scores ranging from 90% to 92% yield a 3.70 GPA. For Canadian and Pakistani/Indian marks, the converter accounts for regional grade-inflation differences and university admission averages to deliver highly accurate estimations.
            </p>
            <p className="text-zinc-600 dark:text-zinc-400 leading-relaxed">
              Using this converter, prospective students can self-assess their competitiveness for college applications. It is also an invaluable tool for recruiters and admission officers seeking to quickly review international transcripts. While this calculator serves as a high-fidelity planning resource, please consult your prospective institution to verify if they require a certified third-party credit evaluation.
            </p>
          </section>

          {/* FAQ Accordion Section */}
          <section className="space-y-4 border-t border-zinc-200 dark:border-zinc-800 pt-8">
            <h2 className="text-2xl font-bold text-zinc-950 dark:text-white">
              Frequently Asked Questions (FAQ)
            </h2>
            <div className="space-y-3">
              <details className="group border border-zinc-200 dark:border-zinc-800 rounded-lg p-4 bg-white dark:bg-zinc-900 transition-all duration-150 [&_summary::-webkit-details-marker]:hidden">
                <summary className="flex justify-between items-center font-semibold text-zinc-800 dark:text-zinc-200 cursor-pointer focus:outline-none">
                  <span>What is a standard US 4.0 GPA?</span>
                  <span className="transition group-open:rotate-180 text-zinc-400 dark:text-zinc-500">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" className="w-5 h-5">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
                    </svg>
                  </span>
                </summary>
                <p className="text-zinc-600 dark:text-zinc-400 mt-3 text-sm leading-relaxed">
                  {"The 4.0 GPA scale is the standard grading system used by high schools and universities in the United States. In this scale, an 'A' grade is worth 4.0 points, a 'B' is worth 3.0 points, a 'C' is worth 2.0 points, a 'D' is worth 1.0 point, and an 'F' represents 0 points."}
                </p>
              </details>

              <details className="group border border-zinc-200 dark:border-zinc-800 rounded-lg p-4 bg-white dark:bg-zinc-900 transition-all duration-150 [&_summary::-webkit-details-marker]:hidden">
                <summary className="flex justify-between items-center font-semibold text-zinc-800 dark:text-zinc-200 cursor-pointer focus:outline-none">
                  <span>How do you convert percentage marks to a 4.0 GPA scale?</span>
                  <span className="transition group-open:rotate-180 text-zinc-400 dark:text-zinc-500">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" className="w-5 h-5">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
                    </svg>
                  </span>
                </summary>
                <p className="text-zinc-600 dark:text-zinc-400 mt-3 text-sm leading-relaxed">
                  {"Converting percentages to a GPA requires mapping the percentage value to its corresponding letter grade and points. For example, in the US, a percentage of 90-100% typically corresponds to an 'A' or 'A-', which translates to a GPA between 3.7 and 4.0."}
                </p>
              </details>

              <details className="group border border-zinc-200 dark:border-zinc-800 rounded-lg p-4 bg-white dark:bg-zinc-900 transition-all duration-150 [&_summary::-webkit-details-marker]:hidden">
                <summary className="flex justify-between items-center font-semibold text-zinc-800 dark:text-zinc-200 cursor-pointer focus:outline-none">
                  <span>Do universities accept online GPA converters?</span>
                  <span className="transition group-open:rotate-180 text-zinc-400 dark:text-zinc-500">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" className="w-5 h-5">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
                    </svg>
                  </span>
                </summary>
                <p className="text-zinc-600 dark:text-zinc-400 mt-3 text-sm leading-relaxed">
                  Online GPA converters are excellent for estimation and planning. However, when applying to colleges, most universities require an official transcript evaluation from accredited services like WES (World Education Services) or their own internal admissions board to verify GPA conversion.
                </p>
              </details>
            </div>
          </section>
        </article>

        {/* Related Tools Area */}
        <section className="max-w-3xl mx-auto border-t border-zinc-200 dark:border-zinc-800 mt-12 pt-8">
          <h3 className="text-xl font-bold text-zinc-900 dark:text-white mb-6">
            Related Health & Lifestyle Tools
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 p-5 rounded-xl hover:shadow-md transition duration-200">
              <span className="text-2xl mb-2 block">💧</span>
              <h4 className="font-bold text-zinc-900 dark:text-white text-base">Water Intake Calculator</h4>
              <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-2">
                Calculate your optimal hydration targets based on weight and activity.
              </p>
              <Link href="/tools/water-intake-calculator" className="inline-block text-xs font-semibold text-emerald-500 dark:text-emerald-400 mt-4 hover:underline">
                Use Tool &rarr;
              </Link>
            </div>

            <div className="border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 p-5 rounded-xl hover:shadow-md transition duration-200">
              <span className="text-2xl mb-2 block">🌙</span>
              <h4 className="font-bold text-zinc-900 dark:text-white text-base">Sleep Calculator</h4>
              <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-2">
                Calculate optimal sleep cycles and waking hours to prevent morning grogginess.
              </p>
              <Link href="/tools/sleep-cycle-calculator" className="inline-block text-xs font-semibold text-emerald-500 dark:text-emerald-400 mt-4 hover:underline">
                Use Tool &rarr;
              </Link>
            </div>

            <div className="border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 p-5 rounded-xl hover:shadow-md transition duration-200">
              <span className="text-2xl mb-2 block">⚖️</span>
              <h4 className="font-bold text-zinc-900 dark:text-white text-base">BMI Calculator</h4>
              <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-2">
                Calculate your Body Mass Index (BMI) to understand your weight status.
              </p>
              <span className="inline-block text-xs font-semibold text-zinc-400 dark:text-zinc-600 mt-4 cursor-default">
                Coming soon
              </span>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <Footer customText="Standardized global educational converters." />
    </div>
  );
}
