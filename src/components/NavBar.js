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
                            <Link to='/exercises' className='nav-link'>Exercises</Link>    
                        </li>
                        <li className='nav-item'>
                            <Link to='/createexercise' className='nav-link'>Create Exercise</Link>    
                        </li>
                        <li className='nav-item'>
                            <Link to='/createuser' className='nav-link'>Create User</Link>    
                        </li>
                    </ul>    

            </Navbar>
        );
    }
}