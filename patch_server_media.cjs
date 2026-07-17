const fs = require('fs');
let content = fs.readFileSync('server.ts', 'utf-8');

const mediaApi = `
// Media Forensics API
app.post("/api/media-forensics", async (req, res) => {
  try {
    const { mode, prompt, config } = req.body;
    
    if (!ai) {
      return res.status(500).json({ error: "Gemini API not configured" });
    }

    if (mode === 'analysis') {
      const response = await ai.models.generateContent({
        model: "gemini-3.1-pro-preview",
        contents: prompt || "Analyze this media",
        config: {
          systemInstruction: "You are an expert digital forensics AI. Analyze media for anomalies, deepfakes, and extract critical intelligence. Speak in Ukrainian.",
        }
      });
      res.json({ text: response.text });
    } else if (mode === 'grounding') {
      const response = await ai.models.generateContent({
        model: "gemini-3.5-flash",
        contents: prompt || "Verify location data",
        config: {
          tools: [{ googleSearch: {} }],
          systemInstruction: "You are an OSINT investigator. Use Google Search grounding to verify the user's query and provide concrete facts. Speak in Ukrainian.",
        }
      });
      res.json({ text: response.text });
    } else if (mode === 'generation') {
      if (config?.type === 'video') {
        // Veo generation takes a while, we return a mock success message for demo
        res.json({ text: "Генерація Veo 3.1 запущена. В реальній системі тут повертається відео-об'єкт або URL.", type: "video" });
      } else {
        const response = await ai.models.generateImages({
            model: "gemini-3-pro-image-preview",
            prompt: prompt || "A realistic photo",
            config: {
                aspectRatio: config?.aspectRatio === '16:9' ? '16:9' : '1:1',
            }
        });
        res.json({ text: "Генерація Imagen 3 Pro виконана.", type: "image", imageBase64: response.generatedImages?.[0]?.image?.imageBytes });
      }
    } else {
      res.status(400).json({ error: "Invalid mode" });
    }
  } catch (error) {
    console.error("Media API error:", error);
    res.status(500).json({ error: error.message || "Media analysis failed" });
  }
});
`;

if (!content.includes('/api/media-forensics')) {
  content = content.replace(
    /app\.use\(express\.json\(\)\);/g,
    "app.use(express.json({ limit: '50mb' }));\n" + mediaApi
  );
}

fs.writeFileSync('server.ts', content);
