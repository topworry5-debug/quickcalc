const fs = require('fs');
const path = require('path');

const planText = fs.readFileSync('../seo-keyword-plan.md', 'utf8');
const lines = planText.split('\n').filter(line => line.startsWith('|'));
const tableRows = lines.slice(2);

const planEntries = {};
tableRows.forEach(row => {
  const sanitizedRow = row.replace(/\\\|/g, '__PIPE__');
  const cols = split('|').map(c => c.replace(/__PIPE__/g, '|').trim());
  if (cols.length >= 7) {
    const slug = cols[2];
    if (slug && slug !== 'Slug') {
      planEntries[slug] = {
        name: cols[1],
        slug: cols[2],
        currentTitle: cols[3],
        currentDesc: cols[4],
        suggestedTitle: cols[5],
        suggestedDesc: cols[6],
        status: cols[7]
      };
    }
  }
});

const toolsDir = path.join(process.cwd(), 'app', 'tools');
const dirs = fs.readdirSync(toolsDir).filter(f => fs.statSync(path.join(toolsDir, f)).isDirectory());

let updatedCount = 0;

dirs.forEach(slug => {
  const pagePath = path.join(toolsDir, slug, 'page.tsx');
  if (!fs.existsSync(pagePath)) return;
  const entry = planEntries[slug];
  if (!entry) {
    console.log(`[SKIP] No plan entry for ${slug}`);
    return;
  }

  let content = fs.readFileSync(pagePath, 'utf8');

  // Extract metadata section
  const metadataStart = content.indexOf('export const metadata: Metadata = {');
  if (metadataStart === -1) {
    console.log(`[SKIP] Metadata not found in ${slug}`);
    return;
  }

  // Find ending of metadata block (end of line containing `};` after metadataStart)
  let metadataEnd = content.indexOf('};', metadataStart);
  if (metadataEnd === -1) {
    console.log(`[SKIP] Metadata closing bracket not found in ${slug}`);
    return;
  }

  // We want to replace inside metadata block
  let metaBlock = content.slice(metadataStart, metadataEnd + 2);
  let newMetaBlock = metaBlock;

  // Replace top-level title
  newMetaBlock = newMetaBlock.replace(
    /(export const metadata:\s*Metadata\s*=\s*\{[\s\S]*?title:\s*)"[^"]*"/,
    `$1${JSON.stringify(entry.suggestedTitle)}`
  );

  // Replace top-level description
  newMetaBlock = newMetaBlock.replace(
    /(export const metadata:\s*Metadata\s*=\s*\{[\s\S]*?description:\s*)"[^"]*"/,
    `$1${JSON.stringify(entry.suggestedDesc)}`
  );

  // Replace openGraph title
  newMetaBlock = newMetaBlock.replace(
    /(openGraph:\s*\{[\s\S]*?title:\s*)"[^"]*"/,
    `$1${JSON.stringify(entry.suggestedTitle)}`
  );

  // Replace openGraph description
  newMetaBlock = newMetaBlock.replace(
    /(openGraph:\s*\{[\s\S]*?description:\s*)"[^"]*"/,
    `$1${JSON.stringify(entry.suggestedDesc)}`
  );

  // Replace twitter title
  newMetaBlock = newMetaBlock.replace(
    /(twitter:\s*\{[\s\S]*?title:\s*)"[^"]*"/,
    `$1${JSON.stringify(entry.suggestedTitle)}`
  );

  // Replace twitter description
  newMetaBlock = newMetaBlock.replace(
    /(twitter:\s*\{[\s\S]*?description:\s*)"[^"]*"/,
    `$1${JSON.stringify(entry.suggestedDesc)}`
  );

  if (metaBlock !== newMetaBlock) {
    updatedCount++;
    console.log(`[UPDATE] ${slug}`);
    content = content.slice(0, metadataStart) + newMetaBlock + content.slice(metadataEnd + 2);
    fs.writeFileSync(pagePath, content, 'utf8');
  } else {
    console.log(`[NO CHANGE] ${slug}`);
  }
});

console.log(`\nUpdated ${updatedCount} tool pages.`);

// Now update seo-keyword-plan.md status column to 'Applied'
let planContent = fs.readFileSync('../seo-keyword-plan.md', 'utf8');
let planLines = planContent.split('\n');
let modifiedPlanLines = planLines.map(line => {
  if (line.startsWith('|') && !line.includes('Tool Name') && !line.includes('---|')) {
    return line.replace(/Pending Review\s*\|/, 'Applied |');
  }
  return line;
});

fs.writeFileSync('../seo-keyword-plan.md', modifiedPlanLines.join('\n'), 'utf8');
console.log('Updated seo-keyword-plan.md statuses to Applied.');
