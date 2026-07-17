const fs = require('fs');
let content = fs.readFileSync('src/App.tsx', 'utf-8');

// Also need to import AuthStatus
if (!content.includes("import { AuthStatus } from './components/AuthStatus';")) {
  content = content.replace(
    "import { LiveChatBot } from './components/LiveChatBot';",
    "import { LiveChatBot } from './components/LiveChatBot';\nimport { AuthStatus } from './components/AuthStatus';"
  );
}

const oldProfile = `{/* Profile Avatars */}
            <div className="flex items-center gap-2.5 pl-2 border-l border-slate-900">
              <div className="w-8 h-8 rounded-lg bg-indigo-950 border border-indigo-900 flex items-center justify-center font-bold text-indigo-400 font-mono">
                UA
              </div>
              <div className="hidden xl:block text-left text-[10px] leading-tight">
                <p className="font-bold text-slate-200">Черговий : АН</p>
                <p className="text-slate-500 font-mono">ID: 02894-A</p>
              </div>
            </div>`;

content = content.replace(oldProfile, `{/* Profile Avatars / Auth Status */}
            <div className="flex items-center gap-2.5 pl-2 border-l border-slate-900">
              <AuthStatus />
            </div>`);

fs.writeFileSync('src/App.tsx', content);
