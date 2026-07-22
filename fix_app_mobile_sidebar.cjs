const fs = require('fs');
let content = fs.readFileSync('src/App.tsx', 'utf8');

// The mobile sidebar block for ecosystem === "user" starts with:
const startStr = `{ecosystem === "user" ? (
                      <div className="space-y-1">
                        {[`;

// End string inside the mobile menu
const endStr = `                      </div>
                    ) : (`;

const startIndex = content.indexOf(startStr);
const endIndex = content.indexOf(endStr);

if (startIndex !== -1 && endIndex !== -1) {
  const newNavigation = `{ecosystem === "user" ? (
                      <div className="space-y-4 mt-2">
                        {/* CORE ANALYSIS */}
                        <div className="space-y-1.5">
                          <span className="text-[8px] text-blue-400 font-mono font-bold uppercase tracking-widest block px-1 border-b border-blue-500/10 pb-1 mb-2">
                            📊 АНАЛІТИЧНЕ ЯДРО
                          </span>
                          {[
                            { id: "dashboard", label: "Аналітичний Дашборд", icon: Layers },
                            { id: "live-analytical-center", label: "Живе ШІ-Ядро", icon: Compass },
                          ].map((tab) => {
                            const Icon = tab.icon;
                            const isActive = activeTab === tab.id;
                            return (
                              <button
                                key={tab.id}
                                onClick={() => { setActiveTab(tab.id); setMobileMenuOpen(false); }}
                                className={\`w-full flex items-center gap-2.5 px-3 py-2 rounded-lg text-[10px] font-semibold transition-all text-left border \${isActive ? "bg-blue-600/15 text-blue-400 border-blue-500/20 shadow-inner shadow-sm" : "text-slate-300 border-transparent hover:bg-slate-800/40 hover:text-slate-100"}\`}
                              >
                                <Icon className="w-3.5 h-3.5" />
                                <span>{tab.label}</span>
                              </button>
                            );
                          })}
                        </div>

                        {/* SEARCH & PROFILING */}
                        <div className="space-y-1.5">
                          <span className="text-[8px] text-rose-400 font-mono font-bold uppercase tracking-widest block px-1 border-b border-rose-500/10 pb-1 mb-2">
                            🔍 ПОШУК ТА ПРОФІЛЮВАННЯ
                          </span>
                          {[
                            { id: "osint", label: "OSINT Пошук", icon: Search },
                            { id: "person-profiler", label: "Досьє & Портрет Особи", icon: UserCheck },
                          ].map((tab) => {
                            const Icon = tab.icon;
                            const isActive = activeTab === tab.id;
                            return (
                              <button
                                key={tab.id}
                                onClick={() => { setActiveTab(tab.id); setMobileMenuOpen(false); }}
                                className={\`w-full flex items-center gap-2.5 px-3 py-2 rounded-lg text-[10px] font-semibold transition-all text-left border \${isActive ? "bg-rose-600/15 text-rose-400 border-rose-500/20 shadow-inner shadow-sm" : "text-slate-300 border-transparent hover:bg-slate-800/40 hover:text-slate-100"}\`}
                              >
                                <Icon className="w-3.5 h-3.5" />
                                <span>{tab.label}</span>
                              </button>
                            );
                          })}
                        </div>

                        {/* SPECIALIZED TOOLS */}
                        <div className="space-y-1.5">
                          <span className="text-[8px] text-emerald-400 font-mono font-bold uppercase tracking-widest block px-1 border-b border-emerald-500/10 pb-1 mb-2">
                            🛠 СПЕЦІАЛІЗОВАНІ ІНСТРУМЕНТИ
                          </span>
                          {[
                            { id: "maps", label: "Інтерактивна Карта", icon: Globe },
                            { id: "media-forensics", label: "Media Forensics", icon: Camera },
                            { id: "data-ingestion", label: "Імпорт Даних", icon: Database },
                            { id: "sandbox", label: "Аналітична Пісочниця", icon: Network },
                          ].map((tab) => {
                            const Icon = tab.icon;
                            const isActive = activeTab === tab.id;
                            return (
                              <button
                                key={tab.id}
                                onClick={() => { setActiveTab(tab.id); setMobileMenuOpen(false); }}
                                className={\`w-full flex items-center gap-2.5 px-3 py-2 rounded-lg text-[10px] font-semibold transition-all text-left border \${isActive ? "bg-emerald-600/15 text-emerald-400 border-emerald-500/20 shadow-inner shadow-sm" : "text-slate-300 border-transparent hover:bg-slate-800/40 hover:text-slate-100"}\`}
                              >
                                <Icon className="w-3.5 h-3.5" />
                                <span>{tab.label}</span>
                              </button>
                            );
                          })}
                        </div>`;

  content = content.slice(0, startIndex) + newNavigation + content.slice(endIndex);
  fs.writeFileSync('src/App.tsx', content);
}
