const fs = require('fs');
let content = fs.readFileSync('src/components/MediaForensicsTab.tsx', 'utf8');

// 1. Update QueuedFile interface
content = content.replace(/interface QueuedFile \{\s*id: string;\s*file: File;/, `interface QueuedFile {
  id: string;
  fileName: string;
  fileType: string;`);

// 2. Add filesRef
content = content.replace(/const fileInputRef = useRef<HTMLInputElement>\(null\);/, `const fileInputRef = useRef<HTMLInputElement>(null);
  const filesRef = useRef<Record<string, File>>({});`);

// 3. Update addFilesToQueue
const oldAdd = `const newFiles = Array.from(files).map(file => {
      let previewUrl = '';
      if (file.type.startsWith('image/')) {
        previewUrl = URL.createObjectURL(file);
      }
      return {
        id: Math.random().toString(36).substring(2, 9),
        file,
        previewUrl,
        status: 'queued' as const,
        progress: 0,
      };
    });`;
const newAdd = `const newFiles = Array.from(files).map(file => {
      let previewUrl = '';
      if (file.type.startsWith('image/')) {
        previewUrl = URL.createObjectURL(file);
      }
      const id = Math.random().toString(36).substring(2, 9);
      filesRef.current[id] = file;
      return {
        id,
        fileName: file.name,
        fileType: file.type,
        previewUrl,
        status: 'queued' as const,
        progress: 0,
      };
    });`;
content = content.replace(oldAdd, newAdd);

// 4. Update usage of qFile.file
content = content.replace(/qFile\.file\.type/g, 'qFile.fileType');
content = content.replace(/qFile\.file\.name/g, 'qFile.fileName');
content = content.replace(/fileToBase64\(qFile\.file\)/g, 'fileToBase64(filesRef.current[qFile.id])');

// 5. Update setResult to use Object URL
const oldSetResult = `setResult({
          text: data.text,
          type: data.type || 'success',
          image: data.imageBase64
        });`;
const newSetResult = `
        let imageUrl = undefined;
        if (data.imageBase64) {
          try {
            const res = await fetch(\`data:image/jpeg;base64,\${data.imageBase64}\`);
            const blob = await res.blob();
            imageUrl = URL.createObjectURL(blob);
          } catch(e) {}
        }
        setResult({
          text: data.text,
          type: data.type || 'success',
          image: imageUrl
        });`;
content = content.replace(oldSetResult, newSetResult);

// 6. Update rendering of result.image
content = content.replace(/<img src=\{\`data:image\/jpeg;base64,\$\{result\.image\}\`\} alt="Generated" className="max-h-\[400px\] object-contain w-full" \/>/, `<img src={result.image} alt="Generated" className="max-h-[400px] object-contain w-full" />`);

fs.writeFileSync('src/components/MediaForensicsTab.tsx', content);
