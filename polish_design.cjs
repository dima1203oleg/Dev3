const fs = require('fs');

let cssContent = fs.readFileSync('src/index.css', 'utf8');

// Enhance the background pattern
if (!cssContent.includes('linear-gradient(rgba(255, 255, 255, 0.02)')) {
  cssContent = cssContent.replace(
    /background-color: #020617;/,
    `background-color: #020617;
    background-image: 
      radial-gradient(circle at top center, rgba(59, 130, 246, 0.1) 0%, transparent 80%),
      linear-gradient(rgba(255, 255, 255, 0.02) 1px, transparent 1px),
      linear-gradient(90deg, rgba(255, 255, 255, 0.02) 1px, transparent 1px);
    background-size: 100% 100%, 30px 30px, 30px 30px;
    background-attachment: fixed;`
  );
}

fs.writeFileSync('src/index.css', cssContent);

let appContent = fs.readFileSync('src/App.tsx', 'utf8');

// Make header nicer
appContent = appContent.replace(/bg-slate-900\/90 backdrop-blur-md/g, 'bg-[#020617]/70 backdrop-blur-xl border-b border-white/5');

// Main workspace container
appContent = appContent.replace(/bg-slate-950\/40 backdrop-blur-md shadow-\[0_4px_40px_rgba\(30,58,138,0\.15\)\]/g, 'bg-[#020617]/40 backdrop-blur-2xl shadow-2xl shadow-black/50');

// Make sidebar sleeker
appContent = appContent.replace(/bg-slate-950 border-r/g, 'bg-[#020617]/80 backdrop-blur-xl border-r');

fs.writeFileSync('src/App.tsx', appContent);

