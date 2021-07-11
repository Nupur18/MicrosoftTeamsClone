import React, { useState } from 'react';
import './chatbody.css';
import { Bottom } from '../../Components/Bottom/Bottom';
import ScrollableFeed from 'react-scrollable-feed';
import Form from 'react-bootstrap/Form';
import { Chat } from '../../Components/CallChat/Chat';
import SendIcon from '@material-ui/icons/Send';

export const ChatBody = () => {

    const [messages, setMessages] = useState("");
    const [chat, setChat] = useState("")
    const submit = (e) => {
        e.preventDefault();
        if (chat) {
            const myChat = {
                key: (new Date()),
                chat: chat,
                hour: (new Date().getHours()),
                minutes: (new Date().getMinutes())
            }
            setMessages([...messages, myChat]);
            setChat("");
        }
    }

    const items = () => (
        <>
            <div className="text-center" id="caption">
                Chat
                <hr id="hr" />
            </div>
            <ScrollableFeed className="scroll">
                <div id="chats">
                    {messages.length === 0 ? "" : messages.map((myChat) => { return (<Chat chat={myChat.chat} key={myChat.key} hour={myChat.hour} minute={myChat.minutes} messageID="message-box" />) })}
                </div>
            </ScrollableFeed>
            <div id="bottom">
                <Form onSubmit={submit}>
                    <Form.Group id="type-box">
                        <Form.Control id="form" required type="text" placeholder="Type a message" value={chat} onChange={(e) => { setChat(e.target.value) }} />
                        <button type="submit" className="btn btn-default" id="send-btn"><SendIcon /></button>
                    </Form.Group>
                </Form>
            </div>
        </>
    )

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
