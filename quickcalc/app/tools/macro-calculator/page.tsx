import MethodologyAccordion from "@/components/MethodologyAccordion";
import Navbar from "@/components/Navbar";
import { generateSoftwareAppSchema } from "@/lib/schema";
import RelatedTools from "@/components/RelatedTools";
import ShareButtons from "@/components/ShareButtons";
import EmbedWidget from "@/components/EmbedWidget";
import Breadcrumbs from "@/components/Breadcrumbs";
import type { Metadata } from "next";
import Link from "next/link";
import MacroCalculatorWidget from "./MacroCalculatorWidget";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "Macro Calculator - Daily Protein, Carbs & Fat Grams",
  description: "Calculate your exact daily macronutrient targets (protein, carbs, fat in grams) based on TDEE, fitness goals, and customizable macro split ratios.",
  alternates: {
    canonical: "/tools/macro-calculator",
  },
  openGraph: {
    title: "Macro Calculator - Daily Protein, Carbs & Fat Grams",
    description: "Calculate your exact daily macronutrient targets (protein, carbs, fat in grams) based on TDEE, fitness goals, and customizable macro split ratios.",
    url: "https://quickcalc.cloud/tools/macro-calculator",
    type: "website",
    siteName: "QuickCalc",
    images: [
      {
        url: "https://quickcalc.cloud/og-image.png",
        width: 1200,
        height: 630,
        alt: "Macro Calculator on QuickCalc",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Macro Calculator - Daily Protein, Carbs & Fat Grams",
    description: "Calculate your exact daily macronutrient targets (protein, carbs, fat in grams) based on TDEE, fitness goals, and customizable macro split ratios.",
  },
};

export default function MacroCalculatorPage({
  searchParams,
}: {
  searchParams?: { embed?: string };
}) {
  const softwareSchema = generateSoftwareAppSchema({
    name: "Macro Calculator - Daily Protein, Carbs & Fat Grams",
    description:
      "Calculate your exact daily macronutrient targets (protein, carbs, fat in grams) based on TDEE, fitness goals, and customizable macro split ratios.",
    slug: "macro-calculator",
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
          <MacroCalculatorWidget />
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
        "name": "How do I calculate my daily macronutrient breakdown?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "To calculate your daily macros, first calculate your Total Daily Energy Expenditure (TDEE) and adjust for your goal (maintenance, fat loss deficit, or muscle gain surplus). Then allocate target percentages to Protein (4 kcal/g), Carbohydrates (4 kcal/g), and Fats (9 kcal/g).",
        },
      },
      {
        "@type": "Question",
        "name": "What macro ratio split is best for muscle building vs weight loss?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "For muscle building, a High Protein split (40% Protein / 40% Carbs / 20% Fat) supports muscle synthesis. For general fat loss, a Balanced split (30% P / 40% C / 30% F) or Low Carb split (35% P / 25% C / 40% F) helps preserve lean mass while keeping you satiated.",
        },
      },
      {
        "@type": "Question",
        "name": "How many calories are in 1 gram of protein, carb, and fat?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Protein and carbohydrates both contain 4 calories per gram. Fat is more energy-dense, containing 9 calories per gram. Dietary fiber counts toward carbohydrate intake.",
        },
      },
    ],
  };

  const articleData = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: "Macro Calculator: Protein, Carbohydrates & Fat Targets",
    description:
      "A complete guide and interactive tool for calculating daily macronutrient gram targets for bodybuilding, fat loss, athletic performance, and keto diets.",
    url: "https://quickcalc.cloud/tools/macro-calculator",
    image: "https://quickcalc.cloud/og-image.png",
    author: {
      "@type": "Organization",
      name: "QuickCalc",
    },
    publisher: {
      "@type": "Organization",
      name: "QuickCalc",
      logo: {
        "@type": "ImageObject",
        url: "https://quickcalc.cloud/og-image.png",
      },
    },
    datePublished: "2026-08-08",
  };

  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-zinc-950 text-zinc-900 dark:text-zinc-100 font-[family-name:var(--font-geist-sans)] transition-colors">
      {/* FAQ Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqData) }}
      />
      {/* Article Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleData) }}
      />

      {/* Header */}
      <Navbar />

      {/* Main Content */}
      <main className="max-w-4xl mx-auto px-4 py-8 sm:py-12">
        <Breadcrumbs toolName="Macro Calculator" toolSlug="macro-calculator" />

        <div className="text-center max-w-2xl mx-auto mb-8">
          <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-zinc-900 dark:text-white mb-4">
            Macro Calculator: Protein, Carbs & Fat Targets
          </h1>

          {/* AI-extractable direct answer summary */}
          <p className="text-sm sm:text-base font-semibold text-orange-700 dark:text-orange-300 bg-orange-500/5 border border-orange-500/20 rounded-xl px-4 py-3 leading-relaxed mb-4 text-left">
            This free tool calculates your daily macronutrient gram targets (protein, carbs, fat) based on your TDEE, fitness goals, and customizable percentage ratios.
          </p>

          {/* Stand-alone direct-answer paragraph */}
          <p className="text-base sm:text-lg text-zinc-600 dark:text-zinc-400 leading-relaxed font-medium">
            To calculate your daily macros, determine your target daily calories from your TDEE (adding a surplus for weight gain or subtracting a deficit for weight loss). Multiply your total calories by your chosen percentage ratio for protein (4 kcal/g), carbs (4 kcal/g), and fat (9 kcal/g) to convert energy requirements into precise daily gram targets.
          </p>
        </div>

        <ShareButtons
          url="https://quickcalc.cloud/tools/macro-calculator"
          title="Macro Calculator - Daily Protein, Carbs & Fat Targets"
        />
        <EmbedWidget
          url="https://quickcalc.cloud/tools/macro-calculator"
          title="Macro Calculator"
        />

        {/* The interactive widget */}
        <section className="my-8">
          <MacroCalculatorWidget />
        </section>

        {/* Collapsible Scientific & Mathematical Methodology */}
        <MethodologyAccordion slug="macro-calculator" />

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
              Understanding Macronutrients: Why Gram Targets Matter
            </h2>
            <p className="text-zinc-600 dark:text-zinc-400 leading-relaxed">
              Counting total calories dictates overall body weight gain or loss, but tracking your macronutrient composition determines <strong className="text-zinc-800 dark:text-zinc-200">what type</strong> of weight you lose or gain. High protein intake preserves lean muscle tissue during a caloric deficit and triggers muscle protein synthesis during muscle-building phases. Carbohydrates replenish muscle glycogen for high-intensity training, while dietary fats regulate essential hormone production.
            </p>
            <p className="text-zinc-600 dark:text-zinc-400 leading-relaxed">
              If you want to view your foundational Basal Metabolic Rate (BMR) and total energy expenditure before configuring macros, try our baseline <Link href="/tools/calorie-calculator" className="text-orange-600 dark:text-orange-400 underline hover:text-orange-700">Calorie Calculator</Link> or monitor your physical baseline with our <Link href="/tools/bmi-calculator" className="text-orange-600 dark:text-orange-400 underline hover:text-orange-700">BMI Calculator</Link>.
            </p>
          </section>

          {/* Ad Placement 2 */}
          <div className="ad-slot ad-slot--inline" data-ad-position="in-content-2">
            <div className="ad-placeholder-label border border-dashed border-zinc-300 dark:border-zinc-800 rounded-xl py-4 flex items-center justify-center bg-zinc-50/50 dark:bg-zinc-950/20 text-[10px] font-bold text-zinc-400 dark:text-zinc-600 uppercase tracking-widest cursor-default">
              Advertisement
            </div>
          </div>

          {/* FAQ section */}
          <section className="space-y-6 border-t border-zinc-200 dark:border-zinc-800 pt-8">
            <h2 className="text-2xl font-bold text-zinc-950 dark:text-white border-b border-zinc-100 dark:border-zinc-900 pb-2">
              Frequently Asked Questions (FAQ)
            </h2>
            <div className="space-y-4">
              <div>
                <h3 className="text-lg font-semibold text-zinc-900 dark:text-white">
                  How do I calculate my daily macronutrient breakdown?
                </h3>
                <p className="text-zinc-600 dark:text-zinc-400 mt-1">
                  Start with your Total Daily Energy Expenditure (TDEE). Multiply your target calories by your chosen percentage for protein, carbs, and fat. Divide protein and carb calories by 4 and fat calories by 9 to get your daily gram targets.
                </p>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-zinc-900 dark:text-white">
                  What macro ratio split is best for muscle building vs weight loss?
                </h3>
                <p className="text-zinc-600 dark:text-zinc-400 mt-1">
                  High protein ratios (40% Protein / 40% Carbs / 20% Fat) work best for active muscle building. Balanced (30/40/30) or Low Carb (35/25/40) splits suit steady fat loss while keeping hunger controlled.
                </p>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-zinc-900 dark:text-white">
                  How many calories are in 1 gram of protein, carb, and fat?
                </h3>
                <p className="text-zinc-600 dark:text-zinc-400 mt-1">
                  Protein = 4 kcal/gram, Carbohydrates = 4 kcal/gram, Fats = 9 kcal/gram.
                </p>
              </div>
            </div>
          </section>
        </article>

        {/* Related Tools */}
        <section className="mt-16 pt-8 border-t border-zinc-200 dark:border-zinc-800">
          <RelatedTools currentSlug="macro-calculator" />
        </section>
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
}
