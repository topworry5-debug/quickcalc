import Link from "next/link";

export default function UsdPkrArticle() {
  return (
    <>
      <p className="bg-emerald-50 dark:bg-emerald-950/30 border border-emerald-200 dark:border-emerald-900/50 p-4 rounded-xl text-zinc-800 dark:text-zinc-200 font-medium">
        The real currency exchange rate is the mid-market rate—the exact midpoint between global buy and sell prices seen on Google. Banks and transfer services offer worse rates by adding a hidden markup or spread margin on top of this rate to generate profit, which quietly increases your transaction costs.
      </p>

      <p>
        You check Google, it says 1 USD = 278 PKR. You go to send money through your 
        bank, and suddenly you're only getting 272 PKR per dollar. Nothing was stolen, 
        nobody made a mistake &mdash; but you're still left wondering: which number is real?
      </p>
      <p>
        Here's what's actually going on, and how to make sure you're never overpaying 
        without realizing it.
      </p>

      <h2 className="text-2xl font-bold text-zinc-900 dark:text-white mt-10 mb-4">
        Why Is the Rate You See Online Called the "Mid-Market Rate"?
      </h2>
      <p>
        The number you see on Google, in news headlines, or on most currency websites 
        is called the <strong>mid-market rate</strong> &mdash; it's the midpoint between the "buy" and 
        "sell" price of a currency on the global market, calculated from real trading 
        data between banks and financial institutions.
      </p>
      <p>
        This is the truest, most neutral exchange rate that exists at any given moment. 
        It's not a rate any single business is required to offer you &mdash; it's simply the 
        reference point everyone measures against.
      </p>

      <h2 className="text-2xl font-bold text-zinc-900 dark:text-white mt-10 mb-4">
        Why Do Banks and Money Transfer Services Give You a Worse Exchange Rate?
      </h2>
      <p>
        Banks, currency exchange counters, and remittance services almost never give 
        you the mid-market rate. Instead, they add a <strong>margin</strong> on top of it &mdash; 
        sometimes called a "spread" &mdash; which is how they make money on the transaction, 
        separate from (or sometimes instead of) an explicit fee.
      </p>
      <p>
        This is why a bank might advertise "no transfer fees" and still quietly cost 
        you more than a competitor &mdash; the fee is hidden inside a worse exchange rate, 
        not listed as a separate line item.
      </p>
      <p className="font-semibold text-zinc-900 dark:text-white mt-6 mb-2">A rough example:</p>
      <div className="font-mono bg-zinc-100 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 p-4 rounded-xl text-sm font-semibold my-4 space-y-1">
        <p>Mid-market rate: 1 USD = 278 PKR</p>
        <p>Bank's offered rate: 1 USD = 272 PKR</p>
      </div>
      <p>
        On a $500 transfer, that 6 PKR difference per dollar adds up to 3,000 PKR 
        quietly taken out of the transaction &mdash; without a single visible "fee" charged.
      </p>

      <h2 className="text-2xl font-bold text-zinc-900 dark:text-white mt-10 mb-4">
        How Do You Actually Compare Exchange Rates Fairly?
      </h2>
      <ol className="list-decimal pl-6 space-y-3">
        <li>
          <strong>Check the mid-market rate first</strong>, using a live, independent converter &mdash; 
          this is your honest baseline.
        </li>
        <li>
          <strong>Compare that baseline to what your bank or transfer service is actually 
          offering you</strong> &mdash; the gap between the two is the real cost you're paying.
        </li>
        <li>
          <strong>Don't assume "zero fee" means cheap.</strong> A service with no visible fee but 
          a poor exchange rate can cost more than one that charges a small fee but 
          gives you the real rate.
        </li>
        <li>
          <strong>For large or recurring transfers</strong> (like monthly remittances), even a 
          small percentage difference compounds significantly over a year &mdash; it's 
          worth shopping around.
        </li>
      </ol>

      <h2 className="text-2xl font-bold text-zinc-900 dark:text-white mt-10 mb-4">
        What Are Some Other Important Currency Conversion Details to Know?
      </h2>
      <p className="font-semibold text-zinc-900 dark:text-white mt-4 mb-2">Rates change constantly.</p>
      <p>
        Currency markets move throughout the day based on 
        economic data, interest rate decisions, and global events &mdash; the rate you see 
        right now may be slightly different in a few hours.
      </p>
      <p className="font-semibold text-zinc-900 dark:text-white mt-4 mb-2">Weekends can freeze rates.</p>
      <p>
        Since major currency markets are closed on 
        weekends, some services will use Friday's closing rate for weekend transactions, 
        which can occasionally work in your favor or against you depending on Monday's 
        movement.
      </p>
      <p className="font-semibold text-zinc-900 dark:text-white mt-4 mb-2">Cryptocurrency is a different system entirely.</p>
      <p>
        Crypto exchange rates are 
        determined by exchange order books, not the same mid-market system used for 
        fiat currencies like USD, PKR, or EUR &mdash; so don't expect crypto converters to 
        follow the same logic described here.
      </p>

      <h2 className="text-2xl font-bold text-zinc-900 dark:text-white mt-10 mb-4">
        How Can You Check the Real Exchange Rate Before Converting?
      </h2>
      <p>
        Rather than guessing or relying on outdated numbers, our free{' '}
        <Link href="/tools/currency-converter" className="text-emerald-600 dark:text-emerald-400 font-semibold underline">
          Currency Converter
        </Link>{' '}
        pulls live mid-market rates for 35+ currencies, so you always know the honest baseline before comparing it to whatever rate your bank or transfer service offers. It also shows quick-reference amounts (10, 100, 1000) so you don't have to do the math yourself.
      </p>

      <h2 className="text-2xl font-bold text-zinc-900 dark:text-white mt-10 mb-4">
        Frequently Asked Questions
      </h2>
      <div className="space-y-4 mb-6">
        <details className="border-b border-zinc-200 dark:border-zinc-800 pb-4">
          <summary className="font-semibold cursor-pointer text-zinc-900 dark:text-white">
            Why does the rate change every time I check?
          </summary>
          <p className="mt-2 text-zinc-700 dark:text-zinc-300">
            Currency markets trade continuously during business hours worldwide, so rates 
            shift in small increments throughout the day based on live trading activity.
          </p>
        </details>
        <details className="border-b border-zinc-200 dark:border-zinc-800 pb-4">
          <summary className="font-semibold cursor-pointer text-zinc-900 dark:text-white">
            Is the mid-market rate what I'll actually receive when transferring money?
          </summary>
          <p className="mt-2 text-zinc-700 dark:text-zinc-300">
            Usually not exactly &mdash; most banks and transfer services add their own margin 
            on top. The mid-market rate is your reference point for comparison, not a 
            guaranteed rate you'll be offered.
          </p>
        </details>
        <details className="border-b border-zinc-200 dark:border-zinc-800 pb-4">
          <summary className="font-semibold cursor-pointer text-zinc-900 dark:text-white">
            Why do some countries' currencies have bigger gaps between buy and sell rates?
          </summary>
          <p className="mt-2 text-zinc-700 dark:text-zinc-300">
            Currencies that are traded less frequently (lower liquidity) tend to have 
            wider spreads, since there's less market activity to keep the buy and sell 
            prices close together.
          </p>
        </details>
        <details className="pb-4">
          <summary className="font-semibold cursor-pointer text-zinc-900 dark:text-white">
            Is it better to exchange currency at the airport, a bank, or online?
          </summary>
          <p className="mt-2 text-zinc-700 dark:text-zinc-300">
            Airport currency counters typically offer the worst rates due to convenience 
            pricing and limited competition. Banks and dedicated online transfer services 
            generally offer better rates, though it's worth comparing a few before a large 
            transaction.
          </p>
        </details>
      </div>
    </>
  );
}
