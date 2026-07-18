import type { Metadata } from "next";
import Link from "next/link";
import ShoeSizeConverterWidget from "./ShoeSizeConverterWidget";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "Shoe Size Converter - Live Cross-Regional Conversion | QuickCalc",
  description: "Convert shoe sizes instantly between US, UK, EU, and Japan (cm) systems simultaneously. Discover why brands vary and locate your perfect fit today.",
  alternates: {
    canonical: "/tools/shoe-size-converter",
  },
  openGraph: {
    title: "Shoe Size Converter - Live Cross-Regional Conversion | QuickCalc",
    description: "Convert shoe sizes instantly between US, UK, EU, and Japan (cm) systems simultaneously. Discover why brands vary and locate your perfect fit today.",
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
    title: "Shoe Size Converter - Live Cross-Regional Conversion | QuickCalc",
    description: "Convert shoe sizes instantly between US, UK, EU, and Japan (cm) systems simultaneously. Discover why brands vary and locate your perfect fit today.",
    images: ["https://quickcalc.cloud/og-image.png"],
  },
};

export default function ShoeSizeConverterPage() {
  const faqData = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      {
        "@type": "Question",
        "name": "How do I convert US shoe size to EU?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "For men, US shoe size is typically converted to EU by adding 33 to the size (e.g. a US Men's 9 is roughly an EU 42). For women, adding 31 or 31.5 to the US women's size matches the EU size (e.g. a US Women's 7 is an EU 38). Our interactive widget calculates this precisely using custom standard grids."
        }
      },
      {
        "@type": "Question",
        "name": "Are men's and women's shoe sizes the same?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "No, in the US system, there is a difference of approximately 1.5 sizes. A US Men's size 7.5 is roughly equivalent to a US Women's size 9. In contrast, the European (EU) and Japanese (JP) systems are unisex and are based strictly on foot length measurement."
        }
      },
      {
        "@type": "Question",
        "name": "Why do shoe sizes vary between brands?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Brands construct shoes around their own 'lasts' (the physical molds used to shape shoes). Additionally, materials, stitching methods, and internal padding heavily affect the real interior volume, frequently causing shoe sizes to shift ±0.5 size from standard tables."
        }
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
            <span className="text-sm font-medium text-zinc-300 dark:text-zinc-700">|</span>
            <span className="text-sm font-medium text-zinc-400 dark:text-zinc-600">Shoe Size Converter</span>
          </nav>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-4xl mx-auto px-4 py-8 sm:py-12">
        <div className="text-center max-w-2xl mx-auto mb-8">
          <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-zinc-900 dark:text-white mb-4">
            Shoe Size Converter
          </h1>
          <p className="text-base sm:text-lg text-zinc-600 dark:text-zinc-400 leading-relaxed">
            Convert shoe sizes instantly across all 4 major global systems simultaneously. Unlike static HTML table charts or ad-heavy widgets that force single-direction calculations, our interactive utility outputs US, UK, EU, and Japan (cm) sizing synchronously as you type.
          </p>
        </div>

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
              Sizing Systems Explained
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

          {/* Ad Placement 2 */}
          <div className="ad-slot ad-slot--inline" data-ad-position="in-content-2">
            <div className="ad-placeholder-label border border-dashed border-zinc-300 dark:border-zinc-800 rounded-xl py-4 flex items-center justify-center bg-zinc-50/50 dark:bg-zinc-950/20 text-[10px] font-bold text-zinc-400 dark:text-zinc-600 uppercase tracking-widest cursor-default">
              Advertisement
            </div>
          </div>

          {/* FAQ Accordion */}
          <section className="space-y-4 border-t border-zinc-200 dark:border-zinc-800 pt-8">
            <h2 className="text-2xl font-bold text-zinc-950 dark:text-white">
              Frequently Asked Questions (FAQ)
            </h2>
            <div className="space-y-3">
              <details className="group border border-zinc-200 dark:border-zinc-800 rounded-lg p-4 bg-white dark:bg-zinc-900 transition-all duration-150 [&_summary::-webkit-details-marker]:hidden">
                <summary className="flex justify-between items-center font-semibold text-zinc-800 dark:text-zinc-200 cursor-pointer focus:outline-none">
                  <span>How do I convert US shoe size to EU?</span>
                  <span className="transition group-open:rotate-180 text-zinc-400 dark:text-zinc-500">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" className="w-5 h-5">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
                    </svg>
                  </span>
                </summary>
                <p className="text-zinc-600 dark:text-zinc-400 mt-3 text-sm leading-relaxed">
                  For US Men{"'"}s to EU, you can generally add 33 to the size. For US Women{"'"}s, adding 31 or 31.5 to the size matches the EU equivalent. Since exact ratios differ along the curve, we recommend inputting your exact size in our widget above for instant, precise matching.
                </p>
              </details>

              <details className="group border border-zinc-200 dark:border-zinc-800 rounded-lg p-4 bg-white dark:bg-zinc-900 transition-all duration-150 [&_summary::-webkit-details-marker]:hidden">
                <summary className="flex justify-between items-center font-semibold text-zinc-800 dark:text-zinc-200 cursor-pointer focus:outline-none">
                  <span>Are men{"'"}s and women{"'"}s shoe sizes the same?</span>
                  <span className="transition group-open:rotate-180 text-zinc-400 dark:text-zinc-500">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" className="w-5 h-5">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
                    </svg>
                  </span>
                </summary>
                <p className="text-zinc-600 dark:text-zinc-400 mt-3 text-sm leading-relaxed">
                  No, there is a distinct offset. In the US, Men{"'"}s sizes are approximately 1.5 sizes smaller than Women{"'"}s (e.g., a Men{"'"}s 7 is a Women{"'"}s 8.5). In the UK, the offset is typically 0.5 size. EU and Japanese sizes are unisex and scale strictly based on physical last sizes.
                </p>
              </details>

              <details className="group border border-zinc-200 dark:border-zinc-800 rounded-lg p-4 bg-white dark:bg-zinc-900 transition-all duration-150 [&_summary::-webkit-details-marker]:hidden">
                <summary className="flex justify-between items-center font-semibold text-zinc-800 dark:text-zinc-200 cursor-pointer focus:outline-none">
                  <span>Why do shoe sizes vary between brands?</span>
                  <span className="transition group-open:rotate-180 text-zinc-400 dark:text-zinc-500">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" className="w-5 h-5">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
                    </svg>
                  </span>
                </summary>
                <p className="text-zinc-600 dark:text-zinc-400 mt-3 text-sm leading-relaxed">
                  Brands build shoes using custom molds called {"'lasts'"} designed to appeal to specific demographics. Additionally, running shoes, hiking boots, and formal shoes have different interior space designs to maximize padding, comfort, and safety, resulting in sizing variance.
                </p>
              </details>
            </div>
          </section>
        </article>

        {/* Related Tools */}
        <section className="max-w-3xl mx-auto border-t border-zinc-200 dark:border-zinc-800 mt-12 pt-8">
          <h3 className="text-xl font-bold text-zinc-900 dark:text-white mb-6">
            Related Sizing & Health Tools
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 p-5 rounded-xl hover:shadow-md transition duration-200">
              <span className="text-2xl mb-2 block">📏</span>
              <h4 className="font-bold text-zinc-900 dark:text-white text-base">Paper & Fabric Size Converter</h4>
              <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-2">
                Convert standard dimensions for A4/Letter papers and standard textile patterns.
              </p>
              <span className="inline-block text-xs font-semibold text-zinc-400 dark:text-zinc-600 mt-4 cursor-default">
                Coming soon &rarr;
              </span>
            </div>

            <div className="border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 p-5 rounded-xl hover:shadow-md transition duration-200">
              <span className="text-2xl mb-2 block">⚖️</span>
              <h4 className="font-bold text-zinc-900 dark:text-white text-base">BMI Calculator</h4>
              <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-2">
                Evaluate body mass index (BMI) instantly using our live visual horizontal gauge.
              </p>
              <Link href="/tools/bmi-calculator" className="inline-block text-xs font-semibold text-blue-500 dark:text-blue-400 mt-4 hover:underline">
                Use Tool &rarr;
              </Link>
            </div>
          </div>
        </section>

        {/* Ad Placement Footer */}
        <div className="ad-slot ad-slot--footer mt-12" data-ad-position="footer">
          <div className="ad-placeholder-label border border-dashed border-zinc-300 dark:border-zinc-800 rounded-xl py-4 flex items-center justify-center bg-zinc-50/50 dark:bg-zinc-950/20 text-[10px] font-bold text-zinc-400 dark:text-zinc-600 uppercase tracking-widest cursor-default">
            Advertisement
          </div>
        </div>
      </main>

      {/* Footer */}
      <Footer customText="Elegant, simultaneous global size conversion utilities." />
    </div>
  );
}
