// ---------------------------------------------------------------------------
// PeerSpace — shared study-session constants & helpers
// ---------------------------------------------------------------------------
// Centralised here so the lobby, the in-call panel and the summary modal all
// agree on durations and formatting. Keeping this modular also gives the
// future features (streaks, weekly analytics, flashcards, AI tutor, shared PDF
// viewer) a single, obvious place to plug their config into later.
// ---------------------------------------------------------------------------

// Focus-session lengths offered in the pre-session setup screen (minutes).
export const DURATION_OPTIONS = [25, 50, 90];

// Break length that auto-starts after each focus block (minutes).
// The starter of the timer decides this and broadcasts it, so both peers stay
// in sync no matter which value maps to which focus length.
const BREAK_FOR = { 25: 5, 50: 10, 90: 15 };

export const getBreakMinutes = (focusMinutes) => BREAK_FOR[focusMinutes] ?? 5;

// Human-friendly mm:ss for a millisecond duration.
export const formatClock = (ms) => {
    const safe = Math.max(0, Math.floor(ms / 1000));
    const m = Math.floor(safe / 60);
    const s = safe % 60;
    return `${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}`;
};

// Session lifecycle phases used across the study components.
export const PHASE = {
    IDLE: 'idle',
    FOCUS: 'focus',
    BREAK: 'break',
    DONE: 'done',
};

// Placeholder scaffolding for the roadmap — intentionally NOT implemented yet.
// Kept here so the data shape is discoverable when these land.
export const FUTURE_FEATURES = ['streaks', 'weeklyAnalytics', 'flashcards', 'aiTutor', 'sharedPdfViewer'];
