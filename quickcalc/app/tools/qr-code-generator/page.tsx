import MethodologyAccordion from "@/components/MethodologyAccordion";
import { Suspense } from "react";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import { generateSoftwareAppSchema } from "@/lib/schema";
import RelatedTools from "@/components/RelatedTools";
import ShareButtons from "@/components/ShareButtons";
import EmbedWidget from "@/components/EmbedWidget";
import Breadcrumbs from "@/components/Breadcrumbs";
import type { Metadata } from "next";
import QrCodeWidget from "./QrCodeWidget";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "Free QR Code Generator with Logo - WiFi & vCard (PNG/SVG)",
  description:
    "Generate custom high-resolution QR codes for website URLs, WiFi networks, and vCard contact cards. 100% free with PNG and SVG vector downloads.",
  alternates: {
    canonical: "/tools/qr-code-generator",
  },
  openGraph: {
    title: "Free QR Code Generator with Logo - WiFi & vCard (PNG/SVG)",
    description:
      "Generate custom high-resolution QR codes for website URLs, WiFi networks, and vCard contact cards. 100% free with PNG and SVG vector downloads.",
    url: "https://quickcalc.cloud/tools/qr-code-generator",
    type: "website",
    siteName: "QuickCalc",
    images: [
      {
        url: "https://quickcalc.cloud/og-image.png",
        width: 1200,
        height: 630,
        alt: "Free QR Code Generator on QuickCalc",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Free QR Code Generator with Logo - WiFi & vCard (PNG/SVG)",
    description:
      "Generate custom high-resolution QR codes for website URLs, WiFi networks, and vCard contact cards. 100% free with PNG and SVG vector downloads.",
  },
};

export default function QrCodePage({
  searchParams,
}: {
  searchParams?: { embed?: string };
}) {
  const softwareSchema = generateSoftwareAppSchema({
    name: "Free QR Code Generator",
    description:
      "Generate custom high-resolution QR codes for website URLs, WiFi networks, and vCard contact cards. 100% free with PNG and SVG vector downloads.",
    slug: "qr-code-generator",
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
          <QrCodeWidget />
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
        name: "Do generated QR codes expire?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "No. QuickCalc generates standard static QR codes. Static QR codes encode destination payload data directly into the matrix modules and never expire or rely on third-party redirection servers.",
        },
      },
      {
        "@type": "Question",
        name: "How does a WiFi QR code allow instant connection?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "WiFi QR codes follow the standard `WIFI:S:SSID;T:WPA;P:password;;` format. When scanned by an iOS or Android camera, the smartphone operating system reads the network credentials and prompts the user to join the WiFi network with one tap.",
        },
      },
      {
        "@type": "Question",
        name: "What error correction level should I select for printing?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "For standard digital displays and print materials, Level M (15% recovery) or Level Q (25% recovery) provides excellent scannability. If you embed a logo in the center, use Level H (30% recovery) to ensure the QR code remains fully readable.",
        },
      },
      {
        "@type": "Question",
        name: "What file format should I download for professional printing?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Download the SVG vector format for professional print materials, banners, and business cards. SVG vectors can be scaled to any size without losing crisp pixel sharp edges.",
        },
      },
    ],
  };

  const softwareData = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: "QR Code Generator",
    operatingSystem: "All",
    applicationCategory: "BusinessApplication",
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "USD",
    },
  };

  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-zinc-950 text-zinc-900 dark:text-zinc-100 font-[family-name:var(--font-geist-sans)] transition-colors">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqData) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(softwareData) }}
      />

      <Navbar />

      <main className="max-w-4xl mx-auto px-4 py-8 sm:py-12">
        <Breadcrumbs toolName="QR Code Generator" toolSlug="qr-code-generator" />

        <div className="text-center max-w-2xl mx-auto mb-8">
          <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-zinc-900 dark:text-white mb-4">
            QR Code Generator
          </h1>
          <p className="text-base sm:text-lg text-zinc-600 dark:text-zinc-400 leading-relaxed">
            Use our <strong>custom qr code generator no signup</strong> tool to create high-resolution QR codes for URLs, contact details, and guest access. Our <strong>wifi qr code generator</strong> creates 1-tap smartphone connection barcodes, while our <strong>free qr code generator with logo</strong> options let you brand your codes with custom colors and center logo overlays for instant PNG or SVG vector export.
          </p>
        </div>

        <ShareButtons
          url="https://quickcalc.cloud/tools/qr-code-generator"
          title="QR Code Generator"
        />
        <EmbedWidget
          url="https://quickcalc.cloud/tools/qr-code-generator"
          title="QR Code Generator"
        />

        <section className="my-8">
          <Suspense
            fallback={
              <div className="p-8 text-center text-zinc-500 animate-pulse">
                Loading QR code generator...
              </div>
            }
          >
            <QrCodeWidget />
          </Suspense>
        </section>

        <MethodologyAccordion slug="qr-code-generator" />

        <div className="ad-slot ad-slot--inline" data-ad-position="in-content-1">
          <div className="ad-placeholder-label border border-dashed border-zinc-300 dark:border-zinc-800 rounded-xl py-4 flex items-center justify-center bg-zinc-50/50 dark:bg-zinc-950/20 text-[10px] font-bold text-zinc-400 dark:text-zinc-600 uppercase tracking-widest cursor-default">
            Advertisement
          </div>
        </div>

        <article className="prose prose-zinc dark:prose-invert max-w-3xl mx-auto space-y-8 mt-12 border-t border-zinc-200 dark:border-zinc-800 pt-10">
          <section className="space-y-4">
            <h2 className="text-2xl font-bold text-zinc-950 dark:text-white">
              Understanding QR Code Formats &amp; Standards
            </h2>
            <p className="text-zinc-600 dark:text-zinc-400 leading-relaxed">
              Quick Response (QR) codes are two-dimensional matrix barcodes invented by Denso Wave in 1994. Today, QR codes are universally supported across iOS, Android, and industrial scanners for seamless touchless interactions.
            </p>
            <p className="text-zinc-600 dark:text-zinc-400 leading-relaxed">
              Our generator supports three major static QR payloads:
            </p>
            <ul className="list-disc pl-6 text-zinc-600 dark:text-zinc-400 space-y-2">
              <li>
                <strong>Website &amp; Plain Text URLs:</strong> Encodes web links directly into matrix modules.
              </li>
              <li>
                <strong>WiFi Network Credentials:</strong> Formats standard `WIFI:S:NetworkName;T:WPA;P:Password;;` strings for instant 1-tap smartphone guest connections.
              </li>
              <li>
                <strong>vCard Contact Cards:</strong> Formats standard vCard 3.0 virtual contact cards containing full name, phone number, email address, company, and job title.
              </li>
            </ul>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-bold text-zinc-950 dark:text-white">
              Error Correction Levels &amp; Center Logo Embedding
            </h2>
            <p className="text-zinc-600 dark:text-zinc-400 leading-relaxed">
              QR codes use Reed-Solomon error correction to recover damaged or obscured modules. There are 4 standardized error correction levels:
            </p>
            <ul className="list-disc pl-6 text-zinc-600 dark:text-zinc-400 space-y-2">
              <li><strong>Level L (Low):</strong> Recovers up to 7% missing data (smallest matrix size).</li>
              <li><strong>Level M (Medium):</strong> Recovers up to 15% missing data (recommended standard).</li>
              <li><strong>Level Q (Quartile):</strong> Recovers up to 25% missing data (ideal for high-wear print).</li>
              <li><strong>Level H (High):</strong> Recovers up to 30% missing data (required when adding center logos).</li>
            </ul>
            <p className="text-zinc-600 dark:text-zinc-400 leading-relaxed mt-4">
              If you also need to generate secure passwords for your guest WiFi QR codes, try our free{" "}
              <Link
                href="/tools/password-generator"
                className="text-emerald-600 dark:text-emerald-400 font-semibold underline hover:text-emerald-700"
              >
                Secure Password Generator
              </Link>{" "}
              or extract custom brand hex colors for your QR design using our{" "}
              <Link
                href="/tools/color-palette-generator"
                className="text-teal-600 dark:text-teal-400 font-semibold underline hover:text-teal-700"
              >
                Color Palette Generator
              </Link>.
            </p>
          </section>

          <div className="ad-slot ad-slot--inline" data-ad-position="in-content-2">
            <div className="ad-placeholder-label border border-dashed border-zinc-300 dark:border-zinc-800 rounded-xl py-4 flex items-center justify-center bg-zinc-50/50 dark:bg-zinc-950/20 text-[10px] font-bold text-zinc-400 dark:text-zinc-600 uppercase tracking-widest cursor-default">
              Advertisement
            </div>
          </div>

          <section className="space-y-4 border-t border-zinc-200 dark:border-zinc-800 pt-8">
            <h2 className="text-2xl font-bold text-zinc-950 dark:text-white border-b border-zinc-100 dark:border-zinc-900 pb-2">
              Frequently Asked Questions (FAQ)
            </h2>
            <div className="space-y-6">
              <div className="space-y-2">
                <h3 className="text-base font-bold text-zinc-900 dark:text-zinc-100">
                  Do generated QR codes expire?
                </h3>
                <p className="text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed">
                  No. QuickCalc generates standard static QR codes. Static QR codes encode destination payload data directly into the matrix modules and never expire or rely on third-party redirection servers.
                </p>
              </div>

              <div className="space-y-2">
                <h3 className="text-base font-bold text-zinc-900 dark:text-zinc-100">
                  How does a WiFi QR code allow instant connection?
                </h3>
                <p className="text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed">
                  WiFi QR codes follow the standard `WIFI:S:SSID;T:WPA;P:password;;` format. When scanned by an iOS or Android camera, the smartphone operating system reads the network credentials and prompts the user to join the WiFi network with one tap.
                </p>
              </div>

              <div className="space-y-2">
                <h3 className="text-base font-bold text-zinc-900 dark:text-zinc-100">
                  What error correction level should I select for printing?
                </h3>
                <p className="text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed">
                  For standard digital displays and print materials, Level M (15% recovery) or Level Q (25% recovery) provides excellent scannability. If you embed a logo in the center, use Level H (30% recovery) to ensure the QR code remains fully readable.
                </p>
              </div>

              <div className="space-y-2">
                <h3 className="text-base font-bold text-zinc-900 dark:text-zinc-100">
                  What file format should I download for professional printing?
                </h3>
                <p className="text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed">
                  Download the SVG vector format for professional print materials, banners, and business cards. SVG vectors can be scaled to any size without losing crisp pixel sharp edges.
                </p>
              </div>
            </div>
          </section>
        </article>

        <RelatedTools currentSlug="qr-code-generator" />

        <div className="ad-slot ad-slot--footer mt-12" data-ad-position="footer">
          <div className="ad-placeholder-label border border-dashed border-zinc-300 dark:border-zinc-800 rounded-xl py-4 flex items-center justify-center bg-zinc-50/50 dark:bg-zinc-950/20 text-[10px] font-bold text-zinc-400 dark:text-zinc-600 uppercase tracking-widest cursor-default">
            Advertisement
          </div>
        </div>
      </main>

      <Footer customText="Custom high-resolution QR code generation for URLs, WiFi, and vCard contacts." />
    </div>
  );
}
