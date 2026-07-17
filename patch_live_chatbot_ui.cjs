const fs = require('fs');
let content = fs.readFileSync('src/components/LiveChatBot.tsx', 'utf-8');

const oldInputAreaRegex = /\{\/\* Input Area \*\/\}[\s\S]*?(?=<\/motion\.div>)/;

const newInputArea = `{/* Input Area */}
            <div className="p-2 bg-slate-900/60 border-t border-slate-800">
              <form onSubmit={handleSendText} className="flex items-center gap-1.5 bg-slate-950 p-1.5 rounded-2xl border border-slate-800/80">
                <button
                  type="button"
                  onClick={isActive ? stopMic : startMic}
                  className={\`p-2 rounded-xl transition-all \${
                    isActive 
                      ? 'bg-red-500/20 text-red-400 shadow-[0_0_10px_rgba(239,68,68,0.15)]' 
                      : 'text-slate-400 hover:bg-slate-800 hover:text-slate-200'
                  }\`}
                  title={isActive ? "Вимкнути мікрофон" : "Увімкнути мікрофон"}
                >
                  {isActive ? <MicOff className="w-4 h-4" /> : <Mic className="w-4 h-4" />}
                </button>
                <button
                  type="button"
                  onClick={() => setIsTTSMuted(!isTTSMuted)}
                  className={\`p-2 rounded-xl transition-all \${
                    isTTSMuted 
                      ? 'text-slate-500 hover:bg-slate-800 hover:text-slate-400' 
                      : 'text-emerald-400 hover:bg-slate-800 bg-emerald-500/10'
                  }\`}
                  title={isTTSMuted ? "Увімкнути звук" : "Вимкнути звук"}
                >
                  {isTTSMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
                </button>
                <input
                  type="text"
                  value={textInput}
                  onChange={(e) => setTextInput(e.target.value)}
                  placeholder="Повідомлення..."
                  className="flex-1 bg-transparent px-2 py-1 text-xs text-slate-200 focus:outline-none placeholder-slate-500"
                />
                <button
                  type="submit"
                  disabled={!textInput.trim()}
                  className="p-2 rounded-xl transition-all bg-indigo-600 hover:bg-indigo-500 disabled:bg-transparent disabled:text-slate-600 text-white"
                >
                  <Send className="w-4 h-4" />
                </button>
              </form>
            </div>
          `;

content = content.replace(oldInputAreaRegex, newInputArea);

fs.writeFileSync('src/components/LiveChatBot.tsx', content);
