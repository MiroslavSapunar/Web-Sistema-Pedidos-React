import React, { Component } from 'react';
import {Row, Col, Navbar, Image} from'react-bootstrap'; 
//import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

export default class BottomBar extends Component {

    render() {
        return (
            <Navbar  bg="dark" variant="dark" expand="sm" fixed="bottom">
               <Row className="justify-content-around align-items-center">
                    <Col className='col-2'>
                        <a href="https://www.facebook.com/mli.fiuba" target="blank">
                            <Image fluid src="/img/logopresidenciacei.png" />
                        </a>
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