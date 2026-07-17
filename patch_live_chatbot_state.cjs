const fs = require('fs');
let content = fs.readFileSync('src/components/LiveChatBot.tsx', 'utf-8');

if (!content.includes('const [isTTSMuted, setIsTTSMuted] = useState(false);')) {
  content = content.replace(
    "const [textInput, setTextInput] = useState('');",
    "const [textInput, setTextInput] = useState('');\n  const [isTTSMuted, setIsTTSMuted] = useState(false);"
  );
}

fs.writeFileSync('src/components/LiveChatBot.tsx', content);
