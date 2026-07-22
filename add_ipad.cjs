const fs = require('fs');

let content = fs.readFileSync('src/App.tsx', 'utf8');

// Change min-h-screen to h-full in renderDesktopLayout
content = content.replace(
  /className="min-h-screen bg-transparent text-slate-100 flex flex-col font-sans selection:bg-blue-500\/30 selection:text-indigo-200"/,
  'className="h-full bg-transparent text-slate-100 flex flex-col font-sans selection:bg-blue-500/30 selection:text-indigo-200"'
);

// We need an iPad layout
const ipadLayout = `
  const renderIpadLayout = () => {
    if (isRealMobile) {
      return renderMobileMainContent();
    }
    const isRealTablet = window.innerWidth >= 768 && window.innerWidth < 1024;
    if (isRealTablet) {
      return (
        <div className="h-screen w-full bg-[#030712] overflow-hidden">
          {renderDesktopLayout()}
        </div>
      );
    }
    
    return (
      <div
        className="min-h-screen w-full bg-[#030712] text-slate-100 flex flex-col items-center justify-center p-4 relative overflow-hidden select-none"
        id="ipad-simulator-view"
      >
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(59,130,246,0.15)_0%,transparent_100%)] pointer-events-none" />
        
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="relative w-[1024px] h-[768px] bg-slate-900 rounded-[32px] p-4 shadow-[0_0_80px_rgba(0,0,0,0.8)] border border-slate-700/50 flex flex-col transform origin-center scale-[0.85] 2xl:scale-100"
        >
          {/* Hardware bezel details */}
          <div className="absolute top-1/2 -left-0.5 w-1 h-12 bg-slate-700 rounded-l-md -translate-y-1/2"></div>
          <div className="absolute top-1/2 -right-0.5 w-1 h-12 bg-slate-700 rounded-r-md -translate-y-1/2"></div>
          <div className="absolute top-4 left-1/2 -translate-x-1/2 w-2 h-2 rounded-full bg-black border border-slate-700/50 flex items-center justify-center">
             <div className="w-1 h-1 rounded-full bg-blue-900/40" />
          </div>
          
          <div className="flex-1 rounded-[20px] overflow-hidden bg-[#00040A] flex flex-col relative border border-black shadow-inner">
             {renderDesktopLayout()}
          </div>
        </motion.div>
      </div>
    );
  };
`;

content = content.replace(
  /const renderIphoneLayout = \(\) => \{/,
  ipadLayout + '\n  const renderIphoneLayout = () => {'
);

fs.writeFileSync('src/App.tsx', content);
