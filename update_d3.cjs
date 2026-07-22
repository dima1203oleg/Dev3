const fs = require('fs');

function update(file) {
  try {
    let content = fs.readFileSync(file, 'utf8');
    content = content.replace(/bg-slate-900\/60 border border-slate-800/g, 'glass-panel-premium border-slate-800/50');
    content = content.replace(/bg-slate-900\/30 border border-slate-800/g, 'glass-panel-premium border-slate-800/50');
    fs.writeFileSync(file, content);
  } catch(e) {}
}

update('src/components/D3HistoricalRiskTrendsWidget.tsx');
update('src/components/D3RiskHeatmapWidget.tsx');
