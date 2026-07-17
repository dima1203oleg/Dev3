const fs = require('fs');

// 1. Update MediaForensicsTab.tsx
let ui = fs.readFileSync('src/components/MediaForensicsTab.tsx', 'utf-8');

ui = ui.replace(
  `body: JSON.stringify({ 
          mode: activeMode, 
          prompt: prompt,
          config: {`,
  `body: JSON.stringify({ 
          mode: activeMode, 
          prompt: prompt,
          image: activeMode === 'analysis' && previewImage ? previewImage.split(',')[1] : undefined,
          config: {`
);

fs.writeFileSync('src/components/MediaForensicsTab.tsx', ui);

// 2. Update server.ts
let server = fs.readFileSync('server.ts', 'utf-8');

const oldAnalysis = `if (mode === 'analysis') {
      const response = await ai.models.generateContent({
        model: "gemini-3.1-pro-preview",
        contents: prompt || "Analyze this media",
        config: {
          systemInstruction: "You are an expert digital forensics AI. Analyze media for anomalies, deepfakes, and extract critical intelligence. Speak in Ukrainian.",
          thinkingConfig: { thinkingLevel: ThinkingLevel.HIGH }
        }
      });`;

const newAnalysis = `if (mode === 'analysis') {
      const { image } = req.body;
      const contents = [];
      if (image) {
        contents.push({
          inlineData: {
            data: image,
            mimeType: "image/jpeg"
          }
        });
      }
      contents.push(prompt || "Analyze this media in detail. Describe any objects, text, or faces found. Identify any anomalies.");
      
      const response = await ai.models.generateContent({
        model: "gemini-3.1-pro-preview",
        contents: contents,
        config: {
          systemInstruction: "You are an expert digital forensics AI. Analyze media for anomalies, deepfakes, and extract critical intelligence. Speak in Ukrainian.",
          thinkingConfig: { thinkingLevel: ThinkingLevel.HIGH }
        }
      });`;

server = server.replace(oldAnalysis, newAnalysis);

fs.writeFileSync('server.ts', server);

