const fs = require('fs');
let content = fs.readFileSync('src/App.tsx', 'utf-8');

content = content.replace("import { VoiceCall } from './components/VoiceCall';", "import { LiveChatBot } from './components/LiveChatBot';");
content = content.replace("<VoiceCall />", "<LiveChatBot />");

fs.writeFileSync('src/App.tsx', content);
