import React from 'react';

interface MandalaProps {
  className?: string;
  size?: number; // scale factor
  variant?: 'full' | 'half-top' | 'half-bottom' | 'half-left' | 'half-right';
}

export const Mandala: React.FC<MandalaProps> = ({ 
  className = '', 
  variant = 'full' 
}) => {
  // Number of petals in each concentric layer
  const outerCount = 36;
  const middleCount = 24;
  const innerCount = 12;

  // Render individual petal elements programmatically with mathematically centered transforms
  const renderPetals = (count: number, scale: number, opacity: number, pathD: string) => {
    return Array.from({ length: count }).map((_, i) => {
      const angle = i * (360 / count);
      return (
        <path
          key={`${count}-${i}`}
          d={pathD}
          transform={`translate(50, 50) rotate(${angle}) scale(${scale}) translate(-50, -50)`}
          style={{ opacity }}
          className="fill-current"
        />
      );
    });
  };

  // Outer lace points path
  const outerPetalPath = "M50,50 C48,22 43,8 50,0 C57,8 52,22 50,50 Z";
  // Middle petal path
  const middlePetalPath = "M50,50 C46,28 38,18 50,10 C62,18 54,28 50,50 Z";
  // Inner petal path
  const innerPetalPath = "M50,50 C47,34 42,26 50,20 C58,26 53,34 50,50 Z";

  let viewBox = "0 0 100 100";
  let clipStyle: React.CSSProperties = {};

  if (variant === 'half-top') {
    viewBox = "0 0 100 50";
    clipStyle = { transformOrigin: 'bottom center' };
  } else if (variant === 'half-bottom') {
    viewBox = "50 50 100 50";
  }

  return (
    <svg 
      viewBox={viewBox} 
      className={`fill-current text-luxury-gold drop-shadow-[0_0_12px_rgba(212,175,55,0.35)] pointer-events-none ${className}`}
      style={clipStyle}
    >
      <defs>
        {/* Soft radial golden gradient inside the SVG */}
        <radialGradient id="goldRadial" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#FFFDF6" />
          <stop offset="30%" stopColor="#F7E7A9" />
          <stop offset="70%" stopColor="#D4AF37" />
          <stop offset="100%" stopColor="#AA7C11" />
        </radialGradient>
      </defs>

      {/* Main Mandala Group */}
      <g fill="url(#goldRadial)">
        {/* Outer Ring */}
        {renderPetals(outerCount, 0.95, 0.75, outerPetalPath)}

        {/* Lace circle connections */}
        <circle cx="50" cy="50" r="42" className="fill-none stroke-current" strokeWidth="0.5" strokeDasharray="1,1.5" opacity="0.6" />
        <circle cx="50" cy="50" r="38" className="fill-none stroke-current" strokeWidth="0.75" opacity="0.5" />

        {/* Middle Ring */}
        {renderPetals(middleCount, 0.78, 0.9, middlePetalPath)}

        {/* Middle decorative dots */}
        <circle cx="50" cy="50" r="28" className="fill-none stroke-current" strokeWidth="0.75" strokeDasharray="2,3" opacity="0.7" />

        {/* Inner Ring */}
        {renderPetals(innerCount, 0.58, 1, innerPetalPath)}

        {/* Center Core structure */}
        <circle cx="50" cy="50" r="14" className="stroke-current fill-none" strokeWidth="0.5" opacity="0.8" />
        <circle cx="50" cy="50" r="10" className="fill-current text-luxury-goldLight" />
        <circle cx="50" cy="50" r="6" className="fill-current text-royal-dark" />
        <circle cx="50" cy="50" r="3" className="fill-current text-luxury-goldLight animate-pulse" />
      </g>
    </svg>
  );
};
