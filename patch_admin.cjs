const fs = require('fs');
let content = fs.readFileSync('src/components/AdminBackOffice.tsx', 'utf8');

const target1 = `className="p-3.5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-left"`;
const replacement1 = `className="p-3.5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-left transition-all duration-300 hover:bg-slate-900/60 hover:border-indigo-400/20 group cursor-pointer border border-transparent"`;

if (content.includes(target1)) {
  content = content.replace(new RegExp(target1.replace(/[.*+?^\${}()|[\\]\\\\]/g, '\\\\$&'), 'g'), replacement1);
  fs.writeFileSync('src/components/AdminBackOffice.tsx', content);
  console.log('Patched AdminBackOffice.tsx');
}
