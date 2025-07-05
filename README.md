

<h1 align="center">👥 PeerSpace</h1>

<p align="center">
  <b>A Real-Time 1-on-1 Video Calling App</b><br/>
  Built with MERN Stack, WebRTC, and Socket.IO
</p>

---

## 🌐 About the Project

**PeerSpace** is a secure and efficient real-time video calling platform designed for direct one-on-one communication.

It allows users to:
- 🎥 Make high-quality **video/audio calls**
- 🚪 **Join as guest** without account creation
- 🔐 **Sign up / Sign in** for account-based access
- 💬 **Chat in real-time** during the video session
- 🧾 View **session history** after logging in
- 🖥 **Share screen** during a call

The app uses **WebRTC** for peer-to-peer media connection and **Socket.IO** for real-time signaling and chat. Built with the **MERN stack**, it ensures both performance and scalability with a modern UI experience.

---

## ✨ Features

| Feature             | Description                                                   |
|---------------------|---------------------------------------------------------------|
| 🎥 Video Call        | 1-on-1 peer-to-peer video/audio calling using WebRTC         |
| 🚪 Join as Guest     | Users can join a call instantly without signing up            |
| 🔐 Sign In / Sign Up | Registered users can access additional features like history |
| 💬 Chat              | Real-time messaging during video calls                       |
| 🧾 Session History   | Logged-in users can view previous meeting details            |
| 🖥 Screen Sharing     | Share your screen seamlessly during a call                   |

---

## 🧱 Tech Stack

| Layer       | Technology                  |
|-------------|-----------------------------|
| Frontend    | React.js + Material UI       |
| Backend     | Node.js + Express.js         |
| Database    | MongoDB + Mongoose           |
| Real-time   | WebRTC (Media), Socket.IO (Signaling & Chat) |

---

## ⚙️ Getting Started

To run this app locally, follow these steps:

### 🔧 Prerequisites
- Node.js
- MongoDB

### 📦 Setup

1. **Clone the Repository**
   ```bash
   git clone https://github.com/Sahilshrma31/PeerSpace.git
   cd PeerSpace
Backend Setup
cd backend
npm install
Frontend Setup
cd ../frontend
npm install
Environment Variables
Create a .env file in the backend/ directory:

MONGO_URI=mongodb://127.0.0.1:27017/peerspace
PORT=5000
Run the App
Start backend server:

cd backend
npm start
Start frontend React app:

cd ../frontend
npm start
Open in Browser
Visit http://localhost:3000
🔍 How It Works

Component	Role
Signaling	Handled by Socket.IO for exchanging SDP, ICE between peers
Video/Audio	WebRTC establishes direct media connection using getUserMedia()
Screen Sharing	Uses getDisplayMedia() and renegotiates video track
Chat System	Real-time messages broadcasted via Socket.IO
User History	Stored in MongoDB, fetched for logged-in users
🧑‍💻 Author

Sahil Sharma
GitHub · LinkedIn
📌 Note

This application is optimized for local development and private deployments.
For production usage:
Use HTTPS
Set up STUN/TURN servers for broader WebRTC support
