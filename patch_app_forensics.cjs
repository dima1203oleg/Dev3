const fs = require('fs');
let content = fs.readFileSync('src/App.tsx', 'utf-8');

// 1. Import MediaForensicsTab
content = content.replace(
  "import { ArchitectureTab } from './components/ArchitectureTab';",
  "import { ArchitectureTab } from './components/ArchitectureTab';\nimport { MediaForensicsTab } from './components/MediaForensicsTab';"
);

// 2. Add to TabType
content = content.replace(
  "type TabType = 'dashboard' | 'volumes' | 'osint' | 'maps' | 'advisor' | 'admin' | 'gap' | 'architecture' | 'license';",
  "type TabType = 'dashboard' | 'volumes' | 'osint' | 'maps' | 'advisor' | 'admin' | 'gap' | 'architecture' | 'license' | 'forensics';"
);

// 3. Add to Navigation UI
const forensicsNav = `
          <button
            onClick={() => setActiveTab('forensics')}
            className={\`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-300 \${
              activeTab === 'forensics' 
                ? 'bg-gradient-to-r from-fuchsia-600/20 to-transparent border-l-2 border-fuchsia-500 text-white' 
                : 'text-slate-400 hover:bg-slate-900 hover:text-slate-200 border-l-2 border-transparent'
            }\`}
          >
            <Camera className={\`w-5 h-5 \${activeTab === 'forensics' ? 'text-fuchsia-400' : ''}\`} />
            <span className="font-medium">Media Forensics</span>
          </button>
`;
content = content.replace(
  /<button[\s\S]*?onClick=\{\(\) => setActiveTab\('maps'\)\}[\s\S]*?<\/button>/,
  "$&" + forensicsNav
);

// Import Camera if not imported
if(!content.includes('Camera,')) {
    content = content.replace("Activity,", "Activity, Camera,");
}

// 4. Add render switch
const renderForensics = `
      case 'forensics':
        return <MediaForensicsTab />;`;

content = content.replace(
  /case 'maps':\s*return <MapsTab \/>;/,
  "$&" + renderForensics
);

fs.writeFileSync('src/App.tsx', content);
