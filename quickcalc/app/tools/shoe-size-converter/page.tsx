import RelatedTools from "@/components/RelatedTools";
import ShareButtons from "@/components/ShareButtons";
import EmbedWidget from "@/components/EmbedWidget";


import ThemeToggle from "@/components/ThemeToggle";

import Breadcrumbs from "@/components/Breadcrumbs";

import type { Metadata } from "next";
import Link from "next/link";
import ShoeSizeConverterWidget from "./ShoeSizeConverterWidget";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "Shoe Size Converter - US, UK, EU & Japan Size Conversions",
  description: "Convert shoe sizes instantly between US, UK, EU, and Japan (cm) systems simultaneously with helpful brand-specific sizing variance and fit guidance.",
  alternates: {
    canonical: "/tools/shoe-size-converter",
  },
  openGraph: {
    title: "Shoe Size Converter - US, UK, EU & Japan Size Conversions",
    description: "Convert shoe sizes instantly between US, UK, EU, and Japan (cm) systems simultaneously with helpful brand-specific sizing variance and fit guidance.",
    url: "https://quickcalc.cloud/tools/shoe-size-converter",
    type: "website",
    siteName: "QuickCalc",
    images: [
      {
        url: "https://quickcalc.cloud/og-image.png",
        width: 1200,
        height: 630,
        alt: "Shoe Size Converter on QuickCalc",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Shoe Size Converter - US, UK, EU & Japan Size Conversions",
    description: "Convert shoe sizes instantly between US, UK, EU, and Japan (cm) systems simultaneously with helpful brand-specific sizing variance and fit guidance.",
    images: ["https://quickcalc.cloud/og-image.png"],
  },
};

export default function ShoeSizeConverterPage({ searchParams }: { searchParams?: { embed?: string } }) {
  const isEmbed = searchParams?.embed === "true";
  if (isEmbed) {
    return (
      <div className="min-h-screen bg-white dark:bg-zinc-950 text-zinc-900 dark:text-zinc-100 font-[family-name:var(--font-geist-sans)] transition-colors p-2 flex flex-col justify-between">
        <main className="max-w-4xl mx-auto w-full">
          <ShoeSizeConverterWidget />
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
        "name": "How do I convert a US men's or women's shoe size to UK sizes?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "To convert US shoe size to UK for men, you generally subtract 1 full size (e.g., a US Men's 9 is a UK 8). For women, the conversion typically requires subtracting 2 sizes (e.g., a US Women's 7 is a UK 5). Use our live converter tool above to get instant, precise cross-regional conversions."
        }
      },
      {
        "@type": "Question",
        "name": "How can I accurately measure my foot length at home to find my shoe size?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "To measure your shoe size at home, place a piece of paper on a flat floor against a wall. Stand on the paper with your heel touching the wall, mark the tip of your longest toe with a pen, and measure the distance from the wall to the mark in inches or centimeters to find your length."
        }
      },
      {
        "@type": "Question",
        "name": "Is there a reliable children's shoe size chart by age and foot length?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Yes, while a kids shoe size chart by age provides general guidance (such as Toddlers size 4-9 for ages 1-3, Little Kids size 10-13 for ages 4-6, and Big Kids size 1-7 for ages 7+), children's feet grow rapidly and vary greatly. Measuring their actual foot length is the most accurate way to find their correct size."
        }
      },
      {
        "@type": "Question",
        "name": "How do I convert European (EU) shoe sizes to US women's sizes?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "An EU to US shoe size conversion for women typically involves adding 31 to 31.5 to the US women's size (e.g., a US Women's size 7 is approximately an EU size 37.5 or 38). Our online converter calculates this conversion instantly to ensure you get the best fit."
        }
      },
      {
        "@type": "Question",
        "name": "Why do my shoe sizes differ so much between athletic brands?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Brands construct shoes around their own 'lasts' (the physical molds used to shape shoes). Additionally, materials, stitching methods, and internal padding heavily affect the real interior volume, frequently causing shoe sizes to shift ±0.5 size from standard tables."
        }
      },
      {
        "@type": "Question",
        "name": "How do I choose the right shoe size if I have wide or narrow feet?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "If you have wider feet, standard medium shoes (D for men, B for women) might feel restrictive. You may need to look for wide (E/EE for men, D for women) fittings or size up by a half-size in standard widths."
        }
      }
    ]
  };

  const softwareData = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    "name": "Shoe Size Converter",
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
          <Link href="/" className="flex items-center gap-2 font-bold text-lg text-blue-600 dark:text-blue-400">
            <span>⚖️ QuickCalc</span>
          </Link>
          <nav className="flex items-center gap-2 sm:gap-4">
            <Link href="/" className="text-sm font-medium text-zinc-600 dark:text-zinc-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
              Home
            </Link>
            <Link href="/blog" className="text-sm font-medium text-zinc-600 dark:text-zinc-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
              Blog
            </Link>
            <span className="text-sm font-medium text-zinc-300 dark:text-zinc-700 font-normal">|</span>
            <span className="text-sm font-medium text-zinc-300 dark:text-zinc-700">|</span>
            <span className="text-sm font-medium text-zinc-400 dark:text-zinc-600">Shoe Size Converter</span>
            <span className="text-sm font-medium text-zinc-300 dark:text-zinc-700 font-normal">|</span>
            <ThemeToggle />
          </nav>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-4xl mx-auto px-4 py-8 sm:py-12">
        <Breadcrumbs toolName="Shoe Size Converter" toolSlug="shoe-size-converter" />
        <div className="text-center max-w-2xl mx-auto mb-8">
          <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-zinc-900 dark:text-white mb-4">
            Shoe Size Converter
          </h1>
          <p className="text-base sm:text-lg text-zinc-600 dark:text-zinc-400 leading-relaxed">
            Wondering how to convert US shoe size to UK or get a precise EU to US shoe size conversion for women? Our interactive Shoe Size Converter makes it simple to translate sizes instantly across all 4 major global systems simultaneously, including finding the perfect fit using a kids shoe size chart by age or learning how to measure your shoe size at home.
          </p>
        </div>

        <ShareButtons url="https://quickcalc.cloud/tools/shoe-size-converter" title="Shoe Size Converter" />
        <EmbedWidget url="https://quickcalc.cloud/tools/shoe-size-converter" title="Shoe Size Converter" />

        {/* The interactive widget */}
        <section className="my-8">
          <ShoeSizeConverterWidget />
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
              Global Shoe Sizing Systems Explained
            </h2>
            <p className="text-zinc-600 dark:text-zinc-400 leading-relaxed">
              Global shoe sizing is rooted in rich historical craftsmanship, which is why systems diverge so significantly today:
            </p>
            <ul className="list-disc pl-6 text-zinc-600 dark:text-zinc-400 space-y-2">
              <li>
                <strong>US & UK Sizing:</strong> Based on the traditional English <em>barleycorn</em> unit, which is equivalent to 1/3 of an inch. Sizing starts at a default baseline and increments sequentially, with US and UK scales offset by one full size (US Men{"'"}s 9 is a UK 8).
              </li>
              <li>
                <strong>EU Sizing:</strong> Originated from the French <em>Paris point</em>, which measures 2/3 of a centimeter (6.67 mm). It counts the total points required to cover the shoe structure, making EU numbers much higher than English units.
              </li>
              <li>
                <strong>Japan Sizing:</strong> A highly logical, metric-based standard. Sizing numbers match the actual foot length measured directly in centimeters, making JP sizing incredibly straightforward to gauge.
              </li>
            </ul>
            <p className="text-zinc-600 dark:text-zinc-400 leading-relaxed">
              Because of these historical differences, standard tables can only represent high-probability averages. Brand engineering, heel contours, structural padding, and material flex regularly introduce a ±0.5 size variance between manufacturers. Treat our instant conversion dashboard as a robust guide post rather than a direct guarantee of comfortable fit.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-bold text-zinc-950 dark:text-white">
              How International Shoe Sizes are Converted (US, UK, EU, cm)
            </h2>
            <p className="text-zinc-600 dark:text-zinc-400 leading-relaxed">
              Converting between different shoe size systems relies on standard regional lookup tables and sizing curves:
            </p>
            <ul className="list-disc pl-6 text-zinc-600 dark:text-zinc-400 space-y-2">
              <li>
                <strong>Men{"'"}s Conversions:</strong> Standard US sizes are mapped to UK, EU, and JP scales using international standards (e.g. US Men{"'"}s 9 = UK 8.5 = EU 42 = JP 27 cm).
              </li>
              <li>
                <strong>Women{"'"}s Conversions:</strong> Sized slightly narrower and offset from Men{"'"}s (e.g. US Women{"'"}s 7 = UK 5 = EU 37.5 = JP 24 cm).
              </li>
              <li>
                <strong>Children & Kids:</strong> Smaller scales based on Toddler, Little Kid, and Big Kid sizes corresponding to specific age brackets and feet lengths.
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
                  How do I convert a US men's or women's shoe size to UK sizes?
                </h3>
                <p className="text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed">
                  To convert US shoe size to UK for men, you generally subtract 1 full size (e.g., a US Men{"'"}s 9 is a UK 8). For women, the conversion typically requires subtracting 2 sizes (e.g., a US Women{"'"}s 7 is a UK 5). Use our live converter tool above to get instant, precise cross-regional conversions.
                </p>
              </div>

              <div className="space-y-2">
                <h3 className="text-base font-bold text-zinc-900 dark:text-zinc-100">
                  How can I accurately measure my foot length at home to find my shoe size?
                </h3>
                <p className="text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed">
                  To measure your shoe size at home, place a piece of paper on a flat floor against a wall. Stand on the paper with your heel touching the wall, mark the tip of your longest toe with a pen, and measure the distance from the wall to the mark in inches or centimeters to find your length.
                </p>
              </div>

              <div className="space-y-2">
                <h3 className="text-base font-bold text-zinc-900 dark:text-zinc-100">
                  Is there a reliable children's shoe size chart by age and foot length?
                </h3>
                <p className="text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed">
                  Yes, while a kids shoe size chart by age provides general guidance (such as Toddlers size 4-9 for ages 1-3, Little Kids size 10-13 for ages 4-6, and Big Kids size 1-7 for ages 7+), children{"'"}s feet grow rapidly and vary greatly. Measuring their actual foot length is the most accurate way to find their correct size.
                </p>
              </div>

              <div className="space-y-2">
                <h3 className="text-base font-bold text-zinc-900 dark:text-zinc-100">
                  How do I convert European (EU) shoe sizes to US women's sizes?
                </h3>
                <p className="text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed">
                  An EU to US shoe size conversion for women typically involves adding 31 to 31.5 to the US women{"'"}s size (e.g., a US Women{"'"}s size 7 is approximately an EU size 37.5 or 38). Our online converter calculates this conversion instantly to ensure you get the best fit.
                </p>
              </div>

              <div className="space-y-2">
                <h3 className="text-base font-bold text-zinc-900 dark:text-zinc-100">
                  Why do my shoe sizes differ so much between athletic brands?
                </h3>
                <p className="text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed">
                  Brands build shoes using custom molds called {"'lasts'"} designed to appeal to specific demographics. Additionally, running shoes, hiking boots, and formal shoes have different interior space designs to maximize padding, comfort, and safety, resulting in sizing variance.
                </p>
              </div>

              <div className="space-y-2">
                <h3 className="text-base font-bold text-zinc-900 dark:text-zinc-100">
                  How do I choose the right shoe size if I have wide or narrow feet?
                </h3>
                <p className="text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed">
                  If you have wider feet, standard medium shoes (D for men, B for women) might feel restrictive. You may need to look for wide (E/EE for men, D for women) fittings or size up by a half-size in standard widths.
                </p>
              </div>
            </div>
          </section>
        </article>

        <RelatedTools currentSlug="shoe-size-converter" />
      </main>

      {/* Footer */}
      <Footer customText="Elegant, simultaneous global size conversion utilities." />
    </div>
  );
}
