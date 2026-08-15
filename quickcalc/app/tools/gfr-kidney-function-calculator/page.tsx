import MethodologyAccordion from "@/components/MethodologyAccordion";
import { Suspense } from "react";
import Navbar from "@/components/Navbar";
import { generateSoftwareAppSchema } from "@/lib/schema";
import RelatedTools from "@/components/RelatedTools";
import ShareButtons from "@/components/ShareButtons";
import EmbedWidget from "@/components/EmbedWidget";
import Breadcrumbs from "@/components/Breadcrumbs";
import Link from "next/link";
import type { Metadata } from "next";
import GFRCalculatorWidget from "./GFRCalculatorWidget";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "Free GFR Calculator - 2021 CKD-EPI Kidney Function Screener",
  description:
    "Calculate your estimated Glomerular Filtration Rate (eGFR) instantly using the 2021 race-free CKD-EPI creatinine equation. Check CKD stages with a live color-coded gauge. 100% free with zero sign-ups.",
  alternates: {
    canonical: "/tools/gfr-kidney-function-calculator",
  },
  openGraph: {
    title: "Free GFR Calculator - 2021 CKD-EPI Kidney Function Screener",
    description:
      "Calculate your estimated Glomerular Filtration Rate (eGFR) instantly using the 2021 race-free CKD-EPI creatinine equation. Check CKD stages with a live color-coded gauge. 100% free with zero sign-ups.",
    url: "https://quickcalc.cloud/tools/gfr-kidney-function-calculator",
    type: "website",
    siteName: "QuickCalc",
    images: [
      {
        url: "https://quickcalc.cloud/og-image.png",
        width: 1200,
        height: 630,
        alt: "GFR Kidney Function Calculator on QuickCalc",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Free GFR Calculator - 2021 CKD-EPI Kidney Function Screener",
    description:
      "Calculate your estimated Glomerular Filtration Rate (eGFR) instantly using the 2021 race-free CKD-EPI creatinine equation. Check CKD stages with a live color-coded gauge. 100% free with zero sign-ups.",
  },
};

export default function GFRCalculatorPage({
  searchParams,
}: {
  searchParams?: { embed?: string };
}) {
  const softwareSchema = generateSoftwareAppSchema({
    name: "Free GFR Calculator - 2021 CKD-EPI Kidney Function Screener",
    description:
      "Calculate your estimated Glomerular Filtration Rate (eGFR) instantly using the 2021 race-free CKD-EPI creatinine equation. Check CKD stages with a live color-coded gauge. 100% free with zero sign-ups.",
    slug: "gfr-kidney-function-calculator",
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
          <GFRCalculatorWidget />
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
        name: "What is eGFR and why is it important?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Estimated Glomerular Filtration Rate (eGFR) measures how efficiently your kidneys filter metabolic waste products like creatinine from your bloodstream. It is the primary metric used by medical practitioners and nephrologists to diagnose and monitor Chronic Kidney Disease (CKD).",
        },
      },
      {
        "@type": "Question",
        name: "Why does the 2021 CKD-EPI formula not ask for race?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "In 2021, the National Kidney Foundation (NKF) and the American Society of Nephrology (ASN) established a joint task force that recommended replacing older equations with the 2021 CKD-EPI creatinine equation. This refactored equation removes race variables to eliminate racial bias while maintaining high diagnostic precision.",
        },
      },
      {
        "@type": "Question",
        name: "What is a normal eGFR level by age?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "For young and healthy adults, a normal eGFR is 90 mL/min/1.73m² or higher (Stage 1). Because kidney function naturally declines gradually with age, average eGFR levels decrease over time: ~99 for ages 20–29, ~93 for ages 30–39, ~85 for ages 40–49, ~75 for ages 50–59, and ~60–70 for ages 60+.",
        },
      },
      {
        "@type": "Question",
        name: "How are Chronic Kidney Disease (CKD) stages defined?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "CKD is clinically categorized into 5 primary stages based on eGFR in mL/min/1.73m²: Stage 1 (≥90, normal or high), Stage 2 (60–89, mildly decreased), Stage 3a (45–59, mild to moderate loss), Stage 3b (30–44, moderate to severe loss), Stage 4 (15–29, severely decreased), and Stage 5 (<15, kidney failure).",
        },
      },
    ],
  };

  const softwareData = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: "GFR Calculator",
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
        <Breadcrumbs toolName="GFR Calculator" toolSlug="gfr-kidney-function-calculator" />
        
        <div className="text-center max-w-2xl mx-auto mb-8">
          <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-zinc-900 dark:text-white mb-4">
            GFR & Kidney Function Calculator
          </h1>
          <p className="text-base sm:text-lg text-zinc-600 dark:text-zinc-400 leading-relaxed">
            Calculate your estimated Glomerular Filtration Rate (eGFR) instantly using the official <strong>2021 race-free CKD-EPI creatinine equation</strong>. Evaluate clinical Chronic Kidney Disease (CKD) stages, view stage ranges, and generate detailed PDF health reports with zero sign-ups or paywalls.
          </p>
        </div>

        <ShareButtons
          url="https://quickcalc.cloud/tools/gfr-kidney-function-calculator"
          title="GFR / Kidney Function Calculator"
        />
        <EmbedWidget
          url="https://quickcalc.cloud/tools/gfr-kidney-function-calculator"
          title="GFR / Kidney Function Calculator"
        />

        {/* Interactive Widget */}
        <section className="my-8">
          <Suspense
            fallback={
              <div className="p-8 text-center text-zinc-500 animate-pulse">
                Loading GFR calculator...
              </div>
            }
          >
            <GFRCalculatorWidget />
          </Suspense>
        </section>

        {/* Methodology Accordion */}
        <MethodologyAccordion slug="gfr-kidney-function-calculator" />

        {/* Inline Ad Slot 1 */}
        <div className="ad-slot ad-slot--inline" data-ad-position="in-content-1">
          <div className="ad-placeholder-label border border-dashed border-zinc-300 dark:border-zinc-800 rounded-xl py-4 flex items-center justify-center bg-zinc-50/50 dark:bg-zinc-950/20 text-[10px] font-bold text-zinc-400 dark:text-zinc-600 uppercase tracking-widest cursor-default">
            Advertisement
          </div>
        </div>

        {/* Educational Content Article */}
        <article className="prose prose-zinc dark:prose-invert max-w-3xl mx-auto space-y-8 mt-12 border-t border-zinc-200 dark:border-zinc-800 pt-10">
          <section className="space-y-4">
            <h2 className="text-2xl font-bold text-zinc-950 dark:text-white">
              Understanding eGFR and Kidney Function Screening
            </h2>
            <p className="text-zinc-600 dark:text-zinc-400 leading-relaxed">
              Glomerular Filtration Rate (GFR) is widely recognized as the single best overall index of kidney function in clinical medicine. It reflects the total volume of blood fluid filtered by the kidney glomeruli per minute, normalized for standard body surface area (1.73 m²).
            </p>
            <p className="text-zinc-600 dark:text-zinc-400 leading-relaxed">
              Because direct measurement of GFR requires invasive continuous IV infusions of exogenous filtration markers (such as iohexol or inulin), clinical practice relies on <strong>estimated GFR (eGFR)</strong> derived from blood serum creatinine concentrations, biological sex, and age.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-bold text-zinc-950 dark:text-white">
              The 2021 CKD-EPI Race-Free Equation Standard
            </h2>
            <p className="text-zinc-600 dark:text-zinc-400 leading-relaxed">
              In 2021, the National Kidney Foundation (NKF) and the American Society of Nephrology (ASN) Task Force recommended the immediate adoption of the 2021 CKD-EPI creatinine equation across all medical laboratories. This updated clinical standard removes race-based coefficients, providing a standardized, equitable formula for estimating renal function across all patient populations.
            </p>
            <div className="p-4 rounded-xl bg-zinc-100 dark:bg-zinc-900 font-mono text-xs text-zinc-800 dark:text-zinc-200 overflow-x-auto">
              eGFR = 142 × min(Scr/κ, 1)^α × max(Scr/κ, 1)^-1.200 × 0.9938^Age × [1.012 if Female]
            </div>
            <p className="text-xs text-zinc-500 dark:text-zinc-400">
              Where Scr is serum creatinine (mg/dL), κ is 0.7 for females and 0.9 for males, and α is -0.241 for females and -0.302 for males.
            </p>
            <p className="text-zinc-600 dark:text-zinc-400 leading-relaxed mt-3">
              To monitor additional key physical health indicators, calculate your Body Mass Index using our free <Link href="/tools/bmi-calculator" className="text-emerald-600 dark:text-emerald-400 font-semibold underline hover:text-emerald-700">BMI Calculator</Link> or estimate daily hydration recommendations with our <Link href="/tools/water-intake-calculator" className="text-emerald-600 dark:text-emerald-400 font-semibold underline hover:text-emerald-700">Water Intake Calculator</Link>.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-bold text-zinc-950 dark:text-white">
              Chronic Kidney Disease (CKD) Stages Breakdown
            </h2>
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs border-collapse border border-zinc-200 dark:border-zinc-800">
                <thead>
                  <tr className="bg-zinc-100 dark:bg-zinc-900 text-zinc-900 dark:text-zinc-100">
                    <th className="p-2.5 border border-zinc-200 dark:border-zinc-800 font-bold">Stage</th>
                    <th className="p-2.5 border border-zinc-200 dark:border-zinc-800 font-bold">eGFR Range (mL/min/1.73m²)</th>
                    <th className="p-2.5 border border-zinc-200 dark:border-zinc-800 font-bold">Clinical Description</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-zinc-200 dark:divide-zinc-800 text-zinc-600 dark:text-zinc-400">
                  <tr>
                    <td className="p-2.5 border border-zinc-200 dark:border-zinc-800 font-semibold text-emerald-600 dark:text-emerald-400">Stage 1</td>
                    <td className="p-2.5 border border-zinc-200 dark:border-zinc-800 font-mono">≥ 90</td>
                    <td className="p-2.5 border border-zinc-200 dark:border-zinc-800">Normal or high kidney function</td>
                  </tr>
                  <tr>
                    <td className="p-2.5 border border-zinc-200 dark:border-zinc-800 font-semibold text-teal-600 dark:text-teal-400">Stage 2</td>
                    <td className="p-2.5 border border-zinc-200 dark:border-zinc-800 font-mono">60 – 89</td>
                    <td className="p-2.5 border border-zinc-200 dark:border-zinc-800">Mildly decreased kidney function</td>
                  </tr>
                  <tr>
                    <td className="p-2.5 border border-zinc-200 dark:border-zinc-800 font-semibold text-amber-600 dark:text-amber-400">Stage 3a</td>
                    <td className="p-2.5 border border-zinc-200 dark:border-zinc-800 font-mono">45 – 59</td>
                    <td className="p-2.5 border border-zinc-200 dark:border-zinc-800">Mild to moderate loss of kidney function</td>
                  </tr>
                  <tr>
                    <td className="p-2.5 border border-zinc-200 dark:border-zinc-800 font-semibold text-orange-600 dark:text-orange-400">Stage 3b</td>
                    <td className="p-2.5 border border-zinc-200 dark:border-zinc-800 font-mono">30 – 44</td>
                    <td className="p-2.5 border border-zinc-200 dark:border-zinc-800">Moderate to severe loss of kidney function</td>
                  </tr>
                  <tr>
                    <td className="p-2.5 border border-zinc-200 dark:border-zinc-800 font-semibold text-rose-600 dark:text-rose-400">Stage 4</td>
                    <td className="p-2.5 border border-zinc-200 dark:border-zinc-800 font-mono">15 – 29</td>
                    <td className="p-2.5 border border-zinc-200 dark:border-zinc-800">Severe loss of kidney function</td>
                  </tr>
                  <tr>
                    <td className="p-2.5 border border-zinc-200 dark:border-zinc-800 font-semibold text-purple-600 dark:text-purple-400">Stage 5</td>
                    <td className="p-2.5 border border-zinc-200 dark:border-zinc-800 font-mono">&lt; 15</td>
                    <td className="p-2.5 border border-zinc-200 dark:border-zinc-800">Kidney failure (End-Stage Renal Disease)</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </section>

          {/* Inline Ad Slot 2 */}
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
                  What is eGFR and why is it important?
                </h3>
                <p className="text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed">
                  Estimated Glomerular Filtration Rate (eGFR) measures how efficiently your kidneys filter metabolic waste products like creatinine from your bloodstream. It is the primary metric used by medical practitioners and nephrologists to diagnose and monitor Chronic Kidney Disease (CKD).
                </p>
              </div>

              <div className="space-y-2">
                <h3 className="text-base font-bold text-zinc-900 dark:text-zinc-100">
                  Why does the 2021 CKD-EPI formula not ask for race?
                </h3>
                <p className="text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed">
                  In 2021, the National Kidney Foundation (NKF) and the American Society of Nephrology (ASN) established a joint task force that recommended replacing older equations with the 2021 CKD-EPI creatinine equation. This refactored equation removes race variables to eliminate racial bias while maintaining high diagnostic precision.
                </p>
              </div>

              <div className="space-y-2">
                <h3 className="text-base font-bold text-zinc-900 dark:text-zinc-100">
                  What is a normal eGFR level by age?
                </h3>
                <p className="text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed">
                  For young and healthy adults, a normal eGFR is 90 mL/min/1.73m² or higher (Stage 1). Because kidney function naturally declines gradually with age, average eGFR levels decrease over time: ~99 for ages 20–29, ~93 for ages 30–39, ~85 for ages 40–49, ~75 for ages 50–59, and ~60–70 for ages 60+.
                </p>
              </div>

              <div className="space-y-2">
                <h3 className="text-base font-bold text-zinc-900 dark:text-zinc-100">
                  How are Chronic Kidney Disease (CKD) stages defined?
                </h3>
                <p className="text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed">
                  CKD is clinically categorized into 5 primary stages based on eGFR in mL/min/1.73m²: Stage 1 (≥90, normal or high), Stage 2 (60–89, mildly decreased), Stage 3a (45–59, mild to moderate loss), Stage 3b (30–44, moderate to severe loss), Stage 4 (15–29, severely decreased), and Stage 5 (&lt;15, kidney failure).
                </p>
              </div>
            </div>
          </section>
        </article>

        <RelatedTools currentSlug="gfr-kidney-function-calculator" />

        {/* Ad Placement Footer */}
        <div className="ad-slot ad-slot--footer mt-12" data-ad-position="footer">
          <div className="ad-placeholder-label border border-dashed border-zinc-300 dark:border-zinc-800 rounded-xl py-4 flex items-center justify-center bg-zinc-50/50 dark:bg-zinc-950/20 text-[10px] font-bold text-zinc-400 dark:text-zinc-600 uppercase tracking-widest cursor-default">
            Advertisement
          </div>
        </div>
      </main>

      {/* Footer */}
      <Footer customText="Science-backed clinical kidney function screeners." />
    </div>
  );
}
