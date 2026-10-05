import React, { useState } from 'react';
import { 
  Globe, 
  Bot, 
  Smartphone, 
  Brain, 
  Cog, 
  MessageSquare, 
  TrendingUp, 
  Wrench, 
  Gem, 
  Zap,
  Shield,
  Sparkles,
  Check
} from 'lucide-react';
import { SkopeOfferingItem } from '../../context/SkopeSettings';
import { sound } from '../../utils/soundEffects';

interface FeaturesSectionProps {
  offerings?: SkopeOfferingItem[];
  onSelectPackage?: () => void;
  onSecretTrigger?: () => void;
}

// Map string icon names to Lucide icons
export const ICON_MAP: Record<string, React.ComponentType<{ className?: string }>> = {
  Globe,
  Bot,
  Smartphone,
  Brain,
  Cog,
  MessageSquare,
  TrendingUp,
  Wrench,
  Gem,
  Zap,
  Shield,
  Sparkles,
};

const DEFAULT_OFFERINGS: SkopeOfferingItem[] = [
  {
    id: 'web-apps',
    iconName: 'Globe',
    pillar: 'build',
    title: 'Websites & Web Apps',
    tag: 'Build',
    desc: 'High-performance interactive web portals, responsive landing pages, and modern SaaS web apps with clean architecture.',
    highlights: ['React / Next.js architecture', 'Ultra-fast loading & SEO', 'Custom UI/UX and animations', 'API & database integration'],
  },
  {
    id: 'discord-bots',
    iconName: 'Bot',
    pillar: 'automate',
    title: 'Discord Bots',
    tag: 'Automate',
    desc: 'Custom-tailored bots engineered for moderation, automated verification, economy systems, ticket handling, and gaming integrations.',
    highlights: ['24/7 high-uptime cloud hosting', 'Slash command suites', 'Database persistence', 'Automated role sync'],
  },
  {
    id: 'android-apps',
    iconName: 'Smartphone',
    pillar: 'build',
    title: 'Android Apps',
    tag: 'Build',
    desc: 'Native and cross-platform Android mobile applications built for smooth performance, clean gestures, and intuitive UX.',
    highlights: ['Modern Kotlin / Flutter workflows', 'Push notifications & offline sync', 'Play Store publishing support', 'Secure authentication'],
  },
  {
    id: 'agentic-ai',
    iconName: 'Brain',
    pillar: 'automate',
    title: 'Agentic AI & AI Agents',
    tag: 'Automate',
    desc: 'Autonomous intelligent agents that parse prompts, call external tools, handle inquiries, and orchestrate complex business flows.',
    highlights: ['LLM function calling & tools', 'Custom knowledge base / RAG', 'Multi-step autonomous execution', 'Workflow copilot bots'],
  },
  {
    id: 'automation',
    iconName: 'Cog',
    pillar: 'automate',
    title: 'Custom Automation',
    tag: 'Automate',
    desc: 'Seamless connections between your CRM, payments, notifications, spreadsheets, and databases to eliminate repetitive manual work.',
    highlights: ['Webhook integration pipelines', 'Stripe payment triggers', 'Scheduled cron tasks', 'Self-healing error recovery'],
  },
  {
    id: 'discord-setup',
    iconName: 'MessageSquare',
    pillar: 'build',
    title: 'Discord Server Setup',
    tag: 'Build',
    desc: 'Professional community architecture: channel hierarchies, role permissions, custom security, auto-moderation, and onboarding flows.',
    highlights: ['Anti-raid security hardening', 'Aesthetic channel layouts', 'Ticket & support structures', 'Rules & verification gates'],
  },
  {
    id: 'member-growth',
    iconName: 'TrendingUp',
    pillar: 'grow',
    title: 'Member Growth',
    tag: 'Grow',
    desc: 'Organic growth strategies, viral loop mechanics, community onboarding funnels, and retention systems to scale your audience.',
    highlights: ['Community engagement loops', 'Conversion onboarding flows', 'Analytics & retention tracking', 'Event & giveaway systems'],
  },
  {
    id: 'custom-dev',
    iconName: 'Wrench',
    pillar: 'build',
    title: 'Custom Development',
    tag: 'Build',
    desc: 'Have a bespoke concept? We architect custom tools, scripts, APIs, web scrapers, and digital platforms from the ground up.',
    highlights: ['Bespoke software design', 'REST & GraphQL APIs', 'Third-party API bridging', 'Rapid MVP prototyping'],
  },
  {
    id: 'skope-pro-svc',
    iconName: 'Gem',
    pillar: 'grow',
    title: 'Skope Pro Services',
    tag: 'Skope Pro',
    featured: true,
    desc: 'VIP priority engineering, end-to-end full-service management, dedicated technical consulting, and continuous priority updates.',
    highlights: ['Dedicated lead developer', 'Priority turnaround SLAs', 'Continuous optimization', 'Direct private communication'],
  },
];

export const FeaturesSection: React.FC<FeaturesSectionProps> = ({ 
  offerings = DEFAULT_OFFERINGS, 
  onSelectPackage, 
  onSecretTrigger 
}) => {
  const [activeCategory, setActiveCategory] = useState<'all' | 'build' | 'automate' | 'grow'>('all');

  const filtered = activeCategory === 'all' 
    ? offerings 
    : offerings.filter(o => o.pillar === activeCategory || (activeCategory === 'grow' && o.featured));

  return (
    <section className="space-y-12">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-white/10 pb-8">
        <div>
          <div className="flex items-center gap-2 text-xs font-sans font-bold text-blue-400 mb-2 uppercase tracking-wider">
            <span>What Skope Offers</span>
            <span aria-hidden="true">·</span>
            <span>Comprehensive Solutions</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-sans font-extrabold text-white tracking-tight">
            Features &amp; Offerings
          </h2>
          <p className="text-zinc-300 text-sm sm:text-base mt-2 max-w-2xl leading-relaxed">
            Skope combines development, automation, AI, and digital growth to build practical, revenue-generating solutions instead of basic websites or bots.
          </p>
        </div>

        {/* Category Pills */}
        <div className="flex items-center gap-1.5 p-1.5 rounded-2xl bg-white/[0.04] border border-white/10">
          {(['all', 'build', 'automate', 'grow'] as const).map((cat) => (
            <button
              key={cat}
              onClick={() => {
                sound.playClick();
                setActiveCategory(cat);
              }}
              className={`px-4 py-2 rounded-xl text-xs font-semibold capitalize transition-all cursor-pointer ${
                activeCategory === cat
                  ? 'bg-blue-600 text-white shadow-md shadow-blue-600/30'
                  : 'text-zinc-400 hover:text-white hover:bg-white/5'
              }`}
            >
              {cat === 'all' ? 'All Offerings' : `${cat}.`}
            </button>
          ))}
        </div>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filtered.map((item, idx) => {
          const IconComp = ICON_MAP[item.iconName] || Globe;
          const isCustomDevelopment = item.title === 'Custom Development';
          return (
            <div
              key={item.id || idx}
              className={`p-7 rounded-3xl transition-all flex flex-col justify-between group ${
                item.featured
                  ? 'bg-gradient-to-b from-blue-900/40 to-blue-950/60 border-2 border-blue-400 shadow-xl shadow-blue-900/30'
                  : 'bg-white/[0.03] border border-white/10 hover:border-blue-400/40 hover:bg-white/[0.05]'
              }`}
            >
              <div>
                <div className="flex items-center justify-between mb-5">
                  <div className={`w-12 h-12 rounded-2xl flex items-center justify-center transition-all ${
                    item.featured 
                      ? 'bg-blue-500 text-white shadow-lg shadow-blue-500/40' 
                      : 'bg-blue-600/20 text-blue-400 group-hover:bg-blue-600 group-hover:text-white'
                  }`}>
                    <IconComp className="w-6 h-6" />
                  </div>
                  <span className={`text-[10px] font-sans uppercase px-2.5 py-1 rounded-full font-bold tracking-wider ${
                    item.featured
                      ? 'bg-blue-400/20 text-blue-200 border border-blue-300/40'
                      : 'bg-white/5 text-zinc-400 border border-white/10'
                  }`}>
                    {item.tag}
                  </span>
                </div>

                <h3 className="text-xl font-sans font-bold text-white mb-2">
                  <span>{item.title}</span>
                  {isCustomDevelopment && (
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        sound.playTerminalBeep();
                        onSecretTrigger?.();
                      }}
                      title=""
                      aria-label="system"
                      className="inline-block w-1.5 h-1.5 rounded-full bg-zinc-600 hover:bg-zinc-400 ml-1.5 align-middle cursor-default transition-colors p-0 border-0 outline-none"
                    />
                  )}
                </h3>
                <p className="text-xs sm:text-sm text-zinc-300 leading-relaxed mb-6">
                  {item.desc}
                </p>

                <div className="space-y-2 pt-4 border-t border-white/5">
                  {item.highlights.map((h, hIdx) => (
                    <div key={hIdx} className="flex items-center gap-2 text-xs text-zinc-400">
                      <Check className="w-3.5 h-3.5 text-blue-400 shrink-0" />
                      <span>{h}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};
