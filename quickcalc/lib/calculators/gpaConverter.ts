/**
 * GPA Converter Logic
 * 
 * Converts percentage or letter grades from US, UK, Canada, and Pakistan/India
 * grading systems to the standard US 4.0 GPA scale.
 */

export type GradingSystem = 
  | "us-percentage" 
  | "us-letter" 
  | "uk-letter" 
  | "pakistan-india-percentage" 
  | "canada-percentage";

export interface GPAConverterResult {
  gpa: number;       // standard 4.0 GPA scale
  letterEquivalent: string; // letter grade mapping
  percentageEquivalent: string; // percentage band representation
}

export function convertToGPA(system: GradingSystem, input: string): GPAConverterResult {
  let gpa = 0.0;
  let letterEquivalent = "F";
  let percentageEquivalent = "0-59%";

  const normalizedInput = input.trim().toUpperCase();

  switch (system) {
    case "us-letter": {
      const gpaMap: Record<string, number> = {
        "A+": 4.0, "A": 4.0, "A-": 3.7,
        "B+": 3.3, "B": 3.0, "B-": 2.7,
        "C+": 2.3, "C": 2.0, "C-": 1.7,
        "D+": 1.3, "D": 1.0, "D-": 0.7,
        "F": 0.0
      };
      gpa = gpaMap[normalizedInput] !== undefined ? gpaMap[normalizedInput] : 0.0;
      letterEquivalent = normalizedInput;
      percentageEquivalent = gpa >= 4.0 ? "93-100%" : gpa >= 3.7 ? "90-92%" : gpa >= 3.0 ? "80-89%" : gpa >= 2.0 ? "70-79%" : gpa >= 1.0 ? "60-69%" : "Under 60%";
      break;
    }

    case "us-percentage": {
      const pct = parseFloat(normalizedInput);
      if (isNaN(pct) || pct < 0) {
        gpa = 0.0;
      } else if (pct >= 93) {
        gpa = 4.0; letterEquivalent = "A"; percentageEquivalent = "93-100%";
      } else if (pct >= 90) {
        gpa = 3.7; letterEquivalent = "A-"; percentageEquivalent = "90-92%";
      } else if (pct >= 87) {
        gpa = 3.3; letterEquivalent = "B+"; percentageEquivalent = "87-89%";
      } else if (pct >= 83) {
        gpa = 3.0; letterEquivalent = "B"; percentageEquivalent = "83-86%";
      } else if (pct >= 80) {
        gpa = 2.7; letterEquivalent = "B-"; percentageEquivalent = "80-82%";
      } else if (pct >= 77) {
        gpa = 2.3; letterEquivalent = "C+"; percentageEquivalent = "77-79%";
      } else if (pct >= 73) {
        gpa = 2.0; letterEquivalent = "C"; percentageEquivalent = "73-76%";
      } else if (pct >= 70) {
        gpa = 1.7; letterEquivalent = "C-"; percentageEquivalent = "70-72%";
      } else if (pct >= 67) {
        gpa = 1.3; letterEquivalent = "D+"; percentageEquivalent = "67-69%";
      } else if (pct >= 60) {
        gpa = 1.0; letterEquivalent = "D"; percentageEquivalent = "60-66%";
      } else {
        gpa = 0.0; letterEquivalent = "F"; percentageEquivalent = "0-59%";
      }
      break;
    }

    case "uk-letter": {
      // UK classification mapping: 1st (4.0), 2:1 (3.3 - 3.7), 2:2 (3.0), 3rd (2.3), Pass (1.5), Fail (0)
      if (["1ST", "FIRST", "1"].includes(normalizedInput)) {
        gpa = 4.0; letterEquivalent = "A (1st Class)"; percentageEquivalent = "70%+ (UK)";
      } else if (["2:1", "2.1", "UPPER SECOND"].includes(normalizedInput)) {
        gpa = 3.5; letterEquivalent = "B+ (2:1 Upper)"; percentageEquivalent = "60-69% (UK)";
      } else if (["2:2", "2.2", "LOWER SECOND"].includes(normalizedInput)) {
        gpa = 3.0; letterEquivalent = "B (2:2 Lower)"; percentageEquivalent = "50-59% (UK)";
      } else if (["3RD", "THIRD", "3"].includes(normalizedInput)) {
        gpa = 2.3; letterEquivalent = "C (3rd Class)"; percentageEquivalent = "40-49% (UK)";
      } else if (["PASS"].includes(normalizedInput)) {
        gpa = 1.5; letterEquivalent = "D (Pass)"; percentageEquivalent = "35-39% (UK)";
      } else {
        gpa = 0.0; letterEquivalent = "F (Fail)"; percentageEquivalent = "Under 35% (UK)";
      }
      break;
    }

    case "pakistan-india-percentage": {
      const pct = parseFloat(normalizedInput);
      if (isNaN(pct) || pct < 0) {
        gpa = 0.0;
      } else if (pct >= 80) {
        gpa = 4.0; letterEquivalent = "A (First Class with Dist.)"; percentageEquivalent = "80-100%";
      } else if (pct >= 70) {
        gpa = 3.5; letterEquivalent = "B+ (First Class)"; percentageEquivalent = "70-79%";
      } else if (pct >= 60) {
        gpa = 3.0; letterEquivalent = "B (Second Class Upper)"; percentageEquivalent = "60-69%";
      } else if (pct >= 50) {
        gpa = 2.0; letterEquivalent = "C (Second Class Lower)"; percentageEquivalent = "50-59%";
      } else if (pct >= 40) {
        gpa = 1.0; letterEquivalent = "D (Pass Class)"; percentageEquivalent = "40-49%";
      } else {
        gpa = 0.0; letterEquivalent = "F (Fail)"; percentageEquivalent = "Under 40%";
      }
      break;
    }

    case "canada-percentage": {
      const pct = parseFloat(normalizedInput);
      if (isNaN(pct) || pct < 0) {
        gpa = 0.0;
      } else if (pct >= 90) {
        gpa = 4.0; letterEquivalent = "A+"; percentageEquivalent = "90-100%";
      } else if (pct >= 85) {
        gpa = 3.9; letterEquivalent = "A"; percentageEquivalent = "85-89%";
      } else if (pct >= 80) {
        gpa = 3.7; letterEquivalent = "A-"; percentageEquivalent = "80-84%";
      } else if (pct >= 77) {
        gpa = 3.3; letterEquivalent = "B+"; percentageEquivalent = "77-79%";
      } else if (pct >= 73) {
        gpa = 3.0; letterEquivalent = "B"; percentageEquivalent = "73-76%";
      } else if (pct >= 70) {
        gpa = 2.7; letterEquivalent = "B-"; percentageEquivalent = "70-72%";
      } else if (pct >= 67) {
        gpa = 2.3; letterEquivalent = "C+"; percentageEquivalent = "67-69%";
      } else if (pct >= 63) {
        gpa = 2.0; letterEquivalent = "C"; percentageEquivalent = "63-66%";
      } else if (pct >= 60) {
        gpa = 1.7; letterEquivalent = "C-"; percentageEquivalent = "60-62%";
      } else if (pct >= 50) {
        gpa = 1.0; letterEquivalent = "D"; percentageEquivalent = "50-59%";
      } else {
        gpa = 0.0; letterEquivalent = "F"; percentageEquivalent = "Under 50%";
      }
      break;
    }
  }

  return {
    gpa: parseFloat(gpa.toFixed(2)),
    letterEquivalent,
    percentageEquivalent,
  };
}
