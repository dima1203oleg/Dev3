const fs = require('fs');

let content = fs.readFileSync('src/App.tsx', 'utf8');

// 1. Remove the misplaced ipad button from the mobile header
content = content.replace(/<button\s*onClick=\{\(\) => setDeviceMode\("ipad"\)\}[\s\S]*?<\/button>\s*/, '');

// 2. Replace the desktop toggles section completely
const togglesOld = `            {!isRealMobile && (
              <div className="flex bg-slate-950/60 p-0.5 rounded-lg border border-slate-800/80 gap-1">
                <button
                  onClick={() => setDeviceMode("desktop")}
                  className={\`px-2.5 py-1.5 rounded text-xs font-black font-mono tracking-wider transition-all flex items-center gap-1 cursor-pointer \${deviceMode === "desktop" ? "bg-black/40 backdrop-blur-md shadow-[0_4px_30px_rgba(30,58,138,0.1)] text-blue-400 border border-slate-800/80" : "text-slate-500 hover:text-slate-300"}\`}
                  title="Режим Десктоп"
                >
                  💻 ДЕСКТОП
                </button>
                <button
                  onClick={() => setDeviceMode("iphone")}
                  className={\`px-2.5 py-1.5 rounded text-xs font-black font-mono tracking-wider transition-all flex items-center gap-1 cursor-pointer \${deviceMode === "iphone" ? "bg-blue-600 text-white shadow" : "text-slate-500 hover:text-slate-300"}\`}
                  title="Режим iPhone 15"
                >
                  📱 IPHONE
                </button>
              </div>
            )}`;

const togglesNew = `            {!isRealMobile && (
              <div className="flex bg-slate-950/60 p-0.5 rounded-lg border border-slate-800/80 gap-1">
                <button
                  onClick={() => setDeviceMode("desktop")}
                  className={\`px-2.5 py-1.5 rounded text-xs font-black font-mono tracking-wider transition-all flex items-center gap-1 cursor-pointer \${deviceMode === "desktop" ? "bg-black/40 backdrop-blur-md shadow-[0_4px_30px_rgba(30,58,138,0.1)] text-blue-400 border border-slate-800/80" : "text-slate-500 hover:text-slate-300"}\`}
                  title="Режим ПК"
                >
                  💻 ПК
                </button>
                <button
                  onClick={() => setDeviceMode("ipad")}
                  className={\`px-2.5 py-1.5 rounded text-xs font-black font-mono tracking-wider transition-all flex items-center gap-1 cursor-pointer \${deviceMode === "ipad" ? "bg-black/40 backdrop-blur-md shadow-[0_4px_30px_rgba(30,58,138,0.1)] text-blue-400 border border-slate-800/80" : "text-slate-500 hover:text-slate-300"}\`}
                  title="Режим Планшет"
                >
                  <Tablet className="w-3.5 h-3.5" />
                  ПЛАНШЕТ
                </button>
                <button
                  onClick={() => setDeviceMode("iphone")}
                  className={\`px-2.5 py-1.5 rounded text-xs font-black font-mono tracking-wider transition-all flex items-center gap-1 cursor-pointer \${deviceMode === "iphone" ? "bg-black/40 backdrop-blur-md shadow-[0_4px_30px_rgba(30,58,138,0.1)] text-blue-400 border border-slate-800/80" : "text-slate-500 hover:text-slate-300"}\`}
                  title="Режим Телефон"
                >
                  📱 ТЕЛЕФОН
                </button>
              </div>
            )}`;

content = content.replace(togglesOld, togglesNew);

fs.writeFileSync('src/App.tsx', content);
