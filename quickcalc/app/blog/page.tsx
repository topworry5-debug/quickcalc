import ThemeToggle from "@/components/ThemeToggle";
import type { Metadata } from "next";
import Link from "next/link";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "Insights Blog - Practical Guides, Science & Math Behind Tools | QuickCalc",
  description: "Explore in-depth, well-researched articles exploring health modeling, physical fitness metrics, cryptographic security, password entropy, and global timezone mechanics.",
  alternates: {
    canonical: "/blog",
  },
};

export const articles = [
  {
    slug: "how-to-calculate-your-exact-age-and-fun-facts-about-your-birth-date",
    title: "How to Calculate Your Exact Age (And Fun Facts You Didn't Know About Your Birth Date)",
    description: "Learn how to calculate your exact age in years, months, and days, plus discover your zodiac sign, generation, and how many days you've actually been alive — with a free calculator that does it all instantly.",
    excerpt: "Learn how to calculate your exact age in years, months, and days, plus discover your zodiac sign, generation, and how many days you've actually been alive — with a free calculator that does it all instantly.",
    date: "July 23, 2026",
    readTime: "5 min read",
    category: "Life & Math",
    icon: "🎂",
    color: "from-pink-500 to-rose-600",
    textColor: "text-rose-600 dark:text-rose-400",
  },
  {
    slug: "how-to-split-a-bill-fairly-when-everyone-orders-different-things",
    title: "How to Split a Bill Fairly When Everyone Ordered Something Different",
    description: "Splitting the bill equally isn't always fair. Here's how to split expenses properly when people order different amounts — plus a free tool that does the math for you.",
    excerpt: "Splitting the bill equally isn't always fair. Here's how to split expenses properly when people order different amounts — plus a free tool that does the math for you.",
    date: "July 22, 2026",
    readTime: "4 min read",
    category: "Finance & Math",
    icon: "💵",
    color: "from-teal-500 to-emerald-600",
    textColor: "text-teal-600 dark:text-teal-400",
  },
  {
    slug: "how-to-calculate-percentage-increase-decrease-discount",
    title: "How to Calculate Percentage Increase, Decrease & Discounts (The Easy Way)",
    description: "Confused by percentage math? Learn how to calculate percentage increase, decrease, and discounts step by step, with real examples you'll actually use — no formulas to memorize.",
    excerpt: "Confused by percentage math? Learn how to calculate percentage increase, decrease, and discounts step by step, with real examples you'll actually use — no formulas to memorize.",
    date: "July 21, 2026",
    readTime: "5 min read",
    category: "Finance & Math",
    icon: "📊",
    color: "from-indigo-500 to-purple-600",
    textColor: "text-indigo-600 dark:text-indigo-400",
  },
  {
    slug: "us-uk-eu-japan-shoe-size-conversion-guide",
    title: "US vs UK vs EU vs Japan Shoe Sizes: The Complete Conversion Guide",
    description: "Convert shoe sizes between US, UK, EU, and Japan with our complete international shoe size guide. Learn formulas, sizing histories, and avoid shopping mistakes.",
    excerpt: "Sizing systems vary wildly across the globe. From historical barleycorns in the US and UK to Paris points in Europe and exact centimeters in Japan, learn how to convert shoe sizes accurately and avoid expensive online shopping mistakes.",
    date: "July 20, 2026",
    readTime: "9 min read",
    category: "Utility & Shopping",
    icon: "👟",
    color: "from-amber-500 to-orange-600",
    textColor: "text-amber-600 dark:text-amber-400",
  },
  {
    slug: "how-to-calculate-bmi-accurately-and-its-limitations",
    title: "How to Calculate BMI Accurately (And Its Limitations)",
    description: "Learn how to compute your Body Mass Index (BMI) precisely with standard equations, and understand the biological limits of BMI in clinical and athletic settings.",
    excerpt: "Body Mass Index (BMI) is a universal standard for assessing physical mass ranges. However, standard calculation methods have biological limitations. Learn how to calculate BMI accurately, and when to look for alternative health metrics.",
    date: "July 18, 2026",
    readTime: "5 min read",
    category: "Health & Fitness",
    icon: "⚖️",
    color: "from-emerald-500 to-teal-600",
    textColor: "text-emerald-600 dark:text-emerald-400",
  },
  {
    slug: "why-daylight-saving-time-breaks-simple-timezone-math",
    title: "Why Daylight Saving Time Breaks Simple Timezone Math",
    description: "An in-depth look at how Daylight Saving Time (DST) complicates global meeting coordination, why UTC offsets shift, and how to program timezone math without errors.",
    excerpt: "Coordinating meetings across timezones seems simple until Daylight Saving Time (DST) enters the picture. Learn the science behind DST transitions, why simple UTC offsets fail, and how modern meeting planners solve DST complexity.",
    date: "July 17, 2026",
    readTime: "6 min read",
    category: "Time & Productivity",
    icon: "⏰",
    color: "from-blue-500 to-indigo-600",
    textColor: "text-blue-600 dark:text-blue-400",
  },
  {
    slug: "what-makes-a-password-actually-strong-understanding-entropy",
    title: "What Makes a Password Actually Strong? Understanding Entropy",
    description: "Unpack the math behind password strength, learn how information entropy determines brute-force resistance, and discover why length always beats complexity.",
    excerpt: "Is 'P@ssw0rd123!' actually secure? Spoilers: No. Discover the mathematical concept of password entropy, how brute-force algorithms guess your secrets, and how to construct passwords that are easy to remember but impossible to crack.",
    date: "July 16, 2026",
    readTime: "5 min read",
    category: "Security",
    icon: "🔐",
    color: "from-rose-500 to-pink-600",
    textColor: "text-rose-600 dark:text-rose-400",
  },
];

export default function BlogListingPage() {
  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-zinc-950 text-zinc-900 dark:text-zinc-100 font-[family-name:var(--font-geist-sans)] transition-colors">
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
            <div className="text-sm font-medium text-zinc-500 dark:text-zinc-400">
              Blog
            </div>
            <span className="text-sm font-medium text-zinc-300 dark:text-zinc-700 font-normal">|</span>
            <ThemeToggle />
          </div>
        </div>
      </header>

      {/* Main Container */}
      <main className="max-w-4xl mx-auto px-4 py-16 sm:py-20">
        {/* Page Title Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="px-3 py-1 text-xs font-bold rounded-full bg-emerald-100 dark:bg-emerald-950/50 text-emerald-800 dark:text-emerald-400 border border-emerald-200/50 dark:border-emerald-900/30">
            QuickCalc Insights
          </span>
          <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight text-zinc-900 dark:text-white mt-4 mb-6">
            The Science & Math Behind <span className="bg-gradient-to-r from-emerald-500 via-blue-500 to-indigo-500 bg-clip-text text-transparent">Everyday Calculation</span>
          </h1>
          <p className="text-lg text-zinc-600 dark:text-zinc-400 leading-relaxed">
            In-depth engineering insights, scientific explanations, and practical breakdowns of our primary calculators. Learn how we model algorithms to help you make informed biological, financial, and temporal decisions.
          </p>
        </div>

        {/* Article Grid / Listing */}
        <div className="space-y-10">
          {articles.map((article) => (
            <article
              key={article.slug}
              className="group bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-3xl p-6 sm:p-8 hover:border-zinc-300 dark:hover:border-zinc-700 hover:shadow-xl transition-all duration-300 flex flex-col md:flex-row gap-6 md:items-center"
            >
              <div className={`w-16 h-16 sm:w-20 sm:h-20 shrink-0 rounded-2xl bg-gradient-to-br ${article.color} flex items-center justify-center text-3xl sm:text-4xl text-white shadow-inner`}>
                {article.icon}
              </div>

              <div className="flex-grow space-y-3">
                <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-xs font-semibold text-zinc-500 dark:text-zinc-400">
                  <span className={`${article.textColor} uppercase tracking-wider`}>{article.category}</span>
                  <span className="text-zinc-300 dark:text-zinc-700">•</span>
                  <span>{article.date}</span>
                  <span className="text-zinc-300 dark:text-zinc-700">•</span>
                  <span>{article.readTime}</span>
                </div>

                <h2 className="text-2xl font-bold text-zinc-900 dark:text-white group-hover:text-zinc-950 dark:group-hover:text-emerald-400 transition-colors">
                  <Link href={`/blog/${article.slug}`}>
                    {article.title}
                  </Link>
                </h2>

                <p className="text-zinc-600 dark:text-zinc-400 text-sm leading-relaxed max-w-3xl">
                  {article.excerpt}
                </p>

                <div className="pt-2">
                  <Link
                    href={`/blog/${article.slug}`}
                    className={`inline-flex items-center gap-1.5 text-sm font-semibold ${article.textColor} hover:underline`}
                  >
                    Read full article &rarr;
                  </Link>
                </div>
              </div>
            </article>
          ))}
        </div>
      </main>

      {/* Footer */}
      <Footer customText="Practical science breakdowns, mathematical modeling." />
    </div>
  );
}
