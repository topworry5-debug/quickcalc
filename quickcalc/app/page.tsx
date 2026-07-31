import type { Metadata } from "next";
import HomeClient from "./HomeClient";
import { Suspense } from "react";

export const metadata: Metadata = {
  title: "QuickCalc - Elegant, Science-Backed Calculator Suite",
  description: "QuickCalc offers a collection of beautiful, fully featured, and highly responsive tools tailored directly for your health, finance, and educational calculation needs.",
  alternates: {
    canonical: "/",
  },
};

import { tools } from "@/lib/toolsData";

export default function Home() {

  const websiteSchema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "name": "QuickCalc",
    "url": "https://quickcalc.cloud",
    "potentialAction": {
      "@type": "SearchAction",
      "target": {
        "@type": "EntryPoint",
        "urlTemplate": "https://quickcalc.cloud/?q={search_term_string}"
      },
      "query-input": "required name=search_term_string"
    }
  };

  return (
    <>
      {/* JSON-LD WebSite Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
      />
      <Suspense fallback={null}>
        <HomeClient initialTools={tools} />
      </Suspense>
    </>
  );
}
