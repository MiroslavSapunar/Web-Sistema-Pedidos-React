import React, { Component } from 'react';
import { Form, Button, Row, ListGroup, ListGroupItem, Container } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import BottonBar from '../BottomBar';

export default class Login extends Component {

    render() {
        return (
            <Container fluid>
                <Row className="justify-content-center">
                    <ListGroup className='mt-3 w-50'>
                        <ListGroupItem>
                            <h1 className='text-center font-weight-bold mb-n1 text-break'>
                                Fotocopiadora CEI
                            </h1>
                            <h3 className='text-center mb-3 text-center'>
                                Sistema de monitoreo pedidos online
                            </h3>
                            <h2 className="text-center mb-3 font-weight-bold">Bienvenid@</h2>
                            <Form className='login-form'>
                                <input name ='username' type="username" id="inputUsername" className="form-control mb-1" placeholder="Nombre de usuario" required autoFocus />
                                <input name ='password' type="password" id="inputPassword" className="form-control mb-1" placeholder="Contraseña" required />
                                <div className="checkbox mt-3 mb-2">
                                    <label>
                                        <input type="checkbox" value="remember-me" /> Recordarme
                                </label>
                                </div>
                                <Row className="justify-content-center mb-2">
                                    <Button className="btn-lg btn-dark btn-block w-50">Ingresar</Button>
                                </Row>
                                <Row className="align-items-end">
                                    <label className='ml-2 mr-n2'>¿No tenes una cuenta?</label>
                                    <Link to='/usuarios/registrar' className='nav-link'> Registrate</Link>
                                </Row>
                            </Form>
                        </ListGroupItem>
                    </ListGroup>
                </Row>
                <BottonBar />
            </Container>
        )
    }
}