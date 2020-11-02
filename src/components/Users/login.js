import React, { Component } from 'react';
import { Form, Button, Row, ListGroup, ListGroupItem, Container, Alert } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { setSessionCookie } from "../../sessions";

import axios from 'axios';

const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

const BASE_URL_API = process.env.REACT_APP_API_URL;
const LOGIN_TOKEN_SECRET = process.env.REACT_APP_LOGIN_TOKEN_SECRET;


export default class Login extends Component {

    constructor(props) {
        super(props);

        this.submitLogin = this.submitLogin.bind(this);

        this.state = {

            username: '',
            password: '',

            alertUsername: false,
            alertPassword: false,
        }
    }

    componentDidMount() {
        this.setState({
            username: '',
            password: '',

            alertUsername: false,
            alertPassword: false,
        })
    }

    onChangeValue = event => {
        const { name, value } = event.target;
        this.setState({
            [name]: value
        })
    }

    resetAlerts() {
        this.setState({
            alertUsername: false,
            alertPassword: false
        })
    }

    checkPassword(recivePassword) {
        return bcrypt.compareSync(this.state.password, recivePassword);
    }

    submitLogin(e) {
        e.preventDefault();

        this.resetAlerts();

        axios.post(BASE_URL_API + '/usuarios/login', { username: this.state.username })
            .then(res => {
                const decode = jwt.verify(res.data, LOGIN_TOKEN_SECRET);
                if (this.checkPassword( decode.password) ){
                    setSessionCookie( decode );
                    this.props.history.push('/perfil');
                } else {
                    this.setState({
                        alertPassword: true
                    })
                }
            })
            .catch(err => {
                console.log(err);
                if (err.response.status === 401) {
                    this.setState({
                        alertUsername: true
                    })
                } else {
                    console.log(err);
                }
            });
    }

    render() {
        return (
            <Container fluid className='min-vh-75'>
                <Row className="justify-content-center">
                    <ListGroup className='mt-3 mb-5 w-75'>
                        <ListGroupItem className='justify-content-center'>
                            <h1 className='text-center font-weight-bold mb-n1 text-break'>Fotocopiadora CEI</h1>
                            <h3 className='text-center mb-2 text-center'>Sistema de monitoreo pedidos online</h3>
                            <h2 className="text-center mb-3 font-weight-bold">Bienvenid@</h2>
                            <Row className="justify-content-center">

                                <Form className='w-75' onSubmit={this.submitLogin}>

                                    <Form.Group as={Row} controlId="formNombre">
                                        <Form.Control name='username' placeholder='Nombre de Usuario' required onChange={this.onChangeValue} />
                                    </Form.Group>
                                    <Alert transition={false} show={this.state.alertUsername} variant='danger'>Nombre de usuario no encontrado</Alert>

                                    <Form.Group as={Row} controlId="formEmail">
                                        <Form.Control name='password' type="password" placeholder='Contraseña' required onChange={this.onChangeValue} />
                                    </Form.Group>
                                    <Alert transition={false} show={this.state.alertPassword} variant='danger'>Contraseña incorrecta</Alert>

                                    <label><input className="checkbox mt-1 mb-2" type="checkbox" value="remember-me" /> Recordarme</label>

                                    <Row className="justify-content-center mb-2">
                                        <Button className="btn-lg btn-dark btn-block w-50 text-center" type='Submit'>Ingresar</Button>
                                    </Row>

                                    <Row className="align-items-end">
                                        <label className='ml-2 mr-n2'>¿No tenes una cuenta?</label>
                                        <Link to='/registrar' className='nav-link'> Registrate</Link>
                                    </Row>

                                </Form>
                            </Row>
                        </ListGroupItem>
                    </ListGroup>
                </Row>
            </Container>
        )
    }
}