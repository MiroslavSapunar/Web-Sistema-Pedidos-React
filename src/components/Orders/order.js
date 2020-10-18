import React, { Component } from 'react';
import { Container, Row, Table } from 'react-bootstrap';
import axios from 'axios';

const RowWork = props => (

    <tr>
        <td>{props.work.numeroTrabajo}</td>
        <td>{props.work.paginasPDF}</td>
        <td>{props.work.paginasCarilla}</td>
        <td>{props.work.faz}</td>
        <td>{props.work.terminacion}</td>
        <td>{props.work.estado}</td>

    </tr>

)

export default class Order extends Component {

    constructor(props) {
        super(props);

        this.state = {
            id: '',
            order: '',
            works: [],
        };
    }

    async componentDidMount() {

        var list_works = [];
        const order = (await axios.get('http://localhost:5000/pedidos/' + this.props.match.params.id)).data;
        
        for (const work of order.id_works) {
            const workObj = (await axios.get('http://localhost:5000/trabajos/' + work)).data;
            list_works = list_works.concat(workObj);
        }

        this.setState({
            id: this.props.match.params.id,
            order: order,
            works: list_works,
        })
    }

    workList(){
        return this.state.works.map(currentwork => {
            return <RowWork work={currentwork} key={currentwork._id} />;
        })
    }

    render() {
        return (
            <Container className='mt-2'>
                <h1>{'Pedido N° ' + this.state.order.numeroPedido}</h1>
                <Row>
                    <Container>
                        <Table>
                            <thead className="thead-dark">
                                <tr>
                                    <th>N° Trabajo</th>
                                    <th>Pags PDF</th>
                                    <th>Pags X Carilla</th>
                                    <th>Faz</th>
                                    <th>Terminacion</th>
                                    <th>Estado</th>
                                </tr>
                            </thead>
                            <tbody>
                                {this.workList()}
                            </tbody>
                        </Table>
                    </Container>
                </Row>
            </Container>
        );
    }
}