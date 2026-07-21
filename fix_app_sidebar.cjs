const fs = require('fs');
let code = fs.readFileSync('src/App.tsx', 'utf8');

const targetStr = `                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as TabId)}
                  className={\`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all duration-200 cursor-pointer \${
                    activeTab === tab.id 
                      ? 'bg-blue-600/15 text-blue-400 font-bold border border-blue-500/30 shadow-[0_0_15px_rgba(37,99,235,0.15)]' 
                      : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900/50'
                  }\`}
                >`;
                
const replaceStr = `                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as TabId)}
                  className={\`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all duration-300 cursor-pointer \${
                    activeTab === tab.id 
                      ? 'bg-gradient-to-r from-blue-600/20 to-transparent text-blue-400 font-bold border-l-2 border-l-blue-500 shadow-[inset_0_1px_0_0_rgba(255,255,255,0.05)]' 
                      : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900/50 border-l-2 border-transparent'
                  }\`}
                >`;

code = code.replace(targetStr, replaceStr);

fs.writeFileSync('src/App.tsx', code);
