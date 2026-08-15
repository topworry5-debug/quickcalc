export interface ReadabilityStats {
  words: number;
  sentences: number;
  paragraphs: number;
  charactersWithSpaces: number;
  charactersNoSpaces: number;
  syllables: number;
  complexWords: number;
  wordsPerSentence: number;
  syllablesPerWord: number;
  complexWordPercentage: number;
}

export interface ReadabilityScores {
  fleschEase: number;
  fleschEaseLabel: string;
  fleschEaseDescription: string;
  fleschEaseGaugePosition: number; // 0 to 100 for visual bar
  fleschEaseColor: string;

  fleschKincaidGrade: number;
  fleschKincaidLabel: string;
  fleschKincaidDescription: string;

  gunningFogIndex: number;
  gunningFogLabel: string;
  gunningFogDescription: string;
}

export interface ReadabilityAnalysisResult {
  stats: ReadabilityStats;
  scores: ReadabilityScores;
}

export function countSyllablesInWord(word: string): number {
  const w = word.toLowerCase().replace(/[^a-z]/g, "");
  if (!w) return 0;
  if (w.length <= 3) return 1;

  let count = 0;
  let isVowel = false;

  const vowels = "aeiouy";

  for (let i = 0; i < w.length; i++) {
    const charIsVowel = vowels.includes(w[i]);
    if (charIsVowel && !isVowel) {
      count++;
      isVowel = true;
    } else if (!charIsVowel) {
      isVowel = false;
    }
  }

  // Adjustments for trailing silent 'e' or 'es' / 'ed'
  if (w.endsWith("e") && !w.endsWith("le") && !w.endsWith("ee") && count > 1) {
    count--;
  } else if ((w.endsWith("ed") || w.endsWith("es")) && count > 1 && !w.endsWith("ted") && !w.endsWith("ded")) {
    count--;
  }

  return Math.max(1, count);
}

export function isComplexWord(word: string): boolean {
  const cleaned = word.toLowerCase().replace(/[^a-z]/g, "");
  if (cleaned.length < 6) return false;
  // Ignore words with common suffixes like -ed, -es, -ing when checking complexity
  const baseWord = cleaned.replace(/(ing|ed|es|ly)$/, "");
  return countSyllablesInWord(baseWord) >= 3;
}

export function calculateReadability(text: string): ReadabilityAnalysisResult {
  if (!text || !text.trim()) {
    return {
      stats: {
        words: 0,
        sentences: 0,
        paragraphs: 0,
        charactersWithSpaces: 0,
        charactersNoSpaces: 0,
        syllables: 0,
        complexWords: 0,
        wordsPerSentence: 0,
        syllablesPerWord: 0,
        complexWordPercentage: 0,
      },
      scores: {
        fleschEase: 0,
        fleschEaseLabel: "No Text Provided",
        fleschEaseDescription: "Paste or type text above to calculate live readability scores.",
        fleschEaseGaugePosition: 0,
        fleschEaseColor: "text-zinc-400",
        fleschKincaidGrade: 0,
        fleschKincaidLabel: "N/A",
        fleschKincaidDescription: "Enter text to evaluate school grade level requirements.",
        gunningFogIndex: 0,
        gunningFogLabel: "N/A",
        gunningFogDescription: "Enter text to compute Gunning Fog reading complexity.",
      },
    };
  }

  const trimmed = text.trim();
  const wordsArr = trimmed.split(/\s+/).filter(Boolean);
  const words = wordsArr.length;

  const charactersWithSpaces = text.length;
  const charactersNoSpaces = text.replace(/\s/g, "").length;

  const sentencesArr = text.split(/[.!?]+/).filter((s) => s.trim().length > 0);
  const sentences = sentencesArr.length || (words > 0 ? 1 : 0);

  const paragraphsArr = text.split(/\n+/).filter((p) => p.trim().length > 0);
  const paragraphs = paragraphsArr.length;

  let syllables = 0;
  let complexWords = 0;

  for (const w of wordsArr) {
    const syl = countSyllablesInWord(w);
    syllables += syl;
    if (isComplexWord(w)) {
      complexWords++;
    }
  }

  const wordsPerSentence = sentences > 0 ? words / sentences : 0;
  const syllablesPerWord = words > 0 ? syllables / words : 0;
  const complexWordPercentage = words > 0 ? (complexWords / words) * 100 : 0;

  // 1. Flesch Reading Ease Formula
  // 206.835 - 1.015 * (total words / total sentences) - 84.6 * (total syllables / total words)
  let rawFlesch = 206.835 - 1.015 * wordsPerSentence - 84.6 * syllablesPerWord;
  if (isNaN(rawFlesch)) rawFlesch = 0;
  const fleschEase = Math.max(0, Math.min(100, Math.round(rawFlesch * 10) / 10));

  let fleschEaseLabel = "Standard";
  let fleschEaseDescription = "Plain English suitable for a 8th to 9th grade reading level.";
  let fleschEaseColor = "text-emerald-600 dark:text-emerald-400";

  if (fleschEase >= 90) {
    fleschEaseLabel = "Very Easy (5th Grade)";
    fleschEaseDescription = "Very easy to read. Conversational and accessible to 10-11 year olds.";
    fleschEaseColor = "text-emerald-600 dark:text-emerald-400";
  } else if (fleschEase >= 80) {
    fleschEaseLabel = "Easy (6th Grade)";
    fleschEaseDescription = "Easy to read. Conversational English suitable for a general audience.";
    fleschEaseColor = "text-teal-600 dark:text-teal-400";
  } else if (fleschEase >= 70) {
    fleschEaseLabel = "Fairly Easy (7th Grade)";
    fleschEaseDescription = "Fairly easy to read. Ideal benchmark for general web articles & blog posts.";
    fleschEaseColor = "text-teal-600 dark:text-teal-400";
  } else if (fleschEase >= 60) {
    fleschEaseLabel = "Standard (8th - 9th Grade)";
    fleschEaseDescription = "Plain English. Easily understood by 13 to 15-year-old high school students.";
    fleschEaseColor = "text-amber-600 dark:text-amber-400";
  } else if (fleschEase >= 50) {
    fleschEaseLabel = "Fairly Difficult (10th - 12th Grade)";
    fleschEaseDescription = "Fairly difficult to read. High school senior or general business writing.";
    fleschEaseColor = "text-amber-600 dark:text-amber-400";
  } else if (fleschEase >= 30) {
    fleschEaseLabel = "Difficult (College Level)";
    fleschEaseDescription = "Difficult to read. Best suited for university students or technical docs.";
    fleschEaseColor = "text-rose-600 dark:text-rose-400";
  } else {
    fleschEaseLabel = "Very Difficult (Post-Graduate)";
    fleschEaseDescription = "Very difficult to read. Best suited for academic papers or legal contracts.";
    fleschEaseColor = "text-rose-600 dark:text-rose-400";
  }

  // 2. Flesch-Kincaid Grade Level Formula
  // 0.39 * (total words / total sentences) + 11.8 * (total syllables / total words) - 15.59
  let rawKincaid = 0.39 * wordsPerSentence + 11.8 * syllablesPerWord - 15.59;
  if (isNaN(rawKincaid) || rawKincaid < 0) rawKincaid = 0;
  const fleschKincaidGrade = Math.round(rawKincaid * 10) / 10;

  let fleschKincaidLabel = `${fleschKincaidGrade}th Grade`;
  let fleschKincaidDescription = `Requires approximately ${Math.ceil(fleschKincaidGrade)} years of formal education.`;

  if (fleschKincaidGrade <= 5) {
    fleschKincaidLabel = "5th Grade & Below";
    fleschKincaidDescription = "Elementary school comprehension level.";
  } else if (fleschKincaidGrade <= 8) {
    fleschKincaidLabel = `${Math.round(fleschKincaidGrade)}th Grade (Middle School)`;
    fleschKincaidDescription = "Standard middle school level. Optimal target for broad web content.";
  } else if (fleschKincaidGrade <= 12) {
    fleschKincaidLabel = `${Math.round(fleschKincaidGrade)}th Grade (High School)`;
    fleschKincaidDescription = "High school comprehension level.";
  } else {
    fleschKincaidLabel = `Grade ${Math.round(fleschKincaidGrade)} (College / Academic)`;
    fleschKincaidDescription = "University undergraduate level writing.";
  }

  // 3. Gunning Fog Index Formula
  // 0.4 * [ (total words / total sentences) + 100 * (complex words / total words) ]
  let rawFog = 0.4 * (wordsPerSentence + complexWordPercentage);
  if (isNaN(rawFog) || rawFog < 0) rawFog = 0;
  const gunningFogIndex = Math.round(rawFog * 10) / 10;

  let gunningFogLabel = `Fog Index ${gunningFogIndex}`;
  let gunningFogDescription = "Readable for general web audiences.";

  if (gunningFogIndex <= 6) {
    gunningFogLabel = `Fog Index ${gunningFogIndex} (Easy)`;
    gunningFogDescription = "Very easy to read for nearly all audiences.";
  } else if (gunningFogIndex <= 8) {
    gunningFogLabel = `Fog Index ${gunningFogIndex} (Conversational)`;
    gunningFogDescription = "Readable for popular fiction and news articles.";
  } else if (gunningFogIndex <= 12) {
    gunningFogLabel = `Fog Index ${gunningFogIndex} (Business)`;
    gunningFogDescription = "Standard business reports and general prose.";
  } else if (gunningFogIndex <= 15) {
    gunningFogLabel = `Fog Index ${gunningFogIndex} (Hard)`;
    gunningFogDescription = "Academic journals and specialized technical papers.";
  } else {
    gunningFogLabel = `Fog Index ${gunningFogIndex} (Very Hard)`;
    gunningFogDescription = "Complex legal, scientific, or technical writing.";
  }

  return {
    stats: {
      words,
      sentences,
      paragraphs,
      charactersWithSpaces,
      charactersNoSpaces,
      syllables,
      complexWords,
      wordsPerSentence: Math.round(wordsPerSentence * 10) / 10,
      syllablesPerWord: Math.round(syllablesPerWord * 100) / 100,
      complexWordPercentage: Math.round(complexWordPercentage * 10) / 10,
    },
    scores: {
      fleschEase,
      fleschEaseLabel,
      fleschEaseDescription,
      fleschEaseGaugePosition: fleschEase,
      fleschEaseColor,
      fleschKincaidGrade,
      fleschKincaidLabel,
      fleschKincaidDescription,
      gunningFogIndex,
      gunningFogLabel,
      gunningFogDescription,
    },
  };
}

export function getReadabilityExplanationSteps(result: ReadabilityAnalysisResult): string[] {
  const { stats, scores } = result;
  const steps: string[] = [];

  steps.push(
    `Step 1 (Lexical Statistics): Analyzed input text containing ${stats.words} words across ${stats.sentences} sentences (${stats.wordsPerSentence} words/sentence) and ${stats.syllables} total syllables (${stats.syllablesPerWord} syllables/word). Identified ${stats.complexWords} complex words (${stats.complexWordPercentage}% of total).`
  );
  steps.push(
    `Step 2 (Flesch Reading Ease): Applied formula: 206.835 - 1.015 × (${stats.wordsPerSentence}) - 84.6 × (${stats.syllablesPerWord}) = ${scores.fleschEase} (${scores.fleschEaseLabel}).`
  );
  steps.push(
    `Step 3 (Flesch-Kincaid & Gunning Fog): Flesch-Kincaid Grade Level = 0.39 × (${stats.wordsPerSentence}) + 11.8 × (${stats.syllablesPerWord}) - 15.59 = ${scores.fleschKincaidGrade} (${scores.fleschKincaidLabel}). Gunning Fog Index = 0.4 × [${stats.wordsPerSentence} + ${stats.complexWordPercentage}] = ${scores.gunningFogIndex} (${scores.gunningFogLabel}).`
  );

  return steps;
}
