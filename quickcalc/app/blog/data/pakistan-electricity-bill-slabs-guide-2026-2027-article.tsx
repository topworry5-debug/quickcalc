import Link from "next/link";

export default function PakistanElectricityBillSlabsGuide20262027Article() {
  return (
    <>
      <p className="bg-emerald-50 dark:bg-emerald-950/30 border border-emerald-200 dark:border-emerald-900/50 p-4 rounded-xl text-zinc-800 dark:text-zinc-200 font-medium">
        <strong>Quick Answer:</strong> In Pakistan for FY 2026–2027, domestic electricity tariffs are determined by whether a household qualifies as <strong>Protected (&le;200 units for 6 consecutive months)</strong> or <strong>Unprotected</strong>. Protected consumers pay subsidized rates of <strong>Rs. 13.75 to Rs. 16.80 per unit</strong> with zero fixed charges. Exceeding 200 units in even one month triggers Unprotected slabs (<strong>Rs. 24.50 to Rs. 51.50 per unit</strong>) plus fixed charges and 18% GST. On 340 units under LESCO/IESCO/K-Electric, base energy is PKR 12,230, taxes and surcharges (18% GST, FPA, FC Surcharge) add PKR 5,850, yielding an estimated total bill of <strong>PKR 18,280</strong> (effective rate: Rs. 53.76/unit). To calculate your exact DISCO bill breakdown, use our free <Link href="/tools/pakistan-electricity-bill-calculator" className="text-emerald-600 dark:text-emerald-400 font-semibold underline">Pakistan Electricity Bill & Unit Slab Calculator</Link>.
      </p>

      <h2 className="text-2xl sm:text-3xl font-bold text-zinc-900 dark:text-white mt-10 mb-4">
        The Anatomy of a Pakistani Electricity Bill: Beyond the Meter Units
      </h2>
      <p>
        For millions of electricity consumers across Pakistan served by LESCO, IESCO, FESCO, MEPCO, GEPCO, PESCO, and K-Electric, monthly electricity bills often seem confusing. A common frustration is why a bill doubles when consumption increases by only 20% or 30%.
      </p>
      <p>
        The answer lies in NEPRA&apos;s steep progressive tariff structure combined with the <strong>Protected vs. Unprotected consumer cliff</strong> and compounding statutory taxes (GST, Electricity Duty, Fuel Price Adjustment, and Financing Cost Surcharges).
      </p>

      <h2 className="text-2xl sm:text-3xl font-bold text-zinc-900 dark:text-white mt-10 mb-4">
        Protected vs. Unprotected Consumers: The 200-Unit Cliff
      </h2>
      <p>
        NEPRA divides domestic consumers into two groups:
      </p>

      <h3 className="text-xl font-bold text-zinc-900 dark:text-white mt-6 mb-2">
        1. Protected Consumers (Subsidized Lifeline)
      </h3>
      <p>
        A domestic consumer is classified as Protected if their monthly consumption has remained <strong>at or below 200 units for the past 6 consecutive billing cycles</strong>. Protected consumers receive heavy federal power subsidies:
      </p>
      <ul className="list-disc pl-5 space-y-1 my-3 text-zinc-700 dark:text-zinc-300">
        <li><strong>1 to 100 Units:</strong> Rs. 13.75 / kWh</li>
        <li><strong>101 to 200 Units:</strong> Rs. 16.80 / kWh</li>
        <li><strong>Fixed Charges:</strong> Rs. 0</li>
      </ul>

      <h3 className="text-xl font-bold text-zinc-900 dark:text-white mt-6 mb-2">
        2. Unprotected Consumers (Standard Tariffs)
      </h3>
      <p>
        If consumption exceeds 200 units (even 201 units) in any single billing month, the connection loses protected status and shifts to non-subsidized slabs:
      </p>

      {/* Slab Table */}
      <div className="my-8 overflow-x-auto">
        <table className="w-full text-left text-sm border-collapse border border-zinc-200 dark:border-zinc-800">
          <thead>
            <tr className="bg-zinc-100 dark:bg-zinc-800/80 text-zinc-900 dark:text-white font-bold">
              <th className="p-3 border border-zinc-200 dark:border-zinc-800">Unprotected Tariff Slab</th>
              <th className="p-3 border border-zinc-200 dark:border-zinc-800">Base Unit Rate (PKR)</th>
              <th className="p-3 border border-zinc-200 dark:border-zinc-800">Fixed Monthly Charge</th>
              <th className="p-3 border border-zinc-200 dark:border-zinc-800">Typical Appliances</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-zinc-200 dark:divide-zinc-800 text-zinc-700 dark:text-zinc-300">
            <tr>
              <td className="p-3 font-semibold">1 to 100 Units</td>
              <td className="p-3">Rs. 24.50</td>
              <td className="p-3">Rs. 0</td>
              <td className="p-3">LED lights, 2 fans</td>
            </tr>
            <tr>
              <td className="p-3 font-semibold">101 to 200 Units</td>
              <td className="p-3">Rs. 30.10</td>
              <td className="p-3">Rs. 0</td>
              <td className="p-3">Refrigerator + 3 fans</td>
            </tr>
            <tr>
              <td className="p-3 font-semibold">201 to 300 Units</td>
              <td className="p-3">Rs. 36.20</td>
              <td className="p-3">Rs. 0</td>
              <td className="p-3">Water motor + washing machine</td>
            </tr>
            <tr>
              <td className="p-3 font-semibold">301 to 400 Units</td>
              <td className="p-3">Rs. 41.50</td>
              <td className="p-3 font-bold text-amber-600">Rs. 200</td>
              <td className="p-3">1 Inverter AC (6 hrs/day)</td>
            </tr>
            <tr>
              <td className="p-3 font-semibold">401 to 500 Units</td>
              <td className="p-3">Rs. 44.80</td>
              <td className="p-3 font-bold text-amber-600">Rs. 400</td>
              <td className="p-3">1 AC (12 hrs/day)</td>
            </tr>
            <tr>
              <td className="p-3 font-semibold">501 to 600 Units</td>
              <td className="p-3">Rs. 46.20</td>
              <td className="p-3 font-bold text-rose-600">Rs. 600</td>
              <td className="p-3">2 Inverter ACs</td>
            </tr>
            <tr>
              <td className="p-3 font-semibold">601 to 700 Units</td>
              <td className="p-3">Rs. 47.90</td>
              <td className="p-3 font-bold text-rose-600">Rs. 600</td>
              <td className="p-3">2-3 ACs + Deep Freezer</td>
            </tr>
            <tr>
              <td className="p-3 font-semibold">Above 700 Units</td>
              <td className="p-3 text-rose-600 font-bold">Rs. 51.50</td>
              <td className="p-3 font-bold text-rose-600">Rs. 600</td>
              <td className="p-3">Full domestic luxury load</td>
            </tr>
          </tbody>
        </table>
      </div>

      <h2 className="text-2xl sm:text-3xl font-bold text-zinc-900 dark:text-white mt-10 mb-4">
        Worked Example: Real Bill Breakdown (350 Units Unprotected)
      </h2>
      <p>
        Let us calculate the exact payable bill for a household consuming 350 units under LESCO:
      </p>

      <div className="bg-zinc-100 dark:bg-zinc-900 p-5 rounded-2xl border border-zinc-200 dark:border-zinc-800 font-mono text-xs sm:text-sm space-y-2 text-zinc-800 dark:text-zinc-200">
        <div><strong>Total Consumption:</strong> 350 kWh (Unprotected)</div>
        <div className="pt-2 border-t border-zinc-200 dark:border-zinc-800">
          <div>1–100 units @ Rs. 24.50 = PKR 2,450</div>
          <div>101–200 units @ Rs. 30.10 = PKR 3,010</div>
          <div>201–300 units @ Rs. 36.20 = PKR 3,620</div>
          <div>301–350 units @ Rs. 41.50 = PKR 2,075</div>
          <div className="text-indigo-600 dark:text-indigo-400 font-bold">Base Variable Energy Cost = PKR 11,155</div>
        </div>
        <div className="pt-2 border-t border-zinc-200 dark:border-zinc-800">
          <div>Fixed Charges (301-400 tier) = PKR 200</div>
          <div>Fuel Price Adjustment (350 &times; Rs. 2.50) = PKR 875</div>
          <div>Electricity Duty (1.5% of Base) = PKR 167</div>
          <div>Financing Cost Surcharge (350 &times; Rs. 3.23) = PKR 1,131</div>
          <div>GST (18% of Base + Fixed + FPA + ED) = 18% of PKR 12,397 = PKR 2,231</div>
          <div>PTV License Fee = PKR 35</div>
          <div className="text-rose-600 dark:text-rose-400 font-bold text-sm">Total Taxes & Surcharges = PKR 4,639 (29.4% of bill)</div>
        </div>
        <div className="pt-2 border-t border-zinc-200 dark:border-zinc-800">
          <div className="text-emerald-600 dark:text-emerald-400 font-bold text-base">Total Estimated Payable Bill = PKR 15,994 (Effective: Rs. 45.70 / unit)</div>
        </div>
      </div>

      <div className="my-10 p-6 rounded-2xl bg-emerald-500/10 border border-emerald-500/30">
        <h3 className="text-lg font-bold text-emerald-900 dark:text-emerald-300 mb-2">
          Calculate Your Exact DISCO Electricity Bill
        </h3>
        <p className="text-sm text-zinc-700 dark:text-zinc-300 mb-4">
          Test different unit consumption levels, check protected vs. unprotected rates, and see your itemized bill receipt in real time.
        </p>
        <Link
          href="/tools/pakistan-electricity-bill-calculator"
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs uppercase tracking-wider transition-all shadow-md"
        >
          Open Electricity Bill Calculator &rarr;
        </Link>
      </div>

      <h2 className="text-2xl sm:text-3xl font-bold text-zinc-900 dark:text-white mt-10 mb-4">
        Frequently Asked Questions (FAQ)
      </h2>
      <div className="space-y-4 my-6">
        <div className="p-4 rounded-xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800">
          <h3 className="font-bold text-zinc-900 dark:text-white text-base">How can I regain Protected Consumer status?</h3>
          <p className="text-sm text-zinc-600 dark:text-zinc-400 mt-1">To regain protected status, your electricity meter consumption must remain at or below 200 units for 6 continuous billing months. On the 7th month, NEPRA systems automatically restore subsidized billing rates.</p>
        </div>
        <div className="p-4 rounded-xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800">
          <h3 className="font-bold text-zinc-900 dark:text-white text-base">What is the Financing Cost (FC) Surcharge?</h3>
          <p className="text-sm text-zinc-600 dark:text-zinc-400 mt-1">The Financing Cost surcharge is a statutory fee of Rs. 3.23 per unit collected across all domestic electricity consumers to service debt in the national power transmission grid.</p>
        </div>
        <div className="p-4 rounded-xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800">
          <h3 className="font-bold text-zinc-900 dark:text-white text-base">Does K-Electric use the same slabs as WAPDA DISCOs?</h3>
          <p className="text-sm text-zinc-600 dark:text-zinc-400 mt-1">Yes. NEPRA enforces a uniform national base tariff across K-Electric (Karachi) and all WAPDA power distribution companies (LESCO, IESCO, FESCO, MEPCO, GEPCO).</p>
        </div>
        <div className="p-4 rounded-xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800">
          <h3 className="font-bold text-zinc-900 dark:text-white text-base">How much does 1 inverter AC add to a monthly bill in Pakistan?</h3>
          <p className="text-sm text-zinc-600 dark:text-zinc-400 mt-1">A 1.5-ton DC inverter AC running 8 hours daily at 26°C consumes approximately 160 to 200 units monthly, adding roughly PKR 8,000 to 11,000 to your total monthly electricity bill.</p>
        </div>
      </div>
    </>
  );
}
