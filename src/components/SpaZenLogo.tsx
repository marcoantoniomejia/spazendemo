import React from 'react';

interface SpaZenLogoProps {
  size?: 'sm' | 'md' | 'lg';
  showSubtitle?: boolean;
  className?: string;
  theme?: 'dark' | 'light';
}

export const SpaZenLogo: React.FC<SpaZenLogoProps> = ({
  size = 'md',
  showSubtitle = true,
  className = '',
  theme = 'light',
}) => {
  const isLg = size === 'lg';
  const isSm = size === 'sm';

  const iconSizes = {
    sm: 'w-8 h-8',
    md: 'w-10 h-10',
    lg: 'w-12 h-12',
  };

  const titleSizes = {
    sm: 'text-sm',
    md: 'text-base sm:text-lg',
    lg: 'text-xl sm:text-2xl',
  };

  const badgeSizes = {
    sm: 'text-[9px] px-1 py-0.2',
    md: 'text-[10px] px-1.5 py-0.5',
    lg: 'text-xs px-2 py-0.5',
  };

  return (
    <div className={`flex items-center gap-2.5 sm:gap-3 ${className}`}>
      {/* Zen Botanical Icon Emblem */}
      <div
        className={`${iconSizes[size]} rounded-2xl bg-gradient-to-br from-primary to-primary-container flex items-center justify-center text-white shadow-md shadow-primary/20 shrink-0 relative overflow-hidden group`}
      >
        {/* Subtle Zen Ripple Circles background */}
        <div className="absolute inset-0 opacity-15 pointer-events-none">
          <div className="w-full h-full rounded-full border border-white scale-125" />
          <div className="w-full h-full rounded-full border border-white scale-75" />
        </div>

        {/* Custom SVG: Harmonious Zen Stone + Lotus Leaf */}
        <svg
          className={isSm ? 'w-5 h-5' : isLg ? 'w-7 h-7' : 'w-6 h-6'}
          viewBox="0 0 32 32"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* Base Zen Stone */}
          <ellipse
            cx="16"
            cy="24"
            rx="10"
            ry="4.5"
            fill="currentColor"
            fillOpacity="0.35"
          />
          {/* Middle Zen Stone */}
          <ellipse
            cx="16"
            cy="18.5"
            rx="7.5"
            ry="3.5"
            fill="currentColor"
            fillOpacity="0.65"
          />
          {/* Top Lotus Petal / Botanical Leaf */}
          <path
            d="M16 4C14 8 11.5 11 11.5 13.5C11.5 16 13.5 17 16 17C18.5 17 20.5 16 20.5 13.5C20.5 11 18 8 16 4Z"
            fill="#E2B18A"
          />
          {/* Center serene stem line */}
          <path
            d="M16 6.5V15.5"
            stroke="white"
            strokeWidth="1.2"
            strokeLinecap="round"
          />
          {/* Leaf accent flourishes */}
          <path
            d="M9 16C9 13.5 11 11 13 9"
            stroke="currentColor"
            strokeWidth="1.2"
            strokeLinecap="round"
            strokeOpacity="0.5"
          />
          <path
            d="M23 16C23 13.5 21 11 19 9"
            stroke="currentColor"
            strokeWidth="1.2"
            strokeLinecap="round"
            strokeOpacity="0.5"
          />
        </svg>
      </div>

      {/* Brand Typography */}
      <div className="flex flex-col select-none leading-none">
        <div className="flex items-center gap-1.5">
          <span
            className={`${titleSizes[size]} font-serif font-bold tracking-tight ${
              theme === 'dark' ? 'text-white' : 'text-primary'
            }`}
          >
            SPA ZEN
          </span>
          <span
            className={`${badgeSizes[size]} font-sans font-extrabold uppercase rounded-md tracking-wider ${
              theme === 'dark'
                ? 'bg-white/15 text-white border border-white/20'
                : 'bg-primary/10 text-primary border border-primary/20'
            }`}
          >
            ADMIN
          </span>
        </div>

        {showSubtitle && (
          <span
            className={`text-[9px] sm:text-[10px] font-bold tracking-widest uppercase mt-0.5 ${
              theme === 'dark' ? 'text-white/60' : 'text-outline'
            }`}
          >
            SaaS Multi-tenant
          </span>
        )}
      </div>
    </div>
  );
};
