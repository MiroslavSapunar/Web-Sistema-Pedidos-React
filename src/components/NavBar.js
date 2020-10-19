import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Navbar, Nav } from 'react-bootstrap';

export default class NavBar extends Component {

    render() {
        return (
            <Navbar bg="dark" variant="dark" expand="sm" sticky="top">
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="mr-auto">
                    <Nav.Link href='/crearPedido'>Iniciar Pedido</Nav.Link>
                    <Nav.Link href='/pedidos'>Pedidos</Nav.Link>
                    <Nav.Link href='/trabajos'>Trabajos</Nav.Link>    
                </Nav>
                </Navbar.Collapse>
            </Navbar>
        );
    }
}