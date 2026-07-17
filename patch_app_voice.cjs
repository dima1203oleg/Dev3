const fs = require('fs');
let content = fs.readFileSync('src/App.tsx', 'utf-8');

if (!content.includes('import { VoiceCall } from')) {
  content = content.replace(
    "import { motion, AnimatePresence } from 'motion/react';",
    "import { motion, AnimatePresence } from 'motion/react';\nimport { VoiceCall } from './components/VoiceCall';"
  );
}

content = content.replace(
  "      </AnimatePresence>\n    </>\n  );\n}",
  "      </AnimatePresence>\n      <VoiceCall />\n    </>\n  );\n}"
);

fs.writeFileSync('src/App.tsx', content);
