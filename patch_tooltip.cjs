const fs = require('fs');
let content = fs.readFileSync('src/components/DashboardView.tsx', 'utf-8');

const customTooltip = `
const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-slate-950/90 border border-slate-800 p-3 rounded-xl shadow-xl backdrop-blur-sm">
        <p className="text-[10px] font-mono text-slate-400 mb-2 border-b border-slate-800 pb-1">Дата: {label}</p>
        <div className="space-y-1.5">
          {payload.map((entry: any, index: number) => (
            <div key={index} className="flex items-center justify-between gap-4 text-xs">
              <div className="flex items-center gap-1.5">
                <div className="w-2 h-2 rounded-full" style={{ backgroundColor: entry.color }} />
                <span className="text-slate-300">{entry.name}:</span>
              </div>
              <span className="font-mono font-bold" style={{ color: entry.color }}>
                {entry.value}
              </span>
            </div>
          ))}
        </div>
      </div>
    );
  }
  return null;
};

export default function DashboardView`;

content = content.replace("export default function DashboardView", customTooltip);

content = content.replace(
  /<Tooltip\s+contentStyle[^>]+itemStyle[^>]+\/>/m,
  '<Tooltip content={<CustomTooltip />} />'
);

fs.writeFileSync('src/components/DashboardView.tsx', content);
