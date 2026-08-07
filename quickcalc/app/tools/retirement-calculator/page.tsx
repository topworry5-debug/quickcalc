import Navbar from "@/components/Navbar";
import { generateSoftwareAppSchema } from "@/lib/schema";
import RelatedTools from "@/components/RelatedTools";
import ShareButtons from "@/components/ShareButtons";
import EmbedWidget from "@/components/EmbedWidget";
import Breadcrumbs from "@/components/Breadcrumbs";
import type { Metadata } from "next";
import Link from "next/link";
import RetirementCalculatorWidget from "./RetirementCalculatorWidget";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "Retirement Calculator: See Your Savings Grow",
  description: "Calculate your retirement savings with compound growth. Model monthly deposits, return rates, and compare starting 5 years earlier vs later instantly.",
  alternates: {
    canonical: "/tools/retirement-calculator",
  },
  openGraph: {
    title: "Retirement Calculator: See Your Savings Grow (No Sign-Up)",
    description: "Calculate your retirement savings with compound growth. Model monthly deposits, return rates, and compare starting 5 years earlier vs later instantly.",
    url: "https://quickcalc.cloud/tools/retirement-calculator",
    type: "website",
    siteName: "QuickCalc",
    images: [
      {
        url: "https://quickcalc.cloud/og-image.png",
        width: 1200,
        height: 630,
        alt: "Retirement Calculator on QuickCalc",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Retirement Calculator: See Your Savings Grow (No Sign-Up)",
    description: "Calculate your retirement savings with compound growth. Model monthly deposits, return rates, and compare starting 5 years earlier vs later instantly.",
    images: ["https://quickcalc.cloud/og-image.png"],
  },
};

export default function RetirementCalculatorPage({ searchParams }: { searchParams?: { embed?: string } }) {
  const softwareSchema = generateSoftwareAppSchema({
    name: "Retirement Calculator: See Your Savings Grow",
    description: "Calculate your retirement savings with compound growth. Model monthly deposits, return rates, and compare starting 5 years earlier vs later instantly.",
    slug: "retirement-calculator",
    category: "Utility"
  });

  const isEmbed = searchParams?.embed === "true";
  if (isEmbed) {
    return (
      <div className="min-h-screen bg-white dark:bg-zinc-950 text-zinc-900 dark:text-zinc-100 font-[family-name:var(--font-geist-sans)] transition-colors p-2 flex flex-col justify-between">
      {/* WebApplication JSON-LD Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(softwareSchema) }}
      />

        <main className="max-w-4xl mx-auto w-full">
          <RetirementCalculatorWidget />
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
        "name": "How much should I save for retirement each month?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Financial planners generally recommend saving 15% of your gross annual income for retirement, including any employer matching funds. If saving 15% feels unreachable right now, start with whatever monthly amount fits your budget and increase your contribution by 1% to 2% each year as your income grows."
        }
      },
      {
        "@type": "Question",
        "name": "What is a realistic rate of return for retirement savings?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "A 6% to 8% annual return rate is a realistic long-term estimate for a diversified portfolio invested primarily in index funds, based on historical stock market averages. Because real market returns fluctuate year to year, using an inflation-adjusted rate of 6% or 7% provides a conservative baseline for retirement planning."
        }
      },
      {
        "@type": "Question",
        "name": "Does starting 5 years earlier really make a big difference?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Yes, starting your retirement savings five years earlier makes a massive financial difference because it gives your money five extra years of exponential compound growth. In many cases, those five extra years allow investment returns to generate more wealth than all of your out-of-pocket contributions combined."
        }
      },
      {
        "@type": "Question",
        "name": "How is compound growth calculated for retirement savings?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Compound growth calculates investment returns on your starting balance plus all previous interest and monthly contributions. The compounding formula multiplies your balance by your monthly return rate each period, causing your total savings to accelerate faster in later decades."
        }
      },
      {
        "@type": "Question",
        "name": "Is this calculator connected to my bank or investment accounts?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "No, this calculator does not connect to your bank accounts, financial institutions, or personal identity. All calculations happen instantly inside your web browser, providing a completely private and secure way to test different retirement scenarios without creating an account."
        }
      },
      {
        "@type": "Question",
        "name": "What's the difference between this and a 401(k) calculator?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "This retirement calculator focuses on general compound growth across all account types, including traditional 401(k)s, Roth IRAs, brokerage accounts, and personal savings. Unlike specialized 401(k) tools that model employer vesting rules or tax deductions, this calculator provides a clean, universal view of total wealth accumulation."
        }
      }
    ]
  };

  const articleData = {
    "@context": "https://schema.org",
    "@type": "Article",
    "headline": "Retirement Calculator: See Your Savings Grow (No Sign-Up Required)",
    "description": "Calculate and analyze compound interest retirement growth. Visualize your contributions vs growth earned and compare starting earlier vs later.",
    "publisher": {
      "@type": "Organization",
      "name": "QuickCalc",
      "logo": {
        "@type": "ImageObject",
        "url": "https://quickcalc.cloud/og-image.png"
      }
    }
  };

  const softwareData = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    "name": "Retirement Calculator",
    "operatingSystem": "All",
    "applicationCategory": "FinanceApplication",
    "offers": {
      "@type": "Offer",
      "price": "0",
      "priceCurrency": "USD"
    }
  };

  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-zinc-950 text-zinc-900 dark:text-zinc-100 font-[family-name:var(--font-geist-sans)] transition-colors">
      {/* Structured Data Scripts */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqData) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleData) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(softwareData) }}
      />

      {/* Header */}
      <Navbar />

      {/* Main Content */}
      <main className="max-w-4xl mx-auto px-4 py-8 sm:py-12">
        <Breadcrumbs toolName="Retirement Calculator" toolSlug="retirement-calculator" />
        
        <div className="text-center max-w-2xl mx-auto mb-8">
          <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-zinc-900 dark:text-white mb-4">
            Retirement Calculator: See Your Savings Grow (No Sign-Up Required)
          </h1>

          {/* AI-extractable direct answer summary */}
          <p className="text-sm sm:text-base font-semibold text-teal-700 dark:text-teal-300 bg-teal-500/5 border border-teal-500/20 rounded-xl px-4 py-3 leading-relaxed mb-4 text-left">
            This free tool calculates projected retirement savings growth and compound interest accumulation based on initial savings and monthly contributions.
          </p>
          
          {/* Direct-answer paragraph (50-70 words) immediately after H1 */}
          <p className="text-base sm:text-lg text-zinc-600 dark:text-zinc-400 leading-relaxed font-semibold max-w-2xl mx-auto border-l-4 border-emerald-500 pl-4 text-left">
            This retirement calculator estimates your future net worth at retirement by compounding your existing savings and monthly contributions over time. Because compound interest continuously generates returns on previously earned growth, starting your retirement contributions five years earlier often creates a larger final nest egg than contributing significantly higher monthly amounts later in life, making early consistency the single most effective strategy in wealth building.
          </p>
        </div>

        <ShareButtons url="https://quickcalc.cloud/tools/retirement-calculator" title="Retirement Calculator" />
        <EmbedWidget url="https://quickcalc.cloud/tools/retirement-calculator" title="Retirement Calculator" />

        {/* The interactive widget */}
        <section className="my-8">
          <RetirementCalculatorWidget />
        </section>

        {/* Ad Placement 1 */}
        <div className="ad-slot ad-slot--inline" data-ad-position="in-content-1">
          <div className="ad-placeholder-label border border-dashed border-zinc-300 dark:border-zinc-800 rounded-xl py-4 flex items-center justify-center bg-zinc-50/50 dark:bg-zinc-950/20 text-[10px] font-bold text-zinc-400 dark:text-zinc-600 uppercase tracking-widest cursor-default">
            Advertisement
          </div>
        </div>

        {/* Detailed Explanation Section (~600 words) */}
        <article className="prose prose-zinc dark:prose-invert max-w-3xl mx-auto space-y-8 mt-12 border-t border-zinc-200 dark:border-zinc-800 pt-10">
          <section className="space-y-4">
            <h2 className="text-2xl font-bold text-zinc-950 dark:text-white">
              About Our Compound Growth Retirement Calculator
            </h2>
            <p className="text-zinc-600 dark:text-zinc-400 leading-relaxed">
              Planning for retirement shouldn&apos;t require handing over your personal email, phone number, or bank credentials. Most corporate retirement dashboards demand full account linking before showing you a basic projection. We built this tool to give you an instant, visual answer without any logins, forms, or privacy trade-offs. You put your numbers in, and you see your compounding curve right away.
            </p>
            <p className="text-zinc-600 dark:text-zinc-400 leading-relaxed">
              At its core, this calculator relies on standard compound growth formulas applied on a monthly schedule. When you save for retirement over 20, 30, or 40 years, your money doesn&apos;t just accumulate through your own monthly deposits. Each dollar you earn in investment returns gets added to your principal balance, where it begins earning its own returns during the next month. In the early years of saving, your balance grows slowly because your contributions make up almost all of the total. But as time passes, the growth curve bends upward sharply. By your final decade of saving, your annual investment growth frequently eclipses your annual contributions.
            </p>
            <p className="text-zinc-600 dark:text-zinc-400 leading-relaxed">
              That compounding curve explains why starting early matters so much more than trying to catch up later. Notice the &ldquo;What-If&rdquo; comparison inside the calculator. If a 30-year-old saves $500 a month until age 65 at a 7% return rate, they&apos;ll accumulate roughly $828,000 at retirement. If that same person starts just five years earlier at age 25, their total jumps to over $1,195,000. Those extra five years of early compounding generate nearly $367,000 in additional wealth, even though they only put in $30,000 more in actual out-of-pocket deposits. On the flip side, delaying five years until age 35 drops the final total down to about $565,000—a loss of more than $260,000.
            </p>
            <p className="text-zinc-600 dark:text-zinc-400 leading-relaxed">
              The default 7% annual return rate used here reflects the historical long-term average return of broad stock market index funds after adjusting for inflation. It&apos;s a sensible benchmark for multi-decade planning, but real market returns fluctuate year to year. You will experience bull markets with 20% gains and bear markets with temporary drops. The rate is an estimated average, not a guaranteed promise.
            </p>
            <p className="text-zinc-600 dark:text-zinc-400 leading-relaxed">
              If you&apos;re still figuring out how much you can afford to invest each month after paying taxes and bills, check our <Link href="/tools/salary-take-home-calculator" className="text-emerald-600 dark:text-emerald-400 font-semibold hover:underline">Salary Take-Home Calculator</Link> to analyze your net paycheck. If you&apos;re saving for a shorter-term goal like a house down payment or emergency fund instead of retirement, try our <Link href="/tools/savings-growth-calculator" className="text-emerald-600 dark:text-emerald-400 font-semibold hover:underline">Savings Growth Calculator</Link> to map out specific savings targets.
            </p>
          </section>

          {/* Ad Placement 2 */}
          <div className="ad-slot ad-slot--inline" data-ad-position="in-content-2">
            <div className="ad-placeholder-label border border-dashed border-zinc-300 dark:border-zinc-800 rounded-xl py-4 flex items-center justify-center bg-zinc-50/50 dark:bg-zinc-950/20 text-[10px] font-bold text-zinc-400 dark:text-zinc-600 uppercase tracking-widest cursor-default">
              Advertisement
            </div>
          </div>

          {/* FAQ Section */}
          <section className="space-y-4 border-t border-zinc-200 dark:border-zinc-800 pt-8">
            <h2 className="text-2xl font-bold text-zinc-950 dark:text-white border-b border-zinc-100 dark:border-zinc-900 pb-2">
              Frequently Asked Questions (FAQ)
            </h2>
            <div className="space-y-6">
              <div className="space-y-2">
                <h3 className="text-base font-bold text-zinc-900 dark:text-zinc-100">
                  How much should I save for retirement each month?
                </h3>
                <p className="text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed">
                  Financial planners generally recommend saving 15% of your gross annual income for retirement, including any employer matching funds. If saving 15% feels unreachable right now, start with whatever monthly amount fits your budget and increase your contribution by 1% to 2% each year as your income grows.
                </p>
              </div>

              <div className="space-y-2">
                <h3 className="text-base font-bold text-zinc-900 dark:text-zinc-100">
                  What is a realistic rate of return for retirement savings?
                </h3>
                <p className="text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed">
                  A 6% to 8% annual return rate is a realistic long-term estimate for a diversified portfolio invested primarily in index funds, based on historical stock market averages. Because real market returns fluctuate year to year, using an inflation-adjusted rate of 6% or 7% provides a conservative baseline for retirement planning.
                </p>
              </div>

              <div className="space-y-2">
                <h3 className="text-base font-bold text-zinc-900 dark:text-zinc-100">
                  Does starting 5 years earlier really make a big difference?
                </h3>
                <p className="text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed">
                  Yes, starting your retirement savings five years earlier makes a massive financial difference because it gives your money five extra years of exponential compound growth. In many cases, those five extra years allow investment returns to generate more wealth than all of your out-of-pocket contributions combined.
                </p>
              </div>

              <div className="space-y-2">
                <h3 className="text-base font-bold text-zinc-900 dark:text-zinc-100">
                  How is compound growth calculated for retirement savings?
                </h3>
                <p className="text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed">
                  Compound growth calculates investment returns on your starting balance plus all previous interest and monthly contributions. The compounding formula multiplies your balance by your monthly return rate each period, causing your total savings to accelerate faster in later decades.
                </p>
              </div>

              <div className="space-y-2">
                <h3 className="text-base font-bold text-zinc-900 dark:text-zinc-100">
                  Is this calculator connected to my bank or investment accounts?
                </h3>
                <p className="text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed">
                  No, this calculator does not connect to your bank accounts, financial institutions, or personal identity. All calculations happen instantly inside your web browser, providing a completely private and secure way to test different retirement scenarios without creating an account.
                </p>
              </div>

              <div className="space-y-2">
                <h3 className="text-base font-bold text-zinc-900 dark:text-zinc-100">
                  What&apos;s the difference between this and a 401(k) calculator?
                </h3>
                <p className="text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed">
                  This retirement calculator focuses on general compound growth across all account types, including traditional 401(k)s, Roth IRAs, brokerage accounts, and personal savings. Unlike specialized 401(k) tools that model employer vesting rules or tax deductions, this calculator provides a clean, universal view of total wealth accumulation.
                </p>
              </div>
            </div>
          </section>
        </article>

        {/* Related Tools */}
        <RelatedTools currentSlug="retirement-calculator" />

        {/* Ad Placement Footer */}
        <div className="ad-slot ad-slot--footer mt-12" data-ad-position="footer">
          <div className="ad-placeholder-label border border-dashed border-zinc-300 dark:border-zinc-800 rounded-xl py-4 flex items-center justify-center bg-zinc-50/50 dark:bg-zinc-950/20 text-[10px] font-bold text-zinc-400 dark:text-zinc-600 uppercase tracking-widest cursor-default">
            Advertisement
          </div>
        </div>
      </main>

      {/* Footer */}
      <Footer customText="Instant, private retirement compound growth projections." />
    </div>
  );
}
