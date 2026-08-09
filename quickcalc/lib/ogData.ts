/**
 * ogData.ts — Centralised Open Graph metadata for every tool page.
 *
 * Each entry provides:
 *  - tagline   : Short action phrase shown beneath the tool name in the OG card
 *  - example   : A small concrete sample result (the "alive preview" moment)
 *  - gradient  : CSS-compatible gradient stops [from, to] as hex strings
 *  - accent    : Single accent hex used for badge/chip background
 *  - category  : Human-readable category label shown on the card
 */

export interface ToolOGData {
  name: string;
  tagline: string;
  example: string;
  gradient: string[];   // at least 2 stops; renderer uses [0] and last
  accent: string;
  category: string;
}

/** Map from tool slug → OG image data */
export const toolOGData: Record<string, ToolOGData> = {
  "bmi-calculator": {
    name: "BMI Calculator",
    tagline: "Instant Body Mass Index — no sign-up",
    example: "BMI 22.5 → Normal Weight ✓",
    gradient: ["#059669", "#0d9488"],
    accent: "#ecfdf5",
    category: "Health & Wellness",
  },
  "calorie-calculator": {
    name: "Calorie Calculator",
    tagline: "Find your daily energy targets (TDEE & BMR)",
    example: "TDEE 2,150 kcal/day — Moderate Activity",
    gradient: ["#ea580c", "#d97706"],
    accent: "#fff7ed",
    category: "Health & Wellness",
  },
  "macro-calculator": {
    name: "Macro Calculator",
    tagline: "Daily protein, carb & fat targets in grams",
    example: "2,000 kcal → 150g Protein | 200g Carbs | 67g Fat",
    gradient: ["#f97316", "#10b981", "#06b6d4"],
    accent: "#fff7ed",
    category: "Health & Wellness",
  },
  "water-intake-calculator": {
    name: "Water Intake Calculator",
    tagline: "Personalised daily hydration targets",
    example: "8.5 cups / day for 75 kg, active",
    gradient: ["#2563eb", "#0284c7"],
    accent: "#eff6ff",
    category: "Health & Wellness",
  },
  "pace-calculator": {
    name: "Pace Calculator",
    tagline: "Running pace, time & distance — 3-in-1",
    example: "5K in 25 min → 5:00/km pace",
    gradient: ["#1d4ed8", "#4f46e5"],
    accent: "#eef2ff",
    category: "Health & Wellness",
  },
  "due-date-calculator": {
    name: "Due Date Calculator",
    tagline: "Pregnancy timeline & trimester tracker",
    example: "EDD: March 15, 2025 — Week 12 Trimester 1",
    gradient: ["#e11d48", "#db2777"],
    accent: "#fff1f2",
    category: "Health & Wellness",
  },
  "pregnancy-weight-gain-calculator": {
    name: "Pregnancy Weight Gain",
    tagline: "Safe, personalised gestational weight targets",
    example: "Week 20: +10–13 lbs recommended",
    gradient: ["#0d9488", "#10b981"],
    accent: "#f0fdf4",
    category: "Health & Wellness",
  },
  "sleep-cycle-calculator": {
    name: "Sleep Cycle Calculator",
    tagline: "Wake up refreshed using 90-min sleep cycles",
    example: "Sleep 10 PM → Wake 6:00 AM (5 cycles)",
    gradient: ["#6366f1", "#7c3aed"],
    accent: "#eef2ff",
    category: "Health & Wellness",
  },
  "loan-calculator": {
    name: "Loan / EMI Calculator",
    tagline: "Monthly payments, interest & amortization",
    example: "$300K @ 6.5% / 30 yr → $1,896/mo EMI",
    gradient: ["#14b8a6", "#06b6d4"],
    accent: "#f0fdfa",
    category: "Finance & Math",
  },
  "savings-growth-calculator": {
    name: "Savings Growth Calculator",
    tagline: "Compound interest — watch your wealth grow",
    example: "$500/mo @ 7% for 20 yr → $260,464",
    gradient: ["#14b8a6", "#10b981", "#2563eb"],
    accent: "#f0fdfa",
    category: "Finance & Math",
  },
  "retirement-calculator": {
    name: "Retirement Calculator",
    tagline: "Model your compound retirement nest egg",
    example: "Start at 30 → $1.2M by 65 at 7%",
    gradient: ["#059669", "#0d9488"],
    accent: "#ecfdf5",
    category: "Finance & Math",
  },
  "salary-take-home-calculator": {
    name: "Salary Take-Home",
    tagline: "After-tax pay in US · Canada · Pakistan",
    example: "$80K gross → $61,200 net (US, Monthly $5,100)",
    gradient: ["#14b8a6", "#06b6d4", "#10b981"],
    accent: "#f0fdfa",
    category: "Finance & Math",
  },
  "freelance-rate-calculator": {
    name: "Freelance Rate Calculator",
    tagline: "Minimum hourly & daily rates — zero guesswork",
    example: "$75K income → $55.80/hr min rate (70% billable)",
    gradient: ["#0d9488", "#10b981", "#4f46e5"],
    accent: "#f0fdfa",
    category: "Finance & Math",
  },
  "budget-calculator": {
    name: "Budget Calculator",
    tagline: "50/30/20 rule — visualise your spending split",
    example: "$5,000/mo → $2,500 needs, $1,500 wants",
    gradient: ["#3b82f6", "#6366f1", "#10b981"],
    accent: "#eff6ff",
    category: "Finance & Math",
  },
  "tip-calculator": {
    name: "Tip Calculator",
    tagline: "Split bills & calculate gratuity for groups",
    example: "$120 bill + 18% tip → $14.16/person (6 ppl)",
    gradient: ["#14b8a6", "#06b6d4"],
    accent: "#f0fdfa",
    category: "Finance & Math",
  },
  "percentage-calculator": {
    name: "Percentage Calculator",
    tagline: "Percentage changes, fractions & discounts",
    example: "15% of 240 = 36 · 36 is 15% of 240",
    gradient: ["#3b82f6", "#4f46e5"],
    accent: "#eff6ff",
    category: "Finance & Math",
  },
  "discount-calculator": {
    name: "Discount Calculator",
    tagline: "Sale prices with single or stacked discounts",
    example: "$199 − 30% − 10% → $125.37 final price",
    gradient: ["#3b82f6", "#6366f1", "#10b981"],
    accent: "#eff6ff",
    category: "Finance & Math",
  },
  "inflation-calculator": {
    name: "Inflation Calculator",
    tagline: "Buying power then vs now — US, Canada, Pakistan",
    example: "$1,000 in 2000 → $1,797 in 2024 (US CPI)",
    gradient: ["#3b82f6", "#6366f1", "#9333ea"],
    accent: "#eff6ff",
    category: "Finance & Math",
  },
  "currency-converter": {
    name: "Currency Converter",
    tagline: "35+ currencies with live exchange rates",
    example: "1 USD = 0.92 EUR · 1.36 CAD · 278 PKR",
    gradient: ["#14b8a6", "#10b981", "#3b82f6"],
    accent: "#f0fdfa",
    category: "Finance & Math",
  },
  "habit-cost-calculator": {
    name: "Habit Cost Calculator",
    tagline: "The true long-term cost of daily habits",
    example: "$6 coffee/day → $65,700 over 30 years",
    gradient: ["#f59e0b", "#f97316", "#ef4444"],
    accent: "#fffbeb",
    category: "Finance & Math",
  },
  "zakat-calculator": {
    name: "Zakat Calculator",
    tagline: "2.5% obligatory charity — category breakdown",
    example: "$15,000 savings above Nisab → $375 Zakat",
    gradient: ["#059669", "#0d9488"],
    accent: "#ecfdf5",
    category: "Finance & Math",
  },
  "group-expense-splitter": {
    name: "Group Expense Splitter",
    tagline: "Split bills unevenly across any group",
    example: "$340 trip · 4 people → $85.00 each",
    gradient: ["#6366f1", "#7c3aed"],
    accent: "#eef2ff",
    category: "Finance & Math",
  },
  "shoe-size-converter": {
    name: "Shoe Size Converter",
    tagline: "US · UK · EU · Japan — instant conversion",
    example: "US Men 10 = UK 9 = EU 44 = JP 28",
    gradient: ["#3b82f6", "#4f46e5"],
    accent: "#eff6ff",
    category: "Converter",
  },
  "paper-fabric-size-converter": {
    name: "Paper & Fabric Converter",
    tagline: "ISO paper formats & fabric length conversion",
    example: "A4 = 210 × 297 mm = 8.27 × 11.69 in",
    gradient: ["#059669", "#0d9488"],
    accent: "#ecfdf5",
    category: "Converter",
  },
  "gpa-converter": {
    name: "GPA Converter",
    tagline: "International grades → 4.0 GPA scale",
    example: "85% (India) = 3.5 GPA · UK 2:1 = 3.3 GPA",
    gradient: ["#059669", "#0d9488"],
    accent: "#ecfdf5",
    category: "Converter",
  },
  "json-csv-converter": {
    name: "JSON ↔ CSV Converter",
    tagline: "Convert between JSON and CSV in-browser",
    example: "[{\"name\":\"Alice\",\"age\":30}] → CSV instantly",
    gradient: ["#3f3f46", "#18181b"],
    accent: "#f4f4f5",
    category: "Utility & Dev",
  },
  "regex-tester": {
    name: "Regex Tester",
    tagline: "Live regex matching with plain-English hints",
    example: "/^\\d{4}-\\d{2}-\\d{2}$/ matches 2024-08-01",
    gradient: ["#3b82f6", "#4f46e5"],
    accent: "#eff6ff",
    category: "Utility & Dev",
  },
  "color-palette-generator": {
    name: "Color Palette Generator",
    tagline: "Extract dominant colors from any image",
    example: "#1A2E4A · #D4884F · #F2C97D · #8AB5A5",
    gradient: ["#059669", "#0d9488"],
    accent: "#ecfdf5",
    category: "Utility & Dev",
  },
  "word-character-counter": {
    name: "Word & Character Counter",
    tagline: "Live word, char & reading time counts",
    example: "1,247 words · 6,832 chars · ~5 min read",
    gradient: ["#3b82f6", "#4f46e5"],
    accent: "#eff6ff",
    category: "Utility & Dev",
  },
  "password-generator": {
    name: "Password Generator",
    tagline: "Cryptographically secure passwords locally",
    example: "K#9mP$xRt2@Lq8Wn — 128-bit entropy",
    gradient: ["#3f3f46", "#18181b"],
    accent: "#f4f4f5",
    category: "Utility & Dev",
  },
  "age-calculator": {
    name: "Age Calculator",
    tagline: "Exact age, zodiac, generation & countdown",
    example: "Born Jun 12, 1990 → 34 yrs 1 mo 26 days",
    gradient: ["#3b82f6", "#6366f1", "#10b981"],
    accent: "#eff6ff",
    category: "Planning",
  },
  "timezone-meeting-planner": {
    name: "Timezone Meeting Planner",
    tagline: "Find the perfect time across timezones",
    example: "NYC 9 AM = London 2 PM = Tokyo 11 PM",
    gradient: ["#3b82f6", "#4f46e5"],
    accent: "#eff6ff",
    category: "Planning",
  },
  "travel-time-fuel-calculator": {
    name: "Travel Time & Fuel Cost",
    tagline: "Speed, distance, time & fuel cost estimator",
    example: "300 mi @ 65 mph → 4h 37m · ~$45 fuel",
    gradient: ["#2563eb", "#4f46e5", "#0284c7"],
    accent: "#eff6ff",
    category: "Planning",
  },
};

/** Derive a slug from the tool href */
export function slugFromHref(href: string) {
  return href.replace("/tools/", "");
}
