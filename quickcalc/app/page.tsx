import type { Metadata } from "next";
import HomeClient from "./HomeClient";

export const metadata: Metadata = {
  title: "QuickCalc - Elegant, Science-Backed Calculator Suite",
  description: "QuickCalc offers a collection of beautiful, fully featured, and highly responsive tools tailored directly for your health, finance, and educational calculation needs.",
  alternates: {
    canonical: "/",
  },
};

export default function Home() {
  const tools = [
    {
      title: "BMI Calculator",
      description: "Calculate your body mass index (BMI) instantly. Analyze clinical weight ranges with a live horizontal gauge.",
      icon: "⚖️",
      href: "/tools/bmi-calculator",
      color: "from-emerald-500 to-teal-600",
      textColor: "text-emerald-600 dark:text-emerald-400"
    },
    {
      title: "Water Intake Calculator",
      description: "Calculate your ideal daily hydration requirements based on your body weight, activity level, and climate.",
      icon: "💧",
      href: "/tools/water-intake-calculator",
      color: "from-blue-500 to-sky-600",
      textColor: "text-blue-600 dark:text-blue-400"
    },
    {
      title: "Due Date Calculator",
      description: "Estimate your baby's arrival date, trace gestational milestones, and follow your week-by-week trimester timeline.",
      icon: "👶",
      href: "/tools/due-date-calculator",
      color: "from-rose-500 to-pink-600",
      textColor: "text-rose-600 dark:text-rose-400"
    },
    {
      title: "Shoe Size Converter",
      description: "Convert shoe sizes instantly between US, UK, EU, and Japan systems simultaneously with built-in brand variance guidance.",
      icon: "👟",
      href: "/tools/shoe-size-converter",
      color: "from-blue-500 to-indigo-600",
      textColor: "text-blue-600 dark:text-blue-400"
    },
    {
      title: "Paper & Fabric Size Converter",
      description: "Convert standard print paper formats and fabric lengths simultaneously with two dedicated, live-updating modes.",
      icon: "📏",
      href: "/tools/paper-fabric-size-converter",
      color: "from-emerald-500 to-teal-600",
      textColor: "text-emerald-600 dark:text-emerald-400"
    },
    {
      title: "JSON & CSV Converter",
      description: "Convert JSON to CSV and CSV back to nested JSON structures securely in browser memory. 100% private client-side translation.",
      icon: "🛡️",
      href: "/tools/json-csv-converter",
      color: "from-zinc-700 to-zinc-900",
      textColor: "text-zinc-700 dark:text-zinc-300"
    },
    {
      title: "Regex Tester",
      description: "Test and debug regular expressions instantly with live colored highlighting and plain-language pattern explanations.",
      icon: "🔍",
      href: "/tools/regex-tester",
      color: "from-blue-500 to-indigo-600",
      textColor: "text-blue-600 dark:text-blue-400"
    },
    {
      title: "Sleep Cycle Calculator",
      description: "Optimize your bedtime and waking schedule using 90-minute sleep cycles to wake up refreshed and energetic.",
      icon: "🌙",
      href: "/tools/sleep-cycle-calculator",
      color: "from-indigo-500 to-purple-600",
      textColor: "text-indigo-600 dark:text-indigo-400"
    },
    {
      title: "GPA Converter",
      description: "Convert international grades and percentages from US, UK, Canada, India, and Pakistan to the standard 4.0 scale.",
      icon: "🎓",
      href: "/tools/gpa-converter",
      color: "from-emerald-500 to-teal-600",
      textColor: "text-emerald-600 dark:text-emerald-400"
    },
    {
      title: "Loan / EMI Calculator",
      description: "Calculate monthly installments, interest payments, and view a comprehensive year-by-year amortization schedule.",
      icon: "💵",
      href: "/tools/loan-calculator",
      color: "from-teal-500 to-cyan-600",
      textColor: "text-teal-600 dark:text-teal-400"
    },
    {
      title: "Color Palette Generator",
      description: "Extract up to 8 beautiful dominant colors from any image. Analyze WCAG contrast compliance and export custom CSS/Tailwind configurations.",
      icon: "🎨",
      href: "/tools/color-palette-generator",
      color: "from-emerald-500 to-teal-600",
      textColor: "text-emerald-600 dark:text-emerald-400"
    },
    {
      title: "Word & Character Counter",
      description: "Count words, characters, sentences, paragraphs, and estimated reading times. Get live warning notifications for popular social post limits.",
      icon: "📝",
      href: "/tools/word-character-counter",
      color: "from-blue-500 to-indigo-600",
      textColor: "text-blue-600 dark:text-blue-400"
    },
    {
      title: "Secure Password Generator",
      description: "Generate cryptographically secure passwords locally with precise entropy calculations and customizable pools.",
      icon: "🔑",
      href: "/tools/password-generator",
      color: "from-zinc-700 to-zinc-900",
      textColor: "text-zinc-700 dark:text-zinc-300"
    },
    {
      title: "Timezone Meeting Planner",
      description: "Schedule meetings across multiple timezones safely using geographical database options and overlap calculations.",
      icon: "🗺️",
      href: "/tools/timezone-meeting-planner",
      color: "from-blue-500 to-indigo-600",
      textColor: "text-blue-600 dark:text-blue-400"
    },
    {
      title: "Tip Calculator",
      description: "Calculate custom tipping values instantly, split bills evenly between groups, and copy detailed breakdowns locally.",
      icon: "💵",
      href: "/tools/tip-calculator",
      color: "from-teal-500 to-cyan-600",
      textColor: "text-teal-600 dark:text-teal-400"
    },
    {
      title: "Percentage Calculator",
      description: "Calculate percentage changes, fractions, savings, discount values, and reverse percentages instantly with dynamic formulas.",
      icon: "📊",
      href: "/tools/percentage-calculator",
      color: "from-blue-500 to-indigo-600",
      textColor: "text-blue-600 dark:text-blue-400"
    }
  ];

  const websiteSchema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "name": "QuickCalc",
    "url": "https://quickcalc.cloud",
    "potentialAction": {
      "@type": "SearchAction",
      "target": {
        "@type": "EntryPoint",
        "urlTemplate": "https://quickcalc.cloud/?q={search_term_string}"
      },
      "query-input": "required name=search_term_string"
    }
  };

  return (
    <>
      {/* JSON-LD WebSite Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
      />
      <HomeClient initialTools={tools} />
    </>
  );
}
