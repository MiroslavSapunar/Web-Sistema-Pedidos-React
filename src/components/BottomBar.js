import React, { Component } from 'react';
import {Row, Col, Navbar} from'react-bootstrap'; 

export default class Buttom extends Component {

    render() {
        return (
            <Navbar bg="dark" variant="dark" expand="lg" fixed="bottom">
                <Row className="container align-content-right align-items-right row-cols-3">
                    <Col className='col-auto'>
                        <label className='navbar-brand font-weight-bold'>MiRoMi</label>
                    </Col>
                    <Col className='col-auto'>
                        <label className=" text-white"> ©2020 </label>
                    </Col>
                    <Col className='col-auto'>
                        <label className="text-white text-nowrap"> contact: psapunar@fi.uba.ar</label>
                    </Col>
                </Row>
            </Navbar>
        );
    }
}