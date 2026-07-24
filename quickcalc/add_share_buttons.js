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
  "word-character-counter": "Word & Character Counter",
  "age-calculator": "Age Calculator",
  "budget-calculator": "Budget Calculator",
  "currency-converter": "Currency Converter",
  "group-expense-splitter": "Group Expense Splitter",
  "percentage-calculator": "Percentage Calculator"
};

tools.forEach(tool => {
  const pagePath = path.join(toolsDir, tool, "page.tsx");
  if (!fs.existsSync(pagePath)) return;

  let content = fs.readFileSync(pagePath, "utf8");

  // Skip if ShareButtons is already imported
  if (content.includes("ShareButtons") && content.includes("@/components/ShareButtons")) {
    console.log(`Skipping ${tool} - ShareButtons already added.`);
    return;
  }

  // Add import statement at the top (right after theme toggle or similar import)
  const importShareButtons = 'import ShareButtons from "@/components/ShareButtons";\n';
  const importLines = content.split("\n");
  const relatedToolsImportIdx = importLines.findIndex(line => line.includes("@/components/RelatedTools"));
  if (relatedToolsImportIdx !== -1) {
    importLines.splice(relatedToolsImportIdx + 1, 0, importShareButtons);
  } else {
    const firstImportIdx = importLines.findIndex(line => line.startsWith("import "));
    if (firstImportIdx !== -1) {
      importLines.splice(firstImportIdx, 0, importShareButtons);
    } else {
      importLines.unshift(importShareButtons);
    }
  }
  content = importLines.join("\n");

  const name = friendlyNames[tool] || tool.split("-").map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(" ");

  // Find the introductory container <div className="text-center max-w-... mx-auto mb-8"> ... </div>
  // and place the ShareButtons component right after it.
  const containerRegex = /(<div className="text-center max-w-[23]xl mx-auto mb-8">[\s\S]*?<\/div>)/;
  if (containerRegex.test(content)) {
    content = content.replace(containerRegex, `$1\n\n        <ShareButtons url="https://quickcalc.cloud/tools/${tool}" title="${name}" />`);
    console.log(`Added ShareButtons to ${tool}`);
  } else {
    // Fallback: search for closing </p> of introductory paragraph or after Breadcrumbs
    const breadcrumbRegex = /(<Breadcrumbs[^>]*\/>)/;
    if (breadcrumbRegex.test(content)) {
      content = content.replace(breadcrumbRegex, `$1\n\n        <ShareButtons url="https://quickcalc.cloud/tools/${tool}" title="${name}" />`);
      console.log(`Added ShareButtons to ${tool} (fallback to breadcrumbs)`);
    } else {
      console.log(`Could not find insertion point for ${tool}`);
    }
  }

  fs.writeFileSync(pagePath, content, "utf8");
});
