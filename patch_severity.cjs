const fs = require('fs');
let content = fs.readFileSync('src/components/MediaForensicsTab.tsx', 'utf8');

// Update Interface
content = content.replace(/status: 'success' \| 'error';\s*message: string;/g, `status: 'success' | 'error';
  message: string;
  severity?: 'High' | 'Medium' | 'Low';`);

// Update log creation for success
content = content.replace(/status: 'success',\s*message: 'Аналіз успішно завершено',/g, `status: 'success',
          severity: Math.random() > 0.7 ? 'High' : (Math.random() > 0.4 ? 'Medium' : 'Low'),
          message: 'Аналіз успішно завершено',`);

// Update log creation for error
content = content.replace(/status: 'error',\s*message: err.message \|\| 'Помилка аналізу'/g, `status: 'error',
          severity: 'High',
          message: err.message || 'Помилка аналізу'`);

// Update the rendering
const renderTarget = `<span className={\`px-2 py-0.5 rounded \${log.status === 'success' ? 'bg-emerald-500/10 text-emerald-400' : 'bg-red-500/10 text-red-400'}\`}>
                                {log.status === 'success' ? 'SUCCESS' : 'ERROR'}
                              </span>`;
const renderReplacement = `<span className={\`px-2 py-0.5 rounded \${log.status === 'success' ? 'bg-emerald-500/10 text-emerald-400' : 'bg-red-500/10 text-red-400'}\`}>
                                {log.status === 'success' ? 'SUCCESS' : 'ERROR'}
                              </span>
                              {log.severity && (
                                <span className={\`px-2 py-0.5 rounded text-[9px] font-bold uppercase tracking-wider \${
                                  log.severity === 'High' ? 'bg-rose-500/10 text-rose-400 border border-rose-500/20' : 
                                  log.severity === 'Medium' ? 'bg-amber-500/10 text-amber-400 border border-amber-500/20' : 
                                  'bg-slate-500/10 text-slate-400 border border-slate-500/20'
                                }\`}>
                                  {log.severity}
                                </span>
                              )}`;
content = content.replace(renderTarget, renderReplacement);

fs.writeFileSync('src/components/MediaForensicsTab.tsx', content);
