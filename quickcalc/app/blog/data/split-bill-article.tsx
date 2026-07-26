import Link from "next/link";

export default function SplitBillArticle() {
  return (
    <>
      <p className="bg-emerald-50 dark:bg-emerald-950/30 border border-emerald-200 dark:border-emerald-900/50 p-4 rounded-xl text-zinc-800 dark:text-zinc-200 font-medium">
        To split a bill fairly, list every item's price, assign them to the individuals who ordered or shared them, and calculate individual subtotals. Finally, allocate tax and tip proportionally by multiplying each person's subtotal share ratio by the total tax and tip amount. This prevents lower spenders from overpaying.
      </p>

      <p>
        You know the moment. The bill arrives, someone says "let's just split it evenly," 
        and everyone nods &mdash; even though you had a water and an appetizer while your 
        friend ordered a steak and two cocktails. Nobody wants to be <em>that person</em> who 
        brings up the math, so you just pay more than your share and let it go.
      </p>
      <p>
        There's a better way, and it doesn't require an awkward conversation.
      </p>

      <h2 className="text-2xl font-bold text-zinc-900 dark:text-white mt-10 mb-4">Why Doesn't "Just Splitting the Bill Evenly" Actually Work?</h2>
      <p>
        Splitting a bill equally only makes sense when everyone ordered roughly the same 
        amount. The moment portions get uneven &mdash; one person orders drinks, another 
        doesn't, someone gets dessert and someone skips it &mdash; an equal split quietly 
        overcharges the people who spent less and undercharges the people who spent more.
      </p>
      <p>
        It's not a huge deal once in a while. But if it's a recurring group (roommates, 
        a regular dinner crew, a trip with friends), those small overpayments add up fast.
      </p>

      <h2 className="text-2xl font-bold text-zinc-900 dark:text-white mt-10 mb-4">What Is the Right Way to Split an Uneven Bill?</h2>
      <p>
        Here's the actual process, step by step:
      </p>
      
      <p className="font-semibold text-zinc-900 dark:text-white mt-4 mb-2">1. List every item and its price.</p>
      <p>
        Don't skip this &mdash; even if it feels tedious, itemizing is what makes the split 
        accurate. Grab the receipt and write out each item.
      </p>

      <p className="font-semibold text-zinc-900 dark:text-white mt-4 mb-2">2. Assign each item to the person (or people) who ordered it.</p>
      <p>
        Shared items &mdash; like a plate of fries three people picked at &mdash; get split between 
        just those people, not the whole table.
      </p>

      <p className="font-semibold text-zinc-900 dark:text-white mt-4 mb-2">3. Add up each person's subtotal.</p>
      <p>
        This is simply the sum of everything assigned to them.
      </p>

      <p className="font-semibold text-zinc-900 dark:text-white mt-4 mb-2">4. Distribute tax and tip proportionally.</p>
      <p>
        This is the step almost everyone gets wrong. Tax and tip shouldn't be split 
        equally either &mdash; they should be split based on how much each person's subtotal 
        contributes to the total bill.
      </p>

      <p className="font-mono bg-zinc-100 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 p-4 rounded-xl text-center text-sm font-semibold my-4">
        Formula: Person's Share of Tax/Tip = (Person's Subtotal &divide; Total Bill Before Tax) &times; Total Tax/Tip
      </p>

      <p className="font-semibold text-zinc-900 dark:text-white mt-6 mb-2">Example:</p>
      <p>
        Ali ordered $30 worth of food. Ahmed ordered $50. Total food bill: $80.
        <br />
        Tax + tip comes to $16 total.
      </p>
      <p>
        Ali's share of tax/tip = (30 &divide; 80) &times; 16 = $6 &rarr; Ali pays $36
        <br />
        Ahmed's share of tax/tip = (50 &divide; 80) &times; 16 = $10 &rarr; Ahmed pays $60
      </p>
      <p>
        Notice Ahmed doesn't just pay more because he ordered more food &mdash; his share of 
        the <em>tax and tip</em> scales up too, because he's responsible for a bigger portion 
        of the bill.
      </p>

      <h2 className="text-2xl font-bold text-zinc-900 dark:text-white mt-10 mb-4">Why Does Splitting a Bill by Hand Get Messy So Quickly?</h2>
      <p>
        This math is manageable for two people and three items. It falls apart the 
        moment you're at a table of six, with shared appetizers, someone who only had 
        a drink, and a tax rate that isn't a round number.
      </p>
      <p>
        That's exactly the problem our free <Link href="/tools/group-expense-splitter" className="text-emerald-600 dark:text-emerald-400 font-semibold underline">Group Expense Splitter</Link> solves. 
        Add everyone's name, add each item and who shared it, enter your tax 
        and tip percentage, and it instantly works out exactly what each person owes &mdash; 
        down to the cent &mdash; plus a copyable summary you can drop straight into your 
        group chat so nobody has to ask "wait, how much do I owe again?"
      </p>

      <h2 className="text-2xl font-bold text-zinc-900 dark:text-white mt-10 mb-4">Frequently Asked Questions</h2>
      <div className="space-y-4 mb-6">
        <details className="border-b border-zinc-200 dark:border-zinc-800 pb-4">
          <summary className="font-semibold cursor-pointer text-zinc-900 dark:text-white">
            What if two people split one item, like a shared dessert?
          </summary>
          <p className="mt-2 text-zinc-700 dark:text-zinc-300">
            Assign that single item to both people in the splitter, and it'll automatically 
            divide that item's cost (and its share of tax/tip) between just the two of them.
          </p>
        </details>
        <details className="border-b border-zinc-200 dark:border-zinc-800 pb-4">
          <summary className="font-semibold cursor-pointer text-zinc-900 dark:text-white">
            Should tip be calculated on the pre-tax or post-tax amount?
          </summary>
          <p className="mt-2 text-zinc-700 dark:text-zinc-300">
            Both are common. In most places, tipping on the pre-tax subtotal is traditional, 
            but tipping on the total (including tax) is increasingly common too &mdash; it's really 
            a matter of local custom or personal preference. Just be consistent with whichever 
            you choose.
          </p>
        </details>
        <details className="border-b border-zinc-200 dark:border-zinc-800 pb-4">
          <summary className="font-semibold cursor-pointer text-zinc-900 dark:text-white">
            Is it rude to itemize the bill with friends?
          </summary>
          <p className="mt-2 text-zinc-700 dark:text-zinc-300">
            Not at all &mdash; most people actually appreciate it, especially if the group orders 
            unevenly often. Using a shared tool to do the math (rather than one person 
            manually working it out) also keeps it from feeling personal or awkward.
          </p>
        </details>
        <details className="pb-4">
          <summary className="font-semibold cursor-pointer text-zinc-900 dark:text-white">
            What if some person forgets what they ordered?
          </summary>
          <p className="mt-2 text-zinc-700 dark:text-zinc-300">
            Itemizing right when the bill arrives, while everyone still remembers, avoids 
            this. It only takes a minute and saves the "wait, did I get the calamari or was 
            that yours?" conversation later.
          </p>
        </details>
      </div>
    </>
  );
}
