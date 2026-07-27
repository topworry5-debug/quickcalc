/**
 * Running Pace Calculator Utilities
 */

export interface PaceResult {
  pacePerKm: string;   // MM:SS
  pacePerMile: string; // MM:SS
  speedKph: string;    // km/h
  speedMph: string;    // mph
}

/**
 * Parses time string (HH:MM:SS, MM:SS, or just seconds) or separate inputs into total seconds
 */
export function timeToSeconds(hours: number, minutes: number, seconds: number): number {
  return (hours * 3600) + (minutes * 60) + seconds;
}

/**
 * Formats total seconds into HH:MM:SS or MM:SS
 */
export function formatSecondsToTime(totalSeconds: number): string {
  if (isNaN(totalSeconds) || totalSeconds <= 0 || !isFinite(totalSeconds)) return "00:00";
  
  const h = Math.floor(totalSeconds / 3600);
  const m = Math.floor((totalSeconds % 3600) / 60);
  const s = Math.round(totalSeconds % 60);
  
  const mStr = m.toString().padStart(2, "0");
  const sStr = s.toString().padStart(2, "0");
  
  if (h > 0) {
    return `${h}:${mStr}:${sStr}`;
  }
  return `${mStr}:${sStr}`;
}

/**
 * Formats seconds per unit (km or mile) as MM:SS/unit pace
 */
export function formatPace(secondsPerUnit: number): string {
  if (isNaN(secondsPerUnit) || secondsPerUnit <= 0 || !isFinite(secondsPerUnit)) return "00:00";
  const m = Math.floor(secondsPerUnit / 60);
  const s = Math.round(secondsPerUnit % 60);
  return `${m.toString().padStart(2, "0")}:${s.toString().padStart(2, "0")}`;
}

/**
 * Converts pace string "MM:SS" into total seconds per unit
 */
export function paceToSeconds(paceStr: string): number {
  const parts = paceStr.split(":");
  if (parts.length === 2) {
    const m = parseInt(parts[0], 10) || 0;
    const s = parseInt(parts[1], 10) || 0;
    return (m * 60) + s;
  } else if (parts.length === 1) {
    return parseInt(parts[0], 10) || 0;
  }
  return 0;
}
