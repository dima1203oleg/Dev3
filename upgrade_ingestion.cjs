const fs = require('fs');
let code = fs.readFileSync('src/components/DataIngestionTab.tsx', 'utf8');

// We will change the timeline progress from "100%" to depend on global "progress" state, making it look like real streaming.
code = code.replace(
  /<div className="absolute top-0 left-0 h-\[2px\] bg-cyan-500 transition-all duration-300" style=\{\{ width: isSimulating \? '100%' : '0%', transitionDelay: \`\$\{i \* 100\}ms\` \}\} \/>/,
  `<div className="absolute inset-0 bg-gradient-to-r from-cyan-500/0 via-cyan-500/5 to-cyan-500/10 transition-all duration-300" style={{ width: isSimulating ? \`\${Math.min(100, Math.max(0, progress * 1.5 - (i * 15)))}\%\` : '0%' }} />
   <div className="absolute bottom-0 left-0 h-[2px] bg-cyan-400 transition-all duration-300 shadow-[0_0_10px_#22d3ee]" style={{ width: isSimulating ? \`\${Math.min(100, Math.max(0, progress * 1.5 - (i * 15)))}\%\` : '0%' }} />`
);

// Add a glowing title text
code = code.replace(
  /PREDATOR DATA INGESTION LIVE CONTROL BOARD \/\/ СУВЕРЕННИЙ ПУЛЬТ/,
  `<span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-indigo-400">PREDATOR DATA INGESTION</span> <span className="text-slate-500 opacity-50">//</span> СУВЕРЕННИЙ ПУЛЬТ`
);

fs.writeFileSync('src/components/DataIngestionTab.tsx', code);
