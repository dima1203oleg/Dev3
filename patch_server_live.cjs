const fs = require('fs');
let content = fs.readFileSync('server.ts', 'utf-8');

content = content.replace('import { createServer as createViteServer } from "vite";',
`import { createServer as createViteServer } from "vite";
import { createServer } from "http";
import { WebSocketServer } from "ws";
import { LiveServerMessage, Modality } from "@google/genai";
`);

// The listen part is at the end:
// if (process.env.NODE_ENV !== "production") {
//   createViteServer({ ... }).then((vite) => {
//     app.use(vite.middlewares);
//     app.listen(PORT, "0.0.0.0", () => { ... });
//   });
// } else {
//   ...
//   app.listen(PORT, "0.0.0.0", () => { ... });
// }

const wssSetup = `
function setupWss(server) {
  const wss = new WebSocketServer({ server, path: '/live' });

  wss.on("connection", async (clientWs) => {
    if (!ai) {
      clientWs.close();
      return;
    }
    try {
      const session = await ai.live.connect({
        model: "gemini-3.1-flash-live-preview",
        config: {
          responseModalities: [Modality.AUDIO],
          speechConfig: {
            voiceConfig: { prebuiltVoiceConfig: { voiceName: "Charon" } },
          },
          systemInstruction: "You are MARIARTI, a dark, cynical, deeply analytical artificial intelligence. You speak in a low, rough, and slightly ominous voice, akin to a noir detective or a ruthless mastermind. You specialize in OSINT, hacking, data analysis, and exposing the hidden truth. Speak in Ukrainian. Be very concise, cold, and calculated.",
        },
        callbacks: {
          onmessage: (message) => {
            const audio = message.serverContent?.modelTurn?.parts[0]?.inlineData?.data;
            if (audio) clientWs.send(JSON.stringify({ audio }));
            if (message.serverContent?.interrupted)
              clientWs.send(JSON.stringify({ interrupted: true }));
          },
        },
      });

      clientWs.on("message", (data) => {
        try {
          const parsed = JSON.parse(data.toString());
          if (parsed.audio) {
            session.sendRealtimeInput({
              audio: { data: parsed.audio, mimeType: "audio/pcm;rate=16000" },
            });
          }
        } catch(e) {
          console.error("Live input error", e);
        }
      });

      clientWs.on("close", () => {
        // We cannot close session directly, just let it disconnect or send end message?
        // Actually session.close() is missing or not exposed in all versions, we might just leave it to GC or close connection on client side.
      });
    } catch(err) {
      console.error("Live connect error", err);
      clientWs.close();
    }
  });
}
`;

content = content.replace(
  /\/\/ Vite middleware for development/,
  wssSetup + "\n// Vite middleware for development"
);

content = content.replace(
  /app\.listen\(PORT, "0\.0\.0\.0", \(\) => \{\n      console\.log\(`Server running on http:\/\/localhost:\$\{PORT\}`\);\n    \}\);/g,
  `const server = createServer(app);
    setupWss(server);
    server.listen(PORT, "0.0.0.0", () => {
      console.log(\`Server running on http://localhost:\$\{PORT\}\`);
    });`
);

fs.writeFileSync('server.ts', content);
