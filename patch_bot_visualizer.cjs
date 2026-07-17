const fs = require('fs');
let content = fs.readFileSync('src/components/LiveChatBot.tsx', 'utf-8');

// 1. Add state refs
content = content.replace(
  "  const messagesEndRef = useRef<HTMLDivElement | null>(null);",
  `  const messagesEndRef = useRef<HTMLDivElement | null>(null);
  const analyserRef = useRef<AnalyserNode | null>(null);
  const [frequencies, setFrequencies] = useState<number[]>(new Array(16).fill(0));

  useEffect(() => {
    let animationFrameId: number;
    const updateFrequencies = () => {
      if (analyserRef.current) {
        const dataArray = new Uint8Array(analyserRef.current.frequencyBinCount);
        analyserRef.current.getByteFrequencyData(dataArray);
        
        const step = Math.floor(dataArray.length / 16);
        const newFreqs = [];
        for (let i = 0; i < 16; i++) {
          let sum = 0;
          for (let j = 0; j < step; j++) {
            sum += dataArray[i * step + j];
          }
          newFreqs.push(sum / step);
        }
        setFrequencies(newFreqs);
      }
      animationFrameId = requestAnimationFrame(updateFrequencies);
    };
    updateFrequencies();
    return () => cancelAnimationFrame(animationFrameId);
  }, []);`
);

// 2. Connect to analyser
content = content.replace(
  "sourceNode.connect(outputAudioCtx.destination);",
  `if (!analyserRef.current) {
          analyserRef.current = outputAudioCtx.createAnalyser();
          analyserRef.current.fftSize = 64;
          analyserRef.current.connect(outputAudioCtx.destination);
        }
        sourceNode.connect(analyserRef.current);`
);

// 3. Add UI Visualizer
const visualizerUI = `
            {/* Header */}
            <div className="px-4 py-3 bg-slate-900/60 border-b border-slate-800 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Bot className="w-5 h-5 text-indigo-400" />
                <div>
                  <h3 className="text-xs font-bold text-white uppercase tracking-wider">MARIARTI</h3>
                  <span className="text-[9px] text-emerald-400 font-mono flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span> ONLINE / VOICE + TEXT
                  </span>
                </div>
              </div>
              <button onClick={() => setIsOpen(false)} className="text-slate-400 hover:text-white transition-colors">
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Visualizer */}
            <div className="h-10 bg-slate-950/80 flex items-center justify-center gap-[3px] border-b border-indigo-500/20 shadow-[0_4px_20px_rgba(99,102,241,0.05)]">
              {frequencies.map((val, i) => {
                // Apply a simple smoothing curve so it looks more like voice
                const height = Math.max(4, (val / 255) * 24);
                const isActive = val > 5;
                return (
                  <div
                    key={i}
                    className={\`w-1.5 rounded-full transition-all duration-75 \${isActive ? 'bg-fuchsia-400 shadow-[0_0_8px_rgba(232,121,249,0.8)]' : 'bg-slate-800'}\`}
                    style={{ height: \`\${height}px\` }}
                  />
                );
              })}
            </div>
`;

content = content.replace(
  /\{\/\* Header \*\/\}[\s\S]*?<\/div>\s*<\/div>\s*\{\/\* Messages \*\/}/,
  visualizerUI + "\n            {/* Messages */}"
);

fs.writeFileSync('src/components/LiveChatBot.tsx', content);
console.log("Patched live chatbot");
