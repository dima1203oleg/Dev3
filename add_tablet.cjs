const fs = require('fs');

let content = fs.readFileSync('src/App.tsx', 'utf8');

content = content.replace(
  /const \[deviceMode, setDeviceMode\] = useState<"desktop" \| "iphone">/,
  'const [deviceMode, setDeviceMode] = useState<"desktop" | "ipad" | "iphone">'
);

content = content.replace(
  /const isMobileSize = window\.innerWidth < 768;[\s\S]*?handleResize\(\);/,
  `const isMobileSize = window.innerWidth < 768;
      const isTabletSize = window.innerWidth >= 768 && window.innerWidth < 1024;
      setIsRealMobile(isMobileSize);
      if (isMobileSize) {
        setDeviceMode("iphone");
        setIsInspectorOpen(false);
        setSidebarCollapsed(true);
      } else if (isTabletSize) {
        setDeviceMode("ipad");
        setSidebarCollapsed(true);
      } else {
        setDeviceMode("desktop");
      }
    };
    handleResize();`
);

content = content.replace(
  /\{deviceMode === "iphone" \? renderIphoneLayout\(\) : renderDesktopLayout\(\)\}/,
  `{deviceMode === "iphone" ? renderIphoneLayout() : deviceMode === "ipad" ? renderIpadLayout() : renderDesktopLayout()}`
);

// We need to add the iPad button to the header
content = content.replace(
  /<button[\s\S]*?onClick=\{\(\) => setDeviceMode\("iphone"\)\}[\s\S]*?<\/button>/,
  match => {
    return `<button
                  onClick={() => setDeviceMode("ipad")}
                  className={\`px-2.5 py-1.5 rounded text-[10px] font-black font-mono tracking-wider transition-all flex items-center gap-1 cursor-pointer \${deviceMode === "ipad" ? "bg-black/40 backdrop-blur-md shadow-[0_4px_30px_rgba(30,58,138,0.1)] text-blue-400 border border-blue-500/15" : "text-slate-500 hover:text-slate-300"}\`}
                  title="Tablet View"
                >
                  <Tablet className="w-3.5 h-3.5" />
                  <span className="hidden xl:inline">IPAD</span>
                </button>
                ` + match;
  }
);

// We need to add `Tablet` to the lucide-react imports if it's not there
const lucideImportsMatch = content.match(/import \{([^}]+)\} from "lucide-react";/);
if (lucideImportsMatch && !lucideImportsMatch[1].includes('Tablet')) {
  const newImports = lucideImportsMatch[1] + ', Tablet';
  content = content.replace(lucideImportsMatch[0], `import {${newImports}} from "lucide-react";`);
}

fs.writeFileSync('src/App.tsx', content);
