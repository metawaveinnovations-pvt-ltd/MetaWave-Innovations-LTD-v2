import React from 'react';

interface LogoProps {
  className?: string;
  size?: number;
  showText?: boolean;
}

export default function MetaWaveLogo({ className = '', size = 32, showText = false }: LogoProps) {
  // We represent the brand new official MetaWave Innovations Logo design perfectly.
  // It features high-tech upward arrows, nested chevrons, integrated circuit board traces,
  // and a bottom anchor diamond, utilizing a premium emerald-to-teal metallic gradient.
  return (
    <div className={`flex items-center gap-2.5 select-none ${className}`} id="metawave-logo">
      <svg
        width={size}
        height={size}
        viewBox="0 0 100 100"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="transition-all duration-300 transform hover:scale-105"
        style={{ width: `${size}px`, height: `${size}px` }}
      >
        <defs>
          {/* Main metallic 3D gradient matching the flagship green and emerald tone */}
          <linearGradient id="metaWaveLogoGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#10B981" /> {/* Vibrant Emerald */}
            <stop offset="60%" stopColor="#326E45" /> {/* Brand Core Green */}
            <stop offset="100%" stopColor="#14532D" /> {/* Deep Forest Green */}
          </linearGradient>
          
          {/* Subtle drop shadow filter for 3D depth perspective */}
          <filter id="logoShadow" x="-10%" y="-10%" width="130%" height="130%">
            <feDropShadow dx="0" dy="1.5" stdDeviation="1.2" floodColor="#0F172A" floodOpacity="0.12" />
          </filter>
        </defs>

        <g filter="url(#logoShadow)">
          {/* 1. TOP CENTER CHEVRON ARROW */}
          <path
            d="M 50 12 L 68 30 L 59 34 L 50 25 L 41 34 L 32 30 Z"
            fill="url(#metaWaveLogoGrad)"
          />
          
          {/* 2. DYNAMIC CENTER DOT UNDER HEAD */}
          <circle cx="50" cy="38" r="3.2" fill="url(#metaWaveLogoGrad)" />

          {/* 3. LEFT ANGLED CHEVRON (with high-tech circuit board lines) */}
          <path
            d="M 30 32 L 39 44 L 34 47 L 27 38 L 20 47 L 15 44 Z"
            fill="url(#metaWaveLogoGrad)"
          />
          {/* Left Circuit traces */}
          <path
            d="M 23 44 L 29 36 L 35 44"
            stroke="#A7F3D0"
            strokeWidth="0.8"
            strokeLinecap="round"
            strokeLinejoin="round"
            fill="none"
            opacity="0.9"
          />
          <circle cx="23" cy="44" r="1" fill="#A7F3D0" />
          <circle cx="35" cy="44" r="1" fill="#A7F3D0" />

          {/* 4. RIGHT ANGLED CHEVRON (symmetrical with high-tech circuit board lines) */}
          <path
            d="M 70 32 L 85 44 L 80 47 L 73 38 L 66 47 L 61 44 Z"
            fill="url(#metaWaveLogoGrad)"
          />
          {/* Right Circuit traces */}
          <path
            d="M 77 44 L 71 36 L 65 44"
            stroke="#A7F3D0"
            strokeWidth="0.8"
            strokeLinecap="round"
            strokeLinejoin="round"
            fill="none"
            opacity="0.9"
          />
          <circle cx="77" cy="44" r="1" fill="#A7F3D0" />
          <circle cx="65" cy="44" r="1" fill="#A7F3D0" />

          {/* 5. CENTER NESTED CHEVRON */}
          <path
            d="M 50 42 L 62 54 L 56 57 L 50 51 L 44 57 L 38 54 Z"
            fill="url(#metaWaveLogoGrad)"
          />

          {/* 6. BOTTOM ANCHOR DIAMOND (with vertical circuit board traces) */}
          <path
            d="M 50 56 L 59 68 L 50 80 L 41 68 Z"
            fill="url(#metaWaveLogoGrad)"
          />
          {/* Diamond Vertical Circuit trace paths */}
          <path
            d="M 50 59 L 50 77"
            stroke="#A7F3D0"
            strokeWidth="0.8"
            strokeLinecap="round"
            fill="none"
            opacity="0.95"
          />
          <path
            d="M 46 64 L 46 72"
            stroke="#A7F3D0"
            strokeWidth="0.8"
            strokeLinecap="round"
            fill="none"
            opacity="0.85"
          />
          <path
            d="M 54 64 L 54 72"
            stroke="#A7F3D0"
            strokeWidth="0.8"
            strokeLinecap="round"
            fill="none"
            opacity="0.85"
          />
          <circle cx="50" cy="71" r="1" fill="#A7F3D0" />
          <circle cx="46" cy="68" r="0.8" fill="#A7F3D0" />
          <circle cx="54" cy="68" r="0.8" fill="#A7F3D0" />
        </g>
      </svg>

      {showText && (
        <div className="flex flex-col text-left">
          <span className="font-sans font-extrabold text-[#1E293B] text-xs tracking-wider leading-none uppercase">
            MetaWave
          </span>
          <span className="font-mono text-[8px] font-black tracking-widest text-[#326E45] mt-0.5 uppercase leading-none">
            Innovations
          </span>
        </div>
      )}
    </div>
  );
}
