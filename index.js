const express =require('express');
const app= express();
require('dotenv').config()
const http = require('http');
const cors= require('cors');
const {Server} = require('socket.io')
app.use(cors())

//to link the socket to the express
const server =http.createServer(app);


const io=new Server(server,{
  cors:{
    orgin:"https://jazzy-piroshki-a5258a.netlify.app",
    methods:["GET","POST"]
  }
})

io.on("connection",(socket)=>{
    console.log(`User Connected: ${socket.id}`);

  socket.on('join_room',(data)=>{
    socket.join(data);
    console.log(socket.id,data)
  })

    socket.on("send_messege",(data)=>{
        socket.to(data.room).emit("recieve_messege",data)
    })

    socket.on("disconnect",()=>{
        console.log("User Disconnected: "+socket.id)
    })
})

server.listen(process.env.PORT ||8080)