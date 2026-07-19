const fs = require('fs');
let content = fs.readFileSync('src/components/DashboardView.tsx', 'utf8');

let count = 0;

const target1 = `className="bg-slate-950/70 border border-indigo-500/5 hover:border-indigo-500/10 rounded-xl p-3 flex items-center justify-between transition-colors cursor-pointer group"`;
const replacement1 = `className="bg-slate-950/70 border border-indigo-500/5 rounded-xl p-3 flex items-center justify-between transition-all duration-300 ease-out cursor-pointer group hover:bg-slate-900/60 hover:border-indigo-400/40 hover:-translate-y-[1px] hover:shadow-[0_4px_15px_rgba(99,102,241,0.1)]"`;

if (content.includes(target1)) {
  content = content.replace(target1, replacement1);
  count++;
}

const target2 = `className="bg-slate-950/40 backdrop-blur-md shadow-[0_4px_30px_rgba(0,0,0,0.5)] p-3 rounded-xl border border-indigo-500/5 space-y-1.5"`;
const replacement2 = `className="bg-slate-950/40 backdrop-blur-md shadow-[0_4px_30px_rgba(0,0,0,0.5)] p-3 rounded-xl border border-indigo-500/5 space-y-1.5 transition-all duration-300 hover:bg-slate-900/60 hover:border-indigo-400/40 hover:-translate-y-[1px] hover:shadow-[0_4px_15px_rgba(99,102,241,0.1)] cursor-default"`;

if (content.includes(target2)) {
  content = content.replace(new RegExp(target2.replace(/[.*+?^\${}()|[\\]\\\\]/g, '\\\\$&'), 'g'), replacement2);
  count++;
}

if (count > 0) {
  fs.writeFileSync('src/components/DashboardView.tsx', content);
  console.log('Patched DashboardView.tsx', count);
}
