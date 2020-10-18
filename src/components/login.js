import React, { Component } from 'react';
import {Form, Button, Row} from 'react-bootstrap';
import BottomBar from './BottomBar';

export default class Login extends Component {

    render() {
        return (
            <div className = "container w-75 h-50 align-self-center">
                <h1 className='text-center mt-3 font-weight-bold'>
                    Fotocopiadora CEI
                </h1>
                
                <h3 className='text-center mb-3 text-center'>
                    Sistema de monitoreo pedidos online
                </h3>
                
                <div className="container w-50">
                <h2 className="text-center mb-3">Bienvenid@</h2>
                <Form className = 'login-form'>                
                    <input type="username" id="inputUsername" className="form-control mb-1" placeholder="Nombre de usuario" required="" autoFocus=""/>
                    <input type="password" id="inputPassword" className="form-control mb-1" placeholder="Contraseña" required=""/>
                    <div className="checkbox mt-3 mb-2">
                        <label>
                            <input type="checkbox" value="remember-me"/> Recordarme
                        </label>
                    </div>
                    <Row className="justify-content-center">
                        <Button className = "btn-lg btn-dark btn-block w-50">Ingresar</Button>
                    </Row>
                </Form>
                </div>
                <BottomBar />
            </div>
        )
    }
}