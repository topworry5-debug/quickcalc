import ThemeToggle from "@/components/ThemeToggle";
import Breadcrumbs from "@/components/Breadcrumbs";
import type { Metadata } from "next";
import Link from "next/link";
import AgeCalculatorWidget from "./AgeCalculatorWidget";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "Age Calculator - Find Your Exact Age in Years, Months & Days | QuickCalc",
  description: "Discover your exact age in years, months, and days with our free age calculator. Calculate your total days lived, zodiac sign, generation, and heartbeats lived.",
  alternates: {
    canonical: "/tools/age-calculator",
  },
  openGraph: {
    title: "Age Calculator - Find Your Exact Age in Years, Months & Days | QuickCalc",
    description: "Discover your exact age in years, months, and days with our free age calculator. Calculate your total days lived, zodiac sign, generation, and heartbeats lived.",
    url: "https://quickcalc.cloud/tools/age-calculator",
    type: "website",
    siteName: "QuickCalc",
    images: [
      {
        url: "https://quickcalc.cloud/og-image.png",
        width: 1200,
        height: 630,
        alt: "Age Calculator on QuickCalc",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Age Calculator - Find Your Exact Age in Years, Months & Days | QuickCalc",
    description: "Discover your exact age in years, months, and days with our free age calculator. Calculate your total days lived, zodiac sign, generation, and heartbeats lived.",
    images: ["https://quickcalc.cloud/og-image.png"],
  },
};

export default function AgeCalculatorPage() {
  const faqData = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      {
        "@type": "Question",
        "name": "How do I calculate my exact age?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "To calculate your exact age, subtract your birth date from the current date. First, subtract the days, borrowing from the preceding month if needed. Then, subtract the months, borrowing from the birth year if the birth month is greater than the current month. Finally, subtract the years."
        }
      },
      {
        "@type": "Question",
        "name": "Why does my age in years differ from my age in days divided by 365?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "This difference occurs because a standard calendar year is 365 days, but a leap year occurs every four years, adding an extra day (366 days). Dividing your total days lived by 365 does not account for the additional leap days, resulting in a slight mismatch compared to your chronological age."
        }
      },
      {
        "@type": "Question",
        "name": "What is the difference between chronological age and calculated age?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Chronological age represents the exact time that has elapsed since birth, measured in years, months, and days. Calculated age is the output of mathematical algorithms representing this duration, sometimes rounded or standardized depending on the specific time system used."
        }
      },
      {
        "@type": "Question",
        "name": "How many days old am I?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "The total number of days you have been alive is calculated by finding the absolute difference in milliseconds between your exact birth date and today's date, and then converting that difference into days. This automatically accounts for all leap years that occurred during your lifetime."
        }
      },
      {
        "@type": "Question",
        "name": "What day of the week was I born?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "You can determine the day of the week you were born by mapping your birth date to the Gregorian calendar day index. Our live age calculator instantly looks up your birth date to tell you whether you were born on a Monday, Tuesday, or any other day of the week."
        }
      },
      {
        "@type": "Question",
        "name": "How is a leap year birthday (Feb 29) handled?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "People born on a leap day (February 29) celebrate their birthdays on March 1 or February 28 during non-leap years. Our calculator handles this by celebrating non-leap year birthdays on February 28 to keep the countdown precise within the same birth month."
        }
      },
      {
        "@type": "Question",
        "name": "Can I calculate someone else's age, like a child's or pet's?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Yes! You can enter any birth date from the year 1900 to today. This makes it perfect for finding the exact age of your children, family members, or even your beloved pets to track developmental milestones."
        }
      },
      {
        "@type": "Question",
        "name": "Is this age calculator accurate?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Yes, our age calculator is exceptionally accurate. It uses robust chronological algorithms that carefully calculate standard calendar boundaries, varying month lengths, and exact historical leap years to ensure your age is mathematically sound."
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
            <Link href="/blog" className="text-sm font-medium text-zinc-600 dark:text-zinc-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
              Blog
            </Link>
            <span className="text-sm font-medium text-zinc-300 dark:text-zinc-700">|</span>
            <span className="text-sm font-medium text-zinc-400 dark:text-zinc-600">Age Calculator</span>
            <span className="text-sm font-medium text-zinc-300 dark:text-zinc-700 font-normal">|</span>
            <ThemeToggle />
          </nav>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-4xl mx-auto px-4 py-8 sm:py-12">
        <Breadcrumbs toolName="Age Calculator" toolSlug="age-calculator" />
        
        <div className="text-center max-w-3xl mx-auto mb-8">
          <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-zinc-900 dark:text-white mb-4">
            Exact Age Calculator
          </h1>
          <p className="text-base sm:text-lg text-zinc-600 dark:text-zinc-400 leading-relaxed">
            Knowing your exact age in years, months, and days is highly valuable for a variety of official tasks. Whether you are filling out complex medical forms, verifying official documents, planning upcoming birthdays, or calculating legal age requirements, accuracy is essential. This exact age calculator simplifies the process by performing precise chronological math. Enter your birth date to instantly reveal your personalized life metrics, celestial traits, and a custom shareable age card!
          </p>
        </div>

        {/* Interactive Widget */}
        <section className="my-8">
          <AgeCalculatorWidget />
        </section>

        {/* Ad Placement 1 */}
        <div className="ad-slot ad-slot--inline my-8 animate-pulse" data-ad-position="in-content-1">
          <div className="ad-placeholder-label border border-dashed border-zinc-300 dark:border-zinc-800 rounded-xl py-4 flex items-center justify-center bg-zinc-50/50 dark:bg-zinc-950/20 text-[10px] font-bold text-zinc-400 dark:text-zinc-600 uppercase tracking-widest cursor-default">
            Advertisement
          </div>
        </div>

        {/* Detailed Explanation */}
        <article className="prose prose-zinc dark:prose-invert max-w-3xl mx-auto space-y-8 mt-12 border-t border-zinc-200 dark:border-zinc-800 pt-10">
          
          <section className="space-y-4">
            <h2 className="text-2xl font-bold text-zinc-950 dark:text-white">
              How is age calculated?
            </h2>
            <p className="text-zinc-600 dark:text-zinc-400 leading-relaxed">
              In most western cultures, chronological age is calculated starting from zero at the moment of birth. Each passing year is incremented on your birthday. To compute the exact age between two dates, our chronological age algorithm operates on three distinct levels of standard calendar boundaries:
            </p>
            <ul className="list-disc pl-6 text-zinc-600 dark:text-zinc-400 space-y-2">
              <li>
                <strong>Days Calculation:</strong> Subtracts the birthday day from the current day. If the current day is smaller than the birth day, we borrow the total days of the previous month.
              </li>
              <li>
                <strong>Months Calculation:</strong> Subtracts the birth month from the current month. If the resulting months value is negative, we add 12 to the months and subtract 1 from the total years.
              </li>
              <li>
                <strong>Years Calculation:</strong> Subtracts the birth year from the current year, adjusted by any month-level borrow operation.
              </li>
              <li>
                <strong>Leap Year Compensation:</strong> To correctly calculate total days lived, the algorithm tracks leap years (years divisible by 4, except century years not divisible by 400). A standard year has 365 days, while a leap year contains 366 days, which must be accurately summed up since your date of birth.
              </li>
            </ul>
            <p className="text-zinc-600 dark:text-zinc-400 leading-relaxed mt-2">
              If you are tracking gestational milestones instead, our dedicated <Link href="/tools/due-date-calculator" className="text-blue-600 dark:text-blue-400 hover:underline font-semibold">Due Date Calculator</Link> can help map prenatal timelines. For other mathematical calculations, try our highly responsive <Link href="/tools/percentage-calculator" className="text-blue-600 dark:text-blue-400 hover:underline font-semibold">Percentage Calculator</Link> to analyze proportions and changes instantly.
            </p>
          </section>

          <section className="space-y-4 pt-4">
            <h2 className="text-2xl font-bold text-zinc-950 dark:text-white border-b border-zinc-100 dark:border-zinc-900 pb-2">
              Frequently Asked Questions (FAQ)
            </h2>
            <div className="space-y-6">
              
              <div className="space-y-2">
                <h3 className="text-base font-bold text-zinc-900 dark:text-zinc-100">
                  How do I calculate my exact age?
                </h3>
                <p className="text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed">
                  To find your exact age, perform step-by-step subtraction from the current date back to your birthday. If the current days or months are less than those of your birth date, you must borrow 1 month (adjusted to the actual number of days in that month) or 1 year respectively. Alternatively, enter your birthday above for an instant, certified breakdown.
                </p>
              </div>

              <div className="space-y-2">
                <h3 className="text-base font-bold text-zinc-900 dark:text-zinc-100">
                  Why does my age in years differ from my age in days divided by 365?
                </h3>
                <p className="text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed">
                  This discrepancy happens because of leap years. Every four years, an extra day is added to February (Feb 29) to keep calendar years synchronized with the solar year. When you divide total days by 365, you ignore these extra days, which can skew the result by several days depending on how many leap years you have lived through.
                </p>
              </div>

              <div className="space-y-2">
                <h3 className="text-base font-bold text-zinc-900 dark:text-zinc-100">
                  What is the difference between chronological age and calculated age?
                </h3>
                <p className="text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed">
                  Chronological age is the precise period of time a person has been alive since birth, represented in standard time blocks (years, months, days). Calculated age can sometimes refer to biological calculations, adjusted planetary cycles, or specific cultural systems (like the East Asian age reckoning, which starts at age one at birth).
                </p>
              </div>

              <div className="space-y-2">
                <h3 className="text-base font-bold text-zinc-900 dark:text-zinc-100">
                  How many days old am I?
                </h3>
                <p className="text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed">
                  Your age in days is the total number of full 24-hour periods elapsed since your birth. This matches the exact millisecond differences between both dates divided by the length of a day (86,400,000 milliseconds).
                </p>
              </div>

              <div className="space-y-2">
                <h3 className="text-base font-bold text-zinc-900 dark:text-zinc-100">
                  What day of the week was I born?
                </h3>
                <p className="text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed">
                  The exact weekday you were born depends entirely on the calendar sequence. You can easily find it using our interactive tool, which maps historical days of the week back to the 1900s without requiring manual calendar calculations.
                </p>
              </div>

              <div className="space-y-2">
                <h3 className="text-base font-bold text-zinc-900 dark:text-zinc-100">
                  How is a leap year birthday (Feb 29) handled?
                </h3>
                <p className="text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed">
                  If you were born on a leap day, standard practice dictates that you celebrate your birthday on February 28 or March 1 during non-leap years. Our algorithm calculates non-leap year countdowns assuming February 28, keeping you within the month of February.
                </p>
              </div>

              <div className="space-y-2">
                <h3 className="text-base font-bold text-zinc-900 dark:text-zinc-100">
                  Can I calculate someone else's age, like a child's or pet's?
                </h3>
                <p className="text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed">
                  Absolutely! Simply choose their birth date in the date selector. Our tool is commonly used to track the developmental stages of infants, check chronological legal milestones of adolescents, or figure out pet age statistics.
                </p>
              </div>

              <div className="space-y-2">
                <h3 className="text-base font-bold text-zinc-900 dark:text-zinc-100">
                  Is this age calculator accurate?
                </h3>
                <p className="text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed">
                  Yes. Our tool is programmed using robust JavaScript Date boundaries, which correctly account for leap cycles, specific Gregorian month configurations, and local system offsets, ensuring perfect mathematical accuracy.
                </p>
              </div>

            </div>
          </section>

        </article>

      </main>

      {/* Footer */}
      <Footer customText="Elegant, science-backed lifestyle and chronological suite solutions." />
    </div>
  );
}
