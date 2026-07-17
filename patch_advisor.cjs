const fs = require('fs');
let content = fs.readFileSync('src/components/AdvisorTab.tsx', 'utf-8');

// We will replace the entire right column with a message to use the global MARIARTI agent.
const oldRightCol = `{/* Right Column: Conversational Advisor Console */}`;
const newRightCol = `{/* Right Column: Conversational Advisor Console */}
        <div className="lg:col-span-2 flex flex-col justify-center items-center bg-slate-950 border border-slate-800 rounded-2xl p-10 text-center h-[620px]">
          <Bot className="w-16 h-16 text-indigo-400/50 mb-4" />
          <h3 className="text-lg font-bold text-slate-200 mb-2">Глобальний ШІ-Асистент MARIARTI</h3>
          <p className="text-sm text-slate-400 max-w-md">
            Чат-бот архітектора інтегровано в єдиний глобальний комунікаційний модуль PREDATOR (внизу праворуч). 
            Використовуйте плаваючий віджет для текстового та голосового спілкування з MARIARTI з будь-якого екрану.
          </p>
        </div>`;

const rightColRegex = /\{\/\* Right Column: Conversational Advisor Console \*\/\}[\s\S]*?(?=<\/div>\n      <\/div>\n    <\/div>\n  \);\n\})/m;
content = content.replace(rightColRegex, newRightCol);

fs.writeFileSync('src/components/AdvisorTab.tsx', content);
