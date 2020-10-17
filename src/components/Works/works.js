import React, { Component } from 'react';
import { Table, Button, Row, Col, Container } from 'react-bootstrap';
import axios from 'axios';
import RowWork from './rowWorks';

const BASE_URL = process.env.REACT_APP_API_URL;
const COMP_URL = '/trabajos/';

export default class WorkList extends Component{
    constructor(props) {
        super(props);

        //this.deleteWork = this.deleteWork.bind(this);
        this.reset = this.reset.bind(this);
        this.refresh = this.refresh.bind(this);
        this.showFinished = this.showFinished.bind(this);

        this.state = {
            works: []
        };
    }

    componentDidMount() {
        this.refresh();
    }
    
    /**
    deleteWork(id) {
        axios.delete( BASE_URL + COMP_URL + id)
            .then(response => console.log(response.data));
        this.setState({
            works: this.state.works.filter(el => el._id !== id)
        });
    }
    */

    reset(){
        this.setState({ 
            works: []
        })
    }

    refresh(){
        this.reset();

        axios.get( BASE_URL + COMP_URL)
        .then(response => {
            this.setState({ 
                works: response.data.filter(el => el.estado !== 'Terminado')
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
                works: response.data
             })
        })
        .catch((error) => {
            console.log(error);
        })

    }

    exerciseList(){
        return this.state.works.map(currentwork => {
            return <RowWork work = {currentwork} delete = {this.deleteWork} key={currentwork._id }/>;
        })
    }

    render(){
        return (
            <Container>
                <h1 className='font-weight-bold mt-4 mb-3'>Trabajos Pendientes</h1>
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
                        { this.exerciseList() }
                    </tbody>
                </Table>
            </Container>
        );
    }
}