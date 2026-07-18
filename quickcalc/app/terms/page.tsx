import ThemeToggle from "@/components/ThemeToggle";

import type { Metadata } from "next";
import Link from "next/link";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "Terms of Use | QuickCalc",
  description: "Read our terms of use. All QuickCalc tools are provided as-is for informational purposes and do not constitute professional advice.",
  alternates: {
    canonical: "/terms",
  },
};

export default function TermsOfUsePage() {
  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-zinc-950 text-zinc-900 dark:text-zinc-100 font-[family-name:var(--font-geist-sans)]">
      {/* Navigation Header */}
      <header className="border-b border-zinc-200 dark:border-zinc-800 bg-white/80 dark:bg-zinc-900/80 backdrop-blur-md sticky top-0 z-50">
        <div className="max-w-5xl mx-auto px-4 h-16 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2 font-bold text-lg text-zinc-900 dark:text-white">
            <span>✨ QuickCalc</span>
          </Link>
          <div className="flex items-center gap-4">
            <Link href="/" className="text-sm font-medium text-zinc-600 dark:text-zinc-400 hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors">
              Home
            </Link>
            <Link href="/blog" className="text-sm font-medium text-zinc-600 dark:text-zinc-400 hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors">
              Blog
            </Link>
            <span className="text-sm font-medium text-zinc-300 dark:text-zinc-700 font-normal">|</span>
            <span className="text-sm font-medium text-zinc-300 dark:text-zinc-700 font-normal">|</span>
            <div className="text-sm font-medium text-zinc-500 dark:text-zinc-400">
              Terms of Use
            </div>
            <span className="text-sm font-medium text-zinc-300 dark:text-zinc-700 font-normal">|</span>
            <ThemeToggle />
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-3xl mx-auto px-4 py-16 sm:py-20">
        <article className="prose prose-zinc dark:prose-invert max-w-none">
          <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-zinc-900 dark:text-white mb-6">
            Terms of Use
          </h1>
          <p className="text-xs text-zinc-500 dark:text-zinc-400 mb-8">Last Updated: July 9, 2026</p>
          
          <p className="text-zinc-600 dark:text-zinc-400 leading-relaxed mb-6">
            Welcome to QuickCalc (<strong>quickcalc.cloud</strong>). By accessing or using our website and its calculation tools, you agree to be bound by these Terms of Use. If you do not agree to all of these terms, please do not use our services.
          </p>

          <h2 className="text-xl font-bold text-zinc-900 dark:text-white mt-8 mb-4">
            {"1. Services Provided \"As-Is\""}
          </h2>
          <p className="text-zinc-600 dark:text-zinc-400 leading-relaxed mb-6">
            {"QuickCalc offers free interactive calculator suites for lifestyle modeling, educational conversions, and financial estimates. All tools, calculations, and content on this website are provided on an \"as-is\" and \"as-available\" basis without any warranties of any kind, either express or implied, including but not limited to accuracy, completeness, reliability, or suitability for any particular purpose."}
          </p>

          <h2 className="text-xl font-bold text-zinc-900 dark:text-white mt-8 mb-4">
            2. Not Professional, Medical, Financial, or Legal Advice
          </h2>
          <p className="text-zinc-600 dark:text-zinc-400 leading-relaxed mb-6">
            The calculations, recommendations, and estimates provided by QuickCalc are intended solely for <strong>informational and educational purposes</strong>. 
          </p>
          <ul className="list-disc pl-6 space-y-2 text-zinc-600 dark:text-zinc-400 mb-6">
            <li><strong>Health Tools:</strong> Calculator results (such as hydration or sleep metrics) are not medical advice. They are not intended to replace consultation with a qualified medical professional or doctor.</li>
            <li><strong>Financial Tools:</strong> Calculations (such as loan EMIs and amortization schedules) are mathematical models based on standard reducing-balance math. They do not constitute official financial advice or guarantees from any lender or bank.</li>
            <li><strong>Academic Tools:</strong> Grade and GPA conversions are based on standard global mapping patterns and are for informational use. Official institutional GPA results may vary.</li>
          </ul>

          <h2 className="text-xl font-bold text-zinc-900 dark:text-white mt-8 mb-4">
            3. Limitation of Liability
          </h2>
          <p className="text-zinc-600 dark:text-zinc-400 leading-relaxed mb-6">
            Under no circumstances shall QuickCalc, its operators, developers, or affiliates be liable for any direct, indirect, incidental, special, or consequential damages resulting from the use of, or inability to use, our tools or reliance on any calculator results. Any decisions you make based on information obtained from this website are solely your own responsibility.
          </p>

          <h2 className="text-xl font-bold text-zinc-900 dark:text-white mt-8 mb-4">
            4. Permitted Use
          </h2>
          <p className="text-zinc-600 dark:text-zinc-400 leading-relaxed mb-6">
            You agree to use QuickCalc only for lawful purposes. You may not attempt to reverse engineer, scrape, automate requests to, disrupt, or compromise the security of our website, servers, or client-side assets.
          </p>

          <h2 className="text-xl font-bold text-zinc-900 dark:text-white mt-8 mb-4">
            5. Changes to Terms
          </h2>
          <p className="text-zinc-600 dark:text-zinc-400 leading-relaxed mb-6">
            We reserve the right to modify or replace these Terms of Use at any time. Your continued use of the website following any changes constitutes acceptance of those modified terms.
          </p>

          <h2 className="text-xl font-bold text-zinc-900 dark:text-white mt-8 mb-4">
            Contact Us
          </h2>
          <p className="text-zinc-600 dark:text-zinc-400 leading-relaxed">
            If you have any questions or concerns regarding these Terms of Use, please contact us at <a href="mailto:topworry5@gmail.com" className="text-blue-500 hover:underline">topworry5@gmail.com</a>.
          </p>
        </article>
      </main>

      {/* Footer */}
      <Footer customText="Elegant, science-backed lifestyle modeling solutions." />
    </div>
  );
}
