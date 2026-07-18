import type { Metadata } from "next";
import localFont from "next/font/local";
import { Analytics } from "@vercel/analytics/next";
import "./globals.css";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://quickcalc.cloud"),
  title: {
    default: "QuickCalc - Elegant Ultimate Calculator Suite",
    template: "%s | QuickCalc",
  },
  description: "A beautiful, fully featured and highly responsive modern calculator suite for health, finance, and grade conversions.",
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "QuickCalc - Elegant Ultimate Calculator Suite",
    description: "A beautiful, fully featured and highly responsive modern calculator suite for health, finance, and grade conversions.",
    url: "https://quickcalc.cloud",
    siteName: "QuickCalc",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "QuickCalc Suite",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "QuickCalc - Elegant Ultimate Calculator Suite",
    description: "A beautiful, fully featured and highly responsive modern calculator suite.",
    images: ["/og-image.png"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const orgSchema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "QuickCalc",
    "url": "https://quickcalc.cloud",
    "logo": "https://quickcalc.cloud/og-image.png",
  };

  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {/* Organization Structured Data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(orgSchema) }}
        />
        {children}
        <Analytics />
      </body>
    </html>
  );
}
