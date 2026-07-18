import React from 'react';

export default function PeerSpaceLogoIcon({ size = 32, className = "", style = {} }) {
  return (
    <img
      src={process.env.PUBLIC_URL + '/peerspace.png'}
      alt="PeerSpace Logo"
      width={size}
      height={size}
      className={className}
      style={{ display: 'inline-block', flexShrink: 0, objectFit: 'contain', mixBlendMode: 'multiply', ...style }}
    />
  );
}
