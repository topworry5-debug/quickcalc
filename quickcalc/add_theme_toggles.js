const fs = require("fs");
const path = require("path");

const toolsDir = path.join(__dirname, "app", "tools");
const tools = fs.readdirSync(toolsDir).filter(f => fs.statSync(path.join(toolsDir, f)).isDirectory());

const otherPages = [
  path.join(__dirname, "app", "about", "page.tsx"),
  path.join(__dirname, "app", "contact", "page.tsx"),
  path.join(__dirname, "app", "terms", "page.tsx"),
  path.join(__dirname, "app", "privacy-policy", "page.tsx"),
  path.join(__dirname, "app", "HomeClient.tsx")
];

const allPaths = tools.map(t => path.join(toolsDir, t, "page.tsx")).concat(otherPages);

allPaths.forEach(pagePath => {
  if (!fs.existsSync(pagePath)) return;

  let content = fs.readFileSync(pagePath, "utf8");

  // Skip if ThemeToggle is already added
  if (content.includes("ThemeToggle")) {
    console.log(`Skipping ${path.basename(path.dirname(pagePath))} - ThemeToggle already added.`);
    return;
  }

  // Add import statement at the top
  const importToggle = 'import ThemeToggle from "@/components/ThemeToggle";\n';
  const importLines = content.split("\n");
  const firstImportIdx = importLines.findIndex(line => line.startsWith("import "));
  if (firstImportIdx !== -1) {
    importLines.splice(firstImportIdx, 0, importToggle);
  } else {
    importLines.unshift(importToggle);
  }
  content = importLines.join("\n");

  if (pagePath.endsWith("HomeClient.tsx")) {
    // Custom insert for HomeClient
    const targetText = `<div className="text-sm font-medium text-zinc-500 dark:text-zinc-400">\n            Ultimate Calculator Suite\n          </div>`;
    const replacementText = `<div className="flex items-center gap-4">\n            <div className="text-sm font-medium text-zinc-500 dark:text-zinc-400 hidden sm:block">\n              Ultimate Calculator Suite\n            </div>\n            <ThemeToggle />\n          </div>`;
    content = content.replace(targetText, replacementText);
    console.log("Added ThemeToggle to HomeClient");
  } else {
    // Standard tool page nav insert
    const navEndTag = "          </nav>";
    const navEndReplacement = `            <span className="text-sm font-medium text-zinc-300 dark:text-zinc-700 font-normal">|</span>\n            <ThemeToggle />\n          </nav>`;
    content = content.replace(navEndTag, navEndReplacement);
    console.log(`Added ThemeToggle to ${path.basename(path.dirname(pagePath))}`);
  }

  fs.writeFileSync(pagePath, content, "utf8");
});
