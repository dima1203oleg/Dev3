const fs = require('fs');
let content = fs.readFileSync('src/components/MediaForensicsTab.tsx', 'utf8');

content = content.replace(/      \{\/\* Analysis Preview Modal \*\/\}/, '      </div>\n    </div>\n\n      {/* Analysis Preview Modal */}');

fs.writeFileSync('src/components/MediaForensicsTab.tsx', content);
