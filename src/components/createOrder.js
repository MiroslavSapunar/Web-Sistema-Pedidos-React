import React, { Component } from 'react';
import axios from 'axios';
import { Col, Container, Row, Form, Button} from 'react-bootstrap';
import TableForm from './tableForm';


export default class CreateOrder extends Component {

    constructor(props) {
        super(props);

        this.onChangeValue = this.onChangeValue.bind(this);
        this.submitContact = this.submitContact.bind(this);
        this.editContact = this.editContact.bind(this);
        this.submitWork = this.submitWork.bind(this);
        this.submitOrder = this.submitOrder.bind(this);
        this.recWork = this.recWork.bind(this);
        this.deleteWork = this.deleteWork.bind(this);


        this.state = {
            id_contact: '',
            id_works: [],
            total: '',
            id_reception: '',
            estado: '',
            numeroPedido: '',

            contactNotSend: '',
            workNotSend: '',
            numeroTrabajo: '',
            works:'',

            nombre: '',
            email: '',
            telefono: '',
            direccion: '',
            timbre: '',
            dni: '',

            linkDrive: '',
            faz: '',
            paginasPDF: '',
            paginasCarilla: '',
            margen: '',
            terminacion: '',
            divisorFaz: '',
            id_worker: '',
            estadoTrabajo:'',
        }
    }

    componentDidMount() {
        this.setState({
            works: [],
            numeroTrabajo: '1',
            faz: "Simple",
            divisorFaz: "1",
            margen: "Largo",
            paginasCarilla: "1",
            terminacion: "Sin Terminacion",
            id_reception: "Aun no implementado",
            id_worker: "Sin Asignar",
            numeroPedido: "Aun no implementado",
            estado: "No Iniciado",
            total: "No impementado",
            contactNotSend: true,
            workNotSend: true,
            estadoTrabajo:"No Iniciado"
        })
    }

    onChangeValue = event => {
        const { name, value } = event.target;
        this.setState({
            [name]: value
        })
        console.log(event.target.value)
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
        }

        //console.log(contacto);

        axios.post('http://localhost:5000/contactos/add', contacto)
            .then(res => {
                //console.log(res.data);
                this.setState({
                    id_contact: res.data
                });
                //console.log(this.state);

            })
            .catch(err => {
                console.log(err);
            });
    }

    editContact(e) {

        e.preventDefault();

        const contacto = {
            nombre: this.state.nombre,
            email: this.state.email,
            telefono: this.state.telefono,
            direccion: this.state.direccion,
            timbre: this.state.timbre,
            dni: this.state.dni,
        }

        console.log(contacto);

        axios.post('http://localhost:5000/contactos/update/' + this.state.id_contact, contacto)
            .then(res => {
                //console.log(res.data);
                this.setState({
                    id_contact: res.data,
                    contactNotSend: false
                });
                //console.log(this.state);

            })
            .catch(err => {
                console.log(err);
            });

    }

    submitWork(e) {

        e.preventDefault();

        const trabajo = {
            numeroTrabajo: this.state.numeroTrabajo,
            linkDrive: this.state.linkDrive,
            faz: this.state.faz,
            paginasPDF: this.state.paginasPDF,
            paginasCarilla: this.state.paginasCarilla,
            margen: this.state.margen,
            terminacion: this.state.terminacion,
            id_worker: this.state.id_worker,
            estado:this.state.estadoTrabajo,
        }


        axios.post('http://localhost:5000/trabajos/add', trabajo)
            .then(res => {

                var joined = this.state.id_works.concat(res.data);
                this.setState({
                    id_works: joined,
                    workNotSend: false,
                    numeroTrabajo: Number(this.state.numeroTrabajo) + 1,
                })
                this.recWork(res.data)
            })
            .catch(err => {
                console.log(err);
            });

    }

    deleteWork(id){
        axios.delete( 'http://localhost:5000/trabajos/' + id)
            .then(response => console.log(response.data));
        this.setState({
            id_works: this.state.id_works.filter(el => el !== id),
            works: this.state.works.filter(el => el._id !== id)
        });
    }

    recWork(id_work) {
        axios.get('http://localhost:5000/trabajos/' + id_work)
        .then(res => {
            
                var joint = this.state.works.concat(res.data)
                this.setState({
                    works: joint,
                })
                console.log("LArgo works: " + this.state.works.length)
                console.log(this.state.works);
            })    
            .catch(err => {
                console.log(err);
            });
    }   
        
    submitOrder(e) {

    }

    render() {
        return (
            <Container className="mb-5">
                <Col className="mb-5">
                    <h1 className='font-weight-bold text-left mt-4 mb-2'>Registar pedido</h1>
                    <Form>
                        <Row className="justify-content-md-center">
                            <h3 className='mt-2 mb-2 w-75'>Datos de contacto</h3>
                            <Form className="w-75" onSubmit={this.submitContact}>
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
                                <Row>
                                    <Col></Col>
                                    <Button variant="primary" type='Submit' disabled={this.state.id_contact}>Guardar Contacto</Button>
                                    <Col></Col>
                                    <Button variant="primary" type='Submit' onClick={this.editContact} disabled={!this.state.id_contact}>Editar Contacto</Button>
                                    <Col></Col>
                                </Row>
                            </Form>
                        </Row>
                        <Row className="justify-content-md-center">
                            <h3 className='mt-3 mb-2 w-75'>Especificaciones</h3>
                            <Form className="w-75" onSubmit={this.submitWork}>
                                <Form.Group as={Row} controlId="formLink">
                                    <Form.Label column xs="2">Link archivo</Form.Label>
                                    <Col sm="10">
                                        <Form.Control name='linkDrive' placeholder="https://drive.google.com/ejemplo" required onChange={this.onChangeValue} />
                                    </Col>
                                </Form.Group>
                                <Form.Row>
                                    <Form.Group as={Col} controlId="formPagPdf">
                                        <Form.Label>Paginas pdf</Form.Label>
                                        <Form.Control type="number" name='paginasPDF' required onChange={this.onChangeValue}>
                                        </Form.Control>
                                    </Form.Group>
                                    <Form.Group as={Col} controlId="formFaz">
                                        <Form.Label>Faz</Form.Label>
                                        <Form.Control name='faz' as="select" defaultValue="Simple" required onChange={this.onChangeValue}>
                                            <option>Simple</option>
                                            <option>Doble</option>
                                        </Form.Control>
                                    </Form.Group>
                                    <Form.Group as={Col} controlId="formPagCara">
                                        <Form.Label>Paginas por carrilla</Form.Label>
                                        <Form.Control name='paginasCarilla' as="select" required defaultValue="1" onChange={this.onChangeValue}>
                                            <option>1</option>
                                            <option>2</option>
                                            <option>4</option>
                                        </Form.Control>
                                    </Form.Group>
                                </Form.Row>
                                <Form.Row>
                                    <Form.Group as={Col} controlId="formMargen">
                                        <Form.Label>Margen</Form.Label>
                                        <Form.Control name='margen' as="select" required defaultValue="Largo" onChange={this.onChangeValue}>
                                            <option>Largo</option>
                                            <option>Corto</option>
                                        </Form.Control>
                                    </Form.Group>

                                    <Form.Group as={Col} controlId="formTerminacion">
                                        <Form.Label>Terminacion</Form.Label>
                                        <Form.Control name='terminacion' as="select" required defaultValue="Sin Terminacion" onChange={this.onChangeValue}>
                                            <option>Sin Terminacion</option>
                                            <option>Abrochado</option>
                                            <option>Anillado</option>
                                        </Form.Control>
                                    </Form.Group>
                                </Form.Row>
                                <Button variant="primary" type="submit" >Agregar Impresion</Button>
                            </Form>
                        </Row>
                        <Row>
                            <TableForm works = {this.state.works} deleteWork ={this.deleteWork} />
                        </Row>
                        <Button className="mb-5" block variant="dark" size="lg" type="submit" disabled={this.state.contactNotSend && this.state.workNotSend}>Registrar Pedido</Button>
                    </Form>
                </Col>
            </Container>
        );
    }
}