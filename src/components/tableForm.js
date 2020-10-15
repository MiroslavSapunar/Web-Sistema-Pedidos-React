import React, { Component } from 'react';
import { Container, Table } from 'react-bootstrap';

import RowForm from './rowForm';

export default class TableForm extends Component {
    
    constructor(props) {
        super(props);
        
        this.renderRows = this.renderRows.bind(this);
        this.deleteWork = this.deleteWork.bind(this);

        this.state = {
            works: []
        }
    }
    
    componentDidMount(){
        console.log("mount tabla");
        this.setState({
            works: this.props.works
        });
        console.log(this.state.works);
    }


    componentWillReceiveProps(props){
        console.log("update tabla, supuestamente cambio proms");
        this.setState({
            works: props.works
        })
        console.log(this.state.works);
    }

    deleteWork(numeroTrabajo) {
        /**
         * 
        
        axios.delete( BASE_URL + COMP_URL + id)
            .then(response => console.log(response.data));
        this.setState({
            works: this.state.works.filter(el => el._id !== id)
        });
         */
        this.props.deleteWork(numeroTrabajo);
    }

    renderRows(){
        //console.log(this.state.works);
         return this.state.works.map((work, index) => {
            return <RowForm workList = {work} deleteWork = {this.deleteWork} key = {work.numeroTrabajo} index = {index}/>;
        })
    }

    render() {
        return (
            <Container className='w-100 align-self-center mt-3 mb-5'>
                <Table striped bordered hover size="sm">
                    <thead className="thead-dark">
                        <tr>
                            <th>N° Pedido</th>
                            <th>link</th>
                            <th>Paginas Pdf</th>
                            <th>Pags X Carilla</th>
                            <th>Faz</th>
                            <th>Margen</th>
                            <th>Hojas Impresas</th>
                            <th>Costo Imp</th>
                            <th>Terminacion</th>
                            <th>Costo Anillado</th>
                            <th>Total</th>
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