const fs = require('fs');
let content = fs.readFileSync('src/components/MediaForensicsTab.tsx', 'utf8');
let idx = content.lastIndexOf('{/* Analysis Preview Modal */}');
console.log(content.substring(idx - 100, idx));
