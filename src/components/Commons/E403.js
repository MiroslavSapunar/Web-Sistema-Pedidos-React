import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Row, Col } from 'react-bootstrap'

export default class E403 extends Component {
    render() {
        return (
            <div>
                <Col>
                <h2>Mmm... no tenes las credenciales para estar acá</h2>
                <Row className="align-items-end">
                    <label className='ml-2 mr-n2'>Identifícate </label>
                    <Link to='/' className='nav-link'>acá</Link>
                </Row>
                </Col>
            </div>
        );
    }
}