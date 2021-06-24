import React from 'react'
import Card from 'react-bootstrap/Card'
import { Button } from '../Button.js'
import Form from 'react-bootstrap/Form'
import { useLocation } from 'react-router'

export const SignCard = (props) => {
    let location = useLocation();
    let mode = location.pathname.substring(1);
    return (
        <div className="col-md-6 my-5">
            <Card className="my-3" style={{ width: "100%", height: "105%" }}>
                <Form>
                    <Card.Body>
                        <Card.Title className="text-center" id="title">Microsoft Teams</Card.Title>
                        <Card.Text as="div" id="text">
                            <Form.Group controlId="formBasicEmail">
                                <Form.Label>Email address</Form.Label>
                                <Form.Control required type="email" placeholder="Enter Email" />
                            </Form.Group>
                            <Form.Group controlId="formBasicPassword">
                                <Form.Label>Password</Form.Label>
                                <Form.Control required type="password" placeholder="Enter Password" />
                            </Form.Group>
                        </Card.Text>
                        <p align="center">
                            {(mode === "signup" ? <Button type="submit" title="Sign up" /> : <Button type="submit" title="Sign in" />)}
                        </p>
                    </Card.Body>
                </Form>
            </Card>
        </div>
    )
}