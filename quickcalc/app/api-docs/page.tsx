import React from "react";
import Link from "next/link";
import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Breadcrumbs from "@/components/Breadcrumbs";
import { Code, Terminal, ShieldCheck, Zap, MessageSquare, ExternalLink } from "lucide-react";

export const metadata: Metadata = {
  title: "Free Calculator REST API & Developer Docs | QuickCalc",
  description: "Free, open REST API for BMI, Loan EMI, Currency Conversion, Percentage, and Tip calculations. No API key required, CORS-enabled, 100% private.",
  alternates: {
    canonical: "/api-docs",
  },
  openGraph: {
    title: "Free Calculator REST API & Developer Docs | QuickCalc",
    description: "Free, open REST API for BMI, Loan EMI, Currency Conversion, Percentage, and Tip calculations. No API key required, CORS-enabled, 100% private.",
    url: "https://quickcalc.cloud/api-docs",
    type: "website",
    siteName: "QuickCalc",
  },
};

const endpoints = [
  {
    id: "bmi",
    name: "Body Mass Index (BMI) API",
    path: "/api/v1/bmi",
    method: "GET",
    description: "Calculates BMI value, World Health Organization (WHO) category, and healthy weight ranges for given height and weight.",
    params: [
      { name: "weight", type: "number", required: true, desc: "Body weight (e.g. 70 or 154)" },
      { name: "height", type: "number", required: true, desc: "Height in cm (e.g. 175)" },
      { name: "unit", type: "string", required: false, desc: "'metric' (default) or 'imperial'" },
      { name: "heightFt / heightIn", type: "number", required: false, desc: "Imperial height components (if unit=imperial)" },
    ],
    exampleUrl: "/api/v1/bmi?weight=70&height=175",
    curlExample: "curl -X GET 'https://quickcalc.cloud/api/v1/bmi?weight=70&height=175'",
    jsonResponse: `{
  "success": true,
  "data": {
    "bmi": 22.9,
    "category": "Normal",
    "healthyRange": {
      "minBmi": 18.5,
      "maxBmi": 24.9,
      "minWeightKg": 56.7,
      "maxWeightKg": 76.3
    },
    "inputs": {
      "weight": 70,
      "weightUnit": "kg",
      "height": 175,
      "heightUnit": "cm",
      "unitSystem": "metric"
    }
  },
  "meta": {
    "formula": "BMI = weight (kg) / [height (m)]²",
    "standard": "World Health Organization (WHO)",
    "privacy": "100% Stateless & Private — No data logged"
  }
}`,
  },
  {
    id: "loan",
    name: "Loan & EMI Amortization API",
    path: "/api/v1/loan",
    method: "GET",
    description: "Computes Equal Monthly Installments (EMI), total interest payable, and full annual amortization schedule.",
    params: [
      { name: "principal", type: "number", required: true, desc: "Loan principal amount (e.g. 250000)" },
      { name: "annualRate", type: "number", required: true, desc: "Annual interest percentage (e.g. 6.5)" },
      { name: "tenure", type: "number", required: true, desc: "Duration period (e.g. 30)" },
      { name: "tenureUnit", type: "string", required: false, desc: "'years' (default) or 'months'" },
    ],
    exampleUrl: "/api/v1/loan?principal=250000&annualRate=6.5&tenure=30&tenureUnit=years",
    curlExample: "curl -X GET 'https://quickcalc.cloud/api/v1/loan?principal=250000&annualRate=6.5&tenure=30&tenureUnit=years'",
    jsonResponse: `{
  "success": true,
  "data": {
    "monthlyEMI": 1579.99,
    "totalPayment": 568797.87,
    "totalInterestPayable": 318797.87,
    "inputs": {
      "principal": 250000,
      "annualRate": 6.5,
      "tenure": 30,
      "tenureUnit": "years"
    }
  },
  "meta": {
    "formula": "EMI = P × [r(1+r)ⁿ] / [(1+r)ⁿ - 1]",
    "standard": "Reducing-Balance Compound Amortization"
  }
}`,
  },
  {
    id: "percentage",
    name: "Percentage & Change API",
    path: "/api/v1/percentage",
    method: "GET",
    description: "Calculates X% of Y, percentage increase/decrease, discount pricing, or part-to-whole proportions.",
    params: [
      { name: "type", type: "string", required: false, desc: "'of' (default), 'change', 'discount', or 'proportion'" },
      { name: "percent / total", type: "number", required: "mode-dependent", desc: "For type='of': e.g. percent=20&total=150" },
      { name: "initial / final", type: "number", required: "mode-dependent", desc: "For type='change': e.g. initial=100&final=125" },
      { name: "price / discount", type: "number", required: "mode-dependent", desc: "For type='discount': e.g. price=80&discount=25" },
    ],
    exampleUrl: "/api/v1/percentage?type=change&initial=100&final=125",
    curlExample: "curl -X GET 'https://quickcalc.cloud/api/v1/percentage?type=change&initial=100&final=125'",
    jsonResponse: `{
  "success": true,
  "data": {
    "type": "percentage_change",
    "percentChange": 25,
    "direction": "increase",
    "difference": 25,
    "inputs": {
      "initial": 100,
      "final": 125
    }
  },
  "meta": {
    "formula": "% Change = [(125 - 100) / 100] * 100 = 25%"
  }
}`,
  },
  {
    id: "currency",
    name: "Live Currency Conversion API",
    path: "/api/v1/currency",
    method: "GET",
    description: "Converts fiat currency amounts using real-time mid-market exchange rates without spreads or bank fees.",
    params: [
      { name: "amount", type: "number", required: false, desc: "Amount to convert (default 1)" },
      { name: "from", type: "string", required: true, desc: "3-letter source currency code (e.g. USD)" },
      { name: "to", type: "string", required: true, desc: "3-letter target currency code (e.g. EUR)" },
    ],
    exampleUrl: "/api/v1/currency?amount=100&from=USD&to=EUR",
    curlExample: "curl -X GET 'https://quickcalc.cloud/api/v1/currency?amount=100&from=USD&to=EUR'",
    jsonResponse: `{
  "success": true,
  "data": {
    "amount": 100,
    "fromCurrency": "USD",
    "toCurrency": "EUR",
    "convertedAmount": 91.74,
    "exchangeRate": 0.9174,
    "inverseRate": 1.09
  },
  "meta": {
    "standard": "European Central Bank (ECB) Mid-Market Benchmark"
  }
}`,
  },
  {
    id: "tip",
    name: "Tip & Bill Splitter API",
    path: "/api/v1/tip",
    method: "GET",
    description: "Calculates total tip amounts, grand totals, and symmetric per-person bill splits.",
    params: [
      { name: "bill", type: "number", required: true, desc: "Total pre-tip bill amount (e.g. 100)" },
      { name: "tip", type: "number", required: false, desc: "Tip percentage (e.g. 18, default 15)" },
      { name: "people", type: "number", required: false, desc: "Number of people splitting (default 1)" },
    ],
    exampleUrl: "/api/v1/tip?bill=100&tip=18&people=4",
    curlExample: "curl -X GET 'https://quickcalc.cloud/api/v1/tip?bill=100&tip=18&people=4'",
    jsonResponse: `{
  "success": true,
  "data": {
    "tipAmount": 18.00,
    "totalBill": 118.00,
    "tipPerPerson": 4.50,
    "totalPerPerson": 29.50,
    "inputs": {
      "billAmount": 100,
      "tipPercentage": 18,
      "peopleCount": 4
    }
  },
  "meta": {
    "formula": "Tip = Bill × (Tip % / 100) | Per Person = (Bill + Tip) / Headcount"
  }
}`,
  },
];

export default function ApiDocsPage() {
  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-zinc-950 text-zinc-900 dark:text-zinc-100 font-[family-name:var(--font-geist-sans)] transition-colors">
      <Navbar />

      <main className="max-w-5xl mx-auto px-4 py-8 sm:py-12 space-y-12">
        <Breadcrumbs toolName="Developer REST API" toolSlug="api-docs" />

        {/* Hero Banner */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-teal-50 dark:bg-teal-950/40 border border-teal-200/50 dark:border-teal-800/50 text-teal-700 dark:text-teal-300 text-xs font-bold">
            <Code size={14} />
            <span>Developer Documentation v1</span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-zinc-900 dark:text-white">
            Free Public Calculator REST API
          </h1>

          <p className="text-base sm:text-lg text-zinc-600 dark:text-zinc-400 leading-relaxed">
            Integrate science-backed calculation models directly into your web, mobile, or backend apps. 100% free with zero authentication required.
          </p>

          {/* Feature Badge Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-4 text-xs font-bold text-zinc-700 dark:text-zinc-300">
            <div className="p-3 rounded-xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 flex items-center justify-center gap-2 shadow-sm">
              <Zap size={16} className="text-amber-500" />
              <span>No API Key</span>
            </div>
            <div className="p-3 rounded-xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 flex items-center justify-center gap-2 shadow-sm">
              <Code size={16} className="text-teal-500" />
              <span>CORS Enabled</span>
            </div>
            <div className="p-3 rounded-xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 flex items-center justify-center gap-2 shadow-sm">
              <ShieldCheck size={16} className="text-emerald-500" />
              <span>60 Req / Min</span>
            </div>
            <div className="p-3 rounded-xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 flex items-center justify-center gap-2 shadow-sm">
              <Terminal size={16} className="text-indigo-500" />
              <span>Clean JSON</span>
            </div>
          </div>
        </div>

        {/* Overview Section */}
        <div className="bg-white dark:bg-zinc-900 p-6 rounded-2xl border border-zinc-200 dark:border-zinc-800 shadow-sm space-y-4 text-xs sm:text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed">
          <h2 className="text-lg font-bold text-zinc-900 dark:text-white flex items-center gap-2">
            <Terminal size={18} className="text-teal-600 dark:text-teal-400" />
            <span>API Overview & Base URL</span>
          </h2>
          <p>
            All endpoints are accessible via HTTPS at <code className="bg-zinc-100 dark:bg-zinc-800 px-2 py-1 rounded text-teal-600 dark:text-teal-400 font-mono text-xs">https://quickcalc.cloud/api/v1/</code>. Requests return JSON responses formatted with standard HTTP status codes.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
            <div className="p-4 rounded-xl bg-zinc-50 dark:bg-zinc-950 border border-zinc-200/60 dark:border-zinc-800/60 space-y-1">
              <span className="font-bold text-zinc-900 dark:text-white block text-xs">Cross-Origin (CORS) Policy</span>
              <p className="text-xs">Headers include <code className="font-mono">Access-Control-Allow-Origin: *</code>, enabling client-side <code className="font-mono">fetch()</code> calls directly from browser apps.</p>
            </div>
            <div className="p-4 rounded-xl bg-zinc-50 dark:bg-zinc-950 border border-zinc-200/60 dark:border-zinc-800/60 space-y-1">
              <span className="font-bold text-zinc-900 dark:text-white block text-xs">Fair-Use Rate Limiting</span>
              <p className="text-xs">Unauthenticated requests are rate limited to 60 requests per minute per IP address. Response headers report remaining capacity.</p>
            </div>
          </div>
        </div>

        {/* Endpoint Documentation List */}
        <div className="space-y-8">
          <h2 className="text-2xl font-extrabold text-zinc-900 dark:text-white border-b border-zinc-200 dark:border-zinc-800 pb-3">
            Available Endpoints
          </h2>

          {endpoints.map((ep) => (
            <div
              key={ep.id}
              id={ep.id}
              className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-2xl p-6 shadow-sm space-y-6 scroll-mt-24 transition-colors"
            >
              {/* Endpoint Header */}
              <div className="space-y-2">
                <div className="flex flex-wrap items-center gap-3">
                  <span className="px-3 py-1 rounded-lg bg-teal-500/10 text-teal-600 dark:text-teal-400 font-mono font-bold text-xs border border-teal-500/20">
                    {ep.method}
                  </span>
                  <span className="font-mono font-extrabold text-sm sm:text-base text-zinc-900 dark:text-white">
                    {ep.path}
                  </span>
                </div>
                <h3 className="text-base font-bold text-zinc-900 dark:text-white">
                  {ep.name}
                </h3>
                <p className="text-xs text-zinc-600 dark:text-zinc-400 leading-relaxed">
                  {ep.description}
                </p>
              </div>

              {/* Parameter Table */}
              <div className="space-y-2">
                <span className="text-xs font-bold uppercase tracking-wider text-zinc-400 dark:text-zinc-500 block">
                  Query Parameters
                </span>
                <div className="overflow-x-auto border border-zinc-200 dark:border-zinc-800 rounded-xl">
                  <table className="w-full text-left text-xs">
                    <thead className="bg-zinc-50 dark:bg-zinc-950 text-zinc-500 font-bold border-b border-zinc-200 dark:border-zinc-800">
                      <tr>
                        <th className="p-3">Parameter</th>
                        <th className="p-3">Type</th>
                        <th className="p-3">Required</th>
                        <th className="p-3">Description</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-zinc-200 dark:divide-zinc-800 text-zinc-600 dark:text-zinc-400">
                      {ep.params.map((p) => (
                        <tr key={p.name}>
                          <td className="p-3 font-mono font-bold text-zinc-900 dark:text-white">{p.name}</td>
                          <td className="p-3 font-mono text-teal-600 dark:text-teal-400">{p.type}</td>
                          <td className="p-3">{p.required === true ? <span className="text-rose-500 font-bold">Yes</span> : p.required === false ? "No" : p.required}</td>
                          <td className="p-3">{p.desc}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              {/* cURL Example */}
              <div className="space-y-2">
                <span className="text-xs font-bold uppercase tracking-wider text-zinc-400 dark:text-zinc-500 block">
                  Example Request
                </span>
                <div className="bg-zinc-950 p-3.5 rounded-xl font-mono text-xs text-teal-400 overflow-x-auto border border-zinc-800">
                  {ep.curlExample}
                </div>
              </div>

              {/* Sample Response */}
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold uppercase tracking-wider text-zinc-400 dark:text-zinc-500 block">
                    Sample JSON Response (200 OK)
                  </span>
                </div>
                <pre className="bg-zinc-950 p-4 rounded-xl font-mono text-xs text-zinc-300 overflow-x-auto border border-zinc-800 leading-relaxed">
                  {ep.jsonResponse}
                </pre>
              </div>
            </div>
          ))}
        </div>

        {/* Backlink & Showcase CTA Banner (Requirement 5) */}
        <div className="p-8 rounded-3xl bg-gradient-to-r from-teal-600 to-indigo-600 text-white shadow-xl text-center sm:text-left flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="space-y-2 max-w-2xl">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/10 text-xs font-bold backdrop-blur-sm">
              <MessageSquare size={14} />
              <span>Developer Community & Case Studies</span>
            </div>
            <h3 className="text-2xl font-extrabold tracking-tight">
              Built something cool with our API? Let us know!
            </h3>
            <p className="text-xs sm:text-sm text-teal-100 leading-relaxed">
              Whether you built a mobile app, browser extension, or SaaS integration, we would love to feature your project in our developer showcase and link back to your site.
            </p>
          </div>

          <Link
            href="/contact"
            className="px-6 py-3.5 rounded-xl bg-white text-zinc-900 font-extrabold text-xs shadow-lg hover:bg-zinc-100 transition active:scale-95 shrink-0 inline-flex items-center gap-2"
          >
            <span>Submit Your App / Case Study</span>
            <ExternalLink size={14} />
          </Link>
        </div>
      </main>

      <Footer customText="Free, CORS-enabled REST API for developers." />
    </div>
  );
}
