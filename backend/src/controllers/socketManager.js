import { Server } from "socket.io"
let connections = {}
let messages = {}
let timeOnline = {}

// PeerSpace shared session state, keyed by room path. Lets a late-joining
// friend pick up the current timer / notes / goals instead of starting blank.
// Shape: { timer, notes, profiles: { [socketId]: { name, subject, goal } } }
let studyState = {}

// Find which room a socket belongs to (mirrors the chat-message lookup so the
// study events don't duplicate that logic in several places).
const roomOfSocket = (socketId) => {
    for (const [room, members] of Object.entries(connections)) {
        if (members.includes(socketId)) return room
    }
    return null
}

export const connectToSocket = (server) => {
    const io = new Server(server, {
        cors: {
            origin: "*",
            methods: ["GET", "POST"],
            allowedHeaders: ["*"],
            credentials: true
        }
    });

    io.on("connection", (socket) => {

        console.log("SOMETHING CONNECTED")

        socket.on("join-call", (path) => {

            if (connections[path] === undefined) {
                connections[path] = []
            }
            connections[path].push(socket.id)

            // Actually join the Socket.IO room. Without this, socket.to(path)
            // broadcasts (used by every study-* event below) go to an empty
            // room and NOBODY receives them — the root cause of timer/notes not
            // syncing. The app tracks membership in `connections`, but the real
            // room must exist for room-scoped broadcasts to reach anyone.
            socket.join(path)

            timeOnline[socket.id] = new Date();

            // connections[path].forEach(elem => {
            //     io.to(elem)
            // })

            for (let a = 0; a < connections[path].length; a++) {
                io.to(connections[path][a]).emit("user-joined", socket.id, connections[path])
            }

            if (messages[path] !== undefined) {
                for (let a = 0; a < messages[path].length; ++a) {
                    io.to(socket.id).emit("chat-message", messages[path][a]['data'],
                        messages[path][a]['sender'], messages[path][a]['socket-id-sender'])
                }
            }

            // Bring the newcomer up to speed on the shared study session.
            if (studyState[path] !== undefined) {
                io.to(socket.id).emit("study-sync", studyState[path])
            }

        })

        socket.on("signal", (toId, message) => {
            io.to(toId).emit("signal", socket.id, message);
        })

        socket.on("check-room-state", (path, callback) => {
            const hasPeers = connections[path] && connections[path].length > 0;
            const state = studyState[path] || null;
            if (typeof callback === "function") {
                callback({
                    exists: hasPeers || (state && state.seeded),
                    topic: state ? state.topic : "",
                    goal: state ? state.goal : "",
                    totalSessions: state ? state.totalSessions : 4,
                    duration: state && state.duration !== undefined ? state.duration : 25,
                    peerCount: connections[path] ? connections[path].length : 0
                });
            }
        });

        // ---- PeerSpace: shared session events ----
        // Each relays to the rest of the room and persists the latest value so a
        // late joiner can be synced via "study-sync" above.
        const ensureStudyState = (room) => {
            if (studyState[room] === undefined) studyState[room] = { topic: "", goal: "", notes: "", totalSessions: 4, duration: 25 }
            return studyState[room]
        }

        socket.on("study-update", (data) => {
            const room = roomOfSocket(socket.id)
            if (!room) return
            const state = ensureStudyState(room)

            // A `seed` update comes from a client that just joined publishing its
            // lobby config. Only the FIRST such seed should establish the shared
            // room config; later joiners must adopt the room state (delivered via
            // study-sync), not clobber it with their own values.
            if (data.seed) {
                if (state.seeded) return
                state.seeded = true
                if (data.topic) state.topic = data.topic
                if (data.goal) state.goal = data.goal
                if (data.totalSessions !== undefined) state.totalSessions = data.totalSessions
                if (data.duration !== undefined) {
                    state.duration = data.duration
                    if (!state.timer) {
                        state.timer = {
                            running: false,
                            paused: false,
                            completedSessions: 0,
                            totalSessions: state.totalSessions || 4,
                            focusMs: data.duration * 60000,
                            remainingAtPause: data.duration * 60000,
                            startedAt: null
                        }
                    }
                }
                socket.to(room).emit("study-update", {
                    topic: state.topic, goal: state.goal, totalSessions: state.totalSessions, duration: state.duration
                })
                return
            }

            // Explicit edit from the panel — always apply and broadcast.
            if (data.topic !== undefined) state.topic = data.topic
            if (data.goal !== undefined) state.goal = data.goal
            if (data.totalSessions !== undefined) {
                state.totalSessions = data.totalSessions
                if (state.timer) state.timer.totalSessions = data.totalSessions
            }
            if (data.duration !== undefined) {
                state.duration = data.duration
                if (state.timer && !state.timer.running) {
                    state.timer.focusMs = data.duration * 60000
                    state.timer.remainingAtPause = data.duration * 60000
                }
            }
            socket.to(room).emit("study-update", data)
        })

        socket.on("study-profile", (profile) => {
            const room = roomOfSocket(socket.id)
            if (!room) return
            const state = ensureStudyState(room)
            if (!state.profiles) state.profiles = {}
            state.profiles[socket.id] = profile
            socket.to(room).emit("study-profile", socket.id, profile)
        })

        socket.on("study-timer", (timer) => {
            const room = roomOfSocket(socket.id)
            if (!room) return
            ensureStudyState(room).timer = timer
            socket.to(room).emit("study-timer", timer)
        })

        socket.on("study-notes", (notes) => {
            const room = roomOfSocket(socket.id)
            if (!room) return
            ensureStudyState(room).notes = notes
            socket.to(room).emit("study-notes", notes)
        })

        socket.on("chat-message", (data, sender) => {

            const [matchingRoom, found] = Object.entries(connections)
                .reduce(([room, isFound], [roomKey, roomValue]) => {


                    if (!isFound && roomValue.includes(socket.id)) {
                        return [roomKey, true];
                    }

                    return [room, isFound];

                }, ['', false]);

            if (found === true) {
                if (messages[matchingRoom] === undefined) {
                    messages[matchingRoom] = []
                }

                messages[matchingRoom].push({ 'sender': sender, "data": data, "socket-id-sender": socket.id })
                console.log("message", matchingRoom, ":", sender, data)

                connections[matchingRoom].forEach((elem) => {
                    io.to(elem).emit("chat-message", data, sender, socket.id)
                })
            }

        })

        socket.on("disconnect", () => {

            var diffTime = Math.abs(timeOnline[socket.id] - new Date())

            var key

            for (const [k, v] of JSON.parse(JSON.stringify(Object.entries(connections)))) {

                for (let a = 0; a < v.length; ++a) {
                    if (v[a] === socket.id) {
                        key = k

                        for (let a = 0; a < connections[key].length; ++a) {
                            io.to(connections[key][a]).emit('user-left', socket.id)
                        }

                        var index = connections[key].indexOf(socket.id)

                        connections[key].splice(index, 1)

                        // Drop this socket's study profile; clear room study
                        // state entirely once everyone has left.
                        if (studyState[key]) {
                            if (studyState[key].profiles) delete studyState[key].profiles[socket.id]
                            socket.to(key).emit('study-left', socket.id)
                        }

                        if (connections[key].length === 0) {
                            delete connections[key]
                            delete studyState[key]
                        }
                    }
                }

            }


        })


    })


    return io;
}
