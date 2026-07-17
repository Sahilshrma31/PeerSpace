import React, { useContext, useState } from 'react';
import withAuth from '../utils/withAuth';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../contexts/AuthContext';
import Navbar from '../components/Navbar';

function HomeComponent() {
    let navigate = useNavigate();
    const [meetingCode, setMeetingCode] = useState("");
    const { addToUserHistory } = useContext(AuthContext);

    let handleJoinVideoCall = async (e) => {
        if (e) e.preventDefault();
        if (!meetingCode.trim()) return;
        try {
            await addToUserHistory(meetingCode.trim());
        } catch (err) {
            console.log("Error saving history:", err);
        }
        navigate(`/${meetingCode.trim()}`);
    };

    return (
        <div style={{ minHeight: '100vh', paddingBottom: '80px', position: 'relative', overflow: 'hidden' }}>
            {/* Background Vector Animation Orbit Ring */}
            <svg className="vector-bg-decoration" width="700" height="700" viewBox="0 0 700 700" fill="none" style={{ top: '35%', left: '50%', animation: 'vectorRingSpin 80s linear infinite' }}>
                <circle cx="350" cy="350" r="320" stroke="var(--border-light)" strokeWidth="1.5" strokeDasharray="12 12" />
                <circle cx="350" cy="350" r="220" stroke="var(--border-light)" strokeWidth="1" />
                <circle cx="350" cy="30" r="6" fill="#10B981" />
                <circle cx="670" cy="350" r="4" fill="var(--accent-lime)" />
            </svg>

            {/* Unified RamAIn Navbar */}
            <Navbar />

            {/* Hero Section Card */}
            <div className="ramain-hero-container vector-float" style={{ textAlign: 'center', position: 'relative', zIndex: 2 }}>
                <div style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    background: 'var(--accent-lime-light)',
                    color: '#047857',
                    fontWeight: '700',
                    fontSize: '0.85rem',
                    padding: '6px 16px',
                    borderRadius: '20px',
                    marginBottom: '20px',
                    border: '1px solid #A7F3D0'
                }}>
                    <span className="vector-pulse-dot"></span>
                    Authenticated Session Active
                </div>

                <h1 className="ramain-title" style={{ fontSize: '3.5rem' }}>
                    Because <span className="lime-highlight">distance</span> should<br />
                    never feel distant.
                </h1>

                <p className="ramain-subtitle">
                    Enter a meeting code below to launch a secure peer-to-peer WebRTC video room. All joined rooms are automatically logged to your personal activity history.
                </p>
                {/* Capsule Input Bar */}
                <form onSubmit={handleJoinVideoCall} className="ramain-input-capsule">
                    <div className="ramain-capsule-icon">
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M15 10l-4 4l6 6l4 -16l-18 7l4 2l2 6l3 -4" />
                        </svg>
                    </div>
                    <input
                        type="text"
                        className="ramain-capsule-input"
                        placeholder="Type meeting code (e.g. room-101, standup, study-hall)..."
                        value={meetingCode}
                        onChange={(e) => setMeetingCode(e.target.value)}
                    />
                    <button type="submit" className="btn-lime">
                        Join Meeting →
                    </button>
                </form>

                <div style={{ display: 'flex', justifyContent: 'center', gap: '16px', marginTop: '28px' }}>
                    <button 
                        type="button" 
                        onClick={() => navigate('/history')} 
                        className="btn-outline"
                        style={{ display: 'inline-flex', alignItems: 'center', gap: '8px' }}
                    >
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <circle cx="12" cy="12" r="10" />
                            <polyline points="12 6 12 12 16 14" />
                        </svg>
                        View Call History
                    </button>
                </div>
            </div>

            {/* Split Visual Card with Existing Photo (/logo3.png) */}
            <div className="ramain-grid-2" style={{ alignItems: 'center', position: 'relative', zIndex: 2 }}>
                <div className="ramain-feature-card" style={{ height: '100%' }}>
                    <div className="ramain-feature-img-box bg-purple" style={{ height: '280px', position: 'relative' }}>
                        {/* Vector Decorative Corner Grids inside feature card */}
                        <svg style={{ position: 'absolute', top: '16px', left: '16px', opacity: 0.3 }} width="48" height="48" viewBox="0 0 48 48">
                            <circle cx="6" cy="6" r="2" fill="white" />
                            <circle cx="24" cy="6" r="2" fill="white" />
                            <circle cx="42" cy="6" r="2" fill="white" />
                            <circle cx="6" cy="24" r="2" fill="white" />
                            <circle cx="24" cy="24" r="2" fill="white" />
                            <circle cx="42" cy="24" r="2" fill="white" />
                        </svg>
                        <img src="/logo3.png" alt="PeerSpace Conference" style={{ maxHeight: '220px', position: 'relative', zIndex: 2 }} />
                    </div>
                </div>

                <div className="ramain-feature-card" style={{ height: '100%', padding: '40px', justifyContent: 'center' }}>
                    <div style={{
                        width: '44px',
                        height: '44px',
                        background: '#111827',
                        color: 'white',
                        borderRadius: '12px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        marginBottom: '20px'
                    }}>
                        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="var(--accent-lime)" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                            <polygon points="23 7 16 12 23 17 23 7" />
                            <rect x="1" y="5" width="15" height="14" rx="2" ry="2" />
                        </svg>
                    </div>
                    <h2 style={{ fontFamily: 'var(--font-display)', fontSize: '2rem', fontWeight: '800', marginBottom: '16px', letterSpacing: '-0.03em' }}>
                        Agentic-level WebRTC simplicity.
                    </h2>
                    <p style={{ color: 'var(--text-secondary)', fontSize: '1.02rem', lineHeight: '1.6', marginBottom: '24px' }}>
                        PeerSpace establishes low-latency mesh connections directly between participants. Share your display screen or chat in parallel with zero extra configuration.
                    </p>
                    <div>
                        <button onClick={() => navigate('/aljk23')} className="btn-dark" style={{ display: 'inline-flex', alignItems: 'center', gap: '8px' }}>
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <circle cx="12" cy="12" r="10" />
                                <polygon points="10 8 16 12 10 16 10 8" />
                            </svg>
                            Launch Room /aljk23
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default withAuth(HomeComponent);