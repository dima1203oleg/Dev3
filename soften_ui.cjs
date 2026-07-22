const fs = require('fs');
const path = require('path');

function processFile(filePath) {
  let content = fs.readFileSync(filePath, 'utf8');
  let original = content;

  // Soften borders
  content = content.replace(/border-slate-800\/80/g, 'border-white/10');
  content = content.replace(/border-slate-800/g, 'border-white/5');
  content = content.replace(/border-slate-700/g, 'border-white/10');
  
  // Softer backgrounds
  content = content.replace(/bg-slate-900(?!\/)/g, 'bg-slate-900/40 backdrop-blur-md');
  content = content.replace(/bg-slate-950(?!\/)/g, 'bg-[#020617]/80 backdrop-blur-xl');
  
  // Better shadows
  content = content.replace(/shadow-lg/g, 'shadow-2xl shadow-black/40');
  content = content.replace(/shadow-md/g, 'shadow-xl shadow-black/20');
  
  // Rounded corners
  content = content.replace(/rounded-lg/g, 'rounded-xl');
  content = content.replace(/rounded-xl/g, 'rounded-2xl');
  
  // Undo double replacement for 2xl if any happened
  content = content.replace(/rounded-2xlxl/g, 'rounded-3xl');

  if (content !== original) {
    fs.writeFileSync(filePath, content);
    console.log(`Updated UI in ${filePath}`);
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

// Global CSS updates for better scrollbars and selection
let cssContent = fs.readFileSync('src/index.css', 'utf8');
if (!cssContent.includes('::-webkit-scrollbar-track')) {
  cssContent += `
/* Refined Scrollbar */
::-webkit-scrollbar {
  width: 6px;
  height: 6px;
}
::-webkit-scrollbar-track {
  background: transparent;
}
::-webkit-scrollbar-thumb {
  background: rgba(255, 255, 255, 0.1);
  border-radius: 10px;
}
::-webkit-scrollbar-thumb:hover {
  background: rgba(255, 255, 255, 0.2);
}
`;
}
cssContent = cssContent.replace(
  /radial-gradient\(circle at top center, rgba\(30, 58, 138, 0\.1\) 0%, transparent 70%\)/,
  'radial-gradient(circle at top center, rgba(59, 130, 246, 0.08) 0%, transparent 70%)'
);
fs.writeFileSync('src/index.css', cssContent);

