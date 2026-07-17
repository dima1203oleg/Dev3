const fs = require('fs');
let content = fs.readFileSync('src/components/DashboardView.tsx', 'utf-8');

content = content.replace(
  /<ReferenceArea x1=\{refAreaLeft\} x2=\{refAreaRight\} strokeOpacity=\{0\.3\} fill="#818cf8" fillOpacity=\{0\.2\} \/>/,
  '<ReferenceArea x1={refAreaLeft} x2={refAreaRight} fill="#818cf8" fillOpacity={0.2} />'
);

fs.writeFileSync('src/components/DashboardView.tsx', content);
