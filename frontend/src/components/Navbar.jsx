import React from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';

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
        {/* Brand Logo (RamAIn Icon + Text) */}
        <Link to={isAuthenticated ? "/home" : "/"} className="ramain-logo">
          <div className="ramain-logo-icon">▶</div>
          <span>PeerSpace</span>
        </Link>

        {/* Center Nav Links (RamAIn Style) */}
        <div className="ramain-nav-links">
          <Link to={isAuthenticated ? "/home" : "/"} className="ramain-nav-link">
            Platform
          </Link>
          <Link to={isAuthenticated ? "/history" : "/auth"} className="ramain-nav-link">
            {isAuthenticated ? "Call History" : "Features"}
          </Link>
          <span 
            onClick={() => router("/aljk23")} 
            className="ramain-nav-link" 
            style={{ cursor: 'pointer' }}
          >
            Guest Room
          </span>
          <a href="#about" className="ramain-nav-link">
            Docs
          </a>
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
