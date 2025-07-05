Real-time WebRTC Video Conferencing - PeerSpace
A Feature-Rich Peer-to-Peer Communication Platform
This project, named PeerSpace, is a robust, real-time video conferencing application designed to facilitate seamless peer-to-peer communication, including video calls, integrated chat, screen sharing, and meeting history. Built with modern web technologies, it offers a secure and efficient way for individuals to connect and collaborate online on a local network.

✨ Features
Peer-to-Peer Video Calls: High-quality, real-time video and audio communication powered by WebRTC.

Integrated Chat: Text-based chat functionality alongside video calls for concurrent discussions.

Screen Sharing: Share your screen effortlessly to present documents, code, or anything else during a call.

Meeting History: Easily access a record of your past meetings for reference.

Guest Join Option: Join meetings quickly as a guest without needing to create an account.

Intuitive User Interface: A clean and user-friendly design for a smooth communication experience.

🚀 Technologies Used
This project leverages a powerful combination of technologies to deliver its features:

WebRTC: For real-time communication capabilities (video, audio, screen sharing).

Socket.IO: Enables real-time, bidirectional communication between web clients and the server for signaling and chat.

MERN Stack:

MongoDB: A NoSQL database for flexible data storage (e.g., meeting history, user data).

Express.js: A back-end web application framework for building RESTful APIs.

React.js: A JavaScript library for building interactive user interfaces.

Node.js: A JavaScript runtime for building scalable server-side applications.

📦 Installation
To get a local copy up and running, follow these simple steps:

Clone the repository:

Bash

git clone https://github.com/Sahilshrma31/PeerSpace.git
cd PeerSpace
Install server dependencies:

Bash

cd backend # Assuming your backend code is in a 'backend' folder
npm install
Install client dependencies:

Bash

cd ../frontend # Assuming your frontend code is in a 'frontend' folder
npm install
Set up environment variables:
Create a .env file in your backend directory and add necessary variables (e.g., MongoDB URI, Socket.IO port).

MONGO_URI=your_mongodb_connection_string # e.g., mongodb://127.0.0.1:27017/peerdodb
PORT=5000
Note: Adjust variable names and values based on your actual backend configuration. For local MongoDB, ensure your MongoDB server is running.

🏃 How to Run
Since this project is primarily set up for local development due to the intricacies of WebRTC deployment, follow these steps to run it on your machine:

Start the backend server:

Bash

cd backend
npm start # Or 'node server.js' depending on your script
The server should start on the port specified in your .env file (e.g., http://localhost:5000).

Start the frontend development server:

Bash

cd ../frontend
npm start
This will usually open the application in your browser at http://localhost:3000.

Now you should be able to access the application via http://localhost:3000 and start making video calls locally!

🤝 Contributing
Contributions are what make the open-source community such an amazing place to learn, inspire, and create. Any contributions you make are greatly appreciated.

If you have a suggestion that would make this better, please fork the repo and create a pull request. You can also open an issue with the tag "enhancement". Don't forget to give the project a star! Thanks!

Fork the Project

Create your Feature Branch (git checkout -b feature/AmazingFeature)

Commit your Changes (git commit -m 'Add some AmazingFeature')

Push to the Branch (git push origin feature/AmazingFeature)

Open a Pull Request
 
💖 Made with Love and Efforts
This project was meticulously crafted and brought to life by Sahil Sharma. Every line of code, every feature, and every detail has been infused with dedication and passion. I hope you enjoy using it as much as I enjoyed building it.

📧 Contact
Sahil Sharma – sahil.sharma3184@gmail.com

LinkedIn: https://linkedin.com/in/sahil-sharma-95512628a

Project Link: https://github.com/Sahilshrma31/PeerSpace
