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
        this.setState({
            works: this.props.works
        });
    }

    componentWillReceiveProps(props){
        this.setState({
            works: props.works
        })
    }


    deleteWork(numeroTrabajo) {
        this.props.deleteWork(numeroTrabajo);
    }

    renderRows(){
        return this.state.works.map((work, index) => {
            return <RowForm workList = {work} deleteWork = {this.deleteWork} key = {work.numeroTrabajo} index = {index}/>;
        })
    }

    render() {
        return (
            <Container fluid className='align-self-center mt-2 mb-2'>
                <h3 className='mb-3'>Archivos para imprimir</h3>
                <Table responsive={true} striped bordered hover size="sm">
                    <thead className="thead-dark">
                        <tr>
                            <th className="text-wrap align-top text-sm-left">N° Archivo</th>
                            <th className="text-wrap align-top text-sm-left">link</th>
                            <th className="text-wrap align-top text-sm-left">copias</th>
                            <th className="text-wrap align-top text-sm-left">Paginas en pdf</th>
                            <th className="text-wrap align-top text-sm-left">Pags x Carilla</th>
                            <th className="text-wrap align-top text-sm-left">Faz</th>
                            <th className="text-wrap align-top text-sm-left">Margen</th>
                            <th className="text-wrap align-top text-sm-left">Tamaño papel</th>
                            <th className="text-wrap align-top text-sm-left">Carillas impresas</th>
                            <th className="text-wrap align-top text-sm-left">Terminacion</th>
                            <th className="text-wrap align-top text-sm-left">Cant hojas Final</th>
                            <th className="text-wrap align-top text-sm-left">Costo impresion X copia</th>
                            <th className="text-wrap align-top text-sm-left">Costo anillado X copia</th>
                            <th className="text-wrap align-top text-sm-left">Costo X copia</th>
                            <th className="text-wrap align-top text-sm-left">Costo Total</th>
                            <th className="text-wrap align-top text-sm-left"></th>
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