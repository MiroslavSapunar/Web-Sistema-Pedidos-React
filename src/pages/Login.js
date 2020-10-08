import React, { Component } from 'react';
import '../css/Login.css'
import {Form, Button} from 'react-bootstrap';

class Login extends Component {

    render() {
        return (
            <div className = "container">
                <h1>
                    Sistema de Monitoreo Pedidos Online Fotocopiadora CEI
                </h1>
                <h2 className="subtitulo">Bienvenido</h2>
                <Form className = 'login-form'>                
                    <input type="username" id="inputUsername" class="form-control" placeholder="Nombre de usuario" required="" autofocus=""/>
                    <input type="password" id="inputPassword" class="form-control" placeholder="Contraseña" required=""/>
                    <div class="checkbox mb-3">
                        <label>
                            <input type="checkbox" value="remember-me"/> Remember me
                        </label>
                    </div>
                    <Button className = "btn-lg btn-dark btn-block">Ingresar</Button>
                </Form>
                <p class="mt-5 mb-3 text-muted">©MiRoMi 2017-2018</p>
            </div>
        )
    }
}

export default Login;