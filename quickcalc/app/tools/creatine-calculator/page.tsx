import React from "react";
import type { Metadata } from "next";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Breadcrumbs from "@/components/Breadcrumbs";
import ShareButtons from "@/components/ShareButtons";
import EmbedWidget from "@/components/EmbedWidget";
import RelatedTools from "@/components/RelatedTools";
import MethodologyAccordion from "@/components/MethodologyAccordion";
import { generateSoftwareAppSchema } from "@/lib/schema";
import CreatineMacroCalculatorWidget from "./CreatineMacroCalculatorWidget";
import { CheckCircle2, Zap, Droplets, Flame, Sparkles, HelpCircle, ArrowRight } from "lucide-react";

export const metadata: Metadata = {
  title: "Creatine Daily Intake & Fitness Macro Calculator (2026)",
  description: "Calculate your exact daily creatine monohydrate dosage (loading vs maintenance), hydration water intake, TDEE, and fitness macronutrient split.",
  alternates: {
    canonical: "/tools/creatine-calculator",
  },
  openGraph: {
    title: "Creatine Daily Intake & Fitness Macro Calculator (2026) - QuickCalc",
    description: "Free evidence-based Creatine and Macro calculator based on ISSN guidelines. Compute exact loading and maintenance grams, hydration, BMR, TDEE, and protein targets.",
    url: "https://quickcalc.cloud/tools/creatine-calculator",
    type: "website",
    siteName: "QuickCalc",
    images: [
      {
        url: "https://quickcalc.cloud/og-image.png",
        width: 1200,
        height: 630,
        alt: "Creatine and Macro Calculator on QuickCalc",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Creatine Daily Intake & Fitness Macro Calculator (2026)",
    description: "Calculate creatine loading/maintenance dosages, hydration needs, and macro targets.",
  },
};

export default function CreatineCalculatorPage({
  searchParams,
}: {
  searchParams?: { embed?: string };
}) {
  const softwareSchema = generateSoftwareAppSchema({
    name: "Creatine Daily Intake & Fitness Macro Calculator (2026)",
    description: "Free evidence-based health and fitness calculator to compute daily creatine monohydrate dosages, hydration water volume, BMR, TDEE, and macronutrient targets.",
    slug: "creatine-calculator",
    category: "Health",
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
          <CreatineMacroCalculatorWidget />
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
        "name": "How much creatine should I take daily based on my body weight?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "For maintenance, the International Society of Sports Nutrition (ISSN) recommends 0.03g to 0.05g of creatine monohydrate per kilogram of body weight per day (typically 3g to 5g daily for individuals under 90kg, and 5g to 8g daily for athletes over 90kg/200lbs). For rapid loading, 0.3g per kg (approx. 20g/day split into 4 equal 5g doses for 5–7 days) is recommended."
        }
      },
      {
        "@type": "Question",
        "name": "Is a creatine loading phase necessary, or can I start with 5g daily?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "A loading phase is not mandatory. Taking 20g daily for 5–7 days achieves full intramuscular phosphocreatine saturation in 1 week, whereas taking a steady maintenance dose of 3g–5g daily achieves identical saturation levels in approximately 28 days without any potential digestive discomfort."
        }
      },
      {
        "@type": "Question",
        "name": "Should I take creatine on rest days?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Yes. Creatine works through chronic intramuscular cellular accumulation rather than acute stimulation. You must take your standard 3g–5g maintenance dose on non-training rest days to keep muscle phosphocreatine stores fully saturated."
        }
      },
      {
        "@type": "Question",
        "name": "What is the best protein and carb macro ratio for building muscle?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "For maximizing muscle hypertrophy and athletic recovery, scientific consensus recommends 1.8g to 2.2g of protein per kilogram of body weight (0.8–1.0g per lb), with 25% of daily calories from healthy fats, and the remaining 45%–55% of caloric intake from complex carbohydrates to replenish glycogen stores."
        }
      }
    ]
  };

  const articleData = {
    "@context": "https://schema.org",
    "@type": "Article",
    "headline": "Creatine Daily Intake & Fitness Macro Calculator (2026 Guide & Formulas)",
    "description": "Evidence-based guide on calculating creatine monohydrate loading and maintenance dosages, hydration requirements, TDEE, and macronutrient distribution.",
    "url": "https://quickcalc.cloud/tools/creatine-calculator",
    "image": "https://quickcalc.cloud/og-image.png",
    "author": {
      "@type": "Organization",
      "name": "QuickCalc"
    },
    "publisher": {
      "@type": "Organization",
      "name": "QuickCalc",
      "logo": {
        "@type": "ImageObject",
        "url": "https://quickcalc.cloud/og-image.png"
      }
    },
    "datePublished": "2026-08-21"
  };

  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-zinc-950 text-zinc-900 dark:text-zinc-100 font-[family-name:var(--font-geist-sans)] transition-colors">
      {/* WebApplication Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(softwareSchema) }}
      />
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
      <main className="max-w-5xl mx-auto px-4 py-8 sm:py-12">
        <Breadcrumbs toolName="Creatine & Macro Calculator" toolSlug="creatine-calculator" />
        
        <div className="text-center max-w-3xl mx-auto mb-8">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-purple-500/10 text-purple-700 dark:text-purple-300 border border-purple-500/20 mb-3">
            <Sparkles className="w-3.5 h-3.5" />
            <span>2026 Evidence-Based ISSN & ACSM Guidelines</span>
          </div>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight text-zinc-900 dark:text-white mb-4">
            Free Creatine Daily Intake & Fitness Macro Calculator (2026)
          </h1>

          {/* AI-extractable direct answer summary */}
          <p className="text-sm sm:text-base font-semibold text-purple-800 dark:text-purple-200 bg-purple-500/10 border border-purple-500/30 rounded-xl px-4 py-3 leading-relaxed mb-4 text-left">
            This free fitness calculator calculates your exact daily creatine monohydrate dosage (0.3g/kg loading vs 0.04g/kg maintenance), additional hydration volume, Mifflin-St Jeor TDEE, and customized macronutrient targets (protein, carbs, fats) for muscle gain, fat loss, and body recomposition.
          </p>

          {/* Stand-alone direct answer paragraph */}
          <p className="text-sm sm:text-base text-zinc-600 dark:text-zinc-400 leading-relaxed font-medium">
            To calculate your daily creatine intake, take 0.03–0.05g per kilogram of body weight (typically 3g to 5g daily) for steady maintenance, or 0.3g per kg (~20g daily divided into four 5g doses) for a 5–7 day fast-loading phase. Pair your creatine with an extra 500–1,000ml of water daily and a 2.0–2.2g/kg daily protein target to maximize muscle hypertrophy.
          </p>
        </div>

        <ShareButtons
          url="https://quickcalc.cloud/tools/creatine-calculator"
          title="Creatine Daily Intake & Fitness Macro Calculator (2026)"
        />
        <EmbedWidget
          url="https://quickcalc.cloud/tools/creatine-calculator"
          title="Creatine Daily Intake Calculator"
        />

        {/* The interactive widget */}
        <section className="my-8">
          <CreatineMacroCalculatorWidget />
        </section>

        {/* Scientific & Mathematical Methodology Accordion */}
        <MethodologyAccordion slug="creatine-calculator" />

        {/* Ad Placement 1 */}
        <div className="ad-slot ad-slot--inline my-8" data-ad-position="in-content-1">
          <div className="ad-placeholder-label border border-dashed border-zinc-300 dark:border-zinc-800 rounded-xl py-4 flex items-center justify-center bg-zinc-50/50 dark:bg-zinc-950/20 text-[10px] font-bold text-zinc-400 dark:text-zinc-600 uppercase tracking-widest cursor-default">
            Advertisement
          </div>
        </div>

        {/* Comprehensive SEO & AEO Content (500+ Words) */}
        <article className="prose prose-zinc dark:prose-invert max-w-4xl mx-auto space-y-8 mt-12 border-t border-zinc-200 dark:border-zinc-800 pt-10">
          
          {/* Section 1: How to Calculate Your Creatine Dosage */}
          <section className="space-y-4">
            <h2 className="text-2xl font-black text-zinc-950 dark:text-white flex items-center gap-2">
              <Zap className="w-6 h-6 text-purple-500" />
              <span>How to Calculate Your Creatine Dosage (Loading vs. Maintenance)</span>
            </h2>
            <p className="text-zinc-600 dark:text-zinc-400 leading-relaxed">
              Creatine monohydrate is the single most extensively researched sports nutritional supplement in the world. Clinical position stands from the <strong>International Society of Sports Nutrition (ISSN)</strong> establish two primary dosing methodologies to elevate intramuscular phosphocreatine (PCr) levels:
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 not-prose my-6">
              <div className="p-4 rounded-xl bg-white dark:bg-zinc-900 border border-purple-200 dark:border-purple-900/40 shadow-sm space-y-2">
                <h3 className="text-sm font-bold text-purple-900 dark:text-purple-300 flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-purple-500" />
                  <span>Protocol A: Fast Loading Phase (7 Days)</span>
                </h3>
                <p className="text-xs text-zinc-600 dark:text-zinc-400 leading-relaxed">
                  Consume <strong>0.3g per kg of body weight</strong> per day (approx. 20g/day for a 70–80kg athlete) split into 4 equal 5g servings for 5 to 7 days, followed by 3–5g daily. This elevates muscle creatine stores to 100% saturation within 1 week.
                </p>
              </div>

              <div className="p-4 rounded-xl bg-white dark:bg-zinc-900 border border-indigo-200 dark:border-indigo-900/40 shadow-sm space-y-2">
                <h3 className="text-sm font-bold text-indigo-900 dark:text-indigo-300 flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-indigo-500" />
                  <span>Protocol B: Gradual Maintenance (28 Days)</span>
                </h3>
                <p className="text-xs text-zinc-600 dark:text-zinc-400 leading-relaxed">
                  Consume <strong>0.04g per kg of body weight</strong> (3g to 5g daily) from Day 1. This method takes approximately 28 days to reach full saturation but eliminates any risk of mild gastrointestinal bloating.
                </p>
              </div>
            </div>
          </section>

          {/* Section 2: Understanding TDEE, BMR, and Macro Ratios */}
          <section className="space-y-4 border-t border-zinc-200 dark:border-zinc-800 pt-8">
            <h2 className="text-2xl font-black text-zinc-950 dark:text-white flex items-center gap-2">
              <Flame className="w-6 h-6 text-emerald-600 dark:text-emerald-400" />
              <span>Understanding TDEE, BMR, and Macro Ratios for Muscle Growth</span>
            </h2>
            <p className="text-zinc-600 dark:text-zinc-400 leading-relaxed">
              Creatine supplementation enhances rapid adenosine triphosphate (ATP) resynthesis during high-intensity lifting, but actual muscle protein synthesis requires adequate caloric and macronutrient support:
            </p>

            <ul className="space-y-3 text-zinc-700 dark:text-zinc-300 list-disc pl-5 text-sm sm:text-base leading-relaxed">
              <li>
                <strong>Basal Metabolic Rate (BMR):</strong> Calculated via the gold-standard Mifflin-St Jeor equation (or Katch-McArdle when lean body mass is known), representing the baseline energy required to sustain life at rest.
              </li>
              <li>
                <strong>Total Daily Energy Expenditure (TDEE):</strong> BMR multiplied by your physical activity multiplier (1.2x for sedentary up to 1.9x for heavy athletes).
              </li>
              <li>
                <strong>Optimal Protein Allocation (2.0–2.2g/kg):</strong> Crucial for repairing muscle micro-tears induced by progressive overload strength training.
              </li>
              <li>
                <strong>Carbohydrate Synergy:</strong> Consuming creatine alongside carbohydrates (50–100g) triggers an insulin spike that upregulates sodium-dependent creatine transporters (CreaT), enhancing intramuscular uptake.
              </li>
            </ul>
          </section>

          {/* Section 3: Why Extra Water Intake is Essential */}
          <section className="space-y-4 border-t border-zinc-200 dark:border-zinc-800 pt-8">
            <h2 className="text-2xl font-black text-zinc-950 dark:text-white flex items-center gap-2">
              <Droplets className="w-6 h-6 text-sky-500" />
              <span>Why Extra Water Intake is Essential When Taking Creatine</span>
            </h2>
            <p className="text-zinc-600 dark:text-zinc-400 leading-relaxed">
              Creatine is an osmolytic compound, meaning it naturally draws water from extracellular space directly into muscle cells (intracellular cellular swelling). This cellular volumization increases nitrogen balance and enhances protein synthesis. To facilitate this process without causing dehydration or muscle cramps, athletes should increase baseline water intake by <strong>500ml to 1,000ml (16 to 32 oz)</strong> daily.
            </p>
          </section>

          {/* Ad Placement 2 */}
          <div className="ad-slot ad-slot--inline my-8" data-ad-position="in-content-2">
            <div className="ad-placeholder-label border border-dashed border-zinc-300 dark:border-zinc-800 rounded-xl py-4 flex items-center justify-center bg-zinc-50/50 dark:bg-zinc-950/20 text-[10px] font-bold text-zinc-400 dark:text-zinc-600 uppercase tracking-widest cursor-default">
              Advertisement
            </div>
          </div>

          {/* Section 4: Interactive FAQ Accordion (AEO Optimized) */}
          <section className="space-y-4 border-t border-zinc-200 dark:border-zinc-800 pt-8">
            <h2 className="text-2xl font-black text-zinc-950 dark:text-white border-b border-zinc-200 dark:border-zinc-800 pb-3 flex items-center gap-2">
              <HelpCircle className="w-6 h-6 text-purple-500" />
              <span>Frequently Asked Questions (FAQ)</span>
            </h2>

            <div className="space-y-4 not-prose">
              <div className="p-4 rounded-xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 shadow-sm space-y-2">
                <h3 className="text-base font-bold text-zinc-900 dark:text-white">
                  How much creatine should I take daily based on my body weight?
                </h3>
                <p className="text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed">
                  For maintenance, take 0.03g to 0.05g per kg daily (3g–5g/day for most adults, 5g–8g/day for athletes over 90kg). For loading, take 0.3g per kg (~20g/day divided into 4 doses) for 5–7 days.
                </p>
              </div>

              <div className="p-4 rounded-xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 shadow-sm space-y-2">
                <h3 className="text-base font-bold text-zinc-900 dark:text-white">
                  Is a creatine loading phase necessary, or can I start with 5g daily?
                </h3>
                <p className="text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed">
                  A loading phase is optional. Loading reaches 100% saturation in 7 days, while 3g–5g daily reaches 100% saturation in 28 days with identical long-term muscle gains.
                </p>
              </div>

              <div className="p-4 rounded-xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 shadow-sm space-y-2">
                <h3 className="text-base font-bold text-zinc-900 dark:text-white">
                  Should I take creatine on rest days?
                </h3>
                <p className="text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed">
                  Yes. Creatine works through consistent intracellular accumulation. Take your regular 3g–5g dose on rest days with a meal to maintain peak muscle saturation.
                </p>
              </div>

              <div className="p-4 rounded-xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 shadow-sm space-y-2">
                <h3 className="text-base font-bold text-zinc-900 dark:text-white">
                  What is the best protein and carb macro ratio for building muscle?
                </h3>
                <p className="text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed">
                  Aim for 2.0g to 2.2g of protein per kg of body weight (0.9–1.0g per lb), 25% of calories from healthy fats, and the remaining 45%–55% from complex carbohydrates.
                </p>
              </div>
            </div>
          </section>

          {/* Related Tools Cross-Linking */}
          <section className="space-y-3 border-t border-zinc-200 dark:border-zinc-800 pt-8 not-prose">
            <h3 className="text-sm font-bold uppercase tracking-wider text-zinc-500 dark:text-zinc-400">
              Related Health & Nutrition Calculators
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <Link
                href="/tools/macro-calculator"
                className="p-3 rounded-xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 hover:border-purple-500 transition-all flex items-center justify-between text-xs font-semibold text-zinc-800 dark:text-zinc-200 group"
              >
                <span>Macro Nutrient Calculator</span>
                <ArrowRight className="w-3.5 h-3.5 text-zinc-400 group-hover:text-purple-500 group-hover:translate-x-0.5 transition-all" />
              </Link>
              <Link
                href="/tools/water-intake-calculator"
                className="p-3 rounded-xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 hover:border-purple-500 transition-all flex items-center justify-between text-xs font-semibold text-zinc-800 dark:text-zinc-200 group"
              >
                <span>Daily Water Intake Calculator</span>
                <ArrowRight className="w-3.5 h-3.5 text-zinc-400 group-hover:text-purple-500 group-hover:translate-x-0.5 transition-all" />
              </Link>
              <Link
                href="/tools/calorie-calculator"
                className="p-3 rounded-xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 hover:border-purple-500 transition-all flex items-center justify-between text-xs font-semibold text-zinc-800 dark:text-zinc-200 group"
              >
                <span>Calorie & TDEE Calculator</span>
                <ArrowRight className="w-3.5 h-3.5 text-zinc-400 group-hover:text-purple-500 group-hover:translate-x-0.5 transition-all" />
              </Link>
            </div>
          </section>
        </article>

        <RelatedTools currentSlug="creatine-calculator" />

        {/* Ad Placement Footer */}
        <div className="ad-slot ad-slot--footer mt-12" data-ad-position="footer">
          <div className="ad-placeholder-label border border-dashed border-zinc-300 dark:border-zinc-800 rounded-xl py-4 flex items-center justify-center bg-zinc-50/50 dark:bg-zinc-950/20 text-[10px] font-bold text-zinc-400 dark:text-zinc-600 uppercase tracking-widest cursor-default">
            Advertisement
          </div>
        </div>
      </main>

      {/* Footer */}
      <Footer customText="Evidence-based ISSN Creatine Monohydrate dosage, hydration, and macro split calculations." />
    </div>
  );
}
