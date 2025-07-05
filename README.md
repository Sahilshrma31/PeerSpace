
dark
Download
SectionsReset

Delete
Click on a section below to edit the contents







Click on a section below to add it to your readme
tech stack

Custom Section
The section you're looking for is unavailable
Editor
sahilshrma31)

Preview
Raw
🎥 PeerSpace
A Real-Time One-on-One Video Calling App with Chat and Screen Sharing

Description
PeerSpace is a feature-rich real-time communication platform that enables one-on-one video calling, live chat, screen sharing, and user history — all in a seamless and intuitive interface. Designed with performance and simplicity in mind, PeerSpace leverages the power of WebRTC for high-quality peer-to-peer video calls and Socket.IO for ultra-fast real-time messaging.

Built with the MERN stack (MongoDB, Express.js, React, and Node.js), this app provides both guest access and secure user authentication, allowing users to either join a call quickly as a guest or sign up for a more personalized experience.

🔐 Authenticated users can track their previous call history, while 🔁 guests can jump straight into meetings without signing up. 💬 Chat runs in parallel with video calls, and users can instantly share their screen — making PeerSpace perfect for remote interviews, tech support, peer learning, and personal meetings.

PeerSpace is built with a scalable and modular architecture and is ready to be extended into a full-fledged Zoom/Google Meet alternative for personal or organizational use.

Features
🎥 HD 1-on-1 Video Calling (WebRTC)
🚪 Guest Access Without Login
🔐 Sign In / Sign Up (JWT Auth)
💬 Real-Time Messaging with Socket.IO
📜 View User Call History (MongoDB)
🖥 Screen Sharing with WebRTC
Tech Stack
Frontend: React.js, Material UI
Backend: Node.js, Express.js
Database: MongoDB, Mongoose
Realtime: WebRTC, Socket.IO
Installation
⚙️ Getting Started
Follow these steps to run PeerSpace locally on your machine:

1️⃣ Clone the Repository
git clone https://github.com/Sahilshrma31/PeerSpace.git
cd PeerSpace
2️⃣ Install Backend Dependencies
cd backend
npm install
3️⃣ Install Frontend Dependencies

cd ../frontend
npm install
4️⃣ Configure Environment Variables Create a .env file inside the /backend folder:

MONGO_URI=mongodb://127.0.0.1:27017/peerspace
PORT=5000
5️⃣ Start Backend Server

cd backend
npm start
6️⃣ Start Frontend App

cd ../frontend
npm start
7️⃣ Open in Browser Visit:

http://localhost:3000
🔷 How It Works / Architecture
Users can join a room as a guest or sign in for personalized access.
Once inside a room, WebRTC establishes a peer-to-peer connection.
Video/audio is captured using getUserMedia().
Signaling (SDP & ICE exchange) is handled via Socket.IO.
Users can send real-time messages using chat.
Screen sharing uses getDisplayMedia() and renegotiates tracks.
If signed in, session data is saved in MongoDB for history.
Author
👨‍💻 Developed by Sahil Sharma

📍 NIT Hamirpur
🔗 LinkedIn
