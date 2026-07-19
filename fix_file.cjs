const fs = require('fs');
let content = fs.readFileSync('src/components/MediaForensicsTab.tsx', 'utf8');

const lastPart = content.substring(content.lastIndexOf('{/* Analysis Preview Modal */}'));

// let's look at what's before it
let beforePart = content.substring(0, content.lastIndexOf('{/* Analysis Preview Modal */}'));

// we need to make sure the div structure is correct.
// The root div is `<div className="space-y-6">`
// Let's just fix it properly by finding the main return and wrapping with `<>...</>`
