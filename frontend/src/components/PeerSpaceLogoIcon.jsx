import React from 'react';

export default function PeerSpaceLogoIcon({ size = 32, className = "", style = {} }) {
  return (
    <img
      src="/peerspace.png"
      alt="PeerSpace Logo"
      width={size}
      height={size}
      className={className}
      style={{ display: 'inline-block', flexShrink: 0, borderRadius: '26%', objectFit: 'contain', ...style }}
    />
  );
}
