import React, { Component } from 'react';
import { Container, Row, Col, Table } from 'react-bootstrap';
import axios from 'axios';

const BASE_URL_API = process.env.REACT_APP_API_URL;
const ROUTE_ORDERS_URL = '/pedidos/';
const ROUTE_WORKS_URL = '/trabajos/';


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
        const order = (await axios.get(BASE_URL_API + ROUTE_ORDERS_URL + this.props.match.params.id)).data;

        for (const work of order.id_works) {
            const workObj = (await axios.get(BASE_URL_API + ROUTE_WORKS_URL + work)).data;
            list_works = list_works.concat(workObj);
        }

        this.setState({
            id: this.props.match.params.id,
            order: order,
            works: list_works,
        })
    }

    workList() {
        return this.state.works.map(currentwork => {
            return <RowWork work={currentwork} key={currentwork._id} />;
        })
    }

    render() {
        return (
            <Container fluid='sm'>
                <Row className='w-75 align-self-center mt-2 mb-2'>
                    <Col>
                        <h2>{'Pedido N° ' + this.state.order.numeroPedido}</h2>
                        <h3>{'Estado: ' + this.state.order.estado}</h3>
                    </Col>
                </Row>
                <Table responsive='sm'>
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
        );
    }
}