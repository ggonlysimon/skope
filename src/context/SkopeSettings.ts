export interface SkopePackageItem {
  id: string;
  name: string;
  price: string;
  period: string;
  badge: string;
  description: string;
  popular: boolean;
  flagship?: boolean;
  category?: 'core' | 'business' | 'custom';
  features: string[];
  cta: string;
}

export interface SkopeOfferingItem {
  id: string;
  title: string;
  pillar: 'build' | 'automate' | 'grow';
  tag: string;
  desc: string;
  highlights: string[];
  featured?: boolean;
  iconName: 'Globe' | 'Bot' | 'Smartphone' | 'Brain' | 'Cog' | 'MessageSquare' | 'TrendingUp' | 'Wrench' | 'Gem' | 'Zap' | 'Shield' | 'Sparkles';
}

export interface SkopeAppSettings {
  brandName: string;
  motto: string;
  announcement: {
    enabled: boolean;
    text: string;
    linkText?: string;
  };
  contactEmail: string;
  discordInviteUrl: string;
  heroHeadline: string;
  heroSubheadline: string;
  verificationSettings?: {
    senderName: string;
    senderService: string;
    customMasterCode?: string;
  };
  packages: SkopePackageItem[];
  offerings: SkopeOfferingItem[];
}

export const INITIAL_SKOPE_SETTINGS: SkopeAppSettings = {
  brandName: 'Skope',
  motto: 'build. automate. grow.',
  announcement: {
    enabled: false,
    text: '',
    linkText: '',
  },
  contactEmail: 'contact@skope.dev',
  discordInviteUrl: 'https://discord.gg',
  heroHeadline: 'Skope',
  heroSubheadline: 'We combine web & Android development, custom Discord bots, agentic AI, and automated workflows to build practical solutions that scale.',
  verificationSettings: {
    senderName: 'Skope Integrations',
    senderService: 'Gmail',
    customMasterCode: 'SKOPE2026',
  },
  packages: [
    {
      id: 'basic',
      name: 'Basic',
      price: '$3.50',
      period: 'package',
      badge: 'Starter',
      description: 'Essential starter tier for initial setups, minor bot configurations, or entry-level community adjustments.',
      popular: false,
      features: [
        'Entry Discord Server / Bot Configuration',
        'Basic Auto-Response & Welcome Rules',
        'Role Setup & Permission Auditing',
        'Quick Turnaround Delivery',
      ],
      cta: 'Order Basic',
    },
    {
      id: 'advanced',
      name: 'Advanced',
      price: '$6.00',
      period: 'package',
      badge: 'Popular',
      description: 'Intermediate solution with expanded bot commands, custom web embeds, and enhanced community structures.',
      popular: false,
      features: [
        'Custom Discord Commands & Moderation',
        'Enhanced Server Architecture & Security',
        'Webhook Notifications Integration',
        'Basic Member Onboarding Flow',
      ],
      cta: 'Order Advanced',
    },
    {
      id: 'growth',
      name: 'Growth',
      price: '$9.00',
      period: 'package',
      badge: 'Growth Engine',
      description: 'Engineered for scaling projects needing audience acquisition systems, verified flows, and automated loops.',
      popular: true,
      features: [
        'Full Member Growth & Onboarding Setup',
        'Verification Gates & Anti-Raid Hardening',
        'Automated Engagement & Retention Systems',
        'Custom Bot Logic & Ticket System',
        '14 Days Priority Support',
      ],
      cta: 'Order Growth',
    },
    {
      id: 'exclusive',
      name: 'Exclusive',
      price: '$14.00',
      period: 'package',
      badge: 'High Value',
      description: 'High-tier comprehensive delivery spanning custom development, web interfaces, and bespoke automations.',
      popular: false,
      features: [
        'Custom Website or Interactive Web Page',
        'Advanced Bot with Database Persistence',
        'Custom Workflow Automations & Webhooks',
        'Full Aesthetic Branding & Role Icons',
        'Priority Development SLA',
      ],
      cta: 'Order Exclusive',
    },
    {
      id: 'premium',
      name: 'Premium',
      price: '$18.00',
      period: 'package',
      badge: 'Pro Tier',
      description: 'Comprehensive digital infrastructure: Agentic AI integrations, custom bot networks, and multi-channel automations.',
      popular: false,
      features: [
        'Agentic AI Integration & Tool-Calling Agents',
        'Multi-Bot Discord Network Setup',
        'Full-Stack Web App or Android App Support',
        'End-to-End Business Flow Automation',
        '30 Days Dedicated Maintenance',
      ],
      cta: 'Order Premium',
    },
    {
      id: 'skope-pro',
      name: 'Skope Pro',
      price: '$19.99',
      period: 'flagship',
      badge: 'VIP Flagship',
      category: 'core',
      description: 'The ultimate all-inclusive Skope experience: Full-spectrum development, VIP engineering priority, and maximum scaling.',
      popular: false,
      flagship: true,
      features: [
        'Everything in Premium + Unlimited Retainers',
        'Autonomous AI Agents & Custom Workflows',
        'Full Android App & Custom Web Platform',
        'Complete Discord Server & Bot Mastery',
        'VIP Direct Line & Same-Day Revisions',
        'Continuous Growth Coaching & Strategy',
      ],
      cta: 'Unlock Skope Pro',
    },
    {
      id: 'biz-starter',
      name: 'Business Foundation',
      price: '$49.00',
      period: 'turnkey setup',
      badge: 'Business Setup',
      category: 'business',
      description: 'Complete commercial launch kit for solo entrepreneurs, service providers, and creators ready to monetize skills and collect payments.',
      popular: false,
      features: [
        'Branded High-Converting Booking & Landing Site',
        'Automated Invoicing & Stripe/PayPal Checkout Flow',
        'Customer Support Discord Server / Helpdesk Bot',
        'Lead Capture Auto-Responder Pipeline',
        'Commercial Licensing & 30-Day Launch Support',
      ],
      cta: 'Launch Business',
    },
    {
      id: 'biz-growth',
      name: 'Business Automation Suite',
      price: '$99.00',
      period: 'enterprise package',
      badge: 'High ROI',
      category: 'business',
      description: 'Engineered for scaling businesses needing automated sales funnels, CRM sync, autonomous AI customer handlers, and dedicated cloud hosting.',
      popular: true,
      features: [
        '24/7 Agentic AI Customer Support & Booking Bot',
        'Custom Web Portal with Client Login & Dashboards',
        'Multi-Channel Lead Sync (Email + Discord + Web)',
        'Automated Customer Review & Referral Loop',
        'Google Workspace & Payment Gateways Integration',
        '60-Day Priority Engineering SLA & Monitoring',
      ],
      cta: 'Get Business Suite',
    },
    {
      id: 'biz-scale',
      name: 'Commercial Empire Tier',
      price: '$179.00',
      period: 'turnkey enterprise',
      badge: 'Full Solution',
      category: 'business',
      description: 'End-to-end bespoke digital ecosystem for established brands or entrepreneurs scaling into full-time automated income.',
      popular: false,
      flagship: true,
      features: [
        'Full-Stack Web Application + Android Mobile APK',
        'Complete Autonomous AI Agent Workforce (Ops + Sales)',
        'Custom High-Volume Discord Community Architecture',
        'Continuous White-Glove Retainer & Dev Priority',
        'Direct Private Slack/Discord Line with Lead Engineers',
        'Quarterly Growth Audits & Feature Roadmap Execution',
      ],
      cta: 'Scale Your Empire',
    },
  ],
  offerings: [
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
  ],
};

const STORAGE_KEY = 'skope_app_live_config_v2';

export function loadSkopeSettings(): SkopeAppSettings {
  try {
    const raw = localStorage.getItem(STORAGE_KEY) || localStorage.getItem('skope_app_live_config_v1');
    if (!raw) return INITIAL_SKOPE_SETTINGS;
    const parsed = JSON.parse(raw);
    
    // Ensure all new business packages exist even if the user had an older saved state
    let loadedPackages: SkopePackageItem[] = Array.isArray(parsed.packages) && parsed.packages.length > 0 
      ? parsed.packages 
      : INITIAL_SKOPE_SETTINGS.packages;

    const existingIds = new Set(loadedPackages.map(p => p.id));
    const missingDefaults = INITIAL_SKOPE_SETTINGS.packages.filter(p => !existingIds.has(p.id));
    if (missingDefaults.length > 0) {
      loadedPackages = [...loadedPackages, ...missingDefaults];
    }

    return {
      ...INITIAL_SKOPE_SETTINGS,
      ...parsed,
      announcement: {
        ...INITIAL_SKOPE_SETTINGS.announcement,
        ...(parsed.announcement || {}),
      },
      packages: loadedPackages,
      offerings: Array.isArray(parsed.offerings) && parsed.offerings.length > 0 
        ? parsed.offerings 
        : INITIAL_SKOPE_SETTINGS.offerings,
    };
  } catch (err) {
    console.error('Failed to parse Skope settings, falling back to default:', err);
    return INITIAL_SKOPE_SETTINGS;
  }
}

export function saveSkopeSettings(settings: SkopeAppSettings): void {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(settings));
  } catch (err) {
    console.error('Failed to save Skope settings to storage:', err);
  }
}

export function resetSkopeSettings(): SkopeAppSettings {
  try {
    localStorage.removeItem(STORAGE_KEY);
  } catch (err) {
    console.error('Failed to reset Skope settings:', err);
  }
  return INITIAL_SKOPE_SETTINGS;
}
