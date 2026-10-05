import React from 'react';
import { Maximize2, Minimize2, Code2 } from 'lucide-react';

interface NavigationProps {
  activeTab: 'studio' | 'presets' | 'book' | 'cases';
  setActiveTab: (tab: 'studio' | 'presets' | 'book' | 'cases') => void;
  isFullscreen: boolean;
  toggleFullscreen: () => void;
  openExportModal: () => void;
}

export const Navigation: React.FC<NavigationProps> = ({
  activeTab,
  setActiveTab,
  isFullscreen,
  toggleFullscreen,
  openExportModal,
}) => {
  return (
    <header className="sticky top-0 z-40 w-full border-b border-white/10 bg-[#070b19]/80 backdrop-blur-md px-6 py-3.5">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        {/* Brand Wordmark: Skope */}
        <button
          onClick={() => setActiveTab('studio')}
          className="text-2xl font-ui font-extrabold tracking-tight text-white hover:text-blue-300 transition-colors text-left flex items-center gap-2"
        >
          <span>Skope</span>
          <span className="text-[10px] tracking-widest uppercase font-mono px-2 py-0.5 rounded-full bg-blue-500/20 text-blue-300 border border-blue-400/30">
            Silk Studio
          </span>
        </button>

        {/* 4 Clean navigation tabs */}
        <nav className="hidden md:flex items-center gap-7 text-sm font-medium">
          <button
            onClick={() => setActiveTab('studio')}
            className={`transition-colors relative py-1 text-sm ${
              activeTab === 'studio'
                ? 'text-white font-semibold'
                : 'text-zinc-400 hover:text-zinc-200'
            }`}
          >
            Playground
            {activeTab === 'studio' && (
              <span className="absolute bottom-0 left-0 right-0 h-[2px] bg-blue-400 rounded-full" />
            )}
          </button>

          <button
            onClick={() => setActiveTab('presets')}
            className={`transition-colors relative py-1 text-sm ${
              activeTab === 'presets'
                ? 'text-white font-semibold'
                : 'text-zinc-400 hover:text-zinc-200'
            }`}
          >
            Presets
            {activeTab === 'presets' && (
              <span className="absolute bottom-0 left-0 right-0 h-[2px] bg-blue-400 rounded-full" />
            )}
          </button>

          <button
            onClick={() => setActiveTab('cases')}
            className={`transition-colors relative py-1 text-sm ${
              activeTab === 'cases'
                ? 'text-white font-semibold'
                : 'text-zinc-400 hover:text-zinc-200'
            }`}
          >
            Use Cases
            {activeTab === 'cases' && (
              <span className="absolute bottom-0 left-0 right-0 h-[2px] bg-blue-400 rounded-full" />
            )}
          </button>

          <button
            onClick={() => setActiveTab('book')}
            className={`transition-colors relative py-1 text-sm ${
              activeTab === 'book'
                ? 'text-white font-semibold'
                : 'text-zinc-400 hover:text-zinc-200'
            }`}
          >
            Book of Silk
            {activeTab === 'book' && (
              <span className="absolute bottom-0 left-0 right-0 h-[2px] bg-blue-400 rounded-full" />
            )}
          </button>
        </nav>

        {/* Actions */}
        <div className="flex items-center gap-3">
          <button
            onClick={toggleFullscreen}
            className="flex items-center gap-2 px-3.5 py-1.5 text-xs font-medium text-zinc-300 hover:text-white border border-white/10 rounded-lg hover:bg-white/5 transition-colors whitespace-nowrap"
            title={isFullscreen ? 'Exit Fullscreen' : 'Enter Fullscreen'}
          >
            {isFullscreen ? (
              <>
                <Minimize2 className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">Exit Full</span>
              </>
            ) : (
              <>
                <Maximize2 className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">Full Canvas</span>
              </>
            )}
          </button>

          <button
            onClick={openExportModal}
            className="flex items-center gap-2 px-4 py-1.5 text-xs font-medium text-white bg-blue-600 hover:bg-blue-500 rounded-lg transition-colors whitespace-nowrap shadow-md shadow-blue-900/30"
          >
            <Code2 className="w-3.5 h-3.5" />
            <span>Copy Code</span>
          </button>
        </div>
      </div>
    </header>
  );
};
