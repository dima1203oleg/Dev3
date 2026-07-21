const fs = require('fs');
let code = fs.readFileSync('src/components/OsintWorkbench.tsx', 'utf8');

// We will add a toggle in the Visualizer Panel: [ 2D Network ] [ Transaction Flow ]
const targetVisualizerHeader = `<div className="flex items-center justify-between border-b border-blue-500/5 pb-3">
              <div className="flex items-center gap-2">
                <Network className="w-4.5 h-4.5 text-blue-400" />
                <h4 className="text-xs font-bold text-slate-100 uppercase tracking-widest">
                  Граф зв'язків та Link Analysis (2D View)
                </h4>
              </div>
              <span className="text-[9px] text-slate-500 font-mono">
                Клікніть на суміжний вузол для навігації
              </span>
            </div>`;
            
const replaceVisualizerHeader = `<div className="flex items-center justify-between border-b border-blue-500/5 pb-3">
              <div className="flex items-center gap-2">
                {activeEntity.type === 'cryptowallet' ? <TrendingUp className="w-4.5 h-4.5 text-amber-400" /> : <Network className="w-4.5 h-4.5 text-blue-400" />}
                <h4 className="text-xs font-bold text-slate-100 uppercase tracking-widest">
                  {activeEntity.type === 'cryptowallet' ? 'Крипто-потоки (AML Flow)' : "Граф зв'язків та Link Analysis (2D View)"}
                </h4>
              </div>
              <div className="flex gap-2">
                 <span className="px-2 py-1 bg-slate-900/50 rounded border border-blue-500/10 text-[9px] font-mono text-slate-300">
                    Depth: 3
                 </span>
                 <span className="px-2 py-1 bg-slate-900/50 rounded border border-blue-500/10 text-[9px] font-mono text-slate-300">
                    Force: On
                 </span>
              </div>
            </div>`;

code = code.replace(targetVisualizerHeader, replaceVisualizerHeader);

fs.writeFileSync('src/components/OsintWorkbench.tsx', code);
