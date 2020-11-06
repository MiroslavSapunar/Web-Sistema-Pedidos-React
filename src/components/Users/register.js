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

            password: '',
            confirmPassword: '',
            usertype: '',

            alertUserName: false,
            alertPassword: false,
            alertConfirmPass: false,
            checkConditions: true,
        }
    }

    componentDidMount() {
        this.setState({
            username: '',
            password: '',
            confirmPassword: '',
            usertype: 'Admin',

            alertUserName: false,
            alertPassword: false,
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
            alertPassword: false,
            alertConfirmPass: false,
            checkConditions: true,
        })
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

    async submitRegister(e) {
        e.preventDefault();

        await this.resetAlerts();
        await this.checkPassword();
        await this.checkLengthPassword();

        const user = {
            username: this.state.username,
            password: bcrypt.hashSync(this.state.password, SALT_ROUNDS),
            usertype: this.state.usertype,
            recepciones: [],
            impresiones: [],
        }

        if (this.state.checkConditions) {
            //console.log("paso confirmaciones");
            await axios.post(BASE_URL_API + '/usuarios/add', user)
                .then(res => {
                    //console.log(res);
                    this.props.history.push('');
                })
                .catch(err => {

                    if (err.response.status === 401) {
                        this.setState({
                            alertUserName: true,
                        })
                    } else {
                        console.log(err);
                    }
                });
        } else {
            console.log("fallo registro");
        }
    }

    render() {
        return (
            <Container className='min-vh-75 mt-5 mb-4' >
                <Row className="justify-content-center">
                    <ListGroup className='w-75'>
                        <ListGroupItem>

                            <h2 className='text-center mb-3 text-center font-weight-bold'>¡Registrate!</h2>

                            <Row className="justify-content-center">
                                <Form className='w-75' onSubmit={this.submitRegister}>

                                    <Form.Group as={Row} controlId="formNombre">
                                        <Form.Label column xs="auto">Nombre de usuario</Form.Label>
                                        <Col>
                                            <Form.Control name='username' required onChange={this.onChangeValue} />
                                        </Col>
                                    </Form.Group>
                                    <Alert transition={false} show={this.state.alertUserName} variant='danger'>Este nombre de usuario ya fue registrado</Alert>

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
                                                <option>Admin</option>
                                                <option>Recepcionista</option>
                                                <option>Operario</option>
                                            </Form.Control>
                                        </Col>
                                    </Form.Group>

                                    <Row>
                                        <Col></Col>
                                        <Button variant="primary" className="btn-lg btn-block w-50 mb-1" type='Submit' disabled={this.state.registrado}>Registrar</Button>
                                        <Col></Col>
                                    </Row>

                                    <Row className="align-items-end">
                                        <label className='ml-2 mr-n2'>¿Tenes una cuenta?</label>
                                        <Link to='/' className='nav-link'> Ingresa</Link>

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