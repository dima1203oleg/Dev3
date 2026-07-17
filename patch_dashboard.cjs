const fs = require('fs');
let appContent = fs.readFileSync('src/components/DashboardView.tsx', 'utf8');

// Replace standard #0b1329 with highly translucent slate-900 with strong backdrop blur and glow
appContent = appContent.replace(
  /bg-\[#0b1329\]\/60 border border-slate-850 hover:border-indigo-500\/30 rounded-2xl/g,
  `bg-slate-900/40 border border-slate-800 hover:border-indigo-500/50 rounded-2xl shadow-[0_4px_30px_rgba(0,0,0,0.5)] backdrop-blur-md`
);

appContent = appContent.replace(
  /bg-\[#0b1329\]\/60 border border-slate-850 rounded-2xl/g,
  `bg-slate-900/40 border border-slate-800 rounded-2xl shadow-[0_4px_30px_rgba(0,0,0,0.5)] backdrop-blur-md`
);

fs.writeFileSync('src/components/DashboardView.tsx', appContent);
