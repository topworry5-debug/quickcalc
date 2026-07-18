import type { Metadata } from "next";
import Link from "next/link";
import Footer from "@/components/Footer";
import AdSlot from "@/components/AdSlot";

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
    <div className="min-h-screen bg-zinc-50 dark:bg-zinc-950 text-zinc-900 dark:text-zinc-100 font-[family-name:var(--font-geist-sans)]">
      {/* JSON-LD WebSite Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
      />

      {/* Navigation Header */}
      <header className="border-b border-zinc-200 dark:border-zinc-800 bg-white/80 dark:bg-zinc-900/80 backdrop-blur-md sticky top-0 z-50">
        <div className="max-w-5xl mx-auto px-4 h-16 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2 font-bold text-lg text-zinc-900 dark:text-white">
            <span>✨ QuickCalc</span>
          </Link>
          <div className="text-sm font-medium text-zinc-500 dark:text-zinc-400">
            Ultimate Calculator Suite
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <main className="max-w-5xl mx-auto px-4 py-16 sm:py-20">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight text-zinc-900 dark:text-white mb-6">
            Elegant, Science-Backed <span className="bg-gradient-to-r from-blue-600 via-indigo-500 to-emerald-500 bg-clip-text text-transparent">Calculator Suite</span>
          </h1>
          <p className="text-lg text-zinc-600 dark:text-zinc-400 leading-relaxed">
            QuickCalc offers a collection of beautiful, fully featured, and highly responsive tools tailored directly for your health, finance, and educational calculation needs. Designed with precision, ease-of-use, and accessibility in mind.
          </p>
        </div>

        {/* AdSense Placement Ad-Slot-Home-Top */}
        <div className="mb-12">
          <AdSlot slot="home-top" />
        </div>

        {/* Tools Grid */}
        <section className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {tools.map((tool) => (
            <Link
              key={tool.href}
              href={tool.href}
              className="group block bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 hover:border-zinc-300 dark:hover:border-zinc-700 rounded-2xl shadow-sm hover:shadow-lg transition-all duration-300 overflow-hidden"
            >
              <div className="p-6 sm:p-8 flex flex-col h-full justify-between">
                <div>
                  <div className="flex items-center gap-4 mb-4">
                    <div className={`w-12 h-12 rounded-xl bg-gradient-to-r ${tool.color} flex items-center justify-center text-2xl text-white shadow-inner`}>
                      {tool.icon}
                    </div>
                    <h2 className="text-xl font-bold text-zinc-900 dark:text-white group-hover:text-zinc-950 dark:group-hover:text-zinc-200 transition-colors">
                      {tool.title}
                    </h2>
                  </div>
                  <p className="text-zinc-600 dark:text-zinc-400 text-sm leading-relaxed mb-6">
                    {tool.description}
                  </p>
                </div>
                <div className={`inline-flex items-center gap-2 text-sm font-semibold ${tool.textColor} group-hover:underline`}>
                  Open Calculator &rarr;
                </div>
              </div>
            </Link>
          ))}
        </section>

        {/* AdSense Placement Ad-Slot-Home-Bottom */}
        <div className="mt-16">
          <AdSlot slot="home-bottom" />
        </div>
      </main>

      {/* Footer */}
      <Footer customText="Elegant, science-backed lifestyle modeling solutions." />
    </div>
  );
}
