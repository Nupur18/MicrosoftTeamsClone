import React, { useState } from 'react';
import './chatbody.css';
import { Bottom } from '../../Components/Bottom/Bottom';
import ScrollableFeed from 'react-scrollable-feed';
import Form from 'react-bootstrap/Form';
import { Chat } from '../../Components/CallChat/Chat';
import SendIcon from '@material-ui/icons/Send';
import { useSelector, useDispatch } from 'react-redux';
import { addMessage, setMessages } from '../../Redux/slice/chatSlice';
import { useHistory } from 'react-router-dom';
import { io } from 'socket.io-client';
import { useEffect } from 'react';
const socket = new io("http://localhost:5000");
export const ChatBody = () => {
    const user = useSelector((state) => state.auth.user);
    const history = useHistory();
    if (!user) {
        history.push("/signin");
    }
    const addMe = () => {
        socket.emit("addToRoom", { meetingId, userId: user.payload.id });
    }
    const messages = useSelector((state) => state.chat.messages);
    const [tempMessages, setTempMessages] = useState([]);
    const meetingId = useSelector((state) => state.meet.meetingId);
    const dispatch = useDispatch();
    const [chat, setChat] = useState("")
    const submit = (e) => {
        e.preventDefault();
        if (chat) {
            const myChat = {
                time: String(new Date()),
                chat: chat,
                sender: user.payload.email,
                senderName: user.payload.name,
            }
            // dispatch(addMessage(myChat));
            setTempMessages([...tempMessages, myChat]);
            console.log("emmiting message")
            socket.emit("sendMessage", { meetingId: meetingId, chat: myChat });
            setChat("");
        }
    }
    socket.on("recieveMessage", (data) => {
        console.log(`Recieved message`, data);
        if (data.sender != user.payload.email) {
            // dispatch(addMessage(data));
            setTempMessages([...tempMessages, data]);
            console.log(tempMessages);
        }

    })
    const items = () => (
        <>
            <div className="text-center" id="caption">
                Chat
                <hr id="hr" />
            </div>
            <ScrollableFeed className="scroll">
                <div id="chats">
                    {tempMessages.length === 0 ? "" : tempMessages.map(
                        (chat) => {
                            return (

                                <Chat chat={chat.chat} key={chat.time} time={chat.time} self={chat.sender == user.payload.email} name={chat.senderName} messageClass="fullChat" />
                            )
                        })}
                </div>
            </ScrollableFeed>
            <div id="bottom">
                <Form onSubmit={submit}>
                    <Form.Group id="type-box">
                        <Form.Control id="form" required type="text" placeholder="Type a message" value={chat} onChange={(e) => { setChat(e.target.value) }} />
                        <button type="submit" disabled={Boolean(!chat)} className="btn btn-default" id="send-btn"><SendIcon /></button>
                    </Form.Group>
                </Form>
            </div>
        </>
    )

    useEffect(() => {
        addMe();
        if (messages && messages.payload) {

            console.log(messages);
            for (let chat of messages.payload) {
                console.log(chat);
                // tempMessages.push(chat.payload);
            }
        }
        console.log(tempMessages);
        return () => {
            dispatch(setMessages(tempMessages));
        }
    }, [])
    return (
        <>
            <div className="my-5" id="chat-window">
                {items()}
            </div>
            <div id="bottom-words">
                <div className="my-5">
                    <Bottom />
                </div>
            </div>
        </>
    )
}
