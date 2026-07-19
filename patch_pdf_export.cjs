const fs = require('fs');
let content = fs.readFileSync('src/components/MediaForensicsTab.tsx', 'utf8');

const targetStr = `        <div className="hidden lg:flex items-center gap-3">
          <div className="bg-slate-950/40 backdrop-blur-md shadow-[0_4px_30px_rgba(0,0,0,0.5)] border border-indigo-500/10 px-3 py-1.5 rounded-lg flex items-center gap-2">`;

const replacement = `        <div className="hidden lg:flex items-center gap-3">
          <button
            onClick={() => window.print()}
            className="bg-indigo-600/20 hover:bg-indigo-600/40 border border-indigo-500/30 text-indigo-400 px-3 py-1.5 rounded-lg flex items-center gap-2 transition-colors cursor-pointer"
            title="Експорт поточного аналізу у PDF"
          >
            <FileText className="w-4 h-4" />
            <span className="text-[10px] font-mono font-bold uppercase">Експорт PDF</span>
          </button>
          <div className="bg-slate-950/40 backdrop-blur-md shadow-[0_4px_30px_rgba(0,0,0,0.5)] border border-indigo-500/10 px-3 py-1.5 rounded-lg flex items-center gap-2">`;

content = content.replace(targetStr, replacement);
fs.writeFileSync('src/components/MediaForensicsTab.tsx', content);
