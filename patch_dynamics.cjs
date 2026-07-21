const fs = require('fs');
let code = fs.readFileSync('src/components/DashboardView.tsx', 'utf8');

const stateInjectionTarget = `  const [syncStatus, setSyncStatus] = React.useState<'IDLE' | 'SYNCING' | 'DONE'>('IDLE');`;
const stateInjectionReplacement = `  const [syncStatus, setSyncStatus] = React.useState<'IDLE' | 'SYNCING' | 'DONE'>('IDLE');
  const [threatCategory, setThreatCategory] = React.useState<'ALL' | 'CRITICAL' | 'HIGH' | 'LOW'>('ALL');

  const threatDynamicsData = React.useMemo(() => [
    { date: '07-09', critical: 12, high: 24, low: 45 },
    { date: '07-10', critical: 15, high: 22, low: 48 },
    { date: '07-11', critical: 18, high: 28, low: 42 },
    { date: '07-12', critical: 14, high: 30, low: 50 },
    { date: '07-13', critical: 20, high: 35, low: 55 },
    { date: '07-14', critical: 25, high: 32, low: 60 },
    { date: '07-15', critical: 22, high: 38, low: 65 },
  ], []);
`;

const widgetInjectionTarget = `          {/* CORPORATE INTERACTIVE CONTROL PANEL */}`;
const widgetInjectionReplacement = `          {/* Threat Dynamics Line Chart */}
          <div className="bg-slate-900/40 border border-blue-500/10 rounded-2xl shadow-[0_4px_30px_rgba(0,0,0,0.5)] backdrop-blur-md p-5 shadow-xl space-y-4 relative overflow-hidden backdrop-blur-sm">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-blue-500/5 pb-3 gap-3">
              <div className="flex items-center gap-2">
                <TrendingUp className="w-4.5 h-4.5 text-blue-400" />
                <div>
                  <span className="text-xs font-bold uppercase text-slate-100 tracking-widest block font-mono">
                    Динаміка виявлених загроз
                  </span>
                  <p className="text-[9px] text-slate-500 font-mono mt-0.5">
                    Щоденний аналіз аномалій та ризик-факторів
                  </p>
                </div>
              </div>
              
              {/* Category Filter */}
              <div className="flex items-center gap-1.5 bg-slate-950/80 p-1 rounded-xl border border-blue-500/5/60">
                <button
                  onClick={() => setThreatCategory('ALL')}
                  className={\`px-2.5 py-1 rounded-lg text-[9px] font-bold uppercase tracking-wider transition-all cursor-pointer \${
                    threatCategory === 'ALL' ? 'bg-blue-600 text-white shadow' : 'text-slate-300 hover:text-slate-200'
                  }\`}
                >
                  Всі
                </button>
                <button
                  onClick={() => setThreatCategory('CRITICAL')}
                  className={\`px-2.5 py-1 rounded-lg text-[9px] font-bold uppercase tracking-wider transition-all cursor-pointer \${
                    threatCategory === 'CRITICAL' ? 'bg-blue-600 text-white shadow' : 'text-slate-300 hover:text-slate-200'
                  }\`}
                >
                  Критичні
                </button>
                <button
                  onClick={() => setThreatCategory('HIGH')}
                  className={\`px-2.5 py-1 rounded-lg text-[9px] font-bold uppercase tracking-wider transition-all cursor-pointer \${
                    threatCategory === 'HIGH' ? 'bg-blue-600 text-white shadow' : 'text-slate-300 hover:text-slate-200'
                  }\`}
                >
                  Високі
                </button>
                <button
                  onClick={() => setThreatCategory('LOW')}
                  className={\`px-2.5 py-1 rounded-lg text-[9px] font-bold uppercase tracking-wider transition-all cursor-pointer \${
                    threatCategory === 'LOW' ? 'bg-blue-600 text-white shadow' : 'text-slate-300 hover:text-slate-200'
                  }\`}
                >
                  Низькі
                </button>
              </div>
            </div>

            <div className="h-[250px] w-full mt-4">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={threatDynamicsData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#334155" vertical={false} opacity={0.5} />
                  <XAxis 
                    dataKey="date" 
                    stroke="#475569" 
                    tick={{ fill: '#94a3b8', fontSize: 10, fontFamily: 'monospace' }}
                    tickMargin={10}
                    axisLine={false}
                  />
                  <YAxis 
                    stroke="#475569" 
                    tick={{ fill: '#94a3b8', fontSize: 10, fontFamily: 'monospace' }}
                    axisLine={false}
                    tickLine={false}
                  />
                  <Tooltip 
                    contentStyle={{ backgroundColor: 'rgba(15, 23, 42, 0.9)', borderColor: 'rgba(59, 130, 246, 0.2)', borderRadius: '8px', fontSize: '12px' }}
                    itemStyle={{ fontFamily: 'monospace' }}
                    labelStyle={{ color: '#cbd5e1', marginBottom: '4px', fontFamily: 'monospace' }}
                  />
                  <Legend wrapperStyle={{ fontSize: '10px', paddingTop: '10px' }} />
                  
                  {(threatCategory === 'ALL' || threatCategory === 'CRITICAL') && (
                    <Line 
                      type="monotone" 
                      dataKey="critical" 
                      name="Критичні" 
                      stroke="#f43f5e" 
                      strokeWidth={3}
                      dot={{ r: 4, fill: '#f43f5e', strokeWidth: 0 }}
                      activeDot={{ r: 6, stroke: '#fda4af', strokeWidth: 2 }}
                    />
                  )}
                  {(threatCategory === 'ALL' || threatCategory === 'HIGH') && (
                    <Line 
                      type="monotone" 
                      dataKey="high" 
                      name="Високі" 
                      stroke="#f59e0b" 
                      strokeWidth={2}
                      dot={{ r: 3, fill: '#f59e0b', strokeWidth: 0 }}
                      activeDot={{ r: 5, stroke: '#fcd34d', strokeWidth: 2 }}
                    />
                  )}
                  {(threatCategory === 'ALL' || threatCategory === 'LOW') && (
                    <Line 
                      type="monotone" 
                      dataKey="low" 
                      name="Низькі" 
                      stroke="#10b981" 
                      strokeWidth={2}
                      dot={{ r: 3, fill: '#10b981', strokeWidth: 0 }}
                      activeDot={{ r: 5, stroke: '#6ee7b7', strokeWidth: 2 }}
                    />
                  )}
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* CORPORATE INTERACTIVE CONTROL PANEL */}`;

if (code.includes(stateInjectionTarget)) {
  code = code.replace(stateInjectionTarget, stateInjectionReplacement);
} else {
  console.log("Could not find stateInjectionTarget");
}

if (code.includes(widgetInjectionTarget)) {
  code = code.replace(widgetInjectionTarget, widgetInjectionReplacement);
} else {
  console.log("Could not find widgetInjectionTarget");
}

fs.writeFileSync('src/components/DashboardView.tsx', code);
