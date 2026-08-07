import Navbar from "@/components/Navbar";
import { generateSoftwareAppSchema } from "@/lib/schema";
import RelatedTools from "@/components/RelatedTools";
import ShareButtons from "@/components/ShareButtons";
import EmbedWidget from "@/components/EmbedWidget";



import Breadcrumbs from "@/components/Breadcrumbs";

import type { Metadata } from "next";
import WaterIntakeCalculatorWidget from "./WaterIntakeCalculatorWidget";
import Footer from "@/components/Footer";
import AdSlot from "@/components/AdSlot";

export const metadata: Metadata = {
  title: "Daily Water Intake Calculator - Find Your Hydration Needs",
  description: "Calculate your ideal daily water intake in liters and cups. Get a personalized hydration plan based on body weight, climate, and exercise levels.",
  alternates: {
    canonical: "/tools/water-intake-calculator",
  },
};

export default function WaterIntakeCalculatorPage({ searchParams }: { searchParams?: { embed?: string } }) {
  const softwareSchema = generateSoftwareAppSchema({
    name: "Daily Water Intake Calculator - Find Your Hydration Needs",
    description: "Calculate your ideal daily water intake in liters and cups. Get a personalized hydration plan based on body weight, climate, and exercise levels.",
    slug: "water-intake-calculator",
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
        "name": "How many ounces of water should I drink daily?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Determining how much water you should drink depends on your unique physiology, activity level, and climate. For an average adult, this is typically between 9 and 13 cups (2.2 to 3.2 liters) per day, but our calculator helps you find your exact target."
        }
      },
      {
        "@type": "Question",
        "name": "How do I calculate my daily water intake based on weight and activity?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "A standard baseline recommendation is to drink about 35 milliliters of water per kilogram of body weight (roughly 0.5 fluid ounces per pound). So, how much water you should drink based on your weight scales directly with your body mass before factoring in exercise or environment."
        }
      },
      {
        "@type": "Question",
        "name": "Is the 'eight glasses of water a day' rule scientifically accurate?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "The '8 glasses a day myth' suggests that everyone needs exactly 64 ounces of water daily, regardless of their size, climate, or activity levels. In reality, hydration is highly individualized; while 8 glasses is a simple starting point, your actual fluid needs may be higher or lower depending on your weight and sweat rate."
        }
      },
      {
        "@type": "Question",
        "name": "How much extra water should I drink in hot weather or during workouts?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "To stay safe, how much water you need in hot weather increases significantly because your body loses extra fluid through sweat to keep cool. It is generally recommended to add at least 500 ml (about 2 extra glasses) to your daily baseline when exposed to high heat or humidity."
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
  }

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
      <Navbar />

      {/* Main Content Area */}
      <main className="max-w-4xl mx-auto px-4 py-8 sm:py-12">
        <Breadcrumbs toolName="Water Intake Calculator" toolSlug="water-intake-calculator" />
        <div className="text-center max-w-2xl mx-auto mb-8">
          <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-zinc-900 dark:text-white mb-4">
            Water Intake Calculator
          </h1>
          <p className="text-base sm:text-lg text-zinc-600 dark:text-zinc-400 leading-relaxed">
            If you are wondering how much water should I drink each day to stay fully hydrated and healthy, our science-backed Water Intake Calculator is here to help. By analyzing key factors such as your body weight, physical activity level, and local climate conditions, this free tool computes a personalized hydration plan tailored directly to your lifestyle, helping you optimize physical performance and brain function.
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
              About Our Daily Water Intake Calculator
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
              How Daily Water Intake Goals are Calculated by Weight and Activity
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
                  How many ounces of water should I drink daily?
                </h3>
                <p className="text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed">
                  Determining how much water you should drink depends on your unique physiology, activity level, and climate. For an average adult, this is typically between 9 and 13 cups (2.2 to 3.2 liters) per day, but our calculator helps you find your exact target.
                </p>
              </div>

              <div className="space-y-2">
                <h3 className="text-base font-bold text-zinc-900 dark:text-zinc-100">
                  How do I calculate my daily water intake based on weight and activity?
                </h3>
                <p className="text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed">
                  A standard baseline recommendation is to drink about 35 milliliters of water per kilogram of body weight (roughly 0.5 fluid ounces per pound). So, how much water you should drink based on your weight scales directly with your body mass before factoring in exercise or environment.
                </p>
              </div>

              <div className="space-y-2">
                <h3 className="text-base font-bold text-zinc-900 dark:text-zinc-100">
                  Is the 'eight glasses of water a day' rule scientifically accurate?
                </h3>
                <p className="text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed">
                  The {"'8 glasses a day myth'"} suggests that everyone needs exactly 64 ounces of water daily, regardless of their size, climate, or activity levels. In reality, hydration is highly individualized; while 8 glasses is a simple starting point, your actual fluid needs may be higher or lower depending on your weight and sweat rate.
                </p>
              </div>

              <div className="space-y-2">
                <h3 className="text-base font-bold text-zinc-900 dark:text-zinc-100">
                  How much extra water should I drink in hot weather or during workouts?
                </h3>
                <p className="text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed">
                  To stay safe, how much water you need in hot weather increases significantly because your body loses extra fluid through sweat to keep cool. It is generally recommended to add at least 500 ml (about 2 extra glasses) to your daily baseline when exposed to high heat or humidity.
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
