<h1 align="center">👥 PeerSpace</h1>

<p align="center">
  <b>A Real-Time WebRTC Video Conferencing App</b><br/>
  Built with MERN Stack, WebRTC, Socket.IO & Material UI
</p>

<p align="center">
  <img src="https://img.shields.io/badge/WebRTC-Peer--to--Peer-green" />
  <img src="https://img.shields.io/badge/Socket.IO-Realtime-black" />
  <img src="https://img.shields.io/badge/MaterialUI-Design-blue" />
  <img src="https://img.shields.io/badge/React-Frontend-lightblue" />
  <img src="https://img.shields.io/badge/Node.js-Backend-green" />
  <img src="https://img.shields.io/badge/MongoDB-Database-success" />
</p>

---

## 🌐 About the Project

**PeerSpace** is a powerful real-time video conferencing platform that enables:
- 🎥 HD Video/Audio Calls
- 📤 Screen Sharing
- 💬 Realtime Chat
- 🕑 Session History
- 🚪 Guest Access without Login

Built using **MERN**, with **WebRTC** handling peer-to-peer video/audio and **Socket.IO** powering signaling and chat, this app is perfect for:
- Remote meetings
- Online classrooms
- Personal conferencing
- Local-network collaboration

---

## 🚀 Live Preview

> 🔗 **Watch a Demo:** [YouTube Link](#)

⚠️ *WebRTC requires `localhost` or HTTPS for video/audio to function properly.*

---

## 🧱 Tech Stack

| Layer         | Tech                  | Description                                   |
|---------------|-----------------------|-----------------------------------------------|
| 💻 Frontend   | React.js              | Component-based SPA                           |
| 🎨 UI Design  | Material UI           | Modern design system for styling              |
| 🌐 Backend    | Node.js, Express.js   | REST API & WebRTC signaling                   |
| 🧠 Realtime   | Socket.IO             | Bi-directional events for chat & signaling    |
| 📡 WebRTC     | Browser API           | Handles P2P video/audio/screen-sharing        |
| 🗄 Database    | MongoDB + Mongoose    | Stores sessions, messages, and room data      |

---

## ✨ Features Overview

| Feature              | Description                                                                                       | Implementation Details                                                                                   |
|----------------------|---------------------------------------------------------------------------------------------------|-----------------------------------------------------------------------------------------------------------|
| 🎥 Video Calling     | Peer-to-peer HD video & audio                                                                     | WebRTC APIs: `getUserMedia()`, `RTCPeerConnection`, ICE candidates, SDP                                  |
| 💬 Chat              | Realtime messaging in each room                                                                   | Powered by Socket.IO with timestamped messages                                                           |
| 🖥 Screen Sharing     | Share screen during video calls                                                                   | Uses `getDisplayMedia()` + renegotiation of media tracks                                                 |
| 🕒 Session History   | Track past sessions and metadata                                                                  | MongoDB stores room info, time, users                                                                    |
| 🚪 Guest Access      | No login needed to join a meeting                                                                 | Frontend generates temp guest profiles and sends to backend                                              |
| 🧑‍🎨 UI/UX            | Modern and responsive interface                                                                    | Built using Material UI components and custom styles                                                     |

---

## ⚙️ Getting Started

Follow these simple steps to run the app locally:

| 🔧 Step | Command |
|--------|---------|
| **1️⃣ Clone the Repo** | ```bash<br>git clone https://github.com/Sahilshrma31/PeerSpace.git<br>cd PeerSpace``` |
| **2️⃣ Backend Setup** | ```bash<br>cd backend<br>npm install``` |
| **3️⃣ Frontend Setup** | ```bash<br>cd ../frontend<br>npm install``` |
| **4️⃣ Environment Variables** | Create a `.env` file inside `/backend`:<br><br>```env<br>MONGO_URI=mongodb://127.0.0.1:27017/peerspace<br>PORT=5000``` |
| **▶️ Start Backend Server** | ```bash<br>cd backend<br>npm start``` |
| **▶️ Start Frontend React App** | ```bash<br>cd ../frontend<br>npm start``` |
| **🌐 View on Browser** | Visit [`http://localhost:3000`](http://localhost:3000) |

---

## 🧠 How It Works – Under the Hood

| Layer           | Description                                                                 |
|----------------|-----------------------------------------------------------------------------|
| **Signaling**   | Users join rooms via Socket.IO. SDP & ICE candidates exchanged in real-time |
| **P2P Media**   | WebRTC creates direct connection after signaling                            |
| **Stream Setup**| `getUserMedia()` captures video/audio and attaches to peer connection       |
| **Screen Share**| `getDisplayMedia()` replaces video track + triggers renegotiation           |
| **Chat System** | Socket.IO emits messages to all peers with timestamps and user info         |
| **Database**    | MongoDB stores meeting metadata: room ID, start/end time, optional messages |

---


---

## 🧑‍💻 Author

- **Sahil Sharma**  
  [GitHub](https://github.com/Sahilshrma31) · [LinkedIn](https://linkedin.com/in/sahilshrma31)

---

## 📌 Note

> This app is currently meant for **local usage or custom deployment**.
> Production-ready WebRTC deployments require:
> - HTTPS (via custom domain)
> - STUN/TURN servers for NAT traversal

---



