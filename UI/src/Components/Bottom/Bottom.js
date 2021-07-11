import React from 'react'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import './bottom.css'

export const Bottom = () => {
    return (
        <div className="center">
            <Container>
                <Row className="justify-content-md-center">
                    <Col className="bottom">Meet</Col>
                    <Col className="bottom">Chat</Col>
                    <Col className="bottom" md="auto">Enjoy</Col>
                </Row>
            </Container>
        </div>
    )
}
