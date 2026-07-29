import Link from "next/link";

export default function BudgetRuleArticle() {
  return (
    <>
      <p className="bg-emerald-50 dark:bg-emerald-950/30 border border-emerald-200 dark:border-emerald-900/50 p-4 rounded-xl text-zinc-800 dark:text-zinc-200 font-medium">
        To use the 50/30/20 budget rule, allocate 50% of your after-tax income to essential needs (housing, groceries, utilities), 30% to optional personal wants (dining, hobbies), and 20% to savings and extra debt payments. But is the 50/30/20 rule realistic? Yes, if high local housing costs exceed 50%, you can easily customize the percentages to 60/20/20 or similar ratios to make it work.
      </p>

      <p>
        Every few months, someone in your life discovers budgeting for the "first time" 
        and tells you about this rule where you split your paycheck into 50% for needs, 
        30% for wants, and 20% for savings. It sounds clean and simple &mdash; and it can be 
        genuinely useful. But it also quietly assumes some things about your life that 
        might not be true, and that's worth understanding before you build a budget 
        around it.
      </p>

      <h2 className="text-2xl font-bold text-zinc-900 dark:text-white mt-10 mb-4">
        Where Does the 50/30/20 Rule Actually Come From?
      </h2>
      <p>
        The 50/30/20 rule was popularized by Elizabeth Warren (yes, the senator &mdash; she 
        was a bankruptcy law professor at the time) in her 2005 book "All Your Worth: 
        The Ultimate Lifetime Money Plan," co-written with her daughter Amelia Warren 
        Tyagi. It wasn't designed as a rigid law of budgeting &mdash; it was meant as a 
        simple starting framework for people who found detailed, line-by-line 
        budgeting overwhelming.
      </p>

      <h2 className="text-2xl font-bold text-zinc-900 dark:text-white mt-10 mb-4">
        The Three Categories, Broken Down
      </h2>
      <p>
        <strong>50% &mdash; Needs.</strong>
        <br />
        Things you'd struggle to live without: rent or mortgage, groceries, utilities, 
        insurance, minimum debt payments, transportation to get to work. Not the fancy 
        version of any of these &mdash; the baseline version.
      </p>
      <p>
        <strong>30% &mdash; Wants.</strong>
        <br />
        Everything that makes life enjoyable but isn't strictly necessary: dining out, 
        streaming subscriptions, hobbies, vacations, upgrading from the baseline 
        grocery run to something nicer. This is where lifestyle choices live.
      </p>
      <p>
        <strong>20% &mdash; Savings and debt paydown.</strong>
        <br />
        Emergency fund contributions, retirement savings, investments, and any extra 
        payments beyond the minimum on debt. This is the category most people 
        shortchange first when money gets tight &mdash; which is exactly backwards from 
        what builds long-term stability.
      </p>

      <h2 className="text-2xl font-bold text-zinc-900 dark:text-white mt-10 mb-4">
        Where People Get the Categories Wrong
      </h2>
      <p>
        The line between "need" and "want" is blurrier than it looks. A few common 
        gray areas:
      </p>
      <p>
        <strong>Is a gym membership a need or a want?</strong> For most people, it's a want &mdash; but 
        if a doctor has prescribed physical therapy or exercise for a medical 
        condition, it can reasonably shift into "need" territory.
      </p>
      <p>
        <strong>Is your phone bill a need?</strong> Largely yes, in most modern jobs and lives &mdash; 
        but the $200/month premium plan with the newest phone financed on top of it 
        is the "want" version layered on top of a genuine need.
      </p>
      <p>
        <strong>Is debt a "need" or "savings"?</strong> Minimum payments are a need (missing them 
        has real consequences). Anything extra you pay beyond the minimum belongs in 
        the savings/debt-payoff 20%, since it's optional and accelerates your 
        financial position.
      </p>

      <h2 className="text-2xl font-bold text-zinc-900 dark:text-white mt-10 mb-4">
        The Honest Problem With This Rule
      </h2>
      <p>
        Here's what doesn't get said enough: <strong>the 50/30/20 rule assumes your needs 
        actually fit into 50% of your income.</strong> In many cities, rent alone can eat 
        40-60% of a paycheck before groceries or utilities are even factored in. If 
        that's your situation, following this rule exactly isn't realistic &mdash; and 
        treating it as a moral failing when your numbers don't match is unfair to 
        yourself.
      </p>
      <p>
        If your needs genuinely exceed 50%, the more honest move is to adjust the 
        framework rather than abandon budgeting altogether &mdash; something like 60/20/20 
        or 65/15/20, depending on your city and circumstances. The percentages are a 
        starting point, not a rulebook you're failing to follow correctly.
      </p>

      <h2 className="text-2xl font-bold text-zinc-900 dark:text-white mt-10 mb-4">
        A Better Way to Use This Rule
      </h2>
      <p>
        Rather than treating 50/30/20 as the answer, treat it as a <strong>diagnostic tool</strong> 
        &mdash; a way to see where your money is actually going relative to a common 
        benchmark, so you can make an informed decision about what to adjust.
      </p>
      <p>
        That's exactly what our free{' '}
        <Link href="/tools/budget-calculator" className="text-emerald-600 dark:text-emerald-400 font-semibold underline">
          Budget Calculator
        </Link>{' '}
        is built for: enter your income, see the ideal 50/30/20 split, then optionally 
        enter what you're actually spending in each category to see where the gap is. 
        It also lets you customize the percentages if the default split doesn't fit 
        your reality &mdash; because it usually doesn't, and that's normal.
      </p>

      <h2 className="text-2xl font-bold text-zinc-900 dark:text-white mt-10 mb-4">
        Frequently Asked Questions
      </h2>
      <div className="space-y-4 mb-6">
        <details className="border-b border-zinc-200 dark:border-zinc-800 pb-4">
          <summary className="font-semibold cursor-pointer text-zinc-900 dark:text-white">
            Should I use my pre-tax or after-tax income for this calculation?
          </summary>
          <p className="mt-2 text-zinc-700 dark:text-zinc-300">
            After-tax (take-home) income. Budgeting against your gross salary overstates 
            how much money you actually have available each month.
          </p>
        </details>
        <details className="border-b border-zinc-200 dark:border-zinc-800 pb-4">
          <summary className="font-semibold cursor-pointer text-zinc-900 dark:text-white">
            What if my needs are more than 50% of my income?
          </summary>
          <p className="mt-2 text-zinc-700 dark:text-zinc-300">
            This is common, especially in high cost-of-living areas. Adjust the 
            percentages to reflect your reality &mdash; something like 60/20/20 &mdash; rather than 
            forcing your numbers to match a framework that doesn't fit your situation.
          </p>
        </details>
        <details className="border-b border-zinc-200 dark:border-zinc-800 pb-4">
          <summary className="font-semibold cursor-pointer text-zinc-900 dark:text-white">
            Does debt count as a Need, a Want, or Savings?
          </summary>
          <p className="mt-2 text-zinc-700 dark:text-zinc-300">
            Minimum required payments count as a Need. Any extra amount you choose to pay 
            above the minimum falls under the Savings/Debt-payoff 20%, since it's an 
            optional accelerated payment.
          </p>
        </details>
        <details className="border-b border-zinc-200 dark:border-zinc-800 pb-4">
          <summary className="font-semibold cursor-pointer text-zinc-900 dark:text-white">
            What is the 50/30/20 rule vs zero based budget difference?
          </summary>
          <p className="mt-2 text-zinc-700 dark:text-zinc-300">
            When comparing the 50/30/20 rule vs zero based budget, the main difference is simplicity. A zero-based budget assigns every single dollar a specific job (down to 
            the cent), while 50/30/20 works with broad categories instead of line items. 
            50/30/20 is simpler to maintain; zero-based budgets offer more precision.
          </p>
        </details>
        <details className="pb-4">
          <summary className="font-semibold cursor-pointer text-zinc-900 dark:text-white">
            Is the 50/30/20 rule realistic for a low or irregular income?
          </summary>
          <p className="mt-2 text-zinc-700 dark:text-zinc-300">
            Whether the 50/30/20 rule is realistic depends on your base costs. It can be harder to apply exactly, since fixed costs often take up a larger 
            share of a smaller income. In that case, focus first on covering true needs, 
            then aim for whatever savings percentage is realistically achievable, even if 
            it's below 20% to start.
          </p>
        </details>
      </div>
    </>
  );
}
