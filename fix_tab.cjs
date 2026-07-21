const fs = require('fs');
let code = fs.readFileSync('src/components/DataIngestionTab.tsx', 'utf8');

// I will add a dynamic terminal and actual active parsing metrics
code = code.replace(
  /const workers = \[/,
  `const [parsers, setParsers] = useState([
    { id: 'tg-1', name: 'Telegram - Insider_UA', status: 'Активно', count: 1240 },
    { id: 'tg-2', name: 'Telegram - Труха', status: 'Активно', count: 850 },
    { id: 'fb-1', name: 'Facebook - Target Group', status: 'Сканування', count: 320 },
    { id: 'x-1', name: 'X/Twitter API Stream', status: 'Обмеження API', count: 15 }
  ]);
  
  const workers = [`
);

// We replace the timeline row with a new layout that includes a Parsers column.
code = code.replace(
  /\{\/\* Matrix & Flow Row \*\/\}/,
  `{/* Sources and Config Row */}
        <div className="col-span-12 grid grid-cols-12 gap-4">
          <div className="col-span-4 bg-slate-950/50 backdrop-blur-md border border-slate-800/60 rounded-xl p-4 flex flex-col h-[200px]">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2 text-xs font-bold text-slate-300 uppercase tracking-widest">
                <Globe className="w-4 h-4 text-indigo-400" />
                АКТИВНІ ПАРСЕРИ (SOCIAL & TG)
              </div>
              <button className="text-[10px] bg-indigo-500/10 text-indigo-400 px-2 py-1 rounded border border-indigo-500/30 hover:bg-indigo-500/20 transition-colors">+ Додати джерело</button>
            </div>
            <div className="space-y-2 overflow-y-auto custom-scrollbar pr-1 flex-1">
              {parsers.map(p => (
                <div key={p.id} className="flex items-center justify-between p-2 bg-slate-900/40 rounded border border-slate-800">
                  <div className="flex flex-col">
                    <span className="text-[11px] font-bold text-slate-200">{p.name}</span>
                    <span className={\`text-[9px] font-mono \${p.status.includes('Актив') || p.status.includes('Скан') ? 'text-emerald-400' : 'text-rose-400'}\`}>{p.status}</span>
                  </div>
                  <span className="text-[10px] font-mono text-slate-400">{p.count} зап.</span>
                </div>
              ))}
            </div>
          </div>
          
          <div className="col-span-8 bg-slate-950/50 backdrop-blur-md border border-slate-800/60 rounded-xl p-4 flex flex-col h-[200px]">
             <div className="flex items-center gap-2 text-xs font-bold text-slate-300 uppercase tracking-widest mb-3">
                <Terminal className="w-4 h-4 text-cyan-400" />
                МЕТРИКИ ЗБОРУ (RAW DATA INGEST)
              </div>
              <div className="grid grid-cols-3 gap-3 flex-1">
                 <div className="bg-slate-900/40 border border-slate-800 rounded-lg p-3 flex flex-col justify-center items-center relative overflow-hidden">
                    <div className="absolute top-0 w-full h-[1px] bg-gradient-to-r from-transparent via-cyan-500/50 to-transparent"></div>
                    <span className="text-[10px] text-slate-400 font-mono mb-1">TELEGRAM JSON MSG</span>
                    <span className="text-2xl font-bold text-cyan-400">245,020</span>
                    <span className="text-[9px] text-emerald-400 mt-1">↑ 12% за годину</span>
                 </div>
                 <div className="bg-slate-900/40 border border-slate-800 rounded-lg p-3 flex flex-col justify-center items-center relative overflow-hidden">
                    <div className="absolute top-0 w-full h-[1px] bg-gradient-to-r from-transparent via-indigo-500/50 to-transparent"></div>
                    <span className="text-[10px] text-slate-400 font-mono mb-1">SOCIAL MEDIA HTML</span>
                    <span className="text-2xl font-bold text-indigo-400">89,142</span>
                    <span className="text-[9px] text-emerald-400 mt-1">↑ 5% за годину</span>
                 </div>
                 <div className="bg-slate-900/40 border border-slate-800 rounded-lg p-3 flex flex-col justify-center items-center relative overflow-hidden">
                    <div className="absolute top-0 w-full h-[1px] bg-gradient-to-r from-transparent via-amber-500/50 to-transparent"></div>
                    <span className="text-[10px] text-slate-400 font-mono mb-1">DARKNET ONION RSS</span>
                    <span className="text-2xl font-bold text-amber-400">1,024</span>
                    <span className="text-[9px] text-rose-400 mt-1">↓ 2% за годину</span>
                 </div>
              </div>
          </div>
        </div>

        {/* Matrix & Flow Row */}`
);

fs.writeFileSync('src/components/DataIngestionTab.tsx', code);
