const fs = require('fs');
let content = fs.readFileSync('src/components/MediaForensicsTab.tsx', 'utf8');

// Add a generic progress state
if (!content.includes('const [simulatedProgress, setSimulatedProgress] = useState(0);')) {
  content = content.replace(/const \[loading, setLoading\] = useState\(false\);/, 
    "const [loading, setLoading] = useState(false);\n  const [simulatedProgress, setSimulatedProgress] = useState(0);\n\n  React.useEffect(() => {\n    let interval: any;\n    if (loading && activeMode !== 'analysis') {\n      setSimulatedProgress(0);\n      interval = setInterval(() => {\n        setSimulatedProgress(prev => {\n          if (prev >= 95) return prev;\n          return prev + Math.random() * 5 + 1;\n        });\n      }, 500);\n    } else {\n      setSimulatedProgress(100);\n    }\n    return () => clearInterval(interval);\n  }, [loading, activeMode]);");
}

const targetStr2 = `<div className="relative">
                        <div className="absolute inset-0 border border-fuchsia-500/30 rounded-full animate-ping"></div>
                        <div className="w-16 h-16 rounded-full border border-fuchsia-500/50 flex items-center justify-center bg-fuchsia-500/5">
                          <Sparkles className="w-6 h-6 text-fuchsia-400 animate-pulse" />
                        </div>
                      </div>
                      <div className="space-y-2 text-center">
                        <p className="text-sm font-mono text-fuchsia-400">Ініціалізація нейромережі...</p>
                        <p className="text-xs text-slate-500">Виділення тензорних ядер для обробки {activeMode}</p>
                      </div>`;

const replacement2 = `<div className="relative">
                        <div className="absolute inset-0 border border-fuchsia-500/30 rounded-full animate-ping"></div>
                        <div className="w-16 h-16 rounded-full border border-fuchsia-500/50 flex items-center justify-center bg-fuchsia-500/5">
                          <Sparkles className="w-6 h-6 text-fuchsia-400 animate-pulse" />
                        </div>
                      </div>
                      <div className="space-y-2 text-center w-full max-w-sm">
                        <p className="text-sm font-mono text-fuchsia-400">Ініціалізація нейромережі...</p>
                        <p className="text-xs text-slate-500 mb-4">Виділення тензорних ядер для обробки {activeMode}</p>
                        <div className="h-2 w-full bg-slate-900 rounded-full overflow-hidden border border-indigo-500/20 relative mt-4">
                          <motion.div 
                            className="absolute top-0 left-0 h-full bg-gradient-to-r from-fuchsia-600 to-indigo-500"
                            initial={{ width: 0 }}
                            animate={{ width: \`\${Math.min(100, Math.round(simulatedProgress))}%\` }}
                            transition={{ duration: 0.3 }}
                          />
                        </div>
                        <div className="flex justify-between text-[10px] font-mono text-slate-400 mt-2">
                          <span>Processing...</span>
                          <span>{Math.min(100, Math.round(simulatedProgress))}%</span>
                        </div>
                      </div>`;

content = content.replace(targetStr2, replacement2);
fs.writeFileSync('src/components/MediaForensicsTab.tsx', content);
