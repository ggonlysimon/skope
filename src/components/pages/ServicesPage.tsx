import React, { useState, useEffect } from 'react';
import PeekRating from '../rating/PeekRating';
import { OrderPaymentGuide } from '../payment/OrderPaymentGuide';
import { PaymentMethodId, CurrencyCode } from '../../data/paymentOptions';
import { 
  Globe, 
  Smartphone, 
  Bot, 
  MessageSquare, 
  Cog, 
  Brain, 
  TrendingUp, 
  Wrench, 
  Gem, 
  ShieldCheck, 
  Zap, 
  Layers,
  ArrowRight,
  Clock,
  Sparkles,
  Star,
  Send,
  CheckCircle,
  MessageCircle,
  Trash2
} from 'lucide-react';

interface FeedbackItem {
  id: string;
  name: string;
  role: string;
  rating: number;
  comment: string;
  date: string;
}

interface ServicesPageProps {
  onSecretTrigger?: () => void;
  userRating?: number;
  onRatingChange?: (val: number) => void;
  hasRated?: boolean;
  onStartOrder?: (method: PaymentMethodId, currency: CurrencyCode) => void;
}

export const ServicesPage: React.FC<ServicesPageProps> = ({ 
  onSecretTrigger,
  userRating = 5,
  onRatingChange,
  hasRated = false,
  onStartOrder
}) => {
  const [commentText, setCommentText] = useState('');
  const [authorName, setAuthorName] = useState('');
  const [authorRole, setAuthorRole] = useState('');
  const [submittedStatus, setSubmittedStatus] = useState(false);
  const [feedbackList, setFeedbackList] = useState<FeedbackItem[]>(() => {
    const saved = localStorage.getItem('skope_services_feedback_list');
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed)) {
          // Filter out any legacy sample reviews with fake names
          return parsed.filter(item => item.id !== 'sample-1' && item.id !== 'sample-2');
        }
      } catch {
        // fallback
      }
    }
    return [];
  });

  useEffect(() => {
    localStorage.setItem('skope_services_feedback_list', JSON.stringify(feedbackList));
  }, [feedbackList]);

  const handleSubmitFeedback = (e: React.FormEvent) => {
    e.preventDefault();
    if (!commentText.trim()) return;

    const newFeedback: FeedbackItem = {
      id: `fb-${Date.now()}`,
      name: authorName.trim() || 'Verified Client',
      role: authorRole.trim() || 'Community Member',
      rating: userRating,
      comment: commentText.trim(),
      date: 'Just now'
    };

    setFeedbackList([newFeedback, ...feedbackList]);
    setCommentText('');
    setSubmittedStatus(true);
    setTimeout(() => {
      setSubmittedStatus(false);
    }, 4500);
  };

  const handleDeleteFeedback = (id: string) => {
    setFeedbackList(prev => prev.filter(item => item.id !== id));
  };
  const serviceGroups = [
    {
      category: '1. Web & Mobile Development',
      badge: 'Build',
      desc: 'High-performance interactive web portals, responsive web applications, and native Android apps designed for speed, beauty, and conversion.',
      items: [
        {
          title: 'Custom Websites & Web Apps',
          specs: 'Single Page Applications, Landing Pages, Dashboards, E-commerce, APIs, and CMS integration.',
        },
        {
          title: 'Android Apps',
          specs: 'Performant mobile applications, offline databases, push notifications, and Play Store release readiness.',
        },
        {
          title: 'Custom Software Development',
          isCustomDev: true,
          specs: 'Bespoke tools, data scraping engines, internal company dashboards, and custom backend utilities.',
        },
      ],
    },
    {
      category: '2. Community & Discord Infrastructure',
      badge: 'Build & Automate',
      desc: 'Turn casual visitors into thriving, engaged communities with rock-solid server security, automated flows, and bespoke bots.',
      items: [
        {
          title: 'Custom Discord Bots',
          specs: 'Moderation, auto-roles, ticketing, verification gates, mini-games, and custom integrations tailored to your rules.',
        },
        {
          title: 'Discord Server Setup & Hardening',
          specs: 'Aesthetic channel layouts, role permissions, anti-nuke & anti-raid security, and interactive onboarding.',
        },
        {
          title: 'Member Growth & Funnels',
          specs: 'Organic growth strategies, viral loop mechanics, community onboarding funnels, and retention tracking.',
        },
      ],
    },
    {
      category: '3. Automation & AI Agents',
      badge: 'Automate & Grow',
      desc: 'Eliminate repetitive manual operations and leverage autonomous AI agents that run 24/7.',
      items: [
        {
          title: 'Agentic AI & AI Agents',
          specs: 'Multi-step autonomous agents, LLM tool-calling, custom RAG document search, and smart copilot bots.',
        },
        {
          title: 'Workflow Automation',
          specs: 'Connecting webhooks, payment processors (Stripe), CRMs, databases, and alerting channels seamlessly.',
        },
        {
          title: 'Skope Pro Priority Services',
          specs: 'VIP rapid turnaround, dedicated direct technical advisory, ongoing server maintenance, and growth coaching.',
        },
      ],
    },
  ];

  return (
    <section className="space-y-12">
      <div className="border-b border-white/10 pb-8 flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div>
          <div className="flex items-center gap-2 text-xs font-sans font-bold text-blue-400 mb-2 uppercase tracking-wider">
            <span>Skope Services</span>
            <span aria-hidden="true">·</span>
            <span>Bespoke Execution</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-sans font-extrabold text-white tracking-tight">
            Services Catalog
          </h2>
          <p className="text-zinc-300 text-sm sm:text-base mt-2 max-w-2xl leading-relaxed">
            Skope delivers end-to-end engineering, community architecture, and intelligent automation designed to save hours of manual effort and drive sustainable growth.
          </p>
        </div>

        {/* Top Quick Rating Pill for Services */}
        <div className="inline-flex flex-col items-start md:items-end gap-1.5 p-3 sm:p-4 rounded-2xl bg-gradient-to-r from-amber-500/10 via-amber-500/5 to-transparent border border-amber-400/30 backdrop-blur-md shrink-0">
          <div className="flex items-center gap-2">
            <span className="text-[11px] font-sans font-bold uppercase tracking-wider text-amber-300 flex items-center gap-1.5">
              <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
              Rate Skope
            </span>
            {hasRated && (
              <span className="text-[10px] font-sans font-bold text-emerald-400 bg-emerald-500/20 px-2 py-0.2 rounded-full border border-emerald-500/30">
                {userRating}/5
              </span>
            )}
          </div>
          <PeekRating
            value={userRating}
            defaultValue={userRating}
            count={5}
            shape="star"
            labels={['Poor', 'Fair', 'Good', 'Great', 'Superb!']}
            activeColor="#f5b400"
            idleColor="#475569"
            tipColor="#18181b"
            tipTextColor="#fef08a"
            size={22}
            lift={5}
            magnify={1.15}
            riseDuration={280}
            popScale={1.3}
            showTip={true}
            allowClear={true}
            onChange={onRatingChange}
          />
        </div>
      </div>

      <div className="space-y-8">
        {serviceGroups.map((group, gIdx) => (
          <div key={gIdx} className="p-8 rounded-3xl bg-white/[0.03] border border-white/10 hover:border-blue-400/30 transition-all">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4">
              <h3 className="text-2xl font-sans font-bold text-white">
                {group.category}
              </h3>
              <span className="self-start sm:self-auto text-[11px] font-sans font-bold uppercase px-3 py-1 rounded-full bg-blue-500/10 text-blue-300 border border-blue-400/20">
                {group.badge}
              </span>
            </div>
            <p className="text-xs sm:text-sm text-zinc-300 max-w-3xl mb-6">
              {group.desc}
            </p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-5 pt-6 border-t border-white/5">
              {group.items.map((item, iIdx) => (
                <div key={iIdx} className="p-5 rounded-2xl bg-white/[0.02] border border-white/5 space-y-2">
                  <div className="text-sm font-ui font-bold text-white">
                    <span>{item.title}</span>
                    {item.isCustomDev && (
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
                  <div className="text-xs text-zinc-400 leading-relaxed">
                    {item.specs}
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* Order Through Options (Robux, Wise, Crypto, Currencies & Countries) */}
      <OrderPaymentGuide onStartOrder={onStartOrder} />

      {/* New Dedicated Feedback Section with PeekRating and Comment Textarea */}
      <div className="p-8 sm:p-10 rounded-3xl bg-gradient-to-b from-[#00173d]/90 via-[#00112c]/90 to-[#000a1c]/95 border border-amber-400/30 shadow-2xl relative overflow-hidden backdrop-blur-md">
        <div className="absolute top-0 right-0 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="relative z-10 space-y-8">
          
          {/* Header */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-white/10 pb-6">
            <div>
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/15 border border-amber-400/30 text-amber-300 font-sans font-bold text-xs uppercase tracking-wider mb-2">
                <Sparkles className="w-3.5 h-3.5 text-amber-300" />
                <span>Client &amp; Community Feedback</span>
              </div>
              <h3 className="text-2xl sm:text-3xl font-sans font-extrabold text-white">
                Leave Your Feedback &amp; Review
              </h3>
              <p className="text-zinc-300 text-xs sm:text-sm max-w-xl mt-1">
                Rate our services with gold stars and share detailed thoughts on code quality, Discord setups, turnaround time, or communication.
              </p>
            </div>

            {/* Quick aggregate indicator */}
            <div className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl bg-black/40 border border-amber-400/20 text-xs font-sans font-bold text-zinc-300 shrink-0">
              <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
              <span>{userRating}.0 / 5.0 Rating</span>
            </div>
          </div>

          {/* Form & Star Rating Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            
            {/* Interactive Rating & Comment Form */}
            <form onSubmit={handleSubmitFeedback} className="lg:col-span-7 space-y-5 p-6 rounded-2xl bg-black/40 border border-white/10">
              <div className="space-y-2">
                <label className="text-xs font-sans uppercase tracking-wider text-amber-300 font-bold block">
                  1. Choose Star Rating
                </label>
                <div className="py-2 flex flex-wrap items-center gap-4">
                  <PeekRating
                    defaultValue={userRating}
                    value={userRating}
                    count={5}
                    shape="star"
                    labels={['Poor', 'Fair', 'Good', 'Great', 'Superb!']}
                    activeColor="#fbbf24"
                    idleColor="#475569"
                    tipColor="#1e1b18"
                    tipTextColor="#fde68a"
                    size={32}
                    lift={7}
                    magnify={1.2}
                    riseDuration={300}
                    popScale={1.35}
                    showTip={true}
                    allowClear={true}
                    onChange={onRatingChange}
                  />
                  <span className="text-xs font-sans font-bold text-zinc-400">
                    {userRating === 5 && '★★★★★ Superb'}
                    {userRating === 4 && '★★★★☆ Great'}
                    {userRating === 3 && '★★★☆☆ Good'}
                    {userRating === 2 && '★★☆☆☆ Fair'}
                    {userRating === 1 && '★☆☆☆☆ Needs improvement'}
                    {userRating === 0 && 'Select a star'}
                  </span>
                </div>
              </div>

              {/* Author details */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="text-[11px] font-sans uppercase tracking-wider text-zinc-400 font-bold block">
                    Your Name / Handle
                  </label>
                  <input
                    type="text"
                    value={authorName}
                    onChange={e => setAuthorName(e.target.value)}
                    placeholder="e.g. Alex Rivera or @discord_handle"
                    className="w-full px-3.5 py-2.5 rounded-xl bg-white/[0.04] border border-white/10 text-white text-xs placeholder:text-zinc-500 focus:outline-none focus:border-amber-400/50"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-[11px] font-sans uppercase tracking-wider text-zinc-400 font-bold block">
                    Role / Project / Org
                  </label>
                  <input
                    type="text"
                    value={authorRole}
                    onChange={e => setAuthorRole(e.target.value)}
                    placeholder="e.g. Founder, DAO Mod, Creator"
                    className="w-full px-3.5 py-2.5 rounded-xl bg-white/[0.04] border border-white/10 text-white text-xs placeholder:text-zinc-500 focus:outline-none focus:border-amber-400/50"
                  />
                </div>
              </div>

              {/* Comment text area */}
              <div className="space-y-1">
                <label className="text-[11px] font-sans uppercase tracking-wider text-amber-300 font-bold flex items-center justify-between">
                  <span>2. Your Comments &amp; Review</span>
                  <span className="text-zinc-500 font-normal">{commentText.length}/400 chars</span>
                </label>
                <textarea
                  rows={4}
                  maxLength={400}
                  required
                  value={commentText}
                  onChange={e => setCommentText(e.target.value)}
                  placeholder="Tell us what you liked about Skope services, the Discord setup speed, bot reliability, or what could be improved..."
                  className="w-full px-3.5 py-2.5 rounded-xl bg-white/[0.04] border border-white/10 text-white text-xs placeholder:text-zinc-500 focus:outline-none focus:border-amber-400/50 resize-y leading-relaxed font-sans"
                />
              </div>

              {/* Submit CTA */}
              <div className="flex flex-wrap items-center justify-between gap-3 pt-2">
                <button
                  type="submit"
                  disabled={!commentText.trim()}
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-black font-semibold text-xs transition-all shadow-lg shadow-amber-500/20 disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>Submit Service Feedback</span>
                </button>

                {submittedStatus && (
                  <div className="inline-flex items-center gap-1.5 text-xs text-emerald-400 font-sans font-bold animate-fade-in">
                    <CheckCircle className="w-4 h-4" />
                    <span>Feedback published successfully!</span>
                  </div>
                )}
              </div>
            </form>

            {/* Recent Verified Reviews Display */}
            <div className="lg:col-span-5 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-sans uppercase tracking-wider text-zinc-400 font-bold flex items-center gap-1.5">
                  <MessageCircle className="w-3.5 h-3.5 text-amber-400" />
                  Recent Community Reviews ({feedbackList.length})
                </span>
                <span className="text-[10px] font-sans font-bold text-zinc-500">Live Feedback</span>
              </div>

              <div className="space-y-3 max-h-[360px] overflow-y-auto pr-1">
                {feedbackList.length === 0 ? (
                  <div className="p-6 rounded-2xl bg-white/[0.02] border border-white/5 text-center text-xs text-zinc-400 font-sans">
                    No comments yet. Be the first to leave one!
                  </div>
                ) : (
                  feedbackList.map(item => (
                    <div 
                      key={item.id}
                      className="p-4 rounded-2xl bg-white/[0.025] hover:bg-white/[0.04] border border-white/5 space-y-2 transition-all relative group"
                    >
                      <div className="flex items-center justify-between gap-2">
                        <div>
                          <div className="text-xs font-bold text-white flex items-center gap-1.5">
                            <span>{item.name}</span>
                            <span className="text-[10px] font-normal text-zinc-400">· {item.role}</span>
                          </div>
                        </div>
                        <div className="flex items-center gap-1">
                          <div className="flex text-amber-400 text-xs">
                            {Array.from({ length: item.rating }).map((_, i) => (
                              <span key={i}>★</span>
                            ))}
                          </div>
                          <button
                            type="button"
                            onClick={() => handleDeleteFeedback(item.id)}
                            title="Remove feedback"
                            className="opacity-0 group-hover:opacity-100 text-zinc-500 hover:text-red-400 ml-2 transition-opacity p-1 cursor-pointer"
                          >
                            <Trash2 className="w-3 h-3" />
                          </button>
                        </div>
                      </div>

                      <p className="text-xs text-zinc-300 leading-relaxed font-sans">
                        "{item.comment}"
                      </p>

                      <div className="text-[10px] font-sans font-semibold text-zinc-500 text-right">
                        {item.date}
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
};
