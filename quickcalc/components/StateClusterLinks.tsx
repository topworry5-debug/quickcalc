import React from "react";
import Link from "next/link";
import { MapPin } from "lucide-react";

export interface USStateEntry {
  name: string;
  slug: string;
  abbrev: string;
  hasIncomeTax: boolean;
  topRateText: string;
}

export const US_STATES: USStateEntry[] = [
  { name: "Alabama", slug: "alabama", abbrev: "AL", hasIncomeTax: true, topRateText: "5.0%" },
  { name: "Alaska", slug: "alaska", abbrev: "AK", hasIncomeTax: false, topRateText: "0.0%" },
  { name: "Arizona", slug: "arizona", abbrev: "AZ", hasIncomeTax: true, topRateText: "2.5%" },
  { name: "Arkansas", slug: "arkansas", abbrev: "AR", hasIncomeTax: true, topRateText: "3.7%" },
  { name: "California", slug: "california", abbrev: "CA", hasIncomeTax: true, topRateText: "13.3%" },
  { name: "Colorado", slug: "colorado", abbrev: "CO", hasIncomeTax: true, topRateText: "4.4%" },
  { name: "Connecticut", slug: "connecticut", abbrev: "CT", hasIncomeTax: true, topRateText: "6.99%" },
  { name: "Delaware", slug: "delaware", abbrev: "DE", hasIncomeTax: true, topRateText: "6.6%" },
  { name: "Florida", slug: "florida", abbrev: "FL", hasIncomeTax: false, topRateText: "0.0%" },
  { name: "Georgia", slug: "georgia", abbrev: "GA", hasIncomeTax: true, topRateText: "5.39%" },
  { name: "Hawaii", slug: "hawaii", abbrev: "HI", hasIncomeTax: true, topRateText: "11.0%" },
  { name: "Idaho", slug: "idaho", abbrev: "ID", hasIncomeTax: true, topRateText: "5.695%" },
  { name: "Illinois", slug: "illinois", abbrev: "IL", hasIncomeTax: true, topRateText: "4.95%" },
  { name: "Indiana", slug: "indiana", abbrev: "IN", hasIncomeTax: true, topRateText: "3.05%" },
  { name: "Iowa", slug: "iowa", abbrev: "IA", hasIncomeTax: true, topRateText: "3.8%" },
  { name: "Kansas", slug: "kansas", abbrev: "KS", hasIncomeTax: true, topRateText: "5.7%" },
  { name: "Kentucky", slug: "kentucky", abbrev: "KY", hasIncomeTax: true, topRateText: "4.0%" },
  { name: "Louisiana", slug: "louisiana", abbrev: "LA", hasIncomeTax: true, topRateText: "4.25%" },
  { name: "Maine", slug: "maine", abbrev: "ME", hasIncomeTax: true, topRateText: "7.15%" },
  { name: "Maryland", slug: "maryland", abbrev: "MD", hasIncomeTax: true, topRateText: "5.75%" },
  { name: "Massachusetts", slug: "massachusetts", abbrev: "MA", hasIncomeTax: true, topRateText: "9.0%" },
  { name: "Michigan", slug: "michigan", abbrev: "MI", hasIncomeTax: true, topRateText: "4.25%" },
  { name: "Minnesota", slug: "minnesota", abbrev: "MN", hasIncomeTax: true, topRateText: "9.85%" },
  { name: "Mississippi", slug: "mississippi", abbrev: "MS", hasIncomeTax: true, topRateText: "4.7%" },
  { name: "Missouri", slug: "missouri", abbrev: "MO", hasIncomeTax: true, topRateText: "4.7%" },
  { name: "Montana", slug: "montana", abbrev: "MT", hasIncomeTax: true, topRateText: "5.9%" },
  { name: "Nebraska", slug: "nebraska", abbrev: "NE", hasIncomeTax: true, topRateText: "5.84%" },
  { name: "Nevada", slug: "nevada", abbrev: "NV", hasIncomeTax: false, topRateText: "0.0%" },
  { name: "New Hampshire", slug: "new-hampshire", abbrev: "NH", hasIncomeTax: false, topRateText: "0.0%" },
  { name: "New Jersey", slug: "new-jersey", abbrev: "NJ", hasIncomeTax: true, topRateText: "10.75%" },
  { name: "New Mexico", slug: "new-mexico", abbrev: "NM", hasIncomeTax: true, topRateText: "5.9%" },
  { name: "New York", slug: "new-york", abbrev: "NY", hasIncomeTax: true, topRateText: "10.9%" },
  { name: "North Carolina", slug: "north-carolina", abbrev: "NC", hasIncomeTax: true, topRateText: "4.5%" },
  { name: "North Dakota", slug: "north-dakota", abbrev: "ND", hasIncomeTax: true, topRateText: "2.5%" },
  { name: "Ohio", slug: "ohio", abbrev: "OH", hasIncomeTax: true, topRateText: "3.5%" },
  { name: "Oklahoma", slug: "oklahoma", abbrev: "OK", hasIncomeTax: true, topRateText: "4.75%" },
  { name: "Oregon", slug: "oregon", abbrev: "OR", hasIncomeTax: true, topRateText: "9.9%" },
  { name: "Pennsylvania", slug: "pennsylvania", abbrev: "PA", hasIncomeTax: true, topRateText: "3.07%" },
  { name: "Rhode Island", slug: "rhode-island", abbrev: "RI", hasIncomeTax: true, topRateText: "5.99%" },
  { name: "South Carolina", slug: "south-carolina", abbrev: "SC", hasIncomeTax: true, topRateText: "6.4%" },
  { name: "South Dakota", slug: "south-dakota", abbrev: "SD", hasIncomeTax: false, topRateText: "0.0%" },
  { name: "Tennessee", slug: "tennessee", abbrev: "TN", hasIncomeTax: false, topRateText: "0.0%" },
  { name: "Texas", slug: "texas", abbrev: "TX", hasIncomeTax: false, topRateText: "0.0%" },
  { name: "Utah", slug: "utah", abbrev: "UT", hasIncomeTax: true, topRateText: "4.55%" },
  { name: "Vermont", slug: "vermont", abbrev: "VT", hasIncomeTax: true, topRateText: "8.75%" },
  { name: "Virginia", slug: "virginia", abbrev: "VA", hasIncomeTax: true, topRateText: "5.75%" },
  { name: "Washington", slug: "washington", abbrev: "WA", hasIncomeTax: false, topRateText: "0.0%" },
  { name: "West Virginia", slug: "west-virginia", abbrev: "WV", hasIncomeTax: true, topRateText: "5.12%" },
  { name: "Wisconsin", slug: "wisconsin", abbrev: "WI", hasIncomeTax: true, topRateText: "7.65%" },
  { name: "Wyoming", slug: "wyoming", abbrev: "WY", hasIncomeTax: false, topRateText: "0.0%" },
];

interface StateClusterLinksProps {
  currentStateSlug: string;
}

const LIVE_STATES = new Set(["arkansas", "illinois"]);

export default function StateClusterLinks({ currentStateSlug }: StateClusterLinksProps) {
  return (
    <section className="my-10 bg-zinc-100/70 dark:bg-zinc-900/60 p-6 sm:p-8 rounded-2xl border border-zinc-200 dark:border-zinc-800">
      <div className="flex items-center justify-between mb-4">
        <div>
          <h2 className="text-xl font-bold text-zinc-900 dark:text-white flex items-center gap-2">
            <MapPin className="w-5 h-5 text-teal-600 dark:text-teal-400" />
            <span>US 50-State Salary & Paycheck Calculators</span>
          </h2>
          <p className="text-xs sm:text-sm text-zinc-600 dark:text-zinc-400 mt-1">
            Compare take-home pay and state income tax withholding across all 50 states:
          </p>
        </div>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-2 text-xs">
        {US_STATES.map((state) => {
          const isCurrent = state.slug === currentStateSlug;
          const isLive = LIVE_STATES.has(state.slug);
          const href = state.slug === "illinois"
            ? "/tools/illinois-paycheck-calculator"
            : `/tools/${state.slug}-salary-calculator`;

          if (isCurrent) {
            return (
              <div
                key={state.slug}
                className="p-2 rounded-lg bg-teal-500 text-white font-bold flex items-center justify-between shadow-xs"
              >
                <span>{state.name} ({state.abbrev})</span>
                <span className="text-[10px] bg-white/20 px-1.5 py-0.5 rounded">Active</span>
              </div>
            );
          }

          return (
            <Link
              key={state.slug}
              href={href}
              className={`p-2 rounded-lg transition-all flex items-center justify-between group ${
                isLive
                  ? "bg-white dark:bg-zinc-800 border border-teal-500/60 hover:border-teal-500 shadow-xs"
                  : "bg-white dark:bg-zinc-800/80 border border-zinc-200 dark:border-zinc-700 hover:border-teal-500 hover:text-teal-600 dark:hover:text-teal-400"
              }`}
            >
              <span className={`font-medium ${isLive ? "text-teal-700 dark:text-teal-300 font-semibold" : "text-zinc-800 dark:text-zinc-200 group-hover:text-teal-600 dark:group-hover:text-teal-400"}`}>
                {state.name}
              </span>
              <span className="text-[10px] text-zinc-400 font-mono">
                {isLive ? <span className="text-teal-600 dark:text-teal-400 font-semibold">Live</span> : state.topRateText}
              </span>
            </Link>
          );
        })}
      </div>
    </section>
  );
}
