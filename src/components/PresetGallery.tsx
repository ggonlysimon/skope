import React, { useState } from 'react';
import { SILK_PRESETS, SilkPreset } from '../data/presets';
import { Check, Sparkles, Sliders } from 'lucide-react';
import { SilkConfig } from './ControlsPanel';

interface PresetGalleryProps {
  onSelectPreset: (preset: SilkPreset) => void;
  currentConfig: SilkConfig;
}

export const PresetGallery: React.FC<PresetGalleryProps> = ({
  onSelectPreset,
  currentConfig,
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');

  const categories = ['All', 'Luxury', 'Dark & Moody', 'Vibrant & Modern', 'Ethereal'];

  const filteredPresets =
    selectedCategory === 'All'
      ? SILK_PRESETS
      : SILK_PRESETS.filter((p) => p.category === selectedCategory);

  return (
    <div className="space-y-8 max-w-7xl mx-auto py-4">
      {/* Editorial Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-white/10 pb-6">
        <div>
          <div className="flex items-center gap-2 text-xs text-zinc-400 mb-2">
            <span>Curated Material Library</span>
            <span aria-hidden="true">·</span>
            <span>8 Handcrafted Weaves</span>
            <span aria-hidden="true">·</span>
            <span>Ready for Production</span>
          </div>
          <h2 className="text-3xl font-editorial tracking-wide text-white">
            Fabric &amp; Texture Presets
          </h2>
          <p className="text-sm text-zinc-400 max-w-2xl mt-2 leading-relaxed">
            Select any calibrated weave to immediately inspect its motion, shader parameters, and color physics.
          </p>
        </div>

        {/* Interactive Category Segmented Control */}
        <div className="flex items-center gap-1 p-1 bg-[#141622] rounded-xl border border-white/10">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3.5 py-1.5 text-xs font-medium rounded-lg transition-colors whitespace-nowrap ${
                selectedCategory === cat
                  ? 'bg-white text-zinc-900 shadow-sm'
                  : 'text-zinc-400 hover:text-white'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Preset Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {filteredPresets.map((preset) => {
          const isCurrent =
            preset.props.color.toLowerCase() === currentConfig.color.toLowerCase() &&
            Math.abs(preset.props.speed - currentConfig.speed) < 0.1;

          return (
            <div
              key={preset.id}
              className={`group flex flex-col justify-between p-5 rounded-2xl bg-[#11131c] border transition-all duration-200 hover:-translate-y-0.5 ${
                isCurrent
                  ? 'border-white/40 ring-1 ring-white/30 shadow-lg shadow-white/5'
                  : 'border-white/10 hover:border-white/20'
              }`}
            >
              <div>
                {/* Visual Swatch & Category */}
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-2.5">
                    <span
                      className="w-5 h-5 rounded-full border border-white/20 shadow-sm shrink-0"
                      style={{ backgroundColor: preset.props.color }}
                    />
                    <span className="text-xs font-mono text-zinc-400 uppercase">
                      {preset.props.color}
                    </span>
                  </div>
                  <span className="text-xs text-zinc-400">
                    {preset.category}
                  </span>
                </div>

                {/* Title & Subtitle */}
                <h3 className="text-lg font-editorial text-white group-hover:text-white/90">
                  {preset.name}
                </h3>
                <p className="text-xs text-zinc-400 mt-1 line-clamp-1">{preset.subtitle}</p>

                {/* Description */}
                <p className="text-xs text-zinc-400 mt-3 leading-relaxed">
                  {preset.description}
                </p>

                {/* Numerical Specifications */}
                <div className="mt-4 pt-3 border-t border-white/5 grid grid-cols-3 gap-2 text-[11px] font-mono tabular-nums text-zinc-400">
                  <div>
                    <span className="block text-[10px] text-zinc-400 font-sans">Speed</span>
                    <span className="text-zinc-200">{preset.props.speed.toFixed(1)}</span>
                  </div>
                  <div>
                    <span className="block text-[10px] text-zinc-400 font-sans">Scale</span>
                    <span className="text-zinc-200">{preset.props.scale.toFixed(2)}x</span>
                  </div>
                  <div>
                    <span className="block text-[10px] text-zinc-400 font-sans">Light Mode</span>
                    <span className="text-zinc-200">{preset.props.lightMode ? 'On' : 'Off'}</span>
                  </div>
                </div>
              </div>

              {/* Action Button */}
              <div className="mt-6 pt-4 border-t border-white/10">
                <button
                  onClick={() => onSelectPreset(preset)}
                  className={`w-full py-2 px-3 text-xs font-medium rounded-lg flex items-center justify-center gap-2 transition-colors ${
                    isCurrent
                      ? 'bg-white/10 text-white border border-white/20'
                      : 'bg-white/5 hover:bg-white text-zinc-300 hover:text-black border border-white/10'
                  }`}
                >
                  {isCurrent ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-emerald-400" />
                      <span>Active on Canvas</span>
                    </>
                  ) : (
                    <>
                      <Sliders className="w-3.5 h-3.5" />
                      <span>Load into Studio</span>
                    </>
                  )}
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
