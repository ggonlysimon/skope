export interface SilkPreset {
  id: string;
  name: string;
  subtitle: string;
  category: 'Luxury' | 'Dark & Moody' | 'Vibrant & Modern' | 'Ethereal';
  props: {
    speed: number;
    scale: number;
    color: string;
    noiseIntensity: number;
    rotation: number;
    lightMode: boolean;
  };
  description: string;
}

export const SILK_PRESETS: SilkPreset[] = [
  {
    id: 'midnight-obsidian',
    name: 'Midnight Obsidian',
    subtitle: 'Deep charcoal with subtle grain ripples',
    category: 'Dark & Moody',
    props: {
      speed: 3.5,
      scale: 1.15,
      color: '#1a1b24',
      noiseIntensity: 1.3,
      rotation: 0.35,
      lightMode: false,
    },
    description: 'Designed for stealth developer tools, moody luxury portfolios, and high-contrast dark mode interfaces.',
  },
  {
    id: 'champagne-satin',
    name: 'Champagne Satin',
    subtitle: 'Golden warm sheen with luminous folds',
    category: 'Luxury',
    props: {
      speed: 4.2,
      scale: 1.35,
      color: '#c9a875',
      noiseIntensity: 0.9,
      rotation: 1.1,
      lightMode: true,
    },
    description: 'Ideal for haute horlogerie, boutique editorial covers, architectural portfolios, and luxury e-commerce.',
  },
  {
    id: 'royal-amethyst',
    name: 'Imperial Amethyst',
    subtitle: 'Rich violet folds with velvet depth',
    category: 'Luxury',
    props: {
      speed: 4.8,
      scale: 0.95,
      color: '#4e2a6d',
      noiseIntensity: 1.4,
      rotation: 0.65,
      lightMode: false,
    },
    description: 'Deep royal purple reminiscent of heavy crushed velvet in an opera hall.',
  },
  {
    id: 'rose-petal',
    name: 'Blush Tulle',
    subtitle: 'Delicate powdery pink with high fold illumination',
    category: 'Ethereal',
    props: {
      speed: 3.8,
      scale: 1.2,
      color: '#bfa3ad',
      noiseIntensity: 1.1,
      rotation: 0.85,
      lightMode: true,
    },
    description: 'Soft and organic, perfect for cosmetic brands, serene wellness apps, and feminine editorial showcases.',
  },
  {
    id: 'emerald-damask',
    name: 'Verdant Damask',
    subtitle: 'Forest emerald with deep wave undulation',
    category: 'Vibrant & Modern',
    props: {
      speed: 5.2,
      scale: 1.4,
      color: '#1b4332',
      noiseIntensity: 1.25,
      rotation: 1.7,
      lightMode: false,
    },
    description: 'Lush botanical green evocative of heritage library tapestry and bespoke tailoring.',
  },
  {
    id: 'abyssal-cobalt',
    name: 'Abyssal Cobalt',
    subtitle: 'Atmospheric deep oceanic current',
    category: 'Vibrant & Modern',
    props: {
      speed: 6.0,
      scale: 0.85,
      color: '#162b4d',
      noiseIntensity: 1.8,
      rotation: 2.3,
      lightMode: false,
    },
    description: 'Dynamic oceanic currents for cutting-edge SaaS backdrops and spatial computational canvases.',
  },
  {
    id: 'pearl-organza',
    name: 'Pearl Organza',
    subtitle: 'Illuminated alabaster silk with fine micro-grain',
    category: 'Ethereal',
    props: {
      speed: 2.8,
      scale: 1.5,
      color: '#d6d3d1',
      noiseIntensity: 0.8,
      rotation: 0.1,
      lightMode: true,
    },
    description: 'Pure high-key drapery for minimalist gallery cards, high-end editorial lookbooks, and serene reading modes.',
  },
  {
    id: 'crimson-moire',
    name: 'Crimson Moiré',
    subtitle: 'Dramatic scarlet ripples with intense kinetic tension',
    category: 'Vibrant & Modern',
    props: {
      speed: 7.5,
      scale: 1.6,
      color: '#7f1d1d',
      noiseIntensity: 1.6,
      rotation: 0.95,
      lightMode: false,
    },
    description: 'High-energy crimson ripple with kinetic passion for festival launches and striking creative spectacles.',
  },
];
