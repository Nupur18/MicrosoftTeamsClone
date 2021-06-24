import React from 'react'
import { Link } from "react-router-dom"
import Card from 'react-bootstrap/Card'
import { Button } from '../Button.js'

export const TextCard = () => {
    return (
        <div className="col-md-6 mr-0 pr-0 my-5">
            <Card className="my-3" style={{ width: "100%", height: "105%" }}>
                <Card.Body>
                    <Card.Title id="title"><b>Microsoft Teams</b></Card.Title>
                    <Card.Text as="div" id="text">
                        <dl>
                            <dt>Bridges the gap</dt>
                            <dt>Brings you closer</dt>
                            <dt>Connects people all around the world</dt>
                        </dl>
                    </Card.Text>
                    <Link to="/signup">
                        <Button title="Sign up" />
                    </Link>
                    <Link to="/videocall">
                        <Button title="Sign in" />
                    </Link>
                </Card.Body>
            </Card>
        </div>
    )
}
