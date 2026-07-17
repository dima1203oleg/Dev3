const fs = require('fs');
let content = fs.readFileSync('src/components/OsintWorkbench.tsx', 'utf-8');
content = content.replace(/<\/AnimatePresence><\/AnimatePresence>/g, '</AnimatePresence>');
fs.writeFileSync('src/components/OsintWorkbench.tsx', content);
