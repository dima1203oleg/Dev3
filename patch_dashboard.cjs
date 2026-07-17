const fs = require('fs');
let content = fs.readFileSync('src/components/DashboardView.tsx', 'utf-8');

// Add Recharts imports
content = content.replace(
  "import { OSINT_ENTITIES } from '../osintData';",
  "import { OSINT_ENTITIES } from '../osintData';\nimport { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';"
);

// Add the risk dynamics data right before DashboardView
const data = `
const riskDynamicsData = [
  { date: '06-18', operations: 12, critical: 2 },
  { date: '06-21', operations: 19, critical: 5 },
  { date: '06-24', operations: 15, critical: 1 },
  { date: '06-27', operations: 22, critical: 8 },
  { date: '06-30', operations: 30, critical: 12 },
  { date: '07-03', operations: 28, critical: 9 },
  { date: '07-06', operations: 35, critical: 15 },
  { date: '07-09', operations: 42, critical: 18 },
  { date: '07-12', operations: 38, critical: 11 },
  { date: '07-15', operations: 45, critical: 22 },
];
`;

content = content.replace(
  "export default function DashboardView",
  data + "\nexport default function DashboardView"
);

// Add the Chart component right before AI Insights
const chartComponent = `
          {/* Risk Dynamics Chart */}
          <div className="bg-slate-900/40 border border-slate-900 rounded-2xl p-5 shadow-lg relative overflow-hidden" id="risk-dynamics-chart">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <Activity className="w-4 h-4 text-indigo-400" />
                <span className="text-xs font-bold uppercase text-slate-200 tracking-widest font-mono">
                  Динаміка виявлених ризикових операцій (30 днів)
                </span>
              </div>
            </div>
            <div className="h-[220px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={riskDynamicsData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                  <defs>
                    <linearGradient id="colorOperations" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#818cf8" stopOpacity={0.3}/>
                      <stop offset="95%" stopColor="#818cf8" stopOpacity={0}/>
                    </linearGradient>
                    <linearGradient id="colorCritical" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#f43f5e" stopOpacity={0.3}/>
                      <stop offset="95%" stopColor="#f43f5e" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" vertical={false} />
                  <XAxis dataKey="date" stroke="#64748b" fontSize={10} tickLine={false} axisLine={false} />
                  <YAxis stroke="#64748b" fontSize={10} tickLine={false} axisLine={false} />
                  <Tooltip 
                    contentStyle={{ backgroundColor: '#0f172a', borderColor: '#1e293b', fontSize: '12px' }}
                    itemStyle={{ color: '#cbd5e1' }}
                  />
                  <Area type="monotone" dataKey="operations" name="Загалом операцій" stroke="#818cf8" strokeWidth={2} fillOpacity={1} fill="url(#colorOperations)" />
                  <Area type="monotone" dataKey="critical" name="Критичні ризики" stroke="#f43f5e" strokeWidth={2} fillOpacity={1} fill="url(#colorCritical)" />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>
`;

content = content.replace(
  "{/* AI Insights & Summary Section (Section 11) */}",
  chartComponent + "\n          {/* AI Insights & Summary Section (Section 11) */}"
);

fs.writeFileSync('src/components/DashboardView.tsx', content);
console.log('Successfully patched DashboardView.tsx');
