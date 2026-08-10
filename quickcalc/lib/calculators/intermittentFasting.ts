/**
 * intermittentFasting.ts — Fasting schedule and live countdown calculations
 */

export type FastingProtocolId = "16-8" | "18-6" | "20-4" | "23-1" | "custom";
export type AnchorType = "eat_start" | "eat_end" | "fast_start";

export interface FastingProtocol {
  id: FastingProtocolId;
  name: string;
  fastingHours: number;
  eatingHours: number;
  description: string;
  popular?: boolean;
}

export const PROTOCOLS: FastingProtocol[] = [
  {
    id: "16-8",
    name: "16:8 Protocol",
    fastingHours: 16,
    eatingHours: 8,
    description: "16-hour fast with an 8-hour eating window. Most popular baseline protocol.",
    popular: true,
  },
  {
    id: "18-6",
    name: "18:6 Extended",
    fastingHours: 18,
    eatingHours: 6,
    description: "18-hour fast with a 6-hour eating window. Deeper fasting benefits.",
  },
  {
    id: "20-4",
    name: "20:4 Warrior",
    fastingHours: 20,
    eatingHours: 4,
    description: "20-hour fast with a 4-hour eating window. Concentrated intake phase.",
  },
  {
    id: "23-1",
    name: "OMAD (23:1)",
    fastingHours: 23,
    eatingHours: 1,
    description: "One Meal A Day. 23 hours fasting with 1 hour single meal window.",
  },
  {
    id: "custom",
    name: "Custom",
    fastingHours: 14,
    eatingHours: 10,
    description: "Custom fasting and eating window duration.",
  },
];

export interface TimelineSegment {
  type: "FASTING" | "EATING";
  startMinutes: number;
  endMinutes: number;
  widthPercent: number;
  label: string;
}

export interface FastingScheduleResult {
  protocolName: string;
  fastingHours: number;
  eatingHours: number;
  eatingStartStr: string; // e.g. "12:00 PM"
  eatingEndStr: string;   // e.g. "8:00 PM"
  fastingStartStr: string;// e.g. "8:00 PM"
  fastingEndStr: string;  // e.g. "12:00 PM"
  currentPhase: "FASTING" | "EATING";
  nextPhaseLabel: "Eating Window" | "Fasting Window";
  nextPhaseTimeStr: string;
  totalRemainingSeconds: number;
  remainingHours: number;
  remainingMinutes: number;
  remainingSeconds: number;
  countdownFormatted: string; // e.g. "04:15:22"
  progressPercent: number;
  nowPercent: number; // 0 - 100 position on 24h timeline
  nowTimeFormatted: string; // e.g. "3:45 PM"
  timelineSegments: TimelineSegment[];
}

/**
 * Format minutes past midnight into 12-hour AM/PM string
 */
export function formatMinutesTo12H(totalMinutes: number): string {
  const normalized = ((totalMinutes % 1440) + 1440) % 1440;
  let hours = Math.floor(normalized / 60);
  const minutes = Math.floor(normalized % 60);
  const ampm = hours >= 12 ? "PM" : "AM";
  hours = hours % 12;
  if (hours === 0) hours = 12;
  const minsStr = minutes < 10 ? `0${minutes}` : `${minutes}`;
  return `${hours}:${minsStr} ${ampm}`;
}

/**
 * Format Date into 12-hour AM/PM string
 */
export function formatDateTo12H(date: Date): string {
  let hours = date.getHours();
  const minutes = date.getMinutes();
  const ampm = hours >= 12 ? "PM" : "AM";
  hours = hours % 12;
  if (hours === 0) hours = 12;
  const minsStr = minutes < 10 ? `0${minutes}` : `${minutes}`;
  return `${hours}:${minsStr} ${ampm}`;
}

/**
 * Main calculation logic for Intermittent Fasting Schedule
 */
export function calculateFastingSchedule(
  protocolId: FastingProtocolId,
  customFastHours: number,
  anchorType: AnchorType,
  anchorTimeStr: string, // "HH:mm" e.g. "12:00"
  nowDate: Date = new Date()
): FastingScheduleResult {
  const protocol = PROTOCOLS.find((p) => p.id === protocolId) || PROTOCOLS[0];
  const fastingHours = protocolId === "custom" ? customFastHours : protocol.fastingHours;
  const eatingHours = 24 - fastingHours;

  // Parse anchor time "HH:mm"
  const [hStr, mStr] = anchorTimeStr.split(":");
  const anchorH = parseInt(hStr, 10) || 0;
  const anchorM = parseInt(mStr, 10) || 0;
  const anchorMinutes = anchorH * 60 + anchorM;

  let eatingStartMinutes = 0;
  let eatingEndMinutes = 0;

  if (anchorType === "eat_start") {
    eatingStartMinutes = anchorMinutes;
    eatingEndMinutes = (anchorMinutes + eatingHours * 60) % 1440;
  } else if (anchorType === "eat_end") {
    eatingEndMinutes = anchorMinutes;
    eatingStartMinutes = (anchorMinutes - eatingHours * 60 + 1440) % 1440;
  } else {
    // fast_start
    eatingEndMinutes = anchorMinutes;
    eatingStartMinutes = (anchorMinutes + fastingHours * 60) % 1440;
  }

  // Calculate current minutes past midnight for nowDate
  const nowH = nowDate.getHours();
  const nowM = nowDate.getMinutes();
  const nowS = nowDate.getSeconds();
  const nowMinutes = nowH * 60 + nowM + nowS / 60;
  const nowPercent = Math.min(100, Math.max(0, (nowMinutes / 1440) * 100));

  // Determine current phase
  let currentPhase: "FASTING" | "EATING" = "FASTING";
  if (eatingStartMinutes < eatingEndMinutes) {
    if (nowMinutes >= eatingStartMinutes && nowMinutes < eatingEndMinutes) {
      currentPhase = "EATING";
    } else {
      currentPhase = "FASTING";
    }
  } else {
    // Eating window crosses midnight
    if (nowMinutes >= eatingStartMinutes || nowMinutes < eatingEndMinutes) {
      currentPhase = "EATING";
    } else {
      currentPhase = "FASTING";
    }
  }

  // Determine next phase change target Date
  const nextTargetDate = new Date(nowDate);
  let targetMinutes = 0;

  if (currentPhase === "EATING") {
    targetMinutes = eatingEndMinutes;
  } else {
    targetMinutes = eatingStartMinutes;
  }

  const targetH = Math.floor(targetMinutes / 60);
  const targetM = Math.floor(targetMinutes % 60);

  nextTargetDate.setHours(targetH, targetM, 0, 0);

  // If nextTargetDate is in the past relative to nowDate, add 1 day
  if (nextTargetDate.getTime() <= nowDate.getTime()) {
    nextTargetDate.setDate(nextTargetDate.getDate() + 1);
  }

  const totalRemainingSeconds = Math.max(0, Math.floor((nextTargetDate.getTime() - nowDate.getTime()) / 1000));
  const remainingHours = Math.floor(totalRemainingSeconds / 3600);
  const remainingMinutes = Math.floor((totalRemainingSeconds % 3600) / 60);
  const remainingSeconds = totalRemainingSeconds % 60;

  const hh = remainingHours < 10 ? `0${remainingHours}` : `${remainingHours}`;
  const mm = remainingMinutes < 10 ? `0${remainingMinutes}` : `${remainingMinutes}`;
  const ss = remainingSeconds < 10 ? `0${remainingSeconds}` : `${remainingSeconds}`;
  const countdownFormatted = `${hh}:${mm}:${ss}`;

  // Progress percentage in current phase
  const totalPhaseDurationSeconds = (currentPhase === "EATING" ? eatingHours : fastingHours) * 3600;
  const elapsedSeconds = totalPhaseDurationSeconds - totalRemainingSeconds;
  const progressPercent = Math.min(100, Math.max(0, (elapsedSeconds / totalPhaseDurationSeconds) * 100));

  // Build 24-hour timeline segments
  const timelineSegments: TimelineSegment[] = [];
  if (eatingStartMinutes < eatingEndMinutes) {
    if (eatingStartMinutes > 0) {
      timelineSegments.push({
        type: "FASTING",
        startMinutes: 0,
        endMinutes: eatingStartMinutes,
        widthPercent: (eatingStartMinutes / 1440) * 100,
        label: `Fasting (${formatMinutesTo12H(0)} - ${formatMinutesTo12H(eatingStartMinutes)})`,
      });
    }
    timelineSegments.push({
      type: "EATING",
      startMinutes: eatingStartMinutes,
      endMinutes: eatingEndMinutes,
      widthPercent: ((eatingEndMinutes - eatingStartMinutes) / 1440) * 100,
      label: `Eating Window (${formatMinutesTo12H(eatingStartMinutes)} - ${formatMinutesTo12H(eatingEndMinutes)})`,
    });
    if (eatingEndMinutes < 1440) {
      timelineSegments.push({
        type: "FASTING",
        startMinutes: eatingEndMinutes,
        endMinutes: 1440,
        widthPercent: ((1440 - eatingEndMinutes) / 1440) * 100,
        label: `Fasting (${formatMinutesTo12H(eatingEndMinutes)} - 12:00 AM)`,
      });
    }
  } else {
    // Eating window crosses midnight
    if (eatingEndMinutes > 0) {
      timelineSegments.push({
        type: "EATING",
        startMinutes: 0,
        endMinutes: eatingEndMinutes,
        widthPercent: (eatingEndMinutes / 1440) * 100,
        label: `Eating Window (12:00 AM - ${formatMinutesTo12H(eatingEndMinutes)})`,
      });
    }
    timelineSegments.push({
      type: "FASTING",
      startMinutes: eatingEndMinutes,
      endMinutes: eatingStartMinutes,
      widthPercent: ((eatingStartMinutes - eatingEndMinutes) / 1440) * 100,
      label: `Fasting (${formatMinutesTo12H(eatingEndMinutes)} - ${formatMinutesTo12H(eatingStartMinutes)})`,
    });
    if (eatingStartMinutes < 1440) {
      timelineSegments.push({
        type: "EATING",
        startMinutes: eatingStartMinutes,
        endMinutes: 1440,
        widthPercent: ((1440 - eatingStartMinutes) / 1440) * 100,
        label: `Eating Window (${formatMinutesTo12H(eatingStartMinutes)} - 12:00 AM)`,
      });
    }
  }

  return {
    protocolName: protocolId === "custom" ? `Custom (${fastingHours}:${eatingHours})` : protocol.name,
    fastingHours,
    eatingHours,
    eatingStartStr: formatMinutesTo12H(eatingStartMinutes),
    eatingEndStr: formatMinutesTo12H(eatingEndMinutes),
    fastingStartStr: formatMinutesTo12H(eatingEndMinutes),
    fastingEndStr: formatMinutesTo12H(eatingStartMinutes),
    currentPhase,
    nextPhaseLabel: currentPhase === "FASTING" ? "Eating Window" : "Fasting Window",
    nextPhaseTimeStr: formatDateTo12H(nextTargetDate),
    totalRemainingSeconds,
    remainingHours,
    remainingMinutes,
    remainingSeconds,
    countdownFormatted,
    progressPercent,
    nowPercent,
    nowTimeFormatted: formatDateTo12H(nowDate),
    timelineSegments,
  };
}

export function getFastingExplanationSteps(result: FastingScheduleResult): string[] {
  return [
    `Protocol & Timing Configuration: Configured for ${result.protocolName} (${result.fastingHours}h fast / ${result.eatingHours}h eat). Your fasting window runs from ${result.fastingStartStr} to ${result.fastingEndStr}.`,
    `Current Phase Status: Right now, you are in the ${result.currentPhase === "FASTING" ? "Fasting Phase 🌙" : "Eating Phase 🍽️"}. Next phase (${result.nextPhaseLabel}) begins at ${result.nextPhaseTimeStr}.`,
    "Hydration & Fasting Rules: During your fasting window, stick strictly to zero-calorie beverages: plain water, sparkling water, black coffee, or unflavored green/herbal tea. Avoid all solid foods, juices, and caloric sweeteners to maintain insulin sensitivity.",
    "Breaking Your Fast Safely: When entering your eating window, break your fast with dense protein and healthy fats (e.g. eggs, chicken, avocado) before heavy carbohydrates to prevent rapid blood sugar spikes.",
  ];
}
