import React from 'react'
import 'bootstrap/dist/css/bootstrap.min.css'
import Navbar from 'react-bootstrap/Navbar'
import logo from './logo.png'
import './header.css'
import InitialsAvatar from 'react-initials-avatar';
import 'react-initials-avatar/lib/ReactInitialsAvatar.css';
import { Link } from "react-router-dom"
import { useSelector } from 'react-redux';
export const Header = (props) => {
    let headerStyle = {
        background: "#fff"
    }
    const user = useSelector((state)=>state.auth.user);
    return (
        <div style={headerStyle}>
            <Navbar className="py-4" expand="lg">
                <Navbar.Brand>
                    <img
                        src={logo}
                        width="200"
                        height="50"
                        className="d-inline-block align-top"
                        alt=""
                    />

                </Navbar.Brand>
                {(
                    props.page=="home"?
                    <div className="ms-auto">                    
                        <Link to="/signup" className="btn-nav">Sign up for free</Link>
                        <Link to="/signin" className="static">Sign in<img className="sign-in-image" src="https://cdn.onlinewebfonts.com/svg/img_574534.png" alt=""/> </Link>
                    </div>: ""
                )}
                {(props.page === "meet" ?
                <div>
                        <InitialsAvatar id="avatar" name={user.payload.name} />
                        <Link to="/">
                            <button type="submit" className="btn btn-default" id="logout"><b>Logout</b></button>
                        </Link>
                    </div>
                    : "")}
                {(props.page === "chat" ?
                <div>
                        <InitialsAvatar id="avatar" name={user.payload.name} />
                        <Link to="/videocall">
                            <button type="submit" className="btn btn-default" id="video-call-btn"><b>Video Call</b></button>
                        </Link>
                        <Link to="/">
                            <button type="submit" className="btn btn-default" id="logout"><b>Logout</b></button>
                        </Link>
                    </div>
                    : "")}
            </Navbar>
        </div>
    )
}