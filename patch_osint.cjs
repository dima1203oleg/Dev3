const fs = require('fs');
let content = fs.readFileSync('src/components/OsintWorkbench.tsx', 'utf8');

const target1 = `className="relative pl-6 pb-6 border-l border-indigo-500/10 last:border-transparent last:pb-0"`;
const replacement1 = `className="relative pl-6 pb-6 border-l border-indigo-500/10 last:border-transparent last:pb-0 group transition-all duration-300 hover:bg-slate-900/40 hover:border-indigo-500/30 rounded-r-xl"`;

if (content.includes(target1)) {
  content = content.replace(new RegExp(target1.replace(/[.*+?^\${}()|[\\]\\\\]/g, '\\\\$&'), 'g'), replacement1);
  fs.writeFileSync('src/components/OsintWorkbench.tsx', content);
  console.log('Patched OsintWorkbench.tsx');
}
