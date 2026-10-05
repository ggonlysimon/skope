import React, { useState } from 'react';
import Silk from './Silk';
import { SilkConfig } from './ControlsPanel';
import { Sparkles, ArrowRight, ShieldCheck, CreditCard, Wind, Layers } from 'lucide-react';

interface UseCaseShowcaseProps {
  currentConfig: SilkConfig;
}

export const UseCaseShowcase: React.FC<UseCaseShowcaseProps> = ({ currentConfig }) => {
  const [activeScenario, setActiveScenario] = useState<'hero' | 'card' | 'sanctuary'>('hero');

  return (
    <div className="max-w-7xl mx-auto py-4 space-y-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-white/10 pb-6">
        <div>
          <div className="flex items-center gap-2 text-xs text-zinc-400 mb-2">
            <span>Contextual Testing Lab</span>
            <span aria-hidden="true">·</span>
            <span>Real-World UI Environments</span>
            <span aria-hidden="true">·</span>
            <span>Live Shading</span>
          </div>
          <h2 className="text-3xl font-editorial tracking-wide text-white">
            Practical UI Compositions
          </h2>
          <p className="text-sm text-zinc-400 max-w-2xl mt-2 leading-relaxed">
            Evaluate how the active silk shader parameters look when embedded behind production-grade editorial layouts, frosted cards, and immersive scenes.
          </p>
        </div>

        {/* Scenario Switcher */}
        <div className="flex items-center gap-1 p-1 bg-[#141622] rounded-xl border border-white/10">
          <button
            onClick={() => setActiveScenario('hero')}
            className={`px-3.5 py-1.5 text-xs font-medium rounded-lg transition-colors whitespace-nowrap ${
              activeScenario === 'hero'
                ? 'bg-white text-zinc-900 shadow-sm'
                : 'text-zinc-400 hover:text-white'
            }`}
          >
            Editorial Hero
          </button>
          <button
            onClick={() => setActiveScenario('card')}
            className={`px-3.5 py-1.5 text-xs font-medium rounded-lg transition-colors whitespace-nowrap ${
              activeScenario === 'card'
                ? 'bg-white text-zinc-900 shadow-sm'
                : 'text-zinc-400 hover:text-white'
            }`}
          >
            Fintech Glass Card
          </button>
          <button
            onClick={() => setActiveScenario('sanctuary')}
            className={`px-3.5 py-1.5 text-xs font-medium rounded-lg transition-colors whitespace-nowrap ${
              activeScenario === 'sanctuary'
                ? 'bg-white text-zinc-900 shadow-sm'
                : 'text-zinc-400 hover:text-white'
            }`}
          >
            Ambient Sanctuary
          </button>
        </div>
      </div>

      {/* Scenario Stage */}
      {activeScenario === 'hero' && (
        <div className="relative w-full h-[580px] rounded-3xl overflow-hidden border border-white/10 shadow-2xl flex flex-col justify-between">
          {/* Background Silk */}
          <div className="absolute inset-0 z-0">
            <Silk
              speed={currentConfig.speed}
              scale={currentConfig.scale}
              color={currentConfig.color}
              noiseIntensity={currentConfig.noiseIntensity}
              rotation={currentConfig.rotation}
              lightMode={currentConfig.lightMode}
            />
          </div>

          {/* Measured Contrast Scrim */}
          <div className="absolute inset-0 z-10 bg-gradient-to-t from-[#0c0d12] via-[#0c0d12]/60 to-black/30 pointer-events-none" />

          {/* Top Brand Bar */}
          <div className="relative z-20 flex items-center justify-between p-8">
            <span className="text-xl font-editorial tracking-wider text-white">
              MAISON LUMIÈRE
            </span>
            <div className="text-xs text-zinc-300 font-medium tracking-wide">
              Winter Haute Couture Collection
            </div>
          </div>

          {/* Center Editorial Hero Text */}
          <div className="relative z-20 max-w-3xl px-8 pb-12 space-y-6">
            <div className="flex items-center gap-2 text-xs text-zinc-300">
              <span>Woven by Light</span>
              <span aria-hidden="true">·</span>
              <span>Procedural Geometry</span>
              <span aria-hidden="true">·</span>
              <span>Atelier 2026</span>
            </div>
            <h1 className="text-5xl md:text-6xl font-editorial text-white tracking-tight leading-none text-balance">
              Sensory drapery sculpted in pure mathematics.
            </h1>
            <p className="text-sm md:text-base text-zinc-300 max-w-xl leading-relaxed">
              Experience the tactile illusion of raw silk, organza, and velvet dynamically simulated in WebGL fragment calculations.
            </p>
            <div className="flex items-center gap-4 pt-2">
              <button className="px-6 py-3 bg-white text-zinc-900 rounded-xl font-medium text-xs hover:bg-zinc-200 transition-colors flex items-center gap-2 shadow-lg">
                <span>Explore the Collection</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
              <span className="text-xs text-zinc-400">
                Live color: <span className="font-mono text-white">{currentConfig.color}</span>
              </span>
            </div>
          </div>
        </div>
      )}

      {activeScenario === 'card' && (
        <div className="w-full min-h-[500px] rounded-3xl bg-[#090a0f] border border-white/10 p-12 flex flex-col md:flex-row items-center justify-center gap-12">
          {/* Interactive Card */}
          <div className="relative w-80 sm:w-96 h-56 rounded-2xl overflow-hidden border border-white/20 shadow-2xl transition-transform hover:scale-[1.02] duration-300 flex flex-col justify-between p-6">
            {/* Background Silk Canvas inside the card */}
            <div className="absolute inset-0 z-0">
              <Silk
                speed={currentConfig.speed}
                scale={currentConfig.scale}
                color={currentConfig.color}
                noiseIntensity={currentConfig.noiseIntensity}
                rotation={currentConfig.rotation}
                lightMode={currentConfig.lightMode}
              />
            </div>

            {/* Subtle frosted glass scrim over card */}
            <div className="absolute inset-0 z-10 bg-black/35 backdrop-blur-[2px] pointer-events-none" />

            {/* Card Content Top */}
            <div className="relative z-20 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <CreditCard className="w-5 h-5 text-white/90" />
                <span className="text-xs font-semibold tracking-widest text-white uppercase">
                  Obsidian Tier
                </span>
              </div>
              <div className="w-8 h-6 rounded bg-gradient-to-tr from-amber-400 to-amber-200 opacity-90 shadow-sm" />
            </div>

            {/* Card Content Bottom */}
            <div className="relative z-20 space-y-3">
              <div className="font-mono text-sm tracking-widest text-white/90">
                •••• &nbsp;•••• &nbsp;•••• &nbsp;8892
              </div>
              <div className="flex items-end justify-between text-[11px] text-zinc-300">
                <div>
                  <span className="block text-[9px] uppercase tracking-wider text-zinc-400">Cardholder</span>
                  <span className="font-medium text-white tracking-wide">ELENA ROSTOVA</span>
                </div>
                <div>
                  <span className="block text-[9px] uppercase tracking-wider text-zinc-400">Expires</span>
                  <span className="font-mono text-white">09/29</span>
                </div>
              </div>
            </div>
          </div>

          {/* Description alongside card */}
          <div className="max-w-md space-y-4">
            <div className="flex items-center gap-2 text-xs text-zinc-400">
              <Layers className="w-4 h-4 text-zinc-400" />
              <span>Embedded Mesh Subsurface</span>
            </div>
            <h3 className="text-2xl font-editorial text-white">
              Dynamic Glassmorphism Pass
            </h3>
            <p className="text-xs text-zinc-400 leading-relaxed">
              When constrained within a card frame, the silk pattern provides a luxury metallic grain that responds dynamically to user themes or account tiers.
            </p>
            <div className="p-4 rounded-xl bg-white/[0.02] border border-white/10 text-xs text-zinc-300 space-y-2">
              <div className="flex justify-between font-mono text-[11px]">
                <span className="text-zinc-400">Card Dimension:</span>
                <span className="text-zinc-200">384px × 224px (ISO 7810 ID-1 ratio)</span>
              </div>
              <div className="flex justify-between font-mono text-[11px]">
                <span className="text-zinc-400">Render Resolution:</span>
                <span className="text-zinc-200">DPR 2.0 Hardware Scaled</span>
              </div>
            </div>
          </div>
        </div>
      )}

      {activeScenario === 'sanctuary' && (
        <div className="relative w-full h-[540px] rounded-3xl overflow-hidden border border-white/10 shadow-2xl flex items-center justify-center">
          {/* Ambient Silk */}
          <div className="absolute inset-0 z-0">
            <Silk
              speed={Math.min(currentConfig.speed, 2.5)}
              scale={currentConfig.scale * 1.2}
              color={currentConfig.color}
              noiseIntensity={Math.max(currentConfig.noiseIntensity, 1.2)}
              rotation={currentConfig.rotation}
              lightMode={currentConfig.lightMode}
            />
          </div>

          <div className="absolute inset-0 z-10 bg-black/40 backdrop-blur-[1px]" />

          {/* Sanctuary Meditative Center */}
          <div className="relative z-20 text-center space-y-6 max-w-lg px-6">
            <div className="inline-flex p-3 rounded-full bg-white/10 border border-white/20 backdrop-blur-md">
              <Wind className="w-6 h-6 text-white" />
            </div>
            <h3 className="text-4xl font-editorial text-white">
              Somatic Respiration Flow
            </h3>
            <p className="text-sm text-zinc-300 leading-relaxed">
              Harmonize your breath with the undulating fluid cycle. Gentle sinusoidal rhythm calibrated to 4 seconds inhale, 4 seconds exhale.
            </p>
            <div className="text-xs font-mono text-zinc-400">
              Current Speed: {Math.min(currentConfig.speed, 2.5).toFixed(1)} · Color: {currentConfig.color}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
