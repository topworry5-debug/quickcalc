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
    slug: "why-starting-retirement-savings-early-matters-more-than-you-think",
    title: "Why Starting Retirement Savings Early Matters More Than You Think",
    description: "Discover why starting retirement savings early matters more than contributing higher amounts later. See worked compound growth examples and clear benchmarks.",
    excerpt: "Discover why starting retirement savings early matters more than contributing higher amounts later. See worked compound growth examples and clear benchmarks.",
    date: "August 4, 2026",
    readTime: "9 min read",
    category: "Finance & Math",
    icon: "🏦",
    color: "from-emerald-600 to-teal-600",
    textColor: "text-emerald-600 dark:text-emerald-400",
  },
  {
    slug: "how-to-calculate-the-cost-of-daily-habits-financial-guide",
    title: "How to Calculate Cost of Daily Habits: Financial Guide",
    description: "Learn how to calculate the true cost of daily habits over 1, 5, and 10 years. Discover the Latte Factor, compound growth math, and free finance tools.",
    excerpt: "Learn how to calculate the true cost of daily habits over 1, 5, and 10 years. Discover the Latte Factor, compound growth math, and free finance tools.",
    date: "August 4, 2026",
    readTime: "8 min read",
    category: "Finance & Math",
    icon: "☕",
    color: "from-emerald-500 to-teal-600",
    textColor: "text-emerald-600 dark:text-emerald-400",
  },
  {
    slug: "how-to-convert-paper-and-fabric-sizes-dimensions-guide",
    title: "How to Convert Paper & Fabric Sizes: Dimensions Guide",
    description: "Learn how to convert paper and fabric sizes. Discover ISO 216 A4 vs US Letter differences, yards to meters fabric formulas, and free online tools.",
    excerpt: "Learn how to convert paper and fabric sizes. Discover ISO 216 A4 vs US Letter differences, yards to meters fabric formulas, and free online tools.",
    date: "August 4, 2026",
    readTime: "8 min read",
    category: "Utility & Shopping",
    icon: "📐",
    color: "from-amber-500 to-yellow-600",
    textColor: "text-amber-600 dark:text-amber-400",
  },
  {
    slug: "how-to-count-words-and-characters-writing-limits-guide",
    title: "How to Count Words and Characters: Limits & Writing Guide",
    description: "Learn how to count words and characters in text. Discover social media limits, reading time formulas, character space math, and free online tools.",
    excerpt: "Learn how to count words and characters in text. Discover social media limits, reading time formulas, character space math, and free online tools.",
    date: "August 4, 2026",
    readTime: "8 min read",
    category: "Utility & Programming",
    icon: "📝",
    color: "from-emerald-500 to-teal-600",
    textColor: "text-emerald-600 dark:text-emerald-400",
  },
  {
    slug: "how-to-generate-color-palette-from-image-ui-design-guide",
    title: "How to Generate Color Palette from Image: UI Design Guide",
    description: "Learn how to generate a color palette from an image. Discover the 60-30-10 rule, HEX/RGB/HSL codes, WCAG contrast standards, and free tools.",
    excerpt: "Learn how to generate a color palette from an image. Discover the 60-30-10 rule, HEX/RGB/HSL codes, WCAG contrast standards, and free tools.",
    date: "August 4, 2026",
    readTime: "8 min read",
    category: "Utility & Programming",
    icon: "🎨",
    color: "from-sky-500 to-indigo-600",
    textColor: "text-sky-600 dark:text-sky-400",
  },
  {
    slug: "how-to-convert-json-to-csv-flattening-guide",
    title: "How to Convert JSON to CSV: Flattening & Conversion Guide",
    description: "Learn how to convert JSON to CSV and CSV to JSON online. Discover dot-notation flattening, array handling, Excel importing, and free conversion tools.",
    excerpt: "Learn how to convert JSON to CSV and CSV to JSON online. Discover dot-notation flattening, array handling, Excel importing, and free conversion tools.",
    date: "August 4, 2026",
    readTime: "8 min read",
    category: "Utility & Programming",
    icon: "🔄",
    color: "from-indigo-500 to-violet-600",
    textColor: "text-indigo-600 dark:text-indigo-400",
  },
  {
    slug: "how-to-calculate-travel-time-fuel-cost-road-trip-guide",
    title: "How to Calculate Travel Time & Fuel Cost: Road Trip Guide",
    description: "Learn how to calculate driving travel time and road trip gas costs. Discover distance formulas, MPG fuel math, speed trade-offs, and instant tools.",
    excerpt: "Learn how to calculate driving travel time and road trip gas costs. Discover distance formulas, MPG fuel math, speed trade-offs, and instant tools.",
    date: "August 4, 2026",
    readTime: "8 min read",
    category: "Time & Productivity",
    icon: "🚗",
    color: "from-amber-500 to-yellow-600",
    textColor: "text-amber-600 dark:text-amber-400",
  },
  {
    slug: "how-to-calculate-running-pace-min-mile-speed-guide",
    title: "How to Calculate Running Pace: Min/Mile & Speed Guide",
    description: "Learn how to calculate running pace per mile and km. Discover time-distance formulas, treadmill mph conversion charts, and pacing shortcuts.",
    excerpt: "Learn how to calculate running pace per mile and km. Discover time-distance formulas, treadmill mph conversion charts, and pacing shortcuts.",
    date: "August 4, 2026",
    readTime: "8 min read",
    category: "Health & Fitness",
    icon: "🏃",
    color: "from-blue-500 to-sky-600",
    textColor: "text-sky-600 dark:text-sky-400",
  },
  {
    slug: "how-to-calculate-pregnancy-weight-gain-bmi-guide",
    title: "How to Calculate Pregnancy Weight Gain: Healthy BMI Guide",
    description: "Learn how to calculate healthy pregnancy weight gain based on pre-pregnancy BMI. Discover trimester guidelines, twin targets, and weight breakdown.",
    excerpt: "Learn how to calculate healthy pregnancy weight gain based on pre-pregnancy BMI. Discover trimester guidelines, twin targets, and weight breakdown.",
    date: "August 4, 2026",
    readTime: "8 min read",
    category: "Health & Fitness",
    icon: "🤰",
    color: "from-rose-500 to-pink-600",
    textColor: "text-rose-600 dark:text-rose-400",
  },
  {
    slug: "how-to-calculate-pregnancy-due-date-naegele-rule-guide",
    title: "How to Calculate Pregnancy Due Date: Naegele Rule & Guide",
    description: "Learn how to calculate your pregnancy due date using LMP and conception formulas. Understand Naegele's rule, trimesters, and weekly milestones.",
    excerpt: "Learn how to calculate your pregnancy due date using LMP and conception formulas. Understand Naegele's rule, trimesters, and weekly milestones.",
    date: "August 4, 2026",
    readTime: "8 min read",
    category: "Health & Fitness",
    icon: "👶",
    color: "from-rose-500 to-pink-600",
    textColor: "text-rose-600 dark:text-rose-400",
  },
  {
    slug: "how-to-calculate-inflation-rate-purchasing-power-guide",
    title: "How to Calculate Inflation Rate: CPI & Purchasing Power",
    description: "Learn how to calculate inflation rate and purchasing power using CPI formulas. Discover real-world examples, savings impact, and historical price math.",
    excerpt: "Learn how to calculate inflation rate and purchasing power using CPI formulas. Discover real-world examples, savings impact, and historical price math.",
    date: "August 4, 2026",
    readTime: "8 min read",
    category: "Finance & Math",
    icon: "💸",
    color: "from-emerald-500 to-teal-600",
    textColor: "text-emerald-600 dark:text-emerald-400",
  },
  {
    slug: "how-to-calculate-discount-percentage-sale-math-guide",
    title: "How to Calculate Discount Percentage: Easy Sale Math Guide",
    description: "Learn how to calculate discount percentage and final sale prices. Discover stacked discount rules, reverse math, and quick mental shortcuts.",
    excerpt: "Learn how to calculate discount percentage and final sale prices. Discover stacked discount rules, reverse math, and quick mental shortcuts.",
    date: "August 4, 2026",
    readTime: "8 min read",
    category: "Finance & Math",
    icon: "🏷️",
    color: "from-emerald-500 to-teal-600",
    textColor: "text-emerald-600 dark:text-emerald-400",
  },
  {
    slug: "how-to-calculate-savings-growth-compound-interest-guide",
    title: "How to Calculate Savings Growth: Compound Interest Guide",
    description: "Learn how to calculate savings growth with compound interest and monthly deposits. Discover formulas, worked examples, and long-term wealth math.",
    excerpt: "Learn how to calculate savings growth with compound interest and monthly deposits. Discover formulas, worked examples, and long-term wealth math.",
    date: "August 4, 2026",
    readTime: "8 min read",
    category: "Finance & Math",
    icon: "📈",
    color: "from-emerald-500 to-teal-600",
    textColor: "text-emerald-600 dark:text-emerald-400",
  },
  {
    slug: "how-to-calculate-take-home-pay-net-salary-guide",
    title: "How to Calculate Take-Home Pay: Tax Breakdown & Guide",
    description: "Learn how to calculate take-home pay from gross salary. Understand federal, state, FICA taxes, pre-tax deductions, and bi-weekly paychecks.",
    excerpt: "Learn how to calculate take-home pay from gross salary. Understand federal, state, FICA taxes, pre-tax deductions, and bi-weekly paychecks.",
    date: "August 4, 2026",
    readTime: "8 min read",
    category: "Finance & Math",
    icon: "💵",
    color: "from-emerald-500 to-teal-600",
    textColor: "text-emerald-600 dark:text-emerald-400",
  },
  {
    slug: "how-to-calculate-sleep-cycles-wake-up-time-guide",
    title: "How to Calculate Sleep Cycles: Best Bedtimes & Guide",
    description: "Learn how to calculate sleep cycles to wake up refreshed instead of groggy. Discover 90-minute cycle timing, sleep latency, and ideal bedtimes.",
    excerpt: "Learn how to calculate sleep cycles to wake up refreshed instead of groggy. Discover 90-minute cycle timing, sleep latency, and ideal bedtimes.",
    date: "August 4, 2026",
    readTime: "8 min read",
    category: "Health & Fitness",
    icon: "😴",
    color: "from-blue-500 to-sky-600",
    textColor: "text-sky-600 dark:text-sky-400",
  },
  {
    slug: "how-to-convert-percentage-to-gpa-4-point-scale-guide",
    title: "How to Convert Percentage to GPA: Formulas & 4.0 Scale Guide",
    description: "Learn how to convert percentage grades, letter marks, and international degree scales to a 4.0 GPA. Easy formulas, conversion charts, and free tool.",
    excerpt: "Learn how to convert percentage grades, letter marks, and international degree scales to a 4.0 GPA. Easy formulas, conversion charts, and free tool.",
    date: "August 4, 2026",
    readTime: "8 min read",
    category: "Life & Math",
    icon: "🎓",
    color: "from-pink-500 to-rose-600",
    textColor: "text-rose-600 dark:text-rose-400",
  },
  {
    slug: "how-to-calculate-calorie-deficit-step-by-step-guide",
    title: "How to Calculate Calorie Deficit: Safe Formulas & Guide",
    description: "Learn how to calculate your calorie deficit for safe, sustainable fat loss. Discover optimal deficit ranges, macro balance, and common plateaus.",
    excerpt: "Learn how to calculate your calorie deficit for safe, sustainable fat loss. Understand BMR vs TDEE, optimal deficit percentages, and common plateaus.",
    date: "August 4, 2026",
    readTime: "8 min read",
    category: "Health & Fitness",
    icon: "🔥",
    color: "from-blue-500 to-sky-600",
    textColor: "text-sky-600 dark:text-sky-400",
  },
  {
    slug: "how-to-calculate-tip-easy-formulas-tipping-guide",
    title: "How to Calculate Tip: Easy Formulas, Pre-Tax Rules & Etiquette",
    description: "Learn how to calculate tip accurately in seconds. Discover whether to tip before or after tax, fast mental math shortcuts, and simple formulas.",
    excerpt: "Learn how to calculate tip accurately in seconds. Understand pre-tax vs post-tax rules, fast mental math shortcuts, and simple percentage formulas.",
    date: "August 4, 2026",
    readTime: "8 min read",
    category: "Finance & Math",
    icon: "💸",
    color: "from-emerald-500 to-teal-600",
    textColor: "text-emerald-600 dark:text-emerald-400",
  },
  {
    slug: "how-to-calculate-daily-calorie-needs-for-weight-loss",
    title: "How to Calculate Daily Calorie Needs for Weight Loss",
    description: "Learn how to calculate daily calorie needs for weight loss accurately. Understand BMR vs TDEE, the Mifflin-St Jeor formula, and safe calorie deficits.",
    excerpt: "Learn how to calculate daily calorie needs for weight loss accurately. Understand BMR vs TDEE, the Mifflin-St Jeor formula, and safe calorie deficits.",
    date: "August 4, 2026",
    readTime: "8 min read",
    category: "Health & Fitness",
    icon: "🔥",
    color: "from-blue-500 to-sky-600",
    textColor: "text-sky-600 dark:text-sky-400",
  },
  {
    slug: "how-loan-emi-is-calculated-amortization-repayment-guide",
    title: "How Loan EMI is Calculated: Amortization & Repayment Guide",
    description: "Learn how loan EMI is calculated step-by-step. Understand amortization schedules, reducing balance interest, and calculate your total interest for free.",
    excerpt: "Learn how loan EMI is calculated step-by-step. Understand amortization schedules, reducing balance vs flat rate interest, and calculate your total interest for free.",
    date: "August 4, 2026",
    readTime: "8 min read",
    category: "Finance & Math",
    icon: "📊",
    color: "from-emerald-500 to-teal-600",
    textColor: "text-emerald-600 dark:text-emerald-400",
  },
  {
    slug: "running-pace-strategy-guide-calculate-target-race-pace",
    title: "Running Pace Strategy Guide: How to Calculate Target Race Pace",
    description: "Master your running pace strategy for 5K, 10K, half, and full marathons. Avoid burnout and calculate your exact min/mile target pace for free.",
    excerpt: "Learn how to master your running pace strategy for 5K, 10K, half, and full marathons. Avoid early burnout, calculate exact split times, and hit your PR target.",
    date: "August 4, 2026",
    readTime: "8 min read",
    category: "Health & Fitness",
    icon: "🏃",
    color: "from-emerald-500 to-teal-600",
    textColor: "text-emerald-600 dark:text-emerald-400",
  },
  {
    slug: "how-to-write-and-test-regular-expressions-regex-tutorial-guide",
    title: "How to Write and Test Regular Expressions: A Beginner's Regex Tutorial Guide",
    description: "Learn how to write, test, and debug regular expressions (regex). Understand character classes, quantifiers, anchors, flags, and how to use our live pattern debugger.",
    excerpt: "Learn how to write, test, and debug regular expressions (regex). Understand character classes, quantifiers, anchors, flags, and how to use our live pattern debugger.",
    date: "August 2, 2026",
    readTime: "8 min read",
    category: "Utility & Programming",
    icon: "🧩",
    color: "from-purple-500 to-indigo-600",
    textColor: "text-purple-600 dark:text-purple-400",
  },
  {
    slug: "is-the-8-glasses-a-day-water-rule-actually-true",
    title: "Is the \"8 Glasses a Day\" Water Rule Actually True? What Science Says",
    description: "The 8x8 water rule isn't based on real science. Learn where it actually came from, what your body really needs, and how to find your personal daily water target in seconds.",
    excerpt: "The 8x8 water rule isn't based on real science. Learn where it actually came from, what your body really needs, and how to find your personal daily water target in seconds.",
    date: "July 29, 2026",
    readTime: "5 min read",
    category: "Health & Fitness",
    icon: "💧",
    color: "from-blue-500 to-sky-600",
    textColor: "text-sky-600 dark:text-sky-400",
  },
  {
    slug: "how-to-calculate-exact-age-years-months-days",
    title: "How to Calculate Your Exact Age (Years, Months, and Days)",
    description: "Learn how to calculate your exact age in years, months, and days. Understand chronological age calculation, day-level precision, and leap year impacts.",
    excerpt: "Learn how to calculate your exact age in years, months, and days. Understand chronological age calculation, day-level precision, and leap year impacts.",
    date: "July 26, 2026",
    readTime: "5 min read",
    category: "Life & Math",
    icon: "🎂",
    color: "from-pink-500 to-rose-600",
    textColor: "text-rose-600 dark:text-rose-400",
  },
  {
    slug: "how-currency-conversion-actually-works-avoid-markup-fees",
    title: "How Currency Conversion Actually Works (And How to Avoid Losing Money on It)",
    description: "Learn how currency conversion actually works. Understand exchange rates, mid-market rates, bank markup fees, and how to avoid losing money abroad.",
    excerpt: "Learn how currency conversion actually works. Understand exchange rates, mid-market rates, bank markup fees, and how to avoid losing money abroad.",
    date: "July 26, 2026",
    readTime: "10 min read",
    category: "Finance & Math",
    icon: "💱",
    color: "from-emerald-500 to-teal-600",
    textColor: "text-emerald-600 dark:text-emerald-400",
  },
  {
    slug: "how-to-calculate-zakat-nisab-gold-silver-savings-guide",
    title: "How to Calculate Zakat: A Complete Guide to Nisab, Gold, Silver & Savings",
    description: "Learn how to calculate Zakat step-by-step with our comprehensive guide. Understand the gold and silver nisab standards, what assets count, and when to pay.",
    excerpt: "Learn how to calculate Zakat step-by-step with our comprehensive guide. Understand the gold and silver nisab standards, what assets count, and when to pay.",
    date: "July 24, 2026",
    readTime: "10 min read",
    category: "Finance & Math",
    icon: "🕌",
    color: "from-emerald-500 to-teal-600",
    textColor: "text-emerald-600 dark:text-emerald-400",
  },
  {
    slug: "50-30-20-budget-rule-explained-does-it-actually-work",
    title: "The 50/30/20 Budget Rule Explained (And Why It Doesn't Work for Everyone)",
    description: "Learn how the 50/30/20 budgeting rule works, what actually counts as a \"need\" vs a \"want,\" and what to do if your rent alone eats up half your paycheck. Free calculator included.",
    excerpt: "Learn how the 50/30/20 budgeting rule works, what actually counts as a \"need\" vs a \"want,\" and what to do if your rent alone eats up half your paycheck. Free calculator included.",
    date: "July 24, 2026",
    readTime: "5 min read",
    category: "Finance & Math",
    icon: "💰",
    color: "from-emerald-500 to-teal-600",
    textColor: "text-emerald-600 dark:text-emerald-400",
  },
  {
    slug: "usd-to-pkr-and-understanding-real-exchange-rates",
    title: "Why Your Bank's Exchange Rate Is Different From Google's (And What the \"Real\" Rate Actually Is)",
    description: "Confused why your bank gives a worse exchange rate than what you see online? Learn how mid-market rates work, why banks charge more, and how to convert currency accurately with live rates.",
    excerpt: "Confused why your bank gives a worse exchange rate than what you see online? Learn how mid-market rates work, why banks charge more, and how to convert currency accurately with live rates.",
    date: "July 24, 2026",
    readTime: "5 min read",
    category: "Finance & Math",
    icon: "💱",
    color: "from-emerald-500 to-teal-600",
    textColor: "text-emerald-600 dark:text-emerald-400",
  },
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
