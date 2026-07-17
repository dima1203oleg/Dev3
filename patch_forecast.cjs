const fs = require('fs');
let content = fs.readFileSync('src/components/DashboardView.tsx', 'utf-8');

const forecastLogic = `
  const [showForecast, setShowForecast] = React.useState(false);

  const chartDataWithForecast = React.useMemo(() => {
    if (!showForecast) return chartData;
    
    // Simple linear regression to project next 7 days
    const n = chartData.length;
    let sumX = 0, sumYOp = 0, sumYCr = 0, sumXYOp = 0, sumXYCr = 0, sumX2 = 0;
    
    chartData.forEach((d, i) => {
      sumX += i;
      sumYOp += d.operations;
      sumYCr += d.critical;
      sumXYOp += i * d.operations;
      sumXYCr += i * d.critical;
      sumX2 += i * i;
    });

    const slopeOp = (n * sumXYOp - sumX * sumYOp) / (n * sumX2 - sumX * sumX);
    const interceptOp = (sumYOp - slopeOp * sumX) / n;
    
    const slopeCr = (n * sumXYCr - sumX * sumYCr) / (n * sumX2 - sumX * sumX);
    const interceptCr = (sumYCr - slopeCr * sumX) / n;

    const forecastData = [];
    const lastDate = chartData[chartData.length - 1].date;
    const [lastMonth, lastDay] = lastDate.split('-').map(Number);
    let currentDate = new Date(2024, lastMonth - 1, lastDay);

    // Connect the lines by adding forecast keys to the last actual point
    const enhancedChartData = [...chartData];
    enhancedChartData[enhancedChartData.length - 1] = {
      ...enhancedChartData[enhancedChartData.length - 1],
      operationsForecast: enhancedChartData[enhancedChartData.length - 1].operations,
      criticalForecast: enhancedChartData[enhancedChartData.length - 1].critical
    };

    for (let i = 1; i <= 7; i++) {
      currentDate.setDate(currentDate.getDate() + 1);
      const nextMonth = String(currentDate.getMonth() + 1).padStart(2, '0');
      const nextDay = String(currentDate.getDate()).padStart(2, '0');
      
      const projectedOp = Math.max(0, Math.round(slopeOp * (n - 1 + i) + interceptOp));
      const projectedCr = Math.max(0, Math.round(slopeCr * (n - 1 + i) + interceptCr));
      
      forecastData.push({
        date: \`\${nextMonth}-\${nextDay}\`,
        operationsForecast: projectedOp,
        criticalForecast: projectedCr,
        isForecast: true
      });
    }

    return [...enhancedChartData, ...forecastData];
  }, [chartData, showForecast]);

  const currentChartData = zoomIndices ? chartDataWithForecast.slice(zoomIndices[0], zoomIndices[1] + 1) : chartDataWithForecast;
`;

content = content.replace(
  "  const currentChartData = zoomIndices ? chartData.slice(zoomIndices[0], zoomIndices[1] + 1) : chartData;",
  forecastLogic
);

// Add Forecast button
const forecastButton = `              </div>
              <div className="flex items-center gap-2">
                <button 
                  onClick={() => setShowForecast(!showForecast)}
                  className={\`flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-[10px] font-mono font-bold uppercase tracking-wider border transition-colors \${showForecast ? 'bg-fuchsia-500/20 text-fuchsia-400 border-fuchsia-500/30' : 'bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-fuchsia-400 border-slate-700'}\`}
                >
                  <TrendingUp className="w-3.5 h-3.5" />
                  <span>Forecast</span>
                </button>
                {zoomIndices && (`;

content = content.replace(
  /              <\/div>\n              <div className="flex items-center gap-2">\n                \{zoomIndices && \(/,
  forecastButton
);

// Add Area layers for forecast
const forecastAreaLayers = `
                  <Area type="monotone" dataKey="operations" name="Загалом операцій" stroke="#818cf8" strokeWidth={2} fillOpacity={1} fill="url(#colorOperations)" />
                  <Area type="monotone" dataKey="operationsForecast" name="Прогноз операцій" stroke="#e879f9" strokeWidth={2} strokeDasharray="5 5" fillOpacity={0} />
                  
                  <Area type="monotone" dataKey="critical" name="Критичні ризики" stroke="#f43f5e" strokeWidth={2} fillOpacity={1} fill="url(#colorCritical)" />
                  <Area type="monotone" dataKey="criticalForecast" name="Прогноз ризиків" stroke="#fb7185" strokeWidth={2} strokeDasharray="5 5" fillOpacity={0} />
`;

content = content.replace(
  /<Area type="monotone" dataKey="operations" name="Загалом операцій" stroke="#818cf8" strokeWidth=\{2\} fillOpacity=\{1\} fill="url\(#colorOperations\)" \/>\s*<Area type="monotone" dataKey="critical" name="Критичні ризики" stroke="#f43f5e" strokeWidth=\{2\} fillOpacity=\{1\} fill="url\(#colorCritical\)" \/>/,
  forecastAreaLayers
);

fs.writeFileSync('src/components/DashboardView.tsx', content);
console.log("Patched forecast logic");
