const fs = require('fs');

let content = fs.readFileSync('src/App.tsx', 'utf8');

content = content.replace(/w-\[280px\]/g, 'w-[230px]');
content = content.replace(/w-\[340px\]/g, 'w-[300px]'); // Inspector panel
content = content.replace(/p-6/g, 'p-4');
content = content.replace(/p-5/g, 'p-3');

fs.writeFileSync('src/App.tsx', content);
