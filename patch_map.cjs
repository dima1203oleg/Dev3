const fs = require('fs');
let code = fs.readFileSync('src/components/DashboardView.tsx', 'utf8');

// Add import
const importStr = `import GeospatialHeatmap from './GeospatialHeatmap';`;
code = code.replace(`import { OSINT_ENTITIES }`, `${importStr}\nimport { OSINT_ENTITIES }`);

// Add heatmap points right after chartDataWithForecast (or anywhere in the component)
const heatmapPointsCode = `
  const heatmapPoints = React.useMemo(() => [
    { id: '1', name: 'Східний логістичний вузол', coordinates: [114.0579, 22.5431] as [number, number], intensity: 94, type: 'CRITICAL' as const }, // Shenzhen
    { id: '2', name: 'Транзитний хаб', coordinates: [28.9784, 41.0082] as [number, number], intensity: 68, type: 'HIGH' as const }, // Istanbul
    { id: '3', name: 'Західний склад', coordinates: [12.3713, 51.3396] as [number, number], intensity: 10, type: 'LOW' as const }, // Leipzig
    { id: '4', name: 'Офшорна зона', coordinates: [-77.3963, 25.0343] as [number, number], intensity: 85, type: 'CRITICAL' as const }, // Bahamas
    { id: '5', name: 'Східноєвропейський кордон', coordinates: [24.0297, 49.8397] as [number, number], intensity: 45, type: 'LOW' as const }, // Lviv
    { id: '6', name: 'Центральний офіс', coordinates: [30.5238, 50.4501] as [number, number], intensity: 75, type: 'CRITICAL' as const }, // Kyiv
    { id: '7', name: 'Крипто-міксер вузол', coordinates: [4.8951, 52.3702] as [number, number], intensity: 80, type: 'CRITICAL' as const }, // Amsterdam
  ], []);
`;
code = code.replace(`const [refAreaRight, setRefAreaRight] = React.useState<string | null>(null);`, `const [refAreaRight, setRefAreaRight] = React.useState<string | null>(null);\n${heatmapPointsCode}`);

const targetStr = `              <div className="md:col-span-8 h-[240px] bg-slate-950/40 backdrop-blur-md shadow-[0_4px_30px_rgba(0,0,0,0.5)] border border-slate-850 rounded-xl relative overflow-hidden flex items-center justify-center">
                {/* SVG representing tactical vector background */}
                <svg className="absolute inset-0 w-full h-full opacity-35" viewBox="0 0 400 240">
                  <defs>
                    <radialGradient id="glow" cx="50%" cy="50%" r="50%">
                      <stop offset="0%" stopColor="#0ea5e9" stopOpacity="0.15" />
                      <stop offset="100%" stopColor="#0ea5e9" stopOpacity="0" />
                    </radialGradient>
                  </defs>
                  <rect width="100%" height="100%" fill="url(#glow)" />
                  {/* Tactical radar grids */}
                  <circle cx="200" cy="120" r="100" stroke="#334155" strokeWidth="0.5" strokeDasharray="5 5" />
                  <circle cx="200" cy="120" r="50" stroke="#334155" strokeWidth="0.5" />
                  <line x1="0" y1="120" x2="400" y2="120" stroke="#1e293b" strokeWidth="0.5" />
                  <line x1="200" y1="0" x2="200" y2="240" stroke="#1e293b" strokeWidth="0.5" />
                  
                  {/* Hotspots */}
                  <circle cx="160" cy="80" r="4" fill="#ef4444" className="animate-ping" />
                  <circle cx="160" cy="80" r="2" fill="#ef4444" />
                  <circle cx="240" cy="140" r="4" fill="#ef4444" className="animate-ping" style={{ animationDelay: '1s' }} />
                  <circle cx="240" cy="140" r="2" fill="#ef4444" />
                </svg>

                <div className="absolute top-3 left-3 bg-slate-950/80 border border-slate-850 px-2 py-1 rounded text-[8px] text-slate-500 font-mono">
                  DEC.GL GEOSPATIAL VECTOR MATRIX
                </div>

                <div className="text-center z-10 px-6">
                  <p className="text-slate-300 font-sans font-bold text-xs">Географічний шар митних та AML ризиків</p>
                  <p className="text-[10px] text-slate-500 font-mono mt-1">Транскордонні канали поставок подвійних компонентів до РФ відстежуються ШІ</p>
                  <button 
                    onClick={() => onSelectTab('maps')}
                    className="mt-3.5 bg-blue-600 hover:bg-blue-500 text-white text-[10px] font-bold uppercase tracking-wider px-3 py-1.5 rounded transition-all cursor-pointer"
                  >
                    Відкрити інтерактивну карту
                  </button>
                </div>
              </div>`;

const replacementStr = `              <div className="md:col-span-8 h-[240px] bg-slate-950/40 backdrop-blur-md shadow-[0_4px_30px_rgba(0,0,0,0.5)] border border-slate-850 rounded-xl relative overflow-hidden flex items-center justify-center">
                
                <GeospatialHeatmap points={heatmapPoints} width={800} height={400} />

                <div className="absolute top-3 left-3 bg-slate-950/80 border border-slate-850 px-2 py-1 rounded text-[8px] text-slate-500 font-mono pointer-events-none z-10">
                  GEOSPATIAL HEATMAP LAYER
                </div>

                <div className="absolute bottom-3 left-3 text-left z-10 pointer-events-none bg-slate-950/70 p-2 rounded backdrop-blur-sm border border-slate-800">
                  <p className="text-[9px] text-slate-300 font-mono font-bold">ГЛОБАЛЬНА ІНТЕНСИВНІСТЬ РИЗИКІВ</p>
                  <p className="text-[8px] text-slate-500 font-mono mt-1">Візуалізація концентрації аномальних транзакцій</p>
                </div>

                <div className="absolute bottom-3 right-3 z-10">
                  <button 
                    onClick={() => onSelectTab('maps')}
                    className="bg-blue-600/90 backdrop-blur border border-blue-500/50 hover:bg-blue-500 text-white text-[9px] font-bold uppercase tracking-wider px-3 py-1.5 rounded transition-all cursor-pointer shadow-lg"
                  >
                    Детальна карта
                  </button>
                </div>
              </div>`;

code = code.replace(targetStr, replacementStr);
fs.writeFileSync('src/components/DashboardView.tsx', code);
