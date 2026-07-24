import ThemeToggle from "@/components/ThemeToggle";
import Breadcrumbs from "@/components/Breadcrumbs";
import type { Metadata } from "next";
import Link from "next/link";
import CurrencyConverterWidget from "./CurrencyConverterWidget";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "Currency Converter - Live Exchange Rates for 35+ Currencies | QuickCalc",
  description: "Convert 35+ currencies with live, real-time exchange rates. Free online converter supporting USD to PKR, EUR, GBP, INR, and more with instant results.",
  alternates: {
    canonical: "/tools/currency-converter",
  },
  openGraph: {
    title: "Currency Converter - Live Exchange Rates for 35+ Currencies | QuickCalc",
    description: "Convert 35+ currencies with live, real-time exchange rates. Free online converter supporting USD to PKR, EUR, GBP, INR, and more with instant results.",
    url: "https://quickcalc.cloud/tools/currency-converter",
    type: "website",
    siteName: "QuickCalc",
    images: [
      {
        url: "https://quickcalc.cloud/og-image.png",
        width: 1200,
        height: 630,
        alt: "Currency Converter on QuickCalc",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Currency Converter - Live Exchange Rates for 35+ Currencies | QuickCalc",
    description: "Convert 35+ currencies with live, real-time exchange rates. Free online converter supporting USD to PKR, EUR, GBP, INR, and more with instant results.",
    images: ["https://quickcalc.cloud/og-image.png"],
  },
};

export default function CurrencyConverterPage() {
  const faqData = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      {
        "@type": "Question",
        "name": "What is the current USD to PKR exchange rate?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "The USD to PKR exchange rate changes continuously. Please check the interactive converter widget at the top of this page to view the live, real-time rate for USD to PKR and 35+ other major world currencies."
        }
      },
      {
        "@type": "Question",
        "name": "How often are exchange rates updated?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Our live currency exchange rates are updated frequently throughout the day using reliable client-side feeds. You can see the exact 'Rates updated' timestamp under the converter input fields."
        }
      },
      {
        "@type": "Question",
        "name": "Why is the rate my bank gives different from what I see online?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Banks and money transfer companies typically add a markup or retail spread to the mid-market rate to cover their service fees and earn a profit. This retail exchange rate is more expensive than the interbank rate."
        }
      },
      {
        "@type": "Question",
        "name": "What is a mid-market exchange rate?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "The mid-market rate (also known as the interbank rate) is the exact midpoint between the buy and sell prices of two currencies on global markets. It represents the real, raw rate without any bank markups."
        }
      },
      {
        "@type": "Question",
        "name": "Is this currency converter free to use?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Yes, our currency converter is 100% free with no registration, subscriptions, or API keys required. It's built to provide rapid rates for travelers, freelancers, and businesses."
        }
      },
      {
        "@type": "Question",
        "name": "Can I convert cryptocurrency here?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "No, this calculator is specifically designed for fiat currencies (government-backed legal tender like USD, EUR, GBP, INR, PKR, etc.) and does not support cryptocurrencies such as Bitcoin or Ethereum."
        }
      },
      {
        "@type": "Question",
        "name": "Which currencies are supported?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "We support over 35 of the most widely traded global currencies, including the United States Dollar (USD), Euro (EUR), British Pound (GBP), Pakistani Rupee (PKR), Indian Rupee (INR), UAE Dirham (AED), Saudi Riyal (SAR), Canadian Dollar (CAD), and Australian Dollar (AUD)."
        }
      },
      {
        "@type": "Question",
        "name": "How accurate are the exchange rates shown?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "The rates are highly accurate and fetched directly from standard interbank market feeds. However, they should be used as real-time guides rather than absolute transaction guarantees, as retail brokers apply custom spreads."
        }
      }
    ]
  };

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
            <span className="text-sm font-medium text-zinc-400 dark:text-zinc-600">Currency Converter</span>
            <span className="text-sm font-medium text-zinc-300 dark:text-zinc-700 font-normal">|</span>
            <ThemeToggle />
          </nav>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-4xl mx-auto px-4 py-8 sm:py-12">
        <Breadcrumbs toolName="Currency Converter" toolSlug="currency-converter" />
        
        <div className="text-center max-w-3xl mx-auto mb-8">
          <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-zinc-900 dark:text-white mb-4">
            Live Currency Converter
          </h1>
          <p className="text-base sm:text-lg text-zinc-600 dark:text-zinc-400 leading-relaxed">
            Exchanging currencies is highly critical for international travel, sending remittances to family, online shopping at global stores, and managing freelance payments. To protect your hard-earned funds, knowing the real interbank rates is absolutely essential. This interactive currency converter fetches real-time exchange rates to provide instant calculations as you type. Simply pick your currencies, enter an amount, compare common amounts, and copy clean, formatted results to share with friends, clients, or colleagues!
          </p>
        </div>

        {/* Interactive Widget */}
        <section className="my-8">
          <CurrencyConverterWidget />
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
              How exchange rates work
            </h2>
            <p className="text-zinc-600 dark:text-zinc-400 leading-relaxed">
              Currency exchange rates fluctuate constantly based on global market demand, central bank policies, inflation rates, and geopolitical stability. The rate you see represented in standard financial search results is the <strong>mid-market rate</strong> (interbank rate)—the actual midpoint between wholesale buyers and sellers of currency.
            </p>
            <p className="text-zinc-600 dark:text-zinc-400 leading-relaxed">
              When transferring money through a retail bank, credit card, or brick-and-mortar airport kiosk, you will notice the rate offered is less favorable. This difference is caused by retail markups. Banks package their operational fees directly into the exchange rate, making conversions more expensive. Utilizing our tool helps you discover the interbank benchmark so you can compare service charges and demand better deals.
            </p>
            <p className="text-zinc-600 dark:text-zinc-400 leading-relaxed">
              While traveling or dining globally, checking tipping norms is also crucial. Be sure to check our responsive <Link href="/tools/tip-calculator" className="text-blue-600 dark:text-blue-400 hover:underline font-semibold">Tip Calculator</Link> to split bills easily. If you are calculating commercial loans or personal interest charges, use our comprehensive <Link href="/tools/loan-calculator" className="text-blue-600 dark:text-blue-400 hover:underline font-semibold">Loan / EMI Calculator</Link> to generate full repayment schedules, or explore our versatile <Link href="/tools/percentage-calculator" className="text-blue-600 dark:text-blue-400 hover:underline font-semibold">Percentage Calculator</Link> to manage business margins and financial proportions.
            </p>
          </section>

          <section className="space-y-4 pt-4">
            <h2 className="text-2xl font-bold text-zinc-950 dark:text-white border-b border-zinc-100 dark:border-zinc-900 pb-2">
              Frequently Asked Questions (FAQ)
            </h2>
            <div className="space-y-6">
              
              <div className="space-y-2">
                <h3 className="text-base font-bold text-zinc-900 dark:text-zinc-100">
                  What is the current USD to PKR exchange rate?
                </h3>
                <p className="text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed">
                  The USD to PKR exchange rate changes continuously in real-time. To see the exact current rate, please check our live converter widget at the top of this page, which provides interbank updates instantly.
                </p>
              </div>

              <div className="space-y-2">
                <h3 className="text-base font-bold text-zinc-900 dark:text-zinc-100">
                  How often are exchange rates updated?
                </h3>
                <p className="text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed">
                  Our live rate feeds are fetched client-side multiple times throughout the business day from reputable interbank data providers. We display a transparent timestamp indicating exactly when the active rates were last fetched.
                </p>
              </div>

              <div className="space-y-2">
                <h3 className="text-base font-bold text-zinc-900 dark:text-zinc-100">
                  Why is the rate my bank gives different from what I see online?
                </h3>
                <p className="text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed">
                  Retail banks, wire transfer services, and PayPal insert a hidden markup to standard interbank rates. This spread, combined with front-end transaction fees, ensures they generate revenue from currency handling.
                </p>
              </div>

              <div className="space-y-2">
                <h3 className="text-base font-bold text-zinc-900 dark:text-zinc-100">
                  What is a mid-market exchange rate?
                </h3>
                <p className="text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed">
                  The mid-market rate represents the genuine rate traded between banks on global interbank exchanges. It stands as the absolute average point between bidding and asking rates globally, making it the fairest baseline available.
                </p>
              </div>

              <div className="space-y-2">
                <h3 className="text-base font-bold text-zinc-900 dark:text-zinc-100">
                  Is this currency converter free to use?
                </h3>
                <p className="text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed">
                  Absolutely! Our tool is completely open-access and free to use. There are no limits on searches, no sign-ups required, and no premiums applied.
                </p>
              </div>

              <div className="space-y-2">
                <h3 className="text-base font-bold text-zinc-900 dark:text-zinc-100">
                  Can I convert cryptocurrency here?
                </h3>
                <p className="text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed">
                  No, our currency converter focuses exclusively on international fiat currencies (e.g., USD, EUR, INR, PKR, etc.). We do not support cryptocurrency pairs like BTC, ETH, or USDT at this time.
                </p>
              </div>

              <div className="space-y-2">
                <h3 className="text-base font-bold text-zinc-900 dark:text-zinc-100">
                  Which currencies are supported?
                </h3>
                <p className="text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed">
                  We support 35+ major world currencies including the US Dollar (USD), Euro (EUR), Pound Sterling (GBP), Indian Rupee (INR), Pakistani Rupee (PKR), UAE Dirham (AED), Saudi Riyal (SAR), Canadian Dollar (CAD), Australian Dollar (AUD), and Japanese Yen (JPY).
                </p>
              </div>

              <div className="space-y-2">
                <h3 className="text-base font-bold text-zinc-900 dark:text-zinc-100">
                  How accurate are the exchange rates shown?
                </h3>
                <p className="text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed">
                  Our exchange rates match real-time financial interbank feeds. Note that due to processing times, standard delays may occasionally apply, and they should be utilized primarily for general budgeting and reference.
                </p>
              </div>

            </div>
          </section>

        </article>

      </main>

      {/* Footer */}
      <Footer customText="Elegant, science-backed lifestyle and currency management solutions." />
    </div>
  );
}
