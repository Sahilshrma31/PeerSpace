import { Server } from "socket.io"

let connections={};
let messages={};
let timeOnline={};

export const connectToSocket=(server)=>{
    const io=new Server(server,{
        cors:{ //This is important because WebSocket connections often come from frontend apps (e.g., localhost:3000) while the backend runs on another port (e.g., localhost:5000).
            origin:"*",
            methods:["Get","POST"],
            allowedHeaders:["*"],
            credentials:true
        }
    });

    io.on("connection",(socket)=>{

        socket.on("join-call", (path) => {                       // When a user joins a specific call/room

            if (connections[path] === undefined) {               // If no users yet in this path
                connections[path] = [];                          // Initialize empty array for the room
            }
        
            connections[path].push(socket.id);                   // Add this user’s socket ID to the room
        
            timeOnline[socket.id] = new Date();                  // Store join time for this user
        
            for (let a = 0; a < connections[path].length; a++) { // Loop through all users in the room
                io.to(connections[path[a]]).emit(                // Send to each user:
                    "user-joined",                               // → Event: someone joined
                    socket.id,                                   // → Who joined
                    connections[path]                            // → Updated user list
                );
            }
        
            if (messages[path] !== undefined) {                  // If chat history exists for this room
                for (let a = 0; a < messages[path].length; ++a) { // Loop through all previous messages
                    io.to(socket.id).emit(                       // Send each message to the new user
                        "chat-message",                          // → Event: show chat message
                        messages[path][a]['data'],               // → Message text
                        messages[path][a]['sender'],             // → Who sent it
                        messages[path][a]['socket-id-sender']    // → Sender's socket ID
                    );
                }
            }
        
        }); // End of join-call handler
        

        socket.on("signal",(toId,message)=>{
            io.to(toId).emit("signal",socket.id,message);
        })
        
        socket.on("chat-message", (data, sender) => {
            // Find the room where this socket (user) is currently connected
            const [matchingRoom, found] = Object.entries(connections) // Convert connections object to array of [roomKey, socketIdArray]
              .reduce(([room, isFound], [roomKey, roomValue]) => {     // Loop through each room to check if this socket is in it
                if (!isFound && roomValue.includes(socket.id)) {       // If not already found, and this room contains the socket ID
                  return [roomKey, true];                              // Found the room, return its key and true
                }
                return [room, isFound];                                // Otherwise, return previous values
              }, ['', false]);                                         // Initial value: no room found
          
            if (found === true) { // If we successfully found the room this socket belongs to
          
              if (messages[matchingRoom] === undefined) {
                messages[matchingRoom] = []; // Initialize message array for the room if it doesn't exist yet
              }
          
              messages[matchingRoom].push({
                "sender": sender,
                "data": data,
                "socket-id-sender": socket.id
              });
          
              console.log("message", KeyboardEvent, ":", sender, data); // Debugging line (KeyboardEvent may be unnecessary here)
          
              // Broadcast the chat message to all users in the room
              connections[matchingRoom].forEach((elem) => {
                io.to(elem).emit("chat-message", data, sender, socket.id); // Send message to every socket in the room
              });
            }
          });
          

          socket.on("disconnect", (data, sender) => {
            // Calculate how long the user was online by comparing join time with current time
            var diffTime = Math.abs(timeOnline[socket.id] - new Date());
        
            var key; // Will store the room key the socket belonged to
        
            // Loop through all rooms and their connected sockets
            for (const [k, v] of JSON.parse(JSON.stringify(Object.entries(connections)))) {
                // Loop through each socket ID in the current room
                for (let a = 0; a < v.length; ++a) {
                    // If this socket ID matches the disconnected socket
                    if (v[a] === socket.id) {
                        key = k; // Save the room key this socket belonged to
        
                        // Notify all users in this room that a user has left
                        for (let a = 0; a < connections[key].length; ++a) {
                            io.to(connections[key][a]).emit('user-left', socket.id);
                        }
        
                        // Remove the socket ID from the room's connection list
                        var index = connections[key].indexOf(socket.id);
                        connections[key].splice(index, 1);
        
                        // If the room is now empty, delete it from the connection list
                        if (connections[key].length === 0) {
                            delete connections[key];
                        }
                    }
                }
            }
        });
        
    })

    return io;

}