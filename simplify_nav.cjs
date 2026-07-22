const fs = require('fs');

let content = fs.readFileSync('src/App.tsx', 'utf8');

const oldNavRegex = /\{\/\* CORE ANALYSIS \*\/\}[\s\S]*?(?=<\/div>\s*<\/>\s*\) : \(\s*<>\s*\{\/\* Admin Ecosystem Navigation)/;

const newNav = `                    {/* 📊 ГОЛОВНЕ */}
                    <div className="space-y-1.5">
                      {!sidebarCollapsed && (
                        <span className="text-xs text-blue-400 font-mono font-bold uppercase tracking-widest block px-2.5 py-1">
                          📊 ГОЛОВНЕ
                        </span>
                      )}
                      
                      <button
                        onClick={() => setActiveTab("dashboard")}
                        className={\`w-full flex items-center gap-2 px-2 py-1.5 rounded-2xl text-xs font-semibold tracking-wide transition-all cursor-pointer \${activeTab === "dashboard" ? "bg-blue-600/20 text-blue-400 border border-white/10" : "text-slate-300 border border-transparent hover:text-slate-200 hover:bg-white/5 hover:text-slate-100"}\`}
                      >
                        <Layers className={\`w-4 h-4 \${activeTab === "dashboard" ? "text-blue-400" : "text-slate-500"}\`} />
                        {!sidebarCollapsed && (
                          <div className="flex items-center justify-between flex-1">
                            <span>Головна Панель</span>
                          </div>
                        )}
                      </button>

                      <button
                        onClick={() => setActiveTab("live-analytical-center")}
                        className={\`w-full flex items-center gap-2 px-2 py-1.5 rounded-2xl text-xs font-semibold tracking-wide transition-all cursor-pointer \${activeTab === "live-analytical-center" ? "bg-blue-600/20 text-blue-400 border border-white/10 shadow-2xl shadow-black/40 border-glow" : "text-slate-300 border border-transparent hover:text-slate-200 hover:bg-white/5 hover:text-slate-100"}\`}
                      >
                        <Compass className={\`w-4 h-4 \${activeTab === "live-analytical-center" ? "text-blue-400" : "text-slate-500"}\`} />
                        {!sidebarCollapsed && (
                          <div className="flex items-center justify-between flex-1">
                            <span>Аналітика та Звіти</span>
                          </div>
                        )}
                      </button>
                    </div>

                    {/* 🔍 РОЗСЛІДУВАННЯ */}
                    <div className="space-y-1.5">
                      {!sidebarCollapsed && (
                        <span className="text-xs text-rose-400 font-mono font-bold uppercase tracking-widest block px-2.5 py-1">
                          🔍 РОЗСЛІДУВАННЯ
                        </span>
                      )}

                      <button
                        onClick={() => setActiveTab("osint")}
                        className={\`w-full flex items-center gap-2 px-2 py-1.5 rounded-2xl text-xs font-semibold tracking-wide transition-all cursor-pointer \${activeTab === "osint" ? "bg-rose-600/20 text-rose-400 border border-white/10" : "text-slate-300 border border-transparent hover:text-slate-200 hover:bg-white/5 hover:text-slate-100"}\`}
                      >
                        <Search className={\`w-4 h-4 \${activeTab === "osint" ? "text-rose-400" : "text-slate-500"}\`} />
                        {!sidebarCollapsed && (
                          <div className="flex items-center justify-between flex-1">
                            <span>Глибокий Пошук</span>
                          </div>
                        )}
                      </button>

                      <button
                        onClick={() => setActiveTab("person-profiler")}
                        className={\`w-full flex items-center gap-2 px-2 py-1.5 rounded-2xl text-xs font-semibold tracking-wide transition-all cursor-pointer \${activeTab === "person-profiler" ? "bg-rose-600/20 text-rose-400 border border-white/10" : "text-slate-300 border border-transparent hover:text-slate-200 hover:bg-white/5 hover:text-slate-100"}\`}
                      >
                        <UserCheck className={\`w-4 h-4 \${activeTab === "person-profiler" ? "text-rose-400" : "text-slate-500"}\`} />
                        {!sidebarCollapsed && (
                          <div className="flex items-center justify-between flex-1">
                            <span>Перевірка Осіб</span>
                          </div>
                        )}
                      </button>
                      
                      <button
                        onClick={() => setActiveTab("media-forensics")}
                        className={\`w-full flex items-center gap-2 px-2 py-1.5 rounded-2xl text-xs font-semibold tracking-wide transition-all cursor-pointer \${activeTab === "media-forensics" ? "bg-fuchsia-600/10 text-sky-400 border border-white/10 shadow-[inset_0_0_15px_rgba(217,70,239,0.1)]" : "text-slate-300 border border-transparent hover:text-slate-200 hover:bg-white/5 hover:text-slate-100"}\`}
                      >
                        <Camera className={\`w-4 h-4 \${activeTab === "media-forensics" ? "text-sky-400" : "text-slate-500"}\`} />
                        {!sidebarCollapsed && (
                          <div className="flex items-center justify-between flex-1">
                            <span>Аналіз Фото/Відео</span>
                          </div>
                        )}
                      </button>
                    </div>

                    {/* 🛠 ДОДАТКОВІ ІНСТРУМЕНТИ */}
                    <div className="space-y-1.5">
                      {!sidebarCollapsed && (
                        <span className="text-xs text-emerald-400 font-mono font-bold uppercase tracking-widest block px-2.5 py-1">
                          🛠 ДОДАТКОВІ ІНСТРУМЕНТИ
                        </span>
                      )}

                      <button
                        onClick={() => setActiveTab("maps")}
                        className={\`w-full flex items-center gap-2 px-2 py-1.5 rounded-2xl text-xs font-semibold tracking-wide transition-all cursor-pointer \${activeTab === "maps" ? "bg-emerald-600/20 text-emerald-400 border border-white/10" : "text-slate-300 border border-transparent hover:text-slate-200 hover:bg-white/5 hover:text-slate-100"}\`}
                      >
                        <Globe className={\`w-4 h-4 \${activeTab === "maps" ? "text-emerald-400" : "text-slate-500"}\`} />
                        {!sidebarCollapsed && (
                          <div className="flex items-center justify-between flex-1">
                            <span>Інтерактивна Карта</span>
                          </div>
                        )}
                      </button>

                      <button
                        onClick={() => setActiveTab("data-ingestion")}
                        className={\`w-full flex items-center gap-2 px-2 py-1.5 rounded-2xl text-xs font-semibold tracking-wide transition-all cursor-pointer \${activeTab === "data-ingestion" ? "bg-amber-600/20 text-amber-400 border border-white/10 shadow-2xl shadow-black/40 shadow-amber-500/20" : "text-slate-300 border border-transparent hover:text-slate-200 hover:bg-white/5 hover:text-slate-100"}\`}
                      >
                        <Database className={\`w-4 h-4 \${activeTab === "data-ingestion" ? "text-amber-400" : "text-slate-500"}\`} />
                        {!sidebarCollapsed && (
                          <div className="flex items-center justify-between flex-1">
                            <span>Завантаження Даних</span>
                          </div>
                        )}
                      </button>

                      <button
                        onClick={() => setActiveTab("sandbox")}
                        className={\`w-full flex items-center gap-2 px-2 py-1.5 rounded-2xl text-xs font-semibold tracking-wide transition-all cursor-pointer \${activeTab === "sandbox" ? "bg-indigo-600/20 text-indigo-400 border border-white/10 shadow-2xl shadow-black/40 border-glow animate-pulse" : "text-slate-300 border border-transparent hover:text-slate-200 hover:bg-white/5 hover:text-slate-100"}\`}
                      >
                        <Network className={\`w-4 h-4 \${activeTab === "sandbox" ? "text-indigo-400" : "text-slate-500"}\`} />
                        {!sidebarCollapsed && (
                          <div className="flex items-center justify-between flex-1">
                            <span>Розширений Аналіз</span>
                          </div>
                        )}
                      </button>
                    </div>
`;

content = content.replace(oldNavRegex, newNav);

fs.writeFileSync('src/App.tsx', content);

