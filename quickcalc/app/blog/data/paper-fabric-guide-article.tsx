import Link from "next/link";

export default function PaperFabricGuideArticle() {
  return (
    <>
      <p className="bg-amber-50 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-900/50 p-4 rounded-xl text-zinc-800 dark:text-zinc-200 font-medium">
        <strong>Quick Answer:</strong> To convert ISO paper sizes (A0 to A10), remember that each size is formed by halving the larger sheet along its long edge; for example, ISO A4 measures 210 &times; 297 mm (8.27 &times; 11.69 in), whereas US Letter measures 215.9 &times; 279.4 mm (8.5 &times; 11.0 in). To convert fabric lengths, multiply yards by 0.9144 to get meters (1 yard = 0.9144 m = 36 in). To convert paper dimensions or fabric yardage instantly across mm, cm, inches, yards, and meters, try our free <Link href="/tools/paper-fabric-size-converter" className="text-amber-600 dark:text-amber-400 font-semibold underline">Paper &amp; Fabric Size Converter</Link>.
      </p>

      <h2 className="text-2xl sm:text-3xl font-bold text-zinc-900 dark:text-white mt-10 mb-4">
        The Print &amp; Crafting Disaster: Why Your Document Got Cut Off (or Your Quilt Ran Out of Fabric)
      </h2>
      <p>
        You format a crucial 10-page report or invoice PDF in your office, email it to a client or printing service in Europe, and receive a frustrating message back: <em>&ldquo;The text on the bottom two lines of every page got cropped off.&rdquo;</em>
      </p>
      <p>
        Alternatively, imagine you are following an international sewing pattern that calls for 8.5 meters of fabric. You head to your local craft store in North America, purchase 8.5 yards of linen, and start cutting out pattern pieces&mdash;only to run out of material right before finishing the sleeves.
      </p>
      <p>
        These mistakes happen because global standards differ radically depending on where you live. North America uses imperial ANSI paper standards (such as Letter, Legal, and Tabloid), whereas the rest of the world uses ISO 216 standards (A0, A4, B5). Similarly, textile design toggles between imperial yards and inches and metric meters and centimeters.
      </p>
      <p>
        Learning <strong>how to convert paper and fabric sizes</strong> prevents printing mishaps, avoids wasted paper, and protects your craft budget from costly yardage errors.
      </p>

      <h2 className="text-2xl sm:text-3xl font-bold text-zinc-900 dark:text-white mt-10 mb-4">
        The ISO 216 Paper Standard: Understanding the A-Series Halving Math
      </h2>
      <p>
        The international paper standard (<strong>ISO 216</strong>) is based on a constant <strong>aspect ratio of 1 : &radic;2</strong> (&asymp; 1 : 1.4142). Folding an A0 sheet in half along its longest edge yields two A1 sheets with the exact same visual proportions as the original A0 sheet.
      </p>

      <div className="overflow-x-auto my-6">
        <table className="w-full text-left text-sm text-zinc-700 dark:text-zinc-300 border-collapse border border-zinc-200 dark:border-zinc-800">
          <thead>
            <tr className="bg-zinc-100 dark:bg-zinc-900 text-zinc-900 dark:text-white font-semibold">
              <th className="border border-zinc-200 dark:border-zinc-800 p-3">Paper Size</th>
              <th className="border border-zinc-200 dark:border-zinc-800 p-3">Dimensions (mm)</th>
              <th className="border border-zinc-200 dark:border-zinc-800 p-3">Dimensions (cm)</th>
              <th className="border border-zinc-200 dark:border-zinc-800 p-3">Dimensions (Inches)</th>
              <th className="border border-zinc-200 dark:border-zinc-800 p-3">Area / Primary Usage</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="border border-zinc-200 dark:border-zinc-800 p-3 font-medium">A0</td>
              <td className="border border-zinc-200 dark:border-zinc-800 p-3">841 &times; 1189 mm</td>
              <td className="border border-zinc-200 dark:border-zinc-800 p-3">84.1 &times; 118.9 cm</td>
              <td className="border border-zinc-200 dark:border-zinc-800 p-3">33.11 &times; 46.81 in</td>
              <td className="border border-zinc-200 dark:border-zinc-800 p-3 font-semibold text-amber-600 dark:text-amber-400">1.00 m² (Base Poster)</td>
            </tr>
            <tr className="bg-zinc-50/50 dark:bg-zinc-900/50">
              <td className="border border-zinc-200 dark:border-zinc-800 p-3 font-medium">A1</td>
              <td className="border border-zinc-200 dark:border-zinc-800 p-3">594 &times; 841 mm</td>
              <td className="border border-zinc-200 dark:border-zinc-800 p-3">59.4 &times; 84.1 cm</td>
              <td className="border border-zinc-200 dark:border-zinc-800 p-3">23.39 &times; 33.11 in</td>
              <td className="border border-zinc-200 dark:border-zinc-800 p-3">Architectural Blueprints</td>
            </tr>
            <tr>
              <td className="border border-zinc-200 dark:border-zinc-800 p-3 font-medium">A2</td>
              <td className="border border-zinc-200 dark:border-zinc-800 p-3">420 &times; 594 mm</td>
              <td className="border border-zinc-200 dark:border-zinc-800 p-3">42.0 &times; 59.4 cm</td>
              <td className="border border-zinc-200 dark:border-zinc-800 p-3">16.54 &times; 23.39 in</td>
              <td className="border border-zinc-200 dark:border-zinc-800 p-3">Fine Art Prints</td>
            </tr>
            <tr className="bg-zinc-50/50 dark:bg-zinc-900/50">
              <td className="border border-zinc-200 dark:border-zinc-800 p-3 font-medium">A3</td>
              <td className="border border-zinc-200 dark:border-zinc-800 p-3">297 &times; 420 mm</td>
              <td className="border border-zinc-200 dark:border-zinc-800 p-3">29.7 &times; 42.0 cm</td>
              <td className="border border-zinc-200 dark:border-zinc-800 p-3">11.69 &times; 16.54 in</td>
              <td className="border border-zinc-200 dark:border-zinc-800 p-3">Spreadsheets &amp; Diagrams</td>
            </tr>
            <tr>
              <td className="border border-zinc-200 dark:border-zinc-800 p-3 font-medium">A4</td>
              <td className="border border-zinc-200 dark:border-zinc-800 p-3">210 &times; 297 mm</td>
              <td className="border border-zinc-200 dark:border-zinc-800 p-3">21.0 &times; 29.7 cm</td>
              <td className="border border-zinc-200 dark:border-zinc-800 p-3 font-semibold text-amber-600 dark:text-amber-400">8.27 &times; 11.69 in</td>
              <td className="border border-zinc-200 dark:border-zinc-800 p-3">Standard International Document</td>
            </tr>
            <tr className="bg-zinc-50/50 dark:bg-zinc-900/50">
              <td className="border border-zinc-200 dark:border-zinc-800 p-3 font-medium">A5</td>
              <td className="border border-zinc-200 dark:border-zinc-800 p-3">148 &times; 210 mm</td>
              <td className="border border-zinc-200 dark:border-zinc-800 p-3">14.8 &times; 21.0 cm</td>
              <td className="border border-zinc-200 dark:border-zinc-800 p-3">5.83 &times; 8.27 in</td>
              <td className="border border-zinc-200 dark:border-zinc-800 p-3">Booklets &amp; Flyers</td>
            </tr>
          </tbody>
        </table>
      </div>

      <h2 className="text-2xl sm:text-3xl font-bold text-zinc-900 dark:text-white mt-10 mb-4">
        A4 vs. US Letter: Why International Printing Causes Cut-off Margins
      </h2>
      <p>
        North America uses imperial ANSI paper standards, creating a perpetual clash between <strong>ISO A4</strong> and <strong>US Letter</strong>:
      </p>

      <ul className="list-disc pl-6 space-y-2 mb-4">
        <li><strong>ISO A4:</strong> 210.0 &times; 297.0 mm (8.27 &times; 11.69 inches) &mdash; Taller and narrower.</li>
        <li><strong>US Letter:</strong> 215.9 &times; 279.4 mm (8.50 &times; 11.00 inches) &mdash; Wider and shorter.</li>
      </ul>
      <p>
        US Letter is 5.9 mm wider than A4, but ISO A4 is 17.6 mm taller than Letter. Printing an unscaled A4 PDF on US Letter paper crops the bottom margin.
      </p>

      <h2 className="text-2xl sm:text-3xl font-bold text-zinc-900 dark:text-white mt-10 mb-4">
        Fabric Measurement Math: Converting Yards, Meters, Feet &amp; Inches
      </h2>
      <div className="bg-zinc-100 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 p-4 rounded-xl my-4 font-mono text-sm text-center font-semibold text-zinc-900 dark:text-zinc-100">
        <p>1 Yard = 3 Feet = 36 Inches = 0.9144 Meters = 91.44 Centimeters</p>
        <p className="text-amber-600 dark:text-amber-400 mt-1">1 Meter = 1.09361 Yards = 39.3701 Inches = 100 Centimeters</p>
      </div>

      <h3 className="text-xl font-bold text-zinc-900 dark:text-white mt-6 mb-2">
        Worked Numerical Example: Converting Sewing Pattern Yardage
      </h3>
      <p>
        Imagine following a European sewing pattern requiring <strong>8.5 meters</strong> of fabric, while purchasing material in US yards:
      </p>

      <ol className="list-decimal pl-6 space-y-2 mb-4">
        <li><strong>Convert meters to yards:</strong> 8.5 &times; 1.09361 = <strong>9.2956 yards</strong>.</li>
        <li><strong>Convert to total inches:</strong> 9.2956 &times; 36 = <strong>334.64 inches</strong>.</li>
        <li><strong>Round up to retail cuts:</strong> Rounding up to the nearest half-yard requires purchasing <strong>9.5 yards</strong> (342 inches).</li>
      </ol>

      <h2 className="text-2xl sm:text-3xl font-bold text-zinc-900 dark:text-white mt-10 mb-4">
        Common Printing and Textile Mistakes to Avoid
      </h2>
      <ol className="list-decimal pl-6 space-y-3 mb-6">
        <li>
          <strong>Printing Non-Scaled PDFs Cross-Border:</strong> Set print dialog options to &ldquo;Fit to Printable Area&rdquo; when printing A4 PDFs on US Letter paper.
        </li>
        <li>
          <strong>Ignoring Bolt Width Differences:</strong> Commercial fabrics come in 44-inch or 60-inch widths. A 5-yard cut of 44-inch fabric yields 20% less surface area than 60-inch fabric.
        </li>
        <li>
          <strong>Confusing ISO Series:</strong> A-series is for documents, B-series for posters, and C-series specifically for envelope sizing.
        </li>
      </ol>
      <p>
        When ordering international footwear or apparel online, convert sizing charts using our free <Link href="/tools/shoe-size-converter" className="text-amber-600 dark:text-amber-400 font-semibold underline">Shoe Size Converter</Link>. To calculate sale discounts on craft materials, use our free <Link href="/tools/discount-calculator" className="text-amber-600 dark:text-amber-400 font-semibold underline">Discount Calculator</Link> or read our guide on <Link href="/blog/how-to-calculate-discount-percentage-sale-math-guide" className="text-amber-600 dark:text-amber-400 font-semibold underline">calculating discount percentages</Link>.
      </p>

      <h2 className="text-2xl sm:text-3xl font-bold text-zinc-900 dark:text-white mt-10 mb-4">
        Convert Paper &amp; Fabric Sizes Instantly with QuickCalc
      </h2>
      <p>
        Looking up ISO tables or doing decimal yardage math by hand takes time. Our free <Link href="/tools/paper-fabric-size-converter" className="text-amber-600 dark:text-amber-400 font-semibold underline">Paper &amp; Fabric Size Converter</Link> handles all print and textile conversions automatically in real time.
      </p>
      <div className="bg-amber-950/90 text-amber-100 p-6 rounded-2xl border border-amber-800 my-6 shadow-xl text-center">
        <h3 className="text-xl font-bold text-white mb-2">Try the Free QuickCalc Paper &amp; Fabric Size Converter</h3>
        <p className="text-amber-200 text-sm max-w-xl mx-auto mb-4">
          Features Paper Mode (A0&ndash;A10, B0&ndash;B10, C0&ndash;C10, US Letter/Legal/Tabloid) and Fabric Mode (yards, meters, feet, inches, cm). Zero ads, zero signups.
        </p>
        <Link
          href="/tools/paper-fabric-size-converter"
          className="inline-block bg-amber-500 hover:bg-amber-400 text-zinc-950 font-bold px-6 py-3 rounded-xl transition-all transform hover:-translate-y-0.5 shadow-lg"
        >
          Open Paper &amp; Fabric Size Converter &rarr;
        </Link>
      </div>

      <h2 className="text-2xl sm:text-3xl font-bold text-zinc-900 dark:text-white mt-10 mb-4">
        Frequently Asked Questions
      </h2>
      <div className="space-y-4 mb-6">
        <details className="border-b border-zinc-200 dark:border-zinc-800 pb-4">
          <summary className="font-semibold cursor-pointer text-zinc-900 dark:text-white mb-2">
            What is the exact difference in dimensions between A4 paper and US Letter size?
          </summary>
          <p className="text-zinc-600 dark:text-zinc-400 text-sm">
            ISO A4 paper measures 210 x 297 mm (8.27 x 11.69 inches), making it taller and narrower, whereas US Letter measures 215.9 x 279.4 mm (8.5 x 11.0 inches), making it wider and shorter.
          </p>
        </details>

        <details className="border-b border-zinc-200 dark:border-zinc-800 pb-4">
          <summary className="font-semibold cursor-pointer text-zinc-900 dark:text-white mb-2">
            How does the ISO 216 paper sizing system work (A0 to A10)?
          </summary>
          <p className="text-zinc-600 dark:text-zinc-400 text-sm">
            ISO 216 uses a constant aspect ratio of 1:1.4142 (1 to square root of 2); cutting an A0 sheet (1 m²) in half creates two A1 sheets, and cutting A1 in half creates two A2 sheets down to A10.
          </p>
        </details>

        <details className="border-b border-zinc-200 dark:border-zinc-800 pb-4">
          <summary className="font-semibold cursor-pointer text-zinc-900 dark:text-white mb-2">
            How do you convert fabric yards to meters or inches?
          </summary>
          <p className="text-zinc-600 dark:text-zinc-400 text-sm">
            To convert yards to meters, multiply yards by 0.9144; to convert yards to inches, multiply yards by 36 (e.g., 5 yards = 4.572 meters = 180 inches).
          </p>
        </details>

        <details className="border-b border-zinc-200 dark:border-zinc-800 pb-4">
          <summary className="font-semibold cursor-pointer text-zinc-900 dark:text-white mb-2">
            Why does North America use Letter size instead of ISO A4 paper?
          </summary>
          <p className="text-zinc-600 dark:text-zinc-400 text-sm">
            North America retained traditional imperial paper sizes defined by historic hand-paper-making mold dimensions, whereas the rest of the world adopted the metric-based ISO 216 standard in the 20th century.
          </p>
        </details>

        <details className="border-b border-zinc-200 dark:border-zinc-800 pb-4">
          <summary className="font-semibold cursor-pointer text-zinc-900 dark:text-white mb-2">
            What are the dimensions of standard ISO paper sizes (A0, A1, A2, A3, A4)?
          </summary>
          <p className="text-zinc-600 dark:text-zinc-400 text-sm">
            A0 is 841x1189 mm, A1 is 594x841 mm, A2 is 420x594 mm, A3 is 297x420 mm, and A4 is 210x297 mm.
          </p>
        </details>
      </div>
    </>
  );
}
