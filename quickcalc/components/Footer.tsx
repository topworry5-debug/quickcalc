"use client";

import React from "react";
import Link from "next/link";
import { Calculator, ShieldCheck, Heart, ArrowUpRight } from "lucide-react";
import ScrollReveal from "@/components/ScrollReveal";

interface FooterProps {
  customText?: string;
}

export default function Footer({ customText }: FooterProps) {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t border-surface-border bg-base-card text-ink mt-12 sm:mt-16 pt-10 pb-8 transition-colors">
      <div className="max-w-5xl mx-auto px-4">
        {/* Multi-Column Main Footer Section */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8 pb-10 border-b border-surface-border">
          {/* Column 1: Brand & Blurb */}
          <ScrollReveal delayMs={0} className="space-y-4 sm:col-span-2 md:col-span-1">
            <Link href="/" className="inline-flex items-center gap-2.5 font-extrabold text-lg text-ink">
              <div className="w-8 h-8 rounded-lg bg-teal-500/10 dark:bg-teal-500/20 border border-teal-500/20 flex items-center justify-center text-teal-600 dark:text-teal-400">
                <Calculator size={18} strokeWidth={2.5} />
              </div>
              <span className="font-heading tracking-tight text-xl font-extrabold">Quick<span className="text-teal-600 dark:text-teal-400">Calc</span></span>
            </Link>
            <p className="text-xs text-ink-muted leading-relaxed">
              QuickCalc offers science-backed, client-side calculators built for speed, privacy, and mathematical exactness. 100% free with zero sign-ups or paywalls.
            </p>
            <div className="inline-flex items-center gap-1.5 text-xs text-ink-muted font-medium">
              <ShieldCheck size={14} className="text-teal-600 dark:text-teal-400" />
              <span>100% Client-Side & Private</span>
            </div>
          </ScrollReveal>

          {/* Column 2: Health & Wellness */}
          <ScrollReveal delayMs={100} className="space-y-3">
            <Link
              href="/category/health-fitness"
              className="font-heading font-bold text-xs uppercase tracking-wider text-ink hover:text-teal-600 dark:hover:text-teal-400 transition-colors inline-flex items-center gap-1 group"
            >
              <span>Health & Wellness</span>
              <ArrowUpRight size={12} className="opacity-60 group-hover:opacity-100 group-hover:translate-x-0.5 transition-all" />
            </Link>
            <ul className="space-y-2 text-xs text-ink-muted">
              <li>
                <Link href="/tools/bmi-calculator" className="hover:text-teal-600 dark:hover:text-teal-400 transition-colors">
                  BMI Calculator
                </Link>
              </li>
              <li>
                <Link href="/tools/calorie-calculator" className="hover:text-teal-600 dark:hover:text-teal-400 transition-colors">
                  Calorie & TDEE Calculator
                </Link>
              </li>
              <li>
                <Link href="/tools/water-intake-calculator" className="hover:text-teal-600 dark:hover:text-teal-400 transition-colors">
                  Water Intake Calculator
                </Link>
              </li>
              <li>
                <Link href="/tools/sleep-cycle-calculator" className="hover:text-teal-600 dark:hover:text-teal-400 transition-colors">
                  Sleep Cycle Calculator
                </Link>
              </li>
              <li>
                <Link href="/tools/due-date-calculator" className="hover:text-teal-600 dark:hover:text-teal-400 transition-colors">
                  Pregnancy Due Date
                </Link>
              </li>
              <li>
                <Link href="/tools/intermittent-fasting-calculator" className="hover:text-teal-600 dark:hover:text-teal-400 transition-colors">
                  Intermittent Fasting
                </Link>
              </li>
              <li>
                <Link href="/tools/macro-calculator" className="hover:text-teal-600 dark:hover:text-teal-400 transition-colors">
                  Macro Calculator
                </Link>
              </li>
              <li>
                <Link href="/tools/gfr-kidney-function-calculator" className="hover:text-teal-600 dark:hover:text-teal-400 transition-colors">
                  GFR / Kidney Function
                </Link>
              </li>
            </ul>
          </ScrollReveal>

          {/* Column 3: Finance & Money */}
          <ScrollReveal delayMs={200} className="space-y-3">
            <Link
              href="/category/finance-math"
              className="font-heading font-bold text-xs uppercase tracking-wider text-ink hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors inline-flex items-center gap-1 group"
            >
              <span>Finance & Money</span>
              <ArrowUpRight size={12} className="opacity-60 group-hover:opacity-100 group-hover:translate-x-0.5 transition-all" />
            </Link>
            <ul className="space-y-2 text-xs text-ink-muted">
              <li>
                <Link href="/tools/loan-calculator" className="hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">
                  Loan & EMI Calculator
                </Link>
              </li>
              <li>
                <Link href="/tools/salary-take-home-calculator" className="hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">
                  Salary Take-Home Pay
                </Link>
              </li>
              <li>
                <Link href="/tools/currency-converter" className="hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">
                  Live Currency Converter
                </Link>
              </li>
              <li>
                <Link href="/tools/budget-calculator" className="hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">
                  50/30/20 Budget Calculator
                </Link>
              </li>
              <li>
                <Link href="/tools/savings-growth-calculator" className="hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">
                  Savings Growth Calculator
                </Link>
              </li>
              <li>
                <Link href="/tools/freelance-rate-calculator" className="hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">
                  Freelance Rate Calculator
                </Link>
              </li>
            </ul>
          </ScrollReveal>

          {/* Column 4: Converters & Utilities / Legal */}
          <ScrollReveal delayMs={300} className="space-y-3">
            <Link
              href="/category/utility-programming"
              className="font-heading font-bold text-xs uppercase tracking-wider text-ink hover:text-teal-600 dark:hover:text-teal-400 transition-colors inline-flex items-center gap-1 group"
            >
              <span>Utilities & Company</span>
              <ArrowUpRight size={12} className="opacity-60 group-hover:opacity-100 group-hover:translate-x-0.5 transition-all" />
            </Link>
            <ul className="space-y-2 text-xs text-ink-muted">
              <li>
                <Link href="/tools/ai-token-cost-calculator" className="hover:text-ink transition-colors">
                  AI Token Cost Calculator
                </Link>
              </li>
              <li>
                <Link href="/tools/digital-storage-converter" className="hover:text-ink transition-colors">
                  Digital Storage Converter
                </Link>
              </li>
              <li>
                <Link href="/tools/speech-time-calculator" className="hover:text-ink transition-colors">
                  Speech Time Calculator
                </Link>
              </li>
              <li>
                <Link href="/tools/gpa-converter" className="hover:text-ink transition-colors">
                  GPA Converter
                </Link>
              </li>
              <li>
                <Link href="/tools/password-generator" className="hover:text-ink transition-colors">
                  Password Generator
                </Link>
              </li>
              <li>
                <Link href="/blog" className="hover:text-ink transition-colors inline-flex items-center gap-1">
                  <span>Guides & Blog</span>
                  <ArrowUpRight size={12} />
                </Link>
              </li>
              <li>
                <Link href="/changelog" className="hover:text-ink transition-colors inline-flex items-center gap-1">
                  <span>Changelog</span>
                </Link>
              </li>
              <li>
                <Link href="/about" className="hover:text-ink transition-colors">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/methodology" className="hover:text-teal-600 dark:hover:text-teal-400 font-semibold transition-colors flex items-center gap-1 text-teal-600 dark:text-teal-400">
                  <span>Methodology & Sources</span>
                </Link>
              </li>
              <li>
                <Link href="/api-docs" className="hover:text-indigo-600 dark:hover:text-indigo-400 font-semibold transition-colors flex items-center gap-1 text-indigo-600 dark:text-indigo-400">
                  <span>Developer REST API</span>
                </Link>
              </li>
              <li>
                <Link href="/compare/best-free-online-calculators" className="hover:text-teal-600 dark:hover:text-teal-400 font-semibold transition-colors flex items-center gap-1 text-teal-600 dark:text-teal-400">
                  <span>Best Calculators Guide</span>
                </Link>
              </li>
              <li>
                <Link href="/privacy-policy" className="hover:text-ink transition-colors">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="/terms" className="hover:text-ink transition-colors">
                  Terms of Service
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-ink transition-colors">
                  Contact Support
                </Link>
              </li>
            </ul>
          </ScrollReveal>
        </div>

        {/* Bottom Bar */}
        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-ink-muted">
          <p>&copy; {currentYear} QuickCalc. All rights reserved. {customText || "Precision science-backed calculation tools."}</p>
          <div className="inline-flex items-center gap-1 text-[11px]">
            <span>Designed for precision & privacy</span>
            <Heart size={12} className="text-teal-600 dark:text-teal-400 fill-teal-600/20" />
          </div>
        </div>
      </div>
    </footer>
  );
}
