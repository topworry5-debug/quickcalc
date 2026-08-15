export type SpeechPacePreset = "slow" | "average" | "fast" | "custom";

export const WPM_PRESETS = {
  slow: 110, // Formal speech, keynote, solemn address
  average: 140, // Standard presentation, lecture, conversational
  fast: 170, // Rapid presentation, podcast, energetic briefing
};

export interface TextStats {
  words: number;
  charsWithSpaces: number;
  charsNoSpaces: number;
  sentences: number;
  paragraphs: number;
}

export interface PaceEstimate {
  wpm: number;
  label: string;
  totalSeconds: number;
  minutes: number;
  seconds: number;
  formattedTime: string;
}

export interface TargetWordCountEstimate {
  wpm: number;
  label: string;
  targetWords: number;
}

export interface TextToTimeResult {
  stats: TextStats;
  selectedPaceWpm: number;
  selectedPaceTime: PaceEstimate;
  paceBreakdown: {
    slow: PaceEstimate;
    average: PaceEstimate;
    fast: PaceEstimate;
    custom?: PaceEstimate;
  };
}

export interface TimeToWordsResult {
  targetTotalMinutes: number;
  formattedDuration: string;
  selectedPaceWpm: number;
  selectedTargetWords: number;
  paceBreakdown: {
    slow: TargetWordCountEstimate;
    average: TargetWordCountEstimate;
    fast: TargetWordCountEstimate;
    custom?: TargetWordCountEstimate;
  };
}

export function countTextStats(text: string): TextStats {
  if (!text || !text.trim()) {
    return {
      words: 0,
      charsWithSpaces: 0,
      charsNoSpaces: 0,
      sentences: 0,
      paragraphs: 0,
    };
  }

  const trimmed = text.trim();
  const words = trimmed.split(/\s+/).filter(Boolean).length;
  const charsWithSpaces = text.length;
  const charsNoSpaces = text.replace(/\s/g, "").length;

  const sentencesArr = text.split(/[.!?]+/).filter((s) => s.trim().length > 0);
  const sentences = sentencesArr.length || 1;

  const paragraphsArr = text.split(/\n+/).filter((p) => p.trim().length > 0);
  const paragraphs = paragraphsArr.length;

  return {
    words,
    charsWithSpaces,
    charsNoSpaces,
    sentences,
    paragraphs,
  };
}

export function formatMinutesToTime(totalMinutes: number): {
  totalSeconds: number;
  minutes: number;
  seconds: number;
  formattedTime: string;
} {
  if (isNaN(totalMinutes) || totalMinutes <= 0) {
    return { totalSeconds: 0, minutes: 0, seconds: 0, formattedTime: "0 sec" };
  }

  const totalSeconds = Math.round(totalMinutes * 60);
  const minutes = Math.floor(totalSeconds / 60);
  const seconds = totalSeconds % 60;

  let formattedTime = "";
  if (minutes > 0 && seconds > 0) {
    formattedTime = `${minutes} min ${seconds} sec`;
  } else if (minutes > 0) {
    formattedTime = `${minutes} min`;
  } else {
    formattedTime = `${seconds} sec`;
  }

  return {
    totalSeconds,
    minutes,
    seconds,
    formattedTime,
  };
}

export function calculatePaceEstimate(
  wordCount: number,
  wpm: number,
  label: string
): PaceEstimate {
  const totalMinutes = wpm > 0 ? wordCount / wpm : 0;
  const timeObj = formatMinutesToTime(totalMinutes);
  return {
    wpm,
    label,
    ...timeObj,
  };
}

export function calculateTextToSpeechTime(
  text: string,
  selectedWpm: number = WPM_PRESETS.average
): TextToTimeResult {
  const stats = countTextStats(text);

  const slowEst = calculatePaceEstimate(stats.words, WPM_PRESETS.slow, "Slow (Keynote)");
  const averageEst = calculatePaceEstimate(stats.words, WPM_PRESETS.average, "Average (Presentation)");
  const fastEst = calculatePaceEstimate(stats.words, WPM_PRESETS.fast, "Fast (Conversational)");

  let customEst: PaceEstimate | undefined;
  if (
    selectedWpm !== WPM_PRESETS.slow &&
    selectedWpm !== WPM_PRESETS.average &&
    selectedWpm !== WPM_PRESETS.fast &&
    selectedWpm > 0
  ) {
    customEst = calculatePaceEstimate(stats.words, selectedWpm, `Custom (${selectedWpm} WPM)`);
  }

  const selectedPaceTime =
    selectedWpm === WPM_PRESETS.slow
      ? slowEst
      : selectedWpm === WPM_PRESETS.fast
      ? fastEst
      : selectedWpm === WPM_PRESETS.average
      ? averageEst
      : customEst || calculatePaceEstimate(stats.words, selectedWpm, `Custom (${selectedWpm} WPM)`);

  return {
    stats,
    selectedPaceWpm: selectedWpm,
    selectedPaceTime,
    paceBreakdown: {
      slow: slowEst,
      average: averageEst,
      fast: fastEst,
      custom: customEst,
    },
  };
}

export function calculateTimeToWordCount(
  minutes: number,
  seconds: number,
  selectedWpm: number = WPM_PRESETS.average
): TimeToWordsResult {
  const totalMinutes = Math.max(0, minutes) + Math.max(0, seconds) / 60;
  const timeObj = formatMinutesToTime(totalMinutes);

  const slowWords = Math.round(totalMinutes * WPM_PRESETS.slow);
  const averageWords = Math.round(totalMinutes * WPM_PRESETS.average);
  const fastWords = Math.round(totalMinutes * WPM_PRESETS.fast);
  const customWords = Math.round(totalMinutes * selectedWpm);

  const slowEst: TargetWordCountEstimate = {
    wpm: WPM_PRESETS.slow,
    label: "Slow (Keynote)",
    targetWords: slowWords,
  };
  const averageEst: TargetWordCountEstimate = {
    wpm: WPM_PRESETS.average,
    label: "Average (Presentation)",
    targetWords: averageWords,
  };
  const fastEst: TargetWordCountEstimate = {
    wpm: WPM_PRESETS.fast,
    label: "Fast (Conversational)",
    targetWords: fastWords,
  };

  let customEst: TargetWordCountEstimate | undefined;
  if (
    selectedWpm !== WPM_PRESETS.slow &&
    selectedWpm !== WPM_PRESETS.average &&
    selectedWpm !== WPM_PRESETS.fast &&
    selectedWpm > 0
  ) {
    customEst = {
      wpm: selectedWpm,
      label: `Custom (${selectedWpm} WPM)`,
      targetWords: customWords,
    };
  }

  const selectedTargetWords =
    selectedWpm === WPM_PRESETS.slow
      ? slowWords
      : selectedWpm === WPM_PRESETS.fast
      ? fastWords
      : selectedWpm === WPM_PRESETS.average
      ? averageWords
      : customWords;

  return {
    targetTotalMinutes: totalMinutes,
    formattedDuration: timeObj.formattedTime,
    selectedPaceWpm: selectedWpm,
    selectedTargetWords,
    paceBreakdown: {
      slow: slowEst,
      average: averageEst,
      fast: fastEst,
      custom: customEst,
    },
  };
}

export function getSpeechTimeExplanationSteps(
  mode: "textToTime" | "timeToWords",
  textResult: TextToTimeResult | null,
  timeResult: TimeToWordsResult | null
): string[] {
  const steps: string[] = [];

  if (mode === "textToTime" && textResult) {
    steps.push(
      `Step 1 (Word Extraction): Analyzed input text containing ${textResult.stats.words} words across ${textResult.stats.sentences} sentences and ${textResult.stats.paragraphs} paragraphs.`
    );
    steps.push(
      `Step 2 (Pace Formula): Estimated speech duration = Total Words ÷ Speaking Pace (WPM). At ${textResult.selectedPaceWpm} WPM: ${textResult.stats.words} words ÷ ${textResult.selectedPaceWpm} WPM = ${(textResult.stats.words / textResult.selectedPaceWpm).toFixed(2)} minutes.`
    );
    steps.push(
      `Step 3 (Pace Range Comparison): Slow pace (110 WPM) takes ${textResult.paceBreakdown.slow.formattedTime}, Average pace (140 WPM) takes ${textResult.paceBreakdown.average.formattedTime}, and Fast pace (170 WPM) takes ${textResult.paceBreakdown.fast.formattedTime}.`
    );
  } else if (mode === "timeToWords" && timeResult) {
    steps.push(
      `Step 1 (Duration Target): Input target presentation length is ${timeResult.formattedDuration} (${timeResult.targetTotalMinutes.toFixed(2)} minutes).`
    );
    steps.push(
      `Step 2 (Target Words Formula): Target Word Count = Target Minutes × Speaking Pace (WPM). At ${timeResult.selectedPaceWpm} WPM: ${timeResult.targetTotalMinutes.toFixed(2)} min × ${timeResult.selectedPaceWpm} WPM = ${timeResult.selectedTargetWords} words.`
    );
    steps.push(
      `Step 3 (Pace Range Target Comparison): Aim for ~${timeResult.paceBreakdown.slow.targetWords} words at Slow pace (110 WPM), ~${timeResult.paceBreakdown.average.targetWords} words at Average pace (140 WPM), and ~${timeResult.paceBreakdown.fast.targetWords} words at Fast pace (170 WPM).`
    );
  }

  return steps;
}
