import RelatedTools from "@/components/RelatedTools";
import ShareButtons from "@/components/ShareButtons";
import EmbedWidget from "@/components/EmbedWidget";

import ThemeToggle from "@/components/ThemeToggle";
import Breadcrumbs from "@/components/Breadcrumbs";
import type { Metadata } from "next";
import Link from "next/link";
import TravelTimeFuelWidget from "./TravelTimeFuelWidget";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "Travel Time & Fuel Calculator - Estimate Gas Costs Online",
  description: "Calculate trip driving duration and estimate exact vehicle gas cost. Enter your route distance, vehicle mpg, and local fuel price for instant planning.",
  alternates: {
    canonical: "/tools/travel-time-fuel-calculator",
  },
  openGraph: {
    title: "Travel Time & Fuel Calculator - Estimate Gas Costs Online",
    description: "Calculate trip driving duration and estimate exact vehicle gas cost. Enter your route distance, vehicle mpg, and local fuel price for instant planning.",
    url: "https://quickcalc.cloud/tools/travel-time-fuel-calculator",
    type: "website",
    siteName: "QuickCalc",
    images: [
      {
        url: "https://quickcalc.cloud/og-image.png",
        width: 1200,
        height: 630,
        alt: "Travel Time & Fuel Cost Calculator on QuickCalc",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Travel Time & Fuel Calculator - Estimate Gas Costs Online",
    description: "Calculate trip driving duration and estimate exact vehicle gas cost. Enter your route distance, vehicle mpg, and local fuel price for instant planning.",
    images: ["https://quickcalc.cloud/og-image.png"],
  },
};

export default function TravelTimeFuelCalculatorPage({ searchParams }: { searchParams?: { embed?: string } }) {
  const isEmbed = searchParams?.embed === "true";
  if (isEmbed) {
    return (
      <div className="min-h-screen bg-white dark:bg-zinc-950 text-zinc-900 dark:text-zinc-100 font-[family-name:var(--font-geist-sans)] transition-colors p-2 flex flex-col justify-between">
        <main className="max-w-4xl mx-auto w-full">
          <TravelTimeFuelWidget />
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
        "name": "How do I calculate the cost of gas for a road trip?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "To calculate how much gas will cost for a road trip, divide your total trip distance by your vehicle's miles per gallon (MPG) rating, and then multiply that number by the price of gas per gallon. For example, if you are driving a 300-mile road trip in a vehicle that gets 30 MPG, you will use 10 gallons of gas. If gas is priced at $3.50 per gallon, the total fuel cost for your trip will be $35.00."
        }
      },
      {
        "@type": "Question",
        "name": "How do I calculate fuel cost using my car's MPG and gas prices?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "You can calculate your total fuel cost by dividing your trip's distance by your vehicle's MPG, then multiplying the resulting gallons by the price of fuel. The mathematical formula is: Fuel Cost = (Distance ÷ MPG) × Fuel Price. Our interactive fuel cost calculator by distance and mpg does this calculation automatically, supporting both imperial and metric unit conversions instantly."
        }
      },
      {
        "@type": "Question",
        "name": "How do I compare whether it is cheaper to drive or fly for a trip?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Whether it is cheaper to drive or fly depends on trip distance, number of passengers, and total travel expenses. To decide if you should drive or fly, calculate the total driving expenses (fuel cost, vehicle depreciation at about $0.15/mile, tolls, meals, and overnight lodging) and compare them with the sum of commercial airline ticket prices, baggage fees, airport parking, and terminal transit. Driving is almost always more cost-effective for families and groups, while flying often saves time and money for solo travelers over long distances."
        }
      },
      {
        "@type": "Question",
        "name": "How do I calculate my monthly or annual gas cost for a daily commute?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "A daily commute gas cost is calculated using your round-trip distance, vehicle MPG, and fuel price. The formula is: Daily Commute Cost = (Daily Round-Trip Distance ÷ MPG) × Gas Price. For example, if your daily round-trip commute is 40 miles, your vehicle achieves 25 MPG, and gas costs $3.75/gallon, you consume 1.6 gallons daily, resulting in a daily commute cost of $6.00 in gas (or $120.00 per month for a typical 20-day working schedule)."
        }
      },
      {
        "@type": "Question",
        "name": "How do I calculate my vehicle's cost per mile to drive?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Cost per mile measures how much you spend to operate your vehicle for each mile traveled. You can calculate your fuel cost per mile by dividing the price of gas by your vehicle's average MPG (Fuel Cost Per Mile = Fuel Price ÷ MPG). For a comprehensive cost per mile calculator, add your vehicle's depreciation, maintenance, insurance, and fuel costs together, then divide by the total annual miles driven."
        }
      },
      {
        "@type": "Question",
        "name": "How can I estimate flight time if I only know the distance in miles?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "To estimate flight duration from distance alone, divide the total travel distance by the average commercial jet cruising speed of 500 mph (800 km/h), then add a fixed buffer. For short flights, add a 45-minute buffer, and for long-haul journeys, add a 1.5-hour buffer. This extra time accounts for taxiing, takeoff climbs, landing descents, and potential air traffic delays."
        }
      }
    ]
  };

  const softwareData = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    "name": "Travel Time & Fuel Cost Calculator",
    "operatingSystem": "All",
    "applicationCategory": "TravelApplication",
    "browserRequirements": "Requires HTML5/JavaScript",
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
            <span className="text-sm font-medium text-zinc-300 dark:text-zinc-700">|</span>
            <span className="text-sm font-medium text-zinc-400 dark:text-zinc-600">Travel Calculator</span>
            <span className="text-sm font-medium text-zinc-300 dark:text-zinc-700 font-normal">|</span>
            <ThemeToggle />
          </nav>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-4xl mx-auto px-4 py-8 sm:py-12">
        <Breadcrumbs toolName="Travel Time & Fuel Calculator" toolSlug="travel-time-fuel-calculator" />
        
        <div className="text-center max-w-3xl mx-auto mb-8">
          <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-zinc-900 dark:text-white mb-4">
            Travel Time & Fuel Cost Calculator
          </h1>
          {/* DIRECT ANSWER - concise 40-60 word explanation immediately below the H1 */}
          <div className="mb-6 bg-blue-50/50 dark:bg-blue-950/10 border border-blue-100 dark:border-blue-950/40 rounded-xl px-5 py-4">
            <p className="text-base sm:text-lg font-semibold text-blue-600 dark:text-blue-400 leading-relaxed">
              To find how much gas will cost for a road trip, divide total distance by your vehicle's MPG and multiply by fuel price: Cost = (Distance / MPG) × Price. For example, a 300-mile trip at 30 MPG with gas at $3.50/gallon costs exactly $35.00 in total fuel.
            </p>
          </div>
          <p className="text-base text-zinc-600 dark:text-zinc-400 leading-relaxed">
            Plan your next journey with precision. This calculator combines three essential tools: a reverse Speed-Distance-Time solver, a flight cruising duration estimator, and a vehicle fuel cost and consumption calculator. Switch tabs below to begin.
          </p>
        </div>

        <ShareButtons url="https://quickcalc.cloud/tools/travel-time-fuel-calculator" title="Travel Time & Fuel Cost Calculator" />
        <EmbedWidget url="https://quickcalc.cloud/tools/travel-time-fuel-calculator" title="Travel Time & Fuel Cost Calculator" />

        {/* Interactive Widget */}
        <section className="my-8">
          <TravelTimeFuelWidget />
        </section>

        {/* Ad Placement 1 */}
        <div className="ad-slot ad-slot--inline my-8 animate-pulse" data-ad-position="in-content-1">
          <div className="ad-placeholder-label border border-dashed border-zinc-300 dark:border-zinc-800 rounded-xl py-4 flex items-center justify-center bg-zinc-50/50 dark:bg-zinc-950/20 text-[10px] font-bold text-zinc-400 dark:text-zinc-600 uppercase tracking-widest cursor-default">
            Advertisement
          </div>
        </div>

        {/* Detailed Explanation */}
        <article className="prose prose-zinc dark:prose-invert max-w-3xl mx-auto space-y-8 mt-12 border-t border-zinc-200 dark:border-zinc-800 pt-10">
          
          <section id="how-is-this-calculated" className="space-y-4">
            <h2 className="text-2xl font-bold text-zinc-950 dark:text-white">
              How Road Trip Travel Time and Fuel Cost are Calculated
            </h2>
            <p className="text-zinc-600 dark:text-zinc-400 leading-relaxed">
              Calculations involving speed, distance, travel time, flight schedules, and fuel costs rely on standardized physics formulas and vehicle fuel metrics:
            </p>
            <ul className="list-disc pl-6 text-zinc-600 dark:text-zinc-400 space-y-3">
              <li>
                <strong>Solving for Speed, Distance, and Time:</strong>
                <ul className="list-circle pl-6 mt-1 space-y-1">
                  <li><code>Speed = Distance ÷ Time</code> (Calculates velocity needed for a given route and duration)</li>
                  <li><code>Distance = Speed × Time</code> (Estimates total path length covered at constant speed)</li>
                  <li><code>Time = Distance ÷ Speed</code> (Determines how long your trip takes based on velocity)</li>
                </ul>
              </li>
              <li>
                <strong>Fuel Cost Calculator by Distance and MPG:</strong> Uses the core formula:
                <div className="my-2 bg-zinc-100 dark:bg-zinc-900 p-3 rounded-lg font-mono text-xs overflow-x-auto text-center">
                  Total Fuel Cost = (Distance ÷ MPG) × Fuel Price Per Gallon
                </div>
                For example, driving 500 miles with a car getting 25 MPG at $4.00 per gallon: <code>(500 ÷ 25) × 4 = $80.00</code>.
              </li>
              <li>
                <strong>Gas Cost Calculator for Daily Commute:</strong> For daily commute modeling, we calculate the round-trip distance expense:
                <div className="my-2 bg-zinc-100 dark:bg-zinc-900 p-3 rounded-lg font-mono text-xs overflow-x-auto text-center">
                  Daily Commute Cost = (One-way Distance × 2 ÷ MPG) × Fuel Price
                </div>
              </li>
              <li>
                <strong>Is It Cheaper to Drive or Fly? Analysis:</strong> To accurately determine if you should drive or fly, we evaluate:
                <div className="my-2 bg-zinc-100 dark:bg-zinc-900 p-3 rounded-lg font-mono text-xs overflow-x-auto text-center">
                  Driving Cost = Fuel Cost + (Miles × $0.15 Wear/Tear) + Tolls + Food/Hotels
                </div>
                This sum is compared directly against total flying expenses (plane tickets, baggage, airport parking, rental car).
              </li>
              <li>
                <strong>Cost Per Mile Calculator Formula:</strong> Fuel cost per mile is simple:
                <div className="my-2 bg-zinc-100 dark:bg-zinc-900 p-3 rounded-lg font-mono text-xs overflow-x-auto text-center">
                  Fuel Cost Per Mile = Gas Price ÷ MPG
                </div>
              </li>
              <li>
                <strong>Flight Duration Estimation:</strong> commercial jet speed averages 500–560 mph (800–900 km/h).
                <div className="my-2 bg-zinc-100 dark:bg-zinc-900 p-3 rounded-lg font-mono text-xs overflow-x-auto text-center">
                  Flight Duration = (Distance ÷ Speed) + Buffer Time (45m for short, 1.5h for long flights)
                </div>
              </li>
            </ul>
          </section>

          <section id="faq" className="space-y-4 pt-4">
            <h2 className="text-2xl font-bold text-zinc-950 dark:text-white border-b border-zinc-100 dark:border-zinc-900 pb-2">
              Frequently Asked Questions (FAQ)
            </h2>
            <div className="space-y-6">
              
              <div className="space-y-2">
                <h3 className="text-base font-bold text-zinc-900 dark:text-zinc-100">
                  How do I calculate the cost of gas for a road trip?
                </h3>
                <p className="text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed">
                  To calculate how much gas will cost for a road trip, divide your total trip distance by your vehicle's miles per gallon (MPG) rating, and then multiply that number by the price of gas per gallon. For example, if you are driving a 300-mile road trip in a vehicle that gets 30 MPG, you will use 10 gallons of gas. If gas is priced at $3.50 per gallon, the total fuel cost for your trip will be $35.00.
                </p>
              </div>

              <div className="space-y-2">
                <h3 className="text-base font-bold text-zinc-900 dark:text-zinc-100">
                  How do I calculate fuel cost using my car's MPG and gas prices?
                </h3>
                <p className="text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed">
                  You can calculate your total fuel cost by dividing your trip's distance by your vehicle's MPG, then multiplying the resulting gallons by the price of fuel. The mathematical formula is: Fuel Cost = (Distance ÷ MPG) × Fuel Price. Our interactive fuel cost calculator by distance and mpg does this calculation automatically, supporting both imperial and metric unit conversions instantly.
                </p>
              </div>

              <div className="space-y-2">
                <h3 className="text-base font-bold text-zinc-900 dark:text-zinc-100">
                  How do I compare whether it is cheaper to drive or fly for a trip?
                </h3>
                <p className="text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed">
                  Whether it is cheaper to drive or fly depends on trip distance, number of passengers, and total travel expenses. To decide if you should drive or fly, calculate the total driving expenses (fuel cost, vehicle depreciation at about $0.15/mile, tolls, meals, and overnight lodging) and compare them with the sum of commercial airline ticket prices, baggage fees, airport parking, and terminal transit. Driving is almost always more cost-effective for families and groups, while flying often saves time and money for solo travelers over long distances.
                </p>
              </div>

              <div className="space-y-2">
                <h3 className="text-base font-bold text-zinc-900 dark:text-zinc-100">
                  How do I calculate my monthly or annual gas cost for a daily commute?
                </h3>
                <p className="text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed">
                  A daily commute gas cost is calculated using your round-trip distance, vehicle MPG, and fuel price. The formula is: Daily Commute Cost = (Daily Round-Trip Distance ÷ MPG) × Gas Price. For example, if your daily round-trip commute is 40 miles, your vehicle achieves 25 MPG, and gas costs $3.75/gallon, you consume 1.6 gallons daily, resulting in a daily commute cost of $6.00 in gas (or $120.00 per month for a typical 20-day working schedule).
                </p>
              </div>

              <div className="space-y-2">
                <h3 className="text-base font-bold text-zinc-900 dark:text-zinc-100">
                  How do I calculate my vehicle's cost per mile to drive?
                </h3>
                <p className="text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed">
                  Cost per mile measures how much you spend to operate your vehicle for each mile traveled. You can calculate your fuel cost per mile by dividing the price of gas by your vehicle's average MPG (Fuel Cost Per Mile = Fuel Price ÷ MPG). For a comprehensive cost per mile calculator, add your vehicle's depreciation, maintenance, insurance, and fuel costs together, then divide by the total annual miles driven.
                </p>
              </div>

              <div className="space-y-2">
                <h3 className="text-base font-bold text-zinc-900 dark:text-zinc-100">
                  How can I estimate flight time if I only know the distance in miles?
                </h3>
                <p className="text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed">
                  To estimate flight duration from distance alone, divide the total travel distance by the average commercial jet cruising speed of 500 mph (800 km/h), then add a fixed buffer. For short flights, add a 45-minute buffer, and for long-haul journeys, add a 1.5-hour buffer. This extra time accounts for taxiing, takeoff climbs, landing descents, and potential air traffic delays.
                </p>
              </div>

            </div>
          </section>

        </article>

        <RelatedTools currentSlug="travel-time-fuel-calculator" />
      </main>

      {/* Footer */}
      <Footer customText="Simple, precise travel and transportation planning utility." />
    </div>
  );
}
