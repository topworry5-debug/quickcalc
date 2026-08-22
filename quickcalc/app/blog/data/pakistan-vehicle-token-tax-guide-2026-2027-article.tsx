import Link from "next/link";

export default function PakistanVehicleTokenTaxGuide20262027Article() {
  return (
    <>
      <p className="bg-emerald-50 dark:bg-emerald-950/30 border border-emerald-200 dark:border-emerald-900/50 p-4 rounded-xl text-zinc-800 dark:text-zinc-200 font-medium">
        <strong>Quick Answer:</strong> In Pakistan for FY 2026–2027, motor vehicle token tax is determined by engine capacity (CC), vehicle age, and your <strong>Active Tax Filer</strong> status. For a standard <strong>1300cc car in Punjab</strong> (e.g. Toyota Yaris / Honda City), an <strong>Active Filer pays PKR 5,450 annually</strong> (Rs. 3,000 base excise + Rs. 500 MV tax + Rs. 200 professional tax + Rs. 1,750 FBR Section 234 advance tax). A <strong>Non-Filer pays PKR 8,950</strong> due to an elevated Rs. 5,250 withholding tax penalty. For luxury vehicles above 2000cc, excise token tax is assessed at <strong>1.5% to 2.0% of the vehicle&apos;s invoice or depreciated market value</strong> plus FBR advance tax. Calculate your vehicle&apos;s exact annual token renewal or new registration costs using our free <Link href="/tools/pakistan-vehicle-tax-calculator" className="text-emerald-600 dark:text-emerald-400 font-semibold underline">Pakistan Vehicle Token Tax Calculator</Link>.
      </p>

      <h2 className="text-2xl sm:text-3xl font-bold text-zinc-900 dark:text-white mt-10 mb-4">
        Understanding Pakistan Motor Vehicle Taxation (Finance Act 2026 Updates)
      </h2>
      <p>
        Vehicle taxation in Pakistan involves both provincial Excise and Taxation Departments (Punjab, Sindh, ICT Islamabad, KPK) and the federal Federal Board of Revenue (FBR). Whether renewing your annual token sticker or registering a brand new car, the fees consist of base road taxes, local infrastructure surcharges, and adjustable federal withholding taxes.
      </p>

      <h2 className="text-2xl sm:text-3xl font-bold text-zinc-900 dark:text-white mt-10 mb-4">
        Engine Capacity (CC) Slabs & Annual Token Rates
      </h2>
      <p>
        Provincial Excise authorities categorize private passenger cars into progressive engine displacement brackets:
      </p>

      {/* Slabs Table */}
      <div className="my-6 overflow-x-auto">
        <table className="w-full text-left text-sm border-collapse border border-zinc-200 dark:border-zinc-800">
          <thead>
            <tr className="bg-zinc-100 dark:bg-zinc-800/80 text-zinc-900 dark:text-white font-bold">
              <th className="p-3 border border-zinc-200 dark:border-zinc-800">Engine Displacement (CC)</th>
              <th className="p-3 border border-zinc-200 dark:border-zinc-800">Token Type</th>
              <th className="p-3 border border-zinc-200 dark:border-zinc-800">Base Excise Tax</th>
              <th className="p-3 border border-zinc-200 dark:border-zinc-800">Filer Total (Annual)</th>
              <th className="p-3 border border-zinc-200 dark:border-zinc-800">Non-Filer Total (Annual)</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-zinc-200 dark:divide-zinc-800 text-zinc-700 dark:text-zinc-300">
            <tr>
              <td className="p-3 font-semibold">Under 1000 CC (Alto, Cultus)</td>
              <td className="p-3">Lifetime / Annual</td>
              <td className="p-3">Rs. 1,500 / Lifetime</td>
              <td className="p-3 text-emerald-600 font-bold">Rs. 1,700 (or Rs. 0 if Lifetime)</td>
              <td className="p-3 text-rose-600 font-bold">Rs. 2,700</td>
            </tr>
            <tr>
              <td className="p-3 font-semibold">1001 CC to 1300 CC (Yaris, City)</td>
              <td className="p-3">Annual Renewal</td>
              <td className="p-3">Rs. 3,000</td>
              <td className="p-3 text-emerald-600 font-bold">Rs. 5,450</td>
              <td className="p-3 text-rose-600 font-bold">Rs. 8,950</td>
            </tr>
            <tr>
              <td className="p-3 font-semibold">1301 CC to 1500 CC (Civic, Corolla)</td>
              <td className="p-3">Annual Renewal</td>
              <td className="p-3">Rs. 6,000</td>
              <td className="p-3 text-emerald-600 font-bold">Rs. 10,950</td>
              <td className="p-3 text-rose-600 font-bold">Rs. 18,450</td>
            </tr>
            <tr>
              <td className="p-3 font-semibold">1501 CC to 2000 CC (Sportage, Tucson)</td>
              <td className="p-3">Annual Renewal</td>
              <td className="p-3">Rs. 15,000</td>
              <td className="p-3 text-emerald-600 font-bold">Rs. 25,200</td>
              <td className="p-3 text-rose-600 font-bold">Rs. 40,200</td>
            </tr>
            <tr>
              <td className="p-3 font-semibold">2001 CC to 2500 CC (Fortuner, Haval)</td>
              <td className="p-3">Annual Renewal</td>
              <td className="p-3">1.5% of Depreciated Value</td>
              <td className="p-3 text-emerald-600 font-bold">1.5% + Rs. 13,500</td>
              <td className="p-3 text-rose-600 font-bold">1.5% + Rs. 33,500</td>
            </tr>
            <tr>
              <td className="p-3 font-semibold">Above 2500 CC (Prado, Land Cruiser)</td>
              <td className="p-3">Annual Renewal</td>
              <td className="p-3">2.0% of Depreciated Value</td>
              <td className="p-3 text-emerald-600 font-bold">2.0% + Rs. 24,500</td>
              <td className="p-3 text-rose-600 font-bold">2.0% + Rs. 64,500</td>
            </tr>
          </tbody>
        </table>
      </div>

      <h2 className="text-2xl sm:text-3xl font-bold text-zinc-900 dark:text-white mt-10 mb-4">
        FBR Advance Withholding Taxes: Section 234 vs. Section 231B
      </h2>
      <p>
        The Federal Board of Revenue collects advance income taxes on motor vehicles at two distinct stages:
      </p>

      <h3 className="text-xl font-bold text-zinc-900 dark:text-white mt-6 mb-2">
        1. Section 234: Annual Token Tax Advance Tax
      </h3>
      <p>
        Collected each year alongside your provincial token renewal. This tax is <strong>100% adjustable</strong> against your annual personal or corporate income tax return on Iris. Active Filers pay standard rates (e.g. Rs. 1,750 for 1300cc), while Non-Filers face 300% punitive surcharges (Rs. 5,250).
      </p>

      <h3 className="text-xl font-bold text-zinc-900 dark:text-white mt-6 mb-2">
        2. Section 231B: Advance Tax on New Registration & Title Transfer
      </h3>
      <p>
        Levied by FBR at the time of registering a brand new vehicle or transferring ownership. For vehicles under 2000cc, fixed slabs apply (Rs. 10,000 up to Rs. 100,000 for Filers; Rs. 30,000 to Rs. 300,000 for Non-Filers). For vehicles exceeding 2000cc, advance tax is charged as 3% to 5% of invoice value for Filers and 9% to 15% for Non-Filers.
      </p>

      <h2 className="text-2xl sm:text-3xl font-bold text-zinc-900 dark:text-white mt-10 mb-4">
        How to Pay Vehicle Token Tax Online (ePay Punjab & Sindh e-Payment)
      </h2>
      <p>
        Gone are the days of queuing at post offices or Excise branches. You can pay within 60 seconds from your phone:
      </p>

      <ol className="list-decimal pl-5 space-y-2 my-4 text-zinc-700 dark:text-zinc-300">
        <li>Download and open the <strong>ePay Punjab</strong> app (or Sindh Excise Online portal / ICT City App).</li>
        <li>Tap <strong>Excise & Taxation Department</strong> &rarr; <strong>Token Tax</strong>.</li>
        <li>Enter your vehicle registration number (e.g. <code>LEA-23-4567</code>).</li>
        <li>The app automatically queries the excise database, applies your Filer/Non-Filer status, and generates a 17-digit <strong>PSID (Payment System Identifier)</strong>.</li>
        <li>Open your banking app (HBL, Meezan, Bank Alfalah, Easypaisa, JazzCash), select <strong>Bill Payment &rarr; 1Link / 1Bill Invoice</strong>, paste the PSID, and confirm payment.</li>
        <li>Your payment is verified instantly and your computerized digital excise record is updated in real time.</li>
      </ol>

      <div className="my-10 p-6 rounded-2xl bg-emerald-500/10 border border-emerald-500/30">
        <h3 className="text-lg font-bold text-emerald-900 dark:text-emerald-300 mb-2">
          Calculate Your Exact Vehicle Token & Registration Fees
        </h3>
        <p className="text-sm text-zinc-700 dark:text-zinc-300 mb-4">
          Check any engine CC, calculate Section 231B/234 withholding tax, and verify Non-Filer surcharges with our live calculator.
        </p>
        <Link
          href="/tools/pakistan-vehicle-tax-calculator"
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs uppercase tracking-wider transition-all shadow-md"
        >
          Open Vehicle Token Tax Calculator &rarr;
        </Link>
      </div>

      <h2 className="text-2xl sm:text-3xl font-bold text-zinc-900 dark:text-white mt-10 mb-4">
        Frequently Asked Questions (FAQ)
      </h2>
      <div className="space-y-4 my-6">
        <div className="p-4 rounded-xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800">
          <h3 className="font-bold text-zinc-900 dark:text-white text-base">What is the token tax on a 1300cc car in Punjab for 2026?</h3>
          <p className="text-sm text-zinc-600 dark:text-zinc-400 mt-1">An Active Filer pays PKR 5,450 (Rs. 3,000 base + Rs. 500 MV + Rs. 200 prof tax + Rs. 1,750 FBR WHT). A Non-Filer pays PKR 8,950.</p>
        </div>
        <div className="p-4 rounded-xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800">
          <h3 className="font-bold text-zinc-900 dark:text-white text-base">Is lifetime token tax available for cars above 1000cc in Pakistan?</h3>
          <p className="text-sm text-zinc-600 dark:text-zinc-400 mt-1">No. Lifetime token tax is exclusively for vehicles up to 1000cc. Cars 1001cc and above require annual token tax renewals.</p>
        </div>
        <div className="p-4 rounded-xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800">
          <h3 className="font-bold text-zinc-900 dark:text-white text-base">How much extra tax does a Non-Filer pay on new car registration?</h3>
          <p className="text-sm text-zinc-600 dark:text-zinc-400 mt-1">Non-Filers pay up to 3x higher advance tax under Section 231B (e.g. Rs. 75,000 vs Rs. 25,000 for 1300cc; 9%–15% vs 3%–5% for 2000cc+ cars).</p>
        </div>
        <div className="p-4 rounded-xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800">
          <h3 className="font-bold text-zinc-900 dark:text-white text-base">What happens if I pay vehicle token tax after the due date?</h3>
          <p className="text-sm text-zinc-600 dark:text-zinc-400 mt-1">Excise departments apply penalties ranging from 10% up to 100% of the base token tax for overdue renewals.</p>
        </div>
      </div>
    </>
  );
}
