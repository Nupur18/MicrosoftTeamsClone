const express = require("express");
const authorize = require("../helpers/authorization");
const Meeting = require("../models/meeting");
const Participant = require("../models/participant")
const randomGenerator = require("../helpers/randomGenerator");
const routers = express.Router();
const User = require("../models/user");
routers.get("/create", authorize.authorize, async (req, res) => {
    let meeting = await Meeting.createNewMeeting();
    return res.status(201).json({
        "message": "Meeting created succesfully. Click start to start the meeting",
        "meetingCode": meeting.meetingCode,
        "password": meeting.password,
        "meetingId":meeting.id
    })
});
routers.post("/join", authorize.authorize, async (req, res) => {
    const meetingCode = req.body.meetingCode;
    const password = req.body.password;
    if (!(meetingCode && password)) {
        return res.status(400).json({
            "message": "Invalid parameters"
        });
    }
    const meeting = await Meeting.findOne({
        meetingCode,
        password
    });
    if (!meeting) {
        return res.status(404).json({
            "message": "Meeting not found"
        });
    }
    // const newParticipant = new Participant({userId:req.user.id,meetingId:meeting.id,socketId:null});
    // await newParticipant.save();
    return res.status(200).json({
        "status": "success",
        "message": "Success",
        "meetingId": meeting.id
    });

})
routers.get("/participants",async (req,res)=>{
    const meetingId = req.query.meetingId;
    if(!meetingId)
    {
        return res.status(400).send({"message":"Invalid parameters"});
    }
    const meeting = await Meeting.findById(meetingId);
    if(!meeting){
        return res.status(404).send({"message":"Meeting not found"});
    }
    const participants = await Participant.find({meetingId:meeting.id});
    console.log(particiapants);
    const particpantsDetails = [];
    for(let participant of participants)
    {
        let user = await User.findById({userId:participant.userId});
        if(user.id != req.user.id && participant.socketId!=null)
        {
            let participantDetails = {"socketId":participant.socketId,"email":user.email};
            particpantsDetails.push(participantDetails);
        }
    }
    console.log(participantsDetails);
    return res.status(200).send({"participants":particpantsDetails});
})
const addCandidate = async (io,socket, data) => {
    // socket.emit("hello","hi");
    const meetingId = data.meetingId;
    const userDetails = data.userDetails;
    console.log(meetingId,userDetails)
    console.log(`Add me request by ${meetingId}`);
    if(!(meetingId && userDetails.email))
    {
        return;
    }
    const meeting = await Meeting.findById(meetingId);
    if(!meeting){
        return;
    }
    const user = await User.findOne({email:userDetails.email});

    const participants = await Participant.find({meetingId:meeting.id});
    const participantsDetails = [];
    for(let participant of participants)
    {

        let participantUser = await User.findById(participant.userId);
        if(participantUser.email!=user.email)
        {
            let participantDetails = {email:participantUser.email,socketId:participant.socketId};
            participantsDetails.push(participantDetails);
        }
    }
    const participant = new Participant({meetingId:meeting.id,userId:user.id,socketId:socket.id});
    await participant.save();
    io.to(socket.id).emit("sendCallRequests",{"participants":participantsDetails});
}

const callRequest = async (io,socket,data) => {
    console.log('callRequest by',data.user);
    io.to(data.toUser).emit("makeCall",{callId:data.callId,user:data.user,socketId:socket.id});
}
const getResponse = async (socket,data) =>{
    console.log(`Get Response by ${data.email} for ${data.toEmail}`);
        const toEmail = data.toEmail;
        const email = data.email;
        const sdp = data.sdp;
        if(!(email && toEmail))
        {
            return;
        }
        const user = await User.findOne({email:toEmail});
        console.log(`Sending create answer request to ${user.email} with SID ${user.socketId}`);
        socket.to(user.socketId).emit("createAnswer",{email,sdp});
}
const joinCall = async (socket,data) =>{
    console.log(`join call request by ${data.email} for ${data.toEmail}`);
    const toEmail = data.toEmail;
    const email = data.email;
    const sdp = data.sdp;
    if(!(email && toEmail)){
        return;
    }
    const user = await User.findOne({email:toEmail});
    socket.to(user.socketId).emit("acceptCall",{email,sdp});
}
const updateUserSocketId = async (socket)=>{
    const token = socket.handshake.auth.token;
    const meetingId = socket.handshake.auth.meetingId;
    const user = await User.findOne({token});
    const meeting = await Meeting.findById(meetingId);
    const participant = await Participant.findOne({userId:user.id,meetingId:meeting.id});
    participant.socketId = socket.id;
    console.log("updating user socket id",socket.id,user.socketId,user.email);
    await participant.save();
}
module.exports = {
    routers,
    callRequest,
    addCandidate,
    joinCall,
    getResponse,
    updateUserSocketId
}