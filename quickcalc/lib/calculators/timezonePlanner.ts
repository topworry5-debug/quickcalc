/**
 * Timezone Meeting Planner Utilities
 */

export interface TargetCity {
  name: string;
  timezone: string;
  country: string;
}

export const BUSINESS_HUBS: TargetCity[] = [
  { name: "Los Angeles", timezone: "America/Los_Angeles", country: "United States" },
  { name: "New York", timezone: "America/New_York", country: "United States" },
  { name: "London", timezone: "Europe/London", country: "United Kingdom" },
  { name: "Paris", timezone: "Europe/Paris", country: "France" },
  { name: "Dubai", timezone: "Asia/Dubai", country: "United Arab Emirates" },
  { name: "Mumbai", timezone: "Asia/Kolkata", country: "India" },
  { name: "Singapore", timezone: "Asia/Singapore", country: "Singapore" },
  { name: "Tokyo", timezone: "Asia/Tokyo", country: "Japan" },
  { name: "Sydney", timezone: "Australia/Sydney", country: "Australia" },
];

export interface ComparisonRow {
  name: string;
  timezone: string;
  country: string;
  formattedTime: string;
  formattedDate: string;
  hour: number;
  isWorkingHours: boolean; // 8 AM to 7 PM (19:00) inclusive? E.g., >= 8 and <= 19
  dayOffsetLabel: string; // "Today", "Tomorrow", "Yesterday"
}

export interface TimezonePlanResult {
  rows: ComparisonRow[];
}

/**
 * Parses a "HH:MM" input time and builds a Date object in the source timezone.
 * Returns the corresponding Date object.
 */
export function getSourceDate(timeStr: string, dateStr: string, sourceTimezone: string): Date {
  const [hours, minutes] = timeStr.split(":").map(Number);
  const dateParts = dateStr ? dateStr.split("-").map(Number) : []; // YYYY, MM, DD
  
  // Base date in user local or UTC, then we parse timezone-safe
  let dateObj = new Date();
  if (dateParts.length === 3) {
    // Note: JS month is 0-indexed
    dateObj = new Date(dateParts[0], dateParts[1] - 1, dateParts[2], hours, minutes, 0, 0);
  } else {
    dateObj.setHours(hours, minutes, 0, 0);
  }

  // To match the timezone exactly, we can construct the date correctly:
  // Since we want the time to correspond to the time in *sourceTimezone*, we can use Intl to offset it
  // A clean standard way to parse time in a specific timezone:
  const formatter = new Intl.DateTimeFormat("en-US", {
    timeZone: sourceTimezone,
    year: "numeric",
    month: "numeric",
    day: "numeric",
    hour: "numeric",
    minute: "numeric",
    second: "numeric",
    hour12: false,
  });

  // Calculate difference
  const sourceParts = formatter.formatToParts(dateObj);
  const partMap: Record<string, string> = {};
  sourceParts.forEach(p => { partMap[p.type] = p.value; });

  const yearDiff = Number(partMap.year) - dateObj.getFullYear();
  const dayDiff = Number(partMap.day) - dateObj.getDate();
  const hourDiff = Number(partMap.hour) - dateObj.getHours();
  const minDiff = Number(partMap.minute) - dateObj.getMinutes();

  // Shift the dateObj to correct for the timezone offset
  const msOffset = ((((yearDiff * 365 + dayDiff) * 24 + hourDiff) * 60 + minDiff) * 60) * 1000;
  return new Date(dateObj.getTime() - msOffset);
}

/**
 * Formats a Date object into a specific timezone and determines working hours & date offsets.
 */
export function calculateTimezoneOverlap(
  baseDate: Date,
  sourceTimezone: string,
  selectedHubs: string[]
): TimezonePlanResult {
  const selectedList = BUSINESS_HUBS.filter(h => selectedHubs.includes(h.timezone));

  // Get date in source timezone for day comparison
  const sourceFormatter = new Intl.DateTimeFormat("en-US", {
    timeZone: sourceTimezone,
    year: "numeric",
    month: "numeric",
    day: "numeric",
  });
  const sourceDateStr = sourceFormatter.format(baseDate);

  const rows: ComparisonRow[] = selectedList.map(hub => {
    // Format local time
    const timeFormatter = new Intl.DateTimeFormat("en-US", {
      timeZone: hub.timezone,
      hour: "numeric",
      minute: "2-digit",
      hour12: true,
    });

    const dateFormatter = new Intl.DateTimeFormat("en-US", {
      timeZone: hub.timezone,
      weekday: "short",
      month: "short",
      day: "numeric",
    });

    // Get 24h numerical hour for working hours detection
    const hourFormatter = new Intl.DateTimeFormat("en-US", {
      timeZone: hub.timezone,
      hour: "numeric",
      hour12: false,
    });

    const formattedTime = timeFormatter.format(baseDate);
    const formattedDate = dateFormatter.format(baseDate);
    const localHour = parseInt(hourFormatter.format(baseDate), 10);

    // Working hours logic: 8am to 7pm (19:00) inclusive
    const isWorkingHours = localHour >= 8 && localHour <= 19;

    // Day offset comparison
    const hubFormatter = new Intl.DateTimeFormat("en-US", {
      timeZone: hub.timezone,
      year: "numeric",
      month: "numeric",
      day: "numeric",
    });
    const hubDateStr = hubFormatter.format(baseDate);

    let dayOffsetLabel = "Same Day";
    if (sourceDateStr !== hubDateStr) {
      const srcD = new Date(sourceDateStr);
      const hubD = new Date(hubDateStr);
      const diffTime = hubD.getTime() - srcD.getTime();
      const diffDays = Math.round(diffTime / (1000 * 60 * 60 * 24));
      
      if (diffDays === 1) {
        dayOffsetLabel = "+1 Day (Tomorrow)";
      } else if (diffDays === -1) {
        dayOffsetLabel = "−1 Day (Yesterday)";
      } else if (diffDays > 1) {
        dayOffsetLabel = `+${diffDays} Days`;
      } else if (diffDays < -1) {
        dayOffsetLabel = `${diffDays} Days`;
      }
    }

    return {
      name: hub.name,
      timezone: hub.timezone,
      country: hub.country,
      formattedTime,
      formattedDate,
      hour: localHour,
      isWorkingHours,
      dayOffsetLabel,
    };
  });

  return { rows };
}
