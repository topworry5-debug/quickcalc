export interface Tool {
  title: string;
  description: string;
  icon: string;
  href: string;
  color: string;
  textColor: string;
  category: "Health" | "Finance" | "Converter" | "Utility/Dev" | "Planning";
  popular?: boolean;
  badge?: string;
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
    title: "GFR & Kidney Function Calculator",
    description: "Calculate estimated GFR (eGFR) using the 2021 race-free CKD-EPI creatinine equation and evaluate clinical CKD stage bands instantly.",
    icon: "gfr",
    href: "/tools/gfr-kidney-function-calculator",
    color: "from-emerald-600 to-teal-600",
    textColor: "text-emerald-600 dark:text-emerald-400",
    category: "Health"
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
    title: "Digital Storage Converter",
    description: "Convert bits, Bytes, KB, MB, GB, TB, and PB simultaneously with binary 1024 vs decimal 1000 precision and OS capacity insight.",
    icon: "digital-storage",
    href: "/tools/digital-storage-converter",
    color: "from-blue-600 to-indigo-600",
    textColor: "text-blue-600 dark:text-blue-400",
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
    title: "Words-to-Minutes / Speech Time Calculator",
    description: "Convert text script word counts into estimated speech duration, or calculate target word counts for time-capped presentations.",
    icon: "speech-time",
    href: "/tools/speech-time-calculator",
    color: "from-teal-600 to-emerald-600",
    textColor: "text-teal-600 dark:text-teal-400",
    category: "Utility/Dev"
  },
  {
    title: "ATS Resume Score Checker",
    description: "Compare your resume against job postings to find missing keywords and calculate ATS match scores 100% privately in browser memory.",
    icon: "ats-resume",
    href: "/tools/ats-resume-checker",
    color: "from-emerald-600 to-teal-600",
    textColor: "text-emerald-600 dark:text-emerald-400",
    category: "Utility/Dev"
  },
  {
    title: "Readability Score Calculator",
    description: "Audit text readability live with Flesch Reading Ease, Flesch-Kincaid Grade Level, and Gunning Fog Index.",
    icon: "readability",
    href: "/tools/readability-score-calculator",
    color: "from-teal-600 to-cyan-600",
    textColor: "text-teal-600 dark:text-teal-400",
    category: "Utility/Dev"
  },
  {
    title: "QR Code Generator",
    description: "Generate custom high-resolution QR codes for URLs, WiFi networks, and vCard contacts with PNG and SVG vector downloads.",
    icon: "qr-code",
    href: "/tools/qr-code-generator",
    color: "from-emerald-600 to-teal-600",
    textColor: "text-emerald-600 dark:text-emerald-400",
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
    title: "Debt Snowball vs. Avalanche Calculator",
    description: "Compare Dave Ramsey's Debt Snowball with the Debt Avalanche method. Calculate payoff dates, total interest saved, and build a custom multi-debt plan.",
    icon: "debt-snowball",
    href: "/calculators/debt-snowball-vs-avalanche-calculator",
    color: "from-indigo-600 to-teal-600",
    textColor: "text-indigo-600 dark:text-indigo-400",
    category: "Finance",
    popular: true,
    badge: "Snowball vs Avalanche"
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
    title: "OASDI Tax Calculator",
    description: "Calculate your exact Social Security OASDI payroll tax, remaining wage base room, and 2026 cap crossover ($184,500) for employees and self-employed.",
    icon: "oasdi",
    href: "/tools/oasdi-tax-calculator",
    color: "from-teal-600 to-emerald-600",
    textColor: "text-teal-600 dark:text-teal-400",
    category: "Finance",
    popular: true,
    badge: "2026 Cap"
  },
  {
    title: "Arkansas Salary Calculator",
    description: "Calculate your exact Arkansas take-home pay after federal, FICA, and state income taxes with 2026 progressive brackets (3.7% top rate).",
    icon: "arkansas",
    href: "/tools/arkansas-salary-calculator",
    color: "from-teal-600 to-emerald-600",
    textColor: "text-teal-600 dark:text-teal-400",
    category: "Finance",
    popular: true,
    badge: "2026 Rates"
  },
  {
    title: "Illinois Paycheck Calculator",
    description: "Calculate your Illinois take-home pay after federal, FICA, and state flat income tax (4.95%) with hourly, salary, and personal exemption settings.",
    icon: "illinois",
    href: "/tools/illinois-paycheck-calculator",
    color: "from-teal-600 to-cyan-600",
    textColor: "text-teal-600 dark:text-teal-400",
    category: "Finance",
    popular: true,
    badge: "4.95% Flat"
  },
  {
    title: "State Paycheck Calculators (All 50 States)",
    description: "Calculate take-home pay, standard deductions, and state tax withholdings across all 50 US states with live 2026 data.",
    icon: "states-hub",
    href: "/calculators/paycheck-calculator",
    color: "from-teal-600 to-indigo-600",
    textColor: "text-teal-600 dark:text-teal-400",
    category: "Finance",
    popular: true,
    badge: "50 States"
  },

  {
    title: "Work Hours / Timesheet Calculator",
    description: "Calculate daily shift hours, break deductions, overnight work, and weekly gross pay with 1.5x overtime rules.",
    icon: "work-hours",
    href: "/tools/work-hours-calculator",
    color: "from-emerald-600 to-teal-600",
    textColor: "text-emerald-600 dark:text-emerald-400",
    category: "Finance"
  },
  {
    title: "Retirement Safe Withdrawal Rate Simulator",
    description: "Backtest portfolio withdrawal rates across 96 years of US stock, bond, and CPI inflation data to calculate portfolio survival probability.",
    icon: "retirement-withdrawal",
    href: "/tools/retirement-withdrawal-simulator",
    color: "from-emerald-700 to-indigo-800",
    textColor: "text-emerald-700 dark:text-emerald-400",
    category: "Finance"
  },
  {
    title: "How Long Will My Money Last? (Runway Calculator)",
    description: "Calculate how many years your savings and retirement nest egg will last with live compounding yield, customizable inflation, and visual runway charts.",
    icon: "retirement",
    href: "/calculators/how-long-will-my-money-last",
    color: "from-emerald-600 to-teal-700",
    textColor: "text-emerald-600 dark:text-emerald-400",
    category: "Finance",
    popular: true,
    badge: "Runway Tool"
  },
  {
    title: "Credit Card Payoff Calculator",
    description: "Simulate your exact debt-free date, calculate total compound interest costs, and see how extra payments shave years off your credit card balances.",
    icon: "credit-card",
    href: "/calculators/credit-card-payoff-calculator",
    color: "from-rose-500 to-pink-600",
    textColor: "text-rose-600 dark:text-rose-400",
    category: "Finance",
    popular: true,
    badge: "Payoff Tool"
  },
  {
    title: "Dave Ramsey Investment Calculator",
    description: "Project your compound retirement growth and nest egg using Dave Ramsey's 15% rule and recommended 4-fund portfolio distribution.",
    icon: "ramsey",
    href: "/calculators/ramsey-investment-calculator",
    color: "from-emerald-500 to-teal-600",
    textColor: "text-emerald-600 dark:text-emerald-400",
    category: "Finance",
    popular: true,
    badge: "Baby Step 4"
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
    title: "Internet Speed Test",
    description: "Measure real-time download Mbps, upload Mbps, ping latency, and jitter free with no ads or tracking.",
    icon: "gauge",
    href: "/tools/internet-speed-test",
    color: "from-blue-600 to-indigo-600",
    textColor: "text-blue-600 dark:text-blue-400",
    category: "Utility/Dev",
    badge: "New"
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
  },
  {
    title: "Etsy Fee & Net Profit Calculator",
    description: "Calculate exact 2026 Etsy seller fees (6.5% transaction, listing, country processing, regulatory, offsite ads) and net profit margins instantly.",
    icon: "etsy",
    href: "/tools/etsy-fee-calculator",
    color: "from-orange-500 via-rose-500 to-teal-500",
    textColor: "text-rose-600 dark:text-rose-400",
    category: "Finance",
    popular: true
  },
  {
    title: "Solar Panel ROI & Payback Calculator",
    description: "Calculate solar panel payback years, 25-year cumulative energy savings, battery storage returns, and carbon offset with 2026 tax credits.",
    icon: "solar",
    href: "/tools/solar-payback-calculator",
    color: "from-amber-500 via-emerald-500 to-sky-500",
    textColor: "text-amber-600 dark:text-amber-400",
    category: "Finance",
    popular: true
  },
  {
    title: "Amazon KDP Royalty Calculator",
    description: "Calculate exact Amazon KDP print-on-demand printing costs, 60% and 40% author royalties, profit margins, and minimum breakeven list prices.",
    icon: "kdp",
    href: "/tools/kdp-royalty-calculator",
    color: "from-emerald-500 via-teal-500 to-indigo-600",
    textColor: "text-emerald-600 dark:text-emerald-400",
    category: "Finance",
    popular: true
  },
  {
    title: "Pakistan Income Tax Calculator",
    description: "Calculate exact FBR income tax, monthly salary deductions, and net take-home pay for salaried & business individuals for FY 2026-2027.",
    icon: "pakistan-tax",
    href: "/tools/pakistan-income-tax-calculator",
    color: "from-emerald-600 via-teal-600 to-green-500",
    textColor: "text-emerald-600 dark:text-emerald-400",
    category: "Finance",
    popular: true
  },
  {
    title: "Etsy vs Amazon KDP Profit Calculator",
    description: "Compare side-by-side net profits, platform transaction cuts, POD printing costs, and monthly income between Etsy and Amazon KDP.",
    icon: "etsy-vs-kdp",
    href: "/tools/etsy-vs-kdp-calculator",
    color: "from-amber-500 via-orange-500 to-indigo-600",
    textColor: "text-amber-600 dark:text-amber-400",
    category: "Finance",
    popular: true
  },
  {
    title: "Creatine & Fitness Macro Calculator",
    description: "Calculate daily creatine dosage (loading vs maintenance), hydration needs, BMR, TDEE, and fitness macronutrient splits based on ISSN guidelines.",
    icon: "creatine",
    href: "/tools/creatine-calculator",
    color: "from-purple-500 via-indigo-500 to-sky-500",
    textColor: "text-purple-600 dark:text-purple-400",
    category: "Health",
    popular: true
  },
  {
    title: "Pakistan Electricity Bill Calculator",
    description: "Calculate exact domestic electricity bills across all DISCOs (LESCO, IESCO, FESCO, MEPCO, K-Electric) with 2026 NEPRA slabs, GST, and FPA.",
    icon: "pakistan-electricity",
    href: "/tools/pakistan-electricity-bill-calculator",
    color: "from-emerald-500 via-teal-500 to-amber-500",
    textColor: "text-emerald-600 dark:text-emerald-400",
    category: "Finance",
    popular: true
  },
  {
    title: "Pakistan Property Transfer Tax Calculator",
    description: "Calculate property registration taxes, FBR advance tax Section 236K (Buyer) & Section 236C (Seller), stamp duty, and Non-Filer penalties.",
    icon: "property-tax",
    href: "/tools/pakistan-property-tax-calculator",
    color: "from-emerald-600 via-teal-600 to-indigo-600",
    textColor: "text-emerald-600 dark:text-emerald-400",
    category: "Finance",
    popular: true
  },
  {
    title: "Pakistani Gold Calculator (Tola, Masha, Ratti)",
    description: "Convert gold weights between Tola, Masha, Ratti, and Grams, calculate 22K/24K rates, and compute making charges (Jorai) & wastage.",
    icon: "gold",
    href: "/tools/pakistan-gold-calculator",
    color: "from-amber-500 via-yellow-500 to-emerald-500",
    textColor: "text-amber-600 dark:text-amber-400",
    category: "Finance",
    popular: true
  },
  {
    title: "Pakistan Vehicle Token Tax Calculator",
    description: "Calculate annual vehicle token tax, new car registration fees, and FBR Section 231B/234 withholding taxes for Punjab, Sindh & Islamabad.",
    icon: "car-tax",
    href: "/tools/pakistan-vehicle-tax-calculator",
    color: "from-blue-600 via-teal-600 to-emerald-600",
    textColor: "text-blue-600 dark:text-blue-400",
    category: "Finance",
    popular: true
  },
  {
    title: "Pakistan Fuel Cost & Mileage Calculator",
    description: "Compare running cost per km, monthly fuel bills, and payback duration between Petrol, Hybrid (HEV), and Electric Vehicles (EV).",
    icon: "fuel-cost",
    href: "/tools/pakistan-fuel-cost-calculator",
    color: "from-emerald-600 via-teal-600 to-cyan-600",
    textColor: "text-emerald-600 dark:text-emerald-400",
    category: "Finance",
    popular: true
  },
  {
    title: "Dave Ramsey Investment Calculator",
    description: "Calculate compound retirement growth using Dave Ramsey's 15% rule and recommended 4-fund mutual fund portfolio distribution.",
    icon: "ramsey-investment",
    href: "/calculators/ramsey-investment-calculator",
    color: "from-emerald-600 via-teal-600 to-green-500",
    textColor: "text-emerald-600 dark:text-emerald-400",
    category: "Finance",
    popular: true,
    badge: "15% Rule"
  },
  {
    title: "Savings Runway & Retirement Calculator",
    description: "Simulate how long your retirement nest egg will last with compounding yield, annual inflation adjustments, and SWR risk gauges.",
    icon: "retirement-runway",
    href: "/calculators/how-long-will-my-money-last",
    color: "from-teal-600 via-cyan-600 to-emerald-500",
    textColor: "text-teal-600 dark:text-teal-400",
    category: "Finance",
    popular: true,
    badge: "Safe SWR"
  },
  {
    title: "Credit Card Payoff Calculator",
    description: "Find your debt-free date, calculate compound interest charges, and see how extra monthly payments eliminate card balances years sooner.",
    icon: "credit-card",
    href: "/calculators/credit-card-payoff-calculator",
    color: "from-rose-500 via-pink-600 to-amber-500",
    textColor: "text-rose-600 dark:text-rose-400",
    category: "Finance",
    popular: true,
    badge: "Debt Free"
  },
  {
    title: "US State Paycheck Calculators Hub",
    description: "Calculate take-home salary or hourly wages across all 50 US states with 2026 federal brackets, state taxes, and FICA deductions.",
    icon: "paycheck-calculator",
    href: "/calculators/paycheck-calculator",
    color: "from-blue-600 via-cyan-600 to-teal-500",
    textColor: "text-blue-600 dark:text-blue-400",
    category: "Finance",
    popular: true,
    badge: "50 States"
  },
  {
    title: "Hourly to Salary Converter",
    description: "Convert hourly pay into equivalent annual salary, monthly, bi-weekly, and weekly pay with overtime (1.5x) and unpaid time off.",
    icon: "hourly-to-salary",
    href: "/calculators/hourly-to-salary-calculator",
    color: "from-cyan-600 via-teal-600 to-blue-500",
    textColor: "text-cyan-600 dark:text-cyan-400",
    category: "Finance",
    popular: true,
    badge: "Wage Engine"
  },
  {
    title: "Debt Snowball vs. Avalanche Calculator",
    description: "Compare Dave Ramsey's Debt Snowball with Debt Avalanche. Calculate payoff dates, total interest saved, and build a custom multi-debt plan.",
    icon: "debt-snowball-vs-avalanche",
    href: "/calculators/debt-snowball-vs-avalanche-calculator",
    color: "from-indigo-600 via-purple-600 to-pink-500",
    textColor: "text-indigo-600 dark:text-indigo-400",
    category: "Finance",
    popular: true,
    badge: "Snowball vs Avalanche"
  },
  {
    title: "CD Calculator (Certificate of Deposit)",
    description: "Calculate CD maturity value, compound APY growth (daily/monthly), estimated tax deductions, and early exit penalty costs.",
    icon: "cd-calculator",
    href: "/calculators/cd-calculator",
    color: "from-teal-600 via-emerald-600 to-cyan-500",
    textColor: "text-teal-600 dark:text-teal-400",
    category: "Finance",
    popular: true,
    badge: "FDIC Yield"
  },
  {
    title: "15-Year vs. 30-Year Mortgage Calculator",
    description: "Compare 15-year and 30-year fixed mortgages side-by-side. Calculate exact monthly payments, lifetime interest savings, and investing opportunity costs.",
    icon: "mortgage-15-vs-30",
    href: "/calculators/mortgage-15-vs-30-year-calculator",
    color: "from-blue-600 via-teal-600 to-emerald-500",
    textColor: "text-blue-600 dark:text-blue-400",
    category: "Finance",
    popular: true,
    badge: "15 vs 30 Yr"
  },
  {
    title: "Auto Loan Refinance & Payoff Calculator",
    description: "Compare your current car loan against new refinance rates, calculate monthly savings, break-even period, and see the impact of extra monthly payoff payments.",
    icon: "auto-refinance",
    href: "/calculators/auto-loan-refinance-calculator",
    color: "from-emerald-600 via-teal-600 to-cyan-500",
    textColor: "text-emerald-600 dark:text-emerald-400",
    category: "Finance",
    popular: true,
    badge: "Refinance"
  },
  {
    title: "Roth IRA Growth Calculator",
    description: "Project your tax-free retirement growth, compare against taxable accounts, track annual IRS contribution limits, and calculate compounding wealth.",
    icon: "roth-ira",
    href: "/calculators/roth-ira-calculator",
    color: "from-emerald-500 via-teal-600 to-cyan-600",
    textColor: "text-emerald-600 dark:text-emerald-400",
    category: "Finance",
    popular: true,
    badge: "Tax-Free"
  }
];
