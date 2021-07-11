require("dotenv").config();

// Express setup
const express = require("express")
const app = express();
const httpServer = require("http").createServer(app);
const cors = require("cors");
const call = require("./routers/call");
const chat = require("./routers/chat");
const auth = require("./routers/auth");
const mongoose = require("mongoose");
const authorization = require("./helpers/authorization");
app.use(cors());



// Middlewars

app.use(express.json());

app.use((req,res,next)=>{
    console.log(`${res.statusCode} ${req.method} ${req.path}`);
    return next();
})

// Routes
app.use("/call",call.routers);
// For authentication purpose
app.use("/auth",auth);


// Default routes
app.get("/",(req,res)=>{
    res.status(200).json({"message":"Server is up and running"});
})
app.get("*",(req,res)=>{
    res.status(404).json({"message":"Page not found"});
})

// Db setup
const connection = mongoose.connect('mongodb://localhost:27017/teams', {useNewUrlParser: true, useUnifiedTopology: true,useCreateIndex:true});
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
    console.log("Successfully connected to database");
});


// Socket setup
const options={
    cors: {
        origin: "*",
		methods: [ "GET", "POST" ]
	}
};
const io = require("socket.io")(httpServer,options);
io.use(authorization.wsAuthorize);
io.on("connection",socket=>{
    console.log(`Socket Connected: ${socket.id}`);
    socket.on('addMe',(data)=>{
        console.log(data);
        call.addCandidate(io,socket,data);
    })
    socket.on('callRequest',(data)=>{
        call.callRequest(io,socket,data);
    })
    socket.on('disconnectMe',(data)=>{
        call.disconnectMe(io,socket,data);
    })
    socket.on('addToRoom',(data)=>{
        chat.addToRoom(io,socket,data);
    })
    socket.on('sendMessage',(data)=>{
        chat.sendMessage(io,socket,data);
    })
})

// Server setup
const host = process.env.HOST || "127.0.0.1";
const port = process.env.PORT || 5000;

httpServer.listen(port,host,()=>{
    console.log(`Server started on http://${host}:${port}`);
})