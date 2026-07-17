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
        <div style={{ minHeight: '100vh', paddingBottom: '80px' }}>
            {/* Unified RamAIn Navbar */}
            <Navbar />

            {/* Main Hero Card (Exact RamAIn Screenshot 1 Style) */}
            <div className="ramain-hero-container" style={{ textAlign: 'center' }}>
                <h1 className="ramain-title">
                    <span className="lime-highlight">Connect</span> with your<br />
                    loved ones in real-time.
                </h1>

                <p className="ramain-subtitle">
                    Feel closer, no matter how far. Crystal-clear HD video and seamless voice built with simplicity, speed, and security in mind — deployed in seconds, not steps.
                </p>

                {/* Interactive Capsule Bar (like RamAIn agent input in Screenshot 1) */}
                <form onSubmit={handleQuickJoin} className="ramain-input-capsule">
                    <div className="ramain-capsule-icon">
                        🎥
                    </div>
                    <input
                        type="text"
                        className="ramain-capsule-input"
                        placeholder="Enter room code or paste meeting link..."
                        value={meetingCode}
                        onChange={(e) => setMeetingCode(e.target.value)}
                    />
                    <button type="submit" className="btn-lime">
                        Join Video Call
                    </button>
                </form>

                {/* Quick stats/info tags */}
                <div style={{ 
                    display: 'flex', 
                    justifyContent: 'center', 
                    gap: '24px', 
                    marginTop: '28px', 
                    color: 'var(--text-muted)', 
                    fontSize: '0.88rem',
                    fontWeight: '500'
                }}>
                    <span>⚡ Instant WebRTC Signaling</span>
                    <span>🔒 End-to-End Encrypted</span>
                    <span>🚪 No Login Required for Guests</span>
                </div>
            </div>

            {/* Section Heading (Exact RamAIn Screenshot 2 Style) */}
            <h2 className="ramain-section-title">
                A unified communication platform built for modern users to connect faster, clearer and at scale.
            </h2>

            {/* Split Feature Grid Cards (Exact RamAIn Screenshot 2 Style) */}
            <div className="ramain-grid-2">
                {/* Feature Card 1 */}
                <div className="ramain-feature-card">
                    <div className="ramain-feature-img-box">
                        <img src="/mobile.png" alt="PeerSpace App Preview" />
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
                    <div className="ramain-feature-img-box bg-blue">
                        <img src="/logo3.png" alt="Screen Share & Chat" />
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
                boxShadow: '0 12px 30px rgba(0,0,0,0.1)'
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