import React, { Component } from 'react';
import axios from 'axios';
import {Button, Container, Row} from 'react-bootstrap';
import { MdWarning, MdAttachMoney } from 'react-icons/md';
import { FaShippingFast } from 'react-icons/fa';

const BASE_URL = process.env.REACT_APP_API_URL;
const COMP_URL = '/pedidos/';


export default class RowOrder extends Component {

    constructor(props) {
        super(props);
        
        this.actualizazEstado = this.actualizarEstado.bind(this);

        this.state = {
            id:'',
            numeroPedido:'',
            nombre:'',
            id_reception:'',
            costoPedido: 0,
            costoEnvio: 0,
            costoTotal: 0,
            estado:'',

            pagado: false,
            enviado: false
        };
    }

    componentDidMount() {

        this.setState({ 
            id: this.props.order._id,
            numeroPedido: this.props.order.numeroPedido,
            id_reception: this.props.order.id_reception,
            totalPedido: this.props.order.totalPedido,
            costoEnvio: this.props.order.costoEnvio,
            costoTotal: Number(this.props.order.totalPedido) + Number(this.props.order.costoEnvio),
            estado: this.props.order.estado,
        });
        
        if(this.props.order.estado === 'Pagado'){
            this.setState({
                pagado: true
            });
        }else if(this.props.order.estado === 'Enviado'){
            this.setState({
                pagado: true,
                enviado: true,
            });
        }else{
            this.setState({
                enviado: true,
            });
        }
    }

    actualizarEstado(id, nuevoEstado){
        //console.log(id);
        //console.log(nuevoEstado);
        
        const  workUpdate = {
            estado: nuevoEstado,
        }

        axios.post( BASE_URL + COMP_URL + 'update/'+ id, workUpdate)
        .then(res => {
            //console.log(res);
            
            this.setState({ 
                estado: nuevoEstado,
            });

            if(this.state.estado === 'Pagado'){
                
                this.setState({ 
                    pagado: true,
                    enviado: false,
                });

                this.props.paidWorks(id);

            }else if(this.state.estado === 'Enviado') {
                
                this.setState({ 
                    pagado: true,
                    enviado: true,
                });

            }else{
                
                this.setState({ 
                    pagado: false,
                    enviado: true,
                });

            }

            console.log("Pedido actualizado");
        })
        .catch((error) => {
            console.log(error);
        });
    }

    render(){
        return (
            <tr>
                <td><a  href={'/pedidos/' + this.state.id}>ir</a> </td>
                <td>{this.state.numeroPedido}</td>
                <td>{this.state.id_reception}</td>
                <td>{'$ ' + this.state.totalPedido}</td>
                <td>{'$ ' + this.state.costoEnvio}</td>
                <td>{'$ ' + this.state.costoTotal}</td>
                <td className="bg-warning">{this.state.estado}</td>
                <td>
                    <Container fluid={true}>
                    <Row className='justify-content-around'>
                        <Button variant="danger" size="sm" 
                        onClick={() => { this.actualizarEstado(this.state.id, 'Reportado')}}
                        disabled={this.state.enviado}> <MdWarning size={25} style={{ fill: 'white' }}/>  </Button>
                        
                        <Button size="sm" 
                        onClick={() => { this.actualizarEstado(this.state.id, 'Pagado')}} 
                        disabled={this.state.pagado} > <MdAttachMoney size={25} style={{ fill: 'white' }}/> </Button>
                        
                        <Button variant="success" size="sm" 
                        onClick={() => { this.actualizarEstado(this.state.id, 'Enviado')}} 
                        disabled={this.state.enviado}> <FaShippingFast size={25} style={{ fill: 'white' }}/> </Button>
                    </Row>
                    </Container>
                </td>
        </tr>
        );
    }
}