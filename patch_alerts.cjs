const fs = require('fs');
let code = fs.readFileSync('src/components/DashboardView.tsx', 'utf8');

const targetStr = `        <div className="xl:col-span-4 space-y-6">`;

const replacementStr = `        <div className="xl:col-span-4 space-y-6">
          
          {/* Critical Threat Alerts Panel */}
          <div className="bg-slate-900/40 border border-rose-500/10 rounded-2xl p-5 shadow-[0_4px_30px_rgba(225,29,72,0.05)] space-y-3.5 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-rose-500/5 blur-3xl rounded-full pointer-events-none"></div>
            <span className="text-[10px] text-rose-500 font-mono font-bold uppercase tracking-widest flex items-center justify-between border-b border-rose-500/10 pb-2">
              <span className="flex items-center gap-1.5"><ShieldAlert className="w-3.5 h-3.5" /> CRITICAL THREAT ALERTS</span>
              <span className="flex items-center gap-2">
                <span className="text-[8px] text-slate-500">LIVE</span>
                <span className="animate-pulse w-1.5 h-1.5 bg-rose-500 rounded-full"></span>
              </span>
            </span>
            <div className="space-y-2.5 max-h-[300px] overflow-y-auto pr-1" style={{ scrollbarWidth: 'thin', scrollbarColor: '#334155 transparent' }}>
              {OSINT_ENTITIES.filter(e => e.riskScore >= 75).map(entity => (
                <div 
                  key={entity.id}
                  onClick={() => {
                    onSelectEntity(entity.id);
                    onSelectTab('volumes');
                  }}
                  className="bg-slate-950/70 border border-rose-500/20 rounded-xl p-3 flex flex-col gap-2 transition-all duration-300 ease-out cursor-pointer group hover:bg-slate-900/80 hover:border-rose-400/50 hover:-translate-y-[1px] relative overflow-hidden"
                >
                  <div className="absolute left-0 top-0 bottom-0 w-[2px] bg-rose-500/50 group-hover:bg-rose-400 transition-colors"></div>
                  <div className="flex justify-between items-start pl-1">
                    <div className="flex items-center gap-2.5">
                      <div className="p-1.5 rounded-lg bg-rose-500/10 text-rose-400 group-hover:bg-rose-500/20 transition-colors border border-rose-500/10">
                        {entity.type === 'company' ? <Briefcase className="w-3.5 h-3.5" /> : entity.type === 'person' ? <User className="w-3.5 h-3.5" /> : <Terminal className="w-3.5 h-3.5" />}
                      </div>
                      <div>
                        <p className="text-xs font-bold text-slate-200 group-hover:text-rose-400 transition-colors line-clamp-1">{entity.name}</p>
                        <span className="text-[9px] text-slate-500 font-mono">{entity.type.toUpperCase()} • {entity.code}</span>
                      </div>
                    </div>
                    <span className="text-[10px] font-mono font-bold px-1.5 py-0.5 rounded bg-rose-500/10 text-rose-400 border border-rose-500/20 shrink-0">
                      {entity.riskScore}% RISK
                    </span>
                  </div>
                  <p className="text-[9px] text-slate-400 font-sans leading-relaxed line-clamp-2 pl-1 italic">
                    {entity.aiRecommendations || entity.description || 'Detected anomalous behavior patterns requiring immediate operational review.'}
                  </p>
                </div>
              ))}
            </div>
          </div>`;

code = code.replace(targetStr, replacementStr);
fs.writeFileSync('src/components/DashboardView.tsx', code);
