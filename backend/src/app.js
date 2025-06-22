import express from 'express';

import {createServer} from "node:http"; //Isse hum custom HTTP server bana sakte hain, jisme later socket.io attach karte hain.

import {Server} from "socket.io";
import mongoose from "mongoose";
import { connectToSocket } from './controllers/socketManager.js';

import cors from "cors";
import { log } from "node:console";
import userRoutes from "./routes/users.routes.js";

const app=express();
const server=createServer(app); //Socket.IO ko app.listen() par directly nahi, balki is tarah ke custom server par attach karte hain.
const io=connectToSocket(server);

app.set("port",(process.env.PORT || 8000));
app.use(cors());
app.use(express.json({limit:"40kb"}));
app.use(express.urlencoded({limit:"40kb", extended:true}));

app.use("/api/v1/users",userRoutes);

app.get("/home",(req,res)=>{
    return res.json({"hello":"Word"})
});

const start=async()=>{
    const connectionDb = await mongoose.connect("mongodb+srv://sahilsharma3184:sahils6693@cluster0.tcxscee.mongodb.net/peerspace?retryWrites=true&w=majority");

    console.log(`Mongo connected db host: ${connectionDb.connection.host}`);
    server.listen(app.get("port"),()=>{
        console.log("listening on port 8000");
        
    })
}
start();