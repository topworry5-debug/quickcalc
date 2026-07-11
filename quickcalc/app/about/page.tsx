import type { Metadata } from "next";
import Link from "next/link";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "About Us | QuickCalc",
  description: "Learn more about QuickCalc, our mission, and our dedication to offering high-quality, free, science-backed and financial calculation suites for everyone.",
  alternates: {
    canonical: "/about",
  },
};

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-zinc-950 text-zinc-900 dark:text-zinc-100 font-[family-name:var(--font-geist-sans)]">
      {/* Navigation Header */}
      <header className="border-b border-zinc-200 dark:border-zinc-800 bg-white/80 dark:bg-zinc-900/80 backdrop-blur-md sticky top-0 z-50">
        <div className="max-w-5xl mx-auto px-4 h-16 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2 font-bold text-lg text-zinc-900 dark:text-white">
            <span>✨ QuickCalc</span>
          </Link>
          <div className="text-sm font-medium text-zinc-500 dark:text-zinc-400">
            About Us
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-3xl mx-auto px-4 py-16 sm:py-20">
        <article className="prose prose-zinc dark:prose-invert max-w-none">
          <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-zinc-900 dark:text-white mb-6">
            About QuickCalc
          </h1>
          
          <p className="text-zinc-600 dark:text-zinc-400 leading-relaxed mb-6">
            Welcome to <strong>QuickCalc</strong>, an ultimate suite of elegant, highly responsive, and science-backed tools built to simplify your everyday calculation needs. Our platform is meticulously crafted to deliver accurate, modern, and lightning-fast solutions across various domains, including health, finance, and international education.
          </p>

          <h2 className="text-xl font-bold text-zinc-900 dark:text-white mt-8 mb-4">
            Our Mission
          </h2>
          <p className="text-zinc-600 dark:text-zinc-400 leading-relaxed mb-6">
            At QuickCalc, our mission is to make powerful, utility-focused calculators accessible to everyone across the globe. We believe that daily tools should not only be precise but also beautiful, private, and effortless to use. Every calculator we build is fully optimized for speed, utilizes scientifically validated formulas, and provides immediate, actionable feedback without requiring any user registration or personal account setup.
          </p>

          <h2 className="text-xl font-bold text-zinc-900 dark:text-white mt-8 mb-4">
            Who Runs QuickCalc?
          </h2>
          <p className="text-zinc-600 dark:text-zinc-400 leading-relaxed mb-6">
            QuickCalc is operated by an independent, passionate team of software developers and web designers who appreciate high-quality utility software. Frustrated by outdated, ad-cluttered tools on the internet, we set out to build a clean, modern alternative that respects user privacy and offers top-tier performance on both mobile and desktop platforms.
          </p>

          <h2 className="text-xl font-bold text-zinc-900 dark:text-white mt-8 mb-4">
            Key Principles We Live By
          </h2>
          <ul className="list-disc pl-6 space-y-2 text-zinc-600 dark:text-zinc-400 mb-8">
            <li><strong>Accuracy & Quality:</strong> All formulas are derived from standard academic, health, or financial models, ensuring maximum precision.</li>
            <li><strong>User Privacy:</strong> We perform all core calculations securely inside your browser and do not collect, store, or sell your inputted data.</li>
            <li><strong>Elegant Design:</strong> No complex forms or messy options. We present calculations visually using interactive charts and clean user interfaces.</li>
            <li><strong>100% Free:</strong> Our tools are completely free to use, supported solely by non-intrusive, privacy-respecting advertising partners.</li>
          </ul>

          <p className="text-zinc-600 dark:text-zinc-400 leading-relaxed">
            Thank you for making QuickCalc a part of your daily digital toolkit. If you have any suggestions, feedback, or custom calculator requests, please do not hesitate to reach out to us.
          </p>
        </article>
      </main>

      {/* Footer */}
      <Footer customText="Elegant, science-backed lifestyle modeling solutions." />
    </div>
  );
}
