const fs = require('fs');
let code = fs.readFileSync('src/components/DataIngestionTab.tsx', 'utf8');

code = code.replace(
  /const \[parsers, setParsers\] = useState\(\[/,
  `const [isAddSourceModalOpen, setIsAddSourceModalOpen] = useState(false);\n  const [newSourceType, setNewSourceType] = useState('telegram');\n  const [newSourceName, setNewSourceName] = useState('');\n  const [parsers, setParsers] = useState([`
);

code = code.replace(
  /<button className="text-\[10px\] bg-indigo-500\/10 text-indigo-400 px-2 py-1 rounded border border-indigo-500\/30 hover:bg-indigo-500\/20 transition-colors">\+ Додати джерело<\/button>/g,
  `<button onClick={() => setIsAddSourceModalOpen(true)} className="text-[10px] bg-indigo-500/10 text-indigo-400 px-2 py-1 rounded border border-indigo-500/30 hover:bg-indigo-500/20 transition-colors cursor-pointer">+ Додати джерело</button>`
);

const lastDivIndex = code.lastIndexOf('</div>');
const part1 = code.slice(0, lastDivIndex);
const part2 = code.slice(lastDivIndex);

const modalJSX = `
      {/* Add Source Modal */}
      {isAddSourceModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm">
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-[#090e1a] border border-slate-700/60 rounded-xl p-6 w-[450px] shadow-[0_20px_50px_rgba(0,0,0,0.7)]"
          >
            <div className="flex justify-between items-center mb-5">
              <h3 className="text-sm font-bold text-slate-200 flex items-center gap-2 tracking-wider">
                <Globe className="w-4 h-4 text-indigo-400" /> 
                ДОДАТИ НОВИЙ ВЕКТОР ЗБОРУ
              </h3>
              <button onClick={() => setIsAddSourceModalOpen(false)} className="text-slate-500 hover:text-slate-300 transition-colors cursor-pointer">
                <X className="w-5 h-5" />
              </button>
            </div>
            
            <div className="space-y-4">
              <div>
                <label className="block text-[10px] font-mono text-slate-400 mb-1.5 uppercase">Тип Парсера / Джерело</label>
                <select 
                  className="w-full bg-slate-950/80 border border-slate-800 rounded-lg p-2.5 text-xs text-slate-300 outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500/50 transition-all font-mono"
                  value={newSourceType}
                  onChange={(e) => setNewSourceType(e.target.value)}
                >
                  <option value="telegram">Telegram Канал / Група</option>
                  <option value="facebook">Facebook Група / Профіль</option>
                  <option value="x">X (Twitter) Акаунт / Тег</option>
                  <option value="web">Веб-сайт (Universal Scraper)</option>
                  <option value="rss">RSS / Atom стрічка</option>
                </select>
              </div>
              
              <div>
                <label className="block text-[10px] font-mono text-slate-400 mb-1.5 uppercase">Ідентифікатор або URL</label>
                <input 
                  type="text" 
                  placeholder="Наприклад: https://t.me/insiderUKR" 
                  className="w-full bg-slate-950/80 border border-slate-800 rounded-lg p-2.5 text-xs text-slate-300 outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500/50 transition-all font-mono placeholder:text-slate-700"
                  value={newSourceName}
                  onChange={(e) => setNewSourceName(e.target.value)}
                />
              </div>

              <div className="pt-3">
                <button 
                  onClick={() => {
                    if(newSourceName.trim()) {
                      let typeLabel = "Telegram";
                      if(newSourceType === 'facebook') typeLabel = "Facebook";
                      else if(newSourceType === 'x') typeLabel = "X/Twitter";
                      else if(newSourceType === 'web') typeLabel = "Web";
                      else if(newSourceType === 'rss') typeLabel = "RSS";
                      
                      setParsers(prev => [
                        { id: Date.now().toString(), name: \`\${typeLabel} - \${newSourceName}\`, status: 'Ініціалізація...', count: 0 },
                        ...prev
                      ]);
                      setIsAddSourceModalOpen(false);
                      setNewSourceName('');
                    }
                  }}
                  className="w-full cursor-pointer bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-[11px] uppercase tracking-wider py-2.5 rounded-lg transition-colors flex items-center justify-center gap-2"
                >
                  <Play className="w-3.5 h-3.5" />
                  ЗАПУСТИТИ ПАРСИНГ
                </button>
              </div>
            </div>
          </motion.div>
        </div>
      )}
`;

code = part1 + modalJSX + part2;
fs.writeFileSync('src/components/DataIngestionTab.tsx', code);
