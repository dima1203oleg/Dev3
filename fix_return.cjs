const fs = require('fs');
let content = fs.readFileSync('src/components/MediaForensicsTab.tsx', 'utf8');

content = content.replace(/return \(\s*<div className="space-y-6">/, 'return (\n    <>\n      <div className="space-y-6">');
content = content.replace(/      <\/AnimatePresence>\n    <\/div>\n  \);\n\}/, '      </AnimatePresence>\n    </>\n  );\n}');

fs.writeFileSync('src/components/MediaForensicsTab.tsx', content);
