const fs = require('fs');
let code = fs.readFileSync('src/components/MediaForensicsTab.tsx', 'utf8');

const targetSelectStart = `                <div>
                  <label className="block text-xs text-slate-500 mb-1.5">Тип ресурсу</label>
                  <select 
                    id="parser-type-select"
                    className="w-full bg-slate-950/40 backdrop-blur-md shadow-[0_4px_30px_rgba(0,0,0,0.5)] border border-blue-500/10 rounded-lg px-3 py-2 text-sm text-slate-300 focus:outline-none focus:border-sky-500"
                  >`;
const targetSelectEnd = `                  </select>
                </div>`;

const selectIdxStart = code.indexOf(targetSelectStart);
const selectIdxEnd = code.indexOf(targetSelectEnd, selectIdxStart) + targetSelectEnd.length;

if (selectIdxStart !== -1 && selectIdxEnd !== -1) {
    const oldSelect = code.substring(selectIdxStart, selectIdxEnd);
    const newSelect = `                <div>
                  <label className="block text-xs text-slate-500 mb-1.5">Тип ресурсу</label>
                  <select 
                    id="parser-type-select"
                    value={parserType}
                    onChange={(e) => setParserType(e.target.value)}
                    className="w-full bg-slate-950/40 backdrop-blur-md shadow-[0_4px_30px_rgba(0,0,0,0.5)] border border-sky-500/10 rounded-lg px-3 py-2 text-sm text-slate-300 focus:outline-none focus:border-sky-500 transition-colors"
                  >
                    <option value="telegram">Telegram Канал</option>
                    <option value="news">Новинний сайт (RSS/HTML)</option>
                    <option value="social">Соціальна мережа</option>
                    <option value="crypto">Крипто-гаманець (AML Tracking)</option>
                    <option value="darknet">Darknet Forum (Leak Tracking)</option>
                  </select>
                </div>`;
    code = code.replace(oldSelect, newSelect);
}

const targetTextArea = `              <label className="block text-xs text-slate-500 mb-1.5">{activeMode === 'parsers' ? 'URL джерела / посилання' : 'Запит / Інструкція (Prompt)'}</label>
              <textarea
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                rows={4}
                className="w-full bg-slate-950/40 backdrop-blur-md shadow-[0_4px_30px_rgba(0,0,0,0.5)] border border-blue-500/10 rounded-lg px-3 py-2 text-sm text-slate-300 focus:outline-none focus:border-sky-500 resize-none"
                placeholder={activeMode === 'parsers' ? "Введіть URL ресурсу (наприклад, https://t.me/news)" : activeMode === 'analysis' ? "Що саме шукати в цих медіа?" : "Опишіть, що потрібно згенерувати..."}
              />`;

const replaceTextArea = `              <label className="block text-xs text-slate-500 mb-1.5">{activeMode === 'parsers' ? 'URL джерела / посилання' : 'Запит / Інструкція (Prompt)'}</label>
              {activeMode === 'parsers' ? (
                <input
                  type="text"
                  value={parserUrl}
                  onChange={(e) => setParserUrl(e.target.value)}
                  className="w-full bg-slate-950/40 backdrop-blur-md shadow-[0_4px_30px_rgba(0,0,0,0.5)] border border-sky-500/10 rounded-lg px-3 py-2 text-sm text-slate-300 focus:outline-none focus:border-sky-500 transition-colors"
                  placeholder="Введіть URL (наприклад, t.me/insider_ua)"
                />
              ) : (
                <textarea
                  value={prompt}
                  onChange={(e) => setPrompt(e.target.value)}
                  rows={4}
                  className="w-full bg-slate-950/40 backdrop-blur-md shadow-[0_4px_30px_rgba(0,0,0,0.5)] border border-blue-500/10 rounded-lg px-3 py-2 text-sm text-slate-300 focus:outline-none focus:border-sky-500 resize-none"
                  placeholder={activeMode === 'analysis' ? "Що саме шукати в цих медіа?" : "Опишіть, що потрібно згенерувати..."}
                />
              )}`;

code = code.replace(targetTextArea, replaceTextArea);

const targetBtn = `<button
              onClick={handleRunTask}
              disabled={loading || (activeMode === 'analysis' && fileQueue.length === 0)}
              className="w-full mt-4 bg-fuchsia-600 hover:bg-sky-500 disabled:opacity-50 disabled:cursor-not-allowed text-white font-medium py-2.5 rounded-lg transition-all flex items-center justify-center gap-2 shadow-[0_0_15px_rgba(217,70,239,0.2)]"
            >
              {loading ? (
                <span className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              ) : (
                <>
                  <Play className="w-4 h-4" />
                  Виконати
                </>
              )}
            </button>`;

const replaceBtn = `{activeMode === 'parsers' ? (
              <button
                onClick={handleAddResource}
                disabled={!parserUrl.trim()}
                className="w-full mt-4 bg-emerald-600 hover:bg-emerald-500 disabled:opacity-50 disabled:cursor-not-allowed text-white font-medium py-2.5 rounded-lg transition-all flex items-center justify-center gap-2 shadow-[0_0_15px_rgba(16,185,129,0.2)]"
              >
                <Scan className="w-4 h-4" />
                Додати до моніторингу
              </button>
            ) : (
              <button
                onClick={handleRunTask}
                disabled={loading || (activeMode === 'analysis' && fileQueue.length === 0)}
                className="w-full mt-4 bg-fuchsia-600 hover:bg-sky-500 disabled:opacity-50 disabled:cursor-not-allowed text-white font-medium py-2.5 rounded-lg transition-all flex items-center justify-center gap-2 shadow-[0_0_15px_rgba(217,70,239,0.2)]"
              >
                {loading ? (
                  <span className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                ) : (
                  <>
                    <Play className="w-4 h-4" />
                    Виконати
                  </>
                )}
              </button>
            )}`;

code = code.replace(targetBtn, replaceBtn);

fs.writeFileSync('src/components/MediaForensicsTab.tsx', code);
