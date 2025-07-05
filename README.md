<h1 align="center">👥 PeerSpace</h1>

<p align="center">
  A Real-Time WebRTC Video Conferencing Platform built with the MERN Stack + WebRTC + Socket.IO.
</p>

<p align="center">
  <img src="https://img.shields.io/badge/WebRTC-Peer--to--Peer-green" />
  <img src="https://img.shields.io/badge/Socket.IO-Realtime-black" />
  <img src="https://img.shields.io/badge/React-Frontend-blue" />
  <img src="https://img.shields.io/badge/Node.js-Backend-green" />
  <img src="https://img.shields.io/badge/MongoDB-Database-success" />
</p>

---

## 🌐 About the Project

**PeerSpace** is a robust, real-time video conferencing web app that allows users to connect face-to-face using **WebRTC**. It's designed for seamless communication, offering:
- 🔴 HD video/audio calling
- 📤 Screen sharing
- 💬 Realtime chat
- 🕑 Meeting history
- 🚪 Guest join without login

Built using the **MERN stack**, this app uses **WebRTC for peer-to-peer media**, and **Socket.IO for signaling and chat**. Ideal for remote teams, online classrooms, or personal communication on a local network.

---

## ✨ Features Breakdown

| Feature              | Description                                                                                       | Implementation Details                                                                                   |
|----------------------|---------------------------------------------------------------------------------------------------|-----------------------------------------------------------------------------------------------------------|
| 🎥 Video Calling     | Peer-to-peer high-quality video and audio calling                                                 | Implemented using WebRTC APIs (`getUserMedia`, `RTCPeerConnection`, ICE candidates, SDP offers/answers)  |
| 💬 Chat              | Text chat during calls                                                                            | Uses Socket.IO to emit and receive messages in real-time                                                 |
| 🖥 Screen Sharing     | Share screen while on video call                                                                  | Uses `getDisplayMedia()` in WebRTC and replaces the video track in existing connection                    |
| 🕒 Meeting History   | Record of past calls stored in database                                                           | MongoDB stores metadata like time, participants, room ID                                                 |
| 🚪 Guest Join        | Join rooms without creating an account                                                            | Frontend generates guest IDs and sends them to backend to create a temp session                          |
| 🧑‍🎨 UI/UX            | Minimal, responsive, easy-to-use                                                                 | Built with Tailwind CSS & custom React components                                                        |

---

## 🧱 Tech Stack

| Layer        | Technology             | Description                                           |
|--------------|------------------------|-------------------------------------------------------|
| 💻 Frontend  | React.js               | SPA with hooks, component-based architecture          |
| 🎨 Styling   | Tailwind CSS           | Utility-first responsive design                       |
| 🌐 Backend   | Node.js, Express.js    | REST API, signaling server for WebRTC                 |
| 🧠 Realtime  | Socket.IO              | For chat and WebRTC signaling                         |
| 📡 Media     | WebRTC                 | Handles video/audio/screen-sharing P2P connections    |
| 🗄 Database   | MongoDB + Mongoose     | Stores meeting history and optional user data         |

---

## 🛠 Setup Instructions

### 1️⃣ Clone the Repository

```bash
## ⚙️ Setup Instructions

> Follow the steps below to run the project locally on your system.

| 🔧 Step | 💻 Command |
|--------|------------|
| 1️⃣ Clone the Repository | ```bash<br>git clone https://github.com/Sahilshrma31/PeerSpace.git<br>cd PeerSpace``` |
| 2️⃣ Install Backend Dependencies | ```bash<br>cd backend<br>npm install``` |
| 3️⃣ Install Frontend Dependencies | ```bash<br>cd ../frontend<br>npm install``` |
| 4️⃣ Add Environment Variables | Create a `.env` file inside the `backend/` folder with the following content:<br><br>```env<br>MONGO_URI=mongodb://127.0.0.1:27017/peerspace<br>PORT=5000``` |
| ▶️ Start Backend Server | ```bash<br>cd backend<br>npm start``` |
| ▶️ Start Frontend React App | ```bash<br>cd ../frontend<br>npm start``` |
| 🌐 Access Application | Visit: [`http://localhost:3000`](http://localhost:3000) |

---

## 📺 Live Demo (YouTube)

🔗 **Watch the Project in Action:** [Live Demo on YouTube](#)

> ⚠️ *Note: This is a local deployment demo since WebRTC peer-to-peer communication requires HTTPS or localhost.*

---

## 🧠 How It Works – Under the Hood

| 🧩 Feature | ⚙️ Description |
|-----------|----------------|
| **Signaling** | Users join a room via **Socket.IO**. SDP offers and ICE candidates are exchanged in real time. |
| **WebRTC** | Once signaling completes, a direct **P2P connection** is formed using `RTCPeerConnection`. |
| **Media Streams** | User's camera and mic are accessed using `getUserMedia()` and attached to video/audio tracks. |
| **Screen Share** | `getDisplayMedia()` replaces the current video stream and renegotiates the peer connection. |
| **Chat Messaging** | Messages are emitted and broadcast via sockets, along with timestamps and user IDs. |
| **MongoDB** | Stores metadata like **room ID, session times, usernames, and chat logs** (if any). |

---

✅ *This section now looks modern, readable, and recruiter-friendly. Just paste it into your README.md!*

Would you like a polished **full README** including features, tech stack, and folder structure? Let me know!
