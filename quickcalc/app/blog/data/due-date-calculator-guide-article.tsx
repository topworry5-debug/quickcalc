import Link from "next/link";

export default function DueDateCalculatorGuideArticle() {
  return (
    <>
      <p className="bg-rose-50 dark:bg-rose-950/30 border border-rose-200 dark:border-rose-900/50 p-4 rounded-xl text-zinc-800 dark:text-zinc-200 font-medium">
        <strong>Quick Answer:</strong> To calculate your estimated pregnancy due date using the Last Menstrual Period (LMP) method, apply Naegele&apos;s Rule: add 7 days to the first day of your last period, subtract 3 months, and add 1 year. This establishes a 280-day (40-week) gestational timeline. Alternatively, if you know your exact conception date, add 266 days (38 weeks). To calculate your due date, current gestational age in weeks and days, and trimester timeline instantly, try our free <Link href="/tools/due-date-calculator" className="text-rose-600 dark:text-rose-400 font-semibold underline">Due Date Calculator</Link>.
      </p>

      <h2 className="text-2xl sm:text-3xl font-bold text-zinc-900 dark:text-white mt-10 mb-4">
        The Positive Test Moment: Turning Two Lines into a Timeline
      </h2>
      <p>
        You stare at the home pregnancy test in disbelief and joy. The two pink lines or digital &ldquo;Pregnant&rdquo; indicator confirm what you had been wondering for days.
      </p>
      <p>
        Once the initial wave of excitement settles, the very first question every expecting parent asks is immediate: <strong>&ldquo;When is our baby actually going to be born?&rdquo;</strong>
      </p>
      <p>
        Calculating an estimated due date is one of the most exciting milestones of early pregnancy. It transforms an abstract concept into a concrete date on the calendar around which you can begin planning your life.
      </p>
      <p>
        However, an <strong>Estimated Due Date (EDD)</strong> is not an exact medical appointment set in stone. Instead, it represents a <strong>40-week target window</strong> based on average human gestational timelines.
      </p>
      <p>
        Understanding <strong>how to calculate pregnancy due date</strong> math helps you understand your prenatal care schedule, plan maternity or paternity leave, track key fetal growth milestones, and prepare your nursery with confidence.
      </p>

      <h2 className="text-2xl sm:text-3xl font-bold text-zinc-900 dark:text-white mt-10 mb-4">
        The 2 Core Calculation Methods: LMP vs. Conception Date
      </h2>
      <p>
        Obstetrical medicine relies on two distinct methods to estimate a due date, depending on the information available to you:
      </p>

      <h3 className="text-xl font-bold text-zinc-900 dark:text-white mt-6 mb-2">
        1. Last Menstrual Period (LMP) &mdash; The Clinical Standard
      </h3>
      <p>
        The vast majority of OB-GYNs and midwives calculate due dates starting from the <strong>first day of your last menstrual period (LMP)</strong>. Under this standard, a full-term pregnancy is defined as lasting <strong>280 days (40 weeks)</strong>.
      </p>
      <p>
        Even though actual conception typically happens about two weeks later during ovulation, those initial two weeks are included in standard <strong>gestational age</strong> because most women do not know the exact day or hour ovulation occurred.
      </p>

      <h3 className="text-xl font-bold text-zinc-900 dark:text-white mt-6 mb-2">
        2. Conception Date Method
      </h3>
      <p>
        If you tracked your ovulation using LH test strips, measured basal body temperature, or underwent assisted reproduction like IVF, you may know your exact conception or embryo transfer date. Since conception marks the actual beginning of fetal growth, human development from fertilization to birth averages <strong>266 days (38 weeks)</strong>.
      </p>

      <h2 className="text-2xl sm:text-3xl font-bold text-zinc-900 dark:text-white mt-10 mb-4">
        How to Calculate Due Date: Naegele&apos;s Rule Formulas
      </h2>
      <p>
        The standard medical calculation for estimating due dates from an LMP date is called <strong>Naegele&apos;s Rule</strong>:
      </p>

      <div className="bg-zinc-100 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 p-4 rounded-xl my-6 font-mono text-sm text-center font-semibold text-zinc-900 dark:text-zinc-100">
        <p>Estimated Due Date = First Day of LMP + 7 Days - 3 Months + 1 Year</p>
      </div>

      <h3 className="text-xl font-bold text-zinc-900 dark:text-white mt-6 mb-2">
        Worked Example: Step-by-Step Breakdown of an August 10 LMP
      </h3>
      <p>
        Let&apos;s walk through an actual numerical calculation. Imagine your last menstrual period began on <strong>August 10, 2025</strong>:
      </p>

      <ol className="list-decimal pl-6 space-y-2 mb-4">
        <li>
          <strong>Start Date:</strong> August 10, 2025.
        </li>
        <li>
          <strong>Subtract 3 Calendar Months:</strong> August 10 minus 3 months = <strong>May 10, 2025</strong>.
        </li>
        <li>
          <strong>Add 7 Days:</strong> May 10 plus 7 days = <strong>May 17, 2025</strong>.
        </li>
        <li>
          <strong>Add 1 Year:</strong> May 17, 2025 plus 1 year = <strong>May 17, 2026 Estimated Due Date</strong>.
        </li>
      </ol>

      <h2 className="text-2xl sm:text-3xl font-bold text-zinc-900 dark:text-white mt-10 mb-4">
        Understanding Pregnancy Trimesters &amp; Weekly Milestones
      </h2>
      <p>
        A 40-week pregnancy is divided into three distinct trimesters, each characterized by specific maternal physiological shifts and fetal growth milestones:
      </p>

      <div className="overflow-x-auto my-6">
        <table className="w-full text-left text-sm text-zinc-700 dark:text-zinc-300 border-collapse border border-zinc-200 dark:border-zinc-800">
          <thead>
            <tr className="bg-zinc-100 dark:bg-zinc-900 text-zinc-900 dark:text-white font-semibold">
              <th className="border border-zinc-200 dark:border-zinc-800 p-3">Trimester Phase</th>
              <th className="border border-zinc-200 dark:border-zinc-800 p-3">Gestational Weeks</th>
              <th className="border border-zinc-200 dark:border-zinc-800 p-3">Key Developmental Milestones</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="border border-zinc-200 dark:border-zinc-800 p-3 font-medium">First Trimester</td>
              <td className="border border-zinc-200 dark:border-zinc-800 p-3">Weeks 1 &ndash; 13</td>
              <td className="border border-zinc-200 dark:border-zinc-800 p-3">Positive test, neural tube formation, heartbeat detection, early ultrasound</td>
            </tr>
            <tr className="bg-zinc-50/50 dark:bg-zinc-900/50">
              <td className="border border-zinc-200 dark:border-zinc-800 p-3 font-medium">Second Trimester</td>
              <td className="border border-zinc-200 dark:border-zinc-800 p-3">Weeks 14 &ndash; 27</td>
              <td className="border border-zinc-200 dark:border-zinc-800 p-3">Nausea subsides, 20-week anatomy scan, feeling kicks (&ldquo;quickening&rdquo;)</td>
            </tr>
            <tr>
              <td className="border border-zinc-200 dark:border-zinc-800 p-3 font-medium">Third Trimester</td>
              <td className="border border-zinc-200 dark:border-zinc-800 p-3">Weeks 28 &ndash; 40+</td>
              <td className="border border-zinc-200 dark:border-zinc-800 p-3">Rapid fetal weight gain, lung maturation, reaching full-term (Week 37+)</td>
            </tr>
          </tbody>
        </table>
      </div>

      <h2 className="text-2xl sm:text-3xl font-bold text-zinc-900 dark:text-white mt-10 mb-4">
        Common Misconceptions About Estimated Due Dates
      </h2>
      <ol className="list-decimal pl-6 space-y-3 mb-6">
        <li>
          <strong>Expecting the Baby on the Exact Due Date:</strong> Only <strong>4% to 5%</strong> of babies are born on their exact calculated due date. Over <strong>90%</strong> of healthy births occur between 37 and 42 weeks.
        </li>
        <li>
          <strong>Assuming Every Woman Has a 28-Day Cycle:</strong> Naegele&apos;s Rule assumes a 28-day cycle with ovulation on Day 14. If your cycle is 35 days, ovulation occurs around Day 21, shifting your due date 7 days later.
        </li>
        <li>
          <strong>Panicking When an Early Ultrasound Adjusts Your Date:</strong> Early first-trimester ultrasound crown-rump length (CRL) measurements are accurate within &plusmn;3 to 5 days and often refine the LMP estimate.
        </li>
      </ol>
      <p>
        During pregnancy, maintaining healthy wellness habits is essential. You can track recommended maternal weight targets using our free <Link href="/tools/pregnancy-weight-gain-calculator" className="text-rose-600 dark:text-rose-400 font-semibold underline">Pregnancy Weight Gain Calculator</Link>. Staying hydrated is equally important for maintaining amniotic fluid levels; calculate your daily fluid needs with our free <Link href="/tools/water-intake-calculator" className="text-rose-600 dark:text-rose-400 font-semibold underline">Water Intake Calculator</Link> or read our guide on <Link href="/blog/is-the-8-glasses-a-day-water-rule-actually-true" className="text-rose-600 dark:text-rose-400 font-semibold underline">daily hydration rules</Link>.
      </p>

      <h2 className="text-2xl sm:text-3xl font-bold text-zinc-900 dark:text-white mt-10 mb-4">
        Calculate Your Due Date &amp; Timeline Instantly with QuickCalc
      </h2>
      <p>
        Calculating calendar months, adding 7 days, and adjusting for cycle length by hand can be confusing. Our free <Link href="/tools/due-date-calculator" className="text-rose-600 dark:text-rose-400 font-semibold underline">Due Date Calculator</Link> handles all the math automatically in real time.
      </p>
      <div className="bg-rose-950/90 text-rose-100 p-6 rounded-2xl border border-rose-800 my-6 shadow-xl text-center">
        <h3 className="text-xl font-bold text-white mb-2">Try the Free QuickCalc Due Date Calculator</h3>
        <p className="text-rose-200 text-sm max-w-xl mx-auto mb-4">
          Features LMP vs Conception Date toggles, instant gestational age tracking (weeks &amp; days), and trimester milestones. Zero ads, zero signups.
        </p>
        <Link
          href="/tools/due-date-calculator"
          className="inline-block bg-rose-500 hover:bg-rose-400 text-zinc-950 font-bold px-6 py-3 rounded-xl transition-all transform hover:-translate-y-0.5 shadow-lg"
        >
          Open Due Date Calculator &rarr;
        </Link>
      </div>

      <h2 className="text-2xl sm:text-3xl font-bold text-zinc-900 dark:text-white mt-10 mb-4">
        Frequently Asked Questions
      </h2>
      <div className="space-y-4 mb-6">
        <details className="border-b border-zinc-200 dark:border-zinc-800 pb-4">
          <summary className="font-semibold cursor-pointer text-zinc-900 dark:text-white mb-2">
            How do you calculate your estimated due date from your last period?
          </summary>
          <p className="text-zinc-600 dark:text-zinc-400 text-sm">
            Add 7 days to the first day of your last menstrual period, subtract 3 months, and add 1 year (Naegele&apos;s Rule), establishing a standard 280-day gestational timeline.
          </p>
        </details>

        <details className="border-b border-zinc-200 dark:border-zinc-800 pb-4">
          <summary className="font-semibold cursor-pointer text-zinc-900 dark:text-white mb-2">
            What is Naegele&apos;s Rule for calculating pregnancy due date?
          </summary>
          <p className="text-zinc-600 dark:text-zinc-400 text-sm">
            Naegele&apos;s Rule is a standard medical formula that estimates a due date by adding 7 days to the first day of a woman&apos;s last menstrual period and subtracting 3 months.
          </p>
        </details>

        <details className="border-b border-zinc-200 dark:border-zinc-800 pb-4">
          <summary className="font-semibold cursor-pointer text-zinc-900 dark:text-white mb-2">
            How do you calculate due date if you know your exact conception date?
          </summary>
          <p className="text-zinc-600 dark:text-zinc-400 text-sm">
            Add 266 days (38 weeks) directly to your known conception date, ovulation test peak date, or IVF embryo transfer date.
          </p>
        </details>

        <details className="border-b border-zinc-200 dark:border-zinc-800 pb-4">
          <summary className="font-semibold cursor-pointer text-zinc-900 dark:text-white mb-2">
            What percentage of babies are actually born on their estimated due date?
          </summary>
          <p className="text-zinc-600 dark:text-zinc-400 text-sm">
            Only about 4% to 5% of babies are born on their exact estimated due date, though roughly 90% arrive within a normal window between 37 and 42 weeks of gestation.
          </p>
        </details>

        <details className="border-b border-zinc-200 dark:border-zinc-800 pb-4">
          <summary className="font-semibold cursor-pointer text-zinc-900 dark:text-white mb-2">
            What is the difference between gestational age and conception age?
          </summary>
          <p className="text-zinc-600 dark:text-zinc-400 text-sm">
            Gestational age is measured from the first day of your last period (40 weeks total), whereas conception age (fetal age) is measured from actual fertilization (38 weeks total).
          </p>
        </details>
      </div>
    </>
  );
}
