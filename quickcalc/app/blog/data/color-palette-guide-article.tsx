import Link from "next/link";

export default function ColorPaletteGuideArticle() {
  return (
    <>
      <p className="bg-sky-50 dark:bg-sky-950/30 border border-sky-200 dark:border-sky-900/50 p-4 rounded-xl text-zinc-800 dark:text-zinc-200 font-medium">
        <strong>Quick Answer:</strong> To generate a color palette from an image, upload the photo to an image color extractor that scans the pixel canvas and uses color quantization (such as k-means clustering) to group similar pixels into dominant swatches. To build a balanced UI color scheme, apply the <strong>60-30-10 rule</strong>: allocate 60% of your canvas to a dominant neutral background color, 30% to a secondary brand color, and 10% to a high-contrast accent call-to-action color. To extract HEX, RGB, and HSL swatches and test WCAG text contrast ratios instantly, try our free <Link href="/tools/color-palette-generator" className="text-sky-600 dark:text-sky-400 font-semibold underline">Color Palette Generator</Link>.
      </p>

      <h2 className="text-2xl sm:text-3xl font-bold text-zinc-900 dark:text-white mt-10 mb-4">
        The Color Paralysis Problem: Staring at a Blank Canvas Trying to Pick Hex Codes
      </h2>
      <p>
        You are sitting down to design a new website landing page, mobile app interface, or digital product dashboard. You have an incredible hero photograph or brand mood board image that perfectly captures the vibe you want.
      </p>
      <p>
        Then you open your code editor or design tool, click on the color picker, and freeze. Which exact HEX codes should you use for your body background? What shade of blue works best for your navigation headers? And which color will make your primary call-to-action button pop without clashing against everything else?
      </p>
      <p>
        This paralysis happens to developers and designers every single day. Selecting colors randomly from a 16-million-color digital picker often leads to mismatched tones, muddy background grays, or unreadable low-contrast text that hurts user engagement.
      </p>
      <p>
        Learning <strong>how to generate color palette from image</strong> assets turns this trial-and-error process into an exact science. By extracting color swatches directly from high-quality photography, you anchor your digital interface in proven natural harmonies.
      </p>

      <h2 className="text-2xl sm:text-3xl font-bold text-zinc-900 dark:text-white mt-10 mb-4">
        Color Formats Decoded: HEX vs. RGB vs. HSL
      </h2>
      <p>
        Before diving into palette structure, it helps to understand the three primary color format representations used in web development and graphic design:
      </p>
      <ul className="list-disc pl-6 space-y-2 mb-4">
        <li>
          <strong>Hexadecimal (HEX):</strong> <code>#0EA5E9</code> &mdash; Base-16 representation widely used in HTML and CSS stylesheets.
        </li>
        <li>
          <strong>Red, Green, Blue (RGB):</strong> <code>rgb(14, 165, 233)</code> &mdash; Additive light values (0&ndash;255) for computer screens.
        </li>
        <li>
          <strong>Hue, Saturation, Lightness (HSL):</strong> <code>hsl(199, 89%, 48%)</code> &mdash; Human-intuitive representation allowing easy adjustments to brightness without shifting color tone.
        </li>
      </ul>

      <h2 className="text-2xl sm:text-3xl font-bold text-zinc-900 dark:text-white mt-10 mb-4">
        The 60-30-10 Rule: How Professional Designers Structure Palettes
      </h2>
      <p>
        Extracting 5 beautiful colors from a photo is only half the battle. Knowing how much visual real estate to give each color across your application UI is what separates amateur sites from professional products:
      </p>
      <ul className="list-disc pl-6 space-y-3 mb-6">
        <li>
          <strong>60% Dominant Neutral Color:</strong> Backgrounds, card containers, whitespace, and body text. Neutrals (soft off-whites or deep charcoal dark-mode backgrounds) allow content to breathe.
        </li>
        <li>
          <strong>30% Secondary Brand Color:</strong> Navigation headers, sidebar panels, sub-headings, key icons, and structural borders.
        </li>
        <li>
          <strong>10% Accent Call-to-Action Color:</strong> Reserved exclusively for high-priority interactive elements: primary sign-up buttons, active tab indicators, and conversion badges.
        </li>
      </ul>

      <h2 className="text-2xl sm:text-3xl font-bold text-zinc-900 dark:text-white mt-10 mb-4">
        WCAG Color Contrast Accessibility: Meeting 4.5:1 Standards
      </h2>
      <p>
        The <strong>Web Content Accessibility Guidelines (WCAG 2.1)</strong> establish legal and technical standards for background-to-text contrast ratios:
      </p>

      <div className="overflow-x-auto my-6">
        <table className="w-full text-left text-sm text-zinc-700 dark:text-zinc-300 border-collapse border border-zinc-200 dark:border-zinc-800">
          <thead>
            <tr className="bg-zinc-100 dark:bg-zinc-900 text-zinc-900 dark:text-white font-semibold">
              <th className="border border-zinc-200 dark:border-zinc-800 p-3">Compliance Level</th>
              <th className="border border-zinc-200 dark:border-zinc-800 p-3">Target Element</th>
              <th className="border border-zinc-200 dark:border-zinc-800 p-3">Minimum Contrast Ratio Required</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="border border-zinc-200 dark:border-zinc-800 p-3 font-medium">WCAG Level AA</td>
              <td className="border border-zinc-200 dark:border-zinc-800 p-3">Normal Body Text (&lt; 18pt)</td>
              <td className="border border-zinc-200 dark:border-zinc-800 p-3 font-semibold text-sky-600 dark:text-sky-400">4.5 : 1 (Minimum Web Standard)</td>
            </tr>
            <tr className="bg-zinc-50/50 dark:bg-zinc-900/50">
              <td className="border border-zinc-200 dark:border-zinc-800 p-3 font-medium">WCAG Level AA</td>
              <td className="border border-zinc-200 dark:border-zinc-800 p-3">Large Text (18pt+ or 14pt Bold)</td>
              <td className="border border-zinc-200 dark:border-zinc-800 p-3">3.0 : 1</td>
            </tr>
            <tr>
              <td className="border border-zinc-200 dark:border-zinc-800 p-3 font-medium">WCAG Level AAA</td>
              <td className="border border-zinc-200 dark:border-zinc-800 p-3">Normal Body Text (&lt; 18pt)</td>
              <td className="border border-zinc-200 dark:border-zinc-800 p-3 font-semibold text-sky-600 dark:text-sky-400">7.0 : 1 (Enhanced Standard)</td>
            </tr>
            <tr className="bg-zinc-50/50 dark:bg-zinc-900/50">
              <td className="border border-zinc-200 dark:border-zinc-800 p-3 font-medium">WCAG Level AAA</td>
              <td className="border border-zinc-200 dark:border-zinc-800 p-3">Large Text (18pt+ or 14pt Bold)</td>
              <td className="border border-zinc-200 dark:border-zinc-800 p-3">4.5 : 1</td>
            </tr>
          </tbody>
        </table>
      </div>

      <h3 className="text-xl font-bold text-zinc-900 dark:text-white mt-6 mb-2">
        Worked Numerical Example: Testing Background &amp; Text Contrast
      </h3>
      <p>
        Imagine you extract a bright sky blue (<code>#0EA5E9</code>) from a photo asset and want to place white text (<code>#FFFFFF</code>) on top of a button filled with that blue:
      </p>

      <ul className="list-disc pl-6 space-y-2 mb-4">
        <li><strong>Light Color Luminance (White #FFFFFF):</strong> 1.000</li>
        <li><strong>Dark Color Luminance (Blue #0EA5E9):</strong> 0.315</li>
        <li><strong>Contrast Ratio:</strong> (1.000 + 0.05) &div; (0.315 + 0.05) = 1.050 &div; 0.365 = <strong>2.88 : 1</strong></li>
      </ul>
      <p>
        Because 2.88:1 is below the 4.5:1 requirement, white text on <code>#0EA5E9</code> fails WCAG AA compliance for body text. Darkening the background to <code>#0284C7</code> increases contrast to <strong>4.68:1</strong> (Pass ✓).
      </p>

      <h2 className="text-2xl sm:text-3xl font-bold text-zinc-900 dark:text-white mt-10 mb-4">
        Common Palette Design Mistakes to Avoid
      </h2>
      <ol className="list-decimal pl-6 space-y-3 mb-6">
        <li>
          <strong>Placing Low-Contrast Text on Bright Backgrounds:</strong> Always verify contrast ratios before coding UI button states.
        </li>
        <li>
          <strong>Overloading the UI with Too Many Saturated Colors:</strong> Using 6 bright colors creates visual clutter. Stick to 60-30-10.
        </li>
        <li>
          <strong>Ignoring Dark Mode Inversion:</strong> Design separate dark-mode neutral tokens with reduced saturation.
        </li>
      </ol>
      <p>
        For developer utility tools, analyze document length and copy limits using our free <Link href="/tools/word-character-counter" className="text-sky-600 dark:text-sky-400 font-semibold underline">Word &amp; Character Counter</Link>. If you work with web data formats, try our free <Link href="/tools/json-csv-converter" className="text-sky-600 dark:text-sky-400 font-semibold underline">JSON &amp; CSV Converter</Link> or read our guide on <Link href="/blog/how-to-convert-json-to-csv-flattening-guide" className="text-sky-600 dark:text-sky-400 font-semibold underline">converting JSON to CSV</Link>.
      </p>

      <h2 className="text-2xl sm:text-3xl font-bold text-zinc-900 dark:text-white mt-10 mb-4">
        Generate Color Palettes &amp; Check Contrast Instantly with QuickCalc
      </h2>
      <p>
        Extracting RGB values from image canvases and manually computing luminance formulas takes time. Our free <Link href="/tools/color-palette-generator" className="text-sky-600 dark:text-sky-400 font-semibold underline">Color Palette Generator</Link> handles all the math automatically in real time.
      </p>
      <div className="bg-sky-950/90 text-sky-100 p-6 rounded-2xl border border-sky-800 my-6 shadow-xl text-center">
        <h3 className="text-xl font-bold text-white mb-2">Try the Free QuickCalc Color Palette Generator</h3>
        <p className="text-sky-200 text-sm max-w-xl mx-auto mb-4">
          Features drag-and-drop image uploads, 1-click HEX/RGB/HSL code copying, and real-time WCAG contrast ratio compliance testing. Zero ads, zero signups.
        </p>
        <Link
          href="/tools/color-palette-generator"
          className="inline-block bg-sky-500 hover:bg-sky-400 text-zinc-950 font-bold px-6 py-3 rounded-xl transition-all transform hover:-translate-y-0.5 shadow-lg"
        >
          Open Color Palette Generator &rarr;
        </Link>
      </div>

      <h2 className="text-2xl sm:text-3xl font-bold text-zinc-900 dark:text-white mt-10 mb-4">
        Frequently Asked Questions
      </h2>
      <div className="space-y-4 mb-6">
        <details className="border-b border-zinc-200 dark:border-zinc-800 pb-4">
          <summary className="font-semibold cursor-pointer text-zinc-900 dark:text-white mb-2">
            How do you generate a color palette from an image or photo?
          </summary>
          <p className="text-zinc-600 dark:text-zinc-400 text-sm">
            Upload your image to an online color palette generator that uses pixel quantization algorithms to scan the photo and automatically extract its dominant, vibrant color swatches.
          </p>
        </details>

        <details className="border-b border-zinc-200 dark:border-zinc-800 pb-4">
          <summary className="font-semibold cursor-pointer text-zinc-900 dark:text-white mb-2">
            What is the 60-30-10 color rule in UI and web design?
          </summary>
          <p className="text-zinc-600 dark:text-zinc-400 text-sm">
            The 60-30-10 rule is a classic design balance ratio allocating 60% of the visual layout to a dominant neutral color, 30% to a secondary brand color, and 10% to an accent call-to-action color.
          </p>
        </details>

        <details className="border-b border-zinc-200 dark:border-zinc-800 pb-4">
          <summary className="font-semibold cursor-pointer text-zinc-900 dark:text-white mb-2">
            How do HEX, RGB, and HSL color formats differ?
          </summary>
          <p className="text-zinc-600 dark:text-zinc-400 text-sm">
            HEX uses a 6-digit base-16 code (#0EA5E9), RGB specifies red, green, and blue light intensity (0&ndash;255), and HSL defines hue angle (0&ndash;360&deg;), saturation (%), and lightness (%).
          </p>
        </details>

        <details className="border-b border-zinc-200 dark:border-zinc-800 pb-4">
          <summary className="font-semibold cursor-pointer text-zinc-900 dark:text-white mb-2">
            What is the minimum WCAG contrast ratio for accessible text readability?
          </summary>
          <p className="text-zinc-600 dark:text-zinc-400 text-sm">
            According to WCAG 2.1 Level AA standards, body text must maintain a contrast ratio of at least 4.5:1 against its background color, while large text (18pt+ or 14pt bold) requires at least 3:1.
          </p>
        </details>

        <details className="border-b border-zinc-200 dark:border-zinc-800 pb-4">
          <summary className="font-semibold cursor-pointer text-zinc-900 dark:text-white mb-2">
            How many colors should a website or brand palette contain?
          </summary>
          <p className="text-zinc-600 dark:text-zinc-400 text-sm">
            A well-structured digital brand palette typically contains 3 to 5 core colors: a dominant neutral (light/dark), a primary brand color, a secondary supporting color, and 1 or 2 accent colors for actions.
          </p>
        </details>
      </div>
    </>
  );
}
