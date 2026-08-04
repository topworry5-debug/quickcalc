import Link from "next/link";

export default function RegexTutorialGuideArticle() {
  return (
    <>
      <p className="bg-purple-50 dark:bg-purple-950/30 border border-purple-200 dark:border-purple-900/50 p-4 rounded-xl text-zinc-800 dark:text-zinc-200 font-medium">
        If you have ever felt overwhelmed by the complex, crowded syntax of regular expressions, you are not alone. This beginner-friendly guide breaks down exactly how regex works, explains the core symbols one by one with plain examples, and shows you how to read them like a pro.
      </p>

      <h2 className="text-3xl font-extrabold text-zinc-900 dark:text-white mt-10 mb-4">
        What Is Regex? A Beginner's Guide to Regular Expressions (With Real Examples)
      </h2>

      <p>
        If you have ever spent hours manually cleaning up data in a spreadsheet, renaming hundreds of files, or writing dozens of string-replace functions in your code, you know how exhausting text manipulation can be. In the digital world, there is a legendary tool built specifically to do this heavy lifting for you. It is called a <strong>regular expression</strong> &mdash; commonly known as <strong>regex</strong>.
      </p>

      <p>
        At its core, regex is a sequence of characters that defines a specific search pattern. Think of it as a supercharged, highly intelligent version of the standard &ldquo;Find and Replace&rdquo; tool (Ctrl+F) in your favorite text editor. Instead of looking only for exact literal matches like "cat," regex allows you to search for abstract concepts: "any string starting with an uppercase letter, ending with two digits, and containing a hyphen in the middle."
      </p>

      <p>
        Regex is supported in almost every modern text editor, command-line utility, and programming language, from Python and JavaScript to SQL and bash. Once you understand the basics of pattern matching, you can apply these skills across your entire workflow. To make learning hands-on and interactive, we highly recommend keeping our free, live <Link href="/tools/regex-tester" className="text-emerald-600 dark:text-emerald-400 font-semibold underline">regex tester</Link> open in another tab so you can test each pattern as we walk through them.
      </p>

      <h2 className="text-2xl font-bold text-zinc-900 dark:text-white mt-8 mb-4">
        Why Regex Looks Intimidating (But Actually Isn't)
      </h2>

      <p>
        Let's address the elephant in the room: regex looks terrifying at first glance. A typical validation pattern can look like an absolute mess of backslashes, braces, parentheses, and brackets. It resembles a cartoon character cursing on paper.
      </p>

      <p>
        But here is the secret: regex is not a single complex hurdle to jump over. It is a tiny, incredibly logical language built from small, simple Lego blocks. Every symbol inside a pattern has exactly one straightforward job to perform. 
      </p>

      <p>
        The trouble is that regex packs a massive amount of logic into a tiny amount of horizontal space. When you see a full pattern, your brain naturally tries to digest it all at once, leading to instant cognitive overload. The trick is to read it left-to-right, character-by-character, translating each tiny symbol into a plain English instruction. Let's take a look at these building blocks one by one to see how simple they truly are.
      </p>

      <h2 className="text-2xl font-bold text-zinc-900 dark:text-white mt-8 mb-4">
        Core Symbols Explained One at a Time
      </h2>

      <p>
        To read or build any pattern, you must become familiar with the special symbols that tell the regex engine how to behave. Here is a breakdown of the primary operators, accompanied by real-world matching behavior.
      </p>

      <h3 className="text-xl font-bold text-zinc-900 dark:text-white mt-6 mb-2">
        1. Literal Characters
      </h3>
      <p>
        The simplest regex patterns are plain text. If you type <code className="px-1.5 py-0.5 bg-zinc-100 dark:bg-zinc-800 rounded font-mono text-sm text-pink-600 dark:text-pink-400">apple</code>, the engine looks for those exact letters, in that exact order, with matching case.
      </p>
      <ul className="list-disc pl-6 space-y-1 mb-4">
        <li><strong>Matches:</strong> "apple" in "I ate an apple"</li>
        <li><strong>Does Not Match:</strong> "Apple" (case-sensitive) or "aple"</li>
      </ul>

      <h3 className="text-xl font-bold text-zinc-900 dark:text-white mt-6 mb-2">
        2. The Wildcard Dot (<code className="font-mono">.</code>)
      </h3>
      <p>
        The period acts as a wildcard. It matches <strong>any single character</strong> except for a line break. It is ideal when you want to allow variations at a specific position.
      </p>
      <ul className="list-disc pl-6 space-y-1 mb-4">
        <li><strong>Pattern:</strong> <code className="px-1.5 py-0.5 bg-zinc-100 dark:bg-zinc-800 rounded font-mono text-sm text-pink-600 dark:text-pink-400">c.t</code></li>
        <li><strong>Matches:</strong> "cat", "cot", "cut", "c1t", "c!t"</li>
        <li><strong>Does Not Match:</strong> "cart" (because the dot matches exactly one character)</li>
      </ul>

      <h3 className="text-xl font-bold text-zinc-900 dark:text-white mt-6 mb-2">
        3. The Asterisk Quantifier (<code className="font-mono">*</code>)
      </h3>
      <p>
        Quantifiers define how many times the preceding character can repeat. The asterisk matches the preceding character <strong>zero or more times</strong>. This means the target character can be entirely missing, present once, or repeated indefinitely.
      </p>
      <ul className="list-disc pl-6 space-y-1 mb-4">
        <li><strong>Pattern:</strong> <code className="px-1.5 py-0.5 bg-zinc-100 dark:bg-zinc-800 rounded font-mono text-sm text-pink-600 dark:text-pink-400">ca*t</code></li>
        <li><strong>Matches:</strong> "ct" (zero 'a's), "cat" (one 'a'), "caaat" (three 'a's)</li>
        <li><strong>Does Not Match:</strong> "cart" (the literal letter 'r' is not allowed)</li>
      </ul>

      <h3 className="text-xl font-bold text-zinc-900 dark:text-white mt-6 mb-2">
        4. The Plus Quantifier (<code className="font-mono">+</code>)
      </h3>
      <p>
        Similar to the asterisk, but stricter. The plus matches the preceding character <strong>one or more times</strong>. The character must appear at least once.
      </p>
      <ul className="list-disc pl-6 space-y-1 mb-4">
        <li><strong>Pattern:</strong> <code className="px-1.5 py-0.5 bg-zinc-100 dark:bg-zinc-800 rounded font-mono text-sm text-pink-600 dark:text-pink-400">ca+t</code></li>
        <li><strong>Matches:</strong> "cat", "caaat"</li>
        <li><strong>Does Not Match:</strong> "ct" (requires at least one 'a')</li>
      </ul>

      <h3 className="text-xl font-bold text-zinc-900 dark:text-white mt-6 mb-2">
        5. The Question Mark (<code className="font-mono">?</code>)
      </h3>
      <p>
        The question mark makes the preceding character <strong>optional</strong>. It matches either <strong>zero or one</strong> occurrence. This is incredibly useful for capturing minor spelling differences or optional punctuation. You can quickly see how quantifiers change highlighted matches by testing them in our interactive <Link href="/tools/regex-tester" className="text-emerald-600 dark:text-emerald-400 font-semibold underline">regex-tester</Link>.
      </p>
      <ul className="list-disc pl-6 space-y-1 mb-4">
        <li><strong>Pattern:</strong> <code className="px-1.5 py-0.5 bg-zinc-100 dark:bg-zinc-800 rounded font-mono text-sm text-pink-600 dark:text-pink-400">colors?</code></li>
        <li><strong>Matches:</strong> "color" (zero 's's), "colors" (one 's')</li>
        <li><strong>Does Not Match:</strong> "colorss" (more than one optional character)</li>
      </ul>

      <h3 className="text-xl font-bold text-zinc-900 dark:text-white mt-6 mb-2">
        6. Character Classes (<code className="font-mono">[]</code>)
      </h3>
      <p>
        Square brackets let you define a specific list or range of characters allowed at that exact position. Think of it as a custom multiple-choice option for the search engine.
      </p>
      <ul className="list-disc pl-6 space-y-1 mb-4">
        <li><strong>Pattern:</strong> <code className="px-1.5 py-0.5 bg-zinc-100 dark:bg-zinc-800 rounded font-mono text-sm text-pink-600 dark:text-pink-400">b[aeiou]g</code></li>
        <li><strong>Matches:</strong> "bag", "beg", "big", "bog", "bug"</li>
        <li><strong>Does Not Match:</strong> "byg" or "baeg" (only matches a single character within the bracket)</li>
        <li><strong>Using Ranges:</strong> You can use a hyphen to specify ranges, like <code className="font-mono">[a-z]</code> for lowercase letters, <code className="font-mono">[A-Z]</code> for uppercase letters, or <code className="font-mono">[0-9]</code> for digits.</li>
      </ul>

      <h3 className="text-xl font-bold text-zinc-900 dark:text-white mt-6 mb-2">
        7. Shorthand Character Classes (<code className="font-mono">\d, \w, \s</code>)
      </h3>
      <p>
        Writing out custom ranges all the time is tedious, so regex provides pre-packaged shortcuts for common groups:
      </p>
      <ul className="list-disc pl-6 space-y-2 mb-4">
        <li><code className="font-mono">\d</code>: Matches any single decimal digit (identical to writing <code className="font-mono">[0-9]</code>).</li>
        <li><code className="font-mono">\w</code>: Matches any alphanumeric "word" character, including lowercase letters, uppercase letters, digits, and underscores (identical to <code className="font-mono">[a-zA-Z0-9_]</code>).</li>
        <li><code className="font-mono">\s</code>: Matches any whitespace character, including standard spaces, tabs, and line breaks.</li>
      </ul>

      <h3 className="text-xl font-bold text-zinc-900 dark:text-white mt-6 mb-2">
        8. Anchors (<code className="font-mono">^</code> and <code className="font-mono">$</code>)
      </h3>
      <p>
        Anchors are unique because they do not match any letters or symbols at all. Instead, they match <strong>positions</strong> in the text.
      </p>
      <ul className="list-disc pl-6 space-y-2 mb-4">
        <li><code className="font-mono">^</code>: Anchors the pattern to the very <strong>start</strong> of the line or text.</li>
        <li><code className="font-mono">$</code>: Anchors the pattern to the very <strong>end</strong> of the line or text.</li>
        <li><strong>Example:</strong> The pattern <code className="font-mono">^cat</code> will match "cat" only if it is the first word of a sentence. The pattern <code className="font-mono">cat$</code> matches only if "cat" is at the absolute end. If you want to ensure a string matches your expression exactly from start to end with no extra characters, wrap it like <code className="font-mono">^pattern$</code>.</li>
      </ul>

      <h3 className="text-xl font-bold text-zinc-900 dark:text-white mt-6 mb-2">
        9. Capture Groups (<code className="font-mono">()</code>)
      </h3>
      <p>
        Parentheses let you bundle characters together. This allows you to apply quantifiers to an entire phrase, or extract specific chunks of data later.
      </p>
      <ul className="list-disc pl-6 space-y-1 mb-4">
        <li><strong>Pattern:</strong> <code className="px-1.5 py-0.5 bg-zinc-100 dark:bg-zinc-800 rounded font-mono text-sm text-pink-600 dark:text-pink-400">(ha)+</code></li>
        <li><strong>Matches:</strong> "ha", "haha", "hahaha"</li>
        <li><strong>Why:</strong> The plus applies to the entire group "ha" rather than just the final letter "a".</li>
      </ul>

      <h2 className="text-2xl font-bold text-zinc-900 dark:text-white mt-8 mb-4">
        Mastering Flags: Modifying the Entire Pattern
      </h2>

      <p>
        Beyond symbols, regular expressions utilize optional "flags" that adjust the global behavior of the matching engine. Flags are added to the outer end of the pattern, following the closing slash (e.g., <code className="font-mono">/pattern/flags</code>).
      </p>

      <ul className="list-disc pl-6 space-y-2">
        <li><strong>g (Global):</strong> By default, the engine stops after finding the first match. The global flag tells it to keep scanning and return every single match in your target text.</li>
        <li><strong>i (Case-insensitive):</strong> Removes uppercase and lowercase distinctions. Under this flag, <code className="font-mono">/apple/i</code> will match "Apple", "APPLE", or "aPpLe" effortlessly.</li>
        <li><strong>m (Multiline):</strong> Alters how start and end anchors (<code className="font-mono">^</code> and <code className="font-mono">$</code>) work. Instead of matching only the beginning and end of the entire text block, it treats each line break as its own start and end boundary.</li>
      </ul>

      <p>
        You can visually toggle these flags on and off in our <Link href="/tools/regex-tester" className="text-emerald-600 dark:text-emerald-400 font-semibold underline">regex debugger</Link> to watch how they instantly shift which text is highlighted.
      </p>

      <h2 className="text-2xl font-bold text-zinc-900 dark:text-white mt-10 mb-4">
        4 Real-World Pattern Examples
      </h2>

      <p>
        Now that we have examined the individual building blocks, let's piece them together into useful, practical patterns you can copy and use right away.
      </p>

      <div className="space-y-6">
        <div>
          <h4 className="text-lg font-bold text-zinc-900 dark:text-white">
            1. North American Phone Numbers
          </h4>
          <pre className="bg-zinc-100 dark:bg-zinc-800/50 p-4 rounded-lg overflow-x-auto my-2 text-sm font-mono text-zinc-900 dark:text-zinc-100">
            {"\\d{3}-\\d{3}-\\d{4}"}
          </pre>
          <p className="text-sm">
            This scans for exactly three digits (area code), a hyphen, three digits (exchange prefix), a hyphen, and four final digits. It matches formats like "555-867-5309".
          </p>
        </div>

        <div>
          <h4 className="text-lg font-bold text-zinc-900 dark:text-white">
            2. Simple Email Validation
          </h4>
          <pre className="bg-zinc-100 dark:bg-zinc-800/50 p-4 rounded-lg overflow-x-auto my-2 text-sm font-mono text-zinc-900 dark:text-zinc-100">
            {"^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}$"}
          </pre>
          <p className="text-sm">
            Let's analyze it left-to-right: Start anchor (<code className="font-mono">^</code>), one or more username characters (<code className="font-mono">{"[a-zA-Z0-9._%+-]+"}</code>), an "@" sign, one or more domain name characters (<code className="font-mono">{"[a-zA-Z0-9.-]+"}</code>), a literal escaped period (<code className="font-mono">\.</code>), at least two letters for the extension (<code className="font-mono">{"[a-zA-Z]{2,}"}</code>), and the end anchor (<code className="font-mono">$</code>).
          </p>
        </div>

        <div>
          <h4 className="text-lg font-bold text-zinc-900 dark:text-white">
            3. URL Detector (HTTP/HTTPS)
          </h4>
          <pre className="bg-zinc-100 dark:bg-zinc-800/50 p-4 rounded-lg overflow-x-auto my-2 text-sm font-mono text-zinc-900 dark:text-zinc-100">
            {"https?://[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}"}
          </pre>
          <p className="text-sm">
            Matches "http" or "https" (the 's' is optional due to the question mark), followed by the literal string "://", a domain prefix, a literal period, and an extension.
          </p>
        </div>

        <div>
          <h4 className="text-lg font-bold text-zinc-900 dark:text-white">
            4. ISO Date Format (YYYY-MM-DD)
          </h4>
          <pre className="bg-zinc-100 dark:bg-zinc-800/50 p-4 rounded-lg overflow-x-auto my-2 text-sm font-mono text-zinc-900 dark:text-zinc-100">
            {"^\\d{4}-\\d{2}-\\d{2}$"}
          </pre>
          <p className="text-sm">
            Validates dates structured precisely as a four-digit year, a hyphen, a two-digit month, a hyphen, and a two-digit day. It will perfectly identify "2026-08-02".
          </p>
        </div>
      </div>

      <h2 className="text-2xl font-bold text-zinc-900 dark:text-white mt-10 mb-4">
        Common Beginner Mistakes (And How to Avoid Them)
      </h2>

      <p>
        Even experienced engineers make simple mistakes when writing expressions. Keep these three core gotchas in mind:
      </p>

      <ul className="list-disc pl-6 space-y-2 mb-6">
        <li>
          <strong>Forgetting to Escape Special Characters:</strong> If you are looking for a literal period, question mark, or asterisk in your text, you must prefix them with a backslash. Searching for <code className="font-mono">google.com</code> will match "googleocom" because the unescaped period matches any letter. Instead, write <code className="font-mono">google\.com</code>.
        </li>
        <li>
          <strong>Greedy Matching Surprises:</strong> By default, quantifiers like <code className="font-mono">*</code> and <code className="font-mono">+</code> are "greedy." They will match as much text as they possibly can. If you run the pattern <code className="font-mono">{"<.*>"}</code> on the string <code className="font-mono">{"<p>Hello</p>"}</code>, it won't just match <code className="font-mono">{"<p>"}</code> &mdash; it will swallow the entire string. To make a quantifier "lazy" and match the shortest path, append a question mark to it, like <code className="font-mono">{"<.*?>"}</code>.
        </li>
        <li>
          <strong>Catastrophic Backtracking:</strong> If you construct complex, deeply nested quantifiers like <code className="font-mono">(a+)+</code> and feed them long, slightly incorrect lines of text, the engine will spin infinitely trying to compute all possible permutations. This spikes CPU usage and can freeze your software. Keep patterns simple.
        </li>
      </ul>

      <div className="bg-emerald-50 dark:bg-emerald-950/20 border-l-4 border-emerald-500 p-6 rounded-r-xl my-8">
        <h4 className="text-lg font-bold text-emerald-900 dark:text-emerald-400 mb-2">
          Ready to Test Your Skills?
        </h4>
        <p className="text-sm text-emerald-800 dark:text-emerald-300 mb-4">
          Reading about regular expressions is a great first step, but the best way to master them is through hands-on practice. We built a beautiful, real-time regex testing environment just for this.
        </p>
        <Link
          href="/tools/regex-tester"
          className="inline-flex items-center justify-center px-5 py-2.5 text-sm font-semibold text-white bg-emerald-600 hover:bg-emerald-700 dark:bg-emerald-500 dark:hover:bg-emerald-600 rounded-lg shadow-sm transition-colors"
        >
          Open the Interactive Regex Tester &rarr;
        </Link>
      </div>

      <h2 className="text-2xl font-bold text-zinc-900 dark:text-white mt-10 mb-4">
        Frequently Asked Questions (FAQ)
      </h2>

      <div className="space-y-6">
        <div>
          <h4 className="text-lg font-bold text-zinc-900 dark:text-white">
            What does regex actually stand for?
          </h4>
          <p className="text-sm mt-1">
            Regex stands for Regular Expression. The term regular expressions comes from regular languages, a branch of theoretical computer science and formal language theory developed in the 1950s by mathematician Stephen Cole Kleene.
          </p>
        </div>

        <div>
          <h4 className="text-lg font-bold text-zinc-900 dark:text-white">
            Is regex a full programming language?
          </h4>
          <p className="text-sm mt-1">
            No, regex is not a general-purpose programming language. Instead, it is a specialized, domain-specific pattern-matching language. It is designed to be embedded and executed inside other host environments, such as a code editor, text parser, database, or programming script.
          </p>
        </div>

        <div>
          <h4 className="text-lg font-bold text-zinc-900 dark:text-white">
            What is the key difference between the asterisk (*) and plus (+) quantifiers?
          </h4>
          <p className="text-sm mt-1">
            The difference lies in minimum required matches. The asterisk is zero-or-more, meaning the target character is completely optional and doesn't have to be present. The plus quantifier is one-or-more, requiring the matched character to appear at least once to declare a match.
          </p>
        </div>

        <div>
          <h4 className="text-lg font-bold text-zinc-900 dark:text-white">
            How can I search for a literal period (.) or asterisk (*) without triggering wildcards?
          </h4>
          <p className="text-sm mt-1">
            You need to "escape" the characters using a backslash. Placing a backslash before a special character (like <code className="font-mono">\.</code> or <code className="font-mono">\*</code>) instructs the parsing engine to strip its functional power and match it as a plain text string instead.
          </p>
        </div>

        <div>
          <h4 className="text-lg font-bold text-zinc-900 dark:text-white">
            Are regular expressions case-sensitive by default?
          </h4>
          <p className="text-sm mt-1">
            Yes, they are highly case-sensitive by default. Searching for "cat" will completely ignore "Cat" or "CAT". If you want your searches to cross case boundaries, you must use the case-insensitive flag, which is usually designated as the <code className="font-mono">i</code> letter appended to your pattern.
          </p>
        </div>

        <div>
          <h4 className="text-lg font-bold text-zinc-900 dark:text-white">
            Can using bad regex patterns slow down my application?
          </h4>
          <p className="text-sm mt-1">
            Yes, drastically. If you write overly loose patterns containing nested quantifiers, the engine can enter a state known as catastrophic backtracking when fed long, mismatched inputs. This causes the engine to calculate millions of paths, which can spike CPU usage and freeze processes.
          </p>
        </div>
      </div>
    </>
  );
}
