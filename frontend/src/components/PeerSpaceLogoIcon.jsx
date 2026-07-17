import React from 'react';

export default function PeerSpaceLogoIcon({ size = 32, className = "", style = {} }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 100 100"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      style={{ display: 'inline-block', flexShrink: 0, boxShadow: '0 2px 10px rgba(163, 230, 53, 0.35)', borderRadius: '26%', ...style }}
    >
      {/* Outer White Squircle Background */}
      <rect width="100" height="100" rx="26" fill="#FFFFFF" />
      <rect width="100" height="100" rx="26" stroke="#F1F5F9" strokeWidth="2" />

      {/* Main Lime Green Play / Triangle Base pointing right */}
      <path
        d="M36 20 C40 20 74 44 74 50 C74 56 40 80 36 80 C28 80 26 74 26 64 L26 36 C26 26 28 20 36 20 Z"
        fill="#A3E635"
      />

      {/* Left Peer Avatar Head & Shoulder facing center */}
      <circle cx="32" cy="42" r="8.5" fill="#0F172A" />
      <path
        d="M23 64 C23 55 29 51 36 54 C39 56 41 61 38 66 C35 71 28 72 23 64 Z"
        fill="#0F172A"
      />

      {/* Right Peer Avatar Head & Shoulder facing center */}
      <circle cx="68" cy="45" r="8.5" fill="#0F172A" />
      <path
        d="M77 67 C77 58 70 54 63 57 C60 59 58 64 61 69 C64 74 72 75 77 67 Z"
        fill="#0F172A"
      />

      {/* Center White Chat / Speech Bubble */}
      <path
        d="M38 46 C38 41 43 37 49 37 C55 37 60 41 60 46 C60 51 55 55 49 55 C47 55 45 55.5 43.5 56.5 L40 59 L41 55.2 C39.5 53.5 38 50 38 46 Z"
        fill="#FFFFFF"
      />

      {/* Three Dark Conversation Dots inside bubble */}
      <circle cx="44.5" cy="46" r="2.2" fill="#0F172A" />
      <circle cx="49" cy="46" r="2.2" fill="#0F172A" />
      <circle cx="53.5" cy="46" r="2.2" fill="#0F172A" />
    </svg>
  );
}
