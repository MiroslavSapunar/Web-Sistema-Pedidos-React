import React, { Component } from 'react';
import { Link } from 'react-router-dom';

export default class Navbar extends Component {

    render() {
        return (
            
            <nav className='navbar navbar-dark bg-dark navbar-expand-lg'>
                <div className="container-lg">
                    <Link to='/' className='navbar-brand'>ExcerTracker</Link>
                    <div className='collapse navbar-collapse'>
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
                    </div>
                </div>
            </nav>
        );
    }
}