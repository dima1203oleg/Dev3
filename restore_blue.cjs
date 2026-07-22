const fs = require('fs');
const path = require('path');

function processFile(filePath) {
  let content = fs.readFileSync(filePath, 'utf8');
  let original = content;

  // Restore backgrounds to deep blue tones
  content = content.replace(/bg-\[#0A0A0A\]/g, 'bg-[#030712]');
  content = content.replace(/bg-\[#111111\]/g, 'bg-[#0A101D]');
  content = content.replace(/bg-\[#000000\]/g, 'bg-[#00040A]');
  
  // Convert stark white borders to elegant subtle blue borders
  content = content.replace(/border-white\/10/g, 'border-blue-500/15');
  
  // Make some specific accents blue again (like primary panels)
  content = content.replace(/shadow-\[0_4px_30px_rgba\(0,0,0,0\.5\)\]/g, 'shadow-[0_4px_40px_rgba(30,58,138,0.15)]');
  content = content.replace(/shadow-\[0_4px_30px_rgba\(0,0,0,0\.3\)\]/g, 'shadow-[0_4px_30px_rgba(30,58,138,0.1)]');
  
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

// Update index.css for blue gradient backgrounds
let cssContent = fs.readFileSync('src/index.css', 'utf8');
cssContent = cssContent.replace(/background-color: #050505;/, 'background-color: #020617;');
cssContent = cssContent.replace(
  /radial-gradient\(circle at top center, rgba\(30, 41, 59, 0\.3\) 0%, transparent 60%\)/,
  'radial-gradient(circle at top, rgba(30, 58, 138, 0.15) 0%, transparent 60%)'
);
cssContent = cssContent.replace(
  /radial-gradient\(circle at bottom center, rgba\(15, 23, 42, 0\.4\) 0%, transparent 80%\)/,
  'radial-gradient(ellipse at bottom, rgba(15, 23, 42, 0.6) 0%, transparent 80%)'
);

cssContent = cssContent.replace(
  /background: rgba\(15, 15, 15, 0\.6\);/,
  'background: linear-gradient(135deg, rgba(15, 23, 42, 0.6) 0%, rgba(3, 7, 18, 0.8) 100%);'
);
cssContent = cssContent.replace(
  /border: 1px solid rgba\(255, 255, 255, 0\.08\);/,
  'border: 1px solid rgba(59, 130, 246, 0.15);'
);
cssContent = cssContent.replace(
  /border-top: 1px solid rgba\(255, 255, 255, 0\.12\);/,
  'border-top: 1px solid rgba(59, 130, 246, 0.25);'
);
cssContent = cssContent.replace(
  /box-shadow: 0 10px 40px -10px rgba\(0, 0, 0, 0\.5\);/,
  'box-shadow: 0 10px 40px -10px rgba(0, 0, 0, 0.5), 0 0 20px -5px rgba(59, 130, 246, 0.1);'
);

cssContent = cssContent.replace(
  /background: rgba\(20, 20, 20, 0\.5\);/,
  'background: rgba(15, 23, 42, 0.4);'
);
cssContent = cssContent.replace(
  /border: 1px solid rgba\(255, 255, 255, 0\.05\);/,
  'border: 1px solid rgba(59, 130, 246, 0.1);'
);
cssContent = cssContent.replace(
  /box-shadow: 0 4px 20px rgba\(0, 0, 0, 0\.3\);/,
  'box-shadow: 0 4px 20px rgba(0, 0, 0, 0.3), 0 0 15px -3px rgba(59, 130, 246, 0.05);'
);

fs.writeFileSync('src/index.css', cssContent);

