import Link from "next/link";

export default function PakistanPropertyTransferTaxGuide20262027Article() {
  return (
    <>
      <p className="bg-emerald-50 dark:bg-emerald-950/30 border border-emerald-200 dark:border-emerald-900/50 p-4 rounded-xl text-zinc-800 dark:text-zinc-200 font-medium">
        <strong>Quick Answer:</strong> In Pakistan for FY 2026–2027, property transfer taxes are calculated on the higher of the <strong>Declared Market Sale Price</strong> or official <strong>FBR/DC Valuation Rate</strong>. An <strong>Active Tax Filer Buyer</strong> pays <strong>3% FBR Advance Tax under Section 236K</strong> plus 1%–2% Provincial Stamp Duty and 1% Local Town Tax (total ~5.5%–6.5%). In contrast, a <strong>Non-Filer Buyer</strong> is charged a punitive <strong>12% (up to Rs 50M) or 15% (above Rs 50M)</strong> under Section 236K alone. On a PKR 2.50 Crore property in Punjab, an Active Filer pays PKR 1,377,000 in total taxes, while a Non-Filer pays PKR 3,627,000—wasting an extra <strong>PKR 2,250,000 (22.50 Lakhs)</strong> in non-filer penalties. To calculate your exact buyer and seller property tax liability, use our free <Link href="/tools/pakistan-property-tax-calculator" className="text-emerald-600 dark:text-emerald-400 font-semibold underline">Pakistan Property Transfer Tax Calculator</Link>.
      </p>

      <h2 className="text-2xl sm:text-3xl font-bold text-zinc-900 dark:text-white mt-10 mb-4">
        The Real Estate Tax Landscape in Pakistan (Finance Act 2026 Updates)
      </h2>
      <p>
        Buying or selling real estate in Pakistan has undergone structural tax overhauls under recent Finance Acts. The government and the Federal Board of Revenue (FBR) have widened the tax gap between tax filers on the Active Taxpayer List (ATL) and non-filers.
      </p>
      <p>
        Whether you are purchasing a 5 Marla residential plot in Lahore, a commercial shop in Karachi, or a 1 Kanal house in Islamabad, understanding how federal withholding taxes (Section 236C & Section 236K) interact with provincial e-stamping and mutation fees is critical to avoid unexpected closing costs.
      </p>

      <h2 className="text-2xl sm:text-3xl font-bold text-zinc-900 dark:text-white mt-10 mb-4">
        FBR Withholding Taxes: Section 236K vs. Section 236C
      </h2>
      <p>
        The Federal Board of Revenue levies two distinct advance taxes on every property transaction in Pakistan:
      </p>

      <h3 className="text-xl font-bold text-zinc-900 dark:text-white mt-6 mb-2">
        1. Section 236K: Advance Tax on Purchase (Paid by Buyer)
      </h3>
      <p>
        Section 236K is collected from the purchaser (transferee) at the time of registering or transferring the title deed:
      </p>
      <ul className="list-disc pl-5 space-y-1 my-3 text-zinc-700 dark:text-zinc-300">
        <li><strong>Active Tax Filer:</strong> 3% of the taxable property valuation base.</li>
        <li><strong>Late Filer (Return filed after deadline):</strong> 6% of taxable valuation base.</li>
        <li><strong>Non-Filer (Properties up to PKR 50 Million):</strong> 12% of taxable valuation base.</li>
        <li><strong>Non-Filer (Properties exceeding PKR 50 Million):</strong> 15% of taxable valuation base.</li>
      </ul>

      <h3 className="text-xl font-bold text-zinc-900 dark:text-white mt-6 mb-2">
        2. Section 236C: Advance Tax on Sale (Paid by Seller)
      </h3>
      <p>
        Section 236C is deducted from the seller (transferor) at the time of sale. This represents an advance tax on capital gains:
      </p>
      <ul className="list-disc pl-5 space-y-1 my-3 text-zinc-700 dark:text-zinc-300">
        <li><strong>Active Tax Filer (Standard):</strong> 3% of taxable valuation base.</li>
        <li><strong>Active Tax Filer (Holding Period &gt; 6 Years):</strong> Concessionary 1.5% rate.</li>
        <li><strong>Late Filer:</strong> 6% of taxable valuation base.</li>
        <li><strong>Non-Filer:</strong> 10% (up to PKR 50M) or 15% (above PKR 50M).</li>
      </ul>

      {/* Comparison Table */}
      <h2 className="text-2xl sm:text-3xl font-bold text-zinc-900 dark:text-white mt-10 mb-4">
        Filer vs. Non-Filer Property Tax Rate Comparison Table
      </h2>
      <div className="my-6 overflow-x-auto">
        <table className="w-full text-left text-sm border-collapse border border-zinc-200 dark:border-zinc-800">
          <thead>
            <tr className="bg-zinc-100 dark:bg-zinc-800/80 text-zinc-900 dark:text-white font-bold">
              <th className="p-3 border border-zinc-200 dark:border-zinc-800">Tax / Fee Head</th>
              <th className="p-3 border border-zinc-200 dark:border-zinc-800">Paid By</th>
              <th className="p-3 border border-zinc-200 dark:border-zinc-800">Active Filer Rate</th>
              <th className="p-3 border border-zinc-200 dark:border-zinc-800">Non-Filer Rate</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-zinc-200 dark:divide-zinc-800 text-zinc-700 dark:text-zinc-300">
            <tr>
              <td className="p-3 font-semibold">FBR Advance Tax (Section 236K)</td>
              <td className="p-3">Buyer</td>
              <td className="p-3 text-emerald-600 font-bold">3%</td>
              <td className="p-3 text-rose-600 font-bold">12% to 15%</td>
            </tr>
            <tr>
              <td className="p-3 font-semibold">FBR Advance Gain Tax (Section 236C)</td>
              <td className="p-3">Seller</td>
              <td className="p-3 text-emerald-600 font-bold">1.5% to 3%</td>
              <td className="p-3 text-rose-600 font-bold">10% to 15%</td>
            </tr>
            <tr>
              <td className="p-3 font-semibold">Provincial Stamp Duty (Punjab / e-Stamp)</td>
              <td className="p-3">Buyer</td>
              <td className="p-3">1%</td>
              <td className="p-3">1%</td>
            </tr>
            <tr>
              <td className="p-3 font-semibold">Provincial Stamp Duty (Sindh / KPK / ICT)</td>
              <td className="p-3">Buyer</td>
              <td className="p-3">1.5% to 2%</td>
              <td className="p-3">1.5% to 2%</td>
            </tr>
            <tr>
              <td className="p-3 font-semibold">Town Corporation / TMA Tax</td>
              <td className="p-3">Buyer</td>
              <td className="p-3">1%</td>
              <td className="p-3">1%</td>
            </tr>
            <tr>
              <td className="p-3 font-semibold">Mutation (Intiqal) & Sub-Registrar Fee</td>
              <td className="p-3">Buyer</td>
              <td className="p-3">Fixed + 0.5%</td>
              <td className="p-3">Fixed + 0.5%</td>
            </tr>
          </tbody>
        </table>
      </div>

      <h2 className="text-2xl sm:text-3xl font-bold text-zinc-900 dark:text-white mt-10 mb-4">
        Worked Example: PKR 2.50 Crore House Transfer in Punjab
      </h2>
      <p>
        Let us calculate the total transaction costs for a 10 Marla house in Lahore declared at PKR 25,000,000 (FBR DC table value: PKR 23,000,000):
      </p>

      <div className="bg-zinc-100 dark:bg-zinc-900 p-5 rounded-2xl border border-zinc-200 dark:border-zinc-800 font-mono text-xs sm:text-sm space-y-2 text-zinc-800 dark:text-zinc-200">
        <div><strong>Taxable Valuation Base:</strong> PKR 25,000,000 (PKR 2.50 Crore)</div>
        <div className="pt-2 border-t border-zinc-200 dark:border-zinc-800">
          <div className="text-emerald-600 dark:text-emerald-400 font-bold">1. Active Filer Buyer Breakdown:</div>
          <div>• Section 236K (3%): PKR 750,000</div>
          <div>• Punjab Stamp Duty (1%): PKR 250,000</div>
          <div>• Local Govt TMA Fee (1%): PKR 250,000</div>
          <div>• Mutation & Registry Fees: PKR 127,000</div>
          <div className="font-bold text-emerald-700 dark:text-emerald-300">Total Filer Buyer Expenses = PKR 1,377,000 (5.51%)</div>
        </div>
        <div className="pt-2 border-t border-zinc-200 dark:border-zinc-800">
          <div className="text-rose-600 dark:text-rose-400 font-bold">2. Non-Filer Buyer Breakdown:</div>
          <div>• Section 236K (12%): PKR 3,000,000</div>
          <div>• Punjab Stamp Duty (1%): PKR 250,000</div>
          <div>• Local Govt TMA Fee (1%): PKR 250,000</div>
          <div>• Mutation & Registry Fees: PKR 127,000</div>
          <div className="font-bold text-rose-700 dark:text-rose-300">Total Non-Filer Buyer Expenses = PKR 3,627,000 (14.51%)</div>
        </div>
        <div className="pt-2 border-t border-zinc-200 dark:border-zinc-800 text-rose-600 dark:text-rose-400 font-bold">
          Non-Filer Surcharge Penalty Wasted: PKR 2,250,000 (22.50 Lakhs Extra)
        </div>
      </div>

      <div className="my-10 p-6 rounded-2xl bg-emerald-500/10 border border-emerald-500/30">
        <h3 className="text-lg font-bold text-emerald-900 dark:text-emerald-300 mb-2">
          Calculate Your Exact Property Transfer Taxes
        </h3>
        <p className="text-sm text-zinc-700 dark:text-zinc-300 mb-4">
          Test any property value, check provincial stamp duties, and compare Filer vs. Non-Filer transfer fees with our live calculator.
        </p>
        <Link
          href="/tools/pakistan-property-tax-calculator"
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs uppercase tracking-wider transition-all shadow-md"
        >
          Open Property Tax Calculator &rarr;
        </Link>
      </div>

      <h2 className="text-2xl sm:text-3xl font-bold text-zinc-900 dark:text-white mt-10 mb-4">
        Frequently Asked Questions (FAQ)
      </h2>
      <div className="space-y-4 my-6">
        <div className="p-4 rounded-xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800">
          <h3 className="font-bold text-zinc-900 dark:text-white text-base">Is Advance Tax on property adjustable against annual income tax?</h3>
          <p className="text-sm text-zinc-600 dark:text-zinc-400 mt-1">Yes. Both Section 236K (Buyer) and Section 236C (Seller) taxes are adjustable. When filing your annual FBR income tax return on Iris, you can enter CPR numbers to deduct this amount directly from your annual tax liability.</p>
        </div>
        <div className="p-4 rounded-xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800">
          <h3 className="font-bold text-zinc-900 dark:text-white text-base">How does property holding period affect seller tax?</h3>
          <p className="text-sm text-zinc-600 dark:text-zinc-400 mt-1">For active filers, properties held for more than 6 years qualify for a reduced concessionary advance tax rate of 1.5% under Section 236C instead of the standard 3% rate.</p>
        </div>
        <div className="p-4 rounded-xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800">
          <h3 className="font-bold text-zinc-900 dark:text-white text-base">What is Capital Value Tax (CVT)?</h3>
          <p className="text-sm text-zinc-600 dark:text-zinc-400 mt-1">Capital Value Tax (CVT) is a 1% tax levied in ICT Islamabad and on select high-value commercial properties in provincial jurisdictions collected at the time of property transfer.</p>
        </div>
        <div className="p-4 rounded-xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800">
          <h3 className="font-bold text-zinc-900 dark:text-white text-base">What happens if Declared Price is lower than FBR Valuation Table?</h3>
          <p className="text-sm text-zinc-600 dark:text-zinc-400 mt-1">By law, if the declared sale price is lower than the official FBR valuation table rate, all withholding taxes (236K, 236C) and stamp duties are calculated using the higher FBR rate as the tax base.</p>
        </div>
      </div>
    </>
  );
}
