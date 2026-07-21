const fs = require('fs');
let code = fs.readFileSync('src/components/MediaForensicsTab.tsx', 'utf8');

// 1. Add MonitoredResource interface
if (!code.includes('interface MonitoredResource')) {
    const interfacesStr = `interface QueuedFile {`;
    const replaceInterfaces = `interface MonitoredResource {
  id: string;
  type: string;
  url: string;
  title: string;
  status: 'active' | 'syncing' | 'error';
  lastActivity: string;
  messagesAnalyzed: number;
  threatsDetected: number;
}

interface QueuedFile {`;
    code = code.replace(interfacesStr, replaceInterfaces);
}

// 2. Add default resources
if (!code.includes('const defaultMonitoredResources')) {
    const defaultLogsStr = `const generateDefaultLogs = (): AnalysisLog[] => {`;
    const replaceDefaultLogs = `const defaultMonitoredResources: MonitoredResource[] = [
  { id: '1', type: 'telegram', url: 't.me/insider_ua', title: 'Insider UA', status: 'active', lastActivity: '2 хв тому', messagesAnalyzed: 14502, threatsDetected: 12 },
  { id: '2', type: 'telegram', url: 't.me/rybar', title: 'Рыбарь', status: 'syncing', lastActivity: '15 хв тому', messagesAnalyzed: 8301, threatsDetected: 84 },
  { id: '3', type: 'news', url: 'pravda.com.ua/rss', title: 'Українська Правда', status: 'active', lastActivity: '1 год тому', messagesAnalyzed: 530, threatsDetected: 0 },
  { id: '4', type: 'crypto', url: 'bc1qxy2kgdygjrsqtzq2n0yrf2493p83kkfjhx0wlh', title: 'Binance Hot Wallet', status: 'active', lastActivity: '1 хв тому', messagesAnalyzed: 125034, threatsDetected: 3 },
];

const generateDefaultLogs = (): AnalysisLog[] => {`;
    code = code.replace(defaultLogsStr, replaceDefaultLogs);
}

// 3. Add state
const stateMarker = `const [audioFeedbackEnabled, setAudioFeedbackEnabled] = useState(false);`;
if (!code.includes('monitoredResources')) {
    const replaceState = `const [audioFeedbackEnabled, setAudioFeedbackEnabled] = useState(false);
  const [monitoredResources, setMonitoredResources] = useState<MonitoredResource[]>(defaultMonitoredResources);
  const [parserUrl, setParserUrl] = useState('');
  const [parserType, setParserType] = useState('telegram');
  
  const handleAddResource = () => {
    if (!parserUrl.trim()) return;
    const newRes: MonitoredResource = {
      id: Date.now().toString(),
      type: parserType,
      url: parserUrl,
      title: parserUrl.replace(/^https?:\\/\\//, ''),
      status: 'syncing',
      lastActivity: 'щойно',
      messagesAnalyzed: 0,
      threatsDetected: 0
    };
    setMonitoredResources([newRes, ...monitoredResources]);
    setParserUrl('');
  };`;
    code = code.replace(stateMarker, replaceState);
}

fs.writeFileSync('src/components/MediaForensicsTab.tsx', code);
