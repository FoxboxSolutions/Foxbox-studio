
import React, { useState } from 'react';
import { Menu, X, Sparkles } from 'lucide-react';

export const Header: React.FC = () => {
  const [showBanner, setShowBanner] = useState(true);

  return (
    <div className="fixed top-0 left-0 right-0 z-[100]">
      {showBanner && (
        <div className="top-banner w-full py-3 px-6 flex items-center justify-center relative border-b border-white/5">
          <div className="flex items-center gap-2 text-sm font-medium text-white">
            <Sparkles size={16} className="text-emerald-300" />
            <span>New! All the AI tools you need, organized in one toolkit</span>
          </div>
          <button 
            onClick={() => setShowBanner(false)}
            className="absolute right-6 text-white/60 hover:text-white transition-colors"
          >
            <X size={18} />
          </button>
        </div>
      )}
      
      <header className="w-full px-8 py-4 flex items-center justify-between bg-black/40 backdrop-blur-md">
        <div className="flex items-center gap-2 cursor-pointer group" onClick={() => window.location.reload()}>
          <h1 className="text-2xl font-bold tracking-tight text-[#FFD700]">Foxbox</h1>
        </div>

        <div className="flex items-center gap-6">
          <button className="px-6 py-2.5 bg-[#FFD700] text-black text-sm font-bold rounded-full hover:bg-white transition-all active:scale-95 shadow-lg shadow-yellow-500/10">
            Start Free Now
          </button>
          <button className="p-2 text-white hover:bg-white/10 rounded-lg transition-colors">
            <Menu size={28} />
          </button>
        </div>
      </header>
    </div>
  );
};
