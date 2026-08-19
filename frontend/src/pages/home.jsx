import React, { useContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../contexts/AuthContext';
import Navbar from '../components/Navbar';
import { isTokenValid } from '../utils/token';

const STUDY_CODES_LIST = [
    "study-hall",
    "graphs-for-placement-season",
    "dynamic-programming-marathon",
    "dsa-tree-problems-prep",
    "system-design-mock-interview",
    "dbms-and-os-revision"
];

function HomeComponent() {
    let navigate = useNavigate();
    const [meetingCode, setMeetingCode] = useState("");
    const { addToUserHistory } = useContext(AuthContext);

    const [placeholderText, setPlaceholderText] = useState("");
    const [wordIndex, setWordIndex] = useState(0);
    const [isDeleting, setIsDeleting] = useState(false);

    useEffect(() => {
        const currentWord = STUDY_CODES_LIST[wordIndex % STUDY_CODES_LIST.length];
        const typingSpeed = isDeleting ? 40 : 85;

        const timer = setTimeout(() => {
            if (!isDeleting && placeholderText === currentWord) {
                setTimeout(() => setIsDeleting(true), 1600);
            } else if (isDeleting && placeholderText === "") {
                setIsDeleting(false);
                setWordIndex((prev) => (prev + 1) % STUDY_CODES_LIST.length);
            } else {
                const nextText = isDeleting
                    ? currentWord.substring(0, placeholderText.length - 1)
                    : currentWord.substring(0, placeholderText.length + 1);
                setPlaceholderText(nextText);
            }
        }, typingSpeed);

        return () => clearTimeout(timer);
    }, [placeholderText, isDeleting, wordIndex]);

    let handleJoinVideoCall = async (e) => {
        if (e) e.preventDefault();
        if (!meetingCode.trim()) return;
        if (isTokenValid() && addToUserHistory) {
            try {
                await addToUserHistory(meetingCode.trim());
            } catch (err) {
                console.log("Error saving history:", err);
            }
        }
        navigate(`/${meetingCode.trim()}`);
    };

    return (
        <div style={{ minHeight: '100vh', paddingBottom: '80px', position: 'relative', overflow: 'hidden' }}>
            {/* Center Main Vector Orbit Ring */}
            <svg className="vector-bg-decoration" width="700" height="700" viewBox="0 0 700 700" fill="none" style={{ top: '35%', left: '50%', animation: 'vectorRingSpin 80s linear infinite' }}>
                <circle cx="350" cy="350" r="320" stroke="var(--border-light)" strokeWidth="1.5" strokeDasharray="12 12" />
                <circle cx="350" cy="350" r="220" stroke="var(--border-light)" strokeWidth="1" />
                <circle cx="350" cy="30" r="6" fill="#10B981" />
                <circle cx="670" cy="350" r="4" fill="var(--accent-lime)" />
            </svg>

            {/* Ambient Faded Vector 1: Top Right Gyroscope */}
            <svg className="ambient-vector-1" width="220" height="220" viewBox="0 0 220 220" fill="none" style={{ top: '10%', right: '4%' }}>
                <circle cx="110" cy="110" r="90" stroke="#818CF8" strokeWidth="1.5" strokeDasharray="8 8" />
                <circle cx="110" cy="110" r="65" stroke="#34D399" strokeWidth="1.2" />
                <ellipse cx="110" cy="110" rx="90" ry="35" stroke="#A7F3D0" strokeWidth="1.2" transform="rotate(-25 110 110)" />
                <circle cx="110" cy="20" r="4" fill="#818CF8" />
                <circle cx="175" cy="110" r="3.5" fill="#34D399" />
            </svg>

            {/* Ambient Faded Vector 2: Mid Left Mesh Node Constellation */}
            <svg className="ambient-vector-2" width="260" height="260" viewBox="0 0 260 260" fill="none" style={{ top: '38%', left: '2%' }}>
                <polygon points="130,30 220,90 190,200 70,200 40,90" stroke="#A78BFA" strokeWidth="1.5" strokeDasharray="6 6" />
                <line x1="130" y1="30" x2="190" y2="200" stroke="#60A5FA" strokeWidth="1.2" />
                <line x1="40" y1="90" x2="220" y2="90" stroke="#34D399" strokeWidth="1.2" />
                <circle cx="130" cy="30" r="6" fill="#A78BFA" />
                <circle cx="220" cy="90" r="5" fill="#60A5FA" />
                <circle cx="190" cy="200" r="6" fill="#34D399" />
                <circle cx="70" cy="200" r="5" fill="#A78BFA" />
                <circle cx="40" cy="90" r="6" fill="#60A5FA" />
            </svg>

            {/* Ambient Faded Vector 3: Mid Right Isometric Coordinate Grid */}
            <svg className="ambient-vector-3" width="240" height="240" viewBox="0 0 240 240" fill="none" style={{ top: '56%', right: '3%' }}>
                <rect x="50" y="50" width="140" height="140" rx="16" stroke="#818CF8" strokeWidth="1.5" transform="rotate(15 120 120)" />
                <rect x="70" y="70" width="100" height="100" rx="10" stroke="#34D399" strokeWidth="1.2" strokeDasharray="5 5" transform="rotate(-15 120 120)" />
                <circle cx="120" cy="120" r="40" stroke="#A78BFA" strokeWidth="1.2" />
                <circle cx="120" cy="120" r="6" fill="#818CF8" />
            </svg>

            {/* Ambient Faded Vector 4: Bottom Left Wave Arcs */}
            <svg className="ambient-vector-1" width="200" height="200" viewBox="0 0 200 200" fill="none" style={{ top: '78%', left: '4%' }}>
                <circle cx="100" cy="100" r="80" stroke="#34D399" strokeWidth="1.5" opacity="0.8" />
                <ellipse cx="100" cy="100" rx="80" ry="25" stroke="#60A5FA" strokeWidth="1.2" strokeDasharray="6 4" transform="rotate(45 100 100)" />
                <ellipse cx="100" cy="100" rx="80" ry="25" stroke="#A78BFA" strokeWidth="1.2" strokeDasharray="6 4" transform="rotate(-45 100 100)" />
                <circle cx="100" cy="20" r="5" fill="#34D399" />
            </svg>

            {/* Feature Logo Vector 1: Faded Pomodoro Focus Timer Logo (Top Left) */}
            <svg className="ambient-vector-2" width="180" height="180" viewBox="0 0 180 180" fill="none" style={{ top: '18%', left: '6%' }}>
                <circle cx="90" cy="90" r="60" stroke="#818CF8" strokeWidth="1.8" strokeDasharray="10 6" opacity="0.9" />
                <circle cx="90" cy="90" r="45" stroke="#34D399" strokeWidth="1.2" />
                <path d="M90 30 A60 60 0 0 1 150 90" stroke="#A7F3D0" strokeWidth="5" strokeLinecap="round" />
                <line x1="90" y1="90" x2="90" y2="55" stroke="#A78BFA" strokeWidth="2.5" strokeLinecap="round" />
                <line x1="90" y1="90" x2="115" y2="90" stroke="#A78BFA" strokeWidth="2" strokeLinecap="round" />
                <circle cx="90" cy="90" r="6" fill="#818CF8" />
            </svg>

            {/* Feature Logo Vector 2: Faded WebRTC Video Camera & Signal Logo (Top Right) */}
            <svg className="ambient-vector-1" width="190" height="190" viewBox="0 0 190 190" fill="none" style={{ top: '28%', right: '6%' }}>
                <rect x="35" y="65" width="80" height="60" rx="12" stroke="#60A5FA" strokeWidth="1.8" />
                <polygon points="115,80 150,60 150,130 115,110" stroke="#34D399" strokeWidth="1.8" strokeLinejoin="round" />
                <circle cx="75" cy="95" r="14" stroke="#A78BFA" strokeWidth="1.5" strokeDasharray="4 4" />
                <path d="M160 70 A40 40 0 0 1 160 120" stroke="#818CF8" strokeWidth="1.5" strokeDasharray="3 3" />
                <path d="M170 55 A60 60 0 0 1 170 135" stroke="#818CF8" strokeWidth="1.2" opacity="0.6" strokeDasharray="3 3" />
            </svg>

            {/* Feature Logo Vector 3: Faded Collaborative Markdown Notepad Logo (Mid Right) */}
            <svg className="ambient-vector-2" width="180" height="180" viewBox="0 0 180 180" fill="none" style={{ top: '48%', right: '5%' }}>
                <rect x="45" y="30" width="90" height="120" rx="10" stroke="#A78BFA" strokeWidth="1.8" />
                <line x1="65" y1="60" x2="115" y2="60" stroke="#34D399" strokeWidth="2" strokeLinecap="round" />
                <line x1="65" y1="80" x2="105" y2="80" stroke="#60A5FA" strokeWidth="2" strokeLinecap="round" />
                <line x1="65" y1="100" x2="115" y2="100" stroke="#818CF8" strokeWidth="2" strokeLinecap="round" />
                <line x1="65" y1="120" x2="90" y2="120" stroke="#34D399" strokeWidth="2" strokeLinecap="round" />
                <rect x="70" y="20" width="40" height="16" rx="5" stroke="#A78BFA" strokeWidth="1.5" />
            </svg>

            {/* Feature Logo Vector 4: Faded Peer Mesh Connectivity Node Logo (Bottom Left) */}
            <svg className="ambient-vector-3" width="200" height="200" viewBox="0 0 200 200" fill="none" style={{ top: '66%', left: '4%' }}>
                <circle cx="50" cy="100" r="18" stroke="#34D399" strokeWidth="1.8" />
                <circle cx="150" cy="60" r="18" stroke="#60A5FA" strokeWidth="1.8" />
                <circle cx="150" cy="140" r="18" stroke="#A78BFA" strokeWidth="1.8" />
                <line x1="66" y1="92" x2="134" y2="68" stroke="#818CF8" strokeWidth="1.5" strokeDasharray="6 6" />
                <line x1="66" y1="108" x2="134" y2="132" stroke="#818CF8" strokeWidth="1.5" strokeDasharray="6 6" />
                <line x1="150" y1="78" x2="150" y2="122" stroke="#34D399" strokeWidth="1.5" strokeDasharray="4 4" />
                <circle cx="50" cy="100" r="5" fill="#34D399" />
                <circle cx="150" cy="60" r="5" fill="#60A5FA" />
                <circle cx="150" cy="140" r="5" fill="#A78BFA" />
            </svg>

            {/* Feature Logo Vector 5: Faded Focus Duration Glider Track Logo (Bottom Right) */}
            <svg className="ambient-vector-1" width="200" height="160" viewBox="0 0 200 160" fill="none" style={{ top: '85%', right: '5%' }}>
                <rect x="30" y="70" width="140" height="20" rx="10" stroke="#818CF8" strokeWidth="1.5" />
                <rect x="34" y="74" width="80" height="12" rx="6" fill="#A7F3D0" opacity="0.4" />
                <circle cx="114" cy="80" r="14" stroke="#34D399" strokeWidth="2" fill="#FFFFFF" />
                <circle cx="114" cy="80" r="5" fill="#34D399" />
                <line x1="50" y1="105" x2="50" y2="115" stroke="#A78BFA" strokeWidth="1.5" strokeLinecap="round" />
                <line x1="85" y1="105" x2="85" y2="115" stroke="#A78BFA" strokeWidth="1.5" strokeLinecap="round" />
                <line x1="120" y1="105" x2="120" y2="115" stroke="#A78BFA" strokeWidth="1.5" strokeLinecap="round" />
                <line x1="155" y1="105" x2="155" y2="115" stroke="#A78BFA" strokeWidth="1.5" strokeLinecap="round" />
            </svg>

            {/* Unified RamAIn Navbar */}
            <Navbar />

            {/* Hero Section Card */}
            <div className="ramain-hero-container" style={{ textAlign: 'center', position: 'relative', zIndex: 2 }}>
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
                    {isTokenValid() ? "Authenticated Session Active" : "PeerSpace Collaborative Study Network Ready"}
                </div>

                <h1 className="ramain-title" style={{ fontSize: '3.5rem' }}>
                    Collaborative <span className="lime-highlight">Study Rooms</span><br />
                    Built for Real Productivity.
                </h1>

                <p className="ramain-subtitle">
                    Launch instant peer-to-peer WebRTC video study rooms with synchronized Pomodoro timers, real-time shared markdown notes, and auto-saved session logs.
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
                        placeholder={`Type meeting code (e.g. ${placeholderText || 'study-hall'})...`}
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

            {/* ==========================================================================
                Section 1: Asymmetric Isometric/Vector Split Cards (Inspiration Image 2)
                ========================================================================== */}
            <div id="features" style={{ position: 'relative', zIndex: 2, paddingTop: '30px' }}>
            <div className="peerspace-section-header" style={{ position: 'relative', zIndex: 2, padding: '0 20px' }}>
                <h2 className="peerspace-section-title">
                    A unified WebRTC communication & study platform built for modern peers to move faster, clearer and at scale.
                </h2>
            </div>

            <div className="peerspace-split-grid" style={{ position: 'relative', zIndex: 2, padding: '0 20px' }}>
                {/* Split Card 1: Mesh WebRTC Video Calling */}
                <div className="peerspace-split-card">
                    <div className="peerspace-split-img bg-lime">
                        <div className="peerspace-split-img-title">/ Mesh Video & Audio</div>
                        <svg className="vector-wireframe-svg" width="200" height="150" viewBox="0 0 200 150" fill="none">
                            {/* Isometric Laptop Base & Screen Wireframe */}
                            <path d="M40 110 L160 110 L180 135 L20 135 Z" fill="#111827" stroke="#111827" strokeWidth="2" strokeLinejoin="round" />
                            <rect x="50" y="30" width="100" height="80" rx="8" fill="#FFFFFF" stroke="#111827" strokeWidth="2.5" />
                            <rect x="62" y="42" width="76" height="56" rx="4" fill="#E8F8B6" stroke="#111827" strokeWidth="1.5" />
                            {/* Robot/Agent Avatar Node inside screen */}
                            <circle cx="100" cy="64" r="14" fill="#111827" />
                            <rect x="88" y="80" width="24" height="12" rx="6" fill="#111827" />
                            <circle cx="95" cy="63" r="2.5" fill="#C5FF4A" />
                            <circle cx="105" cy="63" r="2.5" fill="#C5FF4A" />
                            {/* Floating Peer Mesh Signal Nodes */}
                            <circle cx="25" cy="45" r="16" fill="#FFFFFF" stroke="#111827" strokeWidth="2" strokeDasharray="3 3" />
                            <circle cx="25" cy="45" r="5" fill="#10B981" />
                            <circle cx="175" cy="55" r="16" fill="#FFFFFF" stroke="#111827" strokeWidth="2" strokeDasharray="3 3" />
                            <circle cx="175" cy="55" r="5" fill="#3B82F6" />
                            <path d="M40 45 L50 45" stroke="#111827" strokeWidth="1.5" strokeDasharray="2 2" />
                            <path d="M150 55 L160 55" stroke="#111827" strokeWidth="1.5" strokeDasharray="2 2" />
                        </svg>
                    </div>
                    <div className="peerspace-split-content">
                        <h3 className="peerspace-split-heading">
                            / Mesh WebRTC Video Calling
                        </h3>
                        <p className="peerspace-split-desc">
                            Direct peer-to-peer mesh connections across browser tabs. PeerSpace streams crystal-clear HD display, video, and audio directly between participants without routing media through centralized bottleneck servers.
                        </p>
                    </div>
                </div>

                {/* Split Card 2: Collaborative Study Dashboard */}
                <div className="peerspace-split-card">
                    <div className="peerspace-split-img bg-lavender">
                        <div className="peerspace-split-img-title">/ Collaborative Dashboard</div>
                        <svg className="vector-wireframe-svg" width="200" height="150" viewBox="0 0 200 150" fill="none">
                            {/* Isometric Clipboard / Dashboard Plane */}
                            <rect x="55" y="25" width="90" height="110" rx="10" fill="#FFFFFF" stroke="#111827" strokeWidth="2.5" />
                            <rect x="80" y="18" width="40" height="14" rx="4" fill="#111827" />
                            <circle cx="100" cy="25" r="3" fill="#E4E0FD" />
                            {/* Checklist & Pomodoro Clock Wireframe */}
                            <rect x="70" y="45" width="14" height="14" rx="3" fill="#E4E0FD" stroke="#111827" strokeWidth="1.8" />
                            <polyline points="73 52 76 55 82 48" stroke="#111827" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                            <line x1="92" y1="52" x2="130" y2="52" stroke="#111827" strokeWidth="2" strokeLinecap="round" />
                            <rect x="70" y="68" width="14" height="14" rx="3" fill="#E4E0FD" stroke="#111827" strokeWidth="1.8" />
                            <polyline points="73 75 76 78 82 71" stroke="#111827" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                            <line x1="92" y1="75" x2="120" y2="75" stroke="#111827" strokeWidth="2" strokeLinecap="round" />
                            {/* Floating Pomodoro Ring Badge */}
                            <circle cx="145" cy="105" r="26" fill="#111827" stroke="#FFFFFF" strokeWidth="3" />
                            <circle cx="145" cy="105" r="18" stroke="#C5FF4A" strokeWidth="3" strokeDasharray="80 30" />
                            <text x="145" y="109" fill="#FFFFFF" fontSize="11" fontWeight="bold" textAnchor="middle">25m</text>
                        </svg>
                    </div>
                    <div className="peerspace-split-content">
                        <h3 className="peerspace-split-heading">
                            / Study Session Sync
                        </h3>
                        <p className="peerspace-split-desc">
                            Integrated productivity tools running right underneath your video tiles. Synchronize study topics, goals, Pomodoro focus timers, and real-time collaborative notes instantly via low-latency Socket.IO events.
                        </p>
                    </div>
                </div>
            </div>

            {/* ==========================================================================
                Section 2: Geometric Wireframe Bento Grid Cards (Inspiration Image 1)
                ========================================================================== */}
            <div className="peerspace-bento-grid" style={{ position: 'relative', zIndex: 2, padding: '0 20px' }}>
                {/* Bento Card 1: 1-on-1 & Group Mesh Video */}
                <div className="peerspace-bento-card bg-green">
                    <div className="bento-header-wrap">
                        <h3 className="bento-title">1-on-1 & Group Mesh Video</h3>
                        <p className="bento-desc">
                            Every session runs over direct peer-to-peer WebRTC connections with equal-tile video cards, crystal-clear audio, and clean room boundaries.
                        </p>
                    </div>
                    <div className="bento-vector-wrap">
                        {/* Geometric Wireframe Concentric Circles & Crosshairs */}
                        <svg className="vector-wireframe-svg" width="140" height="120" viewBox="0 0 140 120" fill="none">
                            <circle cx="70" cy="60" r="50" stroke="#111827" strokeWidth="1.2" strokeDasharray="6 6" opacity="0.6" />
                            <circle cx="70" cy="60" r="34" stroke="#111827" strokeWidth="1.5" />
                            <circle cx="70" cy="60" r="16" fill="#111827" />
                            <line x1="70" y1="5" x2="70" y2="115" stroke="#111827" strokeWidth="1" opacity="0.4" />
                            <line x1="15" y1="60" x2="125" y2="60" stroke="#111827" strokeWidth="1" opacity="0.4" />
                            <circle cx="70" cy="60" r="4" fill="#E8F8B6" />
                        </svg>
                    </div>
                </div>

                {/* Bento Card 2: Socket.IO State Synchronization */}
                <div className="peerspace-bento-card bg-lavender">
                    <div className="bento-header-wrap">
                        <h3 className="bento-title">Socket.IO State Synchronization</h3>
                        <p className="bento-desc">
                            Persist room state, shared study topics, and collaborative notes across all connected peers so late-joiners sync instantly upon entry.
                        </p>
                    </div>
                    <div className="bento-vector-wrap">
                        {/* Geometric Wireframe Network Node Ring */}
                        <svg className="vector-wireframe-svg" width="140" height="120" viewBox="0 0 140 120" fill="none">
                            <polygon points="70,20 115,45 115,95 70,110 25,95 25,45" stroke="#111827" strokeWidth="1.5" strokeDasharray="4 4" opacity="0.5" />
                            <line x1="70" y1="20" x2="70" y2="65" stroke="#111827" strokeWidth="1.5" />
                            <line x1="25" y1="95" x2="70" y2="65" stroke="#111827" strokeWidth="1.5" />
                            <line x1="115" y1="95" x2="70" y2="65" stroke="#111827" strokeWidth="1.5" />
                            <circle cx="70" cy="65" r="10" fill="#111827" />
                            <circle cx="70" cy="20" r="7" fill="#FFFFFF" stroke="#111827" strokeWidth="2" />
                            <circle cx="25" cy="95" r="7" fill="#FFFFFF" stroke="#111827" strokeWidth="2" />
                            <circle cx="115" cy="95" r="7" fill="#FFFFFF" stroke="#111827" strokeWidth="2" />
                        </svg>
                    </div>
                </div>

                {/* Bento Card 3: Shared Pomodoro Focus Timers */}
                <div className="peerspace-bento-card bg-lime">
                    <div className="bento-header-wrap">
                        <h3 className="bento-title">Shared Pomodoro Focus Timers</h3>
                        <p className="bento-desc">
                            Keep study sessions on track with synchronized focus and break countdowns (`Session 1 of 4`) triggering simultaneously for all.
                        </p>
                    </div>
                    <div className="bento-vector-wrap">
                        {/* Geometric Wireframe Timer Ring */}
                        <svg className="vector-wireframe-svg" width="140" height="120" viewBox="0 0 140 120" fill="none">
                            <circle cx="70" cy="60" r="46" stroke="#111827" strokeWidth="2" />
                            <circle cx="70" cy="60" r="36" stroke="#111827" strokeWidth="1" strokeDasharray="3 5" opacity="0.5" />
                            <path d="M70 14 A46 46 0 0 1 116 60" stroke="#10B981" strokeWidth="5" strokeLinecap="round" />
                            <line x1="70" y1="60" x2="70" y2="34" stroke="#111827" strokeWidth="2.5" strokeLinecap="round" />
                            <line x1="70" y1="60" x2="88" y2="60" stroke="#111827" strokeWidth="2" strokeLinecap="round" />
                            <circle cx="70" cy="60" r="5" fill="#111827" />
                        </svg>
                    </div>
                </div>

                {/* Bento Card 4 (2 cols wide): Low-Latency Screen Sharing & Parallel Chat */}
                <div className="peerspace-bento-card col-span-2 bg-green">
                    <div className="bento-header-wrap">
                        <h3 className="bento-title">Low-Latency Screen Sharing & Parallel Chat</h3>
                        <p className="bento-desc">
                            Instantly share your full display screen, window, or browser tab with high frame-rate media tracks. Parallel room chat (`Socket.IO`) lets you drop links, equations, or code snippets without interrupting live video or audio feeds.
                        </p>
                    </div>
                    <div className="bento-vector-right">
                        {/* Wireframe 3D Globe / Sphere (Inspiration Screenshot 1 CAPTCHA card exact style) */}
                        <svg className="vector-wireframe-svg" width="180" height="160" viewBox="0 0 180 160" fill="none">
                            <circle cx="90" cy="80" r="65" stroke="#111827" strokeWidth="1.5" opacity="0.8" />
                            <ellipse cx="90" cy="80" rx="65" ry="24" stroke="#111827" strokeWidth="1.2" strokeDasharray="5 5" opacity="0.6" />
                            <ellipse cx="90" cy="80" rx="24" ry="65" stroke="#111827" strokeWidth="1.2" strokeDasharray="5 5" opacity="0.6" />
                            <line x1="25" y1="80" x2="155" y2="80" stroke="#111827" strokeWidth="1.2" opacity="0.5" />
                            <line x1="90" y1="15" x2="90" y2="145" stroke="#111827" strokeWidth="1.2" opacity="0.5" />
                            <circle cx="90" cy="56" r="6" fill="#111827" />
                            <circle cx="114" cy="80" r="5" fill="#FFFFFF" stroke="#111827" strokeWidth="1.5" />
                        </svg>
                    </div>
                </div>

                {/* Bento Card 5: Real-Time Collaborative Notes */}
                <div className="peerspace-bento-card bg-lavender">
                    <div className="bento-header-wrap">
                        <h3 className="bento-title">Real-Time Collaborative Notes</h3>
                        <p className="bento-desc">
                            Jot down equations, algorithms, or checklists collaboratively in a shared scratchpad that syncs keystroke-by-keystroke in real time.
                        </p>
                    </div>
                    <div className="bento-vector-wrap">
                        {/* Wireframe 3D Coordinate Planes / Axes (Inspiration Screenshot 1 Knowledge Base card style) */}
                        <svg className="vector-wireframe-svg" width="140" height="120" viewBox="0 0 140 120" fill="none">
                            <polygon points="70,25 120,50 70,75 20,50" stroke="#111827" strokeWidth="1.5" fill="rgba(255,255,255,0.4)" />
                            <polygon points="70,55 120,80 70,105 20,80" stroke="#111827" strokeWidth="1.2" strokeDasharray="4 4" fill="rgba(255,255,255,0.2)" />
                            <line x1="70" y1="15" x2="70" y2="110" stroke="#111827" strokeWidth="1.8" />
                            <line x1="15" y1="47.5" x2="125" y2="102.5" stroke="#111827" strokeWidth="1.2" opacity="0.5" />
                            <line x1="125" y1="47.5" x2="15" y2="102.5" stroke="#111827" strokeWidth="1.2" opacity="0.5" />
                            <circle cx="70" cy="50" r="5" fill="#111827" />
                        </svg>
                    </div>
                </div>

                {/* Bento Card 6: Pre-Session Lobby Setup */}
                <div className="peerspace-bento-card bg-lavender">
                    <div className="bento-header-wrap">
                        <h3 className="bento-title">Pre-Session Lobby Setup</h3>
                        <p className="bento-desc">
                            Test camera and microphone permissions, verify your local display stream, and configure your room's study goals before entering.
                        </p>
                    </div>
                    <div className="bento-vector-wrap">
                        {/* Wireframe Dual-Window / Browser Frame (Inspiration Screenshot 1 Network Request card style) */}
                        <svg className="vector-wireframe-svg" width="140" height="120" viewBox="0 0 140 120" fill="none">
                            <rect x="20" y="25" width="100" height="70" rx="6" stroke="#111827" strokeWidth="1.8" fill="#FFFFFF" />
                            <line x1="20" y1="42" x2="120" y2="42" stroke="#111827" strokeWidth="1.5" />
                            <circle cx="30" cy="33.5" r="2.5" fill="#111827" />
                            <circle cx="38" cy="33.5" r="2.5" fill="#111827" opacity="0.5" />
                            <circle cx="46" cy="33.5" r="2.5" fill="#111827" opacity="0.3" />
                            <rect x="34" y="55" width="34" height="26" rx="3" stroke="#111827" strokeWidth="1.5" fill="#E4E0FD" />
                            <rect x="74" y="55" width="34" height="26" rx="3" stroke="#111827" strokeWidth="1.5" strokeDasharray="3 3" />
                        </svg>
                    </div>
                </div>

                {/* Bento Card 7: Custom Room Links & Invites */}
                <div className="peerspace-bento-card bg-green">
                    <div className="bento-header-wrap">
                        <h3 className="bento-title">Custom Room Links & Invites</h3>
                        <p className="bento-desc">
                            Generate memorable room codes like `/study-hall` or `/standup`. One-click copy buttons make inviting study partners effortless.
                        </p>
                    </div>
                    <div className="bento-vector-wrap">
                        {/* Overlapping Concentric Venn Loops (Inspiration Screenshot 1 Event Triggers card style) */}
                        <svg className="vector-wireframe-svg" width="140" height="120" viewBox="0 0 140 120" fill="none">
                            <circle cx="50" cy="60" r="32" stroke="#111827" strokeWidth="1.5" opacity="0.7" />
                            <circle cx="90" cy="60" r="32" stroke="#111827" strokeWidth="1.5" opacity="0.7" />
                            <circle cx="70" cy="42" r="32" stroke="#111827" strokeWidth="1.5" opacity="0.7" />
                            <circle cx="70" cy="78" r="32" stroke="#111827" strokeWidth="1.5" opacity="0.7" />
                            <circle cx="70" cy="60" r="6" fill="#111827" />
                        </svg>
                    </div>
                </div>

                {/* Bento Card 8: Personal Activity & Call History */}
                <div className="peerspace-bento-card bg-lime">
                    <div className="bento-header-wrap">
                        <h3 className="bento-title">Personal Activity & Call History</h3>
                        <p className="bento-desc">
                            Track every meeting room you join, view historical timestamps, and jump right back into past sessions directly from your dashboard.
                        </p>
                    </div>
                    <div className="bento-vector-wrap">
                        {/* Looping Orbital Wireframe Rings (Inspiration Screenshot 1 Audit trails card style) */}
                        <svg className="vector-wireframe-svg" width="140" height="120" viewBox="0 0 140 120" fill="none">
                            <ellipse cx="70" cy="60" rx="55" ry="22" stroke="#111827" strokeWidth="1.5" transform="rotate(-15 70 60)" />
                            <ellipse cx="70" cy="60" rx="55" ry="22" stroke="#111827" strokeWidth="1.5" strokeDasharray="6 4" transform="rotate(35 70 60)" />
                            <ellipse cx="70" cy="60" rx="55" ry="22" stroke="#111827" strokeWidth="1.5" opacity="0.6" transform="rotate(85 70 60)" />
                            <circle cx="70" cy="60" r="8" fill="#111827" />
                            <circle cx="118" cy="48" r="4" fill="#FFFFFF" stroke="#111827" strokeWidth="1.5" />
                        </svg>
                    </div>
                </div>
            </div>
            </div>
        </div>
    );
}

export default HomeComponent;