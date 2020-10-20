import React, { Component } from 'react';
import { Table, Button, Row, Col, Container } from 'react-bootstrap';
import axios from 'axios';
import RowWork from './rowWorks';

const BASE_URL_API = process.env.REACT_APP_API_URL;
const ROUTE_URL = '/trabajos/';

export default class WorkList extends Component {
    constructor(props) {
        super(props);

        this.refresh = this.refresh.bind(this);
        this.showFinished = this.showFinished.bind(this);

        this.state = {
            works: []
        };
    }

    componentDidMount() {
        this.refresh();
    }

    refresh() {
    
        axios.get(BASE_URL_API + ROUTE_URL)
            .then(response => {
                var tempWorks =  response.data.filter(el => el.estado !== 'Sin Pagar');
                
                tempWorks = tempWorks.filter(el => el.estado !== 'Terminado');
                
                this.setState({
                    works: tempWorks
                })
            })
            .catch((error) => {
                console.log(error);
            })
    }

    showFinished(e) {
        e.preventDefault();


        axios.get(BASE_URL_API + ROUTE_URL)
            .then(response => {
                var tempWorks =  response.data.filter(el => el.estado !== 'Sin Pagar');
                
                this.setState({
                    works: tempWorks
                })
            })
            .catch((error) => {
                console.log(error);
            })

    }

    exerciseList() {
        return this.state.works.map(currentwork => {
            return <RowWork work={currentwork} delete={this.deleteWork} key={currentwork._id} />;
        })
    }

    render() {
        return (
            <Container fluid='sm'>
                <h1 className='font-weight-bold mt-4 mb-3'>Trabajos Pendientes</h1>
                    <Row className='w-75 align-self-center mt-2 mb-2'>
                        <Col className='col-auto'></Col>
                        <Button variant="info" className="mb-3" onClick={this.refresh}>Actualizar</Button>
                        <Col className='col-auto'></Col>
                        <Button variant="secondary" className="mb-3" onClick={this.showFinished}>Mostrar Terminados</Button>
                    </Row>
                <Table responsive="sm" striped bordered hover size="sm">
                    <thead className="thead-dark">
                        <tr>
                            <th>N° Pedido</th>
                            <th>N° Trabajo</th>
                            <th>Pags X Carilla</th>
                            <th>Faz</th>
                            <th>Terminacion</th>
                            <th>link</th>
                            <th>Responsable</th>
                            <th>Estado</th>
                            <th>Acciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.exerciseList()}
                    </tbody>
                </Table>
            </Container>
        );
    }
}