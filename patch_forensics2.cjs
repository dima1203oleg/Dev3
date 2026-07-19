const fs = require('fs');
let content = fs.readFileSync('src/components/MediaForensicsTab.tsx', 'utf8');

const target = `className="bg-slate-900/50 backdrop-blur-md shadow-[0_4px_30px_rgba(0,0,0,0.3)] border border-indigo-500/10 rounded-xl overflow-hidden"`;
const replacement = `className="bg-slate-900/50 backdrop-blur-md shadow-[0_4px_30px_rgba(0,0,0,0.3)] border border-indigo-500/10 rounded-xl overflow-hidden transition-all duration-300 hover:bg-slate-800/50 hover:border-indigo-400/30 hover:-translate-y-[2px] hover:shadow-[0_8px_20px_rgba(99,102,241,0.1)]"`;

if (content.includes(target)) {
  content = content.replace(target, replacement);
  fs.writeFileSync('src/components/MediaForensicsTab.tsx', content);
  console.log('Patched fileQueue in MediaForensicsTab.tsx');
} else {
  console.log('Target not found in MediaForensicsTab.tsx (fileQueue)');
}
