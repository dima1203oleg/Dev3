const fs = require('fs');

let content = fs.readFileSync('src/App.tsx', 'utf8');

// Add the routing for media-forensics
const replacement = `{activeTab === 'media-forensics' && 'Аналіз Медіа (Forensics)'}`;
content = content.replace(/{activeTab === 'advisor' && 'ШІ-Архітектор'}/, `{activeTab === 'advisor' && 'ШІ-Архітектор'}\n                {activeTab === 'media-forensics' && 'Аналіз Медіа (Forensics)'}`);

const routingReplacement = `{activeTab === 'advisor' && <AdvisorTab />}\n                {activeTab === 'media-forensics' && <MediaForensicsTab />}`;
content = content.replace(/{activeTab === 'advisor' && <AdvisorTab \/>}/, routingReplacement);

fs.writeFileSync('src/App.tsx', content);

