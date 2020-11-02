import React, { Component } from 'react';
import { Navbar, Nav } from 'react-bootstrap';

export default class NavBar extends Component {

    render() {
        return (
            <Navbar bg="dark" variant="dark" expand="xl" sticky="top">
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="mr-auto">
                    <Nav.Link href='/crearPedido'>Registrar Pedido</Nav.Link>
                    <Nav.Link href='/pedidos'>Pedidos</Nav.Link>
                    <Nav.Link href='/trabajos'>Trabajos</Nav.Link>
                    <Nav.Link href='/trabajos'>Calcula tu Pedido</Nav.Link>
                    <Nav.Link href='/trabajos'>Hace tu Pedido</Nav.Link>      
                </Nav>
                </Navbar.Collapse>
            </Navbar>
        );
    }
}