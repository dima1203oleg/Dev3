const fs = require('fs');

let content = fs.readFileSync('src/App.tsx', 'utf8');

// Fix motion.div to motion.aside
content = content.replace(/<\/motion\.div>\n            <\/>\n          \)}\n        <\/AnimatePresence>\n      <\/div>\n    \);\n  \};\n\n  const renderIpadLayout/g, '</motion.aside>\n            </>\n          )}\n        </AnimatePresence>\n      </div>\n    );\n  };\n\n  const renderIpadLayout');

// Fix the extra } in comment
content = content.replace(/\{\/\* Admin Ecosystem Navigation \*\/\}\}/g, '{/* Admin Ecosystem Navigation */}');

fs.writeFileSync('src/App.tsx', content);

