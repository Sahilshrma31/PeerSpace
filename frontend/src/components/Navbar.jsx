import React from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import PeerSpaceLogoIcon from './PeerSpaceLogoIcon';

export default function Navbar() {
  const router = useNavigate();
  const location = useLocation();
  const isAuthenticated = !!localStorage.getItem("token");

  const handleLogout = () => {
    localStorage.removeItem("token");
    router("/auth");
  };

  return (
    <div className="ramain-navbar-wrapper">
      <nav className="ramain-navbar">
        {/* Brand Logo (PeerSpace Icon + Text) */}
        <Link to="/home" className="ramain-logo" style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <PeerSpaceLogoIcon size={34} />
          <span>PeerSpace</span>
        </Link>

        {/* Center Nav Links (RamAIn Style) */}
        <div className="ramain-nav-links">
          <Link to="/home" className="ramain-nav-link">
            Platform
          </Link>
          <span 
            onClick={() => {
              if (location.pathname !== '/home' && location.pathname !== '/') {
                router('/home');
                setTimeout(() => document.getElementById('features')?.scrollIntoView({ behavior: 'smooth' }), 150);
              } else {
                document.getElementById('features')?.scrollIntoView({ behavior: 'smooth' });
              }
            }} 
            className="ramain-nav-link" 
            style={{ cursor: 'pointer' }}
          >
            Features
          </span>
          {isAuthenticated ? (
            <Link to="/history" className="ramain-nav-link">
              Call History
            </Link>
          ) : (
            <Link to="/auth" className="ramain-nav-link">
              Call History
            </Link>
          )}
          <span 
            onClick={() => router("/aljk23")} 
            className="ramain-nav-link" 
            style={{ cursor: 'pointer' }}
          >
            Guest Room
          </span>
        </div>

        {/* Action Buttons */}
        <div className="ramain-nav-actions">
          <button 
            type="button" 
            className="btn-lime" 
            onClick={() => router("/aljk23")}
          >
            Join as Guest
          </button>
          
          {isAuthenticated ? (
            <button 
              type="button" 
              className="btn-dark" 
              onClick={handleLogout}
            >
              Logout
            </button>
          ) : (
            <button 
              type="button" 
              className="btn-dark" 
              onClick={() => router("/auth")}
            >
              Get Started
            </button>
          )}
        </div>
      </nav>
    </div>
  );
}
