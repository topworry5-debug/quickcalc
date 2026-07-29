import RelatedTools from "@/components/RelatedTools";
import ShareButtons from "@/components/ShareButtons";
import EmbedWidget from "@/components/EmbedWidget";

import ThemeToggle from "@/components/ThemeToggle";
import Breadcrumbs from "@/components/Breadcrumbs";
import type { Metadata } from "next";
import Link from "next/link";
import CalorieCalculatorWidget from "./CalorieCalculatorWidget";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "Calorie Calculator - Find Daily Calorie Needs | QuickCalc",
  description: "Calculate your daily calorie needs (TDEE & BMR) using the highly accurate Mifflin-St Jeor formula. Get targeted cut, maintain, and bulk plans instantly.",
  alternates: {
    canonical: "/tools/calorie-calculator",
  },
  openGraph: {
    title: "Calorie Calculator - Find Daily Calorie Needs | QuickCalc",
    description: "Calculate your daily calorie needs (TDEE & BMR) using the highly accurate Mifflin-St Jeor formula. Get targeted cut, maintain, and bulk plans instantly.",
    url: "https://quickcalc.cloud/tools/calorie-calculator",
    type: "website",
    siteName: "QuickCalc",
    images: [
      {
        url: "https://quickcalc.cloud/og-image.png",
        width: 1200,
        height: 630,
        alt: "Calorie Calculator on QuickCalc",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Calorie Calculator - Find Daily Calorie Needs | QuickCalc",
    description: "Calculate your daily calorie needs (TDEE & BMR) using the highly accurate Mifflin-St Jeor formula. Get targeted cut, maintain, and bulk plans instantly.",
    images: ["https://quickcalc.cloud/og-image.png"],
  },
};

export default function CalorieCalculatorPage({ searchParams }: { searchParams?: { embed?: string } }) {
  const isEmbed = searchParams?.embed === "true";
  if (isEmbed) {
    return (
      <div className="min-h-screen bg-white dark:bg-zinc-950 text-zinc-900 dark:text-zinc-100 font-[family-name:var(--font-geist-sans)] transition-colors p-2 flex flex-col justify-between">
        <main className="max-w-4xl mx-auto w-full">
          <CalorieCalculatorWidget />
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
        "name": "How many calories should I eat to lose weight?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "To safely and sustainably lose weight, you should consume approximately 500 calories below your Total Daily Energy Expenditure (TDEE) each day. This moderate deficit of 500 kcal per day creates a cumulative weekly shortage of 3,500 calories, which translates to a highly reliable weight loss of roughly 0.5 kilograms or 1 pound of body fat per week."
        }
      },
      {
        "@type": "Question",
        "name": "What is the TDEE vs BMR difference?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "The TDEE vs BMR difference lies in physical activity. Your Basal Metabolic Rate (BMR) is the baseline energy your body requires to survive at complete rest, while your Total Daily Energy Expenditure (TDEE) factors in all daily movement, exercise, and active processes by applying an activity multiplier to your BMR."
        }
      },
      {
        "@type": "Question",
        "name": "How to calculate maintenance calories?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "To understand how to calculate maintenance calories, you first need to find your BMR using a standard formula (like Mifflin-St Jeor), and then multiply that number by your physical activity factor. This resulting total, known as your TDEE, represents the exact number of daily calories required to maintain your current body weight."
        }
      }
    ]
  };

  const howToData = {
    "@context": "https://schema.org",
    "@type": "HowTo",
    "name": "How to Calculate Daily Calorie Needs",
    "description": "Step-by-step guide on calculating personal calorie goals using the gold-standard Mifflin-St Jeor formula and activity level multipliers.",
    "step": [
      {
        "@type": "HowToStep",
        "name": "Determine Basal Metabolic Rate (BMR)",
        "text": "Use the Mifflin-St Jeor formula based on biological sex: Men calculate 10 * weight (kg) + 6.25 * height (cm) - 5 * age + 5. Women calculate 10 * weight (kg) + 6.25 * height (cm) - 5 * age - 161."
      },
      {
        "@type": "HowToStep",
        "name": "Determine Activity Multiplier",
        "text": "Select your activity level ranging from Sedentary (1.2), Lightly Active (1.375), Moderately Active (1.55), Very Active (1.725), to Extremely Active (1.9)."
      },
      {
        "@type": "HowToStep",
        "name": "Multiply BMR by Activity Level",
        "text": "Multiply your calculated BMR by your chosen physical activity level multiplier to calculate your Total Daily Energy Expenditure (TDEE), representing your maintenance calories."
      },
      {
        "@type": "HowToStep",
        "name": "Adjust for Specific Weight Goals",
        "text": "Subtract approximately 500 calories for a fat loss deficit, maintain the exact amount for weight maintenance, or add 500 calories for a weight gain surplus."
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
      {/* HowTo Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(howToData) }}
      />

      {/* Header */}
      <header className="border-b border-zinc-200 dark:border-zinc-800 bg-white/80 dark:bg-zinc-900/80 backdrop-blur-md sticky top-0 z-50 transition-colors">
        <div className="max-w-4xl mx-auto px-4 h-16 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2 font-bold text-lg text-emerald-600 dark:text-emerald-400">
            <span>⚖️ QuickCalc</span>
          </Link>
          <nav className="flex items-center gap-2 sm:gap-4">
            <Link href="/" className="text-sm font-medium text-zinc-600 dark:text-zinc-400 hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors">
              Home
            </Link>
            <Link href="/blog" className="text-sm font-medium text-zinc-600 dark:text-zinc-400 hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors">
              Blog
            </Link>
            <span className="text-sm font-medium text-zinc-300 dark:text-zinc-700 font-normal">|</span>
            <span className="text-sm font-medium text-zinc-400 dark:text-zinc-600">Calorie Calculator</span>
            <span className="text-sm font-medium text-zinc-300 dark:text-zinc-700 font-normal">|</span>
            <ThemeToggle />
          </nav>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-4xl mx-auto px-4 py-8 sm:py-12">
        <Breadcrumbs toolName="Calorie Calculator" toolSlug="calorie-calculator" />
        
        <div className="text-center max-w-2xl mx-auto mb-8">
          <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-zinc-900 dark:text-white mb-4">
            Calorie Calculator: Find Your Daily Calorie Needs (TDEE & BMR)
          </h1>
          
          {/* Direct Answer Paragraph - 40-60 words (48 words total) */}
          <p className="text-base sm:text-lg font-medium text-zinc-800 dark:text-zinc-300 bg-orange-50/50 dark:bg-orange-950/10 border border-orange-100 dark:border-orange-950/30 rounded-xl p-4 leading-relaxed mb-6">
            If you want to know how many calories should I eat to lose weight, our Calorie Calculator determines your personalized energy targets instantly. It maps your Basal Metabolic Rate (BMR) and Total Daily Energy Expenditure (TDEE) to show you how to safely structure a sustainable deficit, maintenance, or surplus.
          </p>
          
          <p className="text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed">
            Unlike standard web calculators that force you to re-run your details or buy subscriptions, QuickCalc instantly calculates your metabolic blueprint using the modern Mifflin-St Jeor formula. Get targeted cut, maintain, and bulk targets side-by-side in real-time.
          </p>
        </div>

        <ShareButtons url="https://quickcalc.cloud/tools/calorie-calculator" title="Calorie Calculator - Find Daily Calorie Needs" />
        <EmbedWidget url="https://quickcalc.cloud/tools/calorie-calculator" title="Calorie Calculator - Find Daily Calorie Needs" />

        {/* The interactive widget */}
        <section className="my-8">
          <CalorieCalculatorWidget />
        </section>

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
              About this Calorie Calculator
            </h2>
            <p className="text-zinc-600 dark:text-zinc-400 leading-relaxed">
              Achieving your fitness or health objectives requires a precise understanding of your body{"'"}s daily energy usage. Two vital scientific metrics establish this foundation: <strong>Basal Metabolic Rate (BMR)</strong> and <strong>Total Daily Energy Expenditure (TDEE)</strong>.
            </p>
            <p className="text-zinc-600 dark:text-zinc-400 leading-relaxed">
              Your <strong>BMR</strong> defines the baseline quantity of energy (in calories) your body burns to support vital cardiovascular, respiratory, and cellular operations while completely at rest. To expand this baseline into a real-world projection, your <strong>TDEE</strong> calculates your absolute daily energy expenditure by multiplying your BMR against a standard physical activity level factor. 
            </p>
            <p className="text-zinc-600 dark:text-zinc-400 leading-relaxed">
              While older online calculators continue to default to the 1918 Harris-Benedict formula, our Calorie Calculator leverages the <strong>Mifflin-St Jeor equation</strong>, widely accepted by clinical researchers and healthcare professionals as the modern gold standard. Studies prove that Mifflin-St Jeor represents actual metabolic demands with a highly reliable margin of error of less than 10%, giving you a vastly more precise platform for structuring diet plans than outdated historical models.
            </p>
            <p className="text-zinc-600 dark:text-zinc-400 leading-relaxed">
              Combining your dietary profiles with our related health indicators like the <Link href="/tools/bmi-calculator" className="text-orange-600 dark:text-orange-400 hover:underline font-semibold">BMI Calculator</Link> and mapping daily fluid requirements via the <Link href="/tools/water-intake-calculator" className="text-orange-600 dark:text-orange-400 hover:underline font-semibold">Water Intake Calculator</Link> lets you configure a highly cohesive, holistic physical wellness program without complex paywalls or email forms.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-bold text-zinc-950 dark:text-white">
              How the Mifflin-St Jeor Formula Works
            </h2>
            <p className="text-zinc-600 dark:text-zinc-400 leading-relaxed">
              Our calculator processes your inputs using the official sex-specific Mifflin-St Jeor equations to identify your BMR:
            </p>
            <ul className="list-disc pl-6 text-zinc-600 dark:text-zinc-400 space-y-2">
              <li>
                <strong>Male Equation:</strong> BMR = 10 × weight (kg) + 6.25 × height (cm) − 5 × age (years) + 5
              </li>
              <li>
                <strong>Female Equation:</strong> BMR = 10 × weight (kg) + 6.25 × height (cm) − 5 × age (years) − 161
              </li>
            </ul>
            <p className="text-zinc-600 dark:text-zinc-400 leading-relaxed mt-4">
              Once your BMR is established, your TDEE (maintenance calories) is generated by applying standard physical activity multipliers based on your selected level:
            </p>
            <ul className="list-disc pl-6 text-zinc-600 dark:text-zinc-400 space-y-2">
              <li><strong>Sedentary (desk job, low activity):</strong> BMR × 1.2</li>
              <li><strong>Lightly Active (light exercise 1–3 days/week):</strong> BMR × 1.375</li>
              <li><strong>Moderately Active (moderate exercise 3–5 days/week):</strong> BMR × 1.55</li>
              <li><strong>Very Active (strenuous exercise 6–7 days/week):</strong> BMR × 1.725</li>
              <li><strong>Extremely Active (intense daily exercise or physical job):</strong> BMR × 1.9</li>
            </ul>
          </section>

          {/* Ad Placement 2 */}
          <div className="ad-slot ad-slot--inline" data-ad-position="in-content-2">
            <div className="ad-placeholder-label border border-dashed border-zinc-300 dark:border-zinc-800 rounded-xl py-4 flex items-center justify-center bg-zinc-50/50 dark:bg-zinc-950/20 text-[10px] font-bold text-zinc-400 dark:text-zinc-600 uppercase tracking-widest cursor-default">
              Advertisement
            </div>
          </div>

          {/* FAQ section */}
          <section className="space-y-4 border-t border-zinc-200 dark:border-zinc-800 pt-8">
            <h2 className="text-2xl font-bold text-zinc-950 dark:text-white border-b border-zinc-100 dark:border-zinc-900 pb-2">
              Frequently Asked Questions (FAQ)
            </h2>
            <div className="space-y-6">
              
              <div className="space-y-2">
                <h3 className="text-base font-bold text-zinc-900 dark:text-zinc-100">
                  How many calories should I eat to lose weight?
                </h3>
                <p className="text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed">
                  To safely and sustainably lose weight, you should consume approximately 500 calories below your Total Daily Energy Expenditure (TDEE) each day. This moderate deficit of 500 kcal per day creates a cumulative weekly shortage of 3,500 calories, which translates to a highly reliable weight loss of roughly 0.5 kilograms or 1 pound of body fat per week.
                </p>
              </div>

              <div className="space-y-2">
                <h3 className="text-base font-bold text-zinc-900 dark:text-zinc-100">
                  What is the TDEE vs BMR difference?
                </h3>
                <p className="text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed">
                  The TDEE vs BMR difference lies in physical activity. Your Basal Metabolic Rate (BMR) is the baseline energy your body requires to survive at complete rest, while your Total Daily Energy Expenditure (TDEE) factors in all daily movement, exercise, and active processes by applying an activity multiplier to your BMR.
                </p>
              </div>

              <div className="space-y-2">
                <h3 className="text-base font-bold text-zinc-900 dark:text-zinc-100">
                  How to calculate maintenance calories?
                </h3>
                <p className="text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed">
                  To understand how to calculate maintenance calories, you first need to find your BMR using a standard formula (like Mifflin-St Jeor), and then multiply that number by your physical activity factor. This resulting total, known as your TDEE, represents the exact number of daily calories required to maintain your current body weight.
                </p>
              </div>

            </div>
          </section>
        </article>

        <RelatedTools currentSlug="calorie-calculator" />

        {/* Ad Placement Footer */}
        <div className="ad-slot ad-slot--footer mt-12" data-ad-position="footer">
          <div className="ad-placeholder-label border border-dashed border-zinc-300 dark:border-zinc-800 rounded-xl py-4 flex items-center justify-center bg-zinc-50/50 dark:bg-zinc-950/20 text-[10px] font-bold text-zinc-400 dark:text-zinc-600 uppercase tracking-widest cursor-default">
            Advertisement
          </div>
        </div>
      </main>

      {/* Footer */}
      <Footer customText="Sophisticated visual health & body energy calculators." />
    </div>
  );
}
