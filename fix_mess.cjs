const fs = require('fs');
let code = fs.readFileSync('src/components/OsintWorkbench.tsx', 'utf8');

// Fix the comment at 1981
code = code.replace(
  /{[\s]*\/\* Interactive Geopolitical OSINT Map \(Section 15\) \*}[\/]{0,3}/g,
  "{/* Interactive Geopolitical OSINT Map (Section 15) */}"
);

const searchStr = `              <div className="text-[8.5px] font-mono text-slate-500">
                Кадастрові та транзитні карти оновлено у реальному часі • 4 вузли побудовано
              </div>
            </div>
          </div>`;
          
const replaceStr = `              <div className="text-[8.5px] font-mono text-slate-500">
                Кадастрові та транзитні карти оновлено у реальному часі • 4 вузли побудовано
              </div>
            </div>
          </div>
          </>)}`;

if (code.includes(searchStr) && !code.includes('</>)}')) {
    code = code.replace(searchStr, replaceStr);
}

code = code.replace(
  /        \)}\n      <\/AnimatePresence>\n          <\/div>\n          <\/>}\n/g,
  "        )}\n      </AnimatePresence>\n"
);
code = code.replace(
  /      <\/AnimatePresence>\n          <\/div>\n          <\/>}\n/g,
  "      </AnimatePresence>\n"
);

fs.writeFileSync('src/components/OsintWorkbench.tsx', code);
