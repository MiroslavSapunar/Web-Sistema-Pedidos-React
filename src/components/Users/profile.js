import React, { Component } from 'react';
import { Col, Row, Container } from 'react-bootstrap';
import { getSessionCookie } from '../../utils/sessions'

export default class Profile extends Component {

    constructor(props) {
        super(props);
        this.state = getSessionCookie()
        //console.log(this.state);
    }

    render() {
        return (
            <Container fluid className='min-vh-100 w-75 mt-3 mb-3'>
                <Col>
                    <Row className='justify-content-start'>
                        <h2>Bienvenido {this.state.username}!</h2>
                    </Row>
                    <Row className='justify-content-start'>
                        <h3>{this.state.usertype}</h3>
                    </Row>
                </Col>
            </Container>
        );
    }
}