"use client";

import React, { Suspense } from "react";
import dynamic from "next/dynamic";
import { ExternalLink } from "lucide-react";
import { Tool } from "@/lib/toolsData";

function WidgetSkeleton() {
  return (
    <div className="p-8 text-center text-ink-muted animate-pulse">
      Loading interactive calculator...
    </div>
  );
}

// Dynamically import tool widgets for code splitting
const BMICalculatorWidget = dynamic(() => import("@/app/tools/bmi-calculator/BMICalculatorWidget"), {
  loading: () => <WidgetSkeleton />,
});
const TipCalculatorWidget = dynamic(() => import("@/app/tools/tip-calculator/TipCalculatorWidget"), {
  loading: () => <WidgetSkeleton />,
});
const PercentageCalculatorWidget = dynamic(() => import("@/app/tools/percentage-calculator/PercentageCalculatorWidget"), {
  loading: () => <WidgetSkeleton />,
});

const AgeCalculatorWidget = dynamic(() => import("@/app/tools/age-calculator/AgeCalculatorWidget"), { loading: () => <WidgetSkeleton /> });
const CalorieCalculatorWidget = dynamic(() => import("@/app/tools/calorie-calculator/CalorieCalculatorWidget"), { loading: () => <WidgetSkeleton /> });
const WaterIntakeCalculatorWidget = dynamic(() => import("@/app/tools/water-intake-calculator/WaterIntakeCalculatorWidget"), { loading: () => <WidgetSkeleton /> });
const PaceCalculatorWidget = dynamic(() => import("@/app/tools/pace-calculator/PaceCalculatorWidget"), { loading: () => <WidgetSkeleton /> });
const DueDateCalculatorWidget = dynamic(() => import("@/app/tools/due-date-calculator/DueDateCalculatorWidget"), { loading: () => <WidgetSkeleton /> });
const LoanCalculatorWidget = dynamic(() => import("@/app/tools/loan-calculator/LoanCalculatorWidget"), { loading: () => <WidgetSkeleton /> });
const SavingsGrowthCalculatorWidget = dynamic(() => import("@/app/tools/savings-growth-calculator/SavingsGrowthCalculatorWidget"), { loading: () => <WidgetSkeleton /> });
const RetirementCalculatorWidget = dynamic(() => import("@/app/tools/retirement-calculator/RetirementCalculatorWidget"), { loading: () => <WidgetSkeleton /> });
const SalaryTakeHomeCalculatorWidget = dynamic(() => import("@/app/tools/salary-take-home-calculator/SalaryTakeHomeCalculatorWidget"), { loading: () => <WidgetSkeleton /> });
const InflationCalculatorWidget = dynamic(() => import("@/app/tools/inflation-calculator/InflationCalculatorWidget"), { loading: () => <WidgetSkeleton /> });
const CurrencyConverterWidget = dynamic(() => import("@/app/tools/currency-converter/CurrencyConverterWidget"), { loading: () => <WidgetSkeleton /> });
const DiscountCalculatorWidget = dynamic(() => import("@/app/tools/discount-calculator/DiscountCalculatorWidget"), { loading: () => <WidgetSkeleton /> });
const GroupExpenseSplitterWidget = dynamic(() => import("@/app/tools/group-expense-splitter/GroupExpenseSplitterWidget"), { loading: () => <WidgetSkeleton /> });
const PasswordGeneratorWidget = dynamic(() => import("@/app/tools/password-generator/PasswordGeneratorWidget"), { loading: () => <WidgetSkeleton /> });
const WordCharacterCounterWidget = dynamic(() => import("@/app/tools/word-character-counter/WordCharacterCounterWidget"), { loading: () => <WidgetSkeleton /> });
const GPAConverterWidget = dynamic(() => import("@/app/tools/gpa-converter/GPAConverterWidget"), { loading: () => <WidgetSkeleton /> });
const HabitCostCalculatorWidget = dynamic(() => import("@/app/tools/habit-cost-calculator/HabitCostCalculatorWidget"), { loading: () => <WidgetSkeleton /> });
const PregnancyWeightGainCalculatorWidget = dynamic(() => import("@/app/tools/pregnancy-weight-gain-calculator/PregnancyWeightGainCalculatorWidget"), { loading: () => <WidgetSkeleton /> });
const SleepCycleCalculatorWidget = dynamic(() => import("@/app/tools/sleep-cycle-calculator/SleepCycleCalculatorWidget"), { loading: () => <WidgetSkeleton /> });
const IntermittentFastingWidget = dynamic(() => import("@/app/tools/intermittent-fasting-calculator/IntermittentFastingWidget"), { loading: () => <WidgetSkeleton /> });
const TimezonePlannerWidget = dynamic(() => import("@/app/tools/timezone-meeting-planner/TimezonePlannerWidget"), { loading: () => <WidgetSkeleton /> });
const ShoeSizeConverterWidget = dynamic(() => import("@/app/tools/shoe-size-converter/ShoeSizeConverterWidget"), { loading: () => <WidgetSkeleton /> });
const PaperFabricConverterWidget = dynamic(() => import("@/app/tools/paper-fabric-size-converter/PaperFabricConverterWidget"), { loading: () => <WidgetSkeleton /> });
const RegexTesterWidget = dynamic(() => import("@/app/tools/regex-tester/RegexTesterWidget"), { loading: () => <WidgetSkeleton /> });
const JSONCSVConverterWidget = dynamic(() => import("@/app/tools/json-csv-converter/JSONCSVConverterWidget"), { loading: () => <WidgetSkeleton /> });
const ColorPaletteGeneratorWidget = dynamic(() => import("@/app/tools/color-palette-generator/ColorPaletteGeneratorWidget"), { loading: () => <WidgetSkeleton /> });
const TravelTimeFuelWidget = dynamic(() => import("@/app/tools/travel-time-fuel-calculator/TravelTimeFuelWidget"), { loading: () => <WidgetSkeleton /> });
const ZakatCalculatorWidget = dynamic(() => import("@/app/tools/zakat-calculator/ZakatCalculatorWidget"), { loading: () => <WidgetSkeleton /> });
const BudgetCalculatorWidget = dynamic(() => import("@/app/tools/budget-calculator/BudgetCalculatorWidget"), { loading: () => <WidgetSkeleton /> });
const AITokenCostWidget = dynamic(() => import("@/app/tools/ai-token-cost-calculator/AITokenCostWidget"), { loading: () => <WidgetSkeleton /> });
const GFRCalculatorWidget = dynamic(() => import("@/app/tools/gfr-kidney-function-calculator/GFRCalculatorWidget"), { loading: () => <WidgetSkeleton /> });
const DigitalStorageWidget = dynamic(() => import("@/app/tools/digital-storage-converter/DigitalStorageWidget"), { loading: () => <WidgetSkeleton /> });
const SpeechTimeWidget = dynamic(() => import("@/app/tools/speech-time-calculator/SpeechTimeWidget"), { loading: () => <WidgetSkeleton /> });
const AtsResumeWidget = dynamic(() => import("@/app/tools/ats-resume-checker/AtsResumeWidget"), { loading: () => <WidgetSkeleton /> });
const ReadabilityWidget = dynamic(() => import("@/app/tools/readability-score-calculator/ReadabilityWidget"), { loading: () => <WidgetSkeleton /> });

interface EmbedWidgetClientProps {
  tool: Tool;
  slug: string;
}

export default function EmbedWidgetClient({ tool, slug }: EmbedWidgetClientProps) {
  const renderWidget = () => {
    switch (slug) {
      case "bmi-calculator":
        return <BMICalculatorWidget />;
      case "tip-calculator":
        return <TipCalculatorWidget />;
      case "percentage-calculator":
        return <PercentageCalculatorWidget />;
      case "age-calculator":
        return <AgeCalculatorWidget />;
      case "calorie-calculator":
        return <CalorieCalculatorWidget />;
      case "water-intake-calculator":
        return <WaterIntakeCalculatorWidget />;
      case "pace-calculator":
        return <PaceCalculatorWidget />;
      case "due-date-calculator":
        return <DueDateCalculatorWidget />;
      case "loan-calculator":
        return <LoanCalculatorWidget />;
      case "savings-growth-calculator":
        return <SavingsGrowthCalculatorWidget />;
      case "retirement-calculator":
        return <RetirementCalculatorWidget />;
      case "salary-take-home-calculator":
        return <SalaryTakeHomeCalculatorWidget />;
      case "inflation-calculator":
        return <InflationCalculatorWidget />;
      case "currency-converter":
        return <CurrencyConverterWidget />;
      case "discount-calculator":
        return <DiscountCalculatorWidget />;
      case "group-expense-splitter":
        return <GroupExpenseSplitterWidget />;
      case "password-generator":
        return <PasswordGeneratorWidget />;
      case "word-character-counter":
        return <WordCharacterCounterWidget />;
      case "gpa-converter":
        return <GPAConverterWidget />;
      case "habit-cost-calculator":
        return <HabitCostCalculatorWidget />;
      case "pregnancy-weight-gain-calculator":
        return <PregnancyWeightGainCalculatorWidget />;
      case "sleep-cycle-calculator":
        return <SleepCycleCalculatorWidget />;
      case "intermittent-fasting-calculator":
        return <IntermittentFastingWidget />;
      case "timezone-meeting-planner":
        return <TimezonePlannerWidget />;
      case "shoe-size-converter":
        return <ShoeSizeConverterWidget />;
      case "paper-fabric-size-converter":
        return <PaperFabricConverterWidget />;
      case "regex-tester":
        return <RegexTesterWidget />;
      case "json-csv-converter":
        return <JSONCSVConverterWidget />;
      case "color-palette-generator":
        return <ColorPaletteGeneratorWidget />;
      case "travel-time-fuel-calculator":
        return <TravelTimeFuelWidget />;
      case "zakat-calculator":
        return <ZakatCalculatorWidget />;
      case "budget-calculator":
        return <BudgetCalculatorWidget />;
      case "ai-token-cost-calculator":
        return <AITokenCostWidget />;
      case "gfr-kidney-function-calculator":
        return <GFRCalculatorWidget />;
      case "digital-storage-converter":
        return <DigitalStorageWidget />;
      case "speech-time-calculator":
        return <SpeechTimeWidget />;
      case "ats-resume-checker":
        return <AtsResumeWidget />;
      case "readability-score-calculator":
        return <ReadabilityWidget />;
      default:
        return <WidgetSkeleton />;
    }
  };

  return (
    <div className="min-h-screen bg-transparent p-2 sm:p-4 text-ink flex flex-col justify-between">
      <main className="w-full max-w-2xl mx-auto space-y-4">
        <Suspense fallback={<WidgetSkeleton />}>
          {renderWidget()}
        </Suspense>

        {/* Embedded Branded Attribution Footer */}
        <div className="mt-4 pt-3 border-t border-surface-border/60 flex items-center justify-between text-xs text-ink-muted">
          <div className="flex items-center gap-1.5 font-heading font-extrabold text-ink">
            <div className="w-5 h-5 rounded-lg bg-teal-500/10 border border-teal-500/20 text-teal-600 dark:text-teal-400 flex items-center justify-center font-bold text-xs">
              Q
            </div>
            <span>QuickCalc</span>
          </div>

          <a
            href={`https://quickcalc.cloud/tools/${slug}`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1 font-bold text-teal-600 dark:text-teal-400 hover:underline"
          >
            <span>Powered by QuickCalc {tool.title}</span>
            <ExternalLink size={12} />
          </a>
        </div>
      </main>
    </div>
  );
}
