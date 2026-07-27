export interface Tool {
  title: string;
  description: string;
  icon: string;
  href: string;
  color: string;
  textColor: string;
  category: "Health" | "Finance" | "Converter" | "Utility/Dev" | "Planning";
}

export const tools: Tool[] = [
  {
    title: "BMI Calculator",
    description: "Calculate your body mass index (BMI) instantly. Analyze clinical weight ranges with a live horizontal gauge.",
    icon: "⚖️",
    href: "/tools/bmi-calculator",
    color: "from-emerald-500 to-teal-600",
    textColor: "text-emerald-600 dark:text-emerald-400",
    category: "Health"
  },
  {
    title: "Calorie Calculator",
    description: "Calculate your BMR and TDEE using the modern Mifflin-St Jeor formula. Get tailored calorie targets for losing, maintaining, and gaining weight.",
    icon: "🔥",
    href: "/tools/calorie-calculator",
    color: "from-orange-500 to-amber-600",
    textColor: "text-orange-600 dark:text-orange-400",
    category: "Health"
  },
  {
    title: "Water Intake Calculator",
    description: "Calculate your ideal daily hydration requirements based on your body weight, activity level, and climate.",
    icon: "💧",
    href: "/tools/water-intake-calculator",
    color: "from-blue-500 to-sky-600",
    textColor: "text-blue-600 dark:text-blue-400",
    category: "Health"
  },
  {
    title: "Due Date Calculator",
    description: "Estimate your baby's arrival date, trace gestational milestones, and follow your week-by-week trimester timeline.",
    icon: "👶",
    href: "/tools/due-date-calculator",
    color: "from-rose-500 to-pink-600",
    textColor: "text-rose-600 dark:text-rose-400",
    category: "Health"
  },
  {
    title: "Shoe Size Converter",
    description: "Convert shoe sizes instantly between US, UK, EU, and Japan systems simultaneously with built-in brand variance guidance.",
    icon: "👟",
    href: "/tools/shoe-size-converter",
    color: "from-blue-500 to-indigo-600",
    textColor: "text-blue-600 dark:text-blue-400",
    category: "Converter"
  },
  {
    title: "Paper & Fabric Size Converter",
    description: "Convert standard print paper formats and fabric lengths simultaneously with two dedicated, live-updating modes.",
    icon: "📏",
    href: "/tools/paper-fabric-size-converter",
    color: "from-emerald-500 to-teal-600",
    textColor: "text-emerald-600 dark:text-emerald-400",
    category: "Converter"
  },
  {
    title: "JSON & CSV Converter",
    description: "Convert JSON to CSV and CSV back to nested JSON structures securely in browser memory. 100% private client-side translation.",
    icon: "🛡️",
    href: "/tools/json-csv-converter",
    color: "from-zinc-700 to-zinc-900",
    textColor: "text-zinc-700 dark:text-zinc-300",
    category: "Utility/Dev"
  },
  {
    title: "Regex Tester",
    description: "Test and debug regular expressions instantly with live colored highlighting and plain-language pattern explanations.",
    icon: "🔍",
    href: "/tools/regex-tester",
    color: "from-blue-500 to-indigo-600",
    textColor: "text-blue-600 dark:text-blue-400",
    category: "Utility/Dev"
  },
  {
    title: "Sleep Cycle Calculator",
    description: "Optimize your bedtime and waking schedule using 90-minute sleep cycles to wake up refreshed and energetic.",
    icon: "🌙",
    href: "/tools/sleep-cycle-calculator",
    color: "from-indigo-500 to-purple-600",
    textColor: "text-indigo-600 dark:text-indigo-400",
    category: "Health"
  },
  {
    title: "GPA Converter",
    description: "Convert international grades and percentages from US, UK, Canada, India, and Pakistan to the standard 4.0 scale.",
    icon: "🎓",
    href: "/tools/gpa-converter",
    color: "from-emerald-500 to-teal-600",
    textColor: "text-emerald-600 dark:text-emerald-400",
    category: "Converter"
  },
  {
    title: "Loan / EMI Calculator",
    description: "Calculate monthly installments, interest payments, and view a comprehensive year-by-year amortization schedule.",
    icon: "💵",
    href: "/tools/loan-calculator",
    color: "from-teal-500 to-cyan-600",
    textColor: "text-teal-600 dark:text-teal-400",
    category: "Finance"
  },
  {
    title: "Color Palette Generator",
    description: "Extract up to 8 beautiful dominant colors from any image. Analyze WCAG contrast compliance and export custom CSS/Tailwind configurations.",
    icon: "🎨",
    href: "/tools/color-palette-generator",
    color: "from-emerald-500 to-teal-600",
    textColor: "text-emerald-600 dark:text-emerald-400",
    category: "Utility/Dev"
  },
  {
    title: "Word & Character Counter",
    description: "Count words, characters, sentences, paragraphs, and estimated reading times. Get live warning notifications for popular social post limits.",
    icon: "📝",
    href: "/tools/word-character-counter",
    color: "from-blue-500 to-indigo-600",
    textColor: "text-blue-600 dark:text-blue-400",
    category: "Utility/Dev"
  },
  {
    title: "Secure Password Generator",
    description: "Generate cryptographically secure passwords locally with precise entropy calculations and customizable pools.",
    icon: "🔑",
    href: "/tools/password-generator",
    color: "from-zinc-700 to-zinc-900",
    textColor: "text-zinc-700 dark:text-zinc-300",
    category: "Utility/Dev"
  },
  {
    title: "Timezone Meeting Planner",
    description: "Schedule meetings across multiple timezones safely using geographical database options and overlap calculations.",
    icon: "🗺️",
    href: "/tools/timezone-meeting-planner",
    color: "from-blue-500 to-indigo-600",
    textColor: "text-blue-600 dark:text-blue-400",
    category: "Planning"
  },
  {
    title: "Tip Calculator",
    description: "Calculate custom tipping values instantly, split bills evenly between groups, and copy detailed breakdowns locally.",
    icon: "💵",
    href: "/tools/tip-calculator",
    color: "from-teal-500 to-cyan-600",
    textColor: "text-teal-600 dark:text-teal-400",
    category: "Finance"
  },
  {
    title: "Percentage Calculator",
    description: "Calculate percentage changes, fractions, savings, discount values, and reverse percentages instantly with dynamic formulas.",
    icon: "📊",
    href: "/tools/percentage-calculator",
    color: "from-blue-500 to-indigo-600",
    textColor: "text-blue-600 dark:text-blue-400",
    category: "Finance"
  },
  {
    title: "Group Expense Splitter",
    description: "Split group bills, meals, and trip expenses unevenly. Allocate specific items and distribute tax/tip proportionally.",
    icon: "👥",
    href: "/tools/group-expense-splitter",
    color: "from-indigo-500 to-purple-600",
    textColor: "text-indigo-600 dark:text-indigo-400",
    category: "Finance"
  },
  {
    title: "Age Calculator",
    description: "Find your exact chronological age in years, months, and days. Uncover your zodiac traits, generational era, countdown to your next birthday, and share your personalized age card!",
    icon: "🎂",
    href: "/tools/age-calculator",
    color: "from-blue-500 via-indigo-500 to-emerald-500",
    textColor: "text-indigo-600 dark:text-indigo-400",
    category: "Planning"
  },
  {
    title: "Currency Converter",
    description: "Convert 35+ major world currencies instantly with live exchange rates. Compare ranges and copy formatted results with backlinks.",
    icon: "💱",
    href: "/tools/currency-converter",
    color: "from-teal-500 via-emerald-500 to-blue-500",
    textColor: "text-emerald-600 dark:text-emerald-400",
    category: "Finance" // Currency Converter can be treated as both, we will handle this in relevance matching.
  },
  {
    "title": "Budget Calculator",
    "description": "Split your income using the 50/30/20 rule with customizable percentages and a real-spending comparison.",
    "icon": "💰",
    "href": "/tools/budget-calculator",
    "color": "from-blue-500 via-indigo-500 to-emerald-500",
    "textColor": "text-indigo-600 dark:text-indigo-400",
    "category": "Finance"
  },
  {
    "title": "Zakat Calculator",
    "description": "Calculate your Zakat cleanly with a category-by-category breakdown. Support for custom gold/silver rates and Nisab standard selector.",
    "icon": "⚖️",
    "href": "/tools/zakat-calculator",
    "color": "from-emerald-500 to-teal-600",
    "textColor": "text-emerald-600 dark:text-emerald-400",
    "category": "Finance"
  },
  {
    "title": "Salary Take-Home Calculator",
    "description": "Calculate your estimated net take-home salary after income taxes & payroll deductions in the US, Canada, and Pakistan side-by-side.",
    "icon": "💵",
    "href": "/tools/salary-take-home-calculator",
    "color": "from-teal-500 via-cyan-500 to-emerald-500",
    "textColor": "text-teal-600 dark:text-teal-400",
    "category": "Finance"
  },
  {
    "title": "Pregnancy Weight Gain Calculator",
    "description": "Calculate personalized healthy pregnancy weight gain ranges week-by-week based on pre-pregnancy Body Mass Index and gestational timing.",
    "icon": "👶",
    "href": "/tools/pregnancy-weight-gain-calculator",
    "color": "from-teal-500 via-emerald-500 to-teal-600",
    "textColor": "text-teal-600 dark:text-teal-400",
    "category": "Health"
  }
];
