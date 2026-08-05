import ThemeToggle from "@/components/ThemeToggle";
import { articles } from "../page";
import { notFound } from "next/navigation";
import Link from "next/link";
import Footer from "@/components/Footer";
import type { Metadata } from "next";

// Article Components
import BudgetRuleArticle from "../data/budget-rule-article";
import UsdPkrArticle from "../data/usd-pkr-article";
import ExactAgeArticle from "../data/exact-age-article";
import SplitBillArticle from "../data/split-bill-article";
import PercentageCalculatorArticle from "../data/percentage-calculator-article";
import ShoeSizeArticle from "../data/shoe-size-article";
import BmiArticle from "../data/bmi-article";
import DstTimezoneArticle from "../data/dst-timezone-article";
import PasswordEntropyArticle from "../data/password-entropy-article";
import ZakatCalculationGuideArticle from "../data/zakat-calculation-guide-article";
import CurrencyConversionGuideArticle from "../data/currency-conversion-guide-article";
import AgeCalculatorGuideArticle from "../data/age-calculator-guide-article";
import WaterRuleArticle from "../data/water-rule-article";
import RegexTutorialGuideArticle from "../data/regex-tutorial-guide-article";
import RunningPaceStrategyGuideArticle from "../data/running-pace-strategy-guide-article";
import LoanEmiCalculationGuideArticle from "../data/loan-emi-calculation-guide-article";
import CalorieCalculatorGuideArticle from "../data/calorie-calculator-guide-article";
import TipCalculatorGuideArticle from "../data/tip-calculator-guide-article";
import CalorieDeficitGuideArticle from "../data/calorie-deficit-guide-article";
import GPAConverterGuideArticle from "../data/gpa-converter-guide-article";
import SleepCycleGuideArticle from "../data/sleep-cycle-guide-article";
import SalaryTakeHomeGuideArticle from "../data/salary-take-home-guide-article";
import SavingsGrowthGuideArticle from "../data/savings-growth-guide-article";
import ShareButtons from "@/components/ShareButtons";

interface BlogPostProps {
  params: {
    slug: string;
  };
}

const articleComponents: Record<string, React.ComponentType> = {
  "how-to-calculate-savings-growth-compound-interest-guide": SavingsGrowthGuideArticle,
  "how-to-calculate-take-home-pay-net-salary-guide": SalaryTakeHomeGuideArticle,
  "how-to-calculate-sleep-cycles-wake-up-time-guide": SleepCycleGuideArticle,
  "how-to-convert-percentage-to-gpa-4-point-scale-guide": GPAConverterGuideArticle,
  "how-to-calculate-calorie-deficit-step-by-step-guide": CalorieDeficitGuideArticle,
  "how-to-calculate-tip-easy-formulas-tipping-guide": TipCalculatorGuideArticle,
  "how-to-calculate-daily-calorie-needs-for-weight-loss": CalorieCalculatorGuideArticle,
  "how-loan-emi-is-calculated-amortization-repayment-guide": LoanEmiCalculationGuideArticle,
  "running-pace-strategy-guide-calculate-target-race-pace": RunningPaceStrategyGuideArticle,
  "how-to-write-and-test-regular-expressions-regex-tutorial-guide": RegexTutorialGuideArticle,
  "is-the-8-glasses-a-day-water-rule-actually-true": WaterRuleArticle,
  "how-to-calculate-exact-age-years-months-days": AgeCalculatorGuideArticle,
  "how-currency-conversion-actually-works-avoid-markup-fees": CurrencyConversionGuideArticle,
  "how-to-calculate-zakat-nisab-gold-silver-savings-guide": ZakatCalculationGuideArticle,
  "50-30-20-budget-rule-explained-does-it-actually-work": BudgetRuleArticle,
  "usd-to-pkr-and-understanding-real-exchange-rates": UsdPkrArticle,
  "how-to-calculate-your-exact-age-and-fun-facts-about-your-birth-date": ExactAgeArticle,
  "how-to-split-a-bill-fairly-when-everyone-orders-different-things": SplitBillArticle,
  "how-to-calculate-percentage-increase-decrease-discount": PercentageCalculatorArticle,
  "us-uk-eu-japan-shoe-size-conversion-guide": ShoeSizeArticle,
  "how-to-calculate-bmi-accurately-and-its-limitations": BmiArticle,
  "why-daylight-saving-time-breaks-simple-timezone-math": DstTimezoneArticle,
  "what-makes-a-password-actually-strong-understanding-entropy": PasswordEntropyArticle,
};

export async function generateStaticParams() {
  return articles.map((article) => ({
    slug: article.slug,
  }));
}

export async function generateMetadata({ params }: BlogPostProps): Promise<Metadata> {
  const article = articles.find((a) => a.slug === params.slug);
  if (!article) return {};

  const isNewArticle = article.slug === "how-currency-conversion-actually-works-avoid-markup-fees";
  const isWaterRule = article.slug === "is-the-8-glasses-a-day-water-rule-actually-true";
  const customTitle = isWaterRule
    ? "Is the \"8 Glasses a Day\" Water Rule Actually True? | QuickCalc Insights"
    : isNewArticle
    ? "How Currency Conversion Works & How to Avoid Fees"
    : `${article.title} | QuickCalc Insights`;

  return {
    title: customTitle,
    description: article.description,
    alternates: {
      canonical: `/blog/${article.slug}`,
    },
    openGraph: {
      title: customTitle,
      description: article.description,
      url: `https://quickcalc.cloud/blog/${article.slug}`,
      type: "article",
      publishedTime: isWaterRule
        ? "2026-07-29T00:00:00.000Z"
        : isNewArticle
        ? "2026-07-26T00:00:00.000Z"
        : "2026-07-18T00:00:00.000Z",
      siteName: "QuickCalc",
    },
    twitter: {
      card: "summary_large_image",
      title: customTitle,
      description: article.description,
    },
  };
}

export default function BlogPostPage({ params }: BlogPostProps) {
  const article = articles.find((a) => a.slug === params.slug);
  if (!article) {
    notFound();
  }

  const ArticleBody = articleComponents[article.slug];
  if (!ArticleBody) {
    notFound();
  }

  // Define structured JSON-LD data for the article
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    "headline": article.title,
    "description": article.description,
    "datePublished": article.slug === "how-to-calculate-savings-growth-compound-interest-guide"
      ? "2026-08-04"
      : article.slug === "how-to-calculate-take-home-pay-net-salary-guide"
      ? "2026-08-04"
      : article.slug === "how-to-calculate-sleep-cycles-wake-up-time-guide"
      ? "2026-08-04"
      : article.slug === "how-to-convert-percentage-to-gpa-4-point-scale-guide"
      ? "2026-08-04"
      : article.slug === "how-to-calculate-calorie-deficit-step-by-step-guide"
      ? "2026-08-04"
      : article.slug === "how-to-calculate-tip-easy-formulas-tipping-guide"
      ? "2026-08-04"
      : article.slug === "how-to-calculate-daily-calorie-needs-for-weight-loss"
      ? "2026-08-04"
      : article.slug === "how-loan-emi-is-calculated-amortization-repayment-guide"
      ? "2026-08-04"
      : article.slug === "running-pace-strategy-guide-calculate-target-race-pace"
      ? "2026-08-04"
      : article.slug === "how-to-write-and-test-regular-expressions-regex-tutorial-guide"
      ? "2026-08-04"
      : article.slug === "how-to-write-and-test-regular-expressions-regex-tutorial-guide"
      ? "2026-08-02"
      : article.slug === "is-the-8-glasses-a-day-water-rule-actually-true"
      ? "2026-07-29"
      : article.slug === "how-to-calculate-exact-age-years-months-days"
      ? "2026-07-26"
      : article.slug === "how-currency-conversion-actually-works-avoid-markup-fees"
      ? "2026-07-26"
      : article.slug === "how-to-calculate-zakat-nisab-gold-silver-savings-guide"
      ? "2026-07-24"
      : article.slug === "usd-to-pkr-and-understanding-real-exchange-rates"
      ? "2026-07-24"
      : article.slug === "50-30-20-budget-rule-explained-does-it-actually-work"
      ? "2026-07-24"
      : article.slug === "how-to-calculate-your-exact-age-and-fun-facts-about-your-birth-date"
      ? "2026-07-23"
      : article.slug === "how-to-split-a-bill-fairly-when-everyone-orders-different-things"
      ? "2026-07-22"
      : article.slug === "how-to-calculate-percentage-increase-decrease-discount"
      ? "2026-07-21"
      : article.slug === "how-to-calculate-bmi-accurately-and-its-limitations" 
      ? "2026-07-18" 
      : article.slug === "why-daylight-saving-time-breaks-simple-timezone-math" 
      ? "2026-07-17" 
      : "2026-07-16",
    "dateModified": "2026-07-29",
    "author": {
      "@type": "Organization",
      "name": "QuickCalc",
      "url": "https://quickcalc.cloud",
    },
    "publisher": {
      "@type": "Organization",
      "name": "QuickCalc",
      "logo": {
        "@type": "ImageObject",
        "url": "https://quickcalc.cloud/og-image.png",
      },
    },
    "mainEntityOfPage": {
      "@type": "WebPage",
      "@id": `https://quickcalc.cloud/blog/${article.slug}`,
    },
  };

  // Define structured JSON-LD data for the FAQPage
  const faqJsonLd = article.slug === "how-to-calculate-savings-growth-compound-interest-guide" ? {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      {
        "@type": "Question",
        "name": "How do you calculate the growth of a savings account over time?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Combine your starting principal with total regular contributions, then apply the compound interest equation A = P(1 + r/n)^(nt) + PMT * [((1 + r/n)^(nt) - 1) / (r/n)]."
        }
      },
      {
        "@type": "Question",
        "name": "What is the formula for compound interest with regular monthly contributions?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "The future value of recurring monthly deposits is calculated as PMT * [((1 + r/n)^(nt) - 1) / (r/n)], where PMT is your monthly contribution, r is the interest rate, n is compounding frequency, and t is years."
        }
      },
      {
        "@type": "Question",
        "name": "How much will $200 a month grow to in 10 years at 6% interest?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Depositing $200 a month for 10 years at 6% annual interest yields approximately $32,676 in total balance from contributions alone (or $41,773 if paired with a $5,000 initial deposit)."
        }
      },
      {
        "@type": "Question",
        "name": "What is the difference between simple interest and compound interest?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Simple interest calculates earnings only on your original principal balance. Compound interest calculates earnings on your principal plus all accumulated interest over time."
        }
      },
      {
        "@type": "Question",
        "name": "How does compounding frequency (daily vs monthly) impact savings growth?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Higher compounding frequency means interest is added to your principal balance more often, allowing subsequent interest calculations to build on larger numbers and yielding slightly higher overall returns."
        }
      }
    ]
  } : article.slug === "how-to-calculate-take-home-pay-net-salary-guide" ? {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      {
        "@type": "Question",
        "name": "How do you calculate net take-home pay from gross annual salary?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Subtract pre-tax benefit contributions (like 401k and health insurance) from your gross salary, calculate and subtract federal, state, and local income taxes, deduct 7.65% for FICA taxes, and divide the remaining net total by your annual pay frequency."
        }
      },
      {
        "@type": "Question",
        "name": "What is the difference between gross pay and net pay?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Gross pay is the total compensation agreed upon with your employer before any withholdings. Net pay is the final amount deposited into your bank account after taxes, FICA, and benefit deductions."
        }
      },
      {
        "@type": "Question",
        "name": "What taxes are automatically deducted from your paycheck?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Standard paycheck withholdings include Federal Income Tax, State and Local Income Taxes (where applicable), and FICA taxes (6.2% Social Security and 1.45% Medicare)."
        }
      },
      {
        "@type": "Question",
        "name": "How do pre-tax deductions like 401(k) lower your taxable income?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Pre-tax contributions are subtracted from your gross income before income taxes are calculated, reducing your overall taxable income base and lowering the total income tax you owe."
        }
      },
      {
        "@type": "Question",
        "name": "How do you calculate bi-weekly take-home pay?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Take your total annual net take-home pay after all taxes and deductions, and divide it by 26 (the total number of bi-weekly pay periods in a calendar year)."
        }
      }
    ]
  } : article.slug === "how-to-calculate-sleep-cycles-wake-up-time-guide" ? {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      {
        "@type": "Question",
        "name": "How long is a natural human sleep cycle?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "The average human sleep cycle lasts approximately 90 minutes (ranging between 80 and 110 minutes in healthy adults), repeating 4 to 6 times per night."
        }
      },
      {
        "@type": "Question",
        "name": "Why do you wake up feeling tired even after sleeping 8 hours?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Eight hours equals 5.3 sleep cycles. Waking up 30 minutes into a new cycle interrupts deep Stage N3 sleep, triggering sleep inertia, disorientation, and morning grogginess."
        }
      },
      {
        "@type": "Question",
        "name": "How many sleep cycles do you need per night for optimal health?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Most healthy adults thrive on 5 complete sleep cycles (7.5 hours) or 6 complete cycles (9.0 hours) per night."
        }
      },
      {
        "@type": "Question",
        "name": "What is sleep inertia and how do sleep cycles affect it?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Sleep inertia is the feeling of grogginess and disorientation experienced right after waking up. It occurs when an alarm interrupts deep slow-wave sleep rather than light Stage N1 or REM sleep."
        }
      },
      {
        "@type": "Question",
        "name": "How do you calculate your ideal bedtime based on wake-up time?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Count backward from your wake-up alarm in 90-minute blocks (e.g., 7.5 hours for 5 cycles), then subtract an additional 15 minutes to account for the time it takes to fall asleep."
        }
      }
    ]
  } : article.slug === "how-to-convert-percentage-to-gpa-4-point-scale-guide" ? {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      {
        "@type": "Question",
        "name": "How do you convert a percentage grade to a 4.0 GPA scale?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Convert each course percentage into its corresponding 4.0 grade point value (e.g., 90–92% = 3.7, 83–86% = 3.0, 73–76% = 2.0), multiply by credit hours, sum the quality points, and divide by total credits."
        }
      },
      {
        "@type": "Question",
        "name": "What is an 80% percentage equivalent to in 4.0 GPA?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "In the standard US grading system, an 80% corresponds to a B- grade, which equals a 2.7 GPA on a 4.0 scale."
        }
      },
      {
        "@type": "Question",
        "name": "How do UK degree classifications convert to US GPA?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "A UK First-Class (1st) generally converts to a 3.7–4.0 GPA, an Upper Second (2:1) converts to a 3.3–3.6 GPA, a Lower Second (2:2) converts to a 2.7–3.2 GPA, and a Third (3rd) converts to a 2.0–2.6 GPA."
        }
      },
      {
        "@type": "Question",
        "name": "What is the difference between weighted and unweighted GPA?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Unweighted GPA measures academic performance on a strict 4.0 scale regardless of class difficulty. Weighted GPA goes up to 5.0, adding an extra 0.5 to 1.0 point bonus for honors, AP, or IB courses."
        }
      },
      {
        "@type": "Question",
        "name": "How do Indian percentage marks convert to a 4.0 GPA?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Credential evaluation agencies like WES map Indian scores of 75%+ to an A (3.7–4.0 GPA), 60%–74% to a B range (3.0–3.6 GPA), 50%–59% to a C range (2.0–2.9 GPA), and 40%–49% to a D range (1.0–1.9 GPA)."
        }
      }
    ]
  } : article.slug === "how-to-calculate-calorie-deficit-step-by-step-guide" ? {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      {
        "@type": "Question",
        "name": "How do you calculate a safe calorie deficit for weight loss?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Determine your Total Daily Energy Expenditure (TDEE) based on your age, sex, weight, height, and activity level, then subtract 15% to 25% (or 300 to 500 calories per day)."
        }
      },
      {
        "@type": "Question",
        "name": "Is a 500 calorie deficit enough to lose a pound a week?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Yes. A daily deficit of 500 calories accumulates to a 3,500-calorie deficit over 7 days, which equals approximately 1 pound of body fat loss per week."
        }
      },
      {
        "@type": "Question",
        "name": "What happens if your calorie deficit is too large?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "An overly aggressive deficit (over 30% or dropping below your BMR) causes muscle loss, severe fatigue, metabolic slowdown, nutrient deficiencies, and intense binge-eating triggers."
        }
      },
      {
        "@type": "Question",
        "name": "Should you calculate a calorie deficit based on BMR or TDEE?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Always calculate your deficit from your TDEE. BMR only accounts for resting organ function; subtracting a deficit from BMR leads to dangerously low calorie intake targets."
        }
      },
      {
        "@type": "Question",
        "name": "How often should you recalculate your calorie deficit as you lose weight?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Recalculate your TDEE and calorie deficit targets every 10 to 15 pounds of weight loss, as a lighter body requires fewer calories to operate both at rest and during exercise."
        }
      }
    ]
  } : article.slug === "how-to-calculate-tip-easy-formulas-tipping-guide" ? {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      {
        "@type": "Question",
        "name": "Should you calculate tip before or after tax?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "You should calculate your tip on the pre-tax subtotal. Gratuity rewards the server for food and beverage service, whereas sales tax is a government levy that does not go to kitchen or waitstaff."
        }
      },
      {
        "@type": "Question",
        "name": "What is the standard tip percentage for restaurant dining?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "In North America, 15% is standard for baseline acceptable service, while 18% to 20% is the customary standard for good to attentive service in sit-down dining."
        }
      },
      {
        "@type": "Question",
        "name": "How do you quickly calculate a 20% tip in your head?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Move the decimal point of your pre-tax bill one spot to the left to find 10%, then double that number. For example, 10% of a $55.00 bill is $5.50, so a 20% tip is $5.50 * 2 = $11.00."
        }
      },
      {
        "@type": "Question",
        "name": "Do you tip on food delivery subtotal or total order amount?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Calculate delivery tips based on the pre-tax food subtotal, aiming for 15% to 20%. Ensure you maintain a minimum tip of $3 to $5 on smaller orders to fairly compensate the driver for travel time and fuel."
        }
      },
      {
        "@type": "Question",
        "name": "How do you split a tip fairly among multiple people?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Calculate each person's individual subtotal percentage, then multiply that share ratio by the total tax and tip. If everyone spent a similar amount, simply calculate the grand total and divide equally using our Tip Calculator."
        }
      }
    ]
  } : article.slug === "how-to-calculate-daily-calorie-needs-for-weight-loss" ? {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      {
        "@type": "Question",
        "name": "Can I lose weight by eating 1,200 calories a day?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "While eating 1,200 calories will cause weight loss for smaller or sedentary individuals, it is dangerously low for most adults. Consuming too few calories causes muscle loss, fatigue, nutrient deficiencies, and metabolic slowdown. Base your deficit on your personal TDEE."
        }
      },
      {
        "@type": "Question",
        "name": "How often should I recalculate my calorie needs?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Recalculate your BMR and TDEE every 10 to 15 pounds of weight loss. As your body weight decreases, a smaller body requires fewer calories to operate, which naturally lowers your baseline TDEE."
        }
      },
      {
        "@type": "Question",
        "name": "Why am I not losing weight in a calorie deficit?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "If your scale weight has not dropped after 3 to 4 consecutive weeks, you are not actually in a calorie deficit. Untracked cooking oils, inaccurate portion estimation, weekend overeating, or an over-estimated activity multiplier are the most frequent causes."
        }
      }
    ]
  } : article.slug === "how-loan-emi-is-calculated-amortization-repayment-guide" ? {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      {
        "@type": "Question",
        "name": "What is EMI and how does it work?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "EMI (Equated Monthly Installment) is a fixed monthly payment made by a borrower to a lender. It covers both principal repayment and interest charges, structured so the total monthly payment stays equal while the internal split between principal and interest shifts over time."
        }
      },
      {
        "@type": "Question",
        "name": "What is the mathematical formula to calculate loan EMI?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "The standard EMI formula is EMI = P * [ r(1+r)^n ] / [ (1+r)^n - 1 ], where P is principal, r is monthly interest rate, and n is loan tenure in months."
        }
      },
      {
        "@type": "Question",
        "name": "What is the difference between reducing balance and flat rate interest?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Flat rate interest calculates interest on the entire initial loan amount throughout the full tenure. Reducing balance interest recalculates interest monthly based only on your remaining outstanding principal, making reducing balance significantly cheaper."
        }
      },
      {
        "@type": "Question",
        "name": "How do extra principal prepayments reduce total loan interest?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Extra principal prepayments directly reduce your remaining balance. Because monthly interest is calculated as a percentage of remaining principal, lowering the balance reduces subsequent interest charges and shortens your loan term."
        }
      },
      {
        "@type": "Question",
        "name": "Why is interest higher in the first few years of a long-term loan?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Because your outstanding principal is at its highest point at the beginning of the loan, the calculated interest fee is also at its peak. As principal shrinks over time, less of your fixed monthly payment goes toward interest and more goes toward principal reduction."
        }
      }
    ]
  } : article.slug === "running-pace-strategy-guide-calculate-target-race-pace" ? {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      {
        "@type": "Question",
        "name": "How do you calculate running pace manually?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Divide your total running time in minutes by the total distance run in miles or kilometers. For example, running 4 miles in 36 minutes equals 36 / 4 = 9 minutes per mile pace."
        }
      },
      {
        "@type": "Question",
        "name": "What is a good average running pace for beginners?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "A typical beginner running pace ranges between 9:30 and 12:00 minutes per mile (5:55 to 7:27 per kilometer). For a 5K race, this results in finish times between 29 and 37 minutes."
        }
      },
      {
        "@type": "Question",
        "name": "What is the difference between an even split and a negative split?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "An even split means running each mile at the exact same pace throughout the race. A negative split means running the second half of the race faster than the first half."
        }
      },
      {
        "@type": "Question",
        "name": "How do I convert speed in mph to running pace per mile?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Divide 60 by your speed in miles per hour. For instance, running at 6.0 mph equals 60 / 6 = 10:00 minutes per mile pace."
        }
      },
      {
        "@type": "Question",
        "name": "Why is pacing important in distance running?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Proper pacing prevents premature glycogen depletion and lactate accumulation, ensuring your body stays within its aerobic zone and preventing severe fatigue late in the race."
        }
      }
    ]
  } : article.slug === "is-the-8-glasses-a-day-water-rule-actually-true" ? {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      {
        "@type": "Question",
        "name": "Does coffee or tea count toward daily water intake?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Yes. While caffeine has a mild diuretic effect, the overall fluid from caffeinated beverages still contributes positively to hydration — the old idea that coffee \"doesn't count\" or dehydrates you has largely been debunked by more recent research."
        }
      },
      {
        "@type": "Question",
        "name": "How much water should I drink based on my weight?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "A common estimate is 0.5 to 1 ounce per pound of body weight daily, adjusted upward for exercise, heat, or pregnancy/breastfeeding."
        }
      },
      {
        "@type": "Question",
        "name": "Do I need more water in hot weather?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Yes, significantly more — heat and humidity increase fluid loss through sweat even without physical activity, so daily needs can rise noticeably during summer months or in hot climates."
        }
      },
      {
        "@type": "Question",
        "name": "Is it possible to drink too much water?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "In rare cases, yes — very high water intake in a short period, especially during endurance exercise without electrolyte replacement, can dilute sodium levels. This isn't a concern for typical daily hydration."
        }
      },
      {
        "@type": "Question",
        "name": "What are signs of mild dehydration?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Thirst, darker urine color, fatigue, and headache are common early signs. Urine that's pale yellow is generally a good indicator of adequate hydration."
        }
      }
    ]
  } : article.slug === "how-to-write-and-test-regular-expressions-regex-tutorial-guide" ? {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      {
        "@type": "Question",
        "name": "What does regex actually stand for, and where did it start?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Regex stands for Regular Expression. The concept originated in the 1950s when mathematician Stephen Cole Kleene described regular languages. Today, almost every modern programming language supports it to find and manipulate text patterns."
        }
      },
      {
        "@type": "Question",
        "name": "Is regex considered a full programming language?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "No, regex is not a general-purpose programming language. It is a specialized, domain-specific pattern-matching language designed solely for parsing and manipulating text within other hosting environments and languages."
        }
      },
      {
        "@type": "Question",
        "name": "What is the key difference between the asterisk (*) and plus (+) quantifiers?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "The asterisk matches the preceding element zero or more times, making it completely optional. The plus quantifier requires the preceding element to appear at least once, matching it one or more times."
        }
      },
      {
        "@type": "Question",
        "name": "How can I search for a literal period (.) or asterisk (*) without triggering their wildcards?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "You must escape them by putting a backslash before them, like \\. or \\*. This tells the regex engine to treat them as plain text characters rather than special operators."
        }
      },
      {
        "@type": "Question",
        "name": "Are regular expressions case-sensitive by default?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Yes, they are case-sensitive. Searching for 'cat' will ignore 'Cat'. To match regardless of case, you need to append the 'i' flag to your regular expression."
        }
      },
      {
        "@type": "Question",
        "name": "Can using bad regex patterns slow down my application?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Yes, highly nested quantifiers like (a+)+ can cause 'catastrophic backtracking' in complex strings. This happens when the engine tries millions of potential matches, spiking CPU usage."
        }
      }
    ]
  } : null;

  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-zinc-950 text-zinc-900 dark:text-zinc-100 font-[family-name:var(--font-geist-sans)] transition-colors">
      {/* Article Schema Injection */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* FAQ Schema Injection */}
      {faqJsonLd && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
        />
      )}

      {/* Navigation Header */}
      <header className="border-b border-zinc-200 dark:border-zinc-800 bg-white/80 dark:bg-zinc-900/80 backdrop-blur-md sticky top-0 z-50 transition-colors">
        <div className="max-w-5xl mx-auto px-4 h-16 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2 font-bold text-lg text-zinc-900 dark:text-white">
            <span>✨ QuickCalc</span>
          </Link>
          <div className="flex items-center gap-4">
            <Link href="/" className="text-sm font-medium text-zinc-600 dark:text-zinc-400 hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors">
              Home
            </Link>
            <span className="text-sm font-medium text-zinc-300 dark:text-zinc-700 font-normal">|</span>
            <Link href="/blog" className="text-sm font-medium text-zinc-600 dark:text-zinc-400 hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors">
              Blog
            </Link>
            <span className="text-sm font-medium text-zinc-300 dark:text-zinc-700 font-normal">|</span>
            <div className="text-sm font-medium text-zinc-500 dark:text-zinc-400 max-w-[150px] truncate hidden sm:block">
              {article.title}
            </div>
            <span className="text-sm font-medium text-zinc-300 dark:text-zinc-700 font-normal hidden sm:inline">|</span>
            <ThemeToggle />
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-4xl mx-auto px-4 py-12 sm:py-16">
        {/* Back Link */}
        <div className="mb-8">
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 text-sm font-semibold text-emerald-600 dark:text-emerald-400 hover:underline"
          >
            &larr; Back to all articles
          </Link>
        </div>

        {/* Article Meta Header */}
        <header className="mb-12 border-b border-zinc-200 dark:border-zinc-800 pb-8">
          <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-xs font-semibold text-zinc-500 dark:text-zinc-400 mb-4">
            <span className={`${article.textColor} uppercase tracking-wider`}>{article.category}</span>
            <span className="text-zinc-300 dark:text-zinc-700">•</span>
            <span>Published: {article.date}</span>
            <span className="text-zinc-300 dark:text-zinc-700">•</span>
            <span className="font-semibold text-zinc-700 dark:text-zinc-300">Last updated: July 24, 2026</span>
            <span className="text-zinc-300 dark:text-zinc-700">•</span>
            <span>{article.readTime}</span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-zinc-900 dark:text-white leading-tight mb-6">
            {article.title}
          </h1>

          <p className="text-lg sm:text-xl text-zinc-600 dark:text-zinc-400 leading-relaxed font-medium">
            {article.description}
          </p>
        </header>

        {/* Article Body */}
        <article className="prose prose-zinc dark:prose-invert max-w-none space-y-6 text-zinc-700 dark:text-zinc-300 leading-relaxed">
          <ArticleBody />
        </article>

        {/* Share Buttons Component */}
        <div className="mt-12 pt-8 border-t border-zinc-200 dark:border-zinc-800">
          <ShareButtons url={`https://quickcalc.cloud/blog/${article.slug}`} title={article.title} />
        </div>

        {/* Action Bottom Nav */}
        <div className="border-t border-zinc-200 dark:border-zinc-800 mt-16 pt-8 text-center sm:text-left flex flex-col sm:flex-row justify-between items-center gap-4">
          <Link
            href="/blog"
            className="text-sm font-semibold text-zinc-500 hover:text-zinc-900 dark:hover:text-white"
          >
            &larr; Back to all articles
          </Link>

          <Link
            href="/"
            className="text-sm font-semibold text-emerald-600 dark:text-emerald-400 hover:underline"
          >
            Explore our clinical and financial tools &rarr;
          </Link>
        </div>
      </main>

      {/* Footer */}
      <Footer customText="Practical science breakdowns, mathematical modeling." />
    </div>
  );
}
