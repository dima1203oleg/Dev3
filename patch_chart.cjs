const fs = require('fs');
let content = fs.readFileSync('src/components/DashboardView.tsx', 'utf-8');

// 1. Move riskDynamicsData to state and add chart update logic
const stateInitialData = `  const initialChartData = [
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
  const [chartData, setChartData] = React.useState(initialChartData);
  const [isChartUpdating, setIsChartUpdating] = React.useState(false);
`;

content = content.replace(/const riskDynamicsData = \[[^\]]+\];\n/s, "");
content = content.replace(
  "  const [activeHoverId, setActiveHoverId] = React.useState<string | null>(null);",
  "  const [activeHoverId, setActiveHoverId] = React.useState<string | null>(null);\n" + stateInitialData
);

// 2. Modify triggerDatabaseSync to also "refresh" chart data
const newTriggerDatabaseSync = `
  const triggerDatabaseSync = () => {
    if (syncStatus === 'SYNCING') return;
    setSyncStatus('SYNCING');
    setSyncProgress(0);
    setIsChartUpdating(true); // Start pulse effect
    const interval = setInterval(() => {
      setSyncProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          setSyncStatus('DONE');
          
          // Simulate updated data
          setChartData(prevData => {
            const newData = [...prevData];
            newData[newData.length - 1] = {
              ...newData[newData.length - 1],
              operations: newData[newData.length - 1].operations + Math.floor(Math.random() * 5),
              critical: newData[newData.length - 1].critical + Math.floor(Math.random() * 2)
            };
            return newData;
          });
          
          // Stop pulse after a short delay
          setTimeout(() => setIsChartUpdating(false), 800);
          
          return 100;
        }
        return prev + 20;
      });
    }, 400);
  };
`;
content = content.replace(/  const triggerDatabaseSync = \(\) => \{.*?(?=  \/\/ Trigger immediate)/s, newTriggerDatabaseSync + "\n");

// 3. Update the AreaChart data reference and add pulse effect to its container
content = content.replace(
  `<AreaChart data={riskDynamicsData}`,
  `<AreaChart data={chartData}`
);

// We need to apply the pulse effect. Let's find the container.
content = content.replace(
  `<div className="h-[220px] w-full">`,
  `<div className={\`h-[220px] w-full transition-all duration-700 \${isChartUpdating ? 'opacity-50 blur-[2px] scale-[0.98]' : 'opacity-100 blur-0 scale-100'}\`}>`
);

fs.writeFileSync('src/components/DashboardView.tsx', content);
console.log('Successfully patched DashboardView.tsx');
