const fs = require('fs');
let content = fs.readFileSync('src/components/VoiceCall.tsx', 'utf-8');

content = content.replace(
  "const wsUrl = \\`\\$\\{wsProtocol\\}//\\$\\{window.location.host\\}/live\\`;",
  "const wsUrl = `${wsProtocol}//${window.location.host}/live`;"
);

fs.writeFileSync('src/components/VoiceCall.tsx', content);
