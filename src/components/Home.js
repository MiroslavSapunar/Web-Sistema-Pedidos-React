import React, { Component } from 'react';
import {Container, Button, Row, ListGroup, ListGroupItem} from 'react-bootstrap';
import BottomBar from './BottomBar';

export default class Home extends Component {

    render() {
        return (
            <Container className = "container w-75 h-50 align-self-center">
                <ListGroup>
                    <ListGroupItem>

                
                <Row className="justify-content-center">
                    <Button variant="dark" className = "btn-block w-25">Ingresar</Button> | <Button variant="outline-dark" className = "w-25">Registrase</Button>
                </Row>
                    </ListGroupItem>
                </ListGroup>
                <BottomBar />
            </Container>
        )
    }
}