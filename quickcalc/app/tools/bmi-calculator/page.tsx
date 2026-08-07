import Navbar from "@/components/Navbar";
import { generateSoftwareAppSchema } from "@/lib/schema";
import RelatedTools from "@/components/RelatedTools";
import ShareButtons from "@/components/ShareButtons";
import EmbedWidget from "@/components/EmbedWidget";



import Breadcrumbs from "@/components/Breadcrumbs";

import type { Metadata } from "next";
import BMICalculatorWidget from "./BMICalculatorWidget";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "Free BMI Calculator - Instant Body Mass Index Screener",
  description: "Calculate your body mass index (BMI) instantly. Check your healthy weight range with our live interactive gauge. No signup or email required.",
  alternates: {
    canonical: "/tools/bmi-calculator",
  },
  openGraph: {
    title: "Free BMI Calculator - Instant Body Mass Index Screener",
    description: "Calculate your body mass index (BMI) instantly. Check your healthy weight range with our live interactive gauge. No signup or email required.",
    url: "https://quickcalc.cloud/tools/bmi-calculator",
    type: "website",
    siteName: "QuickCalc",
    images: [
      {
        url: "https://quickcalc.cloud/og-image.png",
        width: 1200,
        height: 630,
        alt: "BMI Calculator on QuickCalc",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Free BMI Calculator - Instant Body Mass Index Screener",
    description: "Calculate your body mass index (BMI) instantly. Check your healthy weight range with our live interactive gauge. No signup or email required.",
    images: ["https://quickcalc.cloud/og-image.png"],
  },
};

export default function BMICalculatorPage({ searchParams }: { searchParams?: { embed?: string } }) {
  const softwareSchema = generateSoftwareAppSchema({
    name: "Free BMI Calculator - Instant Body Mass Index Screener",
    description: "Calculate your body mass index (BMI) instantly. Check your healthy weight range with our live interactive gauge. No signup or email required.",
    slug: "bmi-calculator",
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
          <BMICalculatorWidget />
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
        "name": "What is a healthy BMI range for adults?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "For most adults, a healthy BMI (Body Mass Index) is clinically defined as falling within the range of 18.5 to 24.9. Scores below 18.5 represent underweight status, scores from 25 to 29.9 indicate overweight classification, and a score of 30 or higher designates obesity."
        }
      },
      {
        "@type": "Question",
        "name": "Why is BMI not accurate for athletes or bodybuilders?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "No, BMI is not always accurate for athletes, bodybuilders, and individuals with dense muscle tissue. Because muscle weighs significantly more than fat per cubic inch, a highly fit athlete can register as 'overweight' or 'obese' on the BMI scale despite having very low body fat."
        }
      },
      {
        "@type": "Question",
        "name": "How do I calculate my BMI manually using kg and cm or lbs and inches?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "To calculate BMI by hand using the metric system, divide your weight in kilograms by your height in meters squared (BMI = kg/m²). For the imperial system, multiply your weight in pounds by 703, then divide that number by your height in inches squared: BMI = (lbs x 703) / inches²."
        }
      },
      {
        "@type": "Question",
        "name": "How does a BMI calculator for adults differ from child growth charts?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "For adults, BMI is interpreted using fixed weight categories that apply equally regardless of age or sex. For children and teens, however, a BMI calculator for adults vs children differs because youth body fat changes rapidly as they grow and differs significantly between boys and girls, requiring plotting on age-and-gender-specific growth percentiles."
        }
      }
    ]
  };

  const softwareData = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    "name": "BMI Calculator",
    "operatingSystem": "All",
    "applicationCategory": "HealthApplication",
    "offers": {
      "@type": "Offer",
      "price": "0",
      "priceCurrency": "USD"
    }
  }

  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-zinc-950 text-zinc-900 dark:text-zinc-100 font-[family-name:var(--font-geist-sans)] transition-colors">
      {/* FAQ Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqData) }}
      />
      {/* Software Application Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(softwareData) }}
      />

      {/* Header */}
      <Navbar />

      {/* Main Content */}
      <main className="max-w-4xl mx-auto px-4 py-8 sm:py-12">
        <Breadcrumbs toolName="BMI Calculator" toolSlug="bmi-calculator" />
        <div className="text-center max-w-2xl mx-auto mb-8">
          <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-zinc-900 dark:text-white mb-4">
            BMI Calculator
          </h1>
          <p className="text-base sm:text-lg text-zinc-600 dark:text-zinc-400 leading-relaxed">This free tool calculates your Body Mass Index (BMI) using your height and weight according to World Health Organization (WHO) clinical classification standards. If you are wondering what is a healthy BMI and how your body composition compares to clinical standards, our free BMI Calculator provides an instant analysis. This science-backed screening utility helps you evaluate body weight classifications against World Health Organization bands, serving as an accessible starting point for evaluating general body composition trends and overall health trajectories.</p>
        </div>

        <ShareButtons url="https://quickcalc.cloud/tools/bmi-calculator" title="BMI Calculator" />
        <EmbedWidget url="https://quickcalc.cloud/tools/bmi-calculator" title="BMI Calculator" />

        {/* The interactive widget */}
        <section className="my-8">
          <BMICalculatorWidget />
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
              About Our Body Mass Index (BMI) Calculator
            </h2>
            <p className="text-zinc-600 dark:text-zinc-400 leading-relaxed">
              Body Mass Index is a simple mathematical ratio designed to categorize individuals into weight bands that reflect statistical medical trends. First conceptualized by Adolphe Quetelet in the 19th century, the BMI calculation divides your weight in kilograms by your squared height in meters (kg/m²). This clinical screening tool allows practitioners and epidemiologists to quickly categorize populations and monitor risk indicators associated with cardiovascular stress, diabetes, and metabolic health.
            </p>
            <p className="text-zinc-600 dark:text-zinc-400 leading-relaxed">
              Unlike other generic web-based converters that gate accurate analysis, QuickCalc offers this tool <strong>100% free with absolutely zero sign-ins, zero email capture, and zero hidden paywalls</strong>. We believe critical health modeling parameters should be fully accessible to everyone instantly.
            </p>
            <p className="text-zinc-600 dark:text-zinc-400 leading-relaxed">
              However, BMI is not a diagnostic tool and has distinct biological limitations. Because the calculation strictly relies on gross physical measurements, it is unable to differentiate between lean muscle mass, skeletal structures, water volume, and adipose tissue. This means individuals with advanced athletic training or high bone density frequently receive high BMI scores that do not represent their actual cardiovascular or metabolic state. Additionally, ideal body weight standards vary significantly across children, pregnant populations, and unique ethnic backgrounds. This utility should always be utilized as a basic estimate, never as direct medical advice.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-bold text-zinc-950 dark:text-white">
              How BMI is Calculated (Standard Metric and Imperial Formulas)
            </h2>
            <p className="text-zinc-600 dark:text-zinc-400 leading-relaxed">
              To calculate Body Mass Index (BMI), we use standard metric or imperial equations based on your preferred units:
            </p>
            <ul className="list-disc pl-6 text-zinc-600 dark:text-zinc-400 space-y-2">
              <li>
                <strong>Metric Formula:</strong> BMI = Weight (kg) / [Height (m)]²
              </li>
              <li>
                <strong>Imperial Formula:</strong> BMI = [Weight (lbs) / [Height (in)]²] x 703
              </li>
            </ul>
            <p className="text-zinc-600 dark:text-zinc-400 leading-relaxed mt-2">
              The resulting score is automatically mapped directly to clinical WHO guidelines to identify if your body mass falls within underweight, normal, overweight, or obese ranges.
            </p>
          </section>

          {/* Ad Placement 2 */}
          <div className="ad-slot ad-slot--inline" data-ad-position="in-content-2">
            <div className="ad-placeholder-label border border-dashed border-zinc-300 dark:border-zinc-800 rounded-xl py-4 flex items-center justify-center bg-zinc-50/50 dark:bg-zinc-950/20 text-[10px] font-bold text-zinc-400 dark:text-zinc-600 uppercase tracking-widest cursor-default">
              Advertisement
            </div>
          </div>

          {/* FAQ open style matching Age Calculator and Currency Converter */}
          <section className="space-y-4 border-t border-zinc-200 dark:border-zinc-800 pt-8">
            <h2 className="text-2xl font-bold text-zinc-950 dark:text-white border-b border-zinc-100 dark:border-zinc-900 pb-2">
              Frequently Asked Questions (FAQ)
            </h2>
            <div className="space-y-6">
              <div className="space-y-2">
                <h3 className="text-base font-bold text-zinc-900 dark:text-zinc-100">
                  What is a healthy BMI range for adults?
                </h3>
                <p className="text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed">
                  For most adults, a healthy BMI (Body Mass Index) is clinically defined as falling within the range of 18.5 to 24.9. Scores below 18.5 represent underweight status, scores from 25 to 29.9 indicate overweight classification, and a score of 30 or higher designates obesity.
                </p>
              </div>

              <div className="space-y-2">
                <h3 className="text-base font-bold text-zinc-900 dark:text-zinc-100">
                  Why is BMI not accurate for athletes or bodybuilders?
                </h3>
                <p className="text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed">
                  No, BMI is not always accurate for athletes, bodybuilders, and individuals with dense muscle tissue. Because muscle weighs significantly more than fat per cubic inch, a highly fit athlete can register as {"'overweight'"} or {"'obese'"} on the BMI scale despite having extremely low body fat.
                </p>
              </div>

              <div className="space-y-2">
                <h3 className="text-base font-bold text-zinc-900 dark:text-zinc-100">
                  How do I calculate my BMI manually using kg and cm or lbs and inches?
                </h3>
                <p className="text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed">
                  To calculate BMI by hand using the metric system, divide your weight in kilograms by your height in meters squared (BMI = kg/m²). For the imperial system, multiply your weight in pounds by 703, then divide that number by your height in inches squared: BMI = (lbs x 703) / inches².
                </p>
              </div>

              <div className="space-y-2">
                <h3 className="text-base font-bold text-zinc-900 dark:text-zinc-100">
                  How does a BMI calculator for adults differ from child growth charts?
                </h3>
                <p className="text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed">
                  For adults, BMI is interpreted using fixed weight categories that apply equally regardless of age or sex. For children and teens, however, a BMI calculator for adults vs children differs because youth body fat changes rapidly as they grow and differs significantly between boys and girls, requiring plotting on age-and-gender-specific growth percentiles.
                </p>
              </div>
            </div>
          </section>
        </article>

        <RelatedTools currentSlug="bmi-calculator" />

        {/* Ad Placement Footer */}
        <div className="ad-slot ad-slot--footer mt-12" data-ad-position="footer">
          <div className="ad-placeholder-label border border-dashed border-zinc-300 dark:border-zinc-800 rounded-xl py-4 flex items-center justify-center bg-zinc-50/50 dark:bg-zinc-950/20 text-[10px] font-bold text-zinc-400 dark:text-zinc-600 uppercase tracking-widest cursor-default">
            Advertisement
          </div>
        </div>
      </main>

      {/* Footer */}
      <Footer customText="Elegant, clinical body composition screeners." />
    </div>
  );
}
