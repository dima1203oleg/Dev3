const fs = require('fs');
let appContent = fs.readFileSync('src/App.tsx', 'utf8');

// Add subtle glow to active sidebar items
appContent = appContent.replace(
  /className=\{`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all \${ activeTab === tab.id \? 'bg-slate-800 text-white' : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800\/50' }`\}/g,
  `className={\`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all \${ activeTab === tab.id ? 'bg-indigo-500/15 text-indigo-300 border border-indigo-500/30 shadow-[inset_0_0_15px_rgba(99,102,241,0.1)]' : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/50 border border-transparent' }\`}`
);

// Improve the main viewport background
appContent = appContent.replace(
  /className="h-full flex flex-col relative bg-\[#020611\] text-slate-100 font-sans"/g,
  `className="h-full flex flex-col relative bg-[#020611] text-slate-100 font-sans bg-[url('https://www.transparenttextures.com/patterns/stardust.png')]" style={{ backgroundBlendMode: 'color-dodge' }}`
);

fs.writeFileSync('src/App.tsx', appContent);
