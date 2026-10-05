import React from 'react';
import { 
  Target, 
  Sparkles, 
  Globe, 
  Smartphone, 
  Bot, 
  MessageSquare, 
  Cog, 
  Brain, 
  TrendingUp, 
  Wrench, 
  ShieldCheck, 
  Zap,
  CheckCircle2,
  ArrowRight
} from 'lucide-react';

interface AboutPageProps {
  onSecretTrigger?: () => void;
}

export const AboutPage: React.FC<AboutPageProps> = ({ onSecretTrigger }) => {
  const capabilities = [
    { name: 'Websites & Web Apps', icon: Globe },
    { name: 'Android Apps', icon: Smartphone },
    { name: 'Discord Bots', icon: Bot },
    { name: 'Discord Server Setup', icon: MessageSquare },
    { name: 'Automation Workflows', icon: Cog },
    { name: 'AI Agents & Agentic AI', icon: Brain },
    { name: 'Member Growth & Retention', icon: TrendingUp },
    { name: 'Custom Development', icon: Wrench, isCustomDev: true },
  ];

  return (
    <section className="space-y-12 max-w-4xl mx-auto font-sans">
      {/* Brand Hero Header */}
      <div className="border-b border-white/10 pb-8 text-center sm:text-left space-y-4">
        <div className="flex items-center justify-center sm:justify-start gap-2 text-xs font-sans text-blue-400 uppercase tracking-wider font-bold">
          <span>Brand Overview</span>
          <span aria-hidden="true">·</span>
          <span>Build • Automate • Grow</span>
        </div>
        
        <h2 className="text-3xl sm:text-5xl font-sans font-extrabold text-white tracking-tight">
          About Skope
        </h2>

        <p className="text-zinc-200 text-base sm:text-lg leading-relaxed font-normal">
          <strong className="text-white font-bold">Skope</strong> is a modern digital development brand focused on helping creators, communities, and businesses <strong className="text-blue-300 font-semibold">build, automate, and grow</strong>. We provide a range of digital services, from custom websites and Android apps to Discord bots, server setups, automation, AI agents, agentic AI solutions, and custom development.
        </p>

        <p className="text-zinc-300 text-sm sm:text-base leading-relaxed font-normal">
          Skope is built around making technology <strong className="text-white font-semibold">simple, useful, and accessible</strong>. Whether you need a new website, a powerful Discord bot, an automated system, an AI-powered solution, or help growing your community, Skope aims to turn your ideas into working digital products.
        </p>

        <div className="pt-2 flex items-center justify-center sm:justify-start">
          <div className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-blue-600/20 border border-blue-400/30 text-xs sm:text-sm font-sans uppercase tracking-widest text-blue-300 font-bold">
            <span>Skope — Build • Automate • Grow.</span>
          </div>
        </div>
      </div>

      {/* The 3 Core Pillars */}
      <div className="space-y-4">
        <div className="text-xs font-sans uppercase tracking-widest text-blue-400 font-bold">
          How We Work
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="p-6 rounded-3xl bg-white/[0.03] border border-blue-500/20 space-y-3">
            <div className="w-10 h-10 rounded-xl bg-blue-600/20 text-blue-400 flex items-center justify-center font-sans font-black text-sm">
              01
            </div>
            <h3 className="text-2xl font-sans font-extrabold text-white">
              Build.
            </h3>
            <p className="text-xs sm:text-sm text-zinc-300 leading-relaxed font-normal">
              From responsive websites and interactive web apps to polished Android applications and organized Discord servers.
            </p>
          </div>

          <div className="p-6 rounded-3xl bg-white/[0.03] border border-blue-500/20 space-y-3">
            <div className="w-10 h-10 rounded-xl bg-blue-600/20 text-blue-400 flex items-center justify-center font-sans font-black text-sm">
              02
            </div>
            <h3 className="text-2xl font-sans font-extrabold text-white">
              Automate.
            </h3>
            <p className="text-xs sm:text-sm text-zinc-300 leading-relaxed font-normal">
              Autonomous AI agents, custom Discord bots, and continuous backend workflows that take care of routine operations 24/7.
            </p>
          </div>

          <div className="p-6 rounded-3xl bg-white/[0.03] border border-blue-500/20 space-y-3">
            <div className="w-10 h-10 rounded-xl bg-blue-600/20 text-blue-400 flex items-center justify-center font-sans font-black text-sm">
              03
            </div>
            <h3 className="text-2xl font-sans font-extrabold text-white">
              Grow.
            </h3>
            <p className="text-xs sm:text-sm text-zinc-300 leading-relaxed font-normal">
              Member onboarding funnels, viral community engagement loops, and digital strategies to sustainably expand your audience.
            </p>
          </div>
        </div>
      </div>

      {/* Services Spectrum Matrix */}
      <div className="p-8 sm:p-10 rounded-3xl bg-blue-950/40 border border-blue-500/30 space-y-6">
        <h4 className="text-xl font-sans font-bold text-white flex items-center gap-2.5">
          <Target className="w-5 h-5 text-blue-400" />
          <span>Complete Digital Services Spectrum</span>
        </h4>
        <p className="text-xs sm:text-sm text-zinc-300 leading-relaxed font-normal">
          Every project is built with clean architecture, high uptime, and intuitive interfaces designed to bring tangible value to your venture.
        </p>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-2">
          {capabilities.map((c, idx) => (
            <div
              key={idx}
              className="p-3.5 rounded-2xl bg-white/[0.04] border border-white/10 flex flex-col items-center text-center gap-2 hover:bg-white/[0.08] transition-colors"
            >
              <c.icon className="w-5 h-5 text-blue-400" />
              <div className="flex items-center justify-center">
                <span className="text-xs font-sans font-medium text-zinc-200">{c.name}</span>
                {c.isCustomDev && (
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      onSecretTrigger?.();
                    }}
                    title=""
                    aria-label="system"
                    className="inline-block w-1.5 h-1.5 rounded-full bg-zinc-600 hover:bg-zinc-400 ml-1.5 align-middle cursor-default transition-colors p-0 border-0 outline-none"
                  />
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
