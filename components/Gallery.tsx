
import React, { useState } from 'react';
import { GeneratedImage, AIModel } from '../types';
import { Download, Maximize2, X, Copy, RefreshCw } from 'lucide-react';

interface GalleryProps {
  images: GeneratedImage[];
  loading: boolean;
  loadingCount?: number;
  onDownload: (image: GeneratedImage) => void;
  onRedo: (prompt: string) => void;
}

export const Gallery: React.FC<GalleryProps> = ({ images, loading, loadingCount = 0, onDownload, onRedo }) => {
  const [selectedImage, setSelectedImage] = useState<GeneratedImage | null>(null);

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
  };

  return (
    <div className="px-6 pt-48 pb-64">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {loading && Array.from({ length: loadingCount || 1 }).map((_, i) => (
          <div key={`skeleton-${i}`} className="aspect-square relative rounded-3xl overflow-hidden glass-engine flex flex-col items-center justify-center animate-pulse">
            <div className="shimmer absolute inset-0" />
            <div className="relative z-10 flex flex-col items-center gap-4">
              <div className="w-12 h-12 border-2 border-white/20 border-t-[#FFD700] rounded-full animate-spin" />
              <p className="text-[10px] font-black uppercase tracking-[0.2em] text-white/30">Crafting Reality...</p>
            </div>
          </div>
        ))}
        
        {images.map((image) => (
          <div 
            key={image.id} 
            className="group relative rounded-3xl overflow-hidden border border-white/5 transition-all duration-500 hover:border-white/20 hover:shadow-2xl hover:shadow-yellow-500/5 bg-[#0d0d0d]"
          >
            <img 
              src={image.url} 
              alt={image.prompt} 
              className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
              loading="lazy"
            />
            
            <div className="absolute top-4 right-4 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
               <button 
                  onClick={() => setSelectedImage(image)}
                  className="w-10 h-10 rounded-xl bg-black/40 backdrop-blur-md border border-white/10 flex items-center justify-center text-white hover:bg-[#FFD700] hover:text-black transition-all"
                >
                  <Maximize2 size={16} />
                </button>
            </div>

            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500 p-8 flex flex-col justify-end">
              <p className="text-sm font-medium text-white/90 line-clamp-3 mb-6 leading-relaxed italic">"{image.prompt}"</p>
              
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="text-[9px] font-black tracking-widest uppercase bg-white/10 text-white/60 px-2 py-1 rounded-md border border-white/5">
                    {image.model === AIModel.PRO ? 'PRO' : 'FLASH'}
                  </span>
                  <span className="text-[9px] font-black tracking-widest uppercase bg-white/10 text-white/60 px-2 py-1 rounded-md border border-white/5">
                    {image.aspectRatio}
                  </span>
                </div>
                <div className="flex gap-2">
                  <button onClick={() => onRedo(image.prompt)} className="w-9 h-9 rounded-full bg-white/5 hover:bg-white/20 text-white flex items-center justify-center transition-all"><RefreshCw size={14} /></button>
                  <button onClick={() => onDownload(image)} className="w-9 h-9 rounded-full bg-[#FFD700] text-black flex items-center justify-center transition-all hover:scale-110"><Download size={14} /></button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {images.length === 0 && !loading && (
        <div className="flex flex-col items-center justify-center min-h-[50vh] text-center max-w-xl mx-auto">
           <h2 className="text-5xl font-serif text-white mb-6 tracking-tight">Visions to life.</h2>
           <p className="text-white/40 text-sm leading-relaxed font-light">
             Welcome to the Foxbox Creative Engine. Start by entering a descriptive prompt 
             and watch the Nano Banana models weave pixels into cinematic assets.
           </p>
        </div>
      )}

      {/* Fullscreen Preview */}
      {selectedImage && (
        <div className="fixed inset-0 z-[500] flex items-center justify-center p-8 bg-black/95 animate-in fade-in zoom-in-95">
          <button onClick={() => setSelectedImage(null)} className="absolute top-8 right-8 p-3 bg-white/5 hover:bg-white/10 rounded-full transition-colors"><X size={32} /></button>
          <div className="max-w-6xl w-full h-full flex flex-col items-center justify-center gap-8">
            <img src={selectedImage.url} className="max-h-[80vh] rounded-3xl shadow-2xl border border-white/10 object-contain" alt="" />
            <div className="text-center space-y-4 max-w-2xl">
              <p className="text-lg text-white/60 italic">"{selectedImage.prompt}"</p>
              <div className="flex gap-4 justify-center">
                <button onClick={() => copyToClipboard(selectedImage.prompt)} className="px-6 py-2 glass-pill rounded-full text-xs font-bold flex items-center gap-2"><Copy size={14}/> Copy Prompt</button>
                <button onClick={() => onDownload(selectedImage)} className="px-6 py-2 bg-white text-black rounded-full text-xs font-bold flex items-center gap-2"><Download size={14}/> Download Asset</button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
