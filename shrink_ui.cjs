const fs = require('fs');
const path = require('path');

function processFile(filePath) {
  let content = fs.readFileSync(filePath, 'utf8');
  let original = content;

  // Restore paddings
  content = content.replace(/px-2 py-1/g, 'px-1.5 py-0.5');
  content = content.replace(/p-4\.5/g, 'p-4');

  // Scale down typography
  content = content.replace(/text-sm|text-xs|text-\[10px\]/g, (match) => {
    if (match === 'text-sm') return 'text-xs';
    if (match === 'text-xs') return 'text-[10px]';
    if (match === 'text-[10px]') return 'text-[9px]';
    return match;
  });

  if (content !== original) {
    fs.writeFileSync(filePath, content);
    console.log(`Updated ${filePath}`);
  }
}

function walkDir(dir) {
  const files = fs.readdirSync(dir);
  for (const file of files) {
    const fullPath = path.join(dir, file);
    if (fs.statSync(fullPath).isDirectory()) {
      walkDir(fullPath);
    } else if (fullPath.endsWith('.tsx') || fullPath.endsWith('.ts')) {
      processFile(fullPath);
    }
  }
}

walkDir('src');
