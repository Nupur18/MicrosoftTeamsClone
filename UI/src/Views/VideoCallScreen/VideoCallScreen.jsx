import React, { useState, useEffect } from 'react';
import CallControl from "../../Components/CallControls/CallControl";
import VideoDisplay from "../../Components/VideoDisplay/VideoDisplay";
import './videocallscreen.scss';
import { useSelector, useDispatch } from 'react-redux';
import { setRTC } from '../../Redux/slice/meetSlice';
import { getSelfStream, captureSelfVideo } from '../../Components/SelfVideo/SelfVideo';
import { io } from 'socket.io-client';
import Peer from 'peerjs';
const socket = io("http://localhost:5000");
const VideoCallScreen = () => {
    const [selfStreamControl, setSelfStreamControl] = useState({ 'audio': true, 'video': true });
    const user = useSelector((state) => state.auth.user);
    const meetingId = useSelector((state) => state.meet.meetingId);
    const meeting = useSelector((state) => state.meet);
    console.log(meeting,meetingId);
    const [called,setCalled] = useState(false);
    const [isReady, setIsReady] = useState(false);
    const [videoRefs, setVideoRefs] = useState([]);
    const dispatch = useDispatch();
    const [selfRef, setSelfRef] = useState(null);
    const [participants, setParticipants] = useState([]);
    const [selfStream, setSelfStream] = useState(new MediaStream());
    const handleChangeControl = (controls) => {
        setSelfStreamControl({ 'audio': controls.microphone, 'video': controls.camera });
        setSelfRef(getSelfStream(selfStreamControl));
    }
    const addMe = function (selfStream) {
        socket.emit('addMe', { userDetails: user.payload, meetingId: meetingId });
        socket.on('sendCallRequests', (data) => {
            const participantDetails = data.participants;
            for(let participant of participantDetails)
            {
                const ref = React.createRef();
                participant.ref= ref;
            }
            setParticipants(participantDetails);
            for (let participant of participantDetails) {
                const peer = new Peer();
                peer.on('open', (id) => {
                    socket.emit('callRequest', { toUser: participant.socketId, callId: id, user: user.payload.email });
                    peer.on('call', (call) => {
                        call.answer(selfStream);
                        call.on('stream', (remoteStream) => {
                        participant.ref.current.srcObject = remoteStream;
                    })
                })
            });
            }
        });

        socket.on("makeCall", (data) => {
            console.log("Make call to ", data.user)
            const callId = data.callId;
            const participantUser = {email:data.user};
            const ref = React.createRef();
            participantUser.ref=ref;
            setParticipants((prevState)=>{
                return [...prevState,participantUser];
            })
            const peer = new Peer();
            peer.on('open',(id)=>{
                const call2 = peer.call(callId, selfStream);
                
                call2.on('stream', (remoteStream) => {
                    participantUser.ref.current.srcObject = remoteStream;
                })
            })
        })

    }
    useEffect(() => {
        captureSelfVideo(selfStreamControl).then((stream) => {
            setSelfStream(stream);
            if(!called)
            {
                addMe(stream);
                setCalled(true);
            }
        })
        setSelfRef(getSelfStream(selfStreamControl));
    }, []);

    return (
        <>
            <div className="video_display_wrapper">
                {participants.length ? participants.map((participant) => {
                    return (
                        <VideoDisplay videoRef={participant.ref} key={participant.email} self={false} />
                    )
                }) : null}
                <VideoDisplay videoRef={selfRef} self={true} />
            </div>
            <CallControl changeControl={handleChangeControl} />
        </>
    )
}

export default VideoCallScreen;