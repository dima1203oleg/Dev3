const fs = require('fs');

let appContent = fs.readFileSync('src/App.tsx', 'utf8');

// The forensics buttons lines 1629 to 1651
// We will replace them with the new styled button

const targetStr = `<button
            onClick={() => setActiveTab('forensics')}
            className={\`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-300 \${
              activeTab === 'forensics' 
                ? 'bg-gradient-to-r from-fuchsia-600/20 to-transparent border-l-2 border-fuchsia-500 text-white' 
                : 'text-slate-400 hover:bg-slate-900/50 backdrop-blur-md shadow-[0_4px_30px_rgba(0,0,0,0.3)] hover:text-slate-200 border-l-2 border-transparent'
            }\`}
          >
            <Camera className={\`w-5 h-5 \${activeTab === 'forensics' ? 'text-fuchsia-400' : ''}\`} />
            <span className="font-medium">Media Forensics</span>
          </button>

          <button
            onClick={() => setActiveTab('forensics')}
            className={\`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-300 \${
              activeTab === 'forensics' 
                ? 'bg-gradient-to-r from-fuchsia-600/20 to-transparent border-l-2 border-fuchsia-500 text-white' 
                : 'text-slate-400 hover:bg-slate-900/50 backdrop-blur-md shadow-[0_4px_30px_rgba(0,0,0,0.3)] hover:text-slate-200 border-l-2 border-transparent'
            }\`}
          >
            <Camera className={\`w-5 h-5 \${activeTab === 'forensics' ? 'text-fuchsia-400' : ''}\`} />
            <span className="font-medium">Media Forensics</span>
          </button>`;

const replacementStr = `<button 
                      onClick={() => setActiveTab('media-forensics')}
                      className={\`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-xs font-semibold tracking-wide transition-all cursor-pointer \${activeTab === 'media-forensics' ? 'bg-fuchsia-600/10 text-fuchsia-400 border border-fuchsia-500/20 shadow-[inset_0_0_15px_rgba(217,70,239,0.1)]' : 'text-slate-400 border border-transparent hover:text-slate-200 hover:bg-slate-900/30'}\`}
                    >
                      <Camera className={\`w-4 h-4 \${activeTab === 'media-forensics' ? 'text-fuchsia-400' : 'text-slate-500'}\`} />
                      {!sidebarCollapsed && (
                        <div className="flex items-center justify-between flex-1">
                          <span>Media Forensics</span>
                          <div className="flex items-center gap-1.5 opacity-80">
                            {/* Animated CSS Waveform */}
                            <div className="flex items-center gap-[2px] h-3">
                              <div className="w-[2px] bg-fuchsia-500 rounded-full animate-[waveform_1.2s_ease-in-out_infinite_0.1s] h-1.5" />
                              <div className="w-[2px] bg-fuchsia-400 rounded-full animate-[waveform_1.2s_ease-in-out_infinite_0.3s] h-3" />
                              <div className="w-[2px] bg-fuchsia-500 rounded-full animate-[waveform_1.2s_ease-in-out_infinite_0.5s] h-1" />
                              <div className="w-[2px] bg-fuchsia-400 rounded-full animate-[waveform_1.2s_ease-in-out_infinite_0.2s] h-2" />
                            </div>
                          </div>
                        </div>
                      )}
                    </button>`;

appContent = appContent.replace(targetStr, replacementStr);
fs.writeFileSync('src/App.tsx', appContent);
