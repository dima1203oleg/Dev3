const fs = require('fs');
let code = fs.readFileSync('src/components/OsintWorkbench.tsx', 'utf8');
const idStr = 'id="osint-interactive-map-widget"';
const start = code.indexOf(idStr);
const subCode = code.substring(start - 100, start + 8000);
console.log(subCode.substring(0, 500));
console.log("-------------------");
console.log(subCode.substring(subCode.length - 500));
