"use client";

import React from "react";
import Link from "next/link";
import {
  TrendingUp,
  TrendingDown,
  PiggyBank,
  CreditCard,
  Building2,
  ArrowRight,
  Sparkles,
} from "lucide-react";

export default function FeaturedCalculators() {
  const featured = [
    {
      id: "featured-debt-snowball",
      title: "Debt Snowball vs. Avalanche Calculator",
      badge: "Snowball vs Avalanche",
      badgeColor: "bg-indigo-500/10 text-indigo-700 dark:text-indigo-300 border-indigo-500/20",
      description:
        "Compare Dave Ramsey's Debt Snowball with the Debt Avalanche method. Calculate payoff dates, total interest saved, and build a custom multi-debt plan.",
      icon: TrendingDown,
      iconColor: "text-indigo-600 dark:text-indigo-400 bg-indigo-500/10 border-indigo-500/30",
      href: "/calculators/debt-snowball-vs-avalanche-calculator",
      actionText: "Compare Strategies",
      hoverBorder: "hover:border-indigo-500/50",
      actionColor: "text-indigo-600 dark:text-indigo-400",
    },
    {
      id: "featured-credit-card",
      title: "Credit Card Payoff Calculator",
      badge: "Debt Free",
      badgeColor: "bg-rose-500/10 text-rose-700 dark:text-rose-300 border-rose-500/20",
      description:
        "Find your exact debt-free date, calculate compound interest charges, and see how extra monthly payments slash years off card debt.",
      icon: CreditCard,
      iconColor: "text-rose-600 dark:text-rose-400 bg-rose-500/10 border-rose-500/30",
      href: "/calculators/credit-card-payoff-calculator",
      actionText: "Calculate Payoff",
      hoverBorder: "hover:border-rose-500/50",
      actionColor: "text-rose-600 dark:text-rose-400",
    },
    {
      id: "featured-paycheck",
      title: "US State Paycheck Calculators Hub",
      badge: "50 States + 2026 Tax",
      badgeColor: "bg-blue-500/10 text-blue-700 dark:text-blue-300 border-blue-500/20",
      description:
        "Calculate take-home salary or hourly wages across all 50 US states with 2026 federal brackets, state taxes (0% to progressive), and FICA.",
      icon: Building2,
      iconColor: "text-blue-600 dark:text-blue-400 bg-blue-500/10 border-blue-500/30",
      href: "/calculators/paycheck-calculator",
      actionText: "Compare States",
      hoverBorder: "hover:border-blue-500/50",
      actionColor: "text-blue-600 dark:text-blue-400",
    },
    {
      id: "featured-ramsey",
      title: "Dave Ramsey Investment Calculator",
      badge: "Baby Step 4",
      badgeColor: "bg-emerald-500/10 text-emerald-700 dark:text-emerald-300 border-emerald-500/20",
      description:
        "Project compound retirement wealth using Dave Ramsey's 15% rule and recommended 4-fund portfolio distribution (25% each).",
      icon: TrendingUp,
      iconColor: "text-emerald-600 dark:text-emerald-400 bg-emerald-500/10 border-emerald-500/30",
      href: "/calculators/ramsey-investment-calculator",
      actionText: "Calculate Nest Egg",
      hoverBorder: "hover:border-emerald-500/50",
      actionColor: "text-emerald-600 dark:text-emerald-400",
    },
    {
      id: "featured-runway",
      title: "Savings Runway & Retirement Calculator",
      badge: "Runway & SWR",
      badgeColor: "bg-teal-500/10 text-teal-700 dark:text-teal-300 border-teal-500/20",
      description:
        "Simulate how many years your savings and retirement fund will last with compounding yield, annual inflation adjustments, and SWR risk gauges.",
      icon: PiggyBank,
      iconColor: "text-teal-600 dark:text-teal-400 bg-teal-500/10 border-teal-500/30",
      href: "/calculators/how-long-will-my-money-last",
      actionText: "Simulate Runway",
      hoverBorder: "hover:border-teal-500/50",
      actionColor: "text-teal-600 dark:text-teal-400",
    },
  ];

  return (
    <section aria-labelledby="featured-financial-heading" className="w-full mb-10">
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-3 mb-5">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-teal-500/10 text-teal-700 dark:text-teal-300 border border-teal-500/20 mb-2">
            <Sparkles size={13} className="text-teal-600 dark:text-teal-400" />
            <span>High-Impact Financial Suite</span>
          </div>
          <h2
            id="featured-financial-heading"
            className="text-2xl sm:text-3xl font-heading font-extrabold text-ink tracking-tight"
          >
            Featured Financial &amp; Retirement Calculators
          </h2>
          <p className="text-xs sm:text-sm text-ink-muted mt-1 max-w-2xl">
            Explore our most popular interactive planning engines for wealth building, debt elimination, and retirement runway.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4">
        {featured.map((item) => {
          const IconComp = item.icon;
          return (
            <Link
              key={item.id}
              id={item.id}
              href={item.href}
              className={`group relative bg-base-card border border-surface-border ${item.hoverBorder} rounded-2xl p-5 sm:p-6 shadow-sm hover:shadow-xl hover:-translate-y-1 active:scale-[0.98] transition-all duration-200 flex flex-col justify-between`}
            >
              <div className="space-y-4">
                <div className="flex items-start justify-between gap-3">
                  <div
                    className={`w-12 h-12 rounded-xl border flex items-center justify-center shrink-0 shadow-inner ${item.iconColor}`}
                  >
                    <IconComp size={24} />
                  </div>
                  <span
                    className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-[10px] font-extrabold uppercase tracking-wider border ${item.badgeColor}`}
                  >
                    {item.badge}
                  </span>
                </div>

                <div>
                  <h3 className="text-base sm:text-lg font-heading font-bold text-ink group-hover:text-teal-600 dark:group-hover:text-teal-400 transition-colors leading-snug">
                    {item.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-ink-muted leading-relaxed mt-2 line-clamp-3">
                    {item.description}
                  </p>
                </div>
              </div>

              <div
                className={`flex items-center justify-between pt-4 mt-4 border-t border-surface-border/60 text-xs font-bold ${item.actionColor}`}
              >
                <span>{item.actionText}</span>
                <ArrowRight
                  size={14}
                  className="group-hover:translate-x-1.5 transition-transform"
                />
              </div>
            </Link>
          );
        })}
      </div>
    </section>
  );
}
