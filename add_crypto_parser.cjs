const fs = require('fs');
let code = fs.readFileSync('src/components/MediaForensicsTab.tsx', 'utf8');

const targetStr = `<option value="social">Соціальна мережа</option>`;
const replaceStr = `<option value="social">Соціальна мережа</option>
                    <option value="crypto">Крипто-гаманець (AML Tracking)</option>
                    <option value="darknet">Darknet Forum (Leak Tracking)</option>`;
                    
code = code.replace(targetStr, replaceStr);

fs.writeFileSync('src/components/MediaForensicsTab.tsx', code);
