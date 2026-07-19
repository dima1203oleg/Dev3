const fs = require('fs');

let appContent = fs.readFileSync('src/App.tsx', 'utf8');

appContent = appContent.replace(/import MapsTab from '\.\/components\/MapsTab';/, "import MapsTab from './components/MapsTab';\nimport MediaForensicsTab from './components/MediaForensicsTab';");

fs.writeFileSync('src/App.tsx', appContent);
