const fs = require('fs');
const path = require('path');

function processFile(filePath) {
  let content = fs.readFileSync(filePath, 'utf8');
  let original = content;

  // Let's replace 'text-[10px]' with 'text-xs'
  content = content.replace(/text-\[10px\]/g, 'text-xs');
  
  // Replace tiny py-0.5 with py-1
  content = content.replace(/px-1\.5 py-0\.5/g, 'px-2 py-1');
  content = content.replace(/px-2 py-0\.5/g, 'px-2 py-1');

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
