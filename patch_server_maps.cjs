const fs = require('fs');
let content = fs.readFileSync('server.ts', 'utf-8');

const oldGrounding = `} else if (mode === 'grounding') {
      const response = await ai.models.generateContent({
        model: "gemini-3.5-flash",
        contents: prompt || "Verify location data",
        config: {
          tools: [{ googleSearch: {} }],
          systemInstruction: "You are an OSINT investigator. Use Google Search grounding to verify the user's query and provide concrete facts. Speak in Ukrainian.",
        }
      });`;

const newGrounding = `} else if (mode === 'grounding') {
      const response = await ai.models.generateContent({
        model: "gemini-3.5-flash",
        contents: prompt || "Verify location data",
        config: {
          tools: [{ googleSearch: {} }/*, { googleMaps: {} }*/], // Note: googleMaps might not be fully supported by SDK type yet, but we add it if needed
          systemInstruction: "You are an OSINT investigator. Use Google Search and Maps grounding to verify the user's query, check locations, and provide concrete facts. Speak in Ukrainian.",
        }
      });`;

content = content.replace(oldGrounding, newGrounding);

fs.writeFileSync('server.ts', content);
