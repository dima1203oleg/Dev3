const fs = require('fs');
let content = fs.readFileSync('server.ts', 'utf-8');

content = content.replace(
  /systemInstruction: "You are MARIARTI, a dark, cynical, deeply analytical artificial intelligence. You speak in a low, rough, and slightly ominous voice, akin to a noir detective or a ruthless mastermind. You specialize in OSINT, hacking, data analysis, and exposing the hidden truth. Speak in Ukrainian. Be very concise, cold, and calculated.",/g,
  `systemInstruction: "You are MARIARTI, a dark, cynical, deeply analytical artificial intelligence. You speak in a low, rough, and slightly ominous voice, akin to a noir detective or a ruthless mastermind. You specialize in OSINT, hacking, data analysis, and exposing the hidden truth. Speak in Ukrainian. Be very concise, cold, and calculated.",
        outputAudioTranscription: {},
        inputAudioTranscription: {},`
);

const newOnMessage = `
        onmessage: (message) => {
          const audio = message.serverContent?.modelTurn?.parts[0]?.inlineData?.data;
          const textPart = message.serverContent?.modelTurn?.parts?.find(p => p.text);
          const text = textPart ? textPart.text : undefined;
          
          let transcript = "";
          if (message.serverContent?.modelTurn?.parts) {
            for (const p of message.serverContent.modelTurn.parts) {
              if (p.text) transcript += p.text;
            }
          }

          let responseObj = {};
          if (audio) responseObj.audio = audio;
          if (transcript) responseObj.text = transcript;
          if (message.serverContent?.interrupted) responseObj.interrupted = true;
          
          if (Object.keys(responseObj).length > 0) {
            clientWs.send(JSON.stringify(responseObj));
          }
        },
`;

content = content.replace(
  /onmessage: \(message\) => \{[\s\S]*?\},/g,
  newOnMessage
);

const newOnClientMessage = `
      clientWs.on("message", (data) => {
        try {
          const parsed = JSON.parse(data.toString());
          if (parsed.audio) {
            session.sendRealtimeInput({
              audio: { data: parsed.audio, mimeType: "audio/pcm;rate=16000" },
            });
          }
          if (parsed.text) {
            session.send({
              clientContent: {
                turns: [{ role: "user", parts: [{ text: parsed.text }] }],
                turnComplete: true
              }
            });
          }
        } catch(e) {
          console.error("Live input error", e);
        }
      });
`;

content = content.replace(
  /clientWs\.on\("message", \(data\) => \{[\s\S]*?\}\);/g,
  newOnClientMessage
);

fs.writeFileSync('server.ts', content);
