const fs = require('fs');
let content = fs.readFileSync('src/App.tsx', 'utf8');
content = content.replace(/,\s*,\s*Tablet/g, ', Tablet');
content = content.replace(/\n\s*,\s*Tablet/g, ',\n  Tablet');
fs.writeFileSync('src/App.tsx', content);
