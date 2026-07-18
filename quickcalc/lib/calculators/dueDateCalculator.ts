/**
 * Due Date Calculation Logic
 * 
 * Formulas:
 *  - LMP method: due date = LMP + 280 days (Naegele's rule)
 *  - Conception method: due date = conception date + 266 days
 * 
 * Gestational Age calculation:
 *  - LMP method: gestational age = Current Date - LMP
 *  - Conception method: gestational age = (Current Date - Conception Date) + 14 days (since conception clinically occurs at gestational week 2)
 * 
 * Trimesters:
 *  - 1st Trimester: Weeks 1 - 12 (up to 12 weeks 6 days)
 *  - 2nd Trimester: Weeks 13 - 27 (up to 27 weeks 6 days)
 *  - 3rd Trimester: Weeks 28+
 */

export interface DueDateParams {
  method: "lmp" | "conception";
  dateString: string; // YYYY-MM-DD
}

export interface DueDateResult {
  dueDate: string; // Readable date
  gestationalAgeDays: number;
  weeks: number;
  days: number;
  trimester: "1st Trimester" | "2nd Trimester" | "3rd Trimester";
  progressPercent: number; // percentage through the 40 weeks (280 days)
}

export function calculateDueDate({ method, dateString }: DueDateParams): DueDateResult | string {
  if (!dateString) {
    return "Enter your date to see your estimated due date";
  }

  const selectedDate = new Date(dateString + "T12:00:00"); // Avoid timezone shift issues
  if (isNaN(selectedDate.getTime())) {
    return "Please select a valid date";
  }

  const today = new Date();
  today.setHours(12, 0, 0, 0);

  // Future date check
  if (selectedDate > today) {
    return "The selected date cannot be in the future. Please choose a past date.";
  }

  let gestationalAgeDays = 0;
  let dueDateObj: Date;

  if (method === "lmp") {
    // LMP method
    dueDateObj = new Date(selectedDate.getTime() + 280 * 24 * 60 * 60 * 1000);
    gestationalAgeDays = Math.floor((today.getTime() - selectedDate.getTime()) / (24 * 60 * 60 * 1000));
  } else {
    // Conception method
    dueDateObj = new Date(selectedDate.getTime() + 266 * 24 * 60 * 60 * 1000);
    gestationalAgeDays = Math.floor((today.getTime() - selectedDate.getTime()) / (24 * 60 * 60 * 1000)) + 14;
  }

  // Too far in the past check (dates more than 42 weeks ago)
  const maxDays = 42 * 7; // 294 days
  if (gestationalAgeDays > maxDays) {
    return "The entered date suggests a pregnancy of more than 42 weeks. Please check the date or consult your provider.";
  }

  if (gestationalAgeDays < 0) {
    gestationalAgeDays = 0;
  }

  const weeks = Math.floor(gestationalAgeDays / 7);
  const days = gestationalAgeDays % 7;

  let trimester: "1st Trimester" | "2nd Trimester" | "3rd Trimester" = "1st Trimester";
  if (weeks >= 28) {
    trimester = "3rd Trimester";
  } else if (weeks >= 13) {
    trimester = "2nd Trimester";
  }

  const progressPercent = Math.min(100, Math.max(0, parseFloat(((gestationalAgeDays / 280) * 100).toFixed(1))));

  const options: Intl.DateTimeFormatOptions = { weekday: "long", year: "numeric", month: "long", day: "numeric" };
  const formattedDueDate = dueDateObj.toLocaleDateString("en-US", options);

  return {
    dueDate: formattedDueDate,
    gestationalAgeDays,
    weeks,
    days,
    trimester,
    progressPercent,
  };
}
