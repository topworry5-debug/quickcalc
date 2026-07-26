import Link from "next/link";

export default function ZakatCalculationGuideArticle() {
  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      {
        "@type": "Question",
        "name": "What is nisab in Zakat calculation?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "The nisab is the minimum threshold of personal wealth that a Muslim must possess for one full lunar year before they are obligated to pay Zakat. If your total qualifying net assets fall below this threshold, you are exempt from paying Zakat for that year. The nisab is historically valued as the monetary equivalent of either 87.48 grams of gold or 612.36 grams of silver."
        }
      },
      {
        "@type": "Question",
        "name": "Do I pay Zakat on gold jewelry I wear regularly?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Scholarly views differ on whether regularly worn personal jewelry is subject to Zakat. Some legal schools of thought hold that regularly worn gold jewelry is exempt because it constitutes a personal necessity, while other schools maintain that all gold jewelry is zakat-eligible if its total weight exceeds the gold nisab standard of 87.48 grams. If you hold gold jewelry as a store of value or an investment, it is universally subject to Zakat."
        }
      },
      {
        "@type": "Question",
        "name": "Is Zakat calculated on income or savings?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Zakat is calculated on your accumulated net savings and surplus assets held at the end of your lunar year, not on your annual income. While your salary or business income is the source of your wealth, you do not pay Zakat on money that is immediately spent on basic living expenses. You only calculate Zakat at a 2.5% rate on the surplus wealth that remains in your possession above the nisab threshold for a full year."
        }
      },
      {
        "@type": "Question",
        "name": "What's the difference between gold nisab and silver nisab?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "The gold nisab is based on the value of 87.48 grams of gold, whereas the silver nisab is based on the value of 612.36 grams of silver. Because the market value of gold has risen significantly higher than silver over the centuries, the silver nisab threshold is much lower in modern currency terms. Using the silver standard results in a lower threshold, meaning more individuals qualify to pay Zakat and more funds are raised for charitable distribution."
        }
      },
      {
        "@type": "Question",
        "name": "Do I pay Zakat if I have debts?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Yes, you may still need to pay Zakat, but you are generally permitted to subtract your immediate, short-term liabilities and outstanding debts from your total assets before comparing your wealth to the nisab. If your remaining net assets after deducting these critical liabilities still exceed the nisab threshold, you will calculate and pay Zakat at the standard 2.5% rate on that net balance."
        }
      },
      {
        "@type": "Question",
        "name": "How often do I need to pay Zakat?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "You must pay Zakat once every lunar year, provided that your net wealth has remained at or above the designated nisab threshold for that entire twelve-month period. This cycle is known as the hawl, and it begins on the exact date your wealth first met the nisab threshold. Many people choose to align their yearly calculations with the month of Ramadan to maintain a consistent annual schedule and maximize their charitable impact."
        }
      }
    ]
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />

      {/* General Disclaimer */}
      <div className="bg-amber-50 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-900/50 p-5 rounded-2xl text-zinc-800 dark:text-zinc-200 text-sm mb-8 leading-relaxed">
        <strong className="text-amber-800 dark:text-amber-400 font-semibold block mb-1">Important General Disclaimer</strong>
        This article serves as a practical, mathematical guide to standard Zakat calculation procedures and is designed for educational purposes only. It does not constitute a formal religious ruling (fatwa) or absolute legal advice. Because interpretations, local practices, and personal financial circumstances can vary significantly, you should consult a qualified scholar or respected authority within your community for specific, complex, or borderline situations.
      </div>

      {/* Standalone direct-answer paragraph */}
      <p className="bg-emerald-50 dark:bg-emerald-950/30 border border-emerald-200 dark:border-emerald-900/50 p-6 rounded-2xl text-zinc-800 dark:text-zinc-200 font-medium text-lg leading-relaxed mb-8">
        Zakat is a mandatory annual charitable contribution of 2.5% of a Muslim's surplus wealth, provided their total net assets meet or exceed a specific threshold known as the nisab for a full lunar year. Eligible wealth includes cash, bank savings, gold, silver, business inventory, and investments, minus immediate outstanding debts, helping to support vulnerable members of society.
      </p>

      <p>
        For millions of individuals around the world, calculating Zakat is one of the most significant personal financial exercises of the year. This annual practice represents more than a simple act of charity; it is a core pillar of faith designed to foster economic balance, purify personal assets, and support those who are struggling. While the spiritual significance of this practice is profound, the actual process of calculation is entirely mathematical.
      </p>

      <p>
        The mathematics of Zakat are structured around clear, ancient definitions of assets, thresholds, and liabilities. However, applying these centuries-old concepts to modern financial portfolios—filled with savings accounts, retirement funds, stock investments, business inventories, and consumer debt—can feel incredibly overwhelming if you do not have a structured approach. This guide breaks down the calculation step by step, ensuring you can determine your obligations with confidence and precision.
      </p>

      <h2 className="text-2xl font-bold text-zinc-900 dark:text-white mt-8 mb-4">
        What Is Nisab and Why It Matters
      </h2>
      <p>
        Before you can calculate your Zakat obligation, you must determine whether you are actually required to pay it. This is where the concept of the <strong>nisab</strong> becomes essential. The nisab is the absolute minimum threshold of personal wealth that a person must possess before Zakat becomes obligatory. If your total qualifying net assets fall below this value, you do not have to pay anything for that year.
      </p>
      <p>
        Historically, the nisab threshold was established by referencing two specific precious metal standards defined during the early period of Islamic history:
      </p>
      <ul className="list-disc pl-6 space-y-2">
        <li><strong>The Gold Standard:</strong> Valued at 20 Mithqals, which is modernly calculated as exactly <strong>87.48 grams of pure gold</strong>.</li>
        <li><strong>The Silver Standard:</strong> Valued at 200 Dirhams, which is modernly calculated as exactly <strong>612.36 grams of pure silver</strong>.</li>
      </ul>
      <p>
        Because the values of gold and silver were relatively comparable in ancient times, the two standards yielded similar wealth thresholds. However, in our modern financial systems, the market prices of gold and silver have diverged dramatically. Gold has become far more valuable than silver, creating a significant gap between the two thresholds.
      </p>
      <p>
        This divergence has led to different scholarly perspectives on which standard to apply today. Many modern scholars recommend utilizing the silver standard because it establishes a much lower entry threshold. A lower threshold means that a larger percentage of the population will meet the minimum requirement to contribute, which in turn generates substantially more funds to aid the poor and vulnerable. Conversely, other scholars suggest using the gold standard, arguing that it represents a more realistic baseline for true financial stability in contemporary economies, protecting individuals who have only modest savings from being burdened. 
      </p>
      <p>
        To determine the current monetary value of the nisab, you must multiply these physical weights by the live market price of gold or silver per gram in your local currency. You can easily find these live values or perform instant conversions using our dedicated <Link href="/tools/zakat-calculator" className="text-emerald-600 dark:text-emerald-400 font-semibold underline">Zakat Calculator</Link> which simplifies this initial step.
      </p>

      {/* Visual Reference Table */}
      <div className="my-8">
        <div className="overflow-x-auto border border-zinc-200 dark:border-zinc-800 rounded-xl">
          <table className="min-w-full divide-y divide-zinc-200 dark:divide-zinc-800 text-sm">
            <thead className="bg-zinc-100 dark:bg-zinc-900">
              <tr>
                <th className="px-6 py-3 text-left font-semibold text-zinc-700 dark:text-zinc-300">Nisab Standard</th>
                <th className="px-6 py-3 text-left font-semibold text-zinc-700 dark:text-zinc-300">Required Weight</th>
                <th className="px-6 py-3 text-left font-semibold text-zinc-700 dark:text-zinc-300">Practical Application in Modern Finance</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-zinc-200 dark:divide-zinc-800 bg-white dark:bg-zinc-950">
              <tr>
                <td className="px-6 py-4 font-medium text-zinc-900 dark:text-white">Gold Nisab</td>
                <td className="px-6 py-4 font-mono">87.48 grams</td>
                <td className="px-6 py-4 text-zinc-600 dark:text-zinc-400">
                  Calculated using live pure gold market prices. This standard represents a higher wealth threshold and is preferred by some for protecting lower-income savers from payment obligations.
                </td>
              </tr>
              <tr>
                <td className="px-6 py-4 font-medium text-zinc-900 dark:text-white">Silver Nisab</td>
                <td className="px-6 py-4 font-mono">612.36 grams</td>
                <td className="px-6 py-4 text-zinc-600 dark:text-zinc-400">
                  Calculated using live pure silver market prices. This standard represents a lower wealth threshold, requiring more individuals to pay and maximizing support for charitable beneficiaries.
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-2 text-center">
          Note: To find the current cash threshold, multiply these gram values by today's spot price of 24k gold or silver.
        </p>
      </div>

      <h2 className="text-2xl font-bold text-zinc-900 dark:text-white mt-8 mb-4">
        What Counts as Zakat-Eligible Wealth
      </h2>
      <p>
        Once you know which nisab standard you are following, you must calculate the total value of your qualifying assets. Zakat is not a tax on your income; rather, it is a fee on your accumulated net liquid wealth and productive surplus assets. Knowing exactly which items to include and which to exclude is essential to avoiding incorrect calculations.
      </p>
      <p>
        The following assets are considered <strong>Zakat-eligible</strong> and must be added to your total calculation pool:
      </p>
      <ul className="list-disc pl-6 space-y-3">
        <li>
          <strong>Cash and Liquid Savings:</strong> This includes physical cash in your possession, funds held in checking and savings accounts, digital wallets, and cash certificates. You must count all cash, regardless of where it is stored or what you are saving it for (such as a future wedding, a vacation, or a property purchase).
        </li>
        <li>
          <strong>Gold and Silver:</strong> All pure gold and silver items, including coins, bullion, and bars, are fully subject to Zakat. When it comes to <strong>zakat on gold jewelry</strong>, opinions vary. Some traditional schools of law state that jewelry worn regularly as personal adornment is exempt. Other schools argue that all gold and silver jewelry is fully subject to Zakat, provided the total weight exceeds the nisab. Any jewelry held specifically as an investment or storage of wealth is always subject to Zakat.
        </li>
        <li>
          <strong>Investments, Stocks, and Mutual Funds:</strong> If you own stocks or shares in companies, you must pay Zakat on their value. If the shares are held for short-term trading, you calculate Zakat based on their current full market value. If they are held as a long-term investment, you pay Zakat on the underlying zakat-eligible assets of those companies (often estimated at 25% to 30% of the total share value, though consulting a specialist can yield a more exact figure).
        </li>
        <li>
          <strong>Business Inventory:</strong> If you own a business, the wholesale value of any finished goods, raw materials, and work-in-progress inventory intended for sale must be included in your asset pool.
        </li>
        <li>
          <strong>Money Owed to You:</strong> If you have lent money to family or friends and you are confident that the debt will be repaid, you must include this outstanding balance in your annual calculation. If the debt is doubtful or unlikely to be recovered, you do not need to count it until the day the money is actually returned to your hands.
        </li>
      </ul>
      <p>
        Conversely, you do not pay Zakat on assets that are classified as primary personal necessities or non-productive property. The following items are <strong>fully exempt</strong> from your calculation:
      </p>
      <ul className="list-disc pl-6 space-y-2">
        <li><strong>Primary Residence:</strong> The house or apartment you live in is exempt, regardless of its market value.</li>
        <li><strong>Personal Vehicles:</strong> Cars, motorcycles, or other vehicles used for personal transportation are not included.</li>
        <li><strong>Everyday Personal Items:</strong> Your furniture, clothing, household appliances, electronics, and books used for personal purposes are entirely exempt.</li>
        <li><strong>Business Equipment and Tools:</strong> The physical assets of a business that are not for sale—such as machinery, computers, office furniture, company vehicles, and the building itself—are not subject to Zakat.</li>
      </ul>

      <h2 className="text-2xl font-bold text-zinc-900 dark:text-white mt-8 mb-4">
        How to Calculate Your Zakat (Step-by-Step With a Real Example)
      </h2>
      <p>
        To make this entire process concrete, let's walk through a realistic, step-by-step mathematical example. We will follow a fictional individual named Sarah, who is calculating her Zakat at the end of her lunar year.
      </p>
      <p>
        First, Sarah gathers all her financial statements and records her assets:
      </p>
      <ol className="list-decimal pl-6 space-y-2">
        <li>Cash in her checking account: $4,500</li>
        <li>Savings in her digital account (earmarked for a house down payment): $12,000</li>
        <li>Value of investment stocks: $3,500</li>
        <li>Gold jewelry (valued as investment/store of wealth): 95 grams, worth approximately $6,500</li>
        <li>Cash she lent to a friend (repayment is guaranteed): $1,000</li>
      </ol>
      <p className="font-semibold text-zinc-950 dark:text-white mt-4">
        Step 1: Calculate Gross Zakat-Eligible Assets
      </p>
      <p>
        Sarah sums up all her qualifying assets:
        <br />
        <span className="font-mono bg-zinc-100 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 px-3 py-1.5 rounded-lg inline-block mt-2 font-semibold">
          $4,500 + $12,000 + $3,500 + $6,500 + $1,000 = $27,500 Total Assets
        </span>
      </p>

      <p className="font-semibold text-zinc-950 dark:text-white mt-4">
        Step 2: Subtract Eligible Liabilities
      </p>
      <p>
        Sarah has one outstanding credit card bill of $500 and a monthly payment of $200 due immediately on a personal loan. She subtracts these immediate liabilities from her total assets:
        <br />
        <span className="font-mono bg-zinc-100 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 px-3 py-1.5 rounded-lg inline-block mt-2 font-semibold">
          $27,500 - ($500 + $200) = $26,800 Net Zakat-Eligible Wealth
        </span>
      </p>

      <p className="font-semibold text-zinc-950 dark:text-white mt-4">
        Step 3: Compare to Current Nisab
      </p>
      <p>
        Next, Sarah checks the live nisab value. For this calculation, she chooses to use the silver standard. Let's assume the current price of silver is $0.80 per gram. 
        <br />
        <span className="font-mono bg-zinc-100 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 px-3 py-1.5 rounded-lg inline-block mt-2 font-semibold">
          Silver Nisab = 612.36g &times; $0.80 = $489.89
        </span>
      </p>
      <p>
        Because Sarah's net wealth of $26,800 is significantly higher than the silver nisab threshold of $489.89, she is fully obligated to pay Zakat on her entire net wealth.
      </p>

      <p className="font-semibold text-zinc-950 dark:text-white mt-4">
        Step 4: Calculate the 2.5% Zakat Due
      </p>
      <p>
        Finally, Sarah applies the standard 2.5% percentage rate to her net wealth:
        <br />
        <span className="font-mono bg-zinc-100 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 px-3 py-1.5 rounded-lg inline-block mt-2 font-semibold">
          Zakat Due = $26,800 &times; 0.025 = $670.00
        </span>
      </p>
      <p>
        Sarah's total Zakat obligation for this lunar year is exactly $670.00. She can distribute this money directly to eligible charitable organizations, community relief programs, or families in need.
      </p>

      {/* Callout box linking to the Zakat Calculator */}
      <div className="bg-emerald-50 dark:bg-emerald-950/20 border border-emerald-200 dark:border-emerald-900/40 p-6 rounded-2xl text-center my-8">
        <h3 className="text-lg font-bold text-zinc-900 dark:text-white mb-2">Skip the manual math — use our free Zakat Calculator</h3>
        <p className="text-sm text-zinc-600 dark:text-zinc-400 mb-4">
          Avoid human error and convert your assets instantly using live gold and silver spot prices. Our secure online calculator does all the heavy lifting for you.
        </p>
        <Link
          href="/tools/zakat-calculator"
          className="inline-block bg-emerald-600 hover:bg-emerald-700 text-white font-semibold px-6 py-2.5 rounded-xl text-sm transition-colors shadow-sm"
        >
          Calculate Zakat Instantly &rarr;
        </Link>
      </div>

      <h2 className="text-2xl font-bold text-zinc-900 dark:text-white mt-8 mb-4">
        Do You Pay Zakat If You Have Debts?
      </h2>
      <p>
        One of the most frequent areas of confusion in Zakat calculation involves how to handle outstanding personal debts and liabilities. If you owe money, does it reduce your Zakat-eligible wealth?
      </p>
      <p>
        As a general rule, you are permitted to subtract your immediate, short-term liabilities from your gross assets before you compare your total wealth to the nisab threshold. Eligible deductions typically include unpaid utility bills, outstanding rent, credit card balances, and any installment payments on personal loans that are due immediately or within the current month.
      </p>
      <p>
        However, the treatment of long-term debts—such as residential mortgages or student loans—requires a more nuanced approach. If you have a thirty-year home mortgage, you do not subtract the entire remaining balance of the loan from your assets. Subtracting a massive long-term liability like a mortgage would completely wipe out most people's assets, exempting them from paying Zakat despite having high cash savings. Instead, you are only permitted to subtract the upcoming monthly payment or the portion of the debt that is due in the immediate future. Any remaining long-term balance is excluded from your annual liability deductions.
      </p>

      <h2 className="text-2xl font-bold text-zinc-900 dark:text-white mt-8 mb-4">
        When Should You Pay Zakat?
      </h2>
      <p>
        Zakat is not tied to a specific calendar date like tax seasons. Instead, your personal Zakat cycle is determined by the concept of the <strong>hawl</strong>. The hawl refers to the requirement that your wealth must remain above the nisab threshold for one complete lunar year (approximately 354 days) before Zakat becomes due.
      </p>
      <p>
        The cycle begins on the exact day your total net assets first reached or exceeded the nisab threshold. Once that date is established, you must track your wealth. If your assets fluctuate throughout the year but never dip completely to zero or drop below the nisab threshold at the anniversary date, you are obligated to pay Zakat on your total net assets at the end of that twelve-month period.
      </p>
      <p>
        While every individual has their own unique anniversary date based on when they first acquired wealth, many people choose to align their calculations with the holy month of Ramadan. Ramadan is highly popular because it provides a reliable, memorable annual milestone, making it easy to remember the calculation year after year. Additionally, many choose this month to maximize the spiritual impact of their charitable giving. However, keeping a precise, documented calendar date based on your personal wealth history ensures absolute accuracy.
      </p>

      <h2 className="text-2xl font-bold text-zinc-900 dark:text-white mt-8 mb-4">
        Frequently Asked Questions
      </h2>
      <div className="space-y-6">
        <div className="border border-zinc-200 dark:border-zinc-800 rounded-2xl p-5 bg-white dark:bg-zinc-900/50">
          <h4 className="font-bold text-zinc-900 dark:text-white text-base mb-2">What is nisab in Zakat calculation?</h4>
          <p className="text-zinc-600 dark:text-zinc-400 text-sm leading-relaxed">
            The nisab is the minimum threshold of personal wealth that a Muslim must possess for one full lunar year before they are obligated to pay Zakat. If your total qualifying net assets fall below this threshold, you are exempt from paying Zakat for that year. The nisab is historically valued as the monetary equivalent of either 87.48 grams of gold or 612.36 grams of silver.
          </p>
        </div>

        <div className="border border-zinc-200 dark:border-zinc-800 rounded-2xl p-5 bg-white dark:bg-zinc-900/50">
          <h4 className="font-bold text-zinc-900 dark:text-white text-base mb-2">Do I pay Zakat on gold jewelry I wear regularly?</h4>
          <p className="text-zinc-600 dark:text-zinc-400 text-sm leading-relaxed">
            Scholarly views differ on whether regularly worn personal jewelry is subject to Zakat. Some legal schools of thought hold that regularly worn gold jewelry is exempt because it constitutes a personal necessity, while other schools maintain that all gold jewelry is zakat-eligible if its total weight exceeds the gold nisab standard of 87.48 grams. If you hold gold jewelry as a store of value or an investment, it is universally subject to Zakat.
          </p>
        </div>

        <div className="border border-zinc-200 dark:border-zinc-800 rounded-2xl p-5 bg-white dark:bg-zinc-900/50">
          <h4 className="font-bold text-zinc-900 dark:text-white text-base mb-2">Is Zakat calculated on income or savings?</h4>
          <p className="text-zinc-600 dark:text-zinc-400 text-sm leading-relaxed">
            Zakat is calculated on your accumulated net savings and surplus assets held at the end of your lunar year, not on your annual income. While your salary or business income is the source of your wealth, you do not pay Zakat on money that is immediately spent on basic living expenses. You only calculate Zakat at a 2.5% rate on the surplus wealth that remains in your possession above the nisab threshold for a full year.
          </p>
        </div>

        <div className="border border-zinc-200 dark:border-zinc-800 rounded-2xl p-5 bg-white dark:bg-zinc-900/50">
          <h4 className="font-bold text-zinc-900 dark:text-white text-base mb-2">What's the difference between gold nisab and silver nisab?</h4>
          <p className="text-zinc-600 dark:text-zinc-400 text-sm leading-relaxed">
            The gold nisab is based on the value of 87.48 grams of gold, whereas the silver nisab is based on the value of 612.36 grams of silver. Because the market value of gold has risen significantly higher than silver over the centuries, the silver nisab threshold is much lower in modern currency terms. Using the silver standard results in a lower threshold, meaning more individuals qualify to pay Zakat and more funds are raised for charitable distribution.
          </p>
        </div>

        <div className="border border-zinc-200 dark:border-zinc-800 rounded-2xl p-5 bg-white dark:bg-zinc-900/50">
          <h4 className="font-bold text-zinc-900 dark:text-white text-base mb-2">Do I pay Zakat if I have debts?</h4>
          <p className="text-zinc-600 dark:text-zinc-400 text-sm leading-relaxed">
            Yes, you may still need to pay Zakat, but you are generally permitted to subtract your immediate, short-term liabilities and outstanding debts from your total assets before comparing your wealth to the nisab. If your remaining net assets after deducting these critical liabilities still exceed the nisab threshold, you will calculate and pay Zakat at the standard 2.5% rate on that net balance.
          </p>
        </div>

        <div className="border border-zinc-200 dark:border-zinc-800 rounded-2xl p-5 bg-white dark:bg-zinc-900/50">
          <h4 className="font-bold text-zinc-900 dark:text-white text-base mb-2">How often do I need to pay Zakat?</h4>
          <p className="text-zinc-600 dark:text-zinc-400 text-sm leading-relaxed">
            You must pay Zakat once every lunar year, provided that your net wealth has remained at or above the designated nisab threshold for that entire twelve-month period. This cycle is known as the hawl, and it begins on the exact date your wealth first met the nisab threshold. Many people choose to align their yearly calculations with the month of Ramadan to maintain a consistent annual schedule and maximize their charitable impact.
          </p>
        </div>
      </div>

      <p className="mt-12 text-zinc-700 dark:text-zinc-300">
        Managing complex finances requires practical systems that remove uncertainty and reduce mathematical errors. For your broader personal financial planning, you can explore other resources such as our <Link href="/tools/loan-calculator" className="text-emerald-600 dark:text-emerald-400 font-semibold underline">Loan Calculator</Link> to analyze liabilities, or our <Link href="/tools/currency-converter" className="text-emerald-600 dark:text-emerald-400 font-semibold underline">Currency Converter</Link> to check live currency exchange rates across global markets.
      </p>
    </>
  );
}
