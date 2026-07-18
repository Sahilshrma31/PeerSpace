import React, { useEffect, useRef, useState } from 'react'
import io from "socket.io-client";
import { Badge, IconButton, TextField } from '@mui/material';
import { Button } from '@mui/material';
import VideocamIcon from '@mui/icons-material/Videocam';
import VideocamOffIcon from '@mui/icons-material/VideocamOff'
import styles from "../styles/videoComponent.module.css";
import CallEndIcon from '@mui/icons-material/CallEnd'
import MicIcon from '@mui/icons-material/Mic'
import MicOffIcon from '@mui/icons-material/MicOff'
import ScreenShareIcon from '@mui/icons-material/ScreenShare';
import StopScreenShareIcon from '@mui/icons-material/StopScreenShare'
import ChatIcon from '@mui/icons-material/Chat'
import MenuBookIcon from '@mui/icons-material/MenuBook'
import server from '../environment';
import Navbar from '../components/Navbar';
import StudyPanel from '../components/study/StudyPanel';
import studyStyles from '../styles/studyPanel.module.css';
import SessionSummaryModal from '../components/study/SessionSummaryModal';
import { getBreakMinutes, PHASE } from '../components/study/studyConstants';
import PeerSpaceLogoIcon from '../components/PeerSpaceLogoIcon';

const server_url = server;

var connections = {};

const peerConfigConnections = {
    iceServers: [
      { urls: "stun:stun.l.google.com:19302" },
      { urls: "stun:stun1.l.google.com:19302" },
      // Free public TURN (Open Relay by Metered) across multiple ports and
      // transports so the call can relay when the two peers are on different
      // networks / behind restrictive NAT-firewalls (e.g. laptop on WiFi and
      // phone on mobile data), where STUN alone cannot connect. For production
      // reliability, swap these for your own TURN credentials (Metered/Twilio/coturn).
      { urls: "turn:openrelay.metered.ca:80", username: "openrelayproject", credential: "openrelayproject" },
      { urls: "turn:openrelay.metered.ca:443", username: "openrelayproject", credential: "openrelayproject" },
      { urls: "turn:openrelay.metered.ca:443?transport=tcp", username: "openrelayproject", credential: "openrelayproject" },
      { urls: "turns:openrelay.metered.ca:443", username: "openrelayproject", credential: "openrelayproject" }
    ]
  }

// Attach a local stream's tracks to a peer connection using the MODERN
// addTrack API. The old addStream()/onaddstream is removed from the spec and
// is NOT supported by Safari/iOS, which is why remote video/audio never showed
// on the iPhone. If a sender of the same kind already exists (after re-acquiring
// media or screen-sharing), replace its track instead of adding a duplicate
// (which would throw).
const attachStream = (pc, stream) => {
    if (!pc || !stream) return;
    const senders = pc.getSenders();
    stream.getTracks().forEach(track => {
        const existing = senders.find(s => s.track && s.track.kind === track.kind);
        if (existing) {
            existing.replaceTrack(track).catch(e => console.log("replaceTrack error:", e));
        } else {
            try { pc.addTrack(track, stream); } catch (e) { console.log("addTrack error:", e); }
        }
    });
};
  

export default function VideoMeetComponent() {

    var socketRef = useRef();
    let socketIdRef = useRef();

    let localVideoref = useRef();

    let [videoAvailable, setVideoAvailable] = useState(true);

    let [audioAvailable, setAudioAvailable] = useState(true);

    let [video, setVideo] = useState([]);

    let [audio, setAudio] = useState();

    let [screen, setScreen] = useState();

    let [showModal, setModal] = useState(false);

    let [screenAvailable, setScreenAvailable] = useState();

    let [messages, setMessages] = useState([])

    let [message, setMessage] = useState("");

    let [newMessages, setNewMessages] = useState(0);

    let [askForUsername, setAskForUsername] = useState(true);

    let [username, setUsername] = useState("");

    const videoRef = useRef([])

    let [videos, setVideos] = useState([])

    // ---- PeerSpace session state ----
    // Session config chosen in the pre-session setup (the extended lobby).
    let [subject, setSubject] = useState("");
    let [topic, setTopic] = useState("");
    let [goal, setGoal] = useState("");
    let [duration, setDuration] = useState(25); // focus length in minutes
    let [totalSessions, setTotalSessions] = useState(4);
    let [completedSessions, setCompletedSessions] = useState(0);

    let [existingRoomInfo, setExistingRoomInfo] = useState(null);

    useEffect(() => {
        if (askForUsername) {
            const tempSocket = io.connect(server_url, { secure: false });
            tempSocket.on('connect', () => {
                tempSocket.emit("check-room-state", window.location.href, (res) => {
                    if (res && (res.exists || res.peerCount > 0)) {
                        setExistingRoomInfo(res);
                        if (res.topic) {
                            setTopic(res.topic);
                            setSubject(res.topic);
                        }
                        if (res.goal) setGoal(res.goal);
                        if (res.totalSessions) setTotalSessions(res.totalSessions);
                        if (res.duration !== undefined) {
                            setDuration(res.duration);
                            setRemaining(res.duration * 60000);
                        }
                    }
                });
            });
            return () => {
                tempSocket.disconnect();
            };
        }
    }, [askForUsername]);

    // Shared runtime state (kept in sync across both peers via sockets).
    let [timer, setTimer] = useState({
        startedAt: null,
        remainingAtPause: 25 * 60000,
        focusMs: 25 * 60000,
        breakMs: 5 * 60000,
        running: false,
        paused: false,
        phase: PHASE.IDLE,
        completedSessions: 0,
        totalSessions: 4
    });
    let [remaining, setRemaining] = useState(25 * 60000);
    let [phase, setPhase] = useState(PHASE.IDLE);
    let [friendProfile, setFriendProfile] = useState({ name: "", subject: "", goal: "" });
    let [notes, setNotes] = useState("");

    useEffect(() => {
        if (!timer.running && !timer.paused) {
            setRemaining(duration * 60000);
            setTimer(prev => ({
                ...prev,
                focusMs: duration * 60000,
                breakMs: getBreakMinutes(duration) * 60000,
                remainingAtPause: duration * 60000
            }));
        }
    }, [duration]);

    let [showStudyPanel, setShowStudyPanel] = useState(true);
    let [showSummary, setShowSummary] = useState(false);
    let [summaryData, setSummaryData] = useState(null);

    useEffect(() => {
        getPermissions();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    let getDislayMedia = () => {
        if (screen) {
            if (navigator.mediaDevices.getDisplayMedia) {
                navigator.mediaDevices.getDisplayMedia({ video: true, audio: true })
                    .then(getDislayMediaSuccess)
                    .then((stream) => { })
                    .catch((e) => console.log(e))
            }
        }
    }

    const getPermissions = async () => {
        try {
            const videoPermission = await navigator.mediaDevices.getUserMedia({ video: true });
            if (videoPermission) {
                setVideoAvailable(true);
                console.log('Video permission granted');
            } else {
                setVideoAvailable(false);
                console.log('Video permission denied');
            }

            const audioPermission = await navigator.mediaDevices.getUserMedia({ audio: true });
            if (audioPermission) {
                setAudioAvailable(true);
                console.log('Audio permission granted');
            } else {
                setAudioAvailable(false);
                console.log('Audio permission denied');
            }

            if (navigator.mediaDevices.getDisplayMedia) {
                setScreenAvailable(true);
            } else {
                setScreenAvailable(false);
            }

            if (videoAvailable || audioAvailable) {
                const userMediaStream = await navigator.mediaDevices.getUserMedia({ video: videoAvailable, audio: audioAvailable });
                if (userMediaStream) {
                    window.localStream = userMediaStream;
                    if (localVideoref.current) {
                        localVideoref.current.srcObject = userMediaStream;
                    }
                }
            }
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        if (video !== undefined && audio !== undefined && !window.localStream) {
            getUserMedia();
            console.log("SET STATE HAS ", video, audio);
        }
    }, [video, audio])

    useEffect(() => {
        if (!askForUsername && localVideoref.current && window.localStream) {
            localVideoref.current.srcObject = window.localStream;
        }
    }, [askForUsername])

    useEffect(() => {
        if (!timer.running && !timer.paused) {
            const focusMs = duration * 60000;
            const breakMs = getBreakMinutes(duration) * 60000;
            setTimer(t => ({ ...t, focusMs, breakMs, remainingAtPause: focusMs, totalSessions }));
            setRemaining(focusMs);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [duration, totalSessions])

    // The shared Pomodoro heartbeat
    useEffect(() => {
        if (!timer.running || !timer.startedAt || timer.paused) return;

        const tick = () => {
            const elapsed = Date.now() - timer.startedAt;
            const targetDuration = timer.durationMs || (timer.phase === PHASE.BREAK ? timer.breakMs : timer.focusMs);
            const left = targetDuration - elapsed;

            if (left > 0) {
                setRemaining(left);
            } else {
                // Phase completed!
                if (timer.phase === PHASE.FOCUS || !timer.phase || timer.phase === PHASE.IDLE) {
                    const newCompleted = (timer.completedSessions || completedSessions || 0) + 1;
                    if (newCompleted >= (timer.totalSessions || totalSessions || 4)) {
                        const doneTimer = { ...timer, running: false, paused: false, phase: PHASE.DONE, completedSessions: newCompleted };
                        setTimer(doneTimer);
                        setPhase(PHASE.DONE);
                        setRemaining(0);
                        setCompletedSessions(newCompleted);
                        openSummary(timer.focusMs);
                        socketRef.current?.emit('study-timer', doneTimer);
                    } else {
                        const breakTimer = {
                            // Exact moment this focus phase ended. Both peers run
                            // this heartbeat and both emit the transition, so a
                            // deterministic start (not Date.now()) keeps their
                            // payloads identical and avoids boundary jitter.
                            startedAt: timer.startedAt + targetDuration,
                            focusMs: timer.focusMs,
                            breakMs: timer.breakMs,
                            running: true,
                            paused: false,
                            phase: PHASE.BREAK,
                            durationMs: timer.breakMs,
                            completedSessions: newCompleted,
                            totalSessions: timer.totalSessions
                        };
                        setTimer(breakTimer);
                        setPhase(PHASE.BREAK);
                        setRemaining(timer.breakMs);
                        setCompletedSessions(newCompleted);
                        socketRef.current?.emit('study-timer', breakTimer);
                    }
                } else if (timer.phase === PHASE.BREAK) {
                    const nextFocusTimer = {
                        // Exact moment this break ended — deterministic across
                        // both peers (see breakTimer above).
                        startedAt: timer.startedAt + targetDuration,
                        focusMs: timer.focusMs,
                        breakMs: timer.breakMs,
                        running: true,
                        paused: false,
                        phase: PHASE.FOCUS,
                        durationMs: timer.focusMs,
                        completedSessions: timer.completedSessions,
                        totalSessions: timer.totalSessions
                    };
                    setTimer(nextFocusTimer);
                    setPhase(PHASE.FOCUS);
                    setRemaining(timer.focusMs);
                    socketRef.current?.emit('study-timer', nextFocusTimer);
                }
            }
        };

        tick();
        const intervalId = setInterval(tick, 1000);
        return () => clearInterval(intervalId);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [timer.running, timer.paused, timer.startedAt, timer.phase, timer.focusMs, timer.breakMs, timer.durationMs, timer.completedSessions, timer.totalSessions])

    let openSummary = (focusMsSpent) => {
        const spent = timer.startedAt
            ? Math.min(timer.focusMs, Date.now() - timer.startedAt)
            : 0;
        const summaryObj = {
            topic: topic || subject || 'Data Structures',
            goal: goal || 'Solve 5 Tree Problems',
            durationMin: Math.round(timer.focusMs / 60000),
            totalStudyMs: focusMsSpent != null ? focusMsSpent : spent,
            completedSessions: completedSessions || timer.completedSessions || 0,
            totalSessions: totalSessions || timer.totalSessions || 4,
            notes: notes
        };
        setSummaryData(summaryObj);
        setShowSummary(true);

        // Auto-save the note & session data to local browser storage immediately right when the meeting ends
        try {
            const savedList = JSON.parse(localStorage.getItem('peerspace_saved_notes') || '[]');
            savedList.unshift({
                ...summaryObj,
                id: Date.now(),
                date: new Date().toLocaleDateString()
            });
            localStorage.setItem('peerspace_saved_notes', JSON.stringify(savedList));
        } catch (e) { console.log('Could not save notes locally:', e); }
    }

    let startTimer = () => {
        const focusMs = duration * 60000;
        const breakMs = getBreakMinutes(duration) * 60000;
        const shared = {
            startedAt: Date.now(),
            focusMs,
            breakMs,
            running: true,
            paused: false,
            phase: PHASE.FOCUS,
            durationMs: focusMs,
            completedSessions: 0,
            totalSessions
        };
        setTimer(shared);
        setPhase(PHASE.FOCUS);
        setRemaining(focusMs);
        setCompletedSessions(0);
        socketRef.current?.emit('study-timer', shared);
    }

    let pauseTimer = () => {
        const shared = {
            ...timer,
            running: false,
            paused: true,
            remainingAtPause: remaining,
            durationMs: remaining
        };
        setTimer(shared);
        socketRef.current?.emit('study-timer', shared);
    }

    let resumeTimer = () => {
        const dur = timer.remainingAtPause || remaining || timer.focusMs;
        const shared = {
            ...timer,
            startedAt: Date.now(),
            running: true,
            paused: false,
            durationMs: dur
        };
        setTimer(shared);
        socketRef.current?.emit('study-timer', shared);
    }

    let resetTimer = () => {
        const focusMs = duration * 60000;
        const breakMs = getBreakMinutes(duration) * 60000;
        const shared = {
            startedAt: null,
            focusMs,
            breakMs,
            running: false,
            paused: false,
            phase: PHASE.IDLE,
            durationMs: focusMs,
            completedSessions: 0,
            totalSessions
        };
        setTimer(shared);
        setPhase(PHASE.IDLE);
        setRemaining(focusMs);
        setCompletedSessions(0);
        socketRef.current?.emit('study-timer', shared);
    }

    let endSession = () => {
        openSummary();
        const shared = { ...timer, running: false, paused: false, phase: PHASE.DONE };
        setTimer(shared);
        setPhase(PHASE.DONE);
        socketRef.current?.emit('study-timer', shared);
    }

    let handleNotesChange = (value) => {
        setNotes(value);
        socketRef.current?.emit('study-notes', value);
    }

    let handleTopicGoalChange = (config) => {
        if (config.topic !== undefined) setTopic(config.topic);
        if (config.goal !== undefined) setGoal(config.goal);
        if (config.totalSessions !== undefined) setTotalSessions(config.totalSessions);
        socketRef.current?.emit('study-update', config);
    }

    let getMedia = () => {
        setVideo(videoAvailable);
        setAudio(audioAvailable);
        connectToSocketServer();

    }




   //  Function to handle successful webcam access
let getUserMediaSuccess = (stream) => {
    try {
        // Stop existing tracks if any
        window.localStream?.getTracks().forEach(track => track.stop());
    } catch (e) {
        console.log("Error stopping existing tracks:", e);
    }

    // Set new stream to window and video element
    window.localStream = stream;
    if (localVideoref.current) {
        localVideoref.current.srcObject = stream;
        localVideoref.current.play(); // Ensures playback in some browsers
    }

    // Send stream to all peers except self
    for (let id in connections) {
        if (id === socketIdRef.current) continue;

        attachStream(connections[id], window.localStream);

        connections[id].createOffer().then((description) => {
            connections[id].setLocalDescription(description)
                .then(() => {
                    socketRef.current.emit('signal', id, JSON.stringify({
                        sdp: connections[id].localDescription
                    }));
                })
                .catch(e => console.log("Set local description error:", e));
        });
    }

    // Handle when a track ends (user closes webcam/mic)
    stream.getTracks().forEach(track => {
        track.onended = () => {
            setVideo(false);
            setAudio(false);

            try {
                let tracks = localVideoref.current?.srcObject?.getTracks();
                tracks?.forEach(track => track.stop());
            } catch (e) {
                console.log("Track cleanup error:", e);
            }

            // Replace with silent/black stream (optional fallback)
            let blackSilence = (...args) => new MediaStream([black(...args), silence()]);
            window.localStream = blackSilence();
            if (localVideoref.current) {
                localVideoref.current.srcObject = window.localStream;
            }

            for (let id in connections) {
                attachStream(connections[id], window.localStream);

                connections[id].createOffer().then((description) => {
                    connections[id].setLocalDescription(description)
                        .then(() => {
                            socketRef.current.emit('signal', id, JSON.stringify({
                                sdp: connections[id].localDescription
                            }));
                        })
                        .catch(e => console.log("Set fallback SDP error:", e));
                });
            }
        };
    });

    return stream; // Ensure .then() chain receives the stream
};


   //  Function to trigger webcam/mic access
let getUserMedia = () => {
    if ((video && videoAvailable) || (audio && audioAvailable)) {
        navigator.mediaDevices.getUserMedia({ video: video, audio: audio })
            .then(getUserMediaSuccess)
            .catch((e) => console.log("getUserMedia error:", e));
    } else {
        try {
            let tracks = localVideoref.current?.srcObject?.getTracks();
            tracks?.forEach(track => track.stop());
        } catch (e) {
            console.log("Media cleanup error:", e);
        }
    }
};





    let getDislayMediaSuccess = (stream) => {
        console.log("HERE")
        try {
            window.localStream.getTracks().forEach(track => track.stop())
        } catch (e) { console.log(e) }

        window.localStream = stream
        localVideoref.current.srcObject = stream

        for (let id in connections) {
            if (id === socketIdRef.current) continue

            attachStream(connections[id], window.localStream)

            connections[id].createOffer().then((description) => {
                connections[id].setLocalDescription(description)
                    .then(() => {
                        socketRef.current.emit('signal', id, JSON.stringify({ 'sdp': connections[id].localDescription }))
                    })
                    .catch(e => console.log(e))
            })
        }

        stream.getTracks().forEach(track => track.onended = () => {
            setScreen(false)

            try {
                let tracks = localVideoref.current.srcObject.getTracks()
                tracks.forEach(track => track.stop())
            } catch (e) { console.log(e) }

            let blackSilence = (...args) => new MediaStream([black(...args), silence()])
            window.localStream = blackSilence()
            localVideoref.current.srcObject = window.localStream

            getUserMedia()

        })
    }

    let gotMessageFromServer = (fromId, message) => {
        var signal = JSON.parse(message)

        if (fromId !== socketIdRef.current) {
            if (signal.sdp) {
                connections[fromId].setRemoteDescription(new RTCSessionDescription(signal.sdp)).then(() => {
                    if (signal.sdp.type === 'offer') {
                        connections[fromId].createAnswer().then((description) => {
                            connections[fromId].setLocalDescription(description).then(() => {
                                socketRef.current.emit('signal', fromId, JSON.stringify({ 'sdp': connections[fromId].localDescription }))
                            }).catch(e => console.log(e))
                        }).catch(e => console.log(e))
                    }
                }).catch(e => console.log(e))
            }

            if (signal.ice) {
                connections[fromId].addIceCandidate(new RTCIceCandidate(signal.ice)).catch(e => console.log(e))
            }
        }
    }




    let connectToSocketServer = () => {
        socketRef.current = io.connect(server_url, { secure: false })

        socketRef.current.on('signal', gotMessageFromServer)

        socketRef.current.on('connect', () => {
            socketRef.current.emit('join-call', window.location.href)
            socketIdRef.current = socketRef.current.id

            socketRef.current.on('chat-message', addMessage)

            // ---- PeerSpace sync listeners ----
            // Share our session config and profile so everyone stays synced
            // Publish our lobby config as a SEED — the backend only lets the
            // first joiner establish the shared room config; late joiners adopt
            // the room state via study-sync instead of overwriting it.
            socketRef.current.emit('study-update', { topic: topic || subject, goal, totalSessions, duration, seed: true })
            socketRef.current.emit('study-profile', { name: username, subject: topic || subject, goal })

            socketRef.current.on('study-update', (data) => {
                if (data.topic !== undefined) {
                    setTopic(data.topic);
                    setSubject(data.topic);
                }
                if (data.goal !== undefined) setGoal(data.goal);
                if (data.totalSessions !== undefined) setTotalSessions(data.totalSessions);
                if (data.duration !== undefined) {
                    setDuration(data.duration);
                    if (!timer?.running && !timer?.paused) setRemaining(data.duration * 60000);
                }
            })

            socketRef.current.on('study-profile', (id, profile) => {
                setFriendProfile(profile)
            })

            // A peer started / paused / resumed / reset / ended the shared timer.
            socketRef.current.on('study-timer', (sharedTimer) => {
                setTimer(sharedTimer)
                if (sharedTimer.phase) setPhase(sharedTimer.phase)
                if (sharedTimer.completedSessions !== undefined) setCompletedSessions(sharedTimer.completedSessions)
                if (sharedTimer.totalSessions !== undefined) setTotalSessions(sharedTimer.totalSessions)
                if (sharedTimer.paused && sharedTimer.remainingAtPause !== undefined) {
                    setRemaining(sharedTimer.remainingAtPause)
                } else if (!sharedTimer.running && !sharedTimer.paused) {
                    setPhase(sharedTimer.phase || (sharedTimer.startedAt ? PHASE.DONE : PHASE.IDLE))
                    if (!sharedTimer.startedAt) setRemaining(sharedTimer.focusMs || duration * 60000)
                }
            })

            // A peer edited the shared notes.
            socketRef.current.on('study-notes', (sharedNotes) => {
                setNotes(sharedNotes)
            })

            // Late-join catch-up: adopt the room's current study state.
            socketRef.current.on('study-sync', (state) => {
                if (state.timer) {
                    setTimer(state.timer)
                    if (state.timer.phase) setPhase(state.timer.phase)
                    if (state.timer.completedSessions !== undefined) setCompletedSessions(state.timer.completedSessions)
                    if (state.timer.totalSessions !== undefined) setTotalSessions(state.timer.totalSessions)
                    if (state.timer.paused && state.timer.remainingAtPause !== undefined) {
                        setRemaining(state.timer.remainingAtPause)
                    } else if (!state.timer.running && !state.timer.paused && state.timer.focusMs !== undefined) {
                        setRemaining(state.timer.focusMs)
                    }
                }
                if (state.duration !== undefined) {
                    setDuration(state.duration);
                    if (!state.timer?.running && !state.timer?.paused) {
                        setRemaining(state.duration * 60000);
                    }
                }
                if (state.topic !== undefined) {
                    setTopic(state.topic);
                    setSubject(state.topic);
                }
                if (state.goal !== undefined) setGoal(state.goal);
                if (state.totalSessions !== undefined) setTotalSessions(state.totalSessions);
                if (typeof state.notes === 'string') setNotes(state.notes);
                if (state.profiles) {
                    const others = Object.values(state.profiles);
                    if (others.length > 0) setFriendProfile(others[0]);
                }
            })

            socketRef.current.on('study-left', () => {
                setFriendProfile({ name: "", subject: "", goal: "" })
            })

            socketRef.current.on('user-left', (id) => {
                if (connections[id]) {
                    try { connections[id].close() } catch (e) { }
                    delete connections[id]
                }
                setVideos((videos) => {
                    const updated = videos.filter((video) => video.socketId !== id)
                    videoRef.current = updated
                    return updated
                })
            })

            socketRef.current.on('user-joined', (id, clients) => {
                clients.forEach((socketListId) => {

                    // Skip ourselves, and don't recreate a peer connection that already
                    // exists. user-joined can fire repeatedly with the full client list;
                    // recreating leaks connections and causes duplicate remote tiles.
                    if (socketListId === socketIdRef.current) return;
                    if (connections[socketListId]) return;

                    connections[socketListId] = new RTCPeerConnection(peerConfigConnections)
                    // Wait for their ice candidate       
                    connections[socketListId].onicecandidate = function (event) {
                        if (event.candidate != null) {
                            socketRef.current.emit('signal', socketListId, JSON.stringify({ 'ice': event.candidate }))
                        }
                    }

                    // Wait for their video stream
                    connections[socketListId].ontrack = (event) => {
                        // ontrack replaces the removed onaddstream (Safari/iOS compatible).
                        const remoteStream = (event.streams && event.streams[0]) || new MediaStream([event.track]);
                        if (!remoteStream) return;
                        // ontrack fires once PER track (audio + video), so dedupe INSIDE the
                        // state updater using the authoritative previous state. Checking a ref
                        // outside the updater races between the two events and renders the same
                        // peer twice.
                        setVideos(prev => {
                            let updated;
                            if (prev.some(v => v.socketId === socketListId)) {
                                updated = prev.map(v =>
                                    v.socketId === socketListId ? { ...v, stream: remoteStream } : v
                                );
                            } else {
                                updated = [...prev, {
                                    socketId: socketListId,
                                    stream: remoteStream,
                                    autoplay: true,
                                    playsinline: true
                                }];
                            }
                            videoRef.current = updated;
                            return updated;
                        });
                    };


                    // Add the local video stream
                    if (window.localStream !== undefined && window.localStream !== null) {
                        attachStream(connections[socketListId], window.localStream)
                    } else {
                        let blackSilence = (...args) => new MediaStream([black(...args), silence()])
                        window.localStream = blackSilence()
                        attachStream(connections[socketListId], window.localStream)
                    }
                })

                if (id === socketIdRef.current) {
                    for (let id2 in connections) {
                        if (id2 === socketIdRef.current) continue

                        try {
                            attachStream(connections[id2], window.localStream)
                        } catch (e) { }

                        connections[id2].createOffer().then((description) => {
                            connections[id2].setLocalDescription(description)
                                .then(() => {
                                    socketRef.current.emit('signal', id2, JSON.stringify({ 'sdp': connections[id2].localDescription }))
                                })
                                .catch(e => console.log(e))
                        })
                    }
                }
            })
        })
    }

    let silence = () => {
        let ctx = new AudioContext()
        let oscillator = ctx.createOscillator()
        let dst = oscillator.connect(ctx.createMediaStreamDestination())
        oscillator.start()
        ctx.resume()
        return Object.assign(dst.stream.getAudioTracks()[0], { enabled: false })
    }
    let black = ({ width = 640, height = 480 } = {}) => {
        let canvas = Object.assign(document.createElement("canvas"), { width, height })
        canvas.getContext('2d').fillRect(0, 0, width, height)
        let stream = canvas.captureStream()
        return Object.assign(stream.getVideoTracks()[0], { enabled: false })
    }

    let handleVideo = () => {
        const nextState = !video;
        setVideo(nextState);
        window.localStream?.getVideoTracks().forEach(track => {
            track.enabled = nextState;
        });
    }
    let handleAudio = () => {
        const nextState = !audio;
        setAudio(nextState);
        window.localStream?.getAudioTracks().forEach(track => {
            track.enabled = nextState;
        });
    }

    useEffect(() => {
        if (screen !== undefined) {
            getDislayMedia();
        }
    }, [screen])
    let handleScreen = () => {
        setScreen(!screen);
    }

    let handleEndCall = () => {
        try {
            if (notes || topic || subject) {
                const savedList = JSON.parse(localStorage.getItem('peerspace_saved_notes') || '[]');
                savedList.unshift({
                    topic: topic || subject || 'Data Structures',
                    goal: goal || 'Solve 5 Tree Problems',
                    notes: notes || '',
                    durationMin: Math.round(timer.focusMs / 60000),
                    completedSessions: completedSessions || timer.completedSessions || 0,
                    totalSessions: totalSessions || timer.totalSessions || 4,
                    id: Date.now(),
                    date: new Date().toLocaleDateString()
                });
                localStorage.setItem('peerspace_saved_notes', JSON.stringify(savedList));
            }
        } catch (e) { }

        try {
            let tracks = localVideoref.current.srcObject.getTracks()
            tracks.forEach(track => track.stop())
        } catch (e) { }
        window.location.href = "/"
    }

    let openChat = () => {
        setModal(true);
        setNewMessages(0);
    }
    let closeChat = () => {
        setModal(false);
    }
    let handleMessage = (e) => {
        setMessage(e.target.value);
    }

    const addMessage = (data, sender, socketIdSender) => {
        setMessages((prevMessages) => [
            ...prevMessages,
            { sender: sender, data: data }
        ]);
        if (socketIdSender !== socketIdRef.current) {
            setNewMessages((prevNewMessages) => prevNewMessages + 1);
        }
    };



    let sendMessage = () => {
        console.log(socketRef.current);
        socketRef.current.emit('chat-message', message, username)
        setMessage("");

        // this.setState({ message: "", sender: username })
    }

    
    let connect = () => {
        setAskForUsername(false);
        getMedia();
    }


    return (
        <div>

            {askForUsername === true ? (
                <div style={{ minHeight: '100vh', paddingBottom: '80px' }}>
                    <Navbar />

                    <div className="ramain-hero-container" style={{ textAlign: 'center', maxWidth: '820px' }}>
                        <div style={{
                            display: 'inline-flex',
                            alignItems: 'center',
                            background: '#111827',
                            color: 'var(--accent-lime)',
                            fontWeight: '700',
                            fontSize: '0.88rem',
                            padding: '6px 16px',
                            borderRadius: '20px',
                            marginBottom: '20px',
                            border: '1px solid #374151'
                        }}>
                            <span className="vector-pulse-dot"></span>
                            Pre-Session Setup
                        </div>

                        <h2 className="ramain-title" style={{ fontSize: '2.8rem', marginBottom: '16px' }}>
                            Set up your <span className="lime-highlight">study session</span>
                        </h2>

                        <p className="ramain-subtitle" style={{ marginBottom: '32px' }}>
                            Check your camera, tell us what you're studying and pick a focus length, then start the session with your friend.
                        </p>

                        <div style={{
                            width: '100%',
                            maxWidth: '640px',
                            margin: '0 auto 28px',
                            background: '#0F172A',
                            borderRadius: '20px',
                            overflow: 'hidden',
                            border: '2px solid #111827',
                            boxShadow: '0 12px 30px rgba(0,0,0,0.15)'
                        }}>
                            <video
                                ref={localVideoref}
                                autoPlay
                                muted
                                style={{
                                    width: '100%',
                                    height: '360px',
                                    objectFit: 'cover',
                                    display: 'block',
                                    background: '#0F172A'
                                }}
                            ></video>
                        </div>

                        <div className="ramain-input-capsule" style={{ maxWidth: '520px' }}>
                            <div className="ramain-capsule-icon">
                                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                                    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                                    <circle cx="12" cy="7" r="4"></circle>
                                </svg>
                            </div>
                            <input
                                type="text"
                                className="ramain-capsule-input"
                                placeholder="Enter your display username..."
                                value={username}
                                onChange={e => setUsername(e.target.value)}
                                onKeyPress={e => e.key === 'Enter' && connect()}
                            />
                        </div>

                        {(!existingRoomInfo || !existingRoomInfo.exists) ? (
                            <>
                                {/* Study session details — reuses the capsule styling for a
                                    consistent look with the rest of the app. */}
                                <div className="ramain-input-capsule" style={{ maxWidth: '520px', marginTop: '16px' }}>
                                    <div className="ramain-capsule-icon">📚</div>
                                    <input
                                        type="text"
                                        className="ramain-capsule-input"
                                        placeholder="Shared Study Topic (e.g. Data Structures – Trees)..."
                                        value={topic || subject}
                                        onChange={e => { setTopic(e.target.value); setSubject(e.target.value); }}
                                    />
                                </div>

                                <div className="ramain-input-capsule" style={{ maxWidth: '520px', marginTop: '16px' }}>
                                    <div className="ramain-capsule-icon">🎯</div>
                                    <input
                                        type="text"
                                        className="ramain-capsule-input"
                                        placeholder="Shared Study Goal (e.g. Solve 5 Tree Problems)..."
                                        value={goal}
                                        onChange={e => setGoal(e.target.value)}
                                        onKeyPress={e => e.key === 'Enter' && connect()}
                                    />
                                </div>

                                {/* Soothing Vector Glider 1: Focus Duration (0 - 90 Minutes) */}
                                <div className="peerspace-glider-box" style={{ marginTop: '24px', textAlign: 'left' }}>
                                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                                        <label style={{ fontSize: '0.82rem', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.06em', color: '#334155', display: 'flex', alignItems: 'center', gap: '6px' }}>
                                            <span className="vector-pulse-dot" style={{ width: '6px', height: '6px' }}></span>
                                            Focus Duration (0 — 90 min)
                                        </label>
                                        <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                                            <input
                                                type="number"
                                                min="0"
                                                max="90"
                                                className="vector-glider-input"
                                                value={duration}
                                                onChange={e => {
                                                    let val = parseInt(e.target.value, 10);
                                                    if (isNaN(val)) val = 0;
                                                    if (val < 0) val = 0;
                                                    if (val > 90) val = 90;
                                                    setDuration(val);
                                                }}
                                            />
                                            <span style={{ fontSize: '0.88rem', fontWeight: 700, color: '#64748B' }}>min</span>
                                        </div>
                                    </div>

                                    <input
                                        type="range"
                                        min="0"
                                        max="90"
                                        value={duration}
                                        onChange={e => setDuration(parseInt(e.target.value, 10))}
                                        className="peerspace-vector-glider"
                                        style={{
                                            background: `linear-gradient(to right, var(--accent-lime, #C5FF4A) 0%, var(--accent-lime, #C5FF4A) ${(duration / 90) * 100}%, #E2E8F0 ${(duration / 90) * 100}%, #E2E8F0 100%)`
                                        }}
                                    />
                                    {/* Precision Vector Glider Tick Marks */}
                                    <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.72rem', color: '#94A3B8', fontWeight: 600, padding: '0 2px' }}>
                                        <span>0 min</span>
                                        <span>15</span>
                                        <span>30</span>
                                        <span>45</span>
                                        <span>60</span>
                                        <span>75</span>
                                        <span>90 min</span>
                                    </div>
                                </div>

                                {/* Soothing Vector Glider 2: Total Pomodoro Sessions (1 - 10 Sessions) */}
                                <div className="peerspace-glider-box" style={{ marginTop: '24px', textAlign: 'left' }}>
                                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                                        <label style={{ fontSize: '0.82rem', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.06em', color: '#334155', display: 'flex', alignItems: 'center', gap: '6px' }}>
                                            <span className="vector-pulse-dot" style={{ width: '6px', height: '6px', background: '#3B82F6' }}></span>
                                            Pomodoro Sessions (1 — 10)
                                        </label>
                                        <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                                            <input
                                                type="number"
                                                min="1"
                                                max="10"
                                                className="vector-glider-input"
                                                value={totalSessions || 4}
                                                onChange={e => {
                                                    let val = parseInt(e.target.value, 10);
                                                    if (isNaN(val)) val = 1;
                                                    if (val < 1) val = 1;
                                                    if (val > 10) val = 10;
                                                    setTotalSessions(val);
                                                }}
                                            />
                                            <span style={{ fontSize: '0.88rem', fontWeight: 700, color: '#64748B' }}>sessions</span>
                                        </div>
                                    </div>

                                    <input
                                        type="range"
                                        min="1"
                                        max="10"
                                        value={totalSessions || 4}
                                        onChange={e => setTotalSessions(parseInt(e.target.value, 10))}
                                        className="peerspace-vector-glider"
                                        style={{
                                            background: `linear-gradient(to right, #3B82F6 0%, #3B82F6 ${(((totalSessions || 4) - 1) / 9) * 100}%, #E2E8F0 ${(((totalSessions || 4) - 1) / 9) * 100}%, #E2E8F0 100%)`
                                        }}
                                    />
                                    {/* Precision Vector Glider Tick Marks */}
                                    <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.72rem', color: '#94A3B8', fontWeight: 600, padding: '0 2px' }}>
                                        <span>1</span>
                                        <span>2</span>
                                        <span>3</span>
                                        <span>4</span>
                                        <span>5</span>
                                        <span>6</span>
                                        <span>7</span>
                                        <span>8</span>
                                        <span>9</span>
                                        <span>10</span>
                                    </div>
                                </div>
                            </>
                        ) : (
                            <div style={{
                                width: '100%',
                                maxWidth: '520px',
                                margin: '20px auto 10px',
                                background: '#F8FAFC',
                                border: '2px dashed #CBD5E1',
                                borderRadius: '18px',
                                padding: '24px',
                                textAlign: 'left',
                                boxShadow: '0 4px 15px rgba(0,0,0,0.03)'
                            }}>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '12px' }}>
                                    <span style={{ background: '#C5FF4A', color: '#111827', fontWeight: '800', fontSize: '0.78rem', padding: '5px 12px', borderRadius: '10px' }}>
                                        🟢 ACTIVE STUDY ROOM DETECTED
                                    </span>
                                    <span style={{ color: '#64748B', fontWeight: '600', fontSize: '0.86rem' }}>
                                        ({existingRoomInfo.peerCount} {existingRoomInfo.peerCount === 1 ? 'peer' : 'peers'} already inside)
                                    </span>
                                </div>
                                <div style={{ fontWeight: '800', color: '#0F172A', fontSize: '1.2rem', marginBottom: '6px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                                    <span>📚</span> {existingRoomInfo.topic || 'Shared Study Session'}
                                </div>
                                {existingRoomInfo.goal && (
                                    <div style={{ color: '#475569', fontSize: '0.94rem', fontWeight: '600', marginBottom: '14px' }}>
                                        🎯 Goal: {existingRoomInfo.goal}
                                    </div>
                                )}
                                <div style={{ background: '#FFFFFF', border: '1px solid #E2E8F0', borderRadius: '12px', padding: '12px 14px', fontSize: '0.86rem', color: '#64748B', lineHeight: '1.5' }}>
                                    ⚡ Room topic, goal, and study timers are already configured and running by the host. Just enter your display username above and click <strong>Join Study Session</strong> below!
                                </div>
                            </div>
                        )}

                        <div style={{ marginTop: '28px' }}>
                            <button onClick={connect} type="button" className="btn-lime" style={{ fontSize: '1rem', padding: '14px 32px' }}>
                                {(existingRoomInfo && existingRoomInfo.exists) ? "Join Study Session →" : "Start Study Session →"}
                            </button>
                        </div>
                    </div>
                </div>
            ) :


                <div className={studyStyles.studyRoomWrapper}>

                    {/* Top Session Header Bar */}
                    <header className={studyStyles.studyHeader}>
                        <div className={studyStyles.studyBrand} style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                            <PeerSpaceLogoIcon size={32} />
                            <span>PeerSpace</span>
                            <span
                                className={studyStyles.roomCodePill}
                                onClick={() => {
                                    navigator.clipboard?.writeText(window.location.href);
                                    alert("Room link copied to clipboard!");
                                }}
                                title="Click to copy room link"
                            >
                                Room: /{window.location.pathname.split('/').pop() || 'study'}
                                <svg style={{ marginLeft: '6px' }} width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                                    <rect x="9" y="9" width="13" height="13" rx="2" ry="2" />
                                    <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
                                </svg>
                            </span>
                        </div>

                        <div className={studyStyles.headerStatusCapsule}>
                            <span className={studyStyles.headerStatusSection} style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                                    <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" />
                                    <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z" />
                                </svg>
                                <strong>{topic || subject || 'Data Structures'}</strong>
                            </span>
                            <span style={{ color: 'rgba(255,255,255,0.2)' }}>|</span>
                            <span className={studyStyles.headerStatusSection} style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                                    <circle cx="12" cy="12" r="10" />
                                    <circle cx="12" cy="12" r="6" />
                                    <circle cx="12" cy="12" r="2" />
                                </svg>
                                <strong>{goal || 'Solve 5 Tree Problems'}</strong>
                            </span>
                            <span style={{ color: 'rgba(255,255,255,0.2)' }}>|</span>
                            <span className={studyStyles.headerStatusSection} style={{ color: 'var(--accent-lime, #C5FF4A)', display: 'flex', alignItems: 'center', gap: '6px' }}>
                                <span className="vector-pulse-dot"></span>
                                Session {Math.min((completedSessions || 0) + 1, totalSessions || 4)} of {totalSessions || 4}
                            </span>
                        </div>

                        <div className={studyStyles.headerActions}>
                            <button type="button" className={studyStyles.headerBtn} title="Participants in room" style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                                    <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
                                    <circle cx="9" cy="7" r="4" />
                                    <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
                                    <path d="M16 3.13a4 4 0 0 1 0 7.75" />
                                </svg>
                                {1 + videos.length}
                            </button>
                            <button
                                type="button"
                                className={studyStyles.headerBtn}
                                onClick={() => { showModal ? closeChat() : openChat(); }}
                                style={{ display: 'flex', alignItems: 'center', gap: '6px' }}
                            >
                                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                                    <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
                                </svg>
                                Chat {newMessages > 0 ? `(${newMessages})` : ''}
                            </button>
                            <button
                                type="button"
                                className={studyStyles.leaveRoomBtn}
                                onClick={handleEndCall}
                            >
                                Leave Room
                            </button>
                        </div>
                    </header>

                    {showModal ? <div className={styles.chatRoom}>
                        <div className={styles.chatContainer}>
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                <h1 style={{ margin: 0, fontSize: '1.2rem', color: '#111827' }}>Room Chat</h1>
                                <button
                                    onClick={closeChat}
                                    style={{ background: 'none', border: 'none', fontSize: '1.4rem', cursor: 'pointer', color: '#6B7280' }}
                                    type="button"
                                >
                                    ×
                                </button>
                            </div>

                            <div className={styles.chattingDisplay} style={{ marginTop: '14px' }}>
                                {messages.length !== 0 ? messages.map((item, index) => (
                                    <div style={{ marginBottom: "16px" }} key={index}>
                                        <p style={{ fontWeight: "bold", fontSize: '0.8rem', color: '#4B5563', margin: '0 0 4px 0' }}>{item.sender}</p>
                                        <p style={{ background: '#F3F4F6', padding: '8px 12px', borderRadius: '12px', margin: 0, color: '#1F2937' }}>{item.data}</p>
                                    </div>
                                )) : <p style={{ color: '#9CA3AF', fontSize: '0.9rem', textAlign: 'center', marginTop: '20px' }}>No Messages Yet — say hi to your study partner!</p>}
                            </div>

                            <div className={styles.chattingArea}>
                                <TextField
                                    value={message}
                                    onChange={(e) => setMessage(e.target.value)}
                                    onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
                                    id="outlined-basic"
                                    label="Type a message..."
                                    variant="outlined"
                                    size="small"
                                    fullWidth
                                />
                                <Button variant='contained' onClick={sendMessage} style={{ background: 'var(--accent-lime, #C5FF4A)', color: '#111827', fontWeight: 'bold' }}>Send</Button>
                            </div>
                        </div>
                    </div> : null}

                    {/* Main Scrollable Study Dashboard Section */}
                    <div className={studyStyles.studyMainBody}>
                        {/* Equal-Tile Google Meet Video Grid */}
                        <div
                            className={studyStyles.studyVideoGrid}
                            style={{
                                gridTemplateColumns: videos.length === 0
                                    ? 'minmax(380px, 720px)'
                                    : `repeat(auto-fit, minmax(${videos.length >= 2 ? '340px' : '440px'}, 1fr))`,
                                justifyContent: 'center',
                                margin: '0 auto'
                            }}
                        >
                            {/* Local Participant Tile (You) */}
                            <div className={studyStyles.videoTile}>
                                <video
                                    ref={localVideoref}
                                    autoPlay
                                    muted
                                    playsInline
                                ></video>
                                <div className={studyStyles.tileBadge}>
                                    <span className="vector-pulse-dot"></span>
                                    You ({username || 'Student'}) {!audio ? '🔇' : ''} {!video ? '📷 Off' : ''}
                                </div>
                            </div>

                            {/* Remote Participant Tiles (Peers) */}
                            {videos.map((v) => (
                                <div key={v.socketId} className={studyStyles.videoTile}>
                                    <video
                                        data-socket={v.socketId}
                                        ref={ref => {
                                            if (ref && v.stream) {
                                                ref.srcObject = v.stream;
                                            }
                                        }}
                                        autoPlay
                                        playsInline
                                    ></video>
                                    <div className={studyStyles.tileBadge}>
                                        <span className="vector-pulse-dot"></span>
                                        {friendProfile?.name || 'Study Partner'}
                                    </div>
                                </div>
                            ))}
                        </div>

                        {/* Productivity Cards Section (Session Progress, Pomodoro Timer Ring, Shared Notes) */}
                        {showStudyPanel && (
                            <StudyPanel
                                topic={topic || subject}
                                subject={topic || subject}
                                goal={goal}
                                totalSessions={totalSessions}
                                completedSessions={completedSessions}
                                friendProfile={friendProfile}
                                phase={phase}
                                remaining={remaining}
                                timer={timer}
                                notes={notes}
                                onStart={startTimer}
                                onPause={pauseTimer}
                                onResume={resumeTimer}
                                onReset={resetTimer}
                                onEnd={endSession}
                                onNotesChange={handleNotesChange}
                                onTopicGoalChange={handleTopicGoalChange}
                                onClose={() => setShowStudyPanel(false)}
                            />
                        )}
                    </div>

                    {/* Floating Bottom Control Bar */}
                    <div className={styles.buttonContainers}>
                        <IconButton onClick={handleVideo} style={{ color: "white" }} title={video ? "Turn off camera" : "Turn on camera"}>
                            {video ? <VideocamIcon /> : <VideocamOffIcon />}
                        </IconButton>
                        <IconButton onClick={handleAudio} style={{ color: "white" }} title={audio ? "Mute microphone" : "Unmute microphone"}>
                            {audio ? <MicIcon /> : <MicOffIcon />}
                        </IconButton>
                        {screenAvailable ? (
                            <IconButton onClick={handleScreen} style={{ color: "white" }} title={screen ? "Stop sharing screen" : "Share screen"}>
                                {screen ? <ScreenShareIcon /> : <StopScreenShareIcon />}
                            </IconButton>
                        ) : null}
                        <Badge badgeContent={newMessages} max={999} color='orange'>
                            <IconButton onClick={() => { showModal ? closeChat() : openChat(); }} style={{ color: "white" }} title="Toggle chat">
                                <ChatIcon />
                            </IconButton>
                        </Badge>
                        <IconButton onClick={() => setShowStudyPanel(s => !s)} style={{ color: showStudyPanel ? "var(--accent-lime)" : "white" }} title="Toggle productivity panels">
                            <MenuBookIcon />
                        </IconButton>
                        <IconButton onClick={handleEndCall} style={{ color: "red" }} title="Leave room">
                            <CallEndIcon />
                        </IconButton>
                    </div>

                    {showSummary && (
                        <SessionSummaryModal
                            data={summaryData}
                            onClose={() => setShowSummary(false)}
                            onExit={handleEndCall}
                        />
                    )}

                </div>

            }

        </div>
    )
}
