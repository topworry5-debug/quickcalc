/**
 * Sleep Cycle Calculator Logic
 * 
 * Standard sleep cycle duration: 90 minutes.
 * Average time to fall asleep: 15 minutes.
 * 
 * Recommended sleep cycles: 6 (9 hrs), 5 (7.5 hrs), 4 (6 hrs), 3 (4.5 hrs)
 */

export interface SleepTimeOption {
  time: string; // "10:30 PM"
  hours: number; // 9, 7.5, 6, 4.5
  cycles: number;
}

// Helper to format Date objects into beautiful AM/PM strings
export function formatTime12Hour(date: Date): string {
  let hours = date.getHours();
  const minutes = date.getMinutes();
  const ampm = hours >= 12 ? "PM" : "AM";
  hours = hours % 12;
  hours = hours ? hours : 12; // the hour '0' should be '12'
  const minutesStr = minutes < 10 ? "0" + minutes : minutes;
  return `${hours}:${minutesStr} ${ampm}`;
}

// Mode 1: Calculates bedtimes if you want to wake up at a specific time
export function getBedtimesForWakeUp(wakeUpTimeStr: string): SleepTimeOption[] {
  // wakeUpTimeStr: "07:00" format
  const [hours, minutes] = wakeUpTimeStr.split(":").map(Number);
  
  const options: SleepTimeOption[] = [];
  const cyclesToCalculate = [6, 5, 4, 3]; // 9h, 7.5h, 6h, 4.5h

  for (const cycles of cyclesToCalculate) {
    const targetDate = new Date();
    targetDate.setHours(hours, minutes, 0, 0);
    
    // Subtract cycles * 90 minutes + 15 minutes to fall asleep
    const totalMinutesToSubtract = cycles * 90 + 15;
    targetDate.setMinutes(targetDate.getMinutes() - totalMinutesToSubtract);
    
    options.push({
      time: formatTime12Hour(targetDate),
      hours: cycles * 1.5,
      cycles,
    });
  }

  return options;
}

// Mode 2: Calculates wake up times if you sleep right now
export function getWakeUpTimesForSleepNow(): SleepTimeOption[] {
  const options: SleepTimeOption[] = [];
  const cyclesToCalculate = [3, 4, 5, 6]; // 4.5h, 6h, 7.5h, 9h
  
  for (const cycles of cyclesToCalculate) {
    const targetDate = new Date(); // Current time
    
    // Add 15 minutes to fall asleep + cycles * 90 minutes
    const totalMinutesToAdd = 15 + cycles * 90;
    targetDate.setMinutes(targetDate.getMinutes() + totalMinutesToAdd);
    
    options.push({
      time: formatTime12Hour(targetDate),
      hours: cycles * 1.5,
      cycles,
    });
  }

  return options;
}
