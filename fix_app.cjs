const fs = require('fs');

let content = fs.readFileSync('src/App.tsx', 'utf8');

const replacement = `                      <div className="space-y-2 mt-2">
                        <button onClick={() => {setActiveTab("dashboard"); setMobileMenuOpen(false);}} className="w-full text-left px-3 py-2 text-sm text-slate-300 hover:text-white hover:bg-white/5 rounded-lg flex items-center gap-3">
                           <Layers className="w-4 h-4"/> Головна Панель
                        </button>
                        <button onClick={() => {setActiveTab("live-analytical-center"); setMobileMenuOpen(false);}} className="w-full text-left px-3 py-2 text-sm text-slate-300 hover:text-white hover:bg-white/5 rounded-lg flex items-center gap-3">
                           <Compass className="w-4 h-4"/> Аналітика та Звіти
                        </button>
                        <button onClick={() => {setActiveTab("osint"); setMobileMenuOpen(false);}} className="w-full text-left px-3 py-2 text-sm text-slate-300 hover:text-white hover:bg-white/5 rounded-lg flex items-center gap-3">
                           <Search className="w-4 h-4"/> Глибокий Пошук
                        </button>
                        <button onClick={() => {setActiveTab("person-profiler"); setMobileMenuOpen(false);}} className="w-full text-left px-3 py-2 text-sm text-slate-300 hover:text-white hover:bg-white/5 rounded-lg flex items-center gap-3">
                           <UserCheck className="w-4 h-4"/> Перевірка Осіб
                        </button>
                        <button onClick={() => {setActiveTab("media-forensics"); setMobileMenuOpen(false);}} className="w-full text-left px-3 py-2 text-sm text-slate-300 hover:text-white hover:bg-white/5 rounded-lg flex items-center gap-3">
                           <Camera className="w-4 h-4"/> Аналіз Фото/Відео
                        </button>
                        <button onClick={() => {setActiveTab("maps"); setMobileMenuOpen(false);}} className="w-full text-left px-3 py-2 text-sm text-slate-300 hover:text-white hover:bg-white/5 rounded-lg flex items-center gap-3">
                           <Globe className="w-4 h-4"/> Інтерактивна Карта
                        </button>
                        <button onClick={() => {setActiveTab("data-ingestion"); setMobileMenuOpen(false);}} className="w-full text-left px-3 py-2 text-sm text-slate-300 hover:text-white hover:bg-white/5 rounded-lg flex items-center gap-3">
                           <Database className="w-4 h-4"/> Завантаження Даних
                        </button>
                        <button onClick={() => {setActiveTab("sandbox"); setMobileMenuOpen(false);}} className="w-full text-left px-3 py-2 text-sm text-slate-300 hover:text-white hover:bg-white/5 rounded-lg flex items-center gap-3">
                           <Network className="w-4 h-4"/> Розширений Аналіз
                        </button>
                      </div>
                    ) : (
                      <div className="space-y-2 mt-2">
                        <button onClick={() => {setActiveTab("admin-back-office"); setMobileMenuOpen(false);}} className="w-full text-left px-3 py-2 text-sm text-slate-300 hover:text-white hover:bg-white/5 rounded-lg flex items-center gap-3">
                           <Settings className="w-4 h-4"/> Back Office Консоль
                        </button>
                        <button onClick={() => {setActiveTab("autonomous-factory"); setMobileMenuOpen(false);}} className="w-full text-left px-3 py-2 text-sm text-slate-300 hover:text-white hover:bg-white/5 rounded-lg flex items-center gap-3">
                           <Cpu className="w-4 h-4"/> Автономна Фабрика
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              </motion.div>
            </>
          )}
        </AnimatePresence>
      </div>
    );
  };

  const renderIpadLayout = () => {
    return (
      <div
        className="min-h-screen w-full bg-[#020617]/80 backdrop-blur-xl text-slate-100 flex flex-col items-center justify-center p-2 relative overflow-hidden select-none"
        id="ipad-simulator-view"
      >
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(59,130,246,0.1)_0%,transparent_100%)] pointer-events-none" />
        
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="relative w-[1024px] h-[768px] bg-slate-900/40 backdrop-blur-md rounded-[32px] p-2 shadow-2xl shadow-black/50 border border-white/10 flex flex-col transform origin-center scale-[0.85] 2xl:scale-100"
        >
          {/* Hardware bezel details */}
          <div className="absolute top-1/2 -left-0.5 w-1 h-12 bg-slate-700 rounded-l-md -translate-y-1/2"></div>
          <div className="absolute top-1/2 -right-0.5 w-1 h-12 bg-slate-700 rounded-r-md -translate-y-1/2"></div>
          <div className="absolute top-2 left-1/2 -translate-x-1/2 w-2 h-2 rounded-full bg-black border border-white/10 flex items-center justify-center">
             <div className="w-1 h-1 rounded-full bg-blue-900/40" />
          </div>
          
          <div className="flex-1 rounded-[20px] overflow-hidden bg-[#020617]/80 backdrop-blur-xl flex flex-col relative border border-black shadow-[inset_0_1px_0_rgba(255,255,255,0.05)]">
             {renderDesktopLayout()}
          </div>
        </motion.div>
      </div>
    );
  };

  const renderIphoneLayout = () => {
    return (
      <div
        className="min-h-screen w-full bg-[#020617]/80 backdrop-blur-xl text-slate-100 flex flex-col items-center justify-center p-2 relative overflow-hidden select-none"
      >
        <div className="absolute top-4 text-center z-50">
          <button
            onClick={() => setDeviceMode("desktop")}
            className="mt-2 px-3.5 py-1.5 bg-black/40 backdrop-blur-md shadow-[0_4px_30px_rgba(30,58,138,0.1)] border border-white/10 hover:bg-slate-800 text-blue-400 text-xs font-bold font-mono tracking-wider rounded-2xl transition-all cursor-pointer shadow flex items-center gap-1.5 mx-auto"
          >
            💻 ПОВЕРНУТИСЬ НА ДЕСКТОП
          </button>
        </div>

        <div className="relative mx-auto my-auto transition-all duration-500 z-10 w-[390px] h-[844px] bg-black rounded-[50px] border-[8px] border-slate-900 shadow-2xl flex flex-col overflow-hidden">
          {/* Dynamic Island */}
          <div className="absolute top-2 left-1/2 -translate-x-1/2 w-[120px] h-[35px] bg-black rounded-full z-50 flex items-center justify-around px-3">
            <div className="w-2.5 h-2.5 rounded-full bg-[#111] border border-[#222]"></div>
            <div className="w-2.5 h-2.5 rounded-full bg-blue-900/40"></div>
          </div>
          {renderMobileMainContent()}
        </div>
      </div>
    );
  };

  const renderDesktopLayout = () => {
    return (
      <div
        className="h-full bg-transparent text-slate-100 flex flex-col font-sans selection:bg-blue-500/30 selection:text-indigo-200"
        id="nexus-hub-app"
      >
        {/* TOP NAVBAR */}
        <header className="shrink-0 h-14 bg-[#020617]/70 backdrop-blur-xl border-b border-white/5 shadow-md shadow-black/20 flex items-center justify-between px-4 z-50 relative">
          <div className="flex items-center gap-4">
            <button
              onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
              className="p-1.5 rounded-lg hover:bg-white/5 transition-colors text-slate-400 hover:text-slate-200"
            >
              <Menu className="w-5 h-5" />
            </button>

            <div className="flex items-center gap-2">
              <div className="w-6 h-6 rounded-md bg-blue-600 flex items-center justify-center font-mono font-black text-sm text-white shadow shadow-blue-500/20">
                N
              </div>
              <span className="text-sm font-black uppercase text-white font-mono tracking-wider flex items-center gap-2">
                NEXUS
                <span className="bg-blue-500/10 text-blue-400 px-1.5 py-0.5 rounded text-[10px] border border-blue-500/20">
                  OS v2.1
                </span>
              </span>
            </div>

            <div className="hidden lg:flex items-center gap-1 ml-4 bg-black/40 backdrop-blur-md shadow-xl shadow-black/20 p-1 rounded-xl border border-white/10">
              <button
                onClick={() => setDeviceMode("desktop")}
                className={\`px-2.5 py-1.5 rounded-lg text-xs font-black font-mono tracking-wider transition-all flex items-center gap-1 cursor-pointer \${deviceMode === "desktop" ? "bg-[#020617]/40 backdrop-blur-3xl shadow-[inset_0_1px_0_rgba(255,255,255,0.05)] shadow-2xl shadow-black/50 text-blue-400 border border-white/10" : "text-slate-500 hover:text-slate-300"}\`}
                title="Режим ПК"
              >
                💻 ПК
              </button>
              <button
                onClick={() => setDeviceMode("ipad")}
                className={\`px-2.5 py-1.5 rounded-lg text-xs font-black font-mono tracking-wider transition-all flex items-center gap-1 cursor-pointer \${deviceMode === "ipad" ? "bg-[#020617]/40 backdrop-blur-3xl shadow-[inset_0_1px_0_rgba(255,255,255,0.05)] shadow-2xl shadow-black/50 text-blue-400 border border-white/10" : "text-slate-500 hover:text-slate-300"}\`}
                title="Режим Планшет"
              >
                <Tablet className="w-3.5 h-3.5" />
                ПЛАНШЕТ
              </button>
              <button
                onClick={() => setDeviceMode("iphone")}
                className={\`px-2.5 py-1.5 rounded-lg text-xs font-black font-mono tracking-wider transition-all flex items-center gap-1 cursor-pointer \${deviceMode === "iphone" ? "bg-[#020617]/40 backdrop-blur-3xl shadow-[inset_0_1px_0_rgba(255,255,255,0.05)] shadow-2xl shadow-black/50 text-blue-400 border border-white/10" : "text-slate-500 hover:text-slate-300"}\`}
                title="Режим Телефон"
              >
                📱 ТЕЛЕФОН
              </button>
            </div>
          </div>
          <div className="flex items-center gap-2 text-xs font-mono">
            {/* Quick Actions */}
          </div>
        </header>

        {/* MAIN CONTENT ZONE (Sidebar | Main Workspace | Inspector Panel) */}
        <div className="flex-1 flex overflow-hidden relative">
          {/* LEFT SIDEBAR (Section 7) */}
          <aside
            className={\`shrink-0 bg-[#020617]/80 backdrop-blur-xl border-r border-white/10 flex flex-col justify-between transition-all duration-300 \${sidebarCollapsed ? "w-[64px]" : "w-[240px]"}\`}
            id="tactical-sidebar"
          >
            {/* Navigation group */}
            <div className="p-2 space-y-4 overflow-y-auto flex-1 custom-scrollbar">
              {ecosystem === "user" ? (
                <>
                  {/* User Ecosystem Navigation */}
                  <div className="space-y-6">
                    {/* 📊 ГОЛОВНЕ */}
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
                        className={\`w-full flex items-center gap-2 px-2 py-1.5 rounded-2xl text-xs font-semibold tracking-wide transition-all cursor-pointer \${activeTab === "live-analytical-center" ? "bg-blue-600/20 text-blue-400 border border-white/10 shadow-2xl shadow-black/40" : "text-slate-300 border border-transparent hover:text-slate-200 hover:bg-white/5 hover:text-slate-100"}\`}
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
                        className={\`w-full flex items-center gap-2 px-2 py-1.5 rounded-2xl text-xs font-semibold tracking-wide transition-all cursor-pointer \${activeTab === "data-ingestion" ? "bg-amber-600/20 text-amber-400 border border-white/10 shadow-2xl shadow-black/40" : "text-slate-300 border border-transparent hover:text-slate-200 hover:bg-white/5 hover:text-slate-100"}\`}
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
                        className={\`w-full flex items-center gap-2 px-2 py-1.5 rounded-2xl text-xs font-semibold tracking-wide transition-all cursor-pointer \${activeTab === "sandbox" ? "bg-indigo-600/20 text-indigo-400 border border-white/10 shadow-2xl shadow-black/40" : "text-slate-300 border border-transparent hover:text-slate-200 hover:bg-white/5 hover:text-slate-100"}\`}
                      >
                        <Network className={\`w-4 h-4 \${activeTab === "sandbox" ? "text-indigo-400" : "text-slate-500"}\`} />
                        {!sidebarCollapsed && (
                          <div className="flex items-center justify-between flex-1">
                            <span>Розширений Аналіз</span>
                          </div>
                        )}
                      </button>
                    </div>
                  </div>
                </>
              ) : (
                <>
                  {/* Admin Ecosystem Navigation */}`;

const regex = /<div className="space-y-4 mt-2">\s*\{\/\* 📊 ГОЛОВНЕ \*\/\}[\s\S]*?\{\/\* Admin Ecosystem Navigation \*\//;

content = content.replace(regex, replacement);

fs.writeFileSync('src/App.tsx', content);

