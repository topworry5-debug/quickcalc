import MethodologyAccordion from "@/components/MethodologyAccordion";
import Navbar from "@/components/Navbar";
import { generateSoftwareAppSchema } from "@/lib/schema";
import RelatedTools from "@/components/RelatedTools";
import ShareButtons from "@/components/ShareButtons";
import EmbedWidget from "@/components/EmbedWidget";
import Breadcrumbs from "@/components/Breadcrumbs";
import Link from "next/link";
import type { Metadata } from "next";
import WaterIntakeCalculatorWidget from "./WaterIntakeCalculatorWidget";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "Daily Water Intake Calculator - Find Your Hydration Needs",
  description:
    "Calculate your ideal daily water intake in liters and cups. Get a personalized hydration plan based on body weight, climate, and exercise levels.",
  alternates: {
    canonical: "/tools/water-intake-calculator",
  },
  openGraph: {
    title: "Daily Water Intake Calculator - Find Your Hydration Needs",
    description:
      "Calculate your ideal daily water intake in liters and cups. Get a personalized hydration plan based on body weight, climate, and exercise levels.",
    url: "https://quickcalc.cloud/tools/water-intake-calculator",
    type: "website",
    siteName: "QuickCalc",
    images: [
      {
        url: "https://quickcalc.cloud/og-image.png",
        width: 1200,
        height: 630,
        alt: "Free Daily Water Intake Calculator on QuickCalc",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Daily Water Intake Calculator - Find Your Hydration Needs",
    description:
      "Calculate your ideal daily water intake in liters and cups. Get a personalized hydration plan based on body weight, climate, and exercise levels.",
  },
};

export default function WaterIntakeCalculatorPage({
  searchParams,
}: {
  searchParams?: { embed?: string };
}) {
  const softwareSchema = generateSoftwareAppSchema({
    name: "Daily Water Intake Calculator - Find Your Hydration Needs",
    description:
      "Calculate your ideal daily water intake in liters and cups. Get a personalized hydration plan based on body weight, climate, and exercise levels.",
    slug: "water-intake-calculator",
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
          <WaterIntakeCalculatorWidget />
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
        name: "How many ounces of water should I drink daily?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Determining how much water you should drink depends on your unique physiology, activity level, and climate. For an average adult, this is typically between 9 and 13 cups (2.2 to 3.2 liters) per day, but our calculator helps you find your exact target.",
        },
      },
      {
        "@type": "Question",
        name: "How do I calculate my daily water intake based on weight and activity?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "A standard baseline recommendation is to drink about 35 milliliters of water per kilogram of body weight (roughly 0.5 fluid ounces per pound). So, how much water you should drink based on your weight scales directly with your body mass before factoring in exercise or environment.",
        },
      },
      {
        "@type": "Question",
        name: "Is the 'eight glasses of water a day' rule scientifically accurate?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "The '8 glasses a day myth' suggests that everyone needs exactly 64 ounces of water daily, regardless of their size, climate, or activity levels. In reality, hydration is highly individualized; while 8 glasses is a simple starting point, your actual fluid needs may be higher or lower depending on your weight and sweat rate.",
        },
      },
      {
        "@type": "Question",
        name: "How much extra water should I drink in hot weather or during workouts?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "To stay safe, how much water you need in hot weather increases significantly because your body loses extra fluid through sweat to keep cool. It is generally recommended to add at least 500 ml (about 2 extra glasses) to your daily baseline when exposed to high heat or humidity.",
        },
      },
    ],
  };

  const softwareData = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: "Water Intake Calculator",
    operatingSystem: "All",
    applicationCategory: "HealthApplication",
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
        <Breadcrumbs toolName="Water Intake Calculator" toolSlug="water-intake-calculator" />
        <div className="text-center max-w-2xl mx-auto mb-8">
          <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-zinc-900 dark:text-white mb-4">
            Daily Water Intake Calculator
          </h1>
          <p className="text-base sm:text-lg text-zinc-600 dark:text-zinc-400 leading-relaxed">
            Wondering how much water you should drink a day? Our free online daily water intake calculator provides a personalized hydration plan in liters, ounces, and cups based on your body weight, climate, and exercise level. Calculate your exact hydration needs instantly!
          </p>
        </div>

        <ShareButtons
          url="https://quickcalc.cloud/tools/water-intake-calculator"
          title="Daily Water Intake Calculator"
        />
        <EmbedWidget
          url="https://quickcalc.cloud/tools/water-intake-calculator"
          title="Daily Water Intake Calculator"
        />

        <section className="my-8">
          <WaterIntakeCalculatorWidget />
        </section>

        <MethodologyAccordion slug="water-intake-calculator" />

        <div className="ad-slot ad-slot--inline" data-ad-position="in-content-1">
          <div className="ad-placeholder-label border border-dashed border-zinc-300 dark:border-zinc-800 rounded-xl py-4 flex items-center justify-center bg-zinc-50/50 dark:bg-zinc-950/20 text-[10px] font-bold text-zinc-400 dark:text-zinc-600 uppercase tracking-widest cursor-default">
            Advertisement
          </div>
        </div>

        <article className="prose prose-zinc dark:prose-invert max-w-3xl mx-auto space-y-8 mt-12 border-t border-zinc-200 dark:border-zinc-800 pt-10">
          <section className="space-y-4">
            <h2 className="text-2xl font-bold text-zinc-950 dark:text-white">
              Understanding Hydration &amp; Kidney Function
            </h2>
            <p className="text-zinc-600 dark:text-zinc-400 leading-relaxed">
              Proper daily hydration plays an essential role in regulating body temperature, lubricating joints, supporting cardiovascular health, and helping your kidneys filter metabolic waste products efficiently.
            </p>
            <p className="text-zinc-600 dark:text-zinc-400 leading-relaxed">
              If you want to check your renal filtration rate or evaluate serum creatinine levels according to clinical guidelines, try our free{" "}
              <Link
                href="/tools/gfr-kidney-function-calculator"
                className="text-cyan-600 dark:text-cyan-400 font-semibold underline hover:text-cyan-700"
              >
                GFR / Kidney Function Calculator
              </Link>.
            </p>
          </section>

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
                  The '8 glasses a day myth' suggests that everyone needs exactly 64 ounces of water daily, regardless of their size, climate, or activity levels. In reality, hydration is highly individualized; while 8 glasses is a simple starting point, your actual fluid needs may be higher or lower depending on your weight and sweat rate.
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

        <div className="ad-slot ad-slot--footer mt-12" data-ad-position="footer">
          <div className="ad-placeholder-label border border-dashed border-zinc-300 dark:border-zinc-800 rounded-xl py-4 flex items-center justify-center bg-zinc-50/50 dark:bg-zinc-950/20 text-[10px] font-bold text-zinc-400 dark:text-zinc-600 uppercase tracking-widest cursor-default">
            Advertisement
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
