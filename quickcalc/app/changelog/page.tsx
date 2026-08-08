import type { Metadata } from "next";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Breadcrumbs from "@/components/Breadcrumbs";
import {
  Zap,
  Shield,
  BarChart2,
  BookOpen,
  Layers,
  Globe,
  Share2,
  Moon,
  Sparkles,
  Code2,
  ArrowUpRight,
  FileDown,
  GitCompare,
  Cpu,
} from "lucide-react";

export const metadata: Metadata = {
  title: "Changelog â€” What's New at QuickCalc",
  description:
    "A plain-language timeline of every meaningful update to QuickCalc â€” new calculators, design improvements, privacy features, and developer tools.",
  alternates: {
    canonical: "/changelog",
  },
  openGraph: {
    title: "Changelog â€” What's New at QuickCalc",
    description:
      "A plain-language timeline of every meaningful update to QuickCalc.",
    url: "https://quickcalc.cloud/changelog",
    type: "website",
    siteName: "QuickCalc",
  },
};

// ---------------------------------------------------------------------------
// Data
// ---------------------------------------------------------------------------

interface ChangelogEntry {
  tag: string;
  text: string;
  link?: string;
}

interface ChangelogRelease {
  date: string;          // Human-readable date label
  isoDate: string;       // For <time datetime="">
  badge?: string;        // Optional release badge label
  badgeColor?: string;   // Tailwind color class for the badge
  icon: React.ElementType;
  iconColor: string;
  title: string;
  entries: ChangelogEntry[];
}

const RELEASES: ChangelogRelease[] = [
  // â”€â”€ August 8, 2026 â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
  {
    date: "August 8, 2026",
    isoDate: "2026-08-08",
    badge: "Latest",
    badgeColor: "bg-emerald-500/10 text-emerald-700 dark:text-emerald-400 border border-emerald-500/20",
    icon: Shield,
    iconColor: "text-emerald-600 dark:text-emerald-400",
    title: "Security, Loan Compare Mode & Locale Detection",
    entries: [
      {
        tag: "Security",
        text: "Added production-grade HTTP security headers (Content-Security-Policy, X-Frame-Options, HSTS) across all pages. Embed routes stay embeddable while everything else is protected.",
      },
      {
        tag: "Fix",
        text: "Fixed a bug where /embed/* pages were indexed by search engines â€” they now correctly send noindex while pointing a canonical back to the main tool page.",
      },
      {
        tag: "New",
        text: "Loan Calculator now has a 'Compare' mode â€” enter two loan offers side-by-side and instantly see which saves more money: monthly difference, total interest saved, and a year-by-year amortization diff table.",
        link: "/tools/loan-calculator",
      },
      {
        tag: "Improvement",
        text: "Currency Converter detects your likely home currency from the browser's built-in language setting and pre-selects it automatically â€” no external API call, no IP lookup, entirely private.",
        link: "/tools/currency-converter",
      },
      {
        tag: "Improvement",
        text: "BMI Calculator now defaults to imperial units (lbs / ftÂ·in) for US-based visitors and metric (kg / cm) for everyone else â€” switches silently after first render with no layout shift.",
        link: "/tools/bmi-calculator",
      },
      {
        tag: "SEO",
        text: "Added Google Search Console verification scaffold. Embed pages confirmed noindex. Sitemap verified to contain no /embed/* or /api/* URLs.",
      },
    ],
  },

  // â”€â”€ August 7, 2026 â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
  {
    date: "August 7, 2026",
    isoDate: "2026-08-07",
    icon: Code2,
    iconColor: "text-indigo-600 dark:text-indigo-400",
    title: "Public API, Shareable Links & Homepage Trust Section",
    entries: [
      {
        tag: "New",
        text: "Launched a free, no-auth public REST API at /api/v1/ for BMI, Loan/EMI, Percentage, Currency, and Tip calculators. No key required â€” rate-limited to 60 requests/minute per IP.",
        link: "/api-docs",
      },
      {
        tag: "New",
        text: "Added a full developer documentation page at /api-docs with example requests, JSON response shapes, and CORS details.",
        link: "/api-docs",
      },
      {
        tag: "New",
        text: "Calculator inputs are now reflected as URL query parameters. Changing values updates the URL, so you can share a link that pre-fills the exact same result for whoever opens it.",
      },
      {
        tag: "New",
        text: "Added a 'Why QuickCalc?' section to the homepage â€” a clean row of four factual callouts: 31+ Calculators, 100% Client-Side, No Ads or Pop-ups, No Account Required.",
        link: "/",
      },
      {
        tag: "New",
        text: "Published a balanced calculator comparison guide â€” a genuine buyer's-guide page, not a competitor attack piece.",
        link: "/compare/best-free-online-calculators",
      },
      {
        tag: "New",
        text: "Press Cmd/Ctrl + K anywhere on the site to search and jump to any calculator instantly via the command palette.",
      },
      {
        tag: "New",
        text: "Each calculator now has a 'Share Result' button that generates a clean summary card you can copy as a link or share on social media.",
      },
    ],
  },

  // â”€â”€ August 6, 2026 â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
  {
    date: "August 6, 2026",
    isoDate: "2026-08-06",
    icon: Sparkles,
    iconColor: "text-violet-600 dark:text-violet-400",
    title: "Premium Visual Redesign & Accessibility Pass",
    entries: [
      {
        tag: "Design",
        text: "Rebuilt the homepage with a new design system: refined color palette, improved typography (Space Grotesk), a live interactive calculator demo in the hero section, and a new icon system throughout.",
        link: "/",
      },
      {
        tag: "Design",
        text: "Redesigned the blog listing page with cleaner article cards and consistent navigation.",
        link: "/blog",
      },
      {
        tag: "Improvement",
        text: "Dark mode improved across all pages â€” better contrast ratios, fewer visual inconsistencies between light and dark themes.",
      },
      {
        tag: "Improvement",
        text: "Mobile layout polish: tap targets, spacing, and font sizing tightened up site-wide.",
      },
      {
        tag: "Accessibility",
        text: "Added proper ARIA labels and focus management throughout. Keyboard navigation improved across dropdowns and toggles.",
      },
      {
        tag: "Accessibility",
        text: "Reduced motion for users with the prefers-reduced-motion system setting enabled.",
      },
      {
        tag: "New",
        text: "Added dedicated category pages for Health & Fitness, Finance & Math, and Utility & Programming.",
        link: "/category/health-fitness",
      },
      {
        tag: "New",
        text: "Added a friendly, on-brand 404 page instead of the framework default.",
      },
    ],
  },

  // â”€â”€ August 5, 2026 â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
  {
    date: "August 5, 2026",
    isoDate: "2026-08-05",
    icon: Cpu,
    iconColor: "text-teal-600 dark:text-teal-400",
    title: `"Explain This Result" & PDF Downloads — All Calculators`,
    entries: [
      {
        tag: "New",
        text: "Every calculator now has a collapsible 'How was this calculated?' section that shows the actual formula with your real numbers filled in â€” no jargon, step-by-step.",
      },
      {
        tag: "New",
        text: "Every calculator result can now be exported as a formatted PDF. Useful for loan summaries, BMI health reports, and anything you'd want to print or attach to an email.",
      },
    ],
  },

  // â”€â”€ August 4, 2026 â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
  {
    date: "August 4, 2026",
    isoDate: "2026-08-04",
    icon: BarChart2,
    iconColor: "text-amber-600 dark:text-amber-400",
    title: "Retirement Calculator & 35 Blog Guides",
    entries: [
      {
        tag: "New",
        text: "Added a Retirement Savings Calculator â€” projects how much you'll have saved by retirement based on current savings, monthly contributions, expected return rate, and time horizon.",
        link: "/tools/retirement-calculator",
      },
      {
        tag: "New",
        text: "Published 35 blog guides covering every calculator on the site â€” real formulas, practical examples, and honest explanations of limitations. Topics include BMI limitations, compound interest, Zakat rules, calorie estimation, salary take-home across three countries, and more.",
        link: "/blog",
      },
      {
        tag: "SEO",
        text: "Rewrote page titles and meta descriptions across all tool pages â€” accurate, non-clickbait copy targeting real search queries. Added structured FAQ schema so answers can appear directly in search results.",
      },
    ],
  },

  // â”€â”€ July 28â€“29, 2026 â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
  {
    date: "July 28â€“29, 2026",
    isoDate: "2026-07-29",
    icon: Layers,
    iconColor: "text-cyan-600 dark:text-cyan-400",
    title: "Embeddable Widgets & Travel Calculator",
    entries: [
      {
        tag: "New",
        text: "Every calculator can now be embedded on any website. The 'Embed this calculator' button on each tool page generates a ready-to-paste <iframe> snippet.",
      },
      {
        tag: "New",
        text: "Added a Travel Time & Fuel Cost Calculator â€” estimates total trip time and fuel cost for road trips, accounting for distance, average speed, fuel efficiency, and price per litre or gallon.",
        link: "/tools/travel-time-fuel-calculator",
      },
      {
        tag: "SEO",
        text: "Added AI-friendly llms.txt so tools like ChatGPT and Perplexity that browse the web can understand what QuickCalc offers.",
      },
    ],
  },

  // â”€â”€ July 26, 2026 â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
  {
    date: "July 26, 2026",
    isoDate: "2026-07-26",
    icon: Zap,
    iconColor: "text-rose-600 dark:text-rose-400",
    title: "8 New Calculators Launched",
    entries: [
      { tag: "New", text: "Savings Growth Calculator â€” compound interest with optional monthly contributions.", link: "/tools/savings-growth-calculator" },
      { tag: "New", text: "Inflation Calculator â€” real purchasing power loss using US, Canadian, and Pakistani CPI data.", link: "/tools/inflation-calculator" },
      { tag: "New", text: "Discount / Sale Price Calculator â€” final price after any percentage or fixed discount.", link: "/tools/discount-calculator" },
      { tag: "New", text: "Habit Cost Calculator â€” shows what daily habits (coffee, cigarettes, subscriptions) cost per month and per year.", link: "/tools/habit-cost-calculator" },
      { tag: "New", text: "Running / Walking Pace Calculator â€” converts between pace, distance, and finish time.", link: "/tools/pace-calculator" },
      { tag: "New", text: "Pregnancy Weight Gain Calculator â€” personalised targets based on IOM guidelines and pre-pregnancy BMI.", link: "/tools/pregnancy-weight-gain-calculator" },
      { tag: "New", text: "Salary Take-Home Pay Calculator â€” net pay after income tax and deductions for US, Canada, and Pakistan.", link: "/tools/salary-take-home-calculator" },
      { tag: "New", text: "Zakat Calculator â€” calculates Zakat due on savings using standard gold and silver nisab thresholds.", link: "/tools/zakat-calculator" },
    ],
  },

  // â”€â”€ July 23â€“24, 2026 â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
  {
    date: "July 23â€“24, 2026",
    isoDate: "2026-07-24",
    icon: Share2,
    iconColor: "text-sky-600 dark:text-sky-400",
    title: "Social Sharing, Related Tools & Live Search",
    entries: [
      {
        tag: "New",
        text: "Added one-click share buttons (WhatsApp, X/Twitter, Facebook, Copy Link) to every tool page.",
      },
      {
        tag: "New",
        text: "Each tool page now shows 3â€“4 related calculators at the bottom to help you find what you need next.",
      },
      {
        tag: "New",
        text: "The homepage search bar now shows live suggestions as you type, with results ranked by relevance.",
      },
      {
        tag: "New",
        text: "Added a 50/30/20 Budget Calculator â€” breaks your income into needs, wants, and savings.",
        link: "/tools/budget-calculator",
      },
      {
        tag: "New",
        text: "Added a live Currency Converter supporting 35+ currencies with live exchange rates and offline fallback estimates.",
        link: "/tools/currency-converter",
      },
      {
        tag: "New",
        text: "Added an Age Calculator â€” exact age in years, months, days, hours, and minutes, plus zodiac sign and generation label.",
        link: "/tools/age-calculator",
      },
    ],
  },

  // â”€â”€ July 21, 2026 â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
  {
    date: "July 21, 2026",
    isoDate: "2026-07-21",
    icon: Globe,
    iconColor: "text-emerald-600 dark:text-emerald-400",
    title: "Group Expense Splitter & Percentage Calculator",
    entries: [
      {
        tag: "New",
        text: "Group Expense Splitter â€” splits any bill or shared cost evenly across multiple people. Useful for trips, dinners, and shared subscriptions.",
        link: "/tools/group-expense-splitter",
      },
      {
        tag: "New",
        text: "Percentage Calculator â€” three modes: 'X% of Y', 'X is what % of Y', and percentage change between two values.",
        link: "/tools/percentage-calculator",
      },
    ],
  },

  // â”€â”€ July 18, 2026 â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
  {
    date: "July 18, 2026",
    isoDate: "2026-07-18",
    icon: Moon,
    iconColor: "text-zinc-600 dark:text-zinc-400",
    title: "Dark Mode, Search Bar & Analytics",
    entries: [
      {
        tag: "New",
        text: "Added a light/dark/system theme toggle â€” your preference is saved and persists across visits.",
      },
      {
        tag: "New",
        text: "Added a homepage search bar to quickly find any calculator by name or topic.",
      },
      {
        tag: "New",
        text: "Added breadcrumb navigation to all tool pages for easier orientation and better search engine context.",
      },
      {
        tag: "New",
        text: "Added Vercel Analytics for aggregate pageview tracking â€” no cookies, no personal data collected.",
      },
    ],
  },

  // â”€â”€ July 12, 2026 â€” initial launch â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
  {
    date: "July 12, 2026",
    isoDate: "2026-07-12",
    badge: "Initial Launch",
    badgeColor: "bg-teal-500/10 text-teal-700 dark:text-teal-400 border border-teal-500/20",
    icon: BookOpen,
    iconColor: "text-teal-600 dark:text-teal-400",
    title: "QuickCalc Launched",
    entries: [
      {
        tag: "Launch",
        text: "QuickCalc launched publicly with a core suite of calculators: BMI, Tip, Loan / EMI, Water Intake, Sleep Cycle, Shoe Size Converter, Regex Tester, JSONâ†”CSV Converter, Password Generator, GPA Converter, Color Palette Generator, and more.",
        link: "/",
      },
      {
        tag: "Core",
        text: "All calculations run entirely in your browser â€” nothing is ever sent to a server.",
      },
      {
        tag: "Core",
        text: "Mobile-responsive design with full dark mode support from day one.",
      },
    ],
  },
];

// Tag color map
const TAG_COLORS: Record<string, string> = {
  New: "bg-teal-500/10 text-teal-700 dark:text-teal-300 border border-teal-500/20",
  Improvement: "bg-blue-500/10 text-blue-700 dark:text-blue-300 border border-blue-500/20",
  Design: "bg-violet-500/10 text-violet-700 dark:text-violet-300 border border-violet-500/20",
  Fix: "bg-rose-500/10 text-rose-700 dark:text-rose-300 border border-rose-500/20",
  Security: "bg-amber-500/10 text-amber-700 dark:text-amber-300 border border-amber-500/20",
  Accessibility: "bg-sky-500/10 text-sky-700 dark:text-sky-300 border border-sky-500/20",
  SEO: "bg-indigo-500/10 text-indigo-700 dark:text-indigo-300 border border-indigo-500/20",
  Core: "bg-zinc-500/10 text-zinc-700 dark:text-zinc-300 border border-zinc-500/20",
  Launch: "bg-emerald-500/10 text-emerald-700 dark:text-emerald-300 border border-emerald-500/20",
};

function TagBadge({ tag }: { tag: string }) {
  const cls = TAG_COLORS[tag] ?? "bg-zinc-100 text-zinc-700 dark:bg-zinc-800 dark:text-zinc-300";
  return (
    <span className={`inline-block shrink-0 text-[10px] font-bold uppercase tracking-wider px-1.5 py-0.5 rounded-md ${cls}`}>
      {tag}
    </span>
  );
}

export default function ChangelogPage() {
  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-zinc-950 text-zinc-900 dark:text-zinc-100 transition-colors">
      <Navbar />

      <main className="max-w-3xl mx-auto px-4 py-10 sm:py-16">
        <Breadcrumbs toolName="Changelog" toolSlug="changelog" />

        {/* Page header */}
        <div className="mb-12 sm:mb-16">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-xl bg-teal-500/10 dark:bg-teal-500/20 border border-teal-500/20 flex items-center justify-center text-teal-600 dark:text-teal-400">
              <GitCompare size={20} strokeWidth={2} />
            </div>
            <span className="text-xs font-bold uppercase tracking-widest text-zinc-400 dark:text-zinc-500">
              Product Updates
            </span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-zinc-900 dark:text-white mb-4">
            Changelog
          </h1>
          <p className="text-base text-zinc-600 dark:text-zinc-400 leading-relaxed max-w-xl">
            A plain-language record of everything we've shipped â€” new calculators, design updates,
            privacy improvements, and developer tools. Most recent changes are at the top.
          </p>
        </div>

        {/* Timeline */}
        <div className="relative">
          {/* Vertical line */}
          <div className="absolute left-[19px] top-0 bottom-0 w-px bg-zinc-200 dark:bg-zinc-800 hidden sm:block" aria-hidden="true" />

          <ol className="space-y-12 sm:space-y-16">
            {RELEASES.map((release) => {
              const Icon = release.icon;
              return (
                <li key={release.isoDate} className="relative sm:pl-12">
                  {/* Timeline dot */}
                  <div className="hidden sm:flex absolute left-0 top-0.5 w-10 h-10 rounded-xl bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 items-center justify-center shadow-sm">
                    <Icon size={18} className={release.iconColor} />
                  </div>

                  {/* Release card */}
                  <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-200">
                    {/* Card header */}
                    <div className="px-5 py-4 border-b border-zinc-100 dark:border-zinc-800 flex flex-wrap items-start justify-between gap-3">
                      <div className="space-y-1">
                        <div className="flex items-center gap-2 flex-wrap">
                          <time
                            dateTime={release.isoDate}
                            className="text-xs font-semibold text-zinc-400 dark:text-zinc-500"
                          >
                            {release.date}
                          </time>
                          {release.badge && (
                            <span className={`text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full ${release.badgeColor}`}>
                              {release.badge}
                            </span>
                          )}
                        </div>
                        <h2 className="text-sm font-bold text-zinc-900 dark:text-white leading-snug">
                          {release.title}
                        </h2>
                      </div>
                      <Icon size={16} className={`${release.iconColor} opacity-40 shrink-0 mt-0.5 sm:hidden`} />
                    </div>

                    {/* Entries */}
                    <ul className="divide-y divide-zinc-50 dark:divide-zinc-800/60">
                      {release.entries.map((entry, i) => (
                        <li key={i} className="px-5 py-3.5 flex items-start gap-3 group">
                          <TagBadge tag={entry.tag} />
                          <div className="flex-1 text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed">
                            {entry.text}
                            {entry.link && (
                              <Link
                                href={entry.link}
                                className="inline-flex items-center gap-0.5 ml-1.5 text-teal-600 dark:text-teal-400 font-medium hover:underline text-xs"
                              >
                                View tool
                                <ArrowUpRight size={11} />
                              </Link>
                            )}
                          </div>
                        </li>
                      ))}
                    </ul>
                  </div>
                </li>
              );
            })}
          </ol>
        </div>

        {/* Bottom CTA */}
        <div className="mt-16 border-t border-zinc-200 dark:border-zinc-800 pt-10 text-center space-y-4">
          <p className="text-sm text-zinc-500 dark:text-zinc-400">
            Want to be notified when we ship something new?
          </p>
          <Link
            href="/contact"
            className="inline-flex items-center gap-2 text-sm font-semibold text-teal-600 dark:text-teal-400 hover:text-teal-700 dark:hover:text-teal-300 border border-teal-500/30 rounded-xl px-4 py-2.5 hover:bg-teal-50 dark:hover:bg-teal-950/30 transition-all"
          >
            <FileDown size={14} />
            Drop us a message and we'll let you know
          </Link>
          <p className="text-xs text-zinc-400 dark:text-zinc-500">
            All entries verified against the real git commit history. We don't exaggerate or invent features.
          </p>
        </div>
      </main>

      <Footer />
    </div>
  );
}


