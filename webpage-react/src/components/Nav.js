import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css'



function Nav() {
  return (
    <nav>
        <ul className = "nav-links">
            <li>Login</li>
            <li>Workshop</li>
            <li>Monitor</li>
            <li>About</li>
        </ul>
    </nav>  
  );
}

export default Nav;