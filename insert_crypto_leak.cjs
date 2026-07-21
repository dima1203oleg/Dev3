const fs = require('fs');
let code = fs.readFileSync('src/components/OsintWorkbench.tsx', 'utf8');

const anchorStr = `              {/* Courts / Litigation history (Section 13) */}`;

const insertionStr = `              {/* Cryptocurrency Data */}
              {(activeEntity as any).cryptoData && (
                <div className="bg-slate-950/60 border border-amber-500/10 rounded-xl p-4 space-y-3">
                  <span className="text-[9px] text-amber-500/80 font-mono font-bold uppercase tracking-widest block flex items-center gap-1.5">
                    <Zap className="w-3.5 h-3.5" /> ON-CHAIN МЕТРИКИ (BLOCKCHAIN)
                  </span>
                  <div className="grid grid-cols-2 gap-3 text-[11px] font-mono">
                    <div className="bg-slate-900/50 p-2 rounded-lg border border-blue-500/5 flex justify-between">
                      <span className="text-slate-500">Поточний баланс</span>
                      <span className="text-amber-400 font-bold">{(activeEntity as any).cryptoData.balance}</span>
                    </div>
                    <div className="bg-slate-900/50 p-2 rounded-lg border border-blue-500/5 flex justify-between">
                      <span className="text-slate-500">Рівень ризику (AML)</span>
                      <span className="text-rose-400 font-bold">{(activeEntity as any).cryptoData.exposureIndex}</span>
                    </div>
                  </div>
                  
                  <div className="space-y-1.5 pt-1">
                    <span className="text-[9px] text-slate-500 font-mono font-bold uppercase tracking-widest block">Останні транзакції</span>
                    <div className="space-y-1">
                      {(activeEntity as any).cryptoData.recentTransactions.map((tx: any, i: number) => (
                        <div key={i} className="flex items-center justify-between bg-slate-900/30 p-2 rounded border border-blue-500/5 text-[10px] font-mono">
                          <div className="flex items-center gap-2">
                            {tx.type === 'IN' ? <ArrowDownLeft className="w-3 h-3 text-emerald-400" /> : <ArrowUpRight className="w-3 h-3 text-rose-400" />}
                            <span className="text-slate-400 truncate w-[100px]">{tx.txHash}</span>
                          </div>
                          <span className={\`font-bold \${tx.type === 'IN' ? 'text-emerald-400' : 'text-rose-400'}\`}>{tx.amount}</span>
                          <span className="text-slate-500">{tx.relatedAddress}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                  
                  <div className="space-y-1.5 pt-1">
                    <span className="text-[9px] text-slate-500 font-mono font-bold uppercase tracking-widest block">Кластерний аналіз (Афіліації)</span>
                    <div className="flex flex-wrap gap-1.5">
                      {(activeEntity as any).cryptoData.knownClusters.map((cluster: string, i: number) => (
                         <span key={i} className="px-2 py-0.5 rounded text-[9px] font-bold font-mono bg-amber-500/10 text-amber-500 border border-amber-500/20">{cluster}</span>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {/* Data Leak / Deep Web Mentions */}
              {(activeEntity as any).leakData && (
                <div className="bg-slate-950/60 border border-fuchsia-500/10 rounded-xl p-4 space-y-3">
                  <div className="flex items-center justify-between">
                     <span className="text-[9px] text-fuchsia-500/80 font-mono font-bold uppercase tracking-widest block flex items-center gap-1.5">
                       <Scan className="w-3.5 h-3.5" /> ВИТОКИ ДАНИХ (DARKNET & BREACHES)
                     </span>
                     <span className="px-2 py-0.5 rounded text-[9px] font-bold font-mono bg-fuchsia-500/10 text-fuchsia-400 border border-fuchsia-500/20 animate-pulse">{(activeEntity as any).leakData.totalBreaches} ЗБІГІВ</span>
                  </div>
                  
                  <div className="space-y-1.5">
                     {(activeEntity as any).leakData.breaches.map((breach: any, i: number) => (
                       <div key={i} className="bg-slate-900/50 p-2.5 rounded border border-blue-500/5 space-y-1.5">
                         <div className="flex items-center justify-between">
                            <span className="text-[10px] font-bold text-slate-300 flex items-center gap-1.5"><Terminal className="w-3 h-3 text-slate-500" /> {breach.source}</span>
                            <span className="text-[9px] text-slate-500 font-mono">{breach.date}</span>
                         </div>
                         <div className="flex gap-1.5 text-[9px] font-mono">
                            <span className="text-slate-500 uppercase">Скомпрометовано:</span>
                            <span className="text-slate-300">{breach.compromisedData.join(', ')}</span>
                         </div>
                       </div>
                     ))}
                  </div>
                  
                  <div className="bg-slate-900/30 p-2 rounded flex justify-between text-[10px] font-mono border border-blue-500/5">
                     <span className="text-slate-500 uppercase">Згадки на Darknet-форумах:</span>
                     <span className="text-fuchsia-400 font-bold">{(activeEntity as any).leakData.darknetMentions} (остання {(activeEntity as any).leakData.lastDarknetMention})</span>
                  </div>
                </div>
              )}
`;

code = code.replace(anchorStr, insertionStr + '\n' + anchorStr);
fs.writeFileSync('src/components/OsintWorkbench.tsx', code);
