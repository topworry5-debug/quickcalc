import { Suspense } from "react";
import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Breadcrumbs from "@/components/Breadcrumbs";
import ShareButtons from "@/components/ShareButtons";
import EmbedWidget from "@/components/EmbedWidget";
import MethodologyAccordion from "@/components/MethodologyAccordion";
import RelatedTools from "@/components/RelatedTools";
import AITokenCostWidget from "./AITokenCostWidget";
import { generateSoftwareAppSchema } from "@/lib/schema";
import { Cpu } from "lucide-react";

export const metadata: Metadata = {
  title: "Free AI Token Cost Calculator - LLM API Pricing & Monthly Projection",
  description: "Calculate LLM API costs for GPT-4o, GPT-4o mini, Claude 3.5 Sonnet, Gemini 1.5 Flash, DeepSeek V3 and more. Estimate cost per request and monthly volume with side-by-side model comparison.",
  alternates: {
    canonical: "/tools/ai-token-cost-calculator",
  },
  openGraph: {
    title: "Free AI Token Cost Calculator - LLM API Pricing & Monthly Projection",
    description: "Calculate LLM API costs for GPT-4o, GPT-4o mini, Claude 3.5 Sonnet, Gemini 1.5 Flash, DeepSeek V3 and more. Estimate cost per request and monthly volume with side-by-side model comparison.",
    url: "https://quickcalc.cloud/tools/ai-token-cost-calculator",
    type: "website",
    siteName: "QuickCalc",
    images: [
      {
        url: "https://quickcalc.cloud/og-image.png",
        width: 1200,
        height: 630,
        alt: "AI Token Cost Calculator on QuickCalc",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Free AI Token Cost Calculator - LLM API Pricing & Monthly Projection",
    description: "Calculate LLM API costs for GPT-4o, GPT-4o mini, Claude 3.5 Sonnet, Gemini 1.5 Flash, DeepSeek V3 and more. Estimate cost per request and monthly volume with side-by-side model comparison.",
  },
};

export default function AITokenCostPage({ searchParams }: { searchParams?: { embed?: string } }) {
  const softwareSchema = generateSoftwareAppSchema({
    name: "Free AI Token Cost Calculator - LLM API Pricing & Monthly Projection",
    description: "Calculate LLM API costs for GPT-4o, GPT-4o mini, Claude 3.5 Sonnet, Gemini 1.5 Flash, DeepSeek V3 and more. Estimate cost per request and monthly volume with side-by-side model comparison.",
    slug: "ai-token-cost-calculator",
    category: "DeveloperApplication",
  });

  const isEmbed = searchParams?.embed === "true";
  if (isEmbed) {
    return (
      <div className="min-h-screen bg-white dark:bg-zinc-950 text-zinc-900 dark:text-zinc-100 font-[family-name:var(--font-geist-sans)] transition-colors p-2 flex flex-col justify-between">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(softwareSchema) }}
        />
        <main className="max-w-4xl mx-auto w-full">
          <AITokenCostWidget />
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
        "name": "How many words are in 1,000 tokens?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "As a rule of thumb in English, 1,000 tokens equal approximately 750 words (roughly 0.75 words per token or 1.33 tokens per word). For code, non-English languages, or complex text, token counts can vary."
        }
      },
      {
        "@type": "Question",
        "name": "Why are output tokens more expensive than input tokens?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Output token generation requires sequential autoregressive inference, where each token generated must run through the entire neural network layers sequentially. Input prompt processing can be parallelized and KV-cached, making prompt tokens computationally cheaper to process."
        }
      },
      {
        "@type": "Question",
        "name": "Are the pricing numbers in this calculator exact?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Prices displayed are approximate rates based on official provider documentation (OpenAI, Anthropic, Google, DeepSeek) as of August 2026. Because API pricing changes frequently, users should verify current rates directly with their provider."
        }
      },
      {
        "@type": "Question",
        "name": "How do I calculate monthly LLM API costs for an app?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Multiply average input token cost plus average output token cost per request by your estimated daily active requests, then multiply by 30 days to project your monthly LLM API expenditure."
        }
      }
    ]
  };

  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-zinc-950 text-zinc-900 dark:text-zinc-100 font-[family-name:var(--font-geist-sans)] transition-colors">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqData) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(softwareSchema) }}
      />

      <Navbar />

      <main className="max-w-4xl mx-auto px-4 py-8 sm:py-12">
        <Breadcrumbs toolName="AI Token Cost Calculator" toolSlug="ai-token-cost-calculator" />

        <div className="text-center max-w-2xl mx-auto mb-8 space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-teal-50 dark:bg-teal-950/50 border border-teal-200 dark:border-teal-800 text-teal-700 dark:text-teal-300 text-xs font-bold tracking-wide">
            <Cpu size={15} className="text-teal-600 dark:text-teal-400" />
            <span>LLM API Cost & Token Budget Estimator</span>
          </div>

          <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-zinc-900 dark:text-white">
            AI Token Cost Calculator
          </h1>
          <p className="text-base sm:text-lg text-zinc-600 dark:text-zinc-400 leading-relaxed">
            Estimate single request costs and monthly API budgets across leading Large Language Models (GPT-4o, GPT-4o mini, Claude 3.5 Sonnet, Gemini 1.5 Flash, DeepSeek V3). Compare model pricing side by side for your exact workload.
          </p>
        </div>

        <ShareButtons url="https://quickcalc.cloud/tools/ai-token-cost-calculator" title="AI Token Cost Calculator" />
        <EmbedWidget url="https://quickcalc.cloud/tools/ai-token-cost-calculator" title="AI Token Cost Calculator" />

        <section className="my-8">
          <Suspense fallback={<div className="p-8 text-center text-zinc-500 animate-pulse">Loading AI token calculator...</div>}>
            <AITokenCostWidget />
          </Suspense>
        </section>

        <MethodologyAccordion slug="ai-token-cost-calculator" />

        <div className="ad-slot ad-slot--inline my-8" data-ad-position="in-content-1">
          <div className="ad-placeholder-label border border-dashed border-zinc-300 dark:border-zinc-800 rounded-xl py-4 flex items-center justify-center bg-zinc-50/50 dark:bg-zinc-950/20 text-[10px] font-bold text-zinc-400 dark:text-zinc-600 uppercase tracking-widest cursor-default">
            Advertisement
          </div>
        </div>

        <article className="prose prose-zinc dark:prose-invert max-w-3xl mx-auto space-y-8 mt-12 border-t border-zinc-200 dark:border-zinc-800 pt-10">
          <section className="space-y-4">
            <h2 className="text-2xl font-bold text-zinc-950 dark:text-white">
              How LLM Token Pricing Works
            </h2>
            <p className="text-zinc-600 dark:text-zinc-400 leading-relaxed">
              API providers price Large Language Models based on <strong>tokens</strong>—the fundamental sub-word chunks used by neural tokenizers (such as Byte-Pair Encoding or SentencePiece). Pricing is structured into two separate rates:
            </p>
            <ul className="list-disc pl-6 text-zinc-600 dark:text-zinc-400 space-y-2">
              <li>
                <strong>Input Tokens (Prompt Context):</strong> The text sent to the model, including system instructions, conversation history, and user prompts.
              </li>
              <li>
                <strong>Output Tokens (Completion Response):</strong> The text generated by the model in response. Output tokens typically cost 3x to 5x more per token than input tokens due to sequential autoregressive processing.
              </li>
            </ul>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-bold text-zinc-950 dark:text-white">
              Word to Token Conversion Rules
            </h2>
            <p className="text-zinc-600 dark:text-zinc-400 leading-relaxed">
              In standard English text, 1 token is equivalent to roughly 0.75 words (or 4 characters). Conversely, 1,000 words equals approximately 1,333 tokens. Our built-in text estimator applies this rule automatically to let you estimate costs directly from raw text or draft prompts.
            </p>
          </section>

          <section className="space-y-4 border-t border-zinc-200 dark:border-zinc-800 pt-8">
            <h2 className="text-2xl font-bold text-zinc-950 dark:text-white border-b border-zinc-100 dark:border-zinc-900 pb-2">
              Frequently Asked Questions (FAQ)
            </h2>
            <div className="space-y-6">
              <div className="space-y-2">
                <h3 className="text-base font-bold text-zinc-900 dark:text-zinc-100">
                  How many words are in 1,000 tokens?
                </h3>
                <p className="text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed">
                  As a rule of thumb in English, 1,000 tokens equal approximately 750 words (roughly 0.75 words per token or 1.33 tokens per word). For code, non-English languages, or complex text, token counts can vary.
                </p>
              </div>

              <div className="space-y-2">
                <h3 className="text-base font-bold text-zinc-900 dark:text-zinc-100">
                  Why are output tokens more expensive than input tokens?
                </h3>
                <p className="text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed">
                  Output token generation requires sequential autoregressive inference, where each token generated must run through the entire neural network layers sequentially. Input prompt processing can be parallelized and KV-cached, making prompt tokens computationally cheaper to process.
                </p>
              </div>

              <div className="space-y-2">
                <h3 className="text-base font-bold text-zinc-900 dark:text-zinc-100">
                  Are the pricing numbers in this calculator exact?
                </h3>
                <p className="text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed">
                  Prices displayed are approximate rates based on official provider documentation (OpenAI, Anthropic, Google, DeepSeek) as of August 2026. Because API pricing changes frequently, users should verify current rates directly with their provider.
                </p>
              </div>

              <div className="space-y-2">
                <h3 className="text-base font-bold text-zinc-900 dark:text-zinc-100">
                  How do I calculate monthly LLM API costs for an app?
                </h3>
                <p className="text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed">
                  Multiply average input token cost plus average output token cost per request by your estimated daily active requests, then multiply by 30 days to project your monthly LLM API expenditure.
                </p>
              </div>
            </div>
          </section>
        </article>

        <RelatedTools currentSlug="ai-token-cost-calculator" />

        <div className="ad-slot ad-slot--footer mt-12" data-ad-position="footer">
          <div className="ad-placeholder-label border border-dashed border-zinc-300 dark:border-zinc-800 rounded-xl py-4 flex items-center justify-center bg-zinc-50/50 dark:bg-zinc-950/20 text-[10px] font-bold text-zinc-400 dark:text-zinc-600 uppercase tracking-widest cursor-default">
            Advertisement
          </div>
        </div>
      </main>

      <Footer customText="Client-side AI pricing, token, and API cost calculators." />
    </div>
  );
}
