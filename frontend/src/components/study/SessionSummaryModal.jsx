import React, { useState } from 'react';
import styles from '../../styles/studyPanel.module.css';
import { formatClock } from './studyConstants';

export default function SessionSummaryModal({ data, onClose, onExit }) {
    const [copied, setCopied] = useState(false);
    if (!data) return null;

    const downloadNotes = () => {
        const content = `# PeerSpace Study Session Notes\n\n**Topic:** ${data.topic || '—'}\n**Goal:** ${data.goal || '—'}\n**Date:** ${new Date().toLocaleDateString()}\n**Pomodoros Completed:** ${data.completedSessions || 0} / ${data.totalSessions || 4}\n\n---\n\n## Shared Notes\n\n${data.notes || 'No notes recorded.'}\n`;
        const blob = new Blob([content], { type: 'text/markdown;charset=utf-8' });
        const url = URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.download = `${(data.topic || 'PeerSpace').replace(/[^a-zA-Z0-9]/g, '_')}_Study_Notes.md`;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        URL.revokeObjectURL(url);
    };

    const copyNotes = () => {
        if (!data.notes) return;
        navigator.clipboard?.writeText(data.notes);
        setCopied(true);
        setTimeout(() => setCopied(false), 3000);
    };

    return (
        <div className={styles.summaryOverlay}>
            <div className={styles.summaryCard}>
                <span className={styles.summaryBadge}>✓ Study Session Complete</span>
                <h2 className={styles.summaryTitle}>Amazing Work — Study Summary</h2>

                <div className={styles.summaryGrid}>
                    <div className={styles.summaryStat}>
                        <div className={styles.summaryStatLabel}>Study Time</div>
                        <div className={styles.summaryStatValue}>{formatClock(data.totalStudyMs)}</div>
                    </div>
                    <div className={styles.summaryStat}>
                        <div className={styles.summaryStatLabel}>Completed Pomodoros</div>
                        <div className={styles.summaryStatValue}>
                            {data.completedSessions || 0} / {data.totalSessions || 4} Sessions
                        </div>
                    </div>
                    <div className={styles.summaryStat}>
                        <div className={styles.summaryStatLabel}>Topic</div>
                        <div className={styles.summaryStatValueSm}>{data.topic || '—'}</div>
                    </div>
                    <div className={styles.summaryStat}>
                        <div className={styles.summaryStatLabel}>Goal</div>
                        <div className={styles.summaryStatValueSm}>{data.goal || '—'}</div>
                    </div>
                </div>

                {/* Collaborative Notes Preview Box */}
                <div style={{
                    background: '#F8FAFC',
                    border: '1px solid #E2E8F0',
                    borderRadius: '16px',
                    padding: '16px',
                    margin: '20px 0',
                    textAlign: 'left'
                }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
                        <span style={{ fontSize: '0.8rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.05em', color: '#64748B' }}>
                            📝 Collaborative Study Notes Preview
                        </span>
                        <div style={{ display: 'flex', gap: '8px' }}>
                            <button
                                type="button"
                                onClick={copyNotes}
                                disabled={!data.notes}
                                style={{
                                    background: '#FFFFFF',
                                    border: '1px solid #CBD5E1',
                                    padding: '4px 10px',
                                    borderRadius: '8px',
                                    fontSize: '0.78rem',
                                    fontWeight: '600',
                                    color: '#334155',
                                    cursor: data.notes ? 'pointer' : 'not-allowed',
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: '4px'
                                }}
                            >
                                {copied ? '✅ Copied!' : '📋 Copy Text'}
                            </button>
                            <button
                                type="button"
                                onClick={downloadNotes}
                                style={{
                                    background: 'var(--accent-lime, #C5FF4A)',
                                    border: '1px solid #B6F03C',
                                    padding: '4px 12px',
                                    borderRadius: '8px',
                                    fontSize: '0.78rem',
                                    fontWeight: '700',
                                    color: '#111827',
                                    cursor: 'pointer',
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: '4px',
                                    boxShadow: '0 2px 4px rgba(0,0,0,0.05)'
                                }}
                            >
                                📥 Download (.md)
                            </button>
                        </div>
                    </div>
                    <div style={{
                        background: '#FFFFFF',
                        border: '1px solid #F1F5F9',
                        borderRadius: '10px',
                        padding: '12px',
                        maxHeight: '140px',
                        overflowY: 'auto',
                        fontSize: '0.9rem',
                        color: data.notes ? '#1F2937' : '#94A3B8',
                        whiteSpace: 'pre-wrap',
                        fontFamily: data.notes ? 'monospace' : 'inherit',
                        lineHeight: '1.5'
                    }}>
                        {data.notes || 'No notes recorded during this session. Anything you or your friend type in the Shared Notes card will appear right here automatically!'}
                    </div>
                </div>

                <div style={{
                    background: 'rgba(16, 185, 129, 0.1)',
                    border: '1px solid rgba(16, 185, 129, 0.3)',
                    borderRadius: '12px',
                    padding: '12px 16px',
                    margin: '16px 0 24px',
                    color: '#10B981',
                    fontSize: '0.88rem',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px',
                    fontWeight: '600'
                }}>
                    <span className="vector-pulse-dot"></span>
                    Notes Auto-Saved — Your session notes & summary have been automatically saved to your local browser storage!
                </div>

                <div className={styles.summaryActions}>
                    <button className={`${styles.summaryBtn} ${styles.summarySecondary}`} onClick={onClose} type="button">
                        Keep Studying
                    </button>
                    <button className={`${styles.summaryBtn} ${styles.summaryPrimary}`} onClick={onExit} type="button">
                        Leave Room
                    </button>
                </div>
            </div>
        </div>
    );
}
