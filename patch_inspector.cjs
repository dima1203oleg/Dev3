const fs = require('fs');
let content = fs.readFileSync('src/components/InspectorPanel.tsx', 'utf8');

// Ensure OSINT_ENTITIES is imported
if (!content.includes('OSINT_ENTITIES')) {
  content = content.replace(/import \{ OsintEntity \} from '\.\.\/osintData';/, "import { OsintEntity, OSINT_ENTITIES } from '../osintData';");
}

fs.writeFileSync('src/components/InspectorPanel.tsx', content);
