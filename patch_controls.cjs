const fs = require('fs');
let code = fs.readFileSync('src/components/DashboardView.tsx', 'utf8');

// 1. Add state for heatmap categories
const stateInjectionStr = `  const [heatmapFilter, setHeatmapFilter] = React.useState<'all' | 'company' | 'person' | 'cryptowallet'>('all');`;
const stateReplacementStr = `  const [heatmapFilter, setHeatmapFilter] = React.useState<'all' | 'company' | 'person' | 'cryptowallet'>('all');
  const [visibleHeatmapCategories, setVisibleHeatmapCategories] = React.useState<string[]>(['Sanction Risk', 'Operational Risk', 'Financial Risk']);
  
  const toggleHeatmapCategory = (cat: string) => {
    setVisibleHeatmapCategories(prev => 
      prev.includes(cat) ? prev.filter(c => c !== cat) : [...prev, cat]
    );
  };`;

// 2. Add categories to heatmapPoints
const heatmapPointsStr = `  const heatmapPoints = React.useMemo(() => [
    { id: '1', name: 'Східний логістичний вузол', coordinates: [114.0579, 22.5431] as [number, number], intensity: 94, type: 'CRITICAL' as const }, // Shenzhen
    { id: '2', name: 'Транзитний хаб', coordinates: [28.9784, 41.0082] as [number, number], intensity: 68, type: 'HIGH' as const }, // Istanbul
    { id: '3', name: 'Західний склад', coordinates: [12.3713, 51.3396] as [number, number], intensity: 10, type: 'LOW' as const }, // Leipzig
    { id: '4', name: 'Офшорна зона', coordinates: [-77.3963, 25.0343] as [number, number], intensity: 85, type: 'CRITICAL' as const }, // Bahamas
    { id: '5', name: 'Східноєвропейський кордон', coordinates: [24.0297, 49.8397] as [number, number], intensity: 45, type: 'LOW' as const }, // Lviv
    { id: '6', name: 'Центральний офіс', coordinates: [30.5238, 50.4501] as [number, number], intensity: 75, type: 'CRITICAL' as const }, // Kyiv
    { id: '7', name: 'Крипто-міксер вузол', coordinates: [4.8951, 52.3702] as [number, number], intensity: 80, type: 'CRITICAL' as const }, // Amsterdam
  ], []);`;

const heatmapPointsReplacement = `  const heatmapPoints = React.useMemo(() => [
    { id: '1', name: 'Східний логістичний вузол', coordinates: [114.0579, 22.5431] as [number, number], intensity: 94, type: 'CRITICAL' as const, category: 'Sanction Risk' }, // Shenzhen
    { id: '2', name: 'Транзитний хаб', coordinates: [28.9784, 41.0082] as [number, number], intensity: 68, type: 'HIGH' as const, category: 'Operational Risk' }, // Istanbul
    { id: '3', name: 'Західний склад', coordinates: [12.3713, 51.3396] as [number, number], intensity: 10, type: 'LOW' as const, category: 'Financial Risk' }, // Leipzig
    { id: '4', name: 'Офшорна зона', coordinates: [-77.3963, 25.0343] as [number, number], intensity: 85, type: 'CRITICAL' as const, category: 'Financial Risk' }, // Bahamas
    { id: '5', name: 'Східноєвропейський кордон', coordinates: [24.0297, 49.8397] as [number, number], intensity: 45, type: 'LOW' as const, category: 'Operational Risk' }, // Lviv
    { id: '6', name: 'Центральний офіс', coordinates: [30.5238, 50.4501] as [number, number], intensity: 75, type: 'CRITICAL' as const, category: 'Sanction Risk' }, // Kyiv
    { id: '7', name: 'Крипто-міксер вузол', coordinates: [4.8951, 52.3702] as [number, number], intensity: 80, type: 'CRITICAL' as const, category: 'Financial Risk' }, // Amsterdam
  ], []);
  
  const filteredHeatmapPoints = heatmapPoints.filter(p => visibleHeatmapCategories.includes(p.category));
`;

// 3. Update the GeospatialHeatmap usage and add controls
const mapTargetStr = `              <div className="md:col-span-8 h-[240px] bg-slate-950/40 backdrop-blur-md shadow-[0_4px_30px_rgba(0,0,0,0.5)] border border-slate-850 rounded-xl relative overflow-hidden flex items-center justify-center">
                
                <GeospatialHeatmap points={heatmapPoints} width={800} height={400} />

                <div className="absolute top-3 left-3 bg-slate-950/80 border border-slate-850 px-2 py-1 rounded text-[8px] text-slate-500 font-mono pointer-events-none z-10">
                  GEOSPATIAL HEATMAP LAYER
                </div>`;

const mapReplacementStr = `              <div className="md:col-span-8 h-[240px] bg-slate-950/40 backdrop-blur-md shadow-[0_4px_30px_rgba(0,0,0,0.5)] border border-slate-850 rounded-xl relative overflow-hidden flex items-center justify-center">
                
                <GeospatialHeatmap points={filteredHeatmapPoints} width={800} height={400} />

                <div className="absolute top-3 left-3 flex gap-2 z-10">
                  <div className="bg-slate-950/80 border border-slate-850 px-2 py-1 rounded text-[8px] text-slate-500 font-mono pointer-events-none">
                    GEOSPATIAL HEATMAP LAYER
                  </div>
                  
                  {/* Category Controls */}
                  <div className="flex bg-slate-950/90 border border-slate-800 rounded p-0.5 gap-0.5">
                    {['Sanction Risk', 'Operational Risk', 'Financial Risk'].map(cat => (
                      <button
                        key={cat}
                        onClick={() => toggleHeatmapCategory(cat)}
                        className={\`px-1.5 py-0.5 text-[8px] font-mono font-bold rounded transition-colors cursor-pointer \${
                          visibleHeatmapCategories.includes(cat) 
                            ? 'bg-blue-600/30 text-blue-300 border border-blue-500/50' 
                            : 'bg-transparent text-slate-500 hover:text-slate-300 border border-transparent'
                        }\`}
                      >
                        {cat}
                      </button>
                    ))}
                  </div>
                </div>`;

code = code.replace(stateInjectionStr, stateReplacementStr);
code = code.replace(heatmapPointsStr, heatmapPointsReplacement);
code = code.replace(mapTargetStr, mapReplacementStr);

fs.writeFileSync('src/components/DashboardView.tsx', code);
