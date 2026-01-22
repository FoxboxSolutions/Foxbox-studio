
import React from 'react';
import { X, Clock, Trash2, ArrowRight } from 'lucide-react';
import { GenerationGroup } from '../types';

interface HistoryPanelProps {
  isOpen: boolean;
  onClose: () => void;
  history: GenerationGroup[];
  onSelect: (group: GenerationGroup) => void;
  onDelete: (id: string) => void;
}

export const HistoryPanel: React.FC<HistoryPanelProps> = ({ isOpen, onClose, history, onSelect, onDelete }) => {
  return (
    <>
      {/* Overlay */}
      <div 
        className={`fixed inset-0 bg-black/60 backdrop-blur-sm z-[400] transition-opacity duration-500 ${isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
        onClick={onClose}
      />
      
      {/* Panel */}
      <div className={`fixed top-0 right-0 h-full w-full max-w-md bg-[#0a0a0a] border-l border-white/5 z-[401] transition-transform duration-500 ease-out shadow-2xl ${isOpen ? 'translate-x-0' : 'translate-x-full'}`}>
        <div className="p-8 flex flex-col h-full">
          <div className="flex items-center justify-between mb-12">
            <div className="flex items-center gap-3">
              <Clock size={20} className="text-[#FFD700]" />
              <h2 className="text-xl font-bold tracking-tight">History</h2>
            </div>
            <button onClick={onClose} className="p-2 hover:bg-white/5 rounded-full transition-colors">
              <X size={24} />
            </button>
          </div>

          <div className="flex-1 overflow-y-auto space-y-6 pr-2 custom-scrollbar">
            {history.length === 0 ? (
              <div className="h-40 flex flex-col items-center justify-center text-white/20">
                <p className="text-sm">No history yet.</p>
              </div>
            ) : (
              history.map((group) => (
                <div 
                  key={group.id} 
                  className="group relative bg-white/[0.02] border border-white/5 rounded-2xl p-4 hover:border-white/10 transition-all cursor-pointer"
                  onClick={() => { onSelect(group); onClose(); }}
                >
                  <div className="flex gap-2 mb-3">
                    {group.images.slice(0, 3).map((img, i) => (
                      <div key={i} className="w-12 h-12 rounded-lg overflow-hidden bg-white/5">
                        <img src={img.url} className="w-full h-full object-cover opacity-60" alt="" />
                      </div>
                    ))}
                    {group.images.length > 3 && (
                      <div className="w-12 h-12 rounded-lg bg-white/5 flex items-center justify-center text-[10px] font-bold">
                        +{group.images.length - 3}
                      </div>
                    )}
                  </div>
                  <p className="text-sm font-medium text-white/60 line-clamp-2 pr-8 italic">"{group.prompt}"</p>
                  <div className="mt-4 flex items-center justify-between">
                    <span className="text-[10px] text-white/20">{new Date(group.timestamp).toLocaleTimeString()}</span>
                    <button 
                      onClick={(e) => { e.stopPropagation(); onDelete(group.id); }}
                      className="opacity-0 group-hover:opacity-100 p-2 text-red-500/50 hover:text-red-500 transition-all"
                    >
                      <Trash2 size={14} />
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </>
  );
};
