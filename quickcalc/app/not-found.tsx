import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ToolIcon from "@/components/ToolIcon";
import { Search, ArrowRight, Home, Compass } from "lucide-react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "404 - Page Not Found | QuickCalc",
  description: "The page or calculator tool you requested could not be found. Explore our 31+ precision calculators.",
};

const popularTools = [
  {
    title: "BMI Calculator",
    href: "/tools/bmi-calculator",
    description: "Calculate Body Mass Index and healthy weight ranges according to WHO.",
    icon: "bmi",
    category: "Health",
  },
  {
    title: "Loan EMI Calculator",
    href: "/tools/loan-calculator",
    description: "Calculate monthly EMI loan repayments and amortization breakdown.",
    icon: "loan",
    category: "Finance",
  },
  {
    title: "Salary Take-Home Pay",
    href: "/tools/salary-take-home-calculator",
    description: "Calculate net paycheck after federal, state, and 401(k) tax deductions.",
    icon: "salary",
    category: "Finance",
  },
  {
    title: "Percentage Calculator",
    href: "/tools/percentage-calculator",
    description: "Calculate percentage changes, markups, discounts, and proportions.",
    icon: "percentage",
    category: "Planning",
  },
];

export default function NotFound() {
  return (
    <div className="min-h-screen bg-base text-ink font-sans transition-colors flex flex-col justify-between">
      <Navbar />

      <main className="max-w-4xl mx-auto px-4 py-16 sm:py-24 w-full flex-grow text-center">
        <div className="space-y-6">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-amber-500/10 text-amber-700 dark:text-amber-300 border border-amber-500/20">
            <Compass size={14} />
            <span>404 Navigation Error</span>
          </div>

          <h1 className="text-4xl sm:text-6xl font-heading font-extrabold text-ink tracking-tight">
            Page Not Found
          </h1>

          <p className="text-ink-muted text-base sm:text-lg max-w-lg mx-auto leading-relaxed font-medium">
            The page or calculator tool you requested doesn&apos;t exist or may have been moved. Search our suite below or return to popular tools.
          </p>

          {/* Quick Search Action */}
          <div className="max-w-md mx-auto pt-2">
            <form action="/" method="GET" className="relative flex items-center">
              <Search
                size={18}
                className="absolute left-4 text-ink-muted pointer-events-none"
              />
              <input
                type="text"
                name="q"
                placeholder="Search calculators (e.g. BMI, Loan, Age)..."
                className="w-full pl-11 pr-24 py-3 rounded-2xl bg-base-card border border-surface-border text-ink placeholder-ink-muted text-sm font-medium focus:outline-none focus:ring-2 focus:ring-teal-500/40 focus:border-teal-500 shadow-sm transition-all min-h-[44px]"
              />
              <button
                type="submit"
                className="absolute right-1.5 px-3 py-1.5 rounded-xl bg-teal-600 hover:bg-teal-700 text-white font-bold text-xs shadow-sm transition min-h-[36px]"
              >
                Search
              </button>
            </form>
          </div>

          {/* Return Home Button */}
          <div className="pt-4">
            <Link
              href="/"
              className="inline-flex items-center gap-2 px-5 py-3 rounded-2xl bg-base-card hover:bg-surface-muted text-ink font-bold text-sm border border-surface-border shadow-sm transition active:scale-95 min-h-[44px]"
            >
              <Home size={16} />
              <span>Back to Homepage</span>
            </Link>
          </div>
        </div>

        {/* Popular Tools Grid */}
        <div className="mt-16 pt-10 border-t border-surface-border text-left">
          <h2 className="text-xl sm:text-2xl font-heading font-extrabold text-ink mb-6 text-center">
            Popular Calculation Tools
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {popularTools.map((tool) => (
              <Link
                key={tool.href}
                href={tool.href}
                className="group flex items-start gap-4 p-5 rounded-2xl bg-base-card border border-surface-border hover:border-teal-500/40 shadow-sm hover:shadow-lg hover:-translate-y-1 active:scale-[0.98] transition-all"
              >
                <ToolIcon icon={tool.icon} category={tool.category} size="md" />
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between gap-2">
                    <h3 className="text-base font-heading font-bold text-ink group-hover:text-teal-600 dark:group-hover:text-teal-400 transition-colors">
                      {tool.title}
                    </h3>
                    <ArrowRight size={14} className="text-ink-muted group-hover:translate-x-1 transition-transform shrink-0" />
                  </div>
                  <p className="text-xs text-ink-muted line-clamp-2 mt-1">
                    {tool.description}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </main>

      <Footer customText="Precision science-backed online calculators." />
    </div>
  );
}
