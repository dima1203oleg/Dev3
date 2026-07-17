const fs = require('fs');
const glob = require('glob');

const files = glob.sync('src/components/**/*.tsx');

files.forEach(file => {
  let content = fs.readFileSync(file, 'utf8');
  
  // Replace standard solid slate backgrounds with highly translucent ones
  content = content.replace(/bg-slate-900(?!\/[0-9]+)/g, 'bg-slate-900/50 backdrop-blur-md shadow-[0_4px_30px_rgba(0,0,0,0.3)]');
  content = content.replace(/bg-slate-950(?!\/[0-9]+)/g, 'bg-slate-950/40 backdrop-blur-md shadow-[0_4px_30px_rgba(0,0,0,0.5)]');
  
  // Add some border glows
  content = content.replace(/border-slate-800/g, 'border-indigo-500/10');
  content = content.replace(/border-slate-900/g, 'border-indigo-500/5');

  fs.writeFileSync(file, content);
});

// Also patch App.tsx
let appContent = fs.readFileSync('src/App.tsx', 'utf8');
appContent = appContent.replace(/bg-slate-900(?!\/[0-9]+)/g, 'bg-slate-900/50 backdrop-blur-md shadow-[0_4px_30px_rgba(0,0,0,0.3)]');
appContent = appContent.replace(/bg-slate-950(?!\/[0-9]+)/g, 'bg-slate-950/40 backdrop-blur-md shadow-[0_4px_30px_rgba(0,0,0,0.5)]');
appContent = appContent.replace(/border-slate-800/g, 'border-indigo-500/10');
appContent = appContent.replace(/border-slate-900/g, 'border-indigo-500/5');
fs.writeFileSync('src/App.tsx', appContent);

