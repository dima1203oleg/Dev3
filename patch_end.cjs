const fs = require('fs');
let content = fs.readFileSync('src/components/MediaForensicsTab.tsx', 'utf8');

content = content.replace(/      <\/div>\n    <\/div>\n\n      \{\/\* Analysis Preview Modal \*\/\}/, '      {/* Analysis Preview Modal */}');

content = content.replace(/      <\/AnimatePresence>\n  \);\n\}/, '      </AnimatePresence>\n    </div>\n  );\n}');

fs.writeFileSync('src/components/MediaForensicsTab.tsx', content);
