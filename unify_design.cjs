const fs = require('fs');
const path = require('path');

function processFile(filePath) {
  let content = fs.readFileSync(filePath, 'utf8');
  let original = content;

  // 1. Unify colors
  content = content.replace(/bg-\[#030712\]/g, 'bg-slate-950');
  content = content.replace(/bg-\[#020612\]/g, 'bg-slate-950');
  content = content.replace(/bg-\[#00040A\]/g, 'bg-slate-950');
  content = content.replace(/bg-\[#0A101D\]/g, 'bg-slate-900');
  content = content.replace(/bg-\[#111111\]/g, 'bg-slate-900');
  content = content.replace(/bg-\[#000000\]/g, 'bg-black');
  content = content.replace(/bg-\[#0A0A0A\]/g, 'bg-slate-950');

  // Borders
  content = content.replace(/border-white\/5/g, 'border-slate-800');
  content = content.replace(/border-blue-500\/15/g, 'border-slate-800/80');
  content = content.replace(/border-blue-500\/20/g, 'border-slate-700');

  // 2. Improve typography (scale up)
  content = content.replace(/text-\[8px\]/g, 'text-[10px]');
  content = content.replace(/text-\[9px\]/g, 'text-[10px]');
  content = content.replace(/text-\[10px\]/g, 'text-xs');
  content = content.replace(/text-xs/g, 'text-xs'); // keep xs
  
  // 3. Layout tweaks (increase paddings slightly for breathing room)
  // Instead of simple replacement which could be dangerous, we will focus on colors and typography, which has the biggest impact on 'visability' and 'cleanness'.

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

// Update index.css
let cssContent = fs.readFileSync('src/index.css', 'utf8');
cssContent = cssContent.replace(/background-color: #020617;/, 'background-color: #020617;'); // Slate 950
cssContent = cssContent.replace(
  /radial-gradient\(circle at top, rgba\(30, 58, 138, 0\.15\) 0%, transparent 60%\)/,
  'radial-gradient(circle at top center, rgba(30, 58, 138, 0.1) 0%, transparent 70%)'
);
cssContent = cssContent.replace(
  /radial-gradient\(ellipse at bottom, rgba\(15, 23, 42, 0\.6\) 0%, transparent 80%\)/,
  'radial-gradient(circle at bottom center, rgba(15, 23, 42, 0.4) 0%, transparent 80%)'
);
fs.writeFileSync('src/index.css', cssContent);

