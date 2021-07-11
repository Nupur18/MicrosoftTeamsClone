const ChatParticipant = require("../models/chatParticipant");
const addToRoom = async (io,socket,data)=>{
    const userId = data.userId;
    const meetingId = data.userId;
    
    console.log('add to me request arrived',data);
    const participant = await ChatParticipant.findOne({meetingId,userId});
    if(participant)
    {
        console.log('add to me request blocked');
        return;
    }
    console.log("add to me request accepted");
    socket.join(data.meetingId);
}
const sendMessage = (io,socket,data)=>{
    console.log(`sendMessage request`,data.chat);
    io.to(data.meetingId).emit("recieveMessage",data.chat);
}

module.exports = {
    addToRoom,
    sendMessage
}