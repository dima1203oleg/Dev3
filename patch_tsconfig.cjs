const fs = require('fs');
let content = fs.readFileSync('tsconfig.json', 'utf-8');
content = content.replace(
  '"allowImportingTsExtensions": true,',
  '"allowImportingTsExtensions": true,\n    "resolveJsonModule": true,'
);
fs.writeFileSync('tsconfig.json', content);
