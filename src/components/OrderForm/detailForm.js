import React, { Component } from 'react';
import { Col, Row, Form, Button} from 'react-bootstrap';

export default class ContactForm extends Component{

    constructor(props) {
        super(props);

        this.onChangeValue = this.onChangeValue.bind(this);
        this.submitDetail = this.submitDetail.bind(this);

        this.state = {
            costoEnvio: '',
            observaciones: '',
        }
    }

    componentDidMount() {
        this.setState({
            costoEnvio:0,
            observaciones:''
        })
    }

    onChangeValue = event => {
        const { name, value } = event.target;
        this.setState({
            [name]: value
        })
    }


    submitDetail(e) {

        e.preventDefault();

        const contacto = {
            costoEnvio: this.state.costoEnvio,
            observaciones: this.state.observaciones,

        }

        this.props.return(contacto);
    }


    render(){
        return(
            <Form className="w-100 mb-3" onSubmit={this.submitDetail}>
                <h3 className='mt-2 mb-2 w-75'>Datos adicionales</h3>
                <Form.Row>
                    <Form.Group as={Col} sm="3" controlId="formCostoEnv">
                        <Form.Label>Costo Envio</Form.Label>
                        <Form.Control  type='number' name='costoEnvio' required onChange={this.onChangeValue} />
                    </Form.Group>
                    <Form.Group as={Col} sm="9" controlId="formInfoImportante">
                        <Form.Label>Observaciones</Form.Label>
                        <Form.Control as="textarea" rows="1" name='observaciones' placeholder="informacion relevante no categorizable en el formulario anterior" onChange={this.onChangeValue} />
                    </Form.Group>
                </Form.Row>
                <Row className="w-75 align-content-right">
                    <Col></Col>
                    <Button variant="primary" type='Submit'>Guardar Datos</Button>
                    <Col></Col>
                </Row>
            </Form>
        );
    }
}
