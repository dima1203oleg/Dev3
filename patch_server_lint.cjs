const fs = require('fs');
let content = fs.readFileSync('server.ts', 'utf-8');

content = content.replace("let responseObj = {};", "let responseObj: any = {};");
content = content.replace(
  `session.send({
              clientContent: {
                turns: [{ role: "user", parts: [{ text: parsed.text }] }],
                turnComplete: true
              }
            });`,
  `session.sendRealtimeInput({ text: parsed.text });`
);

fs.writeFileSync('server.ts', content);
