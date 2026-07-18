const fs = require("fs");
const path = require("path");

const toolsDir = path.join(__dirname, "app", "tools");
const tools = fs.readdirSync(toolsDir).filter(f => fs.statSync(path.join(toolsDir, f)).isDirectory());

const friendlyNames = {
  "bmi-calculator": "BMI Calculator",
  "color-palette-generator": "Color Palette Generator",
  "due-date-calculator": "Due Date Calculator",
  "gpa-converter": "GPA Converter",
  "json-csv-converter": "JSON & CSV Converter",
  "loan-calculator": "Loan / EMI Calculator",
  "paper-fabric-size-converter": "Paper & Fabric Size Converter",
  "password-generator": "Secure Password Generator",
  "regex-tester": "Regex Tester",
  "shoe-size-converter": "Shoe Size Converter",
  "sleep-cycle-calculator": "Sleep Cycle Calculator",
  "timezone-meeting-planner": "Timezone Meeting Planner",
  "tip-calculator": "Tip Calculator",
  "water-intake-calculator": "Water Intake Calculator",
  "word-character-counter": "Word & Character Counter"
};

tools.forEach(tool => {
  const pagePath = path.join(toolsDir, tool, "page.tsx");
  if (!fs.existsSync(pagePath)) return;

  let content = fs.readFileSync(pagePath, "utf8");

  // Skip if Breadcrumbs is already imported
  if (content.includes("Breadcrumbs") && content.includes("@/components/Breadcrumbs")) {
    console.log(`Skipping ${tool} - Breadcrumbs already added.`);
    return;
  }

  // Add import statement at the top
  const importBreadcrumbs = 'import Breadcrumbs from "@/components/Breadcrumbs";\n';
  const importLines = content.split("\n");
  const firstImportIdx = importLines.findIndex(line => line.startsWith("import "));
  if (firstImportIdx !== -1) {
    importLines.splice(firstImportIdx, 0, importBreadcrumbs);
  } else {
    importLines.unshift(importBreadcrumbs);
  }
  content = importLines.join("\n");

  const name = friendlyNames[tool] || tool.split("-").map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(" ");

  // Find the H1 element and place Breadcrumbs right above it or above its container,
  // or right above the main title section.
  // Generally above `<h1 ` is very good, or right after the opening container `main` or wrapper `div`.
  // Let's place it right before the H1 container or at the top of the main container/wrapper.
  // In the baseline pages, they have:
  // `<main className="max-w-4xl mx-auto px-4 py-8 sm:py-12">`
  // We can insert `<Breadcrumbs toolName="${name}" toolSlug="${tool}" />` right after the opening main tag:
  // `<main className="max-w-4xl mx-auto px-4 py-8 sm:py-12">`
  
  const mainTagRegex = /<main[^>]*>/;
  const match = content.match(mainTagRegex);
  if (match) {
    const matchedTag = match[0];
    const replacement = `${matchedTag}\n        <Breadcrumbs toolName="${name}" toolSlug="${tool}" />`;
    content = content.replace(mainTagRegex, replacement);
    console.log(`Added breadcrumbs to ${tool}`);
  } else {
    // If no main tag, let's search for first container div or similar
    const containerTagRegex = /<div className="min-h-screen[^>]*>[\s\S]*?<div[^>]*>/;
    const matchDiv = content.match(containerTagRegex);
    if (matchDiv) {
      const replacement = `${matchDiv[0]}\n        <Breadcrumbs toolName="${name}" toolSlug="${tool}" />`;
      content = content.replace(containerTagRegex, replacement);
      console.log(`Added breadcrumbs to ${tool} (fallback to div)`);
    } else {
      console.log(`Could not find insertion point for ${tool}`);
    }
  }

  fs.writeFileSync(pagePath, content, "utf8");
});
