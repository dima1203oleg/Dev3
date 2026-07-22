const fs = require('fs');

let content = fs.readFileSync('src/index.css', 'utf8');

// Replace body background
content = content.replace(
  /body \{[\s\S]*?\}/,
  `body {
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-rendering: optimizeLegibility;
  background-color: #050505;
  color: #f3f4f6;
  font-family: var(--font-sans);
  background-image: 
    radial-gradient(circle at top center, rgba(30, 41, 59, 0.3) 0%, transparent 60%),
    radial-gradient(circle at bottom center, rgba(15, 23, 42, 0.4) 0%, transparent 80%);
  background-attachment: fixed;
}`
);

// Replace glass panels
content = content.replace(
  /\.glass-panel-premium \{[\s\S]*?\}/,
  `.glass-panel-premium {
  background: rgba(15, 15, 15, 0.6);
  backdrop-filter: blur(24px);
  -webkit-backdrop-filter: blur(24px);
  border: 1px solid rgba(255, 255, 255, 0.08);
  border-top: 1px solid rgba(255, 255, 255, 0.12);
  box-shadow: 0 10px 40px -10px rgba(0, 0, 0, 0.5);
  border-radius: 1rem;
}`
);

content = content.replace(
  /\.glass-panel \{[\s\S]*?\}/,
  `.glass-panel {
  background: rgba(20, 20, 20, 0.5);
  backdrop-filter: blur(16px);
  -webkit-backdrop-filter: blur(16px);
  border: 1px solid rgba(255, 255, 255, 0.05);
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.3);
  border-radius: 0.75rem;
}`
);

// Soften glows
content = content.replace(
  /\.border-glow \{[\s\S]*?\}/,
  `.border-glow {
  box-shadow: 0 0 15px -3px rgba(255, 255, 255, 0.1);
}`
);

// Tone down specific color glows
content = content.replace(
  /\.glow-premium \{[\s\S]*?\}/,
  `.glow-premium {
  box-shadow: 0 0 20px -5px rgba(255, 255, 255, 0.05);
}`
);

fs.writeFileSync('src/index.css', content);
