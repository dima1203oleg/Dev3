const fs = require('fs');
let code = fs.readFileSync('src/components/OsintWorkbench.tsx', 'utf8');

code = code.replace(
  /{activeEntity\.type === 'cryptowallet' \? \(\n            {\/\* Crypto Asset Analytics Dashboard \*\/}/,
  "{activeEntity.type === 'cryptowallet' ? (\n            <>\n            {/* Crypto Asset Analytics Dashboard */}"
);

code = code.replace(
  /                  <\/table>\n                <\/div>\n              <\/div>\n            <\/div>\n          \) : \(\n          {\/\* Interactive Geopolitical OSINT Map \(Section 15\) \*\//,
  "                  </table>\n                </div>\n              </div>\n            </div>\n            </>\n          ) : (\n          <>\n          {/* Interactive Geopolitical OSINT Map (Section 15) */}"
);

code = code.replace(
  /        \)}\n      <\/AnimatePresence>\n          <\/div>\n          \)}/,
  "        )}\n      </AnimatePresence>\n          </div>\n          </>}\n"
);

fs.writeFileSync('src/components/OsintWorkbench.tsx', code);
