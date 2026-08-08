const fs = require('fs');
const path = require('path');

const iconDir = path.join(__dirname, 'extension', 'icons');
if (!fs.existsSync(iconDir)) {
  fs.mkdirSync(iconDir, { recursive: true });
}

// Minimal 1x1 green/teal pixel transparent PNG base
const createPngBuffer = (width, height) => {
  // SVG string representation
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}" viewBox="0 0 100 100">
    <rect width="100" height="100" rx="22" fill="#0d9488"/>
    <rect x="25" y="20" width="50" height="20" rx="4" fill="#ffffff" opacity="0.9"/>
    <circle cx="35" cy="55" r="7" fill="#ffffff"/>
    <circle cx="65" cy="55" r="7" fill="#ffffff"/>
    <circle cx="35" cy="75" r="7" fill="#ffffff"/>
    <circle cx="65" cy="75" r="7" fill="#ffffff"/>
  </svg>`;
  return svg;
};

// Write SVG icons which Chrome MV3 supports natively as vector assets, plus SVG wrappers
fs.writeFileSync(path.join(iconDir, 'icon-16.svg'), createPngBuffer(16, 16));
fs.writeFileSync(path.join(iconDir, 'icon-48.svg'), createPngBuffer(48, 48));
fs.writeFileSync(path.join(iconDir, 'icon-128.svg'), createPngBuffer(128, 128));

console.log("Extension SVG icons generated successfully.");
