import { generateSoftwareAppSchema } from "@/lib/schema";
import HeaderLogo from "@/components/HeaderLogo";
import RelatedTools from "@/components/RelatedTools";
import ShareButtons from "@/components/ShareButtons";
import EmbedWidget from "@/components/EmbedWidget";

import ThemeToggle from "@/components/ThemeToggle";
import Breadcrumbs from "@/components/Breadcrumbs";
import type { Metadata } from "next";
import Link from "next/link";
import GPAConverterWidget from "./GPAConverterWidget";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "GPA Converter - Convert Percentage to 4.0 Scale Easily",
  description: "Convert international percentage grades and letter grades from the US, UK, Canada, India, and Pakistan to the standard 4.0 GPA scale instantly.",
  alternates: {
    canonical: "/tools/gpa-converter",
  },
  openGraph: {
    title: "GPA Converter - Convert Percentage to 4.0 Scale Easily",
    description: "Convert international percentage grades and letter grades from the US, UK, Canada, India, and Pakistan to the standard 4.0 GPA scale instantly.",
    url: "https://quickcalc.cloud/tools/gpa-converter",
    type: "website",
    siteName: "QuickCalc",
    images: [
      {
        url: "https://quickcalc.cloud/og-image.png",
        width: 1200,
        height: 630,
        alt: "GPA Converter on QuickCalc",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "GPA Converter - Convert Percentage to 4.0 Scale Easily",
    description: "Convert international percentage grades and letter grades from the US, UK, Canada, India, and Pakistan to the standard 4.0 GPA scale instantly.",
    images: ["https://quickcalc.cloud/og-image.png"],
  },
};

export default function GPAConverterPage({ searchParams }: { searchParams?: { embed?: string } }) {
  const softwareSchema = generateSoftwareAppSchema({
    name: "GPA Converter - Convert Percentage to 4.0 Scale Easily",
    description: "Convert international percentage grades and letter grades from the US, UK, Canada, India, and Pakistan to the standard 4.0 GPA scale instantly.",
    slug: "gpa-converter",
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
          <GPAConverterWidget />
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
        "name": "How do I convert my high school percentage grade to a 4.0 GPA?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "To find out how to calculate GPA from percentage marks, map your percentage to its corresponding letter grade and points. For example, in the US, a score of 90-100% is typically an 'A' (3.7 to 4.0 GPA), while 80-89% is a 'B' (2.7 to 3.3 GPA). Our interactive converter automates this percentage-to-GPA calculation instantly."
        }
      },
      {
        "@type": "Question",
        "name": "How do I convert letter grades to a weighted or unweighted GPA on a 4.0 scale?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "To understand how to convert letter grades to GPA on a 4.0 scale, assign standard points to each grade (A = 4.0, B = 3.0, C = 2.0, D = 1.0, F = 0). Multiply each course's grade points by its credit hours, sum these values, and then divide by the total number of credit hours completed."
        }
      },
      {
        "@type": "Question",
        "name": "What is considered a good GPA for competitive college applications?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "When wondering what is a good GPA for college applications, a 3.5 to 4.0 unweighted GPA is highly competitive for top-tier universities. For many state colleges and universities, a GPA of 3.0 or higher is considered a solid and respectable average for admission consideration."
        }
      },
      {
        "@type": "Question",
        "name": "Do college admissions offices accept grades converted by online GPA calculators?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Online GPA converters are excellent for estimation and planning. However, when applying to colleges, most universities require an official transcript evaluation from accredited services like WES (World Education Services) or their own internal admissions board to verify GPA conversion."
        }
      }
    ]
  };

  const softwareData = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    "name": "GPA Converter",
    "operatingSystem": "All",
    "applicationCategory": "EducationalApplication",
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
      <header className="border-b border-zinc-200 dark:border-zinc-800 bg-white/80 dark:bg-zinc-900/80 backdrop-blur-md sticky top-0 z-50 transition-colors">
        <div className="max-w-4xl mx-auto px-4 h-16 flex items-center justify-between">
          <HeaderLogo />
          <nav className="flex items-center gap-2 sm:gap-4">
            <Link href="/" className="text-sm font-medium text-zinc-600 dark:text-zinc-400 hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors">
              Home
            </Link>
            <Link href="/blog" className="text-sm font-medium text-zinc-600 dark:text-zinc-400 hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors">
              Blog
            </Link>
            <span className="text-sm font-medium text-zinc-300 dark:text-zinc-700 font-normal">|</span>
            <span className="text-sm font-medium text-zinc-300 dark:text-zinc-700">|</span>
            <span className="text-sm font-medium text-zinc-400 dark:text-zinc-600">GPA Converter</span>
            <span className="text-sm font-medium text-zinc-300 dark:text-zinc-700 font-normal">|</span>
            <ThemeToggle />
          </nav>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-4xl mx-auto px-4 py-8 sm:py-12">
        <Breadcrumbs toolName="GPA Converter" toolSlug="gpa-converter" />
        <div className="text-center max-w-2xl mx-auto mb-8">
          <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-zinc-900 dark:text-white mb-4">
            GPA Converter
          </h1>
          <p className="text-base sm:text-lg text-zinc-600 dark:text-zinc-400 leading-relaxed">
            If you want to know how to calculate GPA from percentage grades or need a quick way explaining how to convert letter grades to GPA on a 4.0 scale, our free tool is here to help. Easily evaluate your academic performance and find out what is a good GPA for college applications across different regional school standards.
          </p>
        </div>

        <ShareButtons url="https://quickcalc.cloud/tools/gpa-converter" title="GPA Converter" />
        <EmbedWidget url="https://quickcalc.cloud/tools/gpa-converter" title="GPA Converter" />

        {/* The interactive widget */}
        <section className="my-8">
          <GPAConverterWidget />
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
              About Our High School & College GPA Converter
            </h2>
            <p className="text-zinc-600 dark:text-zinc-400 leading-relaxed">
              Grade Point Average (GPA) is more than just a number; it is a universally recognized standard of academic achievement. However, because education systems around the globe are organized differently, comparing performance across borders can be incredibly difficult. For instance, the UK uses honors classifications like First Class and Upper Second Class, while countries in South Asia like India and Pakistan measure academic success as an aggregate percentage of marks.
            </p>
            <p className="text-zinc-600 dark:text-zinc-400 leading-relaxed">
              Unlike other generic web-based converters that gate accurate analysis, QuickCalc offers this tool <strong>100% free with absolutely zero sign-ins, zero email capture, and zero hidden paywalls</strong>. We believe critical academic evaluation standards should be fully accessible to everyone instantly.
            </p>
            <p className="text-zinc-600 dark:text-zinc-400 leading-relaxed">
              Using this converter, prospective students can self-assess their competitiveness for college applications. It is also an invaluable tool for recruiters and admission officers seeking to quickly review international transcripts.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-bold text-zinc-950 dark:text-white">
              How Letter Grades and Percentages are Converted to a 4.0 GPA
            </h2>
            <p className="text-zinc-600 dark:text-zinc-400 leading-relaxed">
              To convert grades from different international formats into a standard 4.0 GPA, the converter maps academic results using standardized mapping tables:
            </p>
            <ul className="list-disc pl-6 text-zinc-600 dark:text-zinc-400 space-y-2">
              <li>
                <strong>US Percentage to GPA:</strong> Maps percentages directly (e.g., 90-100% maps to 3.7-4.0, 80-89% maps to 2.7-3.3, 70-79% maps to 1.7-2.3).
              </li>
              <li>
                <strong>US Letter Grades:</strong> Multiplies the course credits by the grade point equivalent (A = 4.0, B = 3.0, C = 2.0, D = 1.0, F = 0.0), then divides by total credit hours.
              </li>
              <li>
                <strong>UK Honors/Grades:</strong> Maps UK classifications directly (First Class = 4.0, Upper Second Class 2:1 = 3.3 to 3.7, Lower Second Class 2:2 = 3.0, Third Class = 2.3).
              </li>
              <li>
                <strong>India & Pakistan Percentage:</strong> Adapts percentage ranges based on standard evaluation tables (e.g., 70%+ First Class with Distinction translates to 3.7-4.0 GPA).
              </li>
              <li>
                <strong>Canada (12-point/4.33 scales):</strong> Standardizes diverse provincial systems to the unweighted 4.0 US equivalent scale.
              </li>
            </ul>
            <p className="text-zinc-600 dark:text-zinc-400 leading-relaxed mt-2">
              The aggregate GPA is calculated using the weighted formula: <code>GPA = Sum(Grade Points × Credits) / Total Credits</code>.
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
                  How do I convert my high school percentage grade to a 4.0 GPA?
                </h3>
                <p className="text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed">
                  To find out how to calculate GPA from percentage marks, map your percentage to its corresponding letter grade and points. For example, in the US, a score of 90-100% is typically an {"'A'"} (3.7 to 4.0 GPA), while 80-89% is a {"'B'"} (2.7 to 3.3 GPA). Our interactive converter automates this percentage-to-GPA calculation instantly.
                </p>
              </div>

              <div className="space-y-2">
                <h3 className="text-base font-bold text-zinc-900 dark:text-zinc-100">
                  How do I convert letter grades to a weighted or unweighted GPA on a 4.0 scale?
                </h3>
                <p className="text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed">
                  To understand how to convert letter grades to GPA on a 4.0 scale, assign standard points to each grade (A = 4.0, B = 3.0, C = 2.0, D = 1.0, F = 0). Multiply each course{"'"}s grade points by its credit hours, sum these values, and then divide by the total number of credit hours completed.
                </p>
              </div>

              <div className="space-y-2">
                <h3 className="text-base font-bold text-zinc-900 dark:text-zinc-100">
                  What is considered a good GPA for competitive college applications?
                </h3>
                <p className="text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed">
                  When wondering what is a good GPA for college applications, a 3.5 to 4.0 unweighted GPA is highly competitive for top-tier universities. For many state colleges and universities, a GPA of 3.0 or higher is considered a solid and respectable average for admission consideration.
                </p>
              </div>

              <div className="space-y-2">
                <h3 className="text-base font-bold text-zinc-900 dark:text-zinc-100">
                  Do college admissions offices accept grades converted by online GPA calculators?
                </h3>
                <p className="text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed">
                  Online GPA converters are excellent for estimation and planning. However, when applying to colleges, most universities require an official transcript evaluation from accredited services like WES (World Education Services) or their own internal admissions board to verify GPA conversion.
                </p>
              </div>
            </div>
          </section>
        </article>

        <RelatedTools currentSlug="gpa-converter" />

        {/* Ad Placement Footer */}
        <div className="ad-slot ad-slot--footer mt-12" data-ad-position="footer">
          <div className="ad-placeholder-label border border-dashed border-zinc-300 dark:border-zinc-800 rounded-xl py-4 flex items-center justify-center bg-zinc-50/50 dark:bg-zinc-950/20 text-[10px] font-bold text-zinc-400 dark:text-zinc-600 uppercase tracking-widest cursor-default">
            Advertisement
          </div>
        </div>
      </main>

      {/* Footer */}
      <Footer customText="Standardized global educational converters." />
    </div>
  );
}
