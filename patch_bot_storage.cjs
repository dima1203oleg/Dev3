const fs = require('fs');
let content = fs.readFileSync('src/components/LiveChatBot.tsx', 'utf-8');

content = content.replace(
  "const [messages, setMessages] = useState<ChatMessage[]>([]);",
  `const [messages, setMessages] = useState<ChatMessage[]>(() => {
    try {
      const saved = localStorage.getItem('mariarti_chat_history');
      if (saved) return JSON.parse(saved);
    } catch (e) {
      console.error('Failed to load chat history', e);
    }
    return [];
  });

  useEffect(() => {
    localStorage.setItem('mariarti_chat_history', JSON.stringify(messages));
  }, [messages]);`
);

fs.writeFileSync('src/components/LiveChatBot.tsx', content);
