const fs = require('fs');
let content = fs.readFileSync('src/components/MediaForensicsTab.tsx', 'utf8');

// 1. Add Interface
if (!content.includes('interface AnalysisLog')) {
  content = content.replace(/interface QueuedFile \{/, "interface AnalysisLog {\n  id: string;\n  timestamp: string;\n  fileName: string;\n  status: 'success' | 'error';\n  message: string;\n}\n\ninterface QueuedFile {");
}

// 2. Add State
if (!content.includes('analysisLogs')) {
  content = content.replace(/const \[fileQueue, setFileQueue\] = useState<QueuedFile\[\]>\(\[\]\);/, "const [fileQueue, setFileQueue] = useState<QueuedFile[]>([]);\n  const [analysisLogs, setAnalysisLogs] = useState<AnalysisLog[]>([]);");
}

// 3. Update handleRunTask successes/errors
const successTarget = `        updateFileInQueue(qFile.id, { 
          status: 'done', 
          progress: 100,
          resultText: data.text
        });`;
const successReplacement = `        updateFileInQueue(qFile.id, { 
          status: 'done', 
          progress: 100,
          resultText: data.text
        });
        setAnalysisLogs(prev => [{
          id: Math.random().toString(36).substring(2, 9),
          timestamp: new Date().toLocaleTimeString(),
          fileName: qFile.file.name,
          status: 'success',
          message: 'Аналіз успішно завершено'
        }, ...prev]);`;
content = content.replace(successTarget, successReplacement);

const errorTarget = `        updateFileInQueue(qFile.id, { 
          status: 'error', 
          progress: 100,
          error: err.message
        });`;
const errorReplacement = `        updateFileInQueue(qFile.id, { 
          status: 'error', 
          progress: 100,
          error: err.message
        });
        setAnalysisLogs(prev => [{
          id: Math.random().toString(36).substring(2, 9),
          timestamp: new Date().toLocaleTimeString(),
          fileName: qFile.file.name,
          status: 'error',
          message: err.message || 'Помилка аналізу'
        }, ...prev]);`;
content = content.replace(errorTarget, errorReplacement);

// 4. Add to UI
const uiTarget = `                  </AnimatePresence>
                </>`;
const uiReplacement = `                  </AnimatePresence>
                  
                  {/* Deep-Analysis Logs */}
                  {analysisLogs.length > 0 && (
                    <div className="bg-slate-900/40 border border-indigo-500/10 rounded-xl p-4 mt-6">
                      <h3 className="text-xs font-bold text-slate-300 uppercase tracking-widest mb-3 flex items-center gap-2">
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-slate-400"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
                        Журнал аналізу (Logs)
                      </h3>
                      <div className="space-y-2 max-h-[200px] overflow-y-auto pr-2 custom-scrollbar">
                        {analysisLogs.map((log) => (
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
                        ))}
                      </div>
                    </div>
                  )}
                </>`;
content = content.replace(uiTarget, uiReplacement);

fs.writeFileSync('src/components/MediaForensicsTab.tsx', content);
