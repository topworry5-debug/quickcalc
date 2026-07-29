export default function ShoeSizeArticle() {
  return (
    <>
      <p className="bg-emerald-50 dark:bg-emerald-950/30 border border-emerald-200 dark:border-emerald-900/50 p-4 rounded-xl text-zinc-800 dark:text-zinc-200 font-medium">
        If you want to know how to convert shoe size between countries accurately, map your measurement against regional systems: a US men's size 9 is a UK 8, EU 42, or 27cm in Japan's centimeter-based sizing. Since brands use different foot molds, size conversions can vary, making rounding up the safest practice for online shopping.
      </p>

      <h2 className="text-2xl font-bold text-zinc-900 dark:text-white mt-10 mb-4">Why Aren't Shoe Sizes the Same Everywhere?</h2>
      <p className="mb-6 text-zinc-700 dark:text-zinc-300 leading-relaxed">Shoe sizing never got a single global standard, and that's really the root of all the confusion. The US and UK systems both trace back to old English measuring conventions from centuries ago, but they drifted apart over time and now sit about a size and a half off from each other for the same actual foot length. Continental Europe uses something called the Paris point system, where each size step equals two-thirds of a centimeter &mdash; a completely different logic from the inch-based systems. Japan skipped the abstract-number approach entirely and just uses your actual foot length in centimeters, which is arguably the most sensible of the bunch, even if it feels unfamiliar if you've only ever shopped in US or UK sizes.</p>

      <h2 className="text-2xl font-bold text-zinc-900 dark:text-white mt-10 mb-4">Men's Shoe Size Conversion Table</h2>
      <div className="overflow-x-auto mb-6">
        <table className="w-full text-sm border-collapse">
          <thead>
            <tr className="border-b border-zinc-300 dark:border-zinc-700">
              <th className="text-left py-2 pr-4">US</th>
              <th className="text-left py-2 pr-4">UK</th>
              <th className="text-left py-2 pr-4">EU</th>
              <th className="text-left py-2">Japan (cm)</th>
            </tr>
          </thead>
          <tbody className="text-zinc-700 dark:text-zinc-300">
            <tr className="border-b border-zinc-200 dark:border-zinc-800">
              <td className="py-2 pr-4">7</td>
              <td className="py-2 pr-4">6</td>
              <td className="py-2 pr-4">40</td>
              <td className="py-2">25</td>
            </tr>
            <tr className="border-b border-zinc-200 dark:border-zinc-800">
              <td className="py-2 pr-4">8</td>
              <td className="py-2 pr-4">7</td>
              <td className="py-2 pr-4">41</td>
              <td className="py-2">26</td>
            </tr>
            <tr className="border-b border-zinc-200 dark:border-zinc-800">
              <td className="py-2 pr-4">9</td>
              <td className="py-2 pr-4">8</td>
              <td className="py-2 pr-4">42</td>
              <td className="py-2">27</td>
            </tr>
            <tr className="border-b border-zinc-200 dark:border-zinc-800">
              <td className="py-2 pr-4">10</td>
              <td className="py-2 pr-4">9</td>
              <td className="py-2 pr-4">43</td>
              <td className="py-2">28</td>
            </tr>
            <tr className="border-b border-zinc-200 dark:border-zinc-800">
              <td className="py-2 pr-4">11</td>
              <td className="py-2 pr-4">10</td>
              <td className="py-2 pr-4">44</td>
              <td className="py-2">29</td>
            </tr>
            <tr>
              <td className="py-2 pr-4">12</td>
              <td className="py-2 pr-4">11</td>
              <td className="py-2 pr-4">45</td>
              <td className="py-2">30</td>
            </tr>
          </tbody>
        </table>
      </div>

      <h2 className="text-2xl font-bold text-zinc-900 dark:text-white mt-10 mb-4">Women's Shoe Size Conversion Table</h2>
      <div className="overflow-x-auto mb-6">
        <table className="w-full text-sm border-collapse">
          <thead>
            <tr className="border-b border-zinc-300 dark:border-zinc-700">
              <th className="text-left py-2 pr-4">US</th>
              <th className="text-left py-2 pr-4">UK</th>
              <th className="text-left py-2 pr-4">EU</th>
              <th className="text-left py-2">Japan (cm)</th>
            </tr>
          </thead>
          <tbody className="text-zinc-700 dark:text-zinc-300">
            <tr className="border-b border-zinc-200 dark:border-zinc-800">
              <td className="py-2 pr-4">6</td>
              <td className="py-2 pr-4">3.5</td>
              <td className="py-2 pr-4">36.5</td>
              <td className="py-2">23</td>
            </tr>
            <tr className="border-b border-zinc-200 dark:border-zinc-800">
              <td className="py-2 pr-4">7</td>
              <td className="py-2 pr-4">4.5</td>
              <td className="py-2 pr-4">37.5</td>
              <td className="py-2">24</td>
            </tr>
            <tr className="border-b border-zinc-200 dark:border-zinc-800">
              <td className="py-2 pr-4">8</td>
              <td className="py-2 pr-4">5.5</td>
              <td className="py-2 pr-4">38.5</td>
              <td className="py-2">24.5</td>
            </tr>
            <tr className="border-b border-zinc-200 dark:border-zinc-800">
              <td className="py-2 pr-4">9</td>
              <td className="py-2 pr-4">6.5</td>
              <td className="py-2 pr-4">40</td>
              <td className="py-2">25.5</td>
            </tr>
            <tr>
              <td className="py-2 pr-4">10</td>
              <td className="py-2 pr-4">7.5</td>
              <td className="py-2 pr-4">41</td>
              <td className="py-2">26.5</td>
            </tr>
          </tbody>
        </table>
      </div>

      <h2 className="text-2xl font-bold text-zinc-900 dark:text-white mt-10 mb-4">Kids' Shoe Size Conversion Table</h2>
      <p className="mb-4 text-zinc-700 dark:text-zinc-300 leading-relaxed">Kids' sizing runs on its own scale entirely, separate from adult sizing, and it resets once a child crosses into adult sizes (roughly US kids' size 13.5 becomes adult size 1).</p>
      <div className="overflow-x-auto mb-6">
        <table className="w-full text-sm border-collapse">
          <thead>
            <tr className="border-b border-zinc-300 dark:border-zinc-700">
              <th className="text-left py-2 pr-4">US</th>
              <th className="text-left py-2 pr-4">UK</th>
              <th className="text-left py-2 pr-4">EU</th>
              <th className="text-left py-2">Japan (cm)</th>
            </tr>
          </thead>
          <tbody className="text-zinc-700 dark:text-zinc-300">
            <tr className="border-b border-zinc-200 dark:border-zinc-800">
              <td className="py-2 pr-4">10</td>
              <td className="py-2 pr-4">9.5</td>
              <td className="py-2 pr-4">27</td>
              <td className="py-2">16.5</td>
            </tr>
            <tr className="border-b border-zinc-200 dark:border-zinc-800">
              <td className="py-2 pr-4">12</td>
              <td className="py-2 pr-4">11.5</td>
              <td className="py-2 pr-4">30</td>
              <td className="py-2">18.5</td>
            </tr>
            <tr>
              <td className="py-2 pr-4">1 (Youth)</td>
              <td className="py-2 pr-4">13</td>
              <td className="py-2 pr-4">32</td>
              <td className="py-2">20</td>
            </tr>
          </tbody>
        </table>
      </div>

      <h2 className="text-2xl font-bold text-zinc-900 dark:text-white mt-10 mb-4">Why Your Size Still Shifts Between Brands</h2>
      <p className="mb-6 text-zinc-700 dark:text-zinc-300 leading-relaxed">Here's the part that trips people up even after they've converted correctly: brands don't all build shoes on the same last (the foot-shaped mold a shoe is built around). Nike and Adidas tend to run fairly close to standard conversion charts. Some European boutique and dress-shoe brands run narrower or a half size smaller than you'd expect. If you're between two sizes after converting, sizing up is almost always the safer call &mdash; a shoe that's slightly roomy is a minor annoyance, but one that's slightly tight is often unwearable.</p>

      <div className="my-8 p-6 rounded-xl border border-emerald-200 dark:border-emerald-900 bg-emerald-50 dark:bg-emerald-950">
        <p className="font-semibold text-emerald-800 dark:text-emerald-300 mb-2">Skip the math</p>
        <p className="text-zinc-700 dark:text-zinc-300">Use our free <a href="/tools/shoe-size-converter" className="text-emerald-600 dark:text-emerald-400 underline">Shoe Size Converter</a> to get instant US, UK, EU, and Japan conversions without doing any of this by hand.</p>
      </div>

      <h2 className="text-2xl font-bold text-zinc-900 dark:text-white mt-10 mb-4">Frequently Asked Questions</h2>
      <div className="space-y-4 mb-6">
        <details className="border-b border-zinc-200 dark:border-zinc-800 pb-4">
          <summary className="font-semibold cursor-pointer text-zinc-900 dark:text-white">Where can I find a US to EU shoe size chart?</summary>
          <p className="mt-2 text-zinc-700 dark:text-zinc-300">You can use our US to EU shoe size chart tables above to easily convert sizing for men, women, and kids. For example, a US men's size 9 converts to an EU 42, and a US women's size 8 converts to an EU 38.5.</p>
        </details>
        <details className="border-b border-zinc-200 dark:border-zinc-800 pb-4">
          <summary className="font-semibold cursor-pointer text-zinc-900 dark:text-white">How to measure your foot for shoe size?</summary>
          <p className="mt-2 text-zinc-700 dark:text-zinc-300">To know how to measure your foot for shoe size, place a piece of paper on the floor against a wall, step on it with your heel against the wall, trace the outline of your foot, and measure the distance from the heel to your longest toe. Use this measurement in centimeters or inches against our conversion tables.</p>
        </details>
        <details className="border-b border-zinc-200 dark:border-zinc-800 pb-4">
          <summary className="font-semibold cursor-pointer text-zinc-900 dark:text-white">Why do Japanese shoe sizes use centimeters?</summary>
          <p className="mt-2 text-zinc-700 dark:text-zinc-300">Japan's system is based directly on actual foot length in centimeters rather than an abstract numbered scale, which is why it tends to be the most consistent system to convert into.</p>
        </details>
        <details className="pb-4">
          <summary className="font-semibold cursor-pointer text-zinc-900 dark:text-white">Should I round up or down when converting shoe sizes?</summary>
          <p className="mt-2 text-zinc-700 dark:text-zinc-300">When in doubt, round up. A slightly larger shoe is far more comfortable to live with than one that's too tight.</p>
        </details>
      </div>

      <p className="text-zinc-700 dark:text-zinc-300 leading-relaxed">If you're also converting fabric or paper measurements for an international order, our <a href="/tools/paper-fabric-size-converter" className="text-emerald-600 dark:text-emerald-400 underline">Paper & Fabric Size Converter</a> covers that too.</p>
    </>
  );
}
