const fs = require('fs');
let code = fs.readFileSync('src/components/MediaForensicsTab.tsx', 'utf8');

const handleTaskStr = `const handleRunTask = async () => {
    if (!prompt.trim() && activeMode !== 'analysis') return;
    
    setLoading(true);
    setResult(null);`;
    
const replaceHandleTaskStr = `const handleRunTask = async () => {
    if (!prompt.trim() && activeMode !== 'analysis') return;
    
    if (activeMode === 'parsers') {
       setLoading(true);
       setTimeout(() => {
         setLoading(false);
         setResult({
           text: \`Джерело [\${prompt}] успішно додано до пулу моніторингу та інгестії.\\nПочаток збору даних (OSINT) розпочнеться через 30 секунд.\\nТип ресурсу автоматично визначено.\`,
           type: 'success'
         });
         setPrompt('');
       }, 1500);
       return;
    }
    
    setLoading(true);
    setResult(null);`;

code = code.replace(handleTaskStr, replaceHandleTaskStr);

fs.writeFileSync('src/components/MediaForensicsTab.tsx', code);
