const fs = require('fs');
const path = require('path');

function processFile(filePath) {
  let content = fs.readFileSync(filePath, 'utf8');
  let original = content;

  // Shrink Sidebar
  content = content.replace(/w-\[230px\]/g, 'w-[210px]');
  content = content.replace(/w-\[280px\]/g, 'w-[210px]');
  content = content.replace(/w-\[72px\]/g, 'w-[64px]');

  // Shrink padding & margins globally
  content = content.replace(/p-4/g, 'p-3');
  content = content.replace(/p-5/g, 'p-4');
  content = content.replace(/px-4/g, 'px-3');
  content = content.replace(/py-4/g, 'py-3');
  content = content.replace(/py-3\.5/g, 'py-2');
  content = content.replace(/px-5/g, 'px-4');
  content = content.replace(/py-3/g, 'py-2');
  
  // Shrink gaps
  content = content.replace(/gap-4/g, 'gap-3');
  content = content.replace(/gap-3/g, 'gap-2');
  
  // Shrink icons
  content = content.replace(/w-5 h-5/g, 'w-4 h-4');
  content = content.replace(/w-6 h-6/g, 'w-5 h-5');
  
  // Decrease border radii if they are too large
  content = content.replace(/rounded-xl/g, 'rounded-lg');
  content = content.replace(/rounded-2xl/g, 'rounded-xl');

  // Shrink text
  content = content.replace(/text-sm/g, 'text-xs');
  content = content.replace(/text-base/g, 'text-sm');
  content = content.replace(/text-lg/g, 'text-base');
  content = content.replace(/text-xl/g, 'text-lg');

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

