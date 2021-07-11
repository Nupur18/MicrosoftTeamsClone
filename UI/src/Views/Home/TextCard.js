import React from 'react'
import { Link } from "react-router-dom"
import Card from 'react-bootstrap/Card'
import { Button } from '../../Components/Button/Button.js'

export const TextCard = () => {
    return (
        <div className="col-md-6 mr-0 pr-0 my-5">
            <Card className="my-3" style={{ width: "100%", height: "105%" }}>
                <Card.Body>
                    <Card.Title id="title">Microsoft Teams</Card.Title>
                    <Card.Text as="div" id="text">
                        <dl>
                            <dt>Bridges the gap</dt>
                            <dt>Brings you closer</dt>
                            <dt>Connects people all around the world</dt>
                        </dl>
                    </Card.Text>
                    <div className="row align-items-center">
                        <div className="col text-center">
                            <Link to="/signup">
                                <Button title="Sign up" />
                            </Link>
                        </div>
                        <div className="col text-center">
                            <Link to="/signin">
                                <Button title="Sign in" />
                            </Link>
                        </div>
                    </div>
                </Card.Body>
            </Card>
        </div>
    )
}
