import React, { useState } from 'react';
import { RotateCcw, Shuffle, Sparkles, Sun, Moon, Info, Play, Pause } from 'lucide-react';
import { SilkPreset } from '../data/presets';

export interface SilkConfig {
  speed: number;
  scale: number;
  color: string;
  noiseIntensity: number;
  rotation: number;
  lightMode: boolean;
}

interface ControlsPanelProps {
  config: SilkConfig;
  setConfig: React.Dispatch<React.SetStateAction<SilkConfig>>;
  onReset: () => void;
  onRandomize: () => void;
  activePresetId?: string;
  onSelectPreset?: (preset: SilkPreset) => void;
}

const COLOR_SWATCHES = [
  { name: 'Mist Slate', hex: '#7B7481' },
  { name: 'Obsidian', hex: '#1a1b24' },
  { name: 'Champagne', hex: '#c9a875' },
  { name: 'Royal Amethyst', hex: '#4e2a6d' },
  { name: 'Blush Tulle', hex: '#bfa3ad' },
  { name: 'Forest Emerald', hex: '#1b4332' },
  { name: 'Ocean Cobalt', hex: '#162b4d' },
  { name: 'Pearl White', hex: '#d6d3d1' },
  { name: 'Crimson Rose', hex: '#7f1d1d' },
  { name: 'Bronze Ochre', hex: '#8c5e31' },
];

export const ControlsPanel: React.FC<ControlsPanelProps> = ({
  config,
  setConfig,
  onReset,
  onRandomize,
}) => {
  const [cachedSpeed, setCachedSpeed] = useState<number>(config.speed > 0 ? config.speed : 5);
  const isPaused = config.speed === 0;

  const togglePause = () => {
    if (isPaused) {
      setConfig((prev) => ({ ...prev, speed: cachedSpeed || 5 }));
    } else {
      setCachedSpeed(config.speed);
      setConfig((prev) => ({ ...prev, speed: 0 }));
    }
  };

  const updateField = <K extends keyof SilkConfig>(key: K, value: SilkConfig[K]) => {
    setConfig((prev) => ({ ...prev, [key]: value }));
  };

  const degrees = Math.round((config.rotation * 180) / Math.PI) % 360;

  return (
    <div className="flex flex-col gap-6 p-6 bg-[#11131c] border border-white/10 rounded-2xl shadow-xl">
      {/* Panel Header */}
      <div className="flex items-center justify-between border-b border-white/10 pb-4">
        <div>
          <h2 className="text-base font-semibold text-white tracking-tight">Shader Parameters</h2>
          <div className="flex items-center gap-2 text-xs text-zinc-400 mt-0.5">
            <span>Dynamic WebGL Uniforms</span>
            <span aria-hidden="true">·</span>
            <span>Real-time GPU Synthesis</span>
          </div>
        </div>
        <div className="flex items-center gap-1.5">
          <button
            onClick={togglePause}
            className={`p-2 rounded-lg border transition-colors ${
              isPaused
                ? 'bg-amber-500/10 border-amber-500/30 text-amber-300 hover:bg-amber-500/20'
                : 'bg-white/5 border-white/10 text-zinc-300 hover:text-white hover:bg-white/10'
            }`}
            title={isPaused ? 'Resume Animation' : 'Pause Animation'}
            aria-label={isPaused ? 'Resume' : 'Pause'}
          >
            {isPaused ? <Play className="w-4 h-4 fill-current" /> : <Pause className="w-4 h-4" />}
          </button>
          <button
            onClick={onRandomize}
            className="p-2 rounded-lg border border-white/10 bg-white/5 text-zinc-300 hover:text-white hover:bg-white/10 transition-colors"
            title="Randomize Parameters"
            aria-label="Randomize Parameters"
          >
            <Shuffle className="w-4 h-4" />
          </button>
          <button
            onClick={onReset}
            className="p-2 rounded-lg border border-white/10 bg-white/5 text-zinc-300 hover:text-white hover:bg-white/10 transition-colors"
            title="Reset to Defaults"
            aria-label="Reset Defaults"
          >
            <RotateCcw className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Primary Color Control */}
      <div className="space-y-3">
        <div className="flex items-center justify-between text-xs">
          <label htmlFor="color-hex" className="font-medium text-zinc-200">
            Fabric Pigment (<span className="font-mono text-zinc-400">color</span>)
          </label>
          <span className="font-mono text-xs text-zinc-400 uppercase">{config.color}</span>
        </div>

        <div className="flex items-center gap-3">
          <div className="relative w-10 h-10 rounded-xl overflow-hidden border border-white/20 shrink-0 shadow-inner">
            <input
              type="color"
              id="color-picker"
              value={config.color}
              onChange={(e) => updateField('color', e.target.value)}
              className="absolute -top-3 -left-3 w-16 h-16 cursor-pointer border-0 p-0"
              aria-label="Choose silk color"
            />
          </div>
          <input
            type="text"
            id="color-hex"
            value={config.color}
            onChange={(e) => updateField('color', e.target.value)}
            className="w-full bg-[#181a26] border border-white/10 rounded-lg px-3 py-2 text-sm font-mono text-white focus:outline-none focus:border-zinc-400"
            placeholder="#7B7481"
          />
        </div>

        {/* Quick Swatches */}
        <div className="grid grid-cols-5 gap-2 pt-1">
          {COLOR_SWATCHES.map((swatch) => (
            <button
              key={swatch.hex}
              onClick={() => updateField('color', swatch.hex)}
              className={`h-7 rounded-md border transition-all ${
                config.color.toLowerCase() === swatch.hex.toLowerCase()
                  ? 'border-white scale-105 shadow-md'
                  : 'border-white/10 hover:border-white/40'
              }`}
              style={{ backgroundColor: swatch.hex }}
              title={`${swatch.name} (${swatch.hex})`}
              aria-label={swatch.name}
            />
          ))}
        </div>
      </div>

      {/* Sliders Grid */}
      <div className="space-y-5">
        {/* Speed Slider */}
        <div className="space-y-2">
          <div className="flex items-center justify-between text-xs">
            <div className="flex items-center gap-1.5">
              <label htmlFor="speed-slider" className="font-medium text-zinc-200">
                Flow Velocity (<span className="font-mono text-zinc-400">speed</span>)
              </label>
            </div>
            <span className="font-mono tabular-nums text-xs text-zinc-400">
              {config.speed.toFixed(1)}
            </span>
          </div>
          <input
            id="speed-slider"
            type="range"
            min="0"
            max="15"
            step="0.1"
            value={config.speed}
            onChange={(e) => updateField('speed', parseFloat(e.target.value))}
            className="w-full accent-white h-1.5 bg-zinc-800 rounded-lg appearance-none cursor-pointer"
          />
          <div className="flex justify-between text-[11px] text-zinc-500 font-mono">
            <span>0.0 (still)</span>
            <span>5.0 (default)</span>
            <span>15.0 (storm)</span>
          </div>
        </div>

        {/* Scale Slider */}
        <div className="space-y-2">
          <div className="flex items-center justify-between text-xs">
            <label htmlFor="scale-slider" className="font-medium text-zinc-200">
              Wave Geometry (<span className="font-mono text-zinc-400">scale</span>)
            </label>
            <span className="font-mono tabular-nums text-xs text-zinc-400">
              {config.scale.toFixed(2)}x
            </span>
          </div>
          <input
            id="scale-slider"
            type="range"
            min="0.2"
            max="4.0"
            step="0.05"
            value={config.scale}
            onChange={(e) => updateField('scale', parseFloat(e.target.value))}
            className="w-full accent-white h-1.5 bg-zinc-800 rounded-lg appearance-none cursor-pointer"
          />
          <div className="flex justify-between text-[11px] text-zinc-500 font-mono">
            <span>0.2x (macro folds)</span>
            <span>1.0x (standard)</span>
            <span>4.0x (fine silk)</span>
          </div>
        </div>

        {/* Noise Intensity Slider */}
        <div className="space-y-2">
          <div className="flex items-center justify-between text-xs">
            <label htmlFor="noise-slider" className="font-medium text-zinc-200">
              Micro Grain &amp; Shimmer (<span className="font-mono text-zinc-400">noiseIntensity</span>)
            </label>
            <span className="font-mono tabular-nums text-xs text-zinc-400">
              {config.noiseIntensity.toFixed(2)}
            </span>
          </div>
          <input
            id="noise-slider"
            type="range"
            min="0"
            max="4.0"
            step="0.1"
            value={config.noiseIntensity}
            onChange={(e) => updateField('noiseIntensity', parseFloat(e.target.value))}
            className="w-full accent-white h-1.5 bg-zinc-800 rounded-lg appearance-none cursor-pointer"
          />
          <div className="flex justify-between text-[11px] text-zinc-500 font-mono">
            <span>0.0 (smooth gloss)</span>
            <span>1.5 (natural texture)</span>
            <span>4.0 (matte linen)</span>
          </div>
        </div>

        {/* Rotation Slider */}
        <div className="space-y-2">
          <div className="flex items-center justify-between text-xs">
            <label htmlFor="rotation-slider" className="font-medium text-zinc-200">
              Drape Angle (<span className="font-mono text-zinc-400">rotation</span>)
            </label>
            <span className="font-mono tabular-nums text-xs text-zinc-400">
              {config.rotation.toFixed(2)} rad ({degrees}°)
            </span>
          </div>
          <input
            id="rotation-slider"
            type="range"
            min="0"
            max={6.28}
            step="0.05"
            value={config.rotation}
            onChange={(e) => updateField('rotation', parseFloat(e.target.value))}
            className="w-full accent-white h-1.5 bg-zinc-800 rounded-lg appearance-none cursor-pointer"
          />
          <div className="flex justify-between text-[11px] text-zinc-500 font-mono">
            <span>0°</span>
            <span>90° (1.57)</span>
            <span>180° (3.14)</span>
            <span>360° (6.28)</span>
          </div>
        </div>

        {/* Light Mode Switch */}
        <div className="pt-2 border-t border-white/10">
          <div className="flex items-center justify-between">
            <div className="space-y-1">
              <label htmlFor="light-mode-toggle" className="text-xs font-medium text-zinc-200 flex items-center gap-1.5">
                {config.lightMode ? <Sun className="w-3.5 h-3.5 text-amber-400" /> : <Moon className="w-3.5 h-3.5 text-zinc-400" />}
                Illuminated Folds (<span className="font-mono text-zinc-400">lightMode</span>)
              </label>
              <p className="text-[11px] text-zinc-400 leading-normal">
                Applies dual smoothstep highlights and specular fold diffusion in shader
              </p>
            </div>
            <button
              id="light-mode-toggle"
              type="button"
              role="switch"
              aria-checked={config.lightMode}
              onClick={() => updateField('lightMode', !config.lightMode)}
              className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none ${
                config.lightMode ? 'bg-amber-500' : 'bg-zinc-700'
              }`}
            >
              <span
                className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                  config.lightMode ? 'translate-x-6' : 'translate-x-1'
                }`}
              />
            </button>
          </div>
        </div>
      </div>

      {/* Helpful Hint */}
      <div className="flex items-start gap-2.5 p-3 rounded-xl bg-white/[0.03] border border-white/5 text-xs text-zinc-400">
        <Info className="w-4 h-4 text-zinc-400 shrink-0 mt-0.5" />
        <p className="leading-relaxed">
          The shader synthesizes procedural sinusoidal waves and pseudo-random grain directly in GLSL, delivering silky movement at native screen refresh rates.
        </p>
      </div>
    </div>
  );
};
