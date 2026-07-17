const fs = require('fs');
let content = fs.readFileSync('src/components/DashboardView.tsx', 'utf-8');

content = content.replace(
  "  Sparkles, Award",
  "  Sparkles, Award, Download"
);

const downloadCSVFunc = `
  const downloadChartCSV = () => {
    const headers = ['Дата', 'Загалом операцій', 'Критичні ризики'];
    const csvContent = [
      headers.join(','),
      ...chartData.map(row => \`\${row.date},\${row.operations},\${row.critical}\`)
    ].join('\\n');

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    if (link.download !== undefined) {
      const url = URL.createObjectURL(blob);
      link.setAttribute('href', url);
      link.setAttribute('download', 'risk_dynamics_metrics.csv');
      link.style.visibility = 'hidden';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  };
`;

content = content.replace(
  "  const triggerComplianceScreening = () => {",
  downloadCSVFunc + "\n  const triggerComplianceScreening = () => {"
);

const headerReplacement = `            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <Activity className="w-4 h-4 text-indigo-400" />
                <span className="text-xs font-bold uppercase text-slate-200 tracking-widest font-mono">
                  Динаміка виявлених ризикових операцій (30 днів)
                </span>
              </div>
              <button 
                onClick={downloadChartCSV}
                className="flex items-center gap-1.5 px-2.5 py-1.5 bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-indigo-400 rounded-lg text-[10px] font-mono font-bold uppercase tracking-wider border border-slate-700 transition-colors"
                title="Завантажити CSV"
              >
                <Download className="w-3.5 h-3.5" />
                <span>CSV</span>
              </button>
            </div>`;

content = content.replace(
  /<div className="flex items-center justify-between mb-4">\s*<div className="flex items-center gap-2">\s*<Activity className="w-4 h-4 text-indigo-400" \/>\s*<span className="text-xs font-bold uppercase text-slate-200 tracking-widest font-mono">\s*Динаміка виявлених ризикових операцій \(30 днів\)\s*<\/span>\s*<\/div>\s*<\/div>/m,
  headerReplacement
);

fs.writeFileSync('src/components/DashboardView.tsx', content);
console.log('Successfully patched DashboardView.tsx for CSV download.');
