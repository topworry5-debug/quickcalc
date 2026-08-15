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
import SpeedTestWidget from "./SpeedTestWidget";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "Free Internet Speed Test No Ads - Download & Upload Ping",
  description:
    "Test your internet speed with no ads or tracking. Measure download Mbps, upload Mbps, ping latency, and jitter free in your browser.",
  alternates: {
    canonical: "/tools/internet-speed-test",
  },
  openGraph: {
    title: "Free Internet Speed Test No Ads - Download & Upload Ping",
    description:
      "Test your internet speed with no ads or tracking. Measure download Mbps, upload Mbps, ping latency, and jitter free in your browser.",
    url: "https://quickcalc.cloud/tools/internet-speed-test",
    type: "website",
    siteName: "QuickCalc",
    images: [
      {
        url: "https://quickcalc.cloud/og-image.png",
        width: 1200,
        height: 630,
        alt: "Free Internet Speed Test No Ads on QuickCalc",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Free Internet Speed Test No Ads - Download & Upload Ping",
    description:
      "Test your internet speed with no ads or tracking. Measure download Mbps, upload Mbps, ping latency, and jitter free in your browser.",
  },
};

export default function InternetSpeedTestPage({
  searchParams,
}: {
  searchParams?: { embed?: string };
}) {
  const softwareSchema = generateSoftwareAppSchema({
    name: "Free Internet Speed Test No Ads",
    description:
      "Test your internet speed with no ads or tracking. Measure download Mbps, upload Mbps, ping latency, and jitter free in your browser.",
    slug: "internet-speed-test",
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
          <SpeedTestWidget />
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
        name: "What is a good internet speed for streaming and gaming?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "For 4K Ultra HD video streaming, a download speed of 25 Mbps is recommended. For HD video calls (Zoom/Teams), 5 Mbps download and 3 Mbps upload are ideal. For low-latency competitive gaming, a ping under 30ms and jitter under 5ms are far more critical than raw megabits.",
        },
      },
      {
        "@type": "Question",
        name: "Why is my upload speed slower than my download speed?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Most residential internet connections (cable and DSL) use asymmetrical bandwidth allocations. Internet service providers (ISPs) allocate significantly more bandwidth to download capacity because typical web browsing, video streaming, and content consumption require far more inbound data than outbound data.",
        },
      },
      {
        "@type": "Question",
        name: "What is network jitter?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Jitter measures the variance in latency over time. While ping measures average round-trip travel speed, jitter measures how consistent that travel time remains. High jitter causes packet loss, frozen video frames during calls, and unpredictable lag spikes during online gaming.",
        },
      },
      {
        "@type": "Question",
        name: "How does this speed test measure bandwidth accurately?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Our test streams pseudo-random binary chunks between your browser and our edge API server over 4.5-second sampling windows. It discards initial TCP slow-start warmup windows to measure true, uncompressed connection throughput.",
        },
      },
    ],
  };

  const softwareData = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: "Internet Speed Test",
    operatingSystem: "All",
    applicationCategory: "UtilityApplication",
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
        <Breadcrumbs toolName="Internet Speed Test" toolSlug="internet-speed-test" />

        <div className="text-center max-w-2xl mx-auto mb-8">
          <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-zinc-900 dark:text-white mb-4">
            Internet Speed Test
          </h1>
          <p className="text-base sm:text-lg text-zinc-600 dark:text-zinc-400 leading-relaxed">
            Use our <strong>free internet speed test no ads</strong> to test your real-time broadband connection. As a <strong>private speed test no tracking</strong> utility, our <strong>speed test download upload ping free tool</strong> measures download Mbps, upload Mbps, latency ping, and packet jitter using uncompressed server chunk streams.
          </p>
        </div>

        <ShareButtons
          url="https://quickcalc.cloud/tools/internet-speed-test"
          title="Free Internet Speed Test No Ads"
        />
        <EmbedWidget
          url="https://quickcalc.cloud/tools/internet-speed-test"
          title="Free Internet Speed Test No Ads"
        />

        <section className="my-8">
          <Suspense
            fallback={
              <div className="p-8 text-center text-zinc-500 animate-pulse">
                Initializing speed test environment...
              </div>
            }
          >
            <SpeedTestWidget />
          </Suspense>
        </section>

        <MethodologyAccordion slug="internet-speed-test" />

        <div className="ad-slot ad-slot--inline" data-ad-position="in-content-1">
          <div className="ad-placeholder-label border border-dashed border-zinc-300 dark:border-zinc-800 rounded-xl py-4 flex items-center justify-center bg-zinc-50/50 dark:bg-zinc-950/20 text-[10px] font-bold text-zinc-400 dark:text-zinc-600 uppercase tracking-widest cursor-default">
            Advertisement
          </div>
        </div>

        <article className="prose prose-zinc dark:prose-invert max-w-3xl mx-auto space-y-8 mt-12 border-t border-zinc-200 dark:border-zinc-800 pt-10">
          <section className="space-y-4">
            <h2 className="text-2xl font-bold text-zinc-950 dark:text-white">
              Understanding Internet Speed Metrics: Download, Upload, Ping &amp; Jitter
            </h2>
            <p className="text-zinc-600 dark:text-zinc-400 leading-relaxed">
              When evaluating connection performance, most users look strictly at download megabits per second (Mbps). However, overall network quality depends on four distinct metrics:
            </p>
            <ul className="list-disc pl-6 text-zinc-600 dark:text-zinc-400 space-y-2">
              <li>
                <strong>Download Speed (Mbps):</strong> The rate at which data is transferred from external servers to your device. Determines how fast web pages load, 4K videos stream, and software updates download.
              </li>
              <li>
                <strong>Upload Speed (Mbps):</strong> The rate at which data is sent from your device to remote servers. Crucial for video conferencing, sending email attachments, live streaming, and cloud backups.
              </li>
              <li>
                <strong>Ping (Latency in ms):</strong> The time in milliseconds required for a small packet of data to travel from your browser to a server and return. Lower ping is essential for real-time applications like online gaming.
              </li>
              <li>
                <strong>Jitter (Variance in ms):</strong> The consistency of latency over time. Low jitter ensures smooth video calls without frozen frames or audio distortion.
              </li>
            </ul>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-bold text-zinc-950 dark:text-white">
              Tips for Getting the Most Accurate Speed Test Result
            </h2>
            <p className="text-zinc-600 dark:text-zinc-400 leading-relaxed">
              To ensure your speed test reflects your true connection capacity rather than local network congestion:
            </p>
            <ul className="list-disc pl-6 text-zinc-600 dark:text-zinc-400 space-y-2">
              <li>Close background video downloads, BitTorrent clients, and active cloud sync apps.</li>
              <li>If using Wi-Fi, move closer to your router or connect directly via Ethernet for baseline testing.</li>
              <li>Disable active VPN services temporarily, as encrypted VPN tunnels add latency routing overhead.</li>
            </ul>
            <p className="text-zinc-600 dark:text-zinc-400 leading-relaxed mt-4">
              If you are transferring large data archives, check out our free{" "}
              <Link
                href="/tools/digital-storage-converter"
                className="text-blue-600 dark:text-blue-400 font-semibold underline hover:text-blue-700"
              >
                Digital Storage Unit Converter
              </Link>{" "}
              to calculate exact byte transfers.
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
                  What is a good internet speed for streaming and gaming?
                </h3>
                <p className="text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed">
                  For 4K Ultra HD video streaming, a download speed of 25 Mbps is recommended. For HD video calls (Zoom/Teams), 5 Mbps download and 3 Mbps upload are ideal. For low-latency competitive gaming, a ping under 30ms and jitter under 5ms are far more critical than raw megabits.
                </p>
              </div>

              <div className="space-y-2">
                <h3 className="text-base font-bold text-zinc-900 dark:text-zinc-100">
                  Why is my upload speed slower than my download speed?
                </h3>
                <p className="text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed">
                  Most residential internet connections (cable and DSL) use asymmetrical bandwidth allocations. Internet service providers (ISPs) allocate significantly more bandwidth to download capacity because typical web browsing, video streaming, and content consumption require far more inbound data than outbound data.
                </p>
              </div>

              <div className="space-y-2">
                <h3 className="text-base font-bold text-zinc-900 dark:text-zinc-100">
                  What is network jitter?
                </h3>
                <p className="text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed">
                  Jitter measures the variance in latency over time. While ping measures average round-trip travel speed, jitter measures how consistent that travel time remains. High jitter causes packet loss, frozen video frames during calls, and unpredictable lag spikes during online gaming.
                </p>
              </div>

              <div className="space-y-2">
                <h3 className="text-base font-bold text-zinc-900 dark:text-zinc-100">
                  How does this speed test measure bandwidth accurately?
                </h3>
                <p className="text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed">
                  Our test streams pseudo-random binary chunks between your browser and our edge API server over 4.5-second sampling windows. It discards initial TCP slow-start warmup windows to measure true, uncompressed connection throughput.
                </p>
              </div>
            </div>
          </section>
        </article>

        <RelatedTools currentSlug="internet-speed-test" />

        <div className="ad-slot ad-slot--footer mt-12" data-ad-position="footer">
          <div className="ad-placeholder-label border border-dashed border-zinc-300 dark:border-zinc-800 rounded-xl py-4 flex items-center justify-center bg-zinc-50/50 dark:bg-zinc-950/20 text-[10px] font-bold text-zinc-400 dark:text-zinc-600 uppercase tracking-widest cursor-default">
            Advertisement
          </div>
        </div>
      </main>

      <Footer customText="Fast, ad-free, private internet speed test for download, upload, ping, and jitter." />
    </div>
  );
}
