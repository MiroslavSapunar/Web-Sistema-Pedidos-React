import React, { Component } from 'react';
import { Row, Col, Navbar, Image, Container } from 'react-bootstrap';
import { FaFacebookSquare, FaInstagram, FaDiscord } from 'react-icons/fa';

export default class BottomBar extends Component {

    render() {
        return (
            <Navbar bg="dark" variant="dark" expand="sm" fixed="bottom" >
                <Container fluid>
                    <Col className='d-flex justify-content-center' >
                        <Row className='justify-content-center align-items-center'>
                            <Image style={{ height: 70, width: 210 }} src="/img/logopresidenciacei.png" />
                            <Col>
                                <a href="https://discord.gg/zJB96cf" target="white">
                                    <FaDiscord size={30} style={{ fill: 'white' }} />
                                </a>
                                <a href="https://www.facebook.com/mli.fiuba" target="white">
                                    <FaFacebookSquare size={30} style={{ fill: 'white' }} />
                                </a>

                                <a href="https://www.instagram.com/mli.fiuba" target="white">
                                    <FaInstagram size={30} style={{ fill: 'white' }} />
                                </a>
                            </Col>
                        </Row>
                    </Col>
                </Container>

                <Container fluid>
                    <Col>
                        <label className="text-white mb-n1">Sitio administrado por la Presidencia del Centro de Estudiantes</label>
                        <label className="text-white">de la Facultad de Ingeniería de la Universidad de Buenos Aires</label>
                    </Col>
                </Container>
            </Navbar>
        );
    }
}