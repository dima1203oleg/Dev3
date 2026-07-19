const fs = require('fs');

let appContent = fs.readFileSync('src/App.tsx', 'utf8');
appContent = appContent.replace(/import MediaForensicsTab from '\.\/components\/MediaForensicsTab';/, "import { MediaForensicsTab } from './components/MediaForensicsTab';");
fs.writeFileSync('src/App.tsx', appContent);
