import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';

export default function LandingPage() {
    const router = useNavigate();
    const [meetingCode, setMeetingCode] = useState('');

    const handleQuickJoin = (e) => {
        e.preventDefault();
        const code = meetingCode.trim() || 'aljk23';
        router(`/${code}`);
    };

    return (
        <div style={{ minHeight: '100vh', paddingBottom: '80px', position: 'relative', overflow: 'hidden' }}>
            {/* Background Vector Orbit Ring */}
            <svg className="vector-bg-decoration" width="750" height="750" viewBox="0 0 750 750" fill="none" style={{ top: '32%', left: '50%', animation: 'vectorRingSpin 90s linear infinite' }}>
                <circle cx="375" cy="375" r="340" stroke="var(--border-light)" strokeWidth="1.5" strokeDasharray="16 16" />
                <circle cx="375" cy="375" r="250" stroke="var(--border-light)" strokeWidth="1" />
                <circle cx="375" cy="35" r="7" fill="#10B981" />
                <circle cx="715" cy="375" r="5" fill="var(--accent-lime)" />
            </svg>

            {/* Unified RamAIn Navbar */}
            <Navbar />

            {/* Main Hero Card */}
            <div className="ramain-hero-container vector-float" style={{ textAlign: 'center', position: 'relative', zIndex: 2 }}>
                <h1 className="ramain-title">
                    <span className="lime-highlight">Connect</span> with your<br />
                    loved ones in real-time.
                </h1>

                <p className="ramain-subtitle">
                    Feel closer, no matter how far. Crystal-clear HD video and seamless voice built with simplicity, speed, and security in mind — deployed in seconds, not steps.
                </p>

                {/* Interactive Capsule Bar */}
                <form onSubmit={handleQuickJoin} className="ramain-input-capsule">
                    <div className="ramain-capsule-icon">
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                            <polygon points="23 7 16 12 23 17 23 7"></polygon>
                            <rect x="1" y="5" width="15" height="14" rx="2" ry="2"></rect>
                        </svg>
                    </div>
                    <input
                        type="text"
                        className="ramain-capsule-input"
                        placeholder="Enter room code or paste meeting link..."
                        value={meetingCode}
                        onChange={(e) => setMeetingCode(e.target.value)}
                    />
                    <button type="submit" className="btn-lime">
                        Join Video Call →
                    </button>
                </form>

                {/* Quick stats/info tags with clean SVG vectors */}
                <div style={{ 
                    display: 'flex', 
                    justifyContent: 'center', 
                    gap: '24px', 
                    marginTop: '28px', 
                    color: 'var(--text-muted)', 
                    fontSize: '0.88rem',
                    fontWeight: '600',
                    flexWrap: 'wrap'
                }}>
                    <span className="status-tag">
                        <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="var(--accent-lime)" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" />
                        </svg>
                        Instant WebRTC Signaling
                    </span>
                    <span className="status-tag">
                        <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="var(--accent-lime)" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                            <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
                            <path d="M7 11V7a5 5 0 0 1 10 0v4" />
                        </svg>
                        End-to-End Encrypted
                    </span>
                    <span className="status-tag">
                        <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="var(--accent-lime)" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M15 3h4a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-4" />
                            <polyline points="10 17 15 12 10 7" />
                            <line x1="15" y1="12" x2="3" y2="12" />
                        </svg>
                        No Login Required for Guests
                    </span>
                </div>
            </div>

            {/* Section Heading */}
            <h2 className="ramain-section-title" style={{ position: 'relative', zIndex: 2 }}>
                A unified communication platform built for modern users to connect faster, clearer and at scale.
            </h2>

            {/* Split Feature Grid Cards */}
            <div className="ramain-grid-2" style={{ position: 'relative', zIndex: 2 }}>
                {/* Feature Card 1 */}
                <div className="ramain-feature-card">
                    <div className="ramain-feature-img-box" style={{ position: 'relative' }}>
                        {/* Vector Decorative Corner Grids inside feature card */}
                        <svg style={{ position: 'absolute', top: '16px', left: '16px', opacity: 0.3 }} width="48" height="48" viewBox="0 0 48 48">
                            <circle cx="6" cy="6" r="2" fill="#111827" />
                            <circle cx="24" cy="6" r="2" fill="#111827" />
                            <circle cx="42" cy="6" r="2" fill="#111827" />
                            <circle cx="6" cy="24" r="2" fill="#111827" />
                            <circle cx="24" cy="24" r="2" fill="#111827" />
                            <circle cx="42" cy="24" r="2" fill="#111827" />
                        </svg>
                        <img src="/mobile.png" alt="PeerSpace App Preview" style={{ position: 'relative', zIndex: 2 }} />
                    </div>
                    <div className="ramain-feature-content">
                        <h3 className="ramain-feature-heading">
                            / HD 1-on-1 Video & Audio
                        </h3>
                        <p className="ramain-feature-desc">
                            Crystal-clear peer-to-peer WebRTC streams. Whether you're catching up with friends, studying together, or sharing a laugh — this platform brings you closer without latency.
                        </p>
                    </div>
                </div>

                {/* Feature Card 2 */}
                <div className="ramain-feature-card">
                    <div className="ramain-feature-img-box bg-blue" style={{ position: 'relative' }}>
                        <svg style={{ position: 'absolute', top: '16px', left: '16px', opacity: 0.3 }} width="48" height="48" viewBox="0 0 48 48">
                            <circle cx="6" cy="6" r="2" fill="white" />
                            <circle cx="24" cy="6" r="2" fill="white" />
                            <circle cx="42" cy="6" r="2" fill="white" />
                            <circle cx="6" cy="24" r="2" fill="white" />
                            <circle cx="24" cy="24" r="2" fill="white" />
                            <circle cx="42" cy="24" r="2" fill="white" />
                        </svg>
                        <img src="/logo3.png" alt="Screen Share & Chat" style={{ position: 'relative', zIndex: 2 }} />
                    </div>
                    <div className="ramain-feature-content">
                        <h3 className="ramain-feature-heading">
                            / Real-Time Chat & Screen Share
                        </h3>
                        <p className="ramain-feature-desc">
                            Real-time messaging with ultra-fast Socket.IO running in parallel with video calls. Instantly share your display for remote tech support, presentations, or collaborative study sessions.
                        </p>
                    </div>
                </div>
            </div>

            {/* Footer / Call to Action Card */}
            <div style={{
                maxWidth: '1080px',
                margin: '0 auto',
                background: '#111827',
                borderRadius: '20px',
                padding: '48px 40px',
                textAlign: 'center',
                color: 'white',
                boxShadow: '0 12px 30px rgba(0,0,0,0.1)',
                position: 'relative',
                zIndex: 2
            }}>
                <h3 style={{ fontSize: '2rem', fontWeight: '800', marginBottom: '16px', letterSpacing: '-0.03em' }}>
                    Ready to start your first meeting?
                </h3>
                <p style={{ color: '#9CA3AF', marginBottom: '28px', fontSize: '1.05rem' }}>
                    Join as a guest right now or create an authenticated account to save your activity history.
                </p>
                <div style={{ display: 'flex', justifyContent: 'center', gap: '16px', flexWrap: 'wrap' }}>
                    <button onClick={() => router('/aljk23')} className="btn-lime">
                        Launch Guest Room
                    </button>
                    <button onClick={() => router('/auth')} className="btn-outline" style={{ color: 'white', borderColor: '#374151', background: 'transparent' }}>
                        Sign Up Free
                    </button>
                </div>
            </div>
        </div>
    );
}