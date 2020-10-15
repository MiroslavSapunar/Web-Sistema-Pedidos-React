import React, { Component } from 'react';
import axios from 'axios';
import { Col, Container, Row, Button} from 'react-bootstrap';

import ContactForm from './contactForm';
import WorkForm from './workForm';
import TableForm from './tableForm';


export default class CreateOrder extends Component {

    constructor(props) {
        super(props);

        this.recordContact = this.recordContact.bind(this);
        this.recordWork = this.recordWork.bind(this);
        this.deleteWork = this.deleteWork.bind(this);
        this.submitOrder = this.submitOrder.bind(this);

        this.state = {
            
            id_reception: '',
            id_contact: '',
            id_works: [],
            estado: '',
            total: '',
            numeroPedido: '',

            contact:[],
            works:[],
            contactReg:'',
            workReg:'',
        }
    }

    componentDidMount() {
        this.setState({
            
            id_reception: "Sin Recepcion",
            id_contact: "Sin Contacto",
            id_works: [],
            estado: "No Iniciado",
            total: "No impementado",
            numeroPedido: "Aun no implementado",
            
            
            contactReg: false,
            workReg: false,
            contact:[],
            works: [],
        })
    }

    componentDidUpdate(){
        console.log("se actualizo componente");
        console.log(this.state);
    }

    recordContact(contactRecived){
        var newArray = [ contactRecived];
        this.setState({
            contactReg: true,
            contact: newArray,
        });
    }

    recordWork(workRecived){
        this.setState({
            workReg: true,
            works: this.state.works.concat(workRecived),
        })
        /** 
        axios.get('http://localhost:5000/trabajos/' + id)
            .then(response =>{
                this.setState({
                    works: this.state.works.concat(response.data),
                })
                console.log(this.state);
            });
        */
    }

    deleteWork(numeroTrabajo){
        //console.log(id);
        /** 
        axios.delete( 'http://localhost:5000/trabajos/' + id)
            .then(response => console.log(response.data));
        */
        this.setState((state) => ({
            works: state.works.filter(el => el.numeroTrabajo !== numeroTrabajo)
        }));
    }

    submitOrder(e) {

    }

    render() {
        return (
            <Container className="mb-5">
                <Col className="mb-5">
                    <h1 className='font-weight-bold text-left mt-4 mb-2'>Registar pedido</h1>
                    <Row className="justify-content-md-center">
                        <ContactForm return={this.recordContact}/>
                    </Row>
                    <Row className="justify-content-md-center">
                        <WorkForm return={this.recordWork}/>        
                    </Row>
                    <Row>
                        <TableForm works = {this.state.works} deleteWork = {this.deleteWork}/>
                    </Row>
                    <Row>
                        Detalles
                    </Row>
                    <Button className="mb-5" block variant="dark" size="lg" type="submit" disabled={!(this.state.contactReg && this.state.workReg)}>Registrar Pedido</Button>
                </Col>
            </Container>
        );
    }
}