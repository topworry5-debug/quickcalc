const fs = require("fs");
const path = require("path");

const toolsDir = path.join(__dirname, "app", "tools");
const tools = fs.readdirSync(toolsDir).filter(f => fs.statSync(path.join(toolsDir, f)).isDirectory());

const otherPages = [
  path.join(__dirname, "app", "about", "page.tsx"),
  path.join(__dirname, "app", "contact", "page.tsx"),
  path.join(__dirname, "app", "terms", "page.tsx"),
  path.join(__dirname, "app", "privacy-policy", "page.tsx"),
];

const allPaths = tools.map(t => path.join(toolsDir, t, "page.tsx")).concat(otherPages);

allPaths.forEach(pagePath => {
  if (!fs.existsSync(pagePath)) return;

  let content = fs.readFileSync(pagePath, "utf8").replace(/\r\n/g, "\n");

  // Skip if Blog link is already added
  if (content.includes('href="/blog"')) {
    console.log(`Skipping ${path.basename(path.dirname(pagePath))} - Blog link already added.`);
    return;
  }

  // Look for the Home link and insert the Blog link after it with a separator
  const homeLinkEmerald = `            <Link href="/" className="text-sm font-medium text-zinc-600 dark:text-zinc-400 hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors">
              Home
            </Link>`;
  const homeLinkBlue = `            <Link href="/" className="text-sm font-medium text-zinc-600 dark:text-zinc-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
              Home
            </Link>`;
  const homeLinkIndigo = `            <Link href="/" className="text-sm font-medium text-zinc-600 dark:text-zinc-400 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">
              Home
            </Link>`;
  const homeLinkTeal = `            <Link href="/" className="text-sm font-medium text-zinc-600 dark:text-zinc-400 hover:text-teal-600 dark:hover:text-teal-400 transition-colors">
              Home
            </Link>`;
  const homeLinkZinc = `            <Link href="/" className="text-sm font-medium text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-200 transition-colors">
              Home
            </Link>`;
  const homeLinkRose = `            <Link href="/" className="text-sm font-medium text-zinc-600 dark:text-zinc-400 hover:text-rose-600 dark:hover:text-rose-400 transition-colors">
              Home
            </Link>`;

  let replaced = false;

  const replaceWithBlog = (target, hoverText, hoverDark) => {
    const blogInsert = `\n            <Link href="/blog" className="text-sm font-medium text-zinc-600 dark:text-zinc-400 hover:text-${hoverText} dark:hover:text-${hoverDark} transition-colors">
              Blog
            </Link>\n            <span className="text-sm font-medium text-zinc-300 dark:text-zinc-700 font-normal">|</span>`;
    return target + blogInsert;
  };

  if (content.includes(homeLinkEmerald)) {
    content = content.replace(homeLinkEmerald, replaceWithBlog(homeLinkEmerald, "emerald-600", "emerald-400"));
    replaced = true;
  } else if (content.includes(homeLinkBlue)) {
    content = content.replace(homeLinkBlue, replaceWithBlog(homeLinkBlue, "blue-600", "blue-400"));
    replaced = true;
  } else if (content.includes(homeLinkIndigo)) {
    content = content.replace(homeLinkIndigo, replaceWithBlog(homeLinkIndigo, "indigo-600", "indigo-400"));
    replaced = true;
  } else if (content.includes(homeLinkTeal)) {
    content = content.replace(homeLinkTeal, replaceWithBlog(homeLinkTeal, "teal-600", "teal-400"));
    replaced = true;
  } else if (content.includes(homeLinkZinc)) {
    content = content.replace(homeLinkZinc, replaceWithBlog(homeLinkZinc, "zinc-900", "zinc-200"));
    replaced = true;
  } else if (content.includes(homeLinkRose)) {
    content = content.replace(homeLinkRose, replaceWithBlog(homeLinkRose, "rose-600", "rose-400"));
    replaced = true;
  }

  if (replaced) {
    fs.writeFileSync(pagePath, content, "utf8");
    console.log(`Added Blog link to ${path.basename(path.dirname(pagePath))}`);
  } else {
    console.log(`Could not find Home link format in ${path.basename(path.dirname(pagePath))}`);
  }
});
