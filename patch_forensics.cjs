const fs = require('fs');
let content = fs.readFileSync('src/components/MediaForensicsTab.tsx', 'utf8');

const target = `className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 bg-slate-950/40 hover:bg-slate-900/60 border border-slate-800/50 hover:border-fuchsia-500/30 p-2.5 rounded-lg text-xs font-mono cursor-pointer transition-all"`;
const replacement = `className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 bg-slate-950/40 border border-slate-800/50 p-2.5 rounded-lg text-xs font-mono cursor-pointer transition-all duration-300 ease-out hover:bg-slate-900/70 hover:border-indigo-400/50 hover:shadow-[0_4px_15px_rgba(99,102,241,0.15)] hover:-translate-y-[1px]"`;

if (content.includes(target)) {
  content = content.replace(target, replacement);
  fs.writeFileSync('src/components/MediaForensicsTab.tsx', content);
  console.log('Patched MediaForensicsTab.tsx');
} else {
  console.log('Target not found in MediaForensicsTab.tsx');
}
