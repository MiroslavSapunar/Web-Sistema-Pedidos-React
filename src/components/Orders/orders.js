import React, { Component } from 'react';
import { Table, Button, Row, Col, Container } from 'react-bootstrap';
import axios from 'axios';
import RowOrder from './rowOrders';

const BASE_URL = process.env.REACT_APP_API_URL;
const COMP_URL = '/pedidos/';

export default class OrdersList extends Component{
    constructor(props) {
        super(props);

        //this.deleteWork = this.deleteWork.bind(this);
        this.reset = this.reset.bind(this);
        this.refresh = this.refresh.bind(this);
        this.showFinished = this.showFinished.bind(this);

        this.state = {
            orders: []
        };
    }

    componentDidMount() {
        this.refresh();
    }
    

    reset(){
        this.setState({ 
            orders: []
        })
    }

    refresh(){
        this.reset();

        axios.get( BASE_URL + COMP_URL)
        .then(response => {
            this.setState({ 
                orders: response.data.filter(el => el.estado !== 'Enviado')
             })
        })
        .catch((error) => {
            console.log(error);
        })
    }

    showFinished(e){
        e.preventDefault();

        this.reset();

        axios.get( BASE_URL + COMP_URL)
        .then(response => {
            this.setState({ 
                orders: response.data
             })
        })
        .catch((error) => {
            console.log(error);
        })

    }

    ordersList(){
        return this.state.orders.map(currentOrder => {
            return <RowOrder order = {currentOrder} delete = {this.deleteWork} key={currentOrder._id }/>;
        })
    }

    render(){
        return (
            <Container>
                <h1 className='font-weight-bold mt-4 mb-3'>Pedidos Pendientes</h1>
                <Container className='w-75 align-self-center mt-2 mb-2'>
                    <Row>
                        <Col></Col>
                        <Button variant="info" className="mb-3" onClick={this.refresh}>Actualizar</Button>
                        <Col></Col>
                        <Button variant="secondary" className="mb-3" onClick={this.showFinished}>Mostrar Terminados</Button>
                        <Col></Col>
                    </Row>
                </Container>
                <Table className="table" striped bordered hover size="sm">
                    <thead className="thead-dark">
                        <tr>
                            <th>ID Pedido</th>
                            <th>N° Pedido</th>
                            <th>Registrado por: </th>
                            <th>Costo Pedido</th>
                            <th>Costo Envio</th>
                            <th>Costo Total</th>
                            <th>Estado</th>
                            <th>Acciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        { this.ordersList() }
                    </tbody>
                </Table>
            </Container>
        );
    }
}