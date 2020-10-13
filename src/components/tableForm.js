import React, { Component } from 'react';
import { Container, Table, Button } from 'react-bootstrap';
import axios from 'axios';

const BASE_URL = process.env.REACT_APP_API_URL;
const COMP_URL = '/trabajos/';


const Work = props => (

    <tr>
        <td>{props.counter}</td>
        <td>{props.work._id}</td>
        <td>{props.work.paginasPDF}</td>
        <td>{props.work.faz}</td>
        <td>{props.work.margen}</td>
        <td>{props.work.terminacion}</td>
        <td>{props.work.total}</td>
        <dt>
        <a href="#" onClick={() => { props.deleteWork(props.work._id)}}>Borrar</a>
        </dt>
    </tr>
)

export default class TableForm extends Component {
    
    constructor(props) {
        super(props);
        
        this.renderRows = this.renderRows.bind(this);
        this.deleteWork = this.deleteWork.bind(this);
        this.deleteOnParent = props.deleteWork;

        this.state = {
            works: []
        }
    }
    
    
    componentWillReceiveProps(props){
        this.setState({
            works: Array.from(this.props.works)
        })
        this.renderRows();
    }


    deleteWork(id) {
        axios.delete( BASE_URL + COMP_URL + id)
            .then(response => console.log(response.data));
        this.setState({
            works: this.state.works.filter(el => el._id !== id)
        });
        this.deleteOnParent(id);
    }

    renderRows(){
        console.log(this.state.works)
        var counter = 0;
        return this.state.works.map(currentWork => {
            counter++;
            return <Work work = {currentWork} deleteWork = {this.deleteWork} counter = {counter}/>;
        })
    }

    render() {
        return (
            <Container className='w-75 align-self-center mt-3 mb-5'>
                <Table striped bordered hover size="sm">
                    <thead>
                        <tr>
                            <th>N° Pedido</th>
                            <th>ID</th>
                            <th>Pagina PDF</th>
                            <th>Faz</th>
                            <th>Margen</th>
                            <th>Terminacion</th>
                            <th>Subtotal</th>
                            <th>Accion</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.renderRows()}
                    </tbody>
                </Table>
            </Container>
        );
    }
}