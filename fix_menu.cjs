const fs = require('fs');
let code = fs.readFileSync('src/App.tsx', 'utf8');

// Add to menu
code = code.replace(
  /<Compass className=\{.*? \/>\s*\{\!sidebarCollapsed && \(\s*<div className="flex items-center justify-between flex-1">\s*<span>Живе ШІ-Ядро<\/span>\s*<span className="text-\[8px\] bg-blue-500\/15 text-blue-400 border border-blue-500\/30 px-1.5 py-0.5 rounded font-mono font-bold tracking-widest">CORE<\/span>\s*<\/div>\s*\)\}\s*<\/button>/,
  `$&
                    
                    <button 
                      onClick={() => setActiveTab('data-ingestion')}
                      className={\`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-xs font-semibold tracking-wide transition-all cursor-pointer \${activeTab === 'data-ingestion' ? 'bg-amber-600/20 text-amber-400 border border-amber-500/30 shadow-sm' : 'text-slate-300 border border-transparent hover:text-slate-200 hover:bg-slate-900/30'}\`}
                    >
                      <Database className={\`w-4 h-4 \${activeTab === 'data-ingestion' ? 'text-amber-400' : 'text-slate-500'}\`} />
                      {!sidebarCollapsed && (
                        <div className="flex items-center justify-between flex-1">
                          <span>Інгестія Даних</span>
                          <span className="text-[8px] bg-amber-500/15 text-amber-400 border border-amber-500/30 px-1.5 py-0.5 rounded font-mono font-bold tracking-widest">LIVE</span>
                        </div>
                      )}
                    </button>`
);

code = code.replace(
  /\{activeTab === 'media-forensics' && <MediaForensicsTab \/>\}/g,
  `{activeTab === 'media-forensics' && <MediaForensicsTab />}
              {activeTab === 'data-ingestion' && <DataIngestionTab />}`
);

code = code.replace(
  /\{activeTab === 'media-forensics' && 'Аналіз Медіа \(Forensics\)'\}/g,
  `{activeTab === 'media-forensics' && 'Аналіз Медіа (Forensics)'}
                {activeTab === 'data-ingestion' && 'Центр Інгестії Даних'}`
);

fs.writeFileSync('src/App.tsx', code);
