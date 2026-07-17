const fs = require('fs');
let content = fs.readFileSync('src/components/DashboardView.tsx', 'utf-8');

content = content.replace(
  "let leftIndex = chartData.findIndex(d => d.date === refAreaLeft);",
  "let leftIndex = chartDataWithForecast.findIndex(d => d.date === refAreaLeft);"
);

content = content.replace(
  "let rightIndex = chartData.findIndex(d => d.date === refAreaRight);",
  "let rightIndex = chartDataWithForecast.findIndex(d => d.date === refAreaRight);"
);

fs.writeFileSync('src/components/DashboardView.tsx', content);
