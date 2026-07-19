const fs = require('fs');
let content = fs.readFileSync('src/components/MediaForensicsTab.tsx', 'utf8');

const targetStr = `                  <AnimatePresence>
                    {fileQueue.map((qFile) => (`;

const replacement = `                  {/* Overall Deep-Analysis Progress */}
                  {loading && fileQueue.length > 0 && (
                    <div className="bg-slate-900/60 border border-indigo-500/10 rounded-xl p-4 space-y-3">
                      <div className="flex items-center justify-between text-xs font-mono">
                        <span className="text-fuchsia-400 font-bold uppercase tracking-wider flex items-center gap-2">
                          <Loader2 className="w-4 h-4 animate-spin" />
                          Deep-Analysis Process
                        </span>
                        <span className="text-slate-300">
                          {Math.round(fileQueue.reduce((acc, f) => acc + (f.progress || 0), 0) / fileQueue.length)}%
                        </span>
                      </div>
                      <div className="h-2 w-full bg-slate-950 rounded-full overflow-hidden border border-indigo-500/10 relative">
                        <motion.div 
                          className="absolute top-0 left-0 h-full bg-gradient-to-r from-indigo-500 via-fuchsia-500 to-emerald-500"
                          initial={{ width: 0 }}
                          animate={{ width: \`\${Math.round(fileQueue.reduce((acc, f) => acc + (f.progress || 0), 0) / fileQueue.length)}%\` }}
                          transition={{ duration: 0.3 }}
                        />
                        {/* Glow effect */}
                        <div className="absolute top-0 left-0 h-full w-full bg-fuchsia-500/20 mix-blend-overlay animate-pulse"></div>
                      </div>
                      <div className="flex justify-between text-[10px] text-slate-500 font-mono">
                        <span>Initiating Tensor Cores...</span>
                        <span>{fileQueue.filter(f => f.status === 'done' || f.status === 'error').length} / {fileQueue.length} files processed</span>
                      </div>
                    </div>
                  )}

                  <AnimatePresence>
                    {fileQueue.map((qFile) => (`;

content = content.replace(targetStr, replacement);
fs.writeFileSync('src/components/MediaForensicsTab.tsx', content);
