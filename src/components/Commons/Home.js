import React, { Component } from 'react';
import { Container, Col, Row, ListGroup, ListGroupItem} from 'react-bootstrap';
import GButtonLogin from './GButtonLogin';
import BottomBar from './BottomBar';

export default class Home extends Component {

    render() {
        return (
            <div>
                <Container fluid className=' h-100 my-5'>
                    <Row className="justify-content-center align-items-center">
                        <ListGroup className='mt-3 mb-5 w-75'>
                            <ListGroupItem className='justify-content-center'>
                                <h2 className='text-center font-weight-bold mb-n1 text-break'>Fotocopiadora CEI</h2>
                                <h3 className='text-center mb-4 text-center'>Sistema de gestión de pedidos online</h3>
                                <Row className="justify-content-around align-items-center">
                                    <Col md={5}>
                                        <Row className="justify-content-center">
                                            <h2 className="text-center mb-2 font-weight-bold">Bienvenid@</h2>
                                        </Row>
                                        <Row className="justify-content-center">
                                            <GButtonLogin />
                                        </Row>
                                        <Row className="justify-content-center mt-3">
                                            <label>Este sitio utiliza cookies para su correcto funcionamiento</label>
                                        </Row>
                                    </Col>
                                    <Col md={6}>
                                        <Row><h2>Como usar este servicio </h2></Row>
                                        <Row><label>1) Ingresa con una cuenta Google</label></Row>
                                        <Row><label>2) Inicia un nuevo pedido, subiendo/compartiendo tus archivos, especificando como y donde los vas a recibir</label></Row>
                                        <Row><label>3) Una vez validado por el sistema, confirma el presupuesto pagando el pedido</label></Row>
                                        <Row><label>4) Te avisaremos cuando este terminado para que retires tu pedido en FIUBA o esperalo en tu casa</label></Row>
                                    </Col>
                                </Row>
                            </ListGroupItem>
                        </ListGroup>
                    </Row>
                </Container>
                <BottomBar />
            </div>
        )
    }
}