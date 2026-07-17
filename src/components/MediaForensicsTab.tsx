import React, { useState, useRef } from 'react';
import { Camera, FileAudio, FileVideo, Search, Map, Sparkles, UploadCloud, AlertTriangle, Play, FileText, Image as ImageIcon, Video, Bot, Scan, CheckCircle2, XCircle, Loader2 } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface QueuedFile {
  id: string;
  file: File;
  previewUrl: string;
  status: 'queued' | 'scanning' | 'analyzing' | 'done' | 'error';
  progress: number;
  boxes?: any[];
  resultText?: string;
  error?: string;
}

export function MediaForensicsTab() {
  const [activeMode, setActiveMode] = useState<'analysis' | 'generation' | 'grounding'>('analysis');
  const [prompt, setPrompt] = useState('');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<any>(null);
  
  // Vision & Queue processing states
  const [fileQueue, setFileQueue] = useState<QueuedFile[]>([]);
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const addFilesToQueue = (files: FileList | File[]) => {
    const newFiles = Array.from(files).map(file => {
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
    });
    setFileQueue(prev => [...prev, ...newFiles]);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      addFilesToQueue(e.target.files);
    }
    // reset value so the same file can be selected again
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      addFilesToQueue(e.dataTransfer.files);
    }
  };

  const fileToBase64 = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve((reader.result as string).split(',')[1]);
      reader.onerror = error => reject(error);
    });
  };

  const simulateClientVision = async (qFile: QueuedFile) => {
    updateFileInQueue(qFile.id, { status: 'scanning', progress: 10 });
    // Simulate processing time
    await new Promise(r => setTimeout(r, 1500));
    
    // Generate some mock bounding boxes
    const boxes = [
      { id: 1, x: 25, y: 30, w: 20, h: 25, label: "FACE MATCH 98%" },
      { id: 2, x: 60, y: 15, w: 15, h: 10, label: "TEXT: 'KYIV'" },
      { id: 3, x: 10, y: 70, w: 40, h: 20, label: "VEHICLE (MILITARY)" }
    ];
    updateFileInQueue(qFile.id, { boxes, progress: 30 });
  };

  const updateFileInQueue = (id: string, updates: Partial<QueuedFile>) => {
    setFileQueue(prev => prev.map(f => f.id === id ? { ...f, ...updates } : f));
  };

  const removeFile = (id: string) => {
    setFileQueue(prev => prev.filter(f => f.id !== id));
  };

  const handleRunTask = async () => {
    if (activeMode !== 'analysis') {
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
      return;
    }
    
    // Process queue for analysis
    const queuedToProcess = fileQueue.filter(f => f.status === 'queued' || f.status === 'error');
    if (queuedToProcess.length === 0) return;
    
    setLoading(true);
    
    // Processing files sequentially
    for (const qFile of queuedToProcess) {
      if (qFile.file.type.startsWith('image/')) {
        await simulateClientVision(qFile);
      }
      
      updateFileInQueue(qFile.id, { status: 'analyzing', progress: 50 });
      
      try {
        let imageBase64;
        if (qFile.file.type.startsWith('image/')) {
           imageBase64 = await fileToBase64(qFile.file);
        }
        
        const res = await fetch('/api/media-forensics', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ 
            mode: 'analysis', 
            prompt: prompt,
            image: imageBase64,
            config: {}
          })
        });
        
        const data = await res.json();
        if (!res.ok) throw new Error(data.error || 'Failed to process');
        
        updateFileInQueue(qFile.id, { 
          status: 'done', 
          progress: 100,
          resultText: data.text
        });
      } catch (err: any) {
        updateFileInQueue(qFile.id, { 
          status: 'error', 
          progress: 100,
          error: err.message
        });
      }
    }
    setLoading(false);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-slate-900/60 border border-indigo-500/10 rounded-xl p-6 backdrop-blur-md flex items-center justify-between">
        <div>
          <h2 className="text-xl font-semibold text-slate-100 flex items-center gap-2 mb-2">
            <Camera className="w-5 h-5 text-fuchsia-400" />
            Media Forensics & AI Synthesis
          </h2>
          <p className="text-slate-400 text-sm leading-relaxed max-w-3xl">
            Центр аналізу медіа-даних та генеративного інтелекту. Дозволяє транскрибувати аудіо, аналізувати відео-матеріали на наявність deepfake, генерувати реконструкції подій (Veo 3, Imagen 3) та перевіряти дані через Google Search & Maps Grounding.
          </p>
        </div>
        <div className="hidden lg:flex items-center gap-3">
          <div className="bg-slate-950/40 backdrop-blur-md shadow-[0_4px_30px_rgba(0,0,0,0.5)] border border-indigo-500/10 px-3 py-1.5 rounded-lg flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-emerald-400" />
            <span className="text-[10px] font-mono text-slate-300">Veo 3.1 Fast</span>
          </div>
          <div className="bg-slate-950/40 backdrop-blur-md shadow-[0_4px_30px_rgba(0,0,0,0.5)] border border-indigo-500/10 px-3 py-1.5 rounded-lg flex items-center gap-2">
            <Search className="w-4 h-4 text-blue-400" />
            <span className="text-[10px] font-mono text-slate-300">Grounding</span>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex space-x-2 border-b border-indigo-500/10">
        <button
          onClick={() => { setActiveMode('analysis'); setResult(null); }}
          className={`px-4 py-3 text-sm font-medium transition-colors border-b-2 flex items-center gap-2 ${
            activeMode === 'analysis' ? 'border-fuchsia-500 text-fuchsia-400' : 'border-transparent text-slate-400 hover:text-slate-300'
          }`}
        >
          <FileAudio className="w-4 h-4" />
          Аналіз Медіа (Video/Audio/Image)
        </button>
        <button
          onClick={() => { setActiveMode('generation'); setResult(null); }}
          className={`px-4 py-3 text-sm font-medium transition-colors border-b-2 flex items-center gap-2 ${
            activeMode === 'generation' ? 'border-fuchsia-500 text-fuchsia-400' : 'border-transparent text-slate-400 hover:text-slate-300'
          }`}
        >
          <ImageIcon className="w-4 h-4" />
          Реконструкція (Генерація)
        </button>
        <button
          onClick={() => { setActiveMode('grounding'); setResult(null); }}
          className={`px-4 py-3 text-sm font-medium transition-colors border-b-2 flex items-center gap-2 ${
            activeMode === 'grounding' ? 'border-fuchsia-500 text-fuchsia-400' : 'border-transparent text-slate-400 hover:text-slate-300'
          }`}
        >
          <Map className="w-4 h-4" />
          Google Search & Maps Grounding
        </button>
      </div>

      {/* Main Content Area */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Control Panel */}
        <div className="lg:col-span-1 space-y-4">
          <div className="bg-slate-900/60 border border-indigo-500/10 rounded-xl p-5">
            <h3 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-4">Параметри завдання</h3>
            
            {activeMode === 'analysis' && (
              <div className="space-y-4">
                <input 
                  type="file" 
                  ref={fileInputRef} 
                  onChange={handleFileChange} 
                  accept="image/*,video/*,audio/*" 
                  multiple
                  className="hidden" 
                />
                <div 
                  onClick={() => fileInputRef.current?.click()}
                  onDragOver={handleDragOver}
                  onDragLeave={handleDragLeave}
                  onDrop={handleDrop}
                  className={`border-2 border-dashed rounded-xl p-6 flex flex-col items-center justify-center text-center transition-colors cursor-pointer ${isDragging ? 'border-fuchsia-500 bg-fuchsia-500/10' : 'border-indigo-500/10 bg-slate-950/50 hover:border-slate-700'}`}
                >
                  <UploadCloud className={`w-8 h-8 mb-2 ${isDragging ? 'text-fuchsia-400' : 'text-slate-500'}`} />
                  <span className="text-sm font-medium text-slate-300">
                    Перетягніть файли сюди або натисніть
                  </span>
                  <span className="text-xs text-slate-500 mt-1">Кілька файлів підтримуються. MP4, MP3, WAV, JPG, PNG</span>
                </div>
                <div>
                  <label className="block text-xs text-slate-500 mb-1.5">Тип аналізу</label>
                  <select className="w-full bg-slate-950/40 backdrop-blur-md shadow-[0_4px_30px_rgba(0,0,0,0.5)] border border-indigo-500/10 rounded-lg px-3 py-2 text-sm text-slate-300 focus:outline-none focus:border-fuchsia-500">
                    <option>Комплексний аналіз (Gemini 3.1 Pro)</option>
                    <option>Транскрибація аудіо (Gemini 3.5 Flash)</option>
                    <option>Глибокий роздум (High Thinking)</option>
                  </select>
                </div>
              </div>
            )}
            {activeMode === 'generation' && (
              <div className="space-y-4">
                <div>
                  <label className="block text-xs text-slate-500 mb-1.5">Тип генерації</label>
                  <select className="w-full bg-slate-950/40 backdrop-blur-md shadow-[0_4px_30px_rgba(0,0,0,0.5)] border border-indigo-500/10 rounded-lg px-3 py-2 text-sm text-slate-300 focus:outline-none focus:border-fuchsia-500">
                    <option>Зображення (Imagen 3 Pro)</option>
                    <option>Відео (Veo 3.1 Fast)</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs text-slate-500 mb-1.5">Співвідношення сторін</label>
                  <select className="w-full bg-slate-950/40 backdrop-blur-md shadow-[0_4px_30px_rgba(0,0,0,0.5)] border border-indigo-500/10 rounded-lg px-3 py-2 text-sm text-slate-300 focus:outline-none focus:border-fuchsia-500">
                    <option>16:9 (Landscape)</option>
                    <option>9:16 (Portrait)</option>
                    <option>1:1 (Square)</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs text-slate-500 mb-1.5">Базове зображення (опціонально)</label>
                  <div className="border border-dashed border-indigo-500/10 rounded-lg p-3 flex items-center justify-center cursor-pointer hover:border-slate-700 bg-slate-950/50">
                    <span className="text-xs text-slate-400 flex items-center gap-2"><ImageIcon className="w-4 h-4"/> Додати референс</span>
                  </div>
                </div>
              </div>
            )}
            {activeMode === 'grounding' && (
              <div className="space-y-4">
                <div>
                  <label className="block text-xs text-slate-500 mb-1.5">Джерело Grounding</label>
                  <select className="w-full bg-slate-950/40 backdrop-blur-md shadow-[0_4px_30px_rgba(0,0,0,0.5)] border border-indigo-500/10 rounded-lg px-3 py-2 text-sm text-slate-300 focus:outline-none focus:border-fuchsia-500">
                    <option>Google Search (Останні новини)</option>
                    <option>Google Maps (Геодані та відгуки)</option>
                    <option>Search + Maps (Комбіновано)</option>
                  </select>
                </div>
                <div className="bg-blue-500/10 border border-blue-500/20 rounded-lg p-3 flex items-start gap-2">
                  <AlertTriangle className="w-4 h-4 text-blue-400 shrink-0 mt-0.5" />
                  <p className="text-[10px] text-blue-200/80 leading-relaxed">
                    Grounding підключає Gemini 3.5 Flash до реальних сервісів Google для забезпечення максимальної достовірності даних без галюцинацій.
                  </p>
                </div>
              </div>
            )}
            <div className="mt-5 pt-5 border-t border-indigo-500/10">
              <label className="block text-xs text-slate-500 mb-1.5">Запит / Інструкція (Prompt)</label>
              <textarea
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                rows={4}
                className="w-full bg-slate-950/40 backdrop-blur-md shadow-[0_4px_30px_rgba(0,0,0,0.5)] border border-indigo-500/10 rounded-lg px-3 py-2 text-sm text-slate-300 focus:outline-none focus:border-fuchsia-500 resize-none"
                placeholder={activeMode === 'analysis' ? "Що саме шукати в цих медіа?" : "Опишіть, що потрібно згенерувати..."}
              />
            </div>
            <button
              onClick={handleRunTask}
              disabled={loading || (activeMode === 'analysis' && fileQueue.length === 0)}
              className="w-full mt-4 bg-fuchsia-600 hover:bg-fuchsia-500 disabled:opacity-50 disabled:cursor-not-allowed text-white font-medium py-2.5 rounded-lg transition-all flex items-center justify-center gap-2 shadow-[0_0_15px_rgba(217,70,239,0.2)]"
            >
              {loading ? (
                <span className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              ) : (
                <>
                  <Play className="w-4 h-4" />
                  Виконати
                </>
              )}
            </button>
          </div>
        </div>

        {/* Right Output Area */}
        <div className="lg:col-span-2">
          <div className="bg-slate-950/40 backdrop-blur-md shadow-[0_4px_30px_rgba(0,0,0,0.5)] border border-indigo-500/10 rounded-xl h-[600px] overflow-hidden flex flex-col relative">
            <div className="px-4 py-3 bg-slate-900/60 border-b border-indigo-500/10 flex items-center justify-between z-10 relative">
              <span className="text-xs font-bold text-slate-300 uppercase tracking-wider flex items-center gap-2">
                <FileText className="w-4 h-4 text-slate-500" />
                {activeMode === 'analysis' ? 'Черга файлів & Результати' : 'Результат обробки'}
              </span>
              {loading && activeMode !== 'analysis' && (
                <span className="text-[10px] text-fuchsia-400 font-mono animate-pulse flex items-center gap-1">
                  <div className="w-1.5 h-1.5 rounded-full bg-fuchsia-400"></div> PROCESSING...
                </span>
              )}
            </div>
            
            <div className="flex-1 overflow-y-auto relative p-6">
              
              {/* State for Generation / Grounding mode */}
              {activeMode !== 'analysis' && (
                <>
                  {!result && !loading && (
                    <div className="h-full flex flex-col items-center justify-center text-slate-500 opacity-50">
                      <Bot className="w-16 h-16 mb-4 text-slate-600" />
                      <p className="text-sm">Очікування завдання...</p>
                    </div>
                  )}
                  {loading && (
                    <div className="h-full flex flex-col items-center justify-center space-y-6">
                      <div className="relative">
                        <div className="absolute inset-0 border border-fuchsia-500/30 rounded-full animate-ping"></div>
                        <div className="w-16 h-16 rounded-full border border-fuchsia-500/50 flex items-center justify-center bg-fuchsia-500/5">
                          <Sparkles className="w-6 h-6 text-fuchsia-400 animate-pulse" />
                        </div>
                      </div>
                      <div className="space-y-2 text-center">
                        <p className="text-sm font-mono text-fuchsia-400">Ініціалізація нейромережі...</p>
                        <p className="text-xs text-slate-500">Виділення тензорних ядер для обробки {activeMode}</p>
                      </div>
                    </div>
                  )}
                  <AnimatePresence>
                    {result && !loading && (
                      <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="space-y-4"
                      >
                        {result.image && (
                          <div className="rounded-xl overflow-hidden border border-indigo-500/10 bg-black flex items-center justify-center">
                             <img src={`data:image/jpeg;base64,${result.image}`} alt="Generated" className="max-h-[400px] object-contain w-full" />
                          </div>
                        )}
                        
                        <div className="bg-slate-900/50 border border-indigo-500/10 p-4 rounded-xl">
                          <p className="text-sm text-slate-300 leading-relaxed font-mono whitespace-pre-wrap">
                            {result.text}
                          </p>
                        </div>
                        {activeMode === 'generation' && !result.image && (
                          <div className="aspect-video bg-black border border-indigo-500/10 rounded-xl flex items-center justify-center overflow-hidden relative group">
                             <div className="absolute inset-0 bg-gradient-to-t from-slate-900 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-4">
                               <span className="text-xs text-white font-mono bg-black/50 px-2 py-1 rounded">Generated by Veo 3.1</span>
                             </div>
                             <Video className="w-12 h-12 text-slate-700" />
                          </div>
                        )}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </>
              )}

              {/* State for Analysis Mode with Drag and Drop Queue */}
              {activeMode === 'analysis' && (
                <div className="space-y-6">
                  {fileQueue.length === 0 && !loading && (
                    <div className="h-full flex flex-col items-center justify-center text-slate-500 opacity-50 py-20">
                      <Bot className="w-16 h-16 mb-4 text-slate-600" />
                      <p className="text-sm">Черга файлів порожня. Завантажте медіа для аналізу.</p>
                    </div>
                  )}
                  
                  <AnimatePresence>
                    {fileQueue.map((qFile) => (
                      <motion.div 
                        key={qFile.id}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.95 }}
                        className="bg-slate-900/50 backdrop-blur-md shadow-[0_4px_30px_rgba(0,0,0,0.3)] border border-indigo-500/10 rounded-xl overflow-hidden"
                      >
                        {/* Status bar */}
                        <div className="bg-slate-950/40 backdrop-blur-md shadow-[0_4px_30px_rgba(0,0,0,0.5)] px-4 py-2 border-b border-indigo-500/10 flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <span className="text-xs font-mono text-slate-300 truncate max-w-[200px]" title={qFile.file.name}>{qFile.file.name}</span>
                            {qFile.status === 'queued' && <span className="px-2 py-0.5 rounded bg-slate-800 text-slate-400 text-[10px]">В черзі</span>}
                            {qFile.status === 'scanning' && <span className="px-2 py-0.5 rounded bg-fuchsia-500/20 text-fuchsia-400 text-[10px] flex items-center gap-1"><Scan className="w-3 h-3 animate-spin-slow" /> Сканування зором...</span>}
                            {qFile.status === 'analyzing' && <span className="px-2 py-0.5 rounded bg-blue-500/20 text-blue-400 text-[10px] flex items-center gap-1"><Loader2 className="w-3 h-3 animate-spin" /> Аналіз Gemini...</span>}
                            {qFile.status === 'done' && <span className="px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-400 text-[10px] flex items-center gap-1"><CheckCircle2 className="w-3 h-3" /> Готово</span>}
                            {qFile.status === 'error' && <span className="px-2 py-0.5 rounded bg-red-500/20 text-red-400 text-[10px] flex items-center gap-1"><XCircle className="w-3 h-3" /> Помилка</span>}
                          </div>
                          
                          <button 
                            onClick={() => removeFile(qFile.id)}
                            disabled={qFile.status === 'scanning' || qFile.status === 'analyzing'}
                            className="text-slate-500 hover:text-red-400 disabled:opacity-30 disabled:hover:text-slate-500 transition-colors"
                          >
                            <XCircle className="w-4 h-4" />
                          </button>
                        </div>
                        
                        {/* Progress bar */}
                        {(qFile.status === 'scanning' || qFile.status === 'analyzing' || qFile.status === 'done') && (
                          <div className="h-1 w-full bg-slate-950/40 backdrop-blur-md shadow-[0_4px_30px_rgba(0,0,0,0.5)]">
                            <motion.div 
                              className={`h-full ${qFile.status === 'done' ? 'bg-emerald-500' : 'bg-fuchsia-500'}`}
                              initial={{ width: 0 }}
                              animate={{ width: `${qFile.progress}%` }}
                              transition={{ duration: 0.3 }}
                            />
                          </div>
                        )}
                        
                        <div className="p-4 grid grid-cols-1 md:grid-cols-2 gap-4">
                          {/* Left: Preview */}
                          <div className="relative rounded-lg overflow-hidden border border-indigo-500/10 bg-black flex items-center justify-center min-h-[200px]">
                            {qFile.previewUrl ? (
                              <img src={qFile.previewUrl} alt={qFile.file.name} className="max-h-[300px] object-contain w-full" />
                            ) : (
                              <div className="flex flex-col items-center text-slate-600">
                                <FileAudio className="w-12 h-12 mb-2" />
                                <span className="text-xs">Preview Not Available</span>
                              </div>
                            )}
                            
                            {/* Scanning Animation */}
                            {qFile.status === 'scanning' && (
                              <div className="absolute inset-0 pointer-events-none">
                                <div className="absolute inset-0 bg-fuchsia-500/10 mix-blend-overlay"></div>
                                <motion.div 
                                  initial={{ y: "0%" }}
                                  animate={{ y: "100%" }}
                                  transition={{ repeat: Infinity, duration: 1.5, ease: "linear" }}
                                  className="absolute top-0 left-0 right-0 h-1 bg-fuchsia-500 shadow-[0_0_15px_rgba(217,70,239,0.8)]"
                                />
                              </div>
                            )}

                            {/* Bounding Boxes */}
                            <AnimatePresence>
                              {qFile.boxes?.map((box) => (
                                <motion.div
                                  key={box.id}
                                  initial={{ opacity: 0, scale: 0.9 }}
                                  animate={{ opacity: 1, scale: 1 }}
                                  className="absolute border-2 border-red-500 bg-red-500/10 pointer-events-none"
                                  style={{
                                    left: `${box.x}%`,
                                    top: `${box.y}%`,
                                    width: `${box.w}%`,
                                    height: `${box.h}%`
                                  }}
                                >
                                  <div className="absolute -top-6 left-[-2px] bg-red-500 text-white text-[9px] font-bold font-mono px-1.5 py-0.5 whitespace-nowrap">
                                    {box.label}
                                  </div>
                                  {/* Target reticles */}
                                  <div className="absolute top-0 left-0 w-2 h-2 border-t-2 border-l-2 border-red-400"></div>
                                  <div className="absolute top-0 right-0 w-2 h-2 border-t-2 border-r-2 border-red-400"></div>
                                  <div className="absolute bottom-0 left-0 w-2 h-2 border-b-2 border-l-2 border-red-400"></div>
                                  <div className="absolute bottom-0 right-0 w-2 h-2 border-b-2 border-r-2 border-red-400"></div>
                                </motion.div>
                              ))}
                            </AnimatePresence>
                          </div>
                          
                          {/* Right: Results or Status */}
                          <div className="flex flex-col">
                            {qFile.resultText ? (
                              <div className="bg-slate-950/40 backdrop-blur-md shadow-[0_4px_30px_rgba(0,0,0,0.5)] border border-indigo-500/10 rounded-lg p-3 flex-1 overflow-y-auto max-h-[300px]">
                                <p className="text-[11px] text-slate-300 font-mono whitespace-pre-wrap leading-relaxed">
                                  {qFile.resultText}
                                </p>
                              </div>
                            ) : qFile.error ? (
                              <div className="bg-red-500/10 border border-red-500/20 rounded-lg p-3 flex items-start gap-2 text-red-400">
                                <AlertTriangle className="w-4 h-4 shrink-0" />
                                <p className="text-xs">{qFile.error}</p>
                              </div>
                            ) : (
                              <div className="bg-slate-950/40 backdrop-blur-md shadow-[0_4px_30px_rgba(0,0,0,0.5)] border border-indigo-500/10 rounded-lg p-3 flex-1 flex items-center justify-center border-dashed">
                                <span className="text-xs text-slate-500 font-mono">
                                  {qFile.status === 'queued' && 'Готовий до аналізу...'}
                                  {qFile.status === 'scanning' && 'Зчитування образів...'}
                                  {qFile.status === 'analyzing' && 'Генерація висновків...'}
                                </span>
                              </div>
                            )}
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </AnimatePresence>
                </div>
              )}

            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
