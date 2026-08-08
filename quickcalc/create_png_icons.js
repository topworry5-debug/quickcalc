const fs = require('fs');
const path = require('path');

const iconDir = path.join(__dirname, 'extension', 'icons');
if (!fs.existsSync(iconDir)) {
  fs.mkdirSync(iconDir, { recursive: true });
}

// 1x1 teal pixel PNG base64
const tealPngBase64 = "iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mP8z8BQDwAEhQGAhKmMIQAAAABJRU5ErkJggg==";
const pngBuffer = Buffer.from(tealPngBase64, 'base64');

fs.writeFileSync(path.join(iconDir, 'icon-16.png'), pngBuffer);
fs.writeFileSync(path.join(iconDir, 'icon-48.png'), pngBuffer);
fs.writeFileSync(path.join(iconDir, 'icon-128.png'), pngBuffer);

console.log("PNG icons created.");
