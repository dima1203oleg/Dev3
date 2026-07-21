const fs = require('fs');
let code = fs.readFileSync('src/components/OsintWorkbench.tsx', 'utf8');

// Upgrade the dossier panel wrapper to have dynamic glow based on risk
code = code.replace(
  /<div className="bg-slate-900\/40 border border-blue-500\/5 rounded-2xl overflow-hidden shadow-xl">/,
  `<div className={\`bg-slate-900/40 border rounded-2xl overflow-hidden shadow-xl transition-all duration-500 \${activeEntity.riskScore > 75 ? 'border-rose-500/20 shadow-[0_0_40px_rgba(244,63,94,0.05)]' : activeEntity.riskScore > 50 ? 'border-amber-500/20 shadow-[0_0_40px_rgba(245,158,11,0.05)]' : 'border-blue-500/10'}\`}>`
);

// Add a glowing background gradient to Dossier Header
code = code.replace(
  /<div className="p-5 border-b border-blue-500\/5 bg-slate-950\/60 relative">/,
  `<div className="p-5 border-b border-slate-800 bg-gradient-to-br from-slate-950 to-slate-900/80 relative overflow-hidden">
     <div className={\`absolute top-0 right-0 w-64 h-64 bg-gradient-to-bl from-transparent to-transparent opacity-20 blur-3xl pointer-events-none \${activeEntity.riskScore > 75 ? 'from-rose-500' : activeEntity.riskScore > 50 ? 'from-amber-500' : 'from-blue-500'}\`} />`
);

// Upgrade graph background to include a grid
code = code.replace(
  /<div className="relative w-full h-\[320px\] bg-slate-900\/40 border border-blue-500\/5 rounded-xl overflow-hidden flex items-center justify-center">/,
  `<div className="relative w-full h-[320px] bg-slate-950/80 border border-slate-800 rounded-xl overflow-hidden flex items-center justify-center" style={{ backgroundImage: 'radial-gradient(#1e293b 1px, transparent 1px)', backgroundSize: '20px 20px' }}>`
);

fs.writeFileSync('src/components/OsintWorkbench.tsx', code);
