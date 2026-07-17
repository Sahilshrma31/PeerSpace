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
            </div>
        </div>
    );
}