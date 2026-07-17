const fs = require('fs');
let content = fs.readFileSync('src/components/LiveChatBot.tsx', 'utf-8');

if (!content.includes('const gainNodeRef = useRef<GainNode | null>(null);')) {
  content = content.replace(
    "const outputAudioCtxRef = useRef<AudioContext | null>(null);",
    "const outputAudioCtxRef = useRef<AudioContext | null>(null);\n  const gainNodeRef = useRef<GainNode | null>(null);"
  );
}

content = content.replace(
  `        if (!analyserRef.current) {
            // First time setup
            const analyser = outputAudioCtx.createAnalyser();
            analyser.fftSize = 64;
            analyserRef.current = analyser;
            
            // Connect analyser to destination
            analyser.connect(outputAudioCtx.destination);
        }
        
        // If muted, we just skip connecting the source? Then visualizer is flat.
        // Or we just don't play audio if muted. The easiest way to keep visualizer active but no audio is to disconnect analyser from destination, but then it never plays.
        // Let's just set the volume of the source using a gain node, if muted, visualizer is flat (this is fine, if it's muted you don't hear it and visualizer being flat is acceptable).
        // Wait, the prompt says "activates during TTS playback to indicate that Jarvis is 'speaking'". If TTS is muted, maybe it doesn't need to show.
        // But let's be technically correct. source -> analyser. analyser -> gain -> destination.
        // Let's just use a ref for gainNode.
        `,
  `        if (!analyserRef.current) {
            // First time setup
            const analyser = outputAudioCtx.createAnalyser();
            analyser.fftSize = 64;
            analyserRef.current = analyser;
            
            const gainNode = outputAudioCtx.createGain();
            gainNodeRef.current = gainNode;
            
            // source -> analyser -> gain -> destination
            analyser.connect(gainNode);
            gainNode.connect(outputAudioCtx.destination);
        }
        
        if (gainNodeRef.current) {
            gainNodeRef.current.gain.value = isTTSMutedRef.current ? 0 : 1;
        }
        
        sourceNode.connect(analyserRef.current);`
);

fs.writeFileSync('src/components/LiveChatBot.tsx', content);
