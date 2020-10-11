import React, { Component } from 'react';
import axios from 'axios';
import { Col, Row, Form, Button} from 'react-bootstrap';

export default class WorkForm extends Component{
    render(){
        return(
            <Form>
                <Form.Group as={Row} controlId="formNombre">
                    <Form.Label column xs="2">Nombre</Form.Label>
                    <Col sm="10">
                        <Form.Control placeholder="Nombre"/>
                    </Col>
                </Form.Group>
            
                <Form.Group as={Row} controlId="formEmail">
                    <Form.Label column xs="2">Email</Form.Label>
                    <Col sm="10">
                        <Form.Control type="email" placeholder="email@email.com"/>
                    </Col>
                </Form.Group>
               
                <Form.Row>
                    <Form.Group as={Col} sm="9" controlId="formDireccion">
                        <Form.Label>Dirección</Form.Label>
                        <Form.Control placeholder="Av Paseo Colon 850" />
                    </Form.Group>

                    <Form.Group as={Col} sm="3" controlId="formTimbre">
                        <Form.Label>Timbre</Form.Label>
                        <Form.Control placeholder="Aula 203" />
                    </Form.Group>
                </Form.Row>

                <Form.Group as={Row} controlId="formTelefono">
                    <Form.Label column xs="2">Telefono</Form.Label>
                    <Col sm="10">
                        <Form.Control placeholder="11 2233 4455"/>
                    </Col>
                </Form.Group>

                <Form.Group as={Row} controlId="formDni">
                    <Form.Label column xs="2">Dni</Form.Label>
                    <Col sm="10">
                        <Form.Control type="email" placeholder="Dni para la entrega"/>
                    </Col>
                </Form.Group>


                <Form.Row>
                    <Form.Group as={Col} controlId="formGridCity">
                        <Form.Label>City</Form.Label>
                        <Form.Control />
                    </Form.Group>

                    <Form.Group as={Col} controlId="formGridState">
                        <Form.Label>State</Form.Label>
                        <Form.Control as="select" defaultValue="Choose...">
                        <option>Choose...</option>
                        <option>...</option>
                        </Form.Control>
                    </Form.Group>

                    <Form.Group as={Col} controlId="formGridZip">
                        <Form.Label>Zip</Form.Label>
                        <Form.Control />
                    </Form.Group>
                </Form.Row>

                <Form.Group id="formGridCheckbox">
                    <Form.Check type="checkbox" label="Check me out" />
                </Form.Group>

                <Button variant="primary" type="submit">
                    Submit
                </Button>
            </Form>
        );
    }
}