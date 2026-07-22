const fs = require('fs');
const path = require('path');

function processFile(filePath) {
  let content = fs.readFileSync(filePath, 'utf8');
  let original = content;

  // Paddings and Margins
  content = content.replace(/p-6/g, 'p-4');
  content = content.replace(/p-5/g, 'p-3');
  content = content.replace(/p-8/g, 'p-5');
  content = content.replace(/px-6/g, 'px-4');
  content = content.replace(/py-6/g, 'py-4');
  content = content.replace(/px-5/g, 'px-3');
  content = content.replace(/py-5/g, 'py-3');
  content = content.replace(/gap-6/g, 'gap-4');
  content = content.replace(/gap-5/g, 'gap-3');
  
  // Height constraints (for containers that are too tall)
  content = content.replace(/h-\[520px\]/g, 'h-[400px]');
  content = content.replace(/h-\[480px\]/g, 'h-[380px]');
  content = content.replace(/h-\[460px\]/g, 'h-[360px]');
  content = content.replace(/h-\[450px\]/g, 'h-[350px]');

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
