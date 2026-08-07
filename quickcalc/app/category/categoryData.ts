export interface CategoryMeta {
  slug: string;
  name: string;
  title: string;
  seoTitle: string;
  metaDescription: string;
  introParagraph: string;
  toolCategories: string[];
  blogCategories: string[];
  icon: string;
  color: string;
  textColor: string;
}

export const categoriesData: CategoryMeta[] = [
  {
    slug: "health-fitness",
    name: "Health & Fitness",
    title: "Health & Fitness Calculators and Clinical Guides",
    seoTitle: "Free Health Calculators Online - BMI, TDEE, Calorie & Due Date | QuickCalc",
    metaDescription: "Free online health calculators & clinical guides. Compute BMI, TDEE calories, water intake, pregnancy due dates, and sleep cycles with instant science-backed precision.",
    introParagraph: "Welcome to the QuickCalc Health & Fitness Hub. Whether you're tracking daily calorie deficit goals, calculating accurate Body Mass Index (BMI) according to WHO guidelines, or determining optimal 90-minute REM sleep cycles, our tools are built using validated clinical formulas. 100% free, private, and client-side with zero data tracking.",
    toolCategories: ["Health"],
    blogCategories: ["Health & Fitness"],
    icon: "bmi",
    color: "from-teal-500 to-emerald-600",
    textColor: "text-teal-600 dark:text-teal-400",
  },
  {
    slug: "finance-math",
    name: "Finance & Math",
    title: "Finance & Money Calculators and Financial Strategy Guides",
    seoTitle: "Free Finance Calculators Online - Loan EMI, Salary & Budgeting | QuickCalc",
    metaDescription: "Free online finance & money calculators. Calculate monthly loan EMI, take-home salary paychecks, 50/30/20 budget allocations, and compound interest growth.",
    introParagraph: "Manage your personal finances with mathematical clarity. From loan amortization and paycheck net tax breakdown to compound APY savings growth, our financial calculators provide transparent calculations to help you make informed money decisions.",
    toolCategories: ["Finance"],
    blogCategories: ["Finance & Math"],
    icon: "loan",
    color: "from-indigo-500 to-blue-600",
    textColor: "text-indigo-600 dark:text-indigo-400",
  },
  {
    slug: "utility-programming",
    name: "Utility & Programming",
    title: "Developer Utilities, Regex Testers & Data Converters",
    seoTitle: "Free Developer Utilities Online - JSON to CSV, Regex & Palette Generator | QuickCalc",
    metaDescription: "Free developer utility tools & programming guides. Test regex patterns live, convert JSON to CSV spreadsheets, measure password entropy, and extract color palettes.",
    introParagraph: "Essential utility and developer tools built for speed and zero-latency client-side execution. Flatten nested JSON arrays, test regular expressions with instant highlighting, generate WCAG-compliant color palettes, and audit password bit-entropy.",
    toolCategories: ["Utility/Dev"],
    blogCategories: ["Utility & Programming"],
    icon: "json-csv",
    color: "from-slate-600 to-zinc-700",
    textColor: "text-teal-600 dark:text-teal-400",
  },
  {
    slug: "time-productivity",
    name: "Time & Productivity",
    title: "Timezone Meeting Planners & Travel Calculators",
    seoTitle: "Time & Productivity Calculators Online - Timezone & Fuel Math | QuickCalc",
    metaDescription: "Free time & productivity calculators. Plan multi-timezone team meetings, calculate driving travel time and trip fuel costs, and track pace splits.",
    introParagraph: "Optimize your schedule and travel log with precision time calculators. Plan global team meetings across Daylight Saving Time boundaries and compute driving trip duration and gas expenses effortlessly.",
    toolCategories: ["Planning"],
    blogCategories: ["Time & Productivity"],
    icon: "timezone",
    color: "from-amber-500 to-yellow-600",
    textColor: "text-amber-600 dark:text-amber-400",
  },
  {
    slug: "utility-shopping",
    name: "Converters & Shopping",
    title: "Dimension Converters & Discount Calculators",
    seoTitle: "Free Unit Converters & Shopping Calculators Online | QuickCalc",
    metaDescription: "Free unit converters and discount shopping calculators. Convert paper sizes, shoe sizing charts, fabric lengths, and compute double-discount sale prices.",
    introParagraph: "Convert international sizing standards and calculate sale prices instantly. Bridge US, UK, EU, and Japanese shoe size charts, convert ISO paper dimensions, and calculate real savings on double-coupon discounts.",
    toolCategories: ["Converter"],
    blogCategories: ["Utility & Shopping"],
    icon: "shoe-size",
    color: "from-cyan-500 to-blue-600",
    textColor: "text-cyan-600 dark:text-cyan-400",
  },
  {
    slug: "security",
    name: "Security & Cryptography",
    title: "Password Generators & Cryptographic Entropy Testers",
    seoTitle: "Free Security & Password Generators Online | QuickCalc",
    metaDescription: "Free password generators & entropy testers online. Generate cryptographically strong passwords and test bit-entropy resilience against brute-force attacks.",
    introParagraph: "Audit your online security posture with client-side cryptographic tools. Generate high-entropy passwords using browser Crypto APIs and learn the mathematical mechanics of bit-entropy defense.",
    toolCategories: ["Utility/Dev"],
    blogCategories: ["Security"],
    icon: "password",
    color: "from-emerald-600 to-teal-600",
    textColor: "text-emerald-600 dark:text-emerald-400",
  },
];
