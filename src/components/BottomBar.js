import React, { Component } from 'react';
import {Row, Col, Navbar} from'react-bootstrap'; 

export default class BottomBar extends Component {

    render() {
        return (
            <Navbar bg="dark" variant="dark" expand="sm" fixed="bottom">
                    <Col className='col-auto'>
                        <Row className="justify-content-center align-items-center">
                            <label className='navbar-brand font-weight-bold'>MiRoMi</label>
                            <label className="text-white text-nowrap"> ©2020</label>
                        </Row>
                    </Col>
                    <Col className='col-auto'>
                    </Col>
                    <Col className='col-auto'>
                        <Row className="align-items-right">
                            <label className="text-white text-nowrap">psapunar@fi.uba.ar</label>
                        </Row>
                    </Col>
            </Navbar>
        );
    }
}