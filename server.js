let express = require("express");
const req = require("express/lib/request");
const res = require("express/lib/response");
const { Socket } = require("socket.io");

let app = express();

app.set("view engine","ejs")

app.use(express.static('public'))

app.get("/",(req,res)=>{
    res.render("index");
})

let server = app.listen(4000,()=>{
    console.log("Server running on port number 4000");
})
// socket.io

let io = require('socket.io')(server)

io.on('connection',(socket)=>{
    console.log("A new client has been connected");

    socket.username = "Anonymous ";

    socket.on("new_message",data =>{
        io.sockets.emit("new_message",{
            message: data.message,username:socket.username
        })
        socket.on("change_username",data =>{
            socket.username = data.username;
        })

        socket.on("typing",data=>{
            if(data.typing==true)
               io.emit('display',data)
            else

               io.emit('display',data)

        })
    })
})