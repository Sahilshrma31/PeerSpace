const IS_PROD = window.location.hostname !== "localhost" && window.location.hostname !== "127.0.0.1";
const server = IS_PROD ?
    "https://peerspacebackend.onrender.com" :
    "http://localhost:8000";

export default server;
