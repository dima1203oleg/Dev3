const fs = require('fs');
let content = fs.readFileSync('src/components/MediaForensicsTab.tsx', 'utf-8');

content = content.replace(
  `  const handleRunTask = async () => {
    setLoading(true);
    setResult(null);
    // Simulation for now, we will wire this up to the backend next
    setTimeout(() => {
      setLoading(false);
      setResult({
        text: "Аналіз успішно завершено. Виявлено цифрові аномалії на мітці 00:12:04. Геолокація підтверджена через Google Maps Grounding.",
        type: "success"
      });
    }, 2500);
  };`,
  `  const handleRunTask = async () => {
    setLoading(true);
    setResult(null);
    try {
      const res = await fetch('/api/media-forensics', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          mode: activeMode, 
          prompt: prompt,
          config: {
            type: activeMode === 'generation' ? (prompt.toLowerCase().includes('відео') ? 'video' : 'image') : undefined,
            aspectRatio: '16:9'
          }
        })
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Failed to process');
      setResult({
        text: data.text,
        type: data.type || 'success',
        image: data.imageBase64
      });
    } catch(err: any) {
      setResult({ text: "Помилка: " + err.message, type: "error" });
    } finally {
      setLoading(false);
    }
  };`
);

fs.writeFileSync('src/components/MediaForensicsTab.tsx', content);
