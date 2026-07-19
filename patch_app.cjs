const fs = require('fs');
let content = fs.readFileSync('src/App.tsx', 'utf8');

const target1 = `className="w-full text-left px-3 py-2 rounded-lg text-xs font-semibold text-slate-300 hover:text-white hover:bg-indigo-600/20 hover:border-indigo-500/30 border border-transparent transition-all flex items-center justify-between cursor-pointer"`;
const replacement1 = `className="w-full text-left px-3 py-2 rounded-lg text-xs font-semibold text-slate-300 hover:text-white hover:bg-indigo-600/20 hover:border-indigo-500/40 border border-transparent transition-all duration-300 hover:-translate-y-[1px] hover:shadow-[0_2px_10px_rgba(99,102,241,0.15)] flex items-center justify-between cursor-pointer"`;

if (content.includes(target1)) {
  content = content.replace(new RegExp(target1.replace(/[.*+?^\${}()|[\\]\\\\]/g, '\\\\$&'), 'g'), replacement1);
  fs.writeFileSync('src/App.tsx', content);
  console.log('Patched App.tsx spotlight results');
}

const target2 = `className="w-full text-left px-3 py-2 rounded-lg text-xs font-semibold text-slate-300 hover:text-white hover:bg-rose-600/20 hover:border-rose-500/20 border border-transparent transition-all flex items-center justify-between cursor-pointer"`;
const replacement2 = `className="w-full text-left px-3 py-2 rounded-lg text-xs font-semibold text-slate-300 hover:text-white hover:bg-rose-600/20 hover:border-rose-500/40 border border-transparent transition-all duration-300 hover:-translate-y-[1px] hover:shadow-[0_2px_10px_rgba(244,63,94,0.15)] flex items-center justify-between cursor-pointer"`;

if (content.includes(target2)) {
  content = content.replace(new RegExp(target2.replace(/[.*+?^\${}()|[\\]\\\\]/g, '\\\\$&'), 'g'), replacement2);
  fs.writeFileSync('src/App.tsx', content);
  console.log('Patched App.tsx spotlight results (rose)');
}

