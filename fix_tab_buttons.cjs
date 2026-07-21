const fs = require('fs');
let code = fs.readFileSync('src/components/MediaForensicsTab.tsx', 'utf8');

const targetStr = `<button
          onClick={() => { setActiveMode('music'); setResult(null); }}
          className={\`px-4 py-3 text-sm font-medium transition-colors border-b-2 flex items-center gap-2 \${
            activeMode === 'music' ? 'border-sky-500 text-sky-400' : 'border-transparent text-slate-300 hover:text-slate-300'
          }\`}
        >
          <Music className="w-4 h-4" />
          Генерація Музики (Lyria)
        </button>`;
        
const replacementStr = `<button
          onClick={() => { setActiveMode('music'); setResult(null); }}
          className={\`px-4 py-3 text-sm font-medium transition-colors border-b-2 flex items-center gap-2 \${
            activeMode === 'music' ? 'border-sky-500 text-sky-400' : 'border-transparent text-slate-300 hover:text-slate-300'
          }\`}
        >
          <Music className="w-4 h-4" />
          Генерація Музики (Lyria)
        </button>
        <button
          onClick={() => { setActiveMode('parsers'); setResult(null); }}
          className={\`px-4 py-3 text-sm font-medium transition-colors border-b-2 flex items-center gap-2 \${
            activeMode === 'parsers' ? 'border-sky-500 text-sky-400' : 'border-transparent text-slate-300 hover:text-slate-300'
          }\`}
        >
          <Search className="w-4 h-4" />
          Джерела моніторингу
        </button>`;

code = code.replace(targetStr, replacementStr);
fs.writeFileSync('src/components/MediaForensicsTab.tsx', code);
