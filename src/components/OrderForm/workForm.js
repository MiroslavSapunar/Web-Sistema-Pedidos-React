import React, { Component } from 'react';
import { Col, Row, Form, Button } from 'react-bootstrap';

export default class WorkForm extends Component {
    
    constructor(props) {
        super(props);

        this.onChangeValue = this.onChangeValue.bind(this);
        this.calculatePrice = this.calculatePrice.bind(this);
        this.submitWork = this.submitWork.bind(this);

        this.state = {
            id_pedido:'',
            numeroPedido:'',
            numeroTrabajo:0,
            tamanioPapel:'',
            linkDrive: '',
            faz: '',
            paginasPDF: '',
            paginasCarilla:1,
            margen: '',
            terminacion: '',
            id_worker: '',
            estado:'',
            costoImpresion: 0,
            costoTerminacion: 0,
            costoTotal: 0
        }
    }
    
    componentDidMount() {
        this.setState({
            id_pedido:'Sin Asignar',
            numeroPedido:'Sin Asignar',
            numeroTrabajo: 0,
            tamanioPapel:'A4',
            linkDrive: '',
            faz: 'Simple',
            paginasPDF: '',
            paginasCarilla:1,
            margen: 'Largo',
            terminacion: 'Sin Terminacion',
            id_worker: 'Sin Asignar',
            estado:'Sin Pagar',
            costoImpresion: 0,
            costoTerminacion: 0,
            costoTotal: 0
        })

    }

    componentDidUpdate(){
        //console.log("se actualizo componente");
        //console.log(this.state);
    }
    
    onChangeValue = event => {
        const { name, value } = event.target;
        this.setState({
            [name]: value
        })
    }

    calculatePrice(){

        var subtotalImpresion = 0;
        var subtotalTerminacion = 0;
        var hojasImpresas = 0;

        var carillasImpresas = Math.round(Number(this.state.paginasPDF) / Number(this.state.paginasCarilla));

        if(this.state.tamanioPapel === 'A4'){
            if (this.state.faz === "Simple") {
                subtotalImpresion = carillasImpresas * 2;
            } else {
                subtotalImpresion = Math.round(carillasImpresas * 1.5);
            }
        }else if(this.state.tamanioPapel === 'A3'){
            subtotalImpresion = carillasImpresas * 10;
        }else{
            subtotalImpresion = carillasImpresas * 3;
        }

        if(this.state.faz === "Simple") {
            hojasImpresas = carillasImpresas;
        }else {
            hojasImpresas = Math.round(carillasImpresas / 2);
        }

        if(this.state.terminacion === "Anillado") {
            subtotalTerminacion = (  Math.floor((hojasImpresas - 10) / 50) + 1 ) * 40;
        }
        
        return {
            subtotalImpresion, 
            subtotalTerminacion,
            carillasImpresas,
            hojasImpresas,

        }
    }

    submitWork(e) {
        e.preventDefault();

        const costos  = this.calculatePrice();
                
        const trabajo = {
            id_pedido: this.state.id_pedido,
            numeroPedido: this.state.numeroPedido,
            numeroTrabajo: Number(this.state.numeroTrabajo) + 1,
            tamanioPapel : this.state.tamanioPapel,
            linkDrive: this.state.linkDrive,
            faz: this.state.faz,
            paginasPDF: Number(this.state.paginasPDF),
            paginasCarilla: Number(this.state.paginasCarilla),
            margen: this.state.margen,
            terminacion: this.state.terminacion,
            id_worker: this.state.id_worker,
            estado:this.state.estado,
            costoImpresion: costos.subtotalImpresion,
            costoTerminacion: costos.subtotalTerminacion,
            carillasImpresas: costos.carillasImpresas,
            hojasImpresas: costos.hojasImpresas,
            costoTotal: costos.subtotalImpresion + costos.subtotalTerminacion,
        }

        this.props.return(trabajo);
        
        this.setState( (state) => ({
            numeroTrabajo : Number(state.numeroTrabajo) + 1
        }));
    }
    
    render() {
        return (
            <Form className="w-100" onSubmit={this.submitWork}>
                <h3 className='mt-3 mb-3 w-75'>Datos y especificaciones impresiones</h3>
                <Form.Group as={Row} controlId="formLink">
                    <Form.Label column xs="2">Link archivo</Form.Label>
                    <Col sm="10">
                        <Form.Control name='linkDrive' placeholder="https://drive.google.com/ejemplo" required onChange={this.onChangeValue} />
                    </Col>
                </Form.Group>
                <Form.Row>
                    <Form.Group as={Col} controlId="formPagPdf">
                        <Form.Label>Paginas pdf</Form.Label>
                        <Form.Control type="number" name='paginasPDF' required onChange={this.onChangeValue}>
                        </Form.Control>
                    </Form.Group>
                    <Form.Group as={Col} controlId="formPapel">
                        <Form.Label>Tamaño Papel</Form.Label>
                        <Form.Control name='tamanioPapel' as="select" required onChange={this.onChangeValue}>
                            <option>A4</option>
                            <option>Oficio</option>
                            <option>A3</option>
                        </Form.Control>
                    </Form.Group>
                    <Form.Group as={Col} controlId="formFaz">
                        <Form.Label>Faz</Form.Label>
                        <Form.Control name='faz' as="select" required onChange={this.onChangeValue}>
                            <option>Simple</option>
                            <option>Doble</option>
                        </Form.Control>
                    </Form.Group>
                    <Form.Group as={Col} controlId="formPagCara">
                        <Form.Label>Paginas por carrilla</Form.Label>
                        <Form.Control name='paginasCarilla' as="select" required onChange={this.onChangeValue}>
                            <option>{1}</option>
                            <option>{2}</option>
                            <option>{4}</option>
                        </Form.Control>
                    </Form.Group>
                </Form.Row>
                <Form.Row>
                    <Form.Group as={Col} controlId="formMargen">
                        <Form.Label>Margen</Form.Label>
                        <Form.Control name='margen' as="select" required onChange={this.onChangeValue}>
                            <option>Largo</option>
                            <option>Corto</option>
                        </Form.Control>
                    </Form.Group>

                    <Form.Group as={Col} controlId="formTerminacion">
                        <Form.Label>Terminacion</Form.Label>
                        <Form.Control name='terminacion' as="select" required onChange={this.onChangeValue}>
                            <option>Sin Terminacion</option>
                            <option>Abrochado</option>
                            <option>Anillado</option>
                        </Form.Control>
                    </Form.Group>
                </Form.Row>
                <Row className="w-75 align-content-right">
                    <Col></Col>
                    <Button variant="primary" type="submit" >Agregar Impresion</Button>
                    <Col></Col>
                </Row>
            </Form>
        );
    }
}