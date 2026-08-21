import Link from "next/link";

export default function AmazonKDPRoyaltyAndPrintingCostGuideArticle() {
  return (
    <>
      <p className="bg-indigo-50 dark:bg-indigo-950/30 border border-indigo-200 dark:border-indigo-900/50 p-4 rounded-xl text-zinc-800 dark:text-zinc-200 font-medium">
        <strong>Quick Answer:</strong> On Amazon Kindle Direct Publishing (KDP), paperback author royalties for sales on Amazon marketplaces equal <strong>60% of your retail list price minus printing costs</strong>. For expanded distribution to bookstores and libraries, the royalty rate drops to <strong>40% minus printing costs</strong>. On a 250-page black-and-white paperback priced at $14.99, KDP printing costs are $4.00 ($1.00 fixed base + $0.012 &times; 250 pages), yielding a net author profit of <strong>$4.99 per sale</strong> (33.3% net margin). To calculate your exact printing costs, royalties, and minimum breakeven list price across all global Amazon marketplaces, use our free <Link href="/tools/kdp-royalty-calculator" className="text-indigo-600 dark:text-indigo-400 font-semibold underline">Amazon KDP Royalty Calculator</Link>.
      </p>

      <h2 className="text-2xl sm:text-3xl font-bold text-zinc-900 dark:text-white mt-10 mb-4">
        How Amazon KDP Royalties Work: The Mathematical Formula
      </h2>
      <p>
        Kindle Direct Publishing operates on an automated print-on-demand (POD) model. When a reader orders your paperback or hardcover on Amazon, Amazon prints the single copy, binds it, ships it via Prime delivery, and deducts the exact manufacturing fee directly from your royalty share before depositing your net earnings.
      </p>
      <p>
        The official Amazon KDP royalty formula for physical books is structured as follows:
      </p>

      <div className="bg-zinc-100 dark:bg-zinc-900 p-4 rounded-xl border border-zinc-200 dark:border-zinc-800 font-mono text-sm my-4 text-zinc-900 dark:text-zinc-100">
        Net Royalty = (Retail List Price &times; Royalty Rate) - Printing Cost
      </div>

      <ul className="list-disc pl-5 space-y-1.5 my-3 text-zinc-700 dark:text-zinc-300">
        <li><strong>Amazon Distribution (60%):</strong> Sales occurring directly on Amazon.com, Amazon.co.uk, Amazon.de, and other official Amazon storefronts.</li>
        <li><strong>Expanded Distribution (40%):</strong> Sales fulfilled through third-party wholesalers, academic libraries, and brick-and-mortar bookstores (Ingram, Barnes & Noble catalog).</li>
      </ul>

      <h2 className="text-2xl sm:text-3xl font-bold text-zinc-900 dark:text-white mt-10 mb-4">
        2026 Amazon KDP Printing Cost Slabs
      </h2>
      <p>
        Printing fees depend on three variables: <strong>format</strong> (paperback vs. hardcover), <strong>ink & paper type</strong> (black & white, standard color, premium color), and <strong>trim size</strong>:
      </p>

      {/* Printing Cost Table */}
      <div className="my-8 overflow-x-auto">
        <table className="w-full text-left text-sm border-collapse border border-zinc-200 dark:border-zinc-800">
          <thead>
            <tr className="bg-zinc-100 dark:bg-zinc-800/80 text-zinc-900 dark:text-white font-bold">
              <th className="p-3 border border-zinc-200 dark:border-zinc-800">Format & Ink Type</th>
              <th className="p-3 border border-zinc-200 dark:border-zinc-800">Trim Size</th>
              <th className="p-3 border border-zinc-200 dark:border-zinc-800">Fixed Base Cost ($)</th>
              <th className="p-3 border border-zinc-200 dark:border-zinc-800">Per-Page Rate ($)</th>
              <th className="p-3 border border-zinc-200 dark:border-zinc-800">150-Page Print Cost</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-zinc-200 dark:divide-zinc-800 text-zinc-700 dark:text-zinc-300">
            <tr>
              <td className="p-3 font-semibold">Paperback: Black & White</td>
              <td className="p-3">Standard (up to 6.12&quot;&times;9.25&quot;)</td>
              <td className="p-3">$1.00</td>
              <td className="p-3">$0.012</td>
              <td className="p-3 font-bold text-emerald-600 dark:text-emerald-400">$2.80</td>
            </tr>
            <tr>
              <td className="p-3 font-semibold">Paperback: Black & White</td>
              <td className="p-3">Large / Oversized</td>
              <td className="p-3">$1.00</td>
              <td className="p-3">$0.014</td>
              <td className="p-3 font-bold text-emerald-600 dark:text-emerald-400">$3.10</td>
            </tr>
            <tr>
              <td className="p-3 font-semibold">Paperback: Standard Color</td>
              <td className="p-3">Standard</td>
              <td className="p-3">$1.00</td>
              <td className="p-3">$0.027</td>
              <td className="p-3 font-bold text-emerald-600 dark:text-emerald-400">$5.05</td>
            </tr>
            <tr>
              <td className="p-3 font-semibold">Paperback: Premium Color</td>
              <td className="p-3">Standard</td>
              <td className="p-3">$1.00</td>
              <td className="p-3">$0.070</td>
              <td className="p-3 font-bold text-emerald-600 dark:text-emerald-400">$11.50</td>
            </tr>
            <tr>
              <td className="p-3 font-semibold">Hardcover: Black & White</td>
              <td className="p-3">Standard</td>
              <td className="p-3">$6.25</td>
              <td className="p-3">$0.012</td>
              <td className="p-3 font-bold text-indigo-600 dark:text-indigo-400">$8.05</td>
            </tr>
          </tbody>
        </table>
      </div>

      <h2 className="text-2xl sm:text-3xl font-bold text-zinc-900 dark:text-white mt-10 mb-4">
        Calculating Your Minimum Breakeven List Price
      </h2>
      <p>
        Amazon requires that your retail list price generates at least $0.00 in author royalties. Because royalties equal 60% of list price minus print costs, the formula to calculate your absolute minimum retail price is:
      </p>

      <div className="bg-zinc-100 dark:bg-zinc-900 p-4 rounded-xl border border-zinc-200 dark:border-zinc-800 font-mono text-sm my-4 text-zinc-900 dark:text-zinc-100">
        Minimum List Price (Amazon 60%) = Printing Cost / 0.60<br />
        Minimum List Price (Expanded 40%) = Printing Cost / 0.40
      </div>

      <p>
        For a 200-page black-and-white paperback with a $3.40 printing cost, your minimum list price on Amazon is <strong>$5.67</strong>. If you want to enable Expanded Distribution, your minimum list price rises to <strong>$8.50</strong>.
      </p>

      <h2 className="text-2xl sm:text-3xl font-bold text-zinc-900 dark:text-white mt-10 mb-4">
        Worked Example: Real Profit Breakdown on a $16.99 Trade Paperback
      </h2>
      <p>
        Let us calculate the net profit for a 300-page novel or non-fiction book priced at $16.99 USD:
      </p>
      
      <div className="bg-zinc-100 dark:bg-zinc-900 p-5 rounded-2xl border border-zinc-200 dark:border-zinc-800 font-mono text-xs sm:text-sm space-y-2 text-zinc-800 dark:text-zinc-200">
        <div><strong>Retail List Price:</strong> $16.99</div>
        <div><strong>Interior Specification:</strong> 300 pages, Standard B&W (6&quot;&times;9&quot;)</div>
        <div className="pt-2 border-t border-zinc-200 dark:border-zinc-800">
          <div>KDP Printing Cost = $1.00 + (300 &times; $0.012) = $4.60</div>
          <div>Gross 60% Amazon Royalty = $16.99 &times; 0.60 = $10.19</div>
          <div>Amazon Platform Cut (40%) = $6.80</div>
        </div>
        <div className="pt-2 border-t border-zinc-200 dark:border-zinc-800">
          <div className="text-emerald-600 dark:text-emerald-400 font-bold">Author Net Royalty (Amazon Sale) = $10.19 - $4.60 = $5.59 (32.9% margin)</div>
          <div className="text-indigo-600 dark:text-indigo-400 font-bold">Author Net Royalty (Expanded Dist 40%) = ($16.99 &times; 0.40) - $4.60 = $2.20 (12.9% margin)</div>
        </div>
      </div>

      <div className="my-10 p-6 rounded-2xl bg-indigo-500/10 border border-indigo-500/30">
        <h3 className="text-lg font-bold text-indigo-900 dark:text-indigo-300 mb-2">
          Calculate Your KDP Royalties Across All Trim Sizes
        </h3>
        <p className="text-sm text-zinc-700 dark:text-zinc-300 mb-4">
          Test different page counts, color choices, and pricing tiers across US, UK, EU, Canada, and Australia marketplaces with live volume earnings projections.
        </p>
        <Link
          href="/tools/kdp-royalty-calculator"
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs uppercase tracking-wider transition-all shadow-md"
        >
          Open KDP Royalty Calculator &rarr;
        </Link>
      </div>

      <h2 className="text-2xl sm:text-3xl font-bold text-zinc-900 dark:text-white mt-10 mb-4">
        Frequently Asked Questions (FAQ)
      </h2>
      <div className="space-y-4 my-6">
        <div className="p-4 rounded-xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800">
          <h3 className="font-bold text-zinc-900 dark:text-white text-base">Does Amazon KDP charge any upfront listing fees?</h3>
          <p className="text-sm text-zinc-600 dark:text-zinc-400 mt-1">No. Amazon KDP allows authors to publish unlimited paperback, hardcover, and Kindle eBook titles with zero upfront fees, monthly subscriptions, or listing renewal charges.</p>
        </div>
        <div className="p-4 rounded-xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800">
          <h3 className="font-bold text-zinc-900 dark:text-white text-base">What is the difference between Standard Color and Premium Color on KDP?</h3>
          <p className="text-sm text-zinc-600 dark:text-zinc-400 mt-1">Standard color uses inkjet printing on 50 lb white paper ($0.027/page), perfect for recipe books and simple charts. Premium color uses high-density saturated ink on 70 lb paper ($0.070/page), ideal for children&apos;s picture books and photography.</p>
        </div>
        <div className="p-4 rounded-xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800">
          <h3 className="font-bold text-zinc-900 dark:text-white text-base">When does Amazon pay author royalties?</h3>
          <p className="text-sm text-zinc-600 dark:text-zinc-400 mt-1">Amazon KDP pays royalties approximately 60 days after the end of the calendar month in which the sales occurred via direct deposit or wire transfer.</p>
        </div>
        <div className="p-4 rounded-xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800">
          <h3 className="font-bold text-zinc-900 dark:text-white text-base">Should I enable Expanded Distribution on KDP?</h3>
          <p className="text-sm text-zinc-600 dark:text-zinc-400 mt-1">Yes, as long as your list price is high enough to generate positive royalties at the 40% rate. It makes your book discoverable in Ingram book catalogs for zero added cost.</p>
        </div>
      </div>
    </>
  );
}
