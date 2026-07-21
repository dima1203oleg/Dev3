const fs = require('fs');
let code = fs.readFileSync('src/components/MediaForensicsTab.tsx', 'utf8');

const targetStrStart = `              {/* State for Generation / Grounding mode */}
              {activeMode !== 'analysis' && (`;
const targetStrEnd = `                  </AnimatePresence>
                </>
              )}`;

const targetIdxStart = code.indexOf(targetStrStart);
const targetIdxEnd = code.indexOf(targetStrEnd, targetIdxStart) + targetStrEnd.length;

if (targetIdxStart !== -1 && targetIdxEnd !== -1) {
    const oldBlock = code.substring(targetIdxStart, targetIdxEnd);
    
    const newBlock = `              {/* UI for Parsers / Subscriptions */}
              {activeMode === 'parsers' && (
                <div className="space-y-4">
                  <div className="flex items-center justify-between mb-2">
                     <h3 className="text-sm font-bold text-slate-200">Активні підписки моніторингу</h3>
                     <span className="text-[10px] text-slate-400 bg-slate-900/50 px-2 py-1 rounded-lg border border-slate-800">
                       Усього: {monitoredResources.length}
                     </span>
                  </div>
                  <div className="grid grid-cols-1 gap-3">
                    <AnimatePresence>
                      {monitoredResources.map(res => (
                        <motion.div 
                          key={res.id}
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, scale: 0.95 }}
                          className="bg-slate-900/40 border border-sky-500/10 rounded-xl p-4 flex items-center justify-between group hover:bg-slate-800/40 transition-colors"
                        >
                          <div className="flex items-center gap-4">
                            <div className={\`p-2.5 rounded-lg \${res.status === 'active' ? 'bg-emerald-500/10 text-emerald-400' : res.status === 'syncing' ? 'bg-amber-500/10 text-amber-400 animate-pulse' : 'bg-rose-500/10 text-rose-400'}\`}>
                               {res.type === 'telegram' ? <TrendingUp className="w-5 h-5" /> : <Scan className="w-5 h-5" />}
                            </div>
                            <div>
                              <div className="flex items-center gap-2">
                                <h4 className="text-sm font-bold text-slate-200">{res.title}</h4>
                                <span className="text-[9px] font-mono px-1.5 py-0.5 rounded border border-slate-700 text-slate-400 uppercase">{res.type}</span>
                              </div>
                              <a href={res.url.startsWith('http') ? res.url : \`https://\${res.url}\`} target="_blank" rel="noreferrer" className="text-xs text-sky-400 hover:underline flex items-center gap-1 mt-0.5">
                                {res.url}
                              </a>
                            </div>
                          </div>
                          
                          <div className="flex items-center gap-6">
                            <div className="text-right hidden md:block">
                              <p className="text-[10px] text-slate-500 uppercase font-mono">Проаналізовано</p>
                              <p className="text-sm font-bold text-slate-300">{res.messagesAnalyzed.toLocaleString()}</p>
                            </div>
                            <div className="text-right hidden md:block">
                              <p className="text-[10px] text-slate-500 uppercase font-mono">Загрози</p>
                              <p className={\`text-sm font-bold \${res.threatsDetected > 0 ? 'text-rose-400' : 'text-slate-300'}\`}>{res.threatsDetected}</p>
                            </div>
                            <div className="text-right">
                              <p className="text-[10px] text-slate-500 uppercase font-mono">Останнє оновлення</p>
                              <p className="text-xs font-medium text-emerald-400 flex items-center gap-1 justify-end">
                                <div className={\`w-1.5 h-1.5 rounded-full \${res.status === 'active' ? 'bg-emerald-400' : 'bg-amber-400'}\`}></div>
                                {res.lastActivity}
                              </p>
                            </div>
                            <button 
                              onClick={() => setMonitoredResources(monitoredResources.filter(r => r.id !== res.id))}
                              className="p-1.5 text-slate-500 hover:text-rose-400 hover:bg-rose-500/10 rounded-lg transition-colors opacity-0 group-hover:opacity-100"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>
                        </motion.div>
                      ))}
                    </AnimatePresence>
                  </div>
                </div>
              )}

              {/* State for Generation / Grounding / Music mode */}
              {(activeMode !== 'analysis' && activeMode !== 'parsers') && (`;
              
    code = code.replace(oldBlock, newBlock + `
                <>
                  {!result && !loading && (
                    <div className="h-full flex flex-col items-center justify-center text-slate-500 opacity-50">
                      <Bot className="w-16 h-16 mb-4 text-slate-600" />
                      <p className="text-sm">Очікування завдання...</p>
                    </div>
                  )}
                  {loading && (
                    <div className="h-full flex flex-col items-center justify-center space-y-6">
                      <div className="relative">
                        <div className="absolute inset-0 border border-sky-500/30 rounded-full animate-ping"></div>
                        <div className="w-16 h-16 rounded-full border border-sky-500/50 flex items-center justify-center bg-sky-500/5">
                          <Sparkles className="w-6 h-6 text-sky-400 animate-pulse" />
                        </div>
                      </div>
                      <div className="space-y-2 text-center w-full max-w-sm">
                        <p className="text-sm font-mono text-sky-400">Ініціалізація нейромережі...</p>
                        <p className="text-xs text-slate-500 mb-4">Виділення тензорних ядер для обробки {activeMode}</p>
                        <div className="h-2 w-full bg-slate-900 rounded-full overflow-hidden border border-blue-500/20 relative mt-4">
                          <motion.div 
                            className="absolute top-0 left-0 h-full bg-gradient-to-r from-fuchsia-600 to-blue-500"
                            initial={{ width: 0 }}
                            animate={{ width: \`\${Math.min(100, Math.round(simulatedProgress))}%\` }}
                            transition={{ duration: 0.3 }}
                          />
                        </div>
                        <div className="flex justify-between text-[10px] font-mono text-slate-400 mt-2">
                          <span>Processing...</span>
                          <span>{Math.min(100, Math.round(simulatedProgress))}%</span>
                        </div>
                      </div>
                    </div>
                  )}
                  <AnimatePresence>
                    {result && !loading && (
                      <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="space-y-4"
                      >
                        {result.image && (
                          <div className="rounded-xl overflow-hidden border border-blue-500/10 bg-black flex items-center justify-center">
                             <img src={result.image} alt="Generated" className="max-h-[400px] object-contain w-full" />
                          </div>
                        )}
                        
                        <div className="bg-slate-900/50 border border-blue-500/10 p-4 rounded-xl">
                          <p className="text-sm text-slate-300 leading-relaxed font-mono whitespace-pre-wrap">
                            {result.text || (activeMode === 'music' ? 'Аудіо згенеровано успішно.' : '')}
                          </p>
                        </div>
                        {result.audio && (
                           <div className="mt-4 bg-black/50 p-4 rounded-xl border border-blue-500/20">
                             <audio controls src={result.audio} className="w-full" />
                           </div>
                        )}
                        {activeMode === 'generation' && result.type === 'video' && !result.videoReady && (
                          <div className="aspect-video bg-black border border-blue-500/10 rounded-xl flex items-center justify-center overflow-hidden relative group">
                             <div className="absolute inset-0 bg-gradient-to-t from-slate-900 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-4">
                               <span className="text-xs text-white font-mono bg-black/50 px-2 py-1 rounded">Processing Veo 3.1...</span>
                             </div>
                             <div className="flex flex-col items-center">
                                <Loader2 className="w-8 h-8 text-sky-400 animate-spin mb-3" />
                                <span className="text-xs text-sky-400 font-mono animate-pulse">Rendering Video Tensor...</span>
                             </div>
                          </div>
                        )}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </>
              )}`);
}

fs.writeFileSync('src/components/MediaForensicsTab.tsx', code);
