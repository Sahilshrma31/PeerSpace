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
        <div style={{ minHeight: '100vh', paddingBottom: '80px' }}>
            {/* Unified RamAIn Navbar */}
            <Navbar />

            {/* Hero Section Card */}
            <div className="ramain-hero-container" style={{ textAlign: 'center' }}>
                <div style={{
                    display: 'inline-block',
                    background: 'var(--accent-lime-light)',
                    color: '#047857',
                    fontWeight: '700',
                    fontSize: '0.85rem',
                    padding: '6px 14px',
                    borderRadius: '20px',
                    marginBottom: '20px',
                    border: '1px solid #A7F3D0'
                }}>
                    ✨ Authenticated Dashboard Active
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
                        🚀
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
                    >
                        📜 View Call History
                    </button>
                </div>
            </div>

            {/* Split Visual Card with Existing Photo (/logo3.png) */}
            <div className="ramain-grid-2" style={{ alignItems: 'center' }}>
                <div className="ramain-feature-card" style={{ height: '100%' }}>
                    <div className="ramain-feature-img-box bg-purple" style={{ height: '280px' }}>
                        <img src="/logo3.png" alt="PeerSpace Conference" style={{ maxHeight: '220px' }} />
                    </div>
                </div>

                <div className="ramain-feature-card" style={{ height: '100%', padding: '40px', justifyContent: 'center' }}>
                    <div style={{
                        width: '40px',
                        height: '40px',
                        background: '#111827',
                        color: 'white',
                        borderRadius: '10px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        fontWeight: '800',
                        marginBottom: '20px',
                        fontSize: '1.2rem'
                    }}>
                        ▶
                    </div>
                    <h2 style={{ fontFamily: 'var(--font-display)', fontSize: '2rem', fontWeight: '800', marginBottom: '16px', letterSpacing: '-0.03em' }}>
                        Agentic-level WebRTC simplicity.
                    </h2>
                    <p style={{ color: 'var(--text-secondary)', fontSize: '1.02rem', lineHeight: '1.6', marginBottom: '24px' }}>
                        PeerSpace establishes low-latency mesh connections directly between participants. Share your display screen or chat in parallel with zero extra configuration.
                    </p>
                    <div>
                        <button onClick={() => navigate('/aljk23')} className="btn-dark">
                            Test Room: /aljk23
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default withAuth(HomeComponent);