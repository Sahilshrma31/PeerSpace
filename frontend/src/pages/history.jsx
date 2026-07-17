import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';

export default function History() {
    const { getHistoryOfUser } = useContext(AuthContext);
    const [meetings, setMeetings] = useState([]);
    const [loading, setLoading] = useState(true);
    const routeTo = useNavigate();

    useEffect(() => {
        const fetchHistory = async () => {
            try {
                const history = await getHistoryOfUser();
                setMeetings(Array.isArray(history) ? history : []);
            } catch (err) {
                console.log("Error fetching history:", err);
            } finally {
                setLoading(false);
            }
        };

        fetchHistory();
    }, [getHistoryOfUser]);

    const formatDate = (dateString) => {
        if (!dateString) return "N/A";
        const date = new Date(dateString);
        const day = date.getDate().toString().padStart(2, "0");
        const month = (date.getMonth() + 1).toString().padStart(2, "0");
        const year = date.getFullYear();
        const time = date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
        return `${day}/${month}/${year} at ${time}`;
    };

    return (
        <div style={{ minHeight: '100vh', paddingBottom: '80px' }}>
            {/* Unified RamAIn Navbar */}
            <Navbar />

            {/* Header Box */}
            <div className="ramain-hero-container" style={{ padding: '40px 48px', marginBottom: '32px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '20px' }}>
                    <div>
                        <h1 style={{ fontFamily: 'var(--font-display)', fontSize: '2.4rem', fontWeight: '800', letterSpacing: '-0.03em' }}>
                            Call <span className="lime-highlight">History</span>
                        </h1>
                        <p style={{ color: 'var(--text-secondary)', marginTop: '8px', fontSize: '1rem' }}>
                            A complete log of all peer-to-peer rooms you have joined using your account.
                        </p>
                    </div>

                    <button onClick={() => routeTo("/home")} className="btn-dark">
                        ← Back to Dashboard
                    </button>
                </div>
            </div>

            {/* History List Container */}
            <div style={{ maxWidth: '1080px', margin: '0 auto', padding: '0 20px' }}>
                {loading ? (
                    <div style={{ textAlign: 'center', padding: '60px 0', color: 'var(--text-muted)', fontSize: '1.1rem', fontWeight: '500' }}>
                        Loading your past meetings...
                    </div>
                ) : meetings.length === 0 ? (
                    <div style={{
                        background: '#FFFFFF',
                        border: '1px dashed var(--border-medium)',
                        borderRadius: '20px',
                        padding: '60px 40px',
                        textAlign: 'center'
                    }}>
                        <div style={{ marginBottom: '16px', display: 'flex', justifyContent: 'center' }}>
                            <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="var(--text-muted)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                                <path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z"></path>
                            </svg>
                        </div>
                        <h3 style={{ fontSize: '1.4rem', fontWeight: '700', marginBottom: '8px' }}>No meeting activity yet</h3>
                        <p style={{ color: 'var(--text-secondary)', marginBottom: '24px', maxWidth: '440px', margin: '0 auto 24px' }}>
                            When you join a meeting room from the dashboard, the room code and entry timestamp will automatically show up here.
                        </p>
                        <button onClick={() => routeTo("/home")} className="btn-lime">
                            Join First Meeting
                        </button>
                    </div>
                ) : (
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: '20px' }}>
                        {meetings.map((e, i) => (
                            <div
                                key={i}
                                className="ramain-feature-card"
                                style={{ padding: '24px 28px', background: '#FFFFFF', borderRadius: '16px' }}
                            >
                                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '16px' }}>
                                    <div style={{
                                        background: '#F3F4F6',
                                        color: '#111827',
                                        fontWeight: '700',
                                        fontSize: '0.85rem',
                                        padding: '4px 10px',
                                        borderRadius: '8px',
                                        border: '1px solid var(--border-light)'
                                    }}>
                                        Room #{i + 1}
                                    </div>
                                    <span style={{ fontSize: '0.82rem', color: 'var(--text-muted)', fontWeight: '500' }}>
                                        {formatDate(e.date)}
                                    </span>
                                </div>

                                <h3 style={{ fontSize: '1.35rem', fontWeight: '800', color: '#111827', marginBottom: '12px', wordBreak: 'break-all' }}>
                                    /{e.meetingCode}
                                </h3>

                                <div style={{ display: 'flex', gap: '10px', marginTop: 'auto', paddingTop: '16px', borderTop: '1px solid var(--border-light)' }}>
                                    <button
                                        onClick={() => routeTo(`/${e.meetingCode}`)}
                                        className="btn-lime"
                                        style={{ flex: 1, padding: '8px 14px', fontSize: '0.88rem' }}
                                    >
                                        Rejoin Room →
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                )}

                {/* Saved Collaborative Session Notes Section */}
                <div style={{ marginTop: '64px', borderTop: '2px dashed var(--border-light)', paddingTop: '48px' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px', flexWrap: 'wrap', gap: '12px' }}>
                        <div>
                            <h2 style={{ fontFamily: 'var(--font-display)', fontSize: '1.8rem', fontWeight: '800', color: '#111827', margin: 0 }}>
                                📚 Auto-Saved Session Notes
                            </h2>
                            <p style={{ color: 'var(--text-secondary)', margin: '6px 0 0', fontSize: '0.95rem' }}>
                                Notes collaboratively typed during your meetings are saved locally right when your sessions end.
                            </p>
                        </div>
                    </div>

                    {(() => {
                        let savedList = [];
                        try {
                            savedList = JSON.parse(localStorage.getItem('peerspace_saved_notes') || '[]');
                        } catch (e) { }

                        if (savedList.length === 0) {
                            return (
                                <div style={{ background: '#F8FAFC', border: '1px solid #E2E8F0', borderRadius: '16px', padding: '40px 24px', textAlign: 'center', color: '#64748B' }}>
                                    No locally saved notes yet. When you complete a study session or leave a room with notes typed, they will appear right here for easy downloading!
                                </div>
                            );
                        }

                        return (
                            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(340px, 1fr))', gap: '20px' }}>
                                {savedList.map((item, idx) => (
                                    <div key={item.id || idx} style={{ background: '#FFFFFF', border: '1px solid var(--border-light)', borderRadius: '18px', padding: '24px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', boxShadow: '0 4px 15px rgba(0,0,0,0.02)' }}>
                                        <div>
                                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
                                                <span style={{ background: '#E8F8B6', color: '#111827', fontWeight: '700', fontSize: '0.78rem', padding: '4px 10px', borderRadius: '8px' }}>
                                                    📚 {item.topic || 'PeerSpace Study'}
                                                </span>
                                                <span style={{ fontSize: '0.8rem', color: '#64748B', fontWeight: '500' }}>
                                                    {item.date || 'Recently'}
                                                </span>
                                            </div>
                                            <h3 style={{ fontSize: '1.1rem', fontWeight: '700', color: '#111827', marginBottom: '8px' }}>
                                                🎯 {item.goal || 'Shared Study Goal'}
                                            </h3>
                                            <div style={{ background: '#F8FAFC', border: '1px solid #F1F5F9', borderRadius: '10px', padding: '12px', fontSize: '0.88rem', color: item.notes ? '#334155' : '#94A3B8', whiteSpace: 'pre-wrap', fontFamily: item.notes ? 'monospace' : 'inherit', maxHeight: '120px', overflowY: 'auto', marginBottom: '16px' }}>
                                                {item.notes || 'No text written during this session.'}
                                            </div>
                                        </div>

                                        <div style={{ display: 'flex', gap: '10px', paddingTop: '14px', borderTop: '1px solid #F1F5F9' }}>
                                            <button
                                                type="button"
                                                onClick={() => {
                                                    const content = `# PeerSpace Study Session Notes\n\n**Topic:** ${item.topic || '—'}\n**Goal:** ${item.goal || '—'}\n**Date:** ${item.date || new Date().toLocaleDateString()}\n**Pomodoros Completed:** ${item.completedSessions || 0} / ${item.totalSessions || 4}\n\n---\n\n## Shared Notes\n\n${item.notes || 'No notes recorded.'}\n`;
                                                    const blob = new Blob([content], { type: 'text/markdown;charset=utf-8' });
                                                    const url = URL.createObjectURL(blob);
                                                    const link = document.createElement('a');
                                                    link.href = url;
                                                    link.download = `${(item.topic || 'PeerSpace').replace(/[^a-zA-Z0-9]/g, '_')}_Notes.md`;
                                                    document.body.appendChild(link);
                                                    link.click();
                                                    document.body.removeChild(link);
                                                    URL.revokeObjectURL(url);
                                                }}
                                                style={{ flex: 1, background: 'var(--accent-lime, #C5FF4A)', color: '#111827', border: 'none', padding: '8px 14px', borderRadius: '10px', fontWeight: '700', fontSize: '0.85rem', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px' }}
                                            >
                                                📥 Download (.md)
                                            </button>
                                            <button
                                                type="button"
                                                onClick={() => {
                                                    if (item.notes) {
                                                        navigator.clipboard?.writeText(item.notes);
                                                        alert('Notes copied to clipboard!');
                                                    }
                                                }}
                                                disabled={!item.notes}
                                                style={{ background: '#F1F5F9', color: item.notes ? '#334155' : '#94A3B8', border: 'none', padding: '8px 14px', borderRadius: '10px', fontWeight: '600', fontSize: '0.85rem', cursor: item.notes ? 'pointer' : 'not-allowed' }}
                                            >
                                                📋 Copy
                                            </button>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        );
                    })()}
                </div>
            </div>
        </div>
    );
}