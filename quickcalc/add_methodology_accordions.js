const fs = require("fs");
const path = require("path");

const toolsDir = path.join(__dirname, "app", "tools");
const tools = fs.readdirSync(toolsDir).filter(f => fs.statSync(path.join(toolsDir, f)).isDirectory() && f !== "[slug]");

tools.forEach(tool => {
  const pagePath = path.join(toolsDir, tool, "page.tsx");
  if (!fs.existsSync(pagePath)) return;

  let content = fs.readFileSync(pagePath, "utf8");

  // Skip if MethodologyAccordion is already added
  if (content.includes("MethodologyAccordion")) {
    console.log(`Skipping ${tool} - MethodologyAccordion already present.`);
    return;
  }

  // 1. Add import statement at the top
  const importStmt = 'import MethodologyAccordion from "@/components/MethodologyAccordion";\n';
  const importLines = content.split("\n");
  const firstImportIdx = importLines.findIndex(line => line.startsWith("import "));
  if (firstImportIdx !== -1) {
    importLines.splice(firstImportIdx, 0, importStmt);
  } else {
    importLines.unshift(importStmt);
  }
  content = importLines.join("\n");

  // 2. Insert MethodologyAccordion after the widget section (<section className="my-8"> ... </section>)
  const widgetSectionRegex = /(<section className="my-8">[\s\S]*?<\/section>)/;
  if (widgetSectionRegex.test(content)) {
    content = content.replace(
      widgetSectionRegex,
      `$1\n\n        {/* Collapsible Scientific & Mathematical Methodology */}
        <MethodologyAccordion slug="${tool}" />`
    );
    console.log(`Added MethodologyAccordion to ${tool}`);
  } else {
    console.log(`Could not find widget section in ${tool}`);
  }

  fs.writeFileSync(pagePath, content, "utf8");
});

console.log("Completed adding MethodologyAccordion to tool pages.");
