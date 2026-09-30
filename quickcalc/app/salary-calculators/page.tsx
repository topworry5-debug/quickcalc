import { redirect } from "next/navigation";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Salary & Paycheck Calculators",
  description: "Calculate take-home salary across all 50 US states.",
};

export default function SalaryCalculatorsRedirect() {
  redirect("/calculators/paycheck-calculator");
}
