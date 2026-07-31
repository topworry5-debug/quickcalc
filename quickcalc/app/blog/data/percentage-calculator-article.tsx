import Link from "next/link";

export default function PercentageCalculatorArticle() {
  return (
    <>
      <p className="bg-emerald-50 dark:bg-emerald-950/30 border border-emerald-200 dark:border-emerald-900/50 p-4 rounded-xl text-zinc-800 dark:text-zinc-200 font-medium">
        To know how to calculate percentage increase or general percentage change, divide the difference between the new and old values by the original value, then multiply by 100. For discounts, multiply the original price by the discount percentage divided by 100, then subtract that amount from the original price to find the final sale price.
      </p>

      <p>
        Percentages show up everywhere &mdash; a shirt that's "30% off," a salary that went up 
        by 8%, a phone bill that jumped from last month. And yet, most of us still pause 
        and think "wait, how do I actually work this out?" before reaching for a calculator.
      </p>
      <p>
        Here's the good news: once you understand the <em>logic</em> behind percentages (not just 
        the formula), you'll never second-guess yourself again. Let's break it down.
      </p>

      <h2 className="text-2xl font-bold text-zinc-900 dark:text-white mt-10 mb-4">What Does "Percentage" Actually Mean?</h2>
      <p>
        A percentage is just a fraction of 100. When something is "20%," it means 20 out 
        of every 100. That's it. Once that clicks, every percentage problem becomes a 
        question of: "20 out of 100 of <em>what</em>?"
      </p>

      <h2 className="text-2xl font-bold text-zinc-900 dark:text-white mt-10 mb-4">How Do You Find a Percentage of a Number?</h2>
      <p>
        This is the one you'll use the most &mdash; working out a tip, a discount, a tax amount.
      </p>
      <p className="font-mono bg-zinc-100 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 p-4 rounded-xl text-center text-sm font-semibold">
        Formula: (Percentage &divide; 100) &times; Number
      </p>
      <p>
        Example: What's 15% of 2,400?
        <br />
        (15 &divide; 100) &times; 2,400 = 0.15 &times; 2,400 = 360
      </p>
      <p>
        So 15% of 2,400 is 360. That's the whole trick &mdash; turn the percentage into a 
        decimal, then multiply.
      </p>

      <h2 className="text-2xl font-bold text-zinc-900 dark:text-white mt-10 mb-4">How Do You Calculate Percentage Increase and Decrease?</h2>
      <p>
        This is where people usually get tripped up, because there are two numbers 
        involved &mdash; an "old" one and a "new" one.
      </p>
      <p className="font-mono bg-zinc-100 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 p-4 rounded-xl text-center text-sm font-semibold">
        Formula: ((New Value &minus; Old Value) &divide; Old Value) &times; 100
      </p>
      <p>
        Example: Last month you spent $200 on groceries. This month it's $230. What's 
        the percentage increase?
      </p>
      <p>
        ((230 &minus; 200) &divide; 200) &times; 100 = (30 &divide; 200) &times; 100 = 15%
      </p>
      <p>
        Your grocery spending went up by 15%. If the new number is <em>smaller</em> than the 
        old one, you'll get a negative result &mdash; that's your percentage decrease.
      </p>

      <h2 className="text-2xl font-bold text-zinc-900 dark:text-white mt-10 mb-4">How Do You Calculate a Store Discount?</h2>
      <p>
        Discounts combine both ideas above. You're not just finding a percentage &mdash; you're subtracting it from the original price. If you have complex or stacked discounts to resolve on the fly, our specialized <Link href="/tools/discount-calculator" className="text-emerald-600 dark:text-emerald-400 font-semibold underline">Discount Calculator</Link> does the heavy lifting for you instantly.
      </p>
      <p className="font-mono bg-zinc-100 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 p-4 rounded-xl text-center text-sm font-semibold">
        Formula: Original Price &minus; (Original Price &times; Discount% &divide; 100)
      </p>
      <p>
        Example: A jacket costs $80, and it's 25% off.
      </p>
      <p>
        Discount amount = 80 &times; (25 &divide; 100) = 20
        <br />
        Final price = 80 &minus; 20 = $60
      </p>
      <p>
        You save $20, and pay $60. Simple once you see it laid out.
      </p>

      <h2 className="text-2xl font-bold text-zinc-900 dark:text-white mt-10 mb-4">How Do You Calculate a Reverse Percentage?</h2>
      <p>
        Sometimes you know the <em>final</em> number and the percentage, but need the original. 
        Say you paid $60 for something after a 25% discount &mdash; what was the original price?
      </p>
      <p className="font-mono bg-zinc-100 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 p-4 rounded-xl text-center text-sm font-semibold">
        Formula: Final Value &divide; (1 &minus; Discount% &divide; 100)
      </p>
      <p>
        60 &divide; (1 &minus; 0.25) = 60 &divide; 0.75 = $80
      </p>
      <p>
        This one trips up even people who are otherwise good with numbers, because it's 
        tempting to just add 25% back to $60 &mdash; but that gives you $75, not $80. The 
        discount was taken off the <em>original</em> price, not the sale price, so you have to 
        reverse it correctly.
      </p>

      <h2 className="text-2xl font-bold text-zinc-900 dark:text-white mt-10 mb-4">How Can You Calculate Percentages Without Doing Mental Math?</h2>
      <p>
        Honestly, you don't need to memorize any of this to use it day to day. That's 
        exactly why we built a <Link href="/tools/percentage-calculator" className="text-emerald-600 dark:text-emerald-400 font-semibold underline">free Percentage Calculator</Link> that handles all four of these &mdash; percentage of a number, increase/decrease, 
        discounts, and reverse percentages &mdash; instantly, without you touching a formula. 
        Just plug in your numbers and get your answer in one tap.
      </p>

      <h2 className="text-2xl font-bold text-zinc-900 dark:text-white mt-10 mb-4">Frequently Asked Questions</h2>
      <div className="space-y-4 mb-6">
        <details className="border-b border-zinc-200 dark:border-zinc-800 pb-4">
          <summary className="font-semibold cursor-pointer text-zinc-900 dark:text-white">
            Is percentage increase the same as percentage points?
          </summary>
          <p className="mt-2 text-zinc-700 dark:text-zinc-300">
            No. If interest rates go from 5% to 7%, that's a 2 <em>percentage point</em> increase, 
            but a 40% <em>percentage increase</em> relative to the original 5%. They're easy to mix 
            up, so pay attention to which one a question is actually asking for.
          </p>
        </details>
        <details className="border-b border-zinc-200 dark:border-zinc-800 pb-4">
          <summary className="font-semibold cursor-pointer text-zinc-900 dark:text-white">
            How to find the original price before a discount?
          </summary>
          <p className="mt-2 text-zinc-700 dark:text-zinc-300">
            If you want to know how to find the original price before a discount, divide the final sale price by (1 minus the discount percentage divided by 100). For example, if a jacket costs $60 after a 25% discount, dividing 60 by 0.75 gives you the original price of $80.
          </p>
        </details>
        <details className="border-b border-zinc-200 dark:border-zinc-800 pb-4">
          <summary className="font-semibold cursor-pointer text-zinc-900 dark:text-white">
            How to calculate percentage increase if it is over 100%?
          </summary>
          <p className="mt-2 text-zinc-700 dark:text-zinc-300">
            To calculate percentage increase over 100%, use the same standard formula: subtract the original value from the new value, divide by the original value, and multiply by 100. If an item's price goes from $10 to $35, that represents a 250% increase.
          </p>
        </details>
        <details className="pb-4">
          <summary className="font-semibold cursor-pointer text-zinc-900 dark:text-white">
            What's the fastest way to estimate a percentage in my head?
          </summary>
          <p className="mt-2 text-zinc-700 dark:text-zinc-300">
            Find 10% first (just move the decimal point one place left), then scale up or 
            down from there. 10% of 240 is 24 &mdash; so 20% is 48, and 5% is 12.
          </p>
        </details>
      </div>
    </>
  );
}
