
import React, { useState, useRef } from 'react';
import { 
  ImageIcon, 
  Video, 
  Info, 
  ArrowUp, 
  Ratio, 
  Diamond, 
  Layers,
  History,
  LayoutGrid
} from 'lucide-react';
import { AIModel, AspectRatio, ImageSize } from '../types';

interface PromptPanelProps {
  onGenerate: (prompt: string, model: AIModel, ratio: AspectRatio, size: ImageSize, count: number, image?: string) => void;
  onOpenHistory: () => void;
  loading: boolean;
}

export const PromptPanel: React.FC<PromptPanelProps> = ({ onGenerate, onOpenHistory, loading }) => {
  const [prompt, setPrompt] = useState('');
  const [selectedModel, setSelectedModel] = useState<AIModel>(AIModel.PRO);
  const [selectedRatio, setSelectedRatio] = useState<AspectRatio>(AspectRatio.SQUARE);
  const [selectedSize, setSelectedSize] = useState<ImageSize>('1K');
  const [imageCount, setImageCount] = useState<number>(1);
  const [uploadedImage, setUploadedImage] = useState<string | null>(null);
  
  const [activeMenu, setActiveMenu] = useState<'model' | 'ratio' | 'size' | 'count' | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleGenerate = () => {
    if (!prompt.trim() || loading) return;
    onGenerate(prompt, selectedModel, selectedRatio, selectedSize, imageCount, uploadedImage || undefined);
    setActiveMenu(null);
  };

  const toggleMenu = (menu: 'model' | 'ratio' | 'size' | 'count') => {
    setActiveMenu(activeMenu === menu ? null : menu);
  };

  return (
    <div className="fixed bottom-10 left-1/2 -translate-x-1/2 w-full max-w-5xl px-6 z-[200]">
      <div className="relative">
        {activeMenu && (
          <div className="absolute bottom-full mb-4 left-0 w-full flex justify-center animate-in fade-in slide-in-from-bottom-2">
            <div className="glass-engine rounded-2xl p-2 flex gap-2 border border-white/10 shadow-2xl">
              {activeMenu === 'model' && (
                <>
                  <button onClick={() => { setSelectedModel(AIModel.PRO); setActiveMenu(null); }} className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${selectedModel === AIModel.PRO ? 'bg-white text-black' : 'text-white/60 hover:bg-white/5'}`}>Nano Banana Pro</button>
                  <button onClick={() => { setSelectedModel(AIModel.FLASH); setActiveMenu(null); }} className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${selectedModel === AIModel.FLASH ? 'bg-white text-black' : 'text-white/60 hover:bg-white/5'}`}>Nano Banana Flash</button>
                </>
              )}
              {activeMenu === 'ratio' && (
                Object.values(AspectRatio).map(r => (
                  <button key={r} onClick={() => { setSelectedRatio(r); setActiveMenu(null); }} className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${selectedRatio === r ? 'bg-white text-black' : 'text-white/60 hover:bg-white/5'}`}>{r}</button>
                ))
              )}
              {activeMenu === 'size' && (
                (['1K', '2K', '4K'] as ImageSize[]).map(s => (
                  <button key={s} onClick={() => { setSelectedSize(s); setActiveMenu(null); }} className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${selectedSize === s ? 'bg-white text-black' : 'text-white/60 hover:bg-white/5'}`}>{s}</button>
                ))
              )}
              {activeMenu === 'count' && (
                ([1, 2, 4]).map(c => (
                  <button key={c} onClick={() => { setImageCount(c); setActiveMenu(null); }} className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${imageCount === c ? 'bg-white text-black' : 'text-white/60 hover:bg-white/5'}`}>{c} {c > 1 ? 'Images' : 'Image'}</button>
                ))
              )}
            </div>
          </div>
        )}

        <div className="glass-engine rounded-[40px] p-8 shadow-2xl relative">
          <div className="flex gap-8">
            <div className="flex flex-col gap-4 pt-2">
              <button 
                onClick={onOpenHistory}
                className="w-12 h-12 flex items-center justify-center rounded-2xl glass-pill text-white/40 hover:text-white transition-all"
              >
                <History size={22} />
              </button>
              <button className="w-12 h-12 flex items-center justify-center rounded-2xl glass-pill text-white transition-all ring-1 ring-white/10">
                <ImageIcon size={22} />
              </button>
            </div>

            <div className="flex-1 space-y-6">
              <div className="relative">
                <textarea
                  value={prompt}
                  onChange={(e) => setPrompt(e.target.value)}
                  placeholder="A cinematic fox in a cyberpunk city, 8k, golden accents..."
                  className="w-full bg-transparent border-none outline-none text-2xl font-medium text-white/90 placeholder-white/10 py-2 resize-none h-24 custom-scrollbar"
                />
                <button onClick={() => fileInputRef.current?.click()} className={`absolute top-0 right-0 w-12 h-12 glass-pill rounded-xl flex items-center justify-center transition-all ${uploadedImage ? 'text-emerald-400 border-emerald-500/50 ring-1 ring-emerald-500/50' : 'text-white/40'}`}>
                  <Layers size={20} />
                  <input ref={fileInputRef} type="file" hidden accept="image/*" onChange={(e) => {
                    const file = e.target.files?.[0];
                    if (file) {
                      const reader = new FileReader();
                      reader.onloadend = () => setUploadedImage(reader.result as string);
                      reader.readAsDataURL(file);
                    }
                  }} />
                </button>
              </div>

              <div className="flex items-center justify-between pt-2">
                <div className="flex items-center gap-3">
                  <button onClick={() => toggleMenu('model')} className="flex items-center gap-2 px-4 py-2.5 glass-pill rounded-full text-xs font-bold text-white">
                    <div className="w-4 h-4 rounded-full bg-white/10 flex items-center justify-center text-[10px]">G</div>
                    <span>{selectedModel === AIModel.PRO ? 'Nano Banana Pro' : 'Nano Banana Flash'}</span>
                  </button>

                  <button onClick={() => toggleMenu('ratio')} className="flex items-center gap-2 px-4 py-2.5 glass-pill rounded-full text-xs font-bold text-white">
                    <Ratio size={14} className="text-white/40" />
                    <span>{selectedRatio}</span>
                  </button>

                  <button onClick={() => toggleMenu('size')} className="flex items-center gap-2 px-4 py-2.5 glass-pill rounded-full text-xs font-bold text-white">
                    <Diamond size={14} className="text-white/40" />
                    <span>{selectedSize}</span>
                  </button>

                  <button onClick={() => toggleMenu('count')} className="flex items-center gap-2 px-4 py-2.5 glass-pill rounded-full text-xs font-bold text-white">
                    <LayoutGrid size={14} className="text-white/40" />
                    <span>{imageCount} {imageCount > 1 ? 'Images' : 'Image'}</span>
                  </button>
                </div>

                <button
                  onClick={handleGenerate}
                  disabled={loading || !prompt.trim()}
                  className="w-14 h-14 bg-white text-black rounded-2xl flex items-center justify-center hover:bg-[#FFD700] transition-all active:scale-95 disabled:opacity-20 shadow-xl"
                >
                  {loading ? <div className="w-6 h-6 border-2 border-black border-t-transparent animate-spin rounded-full" /> : <ArrowUp size={28} strokeWidth={3} />}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
