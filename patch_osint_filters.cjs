const fs = require('fs');
let code = fs.readFileSync('src/components/OsintWorkbench.tsx', 'utf8');

const targetStr = `            <div className="flex items-center justify-between border-b border-blue-500/5 pb-3 mb-3">
              <div className="flex items-center gap-2">
                <Filter className="w-4 h-4 text-blue-400" />
                <span className="text-xs font-bold text-slate-100 uppercase tracking-widest">
                  Об'єкти ({filteredEntities.length})
                </span>
              </div>
              {(filteredEntities.length < entities.length || searchQuery || activeFilter !== 'all' || categoryFilter !== 'all' || riskLevelFilter !== 'all' || startDate || endDate) && (
                <button
                  onClick={() => {
                    setActiveFilter('all');
                    setCategoryFilter('all');
                    setRiskLevelFilter('all');
                    setSearchQuery('');
                    setStartDate('');
                    setEndDate('');
                  }}
                  className="text-[9px] text-blue-400 hover:text-indigo-300 font-mono font-bold cursor-pointer transition-colors"
                >
                  Скинути
                </button>
              )}
            </div>

            {/* Selection control bar */}`;

const replacementStr = `            <div className="flex items-center justify-between border-b border-blue-500/5 pb-3 mb-3">
              <div className="flex items-center gap-2">
                <Filter className="w-4 h-4 text-blue-400" />
                <span className="text-xs font-bold text-slate-100 uppercase tracking-widest">
                  Об'єкти ({filteredEntities.length})
                </span>
              </div>
              {(filteredEntities.length < entities.length || searchQuery || activeFilter !== 'all' || categoryFilter !== 'all' || riskLevelFilter !== 'all' || startDate || endDate) && (
                <button
                  onClick={() => {
                    setActiveFilter('all');
                    setCategoryFilter('all');
                    setRiskLevelFilter('all');
                    setSearchQuery('');
                    setStartDate('');
                    setEndDate('');
                  }}
                  className="text-[9px] text-blue-400 hover:text-indigo-300 font-mono font-bold cursor-pointer transition-colors"
                >
                  Скинути
                </button>
              )}
            </div>
            
            {/* Local Filters Panel */}
            <div className="flex flex-col gap-2 mb-3 bg-slate-950/20 p-2.5 rounded-xl border border-blue-500/10">
              <div className="flex flex-col gap-1.5">
                <span className="text-[9px] text-slate-500 font-mono font-bold uppercase">Рівень ризику:</span>
                <div className="flex flex-wrap gap-1.5">
                  <button onClick={() => setRiskLevelFilter('all')} className={\`px-2 py-1 rounded text-[9px] font-bold uppercase transition-colors cursor-pointer \${riskLevelFilter === 'all' ? 'bg-blue-600/20 text-blue-400 border border-blue-500/30' : 'bg-slate-900/50 text-slate-400 border border-transparent hover:bg-slate-800'}\`}>Всі</button>
                  <button onClick={() => setRiskLevelFilter('high')} className={\`px-2 py-1 rounded text-[9px] font-bold uppercase transition-colors cursor-pointer \${riskLevelFilter === 'high' ? 'bg-rose-600/20 text-rose-400 border border-rose-500/30' : 'bg-slate-900/50 text-slate-400 border border-transparent hover:bg-slate-800'}\`}>Критичний / Високий</button>
                  <button onClick={() => setRiskLevelFilter('medium')} className={\`px-2 py-1 rounded text-[9px] font-bold uppercase transition-colors cursor-pointer \${riskLevelFilter === 'medium' ? 'bg-amber-600/20 text-amber-400 border border-amber-500/30' : 'bg-slate-900/50 text-slate-400 border border-transparent hover:bg-slate-800'}\`}>Середній</button>
                  <button onClick={() => setRiskLevelFilter('low')} className={\`px-2 py-1 rounded text-[9px] font-bold uppercase transition-colors cursor-pointer \${riskLevelFilter === 'low' ? 'bg-emerald-600/20 text-emerald-400 border border-emerald-500/30' : 'bg-slate-900/50 text-slate-400 border border-transparent hover:bg-slate-800'}\`}>Низький</button>
                </div>
              </div>
              
              <div className="flex flex-col gap-1.5">
                <span className="text-[9px] text-slate-500 font-mono font-bold uppercase">Тип контрагента:</span>
                <div className="flex flex-wrap gap-1.5">
                  <button onClick={() => setActiveFilter('all')} className={\`px-2 py-1 rounded text-[9px] font-bold uppercase transition-colors cursor-pointer \${activeFilter === 'all' ? 'bg-blue-600/20 text-blue-400 border border-blue-500/30' : 'bg-slate-900/50 text-slate-400 border border-transparent hover:bg-slate-800'}\`}>Всі</button>
                  <button onClick={() => setActiveFilter('company')} className={\`px-2 py-1 rounded text-[9px] font-bold uppercase transition-colors cursor-pointer \${activeFilter === 'company' ? 'bg-blue-600/20 text-blue-400 border border-blue-500/30' : 'bg-slate-900/50 text-slate-400 border border-transparent hover:bg-slate-800'}\`}>ТОВ (Юр. особи)</button>
                  <button onClick={() => setActiveFilter('person')} className={\`px-2 py-1 rounded text-[9px] font-bold uppercase transition-colors cursor-pointer \${activeFilter === 'person' ? 'bg-blue-600/20 text-blue-400 border border-blue-500/30' : 'bg-slate-900/50 text-slate-400 border border-transparent hover:bg-slate-800'}\`}>ФОП (Фіз. особи)</button>
                </div>
              </div>
            </div>

            {/* Selection control bar */}`;

code = code.replace(targetStr, replacementStr);
fs.writeFileSync('src/components/OsintWorkbench.tsx', code);
