import MethodologyAccordion from "@/components/MethodologyAccordion";

import Navbar from "@/components/Navbar";
import { generateSoftwareAppSchema } from "@/lib/schema";
import RelatedTools from "@/components/RelatedTools";
import ShareButtons from "@/components/ShareButtons";
import EmbedWidget from "@/components/EmbedWidget";

import Breadcrumbs from "@/components/Breadcrumbs";
import type { Metadata } from "next";
import PasswordGeneratorWidget from "./PasswordGeneratorWidget";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "Secure Password Generator - Strong Local Password Tool",
  description: "Generate cryptographically secure random passwords locally. Calculate precise mathematical entropy, choose memorable options, with 100% browser privacy.",
  alternates: {
    canonical: "/tools/password-generator",
  },
  openGraph: {
    title: "Secure Password Generator - Strong Local Password Tool",
    description: "Generate cryptographically secure random passwords locally. Calculate precise mathematical entropy, choose memorable options, with 100% browser privacy.",
    url: "https://quickcalc.cloud/tools/password-generator",
    type: "website",
    siteName: "QuickCalc",
    images: [
      {
        url: "https://quickcalc.cloud/og-image.png",
        width: 1200,
        height: 630,
        alt: "Secure Password Generator on QuickCalc",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Secure Password Generator - Strong Local Password Tool",
    description: "Generate cryptographically secure random passwords locally. Calculate precise mathematical entropy, choose memorable options, with 100% browser privacy.",
  },
};

export default function PasswordGeneratorPage({ searchParams }: { searchParams?: { embed?: string } }) {
  const softwareSchema = generateSoftwareAppSchema({
    name: "Secure Password Generator - Strong Local Password Tool",
    description: "Generate cryptographically secure random passwords locally. Calculate precise mathematical entropy, choose memorable options, with 100% browser privac",
    slug: "password-generator",
    category: "Utility"
  });

  const isEmbed = searchParams?.embed === "true";
  if (isEmbed) {
    return (
      <div className="min-h-screen bg-white dark:bg-zinc-950 text-zinc-900 dark:text-zinc-100 font-[family-name:var(--font-geist-sans)] transition-colors p-2 flex flex-col justify-between">
      {/* WebApplication JSON-LD Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(softwareSchema) }}
      />

        <main className="max-w-4xl mx-auto w-full">
          <PasswordGeneratorWidget />
        </main>
      </div>
    );
  }

  const faqData = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      {
        "@type": "Question",
        "name": "How do I generate a strong, unhackable password online?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "To learn how to generate a strong password, use a tool that utilizes cryptographically secure random values (such as our tool above). Ensure you combine uppercase letters, lowercase letters, numbers, and symbols in a randomized sequence, avoiding predictable words or sequential patterns."
        }
      },
      {
        "@type": "Question",
        "name": "How many characters long should a secure password be in 2026?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "When considering how long should a password be to be secure, cybersecurity experts recommend a minimum of 12 to 16 characters for standard accounts. For administrator credentials or critical sensitive records, aiming for 16 to 20+ characters ensures uncrackable mathematical entropy."
        }
      },
      {
        "@type": "Question",
        "name": "How can I generate a random password with special characters and numbers?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Yes, our interactive tool acts as a random password generator with symbols. You can customize the exact character set to include special symbols, uppercase, lowercase, or digits, while calculating precise entropy ratings for every password configuration you generate."
        }
      },
      {
        "@type": "Question",
        "name": "Is it safe to use an online password generator, or can my password be intercepted?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Yes, provided the utility operates completely locally on your computer. QuickCalc generates passwords in local memory using the browser's cryptographic Web Crypto API (crypto.getRandomValues()) and never transmits your selections or results across the internet."
        }
      }
    ]
  };

  const softwareData = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    "name": "Secure Password Generator",
    "operatingSystem": "All",
    "applicationCategory": "SecurityApplication",
    "offers": {
      "@type": "Offer",
      "price": "0",
      "priceCurrency": "USD"
    }
  }

  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-zinc-950 text-zinc-900 dark:text-zinc-100 font-[family-name:var(--font-geist-sans)] transition-colors">
      {/* FAQ Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqData) }}
      />
      {/* Software Application Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(softwareData) }}
      />

      {/* Header */}
      <Navbar />

      {/* Main Content */}
      <main className="max-w-4xl mx-auto px-4 py-8 sm:py-12">
        <Breadcrumbs toolName="Secure Password Generator" toolSlug="password-generator" />
        <div className="text-center max-w-2xl mx-auto mb-8">
          <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-zinc-900 dark:text-white mb-4">
            Secure Password Generator
          </h1>
          <p className="text-base sm:text-lg text-zinc-600 dark:text-zinc-400 leading-relaxed">This free tool generates cryptographically secure random passwords and calculates password strength in bits of entropy. If you are looking for how to generate a strong password or need a random password generator with symbols to safeguard your personal accounts, our client-side utility provides the ideal solution. Discover how long should a password be to be secure, evaluate real-time Shannon entropy metrics, and manage your credentials privately.</p>
        </div>

        <ShareButtons url="https://quickcalc.cloud/tools/password-generator" title="Secure Password Generator" />
        <EmbedWidget url="https://quickcalc.cloud/tools/password-generator" title="Secure Password Generator" />

        {/* The interactive widget */}
        <section className="my-8">
          <PasswordGeneratorWidget />
        </section>

        {/* Collapsible Scientific & Mathematical Methodology */}
        <MethodologyAccordion slug="password-generator" />

        {/* Ad Placement 1 */}
        <div className="ad-slot ad-slot--inline" data-ad-position="in-content-1">
          <div className="ad-placeholder-label border border-dashed border-zinc-300 dark:border-zinc-800 rounded-xl py-4 flex items-center justify-center bg-zinc-50/50 dark:bg-zinc-950/20 text-[10px] font-bold text-zinc-400 dark:text-zinc-600 uppercase tracking-widest cursor-default">
            Advertisement
          </div>
        </div>

        {/* Detailed Explanation */}
        <article className="prose prose-zinc dark:prose-invert max-w-3xl mx-auto space-y-8 mt-12 border-t border-zinc-200 dark:border-zinc-800 pt-10">
          <section className="space-y-4">
            <h2 className="text-2xl font-bold text-zinc-950 dark:text-white">
              Why Password Length Beats Complexity for Strong Security
            </h2>
            <p className="text-zinc-600 dark:text-zinc-400 leading-relaxed">
              For years, common password guidelines urged users to create passwords with substitutions like replacing the letter {"'a'"} with {"'@'"} or {"'s'"} with {"'$'"}. Unfortunately, modern hacking rigs and brute-force computer libraries are fully optimized to anticipate these exact combinations.
            </p>
            <p className="text-zinc-600 dark:text-zinc-400 leading-relaxed">
              True password strength is determined by **entropy**, which is a mathematical measure of randomness. Shannon entropy is measured in **bits**:
            </p>
            <ul className="list-disc pl-6 text-zinc-600 dark:text-zinc-400 space-y-2">
              <li>
                <strong>Entropy Calculation:</strong> The number of possible password configurations grows exponentially with length. Adding single characters to a password expands the cracking time exponentially, while swapping a standard character for a symbol only scales linearly.
              </li>
              <li>
                <strong>The Ultimate Security Practice:</strong> A length of 14–16 characters utilizing multiple pools creates a sequence that would take modern supercomputers billions of years to decrypt.
              </li>
              <li>
                <strong>Nudge Toward Password Managers:</strong> Rather than forcing yourself to memorize dozens of highly complex passwords across different websites, you should always leverage a trusted, encrypted password manager (like Bitwarden, 1Password, or Proton Pass) to store unique configurations and avoid unsafe credential recycling.
              </li>
            </ul>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-bold text-zinc-950 dark:text-white">
              How Password Strength and Entropy are Calculated
            </h2>
            <p className="text-zinc-600 dark:text-zinc-400 leading-relaxed">
              To calculate password strength and guarantee cryptographic randomness, our tool relies on standard security definitions:
            </p>
            <ul className="list-disc pl-6 text-zinc-600 dark:text-zinc-400 space-y-2">
              <li>
                <strong>Cryptographic Randomness:</strong> We avoid standard <code>Math.random()</code>, which is pseudo-random and predictable. Instead, we use the browser's native Web Crypto API (<code>window.crypto.getRandomValues()</code>), which requests cryptographically secure random integers generated by the operating system kernel.
              </li>
              <li>
                <strong>Shannon Entropy Formula:</strong> Password entropy is calculated in bits using the equation:
                <div className="bg-zinc-100 dark:bg-zinc-900 p-2 my-2 rounded font-mono text-xs overflow-x-auto text-emerald-600 dark:text-emerald-400">
                  H = L * log2(R)
                </div>
                Where <code>L</code> is the length of the generated password, and <code>R</code> is the size of the character pool (e.g., 26 lowercase, 52 uppercase + lowercase, 62 including digits, or 94 including special symbols).
              </li>
              <li>
                <strong>Entropy Rating Scale:</strong>
                <ul className="list-disc pl-6 space-y-1 mt-1">
                  <li><strong>&lt; 50 bits:</strong> Weak (vulnerable to dictionary and simple brute-force attacks)</li>
                  <li><strong>50 - 79 bits:</strong> Medium (moderate protection against targeted online cracking)</li>
                  <li><strong>80+ bits:</strong> Strong (unfeasible to decrypt under standard timeframe assumptions)</li>
                </ul>
              </li>
            </ul>
          </section>

          {/* Ad Placement 2 */}
          <div className="ad-slot ad-slot--inline" data-ad-position="in-content-2">
            <div className="ad-placeholder-label border border-dashed border-zinc-300 dark:border-zinc-800 rounded-xl py-4 flex items-center justify-center bg-zinc-50/50 dark:bg-zinc-950/20 text-[10px] font-bold text-zinc-400 dark:text-zinc-600 uppercase tracking-widest cursor-default">
              Advertisement
            </div>
          </div>

          {/* FAQ open style matching Age Calculator and Currency Converter */}
          <section className="space-y-4 border-t border-zinc-200 dark:border-zinc-800 pt-8">
            <h2 className="text-2xl font-bold text-zinc-950 dark:text-white border-b border-zinc-100 dark:border-zinc-900 pb-2">
              Frequently Asked Questions (FAQ)
            </h2>
            <div className="space-y-6">
              <div className="space-y-2">
                <h3 className="text-base font-bold text-zinc-900 dark:text-zinc-100">
                  How do I generate a strong, unhackable password online?
                </h3>
                <p className="text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed">
                  To learn how to generate a strong password, use a tool that utilizes cryptographically secure random values (such as our tool above). Ensure you combine uppercase letters, lowercase letters, numbers, and symbols in a randomized sequence, avoiding predictable words or sequential patterns.
                </p>
              </div>

              <div className="space-y-2">
                <h3 className="text-base font-bold text-zinc-900 dark:text-zinc-100">
                  How many characters long should a secure password be in 2026?
                </h3>
                <p className="text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed">
                  When considering how long should a password be to be secure, cybersecurity experts recommend a minimum of 12 to 16 characters for standard accounts. For administrator credentials or critical sensitive records, aiming for 16 to 20+ characters ensures uncrackable mathematical entropy.
                </p>
              </div>

              <div className="space-y-2">
                <h3 className="text-base font-bold text-zinc-900 dark:text-zinc-100">
                  How can I generate a random password with special characters and numbers?
                </h3>
                <p className="text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed">
                  Yes, our interactive tool acts as a random password generator with symbols. You can customize the exact character set to include special symbols, uppercase, lowercase, or digits, while calculating precise entropy ratings for every password configuration you generate.
                </p>
              </div>

              <div className="space-y-2">
                <h3 className="text-base font-bold text-zinc-900 dark:text-zinc-100">
                  Is it safe to use an online password generator, or can my password be intercepted?
                </h3>
                <p className="text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed">
                  Yes, but only if the generator executes 100% inside your local web browser. QuickCalc generates all values on-device inside your browser session using native Web Crypto capabilities. No information is ever uploaded or stored remotely.
                </p>
              </div>
            </div>
          </section>
        </article>

        <RelatedTools currentSlug="password-generator" />

        {/* Ad Placement Footer */}
        <div className="ad-slot ad-slot--footer mt-12" data-ad-position="footer">
          <div className="ad-placeholder-label border border-dashed border-zinc-300 dark:border-zinc-800 rounded-xl py-4 flex items-center justify-center bg-zinc-50/50 dark:bg-zinc-950/20 text-[10px] font-bold text-zinc-400 dark:text-zinc-600 uppercase tracking-widest cursor-default">
            Advertisement
          </div>
        </div>
      </main>

      {/* Footer */}
      <Footer customText="Intuitive, client-side cryptographic security tools." />
    </div>
  );
}
