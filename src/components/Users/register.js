import axios from 'axios';
import React, { Component } from 'react';
import { Form, Button, Col, Row, ListGroup, ListGroupItem, Alert, Container } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const bcrypt = require('bcryptjs');

const BASE_URL_API = process.env.REACT_APP_API_URL;
const SALT_ROUNDS = Number(process.env.REACT_APP_SALT_ROUNDS);

export default class Register extends Component {

    constructor(props) {
        super(props);

        this.onChangeValue = this.onChangeValue.bind(this);
        this.submitRegister = this.submitRegister.bind(this);

        this.state = {
            username: '',
            email: '',
            confirmEmail: '',
            password: '',
            confirmPassword: '',
            contact: '',
            usertype: '',

            alertUserName: false,
            alertEmail: false,
            alertPassword: false,
            alertConfirmEmail: false,
            alertConfirmPass: false,
            checkConditions: true,
        }
    }

    componentDidMount() {
        this.setState({
            username: '',
            email: '',
            confirmEmail: '',
            password: '',
            confirmPassword: '',
            contact: 'Sin Contacto',
            usertype: 'Teleminion',

            alertUserName: false,
            alertEmail: false,
            alertPassword: false,
            alertConfirmEmail: false,
            alertConfirmPass: false,
            checkConditions: true,
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
            alertUserName: false,
            alertEmail: false,
            alertConfirmEmail: false,
            alertPassword: false,
            alertConfirmPass: false,
            checkConditions: true,
        })
    }

    checkEmail() {
        if (this.state.email.valueOf() !== this.state.confirmEmail.valueOf()) {
            this.setState({
                alertConfirmEmail: true,
                checkConditions: false
            })
        }
    }

    checkPassword() {
        if (this.state.password.valueOf() !== this.state.confirmPassword.valueOf()) {
            this.setState({
                alertConfirmPass: true,
                checkConditions: false
            })
        }
    }

    checkLengthPassword() {
        if (this.state.password.length < 6) {
            this.setState({
                alertPassword: true,
                checkConditions: false
            })
        }
    }

    checkErrorDB(err){
        if(err.code === 11000){
            
            if (Object.keys(err.keyPattern)[0] === 'username') {
                this.setState({
                    alertUserName: true,
                })
            }

            if (Object.keys(err.keyPattern)[0] === 'email') {
                this.setState({
                    alertEmail: true,
                })
            }

        }else{
            console.log(err);
        }
    }

    async submitRegister(e) {
        e.preventDefault();

        await this.resetAlerts();
        await this.checkEmail();
        await this.checkPassword();
        await this.checkLengthPassword();

        const user = {
            username: this.state.username,
            email:  bcrypt.hashSync(this.state.email, SALT_ROUNDS),
            password: bcrypt.hashSync(this.state.password, SALT_ROUNDS),
            contact: this.state.contact,
            usertype: this.state.usertype,
            recepciones: 0,
            trabajos: 0,
            pedidos: 0,
        }

        if (this.state.checkConditions) {
            //console.log("paso confirmaciones");
            await axios.post(BASE_URL_API + '/usuarios/add', user)
            .then(res => {
                //console.log(res);
                window.location = '/';
            })
            .catch(err => {
                //console.log(err.response);
                //console.log(res);
                this.checkErrorDB(err.response.data);
            });
        } else {
            console.log("fallo registro");
        }
    }

    render() {
        return (
            <Container fluid>
                <Row className="justify-content-center">
                    <ListGroup className='w-75'>
                        <ListGroupItem>

                            <h2 className='text-center mb-3 text-center font-weight-bold'>¡Registrate!</h2>

                            <Form onSubmit={this.submitRegister}>

                                <Form.Group as={Row} controlId="formNombre">
                                    <Form.Label column xs="auto">Nombre de usuario</Form.Label>
                                    <Col>
                                        <Form.Control name='username' required onChange={this.onChangeValue} />
                                    </Col>
                                </Form.Group>
                                <Alert transition={false} show={this.state.alertUserName} variant='danger'>Este nombre de usuario ya fue registrado</Alert>

                                <Form.Group as={Row} controlId="formEmail">
                                    <Form.Label column xs="auto">Email</Form.Label>
                                    <Col>
                                        <Form.Control name='email' type="email" required onChange={this.onChangeValue} />
                                    </Col>
                                </Form.Group>
                                <Alert transition={false} show={this.state.alertEmail} variant='danger'>Este email ya fue registrado</Alert>

                                <Form.Group as={Row} controlId="formConfirmEmail">
                                    <Form.Label column xs="auto">Confirmar email</Form.Label>
                                    <Col>
                                        <Form.Control name='confirmEmail' type="email" required onChange={this.onChangeValue} />
                                    </Col>
                                </Form.Group>
                                <Alert transition={false} show={this.state.alertConfirmEmail} variant='danger'>El email no fue correctamente confirmado</Alert>

                                <Form.Group as={Row} controlId="formPass">
                                    <Form.Label column xs="auto">Contraseña</Form.Label>
                                    <Col>
                                        <Form.Control name='password' type="password" required onChange={this.onChangeValue} />
                                        <Form.Text className="text-muted">
                                        La contraseña debe tener al menos 6 caracteres.
                                        </Form.Text>
                                    </Col>
                                </Form.Group>
                                <Alert transition={false} show={this.state.alertPassword} variant='danger'>La contraseña tiene menos de 6 caracteres</Alert>

                                <Form.Group as={Row} controlId="formConfirmPass">
                                    <Form.Label column xs="auto">Confirmar Contraseña</Form.Label>
                                    <Col>
                                        <Form.Control name='confirmPassword' type="password" required onChange={this.onChangeValue} />
                                    </Col>
                                </Form.Group>
                                <Alert transition={false} show={this.state.alertConfirmPass} variant='danger'>La contraseña no fue correctamente confirmada</Alert>
                                
                                <Form.Group as={Row} controlId="formUserType">
                                    <Form.Label column xs="auto">Tipo de Usuario Test</Form.Label>
                                    <Col>
                                        <Form.Control name='usertype' as="select" required onChange={this.onChangeValue}>
                                            <option>TeleMinion</option>
                                            <option>CopyMinion</option>
                                            <option>Cliente</option>
                                        </Form.Control>
                                    </Col>
                                </Form.Group>

                                <Row>
                                    <Col></Col>
                                    <Button variant="primary" className="btn-lg btn-block w-50 mb-2" type='Submit' disabled={this.state.registrado}>Registrar</Button>
                                    <Col></Col>
                                </Row>

                            </Form>

                            <Row className="align-items-end">
                                <label className='ml-2 mr-n2'>¿Tenes una cuenta?</label>
                                <Link to='/' className='nav-link'> Ingresa</Link>
                            </Row>

                        </ListGroupItem>
                    </ListGroup>
                </Row>
            </Container>
        )
    }
}