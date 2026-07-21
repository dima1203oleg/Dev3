const fs = require('fs');
let code = fs.readFileSync('src/components/OsintWorkbench.tsx', 'utf8');

// 1. Add imports
const importTarget = `import { OSINT_ENTITIES, OsintEntity } from '../osintData';`;
const importReplacement = `import { OSINT_ENTITIES, OsintEntity } from '../osintData';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip as RechartsTooltip, ResponsiveContainer } from 'recharts';`;

code = code.replace(importTarget, importReplacement);

// 2. Add data generator inside OsintWorkbench
const generatorTarget = `  const [pdfConfig, setPdfConfig] = useState({`;
const generatorReplacement = `  const getRiskDynamicsData = useMemo(() => (entity: OsintEntity) => {
    const hash = entity.id.split('').reduce((a, b) => { a = ((a << 5) - a) + b.charCodeAt(0); return a & a }, 0);
    const baseRisk = entity.riskScore;
    const data = [];
    const months = ['Сер', 'Вер', 'Жов', 'Лис', 'Гру', 'Січ', 'Лют', 'Бер', 'Кві', 'Тра', 'Чер', 'Лип'];
    for (let i = 0; i < 12; i++) {
      const variance = (Math.sin(hash + i) * 15);
      let val = Math.round(baseRisk - 10 + (i * 0.8) + variance);
      if (i === 11) val = baseRisk;
      val = Math.max(0, Math.min(100, val));
      data.push({ month: months[i], risk: val });
    }
    return data;
  }, []);

  const [pdfConfig, setPdfConfig] = useState({`;

code = code.replace(generatorTarget, generatorReplacement);

// 3. Add the chart component
const chartTarget = `              {/* Description */}
              <div className="space-y-1.5">
                <span className="text-[9px] text-slate-500 font-mono font-bold uppercase tracking-widest block">Аналітична замітка (Огляд)</span>
                <p className="text-slate-300 leading-relaxed text-[11px] whitespace-pre-line bg-slate-950/50 p-3 rounded-xl border border-blue-500/5">
                  {activeEntity.description}
                </p>
              </div>`;

const chartReplacement = `              {/* Description */}
              <div className="space-y-1.5">
                <span className="text-[9px] text-slate-500 font-mono font-bold uppercase tracking-widest block">Аналітична замітка (Огляд)</span>
                <p className="text-slate-300 leading-relaxed text-[11px] whitespace-pre-line bg-slate-950/50 p-3 rounded-xl border border-blue-500/5">
                  {activeEntity.description}
                </p>
              </div>

              {/* Risk Dynamics Chart */}
              <div className="space-y-1.5">
                <span className="text-[9px] text-slate-500 font-mono font-bold uppercase tracking-widest block">Динаміка рівня ризику (12 місяців)</span>
                <div className="bg-slate-950/50 p-3 rounded-xl border border-blue-500/5 h-[180px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={getRiskDynamicsData(activeEntity)} margin={{ top: 5, right: 0, left: -25, bottom: 0 }}>
                      <defs>
                        <linearGradient id="colorRisk" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor={activeEntity.riskScore >= 80 ? '#f43f5e' : activeEntity.riskScore >= 50 ? '#f59e0b' : '#10b981'} stopOpacity={0.3}/>
                          <stop offset="95%" stopColor={activeEntity.riskScore >= 80 ? '#f43f5e' : activeEntity.riskScore >= 50 ? '#f59e0b' : '#10b981'} stopOpacity={0}/>
                        </linearGradient>
                      </defs>
                      <CartesianGrid strokeDasharray="3 3" stroke="#334155" opacity={0.4} vertical={false} />
                      <XAxis dataKey="month" stroke="#64748b" fontSize={9} tickLine={false} axisLine={false} />
                      <YAxis stroke="#64748b" fontSize={9} tickLine={false} axisLine={false} domain={[0, 100]} />
                      <RechartsTooltip 
                        contentStyle={{ backgroundColor: 'rgba(15, 23, 42, 0.9)', borderColor: 'rgba(59, 130, 246, 0.2)', fontSize: '10px', borderRadius: '8px' }}
                        itemStyle={{ color: '#e2e8f0', fontWeight: 'bold' }}
                      />
                      <Area type="monotone" dataKey="risk" stroke={activeEntity.riskScore >= 80 ? '#f43f5e' : activeEntity.riskScore >= 50 ? '#f59e0b' : '#10b981'} strokeWidth={2} fillOpacity={1} fill="url(#colorRisk)" />
                    </AreaChart>
                  </ResponsiveContainer>
                </div>
              </div>`;

code = code.replace(chartTarget, chartReplacement);

fs.writeFileSync('src/components/OsintWorkbench.tsx', code);
