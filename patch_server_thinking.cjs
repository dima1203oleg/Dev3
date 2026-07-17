const fs = require('fs');
let content = fs.readFileSync('server.ts', 'utf-8');

if (!content.includes('ThinkingLevel')) {
  content = content.replace(
    'import { GoogleGenAI, Type } from "@google/genai";',
    'import { GoogleGenAI, Type, ThinkingLevel } from "@google/genai";'
  );
}

const oldAnalysis = `if (mode === 'analysis') {
      const response = await ai.models.generateContent({
        model: "gemini-3.1-pro-preview",
        contents: prompt || "Analyze this media",
        config: {
          systemInstruction: "You are an expert digital forensics AI. Analyze media for anomalies, deepfakes, and extract critical intelligence. Speak in Ukrainian.",
        }
      });`;

const newAnalysis = `if (mode === 'analysis') {
      const response = await ai.models.generateContent({
        model: "gemini-3.1-pro-preview",
        contents: prompt || "Analyze this media",
        config: {
          systemInstruction: "You are an expert digital forensics AI. Analyze media for anomalies, deepfakes, and extract critical intelligence. Speak in Ukrainian.",
          thinkingConfig: { thinkingLevel: ThinkingLevel.HIGH }
        }
      });`;

content = content.replace(oldAnalysis, newAnalysis);

fs.writeFileSync('server.ts', content);
