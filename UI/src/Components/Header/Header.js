import React,{useState} from 'react'
import 'bootstrap/dist/css/bootstrap.min.css'
import Navbar from 'react-bootstrap/Navbar'
import logo from './logo.png'
import './header.css'
import Grid from '@material-ui/core/Grid';
import 'react-initials-avatar/lib/ReactInitialsAvatar.css';
import { Link } from "react-router-dom";
import Logout from '../Logout/Logout';
import { div } from 'prelude-ls'
export const Header = (props) => {
    let headerStyle = {
        background: "#536265"
    }

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
                {(props.page === "meet" ?
                        <Logout/>
                    : "")}
                {(props.page === "chat" ?
                    <div>
                        <Grid container spacing={2}>
                            <Grid item >
                                <Link to="/videocall">
                                    <button type="submit" className="btn btn-default" id="video-call-btn"><b>Video Call</b></button>
                                </Link>
                            </Grid>
                            <Grid item>
                                <Logout/>
                            </Grid>
                        </Grid>
                    </div>
                    : "")}
            </Navbar>
        </div>
    )
}