import React from 'react';

interface LogoProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg';
}

export const Logo: React.FC<LogoProps> = ({ className = '', size = 'md' }) => {
  const iconSize = size === 'sm' ? 24 : size === 'lg' ? 36 : 28;
  const textSize = size === 'sm' ? 'text-lg' : size === 'lg' ? 'text-2xl' : 'text-xl';

  return (
    <div className={`flex items-center gap-2.5 font-bold tracking-tight select-none ${className}`}>
      {/* Precision Vector Mark: Droplet + Circular Chute + Leaf */}
      <div 
        className="relative flex items-center justify-center rounded-xl bg-gradient-to-br from-[#101C2C] to-[#162437] border border-[#29394D] shadow-sm shrink-0"
        style={{ width: iconSize + 10, height: iconSize + 10 }}
        aria-hidden="true"
      >
        <svg 
          width={iconSize} 
          height={iconSize} 
          viewBox="0 0 32 32" 
          fill="none" 
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* Water droplet base */}
          <path 
            d="M16 4C16 4 9 13.2 9 19C9 22.866 12.134 26 16 26C19.866 26 23 22.866 23 19C23 13.2 16 4 16 4Z" 
            fill="url(#waterGrad)"
            opacity="0.22"
          />
          {/* Outer circular recycling arc */}
          <path 
            d="M16 6C22.6274 6 28 11.3726 28 18C28 20.3 27.35 22.45 26.22 24.28" 
            stroke="#06B6D4" 
            strokeWidth="2.4" 
            strokeLinecap="round"
          />
          <path 
            d="M27.5 13L28 18.2L22.8 17.8" 
            stroke="#06B6D4" 
            strokeWidth="2.2" 
            strokeLinecap="round" 
            strokeLinejoin="round"
          />
          {/* Reverse circular recycling arc */}
          <path 
            d="M16 28C9.37258 28 4 22.6274 4 16C4 13.7 4.65 11.55 5.78 9.72" 
            stroke="#22C55E" 
            strokeWidth="2.4" 
            strokeLinecap="round"
          />
          <path 
            d="M4.5 21L4 15.8L9.2 16.2" 
            stroke="#22C55E" 
            strokeWidth="2.2" 
            strokeLinecap="round" 
            strokeLinejoin="round"
          />
          {/* Integrated circular leaf in center */}
          <path 
            d="M16 11C13.5 14 13 18 16 21C19 18 18.5 14 16 11Z" 
            fill="url(#leafGrad)"
          />
          <path 
            d="M16 14V19" 
            stroke="#0B1220" 
            strokeWidth="1.5" 
            strokeLinecap="round"
          />

          <defs>
            <linearGradient id="waterGrad" x1="9" y1="4" x2="23" y2="26" gradientUnits="userSpaceOnUse">
              <stop stopColor="#06B6D4" />
              <stop offset="1" stopColor="#14B8A6" />
            </linearGradient>
            <linearGradient id="leafGrad" x1="13" y1="11" x2="19" y2="21" gradientUnits="userSpaceOnUse">
              <stop stopColor="#22C55E" />
              <stop offset="1" stopColor="#14B8A6" />
            </linearGradient>
          </defs>
        </svg>
      </div>

      {/* Brand Wordmark */}
      <span className={`${textSize} font-extrabold text-[#F8FAFC] tracking-tight font-heading flex items-center`}>
        Waste<span className="text-[#22C55E]">2</span><span className="text-[#06B6D4]">Worth</span>
      </span>
    </div>
  );
};
