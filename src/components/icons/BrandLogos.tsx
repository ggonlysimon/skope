import React from 'react';

interface BrandIconProps {
  className?: string;
  size?: number;
}

/**
 * Official Wise Logo:
 * Exact Fast Flag / "W" angular brand emblem in signature Wise Bright Green (#9FE870 / #163300)
 */
export const WiseLogo: React.FC<BrandIconProps> = ({ className = 'w-5 h-5', size }) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
    style={size ? { width: size, height: size } : undefined}
  >
    {/* Wise Fast-Flag dynamic geometry */}
    <path
      d="M3.5 4.5L10.2 12.5L7.5 19.5L14.8 19.5L20.5 4.5L3.5 4.5ZM13.8 7.5L16.2 7.5L13.2 15.5L11.5 15.5L13.8 7.5Z"
      fill="#9FE870"
    />
    <path
      d="M1.5 6.5L8.2 14.5L6.5 19.5L9.5 19.5L11.2 14.8L6.8 9.5L18.5 9.5L19.5 6.5L1.5 6.5Z"
      fill="#163300"
      opacity="0.15"
    />
  </svg>
);

/**
 * Roblox Logo (Blue & White Edition):
 * Clean, modern Roblox tilted square emblem styled in vibrant electric blue (#00A2FF) and crisp white (#FFFFFF)
 */
export const RobloxLogo: React.FC<BrandIconProps> = ({ className = 'w-5 h-5', size }) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
    style={size ? { width: size, height: size } : undefined}
  >
    {/* Roblox Iconic Tilted Square in Electric Blue with subtle gradient */}
    <path
      d="M5.2 2.1L21.9 6.5L18.8 23.2L2.1 18.8L5.2 2.1Z"
      fill="url(#robloxBlueGradient)"
    />
    {/* Inner Square Cutout in Crisp Pure White */}
    <path
      d="M10.2 10.4L14.5 11.5L13.4 15.8L9.1 14.7L10.2 10.4Z"
      fill="#FFFFFF"
    />
    <defs>
      <linearGradient id="robloxBlueGradient" x1="2.1" y1="2.1" x2="21.9" y2="23.2" gradientUnits="userSpaceOnUse">
        <stop stopColor="#38BDF8" />
        <stop offset="0.6" stopColor="#0284C7" />
        <stop offset="1" stopColor="#0369A1" />
      </linearGradient>
    </defs>
  </svg>
);

/**
 * Robux Gold Coin Emblem:
 * Authentic golden Robux hexagonal coin badge
 */
export const RobuxCoinLogo: React.FC<BrandIconProps> = ({ className = 'w-5 h-5', size }) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
    style={size ? { width: size, height: size } : undefined}
  >
    {/* Hexagonal Outer Gold Coin */}
    <polygon
      points="12,2 20.66,7 20.66,17 12,22 3.34,17 3.34,7"
      fill="url(#robuxGoldGradient)"
      stroke="#F59E0B"
      strokeWidth="1"
    />
    {/* Inner Hexagon Ring */}
    <polygon
      points="12,5 18,8.5 18,15.5 12,19 6,15.5 6,8.5"
      fill="#D97706"
      opacity="0.3"
    />
    {/* Center Roblox Square */}
    <rect
      x="9"
      y="9"
      width="6"
      height="6"
      rx="1"
      transform="rotate(15 12 12)"
      fill="#FFFFFF"
    />
    <rect
      x="10.5"
      y="10.5"
      width="3"
      height="3"
      rx="0.5"
      transform="rotate(15 12 12)"
      fill="#92400E"
    />
    <defs>
      <linearGradient id="robuxGoldGradient" x1="3.34" y1="2" x2="20.66" y2="22" gradientUnits="userSpaceOnUse">
        <stop stopColor="#FDE68A" />
        <stop offset="0.5" stopColor="#F59E0B" />
        <stop offset="1" stopColor="#D97706" />
      </linearGradient>
    </defs>
  </svg>
);

/**
 * Authentic Multi-Crypto Cluster Logo:
 * Features Bitcoin Gold, Ethereum Diamond Blue/Purple, Tether Emerald, and Solana Gradient
 */
export const CryptoLogo: React.FC<BrandIconProps> = ({ className = 'w-5 h-5', size }) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
    style={size ? { width: size, height: size } : undefined}
  >
    {/* Bitcoin / Crypto Coin Base */}
    <circle cx="12" cy="12" r="10" fill="url(#cryptoGrad)" stroke="#38BDF8" strokeWidth="1" />
    
    {/* Ethereum Diamond facets */}
    <path d="M12 4.5L16 11.5L12 14L8 11.5L12 4.5Z" fill="#627EEA" opacity="0.9" />
    <path d="M12 4.5L12 14L8 11.5L12 4.5Z" fill="#8A92B2" opacity="0.8" />
    <path d="M12 14.8L16 12.5L12 18.5L12 14.8Z" fill="#627EEA" opacity="0.9" />
    <path d="M12 14.8L8 12.5L12 18.5L12 14.8Z" fill="#C0C7DC" opacity="0.7" />

    {/* Center Tether / Bitcoin Accent lines */}
    <circle cx="12" cy="11.5" r="2.2" fill="#26A17B" stroke="#FFFFFF" strokeWidth="0.8" />
    <path d="M11 11H13M12 10V13" stroke="#FFFFFF" strokeWidth="0.8" strokeLinecap="round" />

    <defs>
      <linearGradient id="cryptoGrad" x1="2" y1="2" x2="22" y2="22" gradientUnits="userSpaceOnUse">
        <stop stopColor="#0F172A" />
        <stop offset="0.5" stopColor="#1E293B" />
        <stop offset="1" stopColor="#0284C7" />
      </linearGradient>
    </defs>
  </svg>
);

/**
 * Dedicated Tether USDT Logo (Authentic Emerald Teal #26A17B)
 */
export const TetherLogo: React.FC<BrandIconProps> = ({ className = 'w-4 h-4', size }) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
    style={size ? { width: size, height: size } : undefined}
  >
    <circle cx="12" cy="12" r="10" fill="#26A17B" />
    <path
      d="M13.2 9.5V7.5H16.5V5.5H7.5V7.5H10.8V9.5C6.9 9.8 4 10.7 4 11.7C4 12.8 6.9 13.6 10.8 13.9V18.5H13.2V13.9C17.1 13.6 20 12.8 20 11.7C20 10.7 17.1 9.8 13.2 9.5ZM12 12.7C8.7 12.7 6.4 12 6.4 11.7C6.4 11.4 8.7 10.7 12 10.7C15.3 10.7 17.6 11.4 17.6 11.7C17.6 12 15.3 12.7 12 12.7Z"
      fill="#FFFFFF"
    />
  </svg>
);

/**
 * Dedicated Solana Logo (Authentic Purple-to-Cyan gradient)
 */
export const SolanaLogo: React.FC<BrandIconProps> = ({ className = 'w-4 h-4', size }) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
    style={size ? { width: size, height: size } : undefined}
  >
    <path
      d="M4.5 17.8L6.8 15.5C7.1 15.2 7.5 15 8 15H19.5L17.2 17.3C16.9 17.6 16.5 17.8 16 17.8H4.5Z"
      fill="url(#solGrad1)"
    />
    <path
      d="M4.5 6.2L6.8 8.5C7.1 8.8 7.5 9 8 9H19.5L17.2 6.7C16.9 6.4 16.5 6.2 16 6.2H4.5Z"
      fill="url(#solGrad2)"
    />
    <path
      d="M19.5 12L17.2 9.7C16.9 9.4 16.5 9.2 16 9.2H4.5L6.8 11.5C7.1 11.8 7.5 12 8 12H19.5Z"
      fill="url(#solGrad3)"
    />
    <defs>
      <linearGradient id="solGrad1" x1="4.5" y1="16.4" x2="19.5" y2="16.4" gradientUnits="userSpaceOnUse">
        <stop stopColor="#00FFA3" />
        <stop offset="1" stopColor="#DC1FFF" />
      </linearGradient>
      <linearGradient id="solGrad2" x1="4.5" y1="7.6" x2="19.5" y2="7.6" gradientUnits="userSpaceOnUse">
        <stop stopColor="#00FFA3" />
        <stop offset="1" stopColor="#DC1FFF" />
      </linearGradient>
      <linearGradient id="solGrad3" x1="4.5" y1="10.6" x2="19.5" y2="10.6" gradientUnits="userSpaceOnUse">
        <stop stopColor="#DC1FFF" />
        <stop offset="1" stopColor="#00FFA3" />
      </linearGradient>
    </defs>
  </svg>
);
