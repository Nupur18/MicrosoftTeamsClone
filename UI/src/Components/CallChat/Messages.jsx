import React, { useState } from 'react';
import Button from '@material-ui/core/Button';
import ChatIcon from '@material-ui/icons/Chat';
import Drawer from '@material-ui/core/Drawer';
import CloseIcon from '@material-ui/icons/Close';
import './chat.css'
import ScrollableFeed from 'react-scrollable-feed';
import Form from 'react-bootstrap/Form';
import { Chat } from './Chat';

export const Messages = () => {
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

    const [state, setState] = useState(false);
    const toggleDrawer = (open) => (event) => {
        setState(open);
    }

    const items = () => (
        <>
            <div className="text-right" onClick={toggleDrawer(false)}>
                <Button><CloseIcon /></Button>
            </div>
            <div className="text-center" id="heading">
                In-Call Messages
                <hr />
            </div>
            <ScrollableFeed>
                <div id="chats">
                    {messages.length === 0 ? "" : messages.map((myChat) => { return (<Chat chat={myChat.chat} key={myChat.key} hour={myChat.hour} minute={myChat.minutes} />) })}
                </div>
            </ScrollableFeed>
            <div className="text-center" id="bottom">
                <Form onSubmit={submit}>
                    <Form.Group id="typebox">
                        <Form.Control required type="text" placeholder="Type a message" value={chat} onChange={(e) => { setChat(e.target.value) }} />
                    </Form.Group>
                    <button type="submit" className="btn btn-default" id="send">Send</button>
                </Form>
            </div>
        </>
    )
    return (
        <div className="text-center">
            <Button variant="contained" color="secondary" onClick={toggleDrawer(true)}><ChatIcon /></Button>
            <Drawer anchor={"left"} open={state} onClose={toggleDrawer(false)}>{items()}</Drawer>
        </div>
    )
}
