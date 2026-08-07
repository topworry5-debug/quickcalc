import { generateSoftwareAppSchema } from "@/lib/schema";
import HeaderLogo from "@/components/HeaderLogo";
import RelatedTools from "@/components/RelatedTools";
import ShareButtons from "@/components/ShareButtons";
import EmbedWidget from "@/components/EmbedWidget";


import ThemeToggle from "@/components/ThemeToggle";

import Breadcrumbs from "@/components/Breadcrumbs";

import type { Metadata } from "next";
import Link from "next/link";
import PaperFabricConverterWidget from "./PaperFabricConverterWidget";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "Paper & Fabric Size Converter - Free Dimension Utility",
  description: "Convert paper sizes (A0-A10, Letter, Legal) and fabric lengths (yards, meters, inches, cm) simultaneously with no paywalls or sign-ups required.",
  alternates: {
    canonical: "/tools/paper-fabric-size-converter",
  },
  openGraph: {
    title: "Paper & Fabric Size Converter - Free Dimension Utility",
    description: "Convert paper sizes (A0-A10, Letter, Legal) and fabric lengths (yards, meters, inches, cm) simultaneously with no paywalls or sign-ups required.",
    url: "https://quickcalc.cloud/tools/paper-fabric-size-converter",
    type: "website",
    siteName: "QuickCalc",
    images: [
      {
        url: "https://quickcalc.cloud/og-image.png",
        width: 1200,
        height: 630,
        alt: "Paper and Fabric Converter on QuickCalc",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Paper & Fabric Size Converter - Free Dimension Utility",
    description: "Convert paper sizes (A0-A10, Letter, Legal) and fabric lengths (yards, meters, inches, cm) simultaneously with no paywalls or sign-ups required.",
    images: ["https://quickcalc.cloud/og-image.png"],
  },
};

export default function PaperFabricConverterPage({ searchParams }: { searchParams?: { embed?: string } }) {
  const softwareSchema = generateSoftwareAppSchema({
    name: "Paper & Fabric Size Converter - Free Dimension Utility",
    description: "Convert paper sizes (A0-A10, Letter, Legal) and fabric lengths (yards, meters, inches, cm) simultaneously with no paywalls or sign-ups required.",
    slug: "paper-fabric-size-converter",
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
          <PaperFabricConverterWidget />
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
        "name": "What is the difference in dimensions between A4 and US Letter paper?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "To understand what size is A4 vs letter paper, A4 is the international standard (ISO 216) measuring 210 x 297 mm (8.27 x 11.69 inches), while US Letter is the North American standard measuring 215.9 x 279.4 mm (8.5 x 11.0 inches). This makes Letter paper slightly wider, while A4 is slightly longer."
        }
      },
      {
        "@type": "Question",
        "name": "What are the dimensions of A4 paper in inches, millimeters, and centimeters?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "The standard A4 paper size in inches is exactly 8.27 x 11.69 inches (210 x 297 millimeters). Our converter translates these dimensions to other standard units like centimeters, points, and picas instantly."
        }
      },
      {
        "@type": "Question",
        "name": "How do I convert fabric yards to meters for sewing projects?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "A standard yard to meter fabric conversion uses the multiplier 0.9144 (1 yard = 0.9144 meters). If you have the measurement in meters and need yards, multiply by 1.0936 instead. This helps ensure you purchase the correct amount of material for sewing projects."
        }
      },
      {
        "@type": "Question",
        "name": "Why do standard paper sizes differ between North America and Europe?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "The international ISO A-series (e.g. A4) is based on a single, logical aspect ratio of 1:√2, allowing sizes to scale perfectly when folded in half. The US Letter and Legal standards evolved from historical hand-made paper mold lengths (specifically 44 inches cut into quarters), which remain popular in North America today."
        }
      },
      {
        "@type": "Question",
        "name": "How do I convert fabric bolt width from inches to centimeters?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Multiply the fabric width in inches by 2.54 to get the measurement in centimeters. For example, a standard 45-inch fabric is approximately 114.3 centimeters wide."
        }
      },
      {
        "@type": "Question",
        "name": "What are the dimensions of standard US envelopes like No. 10?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "The most common business envelope is the No. 10 envelope, measuring 4.125 x 9.5 inches (105 x 241 mm). For standard invitations, A7 envelopes measuring 5.25 x 7.25 inches are widely used."
        }
      }
    ]
  };

  const softwareData = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    "name": "Paper & Fabric Size Converter",
    "operatingSystem": "All",
    "applicationCategory": "BusinessApplication",
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
            <span className="text-sm font-medium text-zinc-400 dark:text-zinc-600">Paper & Fabric Converter</span>
            <span className="text-sm font-medium text-zinc-300 dark:text-zinc-700 font-normal">|</span>
            <ThemeToggle />
          </nav>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-4xl mx-auto px-4 py-8 sm:py-12">
        <Breadcrumbs toolName="Paper & Fabric Size Converter" toolSlug="paper-fabric-size-converter" />
        <div className="text-center max-w-2xl mx-auto mb-8">
          <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-zinc-900 dark:text-white mb-4">
            Paper & Fabric Size Converter
          </h1>
          <p className="text-base sm:text-lg text-zinc-600 dark:text-zinc-400 leading-relaxed">
            Need to find the standard A4 paper size in inches or perform a quick yard to meter fabric conversion? Our interactive Paper & Fabric Size Converter makes it simple to understand what size is A4 vs letter paper, plus seamlessly convert diverse craft and textile dimensions as you type.
          </p>
        </div>

        <ShareButtons url="https://quickcalc.cloud/tools/paper-fabric-size-converter" title="Paper & Fabric Size Converter" />
        <EmbedWidget url="https://quickcalc.cloud/tools/paper-fabric-size-converter" title="Paper & Fabric Size Converter" />

        {/* The interactive widget */}
        <section className="my-8">
          <PaperFabricConverterWidget />
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
              Understanding Paper and Fabric Sizing Standards
            </h2>
            <p className="text-zinc-600 dark:text-zinc-400 leading-relaxed">
              Standardizations for daily measurements are key to global communication, yet different fields rely on distinct unit heritage:
            </p>
            <p className="text-zinc-600 dark:text-zinc-400 leading-relaxed">
              The international paper standard (<strong>ISO 216</strong>) is built upon a clever geometric property: the 1:√2 aspect ratio. When you fold an A-series paper in half along its short side, the resulting halves retain the exact same aspect ratio. This makes rescaling printing documents incredibly simple. Conversely, the US system (Letter, Legal, Tabloid) originated from historical hand-crafted paper frames and quarters, which remain standard in North American offices.
            </p>
            <p className="text-zinc-600 dark:text-zinc-400 leading-relaxed">
              In textile design and tailoring, fabric is traditionally bought by length (yards or meters). Because supply chains cross oceans, textile suppliers in the Americas frequently buy and sell in yards, while international distributors utilize meters. Knowing the exact conversion is critical for sewing projects, international shopping, and upholstery planning.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-bold text-zinc-950 dark:text-white">
              How Paper Dimensions and Fabric Yards are Converted
            </h2>
            <p className="text-zinc-600 dark:text-zinc-400 leading-relaxed">
              Converting paper dimensions and fabric yards relies on fixed linear ratios and international standard tables:
            </p>
            <ul className="list-disc pl-6 text-zinc-600 dark:text-zinc-400 space-y-2">
              <li>
                <strong>Paper Conversion:</strong> Uses official ISO 216 standards mapping mm, cm, and inches coordinates (e.g. A4 = 210 x 297 mm = 8.27 x 11.69 in).
              </li>
              <li>
                <strong>Fabric Length:</strong> Calculated with standard physical multipliers where 1 Yard = 36 Inches = 3 Feet = 0.9144 Meters.
              </li>
              <li>
                <strong>Area & Weight:</strong> Fabric density conversions typically scale using GSM (Grams per Square Meter) or Oz/Sq Yd ratios.
              </li>
            </ul>
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
                  What is the difference in dimensions between A4 and US Letter paper?
                </h3>
                <p className="text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed">
                  To understand what size is A4 vs letter paper, A4 is the international standard (ISO 216) measuring 210 x 297 mm (8.27 x 11.69 inches), while US Letter is the North American standard measuring 215.9 x 279.4 mm (8.5 x 11.0 inches). This makes Letter paper slightly wider, while A4 is slightly longer.
                </p>
              </div>

              <div className="space-y-2">
                <h3 className="text-base font-bold text-zinc-900 dark:text-zinc-100">
                  What are the dimensions of A4 paper in inches, millimeters, and centimeters?
                </h3>
                <p className="text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed">
                  The standard A4 paper size in inches is exactly 8.27 x 11.69 inches (210 x 297 millimeters). Our converter translates these dimensions to other standard units like centimeters, points, and picas instantly.
                </p>
              </div>

              <div className="space-y-2">
                <h3 className="text-base font-bold text-zinc-900 dark:text-zinc-100">
                  How do I convert fabric yards to meters for sewing projects?
                </h3>
                <p className="text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed">
                  A standard yard to meter fabric conversion uses the multiplier 0.9144 (1 yard = 0.9144 meters). If you have the measurement in meters and need yards, multiply by 1.0936 instead. This helps ensure you purchase the correct amount of material for sewing projects.
                </p>
              </div>

              <div className="space-y-2">
                <h3 className="text-base font-bold text-zinc-900 dark:text-zinc-100">
                  Why do standard paper sizes differ between North America and Europe?
                </h3>
                <p className="text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed">
                  Regional standards trace back to local manufacturing traditions. While Europe and the rest of the world unified under the German-designed ISO standards in the 20th century to optimize scaling, North America retained the US Letter format owing to its deep entrenchment in commercial printer and copying equipment.
                </p>
              </div>

              <div className="space-y-2">
                <h3 className="text-base font-bold text-zinc-900 dark:text-zinc-100">
                  How do I convert fabric bolt width from inches to centimeters?
                </h3>
                <p className="text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed">
                  Multiply the fabric width in inches by 2.54 to get the measurement in centimeters. For example, a standard 45-inch fabric is approximately 114.3 centimeters wide.
                </p>
              </div>

              <div className="space-y-2">
                <h3 className="text-base font-bold text-zinc-900 dark:text-zinc-100">
                  What are the dimensions of standard US envelopes like No. 10?
                </h3>
                <p className="text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed">
                  The most common business envelope is the No. 10 envelope, measuring 4.125 x 9.5 inches (105 x 241 mm). For standard invitations, A7 envelopes measuring 5.25 x 7.25 inches are widely used.
                </p>
              </div>
            </div>
          </section>
        </article>

        <RelatedTools currentSlug="paper-fabric-size-converter" />
      </main>

      {/* Footer */}
      <Footer customText="Elegant, simultaneous print & textile conversion solutions." />
    </div>
  );
}
