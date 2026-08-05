import Link from "next/link";

export default function PaceCalculatorGuideArticle() {
  return (
    <>
      <p className="bg-sky-50 dark:bg-sky-950/30 border border-sky-200 dark:border-sky-900/50 p-4 rounded-xl text-zinc-800 dark:text-zinc-200 font-medium">
        <strong>Quick Answer:</strong> To calculate your running pace, divide your total running time in minutes by the total distance covered: Pace = Total Time &divide; Distance. For example, completing a 10k (6.21 miles) in 50 minutes equals a pace of 5:00 per kilometer ($50 &divide; 10$) or 8:02 per mile ($50 &divide; 6.2137$). To convert treadmill speed (MPH) to pace (minutes per mile), divide 60 by your speed: Pace = 60 &divide; MPH (e.g., 6.0 MPH = 10:00 min/mile). To calculate running pace, finish times, or distance targets instantly, try our free <Link href="/tools/pace-calculator" className="text-sky-600 dark:text-sky-400 font-semibold underline">Pace Calculator</Link>.
      </p>

      <h2 className="text-2xl sm:text-3xl font-bold text-zinc-900 dark:text-white mt-10 mb-4">
        The Race Clock Surprise: Why 6.0 MPH on a Treadmill Isn&apos;t What You Think
      </h2>
      <p>
        You step onto a gym treadmill, press the speed control buttons up to <strong>6.0</strong>, and log a solid 30-minute workout. You step off sweating and satisfied.
      </p>
      <p>
        Later that afternoon, a fellow runner asks you what your outdoor road pace is. You pause. Does 6.0 MPH mean an 8-minute mile, a 10-minute mile, or something else entirely?
      </p>
      <p>
        This confusion happens to almost every runner at some point. Treadmill control panels, fitness watches, and automotive speedometers express rate of movement as <strong>speed</strong> (distance divided by time, such as miles per hour). But endurance athletes, track coaches, and race organizers express effort as <strong>pace</strong> (time divided by distance, such as minutes per mile or minutes per kilometer).
      </p>
      <p>
        Understanding <strong>how to calculate running pace</strong> allows you to structure effective training zones, hit realistic race goals, avoid burnout in early miles, and convert treadmill numbers into real-world road performance.
      </p>

      <h2 className="text-2xl sm:text-3xl font-bold text-zinc-900 dark:text-white mt-10 mb-4">
        Speed vs. Pace: Understanding the Fundamental Difference
      </h2>
      <p>
        While speed and pace describe the same movement, they measure inverse mathematical relationships:
      </p>
      <ul className="list-disc pl-6 space-y-2 mb-4">
        <li>
          <strong>Speed (Distance / Time):</strong> Measured in Miles Per Hour (MPH) or Kilometers Per Hour (KPH). <em>Higher numbers mean moving faster.</em>
        </li>
        <li>
          <strong>Pace (Time / Distance):</strong> Measured in Minutes per Mile (min/mi) or Minutes per Kilometer (min/km). <em>Lower numbers mean moving faster.</em>
        </li>
      </ul>
      <p>
        Runners prefer pace over speed because pace directly translates into race clock management. Knowing your pace tells you instantly when you will cross the finish line of a 5k, 10k, or marathon.
      </p>

      <h2 className="text-2xl sm:text-3xl font-bold text-zinc-900 dark:text-white mt-10 mb-4">
        How to Calculate Running Pace: Step-by-Step Formulas
      </h2>

      <h3 className="text-xl font-bold text-zinc-900 dark:text-white mt-6 mb-2">
        1. Calculating Pace from Total Time and Distance
      </h3>
      <div className="bg-zinc-100 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 p-4 rounded-xl my-4 font-mono text-sm text-center font-semibold text-zinc-900 dark:text-zinc-100">
        <p>Pace (Minutes per Unit) = (Total Time in Seconds &div; Distance) &div; 60</p>
      </div>

      <h3 className="text-xl font-bold text-zinc-900 dark:text-white mt-6 mb-2">
        2. Converting Treadmill Speed (MPH) to Pace (Min/Mile)
      </h3>
      <div className="bg-zinc-100 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 p-4 rounded-xl my-4 font-mono text-sm text-center font-semibold text-zinc-900 dark:text-zinc-100">
        <p>Pace (Minutes per Mile) = 60 &div; Treadmill Speed (MPH)</p>
      </div>

      <h3 className="text-xl font-bold text-zinc-900 dark:text-white mt-6 mb-2">
        Worked Example: Calculating Pace for a 50-Minute 10K Run
      </h3>
      <p>
        Let&apos;s walk through an actual numerical scenario. Imagine Jordan completes a 10-kilometer road race (10 km = <strong>6.21371 miles</strong>) in an official chip time of <strong>50 minutes, 00 seconds</strong>:
      </p>

      <ol className="list-decimal pl-6 space-y-2 mb-4">
        <li>
          <strong>Convert Time to Seconds:</strong> 50 minutes &times; 60 seconds = <strong>3,000 total seconds</strong>.
        </li>
        <li>
          <strong>Calculate Metric Pace (Min/KM):</strong> 3,000 &div; 10 = 300 seconds/km &rarr; <strong>5:00 min/km</strong>.
        </li>
        <li>
          <strong>Calculate Imperial Pace (Min/Mile):</strong> 3,000 &div; 6.21371 = 482.8 seconds/mile &rarr; <strong>8:02 min/mile</strong>.
        </li>
        <li>
          <strong>Calculate Equivalent Speed:</strong> 60 &div; 8.046 = <strong>7.46 MPH (12.00 KPH)</strong>.
        </li>
      </ol>

      <h2 className="text-2xl sm:text-3xl font-bold text-zinc-900 dark:text-white mt-10 mb-4">
        Treadmill Speed (MPH) to Running Pace (Min/Mile) Conversion Chart
      </h2>

      <div className="overflow-x-auto my-6">
        <table className="w-full text-left text-sm text-zinc-700 dark:text-zinc-300 border-collapse border border-zinc-200 dark:border-zinc-800">
          <thead>
            <tr className="bg-zinc-100 dark:bg-zinc-900 text-zinc-900 dark:text-white font-semibold">
              <th className="border border-zinc-200 dark:border-zinc-800 p-3">Treadmill Speed (MPH)</th>
              <th className="border border-zinc-200 dark:border-zinc-800 p-3">Running Pace (Min / Mile)</th>
              <th className="border border-zinc-200 dark:border-zinc-800 p-3">Running Pace (Min / KM)</th>
              <th className="border border-zinc-200 dark:border-zinc-800 p-3">Equivalent Speed (KPH)</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="border border-zinc-200 dark:border-zinc-800 p-3 font-medium">5.0 MPH</td>
              <td className="border border-zinc-200 dark:border-zinc-800 p-3 font-semibold text-sky-600 dark:text-sky-400">12:00 / mi</td>
              <td className="border border-zinc-200 dark:border-zinc-800 p-3">7:27 / km</td>
              <td className="border border-zinc-200 dark:border-zinc-800 p-3">8.0 KPH</td>
            </tr>
            <tr className="bg-zinc-50/50 dark:bg-zinc-900/50">
              <td className="border border-zinc-200 dark:border-zinc-800 p-3 font-medium">6.0 MPH</td>
              <td className="border border-zinc-200 dark:border-zinc-800 p-3 font-semibold text-sky-600 dark:text-sky-400">10:00 / mi</td>
              <td className="border border-zinc-200 dark:border-zinc-800 p-3">6:13 / km</td>
              <td className="border border-zinc-200 dark:border-zinc-800 p-3">9.7 KPH</td>
            </tr>
            <tr>
              <td className="border border-zinc-200 dark:border-zinc-800 p-3 font-medium">7.0 MPH</td>
              <td className="border border-zinc-200 dark:border-zinc-800 p-3 font-semibold text-sky-600 dark:text-sky-400">8:34 / mi</td>
              <td className="border border-zinc-200 dark:border-zinc-800 p-3">5:19 / km</td>
              <td className="border border-zinc-200 dark:border-zinc-800 p-3">11.3 KPH</td>
            </tr>
            <tr className="bg-zinc-50/50 dark:bg-zinc-900/50">
              <td className="border border-zinc-200 dark:border-zinc-800 p-3 font-medium">8.0 MPH</td>
              <td className="border border-zinc-200 dark:border-zinc-800 p-3 font-semibold text-sky-600 dark:text-sky-400">7:30 / mi</td>
              <td className="border border-zinc-200 dark:border-zinc-800 p-3">3:59 / km</td>
              <td className="border border-zinc-200 dark:border-zinc-800 p-3">12.9 KPH</td>
            </tr>
            <tr>
              <td className="border border-zinc-200 dark:border-zinc-800 p-3 font-medium">9.0 MPH</td>
              <td className="border border-zinc-200 dark:border-zinc-800 p-3 font-semibold text-sky-600 dark:text-sky-400">6:40 / mi</td>
              <td className="border border-zinc-200 dark:border-zinc-800 p-3">4:08 / km</td>
              <td className="border border-zinc-200 dark:border-zinc-800 p-3">14.5 KPH</td>
            </tr>
            <tr className="bg-zinc-50/50 dark:bg-zinc-900/50">
              <td className="border border-zinc-200 dark:border-zinc-800 p-3 font-medium">10.0 MPH</td>
              <td className="border border-zinc-200 dark:border-zinc-800 p-3 font-semibold text-sky-600 dark:text-sky-400">6:00 / mi</td>
              <td className="border border-zinc-200 dark:border-zinc-800 p-3">3:44 / km</td>
              <td className="border border-zinc-200 dark:border-zinc-800 p-3">16.1 KPH</td>
            </tr>
          </tbody>
        </table>
      </div>

      <h2 className="text-2xl sm:text-3xl font-bold text-zinc-900 dark:text-white mt-10 mb-4">
        Common Pacing Mistakes Runners Make
      </h2>
      <ol className="list-decimal pl-6 space-y-3 mb-6">
        <li>
          <strong>Starting Races Too Fast (&ldquo;Fly and Die&rdquo; Pacing):</strong> Running the first mile 30 to 45 seconds faster than target pace causes lactic acid buildup, leading to severe slowdowns later. Learn how to structure negative splits in our guide on <Link href="/blog/running-pace-strategy-guide-calculate-target-race-pace" className="text-sky-600 dark:text-sky-400 font-semibold underline">running race pacing strategy</Link>.
        </li>
        <li>
          <strong>Assuming Treadmill Pace Equals Outdoor Pace:</strong> Outdoor running involves wind resistance and terrain variation. Set treadmill incline to 1.0% to simulate outdoor effort.
        </li>
        <li>
          <strong>Running Easy Days Too Fast:</strong> Over 80% of weekly volume should occur at an easy, conversational pace (1:30 to 2:00 min/mile slower than 5k pace). For road trip driving speed and fuel math, check out our <Link href="/tools/travel-time-fuel-calculator" className="text-sky-600 dark:text-sky-400 font-semibold underline">Travel Time &amp; Fuel Cost Calculator</Link>.
        </li>
      </ol>

      <h2 className="text-2xl sm:text-3xl font-bold text-zinc-900 dark:text-white mt-10 mb-4">
        Calculate Paces, Times, and Splits Instantly with QuickCalc
      </h2>
      <p>
        Converting time, distance, and unit paces by hand takes time. Our free <Link href="/tools/pace-calculator" className="text-sky-600 dark:text-sky-400 font-semibold underline">Pace Calculator</Link> handles all the math automatically in real time.
      </p>
      <div className="bg-sky-950/90 text-sky-100 p-6 rounded-2xl border border-sky-800 my-6 shadow-xl text-center">
        <h3 className="text-xl font-bold text-white mb-2">Try the Free QuickCalc Pace Calculator</h3>
        <p className="text-sky-200 text-sm max-w-xl mx-auto mb-4">
          Features 3 flexible modes (Find Pace, Find Time, Find Distance), instant min/km to min/mile toggles, and equivalent MPH/KPH speed calculations. Zero ads, zero signups.
        </p>
        <Link
          href="/tools/pace-calculator"
          className="inline-block bg-sky-500 hover:bg-sky-400 text-zinc-950 font-bold px-6 py-3 rounded-xl transition-all transform hover:-translate-y-0.5 shadow-lg"
        >
          Open Pace Calculator &rarr;
        </Link>
      </div>

      <h2 className="text-2xl sm:text-3xl font-bold text-zinc-900 dark:text-white mt-10 mb-4">
        Frequently Asked Questions
      </h2>
      <div className="space-y-4 mb-6">
        <details className="border-b border-zinc-200 dark:border-zinc-800 pb-4">
          <summary className="font-semibold cursor-pointer text-zinc-900 dark:text-white mb-2">
            How do you calculate running pace per mile or kilometer?
          </summary>
          <p className="text-zinc-600 dark:text-zinc-400 text-sm">
            Divide your total running time in minutes by the total distance covered in miles or kilometers (e.g., 40 minutes &div; 4 miles = 10:00 min/mile pace).
          </p>
        </details>

        <details className="border-b border-zinc-200 dark:border-zinc-800 pb-4">
          <summary className="font-semibold cursor-pointer text-zinc-900 dark:text-white mb-2">
            What is the difference between running speed (mph/kph) and running pace (min/mi or min/km)?
          </summary>
          <p className="text-zinc-600 dark:text-zinc-400 text-sm">
            Speed measures distance covered over time (higher numbers mean faster), whereas pace measures time spent per unit of distance (lower numbers mean faster).
          </p>
        </details>

        <details className="border-b border-zinc-200 dark:border-zinc-800 pb-4">
          <summary className="font-semibold cursor-pointer text-zinc-900 dark:text-white mb-2">
            How do you convert min/km to min/mile?
          </summary>
          <p className="text-zinc-600 dark:text-zinc-400 text-sm">
            Multiply your pace in minutes per kilometer by 1.60934 to find your equivalent pace in minutes per mile (e.g., a 5:00 min/km pace equals an 8:02 min/mile pace).
          </p>
        </details>

        <details className="border-b border-zinc-200 dark:border-zinc-800 pb-4">
          <summary className="font-semibold cursor-pointer text-zinc-900 dark:text-white mb-2">
            How do you convert treadmill speed (mph) to running pace (min/mile)?
          </summary>
          <p className="text-zinc-600 dark:text-zinc-400 text-sm">
            Divide 60 by your treadmill speed setting in miles per hour (e.g., 60 &div; 6.0 MPH = 10:00 min/mile pace; 60 &div; 7.5 MPH = 8:00 min/mile pace).
          </p>
        </details>

        <details className="border-b border-zinc-200 dark:border-zinc-800 pb-4">
          <summary className="font-semibold cursor-pointer text-zinc-900 dark:text-white mb-2">
            How do you calculate your target pace for a 5k, 10k, or half marathon?
          </summary>
          <p className="text-zinc-600 dark:text-zinc-400 text-sm">
            Divide your target finish time by the total race distance (3.1 miles for a 5k, 6.21 miles for a 10k, or 13.1 miles for a half marathon) to determine your required split pace per mile.
          </p>
        </details>
      </div>
    </>
  );
}
