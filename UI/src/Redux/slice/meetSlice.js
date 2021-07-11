import { createSlice } from '@reduxjs/toolkit'

export const meetSlice = createSlice({
  name: 'meet',
  initialState: {
   meetingCode:null,
   password:null,
   meetingId:null,
   selfStream:null,
   participants:[],
   videoRefs:[],
  },
  reducers: {
    setMeeting: (state,data)=>{
      // console.log(data,state);
      state.meetingCode = data.payload.meetingCode;
      state.password = data.payload.password;
      state.meetingId = data.payload.meetingId;
      // state = {...state,meetingCode:data.meetingCode,password:data.password,meetingId:data.meetingId};
    },
    setSelfStream: (state,stream)=>{
      state.selfStream = stream;
    },
    addParticipant: (state,participant) => {
      state.participants = [...state.participants,participant];
    },
    setParticipants: (state,participants) => {
      state.participants = participants;
    },
    addVideoRef: (state,videoRef)=>{
      state.videoRefs = [...state.videoRefs,videoRef];
    }
  },
})

export const {setMeeting, setSelfStream,setParticipants,addParticipant,addVideoRef} = meetSlice.actions

export default meetSlice.reducer