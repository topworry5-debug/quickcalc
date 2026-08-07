import { generateSoftwareAppSchema } from "@/lib/schema";
import HeaderLogo from "@/components/HeaderLogo";
import RelatedTools from "@/components/RelatedTools";
import ShareButtons from "@/components/ShareButtons";
import EmbedWidget from "@/components/EmbedWidget";

import ThemeToggle from "@/components/ThemeToggle";
import Breadcrumbs from "@/components/Breadcrumbs";
import type { Metadata } from "next";
import Link from "next/link";
import PregnancyWeightGainCalculatorWidget from "./PregnancyWeightGainCalculatorWidget";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "Pregnancy Weight Gain Calculator - Week & BMI Tracker",
  description: "Calculate healthy weight gain ranges week-by-week during pregnancy. Get personalized, science-backed targets based on your pre-pregnancy BMI.",
  alternates: {
    canonical: "/tools/pregnancy-weight-gain-calculator",
  },
  openGraph: {
    title: "Pregnancy Weight Gain Calculator - Week & BMI Tracker",
    description: "Calculate healthy weight gain ranges week-by-week during pregnancy. Get personalized, science-backed targets based on your pre-pregnancy BMI.",
    url: "https://quickcalc.cloud/tools/pregnancy-weight-gain-calculator",
    type: "website",
    siteName: "QuickCalc",
    images: [
      {
        url: "https://quickcalc.cloud/og-image.png",
        width: 1200,
        height: 630,
        alt: "Pregnancy Weight Gain Calculator on QuickCalc",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Pregnancy Weight Gain Calculator - Week & BMI Tracker",
    description: "Calculate healthy weight gain ranges week-by-week during pregnancy. Get personalized, science-backed targets based on your pre-pregnancy BMI.",
    images: ["https://quickcalc.cloud/og-image.png"],
  },
};

export default function PregnancyWeightGainCalculatorPage({ searchParams }: { searchParams?: { embed?: string } }) {
  const softwareSchema = generateSoftwareAppSchema({
    name: "Pregnancy Weight Gain Calculator - Week & BMI Tracker",
    description: "Calculate your healthy weight gain range week-by-week during pregnancy. Get personalized, supportive, and science-backed targets based on pre-pregnanc",
    slug: "pregnancy-weight-gain-calculator",
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
          <PregnancyWeightGainCalculatorWidget />
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
        "name": "How much weight should I gain during pregnancy based on my pre-pregnancy BMI?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Healthy weight gain depends on your starting Body Mass Index (BMI). According to clinical Institute of Medicine (IOM) guidelines, women with a normal pre-pregnancy BMI (18.5–24.9) should aim to gain 11.5–16 kg (25–35 lbs) over their pregnancy. Underweight women should aim for 12.5–18 kg, while overweight and obese women are recommended ranges of 7–11.5 kg and 5–9 kg respectively."
        }
      },
      {
        "@type": "Question",
        "name": "Is it normal to lose weight during the first trimester of pregnancy?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Yes, it is very common to lose a small amount of weight during the first trimester. This is typically caused by morning sickness, severe nausea, food aversions, or changes in appetite. If you experience significant weight loss or have difficulty keeping fluids down, consult your doctor or midwife for personalized care."
        }
      },
      {
        "@type": "Question",
        "name": "What is the recommended pregnancy weight gain timeline for twins?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Twin pregnancies have higher recommended weight gain ranges to support both babies. Under standard IOM guidelines, women with a normal starting BMI should gain 16.8–24.5 kg (37–54 lbs) with twins. For overweight starting BMIs, the target is 14.1–22.7 kg, and for obese starting BMIs, it is 11.3–19.1 kg."
        }
      },
      {
        "@type": "Question",
        "name": "What are the risks of gaining more than the recommended pregnancy weight?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Gaining more than the recommended guidelines is very common and often represents natural fluid retention or growth spurts. While excessive gain is statistically associated with higher risk of gestational diabetes, high blood pressure, or larger birth weight, these guidelines are not strict rules. Always speak with your healthcare provider to interpret weight changes compassionately rather than restricting food."
        }
      },
      {
        "@type": "Question",
        "name": "How is pregnancy weight gain distributed across trimesters?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "No, weight gain is highly non-linear throughout pregnancy. Most women gain very little weight (about 0.5 to 2 kg or 1 to 4.5 lbs) during the first trimester due to early fetal sizing and nausea. In the second and third trimesters, weight gain accelerates to a steady weekly rate of about 0.2 to 0.5 kg (0.5 to 1 lb) per week."
        }
      }
    ]
  };

  const articleData = {
    "@context": "https://schema.org",
    "@type": "Article",
    "headline": "Pregnancy Weight Gain Calculator: Healthy Range by Week & BMI",
    "description": "Calculate your personalized healthy pregnancy weight gain range week-by-week based on pre-pregnancy BMI according to IOM guidelines.",
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
        "url": "https://quickcalc.cloud/logo.png"
      }
    },
    "mainEntityOfPage": "https://quickcalc.cloud/tools/pregnancy-weight-gain-calculator"
  }

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
      <header className="border-b border-zinc-200 dark:border-zinc-800 bg-white/80 dark:bg-zinc-900/80 backdrop-blur-md sticky top-0 z-50 transition-colors">
        <div className="max-w-4xl mx-auto px-4 h-16 flex items-center justify-between">
          <HeaderLogo />
          <nav className="flex items-center gap-2 sm:gap-4">
            <Link href="/" className="text-sm font-medium text-zinc-600 dark:text-zinc-400 hover:text-teal-600 dark:hover:text-teal-400 transition-colors">
              Home
            </Link>
            <Link href="/blog" className="text-sm font-medium text-zinc-600 dark:text-zinc-400 hover:text-teal-600 dark:hover:text-teal-400 transition-colors">
              Blog
            </Link>
            <span className="text-sm font-medium text-zinc-300 dark:text-zinc-700">|</span>
            <span className="text-sm font-medium text-zinc-400 dark:text-zinc-600">Pregnancy Weight Calculator</span>
            <span className="text-sm font-medium text-zinc-300 dark:text-zinc-700">|</span>
            <ThemeToggle />
          </nav>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-4xl mx-auto px-4 py-8 sm:py-12">
        <Breadcrumbs toolName="Pregnancy Weight Gain Calculator" toolSlug="pregnancy-weight-gain-calculator" />
        
        <div className="max-w-3xl mx-auto mb-8">
          <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-zinc-900 dark:text-white mb-4 text-center">
            Pregnancy Weight Gain Calculator: Healthy Range by Week & BMI
          </h1>
          
          {/* Direct Answer Paragraph - written to stand alone for AI Answer Engines */}
          <p className="text-base sm:text-lg text-zinc-700 dark:text-zinc-300 leading-relaxed font-medium bg-teal-50/30 dark:bg-teal-950/10 p-5 rounded-2xl border border-teal-100/50 dark:border-teal-900/20 mb-6 text-center">
            Healthy pregnancy weight gain is highly personalized and depends directly on your pre-pregnancy BMI. According to the Institute of Medicine (IOM) guidelines, recommended total weight gain ranges are 12.5–18 kg for underweight women (BMI {"< 18.5"}), 11.5–16 kg for normal weight (BMI 18.5–24.9), 7–11.5 kg for overweight (BMI 25–29.9), and 5–9 kg for obese individuals (BMI 30+).
          </p>
        </div>

        <ShareButtons url="https://quickcalc.cloud/tools/pregnancy-weight-gain-calculator" title="Pregnancy Weight Gain Calculator" />
        <EmbedWidget url="https://quickcalc.cloud/tools/pregnancy-weight-gain-calculator" title="Pregnancy Weight Gain Calculator" />

        {/* The interactive widget */}
        <section className="my-8">
          <PregnancyWeightGainCalculatorWidget />
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
              About Our Pregnancy Weight Gain Tracker
            </h2>
            <p className="text-zinc-600 dark:text-zinc-400 leading-relaxed">
              The Institute of Medicine (IOM) and National Research Council guidelines offer a scientifically backed framework for healthy gestational weight gain, recognizing that a one-size-fits-all target is clinically inappropriate. By tailoring weight recommendations to pre-pregnancy Body Mass Index (BMI), healthcare providers can better support maternal health and fetal development. Your pre-pregnancy BMI serves as an indicator of nutritional reserves; thus, individuals starting with a lower BMI are advised to gain more to support the baby{"'"}s growth, while those starting with a higher BMI have lower recommended ranges.
            </p>
            <p className="text-zinc-600 dark:text-zinc-400 leading-relaxed">
              Furthermore, weight gain is not a linear, uniform process across the 40 weeks of gestation. During the first trimester (weeks 1 to 12), physical weight changes are typically minimal, often ranging from just 0.5 to 2.0 kilograms (1 to 4.5 pounds) total, as the embryo is small and many experience temporary nausea. In contrast, during the second and third trimesters, weight gain accelerates to a steady, predictable weekly rate (approximately 0.2 to 0.5 kilograms or 0.5 to 1.0 pound per week, depending on BMI category). This acceleration supports rapid fetal organ growth, placenta development, increased blood volume, and amniotic fluid expansion. Tracking your progress week-by-week provides a healthier, more accurate perspective than focusing strictly on the final number, reminding us that weight gain is a dynamic process unique to every mother and child.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-bold text-zinc-950 dark:text-white">
              Why Pre-Pregnancy BMI Matters for Healthy Weight Gain
            </h2>
            <p className="text-zinc-600 dark:text-zinc-400 leading-relaxed">
              Before calculating your gestational gains, understanding your pre-pregnancy weight category is vital. You can easily find this by using our dedicated{" "}
              <Link href="/tools/bmi-calculator" className="text-teal-600 dark:text-teal-400 underline font-medium hover:text-teal-700">
                BMI Calculator
              </Link>{" "}
              for consistency. Standard categories define different metabolic baselines. A lower baseline BMI means your body requires additional caloric intake and nutrient storage to successfully build gestational tissue, whereas a higher pre-pregnancy BMI means there are more existing energy reserves available, reducing the necessary gestational weight addition.
            </p>
            <p className="text-zinc-600 dark:text-zinc-400 leading-relaxed">
              Along with tracking your healthy range, pinpointing your pregnancy milestones is equally helpful. We recommend utilizing our{" "}
              <Link href="/tools/due-date-calculator" className="text-teal-600 dark:text-teal-400 underline font-medium hover:text-teal-700">
                Due Date Calculator
              </Link>{" "}
              to map your calendar week-by-week, since users tracking weight gain by week naturally want to understand their exact due date and trimester boundaries.
            </p>
          </section>

          {/* Ad Placement 2 */}
          <div className="ad-slot ad-slot--inline" data-ad-position="in-content-2">
            <div className="ad-placeholder-label border border-dashed border-zinc-300 dark:border-zinc-800 rounded-xl py-4 flex items-center justify-center bg-zinc-50/50 dark:bg-zinc-950/20 text-[10px] font-bold text-zinc-400 dark:text-zinc-600 uppercase tracking-widest cursor-default">
              Advertisement
            </div>
          </div>

          {/* FAQ Section */}
          <section className="space-y-4 border-t border-zinc-200 dark:border-zinc-800 pt-8">
            <h2 className="text-2xl font-bold text-zinc-950 dark:text-white border-b border-zinc-100 dark:border-zinc-900 pb-2">
              Frequently Asked Questions (FAQ)
            </h2>
            <div className="space-y-6">
              <div className="space-y-2">
                <h3 className="text-base font-bold text-zinc-900 dark:text-zinc-100">
                  How much weight should I gain during pregnancy based on my pre-pregnancy BMI?
                </h3>
                <p className="text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed">
                  Healthy weight gain depends on your starting Body Mass Index (BMI). According to clinical Institute of Medicine (IOM) guidelines, women with a normal pre-pregnancy BMI (18.5–24.9) should aim to gain 11.5–16 kg (25–35 lbs) over their pregnancy. Underweight women should aim for 12.5–18 kg, while overweight and obese women are recommended ranges of 7–11.5 kg and 5–9 kg respectively.
                </p>
              </div>

              <div className="space-y-2">
                <h3 className="text-base font-bold text-zinc-900 dark:text-zinc-100">
                  Is it normal to lose weight during the first trimester of pregnancy?
                </h3>
                <p className="text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed">
                  Yes, it is very common to lose a small amount of weight during the first trimester. This is typically caused by morning sickness, severe nausea, food aversions, or changes in appetite. If you experience significant weight loss or have difficulty keeping fluids down, consult your doctor or midwife for personalized care.
                </p>
              </div>

              <div className="space-y-2">
                <h3 className="text-base font-bold text-zinc-900 dark:text-zinc-100">
                  What is the recommended pregnancy weight gain timeline for twins?
                </h3>
                <p className="text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed">
                  Twin pregnancies have higher recommended weight gain ranges to support both babies. Under standard IOM guidelines, women with a normal starting BMI should gain 16.8–24.5 kg (37–54 lbs) with twins. For overweight starting BMIs, the target is 14.1–22.7 kg, and for obese starting BMIs, it is 11.3–19.1 kg.
                </p>
              </div>

              <div className="space-y-2">
                <h3 className="text-base font-bold text-zinc-900 dark:text-zinc-100">
                  What are the risks of gaining more than the recommended pregnancy weight?
                </h3>
                <p className="text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed">
                  Gaining more than the recommended guidelines is very common and often represents natural fluid retention or growth spurts. While excessive gain is statistically associated with higher risk of gestational diabetes, high blood pressure, or larger birth weight, these guidelines are not strict rules. Always speak with your healthcare provider to interpret weight changes compassionately rather than restricting food.
                </p>
              </div>

              <div className="space-y-2">
                <h3 className="text-base font-bold text-zinc-900 dark:text-zinc-100">
                  How is pregnancy weight gain distributed across trimesters?
                </h3>
                <p className="text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed">
                  No, weight gain is highly non-linear throughout pregnancy. Most women gain very little weight (about 0.5 to 2 kg or 1 to 4.5 lbs) during the first trimester due to early fetal sizing and nausea. In the second and third trimesters, weight gain accelerates to a steady weekly rate of about 0.2 to 0.5 kg (0.5 to 1 lb) per week.
                </p>
              </div>
            </div>
          </section>
        </article>

        <RelatedTools currentSlug="pregnancy-weight-gain-calculator" />

        {/* Ad Placement Footer */}
        <div className="ad-slot ad-slot--footer mt-12" data-ad-position="footer">
          <div className="ad-placeholder-label border border-dashed border-zinc-300 dark:border-zinc-800 rounded-xl py-4 flex items-center justify-center bg-zinc-50/50 dark:bg-zinc-950/20 text-[10px] font-bold text-zinc-400 dark:text-zinc-600 uppercase tracking-widest cursor-default">
            Advertisement
          </div>
        </div>
      </main>

      {/* Footer */}
      <Footer customText="Gentle, personalized gestational weight monitoring guidelines." />
    </div>
  );
}
