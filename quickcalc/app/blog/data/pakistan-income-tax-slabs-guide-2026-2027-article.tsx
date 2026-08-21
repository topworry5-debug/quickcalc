import Link from "next/link";

export default function PakistanIncomeTaxSlabsGuide20262027Article() {
  return (
    <>
      <p className="bg-emerald-50 dark:bg-emerald-950/30 border border-emerald-200 dark:border-emerald-900/50 p-4 rounded-xl text-zinc-800 dark:text-zinc-200 font-medium">
        <strong>Quick Answer:</strong> Under the Pakistan Federal Board of Revenue (FBR) Finance Act for Tax Year 2026–2027, salaried individuals earning up to <strong>PKR 600,000 annually (PKR 50,000/month)</strong> pay 0% income tax. For monthly salaries above PKR 50,000, progressive tax slabs range from <strong>5% up to 35%</strong>. On a monthly salary of PKR 200,000 (PKR 2,400,000/year), your total annual income tax is PKR 210,000, resulting in a monthly payroll tax deduction of PKR 17,500 and a net monthly take-home salary of <strong>PKR 182,500</strong>. To calculate your exact monthly tax, Zakat credits, and advance mobile WHT adjustments, use our free <Link href="/tools/pakistan-income-tax-calculator" className="text-emerald-600 dark:text-emerald-400 font-semibold underline">Pakistan Income Tax Calculator</Link>.
      </p>

      <h2 className="text-2xl sm:text-3xl font-bold text-zinc-900 dark:text-white mt-10 mb-4">
        Salaried vs. Non-Salaried Tax Classification in Pakistan
      </h2>
      <p>
        The FBR categorizes individual taxpayers into two distinct regimes with different tax rate schedules:
      </p>
      <ul className="list-disc pl-5 space-y-2 my-3 text-zinc-700 dark:text-zinc-300">
        <li>
          <strong>Salaried Individual:</strong> Any individual whose employment salary constitutes <strong>more than 75%</strong> of their total taxable income for the fiscal year.
        </li>
        <li>
          <strong>Non-Salaried Individual / Business Person / Freelancer:</strong> Any individual whose commercial income, consulting fees, rental yields, or sole proprietorship profits exceed 25% of their total annual earnings.
        </li>
      </ul>

      <h2 className="text-2xl sm:text-3xl font-bold text-zinc-900 dark:text-white mt-10 mb-4">
        Official FBR Income Tax Slabs for Salaried Individuals (2026–2027)
      </h2>
      <p>
        Income tax for salaried employees is deducted at source by employers under Section 149 of the Income Tax Ordinance according to the following 6 progressive slabs:
      </p>

      {/* Salaried Tax Slabs Table */}
      <div className="my-8 overflow-x-auto">
        <table className="w-full text-left text-sm border-collapse border border-zinc-200 dark:border-zinc-800">
          <thead>
            <tr className="bg-zinc-100 dark:bg-zinc-800/80 text-zinc-900 dark:text-white font-bold">
              <th className="p-3 border border-zinc-200 dark:border-zinc-800">Slab</th>
              <th className="p-3 border border-zinc-200 dark:border-zinc-800">Taxable Annual Income (PKR)</th>
              <th className="p-3 border border-zinc-200 dark:border-zinc-800">Tax Rate & Fixed Base</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-zinc-200 dark:divide-zinc-800 text-zinc-700 dark:text-zinc-300">
            <tr>
              <td className="p-3 font-semibold">1</td>
              <td className="p-3">Up to PKR 600,000 (Up to 50k/mo)</td>
              <td className="p-3 text-emerald-600 dark:text-emerald-400 font-bold">0% (Nil Tax)</td>
            </tr>
            <tr>
              <td className="p-3 font-semibold">2</td>
              <td className="p-3">PKR 600,001 to PKR 1,200,000 (50k to 100k/mo)</td>
              <td className="p-3">5% of the amount exceeding PKR 600,000</td>
            </tr>
            <tr>
              <td className="p-3 font-semibold">3</td>
              <td className="p-3">PKR 1,200,001 to PKR 2,200,000 (100k to 183.3k/mo)</td>
              <td className="p-3">PKR 30,000 + 15% of the amount exceeding PKR 1,200,000</td>
            </tr>
            <tr>
              <td className="p-3 font-semibold">4</td>
              <td className="p-3">PKR 2,200,001 to PKR 3,200,000 (183.3k to 266.6k/mo)</td>
              <td className="p-3">PKR 180,000 + 25% of the amount exceeding PKR 2,200,000</td>
            </tr>
            <tr>
              <td className="p-3 font-semibold">5</td>
              <td className="p-3">PKR 3,200,001 to PKR 4,100,000 (266.6k to 341.6k/mo)</td>
              <td className="p-3">PKR 430,000 + 30% of the amount exceeding PKR 3,200,000</td>
            </tr>
            <tr>
              <td className="p-3 font-semibold">6</td>
              <td className="p-3">Exceeding PKR 4,100,000 (&gt;341.6k/mo)</td>
              <td className="p-3">PKR 700,000 + 35% of the amount exceeding PKR 4,100,000</td>
            </tr>
          </tbody>
        </table>
      </div>

      <h2 className="text-2xl sm:text-3xl font-bold text-zinc-900 dark:text-white mt-10 mb-4">
        Worked Example: Real Salary Tax Computation (PKR 250,000/Month)
      </h2>
      <p>
        Let us calculate the exact payroll deduction for a software engineer in Lahore earning a monthly gross salary of PKR 250,000:
      </p>

      <div className="bg-zinc-100 dark:bg-zinc-900 p-5 rounded-2xl border border-zinc-200 dark:border-zinc-800 font-mono text-xs sm:text-sm space-y-2 text-zinc-800 dark:text-zinc-200">
        <div><strong>Monthly Gross Salary:</strong> PKR 250,000</div>
        <div><strong>Annual Gross Income:</strong> PKR 3,000,000 (Falls into Slab 4: PKR 2.2M to 3.2M)</div>
        <div className="pt-2 border-t border-zinc-200 dark:border-zinc-800">
          <div>Base Tax for Slab 4 = PKR 180,000</div>
          <div>Taxable Excess = PKR 3,000,000 - PKR 2,200,000 = PKR 800,000</div>
          <div>Marginal Tax on Excess (25% of PKR 800,000) = PKR 200,000</div>
          <div className="text-emerald-600 dark:text-emerald-400 font-bold">Total Annual Income Tax = PKR 180,000 + PKR 200,000 = PKR 380,000</div>
        </div>
        <div className="pt-2 border-t border-zinc-200 dark:border-zinc-800">
          <div>Monthly Payroll Tax Deduction = PKR 380,000 / 12 = PKR 31,667 / month</div>
          <div className="text-emerald-600 dark:text-emerald-400 font-bold">Net Take-Home Salary = PKR 250,000 - PKR 31,667 = PKR 218,333 / month</div>
        </div>
      </div>

      <h2 className="text-2xl sm:text-3xl font-bold text-zinc-900 dark:text-white mt-10 mb-4">
        3 Legitimate Ways to Reduce Your Income Tax in Pakistan
      </h2>
      <ol className="list-decimal pl-5 space-y-3 my-4 text-zinc-700 dark:text-zinc-300">
        <li>
          <strong>Zakat Deductions (Section 60):</strong> Official Zakat deducted by banks under the Zakat and Ushr Ordinance directly reduces your taxable income rupee-for-rupee before tax slabs are calculated.
        </li>
        <li>
          <strong>Voluntary Pension Scheme (VPS) Rebate (Section 63):</strong> Contributions to an approved SECP-registered Voluntary Pension Fund qualify for a direct tax credit up to 20% of your annual taxable income.
        </li>
        <li>
          <strong>Adjust Advance Withholding Tax (Section 236):</strong> Advance income tax automatically collected on your prepaid/postpaid mobile phone bills (15%), vehicle token tax, school tuition fees, and banking cash withdrawals can be adjusted directly against your annual tax liability in your FBR Iris return.
        </li>
      </ol>

      <div className="my-10 p-6 rounded-2xl bg-emerald-500/10 border border-emerald-500/30">
        <h3 className="text-lg font-bold text-emerald-900 dark:text-emerald-300 mb-2">
          Calculate Your Exact FBR Income Tax & Take-Home Pay
        </h3>
        <p className="text-sm text-zinc-700 dark:text-zinc-300 mb-4">
          Compare salaried vs. business tax slabs, model monthly salary withholdings, and apply Zakat or advance tax credits instantly.
        </p>
        <Link
          href="/tools/pakistan-income-tax-calculator"
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs uppercase tracking-wider transition-all shadow-md"
        >
          Open Pakistan Income Tax Calculator &rarr;
        </Link>
      </div>

      <h2 className="text-2xl sm:text-3xl font-bold text-zinc-900 dark:text-white mt-10 mb-4">
        Frequently Asked Questions (FAQ)
      </h2>
      <div className="space-y-4 my-6">
        <div className="p-4 rounded-xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800">
          <h3 className="font-bold text-zinc-900 dark:text-white text-base">What is the minimum taxable salary in Pakistan for 2026–2027?</h3>
          <p className="text-sm text-zinc-600 dark:text-zinc-400 mt-1">The tax-free threshold is PKR 600,000 per year (PKR 50,000 per month). Any salaried income below this threshold has a 0% income tax liability.</p>
        </div>
        <div className="p-4 rounded-xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800">
          <h3 className="font-bold text-zinc-900 dark:text-white text-base">Can I claim advance tax paid on mobile phone bills?</h3>
          <p className="text-sm text-zinc-600 dark:text-zinc-400 mt-1">Yes. You can download your annual withholding tax certificate from your telecom network (Jazz, Zong, Telenor, Ufone) and claim the 15% advance tax under Section 236 in your annual Iris tax return to receive a refund or tax adjustment.</p>
        </div>
        <div className="p-4 rounded-xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800">
          <h3 className="font-bold text-zinc-900 dark:text-white text-base">What is the tax rate for IT freelancers in Pakistan?</h3>
          <p className="text-sm text-zinc-600 dark:text-zinc-400 mt-1">Registered IT and software export freelancers registered with PSEB generally qualify for a concessionary 0.25% or 1.0% final tax regime on foreign remittance proceeds under Section 154A.</p>
        </div>
        <div className="p-4 rounded-xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800">
          <h3 className="font-bold text-zinc-900 dark:text-white text-base">When is the deadline to file individual income tax returns with FBR?</h3>
          <p className="text-sm text-zinc-600 dark:text-zinc-400 mt-1">The statutory deadline for individual salaried taxpayers to file their annual income tax return on the FBR Iris portal is September 30th following the close of the financial year on June 30th.</p>
        </div>
      </div>
    </>
  );
}
