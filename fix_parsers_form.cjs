const fs = require('fs');
let code = fs.readFileSync('src/components/MediaForensicsTab.tsx', 'utf8');

const targetStr = `            {activeMode === 'music' && (
              <div className="space-y-4">
                <div className="bg-sky-500/10 border border-sky-500/20 rounded-lg p-3 flex items-start gap-2">
                  <Sparkles className="w-4 h-4 text-sky-400 shrink-0 mt-0.5" />
                  <p className="text-[10px] text-fuchsia-200/80 leading-relaxed">
                    Lyria Music AI: Згенеруйте унікальну композицію, звуковий ефект або фонову музику на основі текстового опису.
                  </p>
                </div>
              </div>
            )}`;
            
const replacementStr = `            {activeMode === 'music' && (
              <div className="space-y-4">
                <div className="bg-sky-500/10 border border-sky-500/20 rounded-lg p-3 flex items-start gap-2">
                  <Sparkles className="w-4 h-4 text-sky-400 shrink-0 mt-0.5" />
                  <p className="text-[10px] text-fuchsia-200/80 leading-relaxed">
                    Lyria Music AI: Згенеруйте унікальну композицію, звуковий ефект або фонову музику на основі текстового опису.
                  </p>
                </div>
              </div>
            )}
            {activeMode === 'parsers' && (
              <div className="space-y-4">
                <div className="bg-emerald-500/10 border border-emerald-500/20 rounded-lg p-3 flex items-start gap-2">
                  <Scan className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                  <p className="text-[10px] text-emerald-200/80 leading-relaxed">
                    OSINT Парсери: Додайте посилання на Telegram-канал або новинний сайт для постійного моніторингу та індексування.
                  </p>
                </div>
                <div>
                  <label className="block text-xs text-slate-500 mb-1.5">Тип ресурсу</label>
                  <select 
                    id="parser-type-select"
                    className="w-full bg-slate-950/40 backdrop-blur-md shadow-[0_4px_30px_rgba(0,0,0,0.5)] border border-blue-500/10 rounded-lg px-3 py-2 text-sm text-slate-300 focus:outline-none focus:border-sky-500"
                  >
                    <option value="telegram">Telegram Канал</option>
                    <option value="news">Новинний сайт (RSS/HTML)</option>
                    <option value="social">Соціальна мережа</option>
                  </select>
                </div>
              </div>
            )}`;

code = code.replace(targetStr, replacementStr);

const targetPromptLabel = `placeholder={activeMode === 'analysis' ? "Що саме шукати в цих медіа?" : "Опишіть, що потрібно згенерувати..."}`;
const replacementPromptLabel = `placeholder={activeMode === 'parsers' ? "Введіть URL ресурсу (наприклад, https://t.me/news)" : activeMode === 'analysis' ? "Що саме шукати в цих медіа?" : "Опишіть, що потрібно згенерувати..."}`;

code = code.replace(targetPromptLabel, replacementPromptLabel);

const targetLabelStr = `<label className="block text-xs text-slate-500 mb-1.5">Запит / Інструкція (Prompt)</label>`;
const replacementLabelStr = `<label className="block text-xs text-slate-500 mb-1.5">{activeMode === 'parsers' ? 'URL джерела / посилання' : 'Запит / Інструкція (Prompt)'}</label>`;

code = code.replace(targetLabelStr, replacementLabelStr);

const buttonLabelStr = `{loading ? 'Обробка...' : 'Запустити процес'}`;
const replacementButtonLabelStr = `{loading ? 'Обробка...' : activeMode === 'parsers' ? 'Додати до моніторингу' : 'Запустити процес'}`;
code = code.replace(buttonLabelStr, replacementButtonLabelStr);


fs.writeFileSync('src/components/MediaForensicsTab.tsx', code);
