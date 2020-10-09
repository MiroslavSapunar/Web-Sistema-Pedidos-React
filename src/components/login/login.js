import React, { Component } from 'react';
import {Form, Button} from 'react-bootstrap';

export default class Login extends Component {

    render() {
        return (
            <div className = "container w-75 p-2 align-self-center">
                <h3 className='text-center mt-3 text-center'>
                    sistema de monitoreo pedidos online
                </h3>
                <h1 className='text-center mb-3 font-weight-bold'>
                    Fotocopiadora CEI
                </h1>
                <div className="container w-50">

                <h2 className="text-center mt-2 mb-3">Bienvenid@</h2>
                <Form className = 'login-form'>                
                    <input type="username" id="inputUsername" class="form-control mb-1" placeholder="Nombre de usuario" required="" autofocus=""/>
                    <input type="password" id="inputPassword" class="form-control mb-1" placeholder="Contraseña" required=""/>
                    <div class="checkbox mt-3 mb-2">
                        <label>
                            <input type="checkbox" value="remember-me"/> Remember me
                        </label>
                    </div>
                    <Button className = "btn-lg btn-dark btn-block">Ingresar</Button>
                </Form>
                </div>
            </div>
        )
    }
}