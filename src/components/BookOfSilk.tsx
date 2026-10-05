import React, { useState } from 'react';
import { BookOpen, Copy, Check, ChevronRight, Sparkles, Shield, Cpu, Code2, AlertCircle } from 'lucide-react';

export const BookOfSilk: React.FC = () => {
  const [activeChapter, setActiveChapter] = useState<number>(1);
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const handleCopy = (id: string, code: string) => {
    navigator.clipboard.writeText(code);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const chapters = [
    { id: 1, title: '01. Architectural Foundations', subtitle: 'Procedural GLSL Shader Mechanics' },
    { id: 2, title: '02. Step-by-Step Integration', subtitle: 'Dependencies, Setup & Parent Layout' },
    { id: 3, title: '03. Properties & Calibration', subtitle: 'Comprehensive Parameter Specification' },
    { id: 4, title: '04. Production Recipes & Patterns', subtitle: 'Hero Banners, Glass Scrims & Mobile' },
    { id: 5, title: '05. Safety, Performance & FAQs', subtitle: 'GPU Budgets, Accessibility & Diagnostics' },
  ];

  return (
    <div className="max-w-7xl mx-auto py-4 space-y-8">
      {/* Book Cover / Header */}
      <div className="border-b border-white/10 pb-8">
        <div className="flex items-center gap-2 text-xs text-zinc-400 mb-2">
          <span>Technical Monograph</span>
          <span aria-hidden="true">·</span>
          <span>React Bits Component Manual</span>
          <span aria-hidden="true">·</span>
          <span>Version 1.2.0</span>
        </div>
        <h1 className="text-4xl font-editorial tracking-wide text-white">
          The Book of Silk
        </h1>
        <p className="text-sm text-zinc-400 max-w-2xl mt-2 leading-relaxed">
          A comprehensive engineering and aesthetic manual for integrating, calibrating, and optimizing procedural silk cloth shaders in modern React environments.
        </p>
      </div>

      {/* Main Layout: Chapter Navigation on Left, Book Content on Right */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Table of Contents Index */}
        <aside className="lg:col-span-4 bg-[#11131c] border border-white/10 rounded-2xl p-4 sticky top-20">
          <div className="flex items-center gap-2 px-3 py-2 text-xs font-semibold uppercase tracking-wider text-zinc-400 border-b border-white/5 mb-2">
            <BookOpen className="w-3.5 h-3.5 text-zinc-400" />
            <span>Table of Contents</span>
          </div>
          <nav className="space-y-1">
            {chapters.map((ch) => (
              <button
                key={ch.id}
                onClick={() => setActiveChapter(ch.id)}
                className={`w-full text-left p-3 rounded-xl transition-all flex items-start justify-between group ${
                  activeChapter === ch.id
                    ? 'bg-white/10 text-white border border-white/10'
                    : 'text-zinc-400 hover:text-zinc-200 hover:bg-white/[0.03]'
                }`}
              >
                <div>
                  <div className={`text-xs font-medium ${activeChapter === ch.id ? 'text-white' : 'text-zinc-300'}`}>
                    {ch.title}
                  </div>
                  <div className="text-[11px] text-zinc-400 mt-0.5 line-clamp-1">
                    {ch.subtitle}
                  </div>
                </div>
                <ChevronRight
                  className={`w-4 h-4 shrink-0 transition-transform ${
                    activeChapter === ch.id ? 'text-white translate-x-0.5' : 'text-zinc-600 group-hover:text-zinc-400'
                  }`}
                />
              </button>
            ))}
          </nav>

          <div className="mt-6 pt-4 border-t border-white/10 px-2">
            <div className="flex items-center gap-2 text-xs text-zinc-400">
              <Shield className="w-3.5 h-3.5 text-emerald-400" />
              <span>Zero external API keys required</span>
            </div>
            <p className="text-[11px] text-zinc-400 mt-1 leading-relaxed">
              Runs 100% client-side via hardware-accelerated WebGL. Safe for hermetic, offline, or production deployments.
            </p>
          </div>
        </aside>

        {/* Chapter Content Body */}
        <article className="lg:col-span-8 bg-[#11131c] border border-white/10 rounded-2xl p-8 space-y-10">
          {/* Chapter 1 */}
          {activeChapter === 1 && (
            <div className="space-y-6">
              <div>
                <span className="text-xs font-mono text-zinc-400 uppercase tracking-wider">Chapter 01</span>
                <h2 className="text-2xl font-editorial text-white mt-1">Architectural Foundations</h2>
                <p className="text-xs text-zinc-400 mt-1">The Physics of Procedural Fluid Fabric</p>
              </div>

              <div className="prose prose-invert max-w-none text-sm text-zinc-300 space-y-4 leading-relaxed">
                <p>
                  The <code className="text-white font-mono bg-white/10 px-1.5 py-0.5 rounded text-xs">&lt;Silk /&gt;</code> component renders a GPU-synthesized representation of fluid textile draping. Unlike heavy 3D mesh simulations that require vertex skeletal rigging, physics springs, or hundreds of thousands of polygons, Silk executes entirely inside a fragment shader on a simple two-triangle plane mesh.
                </p>

                <h3 className="text-base font-semibold text-white pt-2">The Fragment Shader Pipeline</h3>
                <p>
                  The effect is produced through three sequential mathematical transformations computed in parallel for each pixel on your screen:
                </p>

                <div className="space-y-3 pl-4 border-l-2 border-white/10 my-4 text-xs">
                  <div>
                    <strong className="text-white">1. UV Rotation &amp; Scale Matrix:</strong>
                    <p className="text-zinc-400 mt-0.5 font-mono">
                      uv = mat2(cos(angle), -sin(angle), sin(angle), cos(angle)) * (vUv * scale);
                    </p>
                    <p className="text-zinc-400 mt-1">
                      Transforms normalized screen space coordinates by applying scale and rotation before pattern sampling.
                    </p>
                  </div>
                  <div>
                    <strong className="text-white">2. Dual-Harmonic Sinusoidal Interference:</strong>
                    <p className="text-zinc-400 mt-0.5 font-mono">
                      pattern = 0.6 + 0.4 * sin(5.0 * (tex.x + tex.y + cos(3.0 * tex.x + 5.0 * tex.y) + 0.02 * tOffset) + sin(20.0 * (tex.x + tex.y - 0.1 * tOffset)));
                    </p>
                    <p className="text-zinc-400 mt-1">
                      Couples low-frequency broad waves with high-frequency surface ripples to replicate the tension and relaxation of woven fibers.
                    </p>
                  </div>
                  <div>
                    <strong className="text-white">3. Micro-Noise Grain &amp; Light Modulation:</strong>
                    <p className="text-zinc-400 mt-0.5">
                      A pseudo-random hash based on Euler’s constant <span className="font-mono text-zinc-300">(e ≈ 2.71828)</span> introduces an organic woven grain, avoiding the sterile plastic look of pure mathematical curves.
                    </p>
                  </div>
                </div>

                <div className="p-4 rounded-xl bg-white/[0.02] border border-white/10 flex items-start gap-3">
                  <Cpu className="w-5 h-5 text-zinc-400 shrink-0 mt-0.5" />
                  <div className="text-xs text-zinc-300">
                    <span className="font-semibold text-white">Zero Geometry Overhead: </span>
                    Because the geometry consists of a single quad (<span className="font-mono">planeGeometry args=[1, 1, 1, 1]</span>), vertex throughput is negligible. The entire visual richness is derived through fragment math, yielding smooth 60–120 FPS performance on both desktop and modern mobile devices.
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Chapter 2 */}
          {activeChapter === 2 && (
            <div className="space-y-6">
              <div>
                <span className="text-xs font-mono text-zinc-400 uppercase tracking-wider">Chapter 02</span>
                <h2 className="text-2xl font-editorial text-white mt-1">Step-by-Step Integration</h2>
                <p className="text-xs text-zinc-400 mt-1">Installation, File Placement &amp; Sizing Contract</p>
              </div>

              <div className="space-y-6 text-sm text-zinc-300">
                {/* Step 1 */}
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="font-semibold text-white text-xs uppercase tracking-wide">
                      Step 1: Install Dependencies
                    </span>
                    <button
                      onClick={() => handleCopy('npm', 'npm install three @react-three/fiber\nnpm install -D @types/three')}
                      className="flex items-center gap-1.5 text-xs text-zinc-400 hover:text-white"
                    >
                      {copiedId === 'npm' ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                      <span>{copiedId === 'npm' ? 'Copied' : 'Copy'}</span>
                    </button>
                  </div>
                  <pre className="p-3.5 rounded-xl bg-[#090a0f] border border-white/10 text-xs font-mono text-zinc-200 overflow-x-auto">
                    npm install three @react-three/fiber{'\n'}
                    npm install -D @types/three
                  </pre>
                </div>

                {/* Step 2 */}
                <div className="space-y-2">
                  <span className="font-semibold text-white text-xs uppercase tracking-wide">
                    Step 2: Place Silk.tsx in your components folder
                  </span>
                  <p className="text-xs text-zinc-400 leading-relaxed">
                    Place <code className="text-zinc-200">Silk.tsx</code> (or <code className="text-zinc-200">Silk.jsx</code>) inside your project directory at <code className="text-zinc-200">src/components/Silk.tsx</code>. Both default and named exports are available:
                  </p>
                  <pre className="p-3.5 rounded-xl bg-[#090a0f] border border-white/10 text-xs font-mono text-zinc-200 overflow-x-auto">
                    import Silk from './components/Silk';{'\n'}
                    // or{'\n'}
                    import &#123; Silk &#125; from './components/Silk';
                  </pre>
                </div>

                {/* Step 3 */}
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="font-semibold text-white text-xs uppercase tracking-wide">
                      Step 3: Render inside a Parent with Defined Height
                    </span>
                    <button
                      onClick={() =>
                        handleCopy(
                          'usage',
                          `<div className="relative w-full h-[500px] overflow-hidden rounded-2xl">\n  <Silk\n    speed={5}\n    scale={1}\n    color="#7B7481"\n    noiseIntensity={1.5}\n    rotation={0}\n  />\n</div>`
                        )
                      }
                      className="flex items-center gap-1.5 text-xs text-zinc-400 hover:text-white"
                    >
                      {copiedId === 'usage' ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                      <span>{copiedId === 'usage' ? 'Copied' : 'Copy'}</span>
                    </button>
                  </div>
                  <pre className="p-3.5 rounded-xl bg-[#090a0f] border border-white/10 text-xs font-mono text-zinc-200 overflow-x-auto">
                    {`// Standard JSX Usage
<div className="relative w-full h-[500px] overflow-hidden rounded-2xl">
  <Silk
    speed={5}
    scale={1}
    color="#7B7481"
    noiseIntensity={1.5}
    rotation={0}
  />
</div>`}
                  </pre>
                </div>

                {/* Sizing Warning */}
                <div className="p-4 rounded-xl bg-amber-500/10 border border-amber-500/20 flex items-start gap-3">
                  <AlertCircle className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
                  <div className="text-xs text-zinc-300">
                    <span className="font-semibold text-amber-300">Crucial Layout Rule: </span>
                    Three.js <code className="font-mono text-amber-200">&lt;Canvas /&gt;</code> expands to 100% of its containing element. If the parent container has a computed height of <code className="font-mono text-amber-200">0px</code> (e.g. an empty un-styled div), the canvas will render with zero pixels. Always give the parent container an explicit height like <code className="font-mono text-amber-200">h-screen</code>, <code className="font-mono text-amber-200">h-[600px]</code>, or <code className="font-mono text-amber-200">min-h-full</code>.
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Chapter 3 */}
          {activeChapter === 3 && (
            <div className="space-y-6">
              <div>
                <span className="text-xs font-mono text-zinc-400 uppercase tracking-wider">Chapter 03</span>
                <h2 className="text-2xl font-editorial text-white mt-1">Properties &amp; Calibration</h2>
                <p className="text-xs text-zinc-400 mt-1">Exhaustive Reference Table &amp; Aesthetic Tuning</p>
              </div>

              <div className="space-y-6">
                {/* Props Table */}
                <div className="overflow-x-auto rounded-xl border border-white/10">
                  <table className="w-full text-left text-xs">
                    <thead className="bg-white/5 border-b border-white/10 text-zinc-300 font-medium">
                      <tr>
                        <th className="p-3 font-mono">Prop</th>
                        <th className="p-3">Type</th>
                        <th className="p-3 font-mono">Default</th>
                        <th className="p-3">Recommended Range</th>
                        <th className="p-3">Description</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-white/5 font-mono text-[11px] text-zinc-300">
                      <tr>
                        <td className="p-3 text-white font-semibold">speed</td>
                        <td className="p-3 text-zinc-400">number</td>
                        <td className="p-3 text-amber-300">5</td>
                        <td className="p-3 text-zinc-400">0.0 to 15.0</td>
                        <td className="p-3 font-sans text-zinc-400">Velocity of wave undulation. 0 pauses animation entirely.</td>
                      </tr>
                      <tr>
                        <td className="p-3 text-white font-semibold">scale</td>
                        <td className="p-3 text-zinc-400">number</td>
                        <td className="p-3 text-amber-300">1</td>
                        <td className="p-3 text-zinc-400">0.2 to 4.0</td>
                        <td className="p-3 font-sans text-zinc-400">Zoom frequency of the folds. Lower values produce macro waves.</td>
                      </tr>
                      <tr>
                        <td className="p-3 text-white font-semibold">color</td>
                        <td className="p-3 text-zinc-400">string</td>
                        <td className="p-3 text-amber-300">'#7B7481'</td>
                        <td className="p-3 text-zinc-400">Any valid 3/6-digit hex</td>
                        <td className="p-3 font-sans text-zinc-400">Primary fabric pigment, normalized to GLSL RGB vector.</td>
                      </tr>
                      <tr>
                        <td className="p-3 text-white font-semibold">noiseIntensity</td>
                        <td className="p-3 text-zinc-400">number</td>
                        <td className="p-3 text-amber-300">1.5</td>
                        <td className="p-3 text-zinc-400">0.0 to 3.0</td>
                        <td className="p-3 font-sans text-zinc-400">Euler pseudo-noise grain strength. 0 gives glossy satin finish.</td>
                      </tr>
                      <tr>
                        <td className="p-3 text-white font-semibold">rotation</td>
                        <td className="p-3 text-zinc-400">number</td>
                        <td className="p-3 text-amber-300">0</td>
                        <td className="p-3 text-zinc-400">0 to 6.28 rad (2π)</td>
                        <td className="p-3 font-sans text-zinc-400">Angle of drape in radians (0 to 2π). 1.57 is 90 degrees.</td>
                      </tr>
                      <tr>
                        <td className="p-3 text-white font-semibold">lightMode</td>
                        <td className="p-3 text-zinc-400">boolean</td>
                        <td className="p-3 text-amber-300">false</td>
                        <td className="p-3 text-zinc-400">true | false</td>
                        <td className="p-3 font-sans text-zinc-400">Enables dual smoothstep specular sheen and soft fold ambient shadows.</td>
                      </tr>
                    </tbody>
                  </table>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
                  <div className="p-4 rounded-xl bg-white/[0.02] border border-white/10 space-y-1.5">
                    <span className="font-semibold text-white">For Luxury / High Fashion:</span>
                    <p className="text-zinc-400 leading-relaxed">
                      Use <span className="font-mono text-zinc-200">lightMode=&#123;true&#125;</span>, warm champagne/gold tints (<span className="font-mono text-zinc-200">#C9A875</span>), low noise (<span className="font-mono text-zinc-200">0.8</span>), and gentle speed (<span className="font-mono text-zinc-200">3.5</span>).
                    </p>
                  </div>
                  <div className="p-4 rounded-xl bg-white/[0.02] border border-white/10 space-y-1.5">
                    <span className="font-semibold text-white">For Dark SaaS / Tech Consoles:</span>
                    <p className="text-zinc-400 leading-relaxed">
                      Use deep obsidian/slate (<span className="font-mono text-zinc-200">#1A1B24</span>), <span className="font-mono text-zinc-200">lightMode=&#123;false&#125;</span>, medium grain (<span className="font-mono text-zinc-200">1.3</span>), and low scale (<span className="font-mono text-zinc-200">0.9</span>) for quiet background motion.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Chapter 4 */}
          {activeChapter === 4 && (
            <div className="space-y-6">
              <div>
                <span className="text-xs font-mono text-zinc-400 uppercase tracking-wider">Chapter 04</span>
                <h2 className="text-2xl font-editorial text-white mt-1">Production Recipes &amp; Patterns</h2>
                <p className="text-xs text-zinc-400 mt-1">Masterclass Compositions for Modern Web Applications</p>
              </div>

              <div className="space-y-6 text-sm text-zinc-300">
                {/* Recipe 1 */}
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="font-semibold text-white text-xs uppercase tracking-wide">
                      Pattern A: Hero Section with Contrast Scrim
                    </span>
                    <button
                      onClick={() =>
                        handleCopy(
                          'hero-recipe',
                          `<section className="relative w-full h-[640px] flex items-center justify-center overflow-hidden">\n  {/* Background Silk */}\n  <div className="absolute inset-0 z-0">\n    <Silk speed={3.8} scale={1.2} color="#162b4d" noiseIntensity={1.2} />\n  </div>\n  {/* Measured Contrast Scrim */}\n  <div className="absolute inset-0 z-10 bg-gradient-to-t from-[#0c0d12] via-[#0c0d12]/40 to-transparent pointer-events-none" />\n  {/* Legible Content */}\n  <div className="relative z-20 max-w-3xl text-center px-6">\n    <h1 className="text-5xl font-editorial text-white">Fluid Precision</h1>\n    <p className="text-zinc-300 mt-4 text-base">Next generation digital experiences.</p>\n  </div>\n</section>`
                        )
                      }
                      className="flex items-center gap-1.5 text-xs text-zinc-400 hover:text-white"
                    >
                      {copiedId === 'hero-recipe' ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                      <span>{copiedId === 'hero-recipe' ? 'Copied' : 'Copy'}</span>
                    </button>
                  </div>
                  <pre className="p-3.5 rounded-xl bg-[#090a0f] border border-white/10 text-xs font-mono text-zinc-200 overflow-x-auto">
                    {`<section className="relative w-full h-[640px] flex items-center justify-center overflow-hidden">
  {/* Background Silk */}
  <div className="absolute inset-0 z-0">
    <Silk speed={3.8} scale={1.2} color="#162b4d" noiseIntensity={1.2} />
  </div>

  {/* Contrast Scrim to guarantee WCAG AA text legibility */}
  <div className="absolute inset-0 z-10 bg-gradient-to-t from-[#0c0d12] via-[#0c0d12]/40 to-transparent pointer-events-none" />

  {/* Interactive Content */}
  <div className="relative z-20 max-w-3xl text-center px-6">
    <h1 className="text-5xl font-editorial text-white">Fluid Precision</h1>
    <p className="text-zinc-300 mt-4 text-base">Next generation digital experiences.</p>
  </div>
</section>`}
                  </pre>
                </div>

                {/* Recipe 2 */}
                <div className="space-y-2">
                  <span className="font-semibold text-white text-xs uppercase tracking-wide">
                    Pattern B: Ambient Card Backdrop with Glassmorphism
                  </span>
                  <pre className="p-3.5 rounded-xl bg-[#090a0f] border border-white/10 text-xs font-mono text-zinc-200 overflow-x-auto">
                    {`<div className="relative w-80 h-96 rounded-2xl overflow-hidden border border-white/15 p-6 flex flex-col justify-end">
  <div className="absolute inset-0 z-0">
    <Silk speed={2.5} scale={1.8} color="#4e2a6d" />
  </div>
  <div className="relative z-10 bg-black/40 backdrop-blur-md p-4 rounded-xl border border-white/10">
    <h4 className="text-sm font-semibold text-white">Bespoke Pass</h4>
    <p className="text-xs text-zinc-300 mt-1">Exclusive spatial membership.</p>
  </div>
</div>`}
                  </pre>
                </div>
              </div>
            </div>
          )}

          {/* Chapter 5 */}
          {activeChapter === 5 && (
            <div className="space-y-6">
              <div>
                <span className="text-xs font-mono text-zinc-400 uppercase tracking-wider">Chapter 05</span>
                <h2 className="text-2xl font-editorial text-white mt-1">Safety, Performance &amp; FAQs</h2>
                <p className="text-xs text-zinc-400 mt-1">Thermal Budgets, Accessibility &amp; Diagnostic Protocol</p>
              </div>

              <div className="space-y-6 text-sm text-zinc-300 leading-relaxed">
                <div className="space-y-3">
                  <h3 className="text-sm font-semibold text-white flex items-center gap-2">
                    <Shield className="w-4 h-4 text-emerald-400" />
                    How to Respect <code className="font-mono text-xs">prefers-reduced-motion</code>
                  </h3>
                  <p className="text-xs text-zinc-400">
                    Users with vestibular sensitivities can request reduced motion via their operating system. With Silk, you can seamlessly honor this setting by clamping speed to 0:
                  </p>
                  <pre className="p-3.5 rounded-xl bg-[#090a0f] border border-white/10 text-xs font-mono text-zinc-200 overflow-x-auto">
                    {`const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
<Silk speed={prefersReducedMotion ? 0 : 5} />`}
                  </pre>
                </div>

                <div className="space-y-3 border-t border-white/10 pt-4">
                  <h3 className="text-sm font-semibold text-white">Why is my Canvas completely white or black?</h3>
                  <p className="text-xs text-zinc-400">
                    Check these common points:
                  </p>
                  <ul className="text-xs text-zinc-400 space-y-1.5 list-disc pl-5">
                    <li><strong className="text-zinc-200">Zero Parent Height:</strong> Does the parent container have <code className="font-mono text-zinc-300">h-full</code> or a fixed pixel height?</li>
                    <li><strong className="text-zinc-200">Color Syntax:</strong> Verify that the hex color starts with a <code className="font-mono text-zinc-300">#</code> (e.g. <code className="font-mono text-zinc-300">#7B7481</code>). The helper automatically handles 3 or 6 hex digits.</li>
                    <li><strong className="text-zinc-200">Three.js Version:</strong> Compatible with Three.js r128 through r170+.</li>
                  </ul>
                </div>

                <div className="space-y-3 border-t border-white/10 pt-4">
                  <h3 className="text-sm font-semibold text-white">Multiple Canvas Instances</h3>
                  <p className="text-xs text-zinc-400">
                    WebGL contexts have hardware limits per browser tab (usually 8 to 16). For optimal memory consumption, do not create more than 2–3 active Silk instances simultaneously. Prefer full-width backdrops or reuse a single fixed background canvas across sections.
                  </p>
                </div>
              </div>
            </div>
          )}
        </article>
      </div>
    </div>
  );
};
