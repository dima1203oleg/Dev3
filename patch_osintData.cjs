const fs = require('fs');
let content = fs.readFileSync('src/osintData.ts', 'utf-8');
content = content.replace('lastActivityDate?: string; // YYYY-MM-DD', 'lastActivityDate?: string; // YYYY-MM-DD\n  rawContext?: any;');
fs.writeFileSync('src/osintData.ts', content);
