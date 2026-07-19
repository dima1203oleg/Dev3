const fs = require('fs');
let content = fs.readFileSync('src/components/MediaForensicsTab.tsx', 'utf8');

// 1. Update interface
content = content.replace(/interface AnalysisLog \{[\s\S]*?\}/, `interface AnalysisLog {
  id: string;
  timestamp: string;
  fileName: string;
  status: 'success' | 'error';
  message: string;
  resultText?: string;
}`);

// 2. Update setAnalysisLogs for success
content = content.replace(/status: 'success',\s*message: 'Аналіз успішно завершено'\s*\}, \.\.\.prev\]\);/, `status: 'success',
          message: 'Аналіз успішно завершено',
          resultText: data.text
        }, ...prev]);`);

// 3. Add selectedLog state
content = content.replace(/const \[analysisLogs, setAnalysisLogs\] = useState<AnalysisLog\[\]>\(\[\]\);/, `const [analysisLogs, setAnalysisLogs] = useState<AnalysisLog[]>([]);
  const [selectedLog, setSelectedLog] = useState<AnalysisLog | null>(null);`);

// 4. Update the logs list to be clickable
const listStr = `{analysisLogs.map((log) => (
                          <div key={log.id} className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 bg-slate-950/40 border border-slate-800/50 p-2.5 rounded-lg text-xs font-mono">
                            <div className="flex items-center gap-3">
                              <span className="text-slate-500">{log.timestamp}</span>
                              <span className="text-slate-300 truncate max-w-[150px]">{log.fileName}</span>
                            </div>
                            <div className="flex items-center gap-2">
                              <span className={\`px-2 py-0.5 rounded \${log.status === 'success' ? 'bg-emerald-500/10 text-emerald-400' : 'bg-red-500/10 text-red-400'}\`}>
                                {log.status === 'success' ? 'SUCCESS' : 'ERROR'}
                              </span>
                              <span className="text-slate-400 truncate max-w-[200px]">{log.message}</span>
                            </div>
                          </div>
                        ))}`;

const listReplacement = `{analysisLogs.map((log) => (
                          <div 
                            key={log.id} 
                            onClick={() => setSelectedLog(log)}
                            className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 bg-slate-950/40 hover:bg-slate-900/60 border border-slate-800/50 hover:border-fuchsia-500/30 p-2.5 rounded-lg text-xs font-mono cursor-pointer transition-all"
                          >
                            <div className="flex items-center gap-3">
                              <span className="text-slate-500">{log.timestamp}</span>
                              <span className="text-slate-300 truncate max-w-[150px]">{log.fileName}</span>
                            </div>
                            <div className="flex items-center gap-2">
                              <span className={\`px-2 py-0.5 rounded \${log.status === 'success' ? 'bg-emerald-500/10 text-emerald-400' : 'bg-red-500/10 text-red-400'}\`}>
                                {log.status === 'success' ? 'SUCCESS' : 'ERROR'}
                              </span>
                              <span className="text-slate-400 truncate max-w-[200px]">{log.message}</span>
                            </div>
                          </div>
                        ))}`;
content = content.replace(listStr, listReplacement);

// 5. Add Modal rendering at the end of the return statement
const endStr = `</div>
    </div>
  );
}`;

const modalReplacement = `</div>
    </div>

      {/* Analysis Preview Modal */}
      <AnimatePresence>
        {selectedLog && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div 
              initial={{ opacity: 0 }} 
              animate={{ opacity: 1 }} 
              exit={{ opacity: 0 }} 
              className="absolute inset-0 bg-black/60 backdrop-blur-sm"
              onClick={() => setSelectedLog(null)}
            />
            <motion.div 
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="bg-slate-950 border border-indigo-500/20 shadow-2xl rounded-xl w-full max-w-2xl overflow-hidden relative z-10 flex flex-col max-h-[85vh]"
            >
              <div className="p-4 border-b border-indigo-500/10 flex items-center justify-between bg-slate-900/50">
                <div className="flex items-center gap-3">
                  <FileText className="w-5 h-5 text-fuchsia-400" />
                  <div>
                    <h3 className="text-sm font-bold text-slate-200">Деталі аналізу: {selectedLog.fileName}</h3>
                    <div className="text-[10px] text-slate-500 font-mono mt-0.5 flex items-center gap-2">
                      <span>{selectedLog.timestamp}</span>
                      <span className={\`px-1.5 py-0.5 rounded uppercase \${selectedLog.status === 'success' ? 'bg-emerald-500/10 text-emerald-400' : 'bg-red-500/10 text-red-400'}\`}>
                        {selectedLog.status}
                      </span>
                    </div>
                  </div>
                </div>
                <button 
                  onClick={() => setSelectedLog(null)}
                  className="text-slate-500 hover:text-slate-300 p-1 rounded hover:bg-slate-800 transition-colors"
                >
                  <XCircle className="w-5 h-5" />
                </button>
              </div>
              <div className="p-6 overflow-y-auto font-mono text-xs text-slate-300 whitespace-pre-wrap leading-relaxed custom-scrollbar">
                {selectedLog.status === 'error' ? (
                  <div className="text-red-400 flex items-start gap-3 bg-red-500/5 p-4 rounded-lg border border-red-500/10">
                    <AlertTriangle className="w-5 h-5 shrink-0" />
                    <span>{selectedLog.message}</span>
                  </div>
                ) : (
                  selectedLog.resultText || 'Немає детального тексту результату.'
                )}
              </div>
              <div className="p-4 border-t border-indigo-500/10 bg-slate-900/50 flex justify-end">
                <button 
                  onClick={() => setSelectedLog(null)}
                  className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold rounded-lg transition-colors border border-slate-700"
                >
                  Закрити
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
  );
}`;
content = content.replace(endStr, modalReplacement);

fs.writeFileSync('src/components/MediaForensicsTab.tsx', content);
