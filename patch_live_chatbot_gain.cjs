const fs = require('fs');
let content = fs.readFileSync('src/components/LiveChatBot.tsx', 'utf-8');

// Replace the audio connection logic
content = content.replace(
  `        if (!analyserRef.current) {
          analyserRef.current = outputAudioCtx.createAnalyser();
          analyserRef.current.fftSize = 64;
          // Connect analyser to destination via a gain node (optional but if we want to mute while keeping visualizer)
        }
        
        const gainNode = outputAudioCtx.createGain();
        gainNode.gain.value = isTTSMutedRef.current ? 0 : 1;
        
        sourceNode.connect(analyserRef.current);
        analyserRef.current.connect(gainNode);
        gainNode.connect(outputAudioCtx.destination);
        sourceNode.connect(analyserRef.current);`,
  `        if (!analyserRef.current) {
          analyserRef.current = outputAudioCtx.createAnalyser();
          analyserRef.current.fftSize = 64;
        }
        
        // We connect source to a specific gain node for volume control, then to analyser, then to destination.
        // Wait, if it's muted, we want visualizer to still work.
        // So source -> analyser -> gain -> destination.
        // To avoid connecting analyser to multiple gain nodes, we just create a single gain node per outputAudioCtx, but we don't have a ref for it.
        // Let's just mute at the source if we don't care about visualizer when muted, OR we can attach the gainNode to the outputAudioCtxRef.
        // Actually, if we just set gainNode per source before analyser, visualizer won't work when muted.
        // To keep it simple, let's just make the volume 0 for the source if muted, visualizer will be flat. 
        // Or better: source -> gainNode -> analyser -> destination (analyser is connected to destination once).
        // Wait, if gain is 0, analyser gets 0.
        // Let's do: source -> analyser -> destination. And if muted, just don't play? The user asked to toggle TTS, they probably expect visualizer to still show the bot is speaking.
        // Let's add a gainNodeRef.
        
        if (!analyserRef.current) {
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
        `
);

fs.writeFileSync('src/components/LiveChatBot.tsx', content);
