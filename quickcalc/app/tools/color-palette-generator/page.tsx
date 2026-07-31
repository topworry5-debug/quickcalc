import RelatedTools from "@/components/RelatedTools";
import ShareButtons from "@/components/ShareButtons";
import EmbedWidget from "@/components/EmbedWidget";

import ThemeToggle from "@/components/ThemeToggle";
import Breadcrumbs from "@/components/Breadcrumbs";
import type { Metadata } from "next";
import Link from "next/link";
import ColorPaletteGeneratorWidget from "./ColorPaletteGeneratorWidget";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "Free Color Palette Generator - Extract Dominant Colors from Images | QuickCalc",
  description: "Upload an image to extract 6-8 dominant colors instantly. Includes click-to-copy hex codes, WCAG contrast checks, CSS variables, and Tailwind export. 100% free.",
  alternates: {
    canonical: "/tools/color-palette-generator",
  },
  openGraph: {
    title: "Free Color Palette Generator - Extract Dominant Colors from Images | QuickCalc",
    description: "Upload an image to extract 6-8 dominant colors instantly. Includes click-to-copy hex codes, WCAG contrast checks, CSS variables, and Tailwind export. 100% free.",
    url: "https://quickcalc.cloud/tools/color-palette-generator",
    type: "website",
    siteName: "QuickCalc",
    images: [
      {
        url: "https://quickcalc.cloud/og-image.png",
        width: 1200,
        height: 630,
        alt: "Free Color Palette Generator on QuickCalc",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Free Color Palette Generator - Extract Dominant Colors from Images | QuickCalc",
    description: "Upload an image to extract 6-8 dominant colors instantly. Includes click-to-copy hex codes, WCAG contrast checks, CSS variables, and Tailwind export. 100% free.",
    images: ["https://quickcalc.cloud/og-image.png"],
  },
};

export default function ColorPaletteGeneratorPage({ searchParams }: { searchParams?: { embed?: string } }) {
  const isEmbed = searchParams?.embed === "true";
  if (isEmbed) {
    return (
      <div className="min-h-screen bg-white dark:bg-zinc-950 text-zinc-900 dark:text-zinc-100 font-[family-name:var(--font-geist-sans)] transition-colors p-2 flex flex-col justify-between">
        <main className="max-w-4xl mx-auto w-full">
          <ColorPaletteGeneratorWidget />
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
        "name": "How can I extract a hex code color palette from my own image?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "To learn how to create a color palette from an image, drag and drop your photo or graphic into our browser-based analyzer above. It instantly loads the file on a local canvas, applies pixel clustering, and extracts 6 to 8 dominant colors with click-to-copy hex codes."
        }
      },
      {
        "@type": "Question",
        "name": "Can I generate complementary and monochromatic color schemes for free?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Yes, our interactive tool operates as a robust complementary color scheme generator free of charge. You can analyze any uploaded graphic, view WCAG contrast scores, and immediately export matching styling objects such as CSS custom properties or Tailwind theme variables."
        }
      },
      {
        "@type": "Question",
        "name": "How does a color palette generator extract hex codes from uploaded photos?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Our hex code color palette generator parses image pixels using advanced downsampling and RGB quantization. It isolates visual clusters, removes indistinguishable adjacent shades, and outputs clean hexadecimal values so you can paste them directly into Photoshop, Figma, or your CSS files."
        }
      },
      {
        "@type": "Question",
        "name": "Is my uploaded image saved on a server when generating a color palette?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "No, your uploaded images are never stored or transmitted to any remote servers. All processing is executed 100% locally in your browser memory using HTML5 Canvas APIs, ensuring absolute privacy for your personal designs, proprietary logos, and photography."
        }
      }
    ]
  };

  const softwareData = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    "name": "Color Palette Generator",
    "operatingSystem": "All",
    "applicationCategory": "DesignApplication",
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
          <Link href="/" className="flex items-center gap-2 font-bold text-lg text-emerald-600 dark:text-emerald-400">
            <span>🎨 QuickCalc</span>
          </Link>
          <nav className="flex items-center gap-2 sm:gap-4">
            <Link href="/" className="text-sm font-medium text-zinc-600 dark:text-zinc-400 hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors">
              Home
            </Link>
            <Link href="/blog" className="text-sm font-medium text-zinc-600 dark:text-zinc-400 hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors">
              Blog
            </Link>
            <span className="text-sm font-medium text-zinc-300 dark:text-zinc-700 font-normal">|</span>
            <span className="text-sm font-medium text-zinc-300 dark:text-zinc-700">|</span>
            <span className="text-sm font-medium text-zinc-400 dark:text-zinc-600">Palette Generator</span>
            <span className="text-sm font-medium text-zinc-300 dark:text-zinc-700 font-normal">|</span>
            <ThemeToggle />
          </nav>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-4xl mx-auto px-4 py-8 sm:py-12">
        <Breadcrumbs toolName="Color Palette Generator" toolSlug="color-palette-generator" />
        <div className="text-center max-w-2xl mx-auto mb-8">
          <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-zinc-900 dark:text-white mb-4">
            Color Palette Generator
          </h1>
          <p className="text-base sm:text-lg text-zinc-600 dark:text-zinc-400 leading-relaxed">
            If you are looking for how to create a color palette from an image or need a complementary color scheme generator free of paywalls, our interactive utility is here to help. Easily extract swatches using our hex code color palette generator and copy styling objects right to your clipboard.
          </p>
        </div>

        <ShareButtons url="https://quickcalc.cloud/tools/color-palette-generator" title="Color Palette Generator" />
        <EmbedWidget url="https://quickcalc.cloud/tools/color-palette-generator" title="Color Palette Generator" />

        {/* The interactive widget */}
        <section className="my-8">
          <ColorPaletteGeneratorWidget />
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
              About Our Color Palette and Hex Code Generator
            </h2>
            <p className="text-zinc-600 dark:text-zinc-400 leading-relaxed">
              Our professional-grade Color Palette Generator provides designers, developers, and creators with a streamlined mechanism to derive visually cohesive color schemes from mood boards, logo graphics, or photographs. Utilizing intelligent pixel-quantization algorithms and spatial-hue clustering, this utility identifies dominant hues while actively filtering redundant adjacent values to ensure a beautiful, distinct range.
            </p>
            <p className="text-zinc-600 dark:text-zinc-400 leading-relaxed">
              Unlike generic subscription tools that artificial-gate extraction configurations or hide utility checks behind pricing plans, <strong>QuickCalc offers unlimited 6-to-8 swatch extraction, professional exports, and automatic WCAG readability analysis for free, with absolutely no accounts or paywalls</strong>.
            </p>
            <p className="text-zinc-600 dark:text-zinc-400 leading-relaxed">
              <strong>Key Features & Advantages:</strong>
            </p>
            <ul className="list-disc list-inside space-y-2 text-zinc-600 dark:text-zinc-400 leading-relaxed">
              <li><strong>Advanced Swatch Count:</strong> Get 6 to 8 visually diverse swatches rather than being restricted to standard 5-color caps.</li>
              <li><strong>WCAG Contrast Analysis:</strong> Instantly check contrast scores between all extracted color pairings against AA readability requirements (4.5:1 ratio) to guarantee accessible text placement.</li>
              <li><strong>Instant Coding Exports:</strong> Convert your palette into custom CSS custom properties, Tailwind theme configuration objects, or raw hex code arrays in one click.</li>
              <li><strong>100% Client-Side Privacy:</strong> Your design assets remain entirely yours. Image loading, canvas rendering, and data compilation happen locally in browser memory without sending files to external servers.</li>
            </ul>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-bold text-zinc-950 dark:text-white">
              How Color Palette Harmonies are Calculated (HEX, RGB & HSL)
            </h2>
            <p className="text-zinc-600 dark:text-zinc-400 leading-relaxed">
              To extract the dominant color palette from your uploaded image, our system executes a series of mathematical color clustering computations:
            </p>
            <ul className="list-disc pl-6 text-zinc-600 dark:text-zinc-400 space-y-2">
              <li>
                <strong>Image Downsampling:</strong> The image is drawn onto an invisible HTML5 canvas element and downsampled to a manageable resolution (e.g., 100x100 pixels) to optimize performance.
              </li>
              <li>
                <strong>Pixel Quantization:</strong> The RGB values of the pixels are clustered using a modified K-means clustering or Octree algorithm, which groups similar colors into bins based on geometric distance in the 3D RGB color space.
              </li>
              <li>
                <strong>Frequency Ranking & Filtering:</strong> The clustered color bins are ranked by size (frequency) to find the most dominant colors, while filtering out colors that are too similar in distance (using delta-E metric or Euclidean distance checks) to avoid duplicate swatches.
              </li>
              <li>
                <strong>Contrast Analysis (WCAG 2.0):</strong> For each color, relative luminance <code>L</code> is calculated using the formula:
                <div className="bg-zinc-100 dark:bg-zinc-900 p-2 my-2 rounded font-mono text-xs overflow-x-auto text-emerald-600 dark:text-emerald-400">
                  L = 0.2126 * R_srgb + 0.7152 * G_srgb + 0.0722 * B_srgb
                </div>
                Contrast ratio is then computed as <code>(L1 + 0.05) / (L2 + 0.05)</code>, where L1 is the lighter color and L2 is the darker color.
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
                  How can I extract a hex code color palette from my own image?
                </h3>
                <p className="text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed">
                  To learn how to create a color palette from an image, drag and drop your photo or graphic into our browser-based analyzer above. It instantly loads the file on a local canvas, applies pixel clustering, and extracts 6 to 8 dominant colors with click-to-copy hex codes.
                </p>
              </div>

              <div className="space-y-2">
                <h3 className="text-base font-bold text-zinc-900 dark:text-zinc-100">
                  Can I generate complementary and monochromatic color schemes for free?
                </h3>
                <p className="text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed">
                  Yes, our interactive tool operates as a robust complementary color scheme generator free of charge. You can analyze any uploaded graphic, view WCAG contrast scores, and immediately export matching styling objects such as CSS custom properties or Tailwind theme variables.
                </p>
              </div>

              <div className="space-y-2">
                <h3 className="text-base font-bold text-zinc-900 dark:text-zinc-100">
                  How does a color palette generator extract hex codes from uploaded photos?
                </h3>
                <p className="text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed">
                  Our hex code color palette generator parses image pixels using advanced downsampling and RGB quantization. It isolates visual clusters, removes indistinguishable adjacent shades, and outputs clean hexadecimal values so you can paste them directly into Photoshop, Figma, or your CSS files.
                </p>
              </div>

              <div className="space-y-2">
                <h3 className="text-base font-bold text-zinc-900 dark:text-zinc-100">
                  Is my uploaded image saved on a server when generating a color palette?
                </h3>
                <p className="text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed">
                  No, your uploaded images are never stored or transmitted to any remote servers. All processing is executed 100% locally in your browser memory using HTML5 Canvas APIs, ensuring absolute privacy for your personal designs, proprietary logos, and photography.
                </p>
              </div>
            </div>
          </section>
        </article>

        <RelatedTools currentSlug="color-palette-generator" />

        {/* Ad Placement Footer */}
        <div className="ad-slot ad-slot--footer mt-12" data-ad-position="footer">
          <div className="ad-placeholder-label border border-dashed border-zinc-300 dark:border-zinc-800 rounded-xl py-4 flex items-center justify-center bg-zinc-50/50 dark:bg-zinc-950/20 text-[10px] font-bold text-zinc-400 dark:text-zinc-600 uppercase tracking-widest cursor-default">
            Advertisement
          </div>
        </div>
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
}
