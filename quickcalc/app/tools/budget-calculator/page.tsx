import RelatedTools from "@/components/RelatedTools";
import ShareButtons from "@/components/ShareButtons";
import EmbedWidget from "@/components/EmbedWidget";


import ThemeToggle from "@/components/ThemeToggle";
import Breadcrumbs from "@/components/Breadcrumbs";
import type { Metadata } from "next";
import Link from "next/link";
import BudgetCalculatorWidget from "./BudgetCalculatorWidget";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "50/30/20 Budget Calculator - Split Income & Plan Savings",
  description: "Plan your monthly budget with our free 50/30/20 income split calculator. Easily track your needs, wants, and savings goals with no sign-up required.",
  alternates: {
    canonical: "/tools/budget-calculator",
  },
  openGraph: {
    title: "50/30/20 Budget Calculator - Split Income & Plan Savings",
    description: "Plan your monthly budget with our free 50/30/20 income split calculator. Easily track your needs, wants, and savings goals with no sign-up required.",
    url: "https://quickcalc.cloud/tools/budget-calculator",
    type: "website",
    siteName: "QuickCalc",
    images: [
      {
        url: "https://quickcalc.cloud/og-image.png",
        width: 1200,
        height: 630,
        alt: "Budget Calculator on QuickCalc",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "50/30/20 Budget Calculator - Split Income & Plan Savings",
    description: "Plan your monthly budget with our free 50/30/20 income split calculator. Easily track your needs, wants, and savings goals with no sign-up required.",
    images: ["https://quickcalc.cloud/og-image.png"],
  },
};

export default function BudgetCalculatorPage({ searchParams }: { searchParams?: { embed?: string } }) {
  const isEmbed = searchParams?.embed === "true";
  if (isEmbed) {
    return (
      <div className="min-h-screen bg-white dark:bg-zinc-950 text-zinc-900 dark:text-zinc-100 font-[family-name:var(--font-geist-sans)] transition-colors p-2 flex flex-col justify-between">
        <main className="max-w-4xl mx-auto w-full">
          <BudgetCalculatorWidget />
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
        "name": "What counts as a Need vs a Want in the 50/30/20 budget?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Needs are essential expenses you must pay to survive and maintain basic employment, such as housing (rent or mortgage), groceries, utilities, basic insurance, transportation, and minimum debt payments. Wants are non-essential discretionary expenses you could live without if necessary, such as dining out, streaming services, concert tickets, vacations, premium apparel, and hobbies."
        }
      },
      {
        "@type": "Question",
        "name": "What should I do if my rent is more than 50% of my income?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "If high housing costs push your Needs past 50%, you will need to adjust your split (e.g., to 60/20/20 or 70/20/10) or scale back on discretionary Wants to cover the gap. You can use our customizable slider above to model different percentage targets that fit your specific financial situation."
        }
      },
      {
        "@type": "Question",
        "name": "Do I use pre-tax or net take-home income for the 50/30/20 rule?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "The 50/30/20 rule is designed to be calculated using your after-tax monthly income (also known as net take-home pay). If you have pre-tax deductions for retirement savings (like a 401k) or health insurance, you can either add them back to make your calculations fully consistent, or simply count them toward your 20% savings goal."
        }
      },
      {
        "@type": "Question",
        "name": "Is the 50/30/20 budgeting rule realistic for low-income earners?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "For lower-income households, high fixed costs (housing, utilities, food) often swallow 70% or more of after-tax income, leaving very little for wants or savings. In these cases, a 50/30/20 rule is a great North Star goal, but you may need to temporarily use a customized 70/20/10 or 80/15/5 plan while working to increase income or reduce fixed expenses."
        }
      },
      {
        "@type": "Question",
        "name": "Where does credit card debt fit in the 50/30/20 budget?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Under the 50/30/20 system, minimum payments required to keep your accounts in good standing (e.g., minimum credit card payments, student loans, car loans) are classified as Needs because failing to pay them carries severe consequences. Extra debt principal repayments or aggressive payoffs, however, are treated as part of your 20% Savings & Debt Repayment category."
        }
      },
      {
        "@type": "Question",
        "name": "How do I adjust the 50/30/20 budget percentages for my personal savings goals?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Absolutely! Financial situations are highly personal. If you are aggressively paying down high-interest debt or saving for a down payment, you might target a 50/15/35 split. If you live in a high-cost-of-living area, a 60/20/20 split may be much more realistic."
        }
      },
      {
        "@type": "Question",
        "name": "What is the difference between a 50/30/20 budget and a zero-based budget?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "The 50/30/20 rule is a high-level proportional budgeting framework that splits money into three broad buckets with minimal tracking. A zero-based budget is a more granular system where every single dollar of income is assigned to a specific category (e.g., rent, gas, dining, cinema) until the total remaining equals zero."
        }
      },
      {
        "@type": "Question",
        "name": "Is there a free 50/30/20 budget calculator with no sign-up?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Yes! Our budget calculator is 100% free to use. There are no subscriptions, registration requirements, or paywalls. It runs securely inside your web browser and respects your privacy by processing all calculation data locally without saving or sharing it."
        }
      }
    ]
  }

  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-zinc-950 text-zinc-900 dark:text-zinc-100 font-[family-name:var(--font-geist-sans)] transition-colors">
      {/* FAQ Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqData) }}
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
            <span className="text-sm font-medium text-zinc-400 dark:text-zinc-600">Budget Calculator</span>
            <span className="text-sm font-medium text-zinc-300 dark:text-zinc-700 font-normal">|</span>
            <ThemeToggle />
          </nav>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-4xl mx-auto px-4 py-8 sm:py-12">
        <Breadcrumbs toolName="Budget Calculator" toolSlug="budget-calculator" />
        
        <div className="text-center max-w-3xl mx-auto mb-8">
          <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-zinc-900 dark:text-white mb-4">
            Budget Calculator (50/30/20 Rule)
          </h1>
          <p className="text-base sm:text-lg text-zinc-600 dark:text-zinc-400 leading-relaxed">
            The 50/30/20 rule is a popular starting framework for budgeting first popularized by Elizabeth Warren in her book <em>All Your Worth: The Ultimate Lifetime Money Plan</em>. Designed to be intuitive and stress-free, it divides your net take-home income into three broad categories: 50% for Needs (must-haves), 30% for Wants (nice-to-haves), and 20% for Savings and debt repayment. This free budget calculator goes beyond generic split-income tools by adding a customizable percentage slider, a side-by-side &ldquo;Reality Check&rdquo; actual-versus-ideal spending comparison, and projection savings tools.
          </p>
        </div>

        <ShareButtons url="https://quickcalc.cloud/tools/budget-calculator" title="Budget Calculator" />
        <EmbedWidget url="https://quickcalc.cloud/tools/budget-calculator" title="Budget Calculator" />

        {/* Interactive Widget */}
        <section className="my-8">
          <BudgetCalculatorWidget />
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
              How the 50/30/20 Budgeting Rule Works for Your Income
            </h2>
            <p className="text-zinc-600 dark:text-zinc-400 leading-relaxed">
              Applying the 50/30/20 strategy means cleanly segmenting your after-tax income. This simplifies monthly financial tracking because you do not have to categorize every minor receipt. Instead, you focus on three high-level targets:
            </p>
            <ul className="list-disc pl-6 text-zinc-600 dark:text-zinc-400 space-y-2">
              <li>
                <strong>Needs (50%):</strong> Crucial bills that cannot be ignored. Examples include rent or mortgage payments, groceries, utilities, basic health/car insurance, and minimum credit card or loan payments.
              </li>
              <li>
                <strong>Wants (30%):</strong> Discretionary purchases that improve your lifestyle but are not survival requirements. Examples include dining out, streaming subscriptions, cinema tickets, gym memberships, premium items, and vacations.
              </li>
              <li>
                <strong>Savings & Debt (20%):</strong> Building assets and eliminating long-term liabilities. Examples include your emergency fund contributions, retirement accounts, index fund investments, and extra principal payments toward debts.
              </li>
            </ul>
            <p className="text-zinc-600 dark:text-zinc-400 leading-relaxed mt-2">
              If you have long-term liabilities to analyze, our specialized <Link href="/tools/loan-calculator" className="text-blue-600 dark:text-blue-400 hover:underline font-semibold">Loan / EMI Calculator</Link> can provide exact amortization and repayment metrics. For shared bills or travel budgets, try our fast <Link href="/tools/group-expense-splitter" className="text-blue-600 dark:text-blue-400 hover:underline font-semibold">Group Expense Splitter</Link> to distribute joint costs seamlessly, or utilize the dynamic formulas of our <Link href="/tools/percentage-calculator" className="text-blue-600 dark:text-blue-400 hover:underline font-semibold">Percentage Calculator</Link> to analyze custom savings and tax margins.
            </p>
          </section>

          <section className="space-y-4 pt-4">
            <h2 className="text-2xl font-bold text-zinc-950 dark:text-white border-b border-zinc-100 dark:border-zinc-900 pb-2">
              Frequently Asked Questions (FAQ)
            </h2>
            <div className="space-y-6">
              
              <div className="space-y-2">
                <h3 className="text-base font-bold text-zinc-900 dark:text-zinc-100">
                  What counts as a "Need" vs a "Want"?
                </h3>
                <p className="text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed">
                  Needs are essential expenses you must pay to survive and maintain basic employment, such as housing (rent or mortgage), groceries, utilities, basic insurance, transportation, and minimum debt payments. Wants are non-essential discretionary expenses you could live without if necessary, such as dining out, streaming services, concert tickets, vacations, premium apparel, and hobbies.
                </p>
              </div>

              <div className="space-y-2">
                <h3 className="text-base font-bold text-zinc-900 dark:text-zinc-100">
                  What should I do if my rent is more than 50% of my income?
                </h3>
                <p className="text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed">
                  If high housing costs push your Needs past 50%, you will need to adjust your split (e.g., to 60/20/20 or 70/20/10) or scale back on discretionary Wants to cover the gap. You can use our customizable slider above to model different percentage targets that fit your specific financial situation.
                </p>
              </div>

              <div className="space-y-2">
                <h3 className="text-base font-bold text-zinc-900 dark:text-zinc-100">
                  Do I use pre-tax or net take-home income for the 50/30/20 rule?
                </h3>
                <p className="text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed">
                  The 50/30/20 rule is designed to be calculated using your after-tax monthly income (also known as net take-home pay). If you have pre-tax deductions for retirement savings (like a 401k) or health insurance, you can either add them back to make your calculations fully consistent, or simply count them toward your 20% savings goal.
                </p>
              </div>

              <div className="space-y-2">
                <h3 className="text-base font-bold text-zinc-900 dark:text-zinc-100">
                  Is the 50/30/20 budgeting rule realistic for low-income earners?
                </h3>
                <p className="text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed">
                  For lower-income households, high fixed costs (housing, utilities, food) often swallow 70% or more of after-tax income, leaving very little for wants or savings. In these cases, a 50/30/20 rule is a great North Star goal, but you may need to temporarily use a customized 70/20/10 or 80/15/5 plan while working to increase income or reduce fixed expenses.
                </p>
              </div>

              <div className="space-y-2">
                <h3 className="text-base font-bold text-zinc-900 dark:text-zinc-100">
                  Where does credit card debt fit in the 50/30/20 budget?
                </h3>
                <p className="text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed">
                  Under the 50/30/20 system, minimum payments required to keep your accounts in good standing (e.g., minimum credit card payments, student loans, car loans) are classified as Needs because failing to pay them carries severe consequences. Extra debt principal repayments or aggressive payoffs, however, are treated as part of your 20% Savings & Debt Repayment category.
                </p>
              </div>

              <div className="space-y-2">
                <h3 className="text-base font-bold text-zinc-900 dark:text-zinc-100">
                  How do I adjust the 50/30/20 budget percentages for my personal savings goals?
                </h3>
                <p className="text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed">
                  Absolutely! Financial situations are highly personal. If you are aggressively paying down high-interest debt or saving for a down payment, you might target a 50/15/35 split. If you live in a high-cost-of-living area, a 60/20/20 split may be much more realistic.
                </p>
              </div>

              <div className="space-y-2">
                <h3 className="text-base font-bold text-zinc-900 dark:text-zinc-100">
                  What is the difference between a 50/30/20 budget and a zero-based budget?
                </h3>
                <p className="text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed">
                  The 50/30/20 rule is a high-level proportional budgeting framework that splits money into three broad buckets with minimal tracking. A zero-based budget is a more granular system where every single dollar of income is assigned to a specific category (e.g., rent, gas, dining, cinema) until the total remaining equals zero.
                </p>
              </div>

              <div className="space-y-2">
                <h3 className="text-base font-bold text-zinc-900 dark:text-zinc-100">
                  Is there a free 50/30/20 budget calculator with no sign-up?
                </h3>
                <p className="text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed">
                  Yes! Our budget calculator is 100% free to use. There are no subscriptions, registration requirements, or paywalls. It runs securely inside your web browser and respects your privacy by processing all calculation data locally without saving or sharing it.
                </p>
              </div>

            </div>
          </section>

        </article>

      <RelatedTools currentSlug="budget-calculator" />
      </main>

      {/* Footer */}
      <Footer customText="Elegant, science-backed lifestyle and chronological suite solutions." />
    </div>
  );
}
