export interface KeywordMatchItem {
  keyword: string;
  stem: string;
  frequencyInJd: number;
  matched: boolean;
  category?: "skill" | "tool" | "general";
}

export interface AtsStructureCheck {
  id: string;
  label: string;
  passed: boolean;
  description: string;
  severity: "high" | "medium" | "low";
}

export interface AtsAnalysisResult {
  matchScore: number;
  scoreTier: "excellent" | "moderate" | "needsWork";
  scoreLabel: string;
  scoreColor: string;
  totalJdKeywords: number;
  totalMatchedKeywords: number;
  totalMissingKeywords: number;
  matchedKeywords: KeywordMatchItem[];
  missingKeywords: KeywordMatchItem[];
  resumeWordCount: number;
  jdWordCount: number;
  structureChecks: AtsStructureCheck[];
  formattingTips: string[];
}

const STOP_WORDS = new Set([
  "a", "about", "above", "after", "again", "against", "all", "am", "an", "and", "any", "are", "aren't",
  "as", "at", "be", "because", "been", "before", "being", "below", "between", "both", "but", "by",
  "can", "cannot", "could", "couldn't", "did", "didn't", "do", "does", "doesn't", "doing", "don't",
  "down", "during", "each", "few", "for", "from", "further", "had", "hadn't", "has", "hasn't",
  "have", "haven't", "having", "he", "he'd", "he'll", "he's", "her", "here", "here's", "hers",
  "herself", "him", "himself", "his", "how", "how's", "i", "i'd", "i'll", "i'm", "i've", "if",
  "in", "into", "is", "isn't", "it", "it's", "its", "itself", "let's", "me", "more", "most",
  "mustn't", "my", "myself", "no", "nor", "not", "of", "off", "on", "once", "only", "or", "other",
  "ought", "our", "ours", "ourselves", "out", "over", "own", "same", "shan't", "she", "she'd",
  "she'll", "she's", "should", "shouldn't", "so", "some", "such", "than", "that", "that's", "the",
  "their", "theirs", "them", "themselves", "then", "there", "there's", "these", "they", "they'd",
  "they'll", "they're", "they've", "this", "those", "through", "to", "too", "under", "until", "up",
  "very", "was", "wasn't", "we", "we'd", "we'll", "we're", "we've", "were", "weren't", "what",
  "what's", "when", "when's", "where", "where's", "which", "while", "who", "who's", "whom", "why",
  "why's", "with", "won't", "would", "wouldn't", "you", "you'd", "you'll", "you're", "you've",
  "your", "yours", "yourself", "yourselves", "ability", "able", "across", "also", "always", "another",
  "apply", "applying", "candidate", "candidates", "company", "duties", "e.g.", "etc", "every",
  "experience", "experienced", "including", "job", "key", "looking", "must", "needed", "opportunity",
  "role", "roles", "seeking", "strong", "team", "teams", "work", "working", "year", "years"
]);

export function cleanToken(token: string): string {
  return token.toLowerCase().replace(/[^a-z0-9+#./-]/g, "").trim();
}

export function stemWord(word: string): string {
  const w = cleanToken(word);
  if (w.length <= 3) return w;

  if (w.endsWith("ing") && w.length > 5) return w.slice(0, -3);
  if (w.endsWith("ment") && w.length > 6) return w.slice(0, -4);
  if (w.endsWith("ed") && w.length > 4) return w.slice(0, -2);
  if (w.endsWith("ers") && w.length > 5) return w.slice(0, -3);
  if (w.endsWith("er") && w.length > 4) return w.slice(0, -2);
  if (w.endsWith("tions") && w.length > 7) return w.slice(0, -4);
  if (w.endsWith("tion") && w.length > 6) return w.slice(0, -3);
  if (w.endsWith("s") && !w.endsWith("ss") && w.length > 3) return w.slice(0, -1);

  return w;
}

export function extractKeywords(text: string): Map<string, number> {
  const frequencies = new Map<string, number>();
  if (!text || !text.trim()) return frequencies;

  const rawTokens = text.split(/\s+/);
  for (const raw of rawTokens) {
    const cleaned = cleanToken(raw);
    if (
      cleaned.length >= 3 &&
      !STOP_WORDS.has(cleaned) &&
      !/^\d+$/.test(cleaned)
    ) {
      const count = frequencies.get(cleaned) || 0;
      frequencies.set(cleaned, count + 1);
    }
  }

  // Common technical phrase detection (e.g. project management, machine learning, user experience)
  const lowerText = text.toLowerCase();
  const phrases = [
    "project management", "machine learning", "user experience", "user interface",
    "search engine optimization", "software engineering", "full stack", "front end",
    "back end", "data analysis", "data science", "cloud computing", "continuous integration",
    "customer service", "quality assurance", "strategic planning", "business development",
    "agile methodology", "scrum master", "cross functional", "problem solving"
  ];

  for (const phrase of phrases) {
    if (lowerText.includes(phrase)) {
      const phraseCount = lowerText.split(phrase).length - 1;
      if (phraseCount > 0) {
        frequencies.set(phrase, phraseCount * 2); // Higher weight for key phrases
      }
    }
  }

  return frequencies;
}

export function analyzeAtsResumeMatch(
  resumeText: string,
  jobDescriptionText: string
): AtsAnalysisResult {
  const resumeWords = resumeText.trim() ? resumeText.trim().split(/\s+/).filter(Boolean) : [];
  const jdWords = jobDescriptionText.trim() ? jobDescriptionText.trim().split(/\s+/).filter(Boolean) : [];

  const resumeWordCount = resumeWords.length;
  const jdWordCount = jdWords.length;

  if (!resumeText.trim() || !jobDescriptionText.trim()) {
    return {
      matchScore: 0,
      scoreTier: "needsWork",
      scoreLabel: "Insufficient Text Input",
      scoreColor: "text-rose-600 dark:text-rose-400",
      totalJdKeywords: 0,
      totalMatchedKeywords: 0,
      totalMissingKeywords: 0,
      matchedKeywords: [],
      missingKeywords: [],
      resumeWordCount,
      jdWordCount,
      structureChecks: [],
      formattingTips: [
        "Paste your complete resume text and the job description above to generate a live ATS match score.",
        "Ensure your resume contains clear section titles like Experience, Education, and Skills."
      ],
    };
  }

  // Extract candidate keywords from Job Description
  const jdFreqs = extractKeywords(jobDescriptionText);
  const sortedJdTerms = Array.from(jdFreqs.entries())
    .sort((a, b) => b[1] - a[1])
    .slice(0, 25); // Top 25 keywords

  // Prepare Resume token set & stemmed forms
  const resumeTokens = new Set<string>();
  const resumeStems = new Set<string>();

  for (const raw of resumeWords) {
    const cleaned = cleanToken(raw);
    if (cleaned) {
      resumeTokens.add(cleaned);
      resumeStems.add(stemWord(cleaned));
    }
  }

  // Match keywords
  const matchedKeywords: KeywordMatchItem[] = [];
  const missingKeywords: KeywordMatchItem[] = [];

  const lowerResume = resumeText.toLowerCase();

  for (const [term, freq] of sortedJdTerms) {
    const isPhrase = term.includes(" ");
    let isMatched = false;

    if (isPhrase) {
      isMatched = lowerResume.includes(term);
    } else {
      const termStem = stemWord(term);
      isMatched = resumeTokens.has(term) || resumeStems.has(termStem) || lowerResume.includes(term);
    }

    const item: KeywordMatchItem = {
      keyword: term,
      stem: stemWord(term),
      frequencyInJd: freq,
      matched: isMatched,
    };

    if (isMatched) {
      matchedKeywords.push(item);
    } else {
      missingKeywords.push(item);
    }
  }

  const totalJdKeywords = sortedJdTerms.length;
  const totalMatchedKeywords = matchedKeywords.length;
  const totalMissingKeywords = missingKeywords.length;

  const rawScore = totalJdKeywords > 0 ? (totalMatchedKeywords / totalJdKeywords) * 100 : 0;
  const matchScore = Math.min(100, Math.max(0, Math.round(rawScore)));

  let scoreTier: "excellent" | "moderate" | "needsWork" = "needsWork";
  let scoreLabel = "Needs Optimization (<50%)";
  let scoreColor = "text-rose-600 dark:text-rose-400";

  if (matchScore >= 75) {
    scoreTier = "excellent";
    scoreLabel = "Strong ATS Match (≥75%)";
    scoreColor = "text-emerald-600 dark:text-emerald-400";
  } else if (matchScore >= 50) {
    scoreTier = "moderate";
    scoreLabel = "Moderate Match (50–74%)";
    scoreColor = "text-amber-600 dark:text-amber-400";
  }

  // Perform Structure & ATS Formatting Audits
  const structureChecks: AtsStructureCheck[] = [
    {
      id: "exp_section",
      label: "Work Experience Section",
      passed: /experience|work history|employment|career/i.test(resumeText),
      description: "Standard ATS systems search for an explicit 'Experience' or 'Employment History' heading.",
      severity: "high",
    },
    {
      id: "edu_section",
      label: "Education Section",
      passed: /education|degree|university|college|academic/i.test(resumeText),
      description: "Checks if an Education heading is present to parse academic qualifications.",
      severity: "high",
    },
    {
      id: "skills_section",
      label: "Skills Section",
      passed: /skills|technologies|technical skills|competencies/i.test(resumeText),
      description: "Checks if a dedicated Skills section is included for fast ATS scanner parsing.",
      severity: "medium",
    },
    {
      id: "contact_info",
      label: "Contact Information (Email / Phone)",
      passed: (/@|\.com|\.org|\d{3}[-.\s]?\d{3}[-.\s]?\d{4}/i.test(resumeText)),
      description: "Detects presence of contact details (email or phone number) in plain text.",
      severity: "high",
    },
    {
      id: "resume_length",
      label: "Optimal Word Count (300 - 1,000 words)",
      passed: resumeWordCount >= 300 && resumeWordCount <= 1000,
      description: `Current resume length is ${resumeWordCount} words. Standard resumes perform best between 300 and 1,000 words.`,
      severity: "low",
    },
  ];

  // Actionable Formatting Tips
  const formattingTips: string[] = [
    "Always submit your resume in standard .docx or clean text PDF formats unless explicitly asked for plain text.",
    "Avoid using complex multi-column tables, graphics, headers/footers, or text boxes, as old ATS scanners flatten or skip them.",
    "Use standard section titles like 'Work Experience', 'Education', and 'Skills' rather than creative headings like 'Where I've Been'.",
    "Naturally integrate missing target keywords in context within your experience bullet points rather than dumping them in a hidden list."
  ];

  return {
    matchScore,
    scoreTier,
    scoreLabel,
    scoreColor,
    totalJdKeywords,
    totalMatchedKeywords,
    totalMissingKeywords,
    matchedKeywords,
    missingKeywords,
    resumeWordCount,
    jdWordCount,
    structureChecks,
    formattingTips,
  };
}

export function getAtsExplanationSteps(result: AtsAnalysisResult): string[] {
  const steps: string[] = [];

  steps.push(
    `Step 1 (Keyword Extraction): Parsed ${result.jdWordCount} words from the Job Description to extract the top ${result.totalJdKeywords} essential skills, tools, and domain keywords.`
  );
  steps.push(
    `Step 2 (Stemming & Token Matching): Scanned your ${result.resumeWordCount}-word resume using stem-aware matching. Found ${result.totalMatchedKeywords} matched terms (${((result.totalMatchedKeywords / Math.max(1, result.totalJdKeywords)) * 100).toFixed(0)}%) and identified ${result.totalMissingKeywords} missing target keywords.`
  );
  steps.push(
    `Step 3 (ATS Structure & Formatting Audit): Verified 5 critical ATS structural components (Experience section, Education, Skills, Contact Info, and word length). Resulting ATS Match Score: ${result.matchScore}%.`
  );

  return steps;
}
