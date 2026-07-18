import ThemeToggle from "@/components/ThemeToggle";

import type { Metadata } from "next";
import Link from "next/link";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "Contact Us | QuickCalc",
  description: "Get in touch with the QuickCalc team. We welcome your feedback, calculator suggestions, and general inquiries.",
  alternates: {
    canonical: "/contact",
  },
};

export default function ContactPage() {
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
            <span className="text-sm font-medium text-zinc-300 dark:text-zinc-700 font-normal">|</span>
            <div className="text-sm font-medium text-zinc-500 dark:text-zinc-400">
              Contact Us
            </div>
            <span className="text-sm font-medium text-zinc-300 dark:text-zinc-700 font-normal">|</span>
            <ThemeToggle />
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-3xl mx-auto px-4 py-16 sm:py-20">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-zinc-900 dark:text-white mb-4">
            Get in Touch
          </h1>
          <p className="text-zinc-600 dark:text-zinc-400 leading-relaxed">
            Have a question, feedback, or a suggestion for a new calculator tool? We would love to hear from you! Reach out via email or connect with us on social media.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-2xl mx-auto">
          {/* Email Card */}
          <div className="bg-white dark:bg-zinc-900 p-6 rounded-2xl border border-zinc-200 dark:border-zinc-800 text-center flex flex-col justify-between items-center">
            <div>
              <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900/50 text-blue-600 dark:text-blue-400 rounded-xl flex items-center justify-center text-xl mx-auto mb-4">
                📧
              </div>
              <h2 className="text-lg font-bold text-zinc-900 dark:text-white mb-2">Email Us</h2>
              <p className="text-sm text-zinc-500 dark:text-zinc-400 mb-6">
                Our team typically responds to inquiries within 24 to 48 business hours.
              </p>
            </div>
            <a
              href="mailto:topworry5@gmail.com"
              className="inline-flex items-center justify-center px-6 py-3 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-medium text-sm transition shadow-sm"
            >
              topworry5@gmail.com
            </a>
          </div>

          {/* Social Card */}
          <div className="bg-white dark:bg-zinc-900 p-6 rounded-2xl border border-zinc-200 dark:border-zinc-800 text-center flex flex-col justify-between items-center">
            <div>
              <div className="w-12 h-12 bg-indigo-100 dark:bg-indigo-900/50 text-indigo-600 dark:text-indigo-400 rounded-xl flex items-center justify-center text-xl mx-auto mb-4">
                🌐
              </div>
              <h2 className="text-lg font-bold text-zinc-900 dark:text-white mb-2">Social Communities</h2>
              <p className="text-sm text-zinc-500 dark:text-zinc-400 mb-6">
                Follow us, track updates, and suggest features inside our open communities.
              </p>
            </div>
            <div className="flex gap-4">
              <span className="px-4 py-2 bg-zinc-100 dark:bg-zinc-800 rounded-lg text-xs font-semibold text-zinc-600 dark:text-zinc-400 cursor-not-allowed">
                @QuickCalc (X)
              </span>
              <span className="px-4 py-2 bg-zinc-100 dark:bg-zinc-800 rounded-lg text-xs font-semibold text-zinc-600 dark:text-zinc-400 cursor-not-allowed">
                GitHub Repository
              </span>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <Footer customText="Elegant, science-backed lifestyle modeling solutions." />
    </div>
  );
}
