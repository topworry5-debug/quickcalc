import RelatedTools from "@/components/RelatedTools";
import ShareButtons from "@/components/ShareButtons";
import EmbedWidget from "@/components/EmbedWidget";


import ThemeToggle from "@/components/ThemeToggle";

import Breadcrumbs from "@/components/Breadcrumbs";

import type { Metadata } from "next";
import Link from "next/link";
import WaterIntakeCalculatorWidget from "./WaterIntakeCalculatorWidget";
import Footer from "@/components/Footer";
import AdSlot from "@/components/AdSlot";

export const metadata: Metadata = {
  title: "Water Intake Calculator - How Much Water Should You Drink Daily?",
  description: "Calculate your ideal daily water intake in liters and glasses. Get a personalized hydration plan based on weight, activity level, and climate.",
  alternates: {
    canonical: "/tools/water-intake-calculator",
  },
};

export default function WaterIntakeCalculatorPage({ searchParams }: { searchParams?: { embed?: string } }) {
  const isEmbed = searchParams?.embed === "true";
  if (isEmbed) {
    return (
      <div className="min-h-screen bg-white dark:bg-zinc-950 text-zinc-900 dark:text-zinc-100 font-[family-name:var(--font-geist-sans)] transition-colors p-2 flex flex-col justify-between">
        <main className="max-w-4xl mx-auto w-full">
          <WaterIntakeCalculatorWidget />
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
        "name": "How many glasses of water should I drink a day?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "While the traditional '8 glasses a day' is a simple rule of thumb, our calculator provides a personalized target based on your weight and activity. For an average adult, this is typically between 9 and 13 glasses (2.2 to 3.2 liters) per day."
        }
      },
      {
        "@type": "Question",
        "name": "What are the signs of mild dehydration?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Early symptoms of dehydration include dry mouth, dark yellow or amber-colored urine, fatigue, headaches, dizziness, and muscle cramps. If you feel thirsty, your body is already mildly dehydrated."
        }
      },
      {
        "@type": "Question",
        "name": "Can I drink too much water?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Yes, drinking excessive amounts of water can lead to hyponatremia, a rare but serious condition where blood sodium levels become dangerously low. This usually only occurs during extreme endurance events when vast quantities of plain water are consumed without replacing lost electrolytes."
        }
      },
      {
        "@type": "Question",
        "name": "How does climate affect my daily water needs?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Hotter and more humid climates require a higher water intake because your body loses more fluids through sweat to maintain a stable temperature. It is recommended to add at least 500 ml (approx. 2 glasses) to your daily baseline in warm climates."
        }
      },
      {
        "@type": "Question",
        "name": "Does tea or coffee count toward my daily water intake?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Yes, caffeinated beverages like tea and coffee do contribute to your daily fluid intake. While caffeine has a mild diuretic effect, the water content in these drinks outweighs the fluid loss for regular caffeine consumers."
        }
      },
      {
        "@type": "Question",
        "name": "Is water intake calculated differently for pregnant or breastfeeding individuals?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Yes, pregnant and breastfeeding individuals need significantly more water to support fetal development and breast milk production. It is recommended to consult a doctor to establish your customized fluid guidelines during these periods."
        }
      }
    ]
  };

  const softwareData = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    "name": "Water Intake Calculator",
    "operatingSystem": "All",
    "applicationCategory": "HealthApplication",
    "offers": {
      "@type": "Offer",
      "price": "0",
      "priceCurrency": "USD"
    }
  };

  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-zinc-950 text-zinc-900 dark:text-zinc-100 font-[family-name:var(--font-geist-sans)]">
      {/* JSON-LD Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqData) }}
      />
      {/* Software Application Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(softwareData) }}
      />

      {/* Navigation Header */}
      <header className="border-b border-zinc-200 dark:border-zinc-800 bg-white/80 dark:bg-zinc-900/80 backdrop-blur-md sticky top-0 z-50">
        <div className="max-w-4xl mx-auto px-4 h-16 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2 font-bold text-lg text-blue-600 dark:text-blue-400">
            <span>💧 QuickCalc</span>
          </Link>
          <nav className="flex gap-4">
            <Link href="/" className="text-sm font-medium text-zinc-600 dark:text-zinc-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
              Home
            </Link>
            <Link href="/blog" className="text-sm font-medium text-zinc-600 dark:text-zinc-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
              Blog
            </Link>
            <span className="text-sm font-medium text-zinc-300 dark:text-zinc-700 font-normal">|</span>
            <span className="text-sm font-medium text-zinc-300 dark:text-zinc-700">|</span>
            <span className="text-sm font-medium text-zinc-400 dark:text-zinc-600">Water Intake</span>
            <span className="text-sm font-medium text-zinc-300 dark:text-zinc-700 font-normal">|</span>
            <ThemeToggle />
          </nav>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="max-w-4xl mx-auto px-4 py-8 sm:py-12">
        <Breadcrumbs toolName="Water Intake Calculator" toolSlug="water-intake-calculator" />
        <div className="text-center max-w-2xl mx-auto mb-8">
          <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-zinc-900 dark:text-white mb-4">
            Water Intake Calculator
          </h1>
          <p className="text-base sm:text-lg text-zinc-600 dark:text-zinc-400 leading-relaxed">
            The Water Intake Calculator is an easy-to-use, science-backed tool designed to help you determine your optimal daily hydration requirements. By analyzing key factors such as your body weight, physical activity level, and local climate conditions, this free tool computes a personalized hydration plan tailored directly to your lifestyle. Staying adequately hydrated is vital for optimizing physical performance, maintaining energy levels, supporting healthy brain function, and facilitating proper digestion.
          </p>
        </div>

        <ShareButtons url="https://quickcalc.cloud/tools/water-intake-calculator" title="Water Intake Calculator" />
        <EmbedWidget url="https://quickcalc.cloud/tools/water-intake-calculator" title="Water Intake Calculator" />

        {/* Interactive Calculator Widget Component */}
        <section className="my-8">
          <WaterIntakeCalculatorWidget />
        </section>

        {/* AdSense Placement Ad-Slot-Inline */}
        <AdSlot slot="water-intake-inline" />

        {/* Detailed Article Sections */}
        <article className="prose prose-zinc dark:prose-invert max-w-3xl mx-auto space-y-8 mt-12 border-t border-zinc-200 dark:border-zinc-800 pt-10">
          <section className="space-y-4">
            <h2 className="text-2xl font-bold text-zinc-950 dark:text-white">
              About this calculator
            </h2>
            <p className="text-zinc-600 dark:text-zinc-400 leading-relaxed">
              Proper hydration is one of the most critical aspects of maintaining overall health and vitality, yet many people struggle to drink enough water each day. Our Water Intake Calculator uses a baseline physiological recommendation of 35 milliliters of fluid per kilogram of body weight. This formula is widely recognized by nutritionists and sports scientists as an optimal starting point for healthy adults.
            </p>
            <p className="text-zinc-600 dark:text-zinc-400 leading-relaxed">
              However, a simple weight-based calculation is rarely sufficient on its own. Your body constantly expels water through sweat during physical exertion and when exposed to warmer temperatures. To address this, our calculator dynamically adjusts your targets. For moderate activity, it adds 500 ml of water (approx. 2 glasses), and for heavy physical exercise or manual labor, it adds 1,000 ml. Living in or experiencing a hot, humid climate triggers an additional 500 ml requirement to safeguard you from dehydration and heat fatigue.
            </p>
            <p className="text-zinc-600 dark:text-zinc-400 leading-relaxed">
              Integrating these guidelines into your daily life can dramatically improve how you feel. Adequate water consumption boosts metabolic rate, cushions joints, filters waste products through the kidneys, and keeps your skin looking radiant. While individual needs can vary due to factors like medical conditions, pregnancy, or age, tracking your intake in both liters and standard glasses makes hitting your hydration goals highly achievable and straightforward.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-bold text-zinc-950 dark:text-white">
              How is this calculated?
            </h2>
            <p className="text-zinc-600 dark:text-zinc-400 leading-relaxed">
              The daily hydration goals are calculated using physiological benchmarks adjusted for your weight, physical exertion, and environmental conditions:
            </p>
            <ul className="list-disc pl-6 text-zinc-600 dark:text-zinc-400 space-y-2">
              <li>
                <strong>Baseline Needs:</strong> 35 ml of water per 1 kg of body weight (or ~0.5 fluid ounces per 1 lb of body weight).
              </li>
              <li>
                <strong>Physical Activity:</strong> Adds 500 ml (approx. 2 glasses) for moderate activity and 1,000 ml (approx. 4 glasses) for heavy exercise to compensate for lost sweat.
              </li>
              <li>
                <strong>Climate adjustment:</strong> Adds 500 ml if you live in or are exposed to hot, humid environmental conditions.
              </li>
            </ul>
          </section>

          {/* FAQ open style matching Age Calculator and Currency Converter */}
          <section className="space-y-4 border-t border-zinc-200 dark:border-zinc-800 pt-8">
            <h2 className="text-2xl font-bold text-zinc-950 dark:text-white border-b border-zinc-100 dark:border-zinc-900 pb-2">
              Frequently Asked Questions (FAQ)
            </h2>
            <div className="space-y-6">
              <div className="space-y-2">
                <h3 className="text-base font-bold text-zinc-900 dark:text-zinc-100">
                  How many glasses of water should I drink a day?
                </h3>
                <p className="text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed">
                  While the traditional {"\"8 glasses a day\""} is a simple rule of thumb, our calculator provides a personalized target based on your weight and activity. For an average adult, this is typically between 9 and 13 glasses (2.2 to 3.2 liters) per day.
                </p>
              </div>

              <div className="space-y-2">
                <h3 className="text-base font-bold text-zinc-900 dark:text-zinc-100">
                  What are the signs of mild dehydration?
                </h3>
                <p className="text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed">
                  Early symptoms of dehydration include dry mouth, dark yellow or amber-colored urine, fatigue, headaches, dizziness, and muscle cramps. If you feel thirsty, your body is already mildly dehydrated.
                </p>
              </div>

              <div className="space-y-2">
                <h3 className="text-base font-bold text-zinc-900 dark:text-zinc-100">
                  Can I drink too much water?
                </h3>
                <p className="text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed">
                  Yes, drinking excessive amounts of water can lead to hyponatremia, a rare but serious condition where blood sodium levels become dangerously low. This usually only occurs during extreme endurance events when vast quantities of plain water are consumed without replacing lost electrolytes.
                </p>
              </div>

              <div className="space-y-2">
                <h3 className="text-base font-bold text-zinc-900 dark:text-zinc-100">
                  How does climate affect my daily water needs?
                </h3>
                <p className="text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed">
                  Hotter and more humid climates require a higher water intake because your body loses more fluids through sweat to maintain a stable temperature. It is recommended to add at least 500 ml (approx. 2 glasses) to your daily baseline in warm climates.
                </p>
              </div>

              <div className="space-y-2">
                <h3 className="text-base font-bold text-zinc-900 dark:text-zinc-100">
                  Does tea or coffee count toward my daily water intake?
                </h3>
                <p className="text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed">
                  Yes, caffeinated beverages like tea and coffee do contribute to your daily fluid intake. While caffeine has a mild diuretic effect, the water content in these drinks outweighs the fluid loss for regular caffeine consumers.
                </p>
              </div>

              <div className="space-y-2">
                <h3 className="text-base font-bold text-zinc-900 dark:text-zinc-100">
                  Is water intake calculated differently for pregnant or breastfeeding individuals?
                </h3>
                <p className="text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed">
                  Yes, pregnant and breastfeeding individuals need significantly more water to support fetal development and breast milk production. It is recommended to consult a doctor to establish your customized fluid guidelines during these periods.
                </p>
              </div>
            </div>
          </section>
        </article>

        <RelatedTools currentSlug="water-intake-calculator" />
      </main>

      {/* Footer */}
      <Footer customText="Elegant, science-backed hydration solutions." />
    </div>
  );
}
