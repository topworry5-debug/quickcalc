/* eslint-disable @typescript-eslint/no-explicit-any */
/**
 * Regular Expression Tester Utilities
 */

export interface RegexMatch {
  text: string;
  index: number;
  groups: string[];
}

export interface RegexToken {
  text: string;
  isMatch: boolean;
  matchIndex?: number;
}

export interface RegexResult {
  matches: RegexMatch[];
  tokens: RegexToken[];
  error?: string;
}

export function testRegex(
  pattern: string,
  flags: { g: boolean; i: boolean; m: boolean },
  testString: string
): RegexResult {
  if (!pattern) {
    return {
      matches: [],
      tokens: [{ text: testString, isMatch: false }],
    };
  }

  // Build flags string
  let flagStr = "";
  if (flags.g) flagStr += "g";
  if (flags.i) flagStr += "i";
  if (flags.m) flagStr += "m";

  try {
    const regex = new RegExp(pattern, flagStr);
    const matches: RegexMatch[] = [];
    const tokens: RegexToken[] = [];

    // On infinite loops with empty match regexes (like '.*' or 'a*') in global flag mode, handle safety bounds
    if (flags.g) {
      let match;
      let lastIndex = 0;

      while ((match = regex.exec(testString)) !== null) {
        // Prevent infinite loops on zero-length matches
        if (match.index === regex.lastIndex) {
          regex.lastIndex++;
        }

        matches.push({
          text: match[0],
          index: match.index,
          groups: Array.from(match).slice(1),
        });

        // Add leading non-matching token
        if (match.index > lastIndex) {
          tokens.push({
            text: testString.substring(lastIndex, match.index),
            isMatch: false,
          });
        }

        // Add matching token
        tokens.push({
          text: match[0],
          isMatch: true,
          matchIndex: matches.length - 1,
        });

        lastIndex = regex.lastIndex;
      }

      // Add trailing non-matching token
      if (lastIndex < testString.length) {
        tokens.push({
          text: testString.substring(lastIndex),
          isMatch: false,
        });
      }
    } else {
      // Non-global matching
      const match = regex.exec(testString);
      if (match) {
        matches.push({
          text: match[0],
          index: match.index,
          groups: Array.from(match).slice(1),
        });

        if (match.index > 0) {
          tokens.push({
            text: testString.substring(0, match.index),
            isMatch: false,
          });
        }

        tokens.push({
          text: match[0],
          isMatch: true,
          matchIndex: 0,
        });

        const afterIndex = match.index + match[0].length;
        if (afterIndex < testString.length) {
          tokens.push({
            text: testString.substring(afterIndex),
            isMatch: false,
          });
        }
      } else {
        tokens.push({
          text: testString,
          isMatch: false,
        });
      }
    }

    return { matches, tokens };
  } catch (err: any) {
    let friendlyError = err?.message || "Invalid regular expression pattern";
    
    // Make standard error messages friendly
    if (friendlyError.includes("group")) {
      friendlyError = "Unclosed group — check for a missing parenthetical ) or invalid group matching syntax";
    } else if (friendlyError.includes("range")) {
      friendlyError = "Invalid character class range — check that starting bounds precede ending values (e.g. [a-z], not [z-a])";
    } else if (friendlyError.includes("nothing to repeat")) {
      friendlyError = "Nothing to repeat — ensure quantifiers like +, *, or ? follow matching parameters, not empty states";
    }
    
    return {
      matches: [],
      tokens: [{ text: testString, isMatch: false }],
      error: friendlyError,
    };
  }
}

export function explainRegexPattern(pattern: string): string[] {
  if (!pattern) {
    return ["No pattern provided. Enter a regular expression to see a plain-language explanation."];
  }

  const explanations: string[] = [];

  if (pattern.startsWith("^")) {
    explanations.push("Asserts the start of the text line (^). Only matches at the very beginning of the test string.");
  }
  if (pattern.endsWith("$")) {
    explanations.push("Asserts the end of the text line ($). Only matches at the very end of the test string.");
  }
  if (pattern.includes("\\d")) {
    explanations.push("Matches any digit character from 0 through 9 (\\d).");
  }
  if (pattern.includes("\\D")) {
    explanations.push("Matches any non-digit character (\\D).");
  }
  if (pattern.includes("\\w")) {
    explanations.push("Matches any alphanumeric word character (letters a-z, A-Z, numbers 0-9, or underscore) (\\w).");
  }
  if (pattern.includes("\\W")) {
    explanations.push("Matches any non-word character (like spaces or punctuation) (\\W).");
  }
  if (pattern.includes("\\s")) {
    explanations.push("Matches any whitespace character (space, tab, carriage return, or newline) (\\s).");
  }
  if (pattern.includes("\\S")) {
    explanations.push("Matches any non-whitespace character (\\S).");
  }
  if (pattern.includes(".")) {
    // Avoid double counting escaped dots
    if (!pattern.includes("\\.")) {
      explanations.push("Matches any single character except a line break (.).");
    } else {
      explanations.push("Matches a literal dot or period character (\\.).");
    }
  }
  if (pattern.includes("+")) {
    explanations.push("Quantifier (+): Matches the preceding element 1 or more times.");
  }
  if (pattern.includes("*")) {
    explanations.push("Quantifier (*): Matches the preceding element 0 or more times.");
  }
  if (pattern.includes("?")) {
    // Check if optional or lazy quantifier
    if (!pattern.includes("+?") && !pattern.includes("*?")) {
      explanations.push("Quantifier (?): Makes the preceding element optional (matches 0 or 1 time).");
    } else {
      explanations.push("Lazy modifier (?): Causes matching quantifiers to stop at the shortest match possible.");
    }
  }
  if (pattern.includes("|")) {
    explanations.push("Alternation (|): Acts as an OR condition to match options on either the left or right hand side.");
  }
  if (pattern.includes("[") && pattern.includes("]")) {
    explanations.push("Character class [...]: Matches any single character listed inside the square brackets.");
  }
  if (pattern.includes("(") && pattern.includes(")")) {
    explanations.push("Capturing group (...): Groups multiple patterns together and remembers the match segments.");
  }
  if (pattern.includes("{") && pattern.includes("}")) {
    explanations.push("Custom range bounds {...}: Matches the preceding element a custom number of times or ranges.");
  }

  if (explanations.length === 0) {
    explanations.push("Matches literal characters exactly as typed (case-sensitive unless the 'i' flag is checked).");
  }

  return explanations;
}
