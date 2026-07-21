const fs = require('fs');
let code = fs.readFileSync('src/components/MediaForensicsTab.tsx', 'utf8');

// Header
code = code.replace(
  /<div className="bg-slate-900\/60 border border-blue-500\/10 rounded-xl p-6 backdrop-blur-md flex items-center justify-between">/,
  `<div className="bg-slate-950/80 border-b border-sky-500/20 rounded-t-xl p-6 backdrop-blur-md flex items-center justify-between shadow-[0_4px_40px_rgba(14,165,233,0.1)] relative overflow-hidden">
     <div className="absolute inset-0 bg-gradient-to-r from-sky-500/5 to-transparent pointer-events-none" />`
);

// Control panel wrapper
code = code.replace(
  /<div className="bg-slate-900\/60 border border-blue-500\/10 rounded-xl p-5">/,
  `<div className="bg-slate-900/40 border border-sky-500/10 rounded-xl p-5 shadow-lg relative overflow-hidden">
     <div className="absolute top-0 right-0 w-32 h-32 bg-sky-500/5 blur-3xl rounded-full pointer-events-none" />`
);

fs.writeFileSync('src/components/MediaForensicsTab.tsx', code);
