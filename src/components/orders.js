import React, { Component } from 'react';
import { Container } from 'react-bootstrap';

export default class Orders extends Component {
    render(){
        return (
            <Container>
                <h1 className='font-weight-bold mt-4 mb-3'>Pedidos Pendientes</h1>
            </Container>
        );
    }
}