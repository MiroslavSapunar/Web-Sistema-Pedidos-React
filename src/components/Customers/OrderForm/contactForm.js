import React, { Component } from 'react';
import { Col, Row, Form, Button} from 'react-bootstrap';

export default class ContactForm extends Component{

    constructor(props) {
        super(props);

        this.onChangeValue = this.onChangeValue.bind(this);
        this.submitContact = this.submitContact.bind(this);

        this.state = {
            nombre: '',
            email: '',
            telefono: '',
            direccion: '',
            timbre: '',
            dni: '',
            id_pedido:'',

            id_contacto:'',
            registrado:'',
        }
    }

    componentDidMount() {
        this.setState({
            nombre:'',
            email:'',
            telefono:'',
            direccion:'',
            timbre:'',
            dni:'',
            id_pedido:'Sin PEDIDO',

            id_contacto:'',
            registrado: false,
        })
    }

    onChangeValue = event => {
        const { name, value } = event.target;
        this.setState({
            [name]: value
        })
    }


    submitContact(e) {

        e.preventDefault();

        const contacto = {
            nombre: this.state.nombre,
            email: this.state.email,
            telefono: this.state.telefono,
            direccion: this.state.direccion,
            timbre: this.state.timbre,
            dni: this.state.dni,
            id_pedido: this.state.id_pedido,
        }

        this.props.return(contacto);
        
        this.setState({
            registrado: true,
        })
    }

    render(){
        return(
            <Form className="w-100" onSubmit={this.submitContact}>
                <h3 className='mt-2 mb-2 w-75'>Datos de contacto</h3>
                <Form.Group as={Row} controlId="formNombre">
                    <Form.Label column xs="2">Nombre</Form.Label>
                    <Col sm="10">
                        <Form.Control name='nombre' placeholder="Nombre" required onChange={this.onChangeValue} />
                    </Col>
                </Form.Group>

                <Form.Group as={Row} controlId="formEmail">
                    <Form.Label column xs="2">Email</Form.Label>
                    <Col sm="10">
                        <Form.Control name='email' type="email" placeholder="ejemplo@email.com" required onChange={this.onChangeValue} />
                    </Col>
                </Form.Group>
                
                <Form.Row>
                    <Form.Group as={Col} sm="9" controlId="formDireccion">
                        <Form.Label>Dirección</Form.Label>
                        <Form.Control name='direccion' placeholder="Av Paseo Colon 850" required onChange={this.onChangeValue} />
                    </Form.Group>
                    <Form.Group as={Col} sm="3" controlId="formTimbre">
                        <Form.Label>Timbre</Form.Label>
                        <Form.Control name='timbre' placeholder="Aula 203" required onChange={this.onChangeValue} />
                    </Form.Group>
                </Form.Row>

                <Form.Group as={Row} controlId="formTelefono">
                    <Form.Label column xs="2">Telefono</Form.Label>
                    <Col sm="10">
                        <Form.Control type="number" name='telefono' placeholder="11 2233 4455" required onChange={this.onChangeValue} />
                    </Col>
                </Form.Group>

                <Form.Group as={Row} controlId="formDni">
                    <Form.Label column xs="2">Dni</Form.Label>
                    <Col sm="10">
                        <Form.Control type="number" name='dni' placeholder="Dni para la entrega" required onChange={this.onChangeValue} />
                    </Col>
                </Form.Group>
                <Row className="w-75 align-content-right">
                    <Col></Col>
                    <Button variant="primary" type='Submit' disabled={this.state.registrado}>Guardar Contacto</Button>
                    <Col></Col>
                    <Button variant="primary" type='Submit' disabled={!this.state.registrado}>Editar Contacto</Button>
                </Row>
            </Form>
        );
    }
}
