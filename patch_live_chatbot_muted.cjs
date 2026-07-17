const fs = require('fs');
let content = fs.readFileSync('src/components/LiveChatBot.tsx', 'utf-8');

// Add the ref
if (!content.includes('const isTTSMutedRef = useRef(false);')) {
  content = content.replace(
    "const [isTTSMuted, setIsTTSMuted] = useState(false);",
    "const [isTTSMuted, setIsTTSMuted] = useState(false);\n  const isTTSMutedRef = useRef(false);"
  );
}

// Add the sync
if (!content.includes('isTTSMutedRef.current = isTTSMuted;')) {
  content = content.replace(
    "useEffect(() => {",
    "useEffect(() => {\n    isTTSMutedRef.current = isTTSMuted;\n  }, [isTTSMuted]);\n\n  useEffect(() => {"
  );
}

// Add gain node connection logic to mute volume
content = content.replace(
  `        if (!analyserRef.current) {
          analyserRef.current = outputAudioCtx.createAnalyser();
          analyserRef.current.fftSize = 64;
          analyserRef.current.connect(outputAudioCtx.destination);
        }`,
  `        if (!analyserRef.current) {
          analyserRef.current = outputAudioCtx.createAnalyser();
          analyserRef.current.fftSize = 64;
          // Connect analyser to destination via a gain node (optional but if we want to mute while keeping visualizer)
        }
        
        const gainNode = outputAudioCtx.createGain();
        gainNode.gain.value = isTTSMutedRef.current ? 0 : 1;
        
        sourceNode.connect(analyserRef.current);
        analyserRef.current.connect(gainNode);
        gainNode.connect(outputAudioCtx.destination);`
);

// We need to replace only once if there was no gain node before
fs.writeFileSync('src/components/LiveChatBot.tsx', content);
