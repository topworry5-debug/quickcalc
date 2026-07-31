import Link from "next/link";

export default function WaterRuleArticle() {
  return (
    <>
      <p className="bg-emerald-50 dark:bg-emerald-950/30 border border-emerald-200 dark:border-emerald-900/50 p-4 rounded-xl text-zinc-800 dark:text-zinc-200 font-medium">
        <strong>Direct answer:</strong> No, the "8 glasses a day" rule isn't based on solid 
        scientific evidence &mdash; researchers have never found a study that specifically 
        recommends exactly 8 glasses for everyone. Your actual water needs depend on 
        your body weight, activity level, climate, and how much water you already get 
        from food. A more accurate estimate is roughly 0.5 to 1 ounce of water per 
        pound of body weight per day, adjusted for activity and heat.
      </p>

      <p>
        Here's where the 8x8 rule actually came from, why it stuck around for 
        decades, and how to figure out what your body actually needs.
      </p>

      <h2 className="text-2xl font-bold text-zinc-900 dark:text-white mt-10 mb-4">Where Did "8 Glasses a Day" Come From?</h2>
      <p>
        The rule traces back to a 1945 recommendation from the U.S. Food and 
        Nutrition Board, which suggested about 2.5 liters of water per day for most 
        adults. Here's the part that got lost over the decades: <strong>that 
        recommendation included water from food</strong>, not just from drinking glasses of 
        water. Since a large portion of daily water intake naturally comes from 
        meals (soups, fruits, vegetables, even bread), the "drink 8 glasses" version 
        that spread through popular culture dropped that important detail entirely.
      </p>
      <p>
        By the time it became common wisdom, it had turned into a simple, catchy rule 
        that sounded scientific but wasn't actually tested or verified for the 
        general population.
      </p>

      <h2 className="text-2xl font-bold text-zinc-900 dark:text-white mt-10 mb-4">So What Does Your Body Actually Need?</h2>
      <p>
        Water needs vary significantly from person to person based on several real 
        factors:
      </p>
      <p>
        <strong>Body weight.</strong> Larger bodies generally need more water to function. A 
        commonly cited estimate is about 0.5 to 1 ounce of water per pound of body 
        weight per day &mdash; so a 160 lb person might need somewhere between 80-160 oz, 
        depending on other factors below.
      </p>
      <p>
        <strong>Activity level.</strong> Exercise increases water loss through sweat, and the 
        more intense or prolonged the activity, the more you need to replace.
      </p>
      <p>
        <strong>Climate and heat.</strong> Hot or humid environments increase fluid loss even 
        without exercise &mdash; someone in Phoenix in July needs more water than someone 
        in a mild climate in October.
      </p>
      <p>
        <strong>Diet.</strong> Since a meaningful portion of hydration comes from food (fruits 
        like watermelon and cucumber are over 90% water), someone eating a lot of 
        fresh produce may need less from drinking water alone compared to someone 
        eating a mostly dry, processed diet.
      </p>
      <p>
        <strong>Pregnancy and breastfeeding.</strong> Both increase fluid needs significantly 
        above baseline recommendations. If you're tracking other health parameters during this time, you can also check your ideal prenatal weights using our <Link href="/tools/pregnancy-weight-gain-calculator" className="text-emerald-600 dark:text-emerald-400 font-semibold underline">Pregnancy Weight Gain Calculator</Link>.
      </p>

      <h2 className="text-2xl font-bold text-zinc-900 dark:text-white mt-10 mb-4">Is Thirst a Reliable Guide?</h2>
      <p>
        For most healthy adults, yes &mdash; thirst is actually a fairly reliable signal 
        that the body has evolved specifically to maintain proper hydration. The 
        idea that "by the time you're thirsty, you're already dehydrated" is 
        often overstated for typical daily activity; it becomes more relevant in 
        situations of intense exercise or heat exposure, where thirst can lag behind 
        actual fluid loss.
      </p>

      <h2 className="text-2xl font-bold text-zinc-900 dark:text-white mt-10 mb-4">Can You Drink Too Much Water?</h2>
      <p>
        Yes &mdash; while rare, drinking excessive amounts of water in a short period can 
        dilute sodium levels in the blood, a condition called hyponatremia. This is 
        uncommon in everyday situations but has occurred in endurance athletes who 
        drink large volumes of plain water without replacing electrolytes. For most 
        people going about a normal day, this isn't a practical concern &mdash; it mainly 
        matters in extreme, sustained water intake scenarios.
      </p>

      <h2 className="text-2xl font-bold text-zinc-900 dark:text-white mt-10 mb-4">Find Your Actual Number</h2>
      <p>
        Rather than relying on a one-size-fits-all rule, our free{" "}
        <Link href="/tools/water-intake-calculator" className="text-emerald-600 dark:text-emerald-400 font-semibold underline">
          Water Intake Calculator
        </Link>{" "}
        factors in your weight, activity level, and climate to give you a personalized daily target 
        &mdash; not a generic guess that ignores your body's actual needs.
      </p>

      <h2 className="text-2xl font-bold text-zinc-900 dark:text-white mt-10 mb-4">Frequently Asked Questions</h2>
      <div className="space-y-4 mb-6">
        <details className="border-b border-zinc-200 dark:border-zinc-800 pb-4">
          <summary className="font-semibold cursor-pointer text-zinc-900 dark:text-white">
            Does coffee or tea count toward daily water intake?
          </summary>
          <p className="mt-2 text-zinc-700 dark:text-zinc-300">
            Yes. While caffeine has a mild diuretic effect, the overall fluid from 
            caffeinated beverages still contributes positively to hydration &mdash; the old 
            idea that coffee "doesn't count" or dehydrates you has largely been debunked 
            by more recent research.
          </p>
        </details>
        <details className="border-b border-zinc-200 dark:border-zinc-800 pb-4">
          <summary className="font-semibold cursor-pointer text-zinc-900 dark:text-white">
            How much water should I drink based on my weight?
          </summary>
          <p className="mt-2 text-zinc-700 dark:text-zinc-300">
            A common estimate is 0.5 to 1 ounce per pound of body weight daily, adjusted 
            upward for exercise, heat, or pregnancy/breastfeeding.
          </p>
        </details>
        <details className="border-b border-zinc-200 dark:border-zinc-800 pb-4">
          <summary className="font-semibold cursor-pointer text-zinc-900 dark:text-white">
            Do I need more water in hot weather?
          </summary>
          <p className="mt-2 text-zinc-700 dark:text-zinc-300">
            Yes, significantly more &mdash; heat and humidity increase fluid loss through 
            sweat even without physical activity, so daily needs can rise noticeably 
            during summer months or in hot climates.
          </p>
        </details>
        <details className="border-b border-zinc-200 dark:border-zinc-800 pb-4">
          <summary className="font-semibold cursor-pointer text-zinc-900 dark:text-white">
            Is it possible to drink too much water?
          </summary>
          <p className="mt-2 text-zinc-700 dark:text-zinc-300">
            In rare cases, yes &mdash; very high water intake in a short period, especially 
            during endurance exercise without electrolyte replacement, can dilute 
            sodium levels. This isn't a concern for typical daily hydration.
          </p>
        </details>
        <details className="pb-4">
          <summary className="font-semibold cursor-pointer text-zinc-900 dark:text-white">
            What are signs of mild dehydration?
          </summary>
          <p className="mt-2 text-zinc-700 dark:text-zinc-300">
            Thirst, darker urine color, fatigue, and headache are common early signs. 
            Urine that's pale yellow is generally a good indicator of adequate hydration.
          </p>
        </details>
      </div>
    </>
  );
}
