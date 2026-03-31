import React from 'react';

interface BabaAvatarProps {
  className?: string;
  size?: number;
}

export const BabaAvatar: React.FC<BabaAvatarProps> = ({ className = "", size = 100 }) => {
  return (
    <div className={`relative inline-block ${className}`} style={{ width: size, height: size }}>
      <svg
        viewBox="0 0 100 100"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-full drop-shadow-lg"
      >
        {/* Background Circle */}
        <circle cx="50" cy="50" r="48" fill="white" stroke="#c75b39" strokeWidth="2" />
        
        {/* Face Shape */}
        <path
          d="M50 85C65 85 75 75 75 55C75 35 65 25 50 25C35 25 25 35 25 55C25 75 35 85 50 85Z"
          fill="#f5d5b0"
        />
        
        {/* Red Chechia (Traditional Tunisian Hat) */}
        <path
          d="M28 35C28 20 40 10 50 10C60 10 72 20 72 35C72 40 68 45 50 45C32 45 28 40 28 35Z"
          fill="#b32428"
        />
        <circle cx="50" cy="10" r="2" fill="#b32428" />
        
        {/* White Beard */}
        <path
          d="M25 55C25 75 35 92 50 92C65 92 75 75 75 55C75 65 65 75 50 75C35 75 25 65 25 55Z"
          fill="#ffffff"
        />
        
        {/* Moustache */}
        <path
          d="M38 62C42 60 48 60 50 62C52 60 58 60 62 62C65 65 60 70 50 68C40 70 35 65 38 62Z"
          fill="#f0f0f0"
        />

        {/* Eyes (Closed/Sage look) */}
        <path d="M40 50C42 48 45 48 47 50" stroke="#4a3728" strokeWidth="1.5" strokeLinecap="round" />
        <path d="M53 50C55 48 58 48 60 50" stroke="#4a3728" strokeWidth="1.5" strokeLinecap="round" />
        
        {/* Eyebrows (White) */}
        <path d="M38 45C42 43 45 43 47 45" stroke="white" strokeWidth="2" strokeLinecap="round" />
        <path d="M53 45C55 43 58 43 62 45" stroke="white" strokeWidth="2" strokeLinecap="round" />

        {/* Nose */}
        <path d="M48 55C48 55 50 58 52 55" stroke="#d4a373" strokeWidth="1" />

        {/* Details for age / Wisdom */}
        <path d="M48 35L52 35" stroke="#ffffff" strokeWidth="0.5" opacity="0.3" />
      </svg>
      
      {/* Animated Pulse for when active */}
      <div className="absolute inset-0 rounded-full border-2 border-terracotta/20 animate-ping" style={{ animationDuration: '3s' }} />
    </div>
  );
};
