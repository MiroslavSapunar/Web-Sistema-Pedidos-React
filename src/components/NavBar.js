import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Navbar } from 'react-bootstrap';

export default class NavBar extends Component {

    render() {
        return (
            <Navbar bg="dark" variant="dark" expand="lg" sticky="top">
                    <Link to='/' className='navbar-brand'>INICIO</Link>
                    <ul className='navbar-nav mr-auto'>
                        <li className='nav-item'>
                            <Link to='/crearPedido' className='nav-link'>Crear Pedido</Link>    
                        </li>
                        <li className='nav-item'>
                            <Link to='/pedidos' className='nav-link'>Pedidos</Link>    
                        </li>
                        <li className='nav-item'>
                            <Link to='/trabajos' className='nav-link'>Trabajos</Link>    
                        </li>
                    </ul>    
            </Navbar>
        );
    }
}