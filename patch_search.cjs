const fs = require('fs');
let content = fs.readFileSync('src/components/MediaForensicsTab.tsx', 'utf8');

// Add state
const stateTarget = `const [selectedLog, setSelectedLog] = useState<AnalysisLog | null>(null);`;
const stateReplacement = `const [selectedLog, setSelectedLog] = useState<AnalysisLog | null>(null);\n  const [logSearchQuery, setLogSearchQuery] = useState('');`;
content = content.replace(stateTarget, stateReplacement);

// Add search input & filter
const renderTarget = `<div className="space-y-2 max-h-[200px] overflow-y-auto pr-2 custom-scrollbar">
                        {analysisLogs.map((log) => (`;
const renderReplacement = `<div className="mb-3 relative">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
                        <input
                          type="text"
                          placeholder="Пошук за часом, файлом або ID..."
                          value={logSearchQuery}
                          onChange={(e) => setLogSearchQuery(e.target.value)}
                          className="w-full bg-slate-950/50 border border-indigo-500/20 rounded-lg pl-9 pr-3 py-2 text-xs text-slate-200 placeholder-slate-500 focus:outline-none focus:border-indigo-500/50 transition-colors font-mono"
                        />
                      </div>
                      <div className="space-y-2 max-h-[200px] overflow-y-auto pr-2 custom-scrollbar">
                        {analysisLogs.filter(log => 
                          log.timestamp.toLowerCase().includes(logSearchQuery.toLowerCase()) || 
                          log.id.toLowerCase().includes(logSearchQuery.toLowerCase()) ||
                          log.fileName.toLowerCase().includes(logSearchQuery.toLowerCase()) ||
                          log.message.toLowerCase().includes(logSearchQuery.toLowerCase())
                        ).map((log) => (`;
content = content.replace(renderTarget, renderReplacement);

fs.writeFileSync('src/components/MediaForensicsTab.tsx', content);
