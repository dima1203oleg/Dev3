const fs = require('fs');
let code = fs.readFileSync('src/components/OsintWorkbench.tsx', 'utf8');

const targetImport = `  MapPin, Layers, Database, Lock, Shield, ServerCrash, ExternalLink
} from 'lucide-react';`;

const replaceImport = `  MapPin, Layers, Database, Lock, Shield, ServerCrash, ExternalLink,
  Terminal, ArrowDownLeft, ArrowUpRight, Scan
} from 'lucide-react';`;

code = code.replace(targetImport, replaceImport);
fs.writeFileSync('src/components/OsintWorkbench.tsx', code);
