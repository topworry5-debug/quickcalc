import RelatedTools from "@/components/RelatedTools";
import ShareButtons from "@/components/ShareButtons";
import EmbedWidget from "@/components/EmbedWidget";

import ThemeToggle from "@/components/ThemeToggle";
import Breadcrumbs from "@/components/Breadcrumbs";
import type { Metadata } from "next";
import Link from "next/link";
import SpeedDistanceTimeWidget from "./SpeedDistanceTimeWidget";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "Speed, Distance & Time Calculator - Pace, Flight Time & Fuel Cost | QuickCalc",
  description: "Solve for speed, distance, or time instantly. Includes advanced modes for running pace, flight duration estimates, and vehicle fuel trip cost calculations.",
  alternates: {
    canonical: "/tools/speed-distance-time-calculator",
  },
  openGraph: {
    title: "Speed, Distance & Time Calculator - Pace, Flight Time & Fuel Cost | QuickCalc",
    description: "Solve for speed, distance, or time instantly. Includes advanced modes for running pace, flight duration estimates, and vehicle fuel trip cost calculations.",
    url: "https://quickcalc.cloud/tools/speed-distance-time-calculator",
    type: "website",
    siteName: "QuickCalc",
    images: [
      {
        url: "https://quickcalc.cloud/og-image.png",
        width: 1200,
        height: 630,
        alt: "Speed, Distance & Time Calculator on QuickCalc",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Speed, Distance & Time Calculator - Pace, Flight Time & Fuel Cost | QuickCalc",
    description: "Solve for speed, distance, or time instantly. Includes advanced modes for running pace, flight duration estimates, and vehicle fuel trip cost calculations.",
    images: ["https://quickcalc.cloud/og-image.png"],
  },
};

export default function SpeedDistanceTimePage({ searchParams }: { searchParams?: { embed?: string } }) {
  const isEmbed = searchParams?.embed === "true";
  if (isEmbed) {
    return (
      <div className="min-h-screen bg-white dark:bg-zinc-950 text-zinc-900 dark:text-zinc-100 font-[family-name:var(--font-geist-sans)] transition-colors p-2 flex flex-col justify-between">
        <main className="max-w-4xl mx-auto w-full">
          <SpeedDistanceTimeWidget />
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
        "name": "How do I calculate running pace from distance and time?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "To calculate running pace, divide your total running time by your total distance. For example, if you run 10 kilometers in 50 minutes, divide 50 by 10 to get a pace of 5 minutes per kilometer. In miles, 10km is about 6.21 miles, resulting in a pace of approximately 8 minutes and 3 seconds per mile."
        }
      },
      {
        "@type": "Question",
        "name": "How do I convert mph to km/h?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "To convert miles per hour (mph) to kilometers per hour (km/h), multiply the speed in mph by 1.609344. Conversely, to convert km/h to mph, multiply the speed in km/h by 0.621371."
        }
      },
      {
        "@type": "Question",
        "name": "How accurate is a flight time estimate based on distance alone?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Distance-only flight estimates are great for raw cruising duration but exclude ground taxiing, takeoff climbs, standard holding patterns, landing descent, and headwinds. Adding a buffer of 45 minutes for short flights and up to 1.5 hours for long-haul routes yields a much more realistic door-to-door schedule."
        }
      },
      {
        "@type": "Question",
        "name": "What is a good running pace for beginners?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "For beginner runners, a comfortable, conversational pace is highly recommended, which generally falls between 8:00 to 9:30 minutes per kilometer (12:50 to 15:15 minutes per mile). As cardiovascular stamina and muscle endurance develop, paces naturally lower toward intermediate levels."
        }
      },
      {
        "@type": "Question",
        "name": "What is the formula for speed, distance, and time?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "The fundamental formula is Speed = Distance ÷ Time. From this base, you can calculate the other two variables through simple algebraic rearrangement: Distance = Speed × Time, and Time = Distance ÷ Speed."
        }
      },
      {
        "@type": "Question",
        "name": "How does vehicle fuel efficiency affect trip cost?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Vehicle fuel efficiency dictates how much fuel is consumed per unit of distance. Higher efficiency (higher MPG or lower L/100km) means you burn fewer liters or gallons of fuel over the same trip, dramatically lowering your total trip fuel cost."
        }
      },
      {
        "@type": "Question",
        "name": "What is a knot and when is it used for speed?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "A knot is a unit of speed equal to one nautical mile per hour, or exactly 1.852 km/h (approximately 1.1508 mph). It is the standard speed unit utilized worldwide in maritime navigation and aviation."
        }
      }
    ]
  };

  const softwareData = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    "name": "Speed, Distance & Time Calculator",
    "operatingSystem": "All",
    "applicationCategory": "UtilitiesApplication",
    "offers": {
      "@type": "Offer",
      "price": "0",
      "priceCurrency": "USD"
    }
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
            <span className="text-sm font-medium text-zinc-400 dark:text-zinc-600">Speed Distance Time</span>
            <span className="text-sm font-medium text-zinc-300 dark:text-zinc-700 font-normal">|</span>
            <ThemeToggle />
          </nav>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-4xl mx-auto px-4 py-8 sm:py-12">
        <Breadcrumbs toolName="Speed, Distance & Time Calculator" toolSlug="speed-distance-time-calculator" />
        
        <div className="text-center max-w-3xl mx-auto mb-8">
          <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-zinc-900 dark:text-white mb-4">
            Speed, Distance & Time Calculator
          </h1>
          {/* DIRECT ANSWER - concise 40-60 word explanation immediately below the H1 */}
          <p className="text-lg font-semibold text-blue-600 dark:text-blue-400 mb-6 bg-blue-50/50 dark:bg-blue-950/10 border border-blue-100 dark:border-blue-950/40 rounded-xl px-5 py-4">
            The core formula for calculating motion is <strong>Speed = Distance ÷ Time</strong>. By rearranging this basic physics relation, you can solve for any unknown factor: <strong>Distance = Speed × Time</strong> to find how far you traveled, or <strong>Time = Distance ÷ Speed</strong> to calculate the exact duration of your journey.
          </p>
          <p className="text-base text-zinc-600 dark:text-zinc-400 leading-relaxed">
            Whether you are plotting an international flight, estimating daily commute costs, dialing in running pace goals for an upcoming race, or solving standard physics equations, our multi-mode smart calculator does the hard work. Toggle modes, convert units in real-time, and copy detailed result summaries instantly!
          </p>
        </div>

        <ShareButtons url="https://quickcalc.cloud/tools/speed-distance-time-calculator" title="Speed, Distance & Time Calculator" />
        <EmbedWidget url="https://quickcalc.cloud/tools/speed-distance-time-calculator" title="Speed, Distance & Time Calculator" />

        {/* Interactive Widget */}
        <section className="my-8">
          <SpeedDistanceTimeWidget />
        </section>

        {/* Ad Placement 1 */}
        <div className="ad-slot ad-slot--inline my-8 animate-pulse" data-ad-position="in-content-1">
          <div className="ad-placeholder-label border border-dashed border-zinc-300 dark:border-zinc-800 rounded-xl py-4 flex items-center justify-center bg-zinc-50/50 dark:bg-zinc-950/20 text-[10px] font-bold text-zinc-400 dark:text-zinc-600 uppercase tracking-widest cursor-default">
            Advertisement
          </div>
        </div>

        {/* Detailed Explanation */}
        <article className="prose prose-zinc dark:prose-invert max-w-3xl mx-auto space-y-8 mt-12 border-t border-zinc-200 dark:border-zinc-800 pt-10">
          
          <section className="space-y-4">
            <h2 className="text-2xl font-bold text-zinc-950 dark:text-white">
              How is this calculated?
            </h2>
            <p className="text-zinc-600 dark:text-zinc-400 leading-relaxed">
              Calculations involving rate, time, and distance rely on standard physics formulas. By converting inputs to matching system units (such as metric kilometers or imperial miles), our system solves for your unknown variables using these clear algebraic rearrangements:
            </p>
            <ul className="list-disc pl-6 text-zinc-600 dark:text-zinc-400 space-y-2">
              <li>
                <strong>Solving for Speed (Speed = Distance ÷ Time):</strong> Calculates the rate of movement by dividing the total space covered by the elapsed duration.
              </li>
              <li>
                <strong>Solving for Distance (Distance = Speed × Time):</strong> Calculates total path length by multiplying the velocity rate by the duration of travel.
              </li>
              <li>
                <strong>Solving for Time (Time = Distance ÷ Speed):</strong> Calculates total journey duration by dividing the path length by the velocity rate.
              </li>
              <li>
                <strong>Pace Conversions:</strong> Pace represents the time taken to travel a unit distance (such as minutes per kilometer). It is mathematically the inverse of speed (Pace = 1 ÷ Speed).
              </li>
              <li>
                <strong>Fuel and Cost Calculations:</strong> Trip fuel consumption is computed by dividing trip distance by vehicle efficiency. Total cost is then found by multiplying fuel consumption by unit fuel price.
              </li>
            </ul>
            <p className="text-zinc-600 dark:text-zinc-400 leading-relaxed mt-2">
              If you are tracking general running performance parameters, our dedicated <Link href="/tools/pace-calculator" className="text-blue-600 dark:text-blue-400 hover:underline font-semibold">Pace Calculator</Link> offers specialized marathon training details. Or if you need to schedule calls across international zones, utilize our responsive <Link href="/tools/timezone-meeting-planner" className="text-blue-600 dark:text-blue-400 hover:underline font-semibold">Timezone Meeting Planner</Link> to stay fully aligned.
            </p>
          </section>

          <section className="space-y-4 pt-4">
            <h2 className="text-2xl font-bold text-zinc-950 dark:text-white border-b border-zinc-100 dark:border-zinc-900 pb-2">
              Frequently Asked Questions (FAQ)
            </h2>
            <div className="space-y-6">
              
              <div className="space-y-2">
                <h3 className="text-base font-bold text-zinc-900 dark:text-zinc-100">
                  How do I calculate running pace from distance and time?
                </h3>
                <p className="text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed">
                  Simply divide your total running duration by the distance. For example, a 50-minute 10K translates to exactly 5:00 minutes per kilometer (or 8:03 minutes per mile). Tracking this helps runners stay consistent and target race-specific performance goals.
                </p>
              </div>

              <div className="space-y-2">
                <h3 className="text-base font-bold text-zinc-900 dark:text-zinc-100">
                  How do I convert mph to km/h?
                </h3>
                <p className="text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed">
                  To convert miles per hour (mph) to kilometers per hour (km/h), multiply your mph value by 1.609344. For example, 60 mph is roughly equal to 96.56 km/h. To convert back, multiply by 0.621371.
                </p>
              </div>

              <div className="space-y-2">
                <h3 className="text-base font-bold text-zinc-900 dark:text-zinc-100">
                  How accurate is a flight time estimate based on distance alone?
                </h3>
                <p className="text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed">
                  While cruising-speed calculations give an accurate flight-deck duration, real-world factors like headwinds, tailwinds, airport ground taxiing, takeoff climbs, landing descents, and air traffic control loops typically add between 30 to 90 minutes to any flight.
                </p>
              </div>

              <div className="space-y-2">
                <h3 className="text-base font-bold text-zinc-900 dark:text-zinc-100">
                  What is a good running pace for beginners?
                </h3>
                <p className="text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed">
                  A beginner runner's pace usually ranges from 8:00 to 9:30 minutes per kilometer (12:50 to 15:15 minutes per mile). The key is maintaining a conversational effort level where you can speak in full sentences without gasping.
                </p>
              </div>

              <div className="space-y-2">
                <h3 className="text-base font-bold text-zinc-900 dark:text-zinc-100">
                  What is a knot and when is it used for speed?
                </h3>
                <p className="text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed">
                  A knot is equal to one nautical mile per hour (1.852 km/h or 1.1508 mph). It is widely utilized across marine transport and aviation because nautical miles align perfectly with Earth's latitude lines of coordination.
                </p>
              </div>

              <div className="space-y-2">
                <h3 className="text-base font-bold text-zinc-900 dark:text-zinc-100">
                  How does vehicle fuel efficiency affect trip cost?
                </h3>
                <p className="text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed">
                  Fuel efficiency directly dictates the volume of fuel required to drive a given route. Highly efficient vehicles (e.g., hybrid cars or highly tuned diesel engines) burn fewer liters or gallons, significantly reducing overall travel fuel costs.
                </p>
              </div>

            </div>
          </section>

        </article>

        <RelatedTools currentSlug="speed-distance-time-calculator" />
      </main>

      {/* Footer */}
      <Footer customText="Elegant, science-backed lifestyle and chronological suite solutions." />
    </div>
  );
}
