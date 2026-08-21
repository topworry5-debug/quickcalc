import Link from "next/link";

export default function EtsyVsAmazonKdpProfitComparisonGuideArticle() {
  return (
    <>
      <p className="bg-amber-50 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-900/50 p-4 rounded-xl text-zinc-800 dark:text-zinc-200 font-medium">
        <strong>Quick Answer:</strong> When comparing profit between Etsy and Amazon KDP for journals, planners, and low-content products, <strong>Etsy delivers higher profit margins (85%–90%) on digital downloads</strong> (printable PDFs and Canva templates with $0 COGS), whereas <strong>Amazon KDP generates higher net profits and scales faster on physical paperbacks</strong> due to automated Prime delivery, wholesale in-house printing ($2.44 for 120 pages), and $0 listing fees. On a $14.99 physical journal, KDP yields $6.55 net royalty (43.7% margin) with zero fulfillment effort, while Etsy POD yields $7.24 (48.3% margin) but requires managing supplier logistics and shipping. To calculate your exact side-by-side creator earnings, use our free <Link href="/tools/etsy-vs-kdp-calculator" className="text-amber-600 dark:text-amber-400 font-semibold underline">Etsy vs Amazon KDP Profit Calculator</Link>.
      </p>

      <h2 className="text-2xl sm:text-3xl font-bold text-zinc-900 dark:text-white mt-10 mb-4">
        The Creator Dilemma: Etsy Marketplace vs. Amazon KDP Ecosystem
      </h2>
      <p>
        Digital creators, graphic designers, and independent publishers creating planners, guided journals, coloring books, and workbooks face a critical distribution choice: should you open an Etsy storefront or publish directly to Amazon Kindle Direct Publishing?
      </p>
      <p>
        While both platforms offer global audience reach, their underlying business models, fulfillment mechanisms, and creator fee structures are fundamentally different.
      </p>

      <h2 className="text-2xl sm:text-3xl font-bold text-zinc-900 dark:text-white mt-10 mb-4">
        Direct Side-by-Side Marketplace Fee Matrix
      </h2>

      {/* Comparison Matrix Table */}
      <div className="my-8 overflow-x-auto">
        <table className="w-full text-left text-sm border-collapse border border-zinc-200 dark:border-zinc-800">
          <thead>
            <tr className="bg-zinc-100 dark:bg-zinc-800/80 text-zinc-900 dark:text-white font-bold">
              <th className="p-3 border border-zinc-200 dark:border-zinc-800">Feature / Fee</th>
              <th className="p-3 border border-zinc-200 dark:border-zinc-800">Etsy Storefront</th>
              <th className="p-3 border border-zinc-200 dark:border-zinc-800">Amazon KDP</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-zinc-200 dark:divide-zinc-800 text-zinc-700 dark:text-zinc-300">
            <tr>
              <td className="p-3 font-semibold">Upfront Listing Fee</td>
              <td className="p-3 text-amber-600 dark:text-amber-400">$0.20 per item (4-month renewal)</td>
              <td className="p-3 text-emerald-600 dark:text-emerald-400 font-bold">$0.00 (Unlimited free listings)</td>
            </tr>
            <tr>
              <td className="p-3 font-semibold">Platform Commission Cut</td>
              <td className="p-3">6.5% transaction commission</td>
              <td className="p-3">40% on Amazon Direct (60% Expanded)</td>
            </tr>
            <tr>
              <td className="p-3 font-semibold">Payment Processing</td>
              <td className="p-3">3.0% + $0.25 USD</td>
              <td className="p-3">Included in Amazon&apos;s 40% cut ($0 extra)</td>
            </tr>
            <tr>
              <td className="p-3 font-semibold">Physical Fulfillment & Shipping</td>
              <td className="p-3">Seller ships or integrates POD (Printify/Lulu)</td>
              <td className="p-3 text-emerald-600 dark:text-emerald-400 font-bold">100% automated by Amazon Prime</td>
            </tr>
            <tr>
              <td className="p-3 font-semibold">Customer Service & Returns</td>
              <td className="p-3">Seller handles 100% of inquiries</td>
              <td className="p-3 text-emerald-600 dark:text-emerald-400 font-bold">100% handled by Amazon Support</td>
            </tr>
            <tr>
              <td className="p-3 font-semibold">Customer Data & Branding</td>
              <td className="p-3 text-emerald-600 dark:text-emerald-400 font-bold">Custom storefront branding & messaging</td>
              <td className="p-3">Amazon owns the customer relationship</td>
            </tr>
          </tbody>
        </table>
      </div>

      <h2 className="text-2xl sm:text-3xl font-bold text-zinc-900 dark:text-white mt-10 mb-4">
        Financial Comparison: Physical Paperback Journal ($14.99 Retail)
      </h2>
      <p>
        Let us compare the unit economics for a <strong>120-page paperback journal priced at $14.99</strong>:
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 my-6 not-prose">
        <div className="p-4 rounded-xl bg-amber-50 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-900/50 space-y-2 text-xs">
          <h3 className="font-bold text-amber-900 dark:text-amber-300 text-sm">Etsy + Printify POD Model</h3>
          <p className="text-zinc-600 dark:text-zinc-400">Retail: $14.99 + $3.99 Buyer Shipping = $18.98 Gross</p>
          <ul className="space-y-1 text-zinc-700 dark:text-zinc-300">
            <li>Listing + Renewals: $0.20</li>
            <li>6.5% Transaction Fee: $1.23</li>
            <li>Payment Processing (3%+$0.25): $0.82</li>
            <li>Printify Base Print Cost: $5.50</li>
            <li>Actual Postage Cost: $3.99</li>
          </ul>
          <div className="pt-2 border-t border-amber-200 dark:border-amber-800/60 font-bold text-amber-700 dark:text-amber-400 text-sm">
            Net Profit = $7.24 / unit (48.3% margin)
          </div>
        </div>

        <div className="p-4 rounded-xl bg-indigo-50 dark:bg-indigo-950/30 border border-indigo-200 dark:border-indigo-900/50 space-y-2 text-xs">
          <h3 className="font-bold text-indigo-900 dark:text-indigo-300 text-sm">Amazon KDP In-House POD Model</h3>
          <p className="text-zinc-600 dark:text-zinc-400">Retail: $14.99 List Price</p>
          <ul className="space-y-1 text-zinc-700 dark:text-zinc-300">
            <li>Upfront Listing Fee: $0.00</li>
            <li>60% Gross Royalty: $8.99</li>
            <li>Amazon Platform Cut (40%): $6.00</li>
            <li>KDP Print Cost ($1.00 + 120&times;$0.012): $2.44</li>
            <li>Customer Delivery: Free Amazon Prime</li>
          </ul>
          <div className="pt-2 border-t border-indigo-200 dark:border-indigo-800/60 font-bold text-indigo-700 dark:text-indigo-400 text-sm">
            Net Royalty = $6.55 / unit (43.7% margin)
          </div>
        </div>
      </div>

      <h2 className="text-2xl sm:text-3xl font-bold text-zinc-900 dark:text-white mt-10 mb-4">
        When to Choose Etsy vs. Amazon KDP
      </h2>
      
      <h3 className="text-xl font-bold text-zinc-900 dark:text-white mt-6 mb-2">
        Choose Etsy If:
      </h3>
      <ul className="list-disc pl-5 space-y-1.5 my-3 text-zinc-700 dark:text-zinc-300">
        <li>You sell <strong>digital downloads</strong> (GoodNotes planners, Canva templates, budget spreadsheets).</li>
        <li>You offer <strong>customized or personalized</strong> items (names on covers, gift packaging).</li>
        <li>You want to build a distinct brand identity and collect an email subscriber list.</li>
      </ul>

      <h3 className="text-xl font-bold text-zinc-900 dark:text-white mt-6 mb-2">
        Choose Amazon KDP If:
      </h3>
      <ul className="list-disc pl-5 space-y-1.5 my-3 text-zinc-700 dark:text-zinc-300">
        <li>You want a <strong>100% passive, hands-off business</strong> with zero packaging, shipping, or customer support.</li>
        <li>You are publishing lined notebooks, logbooks, fiction novels, or activity books.</li>
        <li>You want to benefit from Amazon&apos;s massive internal organic search traffic and 2-day Prime delivery.</li>
      </ul>

      <div className="my-10 p-6 rounded-2xl bg-amber-500/10 border border-amber-500/30">
        <h3 className="text-lg font-bold text-amber-900 dark:text-amber-300 mb-2">
          Compare Your Product on Both Platforms Side-by-Side
        </h3>
        <p className="text-sm text-zinc-700 dark:text-zinc-300 mb-4">
          Input your product price, page count, and manufacturing costs to instantly calculate platform cuts, net margins, and monthly volume profits.
        </p>
        <Link
          href="/tools/etsy-vs-kdp-calculator"
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-amber-600 hover:bg-amber-700 text-white font-bold text-xs uppercase tracking-wider transition-all shadow-md"
        >
          Open Etsy vs KDP Comparison Tool &rarr;
        </Link>
      </div>

      <h2 className="text-2xl sm:text-3xl font-bold text-zinc-900 dark:text-white mt-10 mb-4">
        Frequently Asked Questions (FAQ)
      </h2>
      <div className="space-y-4 my-6">
        <div className="p-4 rounded-xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800">
          <h3 className="font-bold text-zinc-900 dark:text-white text-base">Can I sell the same book or planner on both Etsy and Amazon KDP?</h3>
          <p className="text-sm text-zinc-600 dark:text-zinc-400 mt-1">Yes, provided you own the copyright. Many creators publish physical paperbacks via Amazon KDP while selling printable digital PDF versions on Etsy.</p>
        </div>
        <div className="p-4 rounded-xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800">
          <h3 className="font-bold text-zinc-900 dark:text-white text-base">Why are printing costs lower on Amazon KDP than Printify on Etsy?</h3>
          <p className="text-sm text-zinc-600 dark:text-zinc-400 mt-1">Amazon owns its automated internal print manufacturing facilities and charges authors wholesale printing fees, whereas third-party POD providers on Etsy add markup to cover their own profit margins and separate shipping fees.</p>
        </div>
        <div className="p-4 rounded-xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800">
          <h3 className="font-bold text-zinc-900 dark:text-white text-base">Which platform is better for complete beginners?</h3>
          <p className="text-sm text-zinc-600 dark:text-zinc-400 mt-1">Amazon KDP has a lower barrier to entry for beginners because there are $0 listing fees and zero fulfillment or customer return responsibilities.</p>
        </div>
        <div className="p-4 rounded-xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800">
          <h3 className="font-bold text-zinc-900 dark:text-white text-base">How does customer discovery differ between Etsy and Amazon?</h3>
          <p className="text-sm text-zinc-600 dark:text-zinc-400 mt-1">Etsy buyers search primarily for aesthetic design, giftability, and craft quality, while Amazon buyers search based on fast Prime delivery, reviews, and specific functional utility.</p>
        </div>
      </div>
    </>
  );
}
