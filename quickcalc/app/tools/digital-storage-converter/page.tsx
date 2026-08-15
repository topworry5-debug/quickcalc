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
import DigitalStorageWidget from "./DigitalStorageWidget";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "Free Digital Storage Converter - Bits, Bytes, KB, MB, GB, TB, PB",
  description:
    "Convert bits, Bytes, KB/KiB, MB/MiB, GB/GiB, TB/TiB, and PB/PiB instantly. Toggles between binary 1024-based and decimal 1000-based standards with simultaneous multi-unit display. 100% free.",
  alternates: {
    canonical: "/tools/digital-storage-converter",
  },
  openGraph: {
    title: "Free Digital Storage Converter - Bits, Bytes, KB, MB, GB, TB, PB",
    description:
      "Convert bits, Bytes, KB/KiB, MB/MiB, GB/GiB, TB/TiB, and PB/PiB instantly. Toggles between binary 1024-based and decimal 1000-based standards with simultaneous multi-unit display. 100% free.",
    url: "https://quickcalc.cloud/tools/digital-storage-converter",
    type: "website",
    siteName: "QuickCalc",
    images: [
      {
        url: "https://quickcalc.cloud/og-image.png",
        width: 1200,
        height: 630,
        alt: "Digital Storage Converter on QuickCalc",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Free Digital Storage Converter - Bits, Bytes, KB, MB, GB, TB, PB",
    description:
      "Convert bits, Bytes, KB/KiB, MB/MiB, GB/GiB, TB/TiB, and PB/PiB instantly. Toggles between binary 1024-based and decimal 1000-based standards with simultaneous multi-unit display. 100% free.",
  },
};

export default function DigitalStoragePage({
  searchParams,
}: {
  searchParams?: { embed?: string };
}) {
  const softwareSchema = generateSoftwareAppSchema({
    name: "Free Digital Storage Converter - Bits, Bytes, KB, MB, GB, TB, PB",
    description:
      "Convert bits, Bytes, KB/KiB, MB/MiB, GB/GiB, TB/TiB, and PB/PiB instantly. Toggles between binary 1024-based and decimal 1000-based standards with simultaneous multi-unit display. 100% free.",
    slug: "digital-storage-converter",
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
          <DigitalStorageWidget />
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
        name: "What is the difference between KB (Kilobytes) and KiB (Kibibytes)?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Kilobytes (KB) use decimal 1000-based SI metric notation (1 KB = 1,000 Bytes), whereas Kibibytes (KiB) use binary 1024-based IEC notation (1 KiB = 1,024 Bytes). Storage drive manufacturers specify capacity in decimal KB/MB/GB/TB, while operating systems like Windows report disk sizes in binary KiB/MiB/GiB/TiB.",
        },
      },
      {
        "@type": "Question",
        name: "Why does my 1TB hard drive show as 931GB in Windows?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Drive manufacturers define 1 TB as 1,000,000,000,000 Bytes (1000^4). However, Windows calculates gigabytes in binary (1 GiB = 1,073,741,824 Bytes). Dividing 1,000,000,000,000 Bytes by 1,073,741,824 results in 931.32 GiB, which Windows labels as 'GB'. No storage space is missing; it is simply a difference in measurement standards.",
        },
      },
      {
        "@type": "Question",
        name: "How many bits are in a byte?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "There are exactly 8 bits in 1 Byte. A bit (b) is the smallest binary unit of computer data (0 or 1), while a byte (B) is eight bits grouped together, typically representing a single character of text in ASCII or UTF-8 encoding.",
        },
      },
      {
        "@type": "Question",
        name: "How many megabytes are in a gigabyte?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "In standard decimal SI notation (used by storage makers and network speeds), 1 Gigabyte (GB) equals 1,000 Megabytes (MB). In binary IEC notation (used by computer RAM and operating system file systems), 1 Gibibyte (GiB) equals 1,024 Mebibytes (MiB).",
        },
      },
    ],
  };

  const softwareData = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: "Digital Storage Converter",
    operatingSystem: "All",
    applicationCategory: "DeveloperApplication",
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
        <Breadcrumbs toolName="Digital Storage Converter" toolSlug="digital-storage-converter" />

        <div className="text-center max-w-2xl mx-auto mb-8">
          <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-zinc-900 dark:text-white mb-4">
            Digital Storage Converter
          </h1>
          <p className="text-base sm:text-lg text-zinc-600 dark:text-zinc-400 leading-relaxed">
            Convert digital storage quantities across bits, Bytes, KB/KiB, MB/MiB, GB/GiB, TB/TiB, and PB/PiB simultaneously. Switch between <strong>decimal (1000-based SI)</strong> and <strong>binary (1024-based IEC)</strong> standards, demystify Windows hard drive capacities, and generate shareable data reports 100% free with zero sign-ins.
          </p>
        </div>

        <ShareButtons
          url="https://quickcalc.cloud/tools/digital-storage-converter"
          title="Digital Storage Converter"
        />
        <EmbedWidget
          url="https://quickcalc.cloud/tools/digital-storage-converter"
          title="Digital Storage Converter"
        />

        {/* Interactive Widget */}
        <section className="my-8">
          <Suspense
            fallback={
              <div className="p-8 text-center text-zinc-500 animate-pulse">
                Loading digital storage converter...
              </div>
            }
          >
            <DigitalStorageWidget />
          </Suspense>
        </section>

        {/* Methodology Accordion */}
        <MethodologyAccordion slug="digital-storage-converter" />

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
              Understanding Digital Data Units: Bits vs. Bytes
            </h2>
            <p className="text-zinc-600 dark:text-zinc-400 leading-relaxed">
              In computer engineering, all digital information is stored and transmitted as binary digits or <strong>bits (b)</strong>, which hold a single state of 0 or 1. Eight bits are grouped together to form a <strong>Byte (B)</strong>, which is the foundational unit used to measure file size and memory capacity.
            </p>
            <p className="text-zinc-600 dark:text-zinc-400 leading-relaxed">
              Network transmission speeds (such as broadband internet) are typically measured in bits per second (e.g., 100 Mbps or 1 Gbps), whereas file storage capacities are measured in Bytes (e.g., 500 MB or 1 TB).
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-bold text-zinc-950 dark:text-white">
              Decimal SI (1000) vs. Binary IEC (1024) Measurement Standards
            </h2>
            <p className="text-zinc-600 dark:text-zinc-400 leading-relaxed">
              A frequent source of confusion among tech users is the distinction between decimal and binary unit prefixes:
            </p>
            <ul className="list-disc pl-6 text-zinc-600 dark:text-zinc-400 space-y-2">
              <li>
                <strong>Decimal / SI Standard (1000-based):</strong> Standardized by the International System of Units (SI). 1 KB = 1,000 B, 1 MB = 1,000 KB, 1 GB = 1,000 MB, 1 TB = 1,000 GB. Used by hard drive manufacturers (Seagate, Western Digital), SSD producers, cloud hosting providers (AWS, Google Cloud), and macOS.
              </li>
              <li>
                <strong>Binary / IEC Standard (1024-based):</strong> Standardized by the International Electrotechnical Commission (IEC). 1 KiB = 1,024 B, 1 MiB = 1,024 KiB, 1 GiB = 1,024 MiB, 1 TiB = 1,024 GiB. Used by computer RAM manufacturers, Linux kernels, and Windows operating systems.
              </li>
            </ul>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-bold text-zinc-950 dark:text-white">
              Why Your 1 TB Hard Drive Shows as 931 GB in Windows
            </h2>
            <p className="text-zinc-600 dark:text-zinc-400 leading-relaxed">
              When you purchase a 1 Terabyte (1 TB) external hard drive or SSD, the drive manufacturer formats it using decimal powers of 10: <code>1,000,000,000,000 Bytes</code>.
            </p>
            <p className="text-zinc-600 dark:text-zinc-400 leading-relaxed">
              However, when plugged into a Windows computer, Windows calculates disk capacity using binary powers of 2 (1024³ = <code>1,073,741,824 Bytes per GiB</code>). Dividing 1,000,000,000,000 by 1,073,741,824 results in <strong>931.32 GiB</strong>. Because Windows incorrectly uses the label "GB" for binary GiB, users often mistakenly believe their drive is missing ~69 GB of space!
            </p>
            <p className="text-zinc-600 dark:text-zinc-400 leading-relaxed mt-4">
              If you work with web data payloads or need to convert developer data formats, try our free <Link href="/tools/json-csv-converter" className="text-blue-600 dark:text-blue-400 font-semibold underline hover:text-blue-700">JSON &amp; CSV Converter</Link> or measure string character counts with our <Link href="/tools/word-character-counter" className="text-blue-600 dark:text-blue-400 font-semibold underline hover:text-blue-700">Word &amp; Character Counter</Link>.
            </p>
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
                  What is the difference between KB (Kilobytes) and KiB (Kibibytes)?
                </h3>
                <p className="text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed">
                  Kilobytes (KB) use decimal 1000-based SI metric notation (1 KB = 1,000 Bytes), whereas Kibibytes (KiB) use binary 1024-based IEC notation (1 KiB = 1,024 Bytes). Storage drive manufacturers specify capacity in decimal KB/MB/GB/TB, while operating systems like Windows report disk sizes in binary KiB/MiB/GiB/TiB.
                </p>
              </div>

              <div className="space-y-2">
                <h3 className="text-base font-bold text-zinc-900 dark:text-zinc-100">
                  Why does my 1TB hard drive show as 931GB in Windows?
                </h3>
                <p className="text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed">
                  Drive manufacturers define 1 TB as 1,000,000,000,000 Bytes (1000^4). However, Windows calculates gigabytes in binary (1 GiB = 1,073,741,824 Bytes). Dividing 1,000,000,000,000 Bytes by 1,073,741,824 results in 931.32 GiB, which Windows labels as "GB". No storage space is missing; it is simply a difference in measurement standards.
                </p>
              </div>

              <div className="space-y-2">
                <h3 className="text-base font-bold text-zinc-900 dark:text-zinc-100">
                  How many bits are in a byte?
                </h3>
                <p className="text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed">
                  There are exactly 8 bits in 1 Byte. A bit (b) is the smallest binary unit of computer data (0 or 1), while a byte (B) is eight bits grouped together, typically representing a single character of text in ASCII or UTF-8 encoding.
                </p>
              </div>

              <div className="space-y-2">
                <h3 className="text-base font-bold text-zinc-900 dark:text-zinc-100">
                  How many megabytes are in a gigabyte?
                </h3>
                <p className="text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed">
                  In standard decimal SI notation (used by storage makers and network speeds), 1 Gigabyte (GB) equals 1,000 Megabytes (MB). In binary IEC notation (used by computer RAM and operating system file systems), 1 Gibibyte (GiB) equals 1,024 Mebibytes (MiB).
                </p>
              </div>
            </div>
          </section>
        </article>

        <RelatedTools currentSlug="digital-storage-converter" />

        {/* Ad Placement Footer */}
        <div className="ad-slot ad-slot--footer mt-12" data-ad-position="footer">
          <div className="ad-placeholder-label border border-dashed border-zinc-300 dark:border-zinc-800 rounded-xl py-4 flex items-center justify-center bg-zinc-50/50 dark:bg-zinc-950/20 text-[10px] font-bold text-zinc-400 dark:text-zinc-600 uppercase tracking-widest cursor-default">
            Advertisement
          </div>
        </div>
      </main>

      {/* Footer */}
      <Footer customText="Precision client-side data unit & digital storage converters." />
    </div>
  );
}
