import React, { useState } from 'react';
import confetti from 'canvas-confetti';
import { 
  SkopeAppSettings, 
  SkopePackageItem, 
  SkopeOfferingItem,
  resetSkopeSettings 
} from '../../context/SkopeSettings';
import { sound } from '../../utils/soundEffects';
import { 
  Save, 
  RotateCcw, 
  Eye, 
  EyeOff, 
  Plus, 
  Trash2, 
  Check, 
  AlertCircle, 
  Lock, 
  Unlock, 
  Sliders, 
  DollarSign, 
  Megaphone, 
  X, 
  Sparkles, 
  Terminal, 
  Volume2, 
  VolumeX, 
  Layers, 
  HelpCircle,
  Copy,
  ChevronDown,
  ChevronUp,
  Mail,
  KeyRound,
  ShieldCheck
} from 'lucide-react';

interface SecretDashboardProps {
  settings: SkopeAppSettings;
  onSave: (newSettings: SkopeAppSettings) => void;
  onClose: () => void;
}

export const SecretDashboard: React.FC<SecretDashboardProps> = ({
  settings: initialSettings,
  onSave,
  onClose,
}) => {
  // Secret Master Passcode
  const [passcode, setPasscode] = useState('');
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [authError, setAuthError] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  // Editable draft state
  const [draft, setDraft] = useState<SkopeAppSettings>(JSON.parse(JSON.stringify(initialSettings)));
  const [activeTab, setActiveTab] = useState<'packages' | 'offerings' | 'commands' | 'announcement' | 'general' | 'verification'>('packages');
  const [saveSuccessNotification, setSaveSuccessNotification] = useState(false);
  const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false);

  // Quick sound state
  const [soundEnabled, setSoundEnabled] = useState(sound.isEnabled());

  // Command CLI State
  const [cliInput, setCliInput] = useState('');
  const [cliLogs, setCliLogs] = useState<Array<{ text: string; type: 'info' | 'success' | 'error' | 'cmd' }>>([
    { text: 'Skope Admin Kernel v2.4 initialized. Type "help" or click presets below.', type: 'info' },
  ]);

  const triggerCelebration = () => {
    try {
      confetti({
        particleCount: 50,
        spread: 60,
        origin: { y: 0.8 },
        colors: ['#3b82f6', '#60a5fa', '#93c5fd', '#38bdf8']
      });
    } catch {
      // ignore
    }
  };

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    const validCodes = ['syneonly'];
    if (validCodes.includes(passcode.trim().toLowerCase())) {
      setIsAuthenticated(true);
      setAuthError(false);
      sound.playSuccess();
      triggerCelebration();
    } else {
      setAuthError(true);
      sound.playDelete();
    }
  };

  const toggleAudio = () => {
    const newState = sound.toggleSound();
    setSoundEnabled(newState);
  };

  // Helper to commit edits immediately or upon publish
  const updateDraft = (newDraft: SkopeAppSettings, autoSave = false) => {
    setDraft(newDraft);
    setHasUnsavedChanges(!autoSave);
    if (autoSave) {
      onSave(newDraft);
      triggerSavedToast();
    }
  };

  const triggerSavedToast = () => {
    setSaveSuccessNotification(true);
    setTimeout(() => {
      setSaveSuccessNotification(false);
    }, 2500);
  };

  const handleSaveAll = () => {
    sound.playSuccess();
    triggerCelebration();
    onSave(draft);
    setHasUnsavedChanges(false);
    triggerSavedToast();
  };

  const handleResetToDefault = () => {
    if (window.confirm('Reset all packages, prices, offerings, and copy back to factory default?')) {
      sound.playDelete();
      const def = resetSkopeSettings();
      setDraft(def);
      setHasUnsavedChanges(false);
      onSave(def);
      triggerSavedToast();
    }
  };

  // --- PACKAGE MANAGEMENT ACTIONS ---

  const handleAddNewPackage = () => {
    sound.playSuccess();
    const newTierNumber = draft.packages.length + 1;
    const newPkg: SkopePackageItem = {
      id: `pkg-${Date.now()}`,
      name: `Tier ${newTierNumber} Custom Suite`,
      price: '$12.00',
      period: 'package',
      badge: 'Custom Tier',
      category: 'core',
      description: 'Custom digital engineering package configured live via the master admin terminal.',
      popular: false,
      flagship: false,
      features: [
        'Custom Discord Bot or Web Feature',
        'Automated Workflow Pipeline',
        'Quality Assurance & Fast Delivery',
      ],
      cta: 'Order Now',
    };

    const updatedPackages = [newPkg, ...draft.packages];
    const updatedDraft = { ...draft, packages: updatedPackages };
    updateDraft(updatedDraft, true);
  };

  const handleUpdatePackage = (index: number, field: keyof SkopePackageItem, value: any) => {
    const updated = [...draft.packages];
    updated[index] = { ...updated[index], [field]: value };
    const updatedDraft = { ...draft, packages: updated };
    updateDraft(updatedDraft, true);
  };

  const handleDeletePackage = (index: number) => {
    if (draft.packages.length <= 1) {
      alert('You must keep at least 1 package.');
      return;
    }
    const pkgName = draft.packages[index].name;
    if (window.confirm(`Delete package "${pkgName}"? This will be removed from the live website immediately.`)) {
      sound.playDelete();
      const updated = draft.packages.filter((_, i) => i !== index);
      const updatedDraft = { ...draft, packages: updated };
      updateDraft(updatedDraft, true);
    }
  };

  const handleAddFeatureToPackage = (pkgIndex: number) => {
    sound.playClick();
    const updated = [...draft.packages];
    updated[pkgIndex] = {
      ...updated[pkgIndex],
      features: [...updated[pkgIndex].features, 'Custom engineering deliverable'],
    };
    const updatedDraft = { ...draft, packages: updated };
    updateDraft(updatedDraft, true);
  };

  const handleRemoveFeatureFromPackage = (pkgIndex: number, featIndex: number) => {
    sound.playDelete();
    const updated = [...draft.packages];
    const newFeatures = [...updated[pkgIndex].features];
    newFeatures.splice(featIndex, 1);
    updated[pkgIndex] = {
      ...updated[pkgIndex],
      features: newFeatures,
    };
    const updatedDraft = { ...draft, packages: updated };
    updateDraft(updatedDraft, true);
  };

  const handleUpdateFeatureText = (pkgIndex: number, featIndex: number, text: string) => {
    const updated = [...draft.packages];
    const newFeatures = [...updated[pkgIndex].features];
    newFeatures[featIndex] = text;
    updated[pkgIndex] = {
      ...updated[pkgIndex],
      features: newFeatures,
    };
    const updatedDraft = { ...draft, packages: updated };
    updateDraft(updatedDraft, true);
  };

  // --- OFFERINGS & SERVICES MANAGEMENT ACTIONS ---

  const handleAddNewOffering = () => {
    sound.playSuccess();
    const newOffering: SkopeOfferingItem = {
      id: `offering-${Date.now()}`,
      title: 'Bespoke Custom Service',
      pillar: 'build',
      tag: 'New Service',
      iconName: 'Sparkles',
      desc: 'High-impact engineering service engineered to client specifications with automated delivery pipelines.',
      highlights: [
        'Dedicated engineering architecture',
        'Automated workflow & testing',
        'Full source code handover'
      ],
      featured: false,
    };

    const updatedOfferings = [newOffering, ...(draft.offerings || [])];
    const updatedDraft = { ...draft, offerings: updatedOfferings };
    updateDraft(updatedDraft, true);
  };

  const handleUpdateOffering = (index: number, field: keyof SkopeOfferingItem, value: any) => {
    const updated = [...(draft.offerings || [])];
    updated[index] = { ...updated[index], [field]: value };
    const updatedDraft = { ...draft, offerings: updated };
    updateDraft(updatedDraft, true);
  };

  const handleDeleteOffering = (index: number) => {
    const offeringTitle = draft.offerings[index]?.title || 'Service';
    if (window.confirm(`Delete offering "${offeringTitle}"? This will remove it from the Features and Offerings page immediately.`)) {
      sound.playDelete();
      const updated = draft.offerings.filter((_, i) => i !== index);
      const updatedDraft = { ...draft, offerings: updated };
      updateDraft(updatedDraft, true);
    }
  };

  // --- ADMIN COMMAND TERMINAL LOGIC ---
  const executeAdminCommand = (rawCmd: string) => {
    const trimmed = rawCmd.trim();
    if (!trimmed) return;
    sound.playTerminalBeep();

    const parts = trimmed.split(' ');
    const cmd = parts[0].toLowerCase();
    const args = parts.slice(1);

    const logCmd = { text: `$ ${trimmed}`, type: 'cmd' as const };

    switch (cmd) {
      case 'help': {
        setCliLogs(prev => [
          ...prev,
          logCmd,
          { text: '══ AVAILABLE ADMIN COMMANDS ══', type: 'info' },
          { text: '• add package <name> <price>  — Creates and pushes a new package tier immediately', type: 'info' },
          { text: '• delete package <name/index> — Permanently deletes a package tier', type: 'info' },
          { text: '• add offering <title>        — Adds a custom feature offering', type: 'info' },
          { text: '• delete offering <title>     — Deletes a feature offering', type: 'info' },
          { text: '• price <name> <newPrice>     — Modifies the price of an existing package', type: 'info' },
          { text: '• banner <on/off> [message]   — Toggles the top announcement broadcast banner', type: 'info' },
          { text: '• motto <text>                — Updates the brand slogan across the entire app', type: 'info' },
          { text: '• confetti                    — Fire celebratory visual particles', type: 'info' },
          { text: '• clear                       — Clears the terminal screen', type: 'info' },
          { text: '• reset                       — Factory resets all packages and settings', type: 'info' },
        ]);
        break;
      }

      case 'clear': {
        setCliLogs([{ text: 'Console cleared. Ready for commands.', type: 'info' }]);
        break;
      }

      case 'confetti': {
        triggerCelebration();
        sound.playSuccess();
        setCliLogs(prev => [
          ...prev,
          logCmd,
          { text: '✨ Fired high-octane celebration particles!', type: 'success' },
        ]);
        break;
      }

      case 'add': {
        const sub = args[0]?.toLowerCase();
        if (sub === 'package') {
          const pkgName = args.slice(1, -1).join(' ') || args[1] || 'Custom Master Tier';
          const price = args[args.length - 1]?.startsWith('$') ? args[args.length - 1] : '$15.00';
          const newPkg: SkopePackageItem = {
            id: `pkg-${Date.now()}`,
            name: pkgName,
            price: price,
            period: 'package',
            badge: 'Admin Custom',
            category: 'core',
            description: `Bespoke tier created via command: "${trimmed}".`,
            popular: false,
            flagship: false,
            features: [
              'Command-Provisioned Architecture',
              'Fast Delivery & High Assurance',
              'Full Discord & Web Integration',
            ],
            cta: 'Order Now',
          };
          const updatedPackages = [newPkg, ...draft.packages];
          const updatedDraft = { ...draft, packages: updatedPackages };
          updateDraft(updatedDraft, true);
          sound.playSuccess();
          triggerCelebration();
          setCliLogs(prev => [
            ...prev,
            logCmd,
            { text: `✓ Successfully added package "${pkgName}" at ${price} and published live!`, type: 'success' },
          ]);
        } else if (sub === 'offering' || sub === 'service') {
          const title = args.slice(1).join(' ') || 'Custom Digital Solution';
          const newOffering: SkopeOfferingItem = {
            id: `offering-${Date.now()}`,
            title,
            pillar: 'build',
            tag: 'Custom Service',
            iconName: 'Zap',
            desc: 'Custom solution created and pushed instantly via the admin command line.',
            highlights: ['Fast turn-around engineering', 'Bespoke integration', '24/7 reliability'],
            featured: false,
          };
          const updatedOfferings = [newOffering, ...(draft.offerings || [])];
          const updatedDraft = { ...draft, offerings: updatedOfferings };
          updateDraft(updatedDraft, true);
          sound.playSuccess();
          setCliLogs(prev => [
            ...prev,
            logCmd,
            { text: `✓ Successfully added offering "${title}" and synced to Features page!`, type: 'success' },
          ]);
        } else {
          setCliLogs(prev => [
            ...prev,
            logCmd,
            { text: 'Usage: add package <name> <price> OR add offering <title>', type: 'error' },
          ]);
        }
        break;
      }

      case 'delete': {
        const sub = args[0]?.toLowerCase();
        if (sub === 'package') {
          const query = args.slice(1).join(' ').toLowerCase();
          const foundIdx = draft.packages.findIndex((p, idx) => 
            p.name.toLowerCase().includes(query) || String(idx + 1) === query || p.id === query
          );
          if (foundIdx >= 0) {
            const removedName = draft.packages[foundIdx].name;
            const updated = draft.packages.filter((_, i) => i !== foundIdx);
            const updatedDraft = { ...draft, packages: updated };
            updateDraft(updatedDraft, true);
            sound.playDelete();
            setCliLogs(prev => [
              ...prev,
              logCmd,
              { text: `✓ Successfully deleted package "${removedName}". App updated live.`, type: 'success' },
            ]);
          } else {
            setCliLogs(prev => [
              ...prev,
              logCmd,
              { text: `Could not find package matching "${query}". Check current packages tab.`, type: 'error' },
            ]);
          }
        } else if (sub === 'offering' || sub === 'service') {
          const query = args.slice(1).join(' ').toLowerCase();
          const foundIdx = (draft.offerings || []).findIndex((o, idx) => 
            o.title.toLowerCase().includes(query) || String(idx + 1) === query || o.id === query
          );
          if (foundIdx >= 0) {
            const removedTitle = draft.offerings[foundIdx].title;
            const updated = draft.offerings.filter((_, i) => i !== foundIdx);
            const updatedDraft = { ...draft, offerings: updated };
            updateDraft(updatedDraft, true);
            sound.playDelete();
            setCliLogs(prev => [
              ...prev,
              logCmd,
              { text: `✓ Successfully deleted offering "${removedTitle}".`, type: 'success' },
            ]);
          } else {
            setCliLogs(prev => [
              ...prev,
              logCmd,
              { text: `Could not find offering matching "${query}".`, type: 'error' },
            ]);
          }
        } else {
          setCliLogs(prev => [
            ...prev,
            logCmd,
            { text: 'Usage: delete package <name/index> OR delete offering <title>', type: 'error' },
          ]);
        }
        break;
      }

      case 'price': {
        const query = args[0]?.toLowerCase();
        const newPrice = args[1];
        if (!query || !newPrice) {
          setCliLogs(prev => [
            ...prev,
            logCmd,
            { text: 'Usage: price <packageName> <newPrice> (e.g. price basic $4.50)', type: 'error' },
          ]);
          break;
        }
        const foundIdx = draft.packages.findIndex(p => p.name.toLowerCase().includes(query) || p.id.toLowerCase().includes(query));
        if (foundIdx >= 0) {
          const formatted = newPrice.startsWith('$') ? newPrice : `$${newPrice}`;
          const updated = [...draft.packages];
          updated[foundIdx] = { ...updated[foundIdx], price: formatted };
          const updatedDraft = { ...draft, packages: updated };
          updateDraft(updatedDraft, true);
          sound.playSuccess();
          setCliLogs(prev => [
            ...prev,
            logCmd,
            { text: `✓ Changed price of "${updated[foundIdx].name}" to ${formatted}!`, type: 'success' },
          ]);
        } else {
          setCliLogs(prev => [
            ...prev,
            logCmd,
            { text: `Could not find package matching "${query}".`, type: 'error' },
          ]);
        }
        break;
      }

      case 'motto': {
        const newMotto = args.join(' ');
        if (!newMotto) {
          setCliLogs(prev => [
            ...prev,
            logCmd,
            { text: 'Usage: motto <new slogan text>', type: 'error' },
          ]);
          break;
        }
        const updatedDraft = { ...draft, motto: newMotto };
        updateDraft(updatedDraft, true);
        sound.playSuccess();
        setCliLogs(prev => [
          ...prev,
          logCmd,
          { text: `✓ Motto updated to "${newMotto}" live!`, type: 'success' },
        ]);
        break;
      }

      case 'banner': {
        const toggle = args[0]?.toLowerCase();
        const text = args.slice(1).join(' ');
        if (toggle === 'on') {
          const updatedDraft = {
            ...draft,
            announcement: {
              ...draft.announcement,
              enabled: true,
              text: text || draft.announcement.text || '⚡ Welcome to Skope — Bespoke Digital Services',
            },
          };
          updateDraft(updatedDraft, true);
          sound.playSuccess();
          setCliLogs(prev => [
            ...prev,
            logCmd,
            { text: '✓ Announcement banner activated on the website.', type: 'success' },
          ]);
        } else if (toggle === 'off') {
          const updatedDraft = {
            ...draft,
            announcement: {
              ...draft.announcement,
              enabled: false,
            },
          };
          updateDraft(updatedDraft, true);
          sound.playDelete();
          setCliLogs(prev => [
            ...prev,
            logCmd,
            { text: '✓ Announcement banner hidden.', type: 'success' },
          ]);
        } else {
          setCliLogs(prev => [
            ...prev,
            logCmd,
            { text: 'Usage: banner <on/off> [message]', type: 'error' },
          ]);
        }
        break;
      }

      case 'reset': {
        const def = resetSkopeSettings();
        setDraft(def);
        onSave(def);
        sound.playDelete();
        setCliLogs(prev => [
          ...prev,
          logCmd,
          { text: '✓ All settings and packages restored to factory defaults.', type: 'success' },
        ]);
        break;
      }

      default: {
        setCliLogs(prev => [
          ...prev,
          logCmd,
          { text: `Command not recognized: "${cmd}". Type "help" to view all commands.`, type: 'error' },
        ]);
        break;
      }
    }

    setCliInput('');
  };

  // If not authenticated, show secret terminal authentication screen
  if (!isAuthenticated) {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-xl animate-in fade-in duration-200">
        <div className="relative w-full max-w-md bg-[#000d1e] border border-blue-500/30 rounded-3xl p-8 shadow-2xl space-y-6">
          <button
            onClick={onClose}
            className="absolute top-5 right-5 p-2 rounded-xl text-zinc-500 hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="text-center space-y-2">
            <div className="w-14 h-14 rounded-2xl bg-blue-600/20 border border-blue-400/30 flex items-center justify-center mx-auto text-blue-400 shadow-inner">
              <Lock className="w-7 h-7" />
            </div>
            <div className="text-[10px] font-sans uppercase tracking-widest text-blue-400 font-bold">
              Restricted Terminal
            </div>
            <h3 className="text-2xl font-sans font-extrabold text-white">
              Skope Admin Core
            </h3>
            <p className="text-xs text-zinc-400 max-w-xs mx-auto">
              Authenticate with your key to execute commands, delete or add custom packages, and modify offerings live.
            </p>
          </div>

          <form onSubmit={handleLogin} className="space-y-4">
            <div className="space-y-1.5">
              <label className="text-[11px] font-sans font-bold text-zinc-400 uppercase tracking-wider">
                Passcode (Key: <code className="text-blue-300 font-bold">SYNEONLY</code>)
              </label>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={passcode}
                  onChange={(e) => {
                    setPasscode(e.target.value);
                    setAuthError(false);
                  }}
                  autoFocus
                  placeholder="Enter secret key..."
                  className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-zinc-600 focus:outline-none focus:border-blue-400 font-sans font-bold text-sm tracking-wider"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-zinc-400 hover:text-white"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            {authError && (
              <div className="p-3 rounded-xl bg-red-950/40 border border-red-500/40 text-red-300 text-xs flex items-center gap-2">
                <AlertCircle className="w-4 h-4 shrink-0" />
                <span>Invalid authentication passcode.</span>
              </div>
            )}

            <button
              type="submit"
              className="w-full py-3.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-semibold text-xs tracking-wider transition-all shadow-lg shadow-blue-600/30 flex items-center justify-center gap-2 cursor-pointer"
            >
              <Unlock className="w-4 h-4" />
              <span>Unlock Admin Controls</span>
            </button>
          </form>
        </div>
      </div>
    );
  }

  // Authenticated Dashboard
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/90 backdrop-blur-md animate-in fade-in duration-200">
      <div className="relative w-full max-w-6xl max-h-[92vh] bg-[#000e24] border border-blue-400/40 rounded-3xl shadow-2xl flex flex-col overflow-hidden text-zinc-100 font-sans">
        
        {/* Top Header Bar */}
        <div className="flex items-center justify-between px-6 sm:px-8 py-4 border-b border-white/10 bg-[#000918]">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-blue-600/20 border border-blue-500/30 flex items-center justify-center text-blue-400">
              <Sliders className="w-4 h-4" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-lg font-bold text-white tracking-tight">Skope Master Control Room</h3>
                <span className="px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 text-[10px] font-sans uppercase font-bold flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                  Live Reactive
                </span>
              </div>
              <p className="text-[11px] text-zinc-400">Manage packages, delete items, run terminal commands, and customize your app in real-time.</p>
            </div>
          </div>

          <div className="flex items-center gap-2.5">
            <button
              onClick={toggleAudio}
              title={soundEnabled ? 'Mute Sci-Fi Audio FX' : 'Enable Sci-Fi Audio FX'}
              className="p-2 rounded-xl bg-white/5 hover:bg-white/10 text-zinc-400 hover:text-white border border-white/10 transition-colors cursor-pointer"
            >
              {soundEnabled ? <Volume2 className="w-4 h-4 text-blue-400" /> : <VolumeX className="w-4 h-4 text-zinc-500" />}
            </button>
            <button
              onClick={triggerCelebration}
              title="Test Visual Confetti Particles"
              className="p-2 rounded-xl bg-white/5 hover:bg-white/10 text-zinc-400 hover:text-amber-300 border border-white/10 transition-colors cursor-pointer"
            >
              <Sparkles className="w-4 h-4" />
            </button>
            <button
              onClick={handleSaveAll}
              className="px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-semibold text-xs transition-all shadow-md shadow-blue-600/30 flex items-center gap-2 cursor-pointer"
            >
              <Save className="w-3.5 h-3.5" />
              <span>{hasUnsavedChanges ? 'Publish All Changes' : 'Saved & Active'}</span>
            </button>
            <button
              onClick={handleResetToDefault}
              title="Reset all settings to factory default"
              className="p-2 rounded-xl bg-white/5 hover:bg-white/10 text-zinc-400 hover:text-white border border-white/10 transition-colors cursor-pointer"
            >
              <RotateCcw className="w-4 h-4" />
            </button>
            <button
              onClick={onClose}
              className="p-2 rounded-xl bg-white/5 hover:bg-red-500/20 text-zinc-400 hover:text-red-400 border border-white/10 transition-colors cursor-pointer"
              title="Close Dashboard"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Live status alert toast */}
        {saveSuccessNotification && (
          <div className="bg-emerald-500 text-black px-6 py-2.5 text-xs font-semibold flex items-center justify-center gap-2 animate-in slide-in-from-top-2">
            <Check className="w-4 h-4" />
            <span>Success: Updated live across the entire website!</span>
          </div>
        )}

        {/* Tabs Bar */}
        <div className="flex items-center gap-2 px-6 sm:px-8 py-3 bg-[#00122e] border-b border-white/10 overflow-x-auto">
          <button
            onClick={() => {
              sound.playClick();
              setActiveTab('packages');
            }}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-medium transition-all flex items-center gap-2 whitespace-nowrap cursor-pointer ${
              activeTab === 'packages'
                ? 'bg-blue-600 text-white shadow-sm'
                : 'text-zinc-400 hover:text-white hover:bg-white/5'
            }`}
          >
            <DollarSign className="w-3.5 h-3.5" />
            <span>Packages ({draft.packages.length})</span>
          </button>

          <button
            onClick={() => {
              sound.playClick();
              setActiveTab('offerings');
            }}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-medium transition-all flex items-center gap-2 whitespace-nowrap cursor-pointer ${
              activeTab === 'offerings'
                ? 'bg-blue-600 text-white shadow-sm'
                : 'text-zinc-400 hover:text-white hover:bg-white/5'
            }`}
          >
            <Layers className="w-3.5 h-3.5" />
            <span>Features &amp; Offerings ({(draft.offerings || []).length})</span>
          </button>

          <button
            onClick={() => {
              sound.playClick();
              setActiveTab('commands');
            }}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-medium transition-all flex items-center gap-2 whitespace-nowrap cursor-pointer ${
              activeTab === 'commands'
                ? 'bg-blue-600 text-white shadow-sm'
                : 'text-zinc-400 hover:text-white hover:bg-white/5'
            }`}
          >
            <Terminal className="w-3.5 h-3.5 text-emerald-400" />
            <span>Admin Commands CLI</span>
            <span className="px-1.5 py-0.2 rounded bg-emerald-500/20 text-emerald-300 text-[9px] font-bold">NEW</span>
          </button>

          <button
            onClick={() => {
              sound.playClick();
              setActiveTab('announcement');
            }}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-medium transition-all flex items-center gap-2 whitespace-nowrap cursor-pointer ${
              activeTab === 'announcement'
                ? 'bg-blue-600 text-white shadow-sm'
                : 'text-zinc-400 hover:text-white hover:bg-white/5'
            }`}
          >
            <Megaphone className="w-3.5 h-3.5" />
            <span>Announcement Banner</span>
          </button>

          <button
            onClick={() => {
              sound.playClick();
              setActiveTab('verification');
            }}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-medium transition-all flex items-center gap-2 whitespace-nowrap cursor-pointer ${
              activeTab === 'verification'
                ? 'bg-blue-600 text-white shadow-sm'
                : 'text-zinc-400 hover:text-white hover:bg-white/5'
            }`}
          >
            <Mail className="w-3.5 h-3.5 text-blue-300" />
            <span>Skope Integrations (Gmail)</span>
            <span className="px-1.5 py-0.2 rounded bg-blue-500/20 text-blue-300 text-[9px] font-bold">VERIFY</span>
          </button>

          <button
            onClick={() => {
              sound.playClick();
              setActiveTab('general');
            }}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-medium transition-all flex items-center gap-2 whitespace-nowrap cursor-pointer ${
              activeTab === 'general'
                ? 'bg-blue-600 text-white shadow-sm'
                : 'text-zinc-400 hover:text-white hover:bg-white/5'
            }`}
          >
            <Sliders className="w-3.5 h-3.5" />
            <span>Branding &amp; Slogan</span>
          </button>
        </div>

        {/* Tab Body */}
        <div className="p-6 sm:p-8 overflow-y-auto flex-1 space-y-6">
          
          {/* TAB 1: PACKAGES & PRICING */}
          {activeTab === 'packages' && (
            <div className="space-y-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-white/10 pb-4">
                <div>
                  <h4 className="text-base font-bold text-white flex items-center gap-2">
                    <span>Packages Management</span>
                    <span className="px-2 py-0.5 rounded-full bg-blue-600/30 text-blue-300 text-xs font-sans font-bold">
                      {draft.packages.length} active tiers
                    </span>
                  </h4>
                  <p className="text-xs text-zinc-400 mt-1">
                    Add new custom tiers, modify pricing, customize deliverables, or delete packages.
                  </p>
                </div>

                <button
                  type="button"
                  onClick={handleAddNewPackage}
                  className="px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs flex items-center justify-center gap-2 transition-all shadow-md shadow-blue-600/30 cursor-pointer"
                >
                  <Plus className="w-4 h-4" />
                  <span>Add New Custom Tier</span>
                </button>
              </div>

              {/* Package cards grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {draft.packages.map((pkg, idx) => (
                  <div
                    key={pkg.id || idx}
                    className="p-5 rounded-2xl bg-white/[0.03] border border-white/10 hover:border-white/20 transition-all space-y-4 relative group"
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] font-sans uppercase px-2 py-0.5 rounded bg-blue-500/20 text-blue-300 font-bold">
                        Tier #{idx + 1}
                      </span>
                      <div className="flex items-center gap-3">
                        <label className="flex items-center gap-1.5 text-[11px] text-zinc-400 cursor-pointer">
                          <input
                            type="checkbox"
                            checked={pkg.popular || false}
                            onChange={(e) => handleUpdatePackage(idx, 'popular', e.target.checked)}
                            className="rounded bg-white/10 border-white/20 text-blue-600 focus:ring-0"
                          />
                          <span>Popular</span>
                        </label>

                        <button
                          type="button"
                          onClick={() => handleDeletePackage(idx)}
                          className="p-1 rounded-lg text-red-400 hover:bg-red-500/20 transition-colors cursor-pointer"
                          title="Delete this package"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>

                    {/* Inputs */}
                    <div className="grid grid-cols-3 gap-2">
                      <div className="col-span-2 space-y-1">
                        <label className="text-[10px] font-sans font-bold uppercase text-zinc-400">Package Name</label>
                        <input
                          type="text"
                          value={pkg.name}
                          onChange={(e) => handleUpdatePackage(idx, 'name', e.target.value)}
                          className="w-full px-3 py-1.5 rounded-lg bg-white/5 border border-white/10 text-white text-xs font-bold focus:outline-none focus:border-blue-400"
                        />
                      </div>
                      <div className="space-y-1">
                        <label className="text-[10px] font-sans font-bold uppercase text-zinc-400">Category</label>
                        <select
                          value={pkg.category || 'core'}
                          onChange={(e) => handleUpdatePackage(idx, 'category', e.target.value)}
                          className="w-full px-2 py-1.5 rounded-lg bg-[#001838] border border-white/10 text-white text-xs focus:outline-none focus:border-blue-400"
                        >
                          <option value="core">Core</option>
                          <option value="business">Business</option>
                          <option value="custom">Custom</option>
                        </select>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-2">
                      <div className="space-y-1">
                        <label className="text-[10px] font-sans font-bold uppercase text-zinc-400">Price</label>
                        <input
                          type="text"
                          value={pkg.price}
                          onChange={(e) => handleUpdatePackage(idx, 'price', e.target.value)}
                          className="w-full px-3 py-1.5 rounded-lg bg-white/5 border border-white/10 text-blue-400 text-sm font-bold font-sans focus:outline-none focus:border-blue-400"
                        />
                      </div>
                      <div className="space-y-1">
                        <label className="text-[10px] font-sans font-bold uppercase text-zinc-400">Period / Billing</label>
                        <input
                          type="text"
                          value={pkg.period}
                          onChange={(e) => handleUpdatePackage(idx, 'period', e.target.value)}
                          className="w-full px-3 py-1.5 rounded-lg bg-white/5 border border-white/10 text-zinc-300 text-xs focus:outline-none focus:border-blue-400"
                        />
                      </div>
                    </div>

                    <div className="space-y-1">
                      <label className="text-[10px] font-sans font-bold uppercase text-zinc-400">Badge Tag</label>
                      <input
                        type="text"
                        value={pkg.badge}
                        onChange={(e) => handleUpdatePackage(idx, 'badge', e.target.value)}
                        className="w-full px-3 py-1.5 rounded-lg bg-white/5 border border-white/10 text-amber-300 text-xs focus:outline-none focus:border-blue-400"
                      />
                    </div>

                    <div className="space-y-1">
                      <label className="text-[10px] font-sans font-bold uppercase text-zinc-400">Description</label>
                      <textarea
                        rows={2}
                        value={pkg.description}
                        onChange={(e) => handleUpdatePackage(idx, 'description', e.target.value)}
                        className="w-full px-3 py-1.5 rounded-lg bg-white/5 border border-white/10 text-zinc-300 text-xs focus:outline-none focus:border-blue-400 resize-none"
                      />
                    </div>

                    {/* Features list */}
                    <div className="space-y-2 pt-2 border-t border-white/10">
                      <div className="flex items-center justify-between">
                        <label className="text-[10px] font-sans font-bold uppercase text-zinc-400">Deliverables ({pkg.features.length})</label>
                        <button
                          type="button"
                          onClick={() => handleAddFeatureToPackage(idx)}
                          className="text-[10px] text-blue-400 hover:text-blue-300 flex items-center gap-1 cursor-pointer"
                        >
                          <Plus className="w-3 h-3" />
                          <span>Add Item</span>
                        </button>
                      </div>

                      <div className="space-y-1.5 max-h-36 overflow-y-auto pr-1">
                        {pkg.features.map((feat, fIdx) => (
                          <div key={fIdx} className="flex items-center gap-1.5">
                            <input
                              type="text"
                              value={feat}
                              onChange={(e) => handleUpdateFeatureText(idx, fIdx, e.target.value)}
                              className="flex-1 px-2.5 py-1 rounded bg-black/40 border border-white/10 text-zinc-200 text-[11px] focus:outline-none focus:border-blue-400"
                            />
                            <button
                              type="button"
                              onClick={() => handleRemoveFeatureFromPackage(idx, fIdx)}
                              className="p-1 text-zinc-500 hover:text-red-400 transition-colors cursor-pointer"
                            >
                              <X className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="space-y-1 pt-1">
                      <label className="text-[10px] font-sans font-bold uppercase text-zinc-400">Button CTA Text</label>
                      <input
                        type="text"
                        value={pkg.cta}
                        onChange={(e) => handleUpdatePackage(idx, 'cta', e.target.value)}
                        className="w-full px-3 py-1.5 rounded-lg bg-white/5 border border-white/10 text-zinc-200 text-xs focus:outline-none focus:border-blue-400"
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 2: FEATURES & OFFERINGS */}
          {activeTab === 'offerings' && (
            <div className="space-y-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-white/10 pb-4">
                <div>
                  <h4 className="text-base font-bold text-white flex items-center gap-2">
                    <span>Features &amp; Offerings Management</span>
                    <span className="px-2 py-0.5 rounded-full bg-blue-600/30 text-blue-300 text-xs font-sans font-bold">
                      {(draft.offerings || []).length} active services
                    </span>
                  </h4>
                  <p className="text-xs text-zinc-400 mt-1">
                    Add new service offerings, edit pillar categories (Build • Automate • Grow), change icons, or delete items.
                  </p>
                </div>

                <button
                  type="button"
                  onClick={handleAddNewOffering}
                  className="px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs flex items-center justify-center gap-2 transition-all shadow-md shadow-blue-600/30 cursor-pointer"
                >
                  <Plus className="w-4 h-4" />
                  <span>Add Custom Offering</span>
                </button>
              </div>

              {/* Offerings list */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {(draft.offerings || []).map((item, idx) => (
                  <div
                    key={item.id || idx}
                    className="p-5 rounded-2xl bg-white/[0.03] border border-white/10 hover:border-white/20 transition-all space-y-4"
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] font-sans uppercase px-2 py-0.5 rounded bg-blue-500/20 text-blue-300 font-bold">
                        Service #{idx + 1}
                      </span>
                      <div className="flex items-center gap-3">
                        <label className="flex items-center gap-1.5 text-[11px] text-zinc-400 cursor-pointer">
                          <input
                            type="checkbox"
                            checked={item.featured || false}
                            onChange={(e) => handleUpdateOffering(idx, 'featured', e.target.checked)}
                            className="rounded bg-white/10 border-white/20 text-blue-600 focus:ring-0"
                          />
                          <span>VIP / Featured</span>
                        </label>
                        <button
                          type="button"
                          onClick={() => handleDeleteOffering(idx)}
                          className="p-1 rounded-lg text-red-400 hover:bg-red-500/20 transition-colors cursor-pointer"
                          title="Delete offering"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>

                    <div className="space-y-1">
                      <label className="text-[10px] font-sans font-bold uppercase text-zinc-400">Title</label>
                      <input
                        type="text"
                        value={item.title}
                        onChange={(e) => handleUpdateOffering(idx, 'title', e.target.value)}
                        className="w-full px-3 py-1.5 rounded-lg bg-white/5 border border-white/10 text-white text-xs font-bold focus:outline-none focus:border-blue-400"
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-2">
                      <div className="space-y-1">
                        <label className="text-[10px] font-sans font-bold uppercase text-zinc-400">Pillar</label>
                        <select
                          value={item.pillar}
                          onChange={(e) => handleUpdateOffering(idx, 'pillar', e.target.value)}
                          className="w-full px-2 py-1.5 rounded-lg bg-[#001838] border border-white/10 text-white text-xs focus:outline-none focus:border-blue-400"
                        >
                          <option value="build">Build</option>
                          <option value="automate">Automate</option>
                          <option value="grow">Grow</option>
                        </select>
                      </div>

                      <div className="space-y-1">
                        <label className="text-[10px] font-sans font-bold uppercase text-zinc-400">Icon</label>
                        <select
                          value={item.iconName}
                          onChange={(e) => handleUpdateOffering(idx, 'iconName', e.target.value)}
                          className="w-full px-2 py-1.5 rounded-lg bg-[#001838] border border-white/10 text-white text-xs focus:outline-none focus:border-blue-400"
                        >
                          <option value="Globe">Globe (Web)</option>
                          <option value="Bot">Bot (Discord)</option>
                          <option value="Smartphone">Smartphone (Android)</option>
                          <option value="Brain">Brain (AI)</option>
                          <option value="Cog">Cog (Automation)</option>
                          <option value="MessageSquare">MessageSquare (Server)</option>
                          <option value="TrendingUp">TrendingUp (Growth)</option>
                          <option value="Wrench">Wrench (Custom)</option>
                          <option value="Gem">Gem (Pro)</option>
                          <option value="Zap">Zap (Lightning)</option>
                          <option value="Shield">Shield (Security)</option>
                          <option value="Sparkles">Sparkles</option>
                        </select>
                      </div>
                    </div>

                    <div className="space-y-1">
                      <label className="text-[10px] font-sans font-bold uppercase text-zinc-400">Tag Label</label>
                      <input
                        type="text"
                        value={item.tag}
                        onChange={(e) => handleUpdateOffering(idx, 'tag', e.target.value)}
                        className="w-full px-3 py-1.5 rounded-lg bg-white/5 border border-white/10 text-blue-300 text-xs focus:outline-none focus:border-blue-400"
                      />
                    </div>

                    <div className="space-y-1">
                      <label className="text-[10px] font-sans font-bold uppercase text-zinc-400">Description</label>
                      <textarea
                        rows={2}
                        value={item.desc}
                        onChange={(e) => handleUpdateOffering(idx, 'desc', e.target.value)}
                        className="w-full px-3 py-1.5 rounded-lg bg-white/5 border border-white/10 text-zinc-300 text-xs focus:outline-none focus:border-blue-400 resize-none"
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 3: ADMIN COMMAND TERMINAL (CLI) */}
          {activeTab === 'commands' && (
            <div className="space-y-6">
              <div className="border-b border-white/10 pb-4">
                <div className="flex items-center gap-2">
                  <Terminal className="w-5 h-5 text-emerald-400" />
                  <h4 className="text-base font-bold text-white">Interactive Admin CLI Terminal</h4>
                </div>
                <p className="text-xs text-zinc-400 mt-1">
                  Type commands to add, delete, change pricing, trigger visual effects, or broadcast announcements instantly.
                </p>
              </div>

              {/* Terminal Screen Container */}
              <div className="rounded-2xl bg-[#000814] border border-blue-500/30 overflow-hidden shadow-2xl flex flex-col font-sans">
                {/* Window header */}
                <div className="px-4 py-2.5 bg-black/60 border-b border-white/10 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="w-3 h-3 rounded-full bg-red-500/80 inline-block" />
                    <span className="w-3 h-3 rounded-full bg-yellow-500/80 inline-block" />
                    <span className="w-3 h-3 rounded-full bg-green-500/80 inline-block" />
                    <span className="ml-2 text-[11px] text-zinc-400 font-bold uppercase tracking-wider">root@skope-master-console:~</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => executeAdminCommand('confetti')}
                      className="px-2.5 py-1 rounded bg-blue-600/30 text-blue-300 hover:bg-blue-600/50 text-[10px] font-bold cursor-pointer transition-colors"
                    >
                      🎉 Fire Confetti
                    </button>
                    <button
                      onClick={() => executeAdminCommand('clear')}
                      className="px-2.5 py-1 rounded bg-white/5 hover:bg-white/10 text-zinc-400 hover:text-white text-[10px] cursor-pointer"
                    >
                      Clear Log
                    </button>
                  </div>
                </div>

                {/* Log messages scroll */}
                <div className="p-4 sm:p-6 space-y-2 min-h-[220px] max-h-[320px] overflow-y-auto text-xs">
                  {cliLogs.map((log, idx) => (
                    <div key={idx} className={`leading-relaxed ${
                      log.type === 'cmd' ? 'text-blue-300 font-bold' :
                      log.type === 'success' ? 'text-emerald-400 font-bold' :
                      log.type === 'error' ? 'text-red-400' : 'text-zinc-300'
                    }`}>
                      {log.text}
                    </div>
                  ))}
                </div>

                {/* Input form */}
                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    executeAdminCommand(cliInput);
                  }}
                  className="px-4 py-3 bg-black/50 border-t border-white/10 flex items-center gap-3"
                >
                  <span className="text-emerald-400 font-black text-sm select-none">&gt;</span>
                  <input
                    type="text"
                    value={cliInput}
                    onChange={(e) => setCliInput(e.target.value)}
                    placeholder="e.g. add package Ultimate Discord Bot $25.00  OR  help"
                    className="flex-1 bg-transparent text-white font-sans text-xs focus:outline-none placeholder-zinc-600"
                    autoFocus
                  />
                  <button
                    type="submit"
                    className="px-4 py-1.5 rounded-lg bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs shadow-md transition-all cursor-pointer"
                  >
                    Execute
                  </button>
                </form>
              </div>

              {/* Quick Clickable Command Shortcuts */}
              <div className="space-y-2 pt-2">
                <div className="text-[11px] font-sans uppercase tracking-wider text-zinc-400 font-bold flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5 text-blue-400" />
                  <span>One-Click Quick Command Triggers:</span>
                </div>
                <div className="flex flex-wrap gap-2">
                  <button
                    type="button"
                    onClick={() => executeAdminCommand('add package Enterprise AI Discord Bot $29.00')}
                    className="px-3 py-1.5 rounded-xl bg-blue-600/20 hover:bg-blue-600/30 border border-blue-400/30 text-blue-200 text-xs font-semibold cursor-pointer transition-all"
                  >
                    + Add "Enterprise AI Bot" ($29)
                  </button>
                  <button
                    type="button"
                    onClick={() => executeAdminCommand('add offering Custom Machine Learning Pipeline')}
                    className="px-3 py-1.5 rounded-xl bg-cyan-600/20 hover:bg-cyan-600/30 border border-cyan-400/30 text-cyan-200 text-xs font-semibold cursor-pointer transition-all"
                  >
                    + Add "ML Pipeline" Offering
                  </button>
                  <button
                    type="button"
                    onClick={() => executeAdminCommand('price basic $4.00')}
                    className="px-3 py-1.5 rounded-xl bg-emerald-600/20 hover:bg-emerald-600/30 border border-emerald-400/30 text-emerald-200 text-xs font-semibold cursor-pointer transition-all"
                  >
                    Update Basic Price → $4.00
                  </button>
                  <button
                    type="button"
                    onClick={() => executeAdminCommand('banner on 🚀 FLASH SALE: 20% off all packages this weekend!')}
                    className="px-3 py-1.5 rounded-xl bg-amber-600/20 hover:bg-amber-600/30 border border-amber-400/30 text-amber-200 text-xs font-semibold cursor-pointer transition-all"
                  >
                    Turn On Flash Sale Banner
                  </button>
                  <button
                    type="button"
                    onClick={() => executeAdminCommand('confetti')}
                    className="px-3 py-1.5 rounded-xl bg-purple-600/20 hover:bg-purple-600/30 border border-purple-400/30 text-purple-200 text-xs font-semibold cursor-pointer transition-all"
                  >
                    🎉 Trigger Confetti
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* TAB 4: ANNOUNCEMENT BANNER */}
          {activeTab === 'announcement' && (
            <div className="max-w-2xl space-y-6">
              <div className="border-b border-white/10 pb-4">
                <h4 className="text-base font-bold text-white">Broadcast Announcement Banner</h4>
                <p className="text-xs text-zinc-400 mt-1">Display an attention-grabbing banner across the top of the entire website.</p>
              </div>

              <div className="p-6 rounded-2xl bg-white/[0.03] border border-white/10 space-y-4">
                <label className="flex items-center gap-3 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={draft.announcement.enabled}
                    onChange={(e) => {
                      const updatedDraft = {
                        ...draft,
                        announcement: {
                          ...draft.announcement,
                          enabled: e.target.checked,
                        },
                      };
                      updateDraft(updatedDraft, true);
                    }}
                    className="w-4 h-4 rounded bg-white/10 border-white/20 text-blue-600 focus:ring-0"
                  />
                  <div>
                    <div className="text-sm font-bold text-white">Enable Announcement Banner</div>
                    <div className="text-xs text-zinc-400">Shows a sleek header banner for offers, updates, or maintenance notes.</div>
                  </div>
                </label>

                <div className="space-y-2 pt-2">
                  <label className="text-xs font-sans font-bold text-zinc-400 uppercase">Banner Message</label>
                  <input
                    type="text"
                    value={draft.announcement.text}
                    onChange={(e) => {
                      const updatedDraft = {
                        ...draft,
                        announcement: {
                          ...draft.announcement,
                          text: e.target.value,
                        },
                      };
                      updateDraft(updatedDraft, true);
                    }}
                    placeholder="e.g. ⚡ Special offer: 20% off all Discord bot packages this week!"
                    className="w-full px-4 py-2.5 rounded-xl bg-white/5 border border-white/10 text-white text-xs focus:outline-none focus:border-blue-400 font-sans"
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-xs font-sans font-bold text-zinc-400 uppercase">Action Pill Text (Optional)</label>
                  <input
                    type="text"
                    value={draft.announcement.linkText || ''}
                    onChange={(e) => {
                      const updatedDraft = {
                        ...draft,
                        announcement: {
                          ...draft.announcement,
                          linkText: e.target.value,
                        },
                      };
                      updateDraft(updatedDraft, true);
                    }}
                    placeholder="e.g. View Packages"
                    className="w-full px-4 py-2.5 rounded-xl bg-white/5 border border-white/10 text-white text-xs focus:outline-none focus:border-blue-400 font-sans"
                  />
                </div>
              </div>
            </div>
          )}

          {/* TAB 5: GENERAL BRANDING & MOTTO */}
          {activeTab === 'general' && (
            <div className="max-w-2xl space-y-6">
              <div className="border-b border-white/10 pb-4">
                <h4 className="text-base font-bold text-white">Branding, Slogans &amp; Identity</h4>
                <p className="text-xs text-zinc-400 mt-1">Change core brand assets, mottos, and contact links.</p>
              </div>

              <div className="p-6 rounded-2xl bg-white/[0.03] border border-white/10 space-y-4">
                <div className="space-y-1.5">
                  <label className="text-xs font-sans font-bold text-zinc-400 uppercase">Brand Name</label>
                  <input
                    type="text"
                    value={draft.brandName}
                    onChange={(e) => {
                      const updatedDraft = { ...draft, brandName: e.target.value };
                      updateDraft(updatedDraft, true);
                    }}
                    className="w-full px-4 py-2.5 rounded-xl bg-white/5 border border-white/10 text-white text-sm font-bold focus:outline-none focus:border-blue-400 font-sans"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-sans font-bold text-zinc-400 uppercase">Brand Motto</label>
                  <input
                    type="text"
                    value={draft.motto}
                    onChange={(e) => {
                      const updatedDraft = { ...draft, motto: e.target.value };
                      updateDraft(updatedDraft, true);
                    }}
                    className="w-full px-4 py-2.5 rounded-xl bg-white/5 border border-white/10 text-blue-300 font-sans font-bold text-xs focus:outline-none focus:border-blue-400"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-sans font-bold text-zinc-400 uppercase">Hero Subheadline</label>
                  <textarea
                    rows={3}
                    value={draft.heroSubheadline}
                    onChange={(e) => {
                      const updatedDraft = { ...draft, heroSubheadline: e.target.value };
                      updateDraft(updatedDraft, true);
                    }}
                    className="w-full px-4 py-2.5 rounded-xl bg-white/5 border border-white/10 text-zinc-200 text-xs focus:outline-none focus:border-blue-400 resize-none font-sans"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                  <div className="space-y-1.5">
                    <label className="text-xs font-sans font-bold text-zinc-400 uppercase">Contact Email</label>
                    <input
                      type="email"
                      value={draft.contactEmail}
                      onChange={(e) => {
                        const updatedDraft = { ...draft, contactEmail: e.target.value };
                        updateDraft(updatedDraft, true);
                      }}
                      className="w-full px-4 py-2.5 rounded-xl bg-white/5 border border-white/10 text-zinc-200 text-xs focus:outline-none focus:border-blue-400 font-sans"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-sans font-bold text-zinc-400 uppercase">Discord Invite Link</label>
                    <input
                      type="text"
                      value={draft.discordInviteUrl}
                      onChange={(e) => {
                        const updatedDraft = { ...draft, discordInviteUrl: e.target.value };
                        updateDraft(updatedDraft, true);
                      }}
                      className="w-full px-4 py-2.5 rounded-xl bg-white/5 border border-white/10 text-zinc-200 text-xs focus:outline-none focus:border-blue-400 font-sans"
                    />
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* TAB: SKOPE INTEGRATIONS GMAIL VERIFICATION SETTINGS */}
          {activeTab === 'verification' && (
            <div className="space-y-6">
              <div className="border-b border-white/10 pb-4">
                <h4 className="text-base font-bold text-white flex items-center gap-2">
                  <Mail className="w-4 h-4 text-blue-400" />
                  <span>Skope Integrations · Gmail Email Verification Protocol</span>
                  <span className="px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-400 text-xs font-mono font-bold">
                    ACTIVE
                  </span>
                </h4>
                <p className="text-xs text-zinc-400 mt-1">
                  Users are strictly required to verify their email via a 6-digit verification code sent from Gmail through the name <strong>Skope Integrations</strong> before completing any package purchase.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Configuration Card */}
                <div className="p-6 rounded-2xl bg-black/40 border border-white/10 space-y-4">
                  <h5 className="text-xs font-bold text-blue-300 uppercase tracking-wider flex items-center gap-1.5">
                    <ShieldCheck className="w-4 h-4 text-blue-400" />
                    <span>Email Dispatch Identity</span>
                  </h5>

                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-zinc-300">Sender Display Name</label>
                    <input
                      type="text"
                      value={draft.verificationSettings?.senderName || 'Skope Integrations'}
                      onChange={(e) => {
                        const updated = {
                          ...draft,
                          verificationSettings: {
                            senderName: e.target.value,
                            senderService: draft.verificationSettings?.senderService || 'Gmail',
                            customMasterCode: draft.verificationSettings?.customMasterCode || 'SKOPE2026',
                          }
                        };
                        updateDraft(updated, true);
                      }}
                      className="w-full px-4 py-2.5 rounded-xl bg-white/5 border border-white/10 text-zinc-200 text-xs focus:outline-none focus:border-blue-400 font-sans"
                    />
                    <p className="text-[10px] text-zinc-500">The official name the user sees on their verification email.</p>
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-zinc-300">Email Service Provider</label>
                    <input
                      type="text"
                      disabled
                      value="Gmail (Google Workspace)"
                      className="w-full px-4 py-2.5 rounded-xl bg-white/5 border border-white/10 text-blue-300 text-xs font-mono opacity-80 cursor-not-allowed"
                    />
                  </div>

                  <div className="space-y-1.5 pt-2">
                    <label className="text-xs font-bold text-zinc-300 flex items-center justify-between">
                      <span>Admin Master Verification Code</span>
                      <span className="text-[10px] text-blue-400 font-mono">Bypass / Universal</span>
                    </label>
                    <input
                      type="text"
                      value={draft.verificationSettings?.customMasterCode || 'SKOPE2026'}
                      onChange={(e) => {
                        const updated = {
                          ...draft,
                          verificationSettings: {
                            senderName: draft.verificationSettings?.senderName || 'Skope Integrations',
                            senderService: draft.verificationSettings?.senderService || 'Gmail',
                            customMasterCode: e.target.value.toUpperCase(),
                          }
                        };
                        updateDraft(updated, true);
                      }}
                      placeholder="e.g. SKOPE2026"
                      className="w-full px-4 py-2.5 rounded-xl bg-white/5 border border-white/10 text-emerald-400 font-mono text-xs focus:outline-none focus:border-blue-400"
                    />
                    <p className="text-[10px] text-zinc-500">
                      When you send a verification code manually or test purchases, this master code will always be accepted.
                    </p>
                  </div>
                </div>

                {/* Status & Verification Log Card */}
                <div className="p-6 rounded-2xl bg-black/40 border border-white/10 space-y-4">
                  <h5 className="text-xs font-bold text-emerald-300 uppercase tracking-wider flex items-center gap-1.5">
                    <KeyRound className="w-4 h-4 text-emerald-400" />
                    <span>Live Verification Status</span>
                  </h5>

                  <div className="p-4 rounded-xl bg-white/[0.02] border border-white/5 space-y-2 text-xs">
                    <div className="flex items-center justify-between">
                      <span className="text-zinc-400">Enforcement:</span>
                      <span className="text-emerald-400 font-bold">100% Required on All Buys</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-zinc-400">Current Verified Session:</span>
                      <span className="text-white font-mono">
                        {localStorage.getItem('skope_verified_email') || 'None in this browser'}
                      </span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-zinc-400">Gmail Protocol:</span>
                      <span className="text-blue-300 font-semibold">Skope Integrations</span>
                    </div>
                  </div>

                  <div className="pt-2">
                    <button
                      type="button"
                      onClick={() => {
                        localStorage.removeItem('skope_verified_email');
                        sound.playDelete();
                        triggerCelebration();
                      }}
                      className="w-full py-2.5 rounded-xl bg-white/5 hover:bg-white/10 text-zinc-300 hover:text-white border border-white/10 text-xs font-bold transition-all cursor-pointer"
                    >
                      Clear Browser Verified Session Cache
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}

        </div>

        {/* Footer / Actions */}
        <div className="px-6 sm:px-8 py-4 border-t border-white/10 bg-[#000814] flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-zinc-400">
          <div className="flex items-center gap-2">
            <Lock className="w-4 h-4 text-emerald-400" />
            <span>Encrypted in local browser persistent storage • Live Reactive</span>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={onClose}
              className="px-4 py-2 rounded-xl text-zinc-400 hover:text-white hover:bg-white/5 transition-colors cursor-pointer"
            >
              Exit Console
            </button>
            <button
              onClick={handleSaveAll}
              className="px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-semibold shadow-md shadow-blue-600/30 transition-all flex items-center gap-2 cursor-pointer"
            >
              <Save className="w-3.5 h-3.5" />
              <span>Apply &amp; Save All</span>
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};
