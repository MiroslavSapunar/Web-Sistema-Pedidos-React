import React, { Component } from 'react';
import { Row, Col, Navbar, Image } from 'react-bootstrap';
import { FaFacebookSquare, FaInstagram, FaDiscord} from 'react-icons/fa';

export default class BottomBar extends Component {

    render() {
        return (
            <Navbar bg="dark" variant="dark" expand="sm" fixed="bottom">
                <Row className="justify-content-around align-items-center">
                    <Col className='col-3'>
                        <Row className='justify-content-between align-items-center'>
                            <Col clasName='col-auto'>
                                <Image fluid src="/img/logopresidenciacei.png" />
                            </Col>

                            <Col className='col-2'>
                                <a href="https://discord.gg/zJB96cf" target="white">
                                    <FaDiscord size={30} style={{ fill: 'white' }} />
                                </a>
                            </Col>

                            <Col className='col-2'>
                                <a href="https://www.facebook.com/mli.fiuba" target="white">
                                    <FaFacebookSquare size={30} style={{ fill: 'white' }} />
                                </a>
                            </Col>

                            <Col className='col-1'>
                                <a href="https://www.instagram.com/mli.fiuba" target="white">
                                    <FaInstagram size={30} style={{ fill: 'white' }} />
                                </a>
                            </Col>


                        </Row>
                    </Col>

                    <Col className='col-auto'>
                        <Row>
                            <label className="text-white mb-n1">Sitio administrado por la Presidencia del Centro de Estudiantes</label>
                        </Row>
                        <Row>
                            <label className="text-white">de la Facultad de Ingeniería de la Universidad de Buenos Aires</label>
                        </Row>
                    </Col>
                </Row>
            </Navbar>
        );
    }
}