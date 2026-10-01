import React from 'react';

interface ResortLogoProps {
  className?: string;
  variant?: 'light' | 'dark' | 'color';
  size?: 'sm' | 'md' | 'lg';
  showTagline?: boolean;
}

export const ResortLogo: React.FC<ResortLogoProps> = ({
  className = '',
  variant = 'color',
  size = 'md',
  showTagline = false,
}) => {
  const isLight = variant === 'light';

  const iconSizes = {
    sm: 'w-8 h-8',
    md: 'w-10 h-10',
    lg: 'w-14 h-14',
  };

  const titleSizes = {
    sm: 'text-base',
    md: 'text-lg md:text-xl',
    lg: 'text-2xl md:text-3xl',
  };

  return (
    <div className={`flex items-center gap-3 select-none ${className}`}>
      {/* Tropical SVG Emblem */}
      <div className={`relative flex items-center justify-center shrink-0 ${iconSizes[size]}`}>
        <svg
          viewBox="0 0 100 100"
          className="w-full h-full drop-shadow-sm"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* Outer Sun Halo */}
          <circle
            cx="50"
            cy="50"
            r="46"
            className={isLight ? 'stroke-amber-300/40' : 'stroke-amber-500/30'}
            strokeWidth="2"
            strokeDasharray="4 3"
          />
          {/* Inner Golden Sun Disc */}
          <circle
            cx="50"
            cy="46"
            r="24"
            className={isLight ? 'fill-amber-300' : 'fill-amber-400'}
            opacity="0.9"
          />
          {/* Tropical Palm Tree Silhouette */}
          <path
            d="M50 78 C 50 62, 54 46, 52 38 C 47 36, 38 42, 32 46 C 40 40, 47 38, 51 36 C 46 31, 36 28, 28 30 C 38 28, 48 33, 52 35 C 51 28, 47 18, 40 12 C 48 18, 52 26, 53 34 C 57 26, 64 19, 72 16 C 65 22, 60 30, 56 35 C 64 30, 74 29, 82 32 C 72 32, 62 37, 56 38 C 64 42, 70 48, 74 56 C 68 50, 60 44, 54 41 C 53 48, 52 64, 52 78 Z"
            className={isLight ? 'fill-emerald-200' : 'fill-emerald-800'}
          />
          {/* Gentle Sea Waves */}
          <path
            d="M10 74 C 20 70, 30 78, 40 74 C 50 70, 60 78, 70 74 C 80 70, 90 78, 96 74"
            className={isLight ? 'stroke-cyan-200' : 'stroke-teal-600'}
            strokeWidth="3.5"
            strokeLinecap="round"
          />
          <path
            d="M14 83 C 24 80, 34 86, 44 83 C 54 80, 64 86, 74 83 C 84 80, 92 84, 96 83"
            className={isLight ? 'stroke-cyan-300/80' : 'stroke-cyan-600/80'}
            strokeWidth="2.5"
            strokeLinecap="round"
          />
        </svg>
      </div>

      {/* Typography */}
      <div className="flex flex-col text-left leading-tight">
        <span
          className={`font-serif tracking-wider uppercase font-bold ${titleSizes[size]} ${
            isLight ? 'text-white' : 'text-stone-900'
          }`}
          style={{ letterSpacing: '0.08em' }}
        >
          Bikini Valley
        </span>
        <span
          className={`text-[10px] md:text-xs tracking-[0.24em] uppercase font-semibold ${
            isLight ? 'text-amber-300' : 'text-teal-700'
          }`}
        >
          Resort &bull; La Union
        </span>
        {showTagline && (
          <span
            className={`text-[11px] italic font-serif mt-0.5 ${
              isLight ? 'text-stone-300' : 'text-stone-500'
            }`}
          >
            Relax. Explore. Experience.
          </span>
        )}
      </div>
    </div>
  );
};
