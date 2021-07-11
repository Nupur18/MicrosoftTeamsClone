import React from 'react'

export const Chat = (props) => {
    let hour = props.hour;
    let minute = props.minute;
    if (hour >= 0 && hour < 10) {
        hour = "0" + hour;
    }
    if (minute >= 0 && minute < 10) {
        minute = "0" + minute;
    }
    return (
        <div id={(props.messageID === "message-box" ? "message-box" : "messagebox")}>
            <p className="text-left" id="name" style={{ fontSize: "10px" }}>
                    You
                </p>
            <div id="message">
                <p id="textmessage">
                    {props.chat}
                </p>
            </div>
            <div>
                <p className="text-right" id="time" style={{ fontSize: "10px" }}>
                    {hour}:{minute}
                </p>
            </div>
        </div>
    )
}