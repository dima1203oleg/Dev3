const fs = require('fs');
const glob = require('glob');

const files = glob.sync('src/components/**/*.tsx');

files.forEach(file => {
  let content = fs.readFileSync(file, 'utf8');
  
  // Replace slate-400 with slate-300 in text for better readability
  content = content.replace(/text-slate-400/g, 'text-slate-300');
  
  // Enhance button background visibility
  content = content.replace(/bg-indigo-600\/10/g, 'bg-indigo-600/20');
  content = content.replace(/border-indigo-500\/20/g, 'border-indigo-500/30');

  fs.writeFileSync(file, content);
});

// App.tsx
let appContent = fs.readFileSync('src/App.tsx', 'utf8');
appContent = appContent.replace(/text-slate-400/g, 'text-slate-300');
appContent = appContent.replace(/bg-indigo-600\/10/g, 'bg-indigo-600/20');
appContent = appContent.replace(/border-indigo-500\/20/g, 'border-indigo-500/30');
fs.writeFileSync('src/App.tsx', appContent);

