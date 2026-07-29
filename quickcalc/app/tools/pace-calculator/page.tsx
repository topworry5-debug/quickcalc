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
        "name": "How to calculate running pace?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "To understand how to calculate running pace manually, divide your total running time by the total distance covered. For example, if you run 5 kilometers in 25 minutes, you divide 25 by 5 to get a pace of 5 minutes per kilometer. Our pace calculator automates this math instantly for both kilometers and miles simultaneously."
        }
      },
      {
        "@type": "Question",
        "name": "What is a good 5k pace for beginners?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "For beginner runners, what is a good 5k pace for beginners is generally between 8 to 11 minutes per mile (5:00 to 6:50 minutes per kilometer). This results in a total 5K finish time of approximately 25 to 35 minutes, though your starting pace depends heavily on age, gender, and baseline physical fitness."
        }
      },
      {
        "@type": "Question",
        "name": "How does the minutes per mile to km/h conversion work?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "To do a minutes per mile to km/h conversion, you first convert your pace into decimal minutes per mile, divide 60 by that decimal to get miles per hour (mph), and then multiply by 1.60934 to find kilometers per hour (km/h). For example, a 10-minute mile is 6 mph, which converts to approximately 9.66 km/h. Our tool handles these conversions automatically."
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
            If you are trying to figure out how to calculate running pace, distance, or finish times for your next training session, our interactive 3-in-1 Pace Calculator makes it incredibly easy. This tool operates as a direct mathematical ratio linking distance to time, which serves as the core metric for evaluating physical exertion, pacing strategies, and overall athletic progression.
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
                  How to calculate running pace?
                </h3>
                <p className="text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed">
                  To understand how to calculate running pace manually, divide your total running time by the total distance covered. For example, if you run 5 kilometers in 25 minutes, you divide 25 by 5 to get a pace of 5 minutes per kilometer. Our pace calculator automates this math instantly for both kilometers and miles simultaneously.
                </p>
              </div>

              <div className="space-y-2">
                <h3 className="text-base font-bold text-zinc-900 dark:text-zinc-100">
                  What is a good 5k pace for beginners?
                </h3>
                <p className="text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed">
                  For beginner runners, what is a good 5k pace for beginners is generally between 8 to 11 minutes per mile (5:00 to 6:50 minutes per kilometer). This results in a total 5K finish time of approximately 25 to 35 minutes, though your starting pace depends heavily on age, gender, and baseline physical fitness.
                </p>
              </div>

              <div className="space-y-2">
                <h3 className="text-base font-bold text-zinc-900 dark:text-zinc-100">
                  How does the minutes per mile to km/h conversion work?
                </h3>
                <p className="text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed">
                  To do a minutes per mile to km/h conversion, you first convert your pace into decimal minutes per mile, divide 60 by that decimal to get miles per hour (mph), and then multiply by 1.60934 to find kilometers per hour (km/h). For example, a 10-minute mile is 6 mph, which converts to approximately 9.66 km/h. Our tool handles these conversions automatically.
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
