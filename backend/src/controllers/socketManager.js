import { Server } from "socket.io"

let connections={};
let messages={};
let timeOnline={};

export const connectToSocket=(server)=>{
    const io=new Server(server);

    io.on("connection",(socket)=>{

        socket.on("join-call",(path)=>{
            if(connections[path]===undefined){
                connections[path]=[]
            }
            connections[path].push(socket.id)
        })

        socket.on("signal",(toId,message)=>{
            io.to(toId).emit("signal",socket.id,message);
        })
        
        socket.on("chat-message",(data,sender)=>{

        })

        socket.on("disconnect",(data,sender)=>{

        })
    })

    return io;

}