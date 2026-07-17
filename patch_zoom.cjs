const fs = require('fs');
let content = fs.readFileSync('src/components/DashboardView.tsx', 'utf-8');

// 1. Add ReferenceArea to recharts imports
content = content.replace(
  "import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';",
  "import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, ReferenceArea } from 'recharts';"
);

// 2. Add zoom states and computed data
const zoomStatesAndComputed = `
  const [refAreaLeft, setRefAreaLeft] = React.useState<string | null>(null);
  const [refAreaRight, setRefAreaRight] = React.useState<string | null>(null);
  const [zoomIndices, setZoomIndices] = React.useState<[number, number] | null>(null);

  const currentChartData = zoomIndices ? chartData.slice(zoomIndices[0], zoomIndices[1] + 1) : chartData;

  const zoom = () => {
    if (refAreaLeft === refAreaRight || !refAreaLeft || !refAreaRight) {
      setRefAreaLeft(null);
      setRefAreaRight(null);
      return;
    }

    let leftIndex = chartData.findIndex(d => d.date === refAreaLeft);
    let rightIndex = chartData.findIndex(d => d.date === refAreaRight);

    if (leftIndex > rightIndex) {
      [leftIndex, rightIndex] = [rightIndex, leftIndex];
    }

    setZoomIndices([leftIndex, rightIndex]);
    setRefAreaLeft(null);
    setRefAreaRight(null);
  };

  const zoomOut = () => {
    setZoomIndices(null);
    setRefAreaLeft(null);
    setRefAreaRight(null);
  };
`;

content = content.replace(
  "  const [isChartUpdating, setIsChartUpdating] = React.useState(false);",
  "  const [isChartUpdating, setIsChartUpdating] = React.useState(false);\n" + zoomStatesAndComputed
);

// 3. Add Zoom Out button
const zoomOutButton = `              </div>
              <div className="flex items-center gap-2">
                {zoomIndices && (
                  <button 
                    onClick={zoomOut}
                    className="flex items-center gap-1.5 px-2.5 py-1.5 bg-indigo-500/10 hover:bg-indigo-500/20 text-indigo-400 rounded-lg text-[10px] font-mono font-bold uppercase tracking-wider border border-indigo-500/20 transition-colors"
                  >
                    <span>Zoom Out</span>
                  </button>
                )}
                <button 
                  onClick={downloadChartCSV}`;

content = content.replace(
  /              <\/div>\n              <button \n                onClick=\{downloadChartCSV\}/,
  zoomOutButton
);

content = content.replace(
  /<span>Download CSV<\/span>\n              <\/button>\n            <\/div>/,
  `<span>Download CSV</span>
                </button>
              </div>
            </div>`
);


// 4. Update AreaChart definition
const areaChartReplacement = `<AreaChart 
                  data={currentChartData} 
                  margin={{ top: 10, right: 10, left: -20, bottom: 0 }}
                  onMouseDown={(e: any) => e && setRefAreaLeft(e.activeLabel)}
                  onMouseMove={(e: any) => refAreaLeft && e && setRefAreaRight(e.activeLabel)}
                  onMouseUp={zoom}
                >`;

content = content.replace(
  /<AreaChart data=\{chartData\} margin=\{\{ top: 10, right: 10, left: -20, bottom: 0 \}\}>/,
  areaChartReplacement
);

// 5. Add ReferenceArea inside AreaChart
const referenceArea = `
                  <Area type="monotone" dataKey="critical" name="Критичні ризики" stroke="#f43f5e" strokeWidth={2} fillOpacity={1} fill="url(#colorCritical)" />
                  {refAreaLeft && refAreaRight ? (
                    <ReferenceArea x1={refAreaLeft} x2={refAreaRight} strokeOpacity={0.3} fill="#818cf8" fillOpacity={0.2} />
                  ) : null}
                </AreaChart>`;

content = content.replace(
  /<Area type="monotone" dataKey="critical" name="Критичні ризики" stroke="#f43f5e" strokeWidth=\{2\} fillOpacity=\{1\} fill="url\(#colorCritical\)" \/>\s*<\/AreaChart>/,
  referenceArea
);

fs.writeFileSync('src/components/DashboardView.tsx', content);
console.log("Patched zoom logic");
