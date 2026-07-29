import RelatedTools from "@/components/RelatedTools";
import ShareButtons from "@/components/ShareButtons";
import EmbedWidget from "@/components/EmbedWidget";

import ThemeToggle from "@/components/ThemeToggle";
import Breadcrumbs from "@/components/Breadcrumbs";
import type { Metadata } from "next";
import Link from "next/link";
import PaceCalculatorWidget from "./PaceCalculatorWidget";
import Footer from "@/components/Footer";
import AdSlot from "@/components/AdSlot";

export const metadata: Metadata = {
  title: "Pace Calculator: Convert Running Pace, Time & Distance",
  description: "Calculate running pace, finish time, and distance with our 3-in-1 pace calculator. View instant race predictor times for 5K, 10K, half, and marathons.",
  alternates: {
    canonical: "/tools/pace-calculator",
  },
};

export default function PaceCalculatorPage({ searchParams }: { searchParams?: { embed?: string } }) {
  const isEmbed = searchParams?.embed === "true";
  if (isEmbed) {
    return (
      <div className="min-h-screen bg-white dark:bg-zinc-950 text-zinc-900 dark:text-zinc-100 font-[family-name:var(--font-geist-sans)] transition-colors p-2 flex flex-col justify-between">
        <main className="max-w-4xl mx-auto w-full">
          <PaceCalculatorWidget />
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
        "name": "How do I calculate my running pace?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "To calculate your running pace manually, divide your total running time by the total distance covered. For example, if you run 5 kilometers in 25 minutes, you divide 25 by 5 to get a pace of 5 minutes per kilometer. Our pace calculator automates this math instantly for both kilometers and miles simultaneously."
        }
      },
      {
        "@type": "Question",
        "name": "What is a good 5K pace for beginners?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "For beginner runners, a good 5K pace is generally between 8 to 11 minutes per mile (5:00 to 6:50 minutes per kilometer). This results in a total 5K finish time of approximately 25 to 35 minutes. Your starting pace depends heavily on age, gender, and baseline physical fitness, but consistency will naturally improve it."
        }
      },
      {
        "@type": "Question",
        "name": "How do I convert minutes per mile to minutes per kilometer?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "To convert minutes per mile to minutes per kilometer, multiply your mile pace in decimal form by 0.62137. Alternatively, to go from kilometers to miles, divide your kilometer pace by 0.62137. This 3-in-1 pace tool displays both km and mile conversion side-by-side automatically, eliminating manual math entirely."
        }
      },
      {
        "@type": "Question",
        "name": "Can I use my current pace to predict my marathon time?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Yes, you can use your current training pace to estimate marathon finish times, but a flat calculation serves only as a baseline. Real-world race results are heavily impacted by accumulated fatigue, course terrain, elevation profile, weather conditions, and fueling strategies, which usually slow runners down over longer distances."
        }
      },
      {
        "@type": "Question",
        "name": "What's the difference between pace and speed?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Pace measures the time it takes to cover a specific unit of distance, typically expressed in minutes per kilometer or minutes per mile. In contrast, speed measures the distance covered in a specific unit of time, such as kilometers per hour (km/h) or miles per hour (mph). Runners usually prefer pace as it is easier to track."
        }
      }
    ]
  };

  const articleData = {
    "@context": "https://schema.org",
    "@type": "Article",
    "headline": "Pace Calculator: Convert Running Pace, Time & Distance",
    "description": "A comprehensive guide and tool to calculate running pace, distance, and time with live race finish predictions.",
    "author": {
      "@type": "Organization",
      "name": "QuickCalc"
    },
    "publisher": {
      "@type": "Organization",
      "name": "QuickCalc",
      "logo": {
        "@type": "ImageObject",
        "url": "https://quickcalc.cloud/logo.png"
      }
    },
    "datePublished": "2026-07-26",
    "mainEntityOfPage": "https://quickcalc.cloud/tools/pace-calculator"
  };

  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-zinc-950 text-zinc-900 dark:text-zinc-100 font-[family-name:var(--font-geist-sans)]">
      {/* JSON-LD Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqData) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleData) }}
      />

      {/* Navigation Header */}
      <header className="border-b border-zinc-200 dark:border-zinc-800 bg-white/80 dark:bg-zinc-900/80 backdrop-blur-md sticky top-0 z-50">
        <div className="max-w-4xl mx-auto px-4 h-16 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2 font-bold text-lg text-blue-600 dark:text-blue-400">
            <span>🏃 QuickCalc</span>
          </Link>
          <nav className="flex gap-4">
            <Link href="/" className="text-sm font-medium text-zinc-600 dark:text-zinc-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
              Home
            </Link>
            <Link href="/blog" className="text-sm font-medium text-zinc-600 dark:text-zinc-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
              Blog
            </Link>
            <span className="text-sm font-medium text-zinc-300 dark:text-zinc-700">|</span>
            <span className="text-sm font-medium text-zinc-400 dark:text-zinc-600">Pace Calculator</span>
            <span className="text-sm font-medium text-zinc-300 dark:text-zinc-700">|</span>
            <ThemeToggle />
          </nav>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="max-w-4xl mx-auto px-4 py-8 sm:py-12">
        <Breadcrumbs toolName="Pace Calculator" toolSlug="pace-calculator" />
        
        <div className="text-center max-w-2xl mx-auto mb-8">
          <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-zinc-900 dark:text-white mb-4">
            Pace Calculator: Convert Running Pace, Time & Distance
          </h1>
          
          {/* Tight 50-70 word direct-answer paragraph */}
          <p className="text-base sm:text-lg text-zinc-700 dark:text-zinc-300 font-medium leading-relaxed bg-blue-50/50 dark:bg-blue-950/10 p-4 rounded-xl border border-blue-100 dark:border-blue-950/50">
            A running pace is the rate at which you cover ground, typically measured as the time required to complete one kilometer or one mile. In athletics, running pace operates as a direct mathematical ratio linking distance to time, which serves as the core metric for evaluating physical exertion, pacing strategies, and overall athletic progression.
          </p>
        </div>

        <ShareButtons url="https://quickcalc.cloud/tools/pace-calculator" title="Pace Calculator: Convert Running Pace, Time & Distance" />
        <EmbedWidget url="https://quickcalc.cloud/tools/pace-calculator" title="Pace Calculator: Convert Running Pace, Time & Distance" />

        {/* Interactive Calculator Widget Component */}
        <section className="my-8">
          <PaceCalculatorWidget />
        </section>

        {/* AdSense Placement Ad-Slot-Inline */}
        <AdSlot slot="pace-calculator-inline" />

        {/* Detailed Article Sections */}
        <article className="prose prose-zinc dark:prose-invert max-w-3xl mx-auto space-y-8 mt-12 border-t border-zinc-200 dark:border-zinc-800 pt-10">
          <section className="space-y-4">
            <h2 className="text-2xl font-bold text-zinc-950 dark:text-white">
              About this calculator
            </h2>
            <p className="text-zinc-600 dark:text-zinc-400 leading-relaxed">
              Understanding the math behind your running performance is essential whether you are preparing for your first 5K or training for an elite-level marathon. The primary formulas linking these elements are direct: Pace equals Time divided by Distance, Time equals Distance multiplied by Pace, and Distance equals Time divided by Pace. Balancing these variables lets you formulate highly customized strategies for race day, ensuring you do not start too fast and risk premature fatigue.
            </p>
            <p className="text-zinc-600 dark:text-zinc-400 leading-relaxed">
              However, executing a perfect pacing strategy involves more than just numbers. Our built-in race time predictor assumes a flat pacing strategy where your pace remains entirely constant. In real-world environments, factors like cumulative fatigue, muscular endurance, heat index, and course terrain dramatically influence your final times. While our predictor helps you set ideal target paces, matching those estimates requires rigorous training, structured nutrition, and using tools like the <Link href="/tools/calorie-calculator" className="text-blue-600 dark:text-blue-400 hover:underline">Calorie Calculator</Link> to ensure you are properly fueled for high-mileage runs.
            </p>
            <p className="text-zinc-600 dark:text-zinc-400 leading-relaxed">
              Using our 3-in-1 tool, you can seamlessly transition between different calculations depending on your current training objectives. If you know your target race time, you can instantly find your target pace. If you have a specific pace you want to maintain, you can see how far you will go in a given time or predict your finish times across standard race milestones. Showing live kilometer and mile translations side-by-side lets you analyze pacing from any angle without dealing with complex manual conversions.
            </p>
          </section>

          {/* FAQ Section */}
          <section className="space-y-4 border-t border-zinc-200 dark:border-zinc-800 pt-8">
            <h2 className="text-2xl font-bold text-zinc-950 dark:text-white border-b border-zinc-100 dark:border-zinc-900 pb-2">
              Frequently Asked Questions (FAQ)
            </h2>
            <div className="space-y-6">
              <div className="space-y-2">
                <h3 className="text-base font-bold text-zinc-900 dark:text-zinc-100">
                  How do I calculate my running pace?
                </h3>
                <p className="text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed">
                  To calculate your running pace manually, divide your total running time by the total distance covered. For example, if you run 5 kilometers in 25 minutes, you divide 25 by 5 to get a pace of 5 minutes per kilometer. Our pace calculator automates this math instantly for both kilometers and miles simultaneously.
                </p>
              </div>

              <div className="space-y-2">
                <h3 className="text-base font-bold text-zinc-900 dark:text-zinc-100">
                  What is a good 5K pace for beginners?
                </h3>
                <p className="text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed">
                  For beginner runners, a good 5K pace is generally between 8 to 11 minutes per mile (5:00 to 6:50 minutes per kilometer). This results in a total 5K finish time of approximately 25 to 35 minutes. Your starting pace depends heavily on age, gender, and baseline physical fitness, but consistency will naturally improve it.
                </p>
              </div>

              <div className="space-y-2">
                <h3 className="text-base font-bold text-zinc-900 dark:text-zinc-100">
                  How do I convert minutes per mile to minutes per kilometer?
                </h3>
                <p className="text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed">
                  To convert minutes per mile to minutes per kilometer, multiply your mile pace in decimal form by 0.62137. Alternatively, to go from kilometers to miles, divide your kilometer pace by 0.62137. This 3-in-1 pace tool displays both km and mile conversion side-by-side automatically, eliminating manual math entirely.
                </p>
              </div>

              <div className="space-y-2">
                <h3 className="text-base font-bold text-zinc-900 dark:text-zinc-100">
                  Can I use my current pace to predict my marathon time?
                </h3>
                <p className="text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed">
                  Yes, you can use your current training pace to estimate marathon finish times, but a flat calculation serves only as a baseline. Real-world race results are heavily impacted by accumulated fatigue, course terrain, elevation profile, weather conditions, and fueling strategies, which usually slow runners down over longer distances.
                </p>
              </div>

              <div className="space-y-2">
                <h3 className="text-base font-bold text-zinc-900 dark:text-zinc-100">
                  What's the difference between pace and speed?
                </h3>
                <p className="text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed">
                  Pace measures the time it takes to cover a specific unit of distance, typically expressed in minutes per kilometer or minutes per mile. In contrast, speed measures the distance covered in a specific unit of time, such as kilometers per hour (km/h) or miles per hour (mph). Runners usually prefer pace as it is easier to track.
                </p>
              </div>
            </div>
          </section>
        </article>

        <RelatedTools currentSlug="pace-calculator" />
      </main>

      {/* Footer */}
      <Footer customText="Elegant, science-backed running solutions." />
    </div>
  );
}
