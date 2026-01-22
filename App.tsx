
import React, { useState, useEffect, useCallback } from 'react';
import { Header } from './components/Header';
import { Gallery } from './components/Gallery';
import { PromptPanel } from './components/PromptPanel';
import { HistoryPanel } from './components/HistoryPanel';
import { GeneratedImage, AIModel, AspectRatio, ImageSize, GenerationGroup } from './types';
import { generateAIImage } from './services/gemini';
import { X, Sparkles } from 'lucide-react';

const App: React.FC = () => {
  const [history, setHistory] = useState<GenerationGroup[]>([]);
  const [currentViewImages, setCurrentViewImages] = useState<GeneratedImage[]>([]);
  const [loading, setLoading] = useState(false);
  const [loadingCount, setLoadingCount] = useState(0);
  const [error, setError] = useState<string | null>(null);
  const [isHistoryOpen, setIsHistoryOpen] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem('foxbox_full_history');
    if (saved) {
      try { 
        const parsed = JSON.parse(saved);
        setHistory(parsed);
        if (parsed.length > 0) {
          setCurrentViewImages(parsed[0].images);
        }
      } catch (e) { console.error(e); }
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('foxbox_full_history', JSON.stringify(history));
  }, [history]);

  const handleGenerate = useCallback(async (prompt: string, model: AIModel, ratio: AspectRatio, size: ImageSize, count: number, base64?: string) => {
    setLoading(true);
    setLoadingCount(count);
    setError(null);
    window.scrollTo({ top: 0, behavior: 'smooth' });

    try {
      const urls = await generateAIImage({
        prompt,
        model,
        aspectRatio: ratio,
        imageSize: size,
        base64Image: base64,
        imageCount: count
      });

      const newImages: GeneratedImage[] = urls.map(url => ({
        id: Math.random().toString(36).substring(7),
        url,
        prompt,
        model,
        aspectRatio: ratio,
        size: size,
        timestamp: Date.now()
      }));

      const newGroup: GenerationGroup = {
        id: Math.random().toString(36).substring(7),
        prompt,
        images: newImages,
        timestamp: Date.now()
      };

      setHistory(prev => [newGroup, ...prev]);
      setCurrentViewImages(newImages);

    } catch (err: any) {
      setError(err.message || "The Puter platform encountered an issue.");
    } finally {
      setLoading(false);
      setLoadingCount(0);
    }
  }, []);

  const handleDeleteHistory = (id: string) => {
    setHistory(prev => prev.filter(h => h.id !== id));
  };

  const handleSelectHistory = (group: GenerationGroup) => {
    setCurrentViewImages(group.images);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleDownload = (image: GeneratedImage) => {
    const link = document.createElement('a');
    link.href = image.url;
    link.download = `foxbox-${image.id}.png`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="min-h-screen bg-[#050505] selection:bg-[#FFD700] selection:text-black">
      <Header />

      <main className="max-w-[1920px] mx-auto min-h-screen relative z-10">
        {error && (
          <div className="fixed top-32 left-1/2 -translate-x-1/2 z-[300] glass-engine px-6 py-4 rounded-3xl flex items-center gap-4 animate-in fade-in slide-in-from-top-6 border-red-500/20 shadow-2xl">
            <div className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
            <p className="text-xs font-bold text-red-400">{error}</p>
            <button onClick={() => setError(null)} className="text-white/20 hover:text-white transition-colors"><X size={16} /></button>
          </div>
        )}

        <Gallery 
          images={currentViewImages} 
          loading={loading}
          loadingCount={loadingCount}
          onDownload={handleDownload}
          onRedo={(p) => handleGenerate(p, AIModel.PRO, AspectRatio.SQUARE, '1K', 1)}
        />
      </main>

      <PromptPanel 
        onGenerate={handleGenerate} 
        onOpenHistory={() => setIsHistoryOpen(true)}
        loading={loading} 
      />

      <HistoryPanel 
        isOpen={isHistoryOpen}
        onClose={() => setIsHistoryOpen(false)}
        history={history}
        onSelect={handleSelectHistory}
        onDelete={handleDeleteHistory}
      />

      {/* Cinematic Loading Overlay */}
      {loading && (
        <div className="fixed inset-0 z-[600] bg-black/80 backdrop-blur-xl flex flex-col items-center justify-center animate-in fade-in duration-1000">
           <div className="relative mb-8">
              <div className="w-24 h-24 border-b-2 border-[#FFD700] rounded-full animate-spin duration-[2000ms]" />
              <Sparkles className="absolute inset-0 m-auto text-[#FFD700] animate-pulse" size={32} />
           </div>
           <h3 className="text-2xl font-serif text-white mb-2 tracking-widest uppercase">Nano Banana Pro</h3>
           <p className="text-white/30 text-[10px] font-black tracking-[0.4em] uppercase">Orchestrating Pixels</p>
        </div>
      )}

      {/* Ambient Visuals */}
      <div className="fixed top-0 left-0 w-full h-full pointer-events-none z-0">
        <div className="absolute top-[-20%] left-[-10%] w-[70%] h-[70%] bg-emerald-500/[0.03] blur-[180px] rounded-full"></div>
        <div className="absolute bottom-[-20%] right-[-10%] w-[70%] h-[70%] bg-[#FFD700]/[0.03] blur-[180px] rounded-full"></div>
        <div className="absolute inset-0 opacity-[0.02] bg-[url('https://www.transparenttextures.com/patterns/asfalt-light.png')]"></div>
      </div>
    </div>
  );
};

export default App;
