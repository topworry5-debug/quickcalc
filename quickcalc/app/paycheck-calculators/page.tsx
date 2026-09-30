import { redirect } from "next/navigation";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Paycheck Calculators",
  description: "Calculate take-home pay across all 50 US states.",
};

export default function LegacyPaycheckCalculatorsRedirect() {
  redirect("/calculators/paycheck-calculator");
}
