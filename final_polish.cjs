const fs = require('fs');

let content = fs.readFileSync('src/App.tsx', 'utf8');

// Fix invalid tailwind classes
content = content.replace(/border-white\/10\/50/g, 'border-white/10');

// Make the background gradient a bit more premium in iPad mode
content = content.replace(/rgba\(59,130,246,0\.15\)/g, 'rgba(59,130,246,0.1)');

// Add a nice top shadow to the header for depth
content = content.replace(/border-b border-white\/5/g, 'border-b border-white/5 shadow-md shadow-black/20');

// Refine main content area paddings and background
// We have: bg-[#020617]/40 backdrop-blur-2xl shadow-2xl shadow-black/50
content = content.replace(/bg-\[#020617\]\/40 backdrop-blur-2xl shadow-2xl shadow-black\/50/g, 'bg-[#020617]/40 backdrop-blur-3xl shadow-[inset_0_1px_0_rgba(255,255,255,0.05)] shadow-2xl shadow-black/50');

// Refine some button effects
content = content.replace(/hover:bg-slate-850/g, 'hover:bg-slate-800');
content = content.replace(/hover:bg-slate-800\/40/g, 'hover:bg-white/5');

fs.writeFileSync('src/App.tsx', content);

