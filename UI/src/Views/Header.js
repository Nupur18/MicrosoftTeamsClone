import React from 'react'
import 'bootstrap/dist/css/bootstrap.min.css'
import Navbar from 'react-bootstrap/Navbar'
import logo from './logo.png'

export const Header = () => {
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
            </Navbar>
        </div>
    )
}