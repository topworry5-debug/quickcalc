import Link from "next/link";

export default function DiscountCalculatorGuideArticle() {
  return (
    <>
      <p className="bg-emerald-50 dark:bg-emerald-950/30 border border-emerald-200 dark:border-emerald-900/50 p-4 rounded-xl text-zinc-800 dark:text-zinc-200 font-medium">
        <strong>Quick Answer:</strong> To calculate a discount percentage, multiply the original price by the discount percentage expressed as a decimal (for example, a 20% discount on a $120 jacket is $120 &times; 0.20 = $24 saved), then subtract that savings from the original price to find the final sale price ($120 - $24 = $96). For stacked discounts (such as 20% off plus an extra 10% off), the second discount applies to the already-reduced price, resulting in an effective 28% discount rather than 30%. To calculate final sale prices, stacked coupons, or reverse original prices instantly, try our free <Link href="/tools/discount-calculator" className="text-emerald-600 dark:text-emerald-400 font-semibold underline">Discount Calculator</Link>.
      </p>

      <h2 className="text-2xl sm:text-3xl font-bold text-zinc-900 dark:text-white mt-10 mb-4">
        The Clearance Rack Confusion: Why &ldquo;20% + 10% Off&rdquo; Isn&apos;t 30% Off
      </h2>
      <p>
        You are browsing a holiday clearance sale and spot a winter coat originally priced at $100. The tag has a bright red sticker reading <strong>&ldquo;20% Off.&rdquo;</strong> Above the rack, a store banner announces: <strong>&ldquo;Take an extra 10% off at the register.&rdquo;</strong>
      </p>
      <p>
        Doing quick mental arithmetic, you add 20 + 10 in your head, expecting a 30% discount. You walk up to the counter assuming you will pay <strong>$70.00</strong>.
      </p>
      <p>
        The cashier scans the tag, and the register display reads <strong>$72.00</strong>.
      </p>
      <p>
        You pause, wondering if the cashier made an error. Did the system miss the extra coupon?
      </p>
      <p>
        The register didn&apos;t glitch. Retail discounts rarely add together simple-arithmetic style. Instead, stacked discounts apply <strong>sequentially</strong>. The store first takes 20% off your $100 item, bringing the price down to $80. Then, the register applies the second 10% discount to that new $80 subtotal—taking off an additional $8 rather than $10.
      </p>
      <p>
        Understanding <strong>how to calculate discount percentage</strong> math prevents checkout surprises, helps you evaluate store promotions realistically, and keeps your shopping budget on track.
      </p>

      <h2 className="text-2xl sm:text-3xl font-bold text-zinc-900 dark:text-white mt-10 mb-4">
        How to Calculate Discount Price: Step-by-Step Formulas
      </h2>
      <p>
        Calculating discounts manually requires two straightforward formulas, depending on whether you want to find the final sale price or reverse-engineer the original sticker cost.
      </p>

      <h3 className="text-xl font-bold text-zinc-900 dark:text-white mt-6 mb-2">
        1. Calculating Final Sale Price from Original Price
      </h3>
      <div className="bg-zinc-100 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 p-4 rounded-xl my-4 font-mono text-sm text-center font-semibold text-zinc-900 dark:text-zinc-100">
        <p className="mb-1">Discount Amount = Original Price &times; (Discount % &divide; 100)</p>
        <p>Final Sale Price = Original Price - Discount Amount</p>
      </div>

      <h3 className="text-xl font-bold text-zinc-900 dark:text-white mt-6 mb-2">
        2. Reverse Calculation: Finding Original Price from Sale Price
      </h3>
      <div className="bg-zinc-100 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 p-4 rounded-xl my-4 font-mono text-sm text-center font-semibold text-zinc-900 dark:text-zinc-100">
        <p>Original Price = Sale Price &divide; [1 - (Discount % &divide; 100)]</p>
      </div>
      <p>
        For example, if you bought a pair of boots for $60 on a 20% off sale, divide $60 by 0.80 (1 - 0.20) to find the original $75 retail price.
      </p>

      <h3 className="text-xl font-bold text-zinc-900 dark:text-white mt-6 mb-2">
        Worked Example: Step-by-Step Breakdown of a $120 Coat at 25% Off
      </h3>
      <p>
        Let&apos;s walk through a complete numerical scenario for a leather jacket listed at an original price of <strong>$120.00</strong>, marked down by <strong>25%</strong>:
      </p>

      <ol className="list-decimal pl-6 space-y-2 mb-4">
        <li>
          <strong>Identify Original Price &amp; Rate:</strong> Original Price = $120.00, Discount Rate = 25%.
        </li>
        <li>
          <strong>Convert Percentage to Decimal:</strong> 25 &divide; 100 = 0.25.
        </li>
        <li>
          <strong>Multiply to Find Savings:</strong> $120.00 &times; 0.25 = <strong>$30.00 saved</strong>.
        </li>
        <li>
          <strong>Subtract Savings from Original Price:</strong> $120.00 - $30.00 = <strong>$90.00 final sale price</strong>.
        </li>
      </ol>

      <h2 className="text-2xl sm:text-3xl font-bold text-zinc-900 dark:text-white mt-10 mb-4">
        The Truth About Stacked Discounts: Sequential vs. Additive Math
      </h2>
      <p>
        Retailers love advertising multi-tier discounts (e.g., &ldquo;50% off original price plus an extra 20% off today&rdquo;). While ads make these deals sound like a 70% markdown, sequential compounding means you actually pay more than expected:
      </p>

      <div className="overflow-x-auto my-6">
        <table className="w-full text-left text-sm text-zinc-700 dark:text-zinc-300 border-collapse border border-zinc-200 dark:border-zinc-800">
          <thead>
            <tr className="bg-zinc-100 dark:bg-zinc-900 text-zinc-900 dark:text-white font-semibold">
              <th className="border border-zinc-200 dark:border-zinc-800 p-3">Advertised Promotion</th>
              <th className="border border-zinc-200 dark:border-zinc-800 p-3">Expected Additive Sum</th>
              <th className="border border-zinc-200 dark:border-zinc-800 p-3">True Final Price ($100 Item)</th>
              <th className="border border-zinc-200 dark:border-zinc-800 p-3">True Effective Discount</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="border border-zinc-200 dark:border-zinc-800 p-3 font-medium">10% + 10% Off</td>
              <td className="border border-zinc-200 dark:border-zinc-800 p-3">20% Off ($80.00)</td>
              <td className="border border-zinc-200 dark:border-zinc-800 p-3">$81.00</td>
              <td className="border border-zinc-200 dark:border-zinc-800 p-3 font-semibold text-emerald-600 dark:text-emerald-400">19.0% Off</td>
            </tr>
            <tr className="bg-zinc-50/50 dark:bg-zinc-900/50">
              <td className="border border-zinc-200 dark:border-zinc-800 p-3 font-medium">20% + 10% Off</td>
              <td className="border border-zinc-200 dark:border-zinc-800 p-3">30% Off ($70.00)</td>
              <td className="border border-zinc-200 dark:border-zinc-800 p-3">$72.00</td>
              <td className="border border-zinc-200 dark:border-zinc-800 p-3 font-semibold text-emerald-600 dark:text-emerald-400">28.0% Off</td>
            </tr>
            <tr>
              <td className="border border-zinc-200 dark:border-zinc-800 p-3 font-medium">30% + 20% Off</td>
              <td className="border border-zinc-200 dark:border-zinc-800 p-3">50% Off ($50.00)</td>
              <td className="border border-zinc-200 dark:border-zinc-800 p-3">$56.00</td>
              <td className="border border-zinc-200 dark:border-zinc-800 p-3 font-semibold text-emerald-600 dark:text-emerald-400">44.0% Off</td>
            </tr>
            <tr className="bg-zinc-50/50 dark:bg-zinc-900/50">
              <td className="border border-zinc-200 dark:border-zinc-800 p-3 font-medium">50% + 20% Off</td>
              <td className="border border-zinc-200 dark:border-zinc-800 p-3">70% Off ($30.00)</td>
              <td className="border border-zinc-200 dark:border-zinc-800 p-3">$40.00</td>
              <td className="border border-zinc-200 dark:border-zinc-800 p-3 font-semibold text-emerald-600 dark:text-emerald-400">60.0% Off</td>
            </tr>
          </tbody>
        </table>
      </div>

      <h2 className="text-2xl sm:text-3xl font-bold text-zinc-900 dark:text-white mt-10 mb-4">
        Fast Mental Math Shortcuts for In-Store Shopping
      </h2>
      <ul className="list-disc pl-6 space-y-3 mb-6">
        <li>
          <strong>1. The 10% Shift Rule (10%, 20%, 30%):</strong> Move the decimal point one digit left to find 10% (e.g., $84.00 &rarr; $8.40). Double it for 20% ($16.80 off) or triple it for 30% ($25.20 off).
        </li>
        <li>
          <strong>2. The 25% Quartering Trick (Half of a Half):</strong> Cut the original price in half, then cut that number in half again ($80 &rarr; $40 &rarr; $20 saved).
        </li>
        <li>
          <strong>3. The Complementary Multiplier Method:</strong> Multiply the price by what you actually <em>pay</em>: for 20% off multiply by 0.80, for 30% off multiply by 0.70, for 15% off multiply by 0.85.
        </li>
      </ul>

      <h2 className="text-2xl sm:text-3xl font-bold text-zinc-900 dark:text-white mt-10 mb-4">
        Common Shopping Discount Mistakes to Avoid
      </h2>
      <ol className="list-decimal pl-6 space-y-3 mb-6">
        <li>
          <strong>Assuming Stacked Discounts Add Directly:</strong> Stacking a 20% coupon on top of a 20% sale item does not mean 40% off ($100 &rarr; $80 &rarr; $64, which is a 36% true markdown).
        </li>
        <li>
          <strong>Calculating Tax Before the Discount:</strong> In almost all jurisdictions, sales tax is assessed on the final post-discount price, not the original sticker price.
        </li>
        <li>
          <strong>Buying Unneeded Items Just Because They Are On Sale:</strong> Saving 40% on a $200 item you didn&apos;t need is not saving $80—it is spending $120. Explore our free <Link href="/tools/percentage-calculator" className="text-emerald-600 dark:text-emerald-400 font-semibold underline">Percentage Calculator</Link> or read our guide on <Link href="/blog/how-to-calculate-percentage-increase-decrease-discount" className="text-emerald-600 dark:text-emerald-400 font-semibold underline">how to calculate percentage increase &amp; decrease</Link>. When dining out after shopping, use our free <Link href="/tools/tip-calculator" className="text-emerald-600 dark:text-emerald-400 font-semibold underline">Tip Calculator</Link> or read our <Link href="/blog/how-to-calculate-tip-easy-formulas-tipping-guide" className="text-emerald-600 dark:text-emerald-400 font-semibold underline">tipping formulas guide</Link>.
        </li>
      </ol>

      <h2 className="text-2xl sm:text-3xl font-bold text-zinc-900 dark:text-white mt-10 mb-4">
        Calculate Sale Prices &amp; Savings Instantly with QuickCalc
      </h2>
      <p>
        Calculating stacked coupons, reverse price lookups, and multi-item shopping totals by hand takes time. Our free <Link href="/tools/discount-calculator" className="text-emerald-600 dark:text-emerald-400 font-semibold underline">Discount Calculator</Link> handles all the math automatically in real time.
      </p>
      <div className="bg-emerald-950/90 text-emerald-100 p-6 rounded-2xl border border-emerald-800 my-6 shadow-xl text-center">
        <h3 className="text-xl font-bold text-white mb-2">Try the Free QuickCalc Discount Calculator</h3>
        <p className="text-emerald-200 text-sm max-w-xl mx-auto mb-4">
          Features dual modes (Find Sale Price with stacked discounts &amp; Find Original Price) and real-time effective discount comparisons. Zero ads, zero signups.
        </p>
        <Link
          href="/tools/discount-calculator"
          className="inline-block bg-emerald-500 hover:bg-emerald-400 text-zinc-950 font-bold px-6 py-3 rounded-xl transition-all transform hover:-translate-y-0.5 shadow-lg"
        >
          Open Discount Calculator &rarr;
        </Link>
      </div>

      <h2 className="text-2xl sm:text-3xl font-bold text-zinc-900 dark:text-white mt-10 mb-4">
        Frequently Asked Questions
      </h2>
      <div className="space-y-4 mb-6">
        <details className="border-b border-zinc-200 dark:border-zinc-800 pb-4">
          <summary className="font-semibold cursor-pointer text-zinc-900 dark:text-white mb-2">
            How do you calculate a discount percentage on a product?
          </summary>
          <p className="text-zinc-600 dark:text-zinc-400 text-sm">
            Multiply the original price by the discount percentage expressed as a decimal (e.g., $80 &times; 0.15 = $12 saved), then subtract that savings from the original price ($80 - $12 = $68).
          </p>
        </details>

        <details className="border-b border-zinc-200 dark:border-zinc-800 pb-4">
          <summary className="font-semibold cursor-pointer text-zinc-900 dark:text-white mb-2">
            How do double or stacked discounts work (e.g., 20% off + 10% off)?
          </summary>
          <p className="text-zinc-600 dark:text-zinc-400 text-sm">
            Stacked discounts apply sequentially. The first discount is taken off the original price, and the second discount is applied to the newly reduced intermediate subtotal, yielding an effective 28% total discount rather than 30%.
          </p>
        </details>

        <details className="border-b border-zinc-200 dark:border-zinc-800 pb-4">
          <summary className="font-semibold cursor-pointer text-zinc-900 dark:text-white mb-2">
            How do you calculate the original price if you only know the sale price?
          </summary>
          <p className="text-zinc-600 dark:text-zinc-400 text-sm">
            Divide the sale price by (1 minus the discount rate as a decimal). For example, if a jacket is on sale for $60 after a 20% discount, divide $60 by 0.80 to find the original retail price of $75.
          </p>
        </details>

        <details className="border-b border-zinc-200 dark:border-zinc-800 pb-4">
          <summary className="font-semibold cursor-pointer text-zinc-900 dark:text-white mb-2">
            What is an easy mental math trick for calculating 20% off?
          </summary>
          <p className="text-zinc-600 dark:text-zinc-400 text-sm">
            Move the decimal point one place to the left to find 10% of the price, then double that number to get 20%. Subtract that total from the original sticker price.
          </p>
        </details>

        <details className="border-b border-zinc-200 dark:border-zinc-800 pb-4">
          <summary className="font-semibold cursor-pointer text-zinc-900 dark:text-white mb-2">
            Does sales tax get calculated before or after a discount?
          </summary>
          <p className="text-zinc-600 dark:text-zinc-400 text-sm">
            Sales tax is almost always calculated after the discount has been applied, meaning you only pay tax on the lower final sale price.
          </p>
        </details>
      </div>
    </>
  );
}
