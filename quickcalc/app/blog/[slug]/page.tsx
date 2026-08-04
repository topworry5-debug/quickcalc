import ThemeToggle from "@/components/ThemeToggle";
import { articles } from "../page";
import { notFound } from "next/navigation";
import Link from "next/link";
import Footer from "@/components/Footer";
import type { Metadata } from "next";

// Article Components
import BudgetRuleArticle from "../data/budget-rule-article";
import UsdPkrArticle from "../data/usd-pkr-article";
import ExactAgeArticle from "../data/exact-age-article";
import SplitBillArticle from "../data/split-bill-article";
import PercentageCalculatorArticle from "../data/percentage-calculator-article";
import ShoeSizeArticle from "../data/shoe-size-article";
import BmiArticle from "../data/bmi-article";
import DstTimezoneArticle from "../data/dst-timezone-article";
import PasswordEntropyArticle from "../data/password-entropy-article";
import ZakatCalculationGuideArticle from "../data/zakat-calculation-guide-article";
import CurrencyConversionGuideArticle from "../data/currency-conversion-guide-article";
import AgeCalculatorGuideArticle from "../data/age-calculator-guide-article";
import WaterRuleArticle from "../data/water-rule-article";
import RegexTutorialGuideArticle from "../data/regex-tutorial-guide-article";
import ShareButtons from "@/components/ShareButtons";

interface BlogPostProps {
  params: {
    slug: string;
  };
}

const articleComponents: Record<string, React.ComponentType> = {
  "how-to-write-and-test-regular-expressions-regex-tutorial-guide": RegexTutorialGuideArticle,
  "is-the-8-glasses-a-day-water-rule-actually-true": WaterRuleArticle,
  "how-to-calculate-exact-age-years-months-days": AgeCalculatorGuideArticle,
  "how-currency-conversion-actually-works-avoid-markup-fees": CurrencyConversionGuideArticle,
  "how-to-calculate-zakat-nisab-gold-silver-savings-guide": ZakatCalculationGuideArticle,
  "50-30-20-budget-rule-explained-does-it-actually-work": BudgetRuleArticle,
  "usd-to-pkr-and-understanding-real-exchange-rates": UsdPkrArticle,
  "how-to-calculate-your-exact-age-and-fun-facts-about-your-birth-date": ExactAgeArticle,
  "how-to-split-a-bill-fairly-when-everyone-orders-different-things": SplitBillArticle,
  "how-to-calculate-percentage-increase-decrease-discount": PercentageCalculatorArticle,
  "us-uk-eu-japan-shoe-size-conversion-guide": ShoeSizeArticle,
  "how-to-calculate-bmi-accurately-and-its-limitations": BmiArticle,
  "why-daylight-saving-time-breaks-simple-timezone-math": DstTimezoneArticle,
  "what-makes-a-password-actually-strong-understanding-entropy": PasswordEntropyArticle,
};

export async function generateStaticParams() {
  return articles.map((article) => ({
    slug: article.slug,
  }));
}

export async function generateMetadata({ params }: BlogPostProps): Promise<Metadata> {
  const article = articles.find((a) => a.slug === params.slug);
  if (!article) return {};

  const isNewArticle = article.slug === "how-currency-conversion-actually-works-avoid-markup-fees";
  const isWaterRule = article.slug === "is-the-8-glasses-a-day-water-rule-actually-true";
  const customTitle = isWaterRule
    ? "Is the \"8 Glasses a Day\" Water Rule Actually True? | QuickCalc Insights"
    : isNewArticle
    ? "How Currency Conversion Works & How to Avoid Fees"
    : `${article.title} | QuickCalc Insights`;

  return {
    title: customTitle,
    description: article.description,
    alternates: {
      canonical: `/blog/${article.slug}`,
    },
    openGraph: {
      title: customTitle,
      description: article.description,
      url: `https://quickcalc.cloud/blog/${article.slug}`,
      type: "article",
      publishedTime: isWaterRule
        ? "2026-07-29T00:00:00.000Z"
        : isNewArticle
        ? "2026-07-26T00:00:00.000Z"
        : "2026-07-18T00:00:00.000Z",
      siteName: "QuickCalc",
    },
    twitter: {
      card: "summary_large_image",
      title: customTitle,
      description: article.description,
    },
  };
}

export default function BlogPostPage({ params }: BlogPostProps) {
  const article = articles.find((a) => a.slug === params.slug);
  if (!article) {
    notFound();
  }

  const ArticleBody = articleComponents[article.slug];
  if (!ArticleBody) {
    notFound();
  }

  // Define structured JSON-LD data for the article
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    "headline": article.title,
    "description": article.description,
    "datePublished": article.slug === "is-the-8-glasses-a-day-water-rule-actually-true"
      ? "2026-07-29"
      : article.slug === "how-to-calculate-exact-age-years-months-days"
      ? "2026-07-26"
      : article.slug === "how-currency-conversion-actually-works-avoid-markup-fees"
      ? "2026-07-26"
      : article.slug === "how-to-calculate-zakat-nisab-gold-silver-savings-guide"
      ? "2026-07-24"
      : article.slug === "usd-to-pkr-and-understanding-real-exchange-rates"
      ? "2026-07-24"
      : article.slug === "50-30-20-budget-rule-explained-does-it-actually-work"
      ? "2026-07-24"
      : article.slug === "how-to-calculate-your-exact-age-and-fun-facts-about-your-birth-date"
      ? "2026-07-23"
      : article.slug === "how-to-split-a-bill-fairly-when-everyone-orders-different-things"
      ? "2026-07-22"
      : article.slug === "how-to-calculate-percentage-increase-decrease-discount"
      ? "2026-07-21"
      : article.slug === "how-to-calculate-bmi-accurately-and-its-limitations" 
      ? "2026-07-18" 
      : article.slug === "why-daylight-saving-time-breaks-simple-timezone-math" 
      ? "2026-07-17" 
      : "2026-07-16",
    "dateModified": "2026-07-29",
    "author": {
      "@type": "Organization",
      "name": "QuickCalc",
      "url": "https://quickcalc.cloud",
    },
    "publisher": {
      "@type": "Organization",
      "name": "QuickCalc",
      "logo": {
        "@type": "ImageObject",
        "url": "https://quickcalc.cloud/og-image.png",
      },
    },
    "mainEntityOfPage": {
      "@type": "WebPage",
      "@id": `https://quickcalc.cloud/blog/${article.slug}`,
    },
  };

  // Define structured JSON-LD data for the FAQPage
  const faqJsonLd = article.slug === "is-the-8-glasses-a-day-water-rule-actually-true" ? {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      {
        "@type": "Question",
        "name": "Does coffee or tea count toward daily water intake?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Yes. While caffeine has a mild diuretic effect, the overall fluid from caffeinated beverages still contributes positively to hydration — the old idea that coffee \"doesn't count\" or dehydrates you has largely been debunked by more recent research."
        }
      },
      {
        "@type": "Question",
        "name": "How much water should I drink based on my weight?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "A common estimate is 0.5 to 1 ounce per pound of body weight daily, adjusted upward for exercise, heat, or pregnancy/breastfeeding."
        }
      },
      {
        "@type": "Question",
        "name": "Do I need more water in hot weather?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Yes, significantly more — heat and humidity increase fluid loss through sweat even without physical activity, so daily needs can rise noticeably during summer months or in hot climates."
        }
      },
      {
        "@type": "Question",
        "name": "Is it possible to drink too much water?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "In rare cases, yes — very high water intake in a short period, especially during endurance exercise without electrolyte replacement, can dilute sodium levels. This isn't a concern for typical daily hydration."
        }
      },
      {
        "@type": "Question",
        "name": "What are signs of mild dehydration?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Thirst, darker urine color, fatigue, and headache are common early signs. Urine that's pale yellow is generally a good indicator of adequate hydration."
        }
      }
    ]
  } : article.slug === "how-to-write-and-test-regular-expressions-regex-tutorial-guide" ? {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      {
        "@type": "Question",
        "name": "What does regex actually stand for, and where did it start?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Regex stands for Regular Expression. The concept originated in the 1950s when mathematician Stephen Cole Kleene described regular languages. Today, almost every modern programming language supports it to find and manipulate text patterns."
        }
      },
      {
        "@type": "Question",
        "name": "Is regex considered a full programming language?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "No, regex is not a general-purpose programming language. It is a specialized, domain-specific pattern-matching language designed solely for parsing and manipulating text within other hosting environments and languages."
        }
      },
      {
        "@type": "Question",
        "name": "What is the key difference between the asterisk (*) and plus (+) quantifiers?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "The asterisk matches the preceding element zero or more times, making it completely optional. The plus quantifier requires the preceding element to appear at least once, matching it one or more times."
        }
      },
      {
        "@type": "Question",
        "name": "How can I search for a literal period (.) or asterisk (*) without triggering their wildcards?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "You must escape them by putting a backslash before them, like \\. or \\*. This tells the regex engine to treat them as plain text characters rather than special operators."
        }
      },
      {
        "@type": "Question",
        "name": "Are regular expressions case-sensitive by default?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Yes, they are case-sensitive. Searching for 'cat' will ignore 'Cat'. To match regardless of case, you need to append the 'i' flag to your regular expression."
        }
      },
      {
        "@type": "Question",
        "name": "Can using bad regex patterns slow down my application?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Yes, highly nested quantifiers like (a+)+ can cause 'catastrophic backtracking' in complex strings. This happens when the engine tries millions of potential matches, spiking CPU usage."
        }
      }
    ]
  } : null;

  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-zinc-950 text-zinc-900 dark:text-zinc-100 font-[family-name:var(--font-geist-sans)] transition-colors">
      {/* Article Schema Injection */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* FAQ Schema Injection */}
      {faqJsonLd && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
        />
      )}

      {/* Navigation Header */}
      <header className="border-b border-zinc-200 dark:border-zinc-800 bg-white/80 dark:bg-zinc-900/80 backdrop-blur-md sticky top-0 z-50 transition-colors">
        <div className="max-w-5xl mx-auto px-4 h-16 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2 font-bold text-lg text-zinc-900 dark:text-white">
            <span>✨ QuickCalc</span>
          </Link>
          <div className="flex items-center gap-4">
            <Link href="/" className="text-sm font-medium text-zinc-600 dark:text-zinc-400 hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors">
              Home
            </Link>
            <span className="text-sm font-medium text-zinc-300 dark:text-zinc-700 font-normal">|</span>
            <Link href="/blog" className="text-sm font-medium text-zinc-600 dark:text-zinc-400 hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors">
              Blog
            </Link>
            <span className="text-sm font-medium text-zinc-300 dark:text-zinc-700 font-normal">|</span>
            <div className="text-sm font-medium text-zinc-500 dark:text-zinc-400 max-w-[150px] truncate hidden sm:block">
              {article.title}
            </div>
            <span className="text-sm font-medium text-zinc-300 dark:text-zinc-700 font-normal hidden sm:inline">|</span>
            <ThemeToggle />
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-4xl mx-auto px-4 py-12 sm:py-16">
        {/* Back Link */}
        <div className="mb-8">
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 text-sm font-semibold text-emerald-600 dark:text-emerald-400 hover:underline"
          >
            &larr; Back to all articles
          </Link>
        </div>

        {/* Article Meta Header */}
        <header className="mb-12 border-b border-zinc-200 dark:border-zinc-800 pb-8">
          <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-xs font-semibold text-zinc-500 dark:text-zinc-400 mb-4">
            <span className={`${article.textColor} uppercase tracking-wider`}>{article.category}</span>
            <span className="text-zinc-300 dark:text-zinc-700">•</span>
            <span>Published: {article.date}</span>
            <span className="text-zinc-300 dark:text-zinc-700">•</span>
            <span className="font-semibold text-zinc-700 dark:text-zinc-300">Last updated: July 24, 2026</span>
            <span className="text-zinc-300 dark:text-zinc-700">•</span>
            <span>{article.readTime}</span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-zinc-900 dark:text-white leading-tight mb-6">
            {article.title}
          </h1>

          <p className="text-lg sm:text-xl text-zinc-600 dark:text-zinc-400 leading-relaxed font-medium">
            {article.description}
          </p>
        </header>

        {/* Article Body */}
        <article className="prose prose-zinc dark:prose-invert max-w-none space-y-6 text-zinc-700 dark:text-zinc-300 leading-relaxed">
          <ArticleBody />
        </article>

        {/* Share Buttons Component */}
        <div className="mt-12 pt-8 border-t border-zinc-200 dark:border-zinc-800">
          <ShareButtons url={`https://quickcalc.cloud/blog/${article.slug}`} title={article.title} />
        </div>

        {/* Action Bottom Nav */}
        <div className="border-t border-zinc-200 dark:border-zinc-800 mt-16 pt-8 text-center sm:text-left flex flex-col sm:flex-row justify-between items-center gap-4">
          <Link
            href="/blog"
            className="text-sm font-semibold text-zinc-500 hover:text-zinc-900 dark:hover:text-white"
          >
            &larr; Back to all articles
          </Link>

          <Link
            href="/"
            className="text-sm font-semibold text-emerald-600 dark:text-emerald-400 hover:underline"
          >
            Explore our clinical and financial tools &rarr;
          </Link>
        </div>
      </main>

      {/* Footer */}
      <Footer customText="Practical science breakdowns, mathematical modeling." />
    </div>
  );
}
