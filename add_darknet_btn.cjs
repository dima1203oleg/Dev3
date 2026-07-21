const fs = require('fs');
let code = fs.readFileSync('src/components/OsintWorkbench.tsx', 'utf8');

const targetStr = `              <div className="absolute right-4 top-4 flex items-center gap-2">
                {getStatusBadge(activeEntity.status)}
                <div className={\`text-xs font-bold font-mono px-2.5 py-1 rounded-lg border \${getRiskColor(activeEntity.riskScore)}\`}>
                  RISK Score: {activeEntity.riskScore}
                </div>
              </div>`;
              
const replaceStr = `              <div className="absolute right-4 top-4 flex items-center gap-2">
                {(activeEntity as any).leakData && (
                  <div className="flex items-center gap-1.5 px-2.5 py-1 bg-fuchsia-500/10 border border-fuchsia-500/20 rounded-lg text-fuchsia-400 text-xs font-bold animate-pulse cursor-pointer">
                    <ShieldAlert className="w-3.5 h-3.5" />
                    DARKNET LEAKS
                  </div>
                )}
                {getStatusBadge(activeEntity.status)}
                <div className={\`text-xs font-bold font-mono px-2.5 py-1 rounded-lg border \${getRiskColor(activeEntity.riskScore)}\`}>
                  RISK Score: {activeEntity.riskScore}
                </div>
              </div>`;

code = code.replace(targetStr, replaceStr);
fs.writeFileSync('src/components/OsintWorkbench.tsx', code);
