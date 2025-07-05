# 🚀 PeerSpace - Real-Time WebRTC Video Conferencing Platform


**PeerSpace** is a feature-rich, real-time video conferencing application designed to enable seamless peer-to-peer communication. With support for high-quality video/audio calls, integrated chat, screen sharing, and meeting history, PeerSpace offers a secure and efficient way to connect and collaborate—built entirely on the MERN stack and powered by WebRTC.

---

## ✨ Features

- ✅ **Peer-to-Peer Video Calls**  
  High-quality, real-time audio/video communication using WebRTC.

- 💬 **Integrated Chat**  
  Chat alongside your video calls with smooth real-time messaging.

- 🖥️ **Screen Sharing**  
  Share your screen during a call for presentations or collaboration.

- 🕓 **Meeting History**  
  Keep track of your past meetings and revisit important moments.

- 👤 **Guest Join Option**  
  Instantly join meetings as a guest—no sign-up required.

- 🎨 **Intuitive UI**  
  Clean, modern interface built with user experience in mind.

---

## 🔧 Tech Stack

| Technology  | Role |
|-------------|------|
| **WebRTC** | Real-time video, audio, and screen sharing |
| **Socket.IO** | Signaling and real-time chat |
| **MongoDB** | Database for meeting history and users |
| **Express.js** | RESTful API backend |
| **React.js** | Frontend UI |
| **Node.js** | Backend runtime |

---

## 📦 Installation

To run PeerSpace locally, follow these steps:

### 1️⃣ Clone the repository

```bash
git clone https://github.com/Sahilshrma31/PeerSpace.git
cd PeerSpace
2️⃣ Install backend dependencies
cd backend
npm install
3️⃣ Install frontend dependencies
cd ../frontend
npm install
4️⃣ Set up environment variables
Create a .env file in the backend directory with the following content:

MONGO_URI=mongodb://127.0.0.1:27017/peerdodb
PORT=5000
⚠️ Ensure MongoDB is running locally if you're using the above URI.
🏃 Running the Application Locally

Start the backend server
cd backend
npm start  # or node server.js
Server should run at http://localhost:5000

Start the frontend server
cd ../frontend
npm start
Frontend will open in your browser at http://localhost:3000

📂 Folder Structure

PeerSpace/
├── backend/          # Express + MongoDB backend
│   ├── controllers/
│   ├── models/
│   ├── routes/
│   └── server.js
├── frontend/         # React frontend
│   ├── components/
│   ├── pages/
│   └── App.js
└── README.md
🤝 Contributing

Contributions are welcome! 💙
Here’s how you can help:

Fork the project
Create your feature branch
git checkout -b feature/AmazingFeature
Commit your changes
git commit -m 'Add some AmazingFeature'
Push to the branch
git push origin feature/AmazingFeature
Open a Pull Request
Or you can simply open an issue with the tag enhancement.

⭐ Don’t forget to star the repo if you like it!
📸 Screenshots

Add some screenshots or a demo GIF here for better visual appeal!
(Optional but highly recommended for showing UI and functionality)
💖 Made with Love

This project was crafted with dedication and passion by Sahil Sharma. Every feature and detail reflects countless hours of effort to make real-time communication seamless and accessible.

📬 Contact

📧 Email: sahil.sharma3184@gmail.com
💼 LinkedIn: linkedin.com/in/sahil-sharma-95512628a
🌐 Project Link: https://github.com/Sahilshrma31/PeerSpace
