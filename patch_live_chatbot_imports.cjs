const fs = require('fs');
let content = fs.readFileSync('src/components/LiveChatBot.tsx', 'utf-8');

if (!content.includes('Volume2')) {
  content = content.replace(
    "import { Mic, MicOff, AlertCircle, Send, X, MessageSquare, Bot } from 'lucide-react';",
    "import { Mic, MicOff, AlertCircle, Send, X, MessageSquare, Bot, Volume2, VolumeX } from 'lucide-react';"
  );
}

fs.writeFileSync('src/components/LiveChatBot.tsx', content);
