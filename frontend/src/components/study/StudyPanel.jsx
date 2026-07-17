import React, { useState, useEffect } from 'react';
import styles from '../../styles/studyPanel.module.css';
import { formatClock, PHASE } from './studyConstants';

export default function StudyPanel({
    topic,
    subject,
    goal,
    totalSessions = 4,
    completedSessions = 0,
    friendProfile,
    phase,
    remaining,
    timer,
    notes,
    onStart,
    onPause,
    onResume,
    onReset,
    onEnd,
    onNotesChange,
    onTopicGoalChange,
    onClose,
}) {
    const [editMode, setEditMode] = useState(false);
    const [editTopic, setEditTopic] = useState(topic || subject || "");
    const [editGoal, setEditGoal] = useState(goal || "");
    const [editSessions, setEditSessions] = useState(totalSessions || 4);
    const [syncStatus, setSyncStatus] = useState("Synced");

    useEffect(() => {
        setEditTopic(topic || subject || "");
        setEditGoal(goal || "");
        setEditSessions(totalSessions || 4);
    }, [topic, subject, goal, totalSessions]);

    const handleSaveConfig = () => {
        if (onTopicGoalChange) {
            onTopicGoalChange({ topic: editTopic, goal: editGoal, totalSessions: Number(editSessions) || 4 });
        }
        setEditMode(false);
    };

    const handleNotesInput = (val) => {
        setSyncStatus("Syncing...");
        onNotesChange(val);
        setTimeout(() => setSyncStatus("Synced"), 600);
    };

    const isBreak = phase === PHASE.BREAK;
    const isRunning = timer.running;
    const isPaused = timer.paused;

    const displayMs = (isRunning || isPaused)
        ? remaining
        : (phase === PHASE.DONE ? 0 : timer.focusMs || 25 * 60000);

    const currentSessionNumber = Math.min((completedSessions || 0) + 1, totalSessions || 4);

    return (
        <div className={styles.productivityGrid}>
            {/* ---- Card 1: Session Info / Progress ---- */}
            <div className={styles.productivityCard}>
                <div className={styles.productivityCardHeader}>
                    <h3 className={styles.productivityCardTitle}>Session Progress</h3>
                    {!editMode ? (
                        <button
                            type="button"
                            onClick={() => setEditMode(true)}
                            className="btn-outline"
                            style={{ padding: '4px 12px', fontSize: '0.78rem' }}
                        >
                            ✏️ Edit Goal
                        </button>
                    ) : (
                        <button
                            type="button"
                            onClick={handleSaveConfig}
                            className="btn-lime"
                            style={{ padding: '4px 12px', fontSize: '0.78rem' }}
                        >
                            Save
                        </button>
                    )}
                </div>

                {!editMode ? (
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                        <div className={styles.infoCardRow}>
                            <span className={styles.infoCardRowLabel}>Shared Topic</span>
                            <span className={styles.infoCardRowValue}>
                                {topic || subject || 'Data Structures'}
                            </span>
                        </div>
                        <div className={styles.infoCardRow}>
                            <span className={styles.infoCardRowLabel}>Shared Goal</span>
                            <span className={styles.infoCardRowValue}>
                                {goal || 'Solve 5 Tree Problems'}
                            </span>
                        </div>
                        <div className={styles.infoCardRow}>
                            <span className={styles.infoCardRowLabel}>Pomodoro Progress</span>
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '4px' }}>
                                <span className={styles.infoCardRowValue}>
                                    {completedSessions || 0} / {totalSessions || 4} Sessions Completed
                                </span>
                                <span style={{ fontSize: '0.82rem', color: '#10B981', fontWeight: '700' }}>
                                    Session {currentSessionNumber}
                                </span>
                            </div>
                        </div>
                    </div>
                ) : (
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                        <div>
                            <label className={styles.infoCardRowLabel} style={{ display: 'block', marginBottom: '4px' }}>Shared Topic</label>
                            <input
                                type="text"
                                className="ramain-capsule-input"
                                style={{ width: '100%' }}
                                value={editTopic}
                                onChange={e => setEditTopic(e.target.value)}
                                placeholder="e.g. Data Structures – Trees"
                            />
                        </div>
                        <div>
                            <label className={styles.infoCardRowLabel} style={{ display: 'block', marginBottom: '4px' }}>Shared Goal</label>
                            <input
                                type="text"
                                className="ramain-capsule-input"
                                style={{ width: '100%' }}
                                value={editGoal}
                                onChange={e => setEditGoal(e.target.value)}
                                placeholder="e.g. Solve 5 Tree Problems"
                            />
                        </div>
                        <div className="peerspace-glider-box" style={{ padding: '12px 14px', borderRadius: '14px' }}>
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '6px' }}>
                                <label className={styles.infoCardRowLabel} style={{ display: 'flex', alignItems: 'center', gap: '6px', margin: 0 }}>
                                    <span className="vector-pulse-dot" style={{ width: '6px', height: '6px', backgroundColor: '#3B82F6' }}></span>
                                    Total Sessions (1 — 10)
                                </label>
                                <input
                                    type="number"
                                    min="1"
                                    max="10"
                                    className="vector-glider-input"
                                    style={{ width: '56px', padding: '4px 6px', fontSize: '0.88rem' }}
                                    value={editSessions}
                                    onChange={e => {
                                        let val = parseInt(e.target.value, 10);
                                        if (isNaN(val)) val = 1;
                                        if (val < 1) val = 1;
                                        if (val > 10) val = 10;
                                        setEditSessions(val);
                                    }}
                                />
                            </div>
                            <input
                                type="range"
                                min="1"
                                max="10"
                                value={editSessions}
                                onChange={e => setEditSessions(parseInt(e.target.value, 10))}
                                className="peerspace-vector-glider"
                                style={{
                                    margin: '6px 0 4px',
                                    background: `linear-gradient(to right, #3B82F6 0%, #3B82F6 ${((editSessions - 1) / 9) * 100}%, #E2E8F0 ${((editSessions - 1) / 9) * 100}%, #E2E8F0 100%)`
                                }}
                            />
                            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.68rem', color: '#94A3B8', fontWeight: 600 }}>
                                <span>1</span><span>3</span><span>5</span><span>7</span><span>10</span>
                            </div>
                        </div>
                    </div>
                )}

                <div className={styles.tipCard}>
                    <span className="vector-pulse-dot"></span>
                    <span><strong>PeerSpace Tip:</strong> Take notes in real time with your study partner below.</span>
                </div>
            </div>

            {/* ---- Card 2: Shared Pomodoro Ring ---- */}
            <div className={styles.productivityCard}>
                <div className={styles.productivityCardHeader}>
                    <h3 className={styles.productivityCardTitle}>Pomodoro Timer</h3>
                    <span className={`${styles.cardSyncedIndicator}`} style={{
                        background: isBreak ? 'rgba(96, 165, 250, 0.15)' : 'rgba(197, 255, 74, 0.15)',
                        borderColor: isBreak ? 'rgba(96, 165, 250, 0.4)' : 'rgba(197, 255, 74, 0.4)',
                        color: isBreak ? '#93C5FD' : 'var(--accent-lime, #C5FF4A)'
                    }}>
                        <span className="statusDot" style={{ background: isBreak ? '#93C5FD' : 'var(--accent-lime, #C5FF4A)' }}></span>
                        {isBreak ? 'Break Mode' : (isRunning ? 'Focusing...' : (isPaused ? 'Paused' : 'Ready'))}
                    </span>
                </div>

                <div className={styles.pomodoroTabs}>
                    <span className={!isBreak ? styles.pomodoroTabActive : styles.pomodoroTabInactive}>
                        Focus Time ({Math.round((timer.focusMs || 25 * 60000) / 60000)}m)
                    </span>
                    <span className={isBreak ? styles.pomodoroTabActive : styles.pomodoroTabInactive}>
                        Break Time ({Math.round((timer.breakMs || 5 * 60000) / 60000)}m)
                    </span>
                </div>

                <div className={`${styles.timerCircleWrap} ${isBreak ? styles.timerCircleWrapBreak : ''}`}>
                    <div className={styles.timerCircleContent}>
                        <div className={styles.timerMainClock}>{formatClock(displayMs)}</div>
                        <div className={styles.timerSubtext}>
                            Session {currentSessionNumber} of {totalSessions || 4}
                        </div>
                    </div>
                </div>

                <div className={styles.btnRow} style={{ marginTop: 'auto' }}>
                    {!isRunning && !isPaused ? (
                        <button className={`${styles.timerBtn} ${styles.startBtn}`} onClick={onStart} type="button">
                            Start Focus
                        </button>
                    ) : null}

                    {isRunning ? (
                        <button className={`${styles.timerBtn}`} style={{ background: '#F59E0B', color: '#111827' }} onClick={onPause} type="button">
                            Pause
                        </button>
                    ) : null}

                    {isPaused ? (
                        <button className={`${styles.timerBtn} ${styles.startBtn}`} onClick={onResume} type="button">
                            Resume
                        </button>
                    ) : null}

                    <button className={`${styles.timerBtn} ${styles.ghostBtn}`} onClick={onReset} type="button">
                        Reset
                    </button>
                    <button className={`${styles.timerBtn} ${styles.ghostBtn}`} onClick={onEnd} type="button">
                        End
                    </button>
                </div>
            </div>

            {/* ---- Card 3: Shared Realtime Collaborative Notes ---- */}
            <div className={styles.productivityCard}>
                <div className={styles.productivityCardHeader}>
                    <h3 className={styles.productivityCardTitle}>Shared Notes</h3>
                    <span className={styles.cardSyncedIndicator}>
                        <span className="vector-pulse-dot"></span>
                        {syncStatus}
                    </span>
                </div>

                <textarea
                    className={styles.notesArea}
                    style={{ flex: 1, minHeight: '190px' }}
                    value={notes}
                    onChange={(e) => handleNotesInput(e.target.value)}
                    placeholder="Type notes collaboratively with your friend — synced in real time across both screens..."
                />
                <p className={styles.notesHint} style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <span>✨ Live keystroke sync via Socket.IO</span>
                    <span>No save required</span>
                </p>
            </div>
        </div>
    );
}
