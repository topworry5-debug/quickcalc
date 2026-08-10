export interface Tool {
  title: string;
  description: string;
  icon: string;
  href: string;
  color: string;
  textColor: string;
  category: "Health" | "Finance" | "Converter" | "Utility/Dev" | "Planning";
  popular?: boolean;
}

export const tools: Tool[] = [
  {
    title: "BMI Calculator",
    description: "Calculate your body mass index (BMI) instantly. Analyze clinical weight ranges with a live horizontal gauge.",
    icon: "bmi",
    href: "/tools/bmi-calculator",
    color: "from-emerald-500 to-teal-600",
    textColor: "text-emerald-600 dark:text-emerald-400",
    category: "Health",
    popular: true
  },
  {
    title: "Calorie Calculator",
    description: "Calculate your BMR and TDEE using the modern Mifflin-St Jeor formula. Get tailored calorie targets for losing, maintaining, and gaining weight.",
    icon: "calorie",
    href: "/tools/calorie-calculator",
    color: "from-orange-500 to-amber-600",
    textColor: "text-orange-600 dark:text-orange-400",
    category: "Health",
    popular: true
  },
  {
    title: "Water Intake Calculator",
    description: "Calculate your ideal daily hydration requirements based on your body weight, activity level, and climate.",
    icon: "water",
    href: "/tools/water-intake-calculator",
    color: "from-blue-500 to-sky-600",
    textColor: "text-blue-600 dark:text-blue-400",
    category: "Health"
  },
  {
    title: "Pace Calculator",
    description: "Calculate running pace, time, or distance with our 3-in-1 calculator. View live km/mile side-by-side conversions and instant race time predictions.",
    icon: "pace",
    href: "/tools/pace-calculator",
    color: "from-blue-600 to-indigo-600",
    textColor: "text-blue-600 dark:text-indigo-400",
    category: "Health"
  },
  {
    title: "Due Date Calculator",
    description: "Estimate your baby's arrival date, trace gestational milestones, and follow your week-by-week trimester timeline.",
    icon: "due-date",
    href: "/tools/due-date-calculator",
    color: "from-rose-500 to-pink-600",
    textColor: "text-rose-600 dark:text-rose-400",
    category: "Health"
  },
  {
    title: "Intermittent Fasting Calculator",
    description: "Calculate your 16:8, 18:6, 20:4, or OMAD fasting windows with a live real-time ticking countdown timer and visual 24h timeline.",
    icon: "timer",
    href: "/tools/intermittent-fasting-calculator",
    color: "from-teal-500 to-emerald-600",
    textColor: "text-teal-600 dark:text-teal-400",
    category: "Health",
    popular: true
  },
  {
    title: "Shoe Size Converter",
    description: "Convert shoe sizes instantly between US, UK, EU, and Japan systems simultaneously with built-in brand variance guidance.",
    icon: "shoe-size",
    href: "/tools/shoe-size-converter",
    color: "from-blue-500 to-indigo-600",
    textColor: "text-blue-600 dark:text-blue-400",
    category: "Converter"
  },
  {
    title: "Paper & Fabric Size Converter",
    description: "Convert standard print paper formats and fabric lengths simultaneously with two dedicated, live-updating modes.",
    icon: "paper-fabric",
    href: "/tools/paper-fabric-size-converter",
    color: "from-emerald-500 to-teal-600",
    textColor: "text-emerald-600 dark:text-emerald-400",
    category: "Converter"
  },
  {
    title: "JSON & CSV Converter",
    description: "Convert JSON to CSV and CSV back to nested JSON structures securely in browser memory. 100% private client-side translation.",
    icon: "json-csv",
    href: "/tools/json-csv-converter",
    color: "from-zinc-700 to-zinc-900",
    textColor: "text-zinc-700 dark:text-zinc-300",
    category: "Utility/Dev"
  },
  {
    title: "Regex Tester",
    description: "Test and debug regular expressions instantly with live colored highlighting and plain-language pattern explanations.",
    icon: "regex",
    href: "/tools/regex-tester",
    color: "from-blue-500 to-indigo-600",
    textColor: "text-blue-600 dark:text-blue-400",
    category: "Utility/Dev"
  },
  {
    title: "AI Token Cost Calculator",
    description: "Calculate LLM API costs for GPT-4o, Claude 3.5, Gemini 1.5, DeepSeek and custom models with side-by-side cost comparison.",
    icon: "cpu",
    href: "/tools/ai-token-cost-calculator",
    color: "from-teal-600 to-cyan-600",
    textColor: "text-teal-600 dark:text-teal-400",
    category: "Utility/Dev",
    popular: true
  },
  {
    title: "Sleep Cycle Calculator",
    description: "Optimize your bedtime and waking schedule using 90-minute sleep cycles to wake up refreshed and energetic.",
    icon: "sleep-cycle",
    href: "/tools/sleep-cycle-calculator",
    color: "from-indigo-500 to-purple-600",
    textColor: "text-indigo-600 dark:text-indigo-400",
    category: "Health"
  },
  {
    title: "GPA Converter",
    description: "Convert international grades and percentages from US, UK, Canada, India, and Pakistan to the standard 4.0 scale.",
    icon: "gpa",
    href: "/tools/gpa-converter",
    color: "from-emerald-500 to-teal-600",
    textColor: "text-emerald-600 dark:text-emerald-400",
    category: "Converter",
    popular: true
  },
  {
    title: "Loan / EMI Calculator",
    description: "Calculate monthly installments, interest payments, and view a comprehensive year-by-year amortization schedule.",
    icon: "loan",
    href: "/tools/loan-calculator",
    color: "from-teal-500 to-cyan-600",
    textColor: "text-teal-600 dark:text-teal-400",
    category: "Finance",
    popular: true
  },
  {
    title: "Color Palette Generator",
    description: "Extract up to 8 beautiful dominant colors from any image. Analyze WCAG contrast compliance and export custom CSS/Tailwind configurations.",
    icon: "color-palette",
    href: "/tools/color-palette-generator",
    color: "from-emerald-500 to-teal-600",
    textColor: "text-emerald-600 dark:text-emerald-400",
    category: "Utility/Dev"
  },
  {
    title: "Word & Character Counter",
    description: "Count words, characters, sentences, paragraphs, and estimated reading times. Get live warning notifications for popular social post limits.",
    icon: "word-counter",
    href: "/tools/word-character-counter",
    color: "from-blue-500 to-indigo-600",
    textColor: "text-blue-600 dark:text-blue-400",
    category: "Utility/Dev"
  },
  {
    title: "Secure Password Generator",
    description: "Generate cryptographically secure passwords locally with precise entropy calculations and customizable pools.",
    icon: "password",
    href: "/tools/password-generator",
    color: "from-zinc-700 to-zinc-900",
    textColor: "text-zinc-700 dark:text-zinc-300",
    category: "Utility/Dev"
  },
  {
    title: "Timezone Meeting Planner",
    description: "Schedule meetings across multiple timezones safely using geographical database options and overlap calculations.",
    icon: "timezone",
    href: "/tools/timezone-meeting-planner",
    color: "from-blue-500 to-indigo-600",
    textColor: "text-blue-600 dark:text-blue-400",
    category: "Planning"
  },
  {
    title: "Tip Calculator",
    description: "Calculate custom tipping values instantly, split bills evenly between groups, and copy detailed breakdowns locally.",
    icon: "tip",
    href: "/tools/tip-calculator",
    color: "from-teal-500 to-cyan-600",
    textColor: "text-teal-600 dark:text-teal-400",
    category: "Finance"
  },
  {
    title: "Percentage Calculator",
    description: "Calculate percentage changes, fractions, savings, discount values, and reverse percentages instantly with dynamic formulas.",
    icon: "percentage",
    href: "/tools/percentage-calculator",
    color: "from-blue-500 to-indigo-600",
    textColor: "text-blue-600 dark:text-blue-400",
    category: "Finance"
  },
  {
    title: "Group Expense Splitter",
    description: "Split group bills, meals, and trip expenses unevenly. Allocate specific items and distribute tax/tip proportionally.",
    icon: "group-expense",
    href: "/tools/group-expense-splitter",
    color: "from-indigo-500 to-purple-600",
    textColor: "text-indigo-600 dark:text-indigo-400",
    category: "Finance"
  },
  {
    title: "Age Calculator",
    description: "Find your exact chronological age in years, months, and days. Uncover your zodiac traits, generational era, countdown to your next birthday, and share your personalized age card!",
    icon: "age",
    href: "/tools/age-calculator",
    color: "from-blue-500 via-indigo-500 to-emerald-500",
    textColor: "text-indigo-600 dark:text-indigo-400",
    category: "Planning",
    popular: true
  },
  {
    title: "Currency Converter",
    description: "Convert 35+ major world currencies instantly with live exchange rates. Compare ranges and copy formatted results with backlinks.",
    icon: "currency",
    href: "/tools/currency-converter",
    color: "from-teal-500 via-emerald-500 to-blue-500",
    textColor: "text-emerald-600 dark:text-emerald-400",
    category: "Finance",
    popular: true
  },
  {
    title: "Budget Calculator",
    description: "Split your income using the 50/30/20 rule with customizable percentages and a real-spending comparison.",
    icon: "budget",
    href: "/tools/budget-calculator",
    color: "from-blue-500 via-indigo-500 to-emerald-500",
    textColor: "text-indigo-600 dark:text-indigo-400",
    category: "Finance"
  },
  {
    title: "Zakat Calculator",
    description: "Calculate your Zakat cleanly with a category-by-category breakdown. Support for custom gold/silver rates and Nisab standard selector.",
    icon: "zakat",
    href: "/tools/zakat-calculator",
    color: "from-emerald-500 to-teal-600",
    textColor: "text-emerald-600 dark:text-emerald-400",
    category: "Finance"
  },
  {
    title: "Salary Take-Home Calculator",
    description: "Calculate your estimated net take-home salary after income taxes & payroll deductions in the US, Canada, and Pakistan side-by-side.",
    icon: "salary",
    href: "/tools/salary-take-home-calculator",
    color: "from-teal-500 via-cyan-500 to-emerald-500",
    textColor: "text-teal-600 dark:text-teal-400",
    category: "Finance",
    popular: true
  },
  {
    title: "Pregnancy Weight Gain Calculator",
    description: "Calculate personalized healthy pregnancy weight gain ranges week-by-week based on pre-pregnancy Body Mass Index and gestational timing.",
    icon: "pregnancy-weight",
    href: "/tools/pregnancy-weight-gain-calculator",
    color: "from-teal-500 via-emerald-500 to-teal-600",
    textColor: "text-teal-600 dark:text-teal-400",
    category: "Health"
  },
  {
    title: "Habit Cost Calculator",
    description: "Calculate the combined compounding time and money cost of daily recurring habits over years, decades, and by retirement.",
    icon: "habit-cost",
    href: "/tools/habit-cost-calculator",
    color: "from-amber-500 via-orange-500 to-red-500",
    textColor: "text-orange-600 dark:text-orange-400",
    category: "Finance"
  },
  {
    title: "Discount Calculator",
    description: "Calculate sale prices with single or stacked discounts, visual step-by-step math, and reverse pre-discount calculations instantly.",
    icon: "discount",
    href: "/tools/discount-calculator",
    color: "from-blue-500 via-indigo-500 to-emerald-500",
    textColor: "text-indigo-600 dark:text-indigo-400",
    category: "Finance"
  },
  {
    title: "Inflation Calculator",
    description: "Calculate historical inflation and buying power changes in the US, Canada, and Pakistan. Compare money value then vs now instantly.",
    icon: "inflation",
    href: "/tools/inflation-calculator",
    color: "from-blue-500 via-indigo-500 to-purple-600",
    textColor: "text-indigo-600 dark:text-indigo-400",
    category: "Finance"
  },
  {
    title: "Retirement Calculator",
    description: "Calculate your retirement savings with compound growth. Model monthly contributions, return rates, and compare starting earlier vs later.",
    icon: "retirement",
    href: "/tools/retirement-calculator",
    color: "from-emerald-600 to-teal-600",
    textColor: "text-emerald-600 dark:text-emerald-400",
    category: "Finance"
  },
  {
    title: "Savings Growth Calculator",
    description: "Calculate your compound interest earnings over time with regular monthly or yearly contributions. Track total contributed vs interest.",
    icon: "savings-growth",
    href: "/tools/savings-growth-calculator",
    color: "from-teal-500 via-emerald-500 to-blue-500",
    textColor: "text-teal-600 dark:text-teal-400",
    category: "Finance"
  },
  {
    title: "Travel Time & Fuel Cost Calculator",
    description: "Calculate speed, distance, time, flight cruising durations, and estimated vehicle trip fuel costs in real-time.",
    icon: "travel-time-fuel",
    href: "/tools/travel-time-fuel-calculator",
    color: "from-blue-600 via-indigo-600 to-sky-600",
    textColor: "text-blue-600 dark:text-blue-400",
    category: "Planning"
  },
  {
    title: "Freelance Rate Calculator",
    description: "Calculate your minimum billable hourly rate, daily target, and monthly revenue goal based on target income, business overhead, and billable ratio.",
    icon: "freelance-rate",
    href: "/tools/freelance-rate-calculator",
    color: "from-teal-500 via-emerald-500 to-indigo-600",
    textColor: "text-teal-600 dark:text-teal-400",
    category: "Finance",
    popular: true
  },
  {
    title: "Macro Calculator",
    description: "Calculate your daily macronutrient gram targets (protein, carbs, fats) based on your TDEE, fitness goals, and customizable macro splits.",
    icon: "macro",
    href: "/tools/macro-calculator",
    color: "from-orange-500 via-amber-500 to-emerald-600",
    textColor: "text-orange-600 dark:text-orange-400",
    category: "Health",
    popular: true
  }
];
