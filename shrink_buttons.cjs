const fs = require('fs');
const path = require('path');

function processFile(filePath) {
  let content = fs.readFileSync(filePath, 'utf8');
  let original = content;

  // Shrink button paddings
  content = content.replace(/px-3 py-2\.5/g, 'px-2 py-1.5');
  content = content.replace(/px-3 py-2/g, 'px-2 py-1.5');
  content = content.replace(/px-4 py-2/g, 'px-3 py-1.5');

  // Specific for Sidebar and headers
  content = content.replace(/h-16/g, 'h-12');
  content = content.replace(/h-14/g, 'h-10');

  // Shrink some inner elements
  content = content.replace(/p-3/g, 'p-2');

  if (content !== original) {
    fs.writeFileSync(filePath, content);
    console.log(`Updated buttons in ${filePath}`);
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
