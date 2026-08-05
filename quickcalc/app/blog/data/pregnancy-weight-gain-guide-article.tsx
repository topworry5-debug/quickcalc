import Link from "next/link";

export default function PregnancyWeightGainGuideArticle() {
  return (
    <>
      <p className="bg-rose-50 dark:bg-rose-950/30 border border-rose-200 dark:border-rose-900/50 p-4 rounded-xl text-zinc-800 dark:text-zinc-200 font-medium">
        <strong>Quick Answer:</strong> Healthy pregnancy weight gain depends primarily on your pre-pregnancy Body Mass Index (BMI), as recommended by the Institute of Medicine (IOM). Women starting at a normal BMI (18.5&ndash;24.9) should aim to gain 25 to 35 pounds total (1 to 5 lbs in the 1st trimester, then ~1 lb per week in the 2nd and 3rd trimesters). Underweight women (BMI &lt; 18.5) should target 28&ndash;40 lbs, overweight women (BMI 25&ndash;29.9) target 15&ndash;25 lbs, and obese women (BMI &ge; 30) target 11&ndash;20 lbs. To track your personalized weight gain trajectory by week, try our free <Link href="/tools/pregnancy-weight-gain-calculator" className="text-rose-600 dark:text-rose-400 font-semibold underline">Pregnancy Weight Gain Calculator</Link>.
      </p>

      <h2 className="text-2xl sm:text-3xl font-bold text-zinc-900 dark:text-white mt-10 mb-4">
        The Scale Anxiety: Understanding What Healthy Pregnancy Growth Looks Like
      </h2>
      <p>
        You step onto the scale at your 24-week prenatal appointment. The digital display flashes a number that is 18 pounds higher than your pre-pregnancy weight.
      </p>
      <p>
        In a culture that constantly preaches weight loss and caloric restriction, watching your body weight rise week after week can trigger an unexpected wave of anxiety. You wonder: <em>Am I gaining weight too quickly? Am I eating too much? Is my baby growing normally?</em>
      </p>
      <p>
        Here is the most important truth to internalize early in your journey: <strong>pregnancy weight gain is not body fat accumulation to be feared or restricted.</strong>
      </p>
      <p>
        Weight gain during pregnancy is a critical medical sign. It reflects expanding maternal blood volume, placental development, supportive amniotic fluid, growing uterine muscle tissue, and healthy fetal growth.
      </p>
      <p>
        Learning <strong>how to calculate pregnancy weight gain</strong> based on your pre-pregnancy baseline provides peace of mind. It allows you to monitor your health trajectory, nourish your body with confidence, and establish healthy growth targets throughout all three trimesters.
      </p>

      <h2 className="text-2xl sm:text-3xl font-bold text-zinc-900 dark:text-white mt-10 mb-4">
        Institute of Medicine (IOM) Guidelines: How Pre-Pregnancy BMI Sets Your Target
      </h2>
      <p>
        Clinical guidelines for pregnancy weight gain are established by the <strong>National Academy of Medicine</strong> (formerly the Institute of Medicine, or IOM). Your recommended weight gain range is determined by your <strong>pre-pregnancy Body Mass Index (BMI)</strong>:
      </p>

      <div className="bg-zinc-100 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 p-4 rounded-xl my-4 font-mono text-sm text-center font-semibold text-zinc-900 dark:text-zinc-100">
        <p>Pre-Pregnancy BMI = (Pre-Pregnancy Weight in lbs &times; 703) &divide; (Height in inches)^2</p>
      </div>

      <div className="overflow-x-auto my-6">
        <table className="w-full text-left text-sm text-zinc-700 dark:text-zinc-300 border-collapse border border-zinc-200 dark:border-zinc-800">
          <thead>
            <tr className="bg-zinc-100 dark:bg-zinc-900 text-zinc-900 dark:text-white font-semibold">
              <th className="border border-zinc-200 dark:border-zinc-800 p-3">Pre-Pregnancy Category</th>
              <th className="border border-zinc-200 dark:border-zinc-800 p-3">BMI Range</th>
              <th className="border border-zinc-200 dark:border-zinc-800 p-3">Total Recommended Gain</th>
              <th className="border border-zinc-200 dark:border-zinc-800 p-3">Weekly Rate (2nd &amp; 3rd Trimester)</th>
              <th className="border border-zinc-200 dark:border-zinc-800 p-3">Twin Target</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="border border-zinc-200 dark:border-zinc-800 p-3 font-medium">Underweight</td>
              <td className="border border-zinc-200 dark:border-zinc-800 p-3">&lt; 18.5</td>
              <td className="border border-zinc-200 dark:border-zinc-800 p-3 font-semibold text-rose-600 dark:text-rose-400">28 &ndash; 40 lbs</td>
              <td className="border border-zinc-200 dark:border-zinc-800 p-3">~1.0 to 1.3 lbs/wk</td>
              <td className="border border-zinc-200 dark:border-zinc-800 p-3">50 &ndash; 62 lbs</td>
            </tr>
            <tr className="bg-zinc-50/50 dark:bg-zinc-900/50">
              <td className="border border-zinc-200 dark:border-zinc-800 p-3 font-medium">Normal Weight</td>
              <td className="border border-zinc-200 dark:border-zinc-800 p-3">18.5 &ndash; 24.9</td>
              <td className="border border-zinc-200 dark:border-zinc-800 p-3 font-semibold text-rose-600 dark:text-rose-400">25 &ndash; 35 lbs</td>
              <td className="border border-zinc-200 dark:border-zinc-800 p-3">~0.8 to 1.0 lb/wk</td>
              <td className="border border-zinc-200 dark:border-zinc-800 p-3">37 &ndash; 54 lbs</td>
            </tr>
            <tr>
              <td className="border border-zinc-200 dark:border-zinc-800 p-3 font-medium">Overweight</td>
              <td className="border border-zinc-200 dark:border-zinc-800 p-3">25.0 &ndash; 29.9</td>
              <td className="border border-zinc-200 dark:border-zinc-800 p-3 font-semibold text-rose-600 dark:text-rose-400">15 &ndash; 25 lbs</td>
              <td className="border border-zinc-200 dark:border-zinc-800 p-3">~0.5 to 0.7 lb/wk</td>
              <td className="border border-zinc-200 dark:border-zinc-800 p-3">31 &ndash; 50 lbs</td>
            </tr>
            <tr className="bg-zinc-50/50 dark:bg-zinc-900/50">
              <td className="border border-zinc-200 dark:border-zinc-800 p-3 font-medium">Obese</td>
              <td className="border border-zinc-200 dark:border-zinc-800 p-3">&ge; 30.0</td>
              <td className="border border-zinc-200 dark:border-zinc-800 p-3 font-semibold text-rose-600 dark:text-rose-400">11 &ndash; 20 lbs</td>
              <td className="border border-zinc-200 dark:border-zinc-800 p-3">~0.4 to 0.6 lb/wk</td>
              <td className="border border-zinc-200 dark:border-zinc-800 p-3">25 &ndash; 42 lbs</td>
            </tr>
          </tbody>
        </table>
      </div>

      <h2 className="text-2xl sm:text-3xl font-bold text-zinc-900 dark:text-white mt-10 mb-4">
        Where Does the Weight Actually Go? Anatomy of a 30-Pound Gain
      </h2>
      <p>
        Many expecting mothers are surprised to learn that out of a typical 30-pound pregnancy weight gain, less than a quarter consists of actual maternal body fat:
      </p>

      <ul className="list-disc pl-6 space-y-2 mb-4">
        <li><strong>Full-Term Baby:</strong> ~7.5 lbs (25.0%)</li>
        <li><strong>Maternal Fat &amp; Nutrient Stores:</strong> ~7.0 lbs (23.3%)</li>
        <li><strong>Expanded Blood Volume:</strong> ~4.0 lbs (13.3%)</li>
        <li><strong>Extracellular Fluid / Water:</strong> ~4.0 lbs (13.3%)</li>
        <li><strong>Amniotic Fluid:</strong> ~2.0 lbs (6.7%)</li>
        <li><strong>Uterine Muscle Growth:</strong> ~2.0 lbs (6.7%)</li>
        <li><strong>Maternal Breast Tissue:</strong> ~2.0 lbs (6.7%)</li>
        <li><strong>Placenta:</strong> ~1.5 lbs (5.0%)</li>
      </ul>

      <h2 className="text-2xl sm:text-3xl font-bold text-zinc-900 dark:text-white mt-10 mb-4">
        Trimester-by-Trimester Weight Trajectory
      </h2>

      <h3 className="text-xl font-bold text-zinc-900 dark:text-white mt-6 mb-2">
        First Trimester (Weeks 1 to 13): 1 to 5 Pounds Total
      </h3>
      <p>
        Extra caloric requirements are zero during the first trimester. Normal total weight gain is 1 to 5 pounds. Mild weight loss from morning sickness is common and rarely harmful.
      </p>

      <h3 className="text-xl font-bold text-zinc-900 dark:text-white mt-6 mb-2">
        Second Trimester (Weeks 14 to 27): ~1 Pound Per Week
      </h3>
      <p>
        Fetal organs and skeleton grow rapidly. Caloric needs increase by <strong>~340 extra calories per day</strong>. Normal weight gain is roughly 0.8 to 1 pound per week.
      </p>

      <h3 className="text-xl font-bold text-zinc-900 dark:text-white mt-6 mb-2">
        Third Trimester (Weeks 28 to 40+): ~1 Pound Per Week
      </h3>
      <p>
        Peak fetal fat accumulation and lung maturation. Caloric needs increase by <strong>~450 extra calories per day</strong>. Weight gain continues at ~1 pound per week until near full term.
      </p>

      <h2 className="text-2xl sm:text-3xl font-bold text-zinc-900 dark:text-white mt-10 mb-4">
        Common Pregnancy Weight Gain Mistakes to Avoid
      </h2>
      <ol className="list-decimal pl-6 space-y-3 mb-6">
        <li>
          <strong>&ldquo;Eating for Two&rdquo; (Doubling Calories):</strong> Pregnancy requires an extra 300 to 450 nutrient-dense calories per day, not doubling meal portions.
        </li>
        <li>
          <strong>Attempting Weight-Loss Diets While Pregnant:</strong> Caloric restriction risks ketosis, nutrient deficiencies, and low birth weight.
        </li>
        <li>
          <strong>Panicking Over Fluid Fluctuations:</strong> Sodium and warm weather can cause temporary water retention. Focus on multi-week trends.
        </li>
      </ol>
      <p>
        To track your pregnancy timeline alongside your weight goals, try our free <Link href="/tools/due-date-calculator" className="text-rose-600 dark:text-rose-400 font-semibold underline">Due Date Calculator</Link> or read our guide on <Link href="/blog/how-to-calculate-pregnancy-due-date-naegele-rule-guide" className="text-rose-600 dark:text-rose-400 font-semibold underline">how to calculate pregnancy due dates</Link>. To understand standard Body Mass Index math, check out our free <Link href="/tools/bmi-calculator" className="text-rose-600 dark:text-rose-400 font-semibold underline">BMI Calculator</Link> or read our guide on <Link href="/blog/how-to-calculate-bmi-accurately-and-its-limitations" className="text-rose-600 dark:text-rose-400 font-semibold underline">calculating BMI accurately</Link>.
      </p>

      <h2 className="text-2xl sm:text-3xl font-bold text-zinc-900 dark:text-white mt-10 mb-4">
        Track Your Personal Weight Gain Trajectory Instantly with QuickCalc
      </h2>
      <p>
        Calculating pre-pregnancy BMI and comparing weekly weight against IOM targets by hand takes effort. Our free <Link href="/tools/pregnancy-weight-gain-calculator" className="text-rose-600 dark:text-rose-400 font-semibold underline">Pregnancy Weight Gain Calculator</Link> handles all the math automatically in real time.
      </p>
      <div className="bg-rose-950/90 text-rose-100 p-6 rounded-2xl border border-rose-800 my-6 shadow-xl text-center">
        <h3 className="text-xl font-bold text-white mb-2">Try the Free QuickCalc Pregnancy Weight Gain Calculator</h3>
        <p className="text-rose-200 text-sm max-w-xl mx-auto mb-4">
          Features pre-pregnancy BMI auto-calculator, single vs twin pregnancy modes, and week-by-week IOM target range comparisons. Zero ads, zero signups.
        </p>
        <Link
          href="/tools/pregnancy-weight-gain-calculator"
          className="inline-block bg-rose-500 hover:bg-rose-400 text-zinc-950 font-bold px-6 py-3 rounded-xl transition-all transform hover:-translate-y-0.5 shadow-lg"
        >
          Open Pregnancy Weight Gain Calculator &rarr;
        </Link>
      </div>

      <h2 className="text-2xl sm:text-3xl font-bold text-zinc-900 dark:text-white mt-10 mb-4">
        Frequently Asked Questions
      </h2>
      <div className="space-y-4 mb-6">
        <details className="border-b border-zinc-200 dark:border-zinc-800 pb-4">
          <summary className="font-semibold cursor-pointer text-zinc-900 dark:text-white mb-2">
            How much weight should a woman gain during pregnancy based on pre-pregnancy BMI?
          </summary>
          <p className="text-zinc-600 dark:text-zinc-400 text-sm">
            Women starting at a normal BMI (18.5&ndash;24.9) should gain 25 to 35 lbs total, underweight women (BMI &lt; 18.5) should gain 28 to 40 lbs, overweight women (BMI 25&ndash;29.9) should gain 15 to 25 lbs, and obese women (BMI &ge; 30) should gain 11 to 20 lbs.
          </p>
        </details>

        <details className="border-b border-zinc-200 dark:border-zinc-800 pb-4">
          <summary className="font-semibold cursor-pointer text-zinc-900 dark:text-white mb-2">
            How is weight distributed during pregnancy (where does the weight go)?
          </summary>
          <p className="text-zinc-600 dark:text-zinc-400 text-sm">
            In a typical 30-pound weight gain, the baby accounts for ~7.5 lbs, maternal fat stores ~7 lbs, blood volume expansion ~4 lbs, fluid retention ~4 lbs, uterine growth ~2 lbs, amniotic fluid ~2 lbs, breast tissue ~2 lbs, and the placenta ~1.5 lbs.
          </p>
        </details>

        <details className="border-b border-zinc-200 dark:border-zinc-800 pb-4">
          <summary className="font-semibold cursor-pointer text-zinc-900 dark:text-white mb-2">
            How much weight should you gain in the first trimester vs second and third trimesters?
          </summary>
          <p className="text-zinc-600 dark:text-zinc-400 text-sm">
            Women typically gain 1 to 5 pounds total during the entire first trimester, followed by approximately 0.8 to 1 pound per week throughout the second and third trimesters.
          </p>
        </details>

        <details className="border-b border-zinc-200 dark:border-zinc-800 pb-4">
          <summary className="font-semibold cursor-pointer text-zinc-900 dark:text-white mb-2">
            How much extra weight should you gain if you are expecting twins?
          </summary>
          <p className="text-zinc-600 dark:text-zinc-400 text-sm">
            Women expecting twins should aim to gain 37 to 54 pounds if starting at a normal BMI, 50 to 62 pounds if underweight, 31 to 50 pounds if overweight, and 25 to 42 pounds if obese.
          </p>
        </details>

        <details className="border-b border-zinc-200 dark:border-zinc-800 pb-4">
          <summary className="font-semibold cursor-pointer text-zinc-900 dark:text-white mb-2">
            Is it normal to lose weight during the first trimester due to morning sickness?
          </summary>
          <p className="text-zinc-600 dark:text-zinc-400 text-sm">
            Yes, mild weight loss of 2 to 5 pounds during the first trimester is common due to nausea and food aversions; most women regain this weight easily once appetite returns in the second trimester.
          </p>
        </details>
      </div>
    </>
  );
}
