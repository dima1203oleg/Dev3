const fs = require('fs');
let code = fs.readFileSync('src/components/DataIngestionTab.tsx', 'utf8');

// Upgrade the parsers UI in DataIngestionTab
code = code.replace(
  /<div key=\{p\.id\} className="flex items-center justify-between p-2 bg-slate-900\/40 rounded border border-slate-800">/g,
  `<div key={p.id} className="flex items-center justify-between p-2 bg-slate-900/40 hover:bg-slate-800/40 rounded border border-slate-800/80 hover:border-indigo-500/30 transition-colors cursor-pointer group">`
);

code = code.replace(
  /<div className="col-span-4 bg-slate-950\/50 backdrop-blur-md border border-slate-800\/60 rounded-xl p-4 flex flex-col h-\[200px\]">/,
  `<div className="col-span-4 bg-slate-900/60 backdrop-blur-md border border-slate-700/50 rounded-xl p-4 flex flex-col h-[200px] shadow-lg relative overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-indigo-500/50 to-cyan-500/50" />`
);

code = code.replace(
  /<div className="col-span-8 bg-slate-950\/50 backdrop-blur-md border border-slate-800\/60 rounded-xl p-4 flex flex-col h-\[200px\]">/,
  `<div className="col-span-8 bg-slate-900/60 backdrop-blur-md border border-slate-700/50 rounded-xl p-4 flex flex-col h-[200px] shadow-lg relative overflow-hidden">
      <div className="absolute top-0 right-0 w-32 h-32 bg-cyan-500/10 blur-3xl rounded-full pointer-events-none" />`
);

fs.writeFileSync('src/components/DataIngestionTab.tsx', code);
