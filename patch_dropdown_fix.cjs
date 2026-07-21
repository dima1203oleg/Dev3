const fs = require('fs');
let code = fs.readFileSync('src/components/InspectorPanel.tsx', 'utf8');

const targetStr = `            </select>
          )}
          <button 
            onClick={onClose}
          className="text-slate-500 hover:text-slate-300 font-mono text-[11px] px-2 py-1 rounded hover:bg-slate-900/50 backdrop-blur-md shadow-[0_4px_30px_rgba(0,0,0,0.3)] transition-colors cursor-pointer"
        >
          Згорнути [ESC]
        </button>
      </div>`;

const replacementStr = `            </select>
          )}
          <button 
            onClick={onClose}
            className="text-slate-500 hover:text-slate-300 font-mono text-[11px] px-2 py-1 rounded hover:bg-slate-900/50 backdrop-blur-md shadow-[0_4px_30px_rgba(0,0,0,0.3)] transition-colors cursor-pointer"
          >
            Згорнути [ESC]
          </button>
        </div>
      </div>`;

code = code.replace(targetStr, replacementStr);
fs.writeFileSync('src/components/InspectorPanel.tsx', code);
