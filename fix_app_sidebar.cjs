const fs = require('fs');
let content = fs.readFileSync('src/App.tsx', 'utf8');

// We will replace the User Ecosystem Navigation block with grouped ones
const startStr = `{/* User Ecosystem Navigation */}`;
const endStr = `                  </div>
                </>
              ) : (`;

const startIndex = content.indexOf(startStr);
const endIndex = content.indexOf(endStr);

if (startIndex !== -1 && endIndex !== -1) {
  const newNavigation = `{/* User Ecosystem Navigation */}
                  <div className="space-y-6">
                    {/* CORE ANALYSIS */}
                    <div className="space-y-1.5">
                      {!sidebarCollapsed && (
                        <span className="text-[9px] text-blue-400 font-mono font-bold uppercase tracking-widest block px-2.5 py-1">
                          📊 АНАЛІТИЧНЕ ЯДРО
                        </span>
                      )}
                      
                      <button
                        onClick={() => setActiveTab("dashboard")}
                        className={\`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-xs font-semibold tracking-wide transition-all cursor-pointer \${activeTab === "dashboard" ? "bg-blue-600/20 text-blue-400 border border-blue-500/30" : "text-slate-300 border border-transparent hover:text-slate-200 hover:bg-slate-800/40 hover:text-slate-100"}\`}
                      >
                        <Layers className={\`w-4 h-4 \${activeTab === "dashboard" ? "text-blue-400" : "text-slate-500"}\`} />
                        {!sidebarCollapsed && (
                          <div className="flex items-center justify-between flex-1">
                            <span>Аналітичний Дашборд</span>
                          </div>
                        )}
                      </button>

                      <button
                        onClick={() => setActiveTab("live-analytical-center")}
                        className={\`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-xs font-semibold tracking-wide transition-all cursor-pointer \${activeTab === "live-analytical-center" ? "bg-blue-600/20 text-blue-400 border border-blue-500/40 shadow-lg border-glow" : "text-slate-300 border border-transparent hover:text-slate-200 hover:bg-slate-800/40 hover:text-slate-100"}\`}
                      >
                        <Compass className={\`w-4 h-4 \${activeTab === "live-analytical-center" ? "text-blue-400" : "text-slate-500"}\`} />
                        {!sidebarCollapsed && (
                          <div className="flex items-center justify-between flex-1">
                            <span>Живе ШІ-Ядро</span>
                            <span className="text-[8px] bg-blue-500/15 text-blue-400 border border-blue-500/30 px-1.5 py-0.5 rounded font-mono font-bold tracking-widest">CORE</span>
                          </div>
                        )}
                      </button>
                    </div>

                    {/* SEARCH & PROFILING */}
                    <div className="space-y-1.5">
                      {!sidebarCollapsed && (
                        <span className="text-[9px] text-rose-400 font-mono font-bold uppercase tracking-widest block px-2.5 py-1">
                          🔍 ПОШУК ТА ПРОФІЛЮВАННЯ
                        </span>
                      )}

                      <button
                        onClick={() => setActiveTab("osint")}
                        className={\`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-xs font-semibold tracking-wide transition-all cursor-pointer \${activeTab === "osint" ? "bg-rose-600/20 text-rose-400 border border-rose-500/30" : "text-slate-300 border border-transparent hover:text-slate-200 hover:bg-slate-800/40 hover:text-slate-100"}\`}
                      >
                        <Search className={\`w-4 h-4 \${activeTab === "osint" ? "text-rose-400" : "text-slate-500"}\`} />
                        {!sidebarCollapsed && (
                          <div className="flex items-center justify-between flex-1">
                            <span>OSINT Пошук</span>
                          </div>
                        )}
                      </button>

                      <button
                        onClick={() => setActiveTab("person-profiler")}
                        className={\`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-xs font-semibold tracking-wide transition-all cursor-pointer \${activeTab === "person-profiler" ? "bg-rose-600/20 text-rose-400 border border-rose-500/30" : "text-slate-300 border border-transparent hover:text-slate-200 hover:bg-slate-800/40 hover:text-slate-100"}\`}
                      >
                        <UserCheck className={\`w-4 h-4 \${activeTab === "person-profiler" ? "text-rose-400" : "text-slate-500"}\`} />
                        {!sidebarCollapsed && (
                          <div className="flex items-center justify-between flex-1">
                            <span>Досьє & Портрет Особи</span>
                          </div>
                        )}
                      </button>
                    </div>

                    {/* SPECIALIZED TOOLS */}
                    <div className="space-y-1.5">
                      {!sidebarCollapsed && (
                        <span className="text-[9px] text-emerald-400 font-mono font-bold uppercase tracking-widest block px-2.5 py-1">
                          🛠 СПЕЦІАЛІЗОВАНІ ІНСТРУМЕНТИ
                        </span>
                      )}

                      <button
                        onClick={() => setActiveTab("maps")}
                        className={\`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-xs font-semibold tracking-wide transition-all cursor-pointer \${activeTab === "maps" ? "bg-emerald-600/20 text-emerald-400 border border-emerald-500/30" : "text-slate-300 border border-transparent hover:text-slate-200 hover:bg-slate-800/40 hover:text-slate-100"}\`}
                      >
                        <Globe className={\`w-4 h-4 \${activeTab === "maps" ? "text-emerald-400" : "text-slate-500"}\`} />
                        {!sidebarCollapsed && (
                          <div className="flex items-center justify-between flex-1">
                            <span>Інтерактивна Карта</span>
                          </div>
                        )}
                      </button>
                      
                      <button
                        onClick={() => setActiveTab("media-forensics")}
                        className={\`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-xs font-semibold tracking-wide transition-all cursor-pointer \${activeTab === "media-forensics" ? "bg-fuchsia-600/10 text-sky-400 border border-sky-500/20 shadow-[inset_0_0_15px_rgba(217,70,239,0.1)]" : "text-slate-300 border border-transparent hover:text-slate-200 hover:bg-slate-800/40 hover:text-slate-100"}\`}
                      >
                        <Camera className={\`w-4 h-4 \${activeTab === "media-forensics" ? "text-sky-400" : "text-slate-500"}\`} />
                        {!sidebarCollapsed && (
                          <div className="flex items-center justify-between flex-1">
                            <span>Media Forensics</span>
                          </div>
                        )}
                      </button>

                      <button
                        onClick={() => setActiveTab("data-ingestion")}
                        className={\`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-xs font-semibold tracking-wide transition-all cursor-pointer \${activeTab === "data-ingestion" ? "bg-amber-600/20 text-amber-400 border border-amber-500/40 shadow-lg shadow-amber-500/20" : "text-slate-300 border border-transparent hover:text-slate-200 hover:bg-slate-800/40 hover:text-slate-100"}\`}
                      >
                        <Database className={\`w-4 h-4 \${activeTab === "data-ingestion" ? "text-amber-400" : "text-slate-500"}\`} />
                        {!sidebarCollapsed && (
                          <div className="flex items-center justify-between flex-1">
                            <span>Імпорт Даних</span>
                          </div>
                        )}
                      </button>

                      <button
                        onClick={() => setActiveTab("sandbox")}
                        className={\`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-xs font-semibold tracking-wide transition-all cursor-pointer \${activeTab === "sandbox" ? "bg-indigo-600/20 text-indigo-400 border border-indigo-500/40 shadow-lg border-glow animate-pulse" : "text-slate-300 border border-transparent hover:text-slate-200 hover:bg-slate-800/40 hover:text-slate-100"}\`}
                      >
                        <Network className={\`w-4 h-4 \${activeTab === "sandbox" ? "text-indigo-400" : "text-slate-500"}\`} />
                        {!sidebarCollapsed && (
                          <div className="flex items-center justify-between flex-1">
                            <span>Аналітична Пісочниця</span>
                            <span className="text-[9px] bg-indigo-500/15 text-indigo-400 border border-indigo-500/20 px-1.5 py-0.5 rounded font-mono font-bold tracking-wider">SANDBOX</span>
                          </div>
                        )}
                      </button>
                    </div>`;

  content = content.slice(0, startIndex) + newNavigation + content.slice(endIndex);
  fs.writeFileSync('src/App.tsx', content);
}
