export interface ShiftEntry {
  id: string;
  dayName: string;
  startTime: string; // e.g., "09:00" (24h) or "09:00 AM" (12h)
  endTime: string;   // e.g., "17:00" (24h) or "05:00 PM" (12h)
  breakMinutes: number;
  enabled: boolean;
}

export interface DayShiftResult {
  id: string;
  dayName: string;
  startTimeFormatted: string;
  endTimeFormatted: string;
  breakMinutes: number;
  grossMinutes: number;
  netMinutes: number;
  grossHours: number;
  netHours: number;
  isOvernight: boolean;
  enabled: boolean;
}

export interface TimesheetAnalysisResult {
  dayResults: DayShiftResult[];
  totalActiveDays: number;
  totalGrossHours: number;
  totalBreakMinutes: number;
  totalBreakHours: number;
  totalNetHours: number;
  regularHours: number;
  overtimeHours: number;
  hourlyRate: number;
  overtimeEnabled: boolean;
  overtimeThresholdHours: number;
  overtimeMultiplier: number;
  regularPay: number;
  overtimePay: number;
  totalGrossPay: number;
}

export function parseTimeToMinutes(timeStr: string): number {
  if (!timeStr || !timeStr.trim()) return 0;

  const str = timeStr.trim().toUpperCase();
  const is12Hour = str.includes("AM") || str.includes("PM");

  if (is12Hour) {
    const isPM = str.includes("PM");
    const isAM = str.includes("AM");
    const cleanStr = str.replace(/(AM|PM)/g, "").trim();
    const parts = cleanStr.split(":");
    let hours = parseInt(parts[0] || "0", 10);
    const minutes = parseInt(parts[1] || "0", 10);

    if (isNaN(hours)) hours = 0;
    if (isPM && hours < 12) hours += 12;
    if (isAM && hours === 12) hours = 0;

    return hours * 60 + (isNaN(minutes) ? 0 : minutes);
  }

  // 24-hour format HH:MM
  const parts = str.split(":");
  let hours = parseInt(parts[0] || "0", 10);
  let minutes = parseInt(parts[1] || "0", 10);

  if (isNaN(hours)) hours = 0;
  if (isNaN(minutes)) minutes = 0;

  return hours * 60 + minutes;
}

export function formatMinutesToTimeString(totalMinutes: number, use12Hour: boolean = true): string {
  let mins = Math.floor(totalMinutes) % 1440;
  if (mins < 0) mins += 1440;

  const hours = Math.floor(mins / 60);
  const minutes = mins % 60;

  if (use12Hour) {
    const period = hours >= 12 ? "PM" : "AM";
    let displayHour = hours % 12;
    if (displayHour === 0) displayHour = 12;
    const formattedMin = minutes < 10 ? `0${minutes}` : `${minutes}`;
    return `${displayHour}:${formattedMin} ${period}`;
  } else {
    const formattedHour = hours < 10 ? `0${hours}` : `${hours}`;
    const formattedMin = minutes < 10 ? `0${minutes}` : `${minutes}`;
    return `${formattedHour}:${formattedMin}`;
  }
}

export function calculateShiftHours(
  startTimeStr: string,
  endTimeStr: string,
  breakMins: number
): { grossMins: number; netMins: number; grossHours: number; netHours: number; isOvernight: boolean } {
  const startMins = parseTimeToMinutes(startTimeStr);
  let endMins = parseTimeToMinutes(endTimeStr);

  if (!startTimeStr || !endTimeStr) {
    return { grossMins: 0, netMins: 0, grossHours: 0, netHours: 0, isOvernight: false };
  }

  let isOvernight = false;
  if (endMins <= startMins) {
    endMins += 1440; // Overnight shift crossing midnight
    isOvernight = true;
  }

  const grossMins = endMins - startMins;
  const validBreak = Math.max(0, breakMins || 0);
  const netMins = Math.max(0, grossMins - validBreak);

  const grossHours = Math.round((grossMins / 60) * 100) / 100;
  const netHours = Math.round((netMins / 60) * 100) / 100;

  return { grossMins, netMins, grossHours, netHours, isOvernight };
}

export function calculateTimesheet(
  shifts: ShiftEntry[],
  hourlyRate: number = 0,
  overtimeEnabled: boolean = true,
  overtimeThresholdHours: number = 40,
  overtimeMultiplier: number = 1.5,
  use12HourFormat: boolean = true
): TimesheetAnalysisResult {
  const dayResults: DayShiftResult[] = [];

  let totalGrossMins = 0;
  let totalBreakMinutes = 0;
  let totalNetMins = 0;
  let totalActiveDays = 0;

  for (const shift of shifts) {
    if (!shift.enabled) {
      dayResults.push({
        id: shift.id,
        dayName: shift.dayName,
        startTimeFormatted: "-",
        endTimeFormatted: "-",
        breakMinutes: 0,
        grossMinutes: 0,
        netMinutes: 0,
        grossHours: 0,
        netHours: 0,
        isOvernight: false,
        enabled: false,
      });
      continue;
    }

    const startMins = parseTimeToMinutes(shift.startTime);
    const endMinsRaw = parseTimeToMinutes(shift.endTime);

    const { grossMins, netMins, grossHours, netHours, isOvernight } = calculateShiftHours(
      shift.startTime,
      shift.endTime,
      shift.breakMinutes
    );

    totalGrossMins += grossMins;
    totalBreakMinutes += Math.max(0, shift.breakMinutes || 0);
    totalNetMins += netMins;
    totalActiveDays++;

    dayResults.push({
      id: shift.id,
      dayName: shift.dayName,
      startTimeFormatted: formatMinutesToTimeString(startMins, use12HourFormat),
      endTimeFormatted: formatMinutesToTimeString(endMinsRaw, use12HourFormat),
      breakMinutes: shift.breakMinutes || 0,
      grossMinutes: grossMins,
      netMinutes: netMins,
      grossHours,
      netHours,
      isOvernight,
      enabled: true,
    });
  }

  const totalGrossHours = Math.round((totalGrossMins / 60) * 100) / 100;
  const totalBreakHours = Math.round((totalBreakMinutes / 60) * 100) / 100;
  const totalNetHours = Math.round((totalNetMins / 60) * 100) / 100;

  let regularHours = totalNetHours;
  let overtimeHours = 0;

  if (overtimeEnabled && totalNetHours > overtimeThresholdHours) {
    regularHours = overtimeThresholdHours;
    overtimeHours = Math.round((totalNetHours - overtimeThresholdHours) * 100) / 100;
  }

  const validRate = Math.max(0, hourlyRate || 0);
  const regularPay = Math.round(regularHours * validRate * 100) / 100;
  const overtimePay = Math.round(overtimeHours * validRate * overtimeMultiplier * 100) / 100;
  const totalGrossPay = Math.round((regularPay + overtimePay) * 100) / 100;

  return {
    dayResults,
    totalActiveDays,
    totalGrossHours,
    totalBreakMinutes,
    totalBreakHours,
    totalNetHours,
    regularHours,
    overtimeHours,
    hourlyRate: validRate,
    overtimeEnabled,
    overtimeThresholdHours,
    overtimeMultiplier,
    regularPay,
    overtimePay,
    totalGrossPay,
  };
}

export function getWorkHoursExplanationSteps(result: TimesheetAnalysisResult): string[] {
  const steps: string[] = [];

  steps.push(
    `Step 1 (Daily Shift Calculation): Calculated shift durations across ${result.totalActiveDays} active working days. Summed total shift time of ${result.totalGrossHours} gross hours minus ${result.totalBreakMinutes} minutes (${result.totalBreakHours} hrs) of unpaid break time.`
  );
  steps.push(
    `Step 2 (Weekly Hour Breakdown): Total net hours worked = ${result.totalNetHours} hrs. ${
      result.overtimeEnabled && result.overtimeHours > 0
        ? `Applied overtime threshold of ${result.overtimeThresholdHours} hrs/week: ${result.regularHours} regular hours + ${result.overtimeHours} overtime hours.`
        : `Regular hours = ${result.totalNetHours} hrs (no overtime applied).`
    }`
  );

  if (result.hourlyRate > 0) {
    steps.push(
      `Step 3 (Gross Earnings Calculation): Regular Pay = ${result.regularHours} hrs × $${result.hourlyRate.toFixed(
        2
      )}/hr = $${result.regularPay.toFixed(2)}.${
        result.overtimeHours > 0
          ? ` Overtime Pay = ${result.overtimeHours} hrs × ($${result.hourlyRate.toFixed(2)} × ${
              result.overtimeMultiplier
            }) = $${result.overtimePay.toFixed(2)}. Total Estimated Gross Pay = $${result.totalGrossPay.toFixed(2)}.`
          : ` Total Estimated Gross Pay = $${result.totalGrossPay.toFixed(2)}.`
      }`
    );
  }

  return steps;
}

export const DEFAULT_WEEK_SHIFTS: ShiftEntry[] = [
  { id: "1", dayName: "Monday", startTime: "09:00", endTime: "17:00", breakMinutes: 30, enabled: true },
  { id: "2", dayName: "Tuesday", startTime: "09:00", endTime: "17:00", breakMinutes: 30, enabled: true },
  { id: "3", dayName: "Wednesday", startTime: "09:00", endTime: "17:00", breakMinutes: 30, enabled: true },
  { id: "4", dayName: "Thursday", startTime: "09:00", endTime: "17:00", breakMinutes: 30, enabled: true },
  { id: "5", dayName: "Friday", startTime: "09:00", endTime: "17:00", breakMinutes: 30, enabled: true },
  { id: "6", dayName: "Saturday", startTime: "09:00", endTime: "17:00", breakMinutes: 0, enabled: false },
  { id: "7", dayName: "Sunday", startTime: "09:00", endTime: "17:00", breakMinutes: 0, enabled: false },
];
