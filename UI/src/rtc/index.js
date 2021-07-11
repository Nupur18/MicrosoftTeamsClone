// import Peer from 'simple-peer';
// import axios from 'axios';
// import {
//     io as Socket
// } from 'socket.io-client';
// import {
//     setSelf,
//     addPeer,
//     removePeer,
// } from '../Redux/slice/meetSlice';
// import { useSelector } from 'react-redux';
// import {
//     reactLocalStorage
// } from 'reactjs-localstorage';
// class RTC {
//     constructor(details,participantsChange,connectionSetup) {
//         this.socket = Socket("http://localhost:5000", {
//             auth: {
//                 token: details.token
//             }
//         });

//         this.self = details;
//         this.connectionSetup = connectionSetup;
//         this.participants = [];
//         this.participantsChange=participantsChange;
//         this.socket.on("createOffer",((email)=>{this.createOffer(email)}));
//         this.socket.on("createAnswer",(({email,sdp})=>{this.createAnswer(email,sdp)}));
//         this.socket.on("acceptCall",(({email,sdp})=>{this.acceptCall(email,sdp)}));
//         this.offerCreated =0;
//         this.acceptedThings = [];
//     }
//     createMeeting(callback) {
//         const peer = new Peer({
//             initiator: true,
//             trickle: false
//         });
//         this.isInitiator = true;
//         peer.on('signal', data => {
//             this.socket.emit("createMeeting", data);
//         });
//         this.socket.on("meetingCreated", (data) => {
//             callback(data);
//         });
//     }
//     joinMeeting(meetingDetails) {
//         const peer = new Peer({
//             initiator: false,
//             trickle: false
//         });
//         this.self = peer;
//         console.log("I am here")
//         this.self.on('signal', data => {
//             this.socket.emit("joinMeeting", {
//                 meetingDetails,
//                 data
//             });
//         })
//     }
//     createOffer(email){
//         console.log(`Received to create Offer: ${email}`);
//         if(!this.isMailPreset(email,"createOffer"))
//         {
//             console.log(`Reject request of createOffer by ${email}`);
//             return;
//         }
//         this.acceptedThings.push({email,offerType:"createOffer"});
//         const peer = new Peer({initiator:true,trickle:false});
//         this.participants.push({"email":email,"peer":peer});
//         peer.on('signal',data=>{
//             this.socket.emit("getResponse",{toEmail:email,email:this.self.email,sdp:JSON.stringify(data)});
//         });
//         peer.on('connect',()=>{
//             this.connectionSetup(true);
//             console.log("Done Connected");
//             peer.send("Hii peer bro")
//         });
//         peer.on('error',(err)=>{
//             console.log(`error`,err,err.message,err.statusCode);
//         })
//         this.participantsChange(this.participants);
//     }
//     createAnswer(email,sdp){
//         console.log(`Received request to create answer for ${email}`);
//         if(!this.isMailPreset(email,"createAnswer"))
//         {
//             console.log(`Reject request of createAnswer by ${email}`);
//             return;
//         }
//         this.acceptedThings.push({email,offerType:"createAnswer"});
//         const peer = new Peer({initiator:false,trickle:false,stream:this.stream});
//         this.participants.push({"email":email,"peer":peer});
//         peer.on('signal',data=>{
//             console.log(`sending signal in createAnswer to ${email}`);
//             this.socket.emit("joinCall",{toEmail:email,sdp:JSON.stringify(data),email:this.self.email});
//         });
//         peer.on('connect',()=>{
//             this.connectionSetup(true);
//             console.log("Done Connected");
//         });
//         peer.on('stream',(stream)=>{
//             console.log("Recived a stream dude",stream)
//         })
//         peer.on('data',(data)=>{
//             console.log('Message '+data);
//         })
//         peer.on('error',(err)=>{
//             console.log(`error`,err)
//         })
//         console.log("I have sent the signal to my fellow peer");
//         peer.signal(JSON.parse(sdp));
//         this.participantsChange(this.participants);
//     }
//     acceptCall(email,sdp){
//         console.log(`Accept call request by ${email}`);
//         if(!this.isMailPreset(email,"acceptCall"))
//         {
//             console.log(`Reject request of acceptCall by ${email}`);
//             return;
//         }
//         this.acceptedThings.push({email,offerType:"acceptCall"});
//         for(let participant of this.participants){
//             if(participant.email === email)
//             {  
//                 console.log(`Accepting call of ${email}`);
//                 participant.peer.signal(JSON.parse(sdp));
//             }
//         }

//     }
//     isMailPreset(email,offerType){
//         for(let offer of this.acceptedThings)
//         {
//             if(offer.email == email,offerType===offer.offerType)
//             {
//                 return false;
//             }
//         }
//         return true;
//     }
//     addMe(meetingId){
//         this.socket.emit("addCandidate",{meetingId:meetingId,email:this.self.email,isHost:false});
//     }
//     getParticipants(){
//         return this.participants;
//     }
// };

// export default RTC;


import {io} from 'socket.io-client';
import React from 'react';
import captureSelfVideo from '../Components/SelfVideo/SelfVideo';
import Peer from 'peerjs';
import { useSelector,useDispatch } from 'react-redux';
import { addVideoRef,addParticipant, setParticipants } from '../Redux/slice/meetSlice';
const socket = io("http://localhost:5000");

const AddMe = ()=>{
    const user = useSelector((state)=>state.auth.user);
    const meetingId = useSelector((state)=>state.meet.meetignId);
    socket.emit('addMe',{user:user,meetingId:meetingId.payload});
}

socket.on('sendCallRequests',(data)=>{
    const participantDetails = data.participants;
    const dispatch = useDispatch();
    const selfStream = useSelector((state)=>state.meet.selfStream);
    const user = useSelector((state)=>state.auth.user);
    dispatch(setParticipants,participantDetails);
    for(let participant of participantDetails)
    {
        const peer = new Peer();
        peer.on('open',(id)=>{
            socket.emit('callRequest',{toUser:participant.socketId,callId:id,user:user.payload.email});
        });
        peer.on('call',(call)=>{
            call.answer(selfStream.payload);
            call.on('stream',(remoteStream)=>{
                const ref = React.createRef();
                ref.current.srcObject = remoteStream;
                dispatch(addVideoRef,{email:participant.email,ref:ref});
            })
        })
    }
});

socket.on("makeCall",(data)=>{
    const selfStream = useSelector((state)=>state.meet.selfStream);  
    const callId = data.callId;
    const particpantUser = data.user;
    const peer = new Peer();
    const call = peer.call(callId,selfStream.payload);
    const dispatch = useDispatch();
    call.on('stream',(remoteStream)=>{
        const ref = React.createRef();
        ref.current.srcObject = remoteStream;
        dispatch(addVideoRef,{email:particpantUser,ref:ref});
    })
})
// const sendCallRequest = () => {
//     const dispatch = useDispatch();
//     const user = useSelector((state)=>state.auth.user);
//     const selfStream = useSelector((state)=>state.meet.selfStream);
//     const participants = useSelector((state)=>state.meet.participants);
//     for (let participant of participants.payload){
//         const peer = new Peer();
//         peer.on('open',(id)=>{
//             socket.emit('sendCallRequest',{toUser:participant.socketId,callId:id,user:user.payload});
//         })
//         peer.on('call',(call)=>{
//             call.answer(selfStream.payload);
//             call.on('stream',(remoteStream)=>{
//                 const ref = React.createRef();
//                 ref.current.srcObject = remoteStream;
//                 dispatch(addVideoRef,{email:participant.email,ref:ref});
//             })
//         })
//     }
// }
socket.on("acceptCallRequest",({participant,callId})=>{
    const participants = useSelector((state)=>state.meet.participants);
    const selfStream = useSelector((state)=>state.meet.selfStream);
    const dispatch = useDispatch();
    dispatch(addParticipant,participant);
    const peer = new Peer();
    const call = peer.call(callId,selfStream.payload);
    call.on('stream',(remoteStream)=>{
        const ref = React.createRef();
        ref.current.srcObject = remoteStream;
        dispatch(addVideoRef,{email:participant.email,ref:ref});
    })
})
export {AddMe};