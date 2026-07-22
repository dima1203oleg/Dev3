const fs = require('fs');
const path = require('path');

function processFile(filePath) {
  let content = fs.readFileSync(filePath, 'utf8');
  let original = content;

  // 1. Typography (Readability)
  // Replacing tiny fonts with more readable ones
  content = content.replace(/text-\[7px\]/g, 'text-[10px]');
  content = content.replace(/text-\[8px\]/g, 'text-[10px]');
  content = content.replace(/text-\[9px\]/g, 'text-xs');
  content = content.replace(/text-\[10px\]/g, 'text-xs');
  content = content.replace(/text-\[11px\]/g, 'text-sm');
  
  // 2. Reduce visual noise (Cyberpunk borders -> Clean elegant borders)
  content = content.replace(/border-blue-500\/[0-9]+/g, 'border-white/10');
  content = content.replace(/border-slate-800\/[0-9]+/g, 'border-white/10');
  content = content.replace(/border-slate-850/g, 'border-white/10');
  content = content.replace(/border-slate-900/g, 'border-white/10');
  content = content.replace(/border-emerald-500\/[0-9]+/g, 'border-white/10');
  content = content.replace(/border-rose-500\/[0-9]+/g, 'border-white/10');
  content = content.replace(/border-amber-500\/[0-9]+/g, 'border-white/10');
  content = content.replace(/border-cyan-500\/[0-9]+/g, 'border-white/10');
  content = content.replace(/border-indigo-500\/[0-9]+/g, 'border-white/10');
  content = content.replace(/border-sky-500\/[0-9]+/g, 'border-white/10');
  content = content.replace(/border-fuchsia-500\/[0-9]+/g, 'border-white/10');

  // 3. Improve contrast and spacing in badges/pills
  content = content.replace(/px-1\.5 py-0\.5/g, 'px-2 py-1');
  
  // 4. Backgrounds
  content = content.replace(/bg-\[#02050a\]/g, 'bg-[#0A0A0A]');
  content = content.replace(/bg-\[#030712\]/g, 'bg-[#0A0A0A]');
  content = content.replace(/bg-\[#050b14\]/g, 'bg-[#111111]');
  content = content.replace(/bg-\[#090e1a\]/g, 'bg-[#111111]');
  content = content.replace(/bg-\[#00050a\]/g, 'bg-[#000000]');
  content = content.replace(/bg-slate-950/g, 'bg-[#0A0A0A]');
  content = content.replace(/bg-slate-900/g, 'bg-[#111111]');

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
