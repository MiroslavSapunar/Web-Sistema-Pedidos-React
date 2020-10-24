import React, { Component } from 'react';
import { Form, Button, Row, ListGroup, ListGroupItem, Container, Alert } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import BottonBar from '../BottomBar';

import axios from 'axios';
const bcrypt = require('bcryptjs');

const BASE_URL_API = process.env.REACT_APP_API_URL;
const SALT_ROUNDS = Number(process.env.REACT_APP_SALT_ROUNDS);

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

    checkPassword(recivePassword){
        //console.log("check password");
        return bcrypt.compareSync(this.state.password,recivePassword);
         
    }

    submitLogin(e){
        e.preventDefault();

        this.resetAlerts();

        console.log(this.state.username);
        axios.get(BASE_URL_API + '/login/' + this.state.username)
            .then(res => {
                console.log(res.data);
                if(res.data.length === 0){
                    this.setState({
                        alertUsername: true
                    })
                }else {
                    //console.log(res.data[0].password);
                    if(this.checkPassword(res.data)){
                        window.location = '/pedidos';
    
                    }else{
                        this.setState({
                            alertPassword: true
                        })
                    }
                }                
            })
            .catch(err => {
                console.log(err);
            });
    }

    render() {
        return (
            <Container fluid>
                <Row className="justify-content-center">
                    <ListGroup className='mt-3 mb-5 w-75'>
                        <ListGroupItem className='justify-content-center'>
                            <h1 className='text-center font-weight-bold mb-n1 text-break'>Fotocopiadora CEI</h1>
                            <h3 className='text-center mb-3 text-center'>Sistema de monitoreo pedidos online</h3>
                            <h2 className="text-center mb-3 font-weight-bold">Bienvenid@</h2>
                            <Row className="justify-content-center">

                                <Form className='w-50' onSubmit={this.submitLogin}>

                                    <Form.Group as={Row} controlId="formNombre">
                                        <Form.Control name='username' placeholder='Nombre de Usuario' required onChange={this.onChangeValue} />
                                    </Form.Group>
                                    <Alert show={this.state.alertUsername} variant='danger'>Nombre de usuario no encontrado</Alert>

                                    <Form.Group as={Row} controlId="formEmail">
                                        <Form.Control name='password' type="password" placeholder='Contraseña' required onChange={this.onChangeValue} />
                                    </Form.Group>
                                    <Alert show={this.state.alertPassword} variant='danger'>Contraseña incorrecta</Alert>

                                    <label><input className="checkbox mt-1 mb-2" type="checkbox" value="remember-me" /> Recordarme</label>

                                    <Row className="justify-content-center mb-2">
                                        <Button className="btn-lg btn-dark btn-block w-50 text-center" type='Submit'>Ingresar</Button>
                                    </Row>

                                    <Row className="align-items-end">
                                        <label className='ml-2 mr-n2'>¿No tenes una cuenta?</label>
                                        <Link to='/usuarios/registrar' className='nav-link'> Registrate</Link>
                                    </Row>

                                </Form>
                            </Row>
                        </ListGroupItem>
                    </ListGroup>
                </Row>
                <BottonBar />
            </Container>
        )
    }
}
