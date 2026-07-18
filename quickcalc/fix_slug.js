const fs = require("fs");
const path = require("path");

const filePath = path.join(__dirname, "app", "blog", "[slug]", "page.tsx");
let content = fs.readFileSync(filePath, "utf8");

content = content.replace("Underweight (BMI < 18.5)", "Underweight (BMI < 18.5)");

fs.writeFileSync(filePath, content, "utf8");
console.log("Replaced BMI < 18.5 with BMI < 18.5 in app/blog/[slug]/page.tsx");
