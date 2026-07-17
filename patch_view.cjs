const fs = require('fs');
let content = fs.readFileSync('src/components/DashboardView.tsx', 'utf-8');

content = content.replace(
  "className={`h-[220px] w-full transition-all duration-700 ${isChartUpdating ? 'opacity-50 blur-[2px] scale-[0.98]' : 'opacity-100 blur-0 scale-100'}`}",
  "className={`h-[220px] w-full ${isChartUpdating ? 'animate-data-pulse' : ''}`}"
);

fs.writeFileSync('src/components/DashboardView.tsx', content);
