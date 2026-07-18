/**
 * Password Generator Utilities and Cryptographic Randomness
 */

export interface PasswordConfig {
  length: number;
  useUpper: boolean;
  useLower: boolean;
  useNumbers: boolean;
  useSymbols: boolean;
  mode: "random" | "pronounceable";
}

export interface PasswordResult {
  password?: string;
  entropy: number;
  strengthLabel: "Weak" | "Moderate" | "Strong" | "Very strong";
  strengthLabelExplanation: string;
  error?: string;
}

// Character sets
const LOWERCASE = "abcdefghijklmnopqrstuvwxyz";
const UPPERCASE = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
const NUMBERS = "0123456789";
const SYMBOLS = "!@#$%^&*()_+-=[]{}|;:,.<>?";

// Pronounceable mode syllable arrays
const CONSONANTS = "bcdfghjklmnpqrstvwxyz";
const VOWELS = "aeiou";

/**
 * Securely gets a random integer between 0 and max (exclusive) using crypto.getRandomValues()
 */
function getSecureRandomInt(max: number): number {
  if (max <= 1) return 0;
  
  // Use a 32-bit unsigned integer
  const array = new Uint32Array(1);
  
  // To avoid modulo bias, find the maximum value that is a multiple of max
  const maxSafe = Math.floor(4294967296 / max) * max;
  
  let val;
  do {
    crypto.getRandomValues(array);
    val = array[0];
  } while (val >= maxSafe);
  
  return val % max;
}

/**
 * Generates a random character from the pool securely
 */
function getRandomChar(pool: string): string {
  const idx = getSecureRandomInt(pool.length);
  return pool[idx];
}

/**
 * Generates a pronounceable password of a given length
 * Easier to memorize, uses alternating consonant/vowel syllables, plus a number and symbol at the end.
 */
function generatePronounceable(length: number): string {
  let pw = "";
  let isConsonant = true;
  
  // Generate syllables
  for (let i = 0; i < length - 2; i++) {
    if (isConsonant) {
      pw += getRandomChar(CONSONANTS);
    } else {
      pw += getRandomChar(VOWELS);
    }
    isConsonant = !isConsonant;
  }
  
  // Add a symbol and a number at the end to make it secure but memorable
  pw += getRandomChar(NUMBERS);
  pw += getRandomChar(SYMBOLS);
  
  return pw;
}

/**
 * Generates password and estimates entropy
 */
export function generatePassword(config: PasswordConfig): PasswordResult {
  const { length, useUpper, useLower, useNumbers, useSymbols, mode } = config;
  
  // Validation check: at least one checkbox must be checked if we are in random mode
  if (mode === "random" && !useUpper && !useLower && !useNumbers && !useSymbols) {
    return {
      entropy: 0,
      strengthLabel: "Weak",
      strengthLabelExplanation: "Please select at least one character type to generate a password.",
      error: "Please pick at least one character type (Uppercase, Lowercase, Numbers, or Symbols) to generate your password.",
    };
  }

  let password = "";
  let poolSize = 0;

  if (mode === "pronounceable") {
    // Generate pronounceable password
    password = generatePronounceable(length);
    // Pronounceable pool size estimation:
    // Alternating consonants (21) and vowels (5), with a number (10) and symbol (26) at the end.
    // Average character pool size is roughly ~13.
    poolSize = 13;
  } else {
    // Random mode: build the active pool
    let activePool = "";
    if (useLower) {
      activePool += LOWERCASE;
      poolSize += LOWERCASE.length;
    }
    if (useUpper) {
      activePool += UPPERCASE;
      poolSize += UPPERCASE.length;
    }
    if (useNumbers) {
      activePool += NUMBERS;
      poolSize += NUMBERS.length;
    }
    if (useSymbols) {
      activePool += SYMBOLS;
      poolSize += SYMBOLS.length;
    }

    // Securely generate characters
    const array = new Uint32Array(length);
    crypto.getRandomValues(array);
    
    for (let i = 0; i < length; i++) {
      password += getRandomChar(activePool);
    }

    // Ensure we satisfy the checked requirements if length allows
    // Let's do a simple secure swap to guarantee coverage of types
    const requiredSets: string[] = [];
    if (useLower) requiredSets.push(LOWERCASE);
    if (useUpper) requiredSets.push(UPPERCASE);
    if (useNumbers) requiredSets.push(NUMBERS);
    if (useSymbols) requiredSets.push(SYMBOLS);

    if (length >= requiredSets.length) {
      const pwChars = password.split("");
      // Guarantee each selected type is represented at least once
      for (let i = 0; i < requiredSets.length; i++) {
        const charSet = requiredSets[i];
        // Check if there is already a char from this set
        const hasChar = pwChars.some(c => charSet.includes(c));
        if (!hasChar) {
          // Replace securely at unique index
          const replaceIdx = getSecureRandomInt(length);
          pwChars[replaceIdx] = getRandomChar(charSet);
        }
      }
      password = pwChars.join("");
    }
  }

  // Calculate Shannon entropy: bits = length * log2(poolSize)
  const entropy = Math.round(length * Math.log2(poolSize));

  // Determine strength label
  let strengthLabel: "Weak" | "Moderate" | "Strong" | "Very strong" = "Weak";
  let strengthLabelExplanation = "";

  if (entropy < 36) {
    strengthLabel = "Weak";
    strengthLabelExplanation = "Extremely easy to hack with a simple brute-force attack in seconds.";
  } else if (entropy >= 36 && entropy < 60) {
    strengthLabel = "Moderate";
    strengthLabelExplanation = "Offers basic protection but could be brute-forced in hours to days by modern computers.";
  } else if (entropy >= 60 && entropy < 80) {
    strengthLabel = "Strong";
    strengthLabelExplanation = "Excellent protection. Feasible resistance against brute-force attacks and standard dictionary software.";
  } else {
    strengthLabel = "Very strong";
    strengthLabelExplanation = "Mathematically unfeasible to crack. Safe from supercomputers and brute force attempts for decades.";
  }

  return {
    password,
    entropy,
    strengthLabel,
    strengthLabelExplanation,
  };
}
