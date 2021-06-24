import React from 'react'
import { Link } from "react-router-dom"
import Card from 'react-bootstrap/Card'
import { Button } from '../Button.js'
import Form from 'react-bootstrap/Form'

export const SignCard = () => {
    return (
        <div className="col-md-6 -0 pr-0 my-5">
            <Card className="my-3" style={{ width: "100%", height: "105%" }}>
                <Card.Body>
                    <Card.Title className="center" id="title">Microsoft Teams</Card.Title>
                    <Card.Text as="div" id="text">
                        <Form>
                            <Form.Group controlId="formBasicEmail">
                                <Form.Label>Email address</Form.Label>
                                <Form.Control type="email" placeholder="Enter Email" />
                            </Form.Group>

                            <Form.Group controlId="formBasicPassword">
                                <Form.Label>Password</Form.Label>
                                <Form.Control type="password" placeholder="Enter Password" />
                            </Form.Group>
        
                        </Form>
                    </Card.Text>
                    <Link to="/videocall">
                        <Button title="Sign in" />
                    </Link>
                </Card.Body>
            </Card>
        </div>
    )
}
