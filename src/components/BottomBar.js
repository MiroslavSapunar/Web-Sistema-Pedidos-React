import React, { Component } from 'react';
import {Row, Col, Navbar, Image} from'react-bootstrap'; 
//import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

export default class BottomBar extends Component {

    render() {
        return (
            <Navbar  bg="dark" variant="dark" expand="sm" fixed="bottom">
               <Row className="justify-content-around align-content-center align-items-center">
                    <Col className='col-4'>
                    <label className="text-white text-nowrap mb-n1">Sitio administrado por la Presidencia del Centro de Estudiantes</label>
                    <label className="text-white text-nowrap mb-n1">de la Facultad de Ingeniería de la Universidad de Buenos Aires</label>
                    </Col>

                    <Col className='col-auto' >
                    </Col>

                    <Col className='col-2'>
                    <a href="https://www.facebook.com/mli.fiuba" target="blank">
                        <Image fluid src="/img/logopresidenciacei.png" />
                    </a>
                    </Col>
                </Row>
            </Navbar>
        );
    }
}