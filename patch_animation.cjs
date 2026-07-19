const fs = require('fs');
let content = fs.readFileSync('src/components/InspectorPanel.tsx', 'utf8');

if (!content.includes('AnimatePresence')) {
  content = content.replace(/import \{ motion \} from 'motion\/react';/, "import { motion, AnimatePresence } from 'motion/react';");
}

const keyExpression = "selectedEntity?.id || selectedTool?.id || selectedNode?.id || 'empty'";

const replacement = `      {/* Content wrapper with scroll */}
      <div className="flex-1 overflow-y-auto overflow-x-hidden">
        <AnimatePresence mode="wait">
          <motion.div
            key={${keyExpression}}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.2, ease: 'easeOut' }}
            className="p-5 space-y-6"
          >
            {!hasSelection ? (`;

content = content.replace(/\{\/\* Content wrapper with scroll \*\/\}\s*<div className="flex-1 overflow-y-auto p-5 space-y-6">\s*\{!hasSelection \? \(/, replacement);

const parts = content.split('          </div>\n        )}\n      </div>\n    </div>\n  );\n}\n');
if (parts.length === 2) {
  content = parts[0] + `          </div>\n        )}\n          </motion.div>\n        </AnimatePresence>\n      </div>\n    </div>\n  );\n}\n`;
} else {
  // alternative
  content = content.replace(/          <\/div>\s*\)\}\s*<\/div>\s*<\/div>\s*\);\s*\}\s*$/, `          </div>\n        )}\n          </motion.div>\n        </AnimatePresence>\n      </div>\n    </div>\n  );\n}\n`);
}

fs.writeFileSync('src/components/InspectorPanel.tsx', content);
