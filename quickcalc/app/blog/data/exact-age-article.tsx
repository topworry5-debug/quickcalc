import Link from "next/link";

export default function ExactAgeArticle() {
  return (
    <>
      <p className="bg-emerald-50 dark:bg-emerald-950/30 border border-emerald-200 dark:border-emerald-900/50 p-4 rounded-xl text-zinc-800 dark:text-zinc-200 font-medium">
        To calculate exact age, subtract your birth year from the current year, then compare the current month and day to your birth date. If the current date is before your birthday, subtract one year from the total. Adjust remaining months and days, borrowing days dynamically depending on varying month lengths.
      </p>

      <p>
        "How old are you?" seems like the simplest question in the world &mdash; until someone 
        asks for your <em>exact</em> age, down to the day. Suddenly you're doing mental math, 
        counting on your fingers, and still not sure if you're forgetting a leap year 
        somewhere.
      </p>
      <p>
        Here's how age is actually calculated, why it's trickier than it looks, and a 
        few things about your birth date you've probably never thought about.
      </p>

      <h2 className="text-2xl font-bold text-zinc-900 dark:text-white mt-10 mb-4">
        Why Doesn't "Just Subtracting the Years" Always Work for Age?
      </h2>
      <p>
        If you were born in 1998 and it's 2026, you might think you're simply "2026 
        minus 1998 = 28 years old." That works most of the time, but not always &mdash; it 
        depends on whether your birthday has already happened this year.
      </p>
      <p>
        Someone born on December 20, 1998 isn't 28 yet in March 2026 &mdash; they're still 
        27, because their birthday hasn't arrived. This is the part that trips people 
        up when calculating age by hand.
      </p>

      <h2 className="text-2xl font-bold text-zinc-900 dark:text-white mt-10 mb-4">
        What Is the Correct Way to Calculate Your Exact Age?
      </h2>
      <p>
        Here's the actual step-by-step method:
      </p>

      <p className="font-semibold text-zinc-900 dark:text-white mt-4 mb-2">1. Subtract the birth year from the current year.</p>
      <p>
        This gives you a starting number, but it might be one year too many.
      </p>

      <p className="font-semibold text-zinc-900 dark:text-white mt-4 mb-2">2. Compare the current month and day to the birth month and day.</p>
      <p>
        If the current date hasn't yet reached the birth month and day, subtract 1 
        from your year count.
      </p>

      <p className="font-semibold text-zinc-900 dark:text-white mt-4 mb-2">3. Calculate the leftover months and days.</p>
      <p>
        This is where it gets fiddly &mdash; you're essentially doing date subtraction, 
        which means borrowing days from months and months from years, similar to how 
        you'd borrow in regular subtraction, except months don't all have the same 
        number of days.
      </p>

      <p className="font-semibold text-zinc-900 dark:text-white mt-4 mb-2">4. Account for leap years.</p>
      <p>
        If someone was born on February 29 (a "leap day"), their actual birthday only 
        exists once every four years. Most calculators treat February 28 or March 1 
        as their observed birthday in non-leap years &mdash; but their <em>exact</em> age calculation 
        still needs to account for the real elapsed time correctly.
      </p>

      <p>
        Doing all of this by hand is genuinely fiddly, which is exactly why age 
        calculators exist.
      </p>

      <h2 className="text-2xl font-bold text-zinc-900 dark:text-white mt-10 mb-4">
        What Else Can You Learn From Your Birth Date Beyond Your Age?
      </h2>
      <p>
        Once you know your exact age, a few more interesting numbers fall out of the 
        same calculation:
      </p>

      <p className="font-semibold text-zinc-900 dark:text-white mt-4 mb-2">Total days alive.</p>
      <p>
        Most people have lived somewhere between 8,000 and 
        25,000 days, depending on their age. Seeing this number tends to reframe how 
        people think about time &mdash; "30 years old" feels abstract, but "10,957 days" 
        feels concrete.
      </p>

      <p className="font-semibold text-zinc-900 dark:text-white mt-4 mb-2">Which day of the week you were born.</p>
      <p>
        Since the calendar repeats in a 
        predictable (if slightly irregular) cycle, it's possible to calculate exactly 
        which day of the week any date fell on &mdash; including your birth date, which 
        most people have never actually checked.
      </p>

      <p className="font-semibold text-zinc-900 dark:text-white mt-4 mb-2">Your generation.</p>
      <p>
        Birth year ranges are commonly grouped into generations 
        &mdash; Gen Z, Millennial, Gen X, Baby Boomer, and so on. These labels come from 
        sociological research and roughly track shared cultural touchpoints, though 
        the exact year cutoffs vary slightly between sources.
      </p>

      <p className="font-semibold text-zinc-900 dark:text-white mt-4 mb-2">Your zodiac sign(s).</p>
      <p>
        Western astrology assigns a zodiac sign based on 
        birth month and day, while Chinese astrology assigns an animal sign based on 
        birth year. They're unrelated systems from different traditions, which is why 
        you have one of each.
      </p>

      <h2 className="text-2xl font-bold text-zinc-900 dark:text-white mt-10 mb-4">
        How Can You Easily Calculate Your Age and Birth Facts Instantly?
      </h2>
      <p>
        Doing all of this manually means juggling several different calculations at 
        once &mdash; age math, day-of-the-week calculation, generational cutoffs, and two 
        separate zodiac systems. Our free <Link href="/tools/age-calculator" className="text-emerald-600 dark:text-emerald-400 font-semibold underline">Age Calculator</Link> handles all of it instantly: your exact age, total days/weeks/months lived, 
        day of the week you were born, your generation, both zodiac signs, and even a 
        fun estimate of how many heartbeats you've had so far. It also generates a 
        shareable summary card if you want to send your results to a friend or post 
        them somewhere.
      </p>

      <h2 className="text-2xl font-bold text-zinc-900 dark:text-white mt-10 mb-4">
        Frequently Asked Questions
      </h2>
      <div className="space-y-4 mb-6">
        <details className="border-b border-zinc-200 dark:border-zinc-800 pb-4">
          <summary className="font-semibold cursor-pointer text-zinc-900 dark:text-white">
            Is calculating age in "years" always accurate for legal purposes?
          </summary>
          <p className="mt-2 text-zinc-700 dark:text-zinc-300">
            For most legal purposes (voting age, drinking age, etc.), the standard is 
            simply whether your birthday has occurred yet in the current year &mdash; the exact 
            day-and-month math described above is the correct method.
          </p>
        </details>
        <details className="border-b border-zinc-200 dark:border-zinc-800 pb-4">
          <summary className="font-semibold cursor-pointer text-zinc-900 dark:text-white">
            Why do some age calculators give slightly different day counts?
          </summary>
          <p className="mt-2 text-zinc-700 dark:text-zinc-300">
            Small differences usually come from how leap years are handled internally, or 
            whether the calculation includes the current day as a full day or a partial 
            day. These are minor rounding choices, not calculation errors.
          </p>
        </details>
        <details className="border-b border-zinc-200 dark:border-zinc-800 pb-4">
          <summary className="font-semibold cursor-pointer text-zinc-900 dark:text-white">
            Can I calculate someone else's age, like a child's or a pet's?
          </summary>
          <p className="mt-2 text-zinc-700 dark:text-zinc-300">
            Yes &mdash; the calculation method is identical regardless of whose birth date you're 
            entering. For pets, some people use "dog years" conversions on top of the exact 
            chronological age, though those conversions are approximations, not precise math.
          </p>
        </details>
        <details className="pb-4">
          <summary className="font-semibold cursor-pointer text-zinc-900 dark:text-white">
            Do zodiac sign cutoff dates ever change?
          </summary>
          <p className="mt-2 text-zinc-700 dark:text-zinc-300">
            Western zodiac dates are based on the tropical calendar and have stayed 
            consistent for centuries. Some people reference a modern "13th sign" (Ophiuchus) 
            based on actual constellation positions, but this isn't part of standard 
            Western astrology.
          </p>
        </details>
      </div>
    </>
  );
}
