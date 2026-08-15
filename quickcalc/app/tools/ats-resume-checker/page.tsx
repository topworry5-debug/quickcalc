import MethodologyAccordion from "@/components/MethodologyAccordion";
import { Suspense } from "react";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import { generateSoftwareAppSchema } from "@/lib/schema";
import RelatedTools from "@/components/RelatedTools";
import ShareButtons from "@/components/ShareButtons";
import EmbedWidget from "@/components/EmbedWidget";
import Breadcrumbs from "@/components/Breadcrumbs";
import type { Metadata } from "next";
import AtsResumeWidget from "./AtsResumeWidget";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "Free ATS Resume Score Checker - 100% Client-Side Privacy",
  description:
    "Check your resume against job postings to find missing keywords and calculate ATS match score. 100% free & client-side — your resume text never leaves your browser.",
  alternates: {
    canonical: "/tools/ats-resume-checker",
  },
  openGraph: {
    title: "Free ATS Resume Score Checker - 100% Client-Side Privacy",
    description:
      "Check your resume against job postings to find missing keywords and calculate ATS match score. 100% free & client-side — your resume text never leaves your browser.",
    url: "https://quickcalc.cloud/tools/ats-resume-checker",
    type: "website",
    siteName: "QuickCalc",
    images: [
      {
        url: "https://quickcalc.cloud/og-image.png",
        width: 1200,
        height: 630,
        alt: "Free ATS Resume Score Checker on QuickCalc",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Free ATS Resume Score Checker - 100% Client-Side Privacy",
    description:
      "Check your resume against job postings to find missing keywords and calculate ATS match score. 100% free & client-side — your resume text never leaves your browser.",
  },
};

export default function AtsResumePage({
  searchParams,
}: {
  searchParams?: { embed?: string };
}) {
  const softwareSchema = generateSoftwareAppSchema({
    name: "Free ATS Resume Score Checker",
    description:
      "Check your resume against job postings to find missing keywords and calculate ATS match score. 100% free & client-side — your resume text never leaves your browser.",
    slug: "ats-resume-checker",
    category: "Utility",
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
          <AtsResumeWidget />
        </main>
      </div>
    );
  }

  const faqData = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: "Is my resume uploaded to a server or saved?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "No. QuickCalc processes 100% of your text locally inside your browser memory. No resume data or job descriptions are ever uploaded, saved to a database, or transmitted across any server network.",
        },
      },
      {
        "@type": "Question",
        name: "What is an ATS resume match score?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "An Applicant Tracking System (ATS) match score measures how well your resume matches the specific technical skills, tools, qualifications, and terminology listed in a job posting.",
        },
      },
      {
        "@type": "Question",
        name: "What ATS score should I aim for before applying?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Aim for an ATS match score of 75% or higher. Scoring above 75% indicates that your resume naturally contains the vast majority of essential skills and qualifications prioritized by recruiters.",
        },
      },
      {
        "@type": "Question",
        name: "How do I fix missing keywords without keyword stuffing?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Incorporate missing terms naturally within the context of your work experience bullet points. Provide specific achievements, metrics, or project contexts rather than adding a random list of disconnected words at the bottom of your document.",
        },
      },
    ],
  };

  const softwareData = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: "ATS Resume Score Checker",
    operatingSystem: "All",
    applicationCategory: "BusinessApplication",
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "USD",
    },
  };

  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-zinc-950 text-zinc-900 dark:text-zinc-100 font-[family-name:var(--font-geist-sans)] transition-colors">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqData) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(softwareData) }}
      />

      <Navbar />

      <main className="max-w-4xl mx-auto px-4 py-8 sm:py-12">
        <Breadcrumbs toolName="ATS Resume Checker" toolSlug="ats-resume-checker" />

        <div className="text-center max-w-2xl mx-auto mb-8">
          <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-zinc-900 dark:text-white mb-4">
            ATS Resume Score Checker
          </h1>
          <p className="text-base sm:text-lg text-zinc-600 dark:text-zinc-400 leading-relaxed">
            Use our <strong>free ATS resume checker</strong> and <strong>resume keyword scanner</strong> to compare your resume against target job descriptions in real-time. Calculate your ATS match score percentage, identify missing skills, and audit document layout standards. As a 100% private <strong>Jobscan alternative free</strong> of cost and account requirements, your resume text never leaves your browser.
          </p>
        </div>

        <ShareButtons
          url="https://quickcalc.cloud/tools/ats-resume-checker"
          title="ATS Resume Score Checker"
        />
        <EmbedWidget
          url="https://quickcalc.cloud/tools/ats-resume-checker"
          title="ATS Resume Score Checker"
        />

        <section className="my-8">
          <Suspense
            fallback={
              <div className="p-8 text-center text-zinc-500 animate-pulse">
                Loading ATS resume checker...
              </div>
            }
          >
            <AtsResumeWidget />
          </Suspense>
        </section>

        <MethodologyAccordion slug="ats-resume-checker" />

        <div className="ad-slot ad-slot--inline" data-ad-position="in-content-1">
          <div className="ad-placeholder-label border border-dashed border-zinc-300 dark:border-zinc-800 rounded-xl py-4 flex items-center justify-center bg-zinc-50/50 dark:bg-zinc-950/20 text-[10px] font-bold text-zinc-400 dark:text-zinc-600 uppercase tracking-widest cursor-default">
            Advertisement
          </div>
        </div>

        <article className="prose prose-zinc dark:prose-invert max-w-3xl mx-auto space-y-8 mt-12 border-t border-zinc-200 dark:border-zinc-800 pt-10">
          <section className="space-y-4">
            <h2 className="text-2xl font-bold text-zinc-950 dark:text-white">
              How Applicant Tracking Systems (ATS) Filter Resumes
            </h2>
            <p className="text-zinc-600 dark:text-zinc-400 leading-relaxed">
              Over 90% of Fortune 500 companies and mid-sized employers use Applicant Tracking Systems (ATS) such as Greenhouse, Lever, Workday, or Taleo to pre-screen job applicants before a human recruiter ever reviews a resume.
            </p>
            <p className="text-zinc-600 dark:text-zinc-400 leading-relaxed">
              These automated scanners extract text from submitted resumes, parse key skills, and rank candidates based on keyword relevance to the employer’s job description.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-bold text-zinc-950 dark:text-white">
              Why Browser-Local Privacy Matters for Job Seekers
            </h2>
            <p className="text-zinc-600 dark:text-zinc-400 leading-relaxed">
              Many popular online resume checkers (such as Jobscan or Resume Worded) require users to register accounts and upload PDF/Word files to remote servers. This introduces privacy risks, as personal contact information, employment history, and internal work details are stored on commercial cloud databases.
            </p>
            <p className="text-zinc-600 dark:text-zinc-400 leading-relaxed">
              QuickCalc takes the opposite approach: <strong>all parsing, stemming, and keyword calculations execute 100% inside your browser memory</strong>. Your resume text is never transmitted over a network or stored anywhere. If you also need to audit your document character counts or check reading times, try our free{" "}
              <Link
                href="/tools/word-character-counter"
                className="text-emerald-600 dark:text-emerald-400 font-semibold underline hover:text-emerald-700"
              >
                Word &amp; Character Counter
              </Link>.
            </p>
          </section>

          <div className="ad-slot ad-slot--inline" data-ad-position="in-content-2">
            <div className="ad-placeholder-label border border-dashed border-zinc-300 dark:border-zinc-800 rounded-xl py-4 flex items-center justify-center bg-zinc-50/50 dark:bg-zinc-950/20 text-[10px] font-bold text-zinc-400 dark:text-zinc-600 uppercase tracking-widest cursor-default">
              Advertisement
            </div>
          </div>

          <section className="space-y-4 border-t border-zinc-200 dark:border-zinc-800 pt-8">
            <h2 className="text-2xl font-bold text-zinc-950 dark:text-white border-b border-zinc-100 dark:border-zinc-900 pb-2">
              Frequently Asked Questions (FAQ)
            </h2>
            <div className="space-y-6">
              <div className="space-y-2">
                <h3 className="text-base font-bold text-zinc-900 dark:text-zinc-100">
                  Is my resume uploaded to a server or saved?
                </h3>
                <p className="text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed">
                  No. QuickCalc processes 100% of your text locally inside your browser memory. No resume data or job descriptions are ever uploaded, saved to a database, or transmitted across any server network.
                </p>
              </div>

              <div className="space-y-2">
                <h3 className="text-base font-bold text-zinc-900 dark:text-zinc-100">
                  What is an ATS resume match score?
                </h3>
                <p className="text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed">
                  An Applicant Tracking System (ATS) match score measures how well your resume matches the specific technical skills, tools, qualifications, and terminology listed in a job posting.
                </p>
              </div>

              <div className="space-y-2">
                <h3 className="text-base font-bold text-zinc-900 dark:text-zinc-100">
                  What ATS score should I aim for before applying?
                </h3>
                <p className="text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed">
                  Aim for an ATS match score of 75% or higher. Scoring above 75% indicates that your resume naturally contains the vast majority of essential skills and qualifications prioritized by recruiters.
                </p>
              </div>

              <div className="space-y-2">
                <h3 className="text-base font-bold text-zinc-900 dark:text-zinc-100">
                  How do I fix missing keywords without keyword stuffing?
                </h3>
                <p className="text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed">
                  Incorporate missing terms naturally within the context of your work experience bullet points. Provide specific achievements, metrics, or project contexts rather than adding a random list of disconnected words at the bottom of your document.
                </p>
              </div>
            </div>
          </section>
        </article>

        <RelatedTools currentSlug="ats-resume-checker" />

        <div className="ad-slot ad-slot--footer mt-12" data-ad-position="footer">
          <div className="ad-placeholder-label border border-dashed border-zinc-300 dark:border-zinc-800 rounded-xl py-4 flex items-center justify-center bg-zinc-50/50 dark:bg-zinc-950/20 text-[10px] font-bold text-zinc-400 dark:text-zinc-600 uppercase tracking-widest cursor-default">
            Advertisement
          </div>
        </div>
      </main>

      <Footer customText="100% browser-local ATS resume keyword checking with zero cloud uploads." />
    </div>
  );
}
