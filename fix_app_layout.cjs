const fs = require('fs');
let content = fs.readFileSync('src/App.tsx', 'utf8');

// For desktop
const desktopMainStart = `<main
            className="flex-1 overflow-y-auto p-6 space-y-6 bg-[#030712]/40 backdrop-blur-md shadow-[0_4px_30px_rgba(0,0,0,0.5)] relative"
            id="workspace-main"
          >`;

const newDesktopMainStart = `<main
            className="flex-1 overflow-y-auto p-6 bg-[#030712]/40 backdrop-blur-md shadow-[0_4px_30px_rgba(0,0,0,0.5)] relative"
            id="workspace-main"
          >
          <div className="max-w-[1800px] mx-auto space-y-6">`;

const desktopMainEnd = `            </AnimatePresence>
          </main>`;

const newDesktopMainEnd = `            </AnimatePresence>
          </div>
          </main>`;

// Safely do the replace for desktop
if (content.includes(desktopMainStart) && content.includes(desktopMainEnd)) {
    content = content.replace(desktopMainStart, newDesktopMainStart);
    content = content.replace(desktopMainEnd, newDesktopMainEnd);
}

// For mobile, maybe we don't need max-w-7xl, it's mobile anyway.
// Let's write the file.
fs.writeFileSync('src/App.tsx', content);
