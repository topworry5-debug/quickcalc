import type { Metadata } from "next";
import Link from "next/link";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "Privacy Policy | QuickCalc",
  description: "Learn how QuickCalc respects your privacy. We do not collect personal data beyond standard web analytics and non-intrusive cookies.",
  alternates: {
    canonical: "/privacy-policy",
  },
};

export default function PrivacyPolicyPage() {
  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-zinc-950 text-zinc-900 dark:text-zinc-100 font-[family-name:var(--font-geist-sans)]">
      {/* Navigation Header */}
      <header className="border-b border-zinc-200 dark:border-zinc-800 bg-white/80 dark:bg-zinc-900/80 backdrop-blur-md sticky top-0 z-50">
        <div className="max-w-5xl mx-auto px-4 h-16 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2 font-bold text-lg text-zinc-900 dark:text-white">
            <span>✨ QuickCalc</span>
          </Link>
          <div className="text-sm font-medium text-zinc-500 dark:text-zinc-400">
            Privacy Policy
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-3xl mx-auto px-4 py-16 sm:py-20">
        <article className="prose prose-zinc dark:prose-invert max-w-none">
          <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-zinc-900 dark:text-white mb-6">
            Privacy Policy
          </h1>
          <p className="text-xs text-zinc-500 dark:text-zinc-400 mb-8">Last Updated: July 9, 2026</p>
          
          <p className="text-zinc-600 dark:text-zinc-400 leading-relaxed mb-6">
            At QuickCalc, accessible from <strong>quickcalc.cloud</strong>, one of our main priorities is the privacy of our visitors. This Privacy Policy document contains types of information that is collected and recorded by QuickCalc and how we use it.
          </p>

          <h2 className="text-xl font-bold text-zinc-900 dark:text-white mt-8 mb-4">
            No Account Creation or Personal Data Collection
          </h2>
          <p className="text-zinc-600 dark:text-zinc-400 leading-relaxed mb-6">
            Unlike many online tool suites, QuickCalc does not require you to register, create an account, or log in. All calculator inputs (such as financial amounts, weights, GPA grades, or daily routines) are processed entirely inside your local web browser using client-side JavaScript. This data is never uploaded, transferred, or stored on our servers.
          </p>

          <h2 className="text-xl font-bold text-zinc-900 dark:text-white mt-8 mb-4">
            Log Files and standard Web Analytics
          </h2>
          <p className="text-zinc-600 dark:text-zinc-400 leading-relaxed mb-6">
            {"QuickCalc follows a standard procedure of using log files. These files log visitors when they visit websites. The information collected by log files includes internet protocol (IP) addresses, browser type, Internet Service Provider (ISP), date and time stamp, referring/exit pages, and possibly the number of clicks. These are not linked to any information that is personally identifiable. The purpose of the information is for analyzing trends, administering the site, tracking users' movement on the website, and gathering demographic information."}
          </p>

          <h2 className="text-xl font-bold text-zinc-900 dark:text-white mt-8 mb-4">
            Cookies and Tracking Technologies
          </h2>
          <p className="text-zinc-600 dark:text-zinc-400 leading-relaxed mb-6">
            {"Like any other website, QuickCalc uses \"cookies\". These cookies are used to store information including visitors' preferences, and the pages on the website that the visitor accessed or visited. The information is used to optimize the users' experience by customizing our web page content based on visitors' browser type and/or other information."}
          </p>
          <p className="text-zinc-600 dark:text-zinc-400 leading-relaxed mb-6">
            We use third-party services like <strong>Google Analytics</strong> to monitor and analyze the use of our service. Google Analytics is a web analytics service offered by Google that tracks and reports website traffic. Google uses the data collected to track and monitor the use of our service. This data is shared with other Google services.
          </p>

          <h2 className="text-xl font-bold text-zinc-900 dark:text-white mt-8 mb-4">
            Third-Party Advertising Partners & Google AdSense
          </h2>
          <p className="text-zinc-600 dark:text-zinc-400 leading-relaxed mb-6">
            {"Third-party ad servers or ad networks use technologies like cookies, JavaScript, or Web Beacons that are used in their respective advertisements and links that appear on QuickCalc, which are sent directly to users' browsers. They automatically receive your IP address when this occurs. These technologies are used to measure the effectiveness of their advertising campaigns and/or to personalize the advertising content that you see on websites that you visit."}
          </p>
          <ul className="list-disc pl-6 space-y-2 text-zinc-600 dark:text-zinc-400 mb-6">
            <li>Google, as a third-party vendor, uses cookies to serve ads on QuickCalc.</li>
            <li>{"Google's use of the DART cookie enables it to serve ads to our site visitors based upon their visit to quickcalc.cloud and other sites on the Internet."}</li>
            <li>Visitors may choose to decline the use of DART cookies by visiting the Google ad and content network Privacy Policy.</li>
          </ul>

          <h2 className="text-xl font-bold text-zinc-900 dark:text-white mt-8 mb-4">
            Contact Information for Privacy Concerns
          </h2>
          <p className="text-zinc-600 dark:text-zinc-400 leading-relaxed mb-6">
            If you have additional questions or require more information about our Privacy Policy, do not hesitate to contact us by email at <a href="mailto:topworry5@gmail.com" className="text-blue-500 hover:underline">topworry5@gmail.com</a>.
          </p>
        </article>
      </main>

      {/* Footer */}
      <Footer customText="Elegant, science-backed lifestyle modeling solutions." />
    </div>
  );
}
